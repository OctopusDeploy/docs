---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Scoped User Roles
---

## List the name and ID of all of the scoped user roles in the supplied Octopus Deploy Space. The results will be sorted by name

:endpoint{method="GET" path="/api/\{spaceId\}/scopeduserroles"}

Also reachable at `/api/scopeduserroles`, `/api/spaces/{spaceIdentifier}/scopeduserroles`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resources.

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Scoped User Roles

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`EnvironmentIds`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectGroupIds`** :span[array of string]{.type-label}
  - **`ProjectIds`** :span[array of string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TeamId`** :span[string]{.type-label}
  - **`TenantIds`** :span[array of string]{.type-label}
  - **`UserRoleId`** :span[string]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastPageNumber`** :span[integer]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
:::

## Create a scoped user role

:endpoint{method="POST" path="/api/\{spaceId\}/scopeduserroles"}

Also reachable at `/api/scopeduserroles`, `/api/spaces/{spaceIdentifier}/scopeduserroles`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`ProjectGroupIds`** :span[array of string]{.type-label}
- **`ProjectIds`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TeamId`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`TenantIds`** :span[array of string]{.type-label}
- **`UserRoleId`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectGroupIds`** :span[array of string]{.type-label}
- **`ProjectIds`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TeamId`** :span[string]{.type-label}
- **`TenantIds`** :span[array of string]{.type-label}
- **`UserRoleId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a Scoped User Role by ID

:endpoint{method="GET" path="/api/\{spaceId\}/scopeduserroles/\{id\}"}

Also reachable at `/api/scopeduserroles/{id}`, `/api/spaces/{spaceIdentifier}/scopeduserroles/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resources.

**Response**

`200` — Scoped User Role.

- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectGroupIds`** :span[array of string]{.type-label}
- **`ProjectIds`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TeamId`** :span[string]{.type-label}
- **`TenantIds`** :span[array of string]{.type-label}
- **`UserRoleId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Modify a scoped user role

:endpoint{method="PUT" path="/api/\{spaceId\}/scopeduserroles/\{id\}"}

Also reachable at `/api/scopeduserroles/{id}`, `/api/spaces/{spaceIdentifier}/scopeduserroles/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the scoped user role to modify.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the scoped user role to modify. Minimum length 1.
- **`ProjectGroupIds`** :span[array of string]{.type-label}
- **`ProjectIds`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TeamId`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`TenantIds`** :span[array of string]{.type-label}
- **`UserRoleId`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
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
:::

**Response**

`200` — Confirmation that the Scoped User Role was modified, containing the updated Role

- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectGroupIds`** :span[array of string]{.type-label}
- **`ProjectIds`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TeamId`** :span[string]{.type-label}
- **`TenantIds`** :span[array of string]{.type-label}
- **`UserRoleId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Delete an existing Scoped User Role

:endpoint{method="DELETE" path="/api/\{spaceId\}/scopeduserroles/\{id\}"}

Also reachable at `/api/scopeduserroles/{id}`, `/api/spaces/{spaceIdentifier}/scopeduserroles/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Scoped User Role to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success
