---
crop: Rice
problem: Rice Tungro
type: viral_disease
status: structured_v2
phenotype_schema_version: 2.0
---

# Rice Tungro

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade
- whole_plant

### Symptom Class
- diffuse_discoloration

### Lesion / Symptom Geometry

- Primary shape: `none_no_distinct_lesion`
- Elongation: `high_at_leaf_level`
- Width profile: `continuous`
- Ends: `not_applicable`
- Discrete or continuous: `continuous`

### Size
- can extend from leaf tip through much of leaf blade; multiple leaves may be affected

### Color

- Center / primary color: not_applicable_no_distinct_lesion
- Margin: not_applicable
- Surrounding tissue: green
- Color transition: `gradual`
- Current/overall colors: yellow, yellow_orange, bright_yellow_green

### Texture

- Current texture: smooth, weak, thin, dry_in_severe_stage, slightly_brittle_in_severe_stage
- Early appearance: `unclear`

### Pattern and Distribution

- Orientation: `longitudinal`
- Distribution: `continuous_blight`
- Coalescence: `extensive`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `leaf_tip_extending_downward`

### Whole-Plant / Field-Level Features
- stunting
- fewer_tillers
- yellow_orange_foliage
- delayed_flowering
- delayed_maturity

## Hallmark Features
- no_distinct_lesions
- continuous_yellow_to_yellow_orange_discoloration
- starts_at_leaf_tip
- spreads_downward
- whole_plant_stunting_and_reduced_tillering

## Negative / Exclusion Features
These features should reduce confidence in this diagnosis when they are clearly present.
- spindle_diamond_lesions
- circular_brown_spots
- primary_sheath_lesions
- grain_smut_balls

## Differential Diagnosis

### Similar Problems
- Khaira Disease
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
- The phenotype content in this file was reorganized from the supplied `Rice Tungro.md` entry without adding unsupported disease-specific facts.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - whole_plant
lesion_present: false
primary_shape: none_no_distinct_lesion
width_profile: continuous
ends: not_applicable
color_transition: gradual
early_appearance: unclear
pattern_distribution: continuous_blight
vein_relationship: not_applicable
primary_location: leaf_tip_extending_downward
```
