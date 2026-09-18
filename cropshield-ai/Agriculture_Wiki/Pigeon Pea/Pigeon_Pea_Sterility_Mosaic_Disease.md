# Pigeon Pea Sterility Mosaic Disease

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade
- leaflets
- shoot
- whole_plant

### Symptom Class
- mosaic_discoloration
- chlorotic_ring_spot
- systemic_vegetative_abnormality
- reproductive_sterility

### Lesion / Symptom Geometry
- Primary shape: `none_no_distinct_lesion_or_chlorotic_ring`
- Elongation: `low_at_leaflet_level`
- Width profile: `variable`
- Ends: `not_applicable`
- Discrete or continuous: `mosaic_or_discrete_ring_spots`

### Size
- Symptoms may occur as diffuse mosaic mottling across leaflets.
- Chlorotic ring spots may occur as discrete circular or ring-shaped symptoms.
- Infected leaves may be smaller than normal.
- Whole plants may remain short, bushy, and excessively vegetative.

### Color
- Center / primary color: `light_green_to_dark_green_mosaic_or_green_island`
- Margin: `chlorotic_yellow`
- Surrounding tissue: green
- Color transition: `sharp_in_ring_spots_and_variable_in_mosaic`
- Current/overall colors: pale_green, dark_green, yellow, chlorotic_yellow

### Texture
- Current texture: generally smooth; reduced_leaf_size_in_severe_cases
- Early appearance: `mosaic_mottling_or_chlorotic_ring_spots`

### Pattern and Distribution
- Orientation: `variable`
- Distribution: `mosaic_diffuse_or_discrete_ring_spots`
- Coalescence: `variable`
- Vein relationship: `not_applicable_or_follows_leaflet_pattern`

### Spatial Location
- Primary location: `leaf_blade_leaflets`
- Secondary location: `new_shoots_and_whole_plant`

### Whole-Plant / Field-Level Features
- stunting
- shortened_internodes
- excessive_vegetative_growth
- crowded_terminal_branches
- bushy_appearance
- reduced_leaf_size
- partial_sterility
- complete_sterility
- delayed_or_absent_flowering
- few_or_no_pods

## Hallmark Features
- mosaic_leaf_symptoms
- chlorotic_ring_spots
- reduced_leaf_size
- stunted_bushy_plants
- excessive_vegetative_growth
- partial_to_complete_cessation_of_flowering
- severe_cases_remain_green_and_vegetative_without_normal_pod_set

## Negative / Exclusion Features
- unilateral_wilting_with_vascular_browning
- purple_stem_band_with_progressive_wilt
- water_soaked_stem_or_leaf_lesions
- circular_concentric_necrotic_leaf_spots
- severe_localized_stem_canker_as_primary_symptom
- widespread_raised_spore_pustules

## Differential Diagnosis

### Similar Problems
- Pigeon Pea Fusarium Wilt
- Nutritional chlorosis
- Other mosaic or virus-like diseases
- Phytophthora Blight
- Alternaria Blight

### Diagnostic Discriminators
- Give high diagnostic weight to mosaic/ring-spot symptoms together with flowering sterility.
- Distinguish SMD from Fusarium wilt by the absence of primary vascular-wilt symptoms and the persistence of vegetative, bushy growth.
- Distinguish chlorotic rings from discrete necrotic leaf spots.
- Evaluate reproductive development rather than leaf color alone.
- Treat genotype- and infection-stage-dependent variation as uncertainty.

## Environmental Conditions

### Temperature
- Not specified as a single diagnostic threshold.

### Humidity
- Not a standalone diagnostic feature; symptom expression depends strongly on host, virus strain, infection stage, and vector activity.

### Rainfall / Moisture
- Not specified as a standalone diagnostic threshold.

### Soil
- Not a primary diagnostic feature.

> **Source status:** SMD is associated with Pigeonpea sterility mosaic viruses (PPSMV-I and PPSMV-II) and transmitted by the eriophyid mite *Aceria cajani*. Documented symptoms include yellow mosaic or chlorotic ring spots, reduced leaf size, stunting, excessive vegetative growth, and partial-to-complete cessation of flowering. citeturn139298search0turn139298search1turn139298search3

## Crop Stage
- Symptoms depend on host genotype and infection stage.
- Infection before flowering can produce severe sterility.

## Reference Images
![Pigeon Pea Sterility Mosaic Disease symptoms](https://www.frontiersin.org/journals/sustainable-food-systems/articles/10.3389/fsufs.2024.1386823/full)

## Sources
- ICRISAT, *Sterility Mosaic Disease of Pigeonpea: Current Status, Disease Management Strategies, and Future Prospects*. citeturn139298search1
- ICRISAT, *Biology, Etiology and Management of Pigeonpea Sterility Mosaic Disease*. citeturn902246search0
- TNAU Agritech Portal, Redgram Sterility Mosaic Disease. citeturn139298search3

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - leaflets
  - shoot
  - whole_plant
lesion_present: false_or_ring_spot
primary_shape: none_no_distinct_lesion_or_chlorotic_ring
width_profile: variable
ends: not_applicable
color_transition: sharp_in_ring_spots_and_variable_in_mosaic
early_appearance: mosaic_mottling_or_chlorotic_ring_spots
pattern_distribution: mosaic_diffuse_or_discrete_ring_spots
vein_relationship: not_applicable_or_follows_leaflet_pattern
primary_location: leaf_blade_leaflets
whole_plant_context:
  stunting: true
  shortened_internodes: true
  excessive_vegetative_growth: true
  bushy_growth: true
  reduced_leaf_size: true
  flowering: partial_to_absent
  sterility: partial_to_complete
  pod_set: reduced_or_absent
```
