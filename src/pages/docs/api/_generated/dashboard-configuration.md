---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Dashboard Configuration
---

## Get dashboard configuration

:endpoint{method="GET" path="/api/\{spaceId\}/dashboardconfiguration"}

Also reachable at `/api/dashboardconfiguration`, `/api/spaces/{spaceIdentifier}/dashboardconfiguration`.

Gets the dashboard configuration of the authenticated user for the current space

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Dashboard Configuration

- **`HideInactiveProjects`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IncludedEnvironmentIds`** :span[array of string]{.type-label}
- **`IncludedEnvironmentTags`** :span[array of string]{.type-label}
- **`IncludedProjectGroupIds`** :span[array of string]{.type-label}
- **`IncludedProjectIds`** :span[array of string]{.type-label}
- **`IncludedProjectTags`** :span[array of string]{.type-label}
- **`IncludedTenantIds`** :span[array of string]{.type-label}
- **`IncludedTenantTags`** :span[array of string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectLimit`** :span[integer]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "HideInactiveProjects": true,
  "Id": "string",
  "IncludedEnvironmentIds": [
    "Environments-1",
    "..."
  ],
  "IncludedEnvironmentTags": [
    "string"
  ],
  "IncludedProjectGroupIds": [
    "string"
  ],
  "IncludedProjectIds": [
    "Projects-1",
    "..."
  ],
  "IncludedProjectTags": [
    "string"
  ],
  "IncludedTenantIds": [
    "Tenants-1",
    "..."
  ],
  "IncludedTenantTags": [
    "string"
  ],
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectLimit": 0,
  "SpaceId": "Spaces-1"
}
```
:::

## Modify dashboard configuration

:endpoint{method="PUT" path="/api/\{spaceId\}/dashboardconfiguration"}

Also reachable at `/api/dashboardconfiguration`, `/api/spaces/{spaceIdentifier}/dashboardconfiguration`.

Modifies the dashboard configuration for the current user per space

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space for the DashboardConfiguration.

**Request Body**

- **`HideInactiveProjects`** :span[boolean]{.type-label}  
  Whether to hide inactive projects on the dashboard.
- **`IncludedEnvironmentIds`** :span[array of string]{.type-label}  
  The ids of environments to be displayed on the dashboard.
- **`IncludedEnvironmentTags`** :span[array of string]{.type-label}  
  The canonical tag names of environments to display on the dashboard.
- **`IncludedProjectGroupIds`** :span[array of string]{.type-label}  
  The ids of project groups to be displayed on the dashboard.
- **`IncludedProjectIds`** :span[array of string]{.type-label}  
  The ids of projects to be displayed on the dashboard.
- **`IncludedProjectTags`** :span[array of string]{.type-label}  
  The canonical tag names of projects to display on the dashboard.
- **`IncludedTenantIds`** :span[array of string]{.type-label}  
  The ids of tenants to be displayed on the dashboard.
- **`IncludedTenantTags`** :span[array of string]{.type-label}  
  The canonical tag names to display on the dashboard.
- **`ProjectLimit`** :span[integer]{.type-label}  
  The maximum number of projects to display on the dashboard.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The id of the space for the DashboardConfiguration.

:::api-example{label="Request"}
```json
{
  "HideInactiveProjects": true,
  "IncludedEnvironmentIds": [
    "Environments-1",
    "..."
  ],
  "IncludedEnvironmentTags": [
    "string"
  ],
  "IncludedProjectGroupIds": [
    "string"
  ],
  "IncludedProjectIds": [
    "Projects-1",
    "..."
  ],
  "IncludedProjectTags": [
    "string"
  ],
  "IncludedTenantIds": [
    "Tenants-1",
    "..."
  ],
  "IncludedTenantTags": [
    "string"
  ],
  "ProjectLimit": 0,
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Confirmation that the Dashboard Configuration was modified, containing the new configuration

- **`HideInactiveProjects`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IncludedEnvironmentIds`** :span[array of string]{.type-label}
- **`IncludedEnvironmentTags`** :span[array of string]{.type-label}
- **`IncludedProjectGroupIds`** :span[array of string]{.type-label}
- **`IncludedProjectIds`** :span[array of string]{.type-label}
- **`IncludedProjectTags`** :span[array of string]{.type-label}
- **`IncludedTenantIds`** :span[array of string]{.type-label}
- **`IncludedTenantTags`** :span[array of string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectLimit`** :span[integer]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "HideInactiveProjects": true,
  "Id": "string",
  "IncludedEnvironmentIds": [
    "Environments-1",
    "..."
  ],
  "IncludedEnvironmentTags": [
    "string"
  ],
  "IncludedProjectGroupIds": [
    "string"
  ],
  "IncludedProjectIds": [
    "Projects-1",
    "..."
  ],
  "IncludedProjectTags": [
    "string"
  ],
  "IncludedTenantIds": [
    "Tenants-1",
    "..."
  ],
  "IncludedTenantTags": [
    "string"
  ],
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectLimit": 0,
  "SpaceId": "Spaces-1"
}
```
:::
