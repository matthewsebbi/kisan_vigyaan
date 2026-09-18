"""Pytest fixtures for Agriculture Wiki and Diagnostic tests."""

import pytest
from pathlib import Path
from backend.services.wiki_service import WikiService
from backend.services.environment_service import EnvironmentService
from backend.schemas import EnvironmentalContext, PhenotypeExtraction


VALID_BLAST_MD = """---
crop: Rice
problem: Blast
type: fungal_disease
status: verified
phenotype_schema_version: 2.0
---

# Blast

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade
- leaf_collar

### Symptom Class
- discrete_lesion

### Lesion / Symptom Geometry
- Primary shape: `spindle_diamond`
- Width profile: `wider_center`
- Ends: `pointed_tapered`

### Color
- Center / primary color: pale_gray, whitish, tan
- Margin: reddish_brown, dark_brown
- Color transition: `sharp_two_tone`

### Texture
- Current texture: dry, necrotic

## Hallmark Features
- spindle_or_diamond_shape
- pale_gray_or_whitish_center
- reddish_brown_to_dark_brown_margin
- pointed_or_tapered_ends

## Negative / Exclusion Features
- uniform_parallel_streaks
- three_dimensional_smut_balls

## Differential Diagnosis
### Similar Problems
- Brown Spot
- Bacterial Leaf Streak

## Environmental Conditions
### Temperature
- 24-28°C
### Humidity
- Above 90%

## Machine-Comparison Notes

```yaml
primary_shape: spindle_diamond
width_profile: wider_center
ends: pointed_tapered
color_transition: sharp_two_tone
```
"""

VALID_BROWN_SPOT_MD = """---
crop: Rice
problem: Brown Spot
type: fungal_disease
status: verified
---

# Brown Spot

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade

### Symptom Class
- discrete_lesion

### Lesion / Symptom Geometry
- Primary shape: `oval_circular`
- Width profile: `approximately_uniform`
- Ends: `rounded_blunt`

## Hallmark Features
- oval_or_circular_spots
- dark_brown_margin

## Negative / Exclusion Features
- spindle_diamond_tapered_lesions

## Differential Diagnosis
- Blast

## Environmental Conditions
- Moderate humidity
"""


@pytest.fixture
def temp_wiki_dir(tmp_path: Path) -> Path:
    """Create a temporary mock wiki/agriculture/ directory structure."""
    wiki_dir = tmp_path / "wiki" / "agriculture"
    wiki_dir.mkdir(parents=True)

    # Rice crop
    rice_dir = wiki_dir / "Rice"
    rice_dir.mkdir()
    (rice_dir / "Blast.md").write_text(VALID_BLAST_MD, encoding="utf-8")
    (rice_dir / "Brown Spot.md").write_text(VALID_BROWN_SPOT_MD, encoding="utf-8")

    # Wheat crop
    wheat_dir = wiki_dir / "Wheat"
    wheat_dir.mkdir()
    (wheat_dir / "Rust.md").write_text(
        """---
crop: Wheat
problem: Rust
type: fungal_disease
---
# Rust
## Diagnostic Phenotype
Pustules on leaves.
## Hallmark Features
Orange-red pustules.
## Negative / Exclusion Features
Water-soaked linear streaks.
""",
        encoding="utf-8"
    )

    return wiki_dir


@pytest.fixture
def mock_wiki_service(temp_wiki_dir: Path) -> WikiService:
    """WikiService instance pointing to isolated test wiki directory."""
    return WikiService(wiki_root=temp_wiki_dir)


@pytest.fixture
def sample_environment() -> EnvironmentalContext:
    """Sample environmental observations."""
    return EnvironmentalContext(
        temperature_c=26.0,
        relative_humidity_percent=92.0,
        rainfall_last_24h_mm=15.0,
        rainfall_last_7_days_mm=72.0,
        leaf_wetness="likely",
        season="wet_season",
    )
