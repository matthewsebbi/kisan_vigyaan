# Cashew Leaf Spot

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- young_foliage
- mature_leaves

### Symptom Class

- discrete_necrotic_spots
- angular_or_circular_lesions

### Lesion / Symptom Geometry

- Primary shape: `circular_to_angular`
- Elongation: `low_isodiametric`
- Width profile: `uniform`
- Ends: `rounded_or_bounded_by_veins`
- Discrete or continuous: `discrete`

### Size

- Individual spots measure 1 mm to 5 mm in diameter, occasionally coalescing up to 10–15 mm.

### Color

- Center / primary color: tan_to_greyish_white
- Margin: dark_reddish_brown_to_purplish_halo
- Surrounding tissue: normal_green_or_slight_chlorotic_halo
- Color transition: `sharp_and_well_defined`
- Current/overall colors: tan, grey, dark_brown, purple_red

### Texture

- Current texture: dry, brittle, papery_center, thin
- Early appearance: `small_water_soaked_pinpoint_punctate_spots`

### Pattern and Distribution

- Orientation: `random_across_laminar_surface`
- Distribution: `scattered_discrete_spots`
- Coalescence: `limited_to_moderate`
- Vein relationship: `partially_bounded_by_minor_veins`

### Spatial Location

- Primary location: `adaxial_and_abaxial_leaf_blade_surface`

### Whole-Plant / Field-Level Features

- peppered_leaf_spotting
- localized_premature_foliar_abscission
- shot_hole_appearance_when_dead_centers_fall_out
- minor_canopy_density_reduction

## Hallmark Features

- small_discrete_circular_to_angular_lesions
- pale_tan_or_grey_centers_with_distinct_dark_reddish_purple_margins
- papery_brittle_center_susceptible_to_shot_hole_dropouts
- spots_remain_confined_and_do_not_cause_rapid_total_leaf_collapse

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present:

- continuous_leaf_tip_blighting_covering_entire_lamina
- amber_gum_exudation_on_main_stem
- powdery_white_epiphytic_mold_coating
- water_soaked_blacks_covering_whole_inflorescence

## Differential Diagnosis

### Similar Problems

- Septoria leaf spot
- Pestalotiopsis leaf spot
- Early stage Anthracnose leaf infection
- Algal leaf spot (*Cephaleuros virescens*)

### Diagnostic Discriminators

- Leaf spot lesions remain small, discrete, and defined with pale centers and purple borders, unlike Anthracnose which rapidly expands into dark irregular blights.
- Algal leaf spot presents raised, velvety, orange-to-rust-colored circular mats, whereas fungal leaf spot is papery and necrotic.
- Pestalotiopsis spots frequently exhibit tiny black pycnidia dots scattered within concentric rings inside the grey center.

## Environmental Conditions

### Temperature

- 22°C – 30°C optimal for foliar spore germination.

### Humidity

- High relative humidity (> 85%) during leaf expansion.

### Rainfall / Moisture

- Frequent rain splashes and prolonged leaf wetness (dew) are critical for conidial dispersal and primary infection.

### Soil

- Neutral to acidic soil; nutrient stress (e.g., potassium deficiency) can heighten plant susceptibility.

## Crop Stage

- Young leaf flush stage, vegetative flush, transition to flowering.

## Reference Images

- `cashew_leaf_spot_lesions_01.jpg` (Scattered circular spots with reddish margins on leaves)
- `cashew_leaf_spot_shot_hole_02.jpg` (Papery centers dropping out forming shot-hole phenotype)

## Sources

- Tropical Plant Pathology Manual: Foliar Pathogens of *Anacardium occidentale*.
- Compendium of Tree Nut Diseases (*Pseudocercospora* / *Pestalotiopsis* Folia).

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - young_foliage
  - mature_leaves
lesion_present: true
primary_shape: circular_to_angular
width_profile: uniform
ends: rounded_or_bounded_by_veins
color_transition: sharp_and_well_defined
early_appearance: small_water_soaked_pinpoint_punctate_spots
pattern_distribution: scattered_discrete_spots
vein_relationship: partially_bounded_by_minor_veins
primary_location: adaxial_and_abaxial_leaf_blade_surface
```