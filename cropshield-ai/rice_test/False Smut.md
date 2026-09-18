---
crop: Rice
problem: False Smut
type: fungal_disease
status: structured_v2
phenotype_schema_version: 2.0
---

# False Smut

## Diagnostic Phenotype

### Primary Affected Plant Parts
- spikelet
- grain
- panicle

### Symptom Class
- three_dimensional_grain_symptom

### Lesion / Symptom Geometry

- Primary shape: `other`
- Elongation: `low`
- Width profile: `wider_center`
- Ends: `rounded_blunt`
- Discrete or continuous: `discrete_3d`

### Size
- few millimetres to around 1 cm or more; larger than normal grain

### Color

- Center / primary color: yellowish_orange, orange, green, black
- Margin: unclear
- Surrounding tissue: rice_grain_or_panicle_tissue
- Color transition: `gradual`
- Current/overall colors: yellowish_orange, bright_orange, greenish_yellow, dark_green, black

### Texture

- Current texture: powdery, granular, rough, compact, irregular
- Early appearance: `powdery_granular`

### Pattern and Distribution

- Orientation: `not_applicable`
- Distribution: `scattered_or_clustered_on_panicle`
- Coalescence: `none_or_partial`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `grain_on_panicle`

### Whole-Plant / Field-Level Features
- none specified in supplied file

## Hallmark Features
- three_dimensional_enlarged_grain_mass
- orange_to_greenish_black_color_progression
- powdery_or_granular_surface
- individual_grains_within_panicle_affected

## Negative / Exclusion Features
These features should reduce confidence in this diagnosis when they are clearly present.
- leaf_blade_lesions
- leaf_streaks
- primary_sheath_lesions
- diffuse_leaf_yellowing

## Differential Diagnosis

### Similar Problems
- Blast
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
- The phenotype content in this file was reorganized from the supplied `False Smut.md` entry without adding unsupported disease-specific facts.

## Machine-Comparison Notes

```yaml
plant_parts:
  - spikelet
  - grain
  - panicle
lesion_present: false
primary_shape: other
width_profile: wider_center
ends: rounded_blunt
color_transition: gradual
early_appearance: powdery_granular
pattern_distribution: scattered_or_clustered_on_panicle
vein_relationship: not_applicable
primary_location: grain_on_panicle
```
