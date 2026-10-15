---
title: Getting started
description: Set up PizzaHub locally with the Firebase emulators and the Stripe test mode.
---

This guide runs PizzaHub on your machine against the local Firebase emulators. No real Firebase project or payment is needed for the core app.

## Prerequisites

- **Node.js 24** (see `.nvmrc`).
- **Java 21 or later**, required by the Firebase Emulator Suite.
- For the subscription only: a **Stripe account in test mode** with one recurring monthly Price, and the [Stripe CLI](https://docs.stripe.com/stripe-cli) to forward webhooks locally.

## Setup

Install the client dependencies and create the local environment file:

```bash
npm install
cp .env.example .env
```

Fill in the `VITE_FIREBASE_*` values in `.env` with the web configuration of your Firebase project.

Install the Cloud Functions dependencies:

```bash
npm install --prefix functions
```

## Local configuration

Create `functions/.env.local` with the non-secret parameters:

```dotenv
STRIPE_PRICE_ID=price_...
APP_URL=http://localhost:5173
```

Create `functions/.secret.local` with the secrets used by the emulator:

```dotenv
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Both files are git-ignored. The default Firebase project is set in `.firebaserc`; the emulators, the Stripe listener and the deploy scripts use it.

:::caution
Use only Stripe test keys (`sk_test_`). The Cloud Functions refuse any other secret key.
:::

## Run locally

In development mode the app always connects to the local emulators: Auth on port 9099, Firestore on 8080, Storage on 9199 and Functions on 5001. Start the emulators first, then the dev server in a second terminal:

```bash
npm run emulator
npm run dev
```

The Emulator Suite UI is enabled; its address is printed when the emulators start.

The emulators import the data in `emulator-data/`, which is git-ignored and must exist. On a fresh clone create it first with `mkdir emulator-data`; the emulators then start empty. Run `npm run emulator:export` while they are running to save the current data there.

## Stripe webhooks locally

`npm run emulator` also starts the Stripe CLI (`npm run stripe:listen`). It forwards the four events the webhook handles (`checkout.session.completed` and `customer.subscription.created`, `updated`, `deleted`) to the `stripeWebhook` function on the Functions emulator.

1. Sign in to the Stripe CLI once with `stripe login`.
2. Copy the `whsec_...` signing secret printed by `stripe listen` into `STRIPE_WEBHOOK_SECRET` in `functions/.secret.local`, then restart the emulators.
3. Subscribe from the Dashboard with a test card: `4242 4242 4242 4242` succeeds, `4000 0000 0000 0341` is declined (any future expiry date and any CVC).

Events sent while the listener was not running are not retried. Resend them with `stripe events resend <eventId>`. A test subscription can be cancelled with `stripe subscriptions cancel <subscriptionId>`.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the production bundle into `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | Run Oxlint. |
| `npm test` | Run the Vitest suite (requires the emulators). |
| `npm run test:functions` | Run the Cloud Functions unit tests (Stripe and Firestore are mocked, no emulator needed). |
| `npm run emulator` | Start the Firebase emulators and the Stripe webhook listener in one terminal. |
| `npm run emulator:firebase` | Start only the Firebase emulators. |
| `npm run stripe:listen` | Forward the Stripe test events to the Functions emulator. |
| `npm run emulator:export` | Export the running emulators' data to `emulator-data/`. |
| `npm run docs` | Generate the JSDoc code reference into `docs/` (git-ignored). |

Deploy scripts are described in [Deployment](/pizzahub-docs/deployment/).

## Tests

Tests run against the emulators using the configuration in `.env.test`. To run the suite with the emulators started automatically, use the same command as CI:

```bash
npx firebase-tools emulators:exec --only auth,firestore,storage "npm test -- --run"
```

The end-to-end test in `tests/e2e.flow.test.js` runs the whole flow: registration, onboarding, Store selection, Menu, takeaway and delivery orders, status changes and cancellation, logout and login, order history and subscription status.
