# Citrus Greening / Huanglongbing (*Candidatus* Liberibacter asiaticus)

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- fruit
- whole_plant

### Symptom Class

- asymmetric_mottle_and_nutrient_chlorosis

### Lesion / Symptom Geometry

- Primary shape: `none_diffuse_asymmetric_mottle`
- Elongation: `not_applicable`
- Width profile: `continuous`
- Ends: `not_applicable`
- Discrete or continuous: `continuous`

### Size

- Affects individual shoots initially, spreading throughout the entire canopy over time.

### Color

- Center / primary color: blotchy_yellow_and_green
- Margin: indistinct
- Surrounding tissue: pale_green_to_yellow
- Color transition: `gradual`
- Current/overall colors: blotchy_yellow, mottled_green, corked_yellow_veins

### Texture

- Current texture: thickened, leathery, corked_veins, small_lopsided_fruit
- Early appearance: `yellowing_of_a_single_shoot_yellow_shoot`

### Pattern and Distribution

- Orientation: `asymmetric_across_leaf_midrib`
- Distribution: `sectorial_then_systemic`
- Coalescence: `extensive`
- Vein relationship: `yellowed_veins_corking`

### Spatial Location

- Primary location: `canopy_sectors_extending_whole_tree`

### Whole-Plant / Field-Level Features

- asymmetrical_blotchy_leaf_mottle
- yellow_shoot_symptom
- lopsided_small_bitter_fruit
- inverted_fruit_coloration_green_at_stylar_end
- severe_root_dieback_and_tree_decline

## Hallmark Features

- asymmetrical_blotchy_mottle_across_leaf_midrib
- corky_yellowed_veins
- lopsided_fruit_with_dark_abortive_seeds
- sectorial_yellowing_of_canopy

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present:

- symmetrical_zinc_deficiency_chlorosis
- discrete_corky_canker_spots
- sticky_gum_exudate_on_trunk
- powdery_leaf_growth

## Differential Diagnosis

### Similar Problems

- Zinc / Iron / Manganese Deficiency
- Citrus Tristeza Virus (CTV)
- Root Rot (*Phytophthora*)

### Diagnostic Discriminators

- Nutrient deficiencies produce symmetrical chlorosis patterns on both sides of the leaf midrib, whereas HLB mottle is distinctly asymmetrical.
- CTV causes stem pitting and general decline without the characteristic lopsided, inverted-color fruit.

## Environmental Conditions

### Temperature

- Heat sensitive; symptoms are most pronounced in moderate temperatures (20°C–28°C).

### Humidity

- Indirectly linked via psyllid vector (*Diaphorina citri*) breeding conditions.

### Rainfall / Moisture

- Flushing cycles triggered by rainfall provide young tissue preferred by psyllid vectors.

### Soil

- Non-specific; symptoms worsen in nutrient-depleted soils.

## Crop Stage

- All tree ages; young orchards decline rapidly, whereas mature trees experience gradual productivity loss.

## Reference Images

- `citrus_hlb_leaf_mottle_01.jpg` (Asymmetrical blotchy chlorosis on citrus foliage)
- `citrus_hlb_lopsided_fruit_02.jpg` (Small lopsided fruit showing color inversion and aborted seeds)

## Sources

- USDA Agricultural Research Service: Huanglongbing Biology and Management.
- EPPO Data Sheets on Plant Pests: *Candidatus* Liberibacter species.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - fruit
  - whole_plant
lesion_present: false
primary_shape: none_diffuse_asymmetric_mottle
width_profile: continuous
ends: not_applicable
color_transition: gradual
early_appearance: yellowing_of_a_single_shoot_yellow_shoot
pattern_distribution: sectorial_then_systemic
vein_relationship: yellowed_veins_corking
primary_location: canopy_sectors_extending_whole_tree
```