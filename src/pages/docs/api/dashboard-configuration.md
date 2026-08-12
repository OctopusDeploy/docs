---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Dashboard Configuration
---

## Get dashboard configuration

`GET` `/api/{spaceId}/dashboardconfiguration`

Also reachable at `/api/dashboardconfiguration`, `/api/spaces/{spaceIdentifier}/dashboardconfiguration`.

Gets the dashboard configuration of the authenticated user for the current space

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Dashboard Configuration

`DashboardConfigurationResource`.

- **`HideInactiveProjects`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IncludedEnvironmentIds`** <span class="type-label">array of string</span>
- **`IncludedEnvironmentTags`** <span class="type-label">array of string</span>
- **`IncludedProjectGroupIds`** <span class="type-label">array of string</span>
- **`IncludedProjectIds`** <span class="type-label">array of string</span>
- **`IncludedProjectTags`** <span class="type-label">array of string</span>
- **`IncludedTenantIds`** <span class="type-label">array of string</span>
- **`IncludedTenantTags`** <span class="type-label">array of string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectLimit`** <span class="type-label">integer</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "HideInactiveProjects": true,
  "Id": "string",
  "IncludedEnvironmentIds": [
    "string"
  ],
  "IncludedEnvironmentTags": [
    "string"
  ],
  "IncludedProjectGroupIds": [
    "string"
  ],
  "IncludedProjectIds": [
    "string"
  ],
  "IncludedProjectTags": [
    "string"
  ],
  "IncludedTenantIds": [
    "string"
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
  "SpaceId": "string"
}
```
</div>

## Modify dashboard configuration

`PUT` `/api/{spaceId}/dashboardconfiguration`

Also reachable at `/api/dashboardconfiguration`, `/api/spaces/{spaceIdentifier}/dashboardconfiguration`.

Modifies the dashboard configuration for the current user per space

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space for the DashboardConfiguration.

**Request Body**

`ModifyDashboardConfigurationCommand`

- **`HideInactiveProjects`** <span class="type-label">boolean</span> — Whether to hide inactive projects on the dashboard.
- **`IncludedEnvironmentIds`** <span class="type-label">array of string</span> — The ids of environments to be displayed on the dashboard.
- **`IncludedEnvironmentTags`** <span class="type-label">array of string</span> — The canonical tag names of environments to display on the dashboard.
- **`IncludedProjectGroupIds`** <span class="type-label">array of string</span> — The ids of project groups to be displayed on the dashboard.
- **`IncludedProjectIds`** <span class="type-label">array of string</span> — The ids of projects to be displayed on the dashboard.
- **`IncludedProjectTags`** <span class="type-label">array of string</span> — The canonical tag names of projects to display on the dashboard.
- **`IncludedTenantIds`** <span class="type-label">array of string</span> — The ids of tenants to be displayed on the dashboard.
- **`IncludedTenantTags`** <span class="type-label">array of string</span> — The canonical tag names to display on the dashboard.
- **`ProjectLimit`** <span class="type-label">integer</span> — The maximum number of projects to display on the dashboard.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The id of the space for the DashboardConfiguration.

<div data-example="Request">

```json
{
  "HideInactiveProjects": true,
  "IncludedEnvironmentIds": [
    "string"
  ],
  "IncludedEnvironmentTags": [
    "string"
  ],
  "IncludedProjectGroupIds": [
    "string"
  ],
  "IncludedProjectIds": [
    "string"
  ],
  "IncludedProjectTags": [
    "string"
  ],
  "IncludedTenantIds": [
    "string"
  ],
  "IncludedTenantTags": [
    "string"
  ],
  "ProjectLimit": 0,
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Dashboard Configuration was modified, containing the new configuration

`DashboardConfigurationResource`.

- **`HideInactiveProjects`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IncludedEnvironmentIds`** <span class="type-label">array of string</span>
- **`IncludedEnvironmentTags`** <span class="type-label">array of string</span>
- **`IncludedProjectGroupIds`** <span class="type-label">array of string</span>
- **`IncludedProjectIds`** <span class="type-label">array of string</span>
- **`IncludedProjectTags`** <span class="type-label">array of string</span>
- **`IncludedTenantIds`** <span class="type-label">array of string</span>
- **`IncludedTenantTags`** <span class="type-label">array of string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectLimit`** <span class="type-label">integer</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "HideInactiveProjects": true,
  "Id": "string",
  "IncludedEnvironmentIds": [
    "string"
  ],
  "IncludedEnvironmentTags": [
    "string"
  ],
  "IncludedProjectGroupIds": [
    "string"
  ],
  "IncludedProjectIds": [
    "string"
  ],
  "IncludedProjectTags": [
    "string"
  ],
  "IncludedTenantIds": [
    "string"
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
  "SpaceId": "string"
}
```
</div>
