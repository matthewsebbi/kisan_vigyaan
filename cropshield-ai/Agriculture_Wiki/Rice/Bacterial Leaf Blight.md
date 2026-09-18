---
crop: Rice
problem: Bacterial Leaf Blight
type: bacterial_disease
status: structured_v2
phenotype_schema_version: 2.0
---

# Bacterial Leaf Blight

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade

### Symptom Class
- lesion

### Lesion / Symptom Geometry

- Primary shape: `linear_streak`
- Elongation: `high`
- Width profile: `variable_narrow_to_several_mm`
- Ends: `irregular`
- Discrete or continuous: `continuous_or_coalescing`

### Size
- few centimetres to much of leaf length; width very narrow to several mm

### Color

- Center / primary color: pale_yellow, yellowish_white, light_brown
- Margin: unclear, yellowish_transition
- Surrounding tissue: green
- Color transition: `gradual`
- Current/overall colors: pale_yellow, yellowish_white, light_brown, straw_coloured, brown

### Texture

- Current texture: water_soaked_initially, dry, thin, necrotic
- Early appearance: `water_soaked_translucent`

### Pattern and Distribution

- Orientation: `longitudinal`
- Distribution: `continuous_blight`
- Coalescence: `extensive`
- Vein relationship: `follows_leaf_veins_or_leaf_axis`

### Spatial Location

- Primary location: `leaf_tip_or_margin_progressing_downward`

### Whole-Plant / Field-Level Features
- not explicitly specified in supplied file

## Hallmark Features
- water_soaked_initial_stage
- long_narrow_linear_streaks
- leaf_tip_or_margin_origin
- downward_progression
- multiple_streaks_merge_into_larger_blighted_areas
- moist_looking_exudate_or_deposits_may_be_visible

## Negative / Exclusion Features
These features should reduce confidence in this diagnosis when they are clearly present.
- spindle_diamond_discrete_lesions
- small_circular_oval_spots
- primary_sheath_lesions
- grain_smut_balls
- uniform_yellowing_without_blight_streaks

## Differential Diagnosis

### Similar Problems
- Bacterial Leaf Streak
- Blast
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
- The phenotype content in this file was reorganized from the supplied `Bacterial Leaf Blight.md` entry without adding unsupported disease-specific facts.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
lesion_present: true
primary_shape: linear_streak
width_profile: variable_narrow_to_several_mm
ends: irregular
color_transition: gradual
early_appearance: water_soaked_translucent
pattern_distribution: continuous_blight
vein_relationship: follows_leaf_veins_or_leaf_axis
primary_location: leaf_tip_or_margin_progressing_downward
```
