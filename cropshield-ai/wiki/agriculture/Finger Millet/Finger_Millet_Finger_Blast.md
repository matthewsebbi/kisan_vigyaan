# Finger Millet Finger Blast

## Diagnostic Phenotype

### Primary Affected Plant Parts

- spikelet
- finger
- panicle
- earhead
- whole_plant

### Symptom Class

- panicle_branch_necrosis
- finger_blast
- grain_filling_failure

### Lesion / Symptom Geometry

- Primary shape: `elongated_lesion_on_finger_or_panicle_branch`
- Elongation: `high`
- Width profile: `uniform_or_widens_locally`
- Ends: `irregular`
- Discrete or continuous: `localized_to_affected_finger_or_branch`

### Size

- Symptoms can involve a portion or substantial length of an individual finger.
- Multiple fingers may be affected on the same earhead.
- Severely affected fingers may become largely necrotic and chaffy.

### Color

- Center / primary color: `brown_to_dark_brown`
- Margin: `brown_to_black`
- Surrounding tissue: green_to_normal_panicle_color
- Color transition: `gradual_to_sharp`
- Current/overall colors: brown, dark_brown, black, straw_brown

### Texture

- Current texture: dry, necrotic, chaffy, shriveled
- Early appearance: `brown_discoloration_or_unclear`

### Pattern and Distribution

- Orientation: `longitudinal_along_finger`
- Distribution: `discrete_finger_associated`
- Coalescence: `localized_or_multiple_fingers`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `finger_of_earhead`
- Secondary location: `panicle_branch_and_spikelet`

### Whole-Plant / Field-Level Features

- affected_fingers_turn_brown_to_black
- chaffy_fingers
- few_shriveled_grains
- poor_seed_setting
- multiple_fingers_may_be_affected
- severe_finger_blast_reduces_yield

## Hallmark Features

- brown_to_black_fingers
- chaffy_fingers
- few_or_shriveled_grains
- poor_seed_setting
- localized_necrosis_of_panicle_fingers
- finger_blast_is_distinct_from_leaf_and_neck_blast_by_primary_location

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- spindle_shaped_leaf_lesions_as_the_primary_feature
- blackened_shrunken_neck_as_the_primary_feature
- raised_powdery_rust_pustules
- honeydew_exudation_from_florets
- smut_spore_balls
- green_ear_panicle_transformation

## Differential Diagnosis

### Similar Problems

- Finger Millet Blast / Leaf Blast
- Finger Millet Neck Blast
- Finger Millet Smut
- Grain mold

### Diagnostic Discriminators

- Confirm that symptoms are centered on individual fingers or panicle branches rather than the leaf blade.
- Distinguish finger blast from neck blast by locating the primary lesion: finger blast affects the earhead fingers, whereas neck blast centers on the neck beneath the earhead.
- Give high diagnostic weight to brown/black, chaffy fingers and poor or absent seed setting.
- Distinguish finger blast from smut by checking for fungal spore-ball structures rather than diffuse browning/chaffiness.
- Evaluate whether only selected fingers are affected or whether the entire panicle is compromised.
- Treat uncertainty in distinguishing finger from neck tissue as uncertainty.

## Environmental Conditions

### Temperature

- Not specified as a fixed diagnostic threshold in the supplied reference.

### Humidity

- Humid conditions favor blast development.

### Rainfall / Moisture

- Moisture and prolonged wetness can favor infection.

### Soil

- Not specified in supplied reference.

> **Source status:** TNAU states that some fingers can be affected by blast, becoming chaffy with only a few shriveled grains. ICAR describes elliptical or diamond-shaped blast lesions on the finger and identifies finger blast as a major blast form after neck blast. citeturn301050search0turn301050search14

## Crop Stage

- Most important during panicle emergence, flowering, and grain development.

## Reference Images

- TNAU provides finger-blast imagery alongside infected-plant and leaf-blast images. citeturn301050search0
- A published finger millet review also illustrates leaf, neck, and finger blast phenotypes. citeturn301050image2

## Sources

- TNAU Agritech Portal — Finger millet blast, including finger blast symptoms and images. citeturn301050search0
- TNAU, *Diseases of Finger Millet* — blast symptoms and finger/earhead infection. citeturn301050search13
- ICAR, *Indian Farming*, January 2023 — blast lesions can occur on leaf, peduncle, and finger; neck blast is most damaging. citeturn301050search14
- Kasule et al. (2023), review of finger millet production constraints, illustrating leaf, neck, and finger blast. citeturn301050image2

## Machine-Comparison Notes

```yaml
plant_parts:
  - spikelet
  - finger
  - panicle
  - earhead
  - whole_plant
lesion_present: true
primary_shape: elongated_lesion_on_finger_or_panicle_branch
width_profile: uniform_or_widens_locally
ends: irregular
color_transition: gradual_to_sharp
early_appearance: brown_discoloration_or_unclear
pattern_distribution: discrete_finger_associated
vein_relationship: not_applicable
primary_location: finger_of_earhead
lesion_features:
  color: brown_to_dark_brown_to_black
  texture: dry_necrotic_chaffy
whole_plant_context:
  chaffy_fingers: true
  poor_seed_set: possible
  shriveled_grains: possible
```
