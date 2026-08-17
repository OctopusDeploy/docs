---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployment Freeze
---

## Get DeploymentFreezes

:span[GET]{.api-get} `/api/deploymentfreezes`

Gets a paginated set of DeploymentFreezes.

**Query Parameters**

- **`effectiveDate`** :span[string]{.type-label}  
  URL encoded timestamp to search recurring deployment freezes at a given point in time. Format `date-time`.
- **`environmentIds`** :span[array of string]{.type-label}  
  List of Environment IDs which if specified, filters the result to only include DeploymentFreeze with matching Environment IDs.
- **`ids`** :span[array of string]{.type-label}  
  List of DeploymentFreeze IDs which if specified, filters the result to only include DeploymentFreeze with matching IDs.
- **`includeComplete`** :span[boolean]{.type-label}  
  Set to false to only return active Deployment Freezes.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`projectIds`** :span[array of string]{.type-label}  
  List of Project IDs which if specified, filters the result to only include DeploymentFreeze with matching Project IDs.
- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`status`** :span[string]{.type-label}
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`tenantIds`** :span[array of string]{.type-label}  
  List of Tenant IDs which if specified, filters the result to only include DeploymentFreeze with matching Tenant IDs.

**Response**

`200` — Requested list of DeploymentFreezes

- **`Count`** :span[integer]{.type-label}
- **`DeploymentFreezes`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`End`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectEnvironmentScope`** :span[object]{.type-label}
  - **`RecurringSchedule`** :span[object]{.type-label}
  - **`Start`** :span[string]{.type-label}  
    Format `date-time`.
  - **`TenantProjectEnvironmentScope`** :span[array of object]{.type-label}

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

## Create a new deployment freeze

:span[POST]{.api-post} `/api/deploymentfreezes`

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`End`** :span[string]{.type-label} *(required)*  
  Format `date-time`.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 200.
- **`ProjectEnvironmentScope`** :span[object]{.type-label}
- **`Start`** :span[string]{.type-label} *(required)*  
  Format `date-time`.

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

- **`Description`** :span[string]{.type-label}
- **`End`** :span[string]{.type-label}  
  Format `date-time`.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectEnvironmentScope`** :span[object]{.type-label}
- **`RecurringSchedule`** :span[object]{.type-label}
  - **`EndAfterOccurrences`** :span[integer]{.type-label}
  - **`EndDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EndOnDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EndType`** :span[enum]{.type-label}  
    Allowed values: `Never`, `OnDate`, `AfterOccurrences`.
  - **`StartDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Daily`, `Weekly`, `Monthly`, `Annually`.
  - **`Unit`** :span[integer]{.type-label}
  - **`UserUtcOffsetInMinutes`** :span[integer]{.type-label}
- **`Start`** :span[string]{.type-label}  
  Format `date-time`.
- **`TenantProjectEnvironmentScope`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}

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

:span[GET]{.api-get} `/api/deploymentfreezes/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the deployment freeze.

**Response**

`200` — The requested deployment freeze

- **`Description`** :span[string]{.type-label}
- **`End`** :span[string]{.type-label}  
  Format `date-time`.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectEnvironmentScope`** :span[object]{.type-label}
- **`RecurringSchedule`** :span[object]{.type-label}
  - **`EndAfterOccurrences`** :span[integer]{.type-label}
  - **`EndDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EndOnDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EndType`** :span[enum]{.type-label}  
    Allowed values: `Never`, `OnDate`, `AfterOccurrences`.
  - **`StartDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Daily`, `Weekly`, `Monthly`, `Annually`.
  - **`Unit`** :span[integer]{.type-label}
  - **`UserUtcOffsetInMinutes`** :span[integer]{.type-label}
- **`Start`** :span[string]{.type-label}  
  Format `date-time`.
- **`TenantProjectEnvironmentScope`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}

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

## Create a new deployment freeze

:span[PUT]{.api-put} `/api/deploymentfreezes/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`End`** :span[string]{.type-label} *(required)*  
  Format `date-time`.
- **`Id`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 200.
- **`ProjectEnvironmentScope`** :span[object]{.type-label}
- **`RecurringSchedule`** :span[object]{.type-label}
  - **`EndAfterOccurrences`** :span[integer]{.type-label}
  - **`EndDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EndOnDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EndType`** :span[enum]{.type-label}  
    Allowed values: `Never`, `OnDate`, `AfterOccurrences`.
  - **`StartDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Daily`, `Weekly`, `Monthly`, `Annually`.
  - **`Unit`** :span[integer]{.type-label}
  - **`UserUtcOffsetInMinutes`** :span[integer]{.type-label}
- **`Start`** :span[string]{.type-label} *(required)*  
  Format `date-time`.
- **`TenantProjectEnvironmentScope`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label} *(required)*
  - **`ProjectId`** :span[string]{.type-label} *(required)*
  - **`TenantId`** :span[string]{.type-label} *(required)*

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

- **`Description`** :span[string]{.type-label}
- **`End`** :span[string]{.type-label}  
  Format `date-time`.
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectEnvironmentScope`** :span[object]{.type-label}
- **`RecurringSchedule`** :span[object]{.type-label}
  - **`EndAfterOccurrences`** :span[integer]{.type-label}
  - **`EndDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EndOnDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`EndType`** :span[enum]{.type-label}  
    Allowed values: `Never`, `OnDate`, `AfterOccurrences`.
  - **`StartDate`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Daily`, `Weekly`, `Monthly`, `Annually`.
  - **`Unit`** :span[integer]{.type-label}
  - **`UserUtcOffsetInMinutes`** :span[integer]{.type-label}
- **`Start`** :span[string]{.type-label}  
  Format `date-time`.
- **`TenantProjectEnvironmentScope`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}

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

## Delete a deployment freeze

:span[DELETE]{.api-delete} `/api/deploymentfreezes/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the DeploymentFreeze to delete.

**Response**

`200` — Success

## Override a deployment freeze to create a deployment

:span[POST]{.api-post} `/api/{spaceId}/deployments/override`

Also reachable at `/api/deployments/override`, `/api/spaces/{spaceIdentifier}/deployments/override`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`CreateDeploymentCommand`** :span[object]{.type-label} *(required)*
  - **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Changes`** :span[array of object]{.type-label}
  - **`ChangesMarkdown`** :span[string]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`Comments`** :span[string]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DebugMode`** :span[string]{.type-label}
  - **`DeployedBy`** :span[string]{.type-label}
  - **`DeployedById`** :span[string]{.type-label}
  - **`DeployedToMachineIds`** :span[array of string]{.type-label}
  - **`DeploymentProcessId`** :span[string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label} *(required)*
  - **`ExcludedMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`FailureEncountered`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`ForcePackageRedeployment`** :span[boolean]{.type-label}
  - **`FormValues`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ManifestVariableSetId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Priority`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`QueueTime`** :span[string]{.type-label}  
    If set this time will be the used to schedule the deployment to a later time, null is assumed to mean the time will be executed immediately. Format `date-time`.
  - **`QueueTimeExpiry`** :span[string]{.type-label}  
    Format `date-time`.
  - **`ReleaseId`** :span[string]{.type-label} *(required)*
  - **`SkipActions`** :span[array of string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`SpecificMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
  - **`SpecificTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`TaskId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
  - **`TentacleRetentionPeriod`** :span[object]{.type-label}
  - **`UseGuidedFailure`** :span[boolean]{.type-label}  
    If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.
- **`FreezeIds`** :span[array of string]{.type-label} *(required)*
- **`Reason`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`SpaceId`** :span[string]{.type-label} *(required)*

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

- **`Deployment`** :span[object]{.type-label}
  - **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Changes`** :span[array of object]{.type-label}
  - **`ChangesMarkdown`** :span[string]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`Comments`** :span[string]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DebugMode`** :span[string]{.type-label}
  - **`DeployedBy`** :span[string]{.type-label}
  - **`DeployedById`** :span[string]{.type-label}
  - **`DeployedToMachineIds`** :span[array of string]{.type-label}
  - **`DeploymentProcessId`** :span[string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ExcludedMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`FailureEncountered`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`ForcePackageRedeployment`** :span[boolean]{.type-label}
  - **`FormValues`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ManifestVariableSetId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Priority`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`QueueTime`** :span[string]{.type-label}  
    If set this time will be the used to schedule the deployment to a later time, null is assumed to mean the time will be executed immediately. Format `date-time`.
  - **`QueueTimeExpiry`** :span[string]{.type-label}  
    Format `date-time`.
  - **`ReleaseId`** :span[string]{.type-label}
  - **`SkipActions`** :span[array of string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`SpecificMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
  - **`SpecificTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`TaskId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
  - **`TentacleRetentionPeriod`** :span[object]{.type-label}
  - **`UseGuidedFailure`** :span[boolean]{.type-label}  
    If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

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
