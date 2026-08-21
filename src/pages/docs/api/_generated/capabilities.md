---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Capabilities
---

## Ask the server to return a list of all the Capabilities (Commands and Requests) it supports

:endpoint{method="GET" path="/api/capabilities"}

**Response**

`200` — The requested list of Capabilities

- **`Capabilities`** :span[array of string]{.type-label}  
  list of supported Commands and Requests that this server has.

:::api-example{label="Response"}
```json
{
  "Capabilities": [
    "string"
  ]
}
```
:::

## Ask the server if a single capability exists or not. If the Capability exists, an HTTP 200 (OK) will be returned. If not, a 404 (Not Found) will be returned

:endpoint{method="GET" path="/api/capabilities/\{capability\}"}

**Path Parameters**

- **`capability`** :span[string]{.type-label} *(required)*  
  The capability you want to query for. Name matching is case insensitive but otherwise must be a full string match.

**Response**

`200` — Indicates that the Capability exists

- **`Exists`** :span[boolean]{.type-label}  
  If true, the server has this capability and you can use it. If not, the capability is not available on this server.

:::api-example{label="Response"}
```json
{
  "Exists": false
}
```
:::
