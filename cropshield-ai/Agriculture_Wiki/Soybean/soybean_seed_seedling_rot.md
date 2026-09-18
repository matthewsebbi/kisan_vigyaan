# Soybean Seed / Seedling Rot

## Diagnostic Phenotype

### Primary Affected Plant Parts

- seed
- hypocotyl
- radicle
- primary_root
- whole_plant

### Symptom Class

- pre_emergence_damping_off
- post_emergence_damping_off
- root_and_stem_rot

### Lesion / Symptom Geometry

- Primary shape: `girdling_band`
- Elongation: `high_along_hypocotyl`
- Width profile: `encircling_stem`
- Ends: `diffuse_to_tapered`
- Discrete or continuous: `continuous_stem_decay`

### Size

- Affects entire seed during pre-emergence rot; hypocotyl lesions range from 10 mm to full seedling root length (50-100 mm).

### Color

- Center / primary color: soft_brown, dark_brown, black, reddish_brown
- Margin: water_soaked_grey, tan
- Surrounding tissue: pale_yellow, chlorotic_cotyledons
- Color transition: `gradual_to_abrupt`
- Current/overall colors: water_soaked_brown, dark_brown, soft_black, tan

### Texture

- Current texture: soft, mushy, water_soaked, collapsed, shredded_in_dry_soil
- Early appearance: `water_soaked`

### Pattern and Distribution

- Orientation: `longitudinal_and_girdling`
- Distribution: `localized_at_soil_line_and_root_zone`
- Coalescence: `extensive_tissue_collapse`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `seed_and_hypocotyl_below_or_at_soil_line`

### Whole-Plant / Field-Level Features

- poor_germination_and_stand_loss
- seedling_toppling_post_emergence
- low_lying_wet_patch_mortality
- stunted_wilted_seedlings

## Hallmark Features

- soft_water_soaked_decay_of_seeds_or_emerging_hypocotyls
- girdling_brown_necrotic_lesions_at_soil_line
- sudden_wilting_and_collapse_of_young_seedlings
- reduced_root_mass_and_sloughing_of_root_cortex

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- healthy_white_fibrous_root_system
- foliar_spots_with_yellow_halos_on_mature_leaves
- upper_canopy_defoliation_without_stem_or_root_decay
- powdy_spore_masses_on_leaf_undersides

## Differential Diagnosis

### Similar Problems

- Herbicide Injury (e.g., PPO or ALS inhibitor injury)
- Deep Planting Stress
- Soil Crust Collapse

### Diagnostic Discriminators

- Compare seedling root integrity: Seedling rot results in mushy, discolored, easily sloughed roots, whereas herbicide injury often causes swollen or clubbed root tips without immediate soft decay.
- Compare field pattern: Pathogen rot concentrates heavily in poorly drained, saturated field depressions.
- Distinguish pathogen species by temperature and soil moisture (Pythium/Phytophthora in saturated soils vs Rhizoctonia in moderately moist, warm soils).

## Environmental Conditions

### Temperature

- 10°C to 18°C (Pythium cold wet preference) or 25°C to 30°C (Phytophthora / Rhizoctonia warm preference)

### Humidity

- Not applicable (Soil-borne)

### Rainfall / Moisture

- Saturated, waterlogged soils, heavy rainfall immediately post-planting

### Soil

- Compacted, poorly drained, heavy clay soils with high water retention

## Crop Stage

- VE to V2 (Germination through early seedling emergence)

## Reference Images

- `soybean_seedling_damping_off_hypocotyl.jpg`
- `soybean_pre_emergence_seed_rot.jpg`

## Sources

- Plant Pathology Guide to Soybean Root and Seedling Diseases (APS)
- Extension Soilborne Pathogen Identification - Seedling Rot and Damping-Off

## Machine-Comparison Notes

```yaml
plant_parts:
  - seed
  - hypocotyl
  - radicle
  - primary_root
  - whole_plant
lesion_present: true
primary_shape: girdling_band
width_profile: encircling_stem
ends: diffuse_to_tapered
color_transition: gradual_to_abrupt
early_appearance: water_soaked
pattern_distribution: localized_at_soil_line_and_root_zone
vein_relationship: not_applicable
primary_location: seed_and_hypocotyl_below_or_at_soil_line
```