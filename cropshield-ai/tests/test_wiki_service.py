"""Tests for WikiService: loading, listing, path safety, missing wiki handling."""

import pytest
from pathlib import Path
from backend.services.wiki_service import WikiService, PathTraversalError


def test_missing_wiki_handling(tmp_path: Path):
    """Test 5: Graceful missing wiki handling without crashing."""
    non_existent = tmp_path / "does_not_exist"
    service = WikiService(wiki_root=non_existent)

    assert not service.is_installed()
    assert service.list_crops() == []
    assert service.list_problems("Rice") == []

    crop_info = service.get_crop("Rice")
    assert crop_info.crop == "Rice"
    assert crop_info.problem_count == 0
    assert crop_info.problems == []

    # get_problem should raise FileNotFoundError with clear message
    with pytest.raises(FileNotFoundError, match="Wiki not installed"):
        service.get_problem("Rice", "Blast")

    # validate_wiki should return report with status="Wiki not installed" without crashing
    report = service.validate_wiki()
    assert not report.installed
    assert report.status == "Wiki not installed"
    assert report.total_files_scanned == 0


def test_loading_a_crop(mock_wiki_service: WikiService):
    """Test 1: Loading a crop."""
    crop_info = mock_wiki_service.get_crop("Rice")
    assert crop_info.crop == "Rice"
    assert crop_info.problem_count == 2
    assert "Blast" in crop_info.problems
    assert "Brown Spot" in crop_info.problems


def test_listing_crop_problems(mock_wiki_service: WikiService):
    """Test 2: Listing crop problems."""
    problems = mock_wiki_service.list_problems("Rice")
    assert len(problems) == 2
    assert set(problems) == {"Blast", "Brown Spot"}

    wheat_problems = mock_wiki_service.list_problems("Wheat")
    assert wheat_problems == ["Rust"]

    # Non-existent crop returns empty list
    assert mock_wiki_service.list_problems("Sorghum") == []


def test_loading_one_problem(mock_wiki_service: WikiService):
    """Test 3: Loading one problem file and verifying parsed contents."""
    problem = mock_wiki_service.get_problem("Rice", "Blast")
    assert problem.frontmatter.crop == "Rice"
    assert problem.frontmatter.problem == "Blast"
    assert problem.frontmatter.type == "fungal_disease"
    assert problem.frontmatter.status == "verified"
    assert "Diagnostic Phenotype" in problem.sections
    assert "Hallmark Features" in problem.sections
    assert "Negative / Exclusion Features" in problem.sections
    assert problem.machine_notes.get("primary_shape") == "spindle_diamond"
    assert problem.machine_notes.get("ends") == "pointed_tapered"

    # Loading with .md extension also works safely
    problem_ext = mock_wiki_service.get_problem("Rice", "Blast.md")
    assert problem_ext.frontmatter.problem == "Blast"


def test_path_traversal_prevention(mock_wiki_service: WikiService):
    """Test 4: Strict path traversal prevention."""
    traversal_inputs = [
        ("../secret", "Blast"),
        ("Rice", "../Blast"),
        ("..", "Blast"),
        ("Rice/../../etc", "passwd"),
        ("Rice", "../../etc/shadow"),
        ("Rice", "Blast/../../../root"),
        ("/absolute/path", "Blast"),
        ("C:\\Windows", "Blast"),
        ("Rice", "C:\\boot.ini"),
        ("Rice", "Blast\0nullbyte"),
        ("", "Blast"),
        ("Rice", ""),
    ]

    for crop_in, prob_in in traversal_inputs:
        with pytest.raises(PathTraversalError):
            mock_wiki_service.get_problem(crop_in, prob_in)


def test_search_problems(mock_wiki_service: WikiService):
    """Test searching problems within a crop."""
    results = mock_wiki_service.search_problems("Rice", "spindle")
    assert len(results) >= 1
    assert any(r.problem == "Blast" for r in results)

    empty_results = mock_wiki_service.search_problems("Rice", "non_existent_keyword_xyz")
    assert empty_results == []


def test_validate_wiki_with_valid_content(mock_wiki_service: WikiService):
    """Test validate_wiki on a valid wiki structure."""
    report = mock_wiki_service.validate_wiki()
    assert report.installed
    assert report.total_files_scanned == 3
    assert report.total_crops_scanned == 2
    assert report.invalid_count == 0
