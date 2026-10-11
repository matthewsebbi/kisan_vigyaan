# Pearl Millet Leaf Spots — Contrastive Phenotype v2

## Diagnostic Phenotype

Leaf Spots is retained as a **symptom-level category**. The supplied reference states that several pearl millet leaf-spot diseases occur and that their lesion morphology differs substantially; therefore this entry must not be treated as a single rigid pathogen morphology.

### Primary Affected Plant Parts
- leaf_blade
- leaf_sheath
- stem
- whole_plant

### Symptom Class
- discrete_leaf_lesion
- foliar_spot
- necrotic_spot

### Lesion / Symptom Geometry
- Primary shape: `oval_circular`
- Elongation: `low_to_moderate`
- Width profile: `uniform_or_wider_at_center`
- Ends: `blunt_rounded`
- Discrete or continuous: `discrete_scattered_to_coalescing`
- Other permitted geometry: `oblong, rectangular, fusiform, irregular`

### Color
- Center / primary: `pale_tan_to_gray_to_white_or_brown`
- Margin: `dark_brown_to_brown`
- Surrounding tissue: `green`, sometimes `yellow`
- Color transition: `sharp_to_gradual`

### Texture
- Current texture: `dry, papery, necrotic`
- Early appearance: `pinpoint_brown_or_water_soaked_depending_on_causal_disease`

### Pattern and Distribution
- Orientation: `variable`
- Distribution: `discrete_scattered`
- Coalescence: `may_coalesce`
- Vein relationship: `crosses_or_ignores_veins`

### Spatial Location
- Primary location: `leaf_blade`
- Other locations: `leaf_sheath_and_stem`
- Some leaf spots are more frequent near leaf margins.

### Whole-Plant / Field-Level Features
- multiple_leaf_lesions
- progressive_leaf_necrosis
- reduced_green_leaf_area
- premature_leaf_drying_in_severe_cases
- blight_like_appearance_when_lesions_coalesce

## Hallmark Features

- multiple_discrete_leaf_spots
- brown_to_dark_brown_lesions
- pale_tan_gray_or_white_centers_in_some_types
- dark_brown_margins_in_some_types
- variable lesion shape
- lesions_can_expand_and_coalesce

## Negative / Exclusion Features

- diffuse_yellow_orange_discoloration_without_discrete_lesions
- raised_powdery_reddish_brown_pustules
- characteristic_spindle_diamond_gray_centered_blast_lesions
- honeydew_exudation_from_florets
- enlarged_smut_spore_balls
- green_ear_panicle_transformation

## Contrastive Phenotype

### Against Rust

**Strong support for Leaf Spots**
- flat lesion;
- dry/papery necrotic texture;
- discrete spot structure;
- pale/tan/gray/white center in some types;
- no visible powdery pustule.

**Strong contradiction for Leaf Spots**
- clearly raised pustule;
- powdery surface;
- obvious spore mass.

**Weak/non-specific evidence**
- brown/reddish-brown color;
- multiple spots.

### Against Blast

**Strong support for Leaf Spots**
- discrete flat spots;
- variable lesion geometry;
- no clear spindle/diamond progression;
- lesion morphology remains spot-like rather than developing into the characteristic Blast form.

**Strong contradiction for Leaf Spots**
- clear spindle/diamond lesion development;
- strong evidence of progressive Blast-type necrosis with a gray center and darker margin.

**Weak/non-specific evidence**
- circular/oval lesions;
- brown color;
- multiple leaf lesions.

## Residual-Category Rule

Leaf Spots must **not** become an automatic fallback:

```text
not Blast + not Rust -> Leaf Spots
```

When decisive morphology is not visible, the output should remain `uncertain` rather than assigning Leaf Spots only because another diagnosis could not be proven.

## Evidence Weighting

```yaml
identity_defining:
  - discrete_flat_necrotic_spot_pattern_when_clear

strong_support:
  - dry_papery_necrosis
  - variable_spot_geometry
  - pale_center_with_darker_margin_when_present
  - no_visible_pustule

weak_support:
  - brown_color
  - multiple_spots

contradiction:
  - clearly_raised_powdery_pustule
  - spindle_diamond_blast_progression
  - honeydew
  - smut_ball
  - green_ear
```

## Uncertainty / Visibility Rules

- Do not treat color alone as a positive Leaf Spots diagnosis.
- If lesion surface is unresolved, retain uncertainty between Leaf Spots, Blast, and Rust.
- Causal pathogen cannot always be determined from appearance alone; preserve the category at symptom level.

## Environmental Conditions

- Humid or wet conditions can favor several leaf-spot diseases.
- Wet weather can promote lesion expansion and disease development for several leaf-spot pathogens.

## Crop Stage

- Variable by causal pathogen.
- Some leaf spots become more apparent after substantial vegetative growth or during grain filling.

## Machine-Comparison Notes

```yaml
primary_location: leaf_blade
primary_symptom: discrete_leaf_lesion
core_morphology: flat_dry_necrotic_spot
high_value_features:
  - discrete_spots
  - spot_geometry
  - center_margin_relationship
  - dry_papery_texture
anti_features:
  - raised_powdery_pustule
  - spindle_diamond_blast_progression
  - honeydew
  - smut_ball
  - green_ear
```
