---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Observability
---

## Register and trusts new Kubernetes Monitor

:endpoint{method="POST" path="/api/\{spaceId\}/observability/agents"}

Also reachable at `/api/spaces/{spaceIdentifier}/observability/agents`, `/api/spaces/{spaceIdentifier}/observability/kubernetes-monitors`, `/api/{spaceId}/observability/kubernetes-monitors`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`InstallationId`** :span[string]{.type-label} *(required)*  
  Installation ID of that uniquely identifies the physical installation of the agent. Format `uuid`.
- **`MachineId`** :span[string]{.type-label} *(required)*  
  Machine ID of that uniquely identifies the deployment target or worker that is being observed.
- **`PreserveAuthenticationToken`** :span[boolean]{.type-label}  
  Controls whether the authentication token should be preserved during re-registration. If not supplied (null), the token will be regenerated (default behavior). If false, the token will be regenerated. If true, the existing token will be preserved.
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "InstallationId": "00000000-0000-0000-0000-000000000000",
  "MachineId": "Machines-1",
  "PreserveAuthenticationToken": false,
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Response containing the registered agent.

- **`AuthenticationToken`** :span[string]{.type-label}  
  Authentication token for the monitor. Will be null if PreserveAuthenticationToken was set to true in the request and not registering a new monitor.
- **`CertificateThumbprint`** :span[string]{.type-label}  
  Minimum length 1.
- **`Resource`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`InstallationId`** :span[string]{.type-label}  
    Format `uuid`.
  - **`MachineId`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AuthenticationToken": "string",
  "CertificateThumbprint": "string",
  "Resource": {
    "Id": "KubernetesMonitors-1",
    "InstallationId": "00000000-0000-0000-0000-000000000000",
    "MachineId": "Machines-1",
    "SpaceId": "Spaces-1"
  }
}
```
:::

## Request the Kubernetes monitor to start sending events for the specified resource

:endpoint{method="POST" path="/api/\{spaceId\}/observability/events/sessions"}

Also reachable at `/api/spaces/{spaceIdentifier}/observability/events/sessions`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`DesiredOrKubernetesMonitoredResourceId`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`EnvironmentId`** :span[string]{.type-label} *(required)*
- **`MachineId`** :span[string]{.type-label} *(required)*
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantId`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "DesiredOrKubernetesMonitoredResourceId": "string",
  "EnvironmentId": "Environments-1",
  "MachineId": "Machines-1",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1"
}
```
:::

**Response**

`200` — Confirmation response containing a session ID for the event session

- **`SessionId`** :span[string]{.type-label}  
  Format `uuid`.

:::api-example{label="Response"}
```json
{
  "SessionId": "00000000-0000-0000-0000-000000000000"
}
```
:::

## Request to fetch all the events for the specified session

:endpoint{method="GET" path="/api/\{spaceId\}/observability/events/sessions/\{sessionId\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/observability/events/sessions/{sessionId}`.

**Path Parameters**

- **`sessionId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Response containing the events for a sessionID

- **`Error`** :span[object]{.type-label}
  - **`ErrorCode`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ErrorMessage`** :span[string]{.type-label}  
    Minimum length 1.
- **`Events`** :span[array of object]{.type-label}
  - **`Action`** :span[string]{.type-label}
  - **`Count`** :span[integer]{.type-label}
  - **`FirstObservedTime`** :span[string]{.type-label}
  - **`LastObservedTime`** :span[string]{.type-label}
  - **`Manifest`** :span[string]{.type-label}
  - **`Note`** :span[string]{.type-label}
  - **`Reason`** :span[string]{.type-label}
  - **`ReportingController`** :span[string]{.type-label}
  - **`ReportingInstance`** :span[string]{.type-label}
  - **`Type`** :span[string]{.type-label}
- **`IsSessionCompleted`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "Error": {
    "ErrorCode": "string",
    "ErrorMessage": "string"
  },
  "Events": [
    {
      "Action": "string",
      "Count": 0,
      "FirstObservedTime": "string",
      "LastObservedTime": "string",
      "Manifest": "string",
      "Note": "string",
      "Reason": "string",
      "ReportingController": "string",
      "ReportingInstance": "string",
      "Type": "string"
    }
  ],
  "IsSessionCompleted": false
}
```
:::

## Get a Kubernetes Monitor by ID

:endpoint{method="GET" path="/api/\{spaceId\}/observability/kubernetes-monitors/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/observability/kubernetes-monitors/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Kubernetes Monitor.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Kubernetes Monitor

- **`Resource`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`InstallationId`** :span[string]{.type-label}  
    Format `uuid`.
  - **`MachineId`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Resource": {
    "Id": "KubernetesMonitors-1",
    "InstallationId": "00000000-0000-0000-0000-000000000000",
    "MachineId": "Machines-1",
    "SpaceId": "Spaces-1"
  }
}
```
:::

## Delete a Kubernetes Monitor by ID

:endpoint{method="DELETE" path="/api/\{spaceId\}/observability/kubernetes-monitors/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/observability/kubernetes-monitors/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Kubernetes Monitor.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Response for deleting a Kubernetes Monitor

:::api-example{label="Response"}
```json
{}
```
:::

## Request the Kubernetes monitor to start sending logs for the specified container

:endpoint{method="POST" path="/api/\{spaceId\}/observability/logs/sessions"}

Also reachable at `/api/spaces/{spaceIdentifier}/observability/logs/sessions`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ContainerName`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`DesiredOrKubernetesMonitoredResourceId`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`EnvironmentId`** :span[string]{.type-label} *(required)*
- **`MachineId`** :span[string]{.type-label} *(required)*
- **`PodName`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`ShowPreviousContainer`** :span[boolean]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantId`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "ContainerName": "string",
  "DesiredOrKubernetesMonitoredResourceId": "string",
  "EnvironmentId": "Environments-1",
  "MachineId": "Machines-1",
  "PodName": "string",
  "ProjectId": "Projects-1",
  "ShowPreviousContainer": false,
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1"
}
```
:::

**Response**

`200` — Confirmation response containing any errors that might have occurred during communications with the Kubernetes Monitor

- **`SessionId`** :span[string]{.type-label}  
  Format `uuid`.

:::api-example{label="Response"}
```json
{
  "SessionId": "00000000-0000-0000-0000-000000000000"
}
```
:::

## Request to fetch all the logs for the specified session

:endpoint{method="GET" path="/api/\{spaceId\}/observability/logs/sessions/\{sessionId\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/observability/logs/sessions/{sessionId}`.

**Path Parameters**

- **`sessionId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Response containing the logs for a sessionID

- **`Error`** :span[object]{.type-label}
  - **`ErrorCode`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ErrorMessage`** :span[string]{.type-label}  
    Minimum length 1.
- **`IsSessionCompleted`** :span[boolean]{.type-label}
- **`Logs`** :span[array of object]{.type-label}
  - **`Message`** :span[string]{.type-label}
  - **`Timestamp`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Error": {
    "ErrorCode": "string",
    "ErrorMessage": "string"
  },
  "IsSessionCompleted": false,
  "Logs": [
    {
      "Message": "string",
      "Timestamp": "string"
    }
  ]
}
```
:::

## Request the live status for a Project/Environment/Tenant

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/environments/\{environmentId\}/tenants/\{tenantId\}/livestatus"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/livestatus`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/untenanted/livestatus`, `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/untenanted/livestatus`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*
- **`tenantId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`summaryOnly`** :span[boolean]{.type-label}

**Response**

`200` — Live status for a given Project/Environment/Tenant

- **`MachineStatuses`** :span[array of object]{.type-label}
  - **`MachineId`** :span[string]{.type-label}
  - **`Resources`** :span[array of object]{.type-label}
  - **`Status`** :span[string]{.type-label}  
    Minimum length 1.
- **`Summary`** :span[object]{.type-label}
  - **`HealthStatus`** :span[string]{.type-label}  
    Minimum length 1.
  - **`LastUpdated`** :span[string]{.type-label}
  - **`Status`** :span[string]{.type-label}  
    Minimum length 1.
  - **`SyncStatus`** :span[string]{.type-label}  
    Minimum length 1.
  - **`SyncStatusMessage`** :span[string]{.type-label}
  - **`TotalOrphanCount`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "MachineStatuses": [
    {
      "MachineId": "Machines-1",
      "Resources": [
        {}
      ],
      "Status": "string"
    }
  ],
  "Summary": {
    "HealthStatus": "string",
    "LastUpdated": "string",
    "Status": "string",
    "SyncStatus": "string",
    "SyncStatusMessage": "string",
    "TotalOrphanCount": 0
  }
}
```
:::

## Get a detailed summary of a live Kubernetes resource - either a top-level resource or a child resource

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/environments/\{environmentId\}/tenants/\{tenantId\}/machines/\{sourceId\}/resources/\{desiredOrKubernetesMonitoredResourceId\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}`, `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}`.

**Path Parameters**

- **`desiredOrKubernetesMonitoredResourceId`** :span[string]{.type-label} *(required)*
- **`environmentId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`sourceId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*
- **`tenantId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Response containing detailed summary of a live kubernetes resource - Either a top level resource or a child resource

- **`Resource`** :span[object]{.type-label}
  - **`Children`** :span[array of object]{.type-label}
  - **`DesiredResourceId`** :span[string]{.type-label}  
    Format `uuid`.
  - **`ExternalLink`** :span[object]{.type-label}
  - **`HealthStatus`** :span[enum]{.type-label}  
    Allowed values: `Stale`.
  - **`HealthStatusMessage`** :span[string]{.type-label}
  - **`Kind`** :span[string]{.type-label}  
    Minimum length 1.
  - **`LastUpdated`** :span[string]{.type-label}
  - **`ManifestSummary`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Namespace`** :span[string]{.type-label}
  - **`ResourceId`** :span[string]{.type-label}  
    Format `uuid`.
  - **`ResourceSourceId`** :span[string]{.type-label}
  - **`SourceType`** :span[enum]{.type-label}  
    Allowed values: `KubernetesMonitor`, `ArgoCDInstance`, `ArgoCDApplication`.
  - **`SyncStatus`** :span[string]{.type-label}
  - **`SyncStatusMessage`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Resource": {
    "Children": [],
    "DesiredResourceId": "00000000-0000-0000-0000-000000000000",
    "ExternalLink": {
      "Label": "string",
      "Uri": "string"
    },
    "HealthStatus": "Stale",
    "HealthStatusMessage": "string",
    "Kind": "string",
    "LastUpdated": "string",
    "ManifestSummary": {
      "Annotations": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "CreationTimestamp": "2020-01-01T00:00:00.000Z",
      "Kind": "string",
      "Labels": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      }
    },
    "Name": "string",
    "Namespace": "string",
    "ResourceId": "00000000-0000-0000-0000-000000000000",
    "ResourceSourceId": "string",
    "SourceType": "KubernetesMonitor",
    "SyncStatus": "string",
    "SyncStatusMessage": "string"
  }
}
```
:::

## Request for retrieving the manifest for a live kubernetes resource

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/environments/\{environmentId\}/tenants/\{tenantId\}/machines/\{sourceId\}/resources/\{desiredOrKubernetesMonitoredResourceId\}/manifest"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest`, `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest`.

**Path Parameters**

- **`desiredOrKubernetesMonitoredResourceId`** :span[string]{.type-label} *(required)*
- **`environmentId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`sourceId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*
- **`tenantId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Contains the manifest for a live resource

- **`DesiredManifest`** :span[string]{.type-label}
- **`Diff`** :span[object]{.type-label}
  - **`Diff`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Left`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Right`** :span[string]{.type-label}  
    Minimum length 1.
- **`LiveManifest`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "DesiredManifest": "string",
  "Diff": {
    "Diff": "string",
    "Left": "string",
    "Right": "string"
  },
  "LiveManifest": "string"
}
```
:::

## Request for retrieving the manifest for a live kubernetes resource

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/environments/\{environmentId\}/tenants/\{tenantId\}/machines/\{sourceId\}/resources/\{desiredOrKubernetesMonitoredResourceId\}/manifest/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest/v2`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest/v2`, `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest/v2`.

**Path Parameters**

- **`desiredOrKubernetesMonitoredResourceId`** :span[string]{.type-label} *(required)*
- **`environmentId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`sourceId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*
- **`tenantId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Contains the manifest for a live resource

- **`DesiredManifest`** :span[string]{.type-label}
- **`Diff`** :span[object]{.type-label}
  - **`Diff`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Left`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Right`** :span[string]{.type-label}  
    Minimum length 1.
- **`LiveManifest`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "DesiredManifest": "string",
  "Diff": {
    "Diff": "string",
    "Left": "string",
    "Right": "string"
  },
  "LiveManifest": "string"
}
```
:::
