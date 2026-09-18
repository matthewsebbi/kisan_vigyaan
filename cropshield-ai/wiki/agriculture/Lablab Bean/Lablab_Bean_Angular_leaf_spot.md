# Lablab Bean + Angular Leaf Spot

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- petiole
- stem
- pods
- whole_plant

### Symptom Class

- localized_lesion
- necrosis

### Lesion / Symptom Geometry

- Primary shape: `angular`
- Elongation: `low_to_moderate`
- Width profile: `irregular`
- Ends: `angular`
- Discrete or continuous: `discrete_to_coalescing`

### Size

- lesions may begin as small spots and enlarge while remaining restricted by leaf veins; adjacent lesions may merge

### Color

- Center / primary color: water_soaked_to_pale_brown
- Margin: brown_to_dark_brown
- Surrounding tissue: green
- Color transition: `gradual`
- Current/overall colors: water_soaked, pale_brown, brown, dark_brown

### Texture

- Current texture: water_soaked_early, necrotic_later, dry_in_advanced_lesions
- Early appearance: `small_water_soaked_angular_spots`

### Pattern and Distribution

- Orientation: `angular`
- Distribution: `scattered_to_vein_limited`
- Coalescence: `moderate`
- Vein relationship: `bounded_by_leaf_veins`

### Spatial Location

- Primary location: `leaf_blade`
- Secondary locations: `petiole, stem, pods`

### Whole-Plant / Field-Level Features

- premature_leaf_yellowing
- leaf_drop_in_severe_cases
- reduced_vigor
- pod_lesions_in_severe_cases

## Hallmark Features

- angular_leaf_lesions
- lesions_are_often_bounded_by_leaf_veins
- water_soaked_appearance_in_early_stages
- lesions_can_turn_brown_and_necrotic
- lesions_may_coalesce_under_severe_disease

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- circular_to_irregular_lesions_not_limited_by_veins
- extensive_diffuse_mosaic_discoloration
- white_powdery_surface_growth
- orange_to_reddish_brown_pustules

## Differential Diagnosis

### Similar Problems

- Lablab Bean Anthracnose
- Bacterial Leaf Spot
- Lablab Bean Mosaic Virus

### Diagnostic Discriminators

- Compare lesion geometry before interpreting lesion color.
- Check whether lesion boundaries follow or are limited by leaf veins.
- Distinguish angular discrete lesions from circular or irregular anthracnose lesions.
- Distinguish localized lesions from systemic mosaic discoloration.
- Treat uncertain vein relationships as uncertainty rather than a fact.

## Environmental Conditions

### Temperature

- Warm conditions can favor development of many angular leaf spot diseases, depending on the causal organism.

### Humidity

- High humidity can favor disease development.

### Rainfall / Moisture

- Leaf wetness, rainfall, and splash dispersal can favor disease development.

### Soil

- Not specified in supplied reference format.

> **Source status:** The exact causal organism and environmental requirements should be verified for the locally recognized lablab bean angular leaf spot before using these fields as quantitative diagnostic evidence.

## Crop Stage

- Can occur during vegetative growth and may continue into reproductive development when favorable conditions persist.

## Reference Images

- Not specified in supplied file.

## Sources

- Disease-specific phenotype fields should be verified against authoritative lablab bean and legume pathology references before deployment as a diagnostic dataset.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - petiole
  - stem
  - pods
  - whole_plant
lesion_present: true
primary_shape: angular
width_profile: irregular
ends: angular
color_transition: gradual
early_appearance: small_water_soaked_angular_spots
pattern_distribution: scattered_to_vein_limited
vein_relationship: bounded_by_leaf_veins
primary_location: leaf_blade
secondary_locations:
  - petiole
  - stem
  - pods
```
