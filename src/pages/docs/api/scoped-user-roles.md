---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Scoped User Roles
---

## Lists the name and ID of all of the scoped user roles in the supplied Octopus Deploy Space. The results will be sorted by name

`GET` `/api/{spaceId}/scopeduserroles`

Also reachable at `/api/scopeduserroles`, `/api/spaces/{spaceIdentifier}/scopeduserroles`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resources.

- **`ids`** <span class="type-label">array of string</span>
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Scoped User Roles

`ScopedUserRoleResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`EnvironmentIds`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectGroupIds`** <span class="type-label">array of string</span>
  - **`ProjectIds`** <span class="type-label">array of string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TeamId`** <span class="type-label">string</span>
  - **`TenantIds`** <span class="type-label">array of string</span>
  - **`UserRoleId`** <span class="type-label">string</span>
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastPageNumber`** <span class="type-label">integer</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NumberOfPages`** <span class="type-label">integer</span>
- **`TotalResults`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "EnvironmentIds": [
        "string"
      ],
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ProjectGroupIds": [
        "string"
      ],
      "ProjectIds": [
        "string"
      ],
      "SpaceId": "string",
      "TeamId": "string",
      "TenantIds": [
        "string"
      ],
      "UserRoleId": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastPageNumber": 0,
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Create a scoped user role

`POST` `/api/{spaceId}/scopeduserroles`

Also reachable at `/api/scopeduserroles`, `/api/spaces/{spaceIdentifier}/scopeduserroles`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateScopedUserRoleCommand`

- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`ProjectGroupIds`** <span class="type-label">array of string</span>
- **`ProjectIds`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TeamId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`TenantIds`** <span class="type-label">array of string</span>
- **`UserRoleId`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "EnvironmentIds": [
    "string"
  ],
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TeamId": "string",
  "TenantIds": [
    "string"
  ],
  "UserRoleId": "string"
}
```
</div>

**Response**

`201` — Created

`ScopedUserRoleResource`.

- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectGroupIds`** <span class="type-label">array of string</span>
- **`ProjectIds`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TeamId`** <span class="type-label">string</span>
- **`TenantIds`** <span class="type-label">array of string</span>
- **`UserRoleId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "EnvironmentIds": [
    "string"
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TeamId": "string",
  "TenantIds": [
    "string"
  ],
  "UserRoleId": "string"
}
```
</div>

## Get a Scoped User Role by ID

`GET` `/api/{spaceId}/scopeduserroles/{id}`

Also reachable at `/api/scopeduserroles/{id}`, `/api/spaces/{spaceIdentifier}/scopeduserroles/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resources.

**Response**

`200` — Scoped User Role.

`ScopedUserRoleResource`.

- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectGroupIds`** <span class="type-label">array of string</span>
- **`ProjectIds`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TeamId`** <span class="type-label">string</span>
- **`TenantIds`** <span class="type-label">array of string</span>
- **`UserRoleId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "EnvironmentIds": [
    "string"
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TeamId": "string",
  "TenantIds": [
    "string"
  ],
  "UserRoleId": "string"
}
```
</div>

## Modify a scoped user role

`PUT` `/api/{spaceId}/scopeduserroles/{id}`

Also reachable at `/api/scopeduserroles/{id}`, `/api/spaces/{spaceIdentifier}/scopeduserroles/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the scoped user role to modify.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyScopedUserRoleCommand`

- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> *(required)* — The ID of the scoped user role to modify. Minimum length 1.
- **`ProjectGroupIds`** <span class="type-label">array of string</span>
- **`ProjectIds`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TeamId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`TenantIds`** <span class="type-label">array of string</span>
- **`UserRoleId`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "EnvironmentIds": [
    "string"
  ],
  "Id": "string",
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TeamId": "string",
  "TenantIds": [
    "string"
  ],
  "UserRoleId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Scoped User Role was modified, containing the updated Role

`ScopedUserRoleResource`.

- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectGroupIds`** <span class="type-label">array of string</span>
- **`ProjectIds`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TeamId`** <span class="type-label">string</span>
- **`TenantIds`** <span class="type-label">array of string</span>
- **`UserRoleId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "EnvironmentIds": [
    "string"
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TeamId": "string",
  "TenantIds": [
    "string"
  ],
  "UserRoleId": "string"
}
```
</div>

## Deletes an existing Scoped User Role

`DELETE` `/api/{spaceId}/scopeduserroles/{id}`

Also reachable at `/api/scopeduserroles/{id}`, `/api/spaces/{spaceIdentifier}/scopeduserroles/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Scoped User Role to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success
