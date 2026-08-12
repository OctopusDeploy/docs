---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: External Security Group Providers
---

## GET /api/externalsecuritygroupproviders

`GET` `/api/externalsecuritygroupproviders`

Lists the authentication providers that support external group lookups and are currently enabled

**Response**

`200` — The requested External Security Group Providers

an array of `AuthenticationProviderThatSupportsGroups`.

- **`Id`** <span class="type-label">string</span>
- **`IsRoleBased`** <span class="type-label">boolean</span>
- **`LookupUri`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span>
- **`SupportsGroupLookup`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
[
  {
    "Id": "string",
    "IsRoleBased": true,
    "LookupUri": "string",
    "Name": "string",
    "SupportsGroupLookup": true
  }
]
```
</div>
