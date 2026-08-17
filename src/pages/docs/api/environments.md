---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Environments
---

## Get a list of Environments

:span[GET]{.api-get} `/api/{spaceId}/environments`

Also reachable at `/api/environments`, `/api/spaces/{spaceIdentifier}/environments`.

Lists all of the environments in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each environment.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  Environment Ids to filter results to only Environments with the given Ids.
- **`name`** :span[string]{.type-label}  
  Filters the returned environments by the specified `name` fragment. Left for backwards compatibility; prefer PartialName.
- **`partialName`** :span[string]{.type-label}  
  Filters the documents using the specified `partialName` fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 10. Minimum `0`.

**Response**

`200` — The requested list of Environments

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`AllowDynamicInfrastructure`** :span[boolean]{.type-label}  
    If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** :span[array of string]{.type-label}  
    List of tags assigned to this environment.
  - **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
  - **`Slug`** :span[string]{.type-label}
  - **`SortOrder`** :span[integer]{.type-label}  
    Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
  - **`SpaceId`** :span[string]{.type-label}
  - **`UseGuidedFailure`** :span[boolean]{.type-label}  
    If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.
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

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "AllowDynamicInfrastructure": true,
      "Description": "string",
      "EnvironmentTags": [
        "string"
      ],
      "ExtensionSettings": [
        {}
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
      "SortOrder": 0,
      "SpaceId": "string",
      "UseGuidedFailure": true
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

## Create a new environment

:span[POST]{.api-post} `/api/{spaceId}/environments`

Also reachable at `/api/environments`, `/api/spaces/{spaceIdentifier}/environments`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AllowDynamicInfrastructure`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EnvironmentTags`** :span[array of string]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 50.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`UseGuidedFailure`** :span[boolean]{.type-label}

<div data-example="Request">

```json
{
  "AllowDynamicInfrastructure": true,
  "Description": "string",
  "EnvironmentTags": [
    "string"
  ],
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "string",
  "UseGuidedFailure": true
}
```
</div>

**Response**

`201` — Created

- **`AllowDynamicInfrastructure`** :span[boolean]{.type-label}  
  If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** :span[array of string]{.type-label}  
  List of tags assigned to this environment.
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label}
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Response">

```json
{
  "AllowDynamicInfrastructure": true,
  "Description": "string",
  "EnvironmentTags": [
    "string"
  ],
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
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
  "SortOrder": 0,
  "SpaceId": "string",
  "UseGuidedFailure": true
}
```
</div>

## Get a list of Environments

:span[GET]{.api-get} `/api/{spaceId}/environments/all`

Also reachable at `/api/environments/all`, `/api/spaces/{spaceIdentifier}/environments/all`.

Lists the name and ID of all of the environments in the supplied Space. The results will be sorted by the `SortOrder` field on each environment.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`channelId`** :span[string]{.type-label}  
  A Channel Id used to filter a query.
- **`ids`** :span[array of string]{.type-label}  
  A comma separated list of Deployment Environment resource ids used to filter a query.
- **`projectId`** :span[string]{.type-label}  
  A project Id used to filter a query.

**Response**

`200` — Requested list of Environments

- **`AllowDynamicInfrastructure`** :span[boolean]{.type-label}  
  If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** :span[array of string]{.type-label}  
  List of tags assigned to this environment.
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label}
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Response">

```json
[
  {
    "AllowDynamicInfrastructure": true,
    "Description": "string",
    "EnvironmentTags": [
      "string"
    ],
    "ExtensionSettings": [
      {
        "ExtensionId": "string",
        "Values": "string"
      }
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
    "SortOrder": 0,
    "SpaceId": "string",
    "UseGuidedFailure": true
  }
]
```
</div>

## Get a list of Environments

:span[GET]{.api-get} `/api/{spaceId}/environments/all/v1`

Also reachable at `/api/environments/all/v1`, `/api/spaces/{spaceIdentifier}/environments/all/v1`.

Lists the name and ID of all of the environments in the supplied Space. The results will be sorted by the `SortOrder` field on each environment.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`channelId`** :span[string]{.type-label}  
  A Channel Id used to filter a query.
- **`ids`** :span[array of string]{.type-label}  
  A comma separated list of Deployment Environment resource ids used to filter a query.
- **`projectId`** :span[string]{.type-label}  
  A project Id used to filter a query.

**Response**

`200` — Requested list of Environments

- **`Environments`** :span[array of object]{.type-label}
  - **`AllowDynamicInfrastructure`** :span[boolean]{.type-label}  
    If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** :span[array of string]{.type-label}  
    List of tags assigned to this environment.
  - **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
  - **`Slug`** :span[string]{.type-label}
  - **`SortOrder`** :span[integer]{.type-label}  
    Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
  - **`SpaceId`** :span[string]{.type-label}
  - **`UseGuidedFailure`** :span[boolean]{.type-label}  
    If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Response">

```json
{
  "Environments": [
    {
      "AllowDynamicInfrastructure": true,
      "Description": "string",
      "EnvironmentTags": [
        "string"
      ],
      "ExtensionSettings": [
        {}
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
      "SortOrder": 0,
      "SpaceId": "string",
      "UseGuidedFailure": true
    }
  ]
}
```
</div>

## PUT /api/{spaceId}/environments/sortorder

:span[PUT]{.api-put} `/api/{spaceId}/environments/sortorder`

Also reachable at `/api/environments/sortorder`, `/api/spaces/{spaceIdentifier}/environments/sortorder`.

Takes an array of environment IDs as the request body, uses the order of items in the array to sort the environments on the server. The ID of every environment must be specified.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

A `array of string` payload.

<div data-example="Request">

```json
[
  "string"
]
```
</div>

**Response**

`200` — Success

## List all environments, including a summary of machine information

:span[GET]{.api-get} `/api/{spaceId}/environments/summary`

Also reachable at `/api/environments/summary`, `/api/spaces/{spaceIdentifier}/environments/summary`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`commStyles`** :span[array of string]{.type-label}
- **`deploymentTargetTypes`** :span[array of string]{.type-label}
- **`environmentTags`** :span[array of string]{.type-label}
- **`healthStatuses`** :span[array of string]{.type-label}
- **`hideEmptyEnvironments`** :span[boolean]{.type-label}
- **`ids`** :span[array of string]{.type-label}
- **`isDisabled`** :span[boolean]{.type-label}
- **`machinePartialName`** :span[string]{.type-label}
- **`partialName`** :span[string]{.type-label}
- **`roles`** :span[array of string]{.type-label}
- **`shellNames`** :span[array of string]{.type-label}
- **`targetTags`** :span[array of string]{.type-label}
- **`tenantIds`** :span[array of string]{.type-label}
- **`tenantTags`** :span[array of string]{.type-label}

**Response**

`200` — Contains the machines et al associated with a given environment.

- **`DeploymentTargetSummaries`** :span[object]{.type-label}
- **`EnvironmentSummaries`** :span[array of object]{.type-label}
  - **`DeploymentTargetSummaries`** :span[object]{.type-label}
  - **`Environment`** :span[object]{.type-label}
  - **`MachineEndpointSummaries`** :span[object]{.type-label}
  - **`MachineHealthStatusSummaries`** :span[object]{.type-label}
  - **`MachineIdsForCalamariUpgrade`** :span[array of string]{.type-label}
  - **`MachineIdsForTentacleUpgrade`** :span[array of string]{.type-label}
  - **`MachineTenantSummaries`** :span[object]{.type-label}
  - **`MachineTenantTagSummaries`** :span[object]{.type-label}
  - **`TentacleUpgradesRequired`** :span[boolean]{.type-label}
  - **`TotalDisabledMachines`** :span[integer]{.type-label}
  - **`TotalMachines`** :span[integer]{.type-label}
- **`MachineEndpointSummaries`** :span[object]{.type-label}
- **`MachineHealthStatusSummaries`** :span[object]{.type-label}
- **`MachineIdsForCalamariUpgrade`** :span[array of string]{.type-label}
- **`MachineIdsForTentacleUpgrade`** :span[array of string]{.type-label}
- **`MachineTenantSummaries`** :span[object]{.type-label}
- **`MachineTenantTagSummaries`** :span[object]{.type-label}
- **`TentacleUpgradesRequired`** :span[boolean]{.type-label}
- **`TotalDisabledMachines`** :span[integer]{.type-label}
- **`TotalMachines`** :span[integer]{.type-label}

<div data-example="Response">

```json
{
  "DeploymentTargetSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "EnvironmentSummaries": [
    {
      "DeploymentTargetSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "Environment": {
        "AllowDynamicInfrastructure": true,
        "Description": "string",
        "EnvironmentTags": [
          "string"
        ],
        "ExtensionSettings": [
          {}
        ],
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "Name": "string",
        "Slug": "string",
        "SortOrder": 0,
        "SpaceId": "string",
        "UseGuidedFailure": true
      },
      "MachineEndpointSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "MachineHealthStatusSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "MachineIdsForCalamariUpgrade": [
        "string"
      ],
      "MachineIdsForTentacleUpgrade": [
        "string"
      ],
      "MachineTenantSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "MachineTenantTagSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "TentacleUpgradesRequired": true,
      "TotalDisabledMachines": 0,
      "TotalMachines": 0
    }
  ],
  "MachineEndpointSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "MachineHealthStatusSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "MachineIdsForCalamariUpgrade": [
    "string"
  ],
  "MachineIdsForTentacleUpgrade": [
    "string"
  ],
  "MachineTenantSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "MachineTenantTagSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "TentacleUpgradesRequired": true,
  "TotalDisabledMachines": 0,
  "TotalMachines": 0
}
```
</div>

## List all environments, including a summary of machine information

:span[GET]{.api-get} `/api/{spaceId}/environments/summary/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/environments/summary/v2`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`commStyles`** :span[array of string]{.type-label}
- **`deploymentTargetTypes`** :span[array of string]{.type-label}
- **`environmentTags`** :span[array of string]{.type-label}
- **`healthStatuses`** :span[array of string]{.type-label}
- **`hideEmptyEnvironments`** :span[boolean]{.type-label}
- **`ids`** :span[array of string]{.type-label}
- **`isDisabled`** :span[boolean]{.type-label}
- **`machinePartialName`** :span[string]{.type-label}
- **`partialName`** :span[string]{.type-label}
- **`roles`** :span[array of string]{.type-label}
- **`shellNames`** :span[array of string]{.type-label}
- **`targetTags`** :span[array of string]{.type-label}
- **`tenantIds`** :span[array of string]{.type-label}
- **`tenantTags`** :span[array of string]{.type-label}
- **`type`** :span[array of string]{.type-label}  
  Filters the environment summaries using the specified environment EnvironmentType.

**Response**

`200` — Contains the machines et al associated with a given environment.

- **`DeploymentTargetSummaries`** :span[object]{.type-label}
- **`EnvironmentSummaries`** :span[array of object]{.type-label}
  - **`DeploymentTargetSummaries`** :span[object]{.type-label}
  - **`Environment`** :span[object]{.type-label}
  - **`MachineEndpointSummaries`** :span[object]{.type-label}
  - **`MachineHealthStatusSummaries`** :span[object]{.type-label}
  - **`MachineIdsForCalamariUpgrade`** :span[array of string]{.type-label}
  - **`MachineIdsForTentacleUpgrade`** :span[array of string]{.type-label}
  - **`MachineTenantSummaries`** :span[object]{.type-label}
  - **`MachineTenantTagSummaries`** :span[object]{.type-label}
  - **`TentacleUpgradesRequired`** :span[boolean]{.type-label}
  - **`TotalDisabledMachines`** :span[integer]{.type-label}
  - **`TotalMachines`** :span[integer]{.type-label}
- **`MachineEndpointSummaries`** :span[object]{.type-label}
- **`MachineHealthStatusSummaries`** :span[object]{.type-label}
- **`MachineIdsForCalamariUpgrade`** :span[array of string]{.type-label}
- **`MachineTenantSummaries`** :span[object]{.type-label}
- **`MachineTenantTagSummaries`** :span[object]{.type-label}
- **`TentacleUpgradesRequired`** :span[boolean]{.type-label}
- **`TotalDisabledMachines`** :span[integer]{.type-label}
- **`TotalMachines`** :span[integer]{.type-label}

<div data-example="Response">

```json
{
  "DeploymentTargetSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "EnvironmentSummaries": [
    {
      "DeploymentTargetSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "Environment": {
        "Description": "string",
        "EnvironmentTags": [
          "string"
        ],
        "Id": "string",
        "Name": "string",
        "Slug": "string",
        "SpaceId": "string",
        "Type": "string"
      },
      "MachineEndpointSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "MachineHealthStatusSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "MachineIdsForCalamariUpgrade": [
        "string"
      ],
      "MachineIdsForTentacleUpgrade": [
        "string"
      ],
      "MachineTenantSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "MachineTenantTagSummaries": {
        "additionalProp1": 0,
        "additionalProp2": 0,
        "additionalProp3": 0
      },
      "TentacleUpgradesRequired": true,
      "TotalDisabledMachines": 0,
      "TotalMachines": 0
    }
  ],
  "MachineEndpointSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "MachineHealthStatusSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "MachineIdsForCalamariUpgrade": [
    "string"
  ],
  "MachineTenantSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "MachineTenantTagSummaries": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "TentacleUpgradesRequired": true,
  "TotalDisabledMachines": 0,
  "TotalMachines": 0
}
```
</div>

## Get a list of Environments

:span[GET]{.api-get} `/api/{spaceId}/environments/v1`

Also reachable at `/api/environments/v1`, `/api/spaces/{spaceIdentifier}/environments/v1`.

Lists all of the environments in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each environment.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  Environment Ids to filter results to only Environments with the given Ids.
- **`name`** :span[string]{.type-label}  
  Filters the returned environments by the specified `name` fragment. Left for backwards compatibility; prefer PartialName.
- **`partialName`** :span[string]{.type-label}  
  Filters the documents using the specified `partialName` fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 10. Minimum `0`.

**Response**

`200` — The requested list of Environments

- **`Environments`** :span[object]{.type-label}
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

<div data-example="Response">

```json
{
  "Environments": {
    "Id": "string",
    "ItemType": "string",
    "Items": [
      {
        "AllowDynamicInfrastructure": true,
        "Description": "string",
        "EnvironmentTags": [
          "string"
        ],
        "ExtensionSettings": [
          {}
        ],
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "Name": "string",
        "Slug": "string",
        "SortOrder": 0,
        "SpaceId": "string",
        "UseGuidedFailure": true
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

## List Static, Parent and Ephemeral Environments in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each environment (which is set to a MaxValue integer for Ephemeral Environments)

:span[GET]{.api-get} `/api/{spaceId}/environments/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/environments/v2`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  Filter environments using ids.
- **`name`** :span[string]{.type-label}  
  The exact name of an Environment to be matched.
- **`partialName`** :span[string]{.type-label}  
  Filters the documents using the specified `partialName` fragment.
- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`type`** :span[array of string]{.type-label}  
  Filters the documents using the specified environment EnvironmentType.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** :span[array of string]{.type-label}  
    List of tags assigned to this environment.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this environment. This should be short, preferably 5-20 characters. Minimum length 1.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
  - **`SpaceId`** :span[string]{.type-label}
  - **`Type`** :span[string]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

<div data-example="Response">

```json
{
  "ItemType": "string",
  "Items": [
    {
      "Description": "string",
      "EnvironmentTags": [
        "string"
      ],
      "Id": "string",
      "Name": "string",
      "Slug": "string",
      "SpaceId": "string",
      "Type": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>

## Modify an existing environment

:span[PUT]{.api-put} `/api/{spaceId}/environments/{environmentId}`

Also reachable at `/api/environments/{environmentId}`, `/api/spaces/{spaceIdentifier}/environments/{environmentId}`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AllowDynamicInfrastructure`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EnvironmentId`** :span[string]{.type-label} *(required)*
- **`EnvironmentTags`** :span[array of string]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 50.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`UseGuidedFailure`** :span[boolean]{.type-label}

<div data-example="Request">

```json
{
  "AllowDynamicInfrastructure": true,
  "Description": "string",
  "EnvironmentId": "string",
  "EnvironmentTags": [
    "string"
  ],
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "Name": "string",
  "Slug": "string",
  "SortOrder": 0,
  "SpaceId": "string",
  "UseGuidedFailure": true
}
```
</div>

**Response**

`200` — The environment after modifications have been applied.

- **`AllowDynamicInfrastructure`** :span[boolean]{.type-label}  
  If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** :span[array of string]{.type-label}  
  List of tags assigned to this environment.
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label}
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Response">

```json
{
  "AllowDynamicInfrastructure": true,
  "Description": "string",
  "EnvironmentTags": [
    "string"
  ],
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
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
  "SortOrder": 0,
  "SpaceId": "string",
  "UseGuidedFailure": true
}
```
</div>

## Get the environment custom settings metadata from the extensions

:span[GET]{.api-get} `/api/{spaceId}/environments/{environmentId}/metadata`

Also reachable at `/api/environments/{environmentId}/metadata`, `/api/spaces/{spaceIdentifier}/environments/{environmentId}/metadata`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*  
  The Id of the environment for which metadata is to be retrieved.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The Id of the space containing the environment.

**Response**

`200` — The requested Environment Metadata

- **`ExtensionId`** :span[string]{.type-label}
- **`Metadata`** :span[object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Types`** :span[array of object]{.type-label}

<div data-example="Response">

```json
[
  {
    "ExtensionId": "string",
    "Metadata": {
      "Description": "string",
      "Types": [
        {}
      ]
    }
  }
]
```
</div>

## List all the variable set names (projects and library variable sets) that have variables that are scoped to only the given environment

:span[GET]{.api-get} `/api/{spaceId}/environments/{environmentId}/singlyScopedVariableDetails`

Also reachable at `/api/environments/{environmentId}/singlyScopedVariableDetails`, `/api/spaces/{spaceIdentifier}/environments/{environmentId}/singlyScopedVariableDetails`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The names of LibraryVariableSets and VariableSets which contain one or more variables scoped to the requested environment. Along with boolean indication to show that there are unviewable/editable projects/libraries which also contain scoped variables.

- **`HasUnauthorizedLibraryVariableSetVariables`** :span[boolean]{.type-label}
- **`HasUnauthorizedProjectVariables`** :span[boolean]{.type-label}
- **`VariableMap`** :span[object]{.type-label}

<div data-example="Response">

```json
{
  "HasUnauthorizedLibraryVariableSetVariables": true,
  "HasUnauthorizedProjectVariables": true,
  "VariableMap": {
    "additionalProp1": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    },
    "additionalProp2": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    },
    "additionalProp3": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    }
  }
}
```
</div>

## Get a specific Deployment Environment

:span[GET]{.api-get} `/api/{spaceId}/environments/{id}`

Also reachable at `/api/environments/{id}`, `/api/spaces/{spaceIdentifier}/environments/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Environment to load.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Deployment Environment

- **`AllowDynamicInfrastructure`** :span[boolean]{.type-label}  
  If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** :span[array of string]{.type-label}  
  List of tags assigned to this environment.
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** :span[string]{.type-label}
- **`SortOrder`** :span[integer]{.type-label}  
  Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** :span[string]{.type-label}
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Response">

```json
{
  "AllowDynamicInfrastructure": true,
  "Description": "string",
  "EnvironmentTags": [
    "string"
  ],
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
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
  "SortOrder": 0,
  "SpaceId": "string",
  "UseGuidedFailure": true
}
```
</div>

## Delete an existing Environment

:span[DELETE]{.api-delete} `/api/{spaceId}/environments/{id}`

Also reachable at `/api/environments/{id}`, `/api/spaces/{spaceIdentifier}/environments/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Environment to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Return the list of machines in an environment that matches the filters requested by the user

:span[GET]{.api-get} `/api/{spaceId}/environments/{id}/machines`

Also reachable at `/api/environments/{id}/machines`, `/api/spaces/{spaceIdentifier}/environments/{id}/machines`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the space.

**Query Parameters**

- **`commStyles`** :span[array of string]{.type-label}
- **`deploymentTargetTypes`** :span[array of string]{.type-label}
- **`healthStatuses`** :span[array of string]{.type-label}
- **`isDisabled`** :span[boolean]{.type-label}
- **`partialName`** :span[string]{.type-label}
- **`roles`** :span[array of string]{.type-label}
- **`shellNames`** :span[array of string]{.type-label}
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items per page. Defaults to 20. Minimum `0`.
- **`targetTags`** :span[array of string]{.type-label}
- **`tenantIds`** :span[array of string]{.type-label}
- **`tenantTags`** :span[array of string]{.type-label}

**Response**

`200` — The lists of all machines that belong to the given environment, and matches any specified filters.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Architecture`** :span[string]{.type-label}
  - **`Endpoint`** :span[object]{.type-label}
  - **`EnvironmentIds`** :span[array of string]{.type-label}
  - **`HasLatestCalamari`** :span[boolean]{.type-label}
  - **`HealthStatus`** :span[enum]{.type-label}  
    Allowed values: `Healthy`, `Unavailable`, `Unknown`, `HasWarnings`, `Unhealthy`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`IsInProcess`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MachinePolicyId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OperatingSystem`** :span[string]{.type-label}
  - **`OperatingSystemVersion`** :span[string]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`ShellName`** :span[string]{.type-label}
  - **`ShellVersion`** :span[string]{.type-label}
  - **`SkipInitialHealthCheck`** :span[boolean]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`StatusSummary`** :span[string]{.type-label}
  - **`TenantIds`** :span[array of string]{.type-label}
  - **`TenantTags`** :span[array of string]{.type-label}
  - **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Uri`** :span[string]{.type-label}
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

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "Architecture": "string",
      "Endpoint": {
        "CommunicationStyle": "None",
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {}
      },
      "EnvironmentIds": [
        "string"
      ],
      "HasLatestCalamari": true,
      "HealthStatus": "Healthy",
      "Id": "string",
      "IsDisabled": true,
      "IsInProcess": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "MachinePolicyId": "string",
      "Name": "string",
      "OperatingSystem": "string",
      "OperatingSystemVersion": "string",
      "Roles": [
        "string"
      ],
      "ShellName": "string",
      "ShellVersion": "string",
      "SkipInitialHealthCheck": true,
      "Slug": "string",
      "SpaceId": "string",
      "StatusSummary": "string",
      "TenantIds": [
        "string"
      ],
      "TenantTags": [
        "string"
      ],
      "TenantedDeploymentParticipation": "Untenanted",
      "Thumbprint": "string",
      "Uri": "string"
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

## Get a specific Static, Parent or Ephemeral Environment by ID

:span[GET]{.api-get} `/api/{spaceId}/environments/{id}/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/environments/{id}/v2`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Environment to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource.

**Response**

`200` — The requested Static, Parent or Ephemeral Environment

- **`Description`** :span[string]{.type-label}  
  Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** :span[array of string]{.type-label}  
  List of tags assigned to this environment.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this environment. This should be short, preferably 5-20 characters. Minimum length 1.
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`SpaceId`** :span[string]{.type-label}
- **`Type`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "Description": "string",
  "EnvironmentTags": [
    "string"
  ],
  "Id": "string",
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string",
  "Type": "string"
}
```
</div>

## List environments available for a project

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/environments`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`partialName`** :span[string]{.type-label}  
  Filters the environments by partial name fragment.
- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`type`** :span[array of string]{.type-label}  
  Filters the environments by EnvironmentType.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** :span[array of string]{.type-label}  
    List of tags assigned to this environment.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this environment. This should be short, preferably 5-20 characters. Minimum length 1.
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
  - **`SpaceId`** :span[string]{.type-label}
  - **`Type`** :span[string]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

<div data-example="Response">

```json
{
  "ItemType": "string",
  "Items": [
    {
      "Description": "string",
      "EnvironmentTags": [
        "string"
      ],
      "Id": "string",
      "Name": "string",
      "Slug": "string",
      "SpaceId": "string",
      "Type": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
</div>
