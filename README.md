# ZIET Mumbai Workshop Book App

Responsive web application for workshop e-books, participant reflections, learning portfolios and resource links.

## Files
- `index.html`: frontend (GitHub Pages-ready).
- `Code.gs`: Google Apps Script backend for Google Sheets sync.

## GitHub Pages
Repository Settings → Pages → Deploy from branch → `main` → `/ (root)`. Save. The expected URL is:
https://taprimaryzietmumbai-kjrd.github.io/Books-for-Self-Improvement-and-Professional-Development/

## Google Sheets sync
1. Create/open a Google Sheet and choose Extensions → Apps Script.
2. Paste `Code.gs` into the script editor and save.
3. In Project Settings → Script Properties, add `APP_KEY` with a long random secret.
4. Deploy → New deployment → Web app; execute as you; access setting appropriate to your participants.
5. Copy the deployed `/exec` URL and enter it in Admin Workspace → Hybrid Sync.
6. Test, then Pull/Push.

## Pilot limitations and security
The starter front-end uses browser localStorage for local participant data. The sample admin code is `ZIETADMIN`; replace it before deployment. This client-side gate is not secure authentication. The Apps Script backend uses one shared secret and stores a single JSON snapshot in a sheet cell. Concurrent users can overwrite one another; the shared key is exposed to app visitors once entered in the browser. For institutional production use, add Google sign-in, participant-specific authorization and append-only records, and do not put confidential personal information in the pilot. CPD completion and certificates require coordinator verification against official workshop requirements.
