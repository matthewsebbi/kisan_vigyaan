# Lablab Bean + Anthracnose

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- stem
- petiole
- pods
- seeds
- whole_plant

### Symptom Class

- localized_lesion
- necrosis

### Lesion / Symptom Geometry

- Primary shape: `circular_to_irregular`
- Elongation: `low_to_moderate`
- Width profile: `variable`
- Ends: `irregular`
- Discrete or continuous: `discrete_to_coalescing`

### Size

- lesions may begin as small spots and enlarge into larger necrotic areas; pod lesions may become sunken and elongated

### Color

- Center / primary color: tan_to_brown
- Margin: dark_brown_to_reddish_brown
- Surrounding tissue: green
- Color transition: `gradual`
- Current/overall colors: tan, brown, reddish_brown, dark_brown

### Texture

- Current texture: dry, necrotic, may_be_sunken_on_pods
- Early appearance: `small_water_soaked_or_brown_spots`

### Pattern and Distribution

- Orientation: `irregular`
- Distribution: `scattered_to_coalescing`
- Coalescence: `moderate_to_extensive`
- Vein relationship: `not_distinctive`

### Spatial Location

- Primary location: `leaf_blade`
- Secondary locations: `stem, petiole, pods`

### Whole-Plant / Field-Level Features

- premature_leaf_drop
- stem_or_pod_lesions
- reduced_vigor
- reduced_pod_quality_in_severe_cases

## Hallmark Features

- circular_to_irregular_brown_leaf_lesions
- reddish_brown_to_dark_margins
- lesions_can_coalesce
- sunken_lesions_may_occur_on_pods
- severe_infection_can_cause_defoliation

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- angular_lesions_strictly_bounded_by_leaf_veins
- diffuse_mosaic_pattern_without_necrotic_lesions
- white_powdery_surface_growth
- orange_rust_pustules

## Differential Diagnosis

### Similar Problems

- Lablab Bean Angular Leaf Spot
- Bacterial Leaf Spot
- Lablab Bean Mosaic Virus

### Diagnostic Discriminators

- Compare the affected plant part before interpreting lesion color.
- Compare lesion geometry before treating a brown spot as anthracnose.
- Distinguish discrete necrotic lesions from diffuse mosaic discoloration.
- Check whether lesions are angular and vein-limited.
- Treat uncertainty in plant-part identification or vein relationship as uncertainty, not as a fact.

## Environmental Conditions

### Temperature

- Warm and humid conditions can favor disease development.

### Humidity

- High humidity favors infection and sporulation.

### Rainfall / Moisture

- Frequent rainfall, splash dispersal, and prolonged moisture can favor disease development.

### Soil

- Not specified in supplied reference format.

> **Source status:** Environmental descriptions should be verified against crop-specific plant pathology sources before being used as quantitative diagnostic evidence.

## Crop Stage

- May occur during vegetative growth and reproductive development; pod infection can be important when disease develops late in the crop.

## Reference Images

- Not specified in supplied file.

## Sources

- Disease-specific phenotype fields should be verified against authoritative lablab bean and legume pathology references before deployment as a diagnostic dataset.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - stem
  - petiole
  - pods
  - seeds
  - whole_plant
lesion_present: true
primary_shape: circular_to_irregular
width_profile: variable
ends: irregular
color_transition: gradual
early_appearance: small_water_soaked_or_brown_spots
pattern_distribution: scattered_to_coalescing
vein_relationship: not_distinctive
primary_location: leaf_blade
secondary_locations:
  - stem
  - petiole
  - pods
```
