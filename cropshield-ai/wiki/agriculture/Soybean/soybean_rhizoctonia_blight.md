# Soybean Rhizoctonia Blight

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- petiole
- stem
- canopy

### Symptom Class

- foliar_blight
- irregular_water_soaked_lesions

### Lesion / Symptom Geometry

- Primary shape: `irregular`
- Elongation: `moderate_to_high`
- Width profile: `variable`
- Ends: `irregular_unbounded`
- Discrete or continuous: `coalescing_to_continuous`

### Size

- Lesions range from small 2-5 mm water-soaked spots initially, expanding rapidly into large irregular blighted patches of 20-100 mm or covering entire leaflets and adjacent foliage.

### Color

- Center / primary color: greyish_green, tan, brown
- Margin: dark_brown, reddish_brown
- Surrounding tissue: pale_green, chlorotic
- Color transition: `abrupt_to_gradual`
- Current/overall colors: water_soaked_grey, tan, reddish_brown, dark_brown

### Texture

- Current texture: papery, dry, brittle_in_late_stage, web_like_mycelium_under_high_humidity
- Early appearance: `water_soaked`

### Pattern and Distribution

- Orientation: `random_non_directional`
- Distribution: `canopy_patchy_blight`
- Coalescence: `extensive`
- Vein relationship: `crosses_veins`

### Spatial Location

- Primary location: `lower_to_mid_canopy_foliage`

### Whole-Plant / Field-Level Features

- foliage_webbing
- leaf_sticking_together
- canopy_defoliation
- circular_patch_distribution_in_field

## Hallmark Features

- irregular_water_soaked_to_tan_foliar_lesions
- web_like_fungal_mycelium_binding_leaves
- rapid_blighting_in_dense_lower_canopy
- reddish_brown_border_on_expanded_lesions

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- angular_lesions_bound_by_veins
- yellow_halo_around_small_black_spots
- powdery_white_growth_on_leaf_surface
- dark_pycnidia_dots_inside_lesion

## Differential Diagnosis

### Similar Problems

- Sudden Death Syndrome
- Frogeye Leaf Spot
- Soybean Bacterial Blight

### Diagnostic Discriminators

- Compare presence of fungal webbing binding adjacent leaves versus clean, non-adherent necrotic tissue.
- Compare lesion shape across leaf veins; Rhizoctonia crosses veins freely, unlike angular bacterial lesions.
- Compare lower canopy distribution and field patchiness versus systemic foliar interveinal chlorosis.

## Environmental Conditions

### Temperature

- 25°C to 32°C (Warm to hot conditions)

### Humidity

- High relative humidity (> 80%) within a dense canopy

### Rainfall / Moisture

- Frequent rainfall, prolonged leaf wetness, overhead irrigation

### Soil

- Poorly drained, high organic matter, field history of Rhizoctonia host crops

## Crop Stage

- R1 to R6 (Flowering through seed pod development)

## Reference Images

- `soybean_rhizoctonia_blight_leaf.jpg`
- `soybean_rhizoctonia_canopy_webbing.jpg`

## Sources

- Compendium of Soybean Diseases, 5th Edition (APS Press)
- University Extension Pathology Diagnostics - Soybean Foliar Diseases

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - petiole
  - stem
  - canopy
lesion_present: true
primary_shape: irregular
width_profile: variable
ends: irregular_unbounded
color_transition: abrupt_to_gradual
early_appearance: water_soaked
pattern_distribution: canopy_patchy_blight
vein_relationship: crosses_veins
primary_location: lower_to_mid_canopy_foliage
```