---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Token Exchange
---

## Exchanges an Oidc token for an access token that allows access to the API

`POST` `/api/token/v1`

**Request Body**

`ExchangeOidcTokenForAccessTokenCommandV1`

- **`audience`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`grant_type`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`subject_token`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`subject_token_type`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "audience": "string",
  "grant_type": "string",
  "subject_token": "string",
  "subject_token_type": "string"
}
```
</div>

**Response**

`200` — OK
