# Potato Early Blight

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- stem
- tuber

### Symptom Class

- target_board_lesion
- concentric_ring_spot
- foliar_necrosis

### Lesion / Symptom Geometry

- Primary shape: `circular_to_angular`
- Elongation: `moderate`
- Width profile: `concentric_rings`
- Ends: `variable`
- Discrete or continuous: `discrete_becoming_coalescent`

### Size

- Typically ranges from 2 mm to 15 mm in diameter; lesions can coalesce to cover entire leaflets in severe infestations.

### Color

- Center / primary color: dark_brown_to_black
- Margin: dark_brown
- Surrounding tissue: yellow_chlorotic_halo
- Color transition: `abrupt`
- Current/overall colors: dark_brown, black, chlorotic_yellow

### Texture

- Current texture: dry, papery, brittle
- Early appearance: `pinpoint_dark_spot`

### Pattern and Distribution

- Orientation: `concentric_ring_pattern`
- Distribution: `scattered_expanding`
- Coalescence: `moderate_to_high`
- Vein relationship: `restricted_by_major_veins`

### Spatial Location

- Primary location: `lower_older_leaves_first_progressing_upward`

### Whole-Plant / Field-Level Features

- premature_defoliation
- lower_canopy_yellowing
- reduced_tuber_yield
- target_board_spots_on_senescing_leaves

## Hallmark Features

- concentric_rings_target_board_pattern
- chlorotic_yellow_halo_surrounding_lesions
- progresses_from_older_bottom_leaves_upward
- dry_papery_leaf_texture

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- white_downy_fungal_growth_on_underside
- upward_leaf_rolling_without_necrosis
- black_sclerotia_crusts_on_tubers
- mosaic_mottling_pattern

## Differential Diagnosis

### Similar Problems

- Late Blight
- Septoria Leaf Spot
- Ozone Injury / Physiological Brown Spot

### Diagnostic Discriminators

- Look for concentric "target board" rings within discrete brown spots to distinguish from Late Blight.
- Note the presence of a chlorotic yellow halo surrounding mature spots.
- Check for absence of white sporangial mold on leaf undersides during high humidity.

## Environmental Conditions

### Temperature

- Favored by warm temperatures: 20°C to 30°C (68°F to 86°F).

### Humidity

- Alternating wet and dry periods; high humidity (>90%) promotes sporulation.

### Rainfall / Moisture

- Dew, overhead irrigation, or rainfall sequences trigger spore germination and dissemination.

### Soil

- Poor, low-nitrogen soil conditions stress plants, predisposing them to infection.

## Crop Stage

- Most severe during post-flowering, tuber bulking, and maturity stages.

## Reference Images

- `potato_early_blight_leaf_target_spot.jpg`
- `potato_early_blight_canopy_progression.jpg`

## Sources

- USDA Agricultural Research Service Plant Pathology Disease Guides.
- EPPO Global Database - *Alternaria solani* entry.

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - stem
  - tuber
lesion_present: true
primary_shape: circular_to_angular
width_profile: concentric_rings
ends: variable
color_transition: abrupt
early_appearance: pinpoint_dark_spot
pattern_distribution: concentric_ring_pattern
vein_relationship: restricted_by_major_veins
primary_location: lower_older_leaves_first_progressing_upward
```