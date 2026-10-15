---
title: Tickets
description: Creating, editing, moving through statuses and cancelling tickets.
---

A ticket is an Order: one customer, one order type, one scheduled time and a list of items.

## Creating a ticket

The **Create Ticket** button opens a sidebar (full screen on phones).

- **Order type** (Takeaway or Delivery) and **scheduled time**. The time defaults to 30 minutes from now.
- **Customer**: search by first name among the Company's Customers, or enter a new one. Takeaway requires a first name. Delivery also requires phone, street, street number, postal code and city.
- **Items**: **Add product** opens the Menu panel. Unavailable products are shown but cannot be selected. Each item is configured with its size, cooking level, customizations and quantity.
- **Total** is calculated automatically.

On save, the Customer and the Order are written together, and the ticket appears in the Pending column. Closing the sidebar with unsaved changes asks for confirmation.

## Status changes

- **Pending**: **Start** moves the ticket to In progress.
- **In progress**: **Complete** moves it to Completed, **Back** returns it to Pending.
- **Completed**: **Reopen** returns it to In progress.

The completion time is recorded when a ticket is completed and cleared when it goes back.

## Editing and cancelling

- **Edit** reopens the sidebar prefilled with the ticket, in any status. Customer, order type, scheduled time and items can change. Store, status and creation time do not change.
- **Cancel** asks for confirmation and marks the ticket as Cancelled. A cancelled ticket is final: it disappears from the Tableau and can no longer be edited. It stays in the database.

## Changing an item

Items keep a snapshot of their Product. What can change depends on the Product's state:

- **On sale**: full edit. The saved price is kept unless the size changes.
- **Unavailable but still in the Menu**: customizations, cooking level and a lower quantity can change. Size and price are locked.
- **Deleted from the Menu**: only customizations and a lower quantity can change. Size, cooking level and price are locked.

In every case, the quantity cannot go above the saved quantity.
