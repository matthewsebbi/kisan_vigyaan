# Sunflower Alternaria Blight / Leaf Spot

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- petiole
- stem
- sepals_and_back_of_head

### Symptom Class

- necrotic_spot
- target_board_lesion
- foliar_blight

### Lesion / Symptom Geometry

- Primary shape: `circular_to_angular_irregular`
- Elongation: `low_to_moderate`
- Width profile: `expanding_concentric`
- Ends: `variable`
- Discrete or continuous: `discrete_becoming_coalescent`

### Size

- Individual spots range from 2 mm to 15 mm in diameter, coalescing into large blighted necrotic areas covering over 50% of the leaf blade.

### Color

- Center / primary color: dark_brown, blackish_brown
- Margin: dark_brown_to_black
- Surrounding tissue: prominent_yellow_chlorotic_halo
- Color transition: `abrupt`
- Current/overall colors: dark_brown, grayish_brown, yellow, dark_black_streaks_on_stem

### Texture

- Current texture: dry, brittle, papery, necrotic
- Early appearance: `small_water_soaked_brown_pinpoint`

### Pattern and Distribution

- Orientation: `random_to_vein_delimited`
- Distribution: `scattered_coalescing`
- Coalescence: `extensive_under_severe_disease`
- Vein relationship: `partially_restricted_by_veins`

### Spatial Location

- Primary location: `lower_canopy_leaves_progressing_upward`

### Whole-Plant / Field-Level Features

- premature_defoliation
- dark_narrow_flecks_and_streaks_on_stem
- premature_senescence
- reduced_head_size_and_seed_filling

## Hallmark Features

- circular_dark_brown_to_black_necrotic_spots_with_yellow_halos
- concentric_rings_target_board_pattern_in_larger_spots
- dark_elongated_flecks_or_sunken_stripes_on_petioles_and_stems
- leaf_blighting_and_upward_progression_from_bottom_leaves

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- white_powdery_spore_masses_on_leaf_underside
- reddish_brown_raised_erumpent_pustules
- bleached_straw_colored_stem_girdling_with_cottony_mycelium
- systemic_dwarfing_with_chlorotic_bands_along_midrib

## Differential Diagnosis

### Similar Problems

- Septoria Leaf Spot (*Septoria helianthi*)
- Xanthomonas Bacterial Blight (*Xanthomonas axeonopodis pv. helianthi*)
- Phoma Black Stem (*Phoma macdonaldii*)

### Diagnostic Discriminators

- Alternaria lesions feature distinct dark concentric rings (target-board appearance) and dark flecks on stems, unlike Septoria which forms lighter tan spots with tiny black pycnidia.
- Bacterial leaf spot lesions often have a water-soaked, translucent appearance when held to light, lacking concentric rings.

## Environmental Conditions

### Temperature

- Optimal temperature range: 25°C to 30°C (warm conditions).

### Humidity

- Relative humidity above 85-90% or extended leaf wetness (> 6 hours).

### Rainfall / Moisture

- Frequent rainfall, heavy dew, or overhead sprinklers facilitate spore splashing and canopy spread.

### Soil

- Soil conditions do not directly affect foliar infection, but nutrient-deficient plants (especially nitrogen/potassium) show higher susceptibility.

## Crop Stage

- Plants are susceptible at all stages, but disease progression accelerates significantly from flowering (R-1) to seed fill and maturity stages.

## Reference Images

- `alternaria_leaf_spot_target_rings.jpg`
- `alternaria_stem_flecks_sunflower.jpg`

## Sources

- Compendium of Sunflower Diseases and Pests; American Phytopathological Society (APS).

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - petiole
  - stem
  - sepals_and_back_of_head
lesion_present: true
primary_shape: circular_to_angular_irregular
width_profile: expanding_concentric
ends: variable
color_transition: abrupt
early_appearance: small_water_soaked_brown_pinpoint
pattern_distribution: scattered_coalescing
vein_relationship: partially_restricted_by_veins
primary_location: lower_canopy_leaves_progressing_upward
```