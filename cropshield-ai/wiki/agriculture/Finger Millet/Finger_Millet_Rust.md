# Finger Millet Rust

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- leaf_sheath
- stem
- whole_plant

### Symptom Class

- rust_pustule
- foliar_rust
- localized_uredinium

### Lesion / Symptom Geometry

- Primary shape: `oval_circular`
- Elongation: `low_to_moderate`
- Width profile: `uniform_or_slightly_expanded`
- Ends: `blunt_rounded`
- Discrete or continuous: `discrete_scattered_to_linear_clusters`

### Size

- Minute to small pustules occur on leaf surfaces.
- Pustules may be arranged linearly, especially on upper leaves.
- With increasing severity, pustules can become numerous and the leaf may develop extensive reddish-brown discoloration and premature drying.

### Color

- Center / primary color: `dark_brown_to_reddish_brown`
- Margin: `yellowish_or_not_distinct`
- Surrounding tissue: green
- Color transition: `sharp_or_gradual`
- Current/overall colors: yellow, reddish_brown, dark_brown, reddish_orange, black_at_maturity

### Texture

- Current texture: raised, pustular, powdery_when_ruptured
- Early appearance: `minute_yellow_to_brown_spot`

### Pattern and Distribution

- Orientation: `linear_or_variable`
- Distribution: `discrete_scattered_or_linear_clusters`
- Coalescence: `may_increase_with_severity`
- Vein relationship: `crosses_or_ignores_veins`

### Spatial Location

- Primary location: `leaf_blade`
- Secondary location: `leaf_sheath`
- Tends to be prominent on upper leaves in finger millet.

### Whole-Plant / Field-Level Features

- upper_leaf_pustules
- reddish_brown_leaf_discoloration
- progressive_leaf_necrosis
- premature_leaf_drying
- reduced_photosynthetic_area
- severe_early_infection_can_reduce_crop_performance

## Hallmark Features

- minute_to_small_dark_brown_pustules
- pustules_arranged_linearly_on_upper_leaves
- pustules_are_raised_and_rupture_to_release_rust_spores
- upper_leaves_more_affected_than_lower_and_middle_leaves
- severe_plants_can_appear_reddish_brown
- rust_may_affect_leaf_sheaths_and_stems

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- spindle_diamond_gray_centered_lesions
- numerous_flat_brown_spots_without_pustules
- blackened_shrunken_neck
- chaffy_blast_affected_fingers
- honeydew_exudation
- smut_spore_balls
- green_ear_transformation

## Differential Diagnosis

### Similar Problems

- Finger Millet Blast
- Finger Millet Leaf Spot
- Finger Millet Brown Spot
- Downy Mildew

### Diagnostic Discriminators

- Look for raised pustules rather than flat necrotic lesions.
- Give high diagnostic weight to minute dark-brown pustules arranged linearly on upper leaves.
- Distinguish rust pustules from flat brown spots of brown spot and Cercospora leaf spot.
- Distinguish reddish-brown rust symptoms from gray-centered spindle-shaped blast lesions.
- Examine both leaf surfaces when possible and check for mature dark structures.
- Treat absence of visible pustules in low-resolution imagery as uncertainty rather than evidence of absence.

## Environmental Conditions

### Temperature

- Exact Finger millet rust thresholds were not specified in the supplied disease guide.

### Humidity

- Moist conditions can favor rust establishment and spore germination.

### Rainfall / Moisture

- Leaf wetness is relevant to rust infection; exact field thresholds were not specified in the supplied Finger millet reference.

### Soil

- Not specified in supplied reference.

> **Source status:** ICAR–IIMR identifies Finger millet rust as *Uromyces eragrostidis*. It describes minute to small, dark-brown, broken pustules arranged linearly on the upper surface of top leaves, with greater disease on upper leaves than lower and middle leaves. citeturn590467search12

## Crop Stage

- Symptoms may become more evident as the crop canopy develops.
- Severe early infection can be more consequential than late-season infection.

## Reference Images

![Small millet rust reference](https://www.millets.res.in/books/DISEASES_OF_MILLETS.pdf)

**Reference:** IIMR, *Diseases of Millets*, rust section identifying Finger millet rust as *Uromyces eragrostidis*. The illustrated plate is a small-millet rust reference. citeturn590467search12

## Sources

- ICAR–Indian Institute of Millets Research, *Diseases of Millets* — Finger millet rust, *Uromyces eragrostidis*. citeturn590467search12
- ICAR–Indian Institute of Millets Research, *Good Agricultural Practices for Millets* — small millet rust context. citeturn590467search16

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
early_appearance: minute_yellow_to_brown_spot
pattern_distribution: discrete_scattered_or_linear_clusters
vein_relationship: crosses_or_ignores_veins
primary_location: leaf_blade
lesion_features:
  pustule_color: dark_brown_to_reddish_brown
  pustule_texture: raised_powdery
  arrangement: linear_or_scattered
whole_plant_context:
  upper_leaf_prevalence: common
  reddish_brown_appearance_in_severe_cases: possible
  premature_leaf_drying: possible
```
