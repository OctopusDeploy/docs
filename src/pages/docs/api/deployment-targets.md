---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployment Targets
---

## List all of the registered machines in the supplied Octopus Deploy Space, from all environments. The results will be sorted alphabetically by name

:endpoint{method="GET" path="/api/\{spaceId\}/machines"}

Also reachable at `/api/machines`, `/api/spaces/{spaceIdentifier}/machines`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`commStyles`** :span[array of string]{.type-label}  
  List of communication styles which if specified, filters the result to only include Deployment Targets with matching communication styles.
- **`deploymentTargetTypes`** :span[array of string]{.type-label}  
  List of deployment target types which if specified, filters the result to only include Deployment Targets with matching types.
- **`environmentIds`** :span[array of string]{.type-label}  
  List of Environment IDs which if specified, filters the result to only include Deployment Targets with matching Environment IDs.
- **`healthStatuses`** :span[array of string]{.type-label}  
  List of health statuses which if specified, filters the result to only include Deployment Targets with matching health statuses.
- **`ids`** :span[array of string]{.type-label}  
  List of Deployment Target IDs which if specified, filters the result to only include Deployment Targets with matching IDs.
- **`isDisabled`** :span[boolean]{.type-label}  
  A filter to return only disabled/enabled Deployment Targets.
- **`name`** :span[string]{.type-label}  
  The exact name of a deployment target to be matched.
- **`operatingSystemNames`** :span[array of string]{.type-label}  
  List of operating system names which if specified, filters the result to only include Deployment Targets with matching operating systems.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`roles`** :span[array of string]{.type-label}  
  List of roles which if specified, filters the result to only include Deployment Targets with matching roles.
- **`shellNames`** :span[array of string]{.type-label}  
  List of shell names which if specified, filters the result to only include Deployment Targets with matching shells.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`targetTags`** :span[array of string]{.type-label}  
  List of Target Tags which if specified, filters the result to only include Deployment Targets with matching Target Tags.
- **`tenantIds`** :span[array of string]{.type-label}  
  List of Tenant IDs which if specified, filters the result to only include Deployment Targets with matching Tenant IDs.
- **`tenantTags`** :span[array of string]{.type-label}  
  List of Tenant Tags which if specified, filters the result to only include Deployment Targets with matching Tenant Tags.

**Response**

`200` — The list of alphabetically sorted deployment targets that matched the request.

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
:::

## Create a MachineResource

:endpoint{method="POST" path="/api/\{spaceId\}/machines"}

Also reachable at `/api/machines`, `/api/spaces/{spaceIdentifier}/machines`.

Creates a new deployment target.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`EnvironmentIds`** :span[array of string]{.type-label} *(required)*
- **`IsDisabled`** :span[boolean]{.type-label}
- **`MachinePolicyId`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Roles`** :span[array of string]{.type-label} *(required)*
- **`SkipInitialHealthCheck`** :span[boolean]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** :span[string]{.type-label}
- **`Uri`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "EnvironmentIds": [
    "string"
  ],
  "IsDisabled": true,
  "MachinePolicyId": "string",
  "Name": "string",
  "Roles": [
    "string"
  ],
  "SkipInitialHealthCheck": true,
  "Slug": "string",
  "SpaceId": "string",
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
```
:::

**Response**

`201` — Created

- **`Architecture`** :span[string]{.type-label}
- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

:::api-example{label="Response"}
```json
{
  "Architecture": "string",
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
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
```
:::

## Get a list of Deployment Targets

:endpoint{method="GET" path="/api/\{spaceId\}/machines/all"}

Also reachable at `/api/machines/all`, `/api/spaces/{spaceIdentifier}/machines/all`.

Lists all of the Deployment Targets in the supplied Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A comma separated list of Machine resource ids used to filter a query.
- **`thumbprint`** :span[string]{.type-label}  
  A thumbprint used to filter a query.

**Response**

`200` — Requested list of Deployment Targets

- **`Architecture`** :span[string]{.type-label}
- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

:::api-example{label="Response"}
```json
[
  {
    "Architecture": "string",
    "Endpoint": {
      "CommunicationStyle": "None",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      }
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
]
```
:::

## Get a list of Deployment Targets

:endpoint{method="GET" path="/api/\{spaceId\}/machines/all/v1"}

Also reachable at `/api/machines/all/v1`, `/api/spaces/{spaceIdentifier}/machines/all/v1`.

Lists all of the Deployment Targets in the supplied Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A comma separated list of Machine resource ids used to filter a query.
- **`thumbprint`** :span[string]{.type-label}  
  A thumbprint used to filter a query.

**Response**

`200` — Requested list of Deployment Targets

- **`DeploymentTargets`** :span[array of object]{.type-label}
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

:::api-example{label="Response"}
```json
{
  "DeploymentTargets": [
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
  ]
}
```
:::

## Interrogate a deployment target for communication details so that it may be added to the installation

:endpoint{method="GET" path="/api/\{spaceId\}/machines/discover"}

Also reachable at `/api/machines/discover`, `/api/spaces/{spaceIdentifier}/machines/discover`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`host`** :span[string]{.type-label} *(required)*
- **`port`** :span[integer]{.type-label}
- **`proxyId`** :span[string]{.type-label}
- **`type`** :span[enum]{.type-label}  
  Allowed values: `TentaclePassive`, `TentacleActive`, `Ssh`.

**Response**

`200` — The machine which was discovered

- **`Architecture`** :span[string]{.type-label}
- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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
- **`StatusSummary`** :span[string]{.type-label}
- **`Thumbprint`** :span[string]{.type-label}
- **`Uri`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Architecture": "string",
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
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
  "StatusSummary": "string",
  "Thumbprint": "string",
  "Uri": "string"
}
```
:::

## Get all operating system names for deployment targets

:endpoint{method="GET" path="/api/\{spaceId\}/machines/operatingsystem/names/all"}

Also reachable at `/api/machines/operatingsystem/names/all`, `/api/spaces/{spaceIdentifier}/machines/operatingsystem/names/all`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The operating system names

:::api-example{label="Response"}
```json
[
  "string"
]
```
:::

## Get all operating system shell names for deployment targets

:endpoint{method="GET" path="/api/\{spaceId\}/machines/operatingsystem/shells/all"}

Also reachable at `/api/machines/operatingsystem/shells/all`, `/api/spaces/{spaceIdentifier}/machines/operatingsystem/shells/all`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The operating system shell names

:::api-example{label="Response"}
```json
[
  "string"
]
```
:::

## List all of the registered machines in the supplied Octopus Deploy Space, from all environments. The results are sorted by health status, healthiest first, then alphabetically by name

:endpoint{method="GET" path="/api/\{spaceId\}/machines/v2"}

Also reachable at `/api/machines/v2`, `/api/spaces/{spaceIdentifier}/machines/v2`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`commStyles`** :span[array of string]{.type-label}  
  List of communication styles which if specified, filters the result to only include Deployment Targets with matching communication styles.
- **`deploymentTargetTypes`** :span[array of string]{.type-label}  
  List of deployment target types which if specified, filters the result to only include Deployment Targets with matching types.
- **`environmentIds`** :span[array of string]{.type-label}  
  List of Environment IDs which if specified, filters the result to only include Deployment Targets with matching Environment IDs.
- **`healthStatuses`** :span[array of string]{.type-label}  
  List of health statuses which if specified, filters the result to only include Deployment Targets with matching health statuses.
- **`ids`** :span[array of string]{.type-label}  
  List of Deployment Target IDs which if specified, filters the result to only include Deployment Targets with matching IDs.
- **`isDisabled`** :span[boolean]{.type-label}  
  A filter to return only disabled/enabled Deployment Targets.
- **`name`** :span[string]{.type-label}  
  The exact name of a deployment target to be matched.
- **`operatingSystemNames`** :span[array of string]{.type-label}  
  List of operating system names which if specified, filters the result to only include Deployment Targets with matching operating systems.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`roles`** :span[array of string]{.type-label}  
  List of roles which if specified, filters the result to only include Deployment Targets with matching roles.
- **`shellNames`** :span[array of string]{.type-label}  
  List of shell names which if specified, filters the result to only include Deployment Targets with matching shells.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`targetTags`** :span[array of string]{.type-label}  
  List of Target Tags which if specified, filters the result to only include Deployment Targets with matching Target Tags.
- **`tenantIds`** :span[array of string]{.type-label}  
  List of Tenant IDs which if specified, filters the result to only include Deployment Targets with matching Tenant IDs.
- **`tenantTags`** :span[array of string]{.type-label}  
  List of Tenant Tags which if specified, filters the result to only include Deployment Targets with matching Tenant Tags.

**Response**

`200` — The list of alphabetically sorted deployment targets that matched the request.

- **`DeploymentTargets`** :span[object]{.type-label}
  - **`ItemType`** :span[string]{.type-label}
  - **`Items`** :span[array of object]{.type-label}
  - **`ItemsPerPage`** :span[integer]{.type-label}
  - **`LastPageNumber`** :span[integer]{.type-label}
  - **`NumberOfPages`** :span[integer]{.type-label}
  - **`TotalResults`** :span[integer]{.type-label}
- **`TargetCountPerHealthStatus`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "DeploymentTargets": {
    "ItemType": "string",
    "Items": [
      {
        "Architecture": "string",
        "Endpoint": {},
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
        "Links": {},
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
    "LastPageNumber": 0,
    "NumberOfPages": 0,
    "TotalResults": 0
  },
  "TargetCountPerHealthStatus": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  }
}
```
:::

## Get an existing Deployment Target

:endpoint{method="GET" path="/api/\{spaceId\}/machines/\{id\}"}

Also reachable at `/api/machines/{id}`, `/api/spaces/{spaceIdentifier}/machines/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the Machine.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space that contains the Machine.

**Response**

`200` — The Deployment Target resource to return.

- **`Architecture`** :span[string]{.type-label}
- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

:::api-example{label="Response"}
```json
{
  "Architecture": "string",
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
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
```
:::

## Delete an existing Deployment Target

:endpoint{method="DELETE" path="/api/\{spaceId\}/machines/\{id\}"}

Also reachable at `/api/machines/{id}`, `/api/spaces/{spaceIdentifier}/machines/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Deployment Target to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The SpaceId of the deployment target to delete.

**Response**

`200` — Success

## Get a list of the latest deployments by project for the given Deployment Target

:endpoint{method="GET" path="/api/\{spaceId\}/machines/\{id\}/latestdeployments"}

Also reachable at `/api/machines/{id}/latestdeployments`, `/api/spaces/{spaceIdentifier}/machines/{id}/latestdeployments`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Deployment Target.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`partialName`** :span[string]{.type-label}
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of latest deployments per project for the Deployment Target

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectLogo`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ServerTask`** :span[object]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ItemType": "string",
  "Items": [
    {
      "ProjectId": "string",
      "ProjectLogo": "string",
      "ProjectName": "string",
      "ServerTask": {
        "Arguments": {},
        "CanRerun": true,
        "Completed": "string",
        "CompletedTime": "2020-01-01T00:00:00.000Z",
        "Description": "string",
        "Duration": "string",
        "ErrorMessage": "string",
        "EstimatedRemainingQueueDurationSeconds": 0,
        "FinishedSuccessfully": true,
        "HasBeenPickedUpByProcessor": true,
        "HasPendingInterruptions": true,
        "HasPendingPreconditions": true,
        "HasWarningsOrErrors": true,
        "Id": "string",
        "IsCompleted": true,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "LastUpdatedTime": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "Name": "string",
        "PendingInterruptionTypes": [
          "ManualIntervention"
        ],
        "PendingPreconditionTypes": [
          "string"
        ],
        "ProjectId": "string",
        "QueueTime": "2020-01-01T00:00:00.000Z",
        "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
        "ServerNode": "string",
        "SpaceId": "string",
        "StartTime": "2020-01-01T00:00:00.000Z",
        "State": "Queued"
      }
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
:::

## Get a list of Tasks for the given Deployment Target

:endpoint{method="GET" path="/api/\{spaceId\}/machines/\{id\}/tasks"}

Also reachable at `/api/machines/{id}/tasks`, `/api/spaces/{spaceIdentifier}/machines/{id}/tasks`.

Get a history of related Tasks (ie. Deployments) for a Deployment Target.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Deployment Target.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`type`** :span[enum]{.type-label}  
  The type of Task to retrieve. If left blank, all Tasks are retrieved.  
  Allowed values: `Deployment`, `RunbookRun`.

**Response**

`200` — The requested list of Tasks for the Deployment Target

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Arguments`** :span[object]{.type-label}  
    Gets or sets any arguments to the task.
  - **`CanRerun`** :span[boolean]{.type-label}  
    If true, then the task can be used as the basis for a new task with the same effect.
  - **`Completed`** :span[string]{.type-label}  
    Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
  - **`CompletedTime`** :span[string]{.type-label}  
    Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
  - **`Duration`** :span[string]{.type-label}  
    Gets or sets a string indicating how long the task took to run.
  - **`ErrorMessage`** :span[string]{.type-label}  
    Gets or sets a short summary of the errors encountered when the task ran (if any).
  - **`EstimatedRemainingQueueDurationSeconds`** :span[integer]{.type-label}
  - **`FinishedSuccessfully`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the task ran to completion successfully.
  - **`HasBeenPickedUpByProcessor`** :span[boolean]{.type-label}  
    Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
  - **`HasPendingInterruptions`** :span[boolean]{.type-label}  
    True if the task has any pending interruptions.
  - **`HasPendingPreconditions`** :span[boolean]{.type-label}  
    True if the task has any pending preconditions.
  - **`HasWarningsOrErrors`** :span[boolean]{.type-label}  
    True if any warnings or non-fatal errors were recorded in the task log during execution.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastUpdatedTime`** :span[string]{.type-label}  
    Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
  - **`PendingInterruptionTypes`** :span[array of enum]{.type-label}  
    Contains a list of the types of any pending interruptions.  
    Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** :span[array of string]{.type-label}  
    Contains a list of the types of any pending preconditions.
  - **`ProjectId`** :span[string]{.type-label}  
    If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
  - **`QueueTime`** :span[string]{.type-label}  
    Gets or sets the time at which the task was queued. Format `date-time`.
  - **`QueueTimeExpiry`** :span[string]{.type-label}  
    Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
  - **`ServerNode`** :span[string]{.type-label}  
    Gets the ID of the Octopus server that created and will control this task.
  - **`SpaceId`** :span[string]{.type-label}
  - **`StartTime`** :span[string]{.type-label}  
    Gets or sets the time at which the task started executing. Format `date-time`.
  - **`State`** :span[enum]{.type-label}  
    Gets or sets the current state of the task.  
    Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
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
      "Arguments": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "CanRerun": true,
      "Completed": "string",
      "CompletedTime": "2020-01-01T00:00:00.000Z",
      "Description": "string",
      "Duration": "string",
      "ErrorMessage": "string",
      "EstimatedRemainingQueueDurationSeconds": 0,
      "FinishedSuccessfully": true,
      "HasBeenPickedUpByProcessor": true,
      "HasPendingInterruptions": true,
      "HasPendingPreconditions": true,
      "HasWarningsOrErrors": true,
      "Id": "string",
      "IsCompleted": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LastUpdatedTime": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "PendingInterruptionTypes": [
        "ManualIntervention"
      ],
      "PendingPreconditionTypes": [
        "string"
      ],
      "ProjectId": "string",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
      "ServerNode": "string",
      "SpaceId": "string",
      "StartTime": "2020-01-01T00:00:00.000Z",
      "State": "Queued"
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

## Get a list of Tasks for the given Deployment Target

:endpoint{method="GET" path="/api/\{spaceId\}/machines/\{id\}/tasks/v1"}

Also reachable at `/api/machines/{id}/tasks/v1`, `/api/spaces/{spaceIdentifier}/machines/{id}/tasks/v1`.

Get a history of related Tasks (ie. Deployments) for a Deployment Target.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Deployment Target.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`type`** :span[enum]{.type-label}  
  The type of Task to retrieve. If left blank, all Tasks are retrieved.  
  Allowed values: `Deployment`, `RunbookRun`.

**Response**

`200` — The requested list of Tasks for the Deployment Target

- **`ResourceCollection`** :span[object]{.type-label}
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

:::api-example{label="Response"}
```json
{
  "ResourceCollection": {
    "Id": "string",
    "ItemType": "string",
    "Items": [
      {
        "Arguments": {},
        "CanRerun": true,
        "Completed": "string",
        "CompletedTime": "2020-01-01T00:00:00.000Z",
        "Description": "string",
        "Duration": "string",
        "ErrorMessage": "string",
        "EstimatedRemainingQueueDurationSeconds": 0,
        "FinishedSuccessfully": true,
        "HasBeenPickedUpByProcessor": true,
        "HasPendingInterruptions": true,
        "HasPendingPreconditions": true,
        "HasWarningsOrErrors": true,
        "Id": "string",
        "IsCompleted": true,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "LastUpdatedTime": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "Name": "string",
        "PendingInterruptionTypes": [
          "ManualIntervention"
        ],
        "PendingPreconditionTypes": [
          "string"
        ],
        "ProjectId": "string",
        "QueueTime": "2020-01-01T00:00:00.000Z",
        "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
        "ServerNode": "string",
        "SpaceId": "string",
        "StartTime": "2020-01-01T00:00:00.000Z",
        "State": "Queued"
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
:::

## List all the variable set names (projects and library variable sets) that have variables that are scoped to only the given machine

:endpoint{method="GET" path="/api/\{spaceId\}/machines/\{machineId\}/singlyScopedVariableDetails"}

Also reachable at `/api/machines/{machineId}/singlyScopedVariableDetails`, `/api/spaces/{spaceIdentifier}/machines/{machineId}/singlyScopedVariableDetails`.

**Path Parameters**

- **`machineId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The names of LibraryVariableSets and VariableSets which contain one or more variables scoped to the requested machine. Along with boolean indication to show that there are unviewable/editable projects/libraries which also contain scoped variables.

- **`Resource`** :span[object]{.type-label}
  - **`HasUnauthorizedLibraryVariableSetVariables`** :span[boolean]{.type-label}
  - **`HasUnauthorizedProjectVariables`** :span[boolean]{.type-label}
  - **`VariableMap`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "Resource": {
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
}
```
:::

## Modify an existing Deployment Target (identified by ID)

:endpoint{method="PUT" path="/api/\{spaceId\}/machines/\{machineid\}"}

Also reachable at `/api/machines/{machineid}`, `/api/spaces/{spaceIdentifier}/machines/{machineid}`.

**Path Parameters**

- **`machineid`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`EnvironmentIds`** :span[array of string]{.type-label} *(required)*
- **`IsDisabled`** :span[boolean]{.type-label}
- **`MachineId`** :span[string]{.type-label} *(required)*
- **`MachinePolicyId`** :span[string]{.type-label}  
  Note: If this is unset, but the endpoint requires a policy, Octopus will update the machine with the _default_ machine policy.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Roles`** :span[array of string]{.type-label} *(required)*
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`TenantedDeploymentParticipation`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** :span[string]{.type-label}
- **`Uri`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "EnvironmentIds": [
    "string"
  ],
  "IsDisabled": true,
  "MachineId": "string",
  "MachinePolicyId": "string",
  "Name": "string",
  "Roles": [
    "string"
  ],
  "Slug": "string",
  "SpaceId": "string",
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
```
:::

**Response**

`200` — The MachineResource following requested changes.

- **`Architecture`** :span[string]{.type-label}
- **`Endpoint`** :span[object]{.type-label}
  - **`CommunicationStyle`** :span[enum]{.type-label}  
    This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType.  
    Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

:::api-example{label="Response"}
```json
{
  "Architecture": "string",
  "Endpoint": {
    "CommunicationStyle": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
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
```
:::
