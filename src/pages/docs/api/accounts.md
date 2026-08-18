---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Accounts
---

## Get a list of accounts

:endpoint{method="GET" path="/api/\{spaceId\}/accounts"}

Also reachable at `/api/accounts`, `/api/spaces/{spaceIdentifier}/accounts`.

Lists accounts in the supplied Octopus Deploy Space in pages. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`accountType`** :span[array of string]{.type-label}  
  The type of accounts to return.
- **`name`** :span[string]{.type-label}  
  The exact name of an Account to be matched.
- **`partialName`** :span[string]{.type-label}  
  A partial account name used for a sub-string search.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The list of Accounts

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`AccountType`** :span[enum]{.type-label}  
    Allowed values: `AmazonWebServicesAccount`, `AmazonWebServicesOidcAccount`, `AzureOidc`, `AzureServicePrincipal`, `AzureSubscription`, `GenericOidcAccount`, `GoogleCloudAccount`, `GoogleCloudOidcAccount`, `None`, `SshKeyPair`, `Token`, `UsernamePassword`.
  - **`Description`** :span[string]{.type-label}
  - **`EnvironmentIds`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TenantIds`** :span[array of string]{.type-label}
  - **`TenantTags`** :span[array of string]{.type-label}
  - **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
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
:::

## Create a new account - of the type defined by body content

:endpoint{method="POST" path="/api/\{spaceId\}/accounts"}

Also reachable at `/api/accounts`, `/api/spaces/{spaceIdentifier}/accounts`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`AccountType`** :span[string]{.type-label}
- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[string]{.type-label}

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`AccountType`** :span[enum]{.type-label}  
  Allowed values: `AmazonWebServicesAccount`, `AmazonWebServicesOidcAccount`, `AzureOidc`, `AzureServicePrincipal`, `AzureSubscription`, `GenericOidcAccount`, `GoogleCloudAccount`, `GoogleCloudOidcAccount`, `None`, `SshKeyPair`, `Token`, `UsernamePassword`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

:::api-example{label="Response"}
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
:::

## Get a list of Accounts

:endpoint{method="GET" path="/api/\{spaceId\}/accounts/all"}

Also reachable at `/api/accounts/all`, `/api/spaces/{spaceIdentifier}/accounts/all`.

Lists all of the accounts in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Accounts

- **`AccountType`** :span[enum]{.type-label}  
  Allowed values: `AmazonWebServicesAccount`, `AmazonWebServicesOidcAccount`, `AzureOidc`, `AzureServicePrincipal`, `AzureSubscription`, `GenericOidcAccount`, `GoogleCloudAccount`, `GoogleCloudOidcAccount`, `None`, `SshKeyPair`, `Token`, `UsernamePassword`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

:::api-example{label="Response"}
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
:::

## List the Azure Environments provided by the SDK

:endpoint{method="GET" path="/api/accounts/azureenvironments"}

List the Azure Environments provided by the SDK

**Response**

`200` — OK

## Modify the account identified by the accoutId

:endpoint{method="PUT" path="/api/\{spaceId\}/accounts/\{accountId\}"}

Also reachable at `/api/accounts/{accountId}`, `/api/spaces/{spaceIdentifier}/accounts/{accountId}`.

**Path Parameters**

- **`accountId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AccountId`** :span[string]{.type-label} *(required)*
- **`Description`** :span[string]{.type-label}
- **`Details`** :span[object]{.type-label} *(required)*
  - **`AccountType`** :span[string]{.type-label}
- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[string]{.type-label}

:::api-example{label="Request"}
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
:::

**Response**

`200` — The resource returned from modifying an account

- **`AccountType`** :span[enum]{.type-label}  
  Allowed values: `AmazonWebServicesAccount`, `AmazonWebServicesOidcAccount`, `AzureOidc`, `AzureServicePrincipal`, `AzureSubscription`, `GenericOidcAccount`, `GoogleCloudAccount`, `GoogleCloudOidcAccount`, `None`, `SshKeyPair`, `Token`, `UsernamePassword`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

:::api-example{label="Response"}
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
:::

## Get an Account by ID

:endpoint{method="GET" path="/api/\{spaceId\}/accounts/\{id\}"}

Also reachable at `/api/accounts/{id}`, `/api/spaces/{spaceIdentifier}/accounts/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the account.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Account

- **`AccountType`** :span[enum]{.type-label}  
  Allowed values: `AmazonWebServicesAccount`, `AmazonWebServicesOidcAccount`, `AzureOidc`, `AzureServicePrincipal`, `AzureSubscription`, `GenericOidcAccount`, `GoogleCloudAccount`, `GoogleCloudOidcAccount`, `None`, `SshKeyPair`, `Token`, `UsernamePassword`.
- **`Description`** :span[string]{.type-label}
- **`EnvironmentIds`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.

:::api-example{label="Response"}
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
:::

## Delete an existing Account

:endpoint{method="DELETE" path="/api/\{spaceId\}/accounts/\{id\}"}

Also reachable at `/api/accounts/{id}`, `/api/spaces/{spaceIdentifier}/accounts/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Account to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Retrieve the public key portion of the account's associated certificate, if present

:endpoint{method="GET" path="/api/\{spaceId\}/accounts/\{id\}/pk"}

Also reachable at `/api/accounts/{id}/pk`, `/api/spaces/{spaceIdentifier}/accounts/{id}/pk`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the account.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## List the Resource Groups associated with an Azure account

:endpoint{method="GET" path="/api/\{spaceId\}/accounts/\{id\}/resourceGroups"}

Also reachable at `/api/accounts/{id}/resourceGroups`, `/api/spaces/{spaceIdentifier}/accounts/{id}/resourceGroups`.

List the Resource Groups associated with an Azure account.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — OK

## List the storage accounts associated with an Azure account

:endpoint{method="GET" path="/api/\{spaceId\}/accounts/\{id\}/storageAccounts"}

Also reachable at `/api/accounts/{id}/storageAccounts`, `/api/spaces/{spaceIdentifier}/accounts/{id}/storageAccounts`.

List the storage accounts associated with an Azure account.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — OK

## List projects and deployments which are using an account

:endpoint{method="GET" path="/api/\{spaceId\}/accounts/\{id\}/usages"}

Also reachable at `/api/accounts/{id}/usages`, `/api/spaces/{spaceIdentifier}/accounts/{id}/usages`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the account.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The projects and deployments which are using an account.

- **`CommonTenantVariables`** :span[array of object]{.type-label}
  - **`LibraryVariableSets`** :span[array of object]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`DeploymentProcesses`** :span[array of object]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`ProjectSlug`** :span[string]{.type-label}
  - **`Steps`** :span[array of object]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSets`** :span[array of object]{.type-label}
  - **`LibraryVariableSetId`** :span[string]{.type-label}
  - **`LibraryVariableSetName`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectTenantVariables`** :span[array of object]{.type-label}
  - **`Projects`** :span[array of object]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`ProjectVariableSets`** :span[array of object]{.type-label}
  - **`IsCurrentlyBeingUsedInProject`** :span[boolean]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`ProjectSlug`** :span[string]{.type-label}
  - **`Releases`** :span[array of object]{.type-label}
  - **`RunbookSnapshots`** :span[array of object]{.type-label}
- **`Releases`** :span[array of object]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`Releases`** :span[array of object]{.type-label}
- **`RunbookProcesses`** :span[array of object]{.type-label}
  - **`ProcessId`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`ProjectSlug`** :span[string]{.type-label}
  - **`RunbookId`** :span[string]{.type-label}
  - **`RunbookName`** :span[string]{.type-label}
  - **`Steps`** :span[array of object]{.type-label}
- **`RunbookSnapshots`** :span[array of object]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`RunbookId`** :span[string]{.type-label}
  - **`RunbookName`** :span[string]{.type-label}
  - **`Snapshots`** :span[array of object]{.type-label}
- **`Targets`** :span[array of object]{.type-label}
  - **`TargetId`** :span[string]{.type-label}
  - **`TargetName`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Delete an existing Account

:endpoint{method="DELETE" path="/api/\{spaceId\}/accounts/\{id\}/v1"}

Also reachable at `/api/accounts/{id}/v1`, `/api/spaces/{spaceIdentifier}/accounts/{id}/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Account to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Account was deleted

:::api-example{label="Response"}
```json
{}
```
:::

## List the websites associated with an Azure account

:endpoint{method="GET" path="/api/\{spaceId\}/accounts/\{id\}/websites"}

Also reachable at `/api/accounts/{id}/websites`, `/api/spaces/{spaceIdentifier}/accounts/{id}/websites`.

List the websites associated with an Azure account.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — OK

## List the slots associated with an Azure Web Site

:endpoint{method="GET" path="/api/\{spaceId\}/accounts/\{id\}/\{resourceGroupName\}/websites/\{webSiteName\}/slots"}

Also reachable at `/api/accounts/{id}/{resourceGroupName}/websites/{webSiteName}/slots`, `/api/spaces/{spaceIdentifier}/accounts/{id}/{resourceGroupName}/websites/{webSiteName}/slots`.

List the slots associated with an Azure Web Site.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`resourceGroupName`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*
- **`webSiteName`** :span[string]{.type-label} *(required)*

**Response**

`200` — OK

## Get the account types this Octopus Server supports

:endpoint{method="GET" path="/api/accounttypes"}

Lists the account types contributed by the extensions installed on this Server, sorted by name.

**Response**

`200` — The account types this Octopus Server supports

- **`AccountTypes`** :span[array of string]{.type-label}  
  The supported account types, sorted by name. Each value is what an Account's AccountType is set to, and what the AccountType filter when listing accounts accepts.

:::api-example{label="Response"}
```json
{
  "AccountTypes": [
    "string"
  ]
}
```
:::
