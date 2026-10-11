from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "images"
OUT.mkdir(exist_ok=True)

ITEMS = [('PMU_001.jpg', 'Blast', 'Divisi / Wikimedia Commons (single spindle/eye-shaped lesion)', 'https://media.divisi.africa/prod/images/958c8fd9-ab7b-5c57-8eee-ad9acdf5211d/1920w.webp'), ('PMU_002.jpg', 'Blast', 'Divisi / Wikimedia Commons via iNaturalist (early blast spot)', 'https://media.divisi.africa/prod/images/62729163-42b0-5400-b112-0dd1681ef613/1920w.webp'), ('PMU_003.jpg', 'Downy_Mildew', 'Plantix — Downy Mildew of Millet', 'https://content.peat-cloud.com/w600/downy-mildew-of-millet-millet-1580752046.jpg'), ('PMU_004.jpg', 'Downy_Mildew', 'Invasive.org / Bugwood — image 5572861', 'https://bugwoodcloud.org/images/768x512/5572861.jpg'), ('PMU_005.jpg', 'Ergot', 'Farmkart — Ergot infection on Bajra earhead', 'https://farmkart.com/cdn/shop/t/20/assets/fk-disease-pearl-millet-ergot.webp?v=98169213170370706191779453099'), ('PMU_006.jpg', 'Ergot', 'Infonet Biovision — Ergot on millet', 'https://infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1507_0.jpeg'), ('PMU_007.jpg', 'Ergot', 'Agriculture Department, Government of Andhra Pradesh — Ergot of bajra', 'https://apagriculture.vassarlabs.com/dept/images/gallery/PestAndDiseases/Ergot%20of%20sugary%20disease%20of%20bajra.jpg'), ('PMU_008.jpg', 'Smut', 'Invasive.org / Bugwood — image 5471142', 'https://bugwoodcloud.org/images/768x512/5471142.jpg'), ('PMU_009.jpg', 'Smut', 'Kisaan Helpline — Bajra/Millet Smut comparison image', 'https://www.kisaanhelpline.com/public/uploads/disease/Fungus/Bajra-Millet-Smut1.png'), ('PMU_010.jpg', 'Rust', 'EPPO Global Database — Puccinia substriata, image 16252', 'https://gd.eppo.int/media/data/taxon/P/PUCCSU/pics/1024x0/16252.jpg'), ('PMU_011.jpg', 'Rust', 'EPPO Global Database — Puccinia substriata, image 16253', 'https://gd.eppo.int/media/data/taxon/P/PUCCSU/pics/1024x0/16253.jpg'), ('PMU_012.jpg', 'Leaf_Spots', 'Plantix — Millet Cercospora Leaf Spot', 'https://content.peat-cloud.com/w400/millet-cercospora-leaf-spot-millet-1.jpg')]

for name, _, _, url in ITEMS:
    path = OUT / name
    print(f"Downloading {name}...")
    try:
        req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(req, timeout=30) as r:
            data = r.read()
        path.write_bytes(data)
        print(f"  OK  {path} ({len(data):,} bytes)")
    except Exception as e:
        print(f"  FAILED {name}: {e}")
