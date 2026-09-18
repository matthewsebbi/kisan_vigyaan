"""CLI runner for CropShield AI Wiki and Diagnostic Pipeline."""

import sys
import json
import argparse
import base64
from pathlib import Path

from backend.services.wiki_service import WikiService
from backend.services.environment_service import EnvironmentService
from backend.services.diagnostic_service import DiagnosticService
from backend.schemas import EnvironmentalContext


def main():
    parser = argparse.ArgumentParser(description="CropShield AI Agriculture Wiki & Diagnosis CLI")
    parser.add_argument("--validate", action="store_true", help="Validate Agriculture Wiki files")
    parser.add_argument("--list-crops", action="store_true", help="List available crops in Wiki")
    parser.add_argument("--crop", type=str, help="Crop name to inspect or diagnose")
    parser.add_argument("--list-problems", action="store_true", help="List problems for the specified crop")
    parser.add_argument("--problem", type=str, help="Specific problem to view")
    parser.add_argument("--image", type=str, help="Path to plant image for diagnosis")
    parser.add_argument("--location", type=str, default="Maharashtra", help="Location name (default: Maharashtra)")
    parser.add_argument("--lat", type=float, default=19.7515, help="Latitude (default: 19.7515)")
    parser.add_argument("--lon", type=float, default=75.7139, help="Longitude (default: 75.7139)")
    parser.add_argument("--season", type=str, default="kharif", help="Season for testing: kharif, rabi, zaid, post_monsoon")
    parser.add_argument("--wiki-dir", type=str, help="Optional override path to wiki/agriculture directory")
    
    args = parser.parse_args()

    wiki_root = Path(args.wiki_dir).resolve() if args.wiki_dir else None
    wiki_service = WikiService(wiki_root=wiki_root)

    # 1. Validate Wiki
    if args.validate:
        print(f"Scanning Agriculture Wiki at: {wiki_service.wiki_root}")
        report = wiki_service.validate_wiki()
        print(f"Status: {report.status}")
        print(f"Total Crops: {report.total_crops_scanned}, Total Files: {report.total_files_scanned}")
        print(f"Valid: {report.valid_count}, Invalid: {report.invalid_count}")
        if report.issues:
            print("\nIssues:")
            for issue in report.issues:
                print(f"  [{issue.severity.upper()}] {issue.file}: {issue.message}")
        return

    # 2. List Crops
    if args.list_crops:
        if not wiki_service.is_installed():
            print("Wiki not installed.")
            return
        crops = wiki_service.list_crops()
        print(f"Crops available ({len(crops)}): {', '.join(crops) if crops else 'None'}")
        return

    # 3. List Problems for Crop
    if args.list_problems:
        if not args.crop:
            print("Error: Specify --crop <name> to list problems.")
            sys.exit(1)
        problems = wiki_service.list_problems(args.crop)
        print(f"Problems for {args.crop} ({len(problems)}):")
        for p in problems:
            print(f"  - {p}")
        return

    # 4. View specific problem
    if args.problem:
        if not args.crop:
            print("Error: Specify --crop <name> to view a problem.")
            sys.exit(1)
        try:
            detail = wiki_service.get_problem(args.crop, args.problem)
            print(f"Crop: {detail.frontmatter.crop}")
            print(f"Problem: {detail.frontmatter.problem}")
            print(f"Type: {detail.frontmatter.type}")
            print(f"Sections found: {list(detail.sections.keys())}")
            if detail.machine_notes:
                print(f"Machine Notes: {json.dumps(detail.machine_notes, indent=2)}")
        except Exception as e:
            print(f"Error: {e}")
        return

    # 5. Run Diagnosis
    if args.image:
        if not args.crop:
            print("Error: Specify --crop <name> for diagnosis.")
            sys.exit(1)
        
        img_path = Path(args.image)
        if not img_path.exists():
            print(f"Error: Image file '{args.image}' not found.")
            sys.exit(1)

        print(f"Running diagnosis for crop '{args.crop}' on image '{args.image}'...")
        img_bytes = img_path.read_bytes()
        b64_img = f"data:image/jpeg;base64,{base64.b64encode(img_bytes).decode('utf-8')}"

        diagnostic_svc = DiagnosticService(wiki_service=wiki_service)
        try:
            result = diagnostic_svc.diagnose(
                image=b64_img,
                crop=args.crop,
                location=args.location,
                latitude=args.lat,
                longitude=args.lon,
                season=args.season,
            )
            print("\n" + "=" * 50)
            print(f"DIAGNOSIS: {result.diagnosis} (Confidence: {result.confidence * 100:.1f}%)")
            print("=" * 50)
            print(f"Decisive Features: {result.decisive_features}")
            if result.strongest_alternative and result.strongest_alternative.name:
                print(f"Strongest Alternative: {result.strongest_alternative.name}")
                print(f"Reason Less Likely: {result.strongest_alternative.reason_less_likely}")
            print(f"Wiki Sources: {result.wiki_sources}")
        except Exception as e:
            print(f"Diagnosis failed: {e}")
            sys.exit(1)
        return

    parser.print_help()


if __name__ == "__main__":
    main()
