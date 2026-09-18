# Asian Soybean Rust

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- petiole
- stem
- pod

### Symptom Class

- pustule_pustular_lesion
- foliar_chlorosis_and_defoliation

### Lesion / Symptom Geometry

- Primary shape: `polygonal_to_circular_raised_pustule`
- Elongation: `low`
- Width profile: `pinhead_size`
- Ends: `not_applicable`
- Discrete or continuous: `discrete_dense_clusters`

### Size

- Individual lesions measure 0.2 mm to 1.0 mm; under high infection, thousands of lesions cover leaf surfaces, causing early senescence.

### Color

- Center / primary color: tan, reddish_brown
- Margin: dark_reddish_brown
- Surrounding tissue: chlorotic_yellow
- Color transition: `abrupt`
- Current/overall colors: tan_to_reddish_brown_pustules, yellowing_foliage, pale_tan_spores

### Texture

- Current texture: raised, bumpy, erumpent, powdery_on_abaxial_surface
- Early appearance: `tiny_pinprick_flecks_on_lower_leaf_surface`

### Pattern and Distribution

- Orientation: `random`
- Distribution: `dense_scattered_pustules`
- Coalescence: `extensive_leading_to_leaf_necrosis`
- Vein relationship: `independent_of_veins`

### Spatial Location

- Primary location: `lower_canopy_leaves_first_abaxial_underside_predominant`

### Whole-Plant / Field-Level Features

- rapid_lower_canopy_yellowing
- premature_leaf_drop_defoliation
- early_crop_maturity
- reduced_pod_fill_and_seed_weight

## Hallmark Features

- small_volcano_shaped_pustules_uredinia_on_lower_leaf_surface
- release_of_pale_tan_to_off_white_powdery_spores
- symptoms_starting_in_lower_canopy_and_progressing_upward
- severe_early_defoliation_giving_canopy_a_bronzed_or_yellowed_look

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- raised_pustules_with_a_central_crusty_bacterial_plug
- large_circular_target_board_spots_with_concentric_rings
- systemic_mosaic_mottling_and_leaf_puckering
- black_microsclerotia_inside_shredded_lower_stems

## Differential Diagnosis

### Similar Problems

- Soybean Bacterial Pustule (*Xanthomonas citri pv. glycines*)
- Cercospora Leaf Blight (*Cercospora kikuchii*)
- Downy Mildew (*Peronospora manshurica*)

### Diagnostic Discriminators

- Asian Soybean Rust pustules have a central pore emitting pale powdery spores, whereas Bacterial Pustule lacks a spore-releasing pore and often has a small raised non-powdery central bump.
- Downy mildew forms soft tufts of grayish-purple mycelium on lower leaf surfaces without distinct raised volcano-like pustules.

## Environmental Conditions

### Temperature

- Optimal temperature range: 15°C to 28°C (cool to warm conditions).

### Humidity

- High relative humidity (>80%) with extended leaf wetness (6 to 12 hours required for spore germination).

### Rainfall / Moisture

- Frequent rains, long dews, and prolonged cloud cover promote rapid spore germination and secondary cycles.

### Soil

- Canopy density influenced by soil fertility creates a favorable humid microclimate.

## Crop Stage

- Plants are susceptible at all stages, but infections become most devastating from early flowering (R-1/R-2) through pod fill (R-5/R-6).

## Reference Images

- `soybean_rust_abaxial_pustules.jpg`
- `soybean_rust_volcano_opening.jpg`

## Sources

- USDA-ARS Asian Soybean Rust Diagnostic Guide; APS Plant Disease Compendium.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - petiole
  - stem
  - pod
lesion_present: true
primary_shape: polygonal_to_circular_raised_pustule
width_profile: pinhead_size
ends: not_applicable
color_transition: abrupt
early_appearance: tiny_pinprick_flecks_on_lower_leaf_surface
pattern_distribution: dense_scattered_pustules
vein_relationship: independent_of_veins
primary_location: lower_canopy_leaves_first_abaxial_underside_predominant
```