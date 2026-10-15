---
title: Authentication
description: Sign-up, sign-in, Google sign-in, password reset and protected routes.
---

Access to PizzaHub uses Firebase Authentication.

- **Sign-up and sign-in** with email and password, from one card with a toggle between the two modes. Errors are shown in an alert.
- **Google sign-in** as an alternative provider.
- **Password reset**: **Forgot password?** on the sign-in form sends the Firebase reset email to the typed address. The confirmation is the same whether or not an account exists, so it does not reveal registered emails. Firebase hosts the page where the new password is set. Google accounts recover access through Google.
- **Sessions** persist across page reloads. Logout is in the header.
- **Redirects**: a new User goes to [Onboarding](/pizzahub-docs/features/onboarding/), an existing User to [Store selection](/pizzahub-docs/features/store-selection/).
- **Protected routes**: every application page requires a signed-in User, including through a direct URL.
