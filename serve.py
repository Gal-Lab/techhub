import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    port = PORT
    for _ in range(10):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}/index.html"
                print(f"==================================================")
                print(f"  DevNest Local Server Running!")
                print(f"  Serving: {DIRECTORY}")
                print(f"  URL:     {url}")
                print(f"  Press Ctrl+C to stop the server.")
                print(f"==================================================")
                webbrowser.open(url)
                httpd.serve_forever()
        except OSError:
            port += 1
    print(f"Error: Unable to bind to an open port starting from {PORT}.")
    sys.exit(1)

if __name__ == "__main__":
    main()
