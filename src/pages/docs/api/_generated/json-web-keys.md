---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Json Web Keys
---

## Get signing keys used by Octopus Server in JWK format

:endpoint{method="GET" path="/api/.well-known/jwks"}

**Response**

`200` — Rseponse to getting set of JsonWebKeys

- **`keys`** :span[array of object]{.type-label}
  - **`e`** :span[string]{.type-label}  
    Minimum length 1.
  - **`kid`** :span[string]{.type-label}  
    Minimum length 1.
  - **`kty`** :span[string]{.type-label}  
    Minimum length 1.
  - **`n`** :span[string]{.type-label}  
    Minimum length 1.
  - **`use`** :span[string]{.type-label}  
    Minimum length 1.

:::api-example{label="Response"}
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
:::
