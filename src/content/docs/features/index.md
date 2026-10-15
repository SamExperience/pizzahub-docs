---
title: Features
description: What PizzaHub does, page by page.
---

PizzaHub covers the daily work of a pizzeria: the team signs up, sets up its Store and Menu, takes orders, follows them through service and reviews the history. Each page below describes one part of the app.

| Page | What it covers |
|---|---|
| [Authentication](/pizzahub-docs/features/authentication/) | Sign-up, sign-in, Google, password reset, redirects |
| [Onboarding](/pizzahub-docs/features/onboarding/) | Company and Store setup for the first User |
| [Store selection](/pizzahub-docs/features/store-selection/) | Choosing the active Store |
| [Menu](/pizzahub-docs/features/menu/) | Categories, Products, images and the Menu readiness guard |
| [Tableau](/pizzahub-docs/features/tableau/) | Real-time board of the day's orders |
| [Tickets](/pizzahub-docs/features/tickets/) | Creating, editing, moving and cancelling tickets |
| [Print preview](/pizzahub-docs/features/print-preview/) | Receipt preview for a 58 mm printer |
| [Dashboard](/pizzahub-docs/features/dashboard/) | Order history by day and the subscription section |

## User interface

- Responsive, mobile-first layout built with Tailwind CSS. Light theme with a tomato-red brand color; order statuses are amber (Pending), blue (In progress) and green (Completed).
- App header with the brand, the navigation to Tableau, Menu and Dashboard, the active Store, the signed-in User and logout. On small screens the navigation moves into a collapsible menu.
- Consistent loading, empty and error states across the pages. Read errors show a **Retry** action.
- Controls are at least 44 px tall for touch, and icon-only buttons have accessible labels.
