---
crop: Rice
problem: Khaira Disease
type: nutrient_deficiency
status: structured_v2
phenotype_schema_version: 2.0
---

# Khaira Disease

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade
- whole_plant

### Symptom Class
- lesion

### Lesion / Symptom Geometry

- Primary shape: `oval_circular`
- Elongation: `low_to_moderate`
- Width profile: `not_applicable`
- Ends: `rounded_blunt`
- Discrete or continuous: `discrete`

### Size
- pinpoint to several millimetres; broader patches when spots overlap

### Color

- Center / primary color: reddish_brown, dark_brown
- Margin: unclear
- Surrounding tissue: yellowish_green, pale_green, chlorotic
- Color transition: `unclear`
- Current/overall colors: yellowish_green, pale_green, reddish_brown, dark_brown, yellow, orange_brown, straw_coloured

### Texture

- Current texture: dry, necrotic, rough, thin, weak, chlorotic
- Early appearance: `dry_necrotic`

### Pattern and Distribution

- Orientation: `random_or_lengthwise_distribution`
- Distribution: `scattered`
- Coalescence: `partial`
- Vein relationship: `unclear`

### Spatial Location

- Primary location: `leaf_blade`

### Whole-Plant / Field-Level Features
- general_yellowing
- stunting_or_weakness is described implicitly by thin/weak tissue but not explicitly specified

## Hallmark Features
- numerous_brown_spots
- yellowish_green_to_pale_green_discoloration
- dense_spotting_with_general_yellowing
- mottled_yellow_brown_appearance

## Negative / Exclusion Features
These features should reduce confidence in this diagnosis when they are clearly present.
- spindle_diamond_lesions
- narrow_parallel_streaks
- primary_sheath_lesions
- three_dimensional_grain_smut

## Differential Diagnosis

### Similar Problems
- Brown Spot
- Rice Tungro
- Blast

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
- The phenotype content in this file was reorganized from the supplied `Khaira Disease.md` entry without adding unsupported disease-specific facts.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - whole_plant
lesion_present: true
primary_shape: oval_circular
width_profile: not_applicable
ends: rounded_blunt
color_transition: unclear
early_appearance: dry_necrotic
pattern_distribution: scattered
vein_relationship: unclear
primary_location: leaf_blade
```
