# Pearl Millet Smut — Contrastive Phenotype v2

## Diagnostic Phenotype

### Primary Affected Plant Parts
- panicle
- spikelet
- floret
- earhead
- whole_plant

### Symptom Class
- grain_or_floret_smut
- panicle_transformation
- fungal_spore_structure

### Lesion / Symptom Geometry
- Primary shape: `spore_ball_or_smut_structure`
- Elongation: `variable`
- Width profile: `localized_expansion`
- Ends: `rounded_or_not_applicable`
- Discrete or continuous: `discrete_floret_associated_or_partial_panicle`

### Size
- Smut structures may occur between the glumes of individual florets.
- Spore balls can enlarge substantially relative to normal grain.
- Affected florets may become visibly enlarged, distorted, or replaced by fungal structures.
- Multiple affected florets can produce patchy or partially smutted panicles.

### Color
- Early/developing: `yellow_to_orange_to_yellowish_green`
- Mature: `greenish_black_to_dark_spore_mass`
- Surrounding tissue: green to normal panicle tissue

### Texture
- Early: `membrane_covered`
- Developing: `smooth_or_velvety`, then membrane rupture
- Mature: `powdery_or_spore_releasing_after_membrane_breaks`

### Pattern and Distribution
- Orientation: `panicle_associated`
- Distribution: `discrete_florets_or_spikelets`
- Coalescence: `localized_or_multiple_florets`

### Spatial Location
- Primary location: `panicle_spikelet_floret`
- Initial: `enlarged_smut_ball_between_glumes`
- Later: `membrane_breaking_and_spore_mass_exposure`

### Whole-Plant / Field-Level Features
- chaffiness_of_panicle
- sterile_affected_florets
- reduced_seed_set
- partial_or_extensive_panicle_infection
- yield_reduction_in_severe_cases
- sporadic_field_distribution

## Hallmark Features

- enlarged_spore_balls_between_glumes
- spore_ball_encloses_floral_parts
- initially_smooth_or_velvety_structure
- membrane_covered_early_structure
- membrane_bursts_as_structure_matures
- exposed_dark_spore_mass_at_maturity
- affected_florets_remain_sterile
- chaffy_panicle
- discrete_fungal_structures_on_panicle

## Negative / Exclusion Features

- honeydew_like_sticky_exudate_as_primary_symptom
- green_ear_with_leafy_spikelets
- diffuse_leaf_yellowing_as_primary_symptom
- spindle_diamond_leaf_lesions
- circular_brown_leaf_spots
- elongated_sclerotia_projecting_from_florets_without_spore_ball_formation

## Contrastive Phenotype: Against Ergot

**Strong support for Smut**
- enlarged ball-like structure;
- localized rounded expansion;
- membrane-covered structure;
- membrane rupture;
- exposed spore mass.

**Strong contradiction for Smut**
- sticky honeydew;
- viscous exudate;
- elongated sclerotial projection without ball formation.

**Weak/non-specific evidence**
- dark panicle;
- grain/floret failure;
- reduced seed set;
- chaffiness.

## Evidence Weighting

```yaml
identity_defining:
  - enlarged_ball_like_structure
  - membrane_covered_or_ruptured_spore_ball

strong_support:
  - spore_mass_exposure
  - localized_floret_expansion
  - floral_parts_enclosed_or_replaced

weak_support:
  - dark_color
  - sterile_florets
  - reduced_seed_set
  - chaffiness

contradiction:
  - sticky_honeydew
  - viscous_exudate
  - elongated_projecting_sclerotium_without_ball
  - green_ear
```

## Uncertainty / Visibility Rules

- Do not infer Smut from dark coloration alone.
- When a panicle is dark but the structure type cannot be resolved, keep Smut vs Ergot uncertain.
- Ball-like geometry is more informative than color.

## Environmental Conditions

- Not specified in the supplied reference.

## Crop Stage

- Most diagnostically important during panicle, spikelet, and grain/floret development.

## Machine-Comparison Notes

```yaml
primary_location: panicle_spikelet_floret
core_morphology: enlarged_spore_ball
stage_aware: true
high_value_features:
  - rounded_localized_expansion
  - membrane
  - exposed_spores
anti_features:
  - honeydew
  - elongated_sclerotium_without_ball
  - green_ear
uncertainty_features:
  - structure_shape_not_visible
  - mature_stage_uncertain
```
