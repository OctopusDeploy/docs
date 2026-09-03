---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-09-03
title: Insights
---

## Get a list of Insights Reports

:endpoint{method="GET" path="/api/\{spaceId\}/insights/reports"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports`.

Returns a paginated list of the Insights Reports in the supplied Octopus Deploy Space.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`AllTenants`** :span[boolean]{.type-label}
  - **`ChannelIds`** :span[array of string]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`EnvironmentGroups`** :span[array of object]{.type-label}
  - **`IconColor`** :span[string]{.type-label}
  - **`IconId`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectGroupIds`** :span[array of string]{.type-label}
  - **`ProjectIds`** :span[array of string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TenantIds`** :span[array of string]{.type-label}
  - **`TenantMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
  - **`TenantTags`** :span[array of string]{.type-label}
  - **`TimeZone`** :span[string]{.type-label}
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
      "AllTenants": false,
      "ChannelIds": [
        "Channels-1",
        "..."
      ],
      "Description": "string",
      "EnvironmentGroups": [
        {}
      ],
      "IconColor": "string",
      "IconId": "string",
      "Id": "InsightsReports-1",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "ProjectGroupIds": [
        "ProjectGroups-1",
        "..."
      ],
      "ProjectIds": [
        "Projects-1",
        "..."
      ],
      "SpaceId": "Spaces-1",
      "TenantIds": [
        "Tenants-1",
        "..."
      ],
      "TenantMode": "Untenanted",
      "TenantTags": [
        "string"
      ],
      "TimeZone": "string"
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

## Create an Insights Report

:endpoint{method="POST" path="/api/\{spaceId\}/insights/reports"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports`.

Creates a new Insights Report.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AllTenants`** :span[boolean]{.type-label}  
  If true, all tenants in the space will be included in the report.
- **`ChannelIds`** :span[array of string]{.type-label} *(required)*  
  The channels for the report.
- **`Description`** :span[string]{.type-label}  
  The description for the report.
- **`EnvironmentGroups`** :span[array of object]{.type-label} *(required)*  
  The environment groups for the report.
  - **`Environments`** :span[array of string]{.type-label} *(required)*
  - **`Name`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the report. Minimum length 1. Maximum length 200.
- **`ProjectGroupIds`** :span[array of string]{.type-label} *(required)*  
  The project groups for the report.
- **`ProjectIds`** :span[array of string]{.type-label} *(required)*  
  The projects for the report.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantIds`** :span[array of string]{.type-label} *(required)*  
  The tenants for the report.
- **`TenantMode`** :span[enum]{.type-label}  
  The kind of deployments that will be included in this report.  
  Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** :span[array of string]{.type-label} *(required)*  
  The tenant tags the report.
- **`TimeZone`** :span[string]{.type-label} *(required)*  
  The timezone of the report.

:::api-example{label="Request"}
```json
{
  "AllTenants": false,
  "ChannelIds": [
    "Channels-1",
    "..."
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "Environments-1",
        "..."
      ],
      "Name": "string"
    }
  ],
  "Name": "string",
  "ProjectGroupIds": [
    "ProjectGroups-1",
    "..."
  ],
  "ProjectIds": [
    "Projects-1",
    "..."
  ],
  "SpaceId": "Spaces-1",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
:::

**Response**

`200` — Success

- **`AllTenants`** :span[boolean]{.type-label}
- **`ChannelIds`** :span[array of string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EnvironmentGroups`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
- **`IconColor`** :span[string]{.type-label}
- **`IconId`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectGroupIds`** :span[array of string]{.type-label}
- **`ProjectIds`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** :span[array of string]{.type-label}
- **`TimeZone`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AllTenants": false,
  "ChannelIds": [
    "Channels-1",
    "..."
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "Environments-1",
        "..."
      ],
      "Name": "string"
    }
  ],
  "IconColor": "string",
  "IconId": "string",
  "Id": "InsightsReports-1",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ProjectGroupIds": [
    "ProjectGroups-1",
    "..."
  ],
  "ProjectIds": [
    "Projects-1",
    "..."
  ],
  "SpaceId": "Spaces-1",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
:::

## Create an Insights Report

:endpoint{method="POST" path="/api/\{spaceId\}/insights/reports/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/v1`.

Creates a new Insights Report.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AllTenants`** :span[boolean]{.type-label}  
  If true, all tenants in the space will be included in the report.
- **`ChannelIds`** :span[array of string]{.type-label} *(required)*  
  The channels for the report.
- **`Description`** :span[string]{.type-label}  
  The description for the report.
- **`EnvironmentGroups`** :span[array of object]{.type-label} *(required)*  
  The environment groups for the report.
  - **`Environments`** :span[array of string]{.type-label} *(required)*
  - **`Name`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the report. Minimum length 1. Maximum length 200.
- **`ProjectGroupIds`** :span[array of string]{.type-label} *(required)*  
  The project groups for the report.
- **`ProjectIds`** :span[array of string]{.type-label} *(required)*  
  The projects for the report.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantIds`** :span[array of string]{.type-label} *(required)*  
  The tenants for the report.
- **`TenantMode`** :span[enum]{.type-label}  
  The kind of deployments that will be included in this report.  
  Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** :span[array of string]{.type-label} *(required)*  
  The tenant tags the report.
- **`TimeZone`** :span[string]{.type-label} *(required)*  
  The timezone of the report.

:::api-example{label="Request"}
```json
{
  "AllTenants": false,
  "ChannelIds": [
    "Channels-1",
    "..."
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "Environments-1",
        "..."
      ],
      "Name": "string"
    }
  ],
  "Name": "string",
  "ProjectGroupIds": [
    "ProjectGroups-1",
    "..."
  ],
  "ProjectIds": [
    "Projects-1",
    "..."
  ],
  "SpaceId": "Spaces-1",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
:::

**Response**

`200` — Success

- **`Report`** :span[object]{.type-label}
  - **`AllTenants`** :span[boolean]{.type-label}
  - **`ChannelIds`** :span[array of string]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`EnvironmentGroups`** :span[array of object]{.type-label}
  - **`IconColor`** :span[string]{.type-label}
  - **`IconId`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectGroupIds`** :span[array of string]{.type-label}
  - **`ProjectIds`** :span[array of string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TenantIds`** :span[array of string]{.type-label}
  - **`TenantMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
  - **`TenantTags`** :span[array of string]{.type-label}
  - **`TimeZone`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Report": {
    "AllTenants": false,
    "ChannelIds": [
      "Channels-1",
      "..."
    ],
    "Description": "string",
    "EnvironmentGroups": [
      {
        "Environments": [
          "Environments-1",
          "..."
        ],
        "Name": "string"
      }
    ],
    "IconColor": "string",
    "IconId": "string",
    "Id": "InsightsReports-1",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "ProjectGroupIds": [
      "ProjectGroups-1",
      "..."
    ],
    "ProjectIds": [
      "Projects-1",
      "..."
    ],
    "SpaceId": "Spaces-1",
    "TenantIds": [
      "Tenants-1",
      "..."
    ],
    "TenantMode": "Untenanted",
    "TenantTags": [
      "string"
    ],
    "TimeZone": "string"
  }
}
```
:::

## Get an Insights Report by ID

:endpoint{method="GET" path="/api/\{spaceId\}/insights/reports/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

- **`AllTenants`** :span[boolean]{.type-label}
- **`ChannelIds`** :span[array of string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EnvironmentGroups`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
- **`IconColor`** :span[string]{.type-label}
- **`IconId`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectGroupIds`** :span[array of string]{.type-label}
- **`ProjectIds`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** :span[array of string]{.type-label}
- **`TimeZone`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AllTenants": false,
  "ChannelIds": [
    "Channels-1",
    "..."
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "Environments-1",
        "..."
      ],
      "Name": "string"
    }
  ],
  "IconColor": "string",
  "IconId": "string",
  "Id": "InsightsReports-1",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ProjectGroupIds": [
    "ProjectGroups-1",
    "..."
  ],
  "ProjectIds": [
    "Projects-1",
    "..."
  ],
  "SpaceId": "Spaces-1",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
:::

## Update an existing Insights Report

:endpoint{method="PUT" path="/api/\{spaceId\}/insights/reports/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}`.

Updates an existing Insights Report

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The Id of the Insights Report.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`AllTenants`** :span[boolean]{.type-label} *(required)*  
  If true, all tenants in the space will be included in the report.
- **`ChannelIds`** :span[array of string]{.type-label} *(required)*  
  The channels for the report.
- **`Description`** :span[string]{.type-label}  
  The description for the report.
- **`EnvironmentGroups`** :span[array of object]{.type-label} *(required)*  
  The environment groups for the report.
  - **`Environments`** :span[array of string]{.type-label} *(required)*
  - **`Name`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Id`** :span[string]{.type-label} *(required)*  
  The Id of the Insights Report.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the report. Minimum length 1. Maximum length 200.
- **`ProjectGroupIds`** :span[array of string]{.type-label} *(required)*  
  The project groups for the report.
- **`ProjectIds`** :span[array of string]{.type-label} *(required)*  
  The projects for the report.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`TenantIds`** :span[array of string]{.type-label} *(required)*  
  The tenants for the report.
- **`TenantMode`** :span[enum]{.type-label} *(required)*  
  The kind of deployments that will be included in this report.  
  Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** :span[array of string]{.type-label} *(required)*  
  The tenant tags for the report.
- **`TimeZone`** :span[string]{.type-label} *(required)*  
  The timezone of the report.

:::api-example{label="Request"}
```json
{
  "AllTenants": false,
  "ChannelIds": [
    "Channels-1",
    "..."
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "Environments-1",
        "..."
      ],
      "Name": "string"
    }
  ],
  "Id": "InsightsReports-1",
  "Name": "string",
  "ProjectGroupIds": [
    "ProjectGroups-1",
    "..."
  ],
  "ProjectIds": [
    "Projects-1",
    "..."
  ],
  "SpaceId": "Spaces-1",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
:::

**Response**

`200` — Success

- **`AllTenants`** :span[boolean]{.type-label}
- **`ChannelIds`** :span[array of string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EnvironmentGroups`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of string]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
- **`IconColor`** :span[string]{.type-label}
- **`IconId`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`ProjectGroupIds`** :span[array of string]{.type-label}
- **`ProjectIds`** :span[array of string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantIds`** :span[array of string]{.type-label}
- **`TenantMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** :span[array of string]{.type-label}
- **`TimeZone`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AllTenants": false,
  "ChannelIds": [
    "Channels-1",
    "..."
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "Environments-1",
        "..."
      ],
      "Name": "string"
    }
  ],
  "IconColor": "string",
  "IconId": "string",
  "Id": "InsightsReports-1",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ProjectGroupIds": [
    "ProjectGroups-1",
    "..."
  ],
  "ProjectIds": [
    "Projects-1",
    "..."
  ],
  "SpaceId": "Spaces-1",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
:::

## Delete an Insights Report by ID

:endpoint{method="DELETE" path="/api/\{spaceId\}/insights/reports/\{id\}"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}`.

Deletes an existing Insights Report.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Insights Report to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Get an Insights Report by ID

:endpoint{method="GET" path="/api/\{spaceId\}/insights/reports/\{id\}/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

- **`Report`** :span[object]{.type-label}
  - **`AllTenants`** :span[boolean]{.type-label}
  - **`ChannelIds`** :span[array of string]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`EnvironmentGroups`** :span[array of object]{.type-label}
  - **`IconColor`** :span[string]{.type-label}
  - **`IconId`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectGroupIds`** :span[array of string]{.type-label}
  - **`ProjectIds`** :span[array of string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TenantIds`** :span[array of string]{.type-label}
  - **`TenantMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
  - **`TenantTags`** :span[array of string]{.type-label}
  - **`TimeZone`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Report": {
    "AllTenants": false,
    "ChannelIds": [
      "Channels-1",
      "..."
    ],
    "Description": "string",
    "EnvironmentGroups": [
      {
        "Environments": [
          "Environments-1",
          "..."
        ],
        "Name": "string"
      }
    ],
    "IconColor": "string",
    "IconId": "string",
    "Id": "InsightsReports-1",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "ProjectGroupIds": [
      "ProjectGroups-1",
      "..."
    ],
    "ProjectIds": [
      "Projects-1",
      "..."
    ],
    "SpaceId": "Spaces-1",
    "TenantIds": [
      "Tenants-1",
      "..."
    ],
    "TenantMode": "Untenanted",
    "TenantTags": [
      "string"
    ],
    "TimeZone": "string"
  }
}
```
:::

## Update an existing Insights Report

:endpoint{method="PUT" path="/api/\{spaceId\}/insights/reports/\{id\}/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}/v1`.

Updates an existing Insights Report

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The Id of the Insights Report.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`AllTenants`** :span[boolean]{.type-label} *(required)*  
  If true, all tenants in the space will be included in the report.
- **`ChannelIds`** :span[array of string]{.type-label} *(required)*  
  The channels for the report.
- **`Description`** :span[string]{.type-label}  
  The description for the report.
- **`EnvironmentGroups`** :span[array of object]{.type-label} *(required)*  
  The environment groups for the report.
  - **`Environments`** :span[array of string]{.type-label} *(required)*
  - **`Name`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
- **`Id`** :span[string]{.type-label} *(required)*  
  The Id of the Insights Report.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the report. Minimum length 1. Maximum length 200.
- **`ProjectGroupIds`** :span[array of string]{.type-label} *(required)*  
  The project groups for the report.
- **`ProjectIds`** :span[array of string]{.type-label} *(required)*  
  The projects for the report.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`TenantIds`** :span[array of string]{.type-label} *(required)*  
  The tenants for the report.
- **`TenantMode`** :span[enum]{.type-label} *(required)*  
  The kind of deployments that will be included in this report.  
  Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** :span[array of string]{.type-label} *(required)*  
  The tenant tags for the report.
- **`TimeZone`** :span[string]{.type-label} *(required)*  
  The timezone of the report.

:::api-example{label="Request"}
```json
{
  "AllTenants": false,
  "ChannelIds": [
    "Channels-1",
    "..."
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "Environments-1",
        "..."
      ],
      "Name": "string"
    }
  ],
  "Id": "InsightsReports-1",
  "Name": "string",
  "ProjectGroupIds": [
    "ProjectGroups-1",
    "..."
  ],
  "ProjectIds": [
    "Projects-1",
    "..."
  ],
  "SpaceId": "Spaces-1",
  "TenantIds": [
    "Tenants-1",
    "..."
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
:::

**Response**

`200` — Success

- **`Report`** :span[object]{.type-label}
  - **`AllTenants`** :span[boolean]{.type-label}
  - **`ChannelIds`** :span[array of string]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`EnvironmentGroups`** :span[array of object]{.type-label}
  - **`IconColor`** :span[string]{.type-label}
  - **`IconId`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`ProjectGroupIds`** :span[array of string]{.type-label}
  - **`ProjectIds`** :span[array of string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TenantIds`** :span[array of string]{.type-label}
  - **`TenantMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
  - **`TenantTags`** :span[array of string]{.type-label}
  - **`TimeZone`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Report": {
    "AllTenants": false,
    "ChannelIds": [
      "Channels-1",
      "..."
    ],
    "Description": "string",
    "EnvironmentGroups": [
      {
        "Environments": [
          "Environments-1",
          "..."
        ],
        "Name": "string"
      }
    ],
    "IconColor": "string",
    "IconId": "string",
    "Id": "InsightsReports-1",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "ProjectGroupIds": [
      "ProjectGroups-1",
      "..."
    ],
    "ProjectIds": [
      "Projects-1",
      "..."
    ],
    "SpaceId": "Spaces-1",
    "TenantIds": [
      "Tenants-1",
      "..."
    ],
    "TenantMode": "Untenanted",
    "TenantTags": [
      "string"
    ],
    "TimeZone": "string"
  }
}
```
:::

## Delete an Insights Report by ID

:endpoint{method="DELETE" path="/api/\{spaceId\}/insights/reports/\{id\}/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}/v1`.

Deletes an existing Insights Report.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Insights Report to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

:::api-example{label="Response"}
```json
{}
```
:::

## Request Insights Deployments for a Report

:endpoint{method="GET" path="/api/\{spaceId\}/insights/reports/\{reportId\}/deployments"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/deployments`, `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/deployments/csv`, `/api/{spaceId}/insights/reports/{reportId}/deployments/csv`.

**Path Parameters**

- **`reportId`** :span[string]{.type-label} *(required)*  
  ID of the Insights Report.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Insights Deployments

- **`ReportName`** :span[string]{.type-label}  
  Minimum length 1.
- **`Streams`** :span[array of object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`ChannelName`** :span[string]{.type-label}
  - **`Deployments`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`EnvironmentName`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
  - **`TenantName`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "ReportName": "string",
  "Streams": [
    {
      "ChannelId": "Channels-1",
      "ChannelName": "string",
      "Deployments": [
        {}
      ],
      "EnvironmentId": "Environments-1",
      "EnvironmentName": "string",
      "ProjectId": "Projects-1",
      "ProjectName": "string",
      "TenantId": "Tenants-1",
      "TenantName": "string"
    }
  ]
}
```
:::

## Get the logo for an Insights Report

:endpoint{method="GET" path="/api/\{spaceId\}/insights/reports/\{reportId\}/logo"}

Also reachable at `/api/insights/reports/{reportId}/logo`, `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/logo`.

**Path Parameters**

- **`reportId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## Update the logo associated with the report

:endpoint{method="POST" path="/api/\{spaceId\}/insights/reports/\{reportId\}/logo"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/logo`.

**Path Parameters**

- **`reportId`** :span[string]{.type-label} *(required)*  
  The ID of the Insights report.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Modify the logo of an insights report to be a specified icon

:endpoint{method="POST" path="/api/\{spaceId\}/insights/reports/\{reportId\}/logo/icon"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/logo/icon`.

**Path Parameters**

- **`reportId`** :span[string]{.type-label} *(required)*  
  The ID of the insights report to change logo for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`IconColor`** :span[string]{.type-label} *(required)*  
  Color of the icon in hex format. Example: '#0D80D8'. Minimum length 1. Must match `^#[0-9a-fA-F]{6}$`.
- **`IconId`** :span[string]{.type-label} *(required)*  
  ID of the icon. Example: 'octopus-deploy'. Minimum length 1.
- **`ReportId`** :span[string]{.type-label} *(required)*  
  The ID of the insights report to change logo for.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "IconColor": "string",
  "IconId": "string",
  "ReportId": "InsightsReports-1",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Confirmation that the Insights Report Icon has been modified

:::api-example{label="Response"}
```json
{}
```
:::

## Modify the logo of an insights report to be a specified icon

:endpoint{method="POST" path="/api/\{spaceId\}/insights/reports/\{reportId\}/logo/icon/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/logo/icon/v1`.

**Path Parameters**

- **`reportId`** :span[string]{.type-label} *(required)*  
  The ID of the insights report to change logo for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`IconColor`** :span[string]{.type-label} *(required)*  
  Color of the icon in hex format. Example: '#0D80D8'. Minimum length 1. Must match `^#[0-9a-fA-F]{6}$`.
- **`IconId`** :span[string]{.type-label} *(required)*  
  ID of the icon. Example: 'octopus-deploy'. Minimum length 1.
- **`ReportId`** :span[string]{.type-label} *(required)*  
  The ID of the insights report to change logo for.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "IconColor": "string",
  "IconId": "string",
  "ReportId": "InsightsReports-1",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Confirmation that the Insights Report Icon has been modified

:::api-example{label="Response"}
```json
{}
```
:::

## Get Insights metrics series for the Insights Report

:endpoint{method="GET" path="/api/\{spaceId\}/insights/reports/\{reportId\}/metrics"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/metrics`.

Returns the aggregated insights metrics for this insights report for the chosen granularity and time period grouped by the chosen split

**Path Parameters**

- **`reportId`** :span[string]{.type-label} *(required)*  
  ID of the Insights Report.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`granularity`** :span[enum]{.type-label}  
  The data grouping granularity, defaults to weekly if not supplied.  
  Allowed values: `Monthly`, `Weekly`, `Daily`.
- **`split`** :span[enum]{.type-label} *(required)*  
  How to split the metrics.  
  Allowed values: `None`, `Project`, `ProjectGroup`, `Environment`, `EnvironmentGroup`, `Tenant`, `TenantTagSet`.
- **`tenantTagSetId`** :span[string]{.type-label}  
  If TenantTagSet is chosen for Split, this is required, otherwise it is ignored. It is the tag set to split on.
- **`timeRange`** :span[enum]{.type-label}  
  The time period to get data for, defaults to last quarter if not supplied.  
  Allowed values: `LastMonth`, `LastQuarter`, `LastYear`.

**Response**

`200` — Success

- **`Series`** :span[array of object]{.type-label}
  - **`Intervals`** :span[array of object]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.

:::api-example{label="Response"}
```json
{
  "Series": [
    {
      "Intervals": [
        {}
      ],
      "Name": "string"
    }
  ]
}
```
:::

## Get Insights metrics series for the Insights Report

:endpoint{method="GET" path="/api/\{spaceId\}/insights/reports/\{reportId\}/metrics/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/metrics/v1`.

Returns the aggregated insights metrics for this insights report for the chosen granularity and time period grouped by the chosen split

**Path Parameters**

- **`reportId`** :span[string]{.type-label} *(required)*  
  ID of the Insights Report.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`granularity`** :span[enum]{.type-label}  
  The data grouping granularity, defaults to weekly if not supplied.  
  Allowed values: `Monthly`, `Weekly`, `Daily`.
- **`split`** :span[enum]{.type-label} *(required)*  
  How to split the metrics.  
  Allowed values: `None`, `Project`, `ProjectGroup`, `Environment`, `EnvironmentGroup`, `Tenant`, `TenantTagSet`.
- **`tenantTagSetId`** :span[string]{.type-label}  
  If TenantTagSet is chosen for Split, this is required, otherwise it is ignored. It is the tag set to split on.
- **`timeRange`** :span[enum]{.type-label}  
  The time period to get data for, defaults to last quarter if not supplied.  
  Allowed values: `LastMonth`, `LastQuarter`, `LastYear`.

**Response**

`200` — Success

- **`Series`** :span[array of object]{.type-label}
  - **`Intervals`** :span[array of object]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.

:::api-example{label="Response"}
```json
{
  "Series": [
    {
      "Intervals": [
        {}
      ],
      "Name": "string"
    }
  ]
}
```
:::

## Get Insights Deployments for a Project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/insights/deployments"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/insights/deployments`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/insights/deployments/csv`, `/api/{spaceId}/projects/{projectId}/insights/deployments/csv`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`channelId`** :span[string]{.type-label} *(required)*  
  ID of the Channel.
- **`environmentId`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`tenantFilter`** :span[enum]{.type-label}  
  How to filter for tenants, defaults to untenanted and all tenants if not supplied.  
  Allowed values: `UntenantedAndAllTenants`, `Untenanted`, `SingleTenant`.
- **`tenantId`** :span[string]{.type-label}  
  ID of the Tenant.

**Response**

`200` — The requested Insights Deployments

- **`ProjectName`** :span[string]{.type-label}  
  Minimum length 1.
- **`Streams`** :span[array of object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`ChannelName`** :span[string]{.type-label}
  - **`Deployments`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`EnvironmentName`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
  - **`TenantName`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "ProjectName": "string",
  "Streams": [
    {
      "ChannelId": "Channels-1",
      "ChannelName": "string",
      "Deployments": [
        {}
      ],
      "EnvironmentId": "Environments-1",
      "EnvironmentName": "string",
      "ProjectId": "Projects-1",
      "ProjectName": "string",
      "TenantId": "Tenants-1",
      "TenantName": "string"
    }
  ]
}
```
:::

## Get Insights metrics series for the project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/insights/metrics"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/insights/metrics`.

Returns the aggregated insights metrics for this project for the chosen granularity and time period

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`channelId`** :span[string]{.type-label} *(required)*  
  ID of the Channel.
- **`environmentId`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`granularity`** :span[enum]{.type-label}  
  The data grouping granularity, defaults to weekly if not supplied.  
  Allowed values: `Monthly`, `Weekly`, `Daily`.
- **`tenantFilter`** :span[enum]{.type-label}  
  How to filter for tenants, defaults to untenanted and all tenants (combined) if not supplied.  
  Allowed values: `UntenantedAndAllTenants`, `Untenanted`, `SingleTenant`.
- **`tenantId`** :span[string]{.type-label}  
  ID of the Tenant.
- **`timeRange`** :span[enum]{.type-label}  
  The time period to get data for, defaults to last quarter if not supplied.  
  Allowed values: `LastMonth`, `LastQuarter`, `LastYear`.
- **`timeZone`** :span[string]{.type-label}  
  The IANA timezone to use when grouping data, defaults to UTC if not supplied.

**Response**

`200` — Success

- **`Series`** :span[array of object]{.type-label}
  - **`Intervals`** :span[array of object]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.

:::api-example{label="Response"}
```json
{
  "Series": [
    {
      "Intervals": [
        {}
      ],
      "Name": "string"
    }
  ]
}
```
:::

## Get Insights metrics series for the project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/insights/metrics/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/insights/metrics/v1`.

Returns the aggregated insights metrics for this project for the chosen granularity and time period

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`channelId`** :span[string]{.type-label} *(required)*  
  ID of the Channel.
- **`environmentId`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`granularity`** :span[enum]{.type-label}  
  The data grouping granularity, defaults to weekly if not supplied.  
  Allowed values: `Monthly`, `Weekly`, `Daily`.
- **`tenantFilter`** :span[enum]{.type-label}  
  How to filter for tenants, defaults to untenanted and all tenants (combined) if not supplied.  
  Allowed values: `UntenantedAndAllTenants`, `Untenanted`, `SingleTenant`.
- **`tenantId`** :span[string]{.type-label}  
  ID of the Tenant.
- **`timeRange`** :span[enum]{.type-label}  
  The time period to get data for, defaults to last quarter if not supplied.  
  Allowed values: `LastMonth`, `LastQuarter`, `LastYear`.
- **`timeZone`** :span[string]{.type-label}  
  The IANA timezone to use when grouping data, defaults to UTC if not supplied.

**Response**

`200` — Success

- **`Series`** :span[array of object]{.type-label}
  - **`Intervals`** :span[array of object]{.type-label}
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.

:::api-example{label="Response"}
```json
{
  "Series": [
    {
      "Intervals": [
        {}
      ],
      "Name": "string"
    }
  ]
}
```
:::
