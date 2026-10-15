---
title: Overview
description: What PizzaHub is, who it is for and what these docs cover.
---

PizzaHub is a web application for pizzeria staff. A team signs up, sets up its Company and Store, manages the Menu, takes and follows orders (tickets) during service, reviews the order history and subscribes to a demo plan.

The app is built for daily use on a counter or in a kitchen: it works on desktop, tablet and phone, and updates the orders of the day in real time.

## What it covers

- **Start**: this overview and the [Getting started](/pizzahub-docs/getting-started/) guide to run PizzaHub on your machine.
- **Product**: the [Features](/pizzahub-docs/features/) of the app, page by page.
- **Technical**: the [Architecture](/pizzahub-docs/architecture/), the [Data model](/pizzahub-docs/data-model/) and the [Security](/pizzahub-docs/security/) model.
- **Operations**: the [Subscription](/pizzahub-docs/subscription/) (Stripe test mode) and the [Deployment](/pizzahub-docs/deployment/) to Firebase.

## Tech stack

- React 19 and Vite 8, with React Router 8
- Firebase 12: Authentication, Cloud Firestore and Cloud Storage
- Cloud Functions for Firebase v2 on Node.js 22 (region `europe-west6`)
- Stripe Node.js SDK in test mode, with Stripe Checkout
- Tailwind CSS v4, lucide-react icons
- Vitest and Testing Library, Oxlint

## Live demo and source code

The app is live at [pizzahub-11284.web.app](https://pizzahub-11284.web.app). Subscriptions there use Stripe test mode only.

The source code is in the [PizzaHub repository](https://github.com/SamExperience/pizzahub).

:::note
PizzaHub is an MVP (version 1.0.0). These docs describe only what is implemented.
:::
