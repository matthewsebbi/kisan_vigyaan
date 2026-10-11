# Pearl Millet Ergot — Contrastive Phenotype v2

## Diagnostic Phenotype

### Primary Affected Plant Parts
- panicle
- spikelet
- floret
- whole_plant

### Symptom Class
- floral_infection
- panicle_disease
- honeydew_exudation
- grain_replacement

### Lesion / Symptom Geometry
- Primary shape: `none_no_distinct_leaf_lesion`
- Elongation: `not_applicable` for early honeydew; `elongated` for later sclerotial structure
- Discrete or continuous: `discrete_floret_associated`

### Color
- Honeydew stage: `clear_to_pinkish_or_brownish`
- Mature sclerotial stage: `dark_brown_to_black`
- Surrounding tissue: green to normal panicle tissue

### Texture
- Honeydew stage: `sticky, viscous_or_sugary`
- Mature stage: `hard_or_firm`

### Pattern and Distribution
- Orientation: `panicle_associated`
- Distribution: `discrete_florets_or_spikelets`
- Coalescence: `localized_or_multiple_infected_florets`

### Spatial Location
- Primary location: `panicle_spikelet_floret`
- Early visible symptom: `infected_floret_exuding_honeydew`
- Later symptom: `sclerotium_replacing_or_projecting_from_floret`

### Whole-Plant / Field-Level Features
- reduced_seed_set
- infected_florets_fail_to_produce_normal_grain
- chaffiness_of_panicle
- multiple_infected_florets_per_panicle
- yield_reduction_in_severe_cases
- field_level_occurrence_may_be_patchy

## Developmental Stages

### Early / Honeydew Stage

- infected_floret
- honeydew_like_droplets
- thick_sticky_or_viscous_exudate
- clear_to_pinkish_or_brownish_honeydew

### Later / Sclerotial Stage

- honeydew may no longer be visible
- elongated_sclerotial_structure_from_infected_floret
- dark_brown_to_black_mature_sclerotium
- hard_or_firm texture

## Negative / Exclusion Features

- diffuse_leaf_yellowing_as_primary_symptom
- spindle_diamond_leaf_lesions
- circular_brown_leaf_spots
- green_ear_panicle_transformation
- discrete_large_smut_balls_enclosing_florets
- sheath_lesions_as_primary_symptom

## Contrastive Phenotype: Against Smut

**Strong support for Ergot**
- sticky honeydew;
- viscous exudate;
- clear/pinkish/brownish droplets;
- elongated sclerotial projection from an infected floret;
- hard elongated later-stage structure.

**Strong contradiction for Ergot**
- clearly enlarged ball-like spore structure;
- membrane-covered smut ball;
- ruptured ball with exposed dark spore mass.

**Weak/non-specific evidence**
- dark panicle appearance;
- grain failure;
- reduced seed set;
- chaffiness.

## Evidence Weighting

```yaml
identity_defining:
  - sticky_honeydew_when_present
  - elongated_projecting_sclerotium_in_late_stage

strong_support:
  - floret_associated_exudate
  - viscous_texture
  - hard_elongated_late_structure

weak_support:
  - reduced_seed_set
  - chaffiness
  - dark_color

contradiction:
  - enlarged_ball_like_spore_structure
  - membrane_covered_spore_ball
  - exposed_smutted_spore_mass
  - green_ear
  - diffuse_leaf_symptoms_as_primary_feature
```

## Uncertainty / Visibility Rules

- Absence of honeydew does not by itself exclude Ergot when the image may represent a later stage.
- A dark panicle alone is insufficient to separate Ergot from Smut.
- If shape is not visible, keep the Ergot/Smut decision uncertain.

## Environmental Conditions

- Moist conditions during flowering can support disease development; exact values should be verified before being used as diagnostic evidence.

## Crop Stage

- Most diagnostically important around flowering and panicle/floret development.

## Machine-Comparison Notes

```yaml
primary_location: panicle_spikelet_floret
stage_aware: true
early_identity: honeydew
late_identity: elongated_sclerotium
anti_features:
  - enlarged_ball_like_spore_structure
  - membrane_covered_smut_structure
uncertainty_features:
  - mature_stage_without_honeydew
  - structure_shape_not_visible
```
