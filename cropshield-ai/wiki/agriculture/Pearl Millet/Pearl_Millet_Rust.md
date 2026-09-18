# Pearl Millet Rust

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade
- leaf_sheath
- stem
- whole_plant

### Symptom Class
- rust_pustule
- localized_necrosis
- late_season_foliar_disease

### Lesion / Symptom Geometry
- Primary shape: `oval_circular`
- Elongation: `low_to_moderate`
- Width profile: `uniform_or_slightly_expanded`
- Ends: `blunt_rounded`
- Discrete or continuous: `discrete_scattered_to_coalescing`

### Size
- Small reddish-brown to reddish-orange pustules occur mainly on foliage.
- Pustules can become larger and more numerous on susceptible plants.

### Color
- Center / primary color: `reddish_brown_to_reddish_orange`
- Margin: `yellowish_or_not_distinct`
- Surrounding tissue: green
- Color transition: `sharp_or_gradual`
- Current/overall colors: yellow, reddish_brown, reddish_orange, dark_brown, black_at_telia_stage

### Texture
- Current texture: raised, powdery, pustular
- Early appearance: `yellow_to_white_spot`
- Later texture: `powdery_uredospore_pustule`

### Pattern and Distribution
- Orientation: `not_applicable`
- Distribution: `discrete_scattered`
- Coalescence: `may_increase_with_severity`
- Vein relationship: `crosses_or_ignores_veins`

### Spatial Location
- Primary location: `leaf_blade`
- Other locations: `leaf_sheath_and_stem`
- Common early location: `lower_leaves`

### Whole-Plant / Field-Level Features
- lower_leaf_infection
- upper_leaf_infection_as_disease_progresses
- leaf_wilting
- leaf_necrosis
- severe_rust_can_impair_panicle_emergence
- usually_more_prominent_later_in_crop_cycle

## Hallmark Features
- reddish_brown_to_reddish_orange_pustules
- raised_powdery_uredinia
- pustules_on_leaf_surfaces
- initial_symptoms_often_on_lower_leaves
- later_dark_brown_or_black_telia_may_form
- severe_infection_can_progress_to_leaf_necrosis

## Negative / Exclusion Features
- spindle_diamond_gray_centered_lesions
- discrete_honeydew_droplets
- enlarged_smut_spore_balls
- green_ear_panicle_transformation
- diffuse_leaf_yellowing_without_pustules

## Differential Diagnosis

### Similar Problems
- Pearl Millet Blast
- Pearl Millet Leaf Spots
- Downy Mildew
- Ergot
- Smut

### Diagnostic Discriminators
- Look for raised, powdery rust pustules before interpreting reddish-brown color alone.
- Distinguish pustules from flat necrotic lesions of blast or leaf-spot diseases.
- Examine both leaf surfaces when possible.
- Give additional weight to pustules on lower leaves and their progression upward.
- Distinguish reddish-brown uredinia from black or dark mature telia.
- Treat absence of visible pustules in a low-resolution image as uncertain evidence.

## Environmental Conditions

### Temperature
- Cool nights and warm days can favor rust; exact thresholds should be treated as contextual evidence.

### Humidity
- Leaf-surface moisture and dew can favor infection.

### Rainfall / Moisture
- Moisture and dew on leaves support disease development.

### Soil
- Not specified in supplied reference.

> **Source status:** ICAR-AICRP describes reddish-brown powdery uredospore pustules, usually first on lower leaves, followed by darker teliospores. USDA also describes reddish-brown to reddish-orange uredinia and later black telia. citeturn1search1turn1search0

## Crop Stage
- Often becomes more evident during the later part of the crop-growing season.
- Early infection can become more damaging when disease develops before flowering.

## Reference Images

![Pearl Millet Rust symptoms](https://plantix.net/en/library/plant-diseases/100089/millet-rust/)

**Image source:** Plantix, Millet Rust. citeturn0image2

## Sources
- ICAR-AICRP on Pearl Millet — Rust (*Puccinia substriata*). citeturn1search1
- USDA ARS — Pearl Millet Diseases: fungal diseases and rust. citeturn1search0
- Plantix — Millet Rust imagery and description. citeturn0image2

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - leaf_sheath
  - stem
  - whole_plant
lesion_present: true
primary_shape: oval_circular
width_profile: uniform_or_slightly_expanded
ends: blunt_rounded
color_transition: sharp_or_gradual
early_appearance: yellow_to_white_spot
pattern_distribution: discrete_scattered
vein_relationship: crosses_or_ignores_veins
primary_location: leaf_blade
pustule_features:
  color: reddish_brown_to_reddish_orange
  texture: raised_powdery
  later_structure: dark_brown_to_black_telia
```
