# Lablab Bean + Collar Rot

## Diagnostic Phenotype

### Primary Affected Plant Parts

- stem
- collar_region
- roots
- lower_stem
- whole_plant

### Symptom Class

- necrosis
- rot
- wilt

### Lesion / Symptom Geometry

- Primary shape: `irregular_collar_lesion`
- Elongation: `moderate_at_lower_stem`
- Width profile: `variable`
- Ends: `irregular`
- Discrete or continuous: `localized_to_coalescing`

### Size

- lesions may develop around the collar and lower stem and can expand around the stem circumference, causing progressive tissue decay and plant collapse

### Color

- Center / primary color: brown_to_dark_brown
- Margin: dark_brown
- Surrounding tissue: green_to_yellow
- Color transition: `gradual`
- Current/overall colors: brown, dark_brown, blackish_brown, yellow

### Texture

- Current texture: necrotic, soft_to_dry_rot, weakened_at_collar
- Early appearance: `brown_discoloration_at_collar_or_lower_stem`

### Pattern and Distribution

- Orientation: `transverse_to_longitudinal_at_lower_stem`
- Distribution: `localized_collar_to_progressive_stem_infection`
- Coalescence: `moderate_to_extensive`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `collar_region`
- Secondary locations: `lower_stem, roots`

### Whole-Plant / Field-Level Features

- sudden_or_progressive_wilting
- yellowing
- reduced_vigor
- stem_collapse
- plant_death_in_severe_cases

## Hallmark Features

- brown_to_dark_brown_lesion_at_collar
- decay_of_lower_stem_tissue
- progressive_wilting
- weakened_or_collapsing_stem
- root_involvement_may_occur

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- diffuse_mosaic_without_collar_lesion
- white_powdery_growth
- discrete_angular_leaf_lesions
- isolated_leaf_spots_without_stem_or_collar_involvement

## Differential Diagnosis

### Similar Problems

- Lablab Bean Fusarium Wilt
- Root Rot
- Stem Canker

### Diagnostic Discriminators

- Examine the collar and lower stem before interpreting whole-plant wilting.
- Distinguish localized collar necrosis from vascular wilt without an obvious external collar lesion.
- Check whether the stem tissue is weakened, rotted, or girdled.
- Compare root involvement when differentiating collar rot from other wilt diseases.
- Treat uncertainty in lesion depth or internal stem condition as uncertainty, not as a fact.

## Environmental Conditions

### Temperature

- Disease development can be favored by warm and conducive soil conditions, depending on the causal organism.

### Humidity

- Moist conditions can favor development of many soil- and collar-associated rots.

### Rainfall / Moisture

- Excess soil moisture and poor drainage can increase conditions favorable to collar and root rots.

### Soil

- Poorly drained or persistently wet soil may increase disease risk, but the exact relationship depends on the causal organism.

> **Source status:** Collar rot can refer to diseases caused by different pathogens. Verify the causal organism and local epidemiology before using environmental conditions as quantitative diagnostic evidence.

## Crop Stage

- May occur during early establishment and later growth, depending on the causal organism and environmental conditions.

## Reference Images

- Not specified in supplied file.

## Sources

- Disease-specific phenotype fields should be verified against authoritative lablab bean and legume pathology references before deployment as a diagnostic dataset.

## Machine-Comparison Notes

```yaml
plant_parts:
  - stem
  - collar_region
  - roots
  - lower_stem
  - whole_plant
lesion_present: true
primary_shape: irregular_collar_lesion
width_profile: variable
ends: irregular
color_transition: gradual
early_appearance: brown_discoloration_at_collar_or_lower_stem
pattern_distribution: localized_collar_to_progressive_stem_infection
vein_relationship: not_applicable
primary_location: collar_region
secondary_locations:
  - lower_stem
  - roots
```
