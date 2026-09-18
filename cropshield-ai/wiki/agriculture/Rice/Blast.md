---
crop: Rice
problem: Blast
type: fungal_disease
status: structured_v2
phenotype_schema_version: 2.0
---

# Blast

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade
- leaf_collar
- node
- neck
- panicle_parts

### Symptom Class
- lesion

### Lesion / Symptom Geometry

- Primary shape: `spindle_diamond`
- Elongation: `high`
- Width profile: `wider_center`
- Ends: `pointed_tapered`
- Discrete or continuous: `discrete`

### Size
- small narrow spots to several centimetres in length

### Color

- Center / primary color: pale_gray, whitish, tan
- Margin: reddish_brown, dark_brown
- Surrounding tissue: green
- Color transition: `sharp_two_tone`
- Current/overall colors: pale_gray, whitish, tan, reddish_brown, dark_brown

### Texture

- Current texture: dry, necrotic, papery, dead_tissue
- Early appearance: `unclear`

### Pattern and Distribution

- Orientation: `longitudinal`
- Distribution: `scattered`
- Coalescence: `partial`
- Vein relationship: `not_vein_dependent`

### Spatial Location

- Primary location: `leaf_blade`

### Whole-Plant / Field-Level Features
- none specified in supplied file

## Hallmark Features
- spindle_or_diamond_shape
- pale_gray_or_whitish_center
- reddish_brown_to_dark_brown_margin
- pointed_or_tapered_ends
- scattered_leaf_blade_lesions

## Negative / Exclusion Features
These features should reduce confidence in this diagnosis when they are clearly present.
- uniform_parallel_streaks
- strictly_between_veins_streaks
- primary_sheath_patches
- three_dimensional_smut_balls
- uniform_whole_leaf_yellowing

## Differential Diagnosis

### Similar Problems
- Bacterial Leaf Blight
- Bacterial Leaf Streak
- Brown Spot
- Sheath Blight

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
- The phenotype content in this file was reorganized from the supplied `Blast.md` entry without adding unsupported disease-specific facts.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - leaf_collar
  - node
  - neck
  - panicle_parts
lesion_present: true
primary_shape: spindle_diamond
width_profile: wider_center
ends: pointed_tapered
color_transition: sharp_two_tone
early_appearance: unclear
pattern_distribution: scattered
vein_relationship: not_vein_dependent
primary_location: leaf_blade
```
