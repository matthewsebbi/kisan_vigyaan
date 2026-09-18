# Pigeon Pea Fusarium Wilt

## Diagnostic Phenotype

### Primary Affected Plant Parts
- root
- stem
- vascular_tissue
- leaf
- whole_plant

### Symptom Class
- vascular_wilt
- systemic_discoloration
- plant_dieback

### Lesion / Symptom Geometry
- Primary shape: `elongated_stem_band_or_internal_vascular_discoloration`
- Elongation: `high_along_stem`
- Width profile: `uniform_or_streak_like`
- Ends: `irregular`
- Discrete or continuous: `continuous_systemic_wilt`

### Size
- External stem discoloration may form bands or streaks extending upward from the base.
- Internal vascular discoloration may extend from roots into the stem.
- Whole branches or entire plants may progressively wilt.

### Color
- Center / primary color: `yellow_to_brown_or_black`
- Margin: `purple_to_dark_brown`
- Surrounding tissue: green_to_yellow
- Color transition: `gradual_to_sharp`
- Current/overall colors: pale_yellow, bright_yellow, brown, dark_brown, purple, black

### Texture
- Current texture: wilted, flaccid, dry_in_advanced_stage
- Early appearance: `loss_of_turgidity_and_slight_interveinal_chlorosis`

### Pattern and Distribution
- Orientation: `vertical_along_stem`
- Distribution: `progressive_from_lower_plant_upward`
- Coalescence: `systemic`
- Vein relationship: `not_applicable_for_stem_interveinal_on_leaf`

### Spatial Location
- Primary location: `root_and_lower_stem`
- Secondary location: `vascular_tissue_and_upper_stem`
- Leaf expression: `lower_leaves_often_droop_and_yellow`

### Whole-Plant / Field-Level Features
- lower_leaf_drooping
- gradual_yellowing
- interveinal_chlorosis
- progressive_wilting
- leaf_drying
- vascular_browning
- purple_or_dark_stem_band
- branch_dieback
- whole_plant_death

## Hallmark Features
- gradual_wilting
- loss_of_leaf_turgidity
- yellowing_and_interveinal_chlorosis
- vascular_browning
- purple_or_dark_band_on_stem
- band_extends_upward_from_base
- internal_stem_discoloration
- progressive_death_of_affected_plant

## Negative / Exclusion Features
- mosaic_chlorotic_ring_spots_with_persistent_bushy_growth
- water_soaked_stem_lesions_near_ground_level
- circular_concentric_leaf_spots
- raised_rust_pustules
- green_vegetative_plant_without_wilting

## Differential Diagnosis

### Similar Problems
- Pigeon Pea Sterility Mosaic Disease
- Pigeon Pea Phytophthora Blight
- Root rot / wilt complex
- Other vascular wilt diseases

### Diagnostic Discriminators
- Give high diagnostic weight to progressive wilt plus vascular browning.
- Examine the stem internally when possible because xylem discoloration is a key discriminator.
- Distinguish Fusarium wilt from Phytophthora by vascular-wilt symptoms versus water-soaked external stem lesions.
- Distinguish wilt from SMD by loss of turgidity, drying, and vascular discoloration rather than persistent bushy sterility.

## Environmental Conditions

### Temperature
- Not specified as a single diagnostic threshold.

### Humidity
- Not specified as a standalone diagnostic feature.

### Rainfall / Moisture
- Environment affects disease expression; no fixed threshold is used here.

### Soil
- Soil-borne disease; inoculum survives in soil and crop residues.

> **Source status:** *Fusarium udum* is a soil-borne pathogen of pigeonpea. Documented symptoms include gradual chlorosis, drooping, death, vascular discoloration, purple stem bands, lower-leaf drooping, and interveinal chlorosis. citeturn824788search0turn824788search1turn824788search2

## Crop Stage
- Infection can begin from seedling stage.
- Disease expression is often prominent around flowering and podding.

## Reference Images
![Pigeon Pea Fusarium Wilt symptoms](https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2016.00253/full)

## Sources
- BMC Plant Biology, distribution and pathogenic diversity of *Fusarium udum*. citeturn824788search0
- Frontiers in Plant Science, environmental influences on pigeonpea-*F. udum* interactions. citeturn824788search3
- ICRISAT, *Handbook of Pigeonpea Diseases*. citeturn902246search7

## Machine-Comparison Notes

```yaml
plant_parts:
  - root
  - stem
  - vascular_tissue
  - leaf
  - whole_plant
lesion_present: false_or_stem_band
primary_shape: elongated_stem_band_or_internal_vascular_discoloration
width_profile: uniform_or_streak_like
ends: irregular
color_transition: gradual_to_sharp
early_appearance: loss_of_turgidity_and_slight_interveinal_chlorosis
pattern_distribution: progressive_from_lower_plant_upward
vein_relationship: not_applicable_for_stem
primary_location: root_and_lower_stem
whole_plant_context:
  wilting: progressive
  leaf_yellowing: true
  interveinal_chlorosis: possible
  vascular_browning: diagnostic_feature
  purple_stem_band: diagnostic_support
  plant_death: possible
```
