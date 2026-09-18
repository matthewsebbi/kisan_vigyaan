#!/usr/bin/env python3
"""
Groq API Network Connectivity Test Tool
Run this script after switching networks (e.g. connecting to a phone hotspot or VPN)
to verify if api.groq.com is reachable on your current network IP.

Usage:
  python test_groq_connection.py
"""

import sys
import requests
import json
from backend.config import GROQ_API_KEY, GROQ_BASE_URL, GROQ_MODEL

def run_test():
    print("\n" + "=" * 64)
    print(" CropShield AI -- Groq Network Connectivity Diagnostic Probe")
    print("=" * 64)
    print(f" Target Base URL : {GROQ_BASE_URL}")
    print(f" Target Model    : {GROQ_MODEL}")
    print(f" API Key Config  : {'Configured (' + str(len(GROQ_API_KEY)) + ' chars)' if GROQ_API_KEY else '[!] MISSING IN backend/.env'}")
    print("-" * 64)

    if not GROQ_API_KEY:
        print("[ERROR] GROQ_API_KEY is not set in backend/.env or environment.")
        print("Please set GROQ_API_KEY=gsk_... in backend/.env and try again.")
        sys.exit(1)

    models_url = f"{GROQ_BASE_URL}/models"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
        "User-Agent": "CropShield-NetworkProbe/1.0"
    }

    print(f"[1/2] Probing endpoint: GET {models_url} ...")
    try:
        resp = requests.get(models_url, headers=headers, timeout=10)
        status = resp.status_code
        server = resp.headers.get("server", "unknown")
        cf_ray = resp.headers.get("cf-ray", "none")
        raw_body = resp.text

        is_json = False
        json_data = {}
        try:
            json_data = resp.json()
            is_json = True
        except Exception:
            pass

        print(f"      HTTP Status: {status}")
        print(f"      Server     : {server}")
        print(f"      CF-Ray     : {cf_ray}")

        if status == 403:
            print("\n" + "=" * 64)
            print(" [BLOCKED] CONNECTIVITY TEST RESULT: HTTP 403 FORBIDDEN")
            print("=" * 64)
            print(" Classification : Network / IP / Proxy Restriction (network_403)")
            print(f" Raw Message    : {json_data.get('error', {}).get('message', raw_body[:200])}")
            print("\n Root Cause:")
            print("   Cloudflare edge firewall on api.groq.com blocked this network IP/ISP.")
            print("\n Recommended Next Steps:")
            print("   1. Connect to your phone hotspot or alternate Wi-Fi network.")
            print("   2. Re-run this command: python test_groq_connection.py")
            print("   3. Once this script shows [SUCCESS], retry your scan in the Web UI.")
            print("=" * 64 + "\n")
            return False

        elif status == 401:
            print("\n" + "=" * 64)
            print(" [FAILED] CONNECTIVITY TEST RESULT: AUTHENTICATION ERROR (HTTP 401)")
            print("=" * 64)
            print(" Classification : Invalid API Key (authentication_401)")
            print(" Action         : Check your GROQ_API_KEY in backend/.env.")
            print("=" * 64 + "\n")
            return False

        elif status == 200:
            print("      /models endpoint returned 200 OK!")
            print(f"\n[2/2] Probing model execution: POST {GROQ_BASE_URL}/chat/completions (model: {GROQ_MODEL}) ...")
            
            chat_url = f"{GROQ_BASE_URL}/chat/completions"
            chat_payload = {
                "model": GROQ_MODEL,
                "messages": [{"role": "user", "content": "ping"}],
                "max_tokens": 5
            }
            chat_resp = requests.post(chat_url, headers=headers, json=chat_payload, timeout=10)
            
            if chat_resp.status_code == 200:
                print("      Model execution call returned 200 OK!")
                print("\n" + "=" * 64)
                print(" [SUCCESS] CONNECTIVITY TEST RESULT: OPERATIONAL!")
                print("=" * 64)
                print(f" Provider       : Groq ({GROQ_BASE_URL})")
                print(f" Model          : {GROQ_MODEL}")
                print(" Status         : Fully reachable! No Cloudflare IP restrictions.")
                print(" Action         : You can now run leaf diagnostic scans in the UI!")
                print("=" * 64 + "\n")
                return True
            else:
                print(f"\n [!] Model Probe Failed with HTTP {chat_resp.status_code}")
                print(f" Response: {chat_resp.text[:300]}")
                return False
        else:
            print(f"\n [!] Unexpected HTTP status {status}: {raw_body[:200]}")
            return False

    except requests.RequestException as e:
        print("\n" + "=" * 64)
        print(" [FAILED] CONNECTIVITY TEST RESULT: NETWORK UNREACHABLE")
        print("=" * 64)
        print(f" Error Details : {e}")
        print(" Action        : Check your internet connection and DNS settings.")
        print("=" * 64 + "\n")
        return False

if __name__ == "__main__":
    run_test()
