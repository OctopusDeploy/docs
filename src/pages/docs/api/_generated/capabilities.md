---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-25
title: Capabilities
---

A Capability is a Request or Command that the server supports.

You can list all capabilities, or query for an individual one.

The intent of these endpoints is to allow HTTP clients to detect features in a more robust way than
guessing based on the Server Version.

Capabilities are expressed in terms of the internal Command or Request data type names.
For example, the URL `/api/{SpaceId}/certificates/v2` maps to the `GetCertificatesRequestV2` request type,
which will appear as a capability for servers which support it.

The capabilities endpoints can be accessed anonymously; If a client needs to detect a feature before
authenticating, it may do so.

## List capabilities (Commands and Requests) this server supports

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

## Query for a single capability (Command or Request)

:endpoint{method="GET" path="/api/capabilities/\{capability\}"}

If the Capability exists, an HTTP 200 (OK) will be returned. If not, a 404 (Not Found) will be returned.

**Path Parameters**

- **`capability`** :span[string]{.type-label} *(required)*  
  The capability you want to query for. Name matching is case insensitive. Partial matching is not supported.

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
