---
title: Data model
description: Firestore collections, their fields and how they relate.
---

PizzaHub stores its data in Cloud Firestore. Every document has `createdAt` and `updatedAt` timestamps, set by the server. Relations are stored as ids: a Store belongs to a Company, a Menu to a Store, a Category to a Menu, a Product to a Category, and an Order references a Customer.

```text
companies ─┬─ stores ── menus ── categories ── products
           ├─ users (one admin, linked to a Store)
           ├─ customers ─┐
           └─ subscriptions (one document per Company)
stores ────────────────── orders ─ items (snapshots) ─┘ customerId
```

## Company, Store and User

**`companies/{companyId}`**

| Field | Type | Notes |
|---|---|---|
| `name` | string | Required. |
| `logoUrl` | string or null | Not set from the app. |
| `address` | map or null | `street`, `streetNumber`, `postalCode`, `city`, `country`. |

**`stores/{storeId}`**

| Field | Type | Notes |
|---|---|---|
| `companyId` | string | The owning Company. |
| `name` | string | Required. |
| `address` | map | Required: `street`, `postalCode`, `city`, `country`; `streetNumber` optional. |
| `isActive` | boolean | Required. |
| `imageUrl` | string or null | Not set from the app. |

**`users/{uid}`**

| Field | Type | Notes |
|---|---|---|
| `uid` | string | The Firebase Authentication UID. |
| `companyId` | string | The User's Company. |
| `storeId` | string | The User's Store. |
| `role` | string | `admin` in V1, the only role. |
| `displayName` | string or null | Optional. |

## Menu, Category and Product

**`menus/{menuId}`**: `storeId`, `name`. One Menu per Store.

**`categories/{categoryId}`**: `menuId`, `name`, `position`.

**`products/{productId}`**

| Field | Type | Notes |
|---|---|---|
| `categoryId` | string | The Category. |
| `name` | string | Unique within its Category. |
| `description` | string or null | |
| `ingredients` | list of strings | |
| `sizes` | list of `{ name, price }` | Empty when the Product has a single price. |
| `price` | number or null | Set when there are no sizes; null when there are sizes. A Product has either a single price or prices per size. |
| `availableCookingLevels` | list of strings | |
| `defaultCookingLevel` | string or null | |
| `isAvailable` | boolean | The availability switch. |
| `imageUrl` | string or null | Download URL of the image in Cloud Storage. |
| `position` | number | Order inside the Category. |

## Customer

**`customers/{customerId}`**

| Field | Type | Notes |
|---|---|---|
| `companyId` | string | Customers belong to the Company, not to one Store. |
| `firstName` | string | Required. |
| `lastName` | string or null | |
| `phone` | string or null | Required for delivery. |
| `address` | map or null | `street`, `streetNumber`, `postalCode`, `city`, `country`. Required for delivery. |

A Customer is saved together with the Order that uses it, and reused for the next orders.

## Order and items

**`orders/{orderId}`**

| Field | Type | Notes |
|---|---|---|
| `storeId` | string | The Store that took the order. |
| `customerId` | string | The Customer. |
| `orderType` | string | `takeaway` or `delivery`. |
| `scheduledTime` | timestamp | Pickup or delivery time. |
| `status` | string | `Pending`, `In progress`, `Completed` or `Cancelled`. A new Order is always `Pending`. |
| `items` | list of items | 1 to 50 items. |
| `total` | number | Sum of the item subtotals. |
| `completedAt` | timestamp or null | Set when the Order is completed, cleared when it moves back. |

Each **item** is a snapshot taken when it is added: `productId`, `productName`, `size`, `unitPrice`, `quantity`, `cookingLevel`, `customizations` (list of text) and `subtotal`. Changing or deleting a Product later does not change existing Orders.

## Subscription

**`subscriptions/{companyId}`**: written only by the Cloud Functions.

| Field | Type | Notes |
|---|---|---|
| `status` | string | Stripe status, such as `active`, `past_due`, `canceled` or `incomplete`. |
| `stripeCustomerId` | string | The Company's Stripe Customer. |
| `stripeSubscriptionId` | string | The active Stripe subscription. |
| `priceId` | string | The monthly Price. |
| `currentPeriodEnd` | timestamp | Renewal date. |
| `cancelAtPeriodEnd` | boolean | |
| `lastEventAt` | timestamp | Time of the last Stripe event applied. |

See [Security](/pizzahub-docs/security/) for who can read and write each collection.
