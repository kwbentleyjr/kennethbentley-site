# Kenny Bentley Static Website Starter

This is a static replacement for the current WordPress site.

## Edit events

Open:

data/events.json

Add or edit events using this structure:

{
  "date": "2026-06-23",
  "time": "9:00 PM",
  "artist": "Slavic Soul Party!",
  "city": "Brooklyn, NY",
  "venue": "Barbès",
  "country": "United States",
  "details": "Admission: $20. Age restrictions: No Minors. Address: 376 9th Street.",
  "link": ""
}

Important JSON rules:
- Use double quotes.
- No trailing commas.
- Keep dates in YYYY-MM-DD format.

## Test locally

Open index.html in your browser.

If events do not load locally because of browser security rules, use a local server:

python3 -m http.server 8000

Then open:

http://localhost:8000
