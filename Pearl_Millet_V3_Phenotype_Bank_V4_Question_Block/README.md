# Pearl Millet V3 Phenotype Bank + V4 Observation Protocol

Contents
--------
phenotypes_v3/
    Updated six-disease phenotype representations aligned to the V4 visual
    observation vocabulary.

original_v2/
    Exact copies of the six user-supplied phenotype files used previously,
    retained for traceability and rollback.

Pearl_Millet_V4_High_Precision_Question_Block.md
    The new detailed observation protocol.

Design intent
-------------
The V3 phenotype bank is a representation upgrade, not a wholesale rewrite
of the biological content. It preserves the supplied v2 structure, hallmarks,
contrastive evidence, uncertainty rules, and machine-comparison ideas while
aligning them to the richer V4 observation schema.

Important separation
--------------------
V4 is the image-to-phenotype observer.
The phenotype bank is canonical disease knowledge.
Step 2 is the text-only candidate comparator.

Recommended pipeline
--------------------
Image
  -> Qwen visual observer using V4 only
  -> compact observed phenotype JSON
  -> text-only reasoning model using all six v3 phenotype files
  -> cumulative differential comparison
  -> close-margin escalation / abstention logic

The Step-1 observer should not receive the disease phenotype files or disease
names, because the observation stage should remain disease-agnostic.
