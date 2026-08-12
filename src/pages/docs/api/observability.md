---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Observability
---

## Registers and trusts new Kubernetes Monitor

`POST` `/api/{spaceId}/observability/agents`

Also reachable at `/api/spaces/{spaceIdentifier}/observability/agents`, `/api/spaces/{spaceIdentifier}/observability/kubernetes-monitors`, `/api/{spaceId}/observability/kubernetes-monitors`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`RegisterKubernetesMonitorCommand`

- **`InstallationId`** <span class="type-label">string</span> *(required)* — Installation ID of that uniquely identifies the physical installation of the agent. Format `uuid`.
- **`MachineId`** <span class="type-label">string</span> *(required)* — Machine ID of that uniquely identifies the deployment target or worker that is being observed.
- **`PreserveAuthenticationToken`** <span class="type-label">boolean</span> — Controls whether the authentication token should be preserved during re-registration. If not supplied (null), the token will be regenerated (default behavior). If false, the token will be regenerated. If true, the existing token will be preserved.
- **`SpaceId`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "InstallationId": "00000000-0000-0000-0000-000000000000",
  "MachineId": "string",
  "PreserveAuthenticationToken": true,
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Response containing the registered agent.

`RegisterKubernetesMonitorResponse`.

- **`AuthenticationToken`** <span class="type-label">string</span> — Authentication token for the monitor. Will be null if PreserveAuthenticationToken was set to true in the request and not registering a new monitor.
- **`CertificateThumbprint`** <span class="type-label">string</span> — Minimum length 1.
- **`Resource`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`InstallationId`** <span class="type-label">string</span> — Format `uuid`.
  - **`MachineId`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AuthenticationToken": "string",
  "CertificateThumbprint": "string",
  "Resource": {
    "Id": "string",
    "InstallationId": "00000000-0000-0000-0000-000000000000",
    "MachineId": "string",
    "SpaceId": "string"
  }
}
```
</div>

## Command to request the Kubernetes monitor to start sending events for the specified resource

`POST` `/api/{spaceId}/observability/events/sessions`

Also reachable at `/api/spaces/{spaceIdentifier}/observability/events/sessions`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`BeginResourceEventsSessionCommand`

- **`DesiredOrKubernetesMonitoredResourceId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`EnvironmentId`** <span class="type-label">string</span> *(required)*
- **`MachineId`** <span class="type-label">string</span> *(required)*
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantId`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "DesiredOrKubernetesMonitoredResourceId": "string",
  "EnvironmentId": "string",
  "MachineId": "string",
  "ProjectId": "string",
  "SpaceId": "string",
  "TenantId": "string"
}
```
</div>

**Response**

`200` — Confirmation response containing a session ID for the event session

`BeginResourceEventsSessionResponse`.

- **`SessionId`** <span class="type-label">string</span> — Format `uuid`.

<div data-example="Response">

```json
{
  "SessionId": "00000000-0000-0000-0000-000000000000"
}
```
</div>

## Request to fetch all the events for the specified session

`GET` `/api/{spaceId}/observability/events/sessions/{sessionId}`

Also reachable at `/api/spaces/{spaceIdentifier}/observability/events/sessions/{sessionId}`.

**Parameters**

- **`sessionId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Response containing the events for a sessionID

`GetResourceEventsResponse`.

- **`Error`** <span class="type-label">object</span>
  - **`ErrorCode`** <span class="type-label">string</span> — Minimum length 1.
  - **`ErrorMessage`** <span class="type-label">string</span> — Minimum length 1.
- **`Events`** <span class="type-label">array of object</span>
  - **`Action`** <span class="type-label">string</span>
  - **`Count`** <span class="type-label">integer</span>
  - **`FirstObservedTime`** <span class="type-label">string</span>
  - **`LastObservedTime`** <span class="type-label">string</span>
  - **`Manifest`** <span class="type-label">string</span>
  - **`Note`** <span class="type-label">string</span>
  - **`Reason`** <span class="type-label">string</span>
  - **`ReportingController`** <span class="type-label">string</span>
  - **`ReportingInstance`** <span class="type-label">string</span>
  - **`Type`** <span class="type-label">string</span>
- **`IsSessionCompleted`** <span class="type-label">boolean</span>

<div data-example="Response">

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
  "IsSessionCompleted": true
}
```
</div>

## Get a Kubernetes Monitor by ID

`GET` `/api/{spaceId}/observability/kubernetes-monitors/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/observability/kubernetes-monitors/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Kubernetes Monitor.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Kubernetes Monitor

`GetKubernetesMonitorByIdResponse`.

- **`Resource`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`InstallationId`** <span class="type-label">string</span> — Format `uuid`.
  - **`MachineId`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Resource": {
    "Id": "string",
    "InstallationId": "00000000-0000-0000-0000-000000000000",
    "MachineId": "string",
    "SpaceId": "string"
  }
}
```
</div>

## Delete a Kubernetes Monitor by ID

`DELETE` `/api/{spaceId}/observability/kubernetes-monitors/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/observability/kubernetes-monitors/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Kubernetes Monitor.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Response for deleting a Kubernetes Monitor

`DeleteKubernetesMonitorByIdResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Command to request the Kubernetes monitor to start sending logs for the specified container

`POST` `/api/{spaceId}/observability/logs/sessions`

Also reachable at `/api/spaces/{spaceIdentifier}/observability/logs/sessions`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`BeginContainerLogsSessionCommand`

- **`ContainerName`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`DesiredOrKubernetesMonitoredResourceId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`EnvironmentId`** <span class="type-label">string</span> *(required)*
- **`MachineId`** <span class="type-label">string</span> *(required)*
- **`PodName`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`ShowPreviousContainer`** <span class="type-label">boolean</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantId`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "ContainerName": "string",
  "DesiredOrKubernetesMonitoredResourceId": "string",
  "EnvironmentId": "string",
  "MachineId": "string",
  "PodName": "string",
  "ProjectId": "string",
  "ShowPreviousContainer": true,
  "SpaceId": "string",
  "TenantId": "string"
}
```
</div>

**Response**

`200` — Confirmation response containing any errors that might have occurred during communications with the Kubernetes Monitor

`BeginContainerLogsSessionResponse`.

- **`SessionId`** <span class="type-label">string</span> — Format `uuid`.

<div data-example="Response">

```json
{
  "SessionId": "00000000-0000-0000-0000-000000000000"
}
```
</div>

## Request to fetch all the logs for the specified session

`GET` `/api/{spaceId}/observability/logs/sessions/{sessionId}`

Also reachable at `/api/spaces/{spaceIdentifier}/observability/logs/sessions/{sessionId}`.

**Parameters**

- **`sessionId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Response containing the logs for a sessionID

`GetContainerLogsResponse`.

- **`Error`** <span class="type-label">object</span>
  - **`ErrorCode`** <span class="type-label">string</span> — Minimum length 1.
  - **`ErrorMessage`** <span class="type-label">string</span> — Minimum length 1.
- **`IsSessionCompleted`** <span class="type-label">boolean</span>
- **`Logs`** <span class="type-label">array of object</span>
  - **`Message`** <span class="type-label">string</span>
  - **`Timestamp`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Error": {
    "ErrorCode": "string",
    "ErrorMessage": "string"
  },
  "IsSessionCompleted": true,
  "Logs": [
    {
      "Message": "string",
      "Timestamp": "string"
    }
  ]
}
```
</div>

## Request the live status for a Project/Environment/Tenant

`GET` `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/livestatus`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/livestatus`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/untenanted/livestatus`, `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/untenanted/livestatus`.

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`tenantId`** <span class="type-label">string</span> *(required)*

- **`orphansOnly`** <span class="type-label">boolean</span>
- **`summaryOnly`** <span class="type-label">boolean</span>

**Response**

`200` — Live status for a given Project/Environment/Tenant

`GetLiveStatusResponse`.

- **`MachineStatuses`** <span class="type-label">array of object</span>
  - **`MachineId`** <span class="type-label">string</span>
  - **`Resources`** <span class="type-label">array of object</span>
  - **`Status`** <span class="type-label">string</span> — Minimum length 1.
- **`Summary`** <span class="type-label">object</span>
  - **`HealthStatus`** <span class="type-label">string</span> — Minimum length 1.
  - **`LastUpdated`** <span class="type-label">string</span>
  - **`Status`** <span class="type-label">string</span> — Minimum length 1.
  - **`SyncStatus`** <span class="type-label">string</span> — Minimum length 1.
  - **`SyncStatusMessage`** <span class="type-label">string</span>
  - **`TotalOrphanCount`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "MachineStatuses": [
    {
      "MachineId": "string",
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
</div>

## Gets a detailed summary of a live Kubernetes resource - either a top-level resource or a child resource

`GET` `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}`, `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}`.

**Parameters**

- **`desiredOrKubernetesMonitoredResourceId`** <span class="type-label">string</span> *(required)*
- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`sourceId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`tenantId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Response containing detailed summary of a live kubernetes resource - Either a top level resource or a child resource

`GetResourceResponse`.

- **`Resource`** <span class="type-label">object</span>
  - **`Children`** <span class="type-label">array of object</span>
  - **`DesiredResourceId`** <span class="type-label">string</span> — Format `uuid`.
  - **`ExternalLink`** <span class="type-label">object</span>
  - **`HealthStatus`** <span class="type-label">enum</span> — Allowed values: `Stale`.
  - **`HealthStatusMessage`** <span class="type-label">string</span>
  - **`Kind`** <span class="type-label">string</span> — Minimum length 1.
  - **`LastUpdated`** <span class="type-label">string</span>
  - **`ManifestSummary`** <span class="type-label">object</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Namespace`** <span class="type-label">string</span>
  - **`ResourceId`** <span class="type-label">string</span> — Format `uuid`.
  - **`ResourceSourceId`** <span class="type-label">string</span>
  - **`SourceType`** <span class="type-label">enum</span> — Allowed values: `KubernetesMonitor`, `ArgoCDInstance`, `ArgoCDApplication`.
  - **`SyncStatus`** <span class="type-label">string</span>
  - **`SyncStatusMessage`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Request for retrieving the manifest for a live kubernetes resource

`GET` `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest`, `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest`.

**Parameters**

- **`desiredOrKubernetesMonitoredResourceId`** <span class="type-label">string</span> *(required)*
- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`sourceId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`tenantId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Contains the manifest for a live resource

`GetResourceManifestResponse`.

- **`DesiredManifest`** <span class="type-label">string</span>
- **`Diff`** <span class="type-label">object</span>
  - **`Diff`** <span class="type-label">string</span> — Minimum length 1.
  - **`Left`** <span class="type-label">string</span> — Minimum length 1.
  - **`Right`** <span class="type-label">string</span> — Minimum length 1.
- **`LiveManifest`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## Request for retrieving the manifest for a live kubernetes resource

`GET` `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest/v2`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/tenants/{tenantId}/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest/v2`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest/v2`, `/api/{spaceId}/projects/{projectId}/environments/{environmentId}/untenanted/machines/{sourceId}/resources/{desiredOrKubernetesMonitoredResourceId}/manifest/v2`.

**Parameters**

- **`desiredOrKubernetesMonitoredResourceId`** <span class="type-label">string</span> *(required)*
- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`sourceId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*
- **`tenantId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Contains the manifest for a live resource

`GetResourceManifestResponseV2`.

- **`DesiredManifest`** <span class="type-label">string</span>
- **`Diff`** <span class="type-label">object</span>
  - **`Diff`** <span class="type-label">string</span> — Minimum length 1.
  - **`Left`** <span class="type-label">string</span> — Minimum length 1.
  - **`Right`** <span class="type-label">string</span> — Minimum length 1.
- **`LiveManifest`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>
