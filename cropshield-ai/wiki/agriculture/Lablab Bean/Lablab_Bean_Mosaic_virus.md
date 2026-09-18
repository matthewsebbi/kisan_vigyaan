# Lablab Bean + Mosaic Virus

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- young_leaves
- whole_plant

### Symptom Class

- diffuse_discoloration
- mosaic_pattern
- distortion

### Lesion / Symptom Geometry

- Primary shape: `irregular_mosaic_patches`
- Elongation: `variable`
- Width profile: `variable`
- Ends: `not_distinct`
- Discrete or continuous: `discontinuous_mosaic`

### Size

- mosaic patches may range from small mottled areas to extensive portions of individual leaves; newly emerging leaves may show pronounced symptoms

### Color

- Center / primary color: green_and_light_green
- Margin: not_distinct
- Surrounding tissue: green
- Color transition: `abrupt_to_gradual`
- Current/overall colors: dark_green, green, light_green, yellow_green, yellow

### Texture

- Current texture: may_be_smooth, distorted_in_severe_cases, puckered_in_some_infections
- Early appearance: `light_and_dark_green_mottling`

### Pattern and Distribution

- Orientation: `irregular`
- Distribution: `mosaic_or_mottled`
- Coalescence: `variable`
- Vein relationship: `not_distinctive`

### Spatial Location

- Primary location: `young_and_mature_leaf_blades`
- Secondary location: `whole_plant`

### Whole-Plant / Field-Level Features

- leaf_mottling
- leaf_distortion
- reduced_vigor
- stunting_in_severe_cases
- reduced_pod_development_in_severe_cases

## Hallmark Features

- alternating_dark_and_light_green_leaf_areas
- mosaic_or_mottled_pattern
- symptoms_often_more_visible_on_young_leaves
- leaf_distortion_may_occur
- systemic_effects_may_include_reduced_vigor_or_stunting

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- numerous_discrete_brown_necrotic_lesions
- angular_vein_bounded_lesions
- orange_to_reddish_brown_pustules
- white_powdery_surface_growth

## Differential Diagnosis

### Similar Problems

- Lablab Bean Anthracnose
- Lablab Bean Angular Leaf Spot
- Nutrient Deficiency

### Diagnostic Discriminators

- Compare the overall symptom pattern before interpreting individual color patches.
- Distinguish systemic mosaic or mottling from discrete necrotic lesions.
- Check young leaves for recurring mosaic and distortion patterns.
- Compare color transitions across the whole leaf rather than focusing on a single patch.
- Treat nutrient-related discoloration as a differential when the pattern is not clearly mosaic.

## Environmental Conditions

### Temperature

- Not specified in supplied reference format.

### Humidity

- Not specified in supplied reference format.

### Rainfall / Moisture

- Not specified in supplied reference format.

### Soil

- Not specified in supplied reference format.

> **Source status:** Viral disease expression depends on the specific virus, vector, host genotype, and environment. Populate environmental fields with verified lablab bean virus evidence before using them diagnostically.

## Crop Stage

- Symptoms can occur at different stages and may become conspicuous on newly emerging leaves after systemic infection.

## Reference Images

- Not specified in supplied file.

## Sources

- Disease-specific phenotype fields should be verified against authoritative lablab bean virology and plant pathology references before deployment as a diagnostic dataset.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - young_leaves
  - whole_plant
lesion_present: false
primary_shape: irregular_mosaic_patches
width_profile: variable
ends: not_distinct
color_transition: abrupt_to_gradual
early_appearance: light_and_dark_green_mottling
pattern_distribution: mosaic_or_mottled
vein_relationship: not_distinctive
primary_location: young_and_mature_leaf_blades
secondary_locations:
  - whole_plant
```
