# Lablab Bean + Powdery Mildew

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- stem
- petiole
- pods
- whole_plant

### Symptom Class

- surface_growth
- diffuse_discoloration

### Lesion / Symptom Geometry

- Primary shape: `irregular_powdery_patches`
- Elongation: `low_to_moderate`
- Width profile: `variable`
- Ends: `diffuse`
- Discrete or continuous: `discontinuous_to_coalescing`

### Size

- white fungal growth may begin as small patches and progressively cover portions of leaf surfaces; severe infections may cover extensive foliage

### Color

- Center / primary color: white
- Margin: diffuse
- Surrounding tissue: green
- Color transition: `gradual`
- Current/overall colors: white, grayish_white, pale_yellow, yellow

### Texture

- Current texture: powdery, superficial
- Early appearance: `small_white_powdery_patches`

### Pattern and Distribution

- Orientation: `irregular`
- Distribution: `scattered_to_extensive`
- Coalescence: `moderate_to_extensive`
- Vein relationship: `not_distinctive`

### Spatial Location

- Primary location: `leaf_blade`
- Secondary locations: `stem, petiole, pods`

### Whole-Plant / Field-Level Features

- leaf_yellowing
- premature_leaf_senescence
- reduced_vigor
- reduced_photosynthetic_area
- premature_leaf_drop_in_severe_cases

## Hallmark Features

- white_powdery_surface_growth
- superficial_fungal_colonies
- patches_can_expand_and_coalesce
- foliage_may_turn_yellow_with_advanced_infection
- severe_infection_can_cause_premature_senescence

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- orange_to_reddish_brown_pustules
- angular_vein_bounded_leaf_lesions
- brown_collar_lesions_with_wilting
- systemic_mosaic_pattern

## Differential Diagnosis

### Similar Problems

- Lablab Bean Anthracnose
- Lablab Bean Angular Leaf Spot
- Lablab Bean Mosaic Virus

### Diagnostic Discriminators

- Distinguish superficial white powdery growth from discrete necrotic lesions.
- Compare surface appearance before interpreting leaf discoloration.
- Distinguish powdery fungal colonies from rust-colored pustules.
- Check whether symptoms form a systemic mosaic pattern rather than superficial fungal growth.
- Treat uncertain surface orientation as uncertainty rather than a fact.

## Environmental Conditions

### Temperature

- Moderate to warm conditions can favor powdery mildew development, depending on the causal species.

### Humidity

- Humid conditions can favor disease development, although powdery mildew does not require prolonged free water on leaf surfaces.

### Rainfall / Moisture

- Disease development can occur without prolonged leaf wetness; excessive rainfall may reduce superficial powdery growth in some situations.

### Soil

- Not specified in supplied reference format.

> **Source status:** Environmental descriptions are qualitative. Verify the specific powdery mildew species affecting lablab bean before using them as quantitative diagnostic evidence.

## Crop Stage

- Can become conspicuous during vegetative growth and later crop development, particularly when foliage is dense and environmental conditions are favorable.

## Reference Images

- Not specified in supplied file.

## Sources

- Disease-specific phenotype fields should be verified against authoritative lablab bean and powdery mildew pathology references before deployment as a diagnostic dataset.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - stem
  - petiole
  - pods
  - whole_plant
lesion_present: false
surface_growth_present: true
primary_shape: irregular_powdery_patches
width_profile: variable
ends: diffuse
color_transition: gradual
early_appearance: small_white_powdery_patches
pattern_distribution: scattered_to_extensive
vein_relationship: not_distinctive
primary_location: leaf_blade
secondary_locations:
  - stem
  - petiole
  - pods
```
