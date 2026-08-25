---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-20
title: Machine Policies
---

## Get a paginated list of the Machine Policies in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

:endpoint{method="GET" path="/api/\{spaceId\}/machinepolicies"}

Also reachable at `/api/machinepolicies`, `/api/spaces/{spaceIdentifier}/machinepolicies`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  Specific machine policy IDs to filter out.
- **`partialName`** :span[string]{.type-label}  
  A partial machine policy name used for a sub-string search.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of the Machine Policies in the supplied Octopus Deploy Space (sorted alphabetically by name).

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ConnectionConnectTimeout`** :span[string]{.type-label}  
    Format `date-span`.
  - **`ConnectionRetryCountLimit`** :span[integer]{.type-label}
  - **`ConnectionRetrySleepInterval`** :span[string]{.type-label}  
    Format `date-span`.
  - **`ConnectionRetryTimeLimit`** :span[string]{.type-label}  
    Format `date-span`.
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDefault`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`MachineCleanupPolicy`** :span[object]{.type-label}
  - **`MachineConnectivityPolicy`** :span[object]{.type-label}
  - **`MachineHealthCheckPolicy`** :span[object]{.type-label}
  - **`MachinePackageCacheRetentionPolicy`** :span[object]{.type-label}
  - **`MachineRpcCallRetryPolicy`** :span[object]{.type-label}
  - **`MachineUpdatePolicy`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`PollingRequestQueueTimeout`** :span[string]{.type-label}  
    Format `date-span`.
  - **`SpaceId`** :span[string]{.type-label}
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
      "ConnectionConnectTimeout": "string",
      "ConnectionRetryCountLimit": 0,
      "ConnectionRetrySleepInterval": "string",
      "ConnectionRetryTimeLimit": "string",
      "Description": "string",
      "Id": "string",
      "IsDefault": false,
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
        "Enabled": false,
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
      "SpaceId": "Spaces-1"
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

## Create a new Machine Policy

:endpoint{method="POST" path="/api/\{spaceId\}/machinepolicies"}

Also reachable at `/api/machinepolicies`, `/api/spaces/{spaceIdentifier}/machinepolicies`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ConnectionConnectTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryCountLimit`** :span[integer]{.type-label}
- **`ConnectionRetrySleepInterval`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryTimeLimit`** :span[string]{.type-label}  
  Format `date-span`.
- **`Description`** :span[string]{.type-label}
- **`IsDefault`** :span[boolean]{.type-label}
- **`MachineCleanupPolicy`** :span[object]{.type-label}
  - **`DeleteMachinesBehavior`** :span[enum]{.type-label}  
    Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineConnectivityPolicy`** :span[object]{.type-label}
  - **`MachineConnectivityBehavior`** :span[enum]{.type-label}  
    Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** :span[object]{.type-label}
  - **`BashHealthCheckPolicy`** :span[object]{.type-label}
  - **`HealthCheckCron`** :span[string]{.type-label}
  - **`HealthCheckCronTimezone`** :span[string]{.type-label}
  - **`HealthCheckInterval`** :span[string]{.type-label}  
    Format `date-span`.
  - **`HealthCheckType`** :span[enum]{.type-label}  
    Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** :span[object]{.type-label}
- **`MachinePackageCacheRetentionPolicy`** :span[object]{.type-label}
  - **`PackageUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** :span[integer]{.type-label}
  - **`QuantityOfVersionsToKeep`** :span[integer]{.type-label}
  - **`Strategy`** :span[enum]{.type-label}  
    Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** :span[object]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
  - **`HealthCheckRetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
  - **`RetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineUpdatePolicy`** :span[object]{.type-label}
  - **`CalamariUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** :span[string]{.type-label}
  - **`TentacleUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`PollingRequestQueueTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "IsDefault": false,
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
    "Enabled": false,
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
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`201` — Created

- **`ConnectionConnectTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryCountLimit`** :span[integer]{.type-label}
- **`ConnectionRetrySleepInterval`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryTimeLimit`** :span[string]{.type-label}  
  Format `date-span`.
- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MachineCleanupPolicy`** :span[object]{.type-label}
  - **`DeleteMachinesBehavior`** :span[enum]{.type-label}  
    Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineConnectivityPolicy`** :span[object]{.type-label}
  - **`MachineConnectivityBehavior`** :span[enum]{.type-label}  
    Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** :span[object]{.type-label}
  - **`BashHealthCheckPolicy`** :span[object]{.type-label}
  - **`HealthCheckCron`** :span[string]{.type-label}
  - **`HealthCheckCronTimezone`** :span[string]{.type-label}
  - **`HealthCheckInterval`** :span[string]{.type-label}  
    Format `date-span`.
  - **`HealthCheckType`** :span[enum]{.type-label}  
    Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** :span[object]{.type-label}
- **`MachinePackageCacheRetentionPolicy`** :span[object]{.type-label}
  - **`PackageUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** :span[integer]{.type-label}
  - **`QuantityOfVersionsToKeep`** :span[integer]{.type-label}
  - **`Strategy`** :span[enum]{.type-label}  
    Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** :span[object]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
  - **`HealthCheckRetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
  - **`RetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineUpdatePolicy`** :span[object]{.type-label}
  - **`CalamariUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** :span[string]{.type-label}
  - **`TentacleUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`.
- **`Name`** :span[string]{.type-label}
- **`PollingRequestQueueTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "Id": "string",
  "IsDefault": false,
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
    "Enabled": false,
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
  "SpaceId": "Spaces-1"
}
```
:::

## Get a list of Machine Policies

:endpoint{method="GET" path="/api/\{spaceId\}/machinepolicies/all"}

Also reachable at `/api/machinepolicies/all`, `/api/spaces/{spaceIdentifier}/machinepolicies/all`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — All the Machine Policies in the supplied Octopus Deploy Space.

- **`ConnectionConnectTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryCountLimit`** :span[integer]{.type-label}
- **`ConnectionRetrySleepInterval`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryTimeLimit`** :span[string]{.type-label}  
  Format `date-span`.
- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MachineCleanupPolicy`** :span[object]{.type-label}
  - **`DeleteMachinesBehavior`** :span[enum]{.type-label}  
    Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineConnectivityPolicy`** :span[object]{.type-label}
  - **`MachineConnectivityBehavior`** :span[enum]{.type-label}  
    Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** :span[object]{.type-label}
  - **`BashHealthCheckPolicy`** :span[object]{.type-label}
  - **`HealthCheckCron`** :span[string]{.type-label}
  - **`HealthCheckCronTimezone`** :span[string]{.type-label}
  - **`HealthCheckInterval`** :span[string]{.type-label}  
    Format `date-span`.
  - **`HealthCheckType`** :span[enum]{.type-label}  
    Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** :span[object]{.type-label}
- **`MachinePackageCacheRetentionPolicy`** :span[object]{.type-label}
  - **`PackageUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** :span[integer]{.type-label}
  - **`QuantityOfVersionsToKeep`** :span[integer]{.type-label}
  - **`Strategy`** :span[enum]{.type-label}  
    Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** :span[object]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
  - **`HealthCheckRetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
  - **`RetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineUpdatePolicy`** :span[object]{.type-label}
  - **`CalamariUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** :span[string]{.type-label}
  - **`TentacleUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`.
- **`Name`** :span[string]{.type-label}
- **`PollingRequestQueueTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
[
  {
    "ConnectionConnectTimeout": "string",
    "ConnectionRetryCountLimit": 0,
    "ConnectionRetrySleepInterval": "string",
    "ConnectionRetryTimeLimit": "string",
    "Description": "string",
    "Id": "string",
    "IsDefault": false,
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
      "Enabled": false,
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
    "SpaceId": "Spaces-1"
  }
]
```
:::

## Get a template for a new Machine Policy, which includes any defaults

:endpoint{method="GET" path="/api/\{spaceId\}/machinepolicies/template"}

Also reachable at `/api/machinepolicies/template`, `/api/spaces/{spaceIdentifier}/machinepolicies/template`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Machine Policy Template

- **`ConnectionConnectTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryCountLimit`** :span[integer]{.type-label}
- **`ConnectionRetrySleepInterval`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryTimeLimit`** :span[string]{.type-label}  
  Format `date-span`.
- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MachineCleanupPolicy`** :span[object]{.type-label}
  - **`DeleteMachinesBehavior`** :span[enum]{.type-label}  
    Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineConnectivityPolicy`** :span[object]{.type-label}
  - **`MachineConnectivityBehavior`** :span[enum]{.type-label}  
    Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** :span[object]{.type-label}
  - **`BashHealthCheckPolicy`** :span[object]{.type-label}
  - **`HealthCheckCron`** :span[string]{.type-label}
  - **`HealthCheckCronTimezone`** :span[string]{.type-label}
  - **`HealthCheckInterval`** :span[string]{.type-label}  
    Format `date-span`.
  - **`HealthCheckType`** :span[enum]{.type-label}  
    Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** :span[object]{.type-label}
- **`MachinePackageCacheRetentionPolicy`** :span[object]{.type-label}
  - **`PackageUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** :span[integer]{.type-label}
  - **`QuantityOfVersionsToKeep`** :span[integer]{.type-label}
  - **`Strategy`** :span[enum]{.type-label}  
    Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** :span[object]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
  - **`HealthCheckRetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
  - **`RetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineUpdatePolicy`** :span[object]{.type-label}
  - **`CalamariUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** :span[string]{.type-label}
  - **`TentacleUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`.
- **`Name`** :span[string]{.type-label}
- **`PollingRequestQueueTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "Id": "string",
  "IsDefault": false,
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
    "Enabled": false,
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
  "SpaceId": "Spaces-1"
}
```
:::

## Get a Machine Policy by ID

:endpoint{method="GET" path="/api/\{spaceId\}/machinepolicies/\{id\}"}

Also reachable at `/api/machinepolicies/{id}`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Machine Policy.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested machine policy

- **`ConnectionConnectTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryCountLimit`** :span[integer]{.type-label}
- **`ConnectionRetrySleepInterval`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryTimeLimit`** :span[string]{.type-label}  
  Format `date-span`.
- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MachineCleanupPolicy`** :span[object]{.type-label}
  - **`DeleteMachinesBehavior`** :span[enum]{.type-label}  
    Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineConnectivityPolicy`** :span[object]{.type-label}
  - **`MachineConnectivityBehavior`** :span[enum]{.type-label}  
    Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** :span[object]{.type-label}
  - **`BashHealthCheckPolicy`** :span[object]{.type-label}
  - **`HealthCheckCron`** :span[string]{.type-label}
  - **`HealthCheckCronTimezone`** :span[string]{.type-label}
  - **`HealthCheckInterval`** :span[string]{.type-label}  
    Format `date-span`.
  - **`HealthCheckType`** :span[enum]{.type-label}  
    Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** :span[object]{.type-label}
- **`MachinePackageCacheRetentionPolicy`** :span[object]{.type-label}
  - **`PackageUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** :span[integer]{.type-label}
  - **`QuantityOfVersionsToKeep`** :span[integer]{.type-label}
  - **`Strategy`** :span[enum]{.type-label}  
    Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** :span[object]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
  - **`HealthCheckRetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
  - **`RetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineUpdatePolicy`** :span[object]{.type-label}
  - **`CalamariUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** :span[string]{.type-label}
  - **`TentacleUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`.
- **`Name`** :span[string]{.type-label}
- **`PollingRequestQueueTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "Id": "string",
  "IsDefault": false,
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
    "Enabled": false,
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
  "SpaceId": "Spaces-1"
}
```
:::

## Modify an existing Machine Policy

:endpoint{method="PUT" path="/api/\{spaceId\}/machinepolicies/\{id\}"}

Also reachable at `/api/machinepolicies/{id}`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The Machine Policy ID.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The Space ID.

**Request Body**

- **`ConnectionConnectTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryCountLimit`** :span[integer]{.type-label}
- **`ConnectionRetrySleepInterval`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryTimeLimit`** :span[string]{.type-label}  
  Format `date-span`.
- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  The Machine Policy ID.
- **`IsDefault`** :span[boolean]{.type-label}
- **`MachineCleanupPolicy`** :span[object]{.type-label}
  - **`DeleteMachinesBehavior`** :span[enum]{.type-label}  
    Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineConnectivityPolicy`** :span[object]{.type-label}
  - **`MachineConnectivityBehavior`** :span[enum]{.type-label}  
    Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** :span[object]{.type-label}
  - **`BashHealthCheckPolicy`** :span[object]{.type-label}
  - **`HealthCheckCron`** :span[string]{.type-label}
  - **`HealthCheckCronTimezone`** :span[string]{.type-label}
  - **`HealthCheckInterval`** :span[string]{.type-label}  
    Format `date-span`.
  - **`HealthCheckType`** :span[enum]{.type-label}  
    Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** :span[object]{.type-label}
- **`MachinePackageCacheRetentionPolicy`** :span[object]{.type-label}
  - **`PackageUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** :span[integer]{.type-label}
  - **`QuantityOfVersionsToKeep`** :span[integer]{.type-label}
  - **`Strategy`** :span[enum]{.type-label}  
    Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** :span[object]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
  - **`HealthCheckRetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
  - **`RetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineUpdatePolicy`** :span[object]{.type-label}
  - **`CalamariUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** :span[string]{.type-label}
  - **`TentacleUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`PollingRequestQueueTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The Space ID.

:::api-example{label="Request"}
```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "Id": "MachinePolicies-1",
  "IsDefault": false,
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
    "Enabled": false,
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
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Confirmation that the Machine Policy was modified, containing the new Policy

- **`ConnectionConnectTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryCountLimit`** :span[integer]{.type-label}
- **`ConnectionRetrySleepInterval`** :span[string]{.type-label}  
  Format `date-span`.
- **`ConnectionRetryTimeLimit`** :span[string]{.type-label}  
  Format `date-span`.
- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`MachineCleanupPolicy`** :span[object]{.type-label}
  - **`DeleteMachinesBehavior`** :span[enum]{.type-label}  
    Allowed values: `DoNotDelete`, `DeleteUnavailableMachines`.
  - **`DeleteMachinesElapsedTimeSpan`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineConnectivityPolicy`** :span[object]{.type-label}
  - **`MachineConnectivityBehavior`** :span[enum]{.type-label}  
    Allowed values: `ExpectedToBeOnline`, `MayBeOfflineAndCanBeSkipped`.
- **`MachineHealthCheckPolicy`** :span[object]{.type-label}
  - **`BashHealthCheckPolicy`** :span[object]{.type-label}
  - **`HealthCheckCron`** :span[string]{.type-label}
  - **`HealthCheckCronTimezone`** :span[string]{.type-label}
  - **`HealthCheckInterval`** :span[string]{.type-label}  
    Format `date-span`.
  - **`HealthCheckType`** :span[enum]{.type-label}  
    Allowed values: `RunScript`, `OnlyConnectivity`.
  - **`PowerShellHealthCheckPolicy`** :span[object]{.type-label}
- **`MachinePackageCacheRetentionPolicy`** :span[object]{.type-label}
  - **`PackageUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
  - **`QuantityOfPackagesToKeep`** :span[integer]{.type-label}
  - **`QuantityOfVersionsToKeep`** :span[integer]{.type-label}
  - **`Strategy`** :span[enum]{.type-label}  
    Allowed values: `Default`, `Quantities`.
  - **`VersionUnit`** :span[enum]{.type-label}  
    Allowed values: `Items`.
- **`MachineRpcCallRetryPolicy`** :span[object]{.type-label}
  - **`Enabled`** :span[boolean]{.type-label}
  - **`HealthCheckRetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
  - **`RetryDuration`** :span[string]{.type-label}  
    Format `date-span`.
- **`MachineUpdatePolicy`** :span[object]{.type-label}
  - **`CalamariUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `UpdateOnDeployment`, `UpdateOnNewMachine`, `UpdateAlways`.
  - **`KubernetesAgentUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`, `Block`.
  - **`TentacleUpdateAccountId`** :span[string]{.type-label}
  - **`TentacleUpdateBehavior`** :span[enum]{.type-label}  
    Allowed values: `NeverUpdate`, `Update`.
- **`Name`** :span[string]{.type-label}
- **`PollingRequestQueueTimeout`** :span[string]{.type-label}  
  Format `date-span`.
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "ConnectionConnectTimeout": "string",
  "ConnectionRetryCountLimit": 0,
  "ConnectionRetrySleepInterval": "string",
  "ConnectionRetryTimeLimit": "string",
  "Description": "string",
  "Id": "string",
  "IsDefault": false,
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
    "Enabled": false,
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
  "SpaceId": "Spaces-1"
}
```
:::

## Delete the specified Machine Policy

:endpoint{method="DELETE" path="/api/\{spaceId\}/machinepolicies/\{id\}"}

Also reachable at `/api/machinepolicies/{id}`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Machine Policy to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Get a paginated list of the machines that belong to the given Machine Policy

:endpoint{method="GET" path="/api/\{spaceId\}/machinepolicies/\{id\}/machines"}

Also reachable at `/api/machinepolicies/{id}/machines`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}/machines`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Machine Policy.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 10. Minimum `0`.

**Response**

`200` — A paginated list of the machines that belong to the given Machine Policy

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

:::api-example{label="Response"}
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
        "Environments-1",
        "..."
      ],
      "HasLatestCalamari": false,
      "HealthStatus": "Healthy",
      "Id": "string",
      "IsDisabled": false,
      "IsInProcess": false,
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
      "SkipInitialHealthCheck": false,
      "Slug": "string",
      "SpaceId": "Spaces-1",
      "StatusSummary": "string",
      "TenantIds": [
        "Tenants-1",
        "..."
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
:::

## Delete the specified Machine Policy

:endpoint{method="DELETE" path="/api/\{spaceId\}/machinepolicies/\{id\}/v1"}

Also reachable at `/api/machinepolicies/{id}/v1`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Machine Policy to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Machine Policy has been deleted

:::api-example{label="Response"}
```json
{}
```
:::

## Get a paginated list of the workers that belong to the given Machine Policy

:endpoint{method="GET" path="/api/\{spaceId\}/machinepolicies/\{id\}/workers"}

Also reachable at `/api/machinepolicies/{id}/workers`, `/api/spaces/{spaceIdentifier}/machinepolicies/{id}/workers`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Machine Policy.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 10. Minimum `0`.

**Response**

`200` — A paginated list of the machines that belong to the given Machine Policy

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Architecture`** :span[string]{.type-label}
  - **`Endpoint`** :span[object]{.type-label}
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
  - **`ShellName`** :span[string]{.type-label}
  - **`ShellVersion`** :span[string]{.type-label}
  - **`SkipInitialHealthCheck`** :span[boolean]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`StatusSummary`** :span[string]{.type-label}
  - **`Thumbprint`** :span[string]{.type-label}
  - **`Uri`** :span[string]{.type-label}
  - **`WorkerPoolIds`** :span[array of string]{.type-label}
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
      "Architecture": "string",
      "Endpoint": {
        "CommunicationStyle": "None",
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {}
      },
      "HasLatestCalamari": false,
      "HealthStatus": "Healthy",
      "Id": "string",
      "IsDisabled": false,
      "IsInProcess": false,
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
      "SkipInitialHealthCheck": false,
      "Slug": "string",
      "SpaceId": "Spaces-1",
      "StatusSummary": "string",
      "Thumbprint": "string",
      "Uri": "string",
      "WorkerPoolIds": [
        "WorkerPools-1",
        "..."
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
:::
