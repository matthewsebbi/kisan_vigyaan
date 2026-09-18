# Banana Sigatoka Leaf Spot

## Diagnostic Phenotype

### Primary Affected Plant Parts

- leaf_blade
- leaf_margin
- whole_foliage

### Symptom Class

- discrete_lesion
- necrotic_streak
- leaf_spot

### Lesion / Symptom Geometry

- Primary shape: `elongated_streak_to_elliptic_spot`
- Elongation: `high_parallel_to_veins`
- Width profile: `spindle_shaped`
- Ends: `pointed_to_rounded`
- Discrete or continuous: `discrete_early_coalescing_late`

### Size

- Initial streaks: 1-2 mm long; mature spots: 10-20 mm long, 2-5 mm wide; rapidly coalesces to cover large leaf surface areas

### Color

- Center / primary color: grey, ash_grey, dark_brown, black
- Margin: dark_brown, blackish_brown, reddish_brown
- Surrounding tissue: yellow_chlorotic_halo
- Color transition: `abrupt`
- Current/overall colors: reddish_brown, dark_brown, ash_grey, yellow, necrotic_black

### Texture

- Current texture: dry, brittle, depressed_center, papery
- Early appearance: `faint_yellowish_green_speck_or_streak`

### Pattern and Distribution

- Orientation: `parallel_to_leaf_veins`
- Distribution: `scattered_across_blade_denser_near_margins`
- Coalescence: `extensive_in_severe_stages`
- Vein relationship: `constrained_by_minor_veins_initially`

### Spatial Location

- Primary location: `older_lower_leaves_first_progressing_upward`

### Whole-Plant / Field-Level Features

- premature_leaf_desiccation
- reduced_photosynthetic_area
- poor_bunch_filling
- premature_fruit_ripening
- canopy_collapse

## Hallmark Features

- narrow_reddish_brown_streaks_parallel_to_veins
- elliptic_spots_with_depressed_grey_centers_and_dark_borders
- yellow_chlorotic_halo_surrounding_mature_lesions
- early_senescence_and_drying_of_lower_leaves
- extensive_lesion_coalescence_leading_to_leaf_blight

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- vascular_discoloration_in_pseudostem
- bacterial_ooze_from_cut_petiole
- severe_marginal_leaf_bunching_at_crown
- internal_corm_rot

## Differential Diagnosis

### Similar Problems

- Cordana Leaf Spot (*Cordana musae*)
- Deightoniella Leaf Spot (*Deightoniella torulosa*)
- Black Cross Disease (*Phyllachora musicola*)

### Diagnostic Discriminators

- Compare streak orientation and shape: Sigatoka streaks are elongated parallel to veins, unlike the large oval, zonated spots of Cordana.
- Check for yellow halo and center color: Sigatoka mature spots turn ash-grey in the center with a distinct chlorotic halo.
- Evaluate progress on plant canopy: Sigatoka moves strictly from older lower leaves to younger upper leaves.

## Environmental Conditions

### Temperature

- 23°C to 28°C (Optimum fungal growth and ascospore germination)

### Humidity

- High relative humidity (> 80% RH required for spore production)

### Rainfall / Moisture

- Heavy rainfall or prolonged leaf wetness (dew) essential for ascospore release and germination

### Soil

- Poorly drained, humid, tropical lowland soils favor severe disease pressure

## Crop Stage

- All growth stages with active leaf production; most damaging from vegetative growth phase through early fruiting/bunch development.

## Reference Images

- Not specified in supplied file.

## Sources

- Compiled from standard plant pathology diagnostic references for *Mycosphaerella fijiensis* (Black Sigatoka) and *Mycosphaerella musicola* (Yellow Sigatoka).

## Machine-Comparison Notes

```yaml
plant_parts:
  - leaf_blade
  - leaf_margin
  - whole_foliage
lesion_present: true
primary_shape: elongated_streak_to_elliptic_spot
width_profile: spindle_shaped
ends: pointed_to_rounded
color_transition: abrupt
early_appearance: faint_yellowish_green_speck_or_streak
pattern_distribution: parallel_to_leaf_veins
vein_relationship: constrained_by_minor_veins_initially
primary_location: older_lower_leaves_first_progressing_upward
```