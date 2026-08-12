---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Accounts
---

## Get a list of accounts

`GET` `/api/{spaceId}/accounts`

Also reachable at `/api/accounts`, `/api/spaces/{spaceIdentifier}/accounts`.

Lists accounts in the supplied Octopus Deploy Space in pages. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`accountType`** <span class="type-label">array of string</span> — The type of accounts to return.
- **`name`** <span class="type-label">string</span> — The exact name of an Account to be matched.
- **`partialName`** <span class="type-label">string</span> — A partial account name used for a sub-string search.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The list of Accounts

`AccountResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`AccountType`** <span class="type-label">enum</span> — Allowed values: `AmazonWebServicesAccount`, `AmazonWebServicesOidcAccount`, `AzureOidc`, `AzureServicePrincipal`, `AzureSubscription`, `GenericOidcAccount`, `GoogleCloudAccount`, `GoogleCloudOidcAccount`, `None`, `SshKeyPair`, `Token`, `UsernamePassword`.
  - **`Description`** <span class="type-label">string</span>
  - **`EnvironmentIds`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TenantIds`** <span class="type-label">array of string</span>
  - **`TenantTags`** <span class="type-label">array of string</span>
  - **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
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
      "AccountType": "AmazonWebServicesAccount",
      "Description": "string",
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
      "Name": "string",
      "Slug": "string",
      "SpaceId": "string",
      "TenantIds": [
        "string"
      ],
      "TenantTags": [
        "string"
      ],
      "TenantedDeploymentParticipation": "Untenanted"
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

## Creates a new account - of the type defined by body content

`POST` `/api/{spaceId}/accounts`

Also reachable at `/api/accounts`, `/api/spaces/{spaceIdentifier}/accounts`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateAccountCommand`

- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`AccountType`** <span class="type-label">string</span>
- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "Description": "string",
  "Details": {
    "AccountType": "string"
  },
  "EnvironmentIds": [
    "string"
  ],
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "string"
}
```
</div>

**Response**

`201` — Created

`AccountResource`.

- **`AccountType`** <span class="type-label">enum</span> — Allowed values: `AmazonWebServicesAccount`, `AmazonWebServicesOidcAccount`, `AzureOidc`, `AzureServicePrincipal`, `AzureSubscription`, `GenericOidcAccount`, `GoogleCloudAccount`, `GoogleCloudOidcAccount`, `None`, `SshKeyPair`, `Token`, `UsernamePassword`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

<div data-example="Response">

```json
{
  "AccountType": "AmazonWebServicesAccount",
  "Description": "string",
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
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted"
}
```
</div>

## Get a list of Accounts

`GET` `/api/{spaceId}/accounts/all`

Also reachable at `/api/accounts/all`, `/api/spaces/{spaceIdentifier}/accounts/all`.

Lists all of the accounts in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Accounts

an array of `AccountResource`.

- **`AccountType`** <span class="type-label">enum</span> — Allowed values: `AmazonWebServicesAccount`, `AmazonWebServicesOidcAccount`, `AzureOidc`, `AzureServicePrincipal`, `AzureSubscription`, `GenericOidcAccount`, `GoogleCloudAccount`, `GoogleCloudOidcAccount`, `None`, `SshKeyPair`, `Token`, `UsernamePassword`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

<div data-example="Response">

```json
[
  {
    "AccountType": "AmazonWebServicesAccount",
    "Description": "string",
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
    "Name": "string",
    "Slug": "string",
    "SpaceId": "string",
    "TenantIds": [
      "string"
    ],
    "TenantTags": [
      "string"
    ],
    "TenantedDeploymentParticipation": "Untenanted"
  }
]
```
</div>

## Lists the Azure Environments provided by the SDK

`GET` `/api/accounts/azureenvironments`

Lists the Azure Environments provided by the SDK

**Response**

`200` — OK

## Modifies the account identified by the accoutId

`PUT` `/api/{spaceId}/accounts/{accountId}`

Also reachable at `/api/accounts/{accountId}`, `/api/spaces/{spaceIdentifier}/accounts/{accountId}`.

**Parameters**

- **`accountId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyAccountCommand`

- **`AccountId`** <span class="type-label">string</span> *(required)*
- **`Description`** <span class="type-label">string</span>
- **`Details`** <span class="type-label">object</span> *(required)*
  - **`AccountType`** <span class="type-label">string</span>
- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "AccountId": "string",
  "Description": "string",
  "Details": {
    "AccountType": "string"
  },
  "EnvironmentIds": [
    "string"
  ],
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "string"
}
```
</div>

**Response**

`200` — The resource returned from modifying an account

`AccountResource`.

- **`AccountType`** <span class="type-label">enum</span> — Allowed values: `AmazonWebServicesAccount`, `AmazonWebServicesOidcAccount`, `AzureOidc`, `AzureServicePrincipal`, `AzureSubscription`, `GenericOidcAccount`, `GoogleCloudAccount`, `GoogleCloudOidcAccount`, `None`, `SshKeyPair`, `Token`, `UsernamePassword`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

<div data-example="Response">

```json
{
  "AccountType": "AmazonWebServicesAccount",
  "Description": "string",
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
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted"
}
```
</div>

## Get an Account by ID

`GET` `/api/{spaceId}/accounts/{id}`

Also reachable at `/api/accounts/{id}`, `/api/spaces/{spaceIdentifier}/accounts/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the account.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Account

`AccountResource`.

- **`AccountType`** <span class="type-label">enum</span> — Allowed values: `AmazonWebServicesAccount`, `AmazonWebServicesOidcAccount`, `AzureOidc`, `AzureServicePrincipal`, `AzureSubscription`, `GenericOidcAccount`, `GoogleCloudAccount`, `GoogleCloudOidcAccount`, `None`, `SshKeyPair`, `Token`, `UsernamePassword`.
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentIds`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

<div data-example="Response">

```json
{
  "AccountType": "AmazonWebServicesAccount",
  "Description": "string",
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
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "TenantedDeploymentParticipation": "Untenanted"
}
```
</div>

## Deletes an existing Account

`DELETE` `/api/{spaceId}/accounts/{id}`

Also reachable at `/api/accounts/{id}`, `/api/spaces/{spaceIdentifier}/accounts/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Account to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Retrieves the public key portion of the account's associated certificate, if present

`GET` `/api/{spaceId}/accounts/{id}/pk`

Also reachable at `/api/accounts/{id}/pk`, `/api/spaces/{spaceIdentifier}/accounts/{id}/pk`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the account.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Lists the Resource Groups associated with an Azure account

`GET` `/api/{spaceId}/accounts/{id}/resourceGroups`

Also reachable at `/api/accounts/{id}/resourceGroups`, `/api/spaces/{spaceIdentifier}/accounts/{id}/resourceGroups`.

Lists the Resource Groups associated with an Azure account.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — OK

## Lists the storage accounts associated with an Azure account

`GET` `/api/{spaceId}/accounts/{id}/storageAccounts`

Also reachable at `/api/accounts/{id}/storageAccounts`, `/api/spaces/{spaceIdentifier}/accounts/{id}/storageAccounts`.

Lists the storage accounts associated with an Azure account.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — OK

## Lists projects and deployments which are using an account

`GET` `/api/{spaceId}/accounts/{id}/usages`

Also reachable at `/api/accounts/{id}/usages`, `/api/spaces/{spaceIdentifier}/accounts/{id}/usages`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the account.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The projects and deployments which are using an account.

`AccountUsageResource`.

- **`CommonTenantVariables`** <span class="type-label">array of object</span>
  - **`LibraryVariableSets`** <span class="type-label">array of object</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`DeploymentProcesses`** <span class="type-label">array of object</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`ProjectSlug`** <span class="type-label">string</span>
  - **`Steps`** <span class="type-label">array of object</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSets`** <span class="type-label">array of object</span>
  - **`LibraryVariableSetId`** <span class="type-label">string</span>
  - **`LibraryVariableSetName`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectTenantVariables`** <span class="type-label">array of object</span>
  - **`Projects`** <span class="type-label">array of object</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`ProjectVariableSets`** <span class="type-label">array of object</span>
  - **`IsCurrentlyBeingUsedInProject`** <span class="type-label">boolean</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`ProjectSlug`** <span class="type-label">string</span>
  - **`Releases`** <span class="type-label">array of object</span>
  - **`RunbookSnapshots`** <span class="type-label">array of object</span>
- **`Releases`** <span class="type-label">array of object</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`Releases`** <span class="type-label">array of object</span>
- **`RunbookProcesses`** <span class="type-label">array of object</span>
  - **`ProcessId`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`ProjectSlug`** <span class="type-label">string</span>
  - **`RunbookId`** <span class="type-label">string</span>
  - **`RunbookName`** <span class="type-label">string</span>
  - **`Steps`** <span class="type-label">array of object</span>
- **`RunbookSnapshots`** <span class="type-label">array of object</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`RunbookId`** <span class="type-label">string</span>
  - **`RunbookName`** <span class="type-label">string</span>
  - **`Snapshots`** <span class="type-label">array of object</span>
- **`Targets`** <span class="type-label">array of object</span>
  - **`TargetId`** <span class="type-label">string</span>
  - **`TargetName`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CommonTenantVariables": [
    {
      "LibraryVariableSets": [
        {}
      ],
      "TenantId": "string"
    }
  ],
  "DeploymentProcesses": [
    {
      "ProjectId": "string",
      "ProjectName": "string",
      "ProjectSlug": "string",
      "Steps": [
        {}
      ]
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariableSets": [
    {
      "LibraryVariableSetId": "string",
      "LibraryVariableSetName": "string"
    }
  ],
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectTenantVariables": [
    {
      "Projects": [
        {}
      ],
      "TenantId": "string"
    }
  ],
  "ProjectVariableSets": [
    {
      "IsCurrentlyBeingUsedInProject": true,
      "ProjectId": "string",
      "ProjectName": "string",
      "ProjectSlug": "string",
      "Releases": [
        {}
      ],
      "RunbookSnapshots": [
        {}
      ]
    }
  ],
  "Releases": [
    {
      "ProjectId": "string",
      "ProjectName": "string",
      "Releases": [
        {}
      ]
    }
  ],
  "RunbookProcesses": [
    {
      "ProcessId": "string",
      "ProjectId": "string",
      "ProjectName": "string",
      "ProjectSlug": "string",
      "RunbookId": "string",
      "RunbookName": "string",
      "Steps": [
        {}
      ]
    }
  ],
  "RunbookSnapshots": [
    {
      "ProjectId": "string",
      "ProjectName": "string",
      "RunbookId": "string",
      "RunbookName": "string",
      "Snapshots": [
        {}
      ]
    }
  ],
  "Targets": [
    {
      "TargetId": "string",
      "TargetName": "string"
    }
  ]
}
```
</div>

## Deletes an existing Account

`DELETE` `/api/{spaceId}/accounts/{id}/v1`

Also reachable at `/api/accounts/{id}/v1`, `/api/spaces/{spaceIdentifier}/accounts/{id}/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Account to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Account was deleted

`DeleteAccountResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Lists the websites associated with an Azure account

`GET` `/api/{spaceId}/accounts/{id}/websites`

Also reachable at `/api/accounts/{id}/websites`, `/api/spaces/{spaceIdentifier}/accounts/{id}/websites`.

Lists the websites associated with an Azure account.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — OK

## Lists the slots associated with an Azure Web Site

`GET` `/api/{spaceId}/accounts/{id}/{resourceGroupName}/websites/{webSiteName}/slots`

Also reachable at `/api/accounts/{id}/{resourceGroupName}/websites/{webSiteName}/slots`, `/api/spaces/{spaceIdentifier}/accounts/{id}/{resourceGroupName}/websites/{webSiteName}/slots`.

Lists the slots associated with an Azure Web Site.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`resourceGroupName`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`webSiteName`** <span class="type-label">string</span> *(required)*

**Response**

`200` — OK

## Get the account types this Octopus Server supports

`GET` `/api/accounttypes`

Lists the account types contributed by the extensions installed on this Server, sorted by name.

**Response**

`200` — The account types this Octopus Server supports

`GetAccountTypesResponse`.

- **`AccountTypes`** <span class="type-label">array of string</span> — The supported account types, sorted by name. Each value is what an Account's AccountType is set to, and what the AccountType filter when listing accounts accepts.

<div data-example="Response">

```json
{
  "AccountTypes": [
    "string"
  ]
}
```
</div>
