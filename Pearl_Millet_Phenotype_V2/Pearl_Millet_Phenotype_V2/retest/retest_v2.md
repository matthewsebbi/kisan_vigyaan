# Pearl Millet Phenotype v2 — Retest Report

## Scope

The original 13 uploaded Pearl Millet images were re-evaluated using the recreated v2 phenotype definitions. The test intentionally removed candidate reference images from the decision process. Each sample was compared against the complete six-candidate phenotype bank cumulatively.

**Important:** this is a phenotype-logic / multimodal dry-run, not a call to an external Jev endpoint or a trained disease model. Scores are compatibility scores assigned during the retest and are **not calibrated probabilities**.

## What changed in v2

- Explicit pairwise contrastive evidence for Blast ↔ Rust ↔ Leaf Spots.
- Explicit pairwise contrastive evidence for Ergot ↔ Smut.
- Color downgraded when shared by competing candidates.
- Surface morphology and lesion/structure geometry promoted to high-value evidence.
- Ergot is stage-aware: honeydew early, elongated sclerotium later.
- Smut is structure-aware: enlarged ball-like structure, membrane stage, exposed spore mass.
- Leaf Spots is not an automatic fallback.
- The extractor may return `uncertain` / `not_visible`, allowing abstention.

## Results

| Image | Supplied label | v2 result | Status |
|---|---|---|---|
| blast(2).jpg | Blast | **Blast** | Decided |
| Downy mildew(2).jpe | Downy Mildew / Green Ear | **Downy Mildew / Green Ear** | Decided |
| ergot(2).jpe | Ergot | **Ergot** | Low confidence |
| ergot_1(1).jpe | Ergot | **Ergot** | Low confidence |
| ergot2.jpe | Ergot | **Ergot** | Decided |
| ergot3.jpe | Ergot | **Smut** | **Conflict flag** |
| leaf spot(2).webp | Leaf Spots | **Leaf Spots** | Decided |
| leaf_spot.jpg | Leaf Spots | **Leaf Spots** | Decided |
| rust(2).jpe | Rust | **Abstain: Rust vs Leaf Spots** | **Ambiguous** |
| rust2.jpe | Rust | **Rust** | Decided |
| smut 1(1).jpe | Smut | **Smut** | Decided |
| smut(1).jpe | Smut | **Smut** | Decided |
| smut2.jpe | Smut | **Smut** | Low confidence |

## Main result

The redesigned phenotype system makes the difficult cases more explicit instead of treating them as ordinary classification examples.

### Ergot vs Smut

`ergot3.jpe` is the most important conflict. The sample is visually dominated by a dark, enlarged, rounded panicle structure. Under v2, the Smut phenotype receives stronger support because its identity is tied to an enlarged ball-like structure and exposed spore mass, while Ergot requires honeydew or a later elongated sclerotial projection. The supplied label says Ergot, so this image should be reviewed as a possible label/stage ambiguity rather than silently forced into Ergot.

### Rust vs Leaf Spots

`rust(2).jpe` is intentionally abstained. Reddish-orange lesions are visible, but the decisive Rust feature — clearly raised, powdery, pustular morphology — is not sufficiently resolvable in the supplied image. v2 therefore does not use reddish color alone to force Rust.

### Blast vs Leaf Spots

The redesigned Blast phenotype makes geometry and necrosis more important than brown/red coloration. The blast sample remains compatible with Blast because of the leaf location, discrete lesions, necrotic appearance, and blast-compatible lesion development. Leaf Spots remains the main alternative.

## Decision statistics for this dry-run

- 8 images: decisive, higher-confidence disease output.
- 3 images: disease output retained but explicitly marked low confidence.
- 1 image: explicit candidate conflict (`ergot3.jpe`).
- 1 image: explicit abstention between Rust and Leaf Spots (`rust(2).jpe`).

Because the supplied labels are themselves reference labels rather than independently verified pathology diagnoses, and because this retest was performed by image analysis rather than an executable model, **no scientific accuracy metric should be claimed from this run**.

## Recommended interpretation

The main improvement is not simply a higher label-agreement number. It is that the phenotype representation now exposes exactly the evidence required to resolve the three important competitor groups and allows the system to refuse a forced answer when the decisive visual feature is not visible.

## Next experiment

The next step should be to turn this into a machine-readable cumulative state:

```text
sample image
    ↓
phenotype extractor
    ↓
observed phenotype JSON
    +
all candidate phenotype JSON
    ↓
cumulative JEV-like decision
    ↓
per-candidate support / contradiction / unknown
    ↓
pairwise differential check
    ↓
diagnosis or abstention
```
