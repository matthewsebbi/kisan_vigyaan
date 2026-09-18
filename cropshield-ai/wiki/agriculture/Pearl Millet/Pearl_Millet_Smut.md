# Pearl Millet Smut

## Diagnostic Phenotype

### Primary Affected Plant Parts

- panicle
- spikelet
- floret
- earhead
- whole_plant

### Symptom Class

- grain_or_floret_smut
- panicle_transformation
- fungal_spore_structure

### Lesion / Symptom Geometry

- Primary shape: `spore_ball_or_smut_structure`
- Elongation: `variable`
- Width profile: `localized_expansion`
- Ends: `rounded_or_not_applicable`
- Discrete or continuous: `discrete_floret_associated_or_partial_panicle`

### Size

- Smut structures may occur between the glumes of individual florets.
- Spore balls can enlarge substantially relative to normal grain.
- Affected florets may become visibly enlarged, distorted, or replaced by fungal structures.
- Multiple florets within an earhead may be affected, producing a patchy or partially smutted panicle.

### Color

- Center / primary color: `yellow_to_orange_to_greenish_black`
- Margin: `not_distinct_or_membrane_defined`
- Surrounding tissue: green to normal panicle tissue
- Color transition: `progressive_or_not_applicable`
- Current/overall colors: yellow, orange, yellowish_green, greenish_black, dark_spore_mass

### Texture

- Current texture: smooth_or_velvety_spore_ball; membrane-covered_early; powdery_or_spore_releasing_after_membrane_breaks
- Early appearance: `membrane_covered_smut_structure`

### Pattern and Distribution

- Orientation: `panicle_associated`
- Distribution: `discrete_florets_or_spikelets`
- Coalescence: `localized_or_multiple_florets`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `panicle_spikelet_floret`
- Initial visible symptom: `enlarged_smut_ball_between_glumes`
- Later symptom: `membrane_breaking_and_spore_mass_exposure`

### Whole-Plant / Field-Level Features

- chaffiness_of_panicle
- sterile_affected_florets
- reduced_seed_set
- partial_or_extensive_panicle_infection
- yield_reduction_in_severe_cases
- sporadic_field_distribution

## Hallmark Features

- enlarged_spore_balls_between_glumes
- spore_ball_encloses_floral_parts
- initially_smooth_or_velvety_structure
- membrane_covered_early_structure
- color_progression_from_yellow_to_orange_to_yellowish_green_or_greenish_black
- membrane_bursts_as_structure_matures
- affected_florets_remain_sterile
- chaffy_panicle
- discrete_fungal_structures_on_panicle

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- honeydew_like_sticky_exudate_as_primary_symptom
- green_ear_with_leafy_spikelets
- diffuse_leaf_yellowing_as_primary_symptom
- spindle_diamond_leaf_lesions
- circular_brown_leaf_spots
- elongated_sclerotia_projecting_from_florets_without_spore_ball_formation

## Differential Diagnosis

### Similar Problems

- Pearl Millet Ergot
- Pearl Millet Downy Mildew / Green Ear
- Grain Mold
- Other Pearl Millet panicle or grain diseases

### Diagnostic Discriminators

- Identify the affected plant part before interpreting symptom color.
- Give high diagnostic weight to an enlarged smut/spore ball enclosing floral parts between the glumes.
- Distinguish smut balls from the sticky honeydew exudation characteristic of ergot.
- Distinguish discrete smut structures from the leafy panicle transformation characteristic of downy mildew / green ear.
- Evaluate whether the fungal structure is an enlarged ball-like mass or an elongated/projecting structure.
- Consider the developmental color change of the smut structure rather than treating yellow, orange, or greenish-black color independently.
- Distinguish sterile, chaffy affected florets from normal grain development.
- Treat uncertainty in floret, spikelet, or panicle identification as uncertainty rather than as a fact.

## Environmental Conditions

### Temperature

- Not specified in supplied reference.

### Humidity

- Not specified in supplied reference.

### Rainfall / Moisture

- Not specified in supplied reference.

### Soil

- Not specified in supplied reference.

> **Source status:** The supplied Rice Tungro phenotype was used as the structural reference. Pearl Millet smut is documented by ICAR among economically important millet smut diseases, while the ICAR Kharif advisory describes smut symptoms including enlarged spore balls between glumes, membrane-covered structures, progressive color changes, and sterility/chaffiness of affected florets. Exact Pearl Millet-specific environmental thresholds are not inserted here without verified evidence. citeturn0search12turn0search14

## Crop Stage

- Most diagnostically important during panicle, spikelet, and grain/floret development.
- Exact crop-stage thresholds not specified in the supplied reference.

## Reference Images

- Not specified in supplied reference.

## Sources

- ICAR–Indian Institute of Millets Research, *Disease management for improved millet production*, documenting smuts as economically important millet grain diseases and describing smut as conversion of parts or whole of an earhead into fungal structures. citeturn0search12
- ICAR, *Kharif Agro-Advisories for Farmers 2025*, describing smut spore balls, their membrane, color progression, and sterility/chaffiness of affected florets. citeturn0search14

## Machine-Comparison Notes

```yaml
plant_parts:
  - panicle
  - spikelet
  - floret
  - earhead
  - whole_plant

lesion_present: false_or_not_primary

primary_shape: spore_ball_or_smut_structure
width_profile: localized_expansion
ends: rounded_or_not_applicable

color_transition: progressive_or_not_applicable
early_appearance: membrane_covered_smut_structure

pattern_distribution: discrete_florets_or_spikelets
vein_relationship: not_applicable

primary_location: panicle_spikelet_floret

symptom_stage:
  early:
    smut_structure: present
    membrane: intact
    texture: smooth_or_velvety
    color: yellow
  developing:
    membrane: rupturing
    colors:
      - orange
      - yellowish_green
  mature:
    membrane: ruptured
    color: greenish_black_or_dark
    spores: exposed

whole_plant_context:
  sterile_affected_florets: true
  chaffy_panicle: possible
  reduced_seed_set: possible
  green_ear: absent
  honeydew: absent
  diffuse_leaf_chlorosis: not_primary
```
