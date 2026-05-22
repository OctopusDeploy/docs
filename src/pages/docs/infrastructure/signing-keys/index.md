---
layout: src/layouts/Default.astro
pubDate: 2023-11-01
modDate: 2026-05-22
title: Signing Keys
description: Signing keys used for OpenID Connect authentication
navOrder: 40
hideInThisSection: true
---

Octopus uses a signing key to sign the tokens it generates as part of OpenID Connect (OIDC) authentication flows — including [GitHub Connections](/docs/projects/version-control/github) and [OIDC accounts](/docs/infrastructure/accounts/openid-connect) used to authenticate with cloud providers. Services that need to validate these tokens fetch the public key from your Octopus instance's OIDC discovery endpoint.

Your public keys can either be hosted by your Octopus instance or at a separate location you manage.

## Internally hosted

When using internally hosted public keys, your Octopus instance hosts and manages them automatically. Octopus rotates and revokes keys according to your configured preferences, and tokens include your instance's address as the issuer.

This is the right choice for **Octopus Cloud instances** and **self-hosted instances that are accessible from the internet**. Any service validating your tokens can reach the OIDC discovery endpoint on your instance directly.

Ensure your instance is accessible at the address used as its issuer URL.

## Externally hosted

External hosting is for **self-hosted instances on private or isolated networks** that are not reachable from the internet. Services like the Octopus GitHub service or cloud providers need to fetch your public keys to validate tokens — if they can't reach your instance directly, you need to host those keys somewhere they can.

When externally hosting, Octopus generates a ZIP file containing your OIDC discovery document and public key set. Host the contents of this file at any publicly accessible HTTPS location, then provide that address as the **OIDC Issuer URL**. Octopus uses this URL as the issuer in tokens it generates, and external services fetch keys from there instead of from your instance.

:::div{.hint}
If the OIDC Issuer URL is set in Octopus's settings, it will be used as the issuer regardless of whether Internal or External hosting is selected.
:::

:::div{.warning}
External hosting requires manual key rotation and adds operational overhead. Only use it when your instance is not publicly accessible and internal hosting isn't an option.
:::

### Rotating externally hosted keys

Externally hosted keys must be rotated manually. Clicking **Rotate** downloads a new ZIP file with an updated key set. Upload the contents to your hosting provider, then Octopus polls the OIDC Issuer URL for the new keys. Once it confirms the new keys are available, it starts signing tokens with the new key.

:::div{.info}
The new key set includes your previous active key, so existing OIDC integrations continue to work while you complete the rotation. Octopus only starts signing with the new key after confirming it's available at the issuer URL.
:::

Support for manually managing signing keys was added in **2026.2**.
