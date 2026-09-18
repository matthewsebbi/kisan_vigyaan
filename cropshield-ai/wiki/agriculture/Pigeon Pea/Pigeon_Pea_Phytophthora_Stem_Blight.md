# Pigeon Pea Phytophthora Stem / Blight

## Diagnostic Phenotype

### Primary Affected Plant Parts
- stem
- petiole
- leaf
- seedling
- whole_plant

### Symptom Class
- water_soaked_lesion
- stem_canker
- foliar_blight
- seedling_dieback

### Lesion / Symptom Geometry
- Primary shape: `irregular_water_soaked_patch`
- Elongation: `moderate_to_high_on_stem`
- Width profile: `widens_along_stem`
- Ends: `irregular`
- Discrete or continuous: `discrete_to_coalescing`

### Size
- Leaf lesions may be circular to irregular and can reach about 1 cm in diameter.
- Stem lesions form near ground level and rapidly enlarge along stems and branches.
- Under high humidity, foliage may develop an extensive blighted appearance.
- Large stem galls/cankers may occur.

### Color
- Center / primary color: `water_soaked_brown_to_dark_brown`
- Margin: `dark_brown`
- Surrounding tissue: green_to_wilted
- Color transition: `sharp`
- Current/overall colors: water_soaked, brown, dark_brown, black, necrotic_green

### Texture
- Current texture: moist_or_water_soaked_early, necrotic_later, weakened_or_cankered_stem
- Early appearance: `water_soaked`

### Pattern and Distribution
- Orientation: `transverse_or_longitudinal_on_stem`
- Distribution: `localized_stem_and_leaf_lesions`
- Coalescence: `may_become_extensive_under_high_humidity`
- Vein relationship: `not_applicable_or_crosses_veins`

### Spatial Location
- Primary location: `lower_stem_near_ground_level`
- Secondary locations: `petiole_leaf_and_seedling`
- Field pattern: `patches_of_diseased_plants`

### Whole-Plant / Field-Level Features
- sudden_seedling_death
- stem_browning
- stem_canker_or_gall
- upper_plant_drying_above_lesion
- stem_breakage_at_infected_point
- extensive_foliage_blight
- conspicuous_field_patches
- plant_death_under_severe_infection

## Hallmark Features
- water_soaked_lesions
- brown_to_dark_brown_stem_lesions_near_ground_level
- rapidly_expanding_stem_lesions
- foliage_above_stem_lesion_dries_while_remaining_attached
- stem_breakage_at_infected_point
- stem_cankers_or_galls
- seedling_damping_off_like_death
- disease_patches_visible_in_field

## Negative / Exclusion Features
- purple_vascular_band_with_internal_xylem_browning_without_water_soaked_external_lesion
- mosaic_ring_spots_and_sterility
- circular_concentric_leaf_spots_as_primary_symptom
- raised_rust_pustules
- diffuse_sterility_without_necrosis
- dry_leaf_spots_only_without_stem_involvement

## Differential Diagnosis

### Similar Problems
- Pigeon Pea Fusarium Wilt
- Alternaria Blight
- Root rot / stem canker
- Other stem blights

### Diagnostic Discriminators
- Give high diagnostic weight to water-soaked lesions on stems or leaves followed by rapid browning/necrosis.
- Examine the lower stem near ground level.
- Distinguish Phytophthora blight from Fusarium wilt by the prominent external water-soaked/cankered lesion and rapid drying above the lesion.
- Consider field-level patches of dead plants as supporting evidence.

## Environmental Conditions

### Temperature
- Disease develops under favorable warm, wet conditions; no single threshold is used here.

### Humidity
- High humidity, including >80% in the published disease description, can produce extensive foliage blight.

### Rainfall / Moisture
- Wet conditions favor disease development.

### Soil
- Poor drainage/wet situations can favor disease; no fixed soil threshold is used.

> **Source status:** Plant Health Progress describes *Phytophthora cajani* symptoms as seedling death, water-soaked leaf lesions that become necrotic, brown-to-dark-brown stem lesions near ground level, rapidly increasing stem/branch lesions, drying above lesions, stem breakage, and occasional stem galls. citeturn139298search14

## Crop Stage
- Can affect the crop at any growth stage under favorable conditions.

## Reference Images
![Pigeon Pea Phytophthora Blight](https://apsjournals.apsnet.org/doi/full/10.1094/PHP-04-18-0014-DG)

## Sources
- APS Plant Health Progress, *Isolation, Identification, and Pathogenicity of Phytophthora Blight of Pigeonpea*. citeturn139298search14
- ICRISAT, *Handbook of Pigeonpea Diseases*. citeturn902246search7

## Machine-Comparison Notes

```yaml
plant_parts:
  - stem
  - petiole
  - leaf
  - seedling
  - whole_plant
lesion_present: true
primary_shape: irregular_water_soaked_patch
width_profile: widens_along_stem
ends: irregular
color_transition: sharp
early_appearance: water_soaked
pattern_distribution: discrete_to_coalescing
vein_relationship: not_applicable_or_crosses_veins
primary_location: lower_stem_near_ground_level
whole_plant_context:
  stem_canker: possible
  stem_gall: possible
  foliage_blight: possible
  upper_plant_drying: possible
  stem_breakage: possible
  seedling_death: possible
  field_patches: possible
```
