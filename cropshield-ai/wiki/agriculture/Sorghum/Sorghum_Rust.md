# Sorghum Rust

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- leaf_sheath
- whole_plant

### Symptom Class

- discrete_pustules
- necrotic_spots

### Lesion / Symptom Geometry

- Primary shape: `oval_circular`
- Elongation: `low`
- Width profile: `wider_at_center`
- Ends: `blunt_rounded`
- Discrete or continuous: `discrete`

### Size

- small, discrete pustules or spots scattered across affected leaf surfaces; individual pustules may become more numerous and extensive as disease develops

### Color

- Center / primary color: orange, reddish_brown, cinnamon_brown
- Margin: yellow, brown, reddish_brown
- Surrounding tissue: green
- Color transition: `sharp_two_tone`
- Current/overall colors: orange, reddish_brown, cinnamon_brown, brown, yellow

### Texture

- Current texture: rough, raised, powdery
- Early appearance: `unclear`

### Pattern and Distribution

- Orientation: `irregular`
- Distribution: `discrete_scattered`
- Coalescence: `discrete`
- Vein relationship: `crosses_or_ignores_veins`

### Spatial Location

- Primary location: `leaf_blade`
- pustules may also occur on leaf sheaths and other green plant tissues

### Whole-Plant / Field-Level Features

- numerous_raised_rust_colored_pustules
- orange_to_reddish_brown_spore_masses
- scattered_pustules_on_leaf_surface
- increased_pustule_density_with_disease_progression
- severe_infection_may_cause_premature_leaf_drying

## Hallmark Features

- discrete_raised_pustules
- orange_to_reddish_brown_coloration
- powdery_spore_mass
- scattered_distribution_across_leaf_surface
- pustules_become_more_conspicuous_as_disease_progresses

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- continuous_uniform_yellow_discoloration
- parallel_chlorotic_streaks_with_downy_growth
- large_elongated_necrotic_blight_areas
- discrete_tan_lesions_with_dark_margins
- grain_smut_balls

## Differential Diagnosis

### Similar Problems

- Sorghum Anthracnose
- Sorghum Leaf Blight
- Sorghum Gray Leaf Spot
- Sorghum Downy Mildew

### Diagnostic Discriminators

- Compare the affected plant part before interpreting lesion color.
- Look for raised pustules rather than flat necrotic lesions.
- Compare the orange_to_reddish_brown spore mass with the surrounding leaf tissue.
- Distinguish discrete pustules from continuous blight and elongated leaf streaks.
- Examine texture because rust pustules are typically raised and powdery rather than flat and papery.
- Treat uncertainty in identifying pustule elevation or surface texture as uncertainty, not as a fact.

## Environmental Conditions

### Temperature

- Not specified in supplied file

### Humidity

- Not specified in supplied file

### Rainfall / Moisture

- Not specified in supplied file

### Soil

- Not specified in supplied file

> **Source status:** The supplied Markdown file did not provide specific environmental values; no values have been invented here. Populate these fields with verified climate/soil evidence before using them as diagnostic evidence.

## Crop Stage

- Not specified in supplied file.

## Reference Images

- Not specified in supplied file.

## Sources

- The phenotype content in this file was reorganized using the supplied `Rice Tungro.md` entry as the structural reference and adapted to `Sorghum + Rust`.
- Environmental values and crop-stage values have not been added where they were not specified in the reference.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - leaf_sheath
  - whole_plant
lesion_present: true
primary_shape: oval_circular
width_profile: wider_at_center
ends: blunt_rounded
color_transition: sharp_two_tone
early_appearance: unclear
pattern_distribution: discrete_scattered
vein_relationship: crosses_or_ignores_veins
primary_location: leaf_blade
```
