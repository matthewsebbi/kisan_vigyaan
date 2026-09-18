# Finger Millet Neck Blast

## Diagnostic Phenotype

### Primary Affected Plant Parts

- neck
- peduncle
- panicle
- whole_plant

### Symptom Class

- necrotic_neck_lesion
- panicle_blast
- vascular/peduncle_associated_blast

### Lesion / Symptom Geometry

- Primary shape: `elongated_band_or_irregular_lesion`
- Elongation: `high`
- Width profile: `uniform_or_narrowing`
- Ends: `irregular`
- Discrete or continuous: `localized_band`

### Size

- The lesion is centered on the neck region just below the earhead.
- Infection may extend along the neck/peduncle and can involve the basal portions of panicle branches.

### Color

- Center / primary color: `dark_brown_to_black`
- Margin: `brown_to_dark_brown`
- Surrounding tissue: green_to_brown
- Color transition: `gradual_to_sharp`
- Current/overall colors: brown, dark_brown, black, straw_brown

### Texture

- Current texture: dry, necrotic, shriveled, weakened
- Early appearance: `brown_discoloration_or_unclear`

### Pattern and Distribution

- Orientation: `transverse_or_longitudinal_along_neck`
- Distribution: `localized`
- Coalescence: `localized_to_extensive_at_neck`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `neck_below_panicle`
- Secondary location: `peduncle_and_basal_panicle_branches`

### Whole-Plant / Field-Level Features

- neck_blackening
- neck_shrinking
- weakened_panicle_attachment
- panicle_breakage
- hanging_or_drooping_panicle
- chaffiness
- partial_grain_set
- severe_yield_loss

## Hallmark Features

- blackened_neck_region
- neck_shrinking
- panicle_breakage_or_hanging
- poor_or_partial_grain_set
- chaffy_earhead
- neck_blast_is_the_most_damaging_blast_form

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- spindle_gray_centered_leaf_lesions_as_the_primary_feature
- blackened_fingers_as_the_primary_feature
- raised_powdery_rust_pustules
- honeydew_exudation
- smut_spore_balls
- green_ear_transformation

## Differential Diagnosis

### Similar Problems

- Finger Millet Blast / Leaf Blast
- Finger Millet Finger Blast
- Other causes of panicle lodging or neck necrosis
- Smut
- Panicle rot

### Diagnostic Discriminators

- Confirm that the primary lesion is at the neck rather than on the leaf blade.
- Blackening plus shrinking of the neck and impaired panicle attachment strongly separates neck blast from leaf blast.
- Check whether the panicle breaks, hangs, or shows poor grain filling.
- Distinguish a neck lesion from finger blast, where symptoms are centered on individual fingers of the earhead.
- Do not use black coloration alone; interpret it together with neck location and structural weakening.
- Treat uncertainty about the neck/peduncle boundary as uncertainty.

## Environmental Conditions

### Temperature

- Not specified as a fixed diagnostic threshold in the supplied reference.

### Humidity

- Humid conditions favor blast development.

### Rainfall / Moisture

- Moisture and prolonged wetness can favor infection.

### Soil

- Not specified in supplied reference.

> **Source status:** TNAU reports that maximum damage is caused by neck blast; the neck region turns black and shrinks, with infection at basal panicle portions causing the earhead to break away, become chaffy, and produce few shriveled grains. citeturn301050search0turn301050search13

## Crop Stage

- Most important around panicle emergence, flowering, and reproductive development.

## Reference Images

- TNAU provides an image set including infected plant, leaf blast, and finger blast; the ICAR review identifies neck blast as the most damaging blast form. citeturn301050search0turn301050search14

## Sources

- TNAU Agritech Portal — Finger millet blast, including neck blast symptoms. citeturn301050search0
- TNAU, *Diseases of Finger Millet* — neck/panicle symptoms. citeturn301050search13
- ICAR, *Indian Farming*, January 2023 — neck blast is the most damaging form. citeturn301050search14

## Machine-Comparison Notes

```yaml
plant_parts:
  - neck
  - peduncle
  - panicle
  - whole_plant
lesion_present: true
primary_shape: elongated_band_or_irregular_lesion
width_profile: uniform_or_narrowing
ends: irregular
color_transition: gradual_to_sharp
early_appearance: brown_discoloration_or_unclear
pattern_distribution: localized_band
vein_relationship: not_applicable
primary_location: neck_below_panicle
lesion_features:
  center_color: dark_brown_to_black
  texture: dry_necrotic_shriveled
whole_plant_context:
  panicle_breakage: possible
  hanging_panicle: possible
  chaffiness: possible
  poor_grain_set: possible
```
