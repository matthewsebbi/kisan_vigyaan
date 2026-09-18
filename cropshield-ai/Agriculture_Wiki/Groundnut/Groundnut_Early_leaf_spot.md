# Groundnut + Early Leaf Spot

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

- Primary shape: `circular_to_subcircular`
- Elongation: `low`
- Width profile: `compact`
- Ends: `rounded`
- Discrete or continuous: `discrete_to_coalescing`

### Size

- lesions are generally small and circular to subcircular; numerous lesions may occur on individual leaflets and can coalesce as disease severity increases

### Color

- Center / primary color: tan_to_brown
- Margin: yellow_to_bright_yellow
- Surrounding tissue: green
- Color transition: `gradual`
- Current/overall colors: brown, tan, yellow, green

### Texture

- Current texture: dry, necrotic
- Early appearance: `small_brown_to_olive_spots`

### Pattern and Distribution

- Orientation: `irregular`
- Distribution: `scattered`
- Coalescence: `moderate`
- Vein relationship: `not_distinctive`

### Spatial Location

- Primary location: `leaflet`
- Secondary locations: `leaf_petiole`

### Whole-Plant / Field-Level Features

- premature_leaf_yellowing
- leaflet_defoliation
- reduced_green_leaf_area
- reduced_vigor_in_severe_cases
- premature_leaf_drop

## Hallmark Features

- small_circular_to_subcircular_leaf_spots
- tan_to_brown_lesion_centers
- yellow_halos_may_surround_lesions
- lesions_are_often_more_abundant_on_upper_leaf_surfaces
- severe_disease_can_cause_defoliation

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- large_dark_lesions_with_prominent_black_spore_structures
- orange_to_reddish_brown_rust_pustules
- diffuse_mosaic_pattern_without_discrete_lesions
- white_powdery_surface_growth

## Differential Diagnosis

### Similar Problems

- Groundnut Late Leaf Spot
- Groundnut Rust
- Cercospora-related Leaf Spot

### Diagnostic Discriminators

- Compare lesion geometry before interpreting lesion color.
- Check lesion size, halo development, and surface distribution.
- Distinguish early leaf spot lesions from late leaf spot lesions using lesion color, sporulation, and leaflet-surface distribution.
- Distinguish discrete leaf spots from orange rust pustules.
- Treat uncertainty in lesion maturity or surface location as uncertainty, not as a fact.

## Environmental Conditions

### Temperature

- Warm conditions can favor early leaf spot development.

### Humidity

- High humidity favors infection and sporulation.

### Rainfall / Moisture

- Frequent rainfall, high leaf wetness, and splash dispersal favor disease development.

### Soil

- Not specified in supplied reference format.

> **Source status:** Environmental descriptions are qualitative. Verify local groundnut disease-epidemiology sources before using environmental values as quantitative diagnostic evidence.

## Crop Stage

- Commonly develops during vegetative growth and can increase in severity as the crop canopy develops.

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
primary_shape: circular_to_subcircular
width_profile: compact
ends: rounded
color_transition: gradual
early_appearance: small_brown_to_olive_spots
pattern_distribution: scattered
vein_relationship: not_distinctive
primary_location: leaflet
secondary_locations:
  - leaf_petiole
```
