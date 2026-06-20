import re
import urllib.request
import urllib.error
import ssl

def check_links():
    # Read the app.js file
    with open("app.js", "r", encoding="utf-8") as f:
        content = f.read()

    # Find all urls matching https://...
    urls = re.findall(r"url:\s*'([^']+)'", content)
    print(f"Found {len(urls)} URLs to check...\n")

    # Disable SSL verification for testing purposes
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    broken = 0
    for url in urls:
        try:
            req = urllib.request.Request(
                url, 
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            )
            with urllib.request.urlopen(req, timeout=5, context=ctx) as response:
                if response.getcode() >= 400:
                    print(f"[FAIL] Broken (HTTP {response.getcode()}): {url}")
                    broken += 1
                else:
                    print(f"[OK] {url}")
        except urllib.error.HTTPError as e:
            # Handle standard redirects or authentication blocks safely
            if e.code in [403, 401]:
                print(f"[WARN] Warning (Auth/Block HTTP {e.code}): {url}")
            else:
                print(f"[FAIL] Broken (HTTP {e.code}): {url}")
                broken += 1
        except Exception as e:
            print(f"[FAIL] Broken (Error: {e}): {url}")
            broken += 1

    print(f"\nScan complete. Broken links found: {broken}")

if __name__ == "__main__":
    check_links()
