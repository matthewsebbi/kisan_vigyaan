# Pearl Millet Blast — Contrastive Phenotype v2

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade
- leaf_sheath
- whole_plant

### Symptom Class
- necrotic_lesion
- leaf_blast
- early_blast_speck
- foliar_blast

### Lesion / Symptom Geometry
- Primary shape: `small_oval_to_rounded_early; spindle_diamond_as_lesions_enlarge`
- Elongation: `low_early_to_high_later`
- Width profile: `approximately_uniform_early_to_wider_at_center_later`
- Ends: `rounded_or_irregular_early_to_pointed_tapered_later`
- Discrete or continuous: `discrete_scattered_to_coalescing`
- Surface morphology: `flat_or_slightly_raised_early_to_dry_necrotic`

### Color
- Early lesion color: `reddish_brown_to_brown`
- Developed lesion center: `gray_to_grayish_brown`
- Developed lesion margin: `reddish_brown_to_purple_brown_to_dark_brown`
- Surrounding tissue: `green_to_yellow_chlorotic`
- Color transition: `distinct_to_gradual`

### Texture
- Early appearance: `small_speck_or_unclear`
- Developing lesion: `necrotic`
- Advanced lesion: `dry_papery_necrotic`
- Water-soaked appearance may occur during early infection under favorable moisture conditions.

### Pattern and Distribution
- Orientation: `not_strongly_directional_early_to_longitudinal_or_diagonal_later`
- Distribution: `numerous_small_scattered_lesions`
- Coalescence: `may_coalesce_in_severe_cases`
- Vein relationship: `may_cross_or_ignore_veins`

### Spatial Location
- Primary location: `leaf_blade`
- Important location: `leaf_margin_or_tip`
- Other possible location: `leaf_sheath`

### Whole-Plant / Field-Level Features
- increasing_number_of_leaf_lesions
- extensive_leaf_chlorosis_in_severe_cases
- premature_leaf_drying
- reduced_photosynthetic_area
- severe_leaf_damage
- reduced_plant_vigor_in_severe_cases

## Hallmark Features

- blast_may_begin_as_small_reddish_brown_or_grayish_specks
- lesions_progressively_enlarge
- mature_lesions_can_be_spindle_or_diamond_shaped
- gray_or_grayish_center_in_developed_lesions
- reddish_brown_to_dark_margin
- yellowish_or_chlorotic_halo_may_surround_lesions
- multiple_lesions_may_occur_on_same_leaf
- lesions_can_coalesce_under_high_disease_pressure

## Negative / Exclusion Features

- numerous_raised_pustules_with_obvious_powdery_spore_mass_as_primary_feature
- rust_like_orange_pustular_surface_without_necrotic_lesion_development
- enlarged_smut_spore_balls
- honeydew_exudation_from_florets
- green_ear_panicle_transformation
- diffuse_discoloration_without_distinct_lesions

## Contrastive Phenotype

### Against Rust

**Strong support for Blast**
- flat_or_slightly_raised necrotic lesion;
- gray/grayish developed center;
- spindle/diamond lesion development when visible;
- dry papery necrosis;
- lesion enlargement/coalescence.

**Strong contradiction for Blast**
- clearly raised pustule;
- powdery/pustular surface;
- obvious spore mass as the primary visible structure.

**Weak/non-specific evidence**
- reddish_brown color;
- multiple lesions.

### Against Leaf Spots

**Strong support for Blast**
- spindle_or_diamond geometry when developed;
- progression from small specks to larger necrotic lesions;
- gray center with darker margin;
- characteristic coalescing necrosis.

**Evidence that is not sufficient by itself**
- circular/oval spots;
- brown or reddish-brown color;
- multiple leaf lesions.

## Evidence Weighting

```yaml
identity_defining:
  - spindle_or_diamond_developed_lesion
  - grayish_necrotic_center_in_developed_lesion

strong_support:
  - necrotic_lesion
  - lesion_progression
  - dry_papery_necrosis
  - coalescing_necrosis

weak_support:
  - reddish_brown_color
  - multiple_leaf_lesions

contradiction:
  - clearly_raised_powdery_pustule
  - exposed_spore_mass_as_primary_surface
  - smut_ball
  - honeydew
  - green_ear_transformation
```

## Uncertainty / Visibility Rules

- Do not require mature spindle/diamond geometry when the image appears to show an early stage.
- Do not infer a raised lesion when surface elevation is not visible.
- If color is visible but morphology is not, retain a high-uncertainty state rather than forcing Blast.

## Environmental Conditions

- Warm conditions can support Blast development; exact thresholds should be locally verified.
- High humidity favors infection and disease development.
- Frequent moisture and prolonged leaf wetness can favor infection and repeated disease cycles.

## Crop Stage

- Blast can occur during vegetative growth.
- Foliar symptoms may become more severe as susceptible foliage remains exposed to favorable infection conditions.

## Machine-Comparison Notes

```yaml
primary_location: leaf_blade
primary_symptom: foliar_blast
core_morphology: necrotic_lesion
high_value_features:
  - lesion_progression
  - spindle_diamond_when_developed
  - gray_center
  - dark_margin
  - dry_necrosis
anti_features:
  - clearly_raised_powdery_pustule
  - obvious_spore_mass
  - honeydew
  - green_ear
uncertainty_features:
  - surface_elevation_not_visible
  - lesion_stage_uncertain
```
