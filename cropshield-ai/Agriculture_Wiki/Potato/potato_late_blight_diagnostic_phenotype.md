# Potato Late Blight

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- petiole
- stem
- tuber

### Symptom Class

- water_soaked_blight
- rapidly_expanding_necrosis
- sporulating_fungal_growth

### Lesion / Symptom Geometry

- Primary shape: `irregular_water_soaked_blotches`
- Elongation: `variable`
- Width profile: `rapidly_expanding`
- Ends: `not_applicable`
- Discrete or continuous: `rapidly_coalescing`

### Size

- Rapidly expands from small wet spots to cover whole leaflets within 2-3 days under ideal conditions.

### Color

- Center / primary color: dark_brown_to_black_necrotic
- Margin: water_soaked_pale_green
- Surrounding tissue: chlorotic_yellow_border
- Color transition: `gradual_to_water_soaked_edge`
- Current/overall colors: dark_brown, dark_olive, black, white_mold_ring

### Texture

- Current texture: wet_slimy_in_humidity, brittle_when_dry
- Early appearance: `water_soaked_dark_green_spot`

### Pattern and Distribution

- Orientation: `random_expanding`
- Distribution: `rapidly_spreading_blight`
- Coalescence: `extensive`
- Vein relationship: `crosses_veins_unrestricted`

### Spatial Location

- Primary location: `leaf_tips_leaf_margins_and_canopy_top`

### Whole-Plant / Field-Level Features

- rapid_canopy_collapse
- foul_decaying_odor_in_field
- white_mildew_ring_underside_leaf
- reddish_brown_granular_rot_in_tubers

## Hallmark Features

- water_soaked_lesions_expanding_rapidly
- white_downy_mildew_on_underside_of_leaf_margins
- dark_brown_to_black_necrotic_blotches
- field_level_rapid_defoliation_and_rot

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- concentric_rings_in_dry_lesions
- upward_leaf_rolling_with_leathery_texture
- superficial_black_sclerotia_scabs
- interveinal_mosaic_mottling

## Differential Diagnosis

### Similar Problems

- Early Blight
- Bacterial Soft Rot / Blackleg
- Botrytis Gray Mold

### Diagnostic Discriminators

- Inspect leaf undersides during high moisture for white fuzzy sporangial growth along lesion margins.
- Note the rapid speed of tissue destruction and water-soaked appearance compared to Early Blight.
- Look for non-concentric lesion structure crossing leaf veins freely.

## Environmental Conditions

### Temperature

- Cool to moderate temperatures: 10°C to 24°C (50°F to 75°F).

### Humidity

- High relative humidity: >90% required for spore production.

### Rainfall / Moisture

- Frequent rainfall, heavy fog, prolonged canopy wetness (>10-12 hours).

### Soil

- Poorly drained soils promote secondary tuber decay.

## Crop Stage

- Susceptible at all growth stages, especially dense canopy and tuber initiation through harvest.

## Reference Images

- `potato_late_blight_leaf_underside_spores.jpg`
- `potato_late_blight_field_collapse.jpg`

## Sources

- CIP (International Potato Center) Late Blight Field Manual.
- FAO Plant Production and Protection Series.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - petiole
  - stem
  - tuber
lesion_present: true
primary_shape: irregular_water_soaked_blotches
width_profile: rapidly_expanding
ends: not_applicable
color_transition: gradual_to_water_soaked_edge
early_appearance: water_soaked_dark_green_spot
pattern_distribution: rapidly_spreading_blight
vein_relationship: crosses_veins_unrestricted
primary_location: leaf_tips_leaf_margins_and_canopy_top
```