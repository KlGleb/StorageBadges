# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static API serving localized App Store and Google Play badges as SVGs, hosted on GitHub Pages. No build tools, no framework, no backend — vanilla HTML/CSS/JavaScript only.

- **Base URL**: `https://klgleb.github.io/StoreBadges`
- **45 languages** for Apple App Store, **76 languages** for Google Play, each with dark/light theme variants
- **242 SVG files** total, named as `{store}_{lang}_{theme}.svg` (e.g., `apple_en_dark.svg`, `google_de_light.svg`)

## Running Locally

No build step. Serve the directory with any static file server:

```bash
python -m http.server 8000
# or: npx serve
```

Then visit `http://localhost:8000` to see `index.html` (demo page).

## Architecture

### store-badges.js (UMD module)

The core library, usable via AMD, CommonJS, or browser globals. Exports:
- `getOnAppStoreBadge({ lang?, theme? })` — returns SVG URL for Apple badge
- `getOnGooglePlayBadge({ lang?, theme? })` — returns SVG URL for Google badge
- `StoreBadges` — namespace object with all internals

**Language resolution** (`resolveLang`): exact match → base language (`fr-fr` → `fr`) → any variant sharing the base → fallback to `en`.

**Auto-detection**: `navigator.language` for language, `prefers-color-scheme` media query for theme.

### store-badges.css

Pure CSS approach using `:lang()` pseudo-class selectors and `@media (prefers-color-scheme: dark)` for automatic language/theme switching without JavaScript. Classes: `.app-store-badge`, `.google-play-badge`.

### SVG Naming Convention

```
apple_{lang}_{theme}.svg   — 90 files (45 langs × 2 themes)
google_{lang}_{theme}.svg  — 152 files (76 langs × 2 themes)
```

Language codes are lowercase ISO codes (e.g., `en`, `de`, `pt-br`, `zh-cn`). Themes are `dark` or `light`.

## No Tests / No CI

There is no test suite, linter, or CI pipeline configured. Changes deploy by pushing to `main` (GitHub Pages).
