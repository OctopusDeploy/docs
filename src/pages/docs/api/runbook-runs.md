---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Runbook Runs
---

## Gets a list of Runbook Runs

`GET` `/api/{spaceId}/projects/{projectId}/runbookRuns`

Also reachable at `/api/projects/{projectId}/runbookRuns`, `/api/runbookRuns`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookRuns`, `/api/spaces/{spaceIdentifier}/runbookRuns`, `/api/{spaceId}/runbookRuns`.

Lists all of the runbookRuns in the supplied Octopus Deploy Space, from projects, snapshots and environments accessible by the current user. The results will be sorted from most recent to least recent runbookRun.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`environments`** <span class="type-label">array of string</span> — Environment Ids to filter results to only Runbook Runs with the given Environment Ids.
- **`ids`** <span class="type-label">array of string</span> — Runbook Run Ids to filter results to only Runbook Runs with the given Ids.
- **`partialName`** <span class="type-label">string</span> — A partial name, to limit the set of Runbook Runs to those with a name that includes the partial name.
- **`projects`** <span class="type-label">array of string</span> — Project Ids to filter results to only Runbook Runs with the given Project Ids.
- **`runbooks`** <span class="type-label">array of string</span> — Runbook Ids to filter results to only Runbooks with the given Ids.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`taskState`** <span class="type-label">enum</span> — Task State to filter results to only Deployments with the given Task State. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
- **`tenants`** <span class="type-label">array of string</span> — Tenant Ids to filter results to only Runbook Runs with the given Tenant Ids.

**Response**

`200` — The requested list of Runbook Runs

`RunbookRunResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Comments`** <span class="type-label">string</span>
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`DebugMode`** <span class="type-label">string</span>
  - **`DeployedBy`** <span class="type-label">string</span>
  - **`DeployedById`** <span class="type-label">string</span>
  - **`DeployedToMachineIds`** <span class="type-label">array of string</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ExcludedMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** <span class="type-label">object</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`FailureEncountered`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`FormValues`** <span class="type-label">object</span>
  - **`FrozenRunbookProcessId`** <span class="type-label">string</span>
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
  - **`RunbookId`** <span class="type-label">string</span> — Minimum length 1.
  - **`RunbookName`** <span class="type-label">string</span>
  - **`RunbookSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
  - **`SkipActions`** <span class="type-label">array of string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`SpecificMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
  - **`SpecificTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`TaskId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
  - **`TentacleRetentionPeriod`** <span class="type-label">object</span>
  - **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.
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
      "ProjectId": "string",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
      "RunbookId": "string",
      "RunbookName": "string",
      "RunbookSnapshotId": "string",
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

## Creates a new Runbook Run

`POST` `/api/{spaceId}/projects/{projectId}/runbookRuns`

Also reachable at `/api/projects/{projectId}/runbookRuns`, `/api/runbookRuns`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookRuns`, `/api/spaces/{spaceIdentifier}/runbookRuns`, `/api/{spaceId}/runbookRuns`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateRunbookRunCommand`

- **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** <span class="type-label">string</span>
- **`DebugMode`** <span class="type-label">string</span>
- **`EnvironmentId`** <span class="type-label">string</span> *(required)*
- **`ExcludedMachineIds`** <span class="type-label">array of string</span>
- **`ExcludedTargetTagIds`** <span class="type-label">array of string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`FormValues`** <span class="type-label">object</span>
- **`Priority`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`QueueTime`** <span class="type-label">string</span> — Format `date-time`.
- **`QueueTimeExpiry`** <span class="type-label">string</span> — Format `date-time`.
- **`RunbookId`** <span class="type-label">string</span> *(required)*
- **`RunbookSnapshotId`** <span class="type-label">string</span> *(required)*
- **`SkipActions`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`SpecificMachineIds`** <span class="type-label">array of string</span>
- **`SpecificTargetTagIds`** <span class="type-label">array of string</span>
- **`TenantId`** <span class="type-label">string</span>
- **`UseGuidedFailure`** <span class="type-label">boolean</span>

<div data-example="Request">

```json
{
  "ChangeRequestSettings": [
    {
      "Type": "ServiceNow"
    }
  ],
  "Comments": "string",
  "DebugMode": "string",
  "EnvironmentId": "string",
  "ExcludedMachineIds": [
    "string"
  ],
  "ExcludedTargetTagIds": [
    "string"
  ],
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "FormValues": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Priority": "string",
  "ProjectId": "string",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "RunbookId": "string",
  "RunbookSnapshotId": "string",
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
  "TenantId": "string",
  "UseGuidedFailure": true
}
```
</div>

**Response**

`201` — Created

`RunbookRunResource`.

- **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** <span class="type-label">string</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`DebugMode`** <span class="type-label">string</span>
- **`DeployedBy`** <span class="type-label">string</span>
- **`DeployedById`** <span class="type-label">string</span>
- **`DeployedToMachineIds`** <span class="type-label">array of string</span>
- **`EnvironmentId`** <span class="type-label">string</span>
- **`ExcludedMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`ExecutionPlanLogContext`** <span class="type-label">object</span>
  - **`Steps`** <span class="type-label">array of object</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`FailureEncountered`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`FormValues`** <span class="type-label">object</span>
- **`FrozenRunbookProcessId`** <span class="type-label">string</span>
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
- **`RunbookId`** <span class="type-label">string</span> — Minimum length 1.
- **`RunbookName`** <span class="type-label">string</span>
- **`RunbookSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
- **`SkipActions`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`SpecificMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
- **`SpecificTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`TaskId`** <span class="type-label">string</span>
- **`TenantId`** <span class="type-label">string</span>
- **`TentacleRetentionPeriod`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Response">

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
  "EnvironmentId": "string",
  "ExcludedMachineIds": [
    "string"
  ],
  "ExcludedTargetTagIds": [
    "string"
  ],
  "ExecutionPlanLogContext": {
    "Steps": [
      {
        "CorrelationId": "string",
        "Slug": "string"
      }
    ]
  },
  "FailTargetDiscovery": true,
  "FailureEncountered": true,
  "ForcePackageDownload": true,
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
  "ProjectId": "string",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "RunbookId": "string",
  "RunbookName": "string",
  "RunbookSnapshotId": "string",
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
```
</div>

## Get a Runbook Run by ID

`GET` `/api/{spaceId}/projects/{projectId}/runbookRuns/{id}`

Also reachable at `/api/projects/{projectId}/runbookRuns/{id}`, `/api/runbookRuns/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookRuns/{id}`, `/api/spaces/{spaceIdentifier}/runbookRuns/{id}`, `/api/{spaceId}/runbookRuns/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook Run to load.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project to which the Runbook Run belongs.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space to which the Runbook Run belongs.

**Response**

`200` — The requested Runbook Run

`RunbookRunResource`.

- **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Comments`** <span class="type-label">string</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`DebugMode`** <span class="type-label">string</span>
- **`DeployedBy`** <span class="type-label">string</span>
- **`DeployedById`** <span class="type-label">string</span>
- **`DeployedToMachineIds`** <span class="type-label">array of string</span>
- **`EnvironmentId`** <span class="type-label">string</span>
- **`ExcludedMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`ExecutionPlanLogContext`** <span class="type-label">object</span>
  - **`Steps`** <span class="type-label">array of object</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`FailureEncountered`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`FormValues`** <span class="type-label">object</span>
- **`FrozenRunbookProcessId`** <span class="type-label">string</span>
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
- **`RunbookId`** <span class="type-label">string</span> — Minimum length 1.
- **`RunbookName`** <span class="type-label">string</span>
- **`RunbookSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
- **`SkipActions`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`SpecificMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
- **`SpecificTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
- **`TaskId`** <span class="type-label">string</span>
- **`TenantId`** <span class="type-label">string</span>
- **`TentacleRetentionPeriod`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Response">

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
  "EnvironmentId": "string",
  "ExcludedMachineIds": [
    "string"
  ],
  "ExcludedTargetTagIds": [
    "string"
  ],
  "ExecutionPlanLogContext": {
    "Steps": [
      {
        "CorrelationId": "string",
        "Slug": "string"
      }
    ]
  },
  "FailTargetDiscovery": true,
  "FailureEncountered": true,
  "ForcePackageDownload": true,
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
  "ProjectId": "string",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "RunbookId": "string",
  "RunbookName": "string",
  "RunbookSnapshotId": "string",
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
```
</div>

## Deletes an existing Runbook Run

`DELETE` `/api/{spaceId}/projects/{projectId}/runbookruns/{id}`

Also reachable at `/api/projects/{projectId}/runbookruns/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookruns/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook Run to delete.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project to which the Runbook Run belongs.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space to which the Runbook Run belongs.

**Response**

`200` — Success

## Create a new Runbook run based on an existing runbook run

`POST` `/api/{spaceId}/projects/{projectId}/runbookruns/{runbookRunId}/retry/v1`

Also reachable at `/api/projects/{projectId}/runbookruns/{runbookRunId}/retry/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookruns/{runbookRunId}/retry/v1`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`runbookRunId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Runbook run that was retried

`RetryGitRunbookRunResponse`.

- **`Resource`** <span class="type-label">object</span>
  - **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Comments`** <span class="type-label">string</span>
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`DebugMode`** <span class="type-label">string</span>
  - **`DeployedBy`** <span class="type-label">string</span>
  - **`DeployedById`** <span class="type-label">string</span>
  - **`DeployedToMachineIds`** <span class="type-label">array of string</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ExcludedMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** <span class="type-label">object</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`FailureEncountered`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`FormValues`** <span class="type-label">object</span>
  - **`FrozenRunbookProcessId`** <span class="type-label">string</span>
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
  - **`RunbookId`** <span class="type-label">string</span> — Minimum length 1.
  - **`RunbookName`** <span class="type-label">string</span>
  - **`RunbookSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
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
    "ProjectId": "string",
    "QueueTime": "2020-01-01T00:00:00.000Z",
    "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
    "RunbookId": "string",
    "RunbookName": "string",
    "RunbookSnapshotId": "string",
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

## Creates a new Runbook Run

`POST` `/api/{spaceId}/projects/{projectId}/{gitRef}/runbooks/{runbookId}/run/v1`

Also reachable at `/api/projects/{projectId}/{gitRef}/runbooks/{runbookId}/run/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/runbooks/{runbookId}/run/v1`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`runbookId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`RunGitRunbookCommand`

- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`Notes`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`RunbookId`** <span class="type-label">string</span> *(required)*
- **`Runs`** <span class="type-label">array of object</span> *(required)*
  - **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Comments`** <span class="type-label">string</span>
  - **`DebugMode`** <span class="type-label">string</span>
  - **`EnvironmentId`** <span class="type-label">string</span> *(required)*
  - **`ExcludedMachineIds`** <span class="type-label">array of string</span>
  - **`ExcludedTargetTagIds`** <span class="type-label">array of string</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`FormValues`** <span class="type-label">object</span>
  - **`Priority`** <span class="type-label">string</span>
  - **`QueueTime`** <span class="type-label">string</span> — Format `date-time`.
  - **`QueueTimeExpiry`** <span class="type-label">string</span> — Format `date-time`.
  - **`SkipActions`** <span class="type-label">array of string</span>
  - **`SpecificMachineIds`** <span class="type-label">array of string</span>
  - **`SpecificTargetTagIds`** <span class="type-label">array of string</span>
  - **`TenantId`** <span class="type-label">string</span>
  - **`UseGuidedFailure`** <span class="type-label">boolean</span>
- **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`GitReferenceResource`** <span class="type-label">object</span> *(required)*
  - **`GitResourceReferenceName`** <span class="type-label">string</span>
- **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "GitRef": "string",
  "Notes": "string",
  "ProjectId": "string",
  "RunbookId": "string",
  "Runs": [
    {
      "ChangeRequestSettings": [
        {}
      ],
      "Comments": "string",
      "DebugMode": "string",
      "EnvironmentId": "string",
      "ExcludedMachineIds": [
        "string"
      ],
      "ExcludedTargetTagIds": [
        "string"
      ],
      "FailTargetDiscovery": true,
      "ForcePackageDownload": true,
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
      "TenantId": "string",
      "UseGuidedFailure": true
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
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — The newly-created Runbook run

`RunGitRunbookResponse`.

- **`Resources`** <span class="type-label">array of object</span>
  - **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Comments`** <span class="type-label">string</span>
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`DebugMode`** <span class="type-label">string</span>
  - **`DeployedBy`** <span class="type-label">string</span>
  - **`DeployedById`** <span class="type-label">string</span>
  - **`DeployedToMachineIds`** <span class="type-label">array of string</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ExcludedMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** <span class="type-label">object</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`FailureEncountered`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`FormValues`** <span class="type-label">object</span>
  - **`FrozenRunbookProcessId`** <span class="type-label">string</span>
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
  - **`RunbookId`** <span class="type-label">string</span> — Minimum length 1.
  - **`RunbookName`** <span class="type-label">string</span>
  - **`RunbookSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
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
      "ProjectId": "string",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
      "RunbookId": "string",
      "RunbookName": "string",
      "RunbookSnapshotId": "string",
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
  ]
}
```
</div>

## Create a new runbook run

`POST` `/api/{spaceId}/runbook-runs/create/v1`

Also reachable at `/api/runbook-runs/create/v1`, `/api/spaces/{spaceIdentifier}/runbook-runs/create/v1`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateRunbookRunCommandV1`

- **`DebugMode`** <span class="type-label">string</span> — Contributes the OctopusPrintVariables and OctopusPrintEvaluatedVariables variables to the execution. One of "None", "Log" or "Debug"; leave unset for the default of "None".
- **`DeploymentFreezeNames`** <span class="type-label">array of string</span> — Active deployment freezes to override so this execution can proceed despite them. Overriding a freeze bypasses a deliberate block on deploying, so only set this when explicitly asked to. Requires DeploymentFreezeOverrideReason.
- **`DeploymentFreezeOverrideReason`** <span class="type-label">string</span> — Required, and must not be blank, whenever DeploymentFreezeNames is non-empty. Recorded against the override.
- **`EnvironmentNames`** <span class="type-label">array of string</span> *(required)*
- **`ExcludedMachineNames`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagNames`** <span class="type-label">array of string</span> — A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be excluded from the deployment.
- **`ForcePackageDownload`** <span class="type-label">boolean</span> — Whether to force downloading of already installed packages (flag, default false).
- **`NoRunAfter`** <span class="type-label">string</span> — Time at which a scheduled execution should expire if it has not started, specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Only meaningful alongside RunAt. Format `date-time`.
- **`Priority`** <span class="type-label">string</span> — Whether this execution jumps the task queue ahead of other queued tasks. One of "LifecycleDefault" (use the lifecycle's configured setting), "On" or "Off".
- **`ProjectName`** <span class="type-label">string</span> *(required)*
- **`RunAt`** <span class="type-label">string</span> — Time at which the execution should start (scheduling it for later), specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Format `date-time`.
- **`RunbookName`** <span class="type-label">string</span> *(required)*
- **`SkipStepNames`** <span class="type-label">array of string</span> — Steps that are to be skipped for this execution. A name that matches no step is logged as a warning rather than failing the command, so check the step name carefully.
- **`Snapshot`** <span class="type-label">string</span> — Name or ID of the snapshot to run. If not supplied, the command will attempt to use the published snapshot.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`SpaceIdOrName`** <span class="type-label">string</span> *(required)* — Both this and SpaceId are required, and normally hold the same space ID; set both.
- **`SpecificMachineNames`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed. A name that matches no machine fails the command.
- **`SpecificTargetTagNames`** <span class="type-label">array of string</span> — A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be included in the deployment.
- **`TenantTags`** <span class="type-label">array of string</span> — The tenant tags to filter tenants to deploy.
- **`Tenants`** <span class="type-label">array of string</span> — The tenants to deploy.
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.
- **`Variables`** <span class="type-label">object</span> — Name/value pairs for prompted variables. A prompted variable that is required and has no value supplied here fails the command, naming the variable.

<div data-example="Request">

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
  "ForcePackageDownload": true,
  "NoRunAfter": "2020-01-01T00:00:00.000Z",
  "Priority": "string",
  "ProjectName": "string",
  "RunAt": "2020-01-01T00:00:00.000Z",
  "RunbookName": "string",
  "SkipStepNames": [
    "string"
  ],
  "Snapshot": "string",
  "SpaceId": "string",
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
  "UseGuidedFailure": true,
  "Variables": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>

**Response**

`200` — Server tasks associated with the newly-created Runbook Run

`CreateRunbookRunResponseV1`.

- **`RunbookRunServerTasks`** <span class="type-label">array of object</span>
  - **`RunbookRunId`** <span class="type-label">string</span>
  - **`ServerTaskId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "RunbookRunServerTasks": [
    {
      "RunbookRunId": "string",
      "ServerTaskId": "string"
    }
  ]
}
```
</div>

## Deletes an existing Runbook Run

`DELETE` `/api/{spaceId}/runbookruns/{id}`

Also reachable at `/api/runbookruns/{id}`, `/api/spaces/{spaceIdentifier}/runbookruns/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook Run to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space to which the Runbook Run belongs.

**Response**

`200` — Success
