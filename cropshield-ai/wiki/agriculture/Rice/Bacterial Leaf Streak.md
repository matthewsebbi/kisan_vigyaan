---
crop: Rice
problem: Bacterial Leaf Streak
type: bacterial_disease
status: structured_v2
phenotype_schema_version: 2.0
---

# Bacterial Leaf Streak

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade

### Symptom Class
- lesion

### Lesion / Symptom Geometry

- Primary shape: `linear_streak`
- Elongation: `high`
- Width profile: `approximately_uniform`
- Ends: `unclear`
- Discrete or continuous: `continuous`

### Size
- < few millimetres wide; several centimetres long

### Color

- Center / primary color: yellowish_green, pale_yellow
- Margin: orange_brown, reddish_brown
- Surrounding tissue: green
- Color transition: `unclear`
- Current/overall colors: yellowish_green, pale_yellow, orange_brown, reddish_brown, brown_in_severe_tissue

### Texture

- Current texture: thin, dry, necrotic
- Early appearance: `water_soaked_translucent`

### Pattern and Distribution

- Orientation: `parallel`
- Distribution: `parallel_streaks`
- Coalescence: `partial_or_extensive`
- Vein relationship: `between_veins_or_parallel_to_veins`

### Spatial Location

- Primary location: `leaf_blade`

### Whole-Plant / Field-Level Features
- none specified in supplied file

## Hallmark Features
- very_narrow_linear_streaks
- parallel_to_leaf_veins
- multiple_parallel_longitudinal_streaks
- may_merge_into_continuous_bands

## Negative / Exclusion Features
These features should reduce confidence in this diagnosis when they are clearly present.
- spindle_or_diamond_discrete_lesions
- circular_or_oval_spots
- primary_sheath_lesions
- grain_smut_balls

## Differential Diagnosis

### Similar Problems
- Bacterial Leaf Blight
- Blast
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
- The phenotype content in this file was reorganized from the supplied `Bacterial Leaf Streak.md` entry without adding unsupported disease-specific facts.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
lesion_present: true
primary_shape: linear_streak
width_profile: approximately_uniform
ends: unclear
color_transition: unclear
early_appearance: water_soaked_translucent
pattern_distribution: parallel_streaks
vein_relationship: between_veins_or_parallel_to_veins
primary_location: leaf_blade
```
