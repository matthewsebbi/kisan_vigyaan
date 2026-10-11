$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$out = Join-Path $root "images"
New-Item -ItemType Directory -Force -Path $out | Out-Null

$items = @(
    @{Name="PMU_001.jpg"; Url="https://media.divisi.africa/prod/images/958c8fd9-ab7b-5c57-8eee-ad9acdf5211d/1920w.webp"},
    @{Name="PMU_002.jpg"; Url="https://media.divisi.africa/prod/images/62729163-42b0-5400-b112-0dd1681ef613/1920w.webp"},
    @{Name="PMU_003.jpg"; Url="https://content.peat-cloud.com/w600/downy-mildew-of-millet-millet-1580752046.jpg"},
    @{Name="PMU_004.jpg"; Url="https://bugwoodcloud.org/images/768x512/5572861.jpg"},
    @{Name="PMU_005.jpg"; Url="https://farmkart.com/cdn/shop/t/20/assets/fk-disease-pearl-millet-ergot.webp?v=98169213170370706191779453099"},
    @{Name="PMU_006.jpg"; Url="https://infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1507_0.jpeg"},
    @{Name="PMU_007.jpg"; Url="https://apagriculture.vassarlabs.com/dept/images/gallery/PestAndDiseases/Ergot%20of%20sugary%20disease%20of%20bajra.jpg"},
    @{Name="PMU_008.jpg"; Url="https://bugwoodcloud.org/images/768x512/5471142.jpg"},
    @{Name="PMU_009.jpg"; Url="https://www.kisaanhelpline.com/public/uploads/disease/Fungus/Bajra-Millet-Smut1.png"},
    @{Name="PMU_010.jpg"; Url="https://gd.eppo.int/media/data/taxon/P/PUCCSU/pics/1024x0/16252.jpg"},
    @{Name="PMU_011.jpg"; Url="https://gd.eppo.int/media/data/taxon/P/PUCCSU/pics/1024x0/16253.jpg"},
    @{Name="PMU_012.jpg"; Url="https://content.peat-cloud.com/w400/millet-cercospora-leaf-spot-millet-1.jpg"}
)

foreach ($item in $items) {
    $path = Join-Path $out $item.Name
    Write-Host "Downloading $($item.Name)..."
    try {
        Invoke-WebRequest -Uri $item.Url -OutFile $path -MaximumRedirection 5
        Write-Host "  OK  $path"
    } catch {
        Write-Warning "FAILED $($item.Name): $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "Images downloaded to: $out"
Write-Host "Do NOT send the ground-truth manifest to the VLM."
Read-Host "Press Enter to close"
