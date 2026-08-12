---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Capabilities
---

## Asks the server to return a list of all the Capabilities (Commands and Requests) it supports

`GET` `/api/capabilities`

**Response**

`200` — The requested list of Capabilities

`GetCapabilitiesResponseV1`.

- **`Capabilities`** <span class="type-label">array of string</span> — list of supported Commands and Requests that this server has.

<div data-example="Response">

```json
{
  "Capabilities": [
    "string"
  ]
}
```
</div>

## Asks the server if a single capability exists or not. If the Capability exists, an HTTP 200 (OK) will be returned. If not, a 404 (Not Found) will be returned

`GET` `/api/capabilities/{capability}`

**Parameters**

- **`capability`** <span class="type-label">string</span> *(required)* — The capability you want to query for. Name matching is case insensitive but otherwise must be a full string match.

**Response**

`200` — Indicates that the Capability exists

`RequireCapabilityResponseV1`.

- **`Exists`** <span class="type-label">boolean</span> — If true, the server has this capability and you can use it. If not, the capability is not available on this server.

<div data-example="Response">

```json
{
  "Exists": true
}
```
</div>
