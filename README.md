# PizzaHub Docs

Documentation site for [PizzaHub](https://github.com/SamExperience/pizzahub), a web application for pizzeria staff. Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/), in a GitBook-style layout.

Live site: <https://samexperience.github.io/pizzahub-docs/> (published by GitHub Pages once the deploy workflow is in place).

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
public/                 Static files served as they are (favicon)
```

## Deployment

The site is deployed to GitHub Pages from the `main` branch. The deploy workflow is added in a later step of the documentation milestone.
