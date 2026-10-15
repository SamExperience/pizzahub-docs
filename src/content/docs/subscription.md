---
title: Subscription
description: The Stripe test-mode demo subscription, from Checkout to the webhook.
---

PizzaHub has one demo plan: a single monthly Stripe Price, paid through Stripe Checkout in subscription mode. It exists to show the billing flow, so it runs in **Stripe test mode only**.

## Test mode only

- The Cloud Functions refuse any Stripe secret key that does not start with `sk_test_`. No real payment is possible.
- No Stripe key is ever shipped to the client. The client only calls the Cloud Functions.

## Checkout

The **Subscribe** button in the Dashboard's **Subscription** section starts the flow:

1. The `createCheckoutSession` function checks that the caller is a signed-in admin. It takes the Company from the User's profile, never from the request, and refuses when the subscription is already active.
2. On the first subscription the function creates the Company's Stripe Customer and stores its id in `subscriptions/{companyId}`. Later subscriptions reuse it.
3. Before opening a new Checkout, the function lists the Customer's active Stripe subscriptions. If one exists, it syncs the document (the one with the latest period end wins) and refuses, so a Company cannot pay twice.
4. Otherwise the function returns the Checkout URL. The user pays on Stripe's page; success and cancel both return to the Dashboard.

Back from Checkout, a "payment being processed" message is shown until the webhook writes the final status. The section then updates in real time.

## Webhook

The `stripeWebhook` function receives the Stripe events that change the subscription:

- `checkout.session.completed`
- `customer.subscription.created`, `customer.subscription.updated` and `customer.subscription.deleted`

For each request it:

- verifies the Stripe signature on the raw body; a missing or invalid signature gets `400`;
- ignores events older than the last one applied, because Stripe does not guarantee their order;
- ignores events of a subscription other than the stored active one;
- acknowledges any other event type with `200`.

The webhook and the Checkout sync map a Stripe subscription to the same fields, so both paths write the same document.

## Subscription status

The status of each Company is stored in `subscriptions/{companyId}`, with the status, the Stripe Customer and subscription ids, the Price, the current period end, the cancel-at-period-end flag and the time of the last event applied. See [Data model](/pizzahub-docs/data-model/#subscription).

Statuses come from Stripe, such as `active`, `past_due`, `canceled` and `incomplete`. The Dashboard shows the status and, for an active subscription, the renewal date.

While the Company's subscription is not active, a warning banner with a **Manage subscription** link appears under the header on every application page. The banner never blocks a feature.

## Test cards

Use Stripe test cards at Checkout, as described in [Getting started](/pizzahub-docs/getting-started/#stripe-webhooks-locally): `4242 4242 4242 4242` succeeds and `4000 0000 0000 0341` is declined.
