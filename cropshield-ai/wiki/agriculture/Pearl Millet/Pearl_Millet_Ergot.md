# Pearl Millet Ergot

## Diagnostic Phenotype

### Primary Affected Plant Parts

- panicle
- spikelet
- floret
- whole_plant

### Symptom Class

- floral_infection
- panicle_disease
- honeydew_exudation
- grain_replacement

### Lesion / Symptom Geometry

- Primary shape: `none_no_distinct_leaf_lesion`
- Elongation: `not_applicable`
- Width profile: `not_applicable`
- Ends: `not_applicable`
- Discrete or continuous: `discrete_floret_associated`

### Size

- Symptoms are associated primarily with individual infected florets on the panicle.
- Infected florets may fail to develop normal grain.
- In later stages, elongated fungal structures/sclerotia may project from infected florets and can be substantially larger than normal grain.

### Color

- Center / primary color: `honeydew_clear_to_pinkish_or_brownish`
- Margin: `not_applicable`
- Surrounding tissue: green to normal panicle tissue
- Color transition: `variable_or_not_applicable`
- Current/overall colors: clear, pinkish, brownish, dark_brown_to_black_in_mature_sclerotia

### Texture

- Current texture: sticky, viscous_or_sugary_during_honeydew_stage; hard_or_firm_in_mature_sclerotial_stage
- Early appearance: `sticky_honeydew_exudation`

### Pattern and Distribution

- Orientation: `panicle_associated`
- Distribution: `discrete_florets_or_spikelets`
- Coalescence: `localized_or_multiple_infected_florets`
- Vein relationship: `not_applicable`

### Spatial Location

- Primary location: `panicle_spikelet_floret`
- Initial visible symptom: `infected_floret_exuding_honeydew`
- Later symptom: `sclerotium_replacing_or_projecting_from_floret`

### Whole-Plant / Field-Level Features

- reduced_seed_set
- infected_florets_fail_to_produce_normal_grain
- chaffiness_of_panicle
- multiple_infected_florets_per_panicle
- yield_reduction_in_severe_cases
- field_level_occurrence_may_be_patchy

## Hallmark Features

- honeydew_like_droplets
- thick_sticky_or_viscous_exudate
- pinkish_to_brownish_honeydew
- infected_florets_fail_to_produce_normal_grain
- elongated_sclerotial_structure_from_infected_floret
- dark_brown_to_black_mature_sclerotia
- symptom_centered_on_panicle_and_florets
- grain_set_reduction

## Negative / Exclusion Features

These features should reduce confidence in this diagnosis when they are clearly present.

- diffuse_leaf_yellowing_as_primary_symptom
- spindle_diamond_leaf_lesions
- circular_brown_leaf_spots
- green_ear_panicle_transformation
- discrete_large_smut_balls_enclosing_florets
- sheath_lesions_as_primary_symptom

## Differential Diagnosis

### Similar Problems

- Pearl Millet Downy Mildew / Green Ear
- Pearl Millet Smut
- Grain Mold
- Blast
- Other panicle or grain diseases

### Diagnostic Discriminators

- Identify the affected plant part before interpreting symptom color.
- Give high diagnostic weight to honeydew exudation from individual florets.
- Distinguish sticky or viscous honeydew from dry fungal spore masses or smut balls.
- Distinguish infected florets and projecting sclerotia from a panicle that is transformed into a green-ear structure.
- Distinguish discrete floret-associated symptoms from diffuse leaf discoloration.
- Evaluate the developmental stage of the symptom: honeydew is characteristic of an earlier visible stage, while sclerotia develop later.
- Treat absence of visible honeydew as uncertain evidence when the disease may have progressed to the sclerotial stage.
- Treat uncertainty in floret or panicle identification as uncertainty rather than as a fact.

## Environmental Conditions

### Temperature

- Not specified in supplied reference.

### Humidity

- Not specified in supplied reference.

### Rainfall / Moisture

- Moist conditions during flowering can support disease development; exact values should be verified before being used as diagnostic evidence.

### Soil

- Not specified in supplied reference.

> **Source status:** The supplied Rice Tungro phenotype was used as the structural reference. Disease-specific Pearl Millet Ergot features were checked against ICAR material, which describes ergot/sugary disease as a pearl millet disease with honeydew-like, thick/sticky/viscous, pinkish-to-brownish droplets, infected florets that fail to produce grain, and later sclerotial survival. citeturn0search16

## Crop Stage

- Most diagnostically important around flowering and panicle/floret development.
- Exact crop-stage thresholds not specified in the supplied reference.

## Reference Images

- Not specified in supplied reference.

## Sources

- ICAR–Indian Institute of Millets Research / Indian Farming: disease management for millet production. The source describes Pearl Millet Ergot (sugary disease), honeydew exudation, infected florets, grain failure, and sclerotial survival. citeturn0search16

## Machine-Comparison Notes

```yaml
plant_parts:
  - panicle
  - spikelet
  - floret
  - whole_plant

lesion_present: false_or_not_primary

primary_shape: none_no_distinct_leaf_lesion
width_profile: not_applicable
ends: not_applicable

color_transition: variable_or_not_applicable
early_appearance: sticky_honeydew_exudation

pattern_distribution: discrete_florets_or_spikelets
vein_relationship: not_applicable

primary_location: panicle_spikelet_floret

symptom_stage:
  early:
    honeydew: present
    honeydew_texture: sticky_viscous
    honeydew_color: clear_to_pinkish_or_brownish
  late:
    sclerotium: present
    sclerotium_texture: hard_firm
    sclerotium_color: dark_brown_to_black

whole_plant_context:
  reduced_seed_set: possible
  chaffy_panicle: possible
  yield_reduction: possible
  green_ear: absent
  diffuse_leaf_chlorosis: not_primary
```
