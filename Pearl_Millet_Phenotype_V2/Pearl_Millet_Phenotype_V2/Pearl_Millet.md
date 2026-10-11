# Pearl Millet — Contrastive Phenotype Bank v2

## Purpose

This version is designed for a cumulative, JEV-like diagnostic workflow. The sample image is converted into an observed phenotype; the decision layer then compares that observation against all candidate phenotypes at the same time.

The phenotype descriptions below are recreated from the supplied Pearl Millet phenotype files, while adding a **contrastive layer** that explicitly records what supports, weakly supports, contradicts, or cannot distinguish each candidate from its main competitors.

## Candidate Problems

- [[Blast]]
- [[Downy Mildew - Green Ear]]
- [[Ergot]]
- [[Smut]]
- [[Rust]]
- [[Leaf Spots]]

## Core Diagnostic Principle

The system should not diagnose from color alone. It should prioritize:

1. affected plant part;
2. symptom class or structure type;
3. surface morphology / texture;
4. lesion or structure geometry;
5. spatial distribution;
6. hallmark evidence;
7. contradiction / exclusion evidence;
8. developmental stage when relevant.

Color is supporting evidence unless the phenotype explicitly makes a color characteristic of a stage or structure. Ambiguous or invisible features must remain uncertain rather than being invented.

## Evidence States

Every observation may be represented as:

- `present`
- `absent`
- `uncertain`
- `not_visible`

Every candidate-feature relationship may be represented as:

- `identity_defining`
- `strong_support`
- `weak_support`
- `non_specific`
- `contradiction`
- `unknown`

## Main Contrast Pairs

### Blast vs Rust vs Leaf Spots

Use surface morphology and lesion development before color.

- **Rust:** raised, powdery, pustular morphology is the key discriminator.
- **Blast:** necrotic lesion development, especially spindle/diamond geometry and grayish center when developed, is the key discriminator.
- **Leaf Spots:** discrete flat necrotic spots with variable geometry are supported when stronger Blast or Rust morphology is absent.

Reddish-brown coloration alone is weak/non-specific across this group.

### Ergot vs Smut

Use the type of floral structure and developmental stage.

- **Ergot:** honeydew/sticky exudate in the earlier visible stage, or elongated projecting sclerotial structure later.
- **Smut:** enlarged ball-like smut structure, usually membrane-covered early and exposed spore mass later.

Dark color, grain failure, and panicle chaffiness are not sufficient by themselves to separate the two.

## Cumulative Decision Protocol

For each sample:

1. Extract observations without assigning disease.
2. Compare the same observation set against all six candidate phenotypes.
3. Record support, contradiction, and unknown evidence for every candidate.
4. Apply the pairwise contrast rules for the relevant competing group.
5. Aggregate the evidence.
6. Allow `uncertain` / `abstain` when the decisive feature is not visible.

## Data Hygiene

The phenotype bank is a diagnostic knowledge base, not a replacement for pathogen confirmation. Leaf Spots remains a symptom-level category because the supplied reference explicitly states that several pearl millet leaf-spot pathogens have substantially different morphologies.
