# Pearl Millet Rust — Contrastive Phenotype v2

## Diagnostic Phenotype

### Primary Affected Plant Parts
- leaf_blade
- leaf_sheath
- stem
- whole_plant

### Symptom Class
- rust_pustule
- localized_necrosis
- late_season_foliar_disease

### Lesion / Symptom Geometry
- Primary shape: `oval_circular`
- Elongation: `low_to_moderate`
- Width profile: `uniform_or_slightly_expanded`
- Ends: `blunt_rounded`
- Discrete or continuous: `discrete_scattered_to_coalescing`

### Color
- Primary: `reddish_brown_to_reddish_orange`
- Margin: `yellowish_or_not_distinct`
- Surrounding tissue: `green`
- Later stage: `dark_brown_to_black_telia`

### Texture
- Current texture: `raised, powdery, pustular`
- Early appearance: `yellow_to_white_spot`
- Later: `powdery_uredospore_pustule`

### Pattern and Distribution
- Distribution: `discrete_scattered`
- Coalescence: `may_increase_with_severity`
- Vein relationship: `crosses_or_ignores_veins`
- Common early location: `lower_leaves`

### Whole-Plant / Field-Level Features
- lower_leaf_infection
- upper_leaf_infection_as_disease_progresses
- leaf_wilting
- leaf_necrosis
- severe_rust_can_impair_panicle_emergence
- usually_more_prominent_later_in_crop_cycle

## Hallmark Features

- reddish_brown_to_reddish_orange_pustules
- raised_powdery_uredinia
- pustules_on_leaf_surfaces
- initial_symptoms_often_on_lower_leaves
- later_dark_brown_or_black_telia_may_form
- severe_infection_can_progress_to_leaf_necrosis

## Negative / Exclusion Features

- spindle_diamond_gray_centered_lesions
- discrete_honeydew_droplets
- enlarged_smut_spore_balls
- green_ear_panicle_transformation
- diffuse_leaf_yellowing_without_pustules

## Contrastive Phenotype

### Against Blast

**Strong support for Rust**
- clearly raised surface;
- powdery or pustular appearance;
- visible uredospore/spore mass when resolution permits;
- discrete pustules rather than a flat necrotic lesion.

**Strong contradiction for Rust**
- clearly flat dry necrotic lesion;
- gray necrotic center with a darker lesion margin;
- spindle/diamond lesion development.

**Weak/non-specific evidence**
- reddish_brown/reddish_orange color;
- multiple lesions.

### Against Leaf Spots

**Strong support for Rust**
- raised lesion;
- powdery surface;
- pustular structure;
- visible spore mass.

**Strong contradiction for Rust**
- flat dry papery necrotic spot;
- pale/tan/gray/white lesion center without visible pustulation;
- variable spot geometry without pustular morphology.

## Evidence Weighting

```yaml
identity_defining:
  - clearly_raised_pustule
  - powdery_pustular_surface

strong_support:
  - visible_spore_mass
  - discrete_pustules
  - lower_leaf_to_upper_leaf_progression_when_visible

weak_support:
  - reddish_brown_color
  - reddish_orange_color

contradiction:
  - flat_dry_necrotic_lesion
  - spindle_diamond_lesion
  - gray_necrotic_center
  - honeydew
  - smut_ball
  - green_ear
```

## Uncertainty / Visibility Rules

- Do not infer Rust from reddish-brown color alone.
- If surface elevation or powderiness is not visible, mark the morphology as `uncertain` or `not_visible`.
- Absence of visible pustules in a low-resolution image is uncertain evidence, not definitive exclusion.

## Environmental Conditions

- Cool nights and warm days can favor rust; exact thresholds should be treated as contextual evidence.
- Leaf-surface moisture and dew can favor infection.
- Moisture and dew on leaves support disease development.

## Crop Stage

- Often becomes more evident during the later part of the crop-growing season.
- Early infection can become more damaging when disease develops before flowering.

## Machine-Comparison Notes

```yaml
primary_location: leaf_blade
primary_symptom: rust_pustule
core_morphology: raised_powdery_pustule
high_value_features:
  - surface_elevation
  - powdery_texture
  - pustular_structure
  - visible_spore_mass
anti_features:
  - flat_necrotic_lesion
  - spindle_diamond_geometry
  - gray_necrotic_center
uncertainty_features:
  - elevation_not_visible
  - powderiness_not_visible
```
