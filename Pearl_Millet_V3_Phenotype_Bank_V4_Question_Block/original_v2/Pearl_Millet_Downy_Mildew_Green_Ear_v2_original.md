# Pearl Millet Downy Mildew / Green Ear — Contrastive Phenotype v2

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade
- leaf_sheath
- panicle
- spikelet
- whole_plant

### Symptom Class
- systemic_disease
- chlorotic_leaf_symptoms
- green_ear_inflorescence

### Lesion / Symptom Geometry
- Primary shape: `none_or_indistinct_on_panicle`
- Elongation: `high_at_leaf_level`
- Width profile: `continuous_or_diffuse`
- Ends: `not_applicable_or_indistinct`
- Discrete or continuous: `continuous_or_diffuse_on_affected_leaf_tissue`

### Size
- Leaf symptoms may extend along substantial portions of the leaf blade.
- Systemically affected plants may show symptoms on multiple leaves.
- The panicle may be substantially transformed into a malformed, leafy green-ear structure.

### Color
- Leaf: `yellow_to_yellow_green`
- Surrounding tissue: green
- Green-ear structures: `green_to_pale_green`
- Downy growth, when visible: `white_to_grayish_white`

### Texture
- Leaf: `smooth, chlorotic`
- Severe leaf tissue: `dry_or_brittle`
- Fungal growth when visible: `downy_or_velvety`

### Pattern and Distribution
- Orientation: `longitudinal_on_leaf`
- Distribution: `parallel_streaks_or_continuous_chlorosis_on_leaf; malformed_panicle_on_inflorescence`
- Coalescence: `extensive_in_severe_or_systemic_cases`
- Vein relationship: `follows_leaf_axis_longitudinally_or_not_applicable`

### Spatial Location
- Primary location: `leaf_blade_and_panicle`
- Leaf symptoms: `leaf_base_or_tip_or_between_regions_depending_on_stage`
- Inflorescence symptoms: `panicle_or_spikelet`

### Whole-Plant / Field-Level Features
- stunting
- reduced_tillering
- chlorotic_or_yellowish_leaves
- systemic_infection
- malformed_panicle
- green_ear
- reduced_or_absent_normal_grain_formation
- leafy_floret_or_spikelet_structures
- delayed_or_failed_panicle_development

## Hallmark Features

- green_ear
- panicle_transformed_into_leafy_or_malformed_structure
- chlorotic_yellow_to_yellow_green_leaf_symptoms
- systemic_disease_can_affect_multiple_leaves
- reduced_or_absent_normal_grain_formation
- downy_growth_may_be_visible
- stunting_and_reduced_tillering_may_occur

## Negative / Exclusion Features

- spindle_diamond_leaf_lesions_without_green_ear
- discrete_circular_brown_leaf_spots
- typical_linear_necrotic_streaks_as_the_primary_symptom
- black_or_brown_smut_balls_replacing_grains
- normal_undistorted_panicle_with_only_isolated_leaf_spots

## Contrastive Phenotype

### Against Blast / Rust / Leaf Spots

**Strong support for Downy Mildew / Green Ear**
- malformed leafy green ear;
- diffuse or longitudinal chlorotic leaf symptoms;
- systemic whole-plant context;
- reduced/absent normal grain formation in an affected panicle.

**Strong contradiction**
- isolated discrete necrotic leaf lesions as the primary feature;
- clearly raised powdery rust pustules;
- enlarged smut balls;
- floret-associated honeydew.

### Against Smut / Ergot

- Downy Mildew transforms the panicle into a leafy or malformed green-ear structure rather than producing discrete enlarged smut balls or floret-associated honeydew/sclerotia.

## Evidence Weighting

```yaml
identity_defining:
  - green_ear
  - malformed_leafy_panicle

strong_support:
  - diffuse_longitudinal_leaf_chlorosis
  - systemic_context
  - reduced_or_absent_normal_grain_formation

weak_support:
  - stunting
  - reduced_tillering
  - downy_growth_when_visible

contradiction:
  - spindle_diamond_lesions_as_primary_feature
  - discrete_circular_leaf_spots
  - raised_powdery_pustules
  - enlarged_smut_balls
  - honeydew
```

## Uncertainty / Visibility Rules

- Chlorosis alone is insufficient; evaluate panicle morphology and whole-plant context.
- Do not infer a green ear if the panicle is not visible.
- When panicle morphology is ambiguous, retain uncertainty.

## Environmental Conditions

- Not specified in the supplied reference.

## Crop Stage

- Most important during vegetative growth through panicle development.

## Machine-Comparison Notes

```yaml
primary_location: leaf_blade_and_panicle
core_morphology: diffuse_chlorosis_plus_malformed_green_ear
identity_gate: green_ear_or_malformed_panicle_when_visible
anti_features:
  - enlarged_spore_ball
  - honeydew
  - discrete_necrotic_leaf_spots_as_primary_feature
  - raised_powdery_pustules
```
