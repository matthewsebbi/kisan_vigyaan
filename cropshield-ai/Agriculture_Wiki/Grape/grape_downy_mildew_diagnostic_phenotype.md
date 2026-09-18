# Grape Downy Mildew

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- young_shoots
- flower_clusters
- tendrils
- developing_berries

### Symptom Class

- oily_chlorotic_lesions
- white_downy_sporulation
- tissue_necrosis_and_defoliation
- berry_shriveling

### Lesion / Symptom Geometry

- Primary shape: `translucent_oil_spot_becoming_angular_and_bounded_by_veinlets`
- Elongation: `low_to_moderate_bounded_by_veins`
- Width profile: `variable_expanding_until_limited_by_veins`
- Ends: `angular_or_coalescing`
- Discrete or continuous: `discrete_initially_coalescing_into_large_blighted_areas`

### Size

- Individual "oil spots" range from 5 mm to 30 mm, rapidly coalescing to cover major portions of the leaf surface.

### Color

- Center / primary color: translucent_yellowish_green_to_oily_brown
- Margin: pale_yellow_to_reddish_brown
- Surrounding tissue: normal_green
- Color transition: `gradual_to_abrupt_as_tissue_dies`
- Current/overall colors: oil_yellow, dark_reddish_brown, white_downy_underside, greyish_brown

### Texture

- Current texture: oily_and_slick_on_adaxial_surface_initially, dense_downy_felt_like_mats_on_abaxial_surface, brittle_and_dry_when_necrotic
- Early appearance: `translucent_water_soaked_yellowish_oil_spot_on_upper_leaf_surface`

### Pattern and Distribution

- Orientation: `random_across_lamina_bounded_by_minor_veins`
- Distribution: `scattered_oil_spots_coalescing_across_canopy`
- Coalescence: `extensive_under_favorable_humidity`
- Vein relationship: `strictly_bounded_by_veinlets_in_later_mosaic_stage`

### Spatial Location

- Primary location: `adaxial_surface_for_oil_spots_abaxial_surface_directly_opposite_for_downy_white_growth`

### Whole-Plant / Field-Level Features

- oily_yellow_foliar_spots
- white_downy_sporulation_underneath_leaves
- premature_defoliation
- destruction_of_young_flower_inflorescences
- hardened_brownish_leather_berries

## Hallmark Features

- classic_oil_spot_appearance_on_upper_surface_of_leaves
- dense_white_cottony_downy_sporulation_on_underside_of_leaves_matching_oil_spots
- white_felt_coating_on_young_clusters_causing_curling_and_death
- symptoms_heavily_triggered_by_warm_wet_weather_10_10_10_rule

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present:

- white_powdery_dusting_occurring_equally_on_top_and_bottom_of_leaves_with_musty_odor
- bird_eye_circular_cankers_with_sunken_grey_centers_and_red_borders
- deep_longitudinal_bark_fissures_exudating_amber_gum
- bright_rust_colored_pustules_on_underside_of_leaves

## Differential Diagnosis

### Similar Problems

- Grape Powdery Mildew (*Erysiphe necator*)
- Grape Anthracnose (*Elsinoë ampelina*)
- Wind/Pesticide burn
- Erinose Mite (*Colomerus vitis*) leaf galls

### Diagnostic Discriminators

- Downy mildew sporulation occurs almost exclusively on the **abaxial (lower)** surface as white downy tufts corresponding to upper oil spots, whereas Powdery Mildew sporulation occurs on **both** surfaces as an epiphytic powdery film.
- Downy mildew oil spots are translucent and oily, whereas Anthracnose produces distinct, circular, sunken lesions with dark reddish margins.
- Erinose mite damage produces raised blisters on the upper surface with dense, felty white hairs underneath, but these hairs do not rub off easily and turn rust-brown over time.

## Environmental Conditions

### Temperature

- 10°C – 28°C (Optimal around 20°C–25°C).

### Humidity

- High relative humidity (> 95% at night) required for sporangiophores to emerge through stomata.

### Rainfall / Moisture

- Requires free water (rain, overhead irrigation, heavy dew). Primary infection follows the "10-10-10 rule": $10\text{ mm}$ of rain, $10^\circ\text{C}$ temperature, over a $24\text{-hour}$ period.

### Soil

- Wet, waterlogged, poorly drained soils increase humidity in the canopy and store overwintering oospores in fallen leaf debris.

## Crop Stage

- Active growth stages: young shoot elongation, pre-bloom, flowering, and early berry set.

## Reference Images

- `grape_downy_mildew_oil_spot_01.jpg` (Translucent yellowish oil spots on upper leaf surface)
- `grape_downy_mildew_sporulation_02.jpg` (Dense white downy growth on abaxial leaf surface)

## Sources

- Compendium of Grape Diseases, Disorders, and Pests (APS Press).
- WSU Extension Diagnostic Guide: Downy vs. Powdery Mildew in Vineyards.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - young_shoots
  - flower_clusters
  - developing_berries
lesion_present: true
primary_shape: translucent_oil_spot_becoming_angular_and_bounded_by_veinlets
width_profile: variable_expanding_until_limited_by_veins
ends: angular_or_coalescing
color_transition: gradual_to_abrupt_as_tissue_dies
early_appearance: translucent_water_soaked_yellowish_oil_spot_on_upper_leaf_surface
pattern_distribution: scattered_oil_spots_coalescing_across_canopy
vein_relationship: strictly_bounded_by_veinlets_in_later_mosaic_stage
primary_location: adaxial_surface_for_oil_spots_abaxial_surface_directly_opposite_for_downy_white_growth
```