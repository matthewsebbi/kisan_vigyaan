# Sugarcane Ratoon Stunting Disease

## Diagnostic Phenotype

### Primary Affected Plant Parts

- stalk_internal
- vascular_bundles
- whole_plant

### Symptom Class

- internal_vascular_discoloration
- stunting
- yield_decline

### Lesion / Symptom Geometry

- Primary shape: `punctate_dots_and_comma_shaped_vascular_streaks`
- Elongation: `short_restricted_to_node_region`
- Width profile: `narrow`
- Ends: `blunt`
- Discrete or continuous: `discrete_dots_or_short_lines`

### Size

- Vascular dots/streaks: 2 mm to 3 mm in length at the base of the node

### Color

- Center / primary color: yellow_orange_to_pinkish_red_or_reddish_brown
- Margin: distinct
- Surrounding tissue: pale_yellow_to_white
- Color transition: `sharp`
- Current/overall colors: orange, pink, reddish_brown, yellow

### Texture

- Current texture: firm, woody, dry
- Early appearance: `yellowish_orange_discolored_vascular_bundles`

### Pattern and Distribution

- Orientation: `transverse_and_longitudinal_at_nodes`
- Distribution: `localized_at_nodal_vascular_intersections`
- Coalescence: `absent`
- Vein relationship: `vascular_bundle_bound`

### Spatial Location

- Primary location: `internal_nodes_at_base_of_stalk`

### Whole-Plant / Field-Level Features

- overall_stool_stunting_and_uneven_canopy
- thin_canes_and_shortened_internodes
- delayed_ratoon_sprouting
- lack_of_external_diagnostic_symptoms_on_leaves
- progressive_yield_decline_across_ratoon_cycles

## Hallmark Features

- no_external_foliar_symptoms
- orange_red_to_pinkish_dots_or_commas_in_vascular_bundles_just_below_node_in_sliced_stalk
- yellow_to_pink_internal_discoloration_in_young_growing_apical_nodes

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- internal_transverse_white_bands_with_red_rot
- black_whip_structures
- clear_leaf_chlorosis_or_stripes
- soft_rotting_of_internal_tissues

## Differential Diagnosis

### Similar Problems

- Drought stress
- Sugarcane Red Rot (internal red lesions are large with white patches, not small nodal vascular dots)
- Sugarcane Bacterial Mottle

### Diagnostic Discriminators

- RSD symptoms are strictly internal and require longitudinal splitting of mature node regions to observe discolored vascular dots.
- RSD lacks external foliar lesions or leaf color changes, presenting primarily as stunting and reduced growth.

## Environmental Conditions

### Temperature

- 25°C - 30°C

### Humidity

- Not directly tied to airborne transmission; spread via mechanical harvesting equipment and seed cane.

### Rainfall / Moisture

- Water stress / drought amplifies the visible stunting effect in the field.

### Soil

- Poor, unfertilized, or compacted soils exacerbate stunting symptoms.

## Crop Stage

- Maturation stage (best diagnosed on mature stalks) and ratoon crops

## Reference Images

- `sugarcane_rsd_nodal_vascular_dots.jpg`
- `sugarcane_rsd_field_stunting.jpg`

## Sources

- Organized according to standard plant pathology literature on *Leifsonia xyli* subsp. *xyli* (Ratoon Stunting Disease).

## Machine-Comparison Notes

```yaml
plant_parts:
  - stalk_internal
  - vascular_bundles
  - whole_plant
lesion_present: true
primary_shape: punctate_dots_and_comma_shaped_vascular_streaks
width_profile: narrow
ends: blunt
color_transition: sharp
early_appearance: yellowish_orange_discolored_vascular_bundles
pattern_distribution: localized_at_nodal_vascular_intersections
vein_relationship: vascular_bundle_bound
primary_location: internal_nodes_at_base_of_stalk
```