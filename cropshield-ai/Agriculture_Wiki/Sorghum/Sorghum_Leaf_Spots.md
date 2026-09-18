# Sorghum Leaf Spots

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- leaf_sheath
- whole_plant

### Symptom Class

- discrete_leaf_lesions
- necrotic_spots

### Lesion / Symptom Geometry

- Primary shape: `oval_circular`
- Elongation: `low_to_moderate`
- Width profile: `wider_at_center`
- Ends: `blunt_rounded`
- Discrete or continuous: `discrete`

### Size

- small to medium discrete spots, generally a few millimeters across; individual spots may enlarge and coalesce when disease severity increases

### Color

- Center / primary color: tan, brown, gray, reddish_brown
- Margin: dark_brown, reddish_brown, purple_brown
- Surrounding tissue: green
- Color transition: `sharp_two_tone`
- Current/overall colors: tan, brown, gray, reddish_brown, dark_brown, purple_brown

### Texture

- Current texture: dry_papery, slightly_rough, brittle_in_severe_stage
- Early appearance: `unclear`

### Pattern and Distribution

- Orientation: `irregular`
- Distribution: `discrete_scattered`
- Coalescence: `discrete_coalescing`
- Vein relationship: `crosses_or_ignores_veins`

### Spatial Location

- Primary location: `leaf_blade`
- spots may occur at multiple positions on the leaf blade and may also occur on leaf sheaths

### Whole-Plant / Field-Level Features

- scattered_leaf_spots
- multiple_lesions_on_affected_leaves
- lesions_may_enlarge_and_coalesce
- progressive_leaf_necrosis
- severe_infection_may_cause_leaf_drying
- reduced_green_leaf_area_under_severe_conditions

## Hallmark Features

- discrete_oval_to_circular_leaf_spots
- brown_to_reddish_brown_lesion_coloration
- contrasting_center_and_margin_colors
- scattered_distribution_across_leaf_blades
- lesions_may_coalesce_under_severe_conditions
- progressive_necrosis_of_affected_leaf_tissue

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- continuous_uniform_yellow_discoloration_without_distinct_lesions
- parallel_chlorotic_streaks_with_downy_growth
- raised_orange_rust_colored_pustules
- long_continuous_leaf_blight
- grain_smut_balls

## Differential Diagnosis

### Similar Problems

- Sorghum Anthracnose
- Sorghum Leaf Blight
- Sorghum Gray Leaf Spot
- Sorghum Rust
- Sorghum Downy Mildew

### Diagnostic Discriminators

- Compare the affected plant part before interpreting lesion color.
- Compare lesion geometry before treating an elongated symptom as a streak.
- Compare center-to-margin color relationships rather than color words in isolation.
- Distinguish discrete spots from continuous or coalescing blight.
- Examine lesion texture and elevation to distinguish flat spots from raised rust pustules.
- Distinguish discrete leaf spots from parallel chlorotic streaks associated with downy mildew.
- Treat uncertainty in plant-part identification or lesion boundaries as uncertainty, not as a fact.

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

- The phenotype content in this file was reorganized using the supplied `Rice Tungro.md` entry as the structural reference and adapted to `Sorghum + Leaf spots`.
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
