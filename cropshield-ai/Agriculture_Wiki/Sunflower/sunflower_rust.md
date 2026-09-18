# Sunflower Rust

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- petiole
- stem
- bracts_of_capitulum

### Symptom Class

- pustule_pustular_lesion
- powdery_spore_mass

### Lesion / Symptom Geometry

- Primary shape: `circular_raised_pustule`
- Elongation: `none_to_minimal`
- Width profile: `pinhead_to_small_blister`
- Ends: `not_applicable`
- Discrete or continuous: `discrete_frequently_crowded`

### Size

- Individual pustules measure 0.5 mm to 2.0 mm in diameter; under high severity, hundreds of pustules cover the leaf lamina.

### Color

- Center / primary color: cinnamon_brown, rusty_reddish_brown, brownish_black_in_late_season
- Margin: chlorotic_yellow_ring
- Surrounding tissue: green_to_yellowing
- Color transition: `abrupt`
- Current/overall colors: rust_brown_urediniospores, dark_black_teliospores

### Texture

- Current texture: raised, powdery, erumpent, rough, dusty
- Early appearance: `small_flecks_pale_yellow`

### Pattern and Distribution

- Orientation: `random_non_directional`
- Distribution: `scattered_across_leaf_surface`
- Coalescence: `coalescing_under_heavy_infection`
- Vein relationship: `independent_of_veins`

### Spatial Location

- Primary location: `both_leaf_surfaces_predominantly_lower_and_middle_canopy`

### Whole-Plant / Field-Level Features

- premature_leaf_drying
- powdery_rust_dust_on_hands_clothing
- reduced_leaf_area_duration
- premature_senescence
- reduced_seed_yield_and_oil_content

## Hallmark Features

- small_raised_erumpent_pustules_releasing_cinnamon_brown_powdery_spores
- powdery_spore_dust_rubs_off_easily_on_finger
- pustules_turn_dark_brown_to_black_late_in_the_season_as_teliospores_form
- present_on_both_upper_and_lower_leaf_surfaces_and_bracts

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- smooth_flat_necrotic_spots_with_concentric_target_rings
- soft_bleached_water_soaked_stem_rot
- white_velvety_growth_strictly_on_leaf_underside
- large_girdling_black_stem_lesions_at_petiole_junction

## Differential Diagnosis

### Similar Problems

- Powdery Mildew (*Golovinomyces cichoracearum*)
- Alternaria Leaf Spot (*Alternaria helianthi*)
- Phoma Black Stem (*Phoma macdonaldii*)

### Diagnostic Discriminators

- Rust produces distinct raised, powdery pustules that rub off as rusty dust, whereas Alternaria spots are flat, non-powdery, and necrotic with concentric rings.
- Powdery mildew forms a white/grayish flour-like coating on leaves, distinct from the cinnamon-brown powdery pustules of rust.

## Environmental Conditions

### Temperature

- Optimal temperature range: 18°C to 28°C.

### Humidity

- High humidity or persistent dew periods (devising at least 2 to 4 hours of free moisture for spore germination).

### Rainfall / Moisture

- Frequent dews and light rains encourage rapid cycles of reinfection; heavy rainfall can wash spores away but supports high ambient humidity.

### Soil

- High nitrogen fertilization creates dense, susceptible plant canopies that increase humidity and microclimate wetness.

## Crop Stage

- Can infect at early growth stages, but builds up most rapidly during late vegetative (V-12), flowering (R-5), and seed development stages.

## Reference Images

- `sunflower_rust_uredinia_pustules.jpg`
- `sunflower_rust_black_telia_late_season.jpg`

## Sources

- University Extension Field Guide for Sunflower Diseases & Pest Management.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - petiole
  - stem
  - bracts_of_capitulum
lesion_present: true
primary_shape: circular_raised_pustule
width_profile: pinhead_to_small_blister
ends: not_applicable
color_transition: abrupt
early_appearance: small_flecks_pale_yellow
pattern_distribution: scattered_across_leaf_surface
vein_relationship: independent_of_veins
primary_location: both_leaf_surfaces_predominantly_lower_and_middle_canopy
```