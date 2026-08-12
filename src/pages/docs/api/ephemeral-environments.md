---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Ephemeral Environments
---

## Deprovision an ephemeral environment

`POST` `/api/{spaceId}/environments/ephemeral/{id}/deprovision`

Also reachable at `/api/spaces/{spaceIdentifier}/environments/ephemeral/{id}/deprovision`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the ephemeral environment to deprovision.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Deprovision an ephemeral environment response

`DeprovisionEphemeralEnvironmentResponse`.

- **`DeprovisioningRuns`** <span class="type-label">array of object</span>
  - **`RunbookRunId`** <span class="type-label">string</span>
  - **`TaskId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "DeprovisioningRuns": [
    {
      "RunbookRunId": "string",
      "TaskId": "string"
    }
  ]
}
```
</div>

## Allows the creation of an ephemeral environment in a given space

`POST` `/api/{spaceId}/projects/{projectId}/environments/ephemeral`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateEphemeralEnvironmentCommand`

- **`EnvironmentName`** <span class="type-label">string</span> *(required)* — The name to give the new ephemeral environment. Minimum length 1.
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "EnvironmentName": "string",
  "ProjectId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

`CreateEphemeralEnvironmentResponse`.

- **`Id`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string"
}
```
</div>

## Deprovision an ephemeral environment for a specific project

`POST` `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovision`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovision`.

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Deprovision an ephemeral environment response

`DeprovisionEphemeralEnvironmentForProjectResponse`.

- **`DeprovisioningRun`** <span class="type-label">object</span>
  - **`RunbookRunId`** <span class="type-label">string</span>
  - **`TaskId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "DeprovisioningRun": {
    "RunbookRunId": "string",
    "TaskId": "string"
  }
}
```
</div>

## Command to mark a failed deprovisioning as successful for an ephemeral environment

`POST` `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovisioning/mark-successful`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovisioning/mark-successful`.

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Response to mark deprovisioning as successful for an ephemeral environment

`MarkEphemeralEnvironmentDeprovisioningSuccessfulResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Command to retry deprovisioning an ephemeral environment

`POST` `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovisioning/retry`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovisioning/retry`.

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Response to retry deprovisioning an ephemeral environment

`RetryDeprovisioningEphemeralEnvironmentResponse`.

- **`DeprovisioningRun`** <span class="type-label">object</span>
  - **`RunbookRunId`** <span class="type-label">string</span>
  - **`TaskId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "DeprovisioningRun": {
    "RunbookRunId": "string",
    "TaskId": "string"
  }
}
```
</div>

## Command to mark a failed provisioning as successful for an ephemeral environment

`POST` `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{environmentId}/provisioning/mark-successful`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{environmentId}/provisioning/mark-successful`.

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Response to mark provisioning as successful for an ephemeral environment

`MarkEphemeralEnvironmentProvisioningSuccessfulResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Command to retry provisioning an ephemeral environment

`POST` `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{environmentId}/provisioning/retry`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{environmentId}/provisioning/retry`.

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Response to retry provisioning an ephemeral environment

`RetryProvisioningEphemeralEnvironmentResponse`.

- **`ProvisioningRun`** <span class="type-label">object</span>
  - **`RunbookRunId`** <span class="type-label">string</span>
  - **`TaskId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ProvisioningRun": {
    "RunbookRunId": "string",
    "TaskId": "string"
  }
}
```
</div>

## Gets the status of an ephemeral environment for a given project

`GET` `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{id}/status`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{id}/status`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the ephemeral environment whose status to report.
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

`GetEphemeralEnvironmentProjectStatusResponse`.

- **`Status`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Status": "string"
}
```
</div>
