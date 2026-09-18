"""Tests for Wiki Parser and Document Validation."""

import pytest
from pathlib import Path
from backend.wiki_parser import (
    parse_wiki_document,
    validate_document,
    extract_frontmatter,
    WikiParseError,
)
from backend.services.wiki_service import WikiService


def test_missing_frontmatter():
    """Test handling markdown files with no YAML frontmatter."""
    content = "# Just a Title\n\nNo frontmatter here."
    with pytest.raises(WikiParseError, match="missing YAML frontmatter"):
        parse_wiki_document(content)

    issues = validate_document(content, file_path="Rice/Bad.md")
    assert any(i.issue_type == "missing_frontmatter" for i in issues)


def test_malformed_yaml():
    """Test handling invalid / unparseable YAML in frontmatter."""
    content = """---
crop: Rice
problem: Blast: [unclosed list
---
# Blast
"""
    with pytest.raises(WikiParseError, match="Malformed YAML"):
        parse_wiki_document(content)

    issues = validate_document(content, file_path="Rice/Malformed.md")
    assert any(i.issue_type == "malformed_yaml" for i in issues)


def test_missing_crop_or_problem():
    """Test missing required crop and problem frontmatter fields."""
    missing_crop = """---
problem: Blast
type: fungal_disease
---
# Blast
"""
    with pytest.raises(WikiParseError, match="missing required 'crop'"):
        parse_wiki_document(missing_crop)

    missing_prob = """---
crop: Rice
type: fungal_disease
---
# Blast
"""
    with pytest.raises(WikiParseError, match="missing required 'problem'"):
        parse_wiki_document(missing_prob)


def test_invalid_phenotype_enum_values():
    """Test detection of invalid enum values in machine-comparison notes."""
    content = """---
crop: Rice
problem: Test Disease
---
# Test Disease

## Diagnostic Phenotype
Some symptoms.

## Hallmark Features
Hallmarks.

## Negative / Exclusion Features
Exclusions.

## Machine-Comparison Notes
```yaml
primary_shape: completely_invalid_shape_123
width_profile: illegal_width_profile
ends: weird_ends
```
"""
    issues = validate_document(content, file_path="Rice/TestDisease.md")
    enum_issues = [i for i in issues if i.issue_type == "invalid_enum"]
    assert len(enum_issues) >= 3


def test_duplicate_problem_detection(tmp_path: Path):
    """Test that duplicate problem definitions within the same crop are flagged."""
    wiki_dir = tmp_path / "wiki" / "agriculture"
    rice_dir = wiki_dir / "Rice"
    rice_dir.mkdir(parents=True)

    file1 = rice_dir / "Blast.md"
    file2 = rice_dir / "Blast_copy.md"

    doc = """---
crop: Rice
problem: Blast
---
# Blast
## Diagnostic Phenotype
Phenotype.
## Hallmark Features
Hallmark.
## Negative / Exclusion Features
Negative.
"""
    file1.write_text(doc, encoding="utf-8")
    file2.write_text(doc, encoding="utf-8")

    service = WikiService(wiki_root=wiki_dir)
    report = service.validate_wiki()

    assert any(i.issue_type == "duplicate_problem" for i in report.issues)
    assert report.invalid_count >= 1
