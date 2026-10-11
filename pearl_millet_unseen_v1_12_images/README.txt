PEARL MILLET — UNSEEN TEST V1
================================

12 candidate images for the frozen V3 unseen-image experiment.

Distribution:
  Blast            2
  Downy Mildew     2
  Ergot            3
  Smut             2
  Rust             2
  Leaf Spots       1

FILES
-----
download_unseen_v1.ps1
    One-click Windows PowerShell downloader.

download_unseen_v1.py
    Python fallback downloader.

GROUND_TRUTH_MANIFEST_DO_NOT_UPLOAD.csv
    Ground truth + source metadata. KEEP OUT OF THE MODEL INPUT DIRECTORY.

images/
    This folder is populated when one of the downloaders is run.

BENCHMARK RULE
--------------
Rename nothing after download. Send only images/ to V3.
Keep the ground-truth manifest outside the VLM-visible directory.

SOURCE / LICENSING NOTE
-----------------------
The images come from the listed source pages and direct image endpoints.
Some sources impose educational-use or attribution conditions. This pack is
intended for experimental benchmarking; check each source's terms before
redistributing or publishing the images.

IMPORTANT
---------
Some sites may block automated downloads depending on network or anti-bot
settings. The PowerShell script reports individual failures rather than
silently treating them as successful downloads.
