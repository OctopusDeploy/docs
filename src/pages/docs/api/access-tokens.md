---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Access Tokens
---

## Creates an access token for the current user

`POST` `/api/users/access-token`

**Response**

`200` — Contains the created access token.

`GenerateAccessTokenResponse`.

- **`AccessToken`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "AccessToken": "string"
}
```
</div>
