# Minimal New Tab Privacy Policy

Effective date: April 30, 2026

Minimal New Tab is a Chrome extension that replaces the browser new tab page with a simple dashboard showing the time, weather, and bookmark shortcuts.

## Data the extension uses

The extension may use the following data only to provide its new tab features:

- Location: if weather is enabled and no custom city is set, the extension asks Chrome for the device location. Latitude and longitude are sent to Open-Meteo to get current weather and to OpenStreetMap Nominatim to show a readable location name.
- Custom city: if the user enters a city in settings, that city name is sent to OpenStreetMap Nominatim to find weather coordinates.
- Bookmarks: if bookmark shortcuts are enabled, Chrome bookmark data is read locally in the browser to display shortcuts on the new tab page.
- Favicons: Chrome's favicon permission is used to show site icons next to bookmark shortcuts.
- Settings and cache: extension settings, weather cache, and optional Unsplash background cache are stored locally in the browser.
- Optional Unsplash API key: if the user enables Unsplash backgrounds and enters an API key, that key is stored locally and sent to Unsplash only to request background images.

## Data sharing

The extension does not sell user data. It does not use user data for advertising, credit decisions, or purposes unrelated to the new tab experience.

Location or city data may be sent to Open-Meteo and OpenStreetMap Nominatim to provide weather. Optional Unsplash API keys may be sent to Unsplash to fetch background images.

## Data storage

The extension stores settings and cached feature data locally in the browser. The publisher does not operate a separate server for this extension and does not receive or store user data.

## Contact

For privacy questions, open an issue in the GitHub repository for this extension.
