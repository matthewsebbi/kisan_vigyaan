# Pearl Millet Leaf Spots

This bank is a representation-aligned update of the supplied Pearl Millet
Contrastive Phenotype v2 files.

## Shared observation vocabulary

The comparator should map the observed phenotype into these dimensions where
the corresponding evidence is available:

### Structure
- leaf_blade
- leaf_sheath
- stem
- panicle
- spikelet
- floret
- grain
- whole_plant

### Geometry
- axis_ratio_long_to_short
- elongation
- width_profile
- end_shape
- symmetry
- boundary_character
- discrete_vs_continuous

### Surface
- elevation
- physical_relief
- powder
- granular_material
- attached_surface_material
- texture

### Internal lesion structure
- center
- margin
- center_margin_contrast
- halo
- internal_texture

### Reproductive relationship
- occupies_normal_grain_position
- relative_size
- relative_width
- relative_length
- rounded_expansion
- elongated_projection
- projection_from_individual_floret
- membrane
- membrane_state
- exposed_spore_mass
- exudate

### Spatial pattern
- distribution
- orientation
- coalescence
- plant_position
- repeated_structure_pattern

### Development
- apparent_stage
- progression
- multiple_visible_stages

## Evidence states

For observations supplied by the visual model:
- PRESENT — directly visible with sufficient confidence.
- ABSENT — the relevant region is visible at adequate resolution and the
  feature is reasonably not present.
- UNCERTAIN — the region is visible but the feature cannot be resolved reliably.
- NOT_VISIBLE — the relevant region cannot actually be inspected.

Never treat NOT_VISIBLE as ABSENT.

## Comparison principle

The bank should compare morphology first, then supporting color/pattern context.
Color alone is weak evidence unless tied to a specific structural phenotype.

Measurement-like observations such as axis ratio, relative size, physical relief,
and floret-to-abnormal-structure relationship should be preferred over relying
only on categorical words such as "spindle", "oval", "pustule", "ball", or
"green ear".

## Stage-awareness

Features that are developmental or stage-dependent must not be treated as
required at every stage. Absence of a later-stage feature cannot by itself
exclude an earlier-stage presentation.

## Residual-category protection

"Leaf Spots" is a symptom-level category and is not an automatic fallback.
When decisive morphology is unresolved, uncertainty should be preserved.


# Pearl Millet Leaf Spots — Contrastive Phenotype v3

## Diagnostic phenotype

Leaf Spots remains a symptom-level category because multiple pearl millet
leaf-spot diseases occur and lesion morphology can vary substantially.

### Primary affected plant parts
- leaf_blade
- leaf_sheath
- stem
- whole_plant

### Symptom classes
- discrete_leaf_lesion
- foliar_spot
- necrotic_spot

### Morphology
Common but variable phenotype:
- discrete lesions;
- often oval/circular;
- low-to-moderate elongation;
- blunt/rounded ends;
- width may be relatively uniform or wider at the center;
- other permitted forms include oblong, rectangular, fusiform, irregular;
- discrete scattered to coalescing lesions.

Because this is a residual symptom-level category, variation itself is expected.

### Color
- center/primary: pale tan to gray to white or brown;
- margin: dark brown to brown;
- surrounding tissue: green and sometimes yellow;
- transition can be sharp or gradual.

### Texture
- dry/papery/necrotic when developed;
- early symptoms can be pinpoint brown or water-soaked depending on causal disease.

## Critical anti-fallback rule

Leaf Spots MUST NOT be defined as:

```text
not Blast + not Rust = Leaf Spots
```

It is compatible when the observed morphology is genuinely spot-like and no
stronger characteristic morphology is present.

When surface morphology or lesion geometry is unresolved, preserve uncertainty.

## Contrastive evidence against Blast

Strong support for Leaf Spots:
- discrete flat spot-like lesion;
- morphology remains relatively non-specialized;
- variable geometry;
- no convincing progression toward a characteristic elongated Blast form;
- dry/papery necrosis;
- center/margin pattern compatible with a generic foliar spot.

Strong contradiction:
- clear developed spindle/diamond-style elongation with characteristic center/
  margin progression.

Weak/non-specific:
- circular/oval shape;
- brown color;
- multiple lesions.

## Contrastive evidence against Rust

Strong support:
- flat surface;
- dry/papery necrotic texture;
- discrete spot structure;
- pale/tan/gray/white center in some types;
- no visible pustular surface.

Strong contradiction:
- clearly raised localized pustule;
- powdery/pustular surface;
- obvious spore mass.

## Evidence weighting

```yaml
identity_defining:
  - discrete_flat_spot_like_phenotype_when_morphology_is_resolved
  - lack_of_stronger_characteristic_blast_or_rust_morphology

strong_support:
  - dry_papery_necrosis
  - variable_spot_geometry
  - pale_center_with_darker_margin_when_present
  - flat_surface
  - spot_like_morphology_remaining_spot_like

weak_or_non_specific:
  - circular_or_oval_geometry
  - brown_color
  - multiple_spots

contradiction:
  - clearly_raised_powdery_pustule
  - strong_developed_blast_like_geometry
  - floret_honeydew
  - smut_ball
  - green_ear
```

## Visibility and uncertainty rules

- Do not use color alone as positive evidence.
- Do not infer flatness when surface relief is unresolved.
- Do not infer absence of pustules when the relevant surface is too small or
  low-resolution to inspect.
- Do not force Leaf Spots merely because Blast-specific morphology is uncertain.
- Preserve UNCERTAIN when the three-way differential of Leaf Spots, Blast, and
  Rust cannot be separated visually.

## Machine-comparison notes

```yaml
primary_location: leaf_blade
core_morphology: discrete_flat_dry_necrotic_spot
preferred_measurements:
  - axis_ratio_long_to_short
  - width_profile
  - end_shape
  - surface_elevation
  - center_margin_relationship
  - lesion_progression
  - coalescence
high_value:
  - spot_like_geometry
  - flat_surface_when_visible
  - dry_necrosis
  - variable_morphology
anti_features:
  - raised_powdery_pustule
  - strong_blast_progression
  - honeydew
  - smut_ball
  - green_ear
uncertainty_features:
  - surface_not_resolvable
  - lesion_geometry_not_resolvable
  - center_margin_not_resolvable
