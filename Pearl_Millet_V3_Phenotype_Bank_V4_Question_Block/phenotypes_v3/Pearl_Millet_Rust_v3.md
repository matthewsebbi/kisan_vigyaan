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


# Pearl Millet Rust — Contrastive Phenotype v3

## Diagnostic phenotype

### Primary affected plant parts
- leaf_blade
- leaf_sheath
- stem
- whole_plant

### Symptom classes
- rust_pustule
- localized_necrosis
- late_season_foliar_disease

### Core morphology

The primary identity feature is physical surface structure:
- clearly raised;
- localized pustular relief;
- powdery or granular/spore-containing appearance.

Preferred primitive observations:
- physical elevation relative to adjacent leaf surface;
- localized mound/pustule structure;
- powdery or granular material;
- visible loose spore mass when resolution permits.

Do not identify Rust from reddish-orange/brown color alone.

### Color
- reddish-brown to reddish-orange;
- later dark-brown to black telial structures may occur;
- surrounding tissue green.

### Early/later appearance
- early symptoms can be yellow to white spots;
- later uredospore pustules are raised and powdery;
- disease can become more prominent on lower leaves and later expand.

### Pattern
- discrete scattered lesions/pustules;
- can increase with severity;
- may cross or ignore veins;
- lower leaves can be an early location.

## Contrastive evidence against Blast

Strong support for Rust:
- clearly raised surface;
- localized physical relief;
- powdery/pustular appearance;
- visible spore mass when resolvable;
- discrete pustules rather than a flat necrotic lesion.

Strong contradiction:
- clearly flat dry necrotic lesion;
- developed gray center with contrasting darker margin;
- strong spindle/diamond-type lesion progression.

Weak/non-specific:
- reddish-brown/reddish-orange color;
- multiple lesions.

## Contrastive evidence against Leaf Spots

Strong support:
- raised lesion;
- powdery surface;
- pustular structure;
- visible spore material.

Strong contradiction:
- flat dry papery necrosis;
- pale/tan/gray/white spot center without visible pustulation;
- variable spot morphology without relief.

## Evidence weighting

```yaml
identity_defining:
  - clearly_raised_localized_pustule
  - physical_surface_relief_supporting_pustular_structure

strong_support:
  - powdery_or_granular_surface
  - visible_spore_mass
  - repeated_discrete_pustules
  - lower_leaf_to_upper_leaf_progression_when_visible

weak_or_non_specific:
  - reddish_brown_color
  - reddish_orange_color
  - multiple_lesions

contradiction:
  - clearly_flat_dry_necrotic_lesion
  - strong_spindle_diamond_blast_progression
  - gray_necrotic_center_with_dark_margin
  - honeydew
  - smut_ball
  - green_ear
```

## Critical uncertainty rule

If the relevant surface is too low-resolution to distinguish physical relief:
- elevation = UNCERTAIN or NOT_VISIBLE;
- powder = UNCERTAIN or NOT_VISIBLE;
- do not convert color into a pustule;
- do not treat absence of visible pustules as strong contradiction.

This directly prevents a low-resolution Rust image from being translated into
a false flat-lesion phenotype.

## Machine-comparison notes

```yaml
primary_location: leaf_blade
primary_symptom: rust_pustule
core_morphology: raised_powdery_pustule
preferred_measurements:
  - physical_relief
  - elevation
  - powder
  - granular_material
  - exposed_spore_mass
  - lesion_distribution
high_value:
  - raised_pustule
  - powdery_surface
  - physical_relief
  - spore_mass
anti_features:
  - flat_necrotic_lesion
  - spindle_diamond_geometry
  - gray_center_dark_margin
  - honeydew
  - smut_ball
uncertainty_features:
  - elevation_not_visible
  - powderiness_not_visible
  - surface_too_small_to_inspect
