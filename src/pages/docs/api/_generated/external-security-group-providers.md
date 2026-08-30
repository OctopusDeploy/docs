---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: External Security Group Providers
---

## GET /api/externalsecuritygroupproviders

:endpoint{method="GET" path="/api/externalsecuritygroupproviders"}

Lists the authentication providers that support external group lookups and are currently enabled

**Response**

`200` — The requested External Security Group Providers

- **`Id`** :span[string]{.type-label}
- **`IsRoleBased`** :span[boolean]{.type-label}
- **`LookupUri`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}
- **`SupportsGroupLookup`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
[
  {
    "Id": "string",
    "IsRoleBased": false,
    "LookupUri": "string",
    "Name": "string",
    "SupportsGroupLookup": false
  }
]
```
:::
