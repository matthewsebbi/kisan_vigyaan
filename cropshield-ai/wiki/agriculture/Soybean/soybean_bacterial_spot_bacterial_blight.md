# Soybean Bacterial Spot / Bacterial Blight

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- petiole
- pod

### Symptom Class

- angular_leaf_spot
- foliar_necrotic_lesion

### Lesion / Symptom Geometry

- Primary shape: `angular`
- Elongation: `low_to_moderate`
- Width profile: `vein_limited`
- Ends: `angular_vein_bounded`
- Discrete or continuous: `discrete_coalescing_later`

### Size

- Individual lesions are small, 1-3 mm in diameter, coalescing under severe conditions to form larger necrotic areas up to 10-15 mm before falling out.

### Color

- Center / primary color: dark_brown, black
- Margin: reddish_brown, dark_purple
- Surrounding tissue: lime_green, yellow_chlorotic_halo
- Color transition: `abrupt`
- Current/overall colors: water_soaked_yellow_green, dark_brown, black, yellow_halo

### Texture

- Current texture: dry, papery, shot_hole_tattering
- Early appearance: `water_soaked`

### Pattern and Distribution

- Orientation: `vein_restricted`
- Distribution: `scattered_across_upper_canopy`
- Coalescence: `moderate`
- Vein relationship: `restricted_by_veins`

### Spatial Location

- Primary location: `upper_canopy_young_leaves`

### Whole-Plant / Field-Level Features

- leaf_tattering
- shot_hole_appearance
- upper_canopy_yellowing
- wind_and_rain_driven_spread_patterns

## Hallmark Features

- angular_water_soaked_spots_turning_dark_brown_or_black
- distinctive_yellow_chlorotic_halo_surrounding_lesions
- tattered_and_shredded_leaf_appearance
- restriction_of_early_lesions_by_small_leaf_veins

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- web_like_mycelium_connecting_foliage
- circular_target_like_concentric_rings
- orange_or_reddish_rust_pustules
- soft_water_soaked_stem_rot_at_soil_line

## Differential Diagnosis

### Similar Problems

- Septoria Brown Spot
- Frogeye Leaf Spot
- Chemical / Fertilizer Burn

### Diagnostic Discriminators

- Compare leaf position: Bacterial Blight primarily affects young leaves in the upper canopy, whereas Septoria Brown Spot develops in lower canopy first.
- Compare lesion boundaries: Bacterial Blight produces distinctly angular lesions bounded by veins, unlike circular Frogeye leaf spots.
- Check for bacterial ooze/streaming in water drops versus fungal fruiting bodies under magnification.

## Environmental Conditions

### Temperature

- 20°C to 26°C (Cool to moderate temperatures)

### Humidity

- High humidity with extended leaf wetness

### Rainfall / Moisture

- Frequent rainstorms with wind driven droplets that cause micro-wounding

### Soil

- Variable; survival enhanced in crop residue on soil surface

## Crop Stage

- V2 (Vegetative) through R5 (Beginning seed formation)

## Reference Images

- `soybean_bacterial_blight_angular_spots.jpg`
- `soybean_bacterial_blight_tattered_leaf.jpg`

## Sources

- APS Plant Pathology Field Guide - Soybean Bacterial Pathogens
- Extension Crop Protection Network - Soybean Bacterial Blight Diagnostic Guide

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - petiole
  - pod
lesion_present: true
primary_shape: angular
width_profile: vein_limited
ends: angular_vein_bounded
color_transition: abrupt
early_appearance: water_soaked
pattern_distribution: scattered_across_upper_canopy
vein_relationship: restricted_by_veins
primary_location: upper_canopy_young_leaves
```