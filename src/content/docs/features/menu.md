---
title: Menu
description: Managing Categories, Products, prices, cooking levels and product images.
---

The Menu page manages the Store's Categories and Products.

## Categories

- Create, edit, delete and reorder Categories. Deleting a Category also deletes its Products.
- On large screens the category sidebar starts with the add-category form. On small screens the categories become a horizontal, scrollable selector above the products.
- Each card shows the name (up to two lines) and a product count (capped at 99+).

## Products

- Create, edit, delete and reorder Products within a Category. A Product name is unique within its Category.
- Fields: name, description, a single price or one price per size, ingredients, cooking levels, availability and position.
- Compact rows expand in place. A collapsed row shows an ingredient preview, a price summary and an availability switch. The expanded row shows the prices, the cooking levels, and the edit and delete actions.
- Menu actions run one at a time and show a saving state.

## Product images

Images are resized in the browser before upload (longest side at most 800 px) and compressed to WebP, or JPEG when WebP is not available. The result is kept under 150 KB and cached by the browser for one day. An image can be replaced or removed.

## Menu readiness

Until the Menu has at least one Category with at least one valid Product, only the Menu page is reachable, including through a direct URL. This guarantees that tickets always have something to sell.
