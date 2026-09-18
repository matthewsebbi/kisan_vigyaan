# Cotton Anthracnose

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- stem
- boll
- seedling

### Symptom Class

- circular_sunken_lesion
- seedling_damping_off
- boll_rot

### Lesion / Symptom Geometry

- Primary shape: `circular_to_subcircular_sunken_spots`
- Elongation: `low_to_moderate`
- Width profile: `regular_concentric`
- Ends: `rounded`
- Discrete or continuous: `discrete_to_coalescing`

### Size

- Foliar and stem spots: 2 mm to 8 mm in diameter
- Boll lesions: 5 mm to over 15 mm, often covering large portions of the boll

### Color

- Center / primary color: reddish_brown_to_black_with_pinkish_spore_masses
- Margin: dark_red_to_purplish_brown
- Surrounding tissue: pale_green_to_yellowish
- Color transition: `distinct`
- Current/overall colors: red, reddish_brown, dark_brown, black, pink

### Texture

- Current texture: sunken, dry, leathery, covered_with_slimy_pink_mucilaginous_spores
- Early appearance: `small_reddish_or_purplish_water_soaked_spots`

### Pattern and Distribution

- Orientation: `random`
- Distribution: `scattered_on_leaves_stems_and_bolls`
- Coalescence: `moderate`
- Vein relationship: `crosses_veins`

### Spatial Location

- Primary location: `seedling_hypocotyl_leaf_blades_and_developing_bolls`

### Whole-Plant / Field-Level Features

- seedling_damping_off_and_collar_rot
- reddish_cankers_girdling_young_stems
- premature_boll_drying_and_shriveling
- unopening_lint_matted_and_discolored_pink
- reduced_lint_yield_and_seed_quality

## Hallmark Features

- circular_sunken_reddish_brown_lesions_on_bolls
- salmon_pink_slimy_spore_masses_in_center_of_mature_lesions
- seedling_collar_rot_with_reddish_brown_cankers

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- angular_vein_bound_water_soaked_leaf_lesions
- enations_and_thickened_leaf_veins
- vascular_ring_browning_without_boll_lesions
- total_bark_shredding_at_root_zone

## Differential Diagnosis

### Similar Problems

- Bacterial Blight (Boll Rot phase)
- Alternaria Leaf Spot
- Ascochyta Blight

### Diagnostic Discriminators

- Anthracnose lesions produce distinct salmon-pink mucilaginous spore masses under humid conditions, which are absent in Bacterial Blight.
- Anthracnose boll spots are typically circular and sunken, unlike the dark angular/irregular water-soaked lesions of Bacterial Blight.

## Environmental Conditions

### Temperature

- 25°C - 30°C

### Humidity

- Very high relative humidity (>85%)

### Rainfall / Moisture

- Frequent rainfall, heavy dew, and splashing water promote spore release and spread.

### Soil

- Poorly drained, moist soils favor seedling damp-off phase.

## Crop Stage

- Seedling stage (damping off) and boll formation to maturation stage

## Reference Images

- `cotton_anthracnose_boll_lesion.jpg`
- `cotton_anthracnose_seedling_canker.jpg`

## Sources

- Organized according to standard plant pathology literature on *Colletotrichum gossypii* / *Glomerella gossypii*.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - stem
  - boll
  - seedling
lesion_present: true
primary_shape: circular_to_subcircular_sunken_spots
width_profile: regular_concentric
ends: rounded
color_transition: distinct
early_appearance: small_reddish_or_purplish_water_soaked_spots
pattern_distribution: scattered_on_leaves_stems_and_bolls
vein_relationship: crosses_veins
primary_location: seedling_hypocotyl_leaf_blades_and_developing_bolls
```