# Pearl Millet Blast

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

### Size
- Blast may begin as small specks or small lesions on the leaf.
- Lesions can enlarge progressively into conspicuous spindle- or diamond-shaped lesions.
- Multiple lesions may occur across individual leaves.
- Under severe disease pressure, lesions may enlarge, coalesce, and cause extensive leaf damage.

### Color
- Early lesion color: `reddish_brown_to_brown`
- Developed lesion center: `gray_to_grayish_brown`
- Developed lesion margin: `reddish_brown_to_purple_brown_to_dark_brown`
- Surrounding tissue: `green_to_yellow_chlorotic`
- Color transition: `distinct_to_gradual`
- Current/overall colors: reddish_brown, brown, gray, grayish_brown, purple_brown, yellow_chlorotic

### Texture
- Early appearance: `small_speck_or_unclear`
- Developing lesion: `necrotic`
- Advanced lesion: `dry_papery_necrotic`
- Water-soaked appearance may occur during early infection under favorable moisture conditions.

### Pattern and Distribution
- Orientation: `not_strongly_directional_early_to_longitudinal_or_diagonal_later`
- Distribution: `numerous_small_scattered_lesions`
- Coalescence: `may_coalesce_in_severe_cases`
- Density: `sparse_to_dense`
- Vein relationship: `may_cross_or_ignore_veins`

### Spatial Location
- Primary location: `leaf_blade`
- Important location: `leaf_margin_or_tip`
- Other possible location: `leaf_sheath`
- Pearl millet blast is primarily described as a foliar disease; do not automatically infer neck or panicle blast from pearl millet images without evidence.

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
- yellowish_or_chlorotic_halo_may_surround_developed_lesions
- multiple_lesions_may_occur_on_the_same_leaf
- lesions_can_coalesce_under_high_disease_pressure

## Negative / Exclusion Features
- numerous_raised_pustules_with_obvious_powdery_spore_mass_as_primary_feature
- rust_like_orange_pustular_surface_without_necrotic_lesion_development
- enlarged_smut_spore_balls
- honeydew_exudation_from_florets
- green_ear_panicle_transformation
- diffuse_discoloration_without_distinct_lesions

## Differential Diagnosis

### Similar Problems
- Pearl Millet Rust
- Pearl Millet Leaf Spots
- Downy Mildew / Green Ear
- Smut
- Ergot

### Diagnostic Discriminators
- Do not reject blast solely because an early lesion is small and reddish-brown.
- Give diagnostic weight to lesion progression from small specks to enlarging necrotic lesions.
- Developed blast lesions are often spindle- or diamond-shaped with a grayish center and darker margin.
- Distinguish blast lesions from rust by surface morphology: blast produces necrotic lesions, whereas rust is primarily characterized by raised pustules and spore masses.
- Distinguish blast from generic leaf spots by evaluating lesion development, geometry, center color, margin, and the presence of coalescing necrosis.
- Evaluate whether lesions are concentrated near leaf tips or margins when this is visible.
- Treat uncertainty in lesion stage as uncertainty rather than forcing an advanced-lesion description onto an early-stage image.

## Environmental Conditions

### Temperature
- Warm conditions can support blast development; exact thresholds should be locally verified.

### Humidity
- High humidity favors infection and disease development.

### Rainfall / Moisture
- Frequent moisture and prolonged leaf wetness can favor infection and repeated disease cycles.

### Soil
- Not specified in supplied reference.

## Crop Stage
- Blast can occur during vegetative growth.
- Foliar symptoms may become more severe as susceptible foliage remains exposed to favorable infection conditions.

## Reference Image Notes
- The supplied reference image is labeled as Pearl Millet Blast.
- The visible image represents an appearance in which numerous small reddish-brown lesions/specks are distributed across the leaf.
- This should be treated as a valid blast presentation rather than automatically classified as rust.
- The phenotype therefore includes both early small lesions and the later spindle/diamond-shaped necrotic lesion stage.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - leaf_sheath
  - whole_plant

lesion_present: true
primary_symptom_type: foliar_blast
primary_shape: small_oval_to_rounded_early_spindle_diamond_later
elongation: low_early_to_high_later
width_profile: uniform_early_to_wider_at_center_later
ends: rounded_early_to_pointed_tapered_later
elevation: flat_or_slightly_raised
surface_texture: necrotic_dry_in_developed_lesions
primary_color: reddish_brown_to_brown
developed_center_color: gray_to_grayish_brown
developed_margin_color: reddish_brown_to_purple_brown
surrounding_tissue: green_to_yellow_chlorotic
color_transition: distinct_to_gradual
pattern_distribution: numerous_scattered_to_dense
coalescence: may_coalesce_in_severe_cases
vein_relationship: may_cross_or_ignore_veins
primary_location: leaf_blade
common_position: leaf_tip_or_leaf_margin
```

## Image-Comparison Priority

When comparing a user-supplied crop image against this phenotype, prioritize:

1. Presence of multiple distinct reddish-brown or grayish lesions/specks.
2. Evidence of necrotic lesion development rather than a purely raised pustule.
3. Lesion progression or shape consistent with blast when lesion maturity is visible.
4. Grayish center and darker reddish-brown margin in developed lesions.
5. Yellowish/chlorotic tissue surrounding some developed lesions.
6. Dense or scattered distribution of lesions across the leaf.
7. Do not require every image to show fully developed spindle/diamond lesions; early blast can appear as small specks/lesions.
8. Do not classify as rust merely because the lesions are orange/reddish-brown; surface elevation and pustule/spore-mass evidence must also be considered.
