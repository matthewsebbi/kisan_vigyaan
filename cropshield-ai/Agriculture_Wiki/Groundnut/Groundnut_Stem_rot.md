# Groundnut Stem rot

## Diagnostic Phenotype

### Primary Affected Plant Parts

- stem
- lower_stem
- branches
- foliage

### Symptom Class

- stem_rot
- basal_stem_lesion
- wilt_and_dieback

### Lesion / Symptom Geometry

- Primary shape: `irregular_basal_stem_lesion`
- Elongation: `moderate_to_high_along_stem`
- Width profile: `localized_to_stem_with_possible_spread`
- Ends: `irregular`
- Discrete or continuous: `discrete_to_coalescing`

### Size

- lesions can enlarge around the lower stem or branches and may extend along affected stem tissue
- severe infection can involve much of the basal stem and associated branches

### Color

- Center / primary color: `light_brown_to_dark_brown`
- Margin: `brown_or_darker`
- Surrounding tissue: green initially, later yellowing or drying
- Color transition: `variable_gradual`
- Current/overall colors: pale_brown, dark_brown, tan, yellow, dry_brown

### Texture

- Current texture: soft_to_firm_rot, weakened, dry_and_brittle_in_advanced_tissue
- Early appearance: `small_basal_stem_lesion_or_discoloration`

### Pattern and Distribution

- Orientation: `longitudinal_along_stem`
- Distribution: `basal_stem_and_branch_associated`
- Coalescence: `can_become_extensive_on_stem`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `lower_stem_near_soil_line`
- Secondary locations: branches, leaflets, plant_crown

### Whole-Plant / Field-Level Features

- wilting
- yellowing_of_foliage
- branch_dieback
- rapid_loss_of_vigor
- plant_death_in_severe_cases
- possible_white_fungal_growth_or_sclerotial_structures_under_favorable_conditions

## Hallmark Features

- prominent_stem_rot_rather_than_primary_leaf_spotting
- basal_or_lower_stem_involvement
- stem_lesion_can_extend_longitudinally
- wilting_and_dieback_above_affected_stem_tissue
- severe_cases_can_cause_whole_plant_decline
- fungal_structures_may_be_present_but_should_not_be_required_for_visual_classification

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- primary_leaf_spot_pattern_without_stem_lesion
- diffuse_whole_plant_yellowing_without_stem_rot
- dominant_collar_lesion_with_characteristic_collar_decay
- primary_root_rot_without_stem_symptoms
- rust_pustules_as_the_dominant_visible_symptom

## Differential Diagnosis

### Similar Problems

- Groundnut Wilt
- Groundnut Collar rot
- Groundnut Root rot
- Groundnut Late leaf spot
- Groundnut Early leaf spot

### Diagnostic Discriminators

- Compare the affected plant part before interpreting lesion color.
- A basal or lower-stem lesion is more informative than generalized yellowing alone.
- Distinguish external stem/collar lesions from internal vascular discoloration associated with wilt.
- Compare lesion geometry and location along the stem before labeling a symptom as a general wilt.
- White fungal growth or sclerotial structures can be supportive when present, but their absence should not alone exclude the disease.
- Treat uncertain observation of the soil-line region as uncertainty rather than assuming a collar or basal-stem lesion.

## Environmental Conditions

### Temperature

- Disease development is favored by warm conditions in many stem-rot pathosystems, but quantitative thresholds should be verified for the specific causal organism.

### Humidity

- Moist conditions can support fungal development; exact humidity thresholds should be verified before use as diagnostic evidence.

### Rainfall / Moisture

- Moist soil and periods favorable for fungal growth may increase disease risk; quantitative rainfall or soil-moisture thresholds require verification.

### Soil

- Soilborne inoculum and soil conditions around the stem base are relevant; specific soil associations should be verified for the causal organism.

> **Source status:** Environmental descriptions are general context and should be verified against authoritative groundnut pathology and extension references before being used as quantitative diagnostic evidence.

## Crop Stage

- can become conspicuous during established crop growth
- exact stage and timing should be verified for the specific causal organism

## Reference Images

- Not specified in supplied file.

## Sources

- Disease-specific phenotype fields should be verified against authoritative groundnut pathology and extension references before deployment as a diagnostic dataset.

## Machine-Comparison Notes

```yaml
plant_parts:
  - stem
  - lower_stem
  - branches
  - foliage
lesion_present: true
primary_shape: irregular_basal_stem_lesion
width_profile: localized_to_stem_with_possible_spread
ends: irregular
color_transition: variable_gradual
early_appearance: small_basal_stem_lesion_or_discoloration
pattern_distribution: basal_stem_and_branch_associated
vein_relationship: not_applicable
primary_location: lower_stem_near_soil_line
secondary_locations:
  - branches
  - leaflets
  - plant_crown
```
