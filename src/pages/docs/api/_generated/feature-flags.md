---
layout: src/layouts/Api.astro
pubDate: 2026-11-02
modDate: 2026-11-02
title: Feature Flags
---

## Generates an evaluation preview of every feature flag in a project for a single tenant in a single environment

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/evaluation-preview/environments/\{environmentId\}/tenants/\{tenantId\}/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/evaluation-preview/environments/{environmentId}/tenants/{tenantId}/v2`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*
- **`tenantId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`partialName`** :span[string]{.type-label}  
  Filters results to feature flags whose name or slug contains this text.
- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`tags`** :span[array of string]{.type-label}
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The evaluated state of a project's feature flags for a single tenant in a single environment.

- **`Flags`** :span[object]{.type-label}
  - **`ItemType`** :span[string]{.type-label}  
    The type of item in this list.
  - **`Items`** :span[array of object]{.type-label}
  - **`ItemsPerPage`** :span[integer]{.type-label}
  - **`LastPageNumber`** :span[integer]{.type-label}
  - **`NumberOfPages`** :span[integer]{.type-label}
  - **`TotalResults`** :span[integer]{.type-label}
- **`Version`** :span[string]{.type-label}  
  The release version the flags were evaluated against, taken from the release currently deployed to the environment for the tenant. Null when the tenant has nothing deployed there, in which case version conditions are treated as satisfied.

:::api-example{label="Response"}
```json
{
  "Flags": {
    "ItemType": "FeatureFlagEvaluationPreview",
    "Items": [
      {
        "Id": "string",
        "Name": "string",
        "Reason": "string",
        "Slug": "string",
        "Value": false
      }
    ],
    "ItemsPerPage": 30,
    "LastPageNumber": 1,
    "NumberOfPages": 2,
    "TotalResults": 42
  },
  "Version": "string"
}
```
:::

## Lists all feature flags within a project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/v2`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`environments`** :span[array of string]{.type-label}
- **`hasTargeting`** :span[boolean]{.type-label}
- **`partialName`** :span[string]{.type-label}  
  Filters results to feature flags whose name or slug contains this text.
- **`rolloutGroups`** :span[array of string]{.type-label}
- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`tags`** :span[array of string]{.type-label}
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}  
  The type of item in this list.
- **`Items`** :span[array of object]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DefaultIsEnabled`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectId`** :span[string]{.type-label}
  - **`RolloutGroupId`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}  
    Minimum length 1.
  - **`SpaceId`** :span[string]{.type-label}
  - **`Tags`** :span[array of string]{.type-label}
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ItemType": "FeatureFlagSummary",
  "Items": [
    {
      "Created": "2020-01-01T00:00:00.000Z",
      "DefaultIsEnabled": false,
      "Description": "string",
      "Environments": [
        {}
      ],
      "Id": "string",
      "Name": "string",
      "ProjectId": "Projects-1",
      "RolloutGroupId": "string",
      "Slug": "string",
      "SpaceId": "Spaces-1",
      "Tags": [
        "string"
      ]
    }
  ],
  "ItemsPerPage": 30,
  "LastPageNumber": 1,
  "NumberOfPages": 2,
  "TotalResults": 42
}
```
:::

## Creates a feature flag

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/v2`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Description`** :span[string]{.type-label}  
  Maximum length 1000.
- **`Environments`** :span[array of object]{.type-label} *(required)*
  - **`DeploymentEnvironmentId`** :span[string]{.type-label} *(required)*
  - **`IsEnabled`** :span[boolean]{.type-label} *(required)*
  - **`Phases`** :span[array of object]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 200.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`RolloutGroupId`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  The slug for the feature flag. When not supplied, a slug is generated from the name. Maximum length 200.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Tags`** :span[array of string]{.type-label}

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Environments": [
    {
      "DeploymentEnvironmentId": "Environments-1",
      "IsEnabled": false,
      "Phases": [
        {}
      ]
    }
  ],
  "Name": "string",
  "ProjectId": "Projects-1",
  "RolloutGroupId": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "Tags": [
    "string"
  ]
}
```
:::

**Response**

`201` — Created

- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DefaultIsEnabled`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Environments`** :span[array of object]{.type-label}
  - **`DeploymentEnvironmentId`** :span[string]{.type-label}
  - **`IsEnabled`** :span[boolean]{.type-label}
  - **`Phases`** :span[array of object]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label}
- **`RolloutGroupId`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`SpaceId`** :span[string]{.type-label}
- **`Tags`** :span[array of string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Created": "2020-01-01T00:00:00.000Z",
  "DefaultIsEnabled": false,
  "Description": "string",
  "Environments": [
    {
      "DeploymentEnvironmentId": "Environments-1",
      "IsEnabled": false,
      "Phases": [
        {}
      ]
    }
  ],
  "Id": "string",
  "Name": "string",
  "ProjectId": "Projects-1",
  "RolloutGroupId": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "Tags": [
    "string"
  ]
}
```
:::

## Clones a feature flag into the same project. The clone starts switched off in every environment with no phases enabled

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/\{featureFlagId\}/clone/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/{featureFlagId}/clone/v2`.

**Path Parameters**

- **`featureFlagId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`FeatureFlagId`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 200.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`Slug`** :span[string]{.type-label}  
  Maximum length 200.
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "FeatureFlagId": "string",
  "Name": "string",
  "ProjectId": "Projects-1",
  "Slug": "string",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`201` — Created

- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DefaultIsEnabled`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Environments`** :span[array of object]{.type-label}
  - **`DeploymentEnvironmentId`** :span[string]{.type-label}
  - **`IsEnabled`** :span[boolean]{.type-label}
  - **`Phases`** :span[array of object]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label}
- **`RolloutGroupId`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`SpaceId`** :span[string]{.type-label}
- **`Tags`** :span[array of string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Created": "2020-01-01T00:00:00.000Z",
  "DefaultIsEnabled": false,
  "Description": "string",
  "Environments": [
    {
      "DeploymentEnvironmentId": "Environments-1",
      "IsEnabled": false,
      "Phases": [
        {}
      ]
    }
  ],
  "Id": "string",
  "Name": "string",
  "ProjectId": "Projects-1",
  "RolloutGroupId": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "Tags": [
    "string"
  ]
}
```
:::

## Generates an evaluation preview for a feature flag across all environments in all project lifecycles, sorted in lifecycle order. Optionally scoped to a specific tenant; when no tenant is provided, the untenanted case is evaluated

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/\{featureFlagId\}/evaluation-preview/environments/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/{featureFlagId}/evaluation-preview/environments/v2`.

**Path Parameters**

- **`featureFlagId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`channelId`** :span[string]{.type-label}  
  Scopes the release version lookup to a single channel. When null, the most recently deployed release across all channels is used for each environment.
- **`partialName`** :span[string]{.type-label}  
  Filters results to environments whose name contains this text.
- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`tenantId`** :span[string]{.type-label}  
  Scopes the evaluation to a single tenant. When null, the untenanted case is evaluated.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}  
  The type of item in this list.
- **`Items`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`Reason`** :span[string]{.type-label}  
    A human-readable explanation of why the flag evaluated to the value it did. Minimum length 1.
  - **`Value`** :span[boolean]{.type-label}  
    The value the flag evaluated to (true or false).
  - **`Version`** :span[string]{.type-label}  
    The release version used to evaluate version conditions. Null when nothing has been deployed to the environment for the project (and tenant, when the preview is scoped to one).
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ItemType": "EnvironmentFeatureFlagEvaluationPreview",
  "Items": [
    {
      "EnvironmentId": "Environments-1",
      "Reason": "string",
      "Value": false,
      "Version": "string"
    }
  ],
  "ItemsPerPage": 30,
  "LastPageNumber": 1,
  "NumberOfPages": 2,
  "TotalResults": 42
}
```
:::

## Generates an evaluation preview for an unsaved configuration of a feature flag across all environments in all project lifecycles, sorted in lifecycle order, alongside the evaluation for the flag's saved configuration. Optionally scoped to a specific tenant; when no tenant is provided, the untenanted case is evaluated. Nothing is saved

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/\{featureFlagId\}/evaluation-preview/environments/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/{featureFlagId}/evaluation-preview/environments/v2`.

**Path Parameters**

- **`featureFlagId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChannelId`** :span[string]{.type-label}  
  Scopes the release version lookup to a single channel. When null, the most recently deployed release across all channels is used for each environment.
- **`DefaultIsEnabled`** :span[boolean]{.type-label}  
  The unsaved default value of the flag.
- **`Environments`** :span[array of object]{.type-label} *(required)*  
  The unsaved rollout configuration of the flag, in the same shape the flag is modified with.
  - **`DeploymentEnvironmentId`** :span[string]{.type-label} *(required)*
  - **`IsEnabled`** :span[boolean]{.type-label} *(required)*
  - **`Phases`** :span[array of object]{.type-label} *(required)*
- **`FeatureFlagId`** :span[string]{.type-label} *(required)*
- **`PartialName`** :span[string]{.type-label}  
  Filters results to environments whose name contains this text.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`RolloutGroupId`** :span[string]{.type-label}  
  The unsaved rollout group of the flag.
- **`Skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`TenantId`** :span[string]{.type-label}  
  Scopes the evaluation to a single tenant. When null, the untenanted case is evaluated.

:::api-example{label="Request"}
```json
{
  "ChannelId": "Channels-1",
  "DefaultIsEnabled": false,
  "Environments": [
    {
      "DeploymentEnvironmentId": "Environments-1",
      "IsEnabled": false,
      "Phases": [
        {}
      ]
    }
  ],
  "FeatureFlagId": "string",
  "PartialName": "string",
  "ProjectId": "Projects-1",
  "RolloutGroupId": "string",
  "Skip": 0,
  "SpaceId": "Spaces-1",
  "Take": 0,
  "TenantId": "Tenants-1"
}
```
:::

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}  
  The type of item in this list.
- **`Items`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`Saved`** :span[object]{.type-label}
  - **`Unsaved`** :span[object]{.type-label}
  - **`Version`** :span[string]{.type-label}  
    The release version used to evaluate version conditions. Null when nothing has been deployed to the environment for the project (and tenant, when the preview is scoped to one).
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ItemType": "EnvironmentFeatureFlagEvaluationComparison",
  "Items": [
    {
      "EnvironmentId": "Environments-1",
      "Saved": {
        "Reason": "string",
        "Value": false
      },
      "Unsaved": {
        "Reason": "string",
        "Value": false
      },
      "Version": "string"
    }
  ],
  "ItemsPerPage": 30,
  "LastPageNumber": 1,
  "NumberOfPages": 2,
  "TotalResults": 42
}
```
:::

## Generates an evaluation preview for a feature flag across all tenants connected to the given project and environment. The untenanted case is included as the first entry of the first page

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/\{featureFlagId\}/evaluation-preview/tenants/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/{featureFlagId}/evaluation-preview/tenants/v2`.

**Path Parameters**

- **`featureFlagId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`channelId`** :span[string]{.type-label}  
  Scopes the release version lookup to a single channel. When null, the most recently deployed release across all channels is used for each tenant.
- **`environmentId`** :span[string]{.type-label} *(required)*
- **`partialName`** :span[string]{.type-label}  
  Filters results to tenants whose name contains this text.
- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}  
  The type of item in this list.
- **`Items`** :span[array of object]{.type-label}
  - **`Reason`** :span[string]{.type-label}  
    A human-readable explanation of why the flag evaluated to the value it did. Minimum length 1.
  - **`TenantId`** :span[string]{.type-label}
  - **`Value`** :span[boolean]{.type-label}  
    The value the flag evaluated to (true or false).
  - **`Version`** :span[string]{.type-label}  
    The release version used to evaluate version conditions. Null when nothing has been deployed for the tenant in the project and environment.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ItemType": "TenantFeatureFlagEvaluationPreview",
  "Items": [
    {
      "Reason": "string",
      "TenantId": "Tenants-1",
      "Value": false,
      "Version": "string"
    }
  ],
  "ItemsPerPage": 30,
  "LastPageNumber": 1,
  "NumberOfPages": 2,
  "TotalResults": 42
}
```
:::

## Generates an evaluation preview for an unsaved configuration of a feature flag across all tenants connected to the given project and environment, alongside the evaluation for the flag's saved configuration. The untenanted case is included as the first entry of the first page. Nothing is saved

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/\{featureFlagId\}/evaluation-preview/tenants/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/{featureFlagId}/evaluation-preview/tenants/v2`.

**Path Parameters**

- **`featureFlagId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChannelId`** :span[string]{.type-label}  
  Scopes the release version lookup to a single channel. When null, the most recently deployed release across all channels is used for each tenant.
- **`DefaultIsEnabled`** :span[boolean]{.type-label}  
  The unsaved default value of the flag.
- **`EnvironmentId`** :span[string]{.type-label} *(required)*
- **`Environments`** :span[array of object]{.type-label} *(required)*  
  The unsaved rollout configuration of the flag, in the same shape the flag is modified with.
  - **`DeploymentEnvironmentId`** :span[string]{.type-label} *(required)*
  - **`IsEnabled`** :span[boolean]{.type-label} *(required)*
  - **`Phases`** :span[array of object]{.type-label} *(required)*
- **`FeatureFlagId`** :span[string]{.type-label} *(required)*
- **`PartialName`** :span[string]{.type-label}  
  Filters results to tenants whose name contains this text.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`RolloutGroupId`** :span[string]{.type-label}  
  The unsaved rollout group of the flag.
- **`Skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Defaults to 30. Minimum `0`.

:::api-example{label="Request"}
```json
{
  "ChannelId": "Channels-1",
  "DefaultIsEnabled": false,
  "EnvironmentId": "Environments-1",
  "Environments": [
    {
      "DeploymentEnvironmentId": "Environments-1",
      "IsEnabled": false,
      "Phases": [
        {}
      ]
    }
  ],
  "FeatureFlagId": "string",
  "PartialName": "string",
  "ProjectId": "Projects-1",
  "RolloutGroupId": "string",
  "Skip": 0,
  "SpaceId": "Spaces-1",
  "Take": 0
}
```
:::

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}  
  The type of item in this list.
- **`Items`** :span[array of object]{.type-label}
  - **`Saved`** :span[object]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
  - **`Unsaved`** :span[object]{.type-label}
  - **`Version`** :span[string]{.type-label}  
    The release version used to evaluate version conditions. Null when nothing has been deployed for the tenant in the project and environment.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ItemType": "TenantFeatureFlagEvaluationComparison",
  "Items": [
    {
      "Saved": {
        "Reason": "string",
        "Value": false
      },
      "TenantId": "Tenants-1",
      "Unsaved": {
        "Reason": "string",
        "Value": false
      },
      "Version": "string"
    }
  ],
  "ItemsPerPage": 30,
  "LastPageNumber": 1,
  "NumberOfPages": 2,
  "TotalResults": 42
}
```
:::

## Retrieves a feature flag by ID

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/\{id\}/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/{id}/v2`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — A feature flag.

- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DefaultIsEnabled`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Environments`** :span[array of object]{.type-label}
  - **`DeploymentEnvironmentId`** :span[string]{.type-label}
  - **`IsEnabled`** :span[boolean]{.type-label}
  - **`Phases`** :span[array of object]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label}
- **`RolloutGroupId`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`SpaceId`** :span[string]{.type-label}
- **`Tags`** :span[array of string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Created": "2020-01-01T00:00:00.000Z",
  "DefaultIsEnabled": false,
  "Description": "string",
  "Environments": [
    {
      "DeploymentEnvironmentId": "Environments-1",
      "IsEnabled": false,
      "Phases": [
        {}
      ]
    }
  ],
  "Id": "string",
  "Name": "string",
  "ProjectId": "Projects-1",
  "RolloutGroupId": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "Tags": [
    "string"
  ]
}
```
:::

## Modifies a feature flag

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/\{id\}/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/{id}/v2`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`DefaultIsEnabled`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}  
  Maximum length 1000.
- **`Environments`** :span[array of object]{.type-label} *(required)*
  - **`DeploymentEnvironmentId`** :span[string]{.type-label} *(required)*
  - **`IsEnabled`** :span[boolean]{.type-label} *(required)*
  - **`Phases`** :span[array of object]{.type-label} *(required)*
- **`Id`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 200.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`RolloutGroupId`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label} *(required)*  
  Minimum length 1. Maximum length 200.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Tags`** :span[array of string]{.type-label}

:::api-example{label="Request"}
```json
{
  "DefaultIsEnabled": false,
  "Description": "string",
  "Environments": [
    {
      "DeploymentEnvironmentId": "Environments-1",
      "IsEnabled": false,
      "Phases": [
        {}
      ]
    }
  ],
  "Id": "string",
  "Name": "string",
  "ProjectId": "Projects-1",
  "RolloutGroupId": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "Tags": [
    "string"
  ]
}
```
:::

**Response**

`200` — A feature flag.

- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`DefaultIsEnabled`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Environments`** :span[array of object]{.type-label}
  - **`DeploymentEnvironmentId`** :span[string]{.type-label}
  - **`IsEnabled`** :span[boolean]{.type-label}
  - **`Phases`** :span[array of object]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectId`** :span[string]{.type-label}
- **`RolloutGroupId`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  Minimum length 1.
- **`SpaceId`** :span[string]{.type-label}
- **`Tags`** :span[array of string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Created": "2020-01-01T00:00:00.000Z",
  "DefaultIsEnabled": false,
  "Description": "string",
  "Environments": [
    {
      "DeploymentEnvironmentId": "Environments-1",
      "IsEnabled": false,
      "Phases": [
        {}
      ]
    }
  ],
  "Id": "string",
  "Name": "string",
  "ProjectId": "Projects-1",
  "RolloutGroupId": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "Tags": [
    "string"
  ]
}
```
:::

## Deletes a feature flag

:endpoint{method="DELETE" path="/api/\{spaceId\}/projects/\{projectId\}/feature-flags/\{id\}/v2"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/feature-flags/{id}/v2`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Response from deleting a rule-based (V2) feature flag

:::api-example{label="Response"}
```json
{}
```
:::
