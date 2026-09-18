# Citrus Tristeza (*Citrus tristeza virus* - CTV)

## Diagnostic Phenotype

### Primary Affected Plant Parts

- twig_stems
- scion_bark_and_wood
- whole_plant

### Symptom Class

- vascular_decline_and_stem_pitting

### Lesion / Symptom Geometry

- Primary shape: `longitudinal_depressions_and_pits_in_wood`
- Elongation: `high_along_twigs`
- Width profile: `narrow_grooves`
- Ends: `tapered`
- Discrete or continuous: `scattered_or_dense_pitting`

### Size

- Pits vary from small 1 mm indents to long running grooves along stems under peeled bark.

### Color

- Center / primary color: normal_wood_with_peeled_honeycomb_pits
- Margin: not_applicable
- Surrounding tissue: pale_chlorotic_foliage
- Color transition: `gradual`
- Current/overall colors: bronzed_leaves, yellow_foliage, pale_wood

### Texture

- Current texture: pitted_honeycombed_wood, brittle_twigs, inverse_cork_projections
- Early appearance: `mild_foliar_paling_or_stunting`

### Pattern and Distribution

- Orientation: `longitudinal_along_stem`
- Distribution: `systemic`
- Coalescence: `extensive_pitting`
- Vein relationship: `vein_clearing_in_lime_leaves`

### Spatial Location

- Primary location: `twigs_branches_and_graft_union`

### Whole-Plant / Field-Level Features

- stem_pitting_under_bark
- vein_clearing_on_young_leaves
- quick_decline_or_slow_decline
- honeycombing_at_inner_face_of_bark_at_graft_union
- heavy_crop_load_of_small_fruits_on_declining_trees

## Hallmark Features

- stem_pitting_grooves_in_wood_under_peeled_bark
- vein_clearing_in_indicator_species_like_acid_lime
- graft_union_starvation_and_honeycombing
- quick_collapse_of_trees_on_sour_orange_rootstock

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present:

- raised_corky_leaf_cankers
- sticky_trunk_gumming
- asymmetric_mottle_with_lopsided_bitter_fruit
- white_powdery_foliar_growth

## Differential Diagnosis

### Similar Problems

- Citrus Greening (HLB)
- Phytophthora Root Rot
- Citrus Exocortis

### Diagnostic Discriminators

- HLB causes asymmetric mottle and lopsided fruit, whereas CTV decline presents direct stem pitting in wood under bark.
- Phytophthora Root Rot is characterized by crown lesions and root sloughing rather than wood pitting grooves.

## Environmental Conditions

### Temperature

- 18°C – 25°C favors expression of symptoms.

### Humidity

- Indirectly impacts aphid vector activity (*Toxoptera citricida*).

### Rainfall / Moisture

- Soft flushes post-rain attract aphid vectors that transmit the virus.

### Soil

- Rootstock specific; trees grafted on Sour Orange (*Citrus aurantium*) are exceptionally vulnerable to quick decline.

## Crop Stage

- Trees of any age grafted on susceptible rootstocks or infected with severe stem-pitting strains.

## Reference Images

- `citrus_tristeza_stem_pitting_01.jpg` (Deep wood depressions and grooves exposed under peeled twigs)
- `citrus_tristeza_vein_clearing_02.jpg` (Vein clearing translucent symptoms on young lime leaves)

## Sources

- FAO Plant Production and Protection Paper: Citrus Tristeza Virus Management.
- EPPO Diagnostic Standards for Citrus Tristeza Closterovirus.

## Machine-Comparison Notes

```yaml
plant_parts:
  - twig_stems
  - scion_bark_and_wood
  - whole_plant
lesion_present: true
primary_shape: longitudinal_depressions_and_pits_in_wood
width_profile: narrow_grooves
ends: tapered
color_transition: gradual
early_appearance: mild_foliar_paling_or_stunting
pattern_distribution: systemic
vein_relationship: vein_clearing_in_lime_leaves
primary_location: twigs_branches_and_graft_union
```