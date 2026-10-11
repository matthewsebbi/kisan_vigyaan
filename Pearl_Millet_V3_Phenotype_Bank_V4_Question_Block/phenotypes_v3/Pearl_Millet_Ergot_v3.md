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


# Pearl Millet Ergot — Contrastive Phenotype v3

## Diagnostic phenotype

### Primary affected plant parts
- panicle
- spikelet
- floret
- whole_plant

### Symptom classes
- floral_infection
- panicle_disease
- honeydew_exudation
- grain_replacement

### Core spatial relationship

The primary abnormality is discrete and floret-associated.

Preferred observations:
- abnormality associated with an individual floret/spikelet;
- structure may occupy or replace the normal grain/floret position;
- later abnormality may project outward from an infected floret;
- multiple infected florets can occur within one panicle.

### Developmental stages

#### Early / honeydew stage
- visible exudate/droplets;
- clear to pinkish or brownish appearance;
- sticky/viscous/sugary texture.

#### Later stage
- honeydew may no longer be visible;
- elongated hard/firm sclerotial structure can project from an infected floret;
- mature structure can be dark brown to black.

Therefore:
absence of honeydew is NOT strong contradiction when the image plausibly
represents a later stage.

## Floret-level geometry

High-value primitive observations:
- elongated vs rounded;
- long-axis / short-axis relationship;
- relative size to a normal adjacent grain;
- relative width and length;
- projection beyond normal floret position;
- attachment to an individual floret;
- solid/hard-looking structure versus loose spore mass.

A dark elongated structure projecting from an individual floret is substantially
more informative than dark panicle color alone.

## Hallmarks

Identity-defining when visible:
- sticky/viscous floret-associated honeydew;
- elongated projecting late-stage structure associated with an infected floret.

Strong support:
- floret-associated exudate;
- viscous/sticky texture;
- elongated hard/firm structure;
- repeated similar projections on affected florets.

Weak/non-specific:
- dark panicle appearance;
- grain failure;
- reduced seed set;
- chaffiness.

## Contrastive evidence against Smut

Strong support for Ergot:
- elongated projection;
- elongated rather than ball-like expansion;
- sticky/viscous exudate;
- floret-associated structure.

Strong contradiction:
- clearly enlarged rounded/ball-like spore structure;
- membrane-covered smut structure;
- ruptured ball with exposed loose dark spores.

## Contrastive evidence against Downy Mildew / Green Ear

A diffuse or green-looking panicle is not sufficient for Downy Mildew.
Require widespread architectural transformation for strong Downy support.

An isolated floret-associated elongated projection, especially when normal
florets remain recognizable elsewhere, should not be converted into a
leafy-panicle transformation.

## Evidence weighting

```yaml
identity_defining:
  - floret_associated_sticky_honeydew_when_present
  - elongated_projecting_hard_structure_from_infected_floret

strong_support:
  - viscous_exudate
  - floret_association
  - elongated_geometry
  - relative_grain_displacement_or_replacement
  - hard_or_firm_late_structure

weak_or_non_specific:
  - dark_color
  - reduced_seed_set
  - chaffiness
  - grain_failure

contradiction:
  - enlarged_ball_like_spore_structure
  - membrane_covered_or_ruptured_smutted_structure
  - clear_widespread_leafy_green_panicle_transformation
  - diffuse_leaf_chlorosis_as_primary_visual_pattern
```

## Visibility and stage rules

- Absence of honeydew does not exclude later-stage Ergot.
- If the structure shape is unresolved, retain Ergot vs Smut uncertainty.
- Do not infer an elongated sclerotial structure from dark color alone.
- Do not infer green-ear transformation from panicle color/density alone.
- Prefer individual-floret attachment and relative geometry over overall panicle
  appearance.

## Machine-comparison notes

```yaml
primary_location: panicle_spikelet_floret
stage_aware: true
preferred_measurements:
  - relative_size_to_normal_grain
  - relative_length
  - relative_width
  - axis_ratio_long_to_short
  - projection
  - floret_attachment
  - membrane_state
  - exudate
early_identity:
  - sticky_honeydew
late_identity:
  - elongated_projecting_hard_structure
anti_features:
  - enlarged_ball_like_spore_structure
  - membrane_covered_smut_structure
  - widespread_leafy_green_panicle_transformation
uncertainty_features:
  - late_stage_without_honeydew
  - structure_shape_not_visible
  - floret_attachment_not_visible
