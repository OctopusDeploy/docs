---
layout: src/layouts/Api.astro
pubDate: 2026-10-30
modDate: 2026-10-30
title: Feature Toggles
---

## Queues a publish of a project's feature flag manifest to the feature flag service

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/publish"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/publish`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Acknowledges that a publish of the project's feature flag manifest has been queued.

:::api-example{label="Response"}
```json
{}
```
:::

## Lists the attempts to publish a project's feature flag manifest to the feature flag service, newest first

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/publish-attempts"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/publish-attempts`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}  
  The type of item in this list.
- **`Items`** :span[array of object]{.type-label}
  - **`CompletedAt`** :span[string]{.type-label}  
    Format `date-time`.
  - **`FailureCategory`** :span[string]{.type-label}  
    Why a failed attempt failed: RegistrationFailed, MissingLicenseSerialNumber, MissingSigningKey, NetworkError, HttpError or Unexpected. Not set when the attempt succeeded.
  - **`HttpStatusCode`** :span[integer]{.type-label}  
    The status code the feature flag service responded with, when a failed attempt received a response.
  - **`Id`** :span[string]{.type-label}
  - **`Outcome`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`StartedAt`** :span[string]{.type-label}  
    Format `date-time`.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ItemType": "FeatureFlagPublishAttempt",
  "Items": [
    {
      "CompletedAt": "2020-01-01T00:00:00.000Z",
      "FailureCategory": "string",
      "HttpStatusCode": 0,
      "Id": "string",
      "Outcome": "string",
      "ProjectId": "Projects-1",
      "SpaceId": "Spaces-1",
      "StartedAt": "2020-01-01T00:00:00.000Z"
    }
  ],
  "ItemsPerPage": 30,
  "LastPageNumber": 1,
  "NumberOfPages": 2,
  "TotalResults": 42
}
```
:::

## Generates a feature toggle client identifier for a given project, environment, and tenant

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/featuretoggles/generate-client-identifier"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/featuretoggles/generate-client-identifier`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`EnvironmentId`** :span[string]{.type-label} *(required)*
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantId`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "EnvironmentId": "Environments-1",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
  "TenantId": "Tenants-1"
}
```
:::

**Response**

`200` — A generated feature toggle client identifier for a given project, environment, and tenant.

- **`ClientIdentifier`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "ClientIdentifier": "string"
}
```
:::

## Rotates the feature toggle client identifier signing keys for a project

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/featuretoggles/rotate-client-identifier-signing-key"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/featuretoggles/rotate-client-identifier-signing-key`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`CompleteRotation`** :span[boolean]{.type-label} *(required)*
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "CompleteRotation": false,
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Acks the completion of the rotation of the feature toggle client identifier signing keys for a project.

:::api-example{label="Response"}
```json
{}
```
:::
