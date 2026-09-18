# Niger Seed + Wilt

## Diagnostic Phenotype

### Primary Affected Plant Parts

- whole_plant
- roots
- lower_stem
- leaves

### Symptom Class

- wilt
- loss_of_turgor
- progressive_plant_decline

### Lesion / Symptom Geometry

- Primary shape: `none_no_distinct_leaf_lesion`
- Elongation: `not_applicable`
- Width profile: `whole_plant_or_vascular`
- Ends: `not_applicable`
- Discrete or continuous: `continuous`

### Size

- wilting may begin in individual plants or portions of a plant and progress to extensive whole-plant involvement
- the available Niger disease reference does not provide a separate wilt-specific lesion size description

### Color

- Center / primary color: `not_applicable_no_distinct_leaf_lesion`
- Margin: `not_applicable`
- Surrounding tissue: green initially; foliage may yellow and dry as decline progresses
- Color transition: `gradual`
- Current/overall colors: green, pale_green, yellow, wilted_brown, dry_brown

### Texture

- Current texture: wilted, flaccid, weak, dry_in_severe_stage
- Early appearance: `loss_of_turgor`

### Pattern and Distribution

- Orientation: `whole_plant`
- Distribution: `progressive_wilt`
- Coalescence: `extensive_at_plant_level`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `whole_plant`
- Secondary locations: roots, lower_stem, leaves

### Whole-Plant / Field-Level Features

- wilting
- yellowing
- reduced_vigor
- premature_drying
- possible_plant_death
- root_or_stem_symptoms_should_be_checked_for_a_cause

## Hallmark Features

- progressive_loss_of_turgor
- whole_plant_wilting
- yellowing_or_drying_of_foliage
- absence_of_a_primary_leaf_spot_pattern
- root_and_stem_examination_is_important_for_differentiation

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- dominant_brown_or_black_leaf_spots
- white_powdery_leaf_growth
- rust_pustules
- confirmed_root_rot_as_the_primary_observed_symptom
- confirmed_collar_rot_as_the_primary_observed_symptom

## Differential Diagnosis

### Similar Problems

- Niger Seed + Root rot
- Niger Seed + Collar rot
- Niger Seed + Stem/root rot
- Niger Seed + Damping-off

### Diagnostic Discriminators

- Wilt is a symptom class rather than a sufficiently specific causal diagnosis by itself.
- Examine roots, collar, and lower stem to identify the underlying disease process.
- Distinguish generalized loss of turgor from root/stem rot accompanied by characteristic tissue discoloration.
- Do not infer a specific wilt pathogen from leaf yellowing alone.
- The reviewed ICAR-IIOR Niger disease table does not list a separate Niger wilt entry; it lists stem/root rot and other diseases. citeturn0search5
- Treat “wilt” as a phenotype label unless a causal organism has been independently established.

## Environmental Conditions

### Temperature

- Not specified for a separate Niger wilt disease in the supplied reference.

### Humidity

- Not specified for a separate Niger wilt disease in the supplied reference.

### Rainfall / Moisture

- Not specified for a separate Niger wilt disease in the supplied reference.

### Soil

- Soilborne causes should be considered when root or basal symptoms accompany wilt, but no disease-specific soil requirements are specified for a separate Niger wilt entry.

> **Source status:** The reviewed ICAR-IIOR Niger guide does not provide a separate disease entry for “wilt.” It does document stem/root rot caused by *Macrophomina phaseolina*, which can produce root and stem blackening, brittleness, and plant decline. Therefore this file treats wilt as a phenotype-level category rather than assigning an unsupported causal organism. citeturn0search5

## Crop Stage

- Not specified for a separate Niger wilt entry.
- Use crop stage only as supporting context after the underlying cause has been identified.

## Reference Images

- Not specified in supplied file.

## Sources

- ICAR-IIOR Niger production guide, disease table for Niger diseases and stem/root rot symptoms. citeturn0search5

## Machine-Comparison Notes

```yaml
plant_parts:
  - whole_plant
  - roots
  - lower_stem
  - leaves
lesion_present: false
primary_shape: none_no_distinct_leaf_lesion
width_profile: whole_plant_or_vascular
ends: not_applicable
color_transition: gradual
early_appearance: loss_of_turgor
pattern_distribution: progressive_wilt
vein_relationship: not_applicable
primary_location: whole_plant
secondary_locations:
  - roots
  - lower_stem
  - leaves
```
