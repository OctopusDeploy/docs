---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Machine Roles
---

## Get all machine roles that have been defined in this Octopus installation

:endpoint{method="GET" path="/api/\{spaceId\}/machineroles/all"}

Also reachable at `/api/machineroles/all`, `/api/spaces/{spaceIdentifier}/machineroles/all`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Machine Roles

:::api-example{label="Response"}
```json
[
  "string"
]
```
:::

## Get all machine roles that have been defined in this Octopus installation

:endpoint{method="GET" path="/api/\{spaceId\}/machineroles/all/v1"}

Also reachable at `/api/machineroles/all/v1`, `/api/spaces/{spaceIdentifier}/machineroles/all/v1`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Machine Roles

- **`MachineRoles`** :span[array of string]{.type-label}

:::api-example{label="Response"}
```json
{
  "MachineRoles": [
    "string"
  ]
}
```
:::
