# PizzaHub Docs

Documentation site for [PizzaHub](https://github.com/SamExperience/pizzahub), a web application for pizzeria staff. Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/), in a GitBook-style layout.

Production site: <https://samexperience.github.io/pizzahub-docs/>

The PizzaHub application itself is at <https://pizzahub-11284.web.app>.

## Requirements

- Node.js 24 (see `.nvmrc`)

## Setup

```bash
npm install
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server (http://localhost:4321/pizzahub-docs/). |
| `npm run build` | Build the static site into `dist/`. |
| `npm run preview` | Serve the built site locally. |

## Project structure

```text
astro.config.mjs        Astro and Starlight configuration (site, base path, title, social link)
src/content.config.ts   Content collection for the docs pages
src/content/docs/       Documentation pages (Markdown and MDX)
src/styles/custom.css   Brand accent for the light and dark themes
public/                 Static files served as they are (favicon)
.github/workflows/      GitHub Actions workflow that deploys the site
```

## Deployment

The site is deployed to GitHub Pages by the `Deploy documentation` workflow (`.github/workflows/deploy.yml`):

- It runs on every push to `main` and can be started manually from the Actions tab.
- It installs the dependencies, builds the site and publishes `dist/` as a Pages artifact.
- The repository's Pages source must be set to **GitHub Actions** (Settings → Pages → Source).
