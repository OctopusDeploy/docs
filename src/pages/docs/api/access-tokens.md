---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Access Tokens
---

## Create an access token for the current user

:span[POST]{.api-post} `/api/users/access-token`

**Response**

`200` — Contains the created access token.

- **`AccessToken`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "AccessToken": "string"
}
```
:::
