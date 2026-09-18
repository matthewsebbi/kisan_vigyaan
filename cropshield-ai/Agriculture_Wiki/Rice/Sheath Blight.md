---
crop: Rice
problem: Sheath Blight
type: fungal_disease
status: structured_v2
phenotype_schema_version: 2.0
---

# Sheath Blight

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_sheath
- lower_leaf_surfaces
- leaf_blade_in_severe_spread

### Symptom Class
- lesion

### Lesion / Symptom Geometry

- Primary shape: `oval_circular`
- Elongation: `moderate_to_high`
- Width profile: `wider_center_or_irregular`
- Ends: `irregular`
- Discrete or continuous: `discrete`

### Size
- small patches to several centimetres

### Color

- Center / primary color: greenish_gray, pale_brown, white
- Margin: reddish_brown, dark_brown
- Surrounding tissue: green
- Color transition: `sharp_two_tone`
- Current/overall colors: greenish_gray, pale_brown, white, reddish_brown, dark_brown, brown, straw_coloured

### Texture

- Current texture: dry, necrotic, rough, bleached, tissue_breakdown
- Early appearance: `unclear`

### Pattern and Distribution

- Orientation: `along_sheath`
- Distribution: `coalescing`
- Coalescence: `extensive`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `leaf_sheath_near_plant_base`

### Whole-Plant / Field-Level Features
- multiple_sheaths_and_leaves_can_become_blighted
- dry_and_straw_coloured_tissue

## Hallmark Features
- primary_leaf_sheath_location
- greenish_gray_to_pale_center
- reddish_brown_to_dark_margin
- elongated_or_irregular_patches
- enlargement_and_merging
- upward_spread

## Negative / Exclusion Features
These features should reduce confidence in this diagnosis when they are clearly present.
- isolated_spindle_diamond_leaf_blade_lesions
- very_narrow_parallel_streaks
- small_scattered_round_spots
- grain_smut_balls
- uniform_yellowing_without_lesions

## Differential Diagnosis

### Similar Problems
- Blast
- Bacterial Leaf Blight
- Brown Spot

### Diagnostic Discriminators
- Compare the affected plant part before interpreting lesion color.
- Compare lesion geometry before treating an elongated symptom as a streak.
- Compare center-to-margin color relationships rather than color words in isolation.
- Distinguish discrete lesions from continuous or coalescing blight.
- Treat uncertainty in plant-part identification or vein relationship as uncertainty, not as a fact.

## Environmental Conditions

### Temperature
- Not specified in supplied file

### Humidity
- Not specified in supplied file

### Rainfall / Moisture
- Not specified in supplied file

### Soil
- Not specified in supplied file

> **Source status:** The supplied Markdown file did not provide specific environmental values; no values have been invented here. Populate these fields with verified climate/soil evidence before using them as diagnostic evidence.

## Crop Stage
- Not specified in supplied file.

## Reference Images
- Not specified in supplied file.

## Sources
- The phenotype content in this file was reorganized from the supplied `Sheath Blight.md` entry without adding unsupported disease-specific facts.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_sheath
  - lower_leaf_surfaces
  - leaf_blade_in_severe_spread
lesion_present: true
primary_shape: oval_circular
width_profile: wider_center_or_irregular
ends: irregular
color_transition: sharp_two_tone
early_appearance: unclear
pattern_distribution: coalescing
vein_relationship: not_applicable
primary_location: leaf_sheath_near_plant_base
```
