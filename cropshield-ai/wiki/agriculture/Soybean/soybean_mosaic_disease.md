# Soybean Mosaic Disease

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- whole_plant
- seed_coat

### Symptom Class

- mosaic_mottling
- foliar_distortion
- plant_stunting

### Lesion / Symptom Geometry

- Primary shape: `irregular_mottled_patches`
- Elongation: `low_to_moderate`
- Width profile: `variable`
- Ends: `not_applicable`
- Discrete or continuous: `continuous_mosaic_pattern`

### Size

- Affects entire expanding leaf blades; leaflet size is often significantly reduced and puckered.

### Color

- Center / primary color: light_green, yellow_green
- Margin: dark_green_raised_islands
- Surrounding tissue: normal_to_pale_green
- Color transition: `gradual_to_interspersed`
- Current/overall colors: alternating_light_and_dark_green, yellow_mottling, dark_mottled_seed_coat

### Texture

- Current texture: rugose, puckered, blistered, downward_curling_margins, brittle
- Early appearance: `clearing_of_veins_in_young_trioliates`

### Pattern and Distribution

- Orientation: `random_interveinal_mottling`
- Distribution: `systemic_throughout_younger_foliage`
- Coalescence: `extensive_covering_entire_leaflets`
- Vein relationship: `vein_clearing_and_interveinal_puckering`

### Spatial Location

- Primary location: `younger_upper_canopy_leaves`

### Whole-Plant / Field-Level Features

- severe_plant_stunting
- shortened_internodes
- reduced_pod_set_and_size
- seed_coat_mottling_brown_or_black_discoloration
- delayed_maturity_green_stem_syndrome

## Hallmark Features

- alternating_light_and_dark_green_mosaic_pattern
- downward_puckering_and_rugosity_of_young_trifoliate_leaves
- systemic_stunting_of_the_plant
- black_or_brown_pigment_mottling_bleeding_from_hilum_on_seeds

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- raised_powdery_spore_pustules
- angular_water_soaked_lesions_with_yellow_halos
- microsclerotia_dust_inside_lower_stem_pith
- necrotic_target_board_concentric_rings

## Differential Diagnosis

### Similar Problems

- Bean Pod Mottle Virus (BPMV)
- Peanut Stunt Virus (PSV)
- Herbicide Drift Injury (e.g., 2,4-D or dicamba damage)

### Diagnostic Discriminators

- Soybean Mosaic Virus produces characteristic downward leaf puckering with dark green rugose blisters, whereas herbicide drift often produces severe strapping or cupping without true mosaic mottling.
- BPMV typically shows lighter yellow mottling without severe rugosity, though dual infection is common.

## Environmental Conditions

### Temperature

- Cool to moderate temperatures (20°C–25°C) favor severe symptom development; high temperatures (>30°C) may mask foliar symptoms.

### Humidity

- Indirect effect; relative humidity influences vector (aphid) activity and movement.

### Rainfall / Moisture

- Not directly moisture dependent; spread primarily by aphid vectors in non-persistent manner and through infected seed.

### Soil

- High soil fertility promotes lush growth, attracting higher aphid vector populations.

## Crop Stage

- Systemic symptoms are most severe when plants are infected early (emergence to V-4); seed transmission occurs if infection happens prior to flowering (R-1).

## Reference Images

- `soybean_mosaic_puckered_leaf.jpg`
- `soybean_mosaic_seed_mottling.jpg`

## Sources

- APS Compendium of Soybean Diseases; University Extension Plant Pathology Guides.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - whole_plant
  - seed_coat
lesion_present: false
primary_shape: irregular_mottled_patches
width_profile: variable
ends: not_applicable
color_transition: gradual_to_interspersed
early_appearance: clearing_of_veins_in_young_trioliates
pattern_distribution: systemic_throughout_younger_foliage
vein_relationship: vein_clearing_and_interveinal_puckering
primary_location: younger_upper_canopy_leaves
```