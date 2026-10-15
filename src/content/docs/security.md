---
title: Security
description: Access rules, tenancy, roles and data validation in PizzaHub.
---

PizzaHub enforces its security in the backend: Firestore and Storage rules decide what each signed-in User can read and write. The app checks the same rules in the browser, but the rules are the real boundary.

## Tenancy and roles

- **Company and Store**: a signed-in User's profile (`users/{uid}`) holds their `companyId` and `storeId`. Every rule compares the data against these values, so a User cannot see data from another Company or Store.
- **Roles**: V1 has one role, `admin`. Only an admin creates or changes business data (Menu, Products, Customers, Orders and product images). Any User of the Store can read them.
- **Onboarding**: a new User may create only their own Company, Store and User profile, together, and never change them afterwards. A User cannot edit their own Company, Store or role.

## Firestore rules

- **Authentication**: every read and write requires a signed-in User.
- **Orders**: Users read the Orders of their Store and create or update them as admins. An Order is created as `Pending`, and an update is either a status change or a content edit. Cancelled Orders cannot be updated, and Orders cannot be deleted.
- **Status changes**: `Completed` requires the completion time to be the request time; moving back clears it; cancelling does not change it.
- **Customers**: Users read and update the Customers of their Company. A Delivery Order requires a Customer with a non-blank phone, street, street number, postal code and city.
- **Menu**: Menus, Categories and Products are readable by the Users of their Store and writable only by its admin. Their `categoryId`, `menuId` and `createdAt` never change.
- **Subscriptions**: readable by the Users of the Company, never writable by clients. Only the Cloud Functions write them, through the Admin SDK, which bypasses the rules.

## Storage rules

Product images are stored under `products/{storeId}/`.

- Any User of that Store can read them.
- Only the admin of that Store can upload, replace or delete them.
- Uploads must be WebP or JPEG files smaller than 150 KB.

## Data validation

Every written document is checked for:

- **Allowed fields**: no unknown keys are accepted.
- **Required fields** on creation, and no removal of required fields on update.
- **Types** and **length limits**, such as names and address parts.
- **Immutable fields**, such as the Company, Store and creation time.
- **Limits**: lists and Order items are capped at 50 elements.

The length limits are defined once in `src/utils/fieldLimits.js` and repeated in the security rules. Services and forms apply them too, so a value that is too long is rejected with a clear message before it reaches Firestore.

## Stripe and secrets

- The Cloud Functions accept only Stripe test keys (`sk_test_`), so no real payment is possible.
- Stripe secrets are stored in Google Secret Manager. They never reach the client or the repository.
- The Stripe webhook checks the signature of every request before it writes anything.
