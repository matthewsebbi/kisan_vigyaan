---
crop: Rice
problem: Brown Spot
type: fungal_disease
status: structured_v2
phenotype_schema_version: 2.0
---

# Brown Spot

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade
- leaf_surface

### Symptom Class
- lesion

### Lesion / Symptom Geometry

- Primary shape: `oval_circular`
- Elongation: `low_to_moderate`
- Width profile: `wider_center_or_uniform`
- Ends: `rounded_blunt`
- Discrete or continuous: `discrete`

### Size
- pinpoint to a few millimetres; some larger oval lesions

### Color

- Center / primary color: dark_brown, reddish_brown, almost_black_when_mature
- Margin: well_defined, yellowish_or_light_brown_surrounding
- Surrounding tissue: yellowish, light_brown, green
- Color transition: `gradual`
- Current/overall colors: dark_brown, reddish_brown, black_mature_center, yellowish, light_brown

### Texture

- Current texture: dry, necrotic, slightly_rough
- Early appearance: `dry_necrotic`

### Pattern and Distribution

- Orientation: `random`
- Distribution: `scattered`
- Coalescence: `partial`
- Vein relationship: `not_vein_dependent`

### Spatial Location

- Primary location: `leaf_surface`

### Whole-Plant / Field-Level Features
- none specified in supplied file

## Hallmark Features
- small_circular_to_oval_spots
- dark_brown_to_reddish_brown_color
- darker_center
- scattered_irregular_distribution
- not_restricted_to_margins_or_veins

## Negative / Exclusion Features
These features should reduce confidence in this diagnosis when they are clearly present.
- spindle_diamond_pointed_lesions
- very_narrow_parallel_streaks
- primary_sheath_patches
- three_dimensional_smut_balls
- uniform_leaf_yellowing_without_spots

## Differential Diagnosis

### Similar Problems
- Blast
- Khaira Disease
- Bacterial Leaf Streak

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
- The phenotype content in this file was reorganized from the supplied `Brown Spot.md` entry without adding unsupported disease-specific facts.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - leaf_surface
lesion_present: true
primary_shape: oval_circular
width_profile: wider_center_or_uniform
ends: rounded_blunt
color_transition: gradual
early_appearance: dry_necrotic
pattern_distribution: scattered
vein_relationship: not_vein_dependent
primary_location: leaf_surface
```
