---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployments
---

## Get a list of Deployments

:span[GET]{.api-get} `/api/{spaceId}/deployments`

Also reachable at `/api/deployments`, `/api/spaces/{spaceIdentifier}/deployments`.

Lists all of the Deployments in the supplied Space. The results will be sorted from most recent to least recent deployment.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space to which the Deployments belong.

**Query Parameters**

- **`channels`** :span[array of string]{.type-label}  
  Channel Ids to filter results to only Deployments with the given Channel Ids.
- **`environments`** :span[array of string]{.type-label}  
  Environment Ids to filter results to only Deployments with the given Environment Ids.
- **`ids`** :span[array of string]{.type-label}  
  Deployment Ids to filter results to only Deployments with the given Ids.
- **`partialName`** :span[string]{.type-label}  
  A partial name, to limit the set of Deployments to those with a name that includes the partial name.
- **`projects`** :span[array of string]{.type-label}  
  Project Ids to filter results to only Deployments with the given Project Ids.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`taskState`** :span[enum]{.type-label}  
  Task State to filter results to only Deployments with the given Task State.  
  Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
- **`tenants`** :span[array of string]{.type-label}  
  Tenant Ids to filter results to only Deployments with the given Tenant Ids.

**Response**

`200` — The requested Deployments

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
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
:::

## Create a Deployment

:span[POST]{.api-post} `/api/{spaceId}/deployments`

Also reachable at `/api/deployments`, `/api/spaces/{spaceIdentifier}/deployments`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Changes`** :span[array of object]{.type-label}
  - **`BuildInformation`** :span[array of object]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}  
    Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}  
    Aggregate of distinct work items from all VersionMetadata.
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
  - **`Steps`** :span[array of object]{.type-label} *(required)*
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
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Changes`** :span[array of object]{.type-label}
  - **`BuildInformation`** :span[array of object]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}  
    Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}  
    Aggregate of distinct work items from all VersionMetadata.
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
  - **`Steps`** :span[array of object]{.type-label}
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
:::

## Create a new tenanted deployment

:span[POST]{.api-post} `/api/{spaceId}/deployments/create/tenanted/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/deployments/create/tenanted/v1`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`DebugMode`** :span[string]{.type-label}  
  Contributes the OctopusPrintVariables and OctopusPrintEvaluatedVariables variables to the execution. One of "None", "Log" or "Debug"; leave unset for the default of "None".
- **`DeploymentFreezeNames`** :span[array of string]{.type-label}  
  Active deployment freezes to override so this execution can proceed despite them. Overriding a freeze bypasses a deliberate block on deploying, so only set this when explicitly asked to. Requires DeploymentFreezeOverrideReason.
- **`DeploymentFreezeOverrideReason`** :span[string]{.type-label}  
  Required, and must not be blank, whenever DeploymentFreezeNames is non-empty. Recorded against the override.
- **`EnvironmentName`** :span[string]{.type-label} *(required)*  
  A single environment. To deploy to several, call the command once per environment.
- **`ExcludedMachineNames`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagNames`** :span[array of string]{.type-label}  
  A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be excluded from the deployment.
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Whether to force downloading of already installed packages (flag, default false).
- **`ForcePackageRedeployment`** :span[boolean]{.type-label}  
  If a project is configured to skip packages with already-installed versions, override this setting to force re-deployment (flag, default false).
- **`NoRunAfter`** :span[string]{.type-label}  
  Time at which a scheduled execution should expire if it has not started, specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Only meaningful alongside RunAt. Format `date-time`.
- **`Priority`** :span[string]{.type-label}  
  Whether this execution jumps the task queue ahead of other queued tasks. One of "LifecycleDefault" (use the lifecycle's configured setting), "On" or "Off".
- **`ProjectName`** :span[string]{.type-label} *(required)*
- **`ReleaseVersion`** :span[string]{.type-label} *(required)*  
  The version of an existing release, for example "1.2.3" — not a release ID. Minimum length 1.
- **`RunAt`** :span[string]{.type-label}  
  Time at which the execution should start (scheduling it for later), specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Format `date-time`.
- **`SkipStepNames`** :span[array of string]{.type-label}  
  Steps that are to be skipped for this execution. A name that matches no step is logged as a warning rather than failing the command, so check the step name carefully.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`SpaceIdOrName`** :span[string]{.type-label} *(required)*  
  Both this and SpaceId are required, and normally hold the same space ID; set both.
- **`SpecificMachineNames`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed. A name that matches no machine fails the command.
- **`SpecificTargetTagNames`** :span[array of string]{.type-label}  
  A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be included in the deployment.
- **`TenantTags`** :span[array of string]{.type-label}  
  Tenant tags, in canonical "TagSetName/TagName" form, selecting the tenants to deploy for. Set this or Tenants — with both empty nothing is deployed and no error is raised.
- **`Tenants`** :span[array of string]{.type-label}  
  The tenants to deploy for; one deployment is created per tenant. Set this or TenantTags — with both empty nothing is deployed and no error is raised. The single entry "*" means every tenant that can be deployed to this environment, which may be a very large number — only use it when explicitly asked to deploy to all tenants.
- **`UpdateVariableSnapshot`** :span[boolean]{.type-label}  
  If set to true, the release's variable set snapshot is updated from the project's current variables before the deployment. This mutates the release itself, so it affects later deployments of it too — leave it unset unless refreshed variables were asked for.
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
:::

**Response**

`200` — Server tasks associated with the newly-created Deployment

- **`DeploymentServerTasks`** :span[array of object]{.type-label}
  - **`DeploymentId`** :span[string]{.type-label}
  - **`ServerTaskId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Create a new untenanted deployment

:span[POST]{.api-post} `/api/{spaceId}/deployments/create/untenanted/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/deployments/create/untenanted/v1`.

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
  One deployment is created per environment. Always name at least one: an empty list is not rejected, it simply deploys nothing and returns an empty list of deployments.
- **`ExcludedMachineNames`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be excluded from the deployment.
- **`ExcludedTargetTagNames`** :span[array of string]{.type-label}  
  A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be excluded from the deployment.
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Whether to force downloading of already installed packages (flag, default false).
- **`ForcePackageRedeployment`** :span[boolean]{.type-label}  
  If a project is configured to skip packages with already-installed versions, override this setting to force re-deployment (flag, default false).
- **`NoRunAfter`** :span[string]{.type-label}  
  Time at which a scheduled execution should expire if it has not started, specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Only meaningful alongside RunAt. Format `date-time`.
- **`Priority`** :span[string]{.type-label}  
  Whether this execution jumps the task queue ahead of other queued tasks. One of "LifecycleDefault" (use the lifecycle's configured setting), "On" or "Off".
- **`ProjectName`** :span[string]{.type-label} *(required)*
- **`ReleaseVersion`** :span[string]{.type-label} *(required)*  
  The version of an existing release, for example "1.2.3" — not a release ID. Minimum length 1.
- **`RunAt`** :span[string]{.type-label}  
  Time at which the execution should start (scheduling it for later), specified as any valid DateTimeOffset format, and assuming the time zone is the current local time zone. Format `date-time`.
- **`SkipStepNames`** :span[array of string]{.type-label}  
  Steps that are to be skipped for this execution. A name that matches no step is logged as a warning rather than failing the command, so check the step name carefully.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`SpaceIdOrName`** :span[string]{.type-label} *(required)*  
  Both this and SpaceId are required, and normally hold the same space ID; set both.
- **`SpecificMachineNames`** :span[array of string]{.type-label}  
  A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed. A name that matches no machine fails the command.
- **`SpecificTargetTagNames`** :span[array of string]{.type-label}  
  A collection of deployment target tags (canonical names in format TagSetName/TagName) that should be included in the deployment.
- **`UpdateVariableSnapshot`** :span[boolean]{.type-label}  
  If set to true, the release's variable set snapshot is updated from the project's current variables before the deployment. This mutates the release itself, so it affects later deployments of it too — leave it unset unless refreshed variables were asked for.
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
:::

**Response**

`200` — Server tasks associated with the newly-created Deployment

- **`DeploymentServerTasks`** :span[array of object]{.type-label}
  - **`DeploymentId`** :span[string]{.type-label}
  - **`ServerTaskId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Create a Deployment

:span[POST]{.api-post} `/api/{spaceId}/deployments/v1`

Also reachable at `/api/deployments/v1`, `/api/spaces/{spaceIdentifier}/deployments/v1`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Changes`** :span[array of object]{.type-label}
  - **`BuildInformation`** :span[array of object]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}  
    Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}  
    Aggregate of distinct work items from all VersionMetadata.
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
  - **`Steps`** :span[array of object]{.type-label} *(required)*
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
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`UseGuidedFailure`** :span[boolean]{.type-label}  
  If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.

:::api-example{label="Request"}
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
:::

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

:::api-example{label="Response"}
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
:::

## Get a Deployment by ID

:span[GET]{.api-get} `/api/{spaceId}/deployments/{id}`

Also reachable at `/api/deployments/{id}`, `/api/spaces/{spaceIdentifier}/deployments/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Deployment to load.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Deployment.

- **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `ServiceNow`, `JiraServiceManagement`.
- **`Changes`** :span[array of object]{.type-label}
  - **`BuildInformation`** :span[array of object]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}  
    Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}  
    Aggregate of distinct work items from all VersionMetadata.
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
  - **`Steps`** :span[array of object]{.type-label}
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
:::

## Delete an existing Deployment

:span[DELETE]{.api-delete} `/api/{spaceId}/deployments/{id}`

Also reachable at `/api/deployments/{id}`, `/api/spaces/{spaceIdentifier}/deployments/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Deployment to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success
