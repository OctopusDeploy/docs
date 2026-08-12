---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Json Web Keys
---

## Gets signing keys used by Octopus Server in JWK format

`GET` `/api/.well-known/jwks`

**Response**

`200` — Rseponse to getting set of JsonWebKeys

`GetJsonWebKeysResponse`.

- **`keys`** <span class="type-label">array of object</span>
  - **`e`** <span class="type-label">string</span> — Minimum length 1.
  - **`kid`** <span class="type-label">string</span> — Minimum length 1.
  - **`kty`** <span class="type-label">string</span> — Minimum length 1.
  - **`n`** <span class="type-label">string</span> — Minimum length 1.
  - **`use`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "keys": [
    {
      "e": "string",
      "kid": "string",
      "kty": "string",
      "n": "string",
      "use": "string"
    }
  ]
}
```
</div>
