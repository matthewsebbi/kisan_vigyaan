# Groundnut + Rust

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- leaf_petiole
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
- Discrete or continuous: `discrete_to_coalescing`

### Size

- pustules are small and numerous; severe infections may produce many pustules across leaflets and lead to extensive loss of green tissue

### Color

- Center / primary color: orange_to_reddish_brown
- Margin: yellow_to_brown
- Surrounding tissue: green
- Color transition: `gradual`
- Current/overall colors: orange, reddish_brown, brown, yellow, green

### Texture

- Current texture: raised, powdery, pustular
- Early appearance: `small_chlorotic_or_yellowish_spots`

### Pattern and Distribution

- Orientation: `irregular`
- Distribution: `scattered_to_extensive`
- Coalescence: `limited_to_moderate`
- Vein relationship: `not_distinctive`

### Spatial Location

- Primary location: `leaflet`
- Secondary locations: `leaf_petiole`

### Whole-Plant / Field-Level Features

- leaf_yellowing
- premature_leaf_drop
- reduced_green_leaf_area
- reduced_vigor_in_severe_cases
- premature_defoliation

## Hallmark Features

- small_orange_to_reddish_brown_pustules
- raised_pustular_lesions
- pustules_can_occur_on_leaflet_surfaces
- numerous_pustules_can_cause_extensive_leaf_damage
- severe_disease_can_cause_premature_defoliation

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- flat_circular_brown_leaf_spots_with_yellow_halos
- dark_brown_to_black_leaf_spots_without_pustules
- diffuse_mosaic_pattern_without_pustules
- white_powdery_surface_growth

## Differential Diagnosis

### Similar Problems

- Groundnut Early Leaf Spot
- Groundnut Late Leaf Spot
- Nutrient-related Leaf Discoloration

### Diagnostic Discriminators

- Identify raised pustules before interpreting orange or brown coloration as rust.
- Distinguish pustules from flat necrotic leaf spots.
- Compare lesion texture as well as color.
- Assess whether symptoms are discrete pustules or diffuse discoloration.
- Treat uncertain lesion maturity or surface location as uncertainty, not as a fact.

## Environmental Conditions

### Temperature

- Moderate to warm conditions can favor rust development.

### Humidity

- High humidity favors infection and sporulation.

### Rainfall / Moisture

- Moist conditions and leaf wetness can favor infection and disease development.

### Soil

- Not specified in supplied reference format.

> **Source status:** Environmental descriptions are qualitative. Verify local groundnut rust epidemiology before using environmental values as quantitative diagnostic evidence.

## Crop Stage

- Can occur during vegetative and reproductive growth and may become severe when favorable environmental conditions persist.

## Reference Images

- Not specified in supplied file.

## Sources

- Disease-specific phenotype fields should be verified against authoritative groundnut pathology and extension references before deployment as a diagnostic dataset.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - leaf_petiole
  - whole_plant
lesion_present: true
primary_shape: small_round_to_oval_pustules
width_profile: compact
ends: rounded
color_transition: gradual
early_appearance: small_chlorotic_or_yellowish_spots
pattern_distribution: scattered_to_extensive
vein_relationship: not_distinctive
primary_location: leaflet
secondary_locations:
  - leaf_petiole
```
