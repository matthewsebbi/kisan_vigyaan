# Pea + Rust

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- stem
- pods
- whole_plant

### Symptom Class

- localized_lesion
- pustule
- diffuse_discoloration

### Lesion / Symptom Geometry

- Primary shape: `small_round_to_oval_pustules`
- Elongation: `low`
- Width profile: `compact`
- Ends: `rounded`
- Discrete or continuous: `discrete`

### Size

- pustules are generally small and may occur singly or in groups; numerous pustules can produce extensive affected areas

### Color

- Center / primary color: orange_to_reddish_brown
- Margin: may be yellowish
- Surrounding tissue: green
- Color transition: `gradual`
- Current/overall colors: yellow, orange, reddish_brown, brown

### Texture

- Current texture: raised, powdery_or_pustular
- Early appearance: `small_yellowish_to_orange_spots`

### Pattern and Distribution

- Orientation: `irregular`
- Distribution: `scattered`
- Coalescence: `limited_to_moderate`
- Vein relationship: `not_distinctive`

### Spatial Location

- Primary location: `leaf_blade`
- Surface association: `may_occur_on_both_leaf_surfaces`

### Whole-Plant / Field-Level Features

- premature_leaf_yellowing
- reduced_vigor
- premature_senescence_in_severe_cases
- reduced_pod_development_in_severe_cases

## Hallmark Features

- small_orange_to_reddish_brown_pustules
- discrete_pustules
- pustules_may_become_powdery
- multiple_pustules_can_occur_on_the_same_leaf
- severe_infection_can_cause_premature_leaf_senescence

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- extensive_white_powdery_surface_growth
- downy_growth_on_lower_leaf_surface
- large_irregular_water_soaked_lesions

## Differential Diagnosis

### Similar Problems

- Pea Powdery Mildew
- Pea Downy Mildew
- Ascochyta Blight

### Diagnostic Discriminators

- Compare the affected plant part before interpreting lesion color.
- Identify discrete raised pustules rather than treating orange or brown discoloration alone as rust.
- Compare lesion geometry and texture; rust pustules are typically compact and raised.
- Distinguish orange-to-brown pustules from superficial white powdery growth.
- Treat uncertain surface orientation as uncertainty rather than a fixed diagnostic fact.

## Environmental Conditions

### Temperature

- Moderate temperatures can favor rust development, depending on the rust species.

### Humidity

- High humidity favors infection and sporulation.

### Rainfall / Moisture

- Moist conditions and leaf wetness can favor infection and disease development.

### Soil

- Not specified in supplied reference format.

> **Source status:** Rust species and environmental requirements vary; verify the specific pea rust and local epidemiology before using environmental values as diagnostic evidence.

## Crop Stage

- May occur during vegetative and reproductive stages; severity depends on host susceptibility and environmental conditions.

## Reference Images

- Not specified in supplied file.

## Sources

- Disease-specific phenotype fields should be verified against authoritative pea pathology and extension references before deployment as a diagnostic dataset.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - stem
  - pods
  - whole_plant
lesion_present: true
surface_growth_present: true
primary_shape: small_round_to_oval_pustules
width_profile: compact
ends: rounded
color_transition: gradual
early_appearance: small_yellowish_to_orange_spots
pattern_distribution: scattered
vein_relationship: not_distinctive
primary_location: leaf_blade
surface_association: may_occur_on_both_leaf_surfaces
```
