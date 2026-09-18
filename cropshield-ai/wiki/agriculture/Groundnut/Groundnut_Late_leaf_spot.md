# Groundnut + Late Leaf Spot

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- leaf_petiole
- whole_plant

### Symptom Class

- localized_lesion
- necrosis
- diffuse_discoloration

### Lesion / Symptom Geometry

- Primary shape: `circular_to_oval`
- Elongation: `low`
- Width profile: `compact`
- Ends: `rounded`
- Discrete or continuous: `discrete_to_coalescing`

### Size

- lesions are generally small, circular to oval, and dark; numerous lesions may develop on leaflets and can coalesce under severe disease

### Color

- Center / primary color: dark_brown_to_black
- Margin: dark_brown
- Surrounding tissue: green_to_yellow
- Color transition: `gradual`
- Current/overall colors: dark_brown, blackish_brown, yellow, green

### Texture

- Current texture: dry, necrotic, slightly_raised_or_rough
- Early appearance: `small_dark_leaf_spots`

### Pattern and Distribution

- Orientation: `irregular`
- Distribution: `scattered_to_extensive`
- Coalescence: `moderate_to_extensive`
- Vein relationship: `not_distinctive`

### Spatial Location

- Primary location: `leaflet`
- Secondary locations: `leaf_petiole`

### Whole-Plant / Field-Level Features

- premature_leaf_yellowing
- extensive_defoliation
- reduced_green_leaf_area
- reduced_vigor
- premature_maturity_in_severe_cases

## Hallmark Features

- dark_brown_to_black_leaf_spots
- circular_to_oval_lesions
- lesions_can_become_numerous_and_coalesce
- disease_can_cause_severe_defoliation
- symptoms_are_often_prominent_on_lower_leaf_surfaces

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- prominent_yellow_halos_around_small_early_lesions_as_dominant_feature
- orange_to_reddish_brown_rust_pustules
- diffuse_mosaic_pattern_without_discrete_lesions
- white_powdery_surface_growth

## Differential Diagnosis

### Similar Problems

- Groundnut Early Leaf Spot
- Groundnut Rust
- Cercospora-related Leaf Spot

### Diagnostic Discriminators

- Compare lesion color and geometry before treating every brown spot as the same leaf spot disease.
- Check the relative distribution of lesions on upper and lower leaflet surfaces.
- Distinguish dark late leaf spot lesions from early leaf spot lesions with prominent yellow halos.
- Distinguish discrete necrotic lesions from rust pustules.
- Treat uncertainty in lesion age or surface location as uncertainty, not as a fact.

## Environmental Conditions

### Temperature

- Warm conditions can favor late leaf spot development.

### Humidity

- High humidity favors infection and sporulation.

### Rainfall / Moisture

- Frequent rainfall and prolonged leaf wetness favor disease development and spread.

### Soil

- Not specified in supplied reference format.

> **Source status:** Environmental descriptions are qualitative. Verify local groundnut disease-epidemiology sources before using environmental values as quantitative diagnostic evidence.

## Crop Stage

- Often becomes increasingly important during later vegetative and reproductive growth as the canopy becomes dense.

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
primary_shape: circular_to_oval
width_profile: compact
ends: rounded
color_transition: gradual
early_appearance: small_dark_leaf_spots
pattern_distribution: scattered_to_extensive
vein_relationship: not_distinctive
primary_location: leaflet
secondary_locations:
  - leaf_petiole
```
