---
title: Architecture
description: How the PizzaHub client, services, Firebase and Cloud Functions fit together.
---

PizzaHub is a single-page React application served by Firebase Hosting. Its data and sign-in live in Firebase (Authentication, Cloud Firestore, Cloud Storage). The only server-side code is two Cloud Functions that handle the Stripe subscription.

```text
Browser (React SPA)
  pages -> components -> contexts -> services -> Firebase SDK
                                                  |
                                  Auth, Firestore, Storage, Functions
                                                  |
                                  Cloud Functions -> Stripe (test mode)
```

## Client layers

Each layer may only use the layers below it.

| Layer | Folder | Role |
|---|---|---|
| Pages | `src/pages/` | One component per route: Login, Onboarding, Store selection, Menu, Tableau, Dashboard. |
| Components | `src/components/` | Reusable UI: app shell, route guards, ticket and menu panels, shared loading, error and dialog states. |
| Contexts | `src/contexts/` | `AuthContext` (signed-in User and profile) and `StoreContext` (active Store). |
| Services | `src/services/` | The only layer that talks to Firebase. |
| Utils | `src/utils/` | Pure helpers: field limits, validation, receipt formatter, image compression, time and format helpers. |

Components never call Firebase directly. A component asks a service for data or an action, and a service returns plain objects.

Routes are defined in `src/routes.jsx`. Every application page sits behind a route guard that requires a signed-in User.

## Services

| Service | Responsibility |
|---|---|
| `auth.service.js` | Sign-up, sign-in, Google sign-in, logout and password reset. |
| `user.service.js` | Reads the User profile (Company, Store, role). |
| `onboarding.service.js` | Creates the Company, the first Store and the admin User together. |
| `store.service.js` | Lists the Stores the User can access and reads the active Store. |
| `menu.service.js` | The Store's Menu. |
| `category.service.js` | Categories: create, edit, delete and reorder. |
| `product.service.js` | Products and their images in Cloud Storage. |
| `customer.service.js` | Customers: search by name, create and update. |
| `order.service.js` | Orders: builds item snapshots and totals, creates, edits, changes status and cancels. Real-time listener for the Tableau, one-time read for the order history. |
| `billing.service.js` | Starts Stripe Checkout and reads the subscription status. |
| `firebase.js` | Initializes the Firebase app and exports `auth`, `db`, `storage` and `functions` (region `europe-west6`). |

Services validate their input against the same limits as the security rules, so invalid data is rejected before it reaches Firestore. The Tableau and the Customer cards use real-time listeners; the order history is read once when the page opens or the day changes.

## Cloud Functions

The functions live in `functions/` and run on Node.js 22 in `europe-west6`, with at most two instances.

- **`createCheckoutSession`** (callable): creates a Stripe Checkout session for the Company of the signed-in admin. Refuses when the subscription is already active.
- **`stripeWebhook`** (HTTP): receives Stripe events, verifies their signature and writes the subscription status.
- **`config.js`**: region, secrets and parameters. The Stripe client refuses any secret key that is not a test key.
- **`subscription.js`**: maps a Stripe subscription to the `subscriptions/{companyId}` document. Used by both functions.

The Stripe secrets are read from Google Secret Manager in production. The client never receives a Stripe key.

## Project structure

```text
src/
  pages/        Route-level pages
  components/   Reusable UI components
  contexts/     Auth and active Store contexts
  services/     Firebase data layer, one service per entity
  utils/        Shared helpers
  routes.jsx    Route definitions
functions/      Cloud Functions (Stripe test mode)
tests/          Unit, UI, security-rules and end-to-end tests
firestore.rules, storage.rules, firestore.indexes.json
firebase.json   Hosting, rules, functions and emulator configuration
```

## Continuous integration and releases

- **CI** runs on pull requests to `develop` and `main`: linting of the workflows and the code, the test suite against the emulators, and the production build.
- **Release** runs when a `vX.Y.Z` tag is pushed on `main` and creates a GitHub release with generated notes.
