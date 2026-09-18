# Pearl Millet Downy Mildew / Green Ear

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- leaf_sheath
- panicle
- spikelet
- whole_plant

### Symptom Class

- systemic_disease
- chlorotic_leaf_symptoms
- green_ear_inflorescence

### Lesion / Symptom Geometry

- Primary shape: `none_or_indistinct_on_panicle`
- Elongation: `high_at_leaf_level`
- Width profile: `continuous_or_diffuse`
- Ends: `not_applicable_or_indistinct`
- Discrete or continuous: `continuous_or_diffuse_on_affected_leaf_tissue`

### Size

- Leaf symptoms may extend along substantial portions of the leaf blade.
- Systemically affected plants may show symptoms on multiple leaves.
- The panicle may be substantially transformed into a malformed, leafy green-ear structure.

### Color

- Center / primary color: `yellow_to_yellow_green_on_leaf`
- Margin: `not_distinct`
- Surrounding tissue: green
- Color transition: `gradual`
- Current/overall colors: yellow, yellow_green, green
- Green-ear structures: green to pale_green
- Downy growth, when visible: white_to_grayish_white

### Texture

- Current texture: smooth_on_leaf, chlorotic, potentially dry_or_brittle_in_severe_leaf_symptoms, downy_or_velvety_when_fungal_growth_is_visible
- Early appearance: `water_soaked_or_chlorotic_or_unclear`

### Pattern and Distribution

- Orientation: `longitudinal_on_leaf`
- Distribution: `parallel_streaks_or_continuous_chlorosis_on_leaf; malformed_panicle_on_inflorescence`
- Coalescence: `extensive_in_severe_or_systemic_cases`
- Vein relationship: `follows_leaf_axis_longitudinally_or_not_applicable`

### Spatial Location

- Primary location: `leaf_blade_and_panicle`
- Leaf symptoms: `leaf_base_or_tip_or_between_regions_depending_on_stage`
- Inflorescence symptoms: `panicle_or_spikelet`

### Whole-Plant / Field-Level Features

- stunting
- reduced_tillering
- chlorotic_or_yellowish_leaves
- systemic_infection
- malformed_panicle
- green_ear
- reduced_or_absent_normal_grain_formation
- leafy_floret_or_spikelet_structures
- delayed_or_failed_panicle_development

## Hallmark Features

- green_ear
- panicle_transformed_into_leafy_or_malformed_structure
- chlorotic_yellow_to_yellow_green_leaf_symptoms
- systemic_disease_can_affect_multiple_leaves
- reduced_or_absent_normal_grain_formation
- downy_growth_may_be_visible_on_affected_tissue
- stunting_and_reduced_tillering_may_occur

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- spindle_diamond_leaf_lesions_without_green_ear
- discrete_circular_brown_leaf_spots
- typical_linear_necrotic_streaks_as_the_primary_symptom
- black_or_brown_smut_balls_replacing_grains
- normal_undistorted_panicle_with_only_isolated_leaf_spots

## Differential Diagnosis

### Similar Problems

- Blast
- Leaf Spot / Brown Spot
- Rust
- Smut diseases
- Other causes of panicle malformation
- Nutritional chlorosis

### Diagnostic Discriminators

- Identify the affected plant part before interpreting color or lesion morphology.
- Give high diagnostic weight to a malformed leafy panicle or `green_ear` phenotype.
- Distinguish diffuse chlorosis and longitudinal leaf symptoms from discrete necrotic lesions.
- Distinguish systemic panicle transformation from diseases producing only localized leaf lesions.
- Distinguish green-ear symptoms from smut diseases that produce discrete dark or black spore masses.
- Treat visible downy growth as supporting evidence rather than relying on color alone.
- Do not infer disease from chlorosis alone; evaluate panicle morphology and whole-plant context.
- Treat uncertainty in panicle, spikelet, or leaf-part identification as uncertainty rather than as a fact.

## Environmental Conditions

### Temperature

- Not specified in supplied reference.

### Humidity

- Not specified in supplied reference.

### Rainfall / Moisture

- Not specified in supplied reference.

### Soil

- Not specified in supplied reference.

> **Source status:** This phenotype entry is structured from the supplied Rice Tungro phenotype format and adapted specifically to Pearl Millet Downy Mildew / Green Ear. Environmental values have not been inserted without verification. Populate these fields with verified crop-pathogen evidence before using them as diagnostic evidence.

## Crop Stage

- Most important during vegetative growth through panicle development.
- Exact crop-stage thresholds not specified in supplied reference.

## Reference Images

- Not specified in supplied reference.

## Sources

- Phenotype structure adapted from the supplied `Rice Tungro` reference.
- Disease-specific features should be validated against authoritative Pearl Millet Downy Mildew / Green Ear pathology references before use as ground-truth training labels.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - leaf_sheath
  - panicle
  - spikelet
  - whole_plant

lesion_present: false_or_indistinct

primary_shape: none_or_indistinct_on_panicle
width_profile: continuous_or_diffuse
ends: not_applicable_or_indistinct

color_transition: gradual
early_appearance: water_soaked_or_chlorotic_or_unclear

pattern_distribution: continuous_or_diffuse_on_leaf
vein_relationship: follows_leaf_axis_longitudinally_or_not_applicable

primary_location: leaf_blade_and_panicle

whole_plant_context:
  stunting: possible
  reduced_tillering: possible
  systemic_infection: possible
  green_ear: diagnostic_feature
  malformed_panicle: diagnostic_feature
  normal_grain_formation: reduced_or_absent_in_affected_panicle
  downy_growth: may_be_present
```
