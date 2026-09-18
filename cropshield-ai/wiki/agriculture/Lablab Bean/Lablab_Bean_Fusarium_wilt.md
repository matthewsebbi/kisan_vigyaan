# Lablab Bean + Fusarium Wilt

## Diagnostic Phenotype

### Primary Affected Plant Parts

- roots
- stem
- vascular_tissue
- leaf_blade
- whole_plant

### Symptom Class

- wilt
- diffuse_discoloration
- vascular_discoloration

### Lesion / Symptom Geometry

- Primary shape: `none_no_distinct_leaf_lesion`
- Elongation: `high_at_stem_and_vascular_level`
- Width profile: `continuous`
- Ends: `not_applicable`
- Discrete or continuous: `continuous`

### Size

- vascular discoloration may extend through affected stems; wilting can progress from individual leaves to branches and eventually much of the plant

### Color

- Center / primary color: not_applicable_no_distinct_leaf_lesion
- Margin: not_applicable
- Surrounding tissue: green_to_yellow
- Color transition: `gradual`
- Current/overall colors: green, pale_yellow, yellow, brown_in_advanced_tissue

### Texture

- Current texture: wilted, flaccid, dry_in_severe_stage
- Early appearance: `lower_leaf_yellowing_and_wilting`

### Pattern and Distribution

- Orientation: `longitudinal_at_vascular_level`
- Distribution: `progressive_whole_plant_wilt`
- Coalescence: `extensive`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `vascular_tissue_and_root_system`
- Secondary location: `leaf_blade`

### Whole-Plant / Field-Level Features

- progressive_wilting
- yellowing_of_lower_leaves
- vascular_discoloration
- stunting
- premature_leaf_drop
- plant_death_in_severe_cases

## Hallmark Features

- progressive_wilting
- yellowing_of_leaves
- vascular_discoloration
- symptoms_can_progress_from_lower_plant_parts
- severe_cases_can_result_in_plant_death

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- discrete_circular_leaf_lesions
- angular_vein_bounded_leaf_lesions
- white_powdery_surface_growth
- distinct_mosaic_pattern

## Differential Diagnosis

### Similar Problems

- Lablab Bean Collar Rot
- Root Rot
- Bacterial Wilt

### Diagnostic Discriminators

- Compare the affected plant part before interpreting leaf color.
- Check roots and stem vascular tissue when wilt is the dominant symptom.
- Distinguish systemic wilt from diseases producing discrete leaf lesions.
- Compare internal vascular discoloration with external collar or root lesions.
- Treat uncertainty in vascular or root observations as uncertainty, not as a fact.

## Environmental Conditions

### Temperature

- Warm soil and warm growing conditions can favor Fusarium wilt development.

### Humidity

- Soil moisture and environmental conditions influence disease development; exact requirements depend on the Fusarium species.

### Rainfall / Moisture

- Soil-borne infection can be favored by conducive soil moisture conditions and movement of infested soil or water.

### Soil

- Soil-borne disease; exact soil conditions should be verified for the specific Fusarium species affecting lablab bean.

> **Source status:** Environmental descriptions are qualitative. Verify species-specific climate and soil evidence before using them as quantitative diagnostic evidence.

## Crop Stage

- Can occur during vegetative and reproductive growth; disease severity depends on host susceptibility and environmental conditions.

## Reference Images

- Not specified in supplied file.

## Sources

- Disease-specific phenotype fields should be verified against authoritative lablab bean and Fusarium pathology references before deployment as a diagnostic dataset.

## Machine-Comparison Notes

```yaml
plant_parts:
  - roots
  - stem
  - vascular_tissue
  - leaf_blade
  - whole_plant
lesion_present: false
primary_shape: none_no_distinct_leaf_lesion
width_profile: continuous
ends: not_applicable
color_transition: gradual
early_appearance: lower_leaf_yellowing_and_wilting
pattern_distribution: progressive_whole_plant_wilt
vein_relationship: not_applicable
primary_location: vascular_tissue_and_root_system
secondary_locations:
  - leaf_blade
```
