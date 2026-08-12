---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Machine Roles
---

## Gets all machine roles that have been defined in this Octopus installation

`GET` `/api/{spaceId}/machineroles/all`

Also reachable at `/api/machineroles/all`, `/api/spaces/{spaceIdentifier}/machineroles/all`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Machine Roles

<div data-example="Response">

```json
[
  "string"
]
```
</div>

## Gets all machine roles that have been defined in this Octopus installation

`GET` `/api/{spaceId}/machineroles/all/v1`

Also reachable at `/api/machineroles/all/v1`, `/api/spaces/{spaceIdentifier}/machineroles/all/v1`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Machine Roles

`GetAllMachineRolesResponse`.

- **`MachineRoles`** <span class="type-label">array of string</span>

<div data-example="Response">

```json
{
  "MachineRoles": [
    "string"
  ]
}
```
</div>
