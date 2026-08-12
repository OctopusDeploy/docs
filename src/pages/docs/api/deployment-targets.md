---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployment Targets
---

## Lists all of the registered machines in the supplied Octopus Deploy Space, from all environments. The results will be sorted alphabetically by name

`GET` `/api/{spaceId}/machines`

Also reachable at `/api/machines`, `/api/spaces/{spaceIdentifier}/machines`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`commStyles`** <span class="type-label">array of string</span> — List of communication styles which if specified, filters the result to only include Deployment Targets with matching communication styles.
- **`deploymentTargetTypes`** <span class="type-label">array of string</span> — List of deployment target types which if specified, filters the result to only include Deployment Targets with matching types.
- **`environmentIds`** <span class="type-label">array of string</span> — List of Environment IDs which if specified, filters the result to only include Deployment Targets with matching Environment IDs.
- **`healthStatuses`** <span class="type-label">array of string</span> — List of health statuses which if specified, filters the result to only include Deployment Targets with matching health statuses.
- **`ids`** <span class="type-label">array of string</span> — List of Deployment Target IDs which if specified, filters the result to only include Deployment Targets with matching IDs.
- **`isDisabled`** <span class="type-label">boolean</span> — A filter to return only disabled/enabled Deployment Targets.
- **`name`** <span class="type-label">string</span> — The exact name of a deployment target to be matched.
- **`operatingSystemNames`** <span class="type-label">array of string</span> — List of operating system names which if specified, filters the result to only include Deployment Targets with matching operating systems.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`roles`** <span class="type-label">array of string</span> — List of roles which if specified, filters the result to only include Deployment Targets with matching roles.
- **`shellNames`** <span class="type-label">array of string</span> — List of shell names which if specified, filters the result to only include Deployment Targets with matching shells.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`targetTags`** <span class="type-label">array of string</span> — List of Target Tags which if specified, filters the result to only include Deployment Targets with matching Target Tags.
- **`tenantIds`** <span class="type-label">array of string</span> — List of Tenant IDs which if specified, filters the result to only include Deployment Targets with matching Tenant IDs.
- **`tenantTags`** <span class="type-label">array of string</span> — List of Tenant Tags which if specified, filters the result to only include Deployment Targets with matching Tenant Tags.

**Response**

`200` — The list of alphabetically sorted deployment targets that matched the request.

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

## Create a MachineResource

`POST` `/api/{spaceId}/machines`

Also reachable at `/api/machines`, `/api/spaces/{spaceIdentifier}/machines`.

Creates a new deployment target.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateDeploymentTargetCommand`

- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`EnvironmentIds`** <span class="type-label">array of string</span> *(required)*
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`MachinePolicyId`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Roles`** <span class="type-label">array of string</span> *(required)*
- **`SkipInitialHealthCheck`** <span class="type-label">boolean</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** <span class="type-label">string</span>
- **`Uri`** <span class="type-label">string</span>

<div data-example="Request">

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
</div>

**Response**

`201` — Created

`MachineResource`.

- **`Architecture`** <span class="type-label">string</span>
- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

<div data-example="Response">

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
</div>

## Get a list of Deployment Targets

`GET` `/api/{spaceId}/machines/all`

Also reachable at `/api/machines/all`, `/api/spaces/{spaceIdentifier}/machines/all`.

Lists all of the Deployment Targets in the supplied Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — A comma separated list of Machine resource ids used to filter a query.
- **`thumbprint`** <span class="type-label">string</span> — A thumbprint used to filter a query.

**Response**

`200` — Requested list of Deployment Targets

an array of `MachineResource`.

- **`Architecture`** <span class="type-label">string</span>
- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

<div data-example="Response">

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
</div>

## Get a list of Deployment Targets

`GET` `/api/{spaceId}/machines/all/v1`

Also reachable at `/api/machines/all/v1`, `/api/spaces/{spaceIdentifier}/machines/all/v1`.

Lists all of the Deployment Targets in the supplied Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — A comma separated list of Machine resource ids used to filter a query.
- **`thumbprint`** <span class="type-label">string</span> — A thumbprint used to filter a query.

**Response**

`200` — Requested list of Deployment Targets

`GetAllDeploymentTargetsResponse`.

- **`DeploymentTargets`** <span class="type-label">array of object</span>
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

<div data-example="Response">

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
</div>

## Interrogate a deployment target for communication details so that it may be added to the installation

`GET` `/api/{spaceId}/machines/discover`

Also reachable at `/api/machines/discover`, `/api/spaces/{spaceIdentifier}/machines/discover`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`host`** <span class="type-label">string</span> *(required)*
- **`port`** <span class="type-label">integer</span>
- **`proxyId`** <span class="type-label">string</span>
- **`type`** <span class="type-label">enum</span> — Allowed values: `TentaclePassive`, `TentacleActive`, `Ssh`.

**Response**

`200` — The machine which was discovered

`MachineBasedResource`.

- **`Architecture`** <span class="type-label">string</span>
- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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
- **`StatusSummary`** <span class="type-label">string</span>
- **`Thumbprint`** <span class="type-label">string</span>
- **`Uri`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Gets all operating system names for deployment targets

`GET` `/api/{spaceId}/machines/operatingsystem/names/all`

Also reachable at `/api/machines/operatingsystem/names/all`, `/api/spaces/{spaceIdentifier}/machines/operatingsystem/names/all`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The operating system names

<div data-example="Response">

```json
[
  "string"
]
```
</div>

## Gets all operating system shell names for deployment targets

`GET` `/api/{spaceId}/machines/operatingsystem/shells/all`

Also reachable at `/api/machines/operatingsystem/shells/all`, `/api/spaces/{spaceIdentifier}/machines/operatingsystem/shells/all`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The operating system shell names

<div data-example="Response">

```json
[
  "string"
]
```
</div>

## Lists all of the registered machines in the supplied Octopus Deploy Space, from all environments. The results will be sorted alphabetically by name

`GET` `/api/{spaceId}/machines/v2`

Also reachable at `/api/machines/v2`, `/api/spaces/{spaceIdentifier}/machines/v2`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`commStyles`** <span class="type-label">array of string</span> — List of communication styles which if specified, filters the result to only include Deployment Targets with matching communication styles.
- **`deploymentTargetTypes`** <span class="type-label">array of string</span> — List of deployment target types which if specified, filters the result to only include Deployment Targets with matching types.
- **`environmentIds`** <span class="type-label">array of string</span> — List of Environment IDs which if specified, filters the result to only include Deployment Targets with matching Environment IDs.
- **`healthStatuses`** <span class="type-label">array of string</span> — List of health statuses which if specified, filters the result to only include Deployment Targets with matching health statuses.
- **`ids`** <span class="type-label">array of string</span> — List of Deployment Target IDs which if specified, filters the result to only include Deployment Targets with matching IDs.
- **`isDisabled`** <span class="type-label">boolean</span> — A filter to return only disabled/enabled Deployment Targets.
- **`name`** <span class="type-label">string</span> — The exact name of a deployment target to be matched.
- **`operatingSystemNames`** <span class="type-label">array of string</span> — List of operating system names which if specified, filters the result to only include Deployment Targets with matching operating systems.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`roles`** <span class="type-label">array of string</span> — List of roles which if specified, filters the result to only include Deployment Targets with matching roles.
- **`shellNames`** <span class="type-label">array of string</span> — List of shell names which if specified, filters the result to only include Deployment Targets with matching shells.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`targetTags`** <span class="type-label">array of string</span> — List of Target Tags which if specified, filters the result to only include Deployment Targets with matching Target Tags.
- **`tenantIds`** <span class="type-label">array of string</span> — List of Tenant IDs which if specified, filters the result to only include Deployment Targets with matching Tenant IDs.
- **`tenantTags`** <span class="type-label">array of string</span> — List of Tenant Tags which if specified, filters the result to only include Deployment Targets with matching Tenant Tags.

**Response**

`200` — The list of alphabetically sorted deployment targets that matched the request.

`GetDeploymentTargetsResponseV2`.

- **`DeploymentTargets`** <span class="type-label">object</span>
  - **`ItemType`** <span class="type-label">string</span>
  - **`Items`** <span class="type-label">array of object</span>
  - **`ItemsPerPage`** <span class="type-label">integer</span>
  - **`LastPageNumber`** <span class="type-label">integer</span>
  - **`NumberOfPages`** <span class="type-label">integer</span>
  - **`TotalResults`** <span class="type-label">integer</span>
- **`TargetCountPerHealthStatus`** <span class="type-label">object</span>

<div data-example="Response">

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
</div>

## Get an existing Deployment Target

`GET` `/api/{spaceId}/machines/{id}`

Also reachable at `/api/machines/{id}`, `/api/spaces/{spaceIdentifier}/machines/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the Machine.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space that contains the Machine.

**Response**

`200` — The Deployment Target resource to return.

`MachineResource`.

- **`Architecture`** <span class="type-label">string</span>
- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

<div data-example="Response">

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
</div>

## Deletes an existing Deployment Target

`DELETE` `/api/{spaceId}/machines/{id}`

Also reachable at `/api/machines/{id}`, `/api/spaces/{spaceIdentifier}/machines/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Deployment Target to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The SpaceId of the deployment target to delete.

**Response**

`200` — Success

## Get a list of the latest deployments by project for the given Deployment Target

`GET` `/api/{spaceId}/machines/{id}/latestdeployments`

Also reachable at `/api/machines/{id}/latestdeployments`, `/api/spaces/{spaceIdentifier}/machines/{id}/latestdeployments`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Deployment Target.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`partialName`** <span class="type-label">string</span>
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of latest deployments per project for the Deployment Target

`LatestProjectDeploymentPaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectLogo`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectName`** <span class="type-label">string</span> — Minimum length 1.
  - **`ServerTask`** <span class="type-label">object</span>
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
</div>

## Get a list of Tasks for the given Deployment Target

`GET` `/api/{spaceId}/machines/{id}/tasks`

Also reachable at `/api/machines/{id}/tasks`, `/api/spaces/{spaceIdentifier}/machines/{id}/tasks`.

Get a history of related Tasks (ie. Deployments) for a Deployment Target.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Deployment Target.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`type`** <span class="type-label">enum</span> — The type of Task to retrieve. If left blank, all Tasks are retrieved. Allowed values: `Deployment`, `RunbookRun`.

**Response**

`200` — The requested list of Tasks for the Deployment Target

`TaskResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Arguments`** <span class="type-label">object</span> — Gets or sets any arguments to the task.
  - **`CanRerun`** <span class="type-label">boolean</span> — If true, then the task can be used as the basis for a new task with the same effect.
  - **`Completed`** <span class="type-label">string</span> — Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
  - **`CompletedTime`** <span class="type-label">string</span> — Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
  - **`Description`** <span class="type-label">string</span> — Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
  - **`Duration`** <span class="type-label">string</span> — Gets or sets a string indicating how long the task took to run.
  - **`ErrorMessage`** <span class="type-label">string</span> — Gets or sets a short summary of the errors encountered when the task ran (if any).
  - **`EstimatedRemainingQueueDurationSeconds`** <span class="type-label">integer</span>
  - **`FinishedSuccessfully`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task ran to completion successfully.
  - **`HasBeenPickedUpByProcessor`** <span class="type-label">boolean</span> — Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
  - **`HasPendingInterruptions`** <span class="type-label">boolean</span> — True if the task has any pending interruptions.
  - **`HasPendingPreconditions`** <span class="type-label">boolean</span> — True if the task has any pending preconditions.
  - **`HasWarningsOrErrors`** <span class="type-label">boolean</span> — True if any warnings or non-fatal errors were recorded in the task log during execution.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastUpdatedTime`** <span class="type-label">string</span> — Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
  - **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Contains a list of the types of any pending interruptions. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** <span class="type-label">array of string</span> — Contains a list of the types of any pending preconditions.
  - **`ProjectId`** <span class="type-label">string</span> — If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
  - **`QueueTime`** <span class="type-label">string</span> — Gets or sets the time at which the task was queued. Format `date-time`.
  - **`QueueTimeExpiry`** <span class="type-label">string</span> — Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
  - **`ServerNode`** <span class="type-label">string</span> — Gets the ID of the Octopus server that created and will control this task.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`StartTime`** <span class="type-label">string</span> — Gets or sets the time at which the task started executing. Format `date-time`.
  - **`State`** <span class="type-label">enum</span> — Gets or sets the current state of the task. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
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
</div>

## Get a list of Tasks for the given Deployment Target

`GET` `/api/{spaceId}/machines/{id}/tasks/v1`

Also reachable at `/api/machines/{id}/tasks/v1`, `/api/spaces/{spaceIdentifier}/machines/{id}/tasks/v1`.

Get a history of related Tasks (ie. Deployments) for a Deployment Target.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Deployment Target.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`type`** <span class="type-label">enum</span> — The type of Task to retrieve. If left blank, all Tasks are retrieved. Allowed values: `Deployment`, `RunbookRun`.

**Response**

`200` — The requested list of Tasks for the Deployment Target

`GetTasksForDeploymentTargetResponse`.

- **`ResourceCollection`** <span class="type-label">object</span>
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
</div>

## Lists all the variable set names (projects and library variable sets) that have variables that are scoped to only the given machine

`GET` `/api/{spaceId}/machines/{machineId}/singlyScopedVariableDetails`

Also reachable at `/api/machines/{machineId}/singlyScopedVariableDetails`, `/api/spaces/{spaceIdentifier}/machines/{machineId}/singlyScopedVariableDetails`.

**Parameters**

- **`machineId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The names of LibraryVariableSets and VariableSets which contain one or more variables scoped to the requested machine. Along with boolean indication to show that there are unviewable/editable projects/libraries which also contain scoped variables.

`GetVariablesScopedToSingleDeploymentTargetResponse`.

- **`Resource`** <span class="type-label">object</span>
  - **`HasUnauthorizedLibraryVariableSetVariables`** <span class="type-label">boolean</span>
  - **`HasUnauthorizedProjectVariables`** <span class="type-label">boolean</span>
  - **`VariableMap`** <span class="type-label">object</span>

<div data-example="Response">

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
</div>

## Modifies an existing Deployment Target (identified by ID)

`PUT` `/api/{spaceId}/machines/{machineid}`

Also reachable at `/api/machines/{machineid}`, `/api/spaces/{spaceIdentifier}/machines/{machineid}`.

**Parameters**

- **`machineid`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyDeploymentTargetCommand`

- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`EnvironmentIds`** <span class="type-label">array of string</span> *(required)*
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`MachineId`** <span class="type-label">string</span> *(required)*
- **`MachinePolicyId`** <span class="type-label">string</span> — Note: If this is unset, but the endpoint requires a policy, Octopus will update the machine with the _default_ machine policy.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Roles`** <span class="type-label">array of string</span> *(required)*
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TenantedDeploymentParticipation`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Thumbprint`** <span class="type-label">string</span>
- **`Uri`** <span class="type-label">string</span>

<div data-example="Request">

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
</div>

**Response**

`200` — The MachineResource following requested changes.

`MachineResource`.

- **`Architecture`** <span class="type-label">string</span>
- **`Endpoint`** <span class="type-label">object</span>
  - **`CommunicationStyle`** <span class="type-label">enum</span> — This is for legacy support in client. Server no longer uses this for determining endpoint types, it uses DeploymentTargetType. Allowed values: `None`, `TentaclePassive`, `TentacleActive`, `Ssh`, `OfflineDrop`, `AzureWebApp`, `Ftp`, `AzureCloudService`, `AzureServiceFabricCluster`, `Kubernetes`, `StepPackage`, `KubernetesTentacle`, `AwsEcsCluster`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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

<div data-example="Response">

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
</div>
