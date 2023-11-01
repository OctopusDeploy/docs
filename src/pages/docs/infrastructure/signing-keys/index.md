---
layout: src/layouts/Default.astro
pubDate: 2023-11-01
modDate: 2023-11-01
title: Signing Keys
description: Signing keys used for OpenID Connect authentication
navOrder: 40
hideInThisSection: true
---

Octopus uses a Signing Key to sign the generated authorization request tokens used in the authentication flow for OpenID Connect. The public signing key is used by the resource server to validate the token supplied by Octopus.

The signing keys by default have a 90-day expiry and will be rotated when they expire.

:::div{.warning}
Since OpenID Connect authentication is still an EAP feature, there is no User Interface to manage or view the Signing Keys.

The following API endpoints can be used to manage the Signing Keys:

List all keys: `GET` `/api/signingkeys/v1`

Rotate the active key: `POST` `/api/signingkeys/rotate/v1`

Revoke a signing key: `POST` `/api/signingkeys/{id}/revoke/v1`
:::