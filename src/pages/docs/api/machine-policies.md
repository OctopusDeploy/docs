---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Machine Policies
---

## Get a paginated list of the Machine Policies in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

`GET` `/api/{spaceId}/machinepolicies`

Also reachable at `/api/machinepolicies`, `/api/spaces/{spaceIdentifier}/machinepolicies`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — Specific machine policy IDs to filter out.
- **`partialName`** <span class="type-label">string</span> — A partial machine policy name used for a sub-string search.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of the Machine Policies in the supplied Octopus Deploy Space (sorted alphabetically by name).

`MachinePolicyResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`ConnectionConnectTimeout`** <span class="type-label">string</span> — Format `date-span`.
  - **`ConnectionRetryCountLimit`** <span class="type-label">integer</span>
  - **`ConnectionRetrySleepInterval`** <span class="type-label">string</span> — Format `date-span`.
  - **`ConnectionRetryTimeLimit`** <span class="type-label">string</span> — Format `date-span`.
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDefault`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MachineCleanupPolicy`** <span class="type-label">object</span>
  - **`MachineConnectivityPolicy`** <span class="type-label">object</span>
  - **`MachineHealthCheckPolicy`** <span class="type-label">object</span>
  - **`MachinePackageCacheRetentionPolicy`** <span class="type-label">object</span>
  - **`MachineRpcCallRetryPolicy`** <span class="type-label">object</span>
  - **`MachineUpdatePolicy`** <span class="type-label">object</span>
  - **`Name`** <span class="type-label">string</span>
  - **`PollingRequestQueueTimeout`** <span class="type-label">string</span> — Format `date-span`.
  - **`SpaceId`** <span class="type-label">string</span>
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
      "ConnectionConnectTimeout": "string",
      "ConnectionRetryCountLimit": 0,
      "ConnectionRetrySleepInterval": "string",
      "ConnectionRetryTimeLimit": "string",
      "Description": "string",
      "Id": "string",
      "IsDefault": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "MachineCleanupPolicy": {
        "DeleteMachinesBehavior": "DoNotDelete",
        "DeleteMachinesElapsedTimeSpan": "string"
      },
      "MachineConnectivityPolicy": {
        "MachineConnectivityBehavior": "ExpectedToBeOnline"
      },
      "MachineHealthCheckPolicy": {
        "BashHealthCheckPolicy": {},
        "HealthCheckCron": "string",
        "HealthCheckCronTimezone": "string",
        "HealthCheckInterval": "string",
        "HealthCheckType": "RunScript",
        "PowerShellHealthCheckPolicy": {}
      },
      "MachinePackageCacheRetentionPolicy": {
        "PackageUnit": "Items",
        "QuantityOfPackagesToKeep": 0,
        "QuantityOfVersionsToKeep": 0,
        "Strategy": "Default",
        "VersionUnit": "Items"
      },
      "MachineRpcCallRetryPolicy": {
        "Enabled": true,
        "HealthCheckRetryDuration": "string",
        "RetryDuration": "string"
      },
      "MachineUpdatePolicy": {
        "CalamariUpdateBehavior": "UpdateOnDeployment",
        "KubernetesAgentUpdateBehavior": "NeverUpdate",
        "TentacleUpdateAccountId": "string",
        "TentacleUpdateBehavior": "NeverUpdate"
      },
      "Name": "string",
      "PollingRequestQueueTimeout": "string",
      "SpaceId": "string"
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

## Creates a new Machine Policy

`POST` `/api/{spaceId}/machinepolicies`

Also reachable at `/api/machinepolicies`, `/api/spaces/{spaceIdentifier}/machinepolicies`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateMachinePolicyCommand`

- **`ConnectionConnectTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryCountLimit`** <span class="type-label">integer</span>
- **`ConnectionRetrySleepInterval`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryTimeLimit`** <span class="type-label">string</span> — Format `date-span`.
- **`Description`** <span class="type-label">string</span>
- **`IsDefault`** <span class="type-label">boolean</span>
- **`MachineCleanupPolicy`** <span class="type-label">object</span>
  - **`DeleteMachinesBehavior`** <span class="type-label">enum</span> — Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineConnectivityPolicy`** <span class="type-label">object</span>
  - **`MachineConnectivityBehavior`** <span class="type-label">enum</span> — Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** <span class="type-label">object</span>
  - **`BashHealthCheckPolicy`** <span class="type-label">object</span>
  - **`HealthCheckCron`** <span class="type-label">string</span>
  - **`HealthCheckCronTimezone`** <span class="type-label">string</span>
  - **`HealthCheckInterval`** <span class="type-label">string</span> — Format `date-span`.
  - **`HealthCheckType`** <span class="type-label">enum</span> — Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** <span class="type-label">object</span>
- **`MachinePackageCacheRetentionPolicy`** <span class="type-label">object</span>
  - **`PackageUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** <span class="type-label">integer</span>
  - **`QuantityOfVersionsToKeep`** <span class="type-label">integer</span>
  - **`Strategy`** <span class="type-label">enum</span> — Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** <span class="type-label">object</span>
  - **`Enabled`** <span class="type-label">boolean</span>
  - **`HealthCheckRetryDuration`** <span class="type-label">string</span> — Format `date-span`.
  - **`RetryDuration`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineUpdatePolicy`** <span class="type-label">object</span>
  - **`CalamariUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** <span class="type-label">string</span>
  - **`TentacleUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`PollingRequestQueueTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`SpaceId`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "IsDefault": true,
  "MachineCleanupPolicy": {
    "DeleteMachinesBehavior": "DoNotDelete",
    "DeleteMachinesElapsedTimeSpan": "string"
  },
  "MachineConnectivityPolicy": {
    "MachineConnectivityBehavior": "ExpectedToBeOnline"
  },
  "MachineHealthCheckPolicy": {
    "BashHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    },
    "HealthCheckCron": "string",
    "HealthCheckCronTimezone": "string",
    "HealthCheckInterval": "string",
    "HealthCheckType": "RunScript",
    "PowerShellHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    }
  },
  "MachinePackageCacheRetentionPolicy": {
    "PackageUnit": "Items",
    "QuantityOfPackagesToKeep": 0,
    "QuantityOfVersionsToKeep": 0,
    "Strategy": "Default",
    "VersionUnit": "Items"
  },
  "MachineRpcCallRetryPolicy": {
    "Enabled": true,
    "HealthCheckRetryDuration": "string",
    "RetryDuration": "string"
  },
  "MachineUpdatePolicy": {
    "CalamariUpdateBehavior": "UpdateOnDeployment",
    "KubernetesAgentUpdateBehavior": "NeverUpdate",
    "TentacleUpdateAccountId": "string",
    "TentacleUpdateBehavior": "NeverUpdate"
  },
  "Name": "string",
  "PollingRequestQueueTimeout": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

`MachinePolicyResource`.

- **`ConnectionConnectTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryCountLimit`** <span class="type-label">integer</span>
- **`ConnectionRetrySleepInterval`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryTimeLimit`** <span class="type-label">string</span> — Format `date-span`.
- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MachineCleanupPolicy`** <span class="type-label">object</span>
  - **`DeleteMachinesBehavior`** <span class="type-label">enum</span> — Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineConnectivityPolicy`** <span class="type-label">object</span>
  - **`MachineConnectivityBehavior`** <span class="type-label">enum</span> — Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** <span class="type-label">object</span>
  - **`BashHealthCheckPolicy`** <span class="type-label">object</span>
  - **`HealthCheckCron`** <span class="type-label">string</span>
  - **`HealthCheckCronTimezone`** <span class="type-label">string</span>
  - **`HealthCheckInterval`** <span class="type-label">string</span> — Format `date-span`.
  - **`HealthCheckType`** <span class="type-label">enum</span> — Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** <span class="type-label">object</span>
- **`MachinePackageCacheRetentionPolicy`** <span class="type-label">object</span>
  - **`PackageUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** <span class="type-label">integer</span>
  - **`QuantityOfVersionsToKeep`** <span class="type-label">integer</span>
  - **`Strategy`** <span class="type-label">enum</span> — Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** <span class="type-label">object</span>
  - **`Enabled`** <span class="type-label">boolean</span>
  - **`HealthCheckRetryDuration`** <span class="type-label">string</span> — Format `date-span`.
  - **`RetryDuration`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineUpdatePolicy`** <span class="type-label">object</span>
  - **`CalamariUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** <span class="type-label">string</span>
  - **`TentacleUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`.
- **`Name`** <span class="type-label">string</span>
- **`PollingRequestQueueTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "Id": "string",
  "IsDefault": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MachineCleanupPolicy": {
    "DeleteMachinesBehavior": "DoNotDelete",
    "DeleteMachinesElapsedTimeSpan": "string"
  },
  "MachineConnectivityPolicy": {
    "MachineConnectivityBehavior": "ExpectedToBeOnline"
  },
  "MachineHealthCheckPolicy": {
    "BashHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    },
    "HealthCheckCron": "string",
    "HealthCheckCronTimezone": "string",
    "HealthCheckInterval": "string",
    "HealthCheckType": "RunScript",
    "PowerShellHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    }
  },
  "MachinePackageCacheRetentionPolicy": {
    "PackageUnit": "Items",
    "QuantityOfPackagesToKeep": 0,
    "QuantityOfVersionsToKeep": 0,
    "Strategy": "Default",
    "VersionUnit": "Items"
  },
  "MachineRpcCallRetryPolicy": {
    "Enabled": true,
    "HealthCheckRetryDuration": "string",
    "RetryDuration": "string"
  },
  "MachineUpdatePolicy": {
    "CalamariUpdateBehavior": "UpdateOnDeployment",
    "KubernetesAgentUpdateBehavior": "NeverUpdate",
    "TentacleUpdateAccountId": "string",
    "TentacleUpdateBehavior": "NeverUpdate"
  },
  "Name": "string",
  "PollingRequestQueueTimeout": "string",
  "SpaceId": "string"
}
```
</div>

## Get a list of Machine Policies

`GET` `/api/{spaceId}/machinepolicies/all`

Also reachable at `/api/machinepolicies/all`, `/api/spaces/{spaceIdentifier}/machinepolicies/all`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — All the Machine Policies in the supplied Octopus Deploy Space.

an array of `MachinePolicyResource`.

- **`ConnectionConnectTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryCountLimit`** <span class="type-label">integer</span>
- **`ConnectionRetrySleepInterval`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryTimeLimit`** <span class="type-label">string</span> — Format `date-span`.
- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MachineCleanupPolicy`** <span class="type-label">object</span>
  - **`DeleteMachinesBehavior`** <span class="type-label">enum</span> — Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineConnectivityPolicy`** <span class="type-label">object</span>
  - **`MachineConnectivityBehavior`** <span class="type-label">enum</span> — Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** <span class="type-label">object</span>
  - **`BashHealthCheckPolicy`** <span class="type-label">object</span>
  - **`HealthCheckCron`** <span class="type-label">string</span>
  - **`HealthCheckCronTimezone`** <span class="type-label">string</span>
  - **`HealthCheckInterval`** <span class="type-label">string</span> — Format `date-span`.
  - **`HealthCheckType`** <span class="type-label">enum</span> — Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** <span class="type-label">object</span>
- **`MachinePackageCacheRetentionPolicy`** <span class="type-label">object</span>
  - **`PackageUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** <span class="type-label">integer</span>
  - **`QuantityOfVersionsToKeep`** <span class="type-label">integer</span>
  - **`Strategy`** <span class="type-label">enum</span> — Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** <span class="type-label">object</span>
  - **`Enabled`** <span class="type-label">boolean</span>
  - **`HealthCheckRetryDuration`** <span class="type-label">string</span> — Format `date-span`.
  - **`RetryDuration`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineUpdatePolicy`** <span class="type-label">object</span>
  - **`CalamariUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** <span class="type-label">string</span>
  - **`TentacleUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`.
- **`Name`** <span class="type-label">string</span>
- **`PollingRequestQueueTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "ConnectionConnectTimeout": "string",
    "ConnectionRetryCountLimit": 0,
    "ConnectionRetrySleepInterval": "string",
    "ConnectionRetryTimeLimit": "string",
    "Description": "string",
    "Id": "string",
    "IsDefault": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "MachineCleanupPolicy": {
      "DeleteMachinesBehavior": "DoNotDelete",
      "DeleteMachinesElapsedTimeSpan": "string"
    },
    "MachineConnectivityPolicy": {
      "MachineConnectivityBehavior": "ExpectedToBeOnline"
    },
    "MachineHealthCheckPolicy": {
      "BashHealthCheckPolicy": {
        "RunType": "InheritFromDefault",
        "ScriptBody": "string"
      },
      "HealthCheckCron": "string",
      "HealthCheckCronTimezone": "string",
      "HealthCheckInterval": "string",
      "HealthCheckType": "RunScript",
      "PowerShellHealthCheckPolicy": {
        "RunType": "InheritFromDefault",
        "ScriptBody": "string"
      }
    },
    "MachinePackageCacheRetentionPolicy": {
      "PackageUnit": "Items",
      "QuantityOfPackagesToKeep": 0,
      "QuantityOfVersionsToKeep": 0,
      "Strategy": "Default",
      "VersionUnit": "Items"
    },
    "MachineRpcCallRetryPolicy": {
      "Enabled": true,
      "HealthCheckRetryDuration": "string",
      "RetryDuration": "string"
    },
    "MachineUpdatePolicy": {
      "CalamariUpdateBehavior": "UpdateOnDeployment",
      "KubernetesAgentUpdateBehavior": "NeverUpdate",
      "TentacleUpdateAccountId": "string",
      "TentacleUpdateBehavior": "NeverUpdate"
    },
    "Name": "string",
    "PollingRequestQueueTimeout": "string",
    "SpaceId": "string"
  }
]
```
</div>

## Gets a template for a new Machine Policy, which includes any defaults

`GET` `/api/{spaceId}/machinepolicies/template`

Also reachable at `/api/machinepolicies/template`, `/api/spaces/{spaceIdentifier}/machinepolicies/template`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Machine Policy Template

`MachinePolicyResource`.

- **`ConnectionConnectTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryCountLimit`** <span class="type-label">integer</span>
- **`ConnectionRetrySleepInterval`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryTimeLimit`** <span class="type-label">string</span> — Format `date-span`.
- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MachineCleanupPolicy`** <span class="type-label">object</span>
  - **`DeleteMachinesBehavior`** <span class="type-label">enum</span> — Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineConnectivityPolicy`** <span class="type-label">object</span>
  - **`MachineConnectivityBehavior`** <span class="type-label">enum</span> — Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** <span class="type-label">object</span>
  - **`BashHealthCheckPolicy`** <span class="type-label">object</span>
  - **`HealthCheckCron`** <span class="type-label">string</span>
  - **`HealthCheckCronTimezone`** <span class="type-label">string</span>
  - **`HealthCheckInterval`** <span class="type-label">string</span> — Format `date-span`.
  - **`HealthCheckType`** <span class="type-label">enum</span> — Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** <span class="type-label">object</span>
- **`MachinePackageCacheRetentionPolicy`** <span class="type-label">object</span>
  - **`PackageUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** <span class="type-label">integer</span>
  - **`QuantityOfVersionsToKeep`** <span class="type-label">integer</span>
  - **`Strategy`** <span class="type-label">enum</span> — Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** <span class="type-label">object</span>
  - **`Enabled`** <span class="type-label">boolean</span>
  - **`HealthCheckRetryDuration`** <span class="type-label">string</span> — Format `date-span`.
  - **`RetryDuration`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineUpdatePolicy`** <span class="type-label">object</span>
  - **`CalamariUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** <span class="type-label">string</span>
  - **`TentacleUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`.
- **`Name`** <span class="type-label">string</span>
- **`PollingRequestQueueTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "Id": "string",
  "IsDefault": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MachineCleanupPolicy": {
    "DeleteMachinesBehavior": "DoNotDelete",
    "DeleteMachinesElapsedTimeSpan": "string"
  },
  "MachineConnectivityPolicy": {
    "MachineConnectivityBehavior": "ExpectedToBeOnline"
  },
  "MachineHealthCheckPolicy": {
    "BashHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    },
    "HealthCheckCron": "string",
    "HealthCheckCronTimezone": "string",
    "HealthCheckInterval": "string",
    "HealthCheckType": "RunScript",
    "PowerShellHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    }
  },
  "MachinePackageCacheRetentionPolicy": {
    "PackageUnit": "Items",
    "QuantityOfPackagesToKeep": 0,
    "QuantityOfVersionsToKeep": 0,
    "Strategy": "Default",
    "VersionUnit": "Items"
  },
  "MachineRpcCallRetryPolicy": {
    "Enabled": true,
    "HealthCheckRetryDuration": "string",
    "RetryDuration": "string"
  },
  "MachineUpdatePolicy": {
    "CalamariUpdateBehavior": "UpdateOnDeployment",
    "KubernetesAgentUpdateBehavior": "NeverUpdate",
    "TentacleUpdateAccountId": "string",
    "TentacleUpdateBehavior": "NeverUpdate"
  },
  "Name": "string",
  "PollingRequestQueueTimeout": "string",
  "SpaceId": "string"
}
```
</div>

## Get a Machine Policy by ID

`GET` `/api/{spaceId}/machinepolicies/{id}`

Also reachable at `/api/machinepolicies/{id}`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Machine Policy.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested machine policy

`MachinePolicyResource`.

- **`ConnectionConnectTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryCountLimit`** <span class="type-label">integer</span>
- **`ConnectionRetrySleepInterval`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryTimeLimit`** <span class="type-label">string</span> — Format `date-span`.
- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MachineCleanupPolicy`** <span class="type-label">object</span>
  - **`DeleteMachinesBehavior`** <span class="type-label">enum</span> — Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineConnectivityPolicy`** <span class="type-label">object</span>
  - **`MachineConnectivityBehavior`** <span class="type-label">enum</span> — Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** <span class="type-label">object</span>
  - **`BashHealthCheckPolicy`** <span class="type-label">object</span>
  - **`HealthCheckCron`** <span class="type-label">string</span>
  - **`HealthCheckCronTimezone`** <span class="type-label">string</span>
  - **`HealthCheckInterval`** <span class="type-label">string</span> — Format `date-span`.
  - **`HealthCheckType`** <span class="type-label">enum</span> — Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** <span class="type-label">object</span>
- **`MachinePackageCacheRetentionPolicy`** <span class="type-label">object</span>
  - **`PackageUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** <span class="type-label">integer</span>
  - **`QuantityOfVersionsToKeep`** <span class="type-label">integer</span>
  - **`Strategy`** <span class="type-label">enum</span> — Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** <span class="type-label">object</span>
  - **`Enabled`** <span class="type-label">boolean</span>
  - **`HealthCheckRetryDuration`** <span class="type-label">string</span> — Format `date-span`.
  - **`RetryDuration`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineUpdatePolicy`** <span class="type-label">object</span>
  - **`CalamariUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** <span class="type-label">string</span>
  - **`TentacleUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`.
- **`Name`** <span class="type-label">string</span>
- **`PollingRequestQueueTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "Id": "string",
  "IsDefault": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MachineCleanupPolicy": {
    "DeleteMachinesBehavior": "DoNotDelete",
    "DeleteMachinesElapsedTimeSpan": "string"
  },
  "MachineConnectivityPolicy": {
    "MachineConnectivityBehavior": "ExpectedToBeOnline"
  },
  "MachineHealthCheckPolicy": {
    "BashHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    },
    "HealthCheckCron": "string",
    "HealthCheckCronTimezone": "string",
    "HealthCheckInterval": "string",
    "HealthCheckType": "RunScript",
    "PowerShellHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    }
  },
  "MachinePackageCacheRetentionPolicy": {
    "PackageUnit": "Items",
    "QuantityOfPackagesToKeep": 0,
    "QuantityOfVersionsToKeep": 0,
    "Strategy": "Default",
    "VersionUnit": "Items"
  },
  "MachineRpcCallRetryPolicy": {
    "Enabled": true,
    "HealthCheckRetryDuration": "string",
    "RetryDuration": "string"
  },
  "MachineUpdatePolicy": {
    "CalamariUpdateBehavior": "UpdateOnDeployment",
    "KubernetesAgentUpdateBehavior": "NeverUpdate",
    "TentacleUpdateAccountId": "string",
    "TentacleUpdateBehavior": "NeverUpdate"
  },
  "Name": "string",
  "PollingRequestQueueTimeout": "string",
  "SpaceId": "string"
}
```
</div>

## Modifies an existing Machine Policy

`PUT` `/api/{spaceId}/machinepolicies/{id}`

Also reachable at `/api/machinepolicies/{id}`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The Machine Policy ID.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The Space ID.

**Request Body**

`ModifyMachinePolicyCommand`

- **`ConnectionConnectTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryCountLimit`** <span class="type-label">integer</span>
- **`ConnectionRetrySleepInterval`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryTimeLimit`** <span class="type-label">string</span> — Format `date-span`.
- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> *(required)* — The Machine Policy ID.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`MachineCleanupPolicy`** <span class="type-label">object</span>
  - **`DeleteMachinesBehavior`** <span class="type-label">enum</span> — Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineConnectivityPolicy`** <span class="type-label">object</span>
  - **`MachineConnectivityBehavior`** <span class="type-label">enum</span> — Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** <span class="type-label">object</span>
  - **`BashHealthCheckPolicy`** <span class="type-label">object</span>
  - **`HealthCheckCron`** <span class="type-label">string</span>
  - **`HealthCheckCronTimezone`** <span class="type-label">string</span>
  - **`HealthCheckInterval`** <span class="type-label">string</span> — Format `date-span`.
  - **`HealthCheckType`** <span class="type-label">enum</span> — Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** <span class="type-label">object</span>
- **`MachinePackageCacheRetentionPolicy`** <span class="type-label">object</span>
  - **`PackageUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** <span class="type-label">integer</span>
  - **`QuantityOfVersionsToKeep`** <span class="type-label">integer</span>
  - **`Strategy`** <span class="type-label">enum</span> — Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** <span class="type-label">object</span>
  - **`Enabled`** <span class="type-label">boolean</span>
  - **`HealthCheckRetryDuration`** <span class="type-label">string</span> — Format `date-span`.
  - **`RetryDuration`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineUpdatePolicy`** <span class="type-label">object</span>
  - **`CalamariUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** <span class="type-label">string</span>
  - **`TentacleUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`PollingRequestQueueTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The Space ID.

<div data-example="Request">

```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "Id": "string",
  "IsDefault": true,
  "MachineCleanupPolicy": {
    "DeleteMachinesBehavior": "DoNotDelete",
    "DeleteMachinesElapsedTimeSpan": "string"
  },
  "MachineConnectivityPolicy": {
    "MachineConnectivityBehavior": "ExpectedToBeOnline"
  },
  "MachineHealthCheckPolicy": {
    "BashHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    },
    "HealthCheckCron": "string",
    "HealthCheckCronTimezone": "string",
    "HealthCheckInterval": "string",
    "HealthCheckType": "RunScript",
    "PowerShellHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    }
  },
  "MachinePackageCacheRetentionPolicy": {
    "PackageUnit": "Items",
    "QuantityOfPackagesToKeep": 0,
    "QuantityOfVersionsToKeep": 0,
    "Strategy": "Default",
    "VersionUnit": "Items"
  },
  "MachineRpcCallRetryPolicy": {
    "Enabled": true,
    "HealthCheckRetryDuration": "string",
    "RetryDuration": "string"
  },
  "MachineUpdatePolicy": {
    "CalamariUpdateBehavior": "UpdateOnDeployment",
    "KubernetesAgentUpdateBehavior": "NeverUpdate",
    "TentacleUpdateAccountId": "string",
    "TentacleUpdateBehavior": "NeverUpdate"
  },
  "Name": "string",
  "PollingRequestQueueTimeout": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Machine Policy was modified, containing the new Policy

`MachinePolicyResource`.

- **`ConnectionConnectTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryCountLimit`** <span class="type-label">integer</span>
- **`ConnectionRetrySleepInterval`** <span class="type-label">string</span> — Format `date-span`.
- **`ConnectionRetryTimeLimit`** <span class="type-label">string</span> — Format `date-span`.
- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MachineCleanupPolicy`** <span class="type-label">object</span>
  - **`DeleteMachinesBehavior`** <span class="type-label">enum</span> — Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineConnectivityPolicy`** <span class="type-label">object</span>
  - **`MachineConnectivityBehavior`** <span class="type-label">enum</span> — Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** <span class="type-label">object</span>
  - **`BashHealthCheckPolicy`** <span class="type-label">object</span>
  - **`HealthCheckCron`** <span class="type-label">string</span>
  - **`HealthCheckCronTimezone`** <span class="type-label">string</span>
  - **`HealthCheckInterval`** <span class="type-label">string</span> — Format `date-span`.
  - **`HealthCheckType`** <span class="type-label">enum</span> — Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** <span class="type-label">object</span>
- **`MachinePackageCacheRetentionPolicy`** <span class="type-label">object</span>
  - **`PackageUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** <span class="type-label">integer</span>
  - **`QuantityOfVersionsToKeep`** <span class="type-label">integer</span>
  - **`Strategy`** <span class="type-label">enum</span> — Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** <span class="type-label">enum</span> — Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** <span class="type-label">object</span>
  - **`Enabled`** <span class="type-label">boolean</span>
  - **`HealthCheckRetryDuration`** <span class="type-label">string</span> — Format `date-span`.
  - **`RetryDuration`** <span class="type-label">string</span> — Format `date-span`.
- **`MachineUpdatePolicy`** <span class="type-label">object</span>
  - **`CalamariUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** <span class="type-label">string</span>
  - **`TentacleUpdateBehavior`** <span class="type-label">enum</span> — Allowed values: `NeverUpdate`, `Update`.
- **`Name`** <span class="type-label">string</span>
- **`PollingRequestQueueTimeout`** <span class="type-label">string</span> — Format `date-span`.
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "Id": "string",
  "IsDefault": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "MachineCleanupPolicy": {
    "DeleteMachinesBehavior": "DoNotDelete",
    "DeleteMachinesElapsedTimeSpan": "string"
  },
  "MachineConnectivityPolicy": {
    "MachineConnectivityBehavior": "ExpectedToBeOnline"
  },
  "MachineHealthCheckPolicy": {
    "BashHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    },
    "HealthCheckCron": "string",
    "HealthCheckCronTimezone": "string",
    "HealthCheckInterval": "string",
    "HealthCheckType": "RunScript",
    "PowerShellHealthCheckPolicy": {
      "RunType": "InheritFromDefault",
      "ScriptBody": "string"
    }
  },
  "MachinePackageCacheRetentionPolicy": {
    "PackageUnit": "Items",
    "QuantityOfPackagesToKeep": 0,
    "QuantityOfVersionsToKeep": 0,
    "Strategy": "Default",
    "VersionUnit": "Items"
  },
  "MachineRpcCallRetryPolicy": {
    "Enabled": true,
    "HealthCheckRetryDuration": "string",
    "RetryDuration": "string"
  },
  "MachineUpdatePolicy": {
    "CalamariUpdateBehavior": "UpdateOnDeployment",
    "KubernetesAgentUpdateBehavior": "NeverUpdate",
    "TentacleUpdateAccountId": "string",
    "TentacleUpdateBehavior": "NeverUpdate"
  },
  "Name": "string",
  "PollingRequestQueueTimeout": "string",
  "SpaceId": "string"
}
```
</div>

## Deletes the specified Machine Policy

`DELETE` `/api/{spaceId}/machinepolicies/{id}`

Also reachable at `/api/machinepolicies/{id}`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Machine Policy to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Gets a paginated list of the machines that belong to the given Machine Policy

`GET` `/api/{spaceId}/machinepolicies/{id}/machines`

Also reachable at `/api/machinepolicies/{id}/machines`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}/machines`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Machine Policy.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 10. Minimum `0`.

**Response**

`200` — A paginated list of the machines that belong to the given Machine Policy

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

## Deletes the specified Machine Policy

`DELETE` `/api/{spaceId}/machinepolicies/{id}/v1`

Also reachable at `/api/machinepolicies/{id}/v1`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Machine Policy to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Machine Policy has been deleted

`DeleteMachinePolicyResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Gets a paginated list of the workers that belong to the given Machine Policy

`GET` `/api/{spaceId}/machinepolicies/{id}/workers`

Also reachable at `/api/machinepolicies/{id}/workers`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}/workers`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Machine Policy.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 10. Minimum `0`.

**Response**

`200` — A paginated list of the machines that belong to the given Machine Policy

`WorkerResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Architecture`** <span class="type-label">string</span>
  - **`Endpoint`** <span class="type-label">object</span>
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
  - **`ShellName`** <span class="type-label">string</span>
  - **`ShellVersion`** <span class="type-label">string</span>
  - **`SkipInitialHealthCheck`** <span class="type-label">boolean</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`StatusSummary`** <span class="type-label">string</span>
  - **`Thumbprint`** <span class="type-label">string</span>
  - **`Uri`** <span class="type-label">string</span>
  - **`WorkerPoolIds`** <span class="type-label">array of string</span>
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
      "ShellName": "string",
      "ShellVersion": "string",
      "SkipInitialHealthCheck": true,
      "Slug": "string",
      "SpaceId": "string",
      "StatusSummary": "string",
      "Thumbprint": "string",
      "Uri": "string",
      "WorkerPoolIds": [
        "string"
      ]
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
