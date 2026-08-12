---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployment Freeze
---

## Get DeploymentFreezes

`GET` `/api/deploymentfreezes`

Gets a paginated set of DeploymentFreezes.

**Parameters**

- **`effectiveDate`** <span class="type-label">string</span> — URL encoded timestamp to search recurring deployment freezes at a given point in time. Format `date-time`.
- **`environmentIds`** <span class="type-label">array of string</span> — List of Environment IDs which if specified, filters the result to only include DeploymentFreeze with matching Environment IDs.
- **`ids`** <span class="type-label">array of string</span> — List of DeploymentFreeze IDs which if specified, filters the result to only include DeploymentFreeze with matching IDs.
- **`includeComplete`** <span class="type-label">boolean</span> — Set to false to only return active Deployment Freezes.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`projectIds`** <span class="type-label">array of string</span> — List of Project IDs which if specified, filters the result to only include DeploymentFreeze with matching Project IDs.
- **`skip`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Defaults to zero. Minimum `0`.
- **`status`** <span class="type-label">string</span>
- **`take`** <span class="type-label">integer</span> *(required)* — Number of items to take. Defaults to 30. Minimum `0`.
- **`tenantIds`** <span class="type-label">array of string</span> — List of Tenant IDs which if specified, filters the result to only include DeploymentFreeze with matching Tenant IDs.

**Response**

`200` — Requested list of DeploymentFreezes

`GetDeploymentFreezesResponse`.

- **`Count`** <span class="type-label">integer</span>
- **`DeploymentFreezes`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`End`** <span class="type-label">string</span> — Format `date-time`.
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectEnvironmentScope`** <span class="type-label">object</span>
  - **`RecurringSchedule`** <span class="type-label">object</span>
  - **`Start`** <span class="type-label">string</span> — Format `date-time`.
  - **`TenantProjectEnvironmentScope`** <span class="type-label">array of object</span>

<div data-example="Response">

```json
{
  "Count": 0,
  "DeploymentFreezes": [
    {
      "Description": "string",
      "End": "2020-01-01T00:00:00.000Z",
      "Id": "string",
      "Name": "string",
      "ProjectEnvironmentScope": {
        "additionalProp1": [
          "string"
        ],
        "additionalProp2": [
          "string"
        ],
        "additionalProp3": [
          "string"
        ]
      },
      "RecurringSchedule": {
        "EndAfterOccurrences": 0,
        "EndDate": "2020-01-01T00:00:00.000Z",
        "EndOnDate": "2020-01-01T00:00:00.000Z",
        "EndType": "Never",
        "StartDate": "2020-01-01T00:00:00.000Z",
        "Type": "Daily",
        "Unit": 0,
        "UserUtcOffsetInMinutes": 0
      },
      "Start": "2020-01-01T00:00:00.000Z",
      "TenantProjectEnvironmentScope": [
        {}
      ]
    }
  ]
}
```
</div>

## Creates a new deployment freeze

`POST` `/api/deploymentfreezes`

**Request Body**

`CreateDeploymentFreezeCommand`

- **`Description`** <span class="type-label">string</span>
- **`End`** <span class="type-label">string</span> *(required)* — Format `date-time`.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1. Maximum length 200.
- **`ProjectEnvironmentScope`** <span class="type-label">object</span>
- **`Start`** <span class="type-label">string</span> *(required)* — Format `date-time`.

<div data-example="Request">

```json
{
  "Description": "string",
  "End": "2020-01-01T00:00:00.000Z",
  "Name": "string",
  "ProjectEnvironmentScope": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "Start": "2020-01-01T00:00:00.000Z"
}
```
</div>

**Response**

`201` — Created

`CreateDeploymentFreezeResponse`.

- **`Description`** <span class="type-label">string</span>
- **`End`** <span class="type-label">string</span> — Format `date-time`.
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ProjectEnvironmentScope`** <span class="type-label">object</span>
- **`RecurringSchedule`** <span class="type-label">object</span>
  - **`EndAfterOccurrences`** <span class="type-label">integer</span>
  - **`EndDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`EndOnDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`EndType`** <span class="type-label">enum</span> — Allowed values: `Never`, `OnDate`, `AfterOccurrences`.
  - **`StartDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Daily`, `Weekly`, `Monthly`, `Annually`.
  - **`Unit`** <span class="type-label">integer</span>
  - **`UserUtcOffsetInMinutes`** <span class="type-label">integer</span>
- **`Start`** <span class="type-label">string</span> — Format `date-time`.
- **`TenantProjectEnvironmentScope`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Description": "string",
  "End": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "Name": "string",
  "ProjectEnvironmentScope": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "RecurringSchedule": {
    "EndAfterOccurrences": 0,
    "EndDate": "2020-01-01T00:00:00.000Z",
    "EndOnDate": "2020-01-01T00:00:00.000Z",
    "EndType": "Never",
    "StartDate": "2020-01-01T00:00:00.000Z",
    "Type": "Daily",
    "Unit": 0,
    "UserUtcOffsetInMinutes": 0
  },
  "Start": "2020-01-01T00:00:00.000Z",
  "TenantProjectEnvironmentScope": [
    {
      "EnvironmentId": "string",
      "ProjectId": "string",
      "TenantId": "string"
    }
  ]
}
```
</div>

## Get a deployment freeze by ID

`GET` `/api/deploymentfreezes/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the deployment freeze.

**Response**

`200` — The requested deployment freeze

`GetDeploymentFreezeByIdResponse`.

- **`Description`** <span class="type-label">string</span>
- **`End`** <span class="type-label">string</span> — Format `date-time`.
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ProjectEnvironmentScope`** <span class="type-label">object</span>
- **`RecurringSchedule`** <span class="type-label">object</span>
  - **`EndAfterOccurrences`** <span class="type-label">integer</span>
  - **`EndDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`EndOnDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`EndType`** <span class="type-label">enum</span> — Allowed values: `Never`, `OnDate`, `AfterOccurrences`.
  - **`StartDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Daily`, `Weekly`, `Monthly`, `Annually`.
  - **`Unit`** <span class="type-label">integer</span>
  - **`UserUtcOffsetInMinutes`** <span class="type-label">integer</span>
- **`Start`** <span class="type-label">string</span> — Format `date-time`.
- **`TenantProjectEnvironmentScope`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Description": "string",
  "End": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "Name": "string",
  "ProjectEnvironmentScope": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "RecurringSchedule": {
    "EndAfterOccurrences": 0,
    "EndDate": "2020-01-01T00:00:00.000Z",
    "EndOnDate": "2020-01-01T00:00:00.000Z",
    "EndType": "Never",
    "StartDate": "2020-01-01T00:00:00.000Z",
    "Type": "Daily",
    "Unit": 0,
    "UserUtcOffsetInMinutes": 0
  },
  "Start": "2020-01-01T00:00:00.000Z",
  "TenantProjectEnvironmentScope": [
    {
      "EnvironmentId": "string",
      "ProjectId": "string",
      "TenantId": "string"
    }
  ]
}
```
</div>

## Creates a new deployment freeze

`PUT` `/api/deploymentfreezes/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyDeploymentFreezeCommand`

- **`Description`** <span class="type-label">string</span>
- **`End`** <span class="type-label">string</span> *(required)* — Format `date-time`.
- **`Id`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1. Maximum length 200.
- **`ProjectEnvironmentScope`** <span class="type-label">object</span>
- **`RecurringSchedule`** <span class="type-label">object</span>
  - **`EndAfterOccurrences`** <span class="type-label">integer</span>
  - **`EndDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`EndOnDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`EndType`** <span class="type-label">enum</span> — Allowed values: `Never`, `OnDate`, `AfterOccurrences`.
  - **`StartDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Daily`, `Weekly`, `Monthly`, `Annually`.
  - **`Unit`** <span class="type-label">integer</span>
  - **`UserUtcOffsetInMinutes`** <span class="type-label">integer</span>
- **`Start`** <span class="type-label">string</span> *(required)* — Format `date-time`.
- **`TenantProjectEnvironmentScope`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span> *(required)*
  - **`ProjectId`** <span class="type-label">string</span> *(required)*
  - **`TenantId`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "Description": "string",
  "End": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "Name": "string",
  "ProjectEnvironmentScope": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "RecurringSchedule": {
    "EndAfterOccurrences": 0,
    "EndDate": "2020-01-01T00:00:00.000Z",
    "EndOnDate": "2020-01-01T00:00:00.000Z",
    "EndType": "Never",
    "StartDate": "2020-01-01T00:00:00.000Z",
    "Type": "Daily",
    "Unit": 0,
    "UserUtcOffsetInMinutes": 0
  },
  "Start": "2020-01-01T00:00:00.000Z",
  "TenantProjectEnvironmentScope": [
    {
      "EnvironmentId": "string",
      "ProjectId": "string",
      "TenantId": "string"
    }
  ]
}
```
</div>

**Response**

`200` — Modifies an existing deployment freeze

`ModifyDeploymentFreezeResponse`.

- **`Description`** <span class="type-label">string</span>
- **`End`** <span class="type-label">string</span> — Format `date-time`.
- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ProjectEnvironmentScope`** <span class="type-label">object</span>
- **`RecurringSchedule`** <span class="type-label">object</span>
  - **`EndAfterOccurrences`** <span class="type-label">integer</span>
  - **`EndDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`EndOnDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`EndType`** <span class="type-label">enum</span> — Allowed values: `Never`, `OnDate`, `AfterOccurrences`.
  - **`StartDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Daily`, `Weekly`, `Monthly`, `Annually`.
  - **`Unit`** <span class="type-label">integer</span>
  - **`UserUtcOffsetInMinutes`** <span class="type-label">integer</span>
- **`Start`** <span class="type-label">string</span> — Format `date-time`.
- **`TenantProjectEnvironmentScope`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Description": "string",
  "End": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "Name": "string",
  "ProjectEnvironmentScope": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "RecurringSchedule": {
    "EndAfterOccurrences": 0,
    "EndDate": "2020-01-01T00:00:00.000Z",
    "EndOnDate": "2020-01-01T00:00:00.000Z",
    "EndType": "Never",
    "StartDate": "2020-01-01T00:00:00.000Z",
    "Type": "Daily",
    "Unit": 0,
    "UserUtcOffsetInMinutes": 0
  },
  "Start": "2020-01-01T00:00:00.000Z",
  "TenantProjectEnvironmentScope": [
    {
      "EnvironmentId": "string",
      "ProjectId": "string",
      "TenantId": "string"
    }
  ]
}
```
</div>

## Deletes a deployment freeze

`DELETE` `/api/deploymentfreezes/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the DeploymentFreeze to delete.

**Response**

`200` — Success

## Override a deployment freeze to create a deployment

`POST` `/api/{spaceId}/deployments/override`

Also reachable at `/api/deployments/override`, `/api/spaces/{spaceIdentifier}/deployments/override`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateDeploymentFreezeOverrideCommand`

- **`CreateDeploymentCommand`** <span class="type-label">object</span> *(required)*
  - **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Changes`** <span class="type-label">array of object</span>
  - **`ChangesMarkdown`** <span class="type-label">string</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`Comments`** <span class="type-label">string</span>
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`DebugMode`** <span class="type-label">string</span>
  - **`DeployedBy`** <span class="type-label">string</span>
  - **`DeployedById`** <span class="type-label">string</span>
  - **`DeployedToMachineIds`** <span class="type-label">array of string</span>
  - **`DeploymentProcessId`** <span class="type-label">string</span>
  - **`EnvironmentId`** <span class="type-label">string</span> *(required)*
  - **`ExcludedMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** <span class="type-label">object</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`FailureEncountered`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`ForcePackageRedeployment`** <span class="type-label">boolean</span>
  - **`FormValues`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ManifestVariableSetId`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Priority`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`QueueTime`** <span class="type-label">string</span> — If set this time will be the used to schedule the deployment to a later time, null is assumed to mean the time will be executed immediately. Format `date-time`.
  - **`QueueTimeExpiry`** <span class="type-label">string</span> — Format `date-time`.
  - **`ReleaseId`** <span class="type-label">string</span> *(required)*
  - **`SkipActions`** <span class="type-label">array of string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`SpecificMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
  - **`SpecificTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`TaskId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
  - **`TentacleRetentionPeriod`** <span class="type-label">object</span>
  - **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.
- **`FreezeIds`** <span class="type-label">array of string</span> *(required)*
- **`Reason`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`SpaceId`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "CreateDeploymentCommand": {
    "ChangeRequestSettings": [
      {
        "Type": "ServiceNow"
      }
    ],
    "Changes": [
      {
        "BuildInformation": [
          {}
        ],
        "Commits": [
          {}
        ],
        "ReleaseNotes": "string",
        "Version": "string",
        "WorkItems": [
          {}
        ]
      }
    ],
    "ChangesMarkdown": "string",
    "ChannelId": "string",
    "Comments": "string",
    "Created": "2020-01-01T00:00:00.000Z",
    "DebugMode": "string",
    "DeployedBy": "string",
    "DeployedById": "string",
    "DeployedToMachineIds": [
      "string"
    ],
    "DeploymentProcessId": "string",
    "EnvironmentId": "string",
    "ExcludedMachineIds": [
      "string"
    ],
    "ExcludedTargetTagIds": [
      "string"
    ],
    "ExecutionPlanLogContext": {
      "Steps": [
        {}
      ]
    },
    "FailTargetDiscovery": true,
    "FailureEncountered": true,
    "ForcePackageDownload": true,
    "ForcePackageRedeployment": true,
    "FormValues": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "ManifestVariableSetId": "string",
    "Name": "string",
    "Priority": "string",
    "ProjectId": "string",
    "QueueTime": "2020-01-01T00:00:00.000Z",
    "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
    "ReleaseId": "string",
    "SkipActions": [
      "string"
    ],
    "SpaceId": "string",
    "SpecificMachineIds": [
      "string"
    ],
    "SpecificTargetTagIds": [
      "string"
    ],
    "TaskId": "string",
    "TenantId": "string",
    "TentacleRetentionPeriod": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": true,
      "Strategy": "string",
      "Unit": "Days"
    },
    "UseGuidedFailure": true
  },
  "FreezeIds": [
    "string"
  ],
  "Reason": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

`CreateDeploymentFreezeOverrideResponse`.

- **`Deployment`** <span class="type-label">object</span>
  - **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Changes`** <span class="type-label">array of object</span>
  - **`ChangesMarkdown`** <span class="type-label">string</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`Comments`** <span class="type-label">string</span>
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`DebugMode`** <span class="type-label">string</span>
  - **`DeployedBy`** <span class="type-label">string</span>
  - **`DeployedById`** <span class="type-label">string</span>
  - **`DeployedToMachineIds`** <span class="type-label">array of string</span>
  - **`DeploymentProcessId`** <span class="type-label">string</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ExcludedMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** <span class="type-label">object</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`FailureEncountered`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`ForcePackageRedeployment`** <span class="type-label">boolean</span>
  - **`FormValues`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ManifestVariableSetId`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Priority`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`QueueTime`** <span class="type-label">string</span> — If set this time will be the used to schedule the deployment to a later time, null is assumed to mean the time will be executed immediately. Format `date-time`.
  - **`QueueTimeExpiry`** <span class="type-label">string</span> — Format `date-time`.
  - **`ReleaseId`** <span class="type-label">string</span>
  - **`SkipActions`** <span class="type-label">array of string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`SpecificMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
  - **`SpecificTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`TaskId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
  - **`TentacleRetentionPeriod`** <span class="type-label">object</span>
  - **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Response">

```json
{
  "Deployment": {
    "ChangeRequestSettings": [
      {
        "Type": "ServiceNow"
      }
    ],
    "Changes": [
      {
        "BuildInformation": [
          {}
        ],
        "Commits": [
          {}
        ],
        "ReleaseNotes": "string",
        "Version": "string",
        "WorkItems": [
          {}
        ]
      }
    ],
    "ChangesMarkdown": "string",
    "ChannelId": "string",
    "Comments": "string",
    "Created": "2020-01-01T00:00:00.000Z",
    "DebugMode": "string",
    "DeployedBy": "string",
    "DeployedById": "string",
    "DeployedToMachineIds": [
      "string"
    ],
    "DeploymentProcessId": "string",
    "EnvironmentId": "string",
    "ExcludedMachineIds": [
      "string"
    ],
    "ExcludedTargetTagIds": [
      "string"
    ],
    "ExecutionPlanLogContext": {
      "Steps": [
        {}
      ]
    },
    "FailTargetDiscovery": true,
    "FailureEncountered": true,
    "ForcePackageDownload": true,
    "ForcePackageRedeployment": true,
    "FormValues": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "ManifestVariableSetId": "string",
    "Name": "string",
    "Priority": "string",
    "ProjectId": "string",
    "QueueTime": "2020-01-01T00:00:00.000Z",
    "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
    "ReleaseId": "string",
    "SkipActions": [
      "string"
    ],
    "SpaceId": "string",
    "SpecificMachineIds": [
      "string"
    ],
    "SpecificTargetTagIds": [
      "string"
    ],
    "TaskId": "string",
    "TenantId": "string",
    "TentacleRetentionPeriod": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": true,
      "Strategy": "string",
      "Unit": "Days"
    },
    "UseGuidedFailure": true
  }
}
```
</div>
