---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployments
---

## Get a list of Deployments

`GET` `/api/{spaceId}/deployments`

Also reachable at `/api/deployments`, `/api/spaces/{spaceIdentifier}/deployments`.

Lists all of the Deployments in the supplied Space. The results will be sorted from most recent to least recent deployment.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space to which the Deployments belong.

- **`channels`** <span class="type-label">array of string</span> — Channel Ids to filter results to only Deployments with the given Channel Ids.
- **`environments`** <span class="type-label">array of string</span> — Environment Ids to filter results to only Deployments with the given Environment Ids.
- **`ids`** <span class="type-label">array of string</span> — Deployment Ids to filter results to only Deployments with the given Ids.
- **`partialName`** <span class="type-label">string</span> — A partial name, to limit the set of Deployments to those with a name that includes the partial name.
- **`projects`** <span class="type-label">array of string</span> — Project Ids to filter results to only Deployments with the given Project Ids.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`taskState`** <span class="type-label">enum</span> — Task State to filter results to only Deployments with the given Task State. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
- **`tenants`** <span class="type-label">array of string</span> — Tenant Ids to filter results to only Deployments with the given Tenant Ids.

**Response**

`200` — The requested Deployments

`DeploymentResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
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
      "Changes": [
        {}
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

## Create a Deployment

`POST` `/api/{spaceId}/deployments`

Also reachable at `/api/deployments`, `/api/spaces/{spaceIdentifier}/deployments`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateDeploymentCommand`

- **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Changes`** <span class="type-label">array of object</span>
  - **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Commits`** <span class="type-label">array of object</span> — Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span> — Aggregate of distinct work items from all VersionMetadata.
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
  - **`Steps`** <span class="type-label">array of object</span> *(required)*
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
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Request">

```json
{
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
      {
        "CorrelationId": "string",
        "Slug": "string"
      }
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
```
</div>

**Response**

`201` — Created

`DeploymentResource`.

- **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Changes`** <span class="type-label">array of object</span>
  - **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Commits`** <span class="type-label">array of object</span> — Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span> — Aggregate of distinct work items from all VersionMetadata.
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
  - **`Steps`** <span class="type-label">array of object</span>
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
      {
        "CorrelationId": "string",
        "Slug": "string"
      }
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
```
</div>

## Create a new tenanted deployment

`POST` `/api/{spaceId}/deployments/create/tenanted/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/deployments/create/tenanted/v1`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateDeploymentTenantedCommandV1`

- **`DebugMode`** <span class="type-label">string</span> — Contributes the OctopusPrintVariables and OctopusPrintEvaluatedVariables variables to the execution. One of "None", "Log" or "Debug"; leave unset for the default of "None".
- **`DeploymentFreezeNames`** <span class="type-label">array of string</span> — Active deployment freezes to override so this execution can proceed despite them. Overriding a freeze bypasses a deliberate block on deploying, so only set this when explicitly asked to. Requires DeploymentFreezeOverrideReason.
- **`DeploymentFreezeOverrideReason`** <span class="type-label">string</span> — Required, and must not be blank, whenever DeploymentFreezeNames is non-empty. Recorded against the override.
- **`EnvironmentName`** <span class="type-label">string</span> *(required)* — A single environment. To deploy to several, call the command once per environment.
- **`ExcludedMachineNames`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagNames`** <span class="type-label">array of string</span> — A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be excluded from the deployment.
- **`ForcePackageDownload`** <span class="type-label">boolean</span> — Whether to force downloading of already installed packages (flag, default false).
- **`ForcePackageRedeployment`** <span class="type-label">boolean</span> — If a project is configured to skip packages with already-installed versions, override this setting to force re-deployment (flag, default false).
- **`NoRunAfter`** <span class="type-label">string</span> — Time at which a scheduled execution should expire if it has not started, specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Only meaningful alongside RunAt. Format `date-time`.
- **`Priority`** <span class="type-label">string</span> — Whether this execution jumps the task queue ahead of other queued tasks. One of "LifecycleDefault" (use the lifecycle's configured setting), "On" or "Off".
- **`ProjectName`** <span class="type-label">string</span> *(required)*
- **`ReleaseVersion`** <span class="type-label">string</span> *(required)* — The version of an existing release, for example "1.2.3" — not a release ID. Minimum length 1.
- **`RunAt`** <span class="type-label">string</span> — Time at which the execution should start (scheduling it for later), specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Format `date-time`.
- **`SkipStepNames`** <span class="type-label">array of string</span> — Steps that are to be skipped for this execution. A name that matches no step is logged as a warning rather than failing the command, so check the step name carefully.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`SpaceIdOrName`** <span class="type-label">string</span> *(required)* — Both this and SpaceId are required, and normally hold the same space ID; set both.
- **`SpecificMachineNames`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed. A name that matches no machine fails the command.
- **`SpecificTargetTagNames`** <span class="type-label">array of string</span> — A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be included in the deployment.
- **`TenantTags`** <span class="type-label">array of string</span> — Tenant tags, in canonical "TagSetName/TagName" form, selecting the tenants to deploy for. Set this or Tenants — with both empty nothing is deployed and no error is raised.
- **`Tenants`** <span class="type-label">array of string</span> — The tenants to deploy for; one deployment is created per tenant. Set this or TenantTags — with both empty nothing is deployed and no error is raised. The single entry "*" means every tenant that can be deployed to this environment, which may be a very large number — only use it when explicitly asked to deploy to all tenants.
- **`UpdateVariableSnapshot`** <span class="type-label">boolean</span> — If set to true, the release's variable set snapshot is updated from the project's current variables before the deployment. This mutates the release itself, so it affects later deployments of it too — leave it unset unless refreshed variables were asked for.
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
  "EnvironmentName": "string",
  "ExcludedMachineNames": [
    "string"
  ],
  "ExcludedTargetTagNames": [
    "string"
  ],
  "ForcePackageDownload": true,
  "ForcePackageRedeployment": true,
  "NoRunAfter": "2020-01-01T00:00:00.000Z",
  "Priority": "string",
  "ProjectName": "string",
  "ReleaseVersion": "string",
  "RunAt": "2020-01-01T00:00:00.000Z",
  "SkipStepNames": [
    "string"
  ],
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
  "UpdateVariableSnapshot": true,
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

`200` — Server tasks associated with the newly-created Deployment

`CreateDeploymentTenantedResponseV1`.

- **`DeploymentServerTasks`** <span class="type-label">array of object</span>
  - **`DeploymentId`** <span class="type-label">string</span>
  - **`ServerTaskId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "DeploymentServerTasks": [
    {
      "DeploymentId": "string",
      "ServerTaskId": "string"
    }
  ]
}
```
</div>

## Create a new untenanted deployment

`POST` `/api/{spaceId}/deployments/create/untenanted/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/deployments/create/untenanted/v1`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateDeploymentUntenantedCommandV1`

- **`DebugMode`** <span class="type-label">string</span> — Contributes the OctopusPrintVariables and OctopusPrintEvaluatedVariables variables to the execution. One of "None", "Log" or "Debug"; leave unset for the default of "None".
- **`DeploymentFreezeNames`** <span class="type-label">array of string</span> — Active deployment freezes to override so this execution can proceed despite them. Overriding a freeze bypasses a deliberate block on deploying, so only set this when explicitly asked to. Requires DeploymentFreezeOverrideReason.
- **`DeploymentFreezeOverrideReason`** <span class="type-label">string</span> — Required, and must not be blank, whenever DeploymentFreezeNames is non-empty. Recorded against the override.
- **`EnvironmentNames`** <span class="type-label">array of string</span> *(required)* — One deployment is created per environment. Always name at least one: an empty list is not rejected, it simply deploys nothing and returns an empty list of deployments.
- **`ExcludedMachineNames`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagNames`** <span class="type-label">array of string</span> — A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be excluded from the deployment.
- **`ForcePackageDownload`** <span class="type-label">boolean</span> — Whether to force downloading of already installed packages (flag, default false).
- **`ForcePackageRedeployment`** <span class="type-label">boolean</span> — If a project is configured to skip packages with already-installed versions, override this setting to force re-deployment (flag, default false).
- **`NoRunAfter`** <span class="type-label">string</span> — Time at which a scheduled execution should expire if it has not started, specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Only meaningful alongside RunAt. Format `date-time`.
- **`Priority`** <span class="type-label">string</span> — Whether this execution jumps the task queue ahead of other queued tasks. One of "LifecycleDefault" (use the lifecycle's configured setting), "On" or "Off".
- **`ProjectName`** <span class="type-label">string</span> *(required)*
- **`ReleaseVersion`** <span class="type-label">string</span> *(required)* — The version of an existing release, for example "1.2.3" — not a release ID. Minimum length 1.
- **`RunAt`** <span class="type-label">string</span> — Time at which the execution should start (scheduling it for later), specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Format `date-time`.
- **`SkipStepNames`** <span class="type-label">array of string</span> — Steps that are to be skipped for this execution. A name that matches no step is logged as a warning rather than failing the command, so check the step name carefully.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`SpaceIdOrName`** <span class="type-label">string</span> *(required)* — Both this and SpaceId are required, and normally hold the same space ID; set both.
- **`SpecificMachineNames`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed. A name that matches no machine fails the command.
- **`SpecificTargetTagNames`** <span class="type-label">array of string</span> — A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be included in the deployment.
- **`UpdateVariableSnapshot`** <span class="type-label">boolean</span> — If set to true, the release's variable set snapshot is updated from the project's current variables before the deployment. This mutates the release itself, so it affects later deployments of it too — leave it unset unless refreshed variables were asked for.
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
  "ForcePackageRedeployment": true,
  "NoRunAfter": "2020-01-01T00:00:00.000Z",
  "Priority": "string",
  "ProjectName": "string",
  "ReleaseVersion": "string",
  "RunAt": "2020-01-01T00:00:00.000Z",
  "SkipStepNames": [
    "string"
  ],
  "SpaceId": "string",
  "SpaceIdOrName": "string",
  "SpecificMachineNames": [
    "string"
  ],
  "SpecificTargetTagNames": [
    "string"
  ],
  "UpdateVariableSnapshot": true,
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

`200` — Server tasks associated with the newly-created Deployment

`CreateDeploymentUntenantedResponseV1`.

- **`DeploymentServerTasks`** <span class="type-label">array of object</span>
  - **`DeploymentId`** <span class="type-label">string</span>
  - **`ServerTaskId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "DeploymentServerTasks": [
    {
      "DeploymentId": "string",
      "ServerTaskId": "string"
    }
  ]
}
```
</div>

## Create a Deployment

`POST` `/api/{spaceId}/deployments/v1`

Also reachable at `/api/deployments/v1`, `/api/spaces/{spaceIdentifier}/deployments/v1`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateDeploymentCommand`

- **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Changes`** <span class="type-label">array of object</span>
  - **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Commits`** <span class="type-label">array of object</span> — Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span> — Aggregate of distinct work items from all VersionMetadata.
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
  - **`Steps`** <span class="type-label">array of object</span> *(required)*
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
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

<div data-example="Request">

```json
{
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
      {
        "CorrelationId": "string",
        "Slug": "string"
      }
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
```
</div>

**Response**

`201` — Created

`CreateDeploymentResponse`.

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

## Get a Deployment by ID

`GET` `/api/{spaceId}/deployments/{id}`

Also reachable at `/api/deployments/{id}`, `/api/spaces/{spaceIdentifier}/deployments/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Deployment to load.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Deployment.

`DeploymentResource`.

- **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Changes`** <span class="type-label">array of object</span>
  - **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Commits`** <span class="type-label">array of object</span> — Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span> — Aggregate of distinct work items from all VersionMetadata.
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
  - **`Steps`** <span class="type-label">array of object</span>
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
      {
        "CorrelationId": "string",
        "Slug": "string"
      }
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
```
</div>

## Deletes an existing Deployment

`DELETE` `/api/{spaceId}/deployments/{id}`

Also reachable at `/api/deployments/{id}`, `/api/spaces/{spaceIdentifier}/deployments/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Deployment to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success
