# Store Badges

Static API serving localized **App Store** and **Google Play** badges as SVGs via GitHub Pages.

**45 languages** for Apple App Store, **76 languages** for Google Play, each in **dark** and **light** theme variants.

## Direct URL Scheme

```
https://klgleb.github.io/StoreBadges/apple_{lang}_{theme}.svg
https://klgleb.github.io/StoreBadges/google_{lang}_{theme}.svg
```

| Parameter | Values |
|-----------|--------|
| `{lang}` | ISO language code: `en`, `de`, `fr`, `ja`, `zh-cn`, `pt-br`, etc. |
| `{theme}` | `dark` or `light` |

### Examples

```
https://klgleb.github.io/StoreBadges/apple_en_dark.svg
https://klgleb.github.io/StoreBadges/google_de_light.svg
https://klgleb.github.io/StoreBadges/apple_ja_light.svg
```

## Usage

### Option 1: CSS (no JavaScript required)

Add the stylesheet and use CSS classes. Theme switches automatically via `prefers-color-scheme`, language is picked up from the `lang` attribute on `<html>`.

```html
<link rel="stylesheet" href="https://klgleb.github.io/StoreBadges/store-badges.css">

<a href="https://apps.apple.com/app/your-app"
   class="app-store-badge"
   role="img"
   aria-label="Download on the App Store"></a>

<a href="https://play.google.com/store/apps/details?id=your.app"
   class="google-play-badge"
   role="img"
   aria-label="Get it on Google Play"></a>
```

### Option 2: JavaScript

Include the script and call the functions. Language and theme are auto-detected from the browser when omitted.

```html
<script src="https://klgleb.github.io/StoreBadges/store-badges.js"></script>
<script>
  // Auto-detect language and theme
  var appleUrl  = getOnAppStoreBadge();
  var googleUrl = getOnGooglePlayBadge();

  // Or specify explicitly
  var appleDE = getOnAppStoreBadge({ lang: 'de', theme: 'dark' });
</script>
```

#### ES Module / CommonJS

```js
const { getOnAppStoreBadge, getOnGooglePlayBadge } = require('./store-badges.js');

getOnAppStoreBadge();                          // auto-detect
getOnAppStoreBadge({ lang: 'fr' });            // French, auto-detect theme
getOnGooglePlayBadge({ theme: 'dark' });       // auto-detect lang, dark theme
getOnGooglePlayBadge({ lang: 'ja', theme: 'light' }); // explicit
```

#### API

| Function | Returns |
|----------|---------|
| `getOnAppStoreBadge({ lang?, theme? })` | URL string for an App Store badge |
| `getOnGooglePlayBadge({ lang?, theme? })` | URL string for a Google Play badge |

Both parameters are optional. When omitted:
- **`lang`** — detected from `navigator.language`, falls back to `en` if unavailable
- **`theme`** — detected from `prefers-color-scheme` media query, falls back to `light`

If a requested language is not available for that store, it falls back to English.

## Available Languages

### Apple App Store (45)

`ar` `az` `bg` `ca` `cs` `da` `de` `el` `en` `es` `es-mx` `et` `fi` `fil` `fr` `fr-ca` `he` `he-il` `hi` `hr` `hu` `id` `it` `ja` `ko` `lt` `lv` `ms` `mt` `nl` `no` `pl` `pt-br` `pt-pt` `ro` `ru` `sk` `sl` `sv` `th` `tr` `uk` `vi` `zh-cn` `zh-tw`

### Google Play (76)

`af` `ar` `az` `be` `bg` `bn` `bs` `ca` `cs` `da` `de` `el` `en` `es` `es-la` `et` `eu` `fa` `fi` `fil` `fr` `fr-ca` `ga` `gl` `gu` `he` `hi` `hr` `hu` `hy` `id` `is` `it` `ja` `ka` `kk` `km` `kn` `ko` `ky` `lo` `lt` `lv` `mk` `ml` `mn` `mr` `ms` `my` `ne` `nl` `no` `pa` `pl` `pt-br` `pt-pt` `ro` `ru` `si-lk` `sk` `sl` `sq` `sr` `sv` `sw` `ta` `te` `th` `tr` `uk` `ur` `uz` `vi` `zh-cn` `zh-tw` `zu`

## File Structure

```
├── apple_{lang}_{theme}.svg    — 90 files (45 langs x 2 themes)
├── google_{lang}_{theme}.svg   — 152 files (76 langs x 2 themes)
├── store-badges.js             — JS library (UMD)
├── store-badges.css            — CSS with :lang() and prefers-color-scheme
├── index.html                  — Demo page
└── ReadMe.md
```

## License

Apple App Store and Google Play badges are trademarks of their respective owners. Use them in accordance with [Apple](https://developer.apple.com/app-store/marketing/guidelines/) and [Google](https://play.google.com/intl/en_us/badges/) brand guidelines.
