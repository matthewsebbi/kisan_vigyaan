import os
import json
import collections

out_dir = r"C:\projects\kisan_viyaan_1\kisan_vigyaan\results\pearl_millet_v3_all_raw"

# We expect 13 images
expected_total = 13

results = []
for f in os.listdir(out_dir):
    if f.endswith('.json'):
        with open(os.path.join(out_dir, f), 'r', encoding='utf-8') as fh:
            data = json.load(fh)
            results.append((f, data))

correct = 0
incorrect = 0
abstained = 0
margins = []

# Confusion matrix: true_label -> {predicted_label -> count}
diseases = ["blast", "downy_mildew_green_ear", "ergot", "smut", "rust", "leaf_spots"]
cm = {t: {p: 0 for p in diseases + ["abstain"]} for t in diseases}
metrics_per_disease = {d: {"TP": 0, "FP": 0, "FN": 0} for d in diseases}

log_output = []

for filename, data in results:
    gt = data.get("ground_truth", "").lower()
    if gt == "downy mildew / green ear":
        gt = "downy_mildew_green_ear"
    elif gt == "leaf spots":
        gt = "leaf_spots"
        
    diff = data.get("differential", {})
    pred = diff.get("top_candidate", "").lower()
    runner = diff.get("runner_up", "").lower()
    margin = diff.get("score_margin", 0.0)
    
    final_decision = data.get("final_decision", {})
    is_abstain = final_decision.get("abstain", False)
    if not is_abstain and diff.get("top_candidate") == "":
        is_abstain = True
        
    if is_abstain:
        pred = "abstain"
        abstained += 1
        cm[gt]["abstain"] += 1
    else:
        if pred == gt:
            correct += 1
            metrics_per_disease[gt]["TP"] += 1
        else:
            incorrect += 1
            if gt in metrics_per_disease:
                metrics_per_disease[gt]["FN"] += 1
            if pred in metrics_per_disease:
                metrics_per_disease[pred]["FP"] += 1
                
        if gt in cm and pred in cm[gt]:
            cm[gt][pred] += 1
            
        margins.append(margin)

    # Format log
    log_str = f"{filename.replace('.json', '')}\n\nQwen observation:\n"
    obs = data.get("evidence", {})
    log_str += f"  Present: {', '.join(obs.get('present', []))[:100]}...\n"
    log_str += f"  Absent: {', '.join(obs.get('absent', []))[:100]}...\n"
    log_str += f"  Uncertain: {', '.join(obs.get('uncertain', []))[:100]}...\n"
    log_str += f"  Not Visible: {', '.join(obs.get('not_visible', []))[:100]}...\n\n"
    
    log_str += "candidate comparison:\n"
    comp = data.get("candidate_comparison", {})
    for c in diseases:
        score = comp.get(c, {}).get("compatibility_score", 0.0)
        log_str += f"  {c.ljust(25)} {score}\n"
        
    log_str += f"\nfinal:\n  {pred} (GT: {gt})\n"
    log_str += "-" * 40
    log_output.append(log_str)

# Calculate metrics
total = len(results)
coverage = (total - abstained) / total if total > 0 else 0
raw_accuracy = correct / total if total > 0 else 0
selective_accuracy = correct / (total - abstained) if (total - abstained) > 0 else 0
mean_margin = sum(margins) / len(margins) if margins else 0.0

disease_stats = {}
for d in diseases:
    tp = metrics_per_disease[d]["TP"]
    fp = metrics_per_disease[d]["FP"]
    fn = metrics_per_disease[d]["FN"]
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
    accuracy = (tp + (total - tp - fp - fn)) / total if total > 0 else 0
    disease_stats[d] = {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1": f1
    }

output_eval = {
    "total_images": total,
    "correct_predictions": correct,
    "incorrect_predictions": incorrect,
    "abstentions": abstained,
    "raw_top_1_accuracy": raw_accuracy,
    "coverage": coverage,
    "selective_accuracy": selective_accuracy,
    "mean_top_vs_runner_up_margin": mean_margin,
    "per_disease_metrics": disease_stats
}

with open(r"C:\projects\kisan_viyaan_1\kisan_vigyaan\results\pearl_millet_v3_all_evaluation.json", "w", encoding='utf-8') as f:
    json.dump(output_eval, f, indent=2)
    
# Save CM as CSV
csv_lines = ["True_Label," + ",".join(diseases + ["abstain"])]
for gt in diseases:
    row = [gt] + [str(cm[gt][p]) for p in diseases + ["abstain"]]
    csv_lines.append(",".join(row))

with open(r"C:\projects\kisan_viyaan_1\kisan_vigyaan\results\pearl_millet_v3_confusion_matrix.csv", "w", encoding='utf-8') as f:
    f.write("\n".join(csv_lines))

with open(r"C:\projects\kisan_viyaan_1\kisan_vigyaan\results\pearl_millet_v3_logs.txt", "w", encoding='utf-8') as f:
    f.write("\n\n".join(log_output))

print(f"Aggregated {total} results.")
