# Pearl Millet Phenotype Bank v2

This folder contains the recreated contrastive phenotype files for the cumulative, JEV-like diagnostic experiment.

## Design changes from v1

- Added explicit contrastive sections for the principal competing candidates.
- Added evidence strength (`identity_defining`, `strong_support`, `weak_support`, `non_specific`, `contradiction`, `unknown`).
- Added visibility/uncertainty rules (`present`, `absent`, `uncertain`, `not_visible`).
- Reduced the diagnostic weight of color when color is shared across competing diseases.
- Added stage-aware logic for Ergot and Smut.
- Kept Leaf Spots as a symptom-level category instead of forcing a single pathogen morphology.
- Added anti-phenotype / exclusion logic to prevent simple fallback classification.

## Main competing groups

- Blast ↔ Rust ↔ Leaf Spots
- Ergot ↔ Smut

## Intended runtime behavior

The vision model should describe the sample only. It should not choose the disease.

The decision layer receives the sample phenotype and all candidate phenotypes simultaneously, calculates support/contradiction evidence for every candidate, performs pairwise differential checks, and may abstain when decisive morphology is not visible.
