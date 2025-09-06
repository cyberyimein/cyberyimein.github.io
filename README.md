# CyberYIMEIN

A modern, multi-language personal homepage template. Built for web developers, designers, and tech enthusiasts.

## Features

- Multi-language support (English, Chinese, Japanese)
- Dynamic project cards and badges
- Roadmap visualization
- Theme toggle (light/dark)
- Responsive design
- PWA ready (manifest included)

## Structure

```
index.html                # Main entry
assets/
  js/                     # JavaScript modules (framework, keep)
  css/                    # Stylesheets (framework, keep)
  i18n/                   # Language JSON files (framework, keep)
  data/                   # Project, roadmap, badge data (content, can replace/delete)
manifest.webmanifest      # PWA manifest (framework, keep)
```

## Framework vs. Content

**Must keep (framework core):**

- `index.html`
- `assets/js/`
- `assets/css/`
- `assets/i18n/`
- `manifest.webmanifest`

**Can replace or delete (content):**

- `assets/data/projects.json`
- `assets/data/roadmap.json`
- `assets/data/badges.json`

**Note:**

- Do not delete files in `assets/i18n/` unless you know how to update language support.

...existing code...

## Customization

- Edit `assets/data/projects.json` to add your projects.
- Update language files in `assets/i18n/` for translations.
- Modify styles in `assets/css/` as needed.

## License

MIT
