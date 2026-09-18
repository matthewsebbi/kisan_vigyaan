# Pigeon Pea Alternaria Blight

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf
- stem
- bud
- pod
- whole_plant

### Symptom Class
- necrotic_leaf_spot
- concentric_ring_blight
- multi_organ_blight

### Lesion / Symptom Geometry
- Primary shape: `circular`
- Elongation: `low`
- Width profile: `uniform_to_expanding`
- Ends: `rounded`
- Discrete or continuous: `discrete_scattered_to_coalescing`

### Size
- Leaf lesions begin as small circular necrotic spots.
- Lesions enlarge rapidly and develop characteristic concentric rings.
- Adjacent lesions can coalesce into larger blighted areas.
- Symptoms can occur on leaves, stems, buds, and pods.

### Color
- Center / primary color: `brown_to_dark_brown`
- Margin: `dark_brown`
- Surrounding tissue: green_to_yellow
- Color transition: `sharp_to_gradual`
- Current/overall colors: brown, dark_brown, blackish_brown, yellow_chlorotic

### Texture
- Current texture: dry, necrotic, papery
- Early appearance: `small_circular_necrotic_spot`

### Pattern and Distribution
- Orientation: `radial_concentric`
- Distribution: `discrete_scattered`
- Coalescence: `rapid_coalescence_possible`
- Vein relationship: `crosses_or_ignores_veins`

### Spatial Location
- Primary location: `leaf`
- Secondary locations: `stem_bud_pod`

### Whole-Plant / Field-Level Features
- numerous_circular_leaf_spots
- concentric_rings
- leaf_blight
- coalescing_lesions
- stem_lesions
- bud_infection
- pod_lesions
- reduced_green_leaf_area

## Hallmark Features
- small_circular_necrotic_leaf_spots
- rapid_lesion_expansion
- characteristic_concentric_rings
- lesions_coalesce_to_cause_blight
- symptoms_on_leaves_stems_buds_and_pods
- multi_organ_aerial_blight

## Negative / Exclusion Features
- mosaic_or_chlorotic_ring_spots_with_flowering_sterility
- vascular_browning_and_purple_stem_band
- water_soaked_lower_stem_lesions
- raised_powdery_rust_pustules
- spindle_diamond_leaf_lesions_as_primary_symptom
- diffuse_wilting_without_necrotic_spots

## Differential Diagnosis

### Similar Problems
- Pigeon Pea Phytophthora Blight
- Pigeon Pea Fusarium Wilt
- Cercospora or other leaf spots
- Rust
- Other foliar blights

### Diagnostic Discriminators
- Give high diagnostic weight to circular necrotic leaf spots with concentric rings.
- Distinguish dry, flat Alternaria lesions from water-soaked Phytophthora lesions.
- Distinguish blight spots from the vascular-wilt syndrome of Fusarium.
- Check multiple aerial organs because Alternaria blight can affect leaves, stems, buds, and pods.

## Environmental Conditions

### Temperature
- Not specified as a single diagnostic threshold.

### Humidity
- Moist conditions can support disease development and lesion expansion.

### Rainfall / Moisture
- Wet weather can favor foliar blight development.

### Soil
- Not a primary visual diagnostic feature.

> **Source status:** A Plant Disease report of *Alternaria tenuissima* causing pigeonpea blight in India documented symptoms on leaves, stems, buds, and pods. Leaf symptoms began as small circular necrotic spots, developed typical concentric rings, then coalesced and caused blighting. citeturn139298search11turn139298search12

## Crop Stage
- Symptoms were observed across plant and leaf ages in the reported Indian outbreak.

## Reference Images
![Pigeon Pea Alternaria Blight](https://apsjournals.apsnet.org/doi/10.1094/PDIS-01-12-0060-PDN)

## Sources
- Plant Disease, *Alternaria tenuissima Causing Alternaria Blight on Pigeonpea in India*. citeturn139298search11turn139298search12
- ICRISAT, *Handbook of Pigeonpea Diseases*. citeturn902246search7

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf
  - stem
  - bud
  - pod
  - whole_plant
lesion_present: true
primary_shape: circular
width_profile: uniform_to_expanding
ends: rounded
color_transition: sharp_to_gradual
early_appearance: small_circular_necrotic_spot
pattern_distribution: discrete_scattered_to_coalescing
vein_relationship: crosses_or_ignores_veins
primary_location: leaf
lesion_features:
  center_color: brown_to_dark_brown
  margin_color: dark_brown
  concentric_rings: diagnostic_feature
  texture: dry_necrotic
whole_plant_context:
  leaf_blight: possible
  stem_lesions: possible
  bud_lesions: possible
  pod_lesions: possible
```
