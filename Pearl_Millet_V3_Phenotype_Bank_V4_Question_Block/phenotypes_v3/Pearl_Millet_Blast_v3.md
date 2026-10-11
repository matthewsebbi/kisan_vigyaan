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


# Pearl Millet Blast — Contrastive Phenotype v3

## Diagnostic phenotype

### Primary affected plant parts
- leaf_blade
- leaf_sheath
- whole_plant

### Symptom classes
- necrotic_lesion
- leaf_blast
- early_blast_speck
- foliar_blast

### Morphology
Blast can begin as small oval-to-rounded early lesions and develop into
spindle/diamond-shaped lesions as they enlarge.

Preferred primitive observations:
- axis ratio can increase with lesion development;
- width may progress from approximately uniform to wider at the center;
- ends may progress from rounded/irregular to pointed/tapered;
- lesions can remain discrete or coalesce;
- surface may be flat or slightly raised early and dry/necrotic later.

Do not require the categorical word "spindle" when the underlying geometry
supports elongation, central widening, and tapered ends.

### Color
- early lesion: reddish-brown to brown
- developed center: gray to grayish-brown
- developed margin: reddish-brown to purple-brown to dark-brown
- surrounding tissue: green to yellow/chlorotic
- transition: distinct to gradual

Color is supporting evidence, not identity-defining evidence by itself.

### Texture
- small speck or unclear early
- necrotic during development
- dry/papery/necrotic when advanced
- water-soaked appearance may occur early under favorable moisture conditions

### Pattern and distribution
- numerous small scattered lesions
- lesions may coalesce
- orientation can be non-directional early and longitudinal/diagonal later
- lesions may cross or ignore veins
- leaf margin/tip can be an important location

## Hallmarks

High-value visual combination:
1. discrete foliar lesion;
2. development toward increased elongation;
3. central widening and tapered/pointed ends when developed;
4. gray/grayish center in a developed lesion;
5. darker contrasting margin;
6. progressive enlargement/coalescence.

No single weak feature should substitute for this combination.

## Contrastive evidence

### Against Rust
Strong support:
- flat/slightly raised necrotic lesion;
- dry papery necrosis;
- developed gray center;
- elongated spindle/diamond-type geometry;
- lesion enlargement/coalescence.

Strong contradiction:
- clearly raised localized pustule;
- powdery/pustular surface;
- obvious loose spore mass as the primary visible structure.

Weak/non-specific:
- reddish-brown color;
- multiple lesions.

### Against Leaf Spots
Strong support:
- developed elongated geometry with central widening/tapered ends;
- lesion progression toward a characteristic elongated form;
- gray center with darker margin;
- progressive/coalescing necrosis.

Insufficient alone:
- circular or oval lesions;
- brown/reddish-brown color;
- multiple spots.

## Evidence weighting

```yaml
identity_defining:
  - developed_elongated_lesion_geometry
  - gray_or_grayish_developed_center_with_contrasting_margin
  - progression_toward_characteristic_elongation_when_stage_allows

strong_support:
  - necrotic_lesion
  - lesion_progression
  - central_widening
  - tapered_or_pointed_ends
  - dry_papery_necrosis
  - coalescing_necrosis

weak_or_non_specific:
  - reddish_brown_color
  - multiple_leaf_lesions
  - isolated_oval_early_lesion

contradiction:
  - clearly_raised_powdery_pustule
  - obvious_spore_mass_as_primary_surface
  - enlarged_smut_ball
  - floret_honeydew
  - green_ear_transformation
```

## Visibility and stage rules

- Early lesions may genuinely be small and rounded; do not reject early Blast solely
  because a mature spindle/diamond form is absent.
- If lesion geometry cannot be resolved, retain uncertainty.
- If the center is unresolved, do not invent a gray center.
- If surface elevation is not visible, do not infer raised or flat from color alone.
- A later-stage Blast image can lack obvious early features.

## Machine-comparison notes

```yaml
primary_location: leaf_blade
core_morphology: progressive_necrotic_leaf_lesion
preferred_measurements:
  - axis_ratio_long_to_short
  - width_profile
  - end_shape
  - center_margin_relationship
  - lesion_progression
  - coalescence
high_value:
  - developed_elongation
  - central_widening
  - gray_center
  - darker_margin
anti_features:
  - clearly_raised_powdery_pustule
  - obvious_spore_mass
  - honeydew
  - smut_ball
  - green_ear
uncertainty_features:
  - lesion_stage_uncertain
  - geometry_not_resolvable
  - center_not_resolvable
  - surface_elevation_not_visible
