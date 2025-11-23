# LexiClip

Monorepo for the LexiClip project (browser extension plus future backend and web app).

## Project layout
- extension/ - Chrome extension source (TypeScript + manifest v3 build targets `dist/`).
- backend/ - Placeholder for backend/API code.
- webapp/ - Placeholder for the web client.

## Extension development
- cd extension
- npm install
- npm run build
- Load the unpacked extension from `extension/dist` in your browser.

## Repo notes
- Build outputs and dependencies stay out of git via the root `.gitignore`.
