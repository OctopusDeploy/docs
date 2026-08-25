---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Token Exchange
---

## Exchange an Oidc token for an access token that allows access to the API

:endpoint{method="POST" path="/api/token/v1"}

**Request Body**

- **`audience`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`grant_type`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`subject_token`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`subject_token_type`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
```json
{
  "audience": "string",
  "grant_type": "string",
  "subject_token": "string",
  "subject_token_type": "string"
}
```
:::

**Response**

`200` — OK
