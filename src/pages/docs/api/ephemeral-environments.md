---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Ephemeral Environments
---

## Deprovision an ephemeral environment

:span[POST]{.api-post} `/api/{spaceId}/environments/ephemeral/{id}/deprovision`

Also reachable at `/api/spaces/{spaceIdentifier}/environments/ephemeral/{id}/deprovision`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the ephemeral environment to deprovision.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Deprovision an ephemeral environment response

- **`DeprovisioningRuns`** :span[array of object]{.type-label}
  - **`RunbookRunId`** :span[string]{.type-label}
  - **`TaskId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Allow the creation of an ephemeral environment in a given space

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/environments/ephemeral`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`EnvironmentName`** :span[string]{.type-label} *(required)*  
  The name to give the new ephemeral environment. Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "EnvironmentName": "string",
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

**Response**

`201` — Created

- **`Id`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string"
}
```
:::

## Deprovision an ephemeral environment for a specific project

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovision`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovision`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Deprovision an ephemeral environment response

- **`DeprovisioningRun`** :span[object]{.type-label}
  - **`RunbookRunId`** :span[string]{.type-label}
  - **`TaskId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "DeprovisioningRun": {
    "RunbookRunId": "string",
    "TaskId": "string"
  }
}
```
:::

## Mark a failed deprovisioning as successful for an ephemeral environment

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovisioning/mark-successful`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovisioning/mark-successful`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Response to mark deprovisioning as successful for an ephemeral environment

:::api-example{label="Response"}
```json
{}
```
:::

## Retry deprovisioning an ephemeral environment

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovisioning/retry`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{environmentId}/deprovisioning/retry`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Response to retry deprovisioning an ephemeral environment

- **`DeprovisioningRun`** :span[object]{.type-label}
  - **`RunbookRunId`** :span[string]{.type-label}
  - **`TaskId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "DeprovisioningRun": {
    "RunbookRunId": "string",
    "TaskId": "string"
  }
}
```
:::

## Mark a failed provisioning as successful for an ephemeral environment

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{environmentId}/provisioning/mark-successful`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{environmentId}/provisioning/mark-successful`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Response to mark provisioning as successful for an ephemeral environment

:::api-example{label="Response"}
```json
{}
```
:::

## Retry provisioning an ephemeral environment

:span[POST]{.api-post} `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{environmentId}/provisioning/retry`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{environmentId}/provisioning/retry`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Response to retry provisioning an ephemeral environment

- **`ProvisioningRun`** :span[object]{.type-label}
  - **`RunbookRunId`** :span[string]{.type-label}
  - **`TaskId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "ProvisioningRun": {
    "RunbookRunId": "string",
    "TaskId": "string"
  }
}
```
:::

## Get the status of an ephemeral environment for a given project

:span[GET]{.api-get} `/api/{spaceId}/projects/{projectId}/environments/ephemeral/{id}/status`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/environments/ephemeral/{id}/status`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the ephemeral environment whose status to report.
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

- **`Status`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Status": "string"
}
```
:::
