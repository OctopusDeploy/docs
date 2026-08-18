---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Spaces
---

## Get a collection of Git credentials

:endpoint{method="GET" path="/api/\{spaceId\}/git-credentials"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`name`** :span[string]{.type-label}  
  Filters credentials matching any part of the `name` fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Git Credentials

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Details`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
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
      "Description": "string",
      "Details": {
        "Type": "UsernamePassword"
      },
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "RepositoryRestrictions": {
        "AllowedRepositories": [
          "string"
        ],
        "Enabled": true
      },
      "SpaceId": "string"
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

## Create a new Git credential

:endpoint{method="POST" path="/api/\{spaceId\}/git-credentials"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`Password`** :span[sensitive value]{.type-label} *(required)*
  - **`Username`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Details": {
    "Password": {
      "HasValue": true,
      "Hint": "string",
      "NewValue": "string"
    },
    "Username": "string"
  },
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  },
  "SpaceId": "string"
}
```
:::

**Response**

`201` — Created

- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
:::

## Get a collection of Git credentials

:endpoint{method="GET" path="/api/\{spaceId\}/git-credentials/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/v1`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`name`** :span[string]{.type-label}  
  Filters credentials matching any part of the `name` fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Git Credentials

- **`GitCredentials`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`ItemType`** :span[string]{.type-label}
  - **`Items`** :span[array of object]{.type-label}
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
  "GitCredentials": {
    "Id": "string",
    "ItemType": "string",
    "Items": [
      {
        "Description": "string",
        "Details": {},
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "Name": "string",
        "RepositoryRestrictions": {},
        "SpaceId": "string"
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
}
```
:::

## Create a new Git credential

:endpoint{method="POST" path="/api/\{spaceId\}/git-credentials/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/v1`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`Password`** :span[sensitive value]{.type-label} *(required)*
  - **`Username`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Details": {
    "Password": {
      "HasValue": true,
      "Hint": "string",
      "NewValue": "string"
    },
    "Username": "string"
  },
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  },
  "SpaceId": "string"
}
```
:::

**Response**

`201` — Created

- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
:::

## Get a collection of Git credentials

:endpoint{method="GET" path="/api/\{spaceId\}/git-credentials/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/v2`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`name`** :span[string]{.type-label}  
  Filters credentials matching any part of the `name` fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Details`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ItemType": "string",
  "Items": [
    {
      "Description": "string",
      "Details": {
        "Type": "UsernamePassword"
      },
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Name": "string",
      "RepositoryRestrictions": {
        "AllowedRepositories": [
          "string"
        ],
        "Enabled": true
      },
      "SpaceId": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
:::

## Create a new Git credential

:endpoint{method="POST" path="/api/\{spaceId\}/git-credentials/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/v2`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`Type`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Details": {
    "Type": "string"
  },
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  },
  "SpaceId": "string"
}
```
:::

**Response**

`201` — Created

- **`Id`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string"
}
```
:::

## Get a specific Git credential

:endpoint{method="GET" path="/api/\{spaceId\}/git-credentials/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Git credential to get.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Git Credential

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `UsernamePassword`, `Anonymous`, `Library`, `GitHub`, `NotSpecified`, `SshKey`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Description": "string",
  "Details": {
    "Type": "UsernamePassword"
  },
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  },
  "SpaceId": "string"
}
```
:::

## Modify an existing Git credential

:endpoint{method="PUT" path="/api/\{spaceId\}/git-credentials/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`Password`** :span[sensitive value]{.type-label} *(required)*
  - **`Username`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Id`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Details": {
    "Password": {
      "HasValue": true,
      "Hint": "string",
      "NewValue": "string"
    },
    "Username": "string"
  },
  "Id": "string",
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  },
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Confirmation that the Git Credential was modified

:::api-example{label="Response"}
```json
{}
```
:::

## Delete an existing Git credential

:endpoint{method="DELETE" path="/api/\{spaceId\}/git-credentials/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Git credential to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Git Credential has been deleted

:::api-example{label="Response"}
```json
{}
```
:::

## Get usage of a specific Git credential

:endpoint{method="GET" path="/api/\{spaceId\}/git-credentials/\{id\}/usage"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/usage`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Git credential to get usage for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Git Credential Usage

- **`OtherProjects`** :span[integer]{.type-label}
- **`Projects`** :span[array of object]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectId`** :span[string]{.type-label}
  - **`RepositoryUrl`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.

:::api-example{label="Response"}
```json
{
  "OtherProjects": 0,
  "Projects": [
    {
      "Name": "string",
      "ProjectId": "string",
      "RepositoryUrl": "string",
      "Slug": "string"
    }
  ]
}
```
:::

## Get usage of a specific Git credential

:endpoint{method="GET" path="/api/\{spaceId\}/git-credentials/\{id\}/usage/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/usage/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Git credential to get usage for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Git Credential Usage

- **`OtherProjects`** :span[integer]{.type-label}
- **`Projects`** :span[array of object]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectId`** :span[string]{.type-label}
  - **`RepositoryUrl`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.

:::api-example{label="Response"}
```json
{
  "OtherProjects": 0,
  "Projects": [
    {
      "Name": "string",
      "ProjectId": "string",
      "RepositoryUrl": "string",
      "Slug": "string"
    }
  ]
}
```
:::

## Get a specific Git credential

:endpoint{method="GET" path="/api/\{spaceId\}/git-credentials/\{id\}/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Git credential to get.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Git Credential

- **`GitCredential`** :span[object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Details`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "GitCredential": {
    "Description": "string",
    "Details": {
      "Type": "UsernamePassword"
    },
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "RepositoryRestrictions": {
      "AllowedRepositories": [
        "string"
      ],
      "Enabled": true
    },
    "SpaceId": "string"
  }
}
```
:::

## Modify an existing Git credential

:endpoint{method="PUT" path="/api/\{spaceId\}/git-credentials/\{id\}/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`Password`** :span[sensitive value]{.type-label} *(required)*
  - **`Username`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Id`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Details": {
    "Password": {
      "HasValue": true,
      "Hint": "string",
      "NewValue": "string"
    },
    "Username": "string"
  },
  "Id": "string",
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  },
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Confirmation that the Git Credential was modified

:::api-example{label="Response"}
```json
{}
```
:::

## Delete an existing Git credential

:endpoint{method="DELETE" path="/api/\{spaceId\}/git-credentials/\{id\}/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Git credential to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Git Credential has been deleted

:::api-example{label="Response"}
```json
{}
```
:::

## Get a specific Git credential

:endpoint{method="GET" path="/api/\{spaceId\}/git-credentials/\{id\}/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/v2`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Git credential to get.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Git Credential

- **`GitCredential`** :span[object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Details`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "GitCredential": {
    "Description": "string",
    "Details": {
      "Type": "UsernamePassword"
    },
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Name": "string",
    "RepositoryRestrictions": {
      "AllowedRepositories": [
        "string"
      ],
      "Enabled": true
    },
    "SpaceId": "string"
  }
}
```
:::

## Modify an existing Git credential

:endpoint{method="PUT" path="/api/\{spaceId\}/git-credentials/\{id\}/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/v2`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`Type`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Id`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`RepositoryRestrictions`** :span[object]{.type-label}
  - **`AllowedRepositories`** :span[array of string]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Details": {
    "Type": "string"
  },
  "Id": "string",
  "Name": "string",
  "RepositoryRestrictions": {
    "AllowedRepositories": [
      "string"
    ],
    "Enabled": true
  },
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Confirmation that the Git Credential was modified

:::api-example{label="Response"}
```json
{}
```
:::

## Get the git references that match the given rule pattern for a project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/git/refs"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/refs`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`patterns`** :span[array of string]{.type-label} *(required)*
- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.

**Response**

`200` — Response contain a set of Git references that match the rule pattern for the project

- **`References`** :span[array of object]{.type-label}
  - **`CanonicalName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
- **`TotalCount`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "References": [
    {
      "CanonicalName": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ],
  "TotalCount": 0
}
```
:::

## Get a list of Spaces

:endpoint{method="GET" path="/api/spaces"}

Lists all of the Spaces in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  Comma separated list of Ids.
- **`name`** :span[string]{.type-label}  
  The exact name of a Space to be matched.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Spaces

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`Icon`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDefault`** :span[boolean]{.type-label}
  - **`IsPrivate`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceManagersTeamMembers`** :span[array of string]{.type-label}
  - **`SpaceManagersTeams`** :span[array of string]{.type-label}
  - **`TaskQueueStopped`** :span[boolean]{.type-label}
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
      "Description": "string",
      "ExtensionSettings": [
        {}
      ],
      "Icon": {
        "Color": "string",
        "Id": "string"
      },
      "Id": "string",
      "IsDefault": true,
      "IsPrivate": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "Slug": "string",
      "SpaceManagersTeamMembers": [
        "string"
      ],
      "SpaceManagersTeams": [
        "string"
      ],
      "TaskQueueStopped": true
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

## Create a new Space

:endpoint{method="POST" path="/api/spaces"}

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`IsDefault`** :span[boolean]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 50.
- **`Slug`** :span[string]{.type-label}  
  Maximum length 50.
- **`SpaceManagersTeamMembers`** :span[array of string]{.type-label} *(required)*
- **`SpaceManagersTeams`** :span[array of string]{.type-label} *(required)*
- **`TaskQueueStopped`** :span[boolean]{.type-label}

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "IsDefault": true,
  "Name": "string",
  "Slug": "string",
  "SpaceManagersTeamMembers": [
    "string"
  ],
  "SpaceManagersTeams": [
    "string"
  ],
  "TaskQueueStopped": true
}
```
:::

**Response**

`201` — Created

- **`Description`** :span[string]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`IsPrivate`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceManagersTeamMembers`** :span[array of string]{.type-label}
- **`SpaceManagersTeams`** :span[array of string]{.type-label}
- **`TaskQueueStopped`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "Description": "string",
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IsDefault": true,
  "IsPrivate": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Slug": "string",
  "SpaceManagersTeamMembers": [
    "string"
  ],
  "SpaceManagersTeams": [
    "string"
  ],
  "TaskQueueStopped": true
}
```
:::

## Get a list of Spaces

:endpoint{method="GET" path="/api/spaces/all"}

Lists all Spaces. The results will be sorted alphabetically by name.

**Query Parameters**

- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a `contains` style match against the supplied name or name-fragment.

**Response**

`200` — The requested list of Spaces

- **`Description`** :span[string]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`IsPrivate`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceManagersTeamMembers`** :span[array of string]{.type-label}
- **`SpaceManagersTeams`** :span[array of string]{.type-label}
- **`TaskQueueStopped`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
[
  {
    "Description": "string",
    "ExtensionSettings": [
      {
        "ExtensionId": "string",
        "Values": "string"
      }
    ],
    "Icon": {
      "Color": "string",
      "Id": "string"
    },
    "Id": "string",
    "IsDefault": true,
    "IsPrivate": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "Slug": "string",
    "SpaceManagersTeamMembers": [
      "string"
    ],
    "SpaceManagersTeams": [
      "string"
    ],
    "TaskQueueStopped": true
  }
]
```
:::

## Create a new Space

:endpoint{method="POST" path="/api/spaces/v1"}

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`IsDefault`** :span[boolean]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 50.
- **`Slug`** :span[string]{.type-label}  
  Maximum length 50.
- **`SpaceManagersTeamMembers`** :span[array of string]{.type-label} *(required)*
- **`SpaceManagersTeams`** :span[array of string]{.type-label} *(required)*
- **`TaskQueueStopped`** :span[boolean]{.type-label}

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "IsDefault": true,
  "Name": "string",
  "Slug": "string",
  "SpaceManagersTeamMembers": [
    "string"
  ],
  "SpaceManagersTeams": [
    "string"
  ],
  "TaskQueueStopped": true
}
```
:::

**Response**

`201` — Created

- **`Space`** :span[object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`Icon`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDefault`** :span[boolean]{.type-label}
  - **`IsPrivate`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceManagersTeamMembers`** :span[array of string]{.type-label}
  - **`SpaceManagersTeams`** :span[array of string]{.type-label}
  - **`TaskQueueStopped`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "Space": {
    "Description": "string",
    "ExtensionSettings": [
      {
        "ExtensionId": "string",
        "Values": "string"
      }
    ],
    "Icon": {
      "Color": "string",
      "Id": "string"
    },
    "Id": "string",
    "IsDefault": true,
    "IsPrivate": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "Slug": "string",
    "SpaceManagersTeamMembers": [
      "string"
    ],
    "SpaceManagersTeams": [
      "string"
    ],
    "TaskQueueStopped": true
  }
}
```
:::

## Get a Space by ID

:endpoint{method="GET" path="/api/spaces/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Space to load.

**Response**

`200` — Returns a space

- **`Description`** :span[string]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`IsPrivate`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceManagersTeamMembers`** :span[array of string]{.type-label}
- **`SpaceManagersTeams`** :span[array of string]{.type-label}
- **`TaskQueueStopped`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "Description": "string",
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IsDefault": true,
  "IsPrivate": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Slug": "string",
  "SpaceManagersTeamMembers": [
    "string"
  ],
  "SpaceManagersTeams": [
    "string"
  ],
  "TaskQueueStopped": true
}
```
:::

## Update a Space

:endpoint{method="PUT" path="/api/spaces/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*
- **`IsDefault`** :span[boolean]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 50.
- **`Slug`** :span[string]{.type-label}  
  Maximum length 50.
- **`SpaceManagersTeamMembers`** :span[array of string]{.type-label} *(required)*
- **`SpaceManagersTeams`** :span[array of string]{.type-label} *(required)*
- **`TaskQueueStopped`** :span[boolean]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Id": "string",
  "IsDefault": true,
  "Name": "string",
  "Slug": "string",
  "SpaceManagersTeamMembers": [
    "string"
  ],
  "SpaceManagersTeams": [
    "string"
  ],
  "TaskQueueStopped": true
}
```
:::

**Response**

`200` — Confirmation that the Space was modified, contains the updated Space

- **`Description`** :span[string]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`IsPrivate`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceManagersTeamMembers`** :span[array of string]{.type-label}
- **`SpaceManagersTeams`** :span[array of string]{.type-label}
- **`TaskQueueStopped`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "Description": "string",
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IsDefault": true,
  "IsPrivate": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Slug": "string",
  "SpaceManagersTeamMembers": [
    "string"
  ],
  "SpaceManagersTeams": [
    "string"
  ],
  "TaskQueueStopped": true
}
```
:::

## Delete an existing Space

:endpoint{method="DELETE" path="/api/spaces/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Space to be deleted.

**Response**

`200` — Success

## Get the logo for the space with the given space ID

:endpoint{method="GET" path="/api/spaces/\{id\}/logo"}

Gets the logo associated with the space.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the space.

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## Modify the logo of the space with the given space ID

:endpoint{method="POST" path="/api/spaces/\{id\}/logo"}

Modifies the logo associated with the space.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the space.

**Response**

`200` — Success

## Modify the logo of the space with the given space ID

:endpoint{method="PUT" path="/api/spaces/\{id\}/logo"}

Modifies the logo associated with the space.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the space.

**Response**

`200` — Success

## Search in the supplied Octopus Deploy Space using the given keyword

:endpoint{method="GET" path="/api/\{spaceId\}/spaces/\{id\}/search"}

Also reachable at `/api/spaces/{id}/search`, `/api/spaces/{spaceIdentifier}/spaces/{id}/search`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Space to search.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`keyword`** :span[string]{.type-label} *(required)*  
  A keyword to search. Example: ABC.

**Response**

`200` — The requested Space Search Results

- **`Id`** :span[string]{.type-label}  
  Minimum length 1.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Owner`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Type`** :span[string]{.type-label}  
    Minimum length 1.
- **`Type`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
[
  {
    "Id": "string",
    "Name": "string",
    "Owner": {
      "Name": "string",
      "Type": "string"
    },
    "Type": "string"
  }
]
```
:::

## Delete an existing Space

:endpoint{method="DELETE" path="/api/spaces/\{id\}/v1"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Space to be deleted.

**Response**

`200` — Empty response indicating the Space was deleted

:::api-example{label="Response"}
```json
{}
```
:::

## Get a list of spaces available to the current authenticated user only

:endpoint{method="GET" path="/api/users/\{id\}/spaces"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the user whose spaces we are looking up.

**Response**

`200` — The requested list of Spaces available to the user

- **`Description`** :span[string]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`IsPrivate`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceManagersTeamMembers`** :span[array of string]{.type-label}
- **`SpaceManagersTeams`** :span[array of string]{.type-label}
- **`TaskQueueStopped`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
[
  {
    "Description": "string",
    "ExtensionSettings": [
      {
        "ExtensionId": "string",
        "Values": "string"
      }
    ],
    "Icon": {
      "Color": "string",
      "Id": "string"
    },
    "Id": "string",
    "IsDefault": true,
    "IsPrivate": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "Slug": "string",
    "SpaceManagersTeamMembers": [
      "string"
    ],
    "SpaceManagersTeams": [
      "string"
    ],
    "TaskQueueStopped": true
  }
]
```
:::
