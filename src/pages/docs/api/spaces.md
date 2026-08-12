---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Spaces
---

## Get a collection of Git credentials

`GET` `/api/{spaceId}/git-credentials`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`name`** <span class="type-label">string</span> — Filters credentials matching any part of the `name` fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Git Credentials

`GitCredentialResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Details`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`SpaceId`** <span class="type-label">string</span>
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
</div>

## Create a new Git credential

`POST` `/api/{spaceId}/git-credentials`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`CreateGitCredentialCommand`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`Password`** <span class="type-label">sensitive value</span> *(required)*
  - **`Username`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

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
</div>

**Response**

`201` — Created

`CreateGitCredentialResponse`.

- **`Id`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>

<div data-example="Response">

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
</div>

## Get a collection of Git credentials

`GET` `/api/{spaceId}/git-credentials/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/v1`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`name`** <span class="type-label">string</span> — Filters credentials matching any part of the `name` fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Git Credentials

`GetGitCredentialsResponse`.

- **`GitCredentials`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`ItemType`** <span class="type-label">string</span>
  - **`Items`** <span class="type-label">array of object</span>
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
</div>

## Create a new Git credential

`POST` `/api/{spaceId}/git-credentials/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/v1`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`CreateGitCredentialCommand`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`Password`** <span class="type-label">sensitive value</span> *(required)*
  - **`Username`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

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
</div>

**Response**

`201` — Created

`CreateGitCredentialResponse`.

- **`Id`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>

<div data-example="Response">

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
</div>

## Get a collection of Git credentials

`GET` `/api/{spaceId}/git-credentials/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/v2`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`name`** <span class="type-label">string</span> — Filters credentials matching any part of the `name` fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`GitCredentialResourceV2PaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Details`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`LastModifiedBy`** <span class="type-label">string</span>
  - **`LastModifiedOn`** <span class="type-label">string</span> — Format `date-time`.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`SpaceId`** <span class="type-label">string</span>
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`LastPageNumber`** <span class="type-label">integer</span>
- **`NumberOfPages`** <span class="type-label">integer</span>
- **`TotalResults`** <span class="type-label">integer</span>

<div data-example="Response">

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
</div>

## Create a new Git credential

`POST` `/api/{spaceId}/git-credentials/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/v2`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`CreateGitCredentialCommandV2`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`Type`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

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
</div>

**Response**

`201` — Created

`CreateGitCredentialResponseV2`.

- **`Id`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Gets a specific Git credential

`GET` `/api/{spaceId}/git-credentials/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Git credential to get.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Git Credential

`GitCredentialResource`.

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `UsernamePassword`, `Anonymous`, `Library`, `GitHub`, `NotSpecified`, `SshKey`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Modify an existing Git credential

`PUT` `/api/{spaceId}/git-credentials/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyGitCredentialCommand`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`Password`** <span class="type-label">sensitive value</span> *(required)*
  - **`Username`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Id`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

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
</div>

**Response**

`200` — Confirmation that the Git Credential was modified

`ModifyGitCredentialResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Delete an existing Git credential

`DELETE` `/api/{spaceId}/git-credentials/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Git credential to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Git Credential has been deleted

`DeleteGitCredentialResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Gets usage of a specific Git credential

`GET` `/api/{spaceId}/git-credentials/{id}/usage`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/usage`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Git credential to get usage for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Git Credential Usage

`GetGitCredentialUsageByIdResponse`.

- **`OtherProjects`** <span class="type-label">integer</span>
- **`Projects`** <span class="type-label">array of object</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectId`** <span class="type-label">string</span>
  - **`RepositoryUrl`** <span class="type-label">string</span>
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## Gets usage of a specific Git credential

`GET` `/api/{spaceId}/git-credentials/{id}/usage/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/usage/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Git credential to get usage for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Git Credential Usage

`GetGitCredentialUsageByIdResponse`.

- **`OtherProjects`** <span class="type-label">integer</span>
- **`Projects`** <span class="type-label">array of object</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectId`** <span class="type-label">string</span>
  - **`RepositoryUrl`** <span class="type-label">string</span>
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## Gets a specific Git credential

`GET` `/api/{spaceId}/git-credentials/{id}/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Git credential to get.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Git Credential

`GetGitCredentialByIdResponse`.

- **`GitCredential`** <span class="type-label">object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Details`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Modify an existing Git credential

`PUT` `/api/{spaceId}/git-credentials/{id}/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyGitCredentialCommand`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`Password`** <span class="type-label">sensitive value</span> *(required)*
  - **`Username`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Id`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

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
</div>

**Response**

`200` — Confirmation that the Git Credential was modified

`ModifyGitCredentialResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Delete an existing Git credential

`DELETE` `/api/{spaceId}/git-credentials/{id}/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Git credential to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Git Credential has been deleted

`DeleteGitCredentialResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Gets a specific Git credential

`GET` `/api/{spaceId}/git-credentials/{id}/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/v2`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Git credential to get.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Git Credential

`GetGitCredentialByIdResponseV2`.

- **`GitCredential`** <span class="type-label">object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Details`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`LastModifiedBy`** <span class="type-label">string</span>
  - **`LastModifiedOn`** <span class="type-label">string</span> — Format `date-time`.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Modify an existing Git credential

`PUT` `/api/{spaceId}/git-credentials/{id}/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/git-credentials/{id}/v2`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyGitCredentialCommandV2`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`Type`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Id`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`RepositoryRestrictions`** <span class="type-label">object</span>
  - **`AllowedRepositories`** <span class="type-label">array of string</span>
  - **`Enabled`** <span class="type-label">boolean</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

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
</div>

**Response**

`200` — Confirmation that the Git Credential was modified

`ModifyGitCredentialResponseV2`.

<div data-example="Response">

```json
{}
```
</div>

## Gets the git references that match the given rule pattern for a project

`GET` `/api/{spaceId}/projects/{projectId}/git/refs`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/refs`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`patterns`** <span class="type-label">array of string</span> *(required)*
- **`skip`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Defaults to zero. Minimum `0`.

**Response**

`200` — Response contain a set of Git references that match the rule pattern for the project

`GetMatchingRefsResponseV1`.

- **`References`** <span class="type-label">array of object</span>
  - **`CanonicalName`** <span class="type-label">string</span> — Minimum length 1.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`TotalCount`** <span class="type-label">integer</span>

<div data-example="Response">

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
</div>

## Get a list of Spaces

`GET` `/api/spaces`

Lists all of the Spaces in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Parameters**

- **`ids`** <span class="type-label">array of string</span> — Comma separated list of Ids.
- **`name`** <span class="type-label">string</span> — The exact name of a Space to be matched.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Spaces

`SpaceResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`Icon`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDefault`** <span class="type-label">boolean</span>
  - **`IsPrivate`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceManagersTeamMembers`** <span class="type-label">array of string</span>
  - **`SpaceManagersTeams`** <span class="type-label">array of string</span>
  - **`TaskQueueStopped`** <span class="type-label">boolean</span>
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
</div>

## Creates a new Space

`POST` `/api/spaces`

**Request Body**

`CreateSpaceCommandV1`

- **`Description`** <span class="type-label">string</span>
- **`IsDefault`** <span class="type-label">boolean</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1. Maximum length 50.
- **`Slug`** <span class="type-label">string</span> — Maximum length 50.
- **`SpaceManagersTeamMembers`** <span class="type-label">array of string</span> *(required)*
- **`SpaceManagersTeams`** <span class="type-label">array of string</span> *(required)*
- **`TaskQueueStopped`** <span class="type-label">boolean</span>

<div data-example="Request">

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
</div>

**Response**

`201` — Created

`SpaceResource`.

- **`Description`** <span class="type-label">string</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`IsPrivate`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceManagersTeamMembers`** <span class="type-label">array of string</span>
- **`SpaceManagersTeams`** <span class="type-label">array of string</span>
- **`TaskQueueStopped`** <span class="type-label">boolean</span>

<div data-example="Response">

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
</div>

## Get a list of Spaces

`GET` `/api/spaces/all`

Lists all Spaces. The results will be sorted alphabetically by name.

**Parameters**

- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a `contains` style match against the supplied name or name-fragment.

**Response**

`200` — The requested list of Spaces

an array of `SpaceResource`.

- **`Description`** <span class="type-label">string</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`IsPrivate`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceManagersTeamMembers`** <span class="type-label">array of string</span>
- **`SpaceManagersTeams`** <span class="type-label">array of string</span>
- **`TaskQueueStopped`** <span class="type-label">boolean</span>

<div data-example="Response">

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
</div>

## Creates a new Space

`POST` `/api/spaces/v1`

**Request Body**

`CreateSpaceCommandV1`

- **`Description`** <span class="type-label">string</span>
- **`IsDefault`** <span class="type-label">boolean</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1. Maximum length 50.
- **`Slug`** <span class="type-label">string</span> — Maximum length 50.
- **`SpaceManagersTeamMembers`** <span class="type-label">array of string</span> *(required)*
- **`SpaceManagersTeams`** <span class="type-label">array of string</span> *(required)*
- **`TaskQueueStopped`** <span class="type-label">boolean</span>

<div data-example="Request">

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
</div>

**Response**

`201` — Created

`CreateSpaceResponseV1`.

- **`Space`** <span class="type-label">object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`Icon`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDefault`** <span class="type-label">boolean</span>
  - **`IsPrivate`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceManagersTeamMembers`** <span class="type-label">array of string</span>
  - **`SpaceManagersTeams`** <span class="type-label">array of string</span>
  - **`TaskQueueStopped`** <span class="type-label">boolean</span>

<div data-example="Response">

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
</div>

## Get a Space by ID

`GET` `/api/spaces/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Space to load.

**Response**

`200` — Returns a space

`SpaceResource`.

- **`Description`** <span class="type-label">string</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`IsPrivate`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceManagersTeamMembers`** <span class="type-label">array of string</span>
- **`SpaceManagersTeams`** <span class="type-label">array of string</span>
- **`TaskQueueStopped`** <span class="type-label">boolean</span>

<div data-example="Response">

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
</div>

## Updates a Space

`PUT` `/api/spaces/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifySpaceCommandV1`

- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> *(required)*
- **`IsDefault`** <span class="type-label">boolean</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1. Maximum length 50.
- **`Slug`** <span class="type-label">string</span> — Maximum length 50.
- **`SpaceManagersTeamMembers`** <span class="type-label">array of string</span> *(required)*
- **`SpaceManagersTeams`** <span class="type-label">array of string</span> *(required)*
- **`TaskQueueStopped`** <span class="type-label">boolean</span> *(required)*

<div data-example="Request">

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
</div>

**Response**

`200` — Confirmation that the Space was modified, contains the updated Space

`SpaceResource`.

- **`Description`** <span class="type-label">string</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`IsPrivate`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceManagersTeamMembers`** <span class="type-label">array of string</span>
- **`SpaceManagersTeams`** <span class="type-label">array of string</span>
- **`TaskQueueStopped`** <span class="type-label">boolean</span>

<div data-example="Response">

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
</div>

## Deletes an existing Space

`DELETE` `/api/spaces/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Space to be deleted.

**Response**

`200` — Success

## Gets the logo for the space with the given space ID

`GET` `/api/spaces/{id}/logo`

Gets the logo associated with the space.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the space.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Modifies the logo of the space with the given space ID

`POST` `/api/spaces/{id}/logo`

Modifies the logo associated with the space.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the space.

**Response**

`200` — Success

## Modifies the logo of the space with the given space ID

`PUT` `/api/spaces/{id}/logo`

Modifies the logo associated with the space.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the space.

**Response**

`200` — Success

## Searches in the supplied Octopus Deploy Space using the given keyword

`GET` `/api/{spaceId}/spaces/{id}/search`

Also reachable at `/api/spaces/{id}/search`, `/api/spaces/{spaceIdentifier}/spaces/{id}/search`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Space to search.
- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`keyword`** <span class="type-label">string</span> *(required)* — A keyword to search. Example: ABC.

**Response**

`200` — The requested Space Search Results

an array of `SpaceSearchResult`.

- **`Id`** <span class="type-label">string</span> — Minimum length 1.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Owner`** <span class="type-label">object</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`Type`** <span class="type-label">string</span> — Minimum length 1.
- **`Type`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## Deletes an existing Space

`DELETE` `/api/spaces/{id}/v1`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Space to be deleted.

**Response**

`200` — Empty response indicating the Space was deleted

`DeleteSpaceResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Gets a list of spaces available to the current authenticated user only

`GET` `/api/users/{id}/spaces`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the user whose spaces we are looking up.

**Response**

`200` — The requested list of Spaces available to the user

an array of `SpaceResource`.

- **`Description`** <span class="type-label">string</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`IsPrivate`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceManagersTeamMembers`** <span class="type-label">array of string</span>
- **`SpaceManagersTeams`** <span class="type-label">array of string</span>
- **`TaskQueueStopped`** <span class="type-label">boolean</span>

<div data-example="Response">

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
</div>
