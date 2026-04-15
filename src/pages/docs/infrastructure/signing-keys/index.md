---
layout: src/layouts/Default.astro
pubDate: 2023-11-01
modDate: 2026-04-15
title: Signing Keys
description: Signing keys used for OpenID Connect authentication
navOrder: 40
hideInThisSection: true
---

Octopus uses a Signing Key to sign the generated authorization request tokens used in the authentication flow for OpenID Connect. The public signing key is used by the resource server to validate the token supplied by Octopus.

Depending on your security requirements, your public keys can either be hosted by your Octopus Deploy instance or delegated to a 3rd party.

## Internally hosted

When using internally hosted public keys, your Octopus Deploy instance will host and manage them. Octopus Deploy will automatically rotate and revoke the keys according to your preferences. Any tokens Octopus Deploy creates will include the current public address of your Octopus Deploy instance as the issuer. It is important to ensure your Octopus Deploy instance can be accessed at this address.

## Externally hosted

When externally hosting public keys, they will be available for download as a zip file. The contents of this zip file can then be hosted on any hosting provider that publicly serves HTTPS. The location where the files are hosted must be provided as the `OIDC Issuer URL`. When Octopus Deploy creates a token, the issuer will point to the `OIDC Issuer URL`. While the location specified by the issuer URL must be publicly available, the Octopus Deploy instance can be isolated from public access.

### Rotating externally hosted keys

Externally hosted public keys must be manually rotated. Upon clicking `Rotate`, a new set of keys will be downloaded as a zip file. The user will then need to upload the contents of this file to their chosen hosting provider. Octopus Deploy will poll the provided `OIDC Issuer URL` for the new keys. Once it successfully validates that the new keys are available at the issuer URL, it will start using the new signing key.

:::div{.info}
The new key set will include your previous active key. This ensures that all OIDC services continue to function while the key rotation is underway. Octopus Deploy will start signing tokens with the new key only after validating that the new key is available at the issuer URL.
