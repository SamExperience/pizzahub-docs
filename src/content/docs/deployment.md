---
title: Deployment
description: Deploy PizzaHub to Firebase Hosting, Firestore, Storage and Cloud Functions.
---

PizzaHub runs on a single Firebase project. Hosting serves the client as a single-page app, where every path rewrites to `index.html`. Firestore, Storage and the two Cloud Functions live in the same project.

## Firebase project

1. Create a Firebase project on the **Blaze** plan, which Cloud Functions require.
2. Create Firestore and Storage in `europe-west6`, the region the Cloud Functions use.
3. Enable the **Email/Password** and **Google** sign-in providers.
4. Set the project id in `.firebaserc` and the web configuration in `.env`: the production build reads the `VITE_FIREBASE_*` values.

:::caution
The Blaze plan is pay-as-you-go. Set a budget with alerts in Google Cloud Billing to be notified of costs.
:::

## Secrets

The Stripe secrets are stored in Google Secret Manager, never in the repository:

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
```

`STRIPE_SECRET_KEY` must be a test key (`sk_test_`). `STRIPE_WEBHOOK_SECRET` is the signing secret of the webhook endpoint, see [Stripe webhook endpoint](#stripe-webhook-endpoint).

## Non-secret parameters

Create `functions/.env.<projectId>` with the parameters that are not secret:

```dotenv
STRIPE_PRICE_ID=price_...
APP_URL=https://<your-hosting-url>
```

`APP_URL` is the Hosting URL of the app, used for the Checkout return links.

## Deploy the backend

Deploy the Firestore and Storage rules, the composite indexes and the Cloud Functions in one step:

```bash
npm run deploy:backend
```

The indexes in `firestore.indexes.json` are deployed with the rules. The emulators do not enforce indexes, so a missing index only shows up in production. Deploy the indexes before testing a new query.

Use the separate scripts when only one part changes:

| Script | Deploys |
|---|---|
| `npm run deploy:rules` | Firestore rules and indexes, Storage rules. |
| `npm run deploy:functions` | Cloud Functions. |

## Deploy the client

```bash
npm run deploy:hosting
```

The script builds `dist/` and deploys it to Firebase Hosting.

## Stripe webhook endpoint

1. In the Stripe Dashboard, in test mode, add a webhook endpoint that points to the deployed `stripeWebhook` URL.
2. Select the four events the webhook handles: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated` and `customer.subscription.deleted`.
3. Copy the endpoint's signing secret into `STRIPE_WEBHOOK_SECRET` (see [Secrets](#secrets)).
4. Redeploy the Cloud Functions so they read the new secret.
