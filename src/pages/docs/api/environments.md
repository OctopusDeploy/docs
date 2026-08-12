---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Environments
---

## Get a list of Environments

`GET` `/api/{spaceId}/environments`

Also reachable at `/api/environments`, `/api/spaces/{spaceIdentifier}/environments`.

Lists all of the environments in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each environment.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — Environment Ids to filter results to only Environments with the given Ids.
- **`name`** <span class="type-label">string</span> — Filters the returned environments by the specified `name` fragment. Left for backwards compatibility; prefer PartialName.
- **`partialName`** <span class="type-label">string</span> — Filters the documents using the specified `partialName` fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 10. Minimum `0`.

**Response**

`200` — The requested list of Environments

`EnvironmentResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`AllowDynamicInfrastructure`** <span class="type-label">boolean</span> — If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
  - **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
  - **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
  - **`Slug`** <span class="type-label">string</span>
  - **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.
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

## Creates a new environment

`POST` `/api/{spaceId}/environments`

Also reachable at `/api/environments`, `/api/spaces/{spaceIdentifier}/environments`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateEnvironmentCommand`

- **`AllowDynamicInfrastructure`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentTags`** <span class="type-label">array of string</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1. Maximum length 50.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`UseGuidedFailure`** <span class="type-label">boolean</span>

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

`EnvironmentResource`.

- **`AllowDynamicInfrastructure`** <span class="type-label">boolean</span> — If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** <span class="type-label">string</span>
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

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

`GET` `/api/{spaceId}/environments/all`

Also reachable at `/api/environments/all`, `/api/spaces/{spaceIdentifier}/environments/all`.

Lists the name and ID of all of the environments in the supplied Space. The results will be sorted by the `SortOrder` field on each environment.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`channelId`** <span class="type-label">string</span> — A Channel Id used to filter a query.
- **`ids`** <span class="type-label">array of string</span> — A comma separated list of Deployment Environment resource ids used to filter a query.
- **`projectId`** <span class="type-label">string</span> — A project Id used to filter a query.

**Response**

`200` — Requested list of Environments

an array of `EnvironmentResource`.

- **`AllowDynamicInfrastructure`** <span class="type-label">boolean</span> — If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** <span class="type-label">string</span>
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

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

`GET` `/api/{spaceId}/environments/all/v1`

Also reachable at `/api/environments/all/v1`, `/api/spaces/{spaceIdentifier}/environments/all/v1`.

Lists the name and ID of all of the environments in the supplied Space. The results will be sorted by the `SortOrder` field on each environment.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`channelId`** <span class="type-label">string</span> — A Channel Id used to filter a query.
- **`ids`** <span class="type-label">array of string</span> — A comma separated list of Deployment Environment resource ids used to filter a query.
- **`projectId`** <span class="type-label">string</span> — A project Id used to filter a query.

**Response**

`200` — Requested list of Environments

`GetAllEnvironmentsResponse`.

- **`Environments`** <span class="type-label">array of object</span>
  - **`AllowDynamicInfrastructure`** <span class="type-label">boolean</span> — If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
  - **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
  - **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
  - **`Slug`** <span class="type-label">string</span>
  - **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

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

`PUT` `/api/{spaceId}/environments/sortorder`

Also reachable at `/api/environments/sortorder`, `/api/spaces/{spaceIdentifier}/environments/sortorder`.

Takes an array of environment IDs as the request body, uses the order of items in the array to sort the environments on the server. The ID of every environment must be specified.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

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

## Lists all environments, including a summary of machine information

`GET` `/api/{spaceId}/environments/summary`

Also reachable at `/api/environments/summary`, `/api/spaces/{spaceIdentifier}/environments/summary`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`commStyles`** <span class="type-label">array of string</span>
- **`deploymentTargetTypes`** <span class="type-label">array of string</span>
- **`environmentTags`** <span class="type-label">array of string</span>
- **`healthStatuses`** <span class="type-label">array of string</span>
- **`hideEmptyEnvironments`** <span class="type-label">boolean</span>
- **`ids`** <span class="type-label">array of string</span>
- **`isDisabled`** <span class="type-label">boolean</span>
- **`machinePartialName`** <span class="type-label">string</span>
- **`partialName`** <span class="type-label">string</span>
- **`roles`** <span class="type-label">array of string</span>
- **`shellNames`** <span class="type-label">array of string</span>
- **`targetTags`** <span class="type-label">array of string</span>
- **`tenantIds`** <span class="type-label">array of string</span>
- **`tenantTags`** <span class="type-label">array of string</span>

**Response**

`200` — Contains the machines et al associated with a given environment.

`EnvironmentsSummaryResource`.

- **`DeploymentTargetSummaries`** <span class="type-label">object</span>
- **`EnvironmentSummaries`** <span class="type-label">array of object</span>
  - **`DeploymentTargetSummaries`** <span class="type-label">object</span>
  - **`Environment`** <span class="type-label">object</span>
  - **`MachineEndpointSummaries`** <span class="type-label">object</span>
  - **`MachineHealthStatusSummaries`** <span class="type-label">object</span>
  - **`MachineIdsForCalamariUpgrade`** <span class="type-label">array of string</span>
  - **`MachineIdsForTentacleUpgrade`** <span class="type-label">array of string</span>
  - **`MachineTenantSummaries`** <span class="type-label">object</span>
  - **`MachineTenantTagSummaries`** <span class="type-label">object</span>
  - **`TentacleUpgradesRequired`** <span class="type-label">boolean</span>
  - **`TotalDisabledMachines`** <span class="type-label">integer</span>
  - **`TotalMachines`** <span class="type-label">integer</span>
- **`MachineEndpointSummaries`** <span class="type-label">object</span>
- **`MachineHealthStatusSummaries`** <span class="type-label">object</span>
- **`MachineIdsForCalamariUpgrade`** <span class="type-label">array of string</span>
- **`MachineIdsForTentacleUpgrade`** <span class="type-label">array of string</span>
- **`MachineTenantSummaries`** <span class="type-label">object</span>
- **`MachineTenantTagSummaries`** <span class="type-label">object</span>
- **`TentacleUpgradesRequired`** <span class="type-label">boolean</span>
- **`TotalDisabledMachines`** <span class="type-label">integer</span>
- **`TotalMachines`** <span class="type-label">integer</span>

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

## Lists all environments, including a summary of machine information

`GET` `/api/{spaceId}/environments/summary/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/environments/summary/v2`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`commStyles`** <span class="type-label">array of string</span>
- **`deploymentTargetTypes`** <span class="type-label">array of string</span>
- **`environmentTags`** <span class="type-label">array of string</span>
- **`healthStatuses`** <span class="type-label">array of string</span>
- **`hideEmptyEnvironments`** <span class="type-label">boolean</span>
- **`ids`** <span class="type-label">array of string</span>
- **`isDisabled`** <span class="type-label">boolean</span>
- **`machinePartialName`** <span class="type-label">string</span>
- **`partialName`** <span class="type-label">string</span>
- **`roles`** <span class="type-label">array of string</span>
- **`shellNames`** <span class="type-label">array of string</span>
- **`targetTags`** <span class="type-label">array of string</span>
- **`tenantIds`** <span class="type-label">array of string</span>
- **`tenantTags`** <span class="type-label">array of string</span>
- **`type`** <span class="type-label">array of string</span> — Filters the environment summaries using the specified environment EnvironmentType.

**Response**

`200` — Contains the machines et al associated with a given environment.

`GetEnvironmentsSummaryResponseV2`.

- **`DeploymentTargetSummaries`** <span class="type-label">object</span>
- **`EnvironmentSummaries`** <span class="type-label">array of object</span>
  - **`DeploymentTargetSummaries`** <span class="type-label">object</span>
  - **`Environment`** <span class="type-label">object</span>
  - **`MachineEndpointSummaries`** <span class="type-label">object</span>
  - **`MachineHealthStatusSummaries`** <span class="type-label">object</span>
  - **`MachineIdsForCalamariUpgrade`** <span class="type-label">array of string</span>
  - **`MachineIdsForTentacleUpgrade`** <span class="type-label">array of string</span>
  - **`MachineTenantSummaries`** <span class="type-label">object</span>
  - **`MachineTenantTagSummaries`** <span class="type-label">object</span>
  - **`TentacleUpgradesRequired`** <span class="type-label">boolean</span>
  - **`TotalDisabledMachines`** <span class="type-label">integer</span>
  - **`TotalMachines`** <span class="type-label">integer</span>
- **`MachineEndpointSummaries`** <span class="type-label">object</span>
- **`MachineHealthStatusSummaries`** <span class="type-label">object</span>
- **`MachineIdsForCalamariUpgrade`** <span class="type-label">array of string</span>
- **`MachineTenantSummaries`** <span class="type-label">object</span>
- **`MachineTenantTagSummaries`** <span class="type-label">object</span>
- **`TentacleUpgradesRequired`** <span class="type-label">boolean</span>
- **`TotalDisabledMachines`** <span class="type-label">integer</span>
- **`TotalMachines`** <span class="type-label">integer</span>

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

`GET` `/api/{spaceId}/environments/v1`

Also reachable at `/api/environments/v1`, `/api/spaces/{spaceIdentifier}/environments/v1`.

Lists all of the environments in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each environment.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — Environment Ids to filter results to only Environments with the given Ids.
- **`name`** <span class="type-label">string</span> — Filters the returned environments by the specified `name` fragment. Left for backwards compatibility; prefer PartialName.
- **`partialName`** <span class="type-label">string</span> — Filters the documents using the specified `partialName` fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 10. Minimum `0`.

**Response**

`200` — The requested list of Environments

`GetEnvironmentsResponse`.

- **`Environments`** <span class="type-label">object</span>
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

## Lists Static, Parent and Ephemeral Environments in the supplied Octopus Deploy Space. The results will be sorted by the `SortOrder` field on each environment (which is set to a MaxValue integer for Ephemeral Environments)

`GET` `/api/{spaceId}/environments/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/environments/v2`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — Filter environments using ids.
- **`name`** <span class="type-label">string</span> — The exact name of an Environment to be matched.
- **`partialName`** <span class="type-label">string</span> — Filters the documents using the specified `partialName` fragment.
- **`skip`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Defaults to zero. Minimum `0`.
- **`type`** <span class="type-label">array of string</span> — Filters the documents using the specified environment EnvironmentType.

**Response**

`200` — Success

`BaseEnvironmentV2ResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters. Minimum length 1.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Type`** <span class="type-label">string</span>
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

## Modifies an existing environment

`PUT` `/api/{spaceId}/environments/{environmentId}`

Also reachable at `/api/environments/{environmentId}`, `/api/spaces/{spaceIdentifier}/environments/{environmentId}`.

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyEnvironmentCommand`

- **`AllowDynamicInfrastructure`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentId`** <span class="type-label">string</span> *(required)*
- **`EnvironmentTags`** <span class="type-label">array of string</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1. Maximum length 50.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`UseGuidedFailure`** <span class="type-label">boolean</span>

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

`EnvironmentResource`.

- **`AllowDynamicInfrastructure`** <span class="type-label">boolean</span> — If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** <span class="type-label">string</span>
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

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

## Gets the environment custom settings metadata from the extensions

`GET` `/api/{spaceId}/environments/{environmentId}/metadata`

Also reachable at `/api/environments/{environmentId}/metadata`, `/api/spaces/{spaceIdentifier}/environments/{environmentId}/metadata`.

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)* — The Id of the environment for which metadata is to be retrieved.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The Id of the space containing the environment.

**Response**

`200` — The requested Environment Metadata

an array of `DeploymentEnvironmentSettingsMetadata`.

- **`ExtensionId`** <span class="type-label">string</span>
- **`Metadata`** <span class="type-label">object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Types`** <span class="type-label">array of object</span>

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

## Lists all the variable set names (projects and library variable sets) that have variables that are scoped to only the given environment

`GET` `/api/{spaceId}/environments/{environmentId}/singlyScopedVariableDetails`

Also reachable at `/api/environments/{environmentId}/singlyScopedVariableDetails`, `/api/spaces/{spaceIdentifier}/environments/{environmentId}/singlyScopedVariableDetails`.

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The names of LibraryVariableSets and VariableSets which contain one or more variables scoped to the requested environment. Along with boolean indication to show that there are unviewable/editable projects/libraries which also contain scoped variables.

`VariablesScopedToDocumentResource`.

- **`HasUnauthorizedLibraryVariableSetVariables`** <span class="type-label">boolean</span>
- **`HasUnauthorizedProjectVariables`** <span class="type-label">boolean</span>
- **`VariableMap`** <span class="type-label">object</span>

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

## Gets a specific Deployment Environment

`GET` `/api/{spaceId}/environments/{id}`

Also reachable at `/api/environments/{id}`, `/api/spaces/{spaceIdentifier}/environments/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Environment to load.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Deployment Environment

`EnvironmentResource`.

- **`AllowDynamicInfrastructure`** <span class="type-label">boolean</span> — If set to true, deployments to this environment will be allowed to contain steps that manage infrastructure. This relies on DeploymentActionResource being set to allow managing resource for a step.
- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters.
- **`Slug`** <span class="type-label">string</span>
- **`SortOrder`** <span class="type-label">integer</span> — Gets or sets a number indicating the priority of this environment in sort order. Environments with a lower sort order will appear in the UI before items with a higher sort order.
- **`SpaceId`** <span class="type-label">string</span>
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, deployments will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

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

## Deletes an existing Environment

`DELETE` `/api/{spaceId}/environments/{id}`

Also reachable at `/api/environments/{id}`, `/api/spaces/{spaceIdentifier}/environments/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Environment to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Returns the list of machines in an environment that matches the filters requested by the user

`GET` `/api/{spaceId}/environments/{id}/machines`

Also reachable at `/api/environments/{id}/machines`, `/api/spaces/{spaceIdentifier}/environments/{id}/machines`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Environment.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the space.

- **`commStyles`** <span class="type-label">array of string</span>
- **`deploymentTargetTypes`** <span class="type-label">array of string</span>
- **`healthStatuses`** <span class="type-label">array of string</span>
- **`isDisabled`** <span class="type-label">boolean</span>
- **`partialName`** <span class="type-label">string</span>
- **`roles`** <span class="type-label">array of string</span>
- **`shellNames`** <span class="type-label">array of string</span>
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items per page. Defaults to 20. Minimum `0`.
- **`targetTags`** <span class="type-label">array of string</span>
- **`tenantIds`** <span class="type-label">array of string</span>
- **`tenantTags`** <span class="type-label">array of string</span>

**Response**

`200` — The lists of all machines that belong to the given environment, and matches any specified filters.

`MachineResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Architecture`** <span class="type-label">string</span>
  - **`Endpoint`** <span class="type-label">object</span>
  - **`EnvironmentIds`** <span class="type-label">array of string</span>
  - **`HasLatestCalamari`** <span class="type-label">boolean</span>
  - **`HealthStatus`** <span class="type-label">enum</span> — Allowed values: `Healthy`, `Unavailable`, `Unknown`, `HasWarnings`, `Unhealthy`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`IsInProcess`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MachinePolicyId`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OperatingSystem`** <span class="type-label">string</span>
  - **`OperatingSystemVersion`** <span class="type-label">string</span>
  - **`Roles`** <span class="type-label">array of string</span>
  - **`ShellName`** <span class="type-label">string</span>
  - **`ShellVersion`** <span class="type-label">string</span>
  - **`SkipInitialHealthCheck`** <span class="type-label">boolean</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`StatusSummary`** <span class="type-label">string</span>
  - **`TenantIds`** <span class="type-label">array of string</span>
  - **`TenantTags`** <span class="type-label">array of string</span>
  - **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Uri`** <span class="type-label">string</span>
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

## Gets a specific Static, Parent or Ephemeral Environment by ID

`GET` `/api/{spaceId}/environments/{id}/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/environments/{id}/v2`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Environment to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource.

**Response**

`200` — The requested Static, Parent or Ephemeral Environment

`BaseEnvironmentV2Resource`.

- **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
- **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters. Minimum length 1.
- **`Slug`** <span class="type-label">string</span> — Minimum length 1.
- **`SpaceId`** <span class="type-label">string</span>
- **`Type`** <span class="type-label">string</span>

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

## Lists environments available for a project

`GET` `/api/{spaceId}/projects/{projectId}/environments`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`partialName`** <span class="type-label">string</span> — Filters the environments by partial name fragment.
- **`skip`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> *(required)* — Number of items to take. Defaults to 30. Minimum `0`.
- **`type`** <span class="type-label">array of string</span> — Filters the environments by EnvironmentType.

**Response**

`200` — Success

`BaseEnvironmentV2ResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span> — Gets or sets a short description of this environment that can be used to explain the purpose of the environment to other users. This field may contain markdown.
  - **`EnvironmentTags`** <span class="type-label">array of string</span> — List of tags assigned to this environment.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this environment. This should be short, preferably 5-20 characters. Minimum length 1.
  - **`Slug`** <span class="type-label">string</span> — Minimum length 1.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Type`** <span class="type-label">string</span>
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
