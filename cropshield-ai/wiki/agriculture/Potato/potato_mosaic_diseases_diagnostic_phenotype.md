# Potato Mosaic Diseases (PVY / PVX)

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- whole_plant

### Symptom Class

- mosaic_mottling
- leaf_rugosity
- streak_necrosis

### Lesion / Symptom Geometry

- Primary shape: `irregular_mottling_patches`
- Elongation: `variable`
- Width profile: `interveinal_mottling`
- Ends: `not_applicable`
- Discrete or continuous: `diffuse_systemic`

### Size

- Interveinal patches varying from 1 mm to multi-millimeter blotches across entire leaf area.

### Color

- Center / primary color: pale_green_to_yellowish
- Margin: dark_green
- Surrounding tissue: normal_green
- Color transition: `gradual`
- Current/overall colors: alternating_light_green_dark_green_yellowish

### Texture

- Current texture: wrinkled, rugose, puckered, crinkled
- Early appearance: `faint_light_green_mottling`

### Pattern and Distribution

- Orientation: `interveinal`
- Distribution: `diffuse_mosaic`
- Coalescence: `systemic_throughout_canopy`
- Vein relationship: `bounded_by_or_interspersed_between_veins`

### Spatial Location

- Primary location: `young_expanding_leaves_and_apical_growth`

### Whole-Plant / Field-Level Features

- rugose_puckered_leaves
- stunted_plant_canopy
- vein_necrosis_underside_leaf_in_severe_pvy
- premature_leaf_drop_bottom_leaves

## Hallmark Features

- alternating_light_and_dark_green_mottling
- puckered_wrinkled_rugose_leaflet_surface
- downcurved_leaf_margins
- leaf_drop_streak_symptoms_in_severe_pvy_strains

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- large_concentric_target_spots
- water_soaked_rapidly_expanding_blight
- black_crusts_on_tuber_skin
- leathery_upward_rolled_stiff_leaves

## Differential Diagnosis

### Similar Problems

- Calico Disease (Alfalfa Mosaic Virus)
- Herbicide Drift Injury
- Nutrient Imbalance (e.g., Magnesium deficiency)

### Diagnostic Discriminators

- Check leaf surface: Mosaic viruses cause puckered, rugose texture paired with mosaic green patterning.
- Inspect leaf undersides for dark streak necrosis along leaf veins (indicative of $PVY^{N}$ or $PVY^{O}$ strains).
- Verify lack of sharp target rings or large rotting blighted areas.

## Environmental Conditions

### Temperature

- Symptoms prominent at moderate temperatures (18°C to 25°C); high heat (>30°C) can mask mottling symptoms.

### Humidity

- Indirectly relevant to vector (aphid) dynamics.

### Rainfall / Moisture

- Non-specific impact on virus development.

### Soil

- Highly fertile conditions encourage vigorous growth which makes symptoms visually prominent.

## Crop Stage

- Vegetative growth stage through maturity.

## Reference Images

- `potato_mosaic_pvy_mottling_leaf.jpg`
- `potato_mosaic_rugose_puckering.jpg`

## Sources

- International Committee on Taxonomy of Viruses (ICTV) - Potyviridae.
- Potato Virus Y (PVY) Diagnostics Field Guide - University Extension.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - whole_plant
lesion_present: false
primary_shape: irregular_mottling_patches
width_profile: interveinal_mottling
ends: not_applicable
color_transition: gradual
early_appearance: faint_light_green_mottling
pattern_distribution: diffuse_mosaic
vein_relationship: bounded_by_or_interspersed_between_veins
primary_location: young_expanding_leaves_and_apical_growth
```