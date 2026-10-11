# Pearl Millet Phenotype Bank v3 — Shared Observation Schema

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


# Pearl Millet Smut — Contrastive Phenotype v3

## Diagnostic phenotype

### Primary affected plant parts
- panicle
- spikelet
- floret
- earhead
- whole_plant

### Symptom classes
- grain_or_floret_smut
- panicle_transformation
- fungal_spore_structure

### Core morphology

The primary abnormality is a discrete, floret-associated enlarged structure.

Preferred observations:
- localized expansion relative to a normal grain/floret;
- rounded or ball-like geometry;
- enlarged structure between glumes;
- affected floret may be distorted or replaced;
- multiple affected florets can produce a patchy/partially smutted panicle.

### Developmental morphology

Early/developing:
- membrane-covered structure;
- yellow/orange/yellowish-green appearance possible;
- smooth or velvety appearance.

Mature:
- membrane rupture;
- dark greenish-black/dark spore mass;
- powdery/spore-releasing material after membrane break.

Color alone is weak evidence.

## Relational measurements

High-value:
- relative size to normal grain;
- relative width and length;
- rounded versus strongly elongated;
- localized expansion;
- normal grain position versus projection;
- membrane visibility/state;
- exposed loose dark spore material.

Ball-like expansion is more informative than dark coloration.

## Contrastive evidence against Ergot

Strong support for Smut:
- enlarged rounded/ball-like structure;
- localized expansion;
- membrane-covered structure;
- membrane rupture;
- exposed loose dark spore material.

Strong contradiction:
- sticky/viscous honeydew;
- elongated floret-associated projection without ball-like expansion.

Weak/non-specific:
- dark panicle;
- grain failure;
- chaffiness;
- reduced seed set.

## Contrastive evidence against Downy Mildew

A green-looking panicle alone is insufficient for Downy Mildew.
Smut compatibility increases when abnormal structures are discrete and
floret-associated rather than a widespread leafy transformation.

## Evidence weighting

```yaml
identity_defining:
  - enlarged_ball_like_structure_relative_to_normal_grain
  - membrane_covered_or_ruptured_spore_ball

strong_support:
  - localized_floret_expansion
  - membrane
  - membrane_rupture
  - exposed_dark_loose_spore_mass
  - floral_parts_enclosed_or_replaced

weak_or_non_specific:
  - dark_color
  - sterile_florets
  - reduced_seed_set
  - chaffiness

contradiction:
  - sticky_honeydew
  - viscous_exudate
  - elongated_projecting_structure_without_ball_like_expansion
  - widespread_leafy_green_panicle_transformation
```

## Visibility and stage rules

- Do not infer Smut from dark color alone.
- When structure shape is unresolved, preserve Smut vs Ergot uncertainty.
- A mature dark structure may have lost visible membrane information.
- Lack of a visible spore mass does not exclude early membrane-covered stages.
- A rounded enlarged structure should receive more weight than color.

## Machine-comparison notes

```yaml
primary_location: panicle_spikelet_floret
core_morphology: enlarged_localized_floret_spore_structure
stage_aware: true
preferred_measurements:
  - relative_size_to_normal_grain
  - relative_width
  - relative_length
  - axis_ratio_long_to_short
  - rounded_vs_elongated
  - membrane_state
  - exposed_spore_mass
high_value:
  - rounded_localized_expansion
  - membrane
  - exposed_spores
anti_features:
  - honeydew
  - elongated_sclerotial_projection_without_ball
  - widespread_green_ear
uncertainty_features:
  - structure_shape_not_visible
  - membrane_not_visible
  - developmental_stage_uncertain
