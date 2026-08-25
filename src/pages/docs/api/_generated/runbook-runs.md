---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Runbook Runs
---

## Get a list of Runbook Runs

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookRuns"}

Also reachable at `/api/projects/{projectId}/runbookRuns`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookRuns`.

Lists all of the runbookRuns in the supplied Octopus Deploy Space, from projects, snapshots and environments accessible by the current user. The results will be sorted from most recent to least recent runbookRun.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`environments`** :span[array of string]{.type-label}  
  Environment Ids to filter results to only Runbook Runs with the given Environment Ids.
- **`ids`** :span[array of string]{.type-label}  
  Runbook Run Ids to filter results to only Runbook Runs with the given Ids.
- **`partialName`** :span[string]{.type-label}  
  A partial name, to limit the set of Runbook Runs to those with a name that includes the partial name.
- **`projects`** :span[array of string]{.type-label}  
  Project Ids to filter results to only Runbook Runs with the given Project Ids.
- **`runbooks`** :span[array of string]{.type-label}  
  Runbook Ids to filter results to only Runbooks with the given Ids.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`taskState`** :span[enum]{.type-label}  
  Task State to filter results to only Deployments with the given Task State.  
  Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
- **`tenants`** :span[array of string]{.type-label}  
  Tenant Ids to filter results to only Runbook Runs with the given Tenant Ids.

**Response**

`200` — The requested list of Runbook Runs

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Comments`** :span[string]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DebugMode`** :span[string]{.type-label}
  - **`DeployedBy`** :span[string]{.type-label}
  - **`DeployedById`** :span[string]{.type-label}
  - **`DeployedToMachineIds`** :span[array of string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ExcludedMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`FailureEncountered`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`FormValues`** :span[object]{.type-label}
  - **`FrozenRunbookProcessId`** :span[string]{.type-label}
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
  - **`RunbookId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RunbookName`** :span[string]{.type-label}
  - **`RunbookSnapshotId`** :span[string]{.type-label}  
    Minimum length 1.
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
      "ChangeRequestSettings": [
        {}
      ],
      "Comments": "string",
      "Created": "2020-01-01T00:00:00.000Z",
      "DebugMode": "string",
      "DeployedBy": "string",
      "DeployedById": "string",
      "DeployedToMachineIds": [
        "string"
      ],
      "EnvironmentId": "Environments-1",
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
      "FailTargetDiscovery": false,
      "FailureEncountered": false,
      "ForcePackageDownload": false,
      "FormValues": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "FrozenRunbookProcessId": "string",
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
      "ProjectId": "Projects-1",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
      "RunbookId": "string",
      "RunbookName": "string",
      "RunbookSnapshotId": "string",
      "SkipActions": [
        "string"
      ],
      "SpaceId": "Spaces-1",
      "SpecificMachineIds": [
        "string"
      ],
      "SpecificTargetTagIds": [
        "string"
      ],
      "TaskId": "ServerTasks-1",
      "TenantId": "Tenants-1",
      "TentacleRetentionPeriod": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      },
      "UseGuidedFailure": false
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

## Create a new Runbook Run

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/runbookRuns"}

Also reachable at `/api/projects/{projectId}/runbookRuns`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookRuns`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** :span[string]{.type-label}
- **`DebugMode`** :span[string]{.type-label}
- **`EnvironmentId`** :span[string]{.type-label} *(required)*
- **`ExcludedMachineIds`** :span[array of string]{.type-label}
- **`ExcludedTargetTagIds`** :span[array of string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`FormValues`** :span[object]{.type-label}
- **`Priority`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`QueueTime`** :span[string]{.type-label}  
  Format `date-time`.
- **`QueueTimeExpiry`** :span[string]{.type-label}  
  Format `date-time`.
- **`RunbookId`** :span[string]{.type-label} *(required)*
- **`RunbookSnapshotId`** :span[string]{.type-label} *(required)*
- **`SkipActions`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`SpecificMachineIds`** :span[array of string]{.type-label}
- **`SpecificTargetTagIds`** :span[array of string]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`UseGuidedFailure`** :span[boolean]{.type-label}

:::api-example{label="Request"}
```json
{
  "ChangeRequestSettings": [
    {
      "Type": "ServiceNow"
    }
  ],
  "Comments": "string",
  "DebugMode": "string",
  "EnvironmentId": "Environments-1",
  "ExcludedMachineIds": [
    "string"
  ],
  "ExcludedTargetTagIds": [
    "string"
  ],
  "FailTargetDiscovery": false,
  "ForcePackageDownload": false,
  "FormValues": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Priority": "string",
  "ProjectId": "Projects-1",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "RunbookId": "Runbooks-1",
  "RunbookSnapshotId": "string",
  "SkipActions": [
    "string"
  ],
  "SpaceId": "Spaces-1",
  "SpecificMachineIds": [
    "string"
  ],
  "SpecificTargetTagIds": [
    "string"
  ],
  "TenantId": "Tenants-1",
  "UseGuidedFailure": false
}
```
:::

**Response**

`201` — Created

- **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** :span[string]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DebugMode`** :span[string]{.type-label}
- **`DeployedBy`** :span[string]{.type-label}
- **`DeployedById`** :span[string]{.type-label}
- **`DeployedToMachineIds`** :span[array of string]{.type-label}
- **`EnvironmentId`** :span[string]{.type-label}
- **`ExcludedMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`Steps`** :span[array of object]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`FailureEncountered`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`FormValues`** :span[object]{.type-label}
- **`FrozenRunbookProcessId`** :span[string]{.type-label}
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
- **`RunbookId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookName`** :span[string]{.type-label}
- **`RunbookSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`SkipActions`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`SpecificMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
- **`SpecificTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`TaskId`** :span[string]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`TentacleRetentionPeriod`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

:::api-example{label="Response"}
```json
{
  "ChangeRequestSettings": [
    {
      "Type": "ServiceNow"
    }
  ],
  "Comments": "string",
  "Created": "2020-01-01T00:00:00.000Z",
  "DebugMode": "string",
  "DeployedBy": "string",
  "DeployedById": "string",
  "DeployedToMachineIds": [
    "string"
  ],
  "EnvironmentId": "Environments-1",
  "ExcludedMachineIds": [
    "string"
  ],
  "ExcludedTargetTagIds": [
    "string"
  ],
  "ExecutionPlanLogContext": {
    "Steps": [
      {
        "CorrelationId": "0c5a872485ac4b10857939a92d082e67",
        "Slug": "string"
      }
    ]
  },
  "FailTargetDiscovery": false,
  "FailureEncountered": false,
  "ForcePackageDownload": false,
  "FormValues": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "FrozenRunbookProcessId": "string",
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
  "ProjectId": "Projects-1",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "RunbookId": "string",
  "RunbookName": "string",
  "RunbookSnapshotId": "string",
  "SkipActions": [
    "string"
  ],
  "SpaceId": "Spaces-1",
  "SpecificMachineIds": [
    "string"
  ],
  "SpecificTargetTagIds": [
    "string"
  ],
  "TaskId": "ServerTasks-1",
  "TenantId": "Tenants-1",
  "TentacleRetentionPeriod": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  },
  "UseGuidedFailure": false
}
```
:::

## Get a Runbook Run by ID

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookRuns/\{id\}"}

Also reachable at `/api/projects/{projectId}/runbookRuns/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookRuns/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Run to load.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project to which the Runbook Run belongs.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space to which the Runbook Run belongs.

**Response**

`200` — The requested Runbook Run

- **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** :span[string]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DebugMode`** :span[string]{.type-label}
- **`DeployedBy`** :span[string]{.type-label}
- **`DeployedById`** :span[string]{.type-label}
- **`DeployedToMachineIds`** :span[array of string]{.type-label}
- **`EnvironmentId`** :span[string]{.type-label}
- **`ExcludedMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`Steps`** :span[array of object]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`FailureEncountered`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`FormValues`** :span[object]{.type-label}
- **`FrozenRunbookProcessId`** :span[string]{.type-label}
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
- **`RunbookId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookName`** :span[string]{.type-label}
- **`RunbookSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`SkipActions`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`SpecificMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
- **`SpecificTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`TaskId`** :span[string]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`TentacleRetentionPeriod`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

:::api-example{label="Response"}
```json
{
  "ChangeRequestSettings": [
    {
      "Type": "ServiceNow"
    }
  ],
  "Comments": "string",
  "Created": "2020-01-01T00:00:00.000Z",
  "DebugMode": "string",
  "DeployedBy": "string",
  "DeployedById": "string",
  "DeployedToMachineIds": [
    "string"
  ],
  "EnvironmentId": "Environments-1",
  "ExcludedMachineIds": [
    "string"
  ],
  "ExcludedTargetTagIds": [
    "string"
  ],
  "ExecutionPlanLogContext": {
    "Steps": [
      {
        "CorrelationId": "0c5a872485ac4b10857939a92d082e67",
        "Slug": "string"
      }
    ]
  },
  "FailTargetDiscovery": false,
  "FailureEncountered": false,
  "ForcePackageDownload": false,
  "FormValues": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "FrozenRunbookProcessId": "string",
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
  "ProjectId": "Projects-1",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "RunbookId": "string",
  "RunbookName": "string",
  "RunbookSnapshotId": "string",
  "SkipActions": [
    "string"
  ],
  "SpaceId": "Spaces-1",
  "SpecificMachineIds": [
    "string"
  ],
  "SpecificTargetTagIds": [
    "string"
  ],
  "TaskId": "ServerTasks-1",
  "TenantId": "Tenants-1",
  "TentacleRetentionPeriod": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  },
  "UseGuidedFailure": false
}
```
:::

## Delete an existing Runbook Run

:endpoint{method="DELETE" path="/api/\{spaceId\}/projects/\{projectId\}/runbookruns/\{id\}"}

Also reachable at `/api/projects/{projectId}/runbookruns/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookruns/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Run to delete.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project to which the Runbook Run belongs.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space to which the Runbook Run belongs.

**Response**

`200` — Success

## Create a new Runbook run based on an existing runbook run

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/runbookruns/\{runbookRunId\}/retry/v1"}

Also reachable at `/api/projects/{projectId}/runbookruns/{runbookRunId}/retry/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookruns/{runbookRunId}/retry/v1`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`runbookRunId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Runbook run that was retried

- **`Resource`** :span[object]{.type-label}
  - **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Comments`** :span[string]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DebugMode`** :span[string]{.type-label}
  - **`DeployedBy`** :span[string]{.type-label}
  - **`DeployedById`** :span[string]{.type-label}
  - **`DeployedToMachineIds`** :span[array of string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ExcludedMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`FailureEncountered`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`FormValues`** :span[object]{.type-label}
  - **`FrozenRunbookProcessId`** :span[string]{.type-label}
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
  - **`RunbookId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RunbookName`** :span[string]{.type-label}
  - **`RunbookSnapshotId`** :span[string]{.type-label}  
    Minimum length 1.
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

:::api-example{label="Response"}
```json
{
  "Resource": {
    "ChangeRequestSettings": [
      {
        "Type": "ServiceNow"
      }
    ],
    "Comments": "string",
    "Created": "2020-01-01T00:00:00.000Z",
    "DebugMode": "string",
    "DeployedBy": "string",
    "DeployedById": "string",
    "DeployedToMachineIds": [
      "string"
    ],
    "EnvironmentId": "Environments-1",
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
    "FailTargetDiscovery": false,
    "FailureEncountered": false,
    "ForcePackageDownload": false,
    "FormValues": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "FrozenRunbookProcessId": "string",
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
    "ProjectId": "Projects-1",
    "QueueTime": "2020-01-01T00:00:00.000Z",
    "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
    "RunbookId": "string",
    "RunbookName": "string",
    "RunbookSnapshotId": "string",
    "SkipActions": [
      "string"
    ],
    "SpaceId": "Spaces-1",
    "SpecificMachineIds": [
      "string"
    ],
    "SpecificTargetTagIds": [
      "string"
    ],
    "TaskId": "ServerTasks-1",
    "TenantId": "Tenants-1",
    "TentacleRetentionPeriod": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": false,
      "Strategy": "string",
      "Unit": "Days"
    },
    "UseGuidedFailure": false
  }
}
```
:::

## Create a new Runbook Run

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/runbooks/\{runbookId\}/run/v1"}

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{runbookId}/run/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{runbookId}/run/v1`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`runbookId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`GitRef`** :span[string]{.type-label} *(required)*
- **`Notes`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`RunbookId`** :span[string]{.type-label} *(required)*
- **`Runs`** :span[array of object]{.type-label} *(required)*
  - **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Comments`** :span[string]{.type-label}
  - **`DebugMode`** :span[string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label} *(required)*
  - **`ExcludedMachineIds`** :span[array of string]{.type-label}
  - **`ExcludedTargetTagIds`** :span[array of string]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`FormValues`** :span[object]{.type-label}
  - **`Priority`** :span[string]{.type-label}
  - **`QueueTime`** :span[string]{.type-label}  
    Format `date-time`.
  - **`QueueTimeExpiry`** :span[string]{.type-label}  
    Format `date-time`.
  - **`SkipActions`** :span[array of string]{.type-label}
  - **`SpecificMachineIds`** :span[array of string]{.type-label}
  - **`SpecificTargetTagIds`** :span[array of string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
  - **`UseGuidedFailure`** :span[boolean]{.type-label}
- **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label} *(required)*
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "GitRef": "string",
  "Notes": "string",
  "ProjectId": "Projects-1",
  "RunbookId": "Runbooks-1",
  "Runs": [
    {
      "ChangeRequestSettings": [
        {}
      ],
      "Comments": "string",
      "DebugMode": "string",
      "EnvironmentId": "Environments-1",
      "ExcludedMachineIds": [
        "string"
      ],
      "ExcludedTargetTagIds": [
        "string"
      ],
      "FailTargetDiscovery": false,
      "ForcePackageDownload": false,
      "FormValues": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Priority": "string",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
      "SkipActions": [
        "string"
      ],
      "SpecificMachineIds": [
        "string"
      ],
      "SpecificTargetTagIds": [
        "string"
      ],
      "TenantId": "Tenants-1",
      "UseGuidedFailure": false
    }
  ],
  "SelectedGitResources": [
    {
      "ActionName": "string",
      "GitReferenceResource": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "GitResourceReferenceName": "string"
    }
  ],
  "SelectedPackages": [
    {
      "ActionName": "string",
      "PackageReferenceName": "string",
      "StepName": "string",
      "Version": "string"
    }
  ],
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — The newly-created Runbook run

- **`Resources`** :span[array of object]{.type-label}
  - **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Comments`** :span[string]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DebugMode`** :span[string]{.type-label}
  - **`DeployedBy`** :span[string]{.type-label}
  - **`DeployedById`** :span[string]{.type-label}
  - **`DeployedToMachineIds`** :span[array of string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ExcludedMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`FailureEncountered`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`FormValues`** :span[object]{.type-label}
  - **`FrozenRunbookProcessId`** :span[string]{.type-label}
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
  - **`RunbookId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RunbookName`** :span[string]{.type-label}
  - **`RunbookSnapshotId`** :span[string]{.type-label}  
    Minimum length 1.
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

:::api-example{label="Response"}
```json
{
  "Resources": [
    {
      "ChangeRequestSettings": [
        {}
      ],
      "Comments": "string",
      "Created": "2020-01-01T00:00:00.000Z",
      "DebugMode": "string",
      "DeployedBy": "string",
      "DeployedById": "string",
      "DeployedToMachineIds": [
        "string"
      ],
      "EnvironmentId": "Environments-1",
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
      "FailTargetDiscovery": false,
      "FailureEncountered": false,
      "ForcePackageDownload": false,
      "FormValues": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "FrozenRunbookProcessId": "string",
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
      "ProjectId": "Projects-1",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
      "RunbookId": "string",
      "RunbookName": "string",
      "RunbookSnapshotId": "string",
      "SkipActions": [
        "string"
      ],
      "SpaceId": "Spaces-1",
      "SpecificMachineIds": [
        "string"
      ],
      "SpecificTargetTagIds": [
        "string"
      ],
      "TaskId": "ServerTasks-1",
      "TenantId": "Tenants-1",
      "TentacleRetentionPeriod": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      },
      "UseGuidedFailure": false
    }
  ]
}
```
:::

## Create a new runbook run

:endpoint{method="POST" path="/api/\{spaceId\}/runbook-runs/create/v1"}

Also reachable at `/api/runbook-runs/create/v1`, `/api/spaces/{spaceIdentifier}/runbook-runs/create/v1`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`DebugMode`** :span[string]{.type-label}  
  Contributes the OctopusPrintVariables and OctopusPrintEvaluatedVariables variables to the execution. One of "None", "Log" or "Debug"; leave unset for the default of "None".
- **`DeploymentFreezeNames`** :span[array of string]{.type-label}  
  Active deployment freezes to override so this execution can proceed despite them. Overriding a freeze bypasses a deliberate block on deploying, so only set this when explicitly asked to. Requires DeploymentFreezeOverrideReason.
- **`DeploymentFreezeOverrideReason`** :span[string]{.type-label}  
  Required, and must not be blank, whenever DeploymentFreezeNames is non-empty. Recorded against the override.
- **`EnvironmentNames`** :span[array of string]{.type-label} *(required)*
- **`ExcludedMachineNames`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagNames`** :span[array of string]{.type-label}  
  A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be excluded from the deployment.
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Whether to force downloading of already installed packages (flag, default false).
- **`NoRunAfter`** :span[string]{.type-label}  
  Time at which a scheduled execution should expire if it has not started, specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Only meaningful alongside RunAt. Format `date-time`.
- **`Priority`** :span[string]{.type-label}  
  Whether this execution jumps the task queue ahead of other queued tasks. One of "LifecycleDefault" (use the lifecycle's configured setting), "On" or "Off".
- **`ProjectName`** :span[string]{.type-label} *(required)*
- **`RunAt`** :span[string]{.type-label}  
  Time at which the execution should start (scheduling it for later), specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Format `date-time`.
- **`RunbookName`** :span[string]{.type-label} *(required)*
- **`SkipStepNames`** :span[array of string]{.type-label}  
  Steps that are to be skipped for this execution. A name that matches no step is logged as a warning rather than failing the command, so check the step name carefully.
- **`Snapshot`** :span[string]{.type-label}  
  Name or ID of the snapshot to run. If not supplied, the command will attempt to use the published snapshot.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`SpaceIdOrName`** :span[string]{.type-label} *(required)*  
  Both this and SpaceId are required, and normally hold the same space ID; set both.
- **`SpecificMachineNames`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed. A name that matches no machine fails the command.
- **`SpecificTargetTagNames`** :span[array of string]{.type-label}  
  A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be included in the deployment.
- **`TenantTags`** :span[array of string]{.type-label}  
  The tenant tags to filter tenants to deploy.
- **`Tenants`** :span[array of string]{.type-label}  
  The tenants to deploy.
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.
- **`Variables`** :span[object]{.type-label}  
  Name/value pairs for prompted variables. A prompted variable that is required and has no value supplied here fails the command, naming the variable.

:::api-example{label="Request"}
```json
{
  "DebugMode": "string",
  "DeploymentFreezeNames": [
    "string"
  ],
  "DeploymentFreezeOverrideReason": "string",
  "EnvironmentNames": [
    "string"
  ],
  "ExcludedMachineNames": [
    "string"
  ],
  "ExcludedTargetTagNames": [
    "string"
  ],
  "ForcePackageDownload": false,
  "NoRunAfter": "2020-01-01T00:00:00.000Z",
  "Priority": "string",
  "ProjectName": "string",
  "RunAt": "2020-01-01T00:00:00.000Z",
  "RunbookName": "string",
  "SkipStepNames": [
    "string"
  ],
  "Snapshot": "string",
  "SpaceId": "Spaces-1",
  "SpaceIdOrName": "string",
  "SpecificMachineNames": [
    "string"
  ],
  "SpecificTargetTagNames": [
    "string"
  ],
  "TenantTags": [
    "string"
  ],
  "Tenants": [
    "string"
  ],
  "UseGuidedFailure": false,
  "Variables": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
:::

**Response**

`200` — Server tasks associated with the newly-created Runbook Run

- **`RunbookRunServerTasks`** :span[array of object]{.type-label}
  - **`RunbookRunId`** :span[string]{.type-label}
  - **`ServerTaskId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "RunbookRunServerTasks": [
    {
      "RunbookRunId": "RunbookRuns-1",
      "ServerTaskId": "ServerTasks-1"
    }
  ]
}
```
:::

## Get a list of Runbook Runs

:endpoint{method="GET" path="/api/\{spaceId\}/runbookRuns"}

Also reachable at `/api/runbookRuns`, `/api/spaces/{spaceIdentifier}/runbookRuns`.

Lists all of the runbookRuns in the supplied Octopus Deploy Space, from projects, snapshots and environments accessible by the current user. The results will be sorted from most recent to least recent runbookRun.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`environments`** :span[array of string]{.type-label}  
  Environment Ids to filter results to only Runbook Runs with the given Environment Ids.
- **`ids`** :span[array of string]{.type-label}  
  Runbook Run Ids to filter results to only Runbook Runs with the given Ids.
- **`partialName`** :span[string]{.type-label}  
  A partial name, to limit the set of Runbook Runs to those with a name that includes the partial name.
- **`projects`** :span[array of string]{.type-label}  
  Project Ids to filter results to only Runbook Runs with the given Project Ids.
- **`runbooks`** :span[array of string]{.type-label}  
  Runbook Ids to filter results to only Runbooks with the given Ids.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`taskState`** :span[enum]{.type-label}  
  Task State to filter results to only Deployments with the given Task State.  
  Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
- **`tenants`** :span[array of string]{.type-label}  
  Tenant Ids to filter results to only Runbook Runs with the given Tenant Ids.

**Response**

`200` — The requested list of Runbook Runs

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Comments`** :span[string]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DebugMode`** :span[string]{.type-label}
  - **`DeployedBy`** :span[string]{.type-label}
  - **`DeployedById`** :span[string]{.type-label}
  - **`DeployedToMachineIds`** :span[array of string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ExcludedMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`FailureEncountered`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`FormValues`** :span[object]{.type-label}
  - **`FrozenRunbookProcessId`** :span[string]{.type-label}
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
  - **`RunbookId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RunbookName`** :span[string]{.type-label}
  - **`RunbookSnapshotId`** :span[string]{.type-label}  
    Minimum length 1.
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
      "ChangeRequestSettings": [
        {}
      ],
      "Comments": "string",
      "Created": "2020-01-01T00:00:00.000Z",
      "DebugMode": "string",
      "DeployedBy": "string",
      "DeployedById": "string",
      "DeployedToMachineIds": [
        "string"
      ],
      "EnvironmentId": "Environments-1",
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
      "FailTargetDiscovery": false,
      "FailureEncountered": false,
      "ForcePackageDownload": false,
      "FormValues": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "FrozenRunbookProcessId": "string",
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
      "ProjectId": "Projects-1",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
      "RunbookId": "string",
      "RunbookName": "string",
      "RunbookSnapshotId": "string",
      "SkipActions": [
        "string"
      ],
      "SpaceId": "Spaces-1",
      "SpecificMachineIds": [
        "string"
      ],
      "SpecificTargetTagIds": [
        "string"
      ],
      "TaskId": "ServerTasks-1",
      "TenantId": "Tenants-1",
      "TentacleRetentionPeriod": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      },
      "UseGuidedFailure": false
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

## Create a new Runbook Run

:endpoint{method="POST" path="/api/\{spaceId\}/runbookRuns"}

Also reachable at `/api/runbookRuns`, `/api/spaces/{spaceIdentifier}/runbookRuns`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** :span[string]{.type-label}
- **`DebugMode`** :span[string]{.type-label}
- **`EnvironmentId`** :span[string]{.type-label} *(required)*
- **`ExcludedMachineIds`** :span[array of string]{.type-label}
- **`ExcludedTargetTagIds`** :span[array of string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`FormValues`** :span[object]{.type-label}
- **`Priority`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`QueueTime`** :span[string]{.type-label}  
  Format `date-time`.
- **`QueueTimeExpiry`** :span[string]{.type-label}  
  Format `date-time`.
- **`RunbookId`** :span[string]{.type-label} *(required)*
- **`RunbookSnapshotId`** :span[string]{.type-label} *(required)*
- **`SkipActions`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`SpecificMachineIds`** :span[array of string]{.type-label}
- **`SpecificTargetTagIds`** :span[array of string]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`UseGuidedFailure`** :span[boolean]{.type-label}

:::api-example{label="Request"}
```json
{
  "ChangeRequestSettings": [
    {
      "Type": "ServiceNow"
    }
  ],
  "Comments": "string",
  "DebugMode": "string",
  "EnvironmentId": "Environments-1",
  "ExcludedMachineIds": [
    "string"
  ],
  "ExcludedTargetTagIds": [
    "string"
  ],
  "FailTargetDiscovery": false,
  "ForcePackageDownload": false,
  "FormValues": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Priority": "string",
  "ProjectId": "Projects-1",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "RunbookId": "Runbooks-1",
  "RunbookSnapshotId": "string",
  "SkipActions": [
    "string"
  ],
  "SpaceId": "Spaces-1",
  "SpecificMachineIds": [
    "string"
  ],
  "SpecificTargetTagIds": [
    "string"
  ],
  "TenantId": "Tenants-1",
  "UseGuidedFailure": false
}
```
:::

**Response**

`201` — Created

- **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** :span[string]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DebugMode`** :span[string]{.type-label}
- **`DeployedBy`** :span[string]{.type-label}
- **`DeployedById`** :span[string]{.type-label}
- **`DeployedToMachineIds`** :span[array of string]{.type-label}
- **`EnvironmentId`** :span[string]{.type-label}
- **`ExcludedMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`Steps`** :span[array of object]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`FailureEncountered`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`FormValues`** :span[object]{.type-label}
- **`FrozenRunbookProcessId`** :span[string]{.type-label}
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
- **`RunbookId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookName`** :span[string]{.type-label}
- **`RunbookSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`SkipActions`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`SpecificMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
- **`SpecificTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`TaskId`** :span[string]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`TentacleRetentionPeriod`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

:::api-example{label="Response"}
```json
{
  "ChangeRequestSettings": [
    {
      "Type": "ServiceNow"
    }
  ],
  "Comments": "string",
  "Created": "2020-01-01T00:00:00.000Z",
  "DebugMode": "string",
  "DeployedBy": "string",
  "DeployedById": "string",
  "DeployedToMachineIds": [
    "string"
  ],
  "EnvironmentId": "Environments-1",
  "ExcludedMachineIds": [
    "string"
  ],
  "ExcludedTargetTagIds": [
    "string"
  ],
  "ExecutionPlanLogContext": {
    "Steps": [
      {
        "CorrelationId": "0c5a872485ac4b10857939a92d082e67",
        "Slug": "string"
      }
    ]
  },
  "FailTargetDiscovery": false,
  "FailureEncountered": false,
  "ForcePackageDownload": false,
  "FormValues": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "FrozenRunbookProcessId": "string",
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
  "ProjectId": "Projects-1",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "RunbookId": "string",
  "RunbookName": "string",
  "RunbookSnapshotId": "string",
  "SkipActions": [
    "string"
  ],
  "SpaceId": "Spaces-1",
  "SpecificMachineIds": [
    "string"
  ],
  "SpecificTargetTagIds": [
    "string"
  ],
  "TaskId": "ServerTasks-1",
  "TenantId": "Tenants-1",
  "TentacleRetentionPeriod": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  },
  "UseGuidedFailure": false
}
```
:::

## Get a Runbook Run by ID

:endpoint{method="GET" path="/api/\{spaceId\}/runbookRuns/\{id\}"}

Also reachable at `/api/runbookRuns/{id}`, `/api/spaces/{spaceIdentifier}/runbookRuns/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Run to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space to which the Runbook Run belongs.

**Query Parameters**

- **`projectId`** :span[string]{.type-label}  
  ID of the Project to which the Runbook Run belongs.

**Response**

`200` — The requested Runbook Run

- **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** :span[string]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DebugMode`** :span[string]{.type-label}
- **`DeployedBy`** :span[string]{.type-label}
- **`DeployedById`** :span[string]{.type-label}
- **`DeployedToMachineIds`** :span[array of string]{.type-label}
- **`EnvironmentId`** :span[string]{.type-label}
- **`ExcludedMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`Steps`** :span[array of object]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`FailureEncountered`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`FormValues`** :span[object]{.type-label}
- **`FrozenRunbookProcessId`** :span[string]{.type-label}
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
- **`RunbookId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookName`** :span[string]{.type-label}
- **`RunbookSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`SkipActions`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`SpecificMachineIds`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
- **`SpecificTargetTagIds`** :span[array of string]{.type-label}  
  A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`TaskId`** :span[string]{.type-label}
- **`TenantId`** :span[string]{.type-label}
- **`TentacleRetentionPeriod`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

:::api-example{label="Response"}
```json
{
  "ChangeRequestSettings": [
    {
      "Type": "ServiceNow"
    }
  ],
  "Comments": "string",
  "Created": "2020-01-01T00:00:00.000Z",
  "DebugMode": "string",
  "DeployedBy": "string",
  "DeployedById": "string",
  "DeployedToMachineIds": [
    "string"
  ],
  "EnvironmentId": "Environments-1",
  "ExcludedMachineIds": [
    "string"
  ],
  "ExcludedTargetTagIds": [
    "string"
  ],
  "ExecutionPlanLogContext": {
    "Steps": [
      {
        "CorrelationId": "0c5a872485ac4b10857939a92d082e67",
        "Slug": "string"
      }
    ]
  },
  "FailTargetDiscovery": false,
  "FailureEncountered": false,
  "ForcePackageDownload": false,
  "FormValues": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "FrozenRunbookProcessId": "string",
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
  "ProjectId": "Projects-1",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "RunbookId": "string",
  "RunbookName": "string",
  "RunbookSnapshotId": "string",
  "SkipActions": [
    "string"
  ],
  "SpaceId": "Spaces-1",
  "SpecificMachineIds": [
    "string"
  ],
  "SpecificTargetTagIds": [
    "string"
  ],
  "TaskId": "ServerTasks-1",
  "TenantId": "Tenants-1",
  "TentacleRetentionPeriod": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  },
  "UseGuidedFailure": false
}
```
:::

## Delete an existing Runbook Run

:endpoint{method="DELETE" path="/api/\{spaceId\}/runbookruns/\{id\}"}

Also reachable at `/api/runbookruns/{id}`, `/api/spaces/{spaceIdentifier}/runbookruns/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Run to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space to which the Runbook Run belongs.

**Response**

`200` — Success
