# Downy Mildew / Green Ear (Sclerospora graminicola)

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


# Pearl Millet Downy Mildew / Green Ear — Contrastive Phenotype v3

## Diagnostic phenotype

### Primary affected plant parts
- leaf_blade
- leaf_sheath
- panicle
- spikelet
- whole_plant

### Symptom classes
- systemic_disease
- chlorotic_leaf_symptoms
- green_ear_inflorescence

### Vegetative morphology
- diffuse or continuous chlorosis;
- yellow to yellow-green tissue;
- symptoms can be longitudinal on leaves;
- symptoms may affect multiple leaves;
- severe leaf tissue may become dry/brittle;
- downy/velvety growth can be visible when present.

### Reproductive morphology
The highest-value reproductive phenotype is structural transformation of
the panicle into a malformed leafy/green-ear structure.

Important observations:
- widespread leafy or vegetative-like tissue occupying the reproductive region;
- malformed panicle architecture;
- reduced or absent normal grain formation in affected regions;
- transformation can involve panicle, spikelet, or floret structures.

### Critical green-ear definition

Green color alone is insufficient.

A visually green panicle alone is insufficient.

A dense panicle alone is insufficient.

A few isolated elongated or projecting structures are insufficient.

Compatibility with the green-ear phenotype requires visible structural evidence
that reproductive architecture has been transformed into leafy/vegetative-like
material or an otherwise malformed reproductive structure.

### Whole-plant context
Possible contextual observations:
- stunting
- reduced tillering
- chlorotic/yellowish leaves
- systemic involvement
- malformed panicle
- leafy floret/spikelet structures
- delayed/failed panicle development

These are supporting/contextual features rather than substitutes for visible
panicle transformation.

## Hallmarks

Identity-defining:
- green-ear-type structural transformation when the panicle is visible;
- malformed leafy reproductive architecture.

Strong support:
- diffuse/longitudinal chlorotic leaf symptoms;
- systemic multi-leaf context;
- reduced/absent normal grain formation in an affected panicle.

Weak support:
- stunting;
- reduced tillering;
- downy growth when visible.

## Contrastive evidence

Against Blast/Rust/Leaf Spots:
- isolated discrete necrotic leaf lesions contradict the primary phenotype;
- clearly raised powdery pustules contradict it.

Against Smut/Ergot:
- enlarged rounded smut structures or floret-associated honeydew/sclerotial
  structures contradict a pure green-ear transformation.

## Evidence weighting

```yaml
identity_defining:
  - widespread_leafy_or_malformed_reproductive_transformation
  - green_ear_structure_when_panicle_is_visible

strong_support:
  - diffuse_longitudinal_leaf_chlorosis
  - systemic_multi_leaf_context
  - reduced_or_absent_normal_grain_formation
  - malformed_panicle

weak_or_non_specific:
  - chlorosis_alone
  - stunting
  - reduced_tillering
  - downy_or_velvety_growth_when_visible

contradiction:
  - isolated_discrete_necrotic_leaf_lesions_as_primary_feature
  - raised_powdery_pustules
  - enlarged_ball_like_spore_structure
  - floret_associated_honeydew
  - distinct_elongated_sclerotial_projection
```

## Visibility and hallucination-control rules

- Chlorosis alone does not establish the reproductive phenotype.
- Do not infer a green-ear transformation when the panicle is not visible.
- When panicle architecture is ambiguous, preserve uncertainty.
- Distinguish widespread transformation from isolated abnormal florets.
- A green-looking or unusually dense panicle without clear architectural
  transformation should not receive full identity weight.

## Machine-comparison notes

```yaml
primary_location: leaf_blade_and_panicle
core_morphology: diffuse_chlorosis_plus_structural_reproductive_transformation
identity_gate:
  - transformed_leafy_panicle_when_visible
preferred_measurements:
  - panicle_architecture
  - normal_vs_abnormal_reproductive_structure
  - grain_presence
  - distribution_of_transformation
anti_features:
  - discrete_smut_ball
  - floret_honeydew
  - distinct_sclerotial_projection
  - raised_powdery_pustules
  - discrete_spindle_or_spot_lesions_as_primary_feature
uncertainty_features:
  - panicle_not_visible
  - panicle_structure_not_resolvable
  - extent_of_transformation_not_resolvable
