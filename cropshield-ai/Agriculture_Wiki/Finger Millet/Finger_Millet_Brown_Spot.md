# Finger Millet Brown Spot

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- leaf_sheath
- culm
- neck
- panicle
- finger
- whole_plant

### Symptom Class

- brown_leaf_spot
- seedling_blight
- foliar_necrosis

### Lesion / Symptom Geometry

- Primary shape: `small_oval_elongated_to_oblong`
- Elongation: `moderate`
- Width profile: `uniform_or_slightly_expanded`
- Ends: `blunt_rounded`
- Discrete or continuous: `discrete_scattered_to_coalescing`

### Size

- Young leaves may show small oval light-brown lesions that become darker brown.
- Older plants may develop linear, oblong, or dark-brown lesions.
- Multiple lesions can coalesce into large patches and cause premature leaf withering.

### Color

- Center / primary color: `light_brown_to_dark_brown`
- Margin: `dark_brown`
- Surrounding tissue: green_to_yellow
- Color transition: `gradual`
- Current/overall colors: light_brown, brown, dark_brown

### Texture

- Current texture: dry, necrotic, papery
- Early appearance: `minute_oval_light_brown_lesion`

### Pattern and Distribution

- Orientation: `variable_or_longitudinal_in_older_leaves`
- Distribution: `discrete_scattered`
- Coalescence: `extensive_in_severe_cases`
- Vein relationship: `crosses_or_ignores_veins`

### Spatial Location

- Primary location: `leaf_blade`
- Secondary locations: `leaf_sheath_culm_neck_panicle_finger`

### Whole-Plant / Field-Level Features

- premature_leaf_withering
- seedling_blight_under_severe_nursery_infection
- neck_discoloration
- neck_weakening
- hanging_or_broken_earhead_in_severe_neck_infection
- chaffy_panicle
- discolored_or_poorly_filled_grains
- increased_severity_under_drought_or_nutritional_deficiency

## Hallmark Features

- small_oval_light_brown_spots_on_young_leaves
- spots_become_dark_brown
- lesions_may_be_linear_oblong_on_mature_plants
- lesions_can_coalesce_into_large_patches
- premature_leaf_withering
- can_extend_beyond_leaf_to_sheath_culm_neck_and_panicle
- neck_infection_can_cause_earhead_hanging
- panicles_can_become_chaffy

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- classic_spindle_diamond_gray_centered_blast_lesions
- raised_powdery_rust_pustules
- numerous_reddish_brown_cercospora_spots_as_primary_symptom
- honeydew_exudation
- smut_spore_balls
- green_ear_panicle_transformation

## Differential Diagnosis

### Similar Problems

- Finger Millet Leaf Spot / Cercospora Leaf Spot
- Finger Millet Blast
- Finger Millet Rust
- Banded Blight

### Diagnostic Discriminators

- Distinguish the smaller oval-to-oblong brown spots of brown spot from larger spindle-shaped blast lesions.
- Check whether disease extends beyond leaves to sheath, culm, neck, and panicle.
- Give additional weight to seedling blight or neck weakening when these are clearly visible.
- Distinguish flat brown spots from raised rust pustules.
- Consider drought or nutritional stress as severity modifiers rather than as the primary disease diagnosis.
- Treat uncertainty in causal organism identification as uncertainty when image appearance overlaps with other leaf spots.

## Environmental Conditions

### Temperature

- The 2026 IIMR Good Agricultural Practices guide reports an optimum infection range around 30–32 °C.

### Humidity

- High relative humidity favors disease development.

### Rainfall / Moisture

- Intermittent rains around ear emergence and before grain formation favor severe ear infection.

### Soil

- Not a primary diagnostic feature; drought and nutritional deficiency can increase disease vulnerability.

> **Source status:** The IIMR 2026 Good Agricultural Practices guide identifies Brown Spot as *Drechslera nodulosum*, also called leaf blight or seedling blight, and describes brown/dark-brown spots, extension to neck/panicle, chaffiness, and increased vulnerability under drought or nutritional deficiency. TNAU also describes small oval brown lesions becoming dark brown and coalescing. citeturn590467search14turn590467search1

## Crop Stage

- Can occur throughout the crop cycle.
- Seedling and adult plants can be affected.
- Ear and neck infection becomes important around ear emergence and grain formation.

## Reference Images

![Brown spot disease in finger millet](https://www.millets.res.in/pub/2026/GAP-English.pdf)

**Reference:** IIMR Good Agricultural Practices guide, Figure 54: Brown spot disease in finger millet. citeturn275640search15

## Sources

- ICAR–Indian Institute of Millets Research, *Good Agricultural Practices for Millets* (2026), Finger millet Brown Spot. citeturn590467search14
- TNAU Agritech Portal, Finger millet seedling blight / leaf spot (*Helminthosporium nodulosum*). citeturn590467search1
- TNAU, *Diseases of Finger Millet*, brown/leaf-spot symptoms. citeturn314912search12

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - leaf_sheath
  - culm
  - neck
  - panicle
  - finger
  - whole_plant
lesion_present: true
primary_shape: small_oval_elongated_to_oblong
width_profile: uniform_or_slightly_expanded
ends: blunt_rounded
color_transition: gradual
early_appearance: minute_oval_light_brown_lesion
pattern_distribution: discrete_scattered_to_coalescing
vein_relationship: crosses_or_ignores_veins
primary_location: leaf_blade
lesion_features:
  center_color: light_brown_to_dark_brown
  margin_color: dark_brown
  texture: dry_necrotic
whole_plant_context:
  neck_weakening: possible
  chaffy_panicle: possible
  premature_leaf_withering: possible
```
