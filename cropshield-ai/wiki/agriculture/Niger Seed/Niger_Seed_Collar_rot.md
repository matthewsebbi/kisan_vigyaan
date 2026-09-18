# Niger Seed + Collar rot

## Diagnostic Phenotype

### Primary Affected Plant Parts

- collar
- crown
- lower_stem
- roots
- whole_plant

### Symptom Class

- collar_rot
- basal_tissue_decay
- wilt_and_dieback

### Lesion / Symptom Geometry

- Primary shape: `irregular_basal_lesion`
- Elongation: `low_to_moderate`
- Width profile: `localized_around_collar`
- Ends: `irregular`
- Discrete or continuous: `discrete_to_coalescing`

### Size

- lesion size and progression are not specifically documented in the supplied Niger disease reference
- when collar rot is suspected, inspect the collar/crown region for localized basal tissue damage

### Color

- Center / primary color: `brown_to_dark_brown`
- Margin: `brown`
- Surrounding tissue: green initially; affected plants may later yellow and dry
- Color transition: `gradual`
- Current/overall colors: brown, dark_brown, yellow, dry_brown

### Texture

- Current texture: rotted_or_weakened_basal_tissue
- Early appearance: `basal_discoloration_or_localized_collar_damage`

### Pattern and Distribution

- Orientation: `around_collar`
- Distribution: `localized_basal_rot`
- Coalescence: `not_specified`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `collar_at_or_near_soil_line`
- Secondary locations: crown, lower_stem, roots, whole_plant

### Whole-Plant / Field-Level Features

- wilting
- yellowing
- reduced_vigor
- dieback
- possible_plant_death_in_severe_cases

## Hallmark Features

- primary_symptom_centered_on_collar_or_crown
- localized_basal_tissue_decay
- wilting_above_affected_tissue
- progressive_loss_of_vigor
- collar_rot_should_be_confirmed_by_examining_the_soil_line_region

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- primary_leaf_spots_without_basal_tissue_involvement
- powdery_white_surface_growth
- rust_pustules
- generalized_wilt_without_any_examined_basal_symptom
- black_sclerotia_and_brittle_roots_as_the_dominant_documented_pattern

## Differential Diagnosis

### Similar Problems

- Niger Seed + Root rot
- Niger Seed + Wilt
- Niger Seed + Stem/root rot
- Niger Seed + Damping-off

### Diagnostic Discriminators

- Compare the affected plant part before interpreting color.
- A collar-centered lesion should be distinguished from root-only symptoms.
- Distinguish external basal tissue decay from internal vascular discoloration.
- Examine the soil-line region directly when possible.
- Do not treat generalized wilting as evidence of collar rot without supporting basal symptoms.
- The available ICAR-IIOR Niger reference documents stem/root rot rather than a separately characterized Niger collar-rot phenotype; this distinction should be preserved in dataset labeling. citeturn0search5

## Environmental Conditions

### Temperature

- Not specified in the supplied Niger reference.

### Humidity

- Not specified in the supplied Niger reference.

### Rainfall / Moisture

- Not specified for a separate Niger collar-rot disease entry.

### Soil

- The collar/crown is a soil-line region, but disease-specific soil requirements are not specified.

> **Source status:** A separate collar-rot phenotype for Niger was not specified in the ICAR-IIOR disease table reviewed here. Do not use the generic collar-rot fields above as quantitative diagnostic evidence without disease-specific verification. The ICAR-IIOR reference instead lists stem/root rot caused by *Macrophomina phaseolina*. citeturn0search5

## Crop Stage

- Not specified for a separate Niger collar-rot entry.

## Reference Images

- Not specified in supplied file.

## Sources

- ICAR-IIOR Niger production guide, disease table listing Niger stem/root rot and its symptoms. citeturn0search5

## Machine-Comparison Notes

```yaml
plant_parts:
  - collar
  - crown
  - lower_stem
  - roots
  - whole_plant
lesion_present: true
primary_shape: irregular_basal_lesion
width_profile: localized_around_collar
ends: irregular
color_transition: gradual
early_appearance: basal_discoloration_or_localized_collar_damage
pattern_distribution: localized_basal_rot
vein_relationship: not_applicable
primary_location: collar_at_or_near_soil_line
secondary_locations:
  - crown
  - lower_stem
  - roots
  - whole_plant
```
