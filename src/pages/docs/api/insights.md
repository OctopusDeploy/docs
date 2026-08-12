---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Insights
---

## Get a list of Insights Reports

`GET` `/api/{spaceId}/insights/reports`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports`.

Returns a paginated list of the Insights Reports in the supplied Octopus Deploy Space.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`InsightsReportResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`AllTenants`** <span class="type-label">boolean</span>
  - **`ChannelIds`** <span class="type-label">array of string</span>
  - **`Description`** <span class="type-label">string</span>
  - **`EnvironmentGroups`** <span class="type-label">array of object</span>
  - **`IconColor`** <span class="type-label">string</span>
  - **`IconId`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectGroupIds`** <span class="type-label">array of string</span>
  - **`ProjectIds`** <span class="type-label">array of string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TenantIds`** <span class="type-label">array of string</span>
  - **`TenantMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
  - **`TenantTags`** <span class="type-label">array of string</span>
  - **`TimeZone`** <span class="type-label">string</span>
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
      "AllTenants": true,
      "ChannelIds": [
        "string"
      ],
      "Description": "string",
      "EnvironmentGroups": [
        {}
      ],
      "IconColor": "string",
      "IconId": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "ProjectGroupIds": [
        "string"
      ],
      "ProjectIds": [
        "string"
      ],
      "SpaceId": "string",
      "TenantIds": [
        "string"
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
</div>

## Create an Insights Report

`POST` `/api/{spaceId}/insights/reports`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports`.

Creates a new Insights Report.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateInsightsReportCommand`

- **`AllTenants`** <span class="type-label">boolean</span> — If true, all tenants in the space will be included in the report.
- **`ChannelIds`** <span class="type-label">array of string</span> *(required)* — The channels for the report.
- **`Description`** <span class="type-label">string</span> — The description for the report.
- **`EnvironmentGroups`** <span class="type-label">array of object</span> *(required)* — The environment groups for the report.
  - **`Environments`** <span class="type-label">array of string</span> *(required)*
  - **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the report. Minimum length 1. Maximum length 200.
- **`ProjectGroupIds`** <span class="type-label">array of string</span> *(required)* — The project groups for the report.
- **`ProjectIds`** <span class="type-label">array of string</span> *(required)* — The projects for the report.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantIds`** <span class="type-label">array of string</span> *(required)* — The tenants for the report.
- **`TenantMode`** <span class="type-label">enum</span> — The kind of deployments that will be included in this report. Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** <span class="type-label">array of string</span> *(required)* — The tenant tags the report.
- **`TimeZone`** <span class="type-label">string</span> *(required)* — The timezone of the report.

<div data-example="Request">

```json
{
  "AllTenants": true,
  "ChannelIds": [
    "string"
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "string"
      ],
      "Name": "string"
    }
  ],
  "Name": "string",
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
</div>

**Response**

`200` — Success

`InsightsReportResource`.

- **`AllTenants`** <span class="type-label">boolean</span>
- **`ChannelIds`** <span class="type-label">array of string</span>
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentGroups`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`IconColor`** <span class="type-label">string</span>
- **`IconId`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ProjectGroupIds`** <span class="type-label">array of string</span>
- **`ProjectIds`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TimeZone`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AllTenants": true,
  "ChannelIds": [
    "string"
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "string"
      ],
      "Name": "string"
    }
  ],
  "IconColor": "string",
  "IconId": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
</div>

## Create an Insights Report

`POST` `/api/{spaceId}/insights/reports/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/v1`.

Creates a new Insights Report.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateInsightsReportCommand`

- **`AllTenants`** <span class="type-label">boolean</span> — If true, all tenants in the space will be included in the report.
- **`ChannelIds`** <span class="type-label">array of string</span> *(required)* — The channels for the report.
- **`Description`** <span class="type-label">string</span> — The description for the report.
- **`EnvironmentGroups`** <span class="type-label">array of object</span> *(required)* — The environment groups for the report.
  - **`Environments`** <span class="type-label">array of string</span> *(required)*
  - **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the report. Minimum length 1. Maximum length 200.
- **`ProjectGroupIds`** <span class="type-label">array of string</span> *(required)* — The project groups for the report.
- **`ProjectIds`** <span class="type-label">array of string</span> *(required)* — The projects for the report.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantIds`** <span class="type-label">array of string</span> *(required)* — The tenants for the report.
- **`TenantMode`** <span class="type-label">enum</span> — The kind of deployments that will be included in this report. Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** <span class="type-label">array of string</span> *(required)* — The tenant tags the report.
- **`TimeZone`** <span class="type-label">string</span> *(required)* — The timezone of the report.

<div data-example="Request">

```json
{
  "AllTenants": true,
  "ChannelIds": [
    "string"
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "string"
      ],
      "Name": "string"
    }
  ],
  "Name": "string",
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
</div>

**Response**

`200` — Success

`CreateInsightsReportResponse`.

- **`Report`** <span class="type-label">object</span>
  - **`AllTenants`** <span class="type-label">boolean</span>
  - **`ChannelIds`** <span class="type-label">array of string</span>
  - **`Description`** <span class="type-label">string</span>
  - **`EnvironmentGroups`** <span class="type-label">array of object</span>
  - **`IconColor`** <span class="type-label">string</span>
  - **`IconId`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectGroupIds`** <span class="type-label">array of string</span>
  - **`ProjectIds`** <span class="type-label">array of string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TenantIds`** <span class="type-label">array of string</span>
  - **`TenantMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
  - **`TenantTags`** <span class="type-label">array of string</span>
  - **`TimeZone`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Report": {
    "AllTenants": true,
    "ChannelIds": [
      "string"
    ],
    "Description": "string",
    "EnvironmentGroups": [
      {
        "Environments": [
          "string"
        ],
        "Name": "string"
      }
    ],
    "IconColor": "string",
    "IconId": "string",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "ProjectGroupIds": [
      "string"
    ],
    "ProjectIds": [
      "string"
    ],
    "SpaceId": "string",
    "TenantIds": [
      "string"
    ],
    "TenantMode": "Untenanted",
    "TenantTags": [
      "string"
    ],
    "TimeZone": "string"
  }
}
```
</div>

## GET /api/{spaceId}/insights/reports/{id}

`GET` `/api/{spaceId}/insights/reports/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

`InsightsReportResource`.

- **`AllTenants`** <span class="type-label">boolean</span>
- **`ChannelIds`** <span class="type-label">array of string</span>
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentGroups`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`IconColor`** <span class="type-label">string</span>
- **`IconId`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ProjectGroupIds`** <span class="type-label">array of string</span>
- **`ProjectIds`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TimeZone`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AllTenants": true,
  "ChannelIds": [
    "string"
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "string"
      ],
      "Name": "string"
    }
  ],
  "IconColor": "string",
  "IconId": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
</div>

## Update an existing Insights Report

`PUT` `/api/{spaceId}/insights/reports/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}`.

Updates an existing Insights Report

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The Id of the Insights Report.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyInsightsReportCommand`

- **`AllTenants`** <span class="type-label">boolean</span> *(required)* — If true, all tenants in the space will be included in the report.
- **`ChannelIds`** <span class="type-label">array of string</span> *(required)* — The channels for the report.
- **`Description`** <span class="type-label">string</span> — The description for the report.
- **`EnvironmentGroups`** <span class="type-label">array of object</span> *(required)* — The environment groups for the report.
  - **`Environments`** <span class="type-label">array of string</span> *(required)*
  - **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Id`** <span class="type-label">string</span> *(required)* — The Id of the Insights Report.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the report. Minimum length 1. Maximum length 200.
- **`ProjectGroupIds`** <span class="type-label">array of string</span> *(required)* — The project groups for the report.
- **`ProjectIds`** <span class="type-label">array of string</span> *(required)* — The projects for the report.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`TenantIds`** <span class="type-label">array of string</span> *(required)* — The tenants for the report.
- **`TenantMode`** <span class="type-label">enum</span> *(required)* — The kind of deployments that will be included in this report. Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** <span class="type-label">array of string</span> *(required)* — The tenant tags for the report.
- **`TimeZone`** <span class="type-label">string</span> *(required)* — The timezone of the report.

<div data-example="Request">

```json
{
  "AllTenants": true,
  "ChannelIds": [
    "string"
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "string"
      ],
      "Name": "string"
    }
  ],
  "Id": "string",
  "Name": "string",
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
</div>

**Response**

`200` — Success

`InsightsReportResource`.

- **`AllTenants`** <span class="type-label">boolean</span>
- **`ChannelIds`** <span class="type-label">array of string</span>
- **`Description`** <span class="type-label">string</span>
- **`EnvironmentGroups`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of string</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`IconColor`** <span class="type-label">string</span>
- **`IconId`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`ProjectGroupIds`** <span class="type-label">array of string</span>
- **`ProjectIds`** <span class="type-label">array of string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantIds`** <span class="type-label">array of string</span>
- **`TenantMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** <span class="type-label">array of string</span>
- **`TimeZone`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AllTenants": true,
  "ChannelIds": [
    "string"
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "string"
      ],
      "Name": "string"
    }
  ],
  "IconColor": "string",
  "IconId": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
</div>

## Delete an Insights Report by ID

`DELETE` `/api/{spaceId}/insights/reports/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}`.

Deletes an existing Insights Report.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Insights Report to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## GET /api/{spaceId}/insights/reports/{id}/v1

`GET` `/api/{spaceId}/insights/reports/{id}/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

`GetInsightsReportByIdResponse`.

- **`Report`** <span class="type-label">object</span>
  - **`AllTenants`** <span class="type-label">boolean</span>
  - **`ChannelIds`** <span class="type-label">array of string</span>
  - **`Description`** <span class="type-label">string</span>
  - **`EnvironmentGroups`** <span class="type-label">array of object</span>
  - **`IconColor`** <span class="type-label">string</span>
  - **`IconId`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectGroupIds`** <span class="type-label">array of string</span>
  - **`ProjectIds`** <span class="type-label">array of string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TenantIds`** <span class="type-label">array of string</span>
  - **`TenantMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
  - **`TenantTags`** <span class="type-label">array of string</span>
  - **`TimeZone`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Report": {
    "AllTenants": true,
    "ChannelIds": [
      "string"
    ],
    "Description": "string",
    "EnvironmentGroups": [
      {
        "Environments": [
          "string"
        ],
        "Name": "string"
      }
    ],
    "IconColor": "string",
    "IconId": "string",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "ProjectGroupIds": [
      "string"
    ],
    "ProjectIds": [
      "string"
    ],
    "SpaceId": "string",
    "TenantIds": [
      "string"
    ],
    "TenantMode": "Untenanted",
    "TenantTags": [
      "string"
    ],
    "TimeZone": "string"
  }
}
```
</div>

## Update an existing Insights Report

`PUT` `/api/{spaceId}/insights/reports/{id}/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}/v1`.

Updates an existing Insights Report

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The Id of the Insights Report.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyInsightsReportCommand`

- **`AllTenants`** <span class="type-label">boolean</span> *(required)* — If true, all tenants in the space will be included in the report.
- **`ChannelIds`** <span class="type-label">array of string</span> *(required)* — The channels for the report.
- **`Description`** <span class="type-label">string</span> — The description for the report.
- **`EnvironmentGroups`** <span class="type-label">array of object</span> *(required)* — The environment groups for the report.
  - **`Environments`** <span class="type-label">array of string</span> *(required)*
  - **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Id`** <span class="type-label">string</span> *(required)* — The Id of the Insights Report.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the report. Minimum length 1. Maximum length 200.
- **`ProjectGroupIds`** <span class="type-label">array of string</span> *(required)* — The project groups for the report.
- **`ProjectIds`** <span class="type-label">array of string</span> *(required)* — The projects for the report.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`TenantIds`** <span class="type-label">array of string</span> *(required)* — The tenants for the report.
- **`TenantMode`** <span class="type-label">enum</span> *(required)* — The kind of deployments that will be included in this report. Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
- **`TenantTags`** <span class="type-label">array of string</span> *(required)* — The tenant tags for the report.
- **`TimeZone`** <span class="type-label">string</span> *(required)* — The timezone of the report.

<div data-example="Request">

```json
{
  "AllTenants": true,
  "ChannelIds": [
    "string"
  ],
  "Description": "string",
  "EnvironmentGroups": [
    {
      "Environments": [
        "string"
      ],
      "Name": "string"
    }
  ],
  "Id": "string",
  "Name": "string",
  "ProjectGroupIds": [
    "string"
  ],
  "ProjectIds": [
    "string"
  ],
  "SpaceId": "string",
  "TenantIds": [
    "string"
  ],
  "TenantMode": "Untenanted",
  "TenantTags": [
    "string"
  ],
  "TimeZone": "string"
}
```
</div>

**Response**

`200` — Success

`ModifyInsightsReportResponse`.

- **`Report`** <span class="type-label">object</span>
  - **`AllTenants`** <span class="type-label">boolean</span>
  - **`ChannelIds`** <span class="type-label">array of string</span>
  - **`Description`** <span class="type-label">string</span>
  - **`EnvironmentGroups`** <span class="type-label">array of object</span>
  - **`IconColor`** <span class="type-label">string</span>
  - **`IconId`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`ProjectGroupIds`** <span class="type-label">array of string</span>
  - **`ProjectIds`** <span class="type-label">array of string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TenantIds`** <span class="type-label">array of string</span>
  - **`TenantMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedAndUntenanted`, `Tenanted`.
  - **`TenantTags`** <span class="type-label">array of string</span>
  - **`TimeZone`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Report": {
    "AllTenants": true,
    "ChannelIds": [
      "string"
    ],
    "Description": "string",
    "EnvironmentGroups": [
      {
        "Environments": [
          "string"
        ],
        "Name": "string"
      }
    ],
    "IconColor": "string",
    "IconId": "string",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "ProjectGroupIds": [
      "string"
    ],
    "ProjectIds": [
      "string"
    ],
    "SpaceId": "string",
    "TenantIds": [
      "string"
    ],
    "TenantMode": "Untenanted",
    "TenantTags": [
      "string"
    ],
    "TimeZone": "string"
  }
}
```
</div>

## Delete an Insights Report by ID

`DELETE` `/api/{spaceId}/insights/reports/{id}/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{id}/v1`.

Deletes an existing Insights Report.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Insights Report to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

`DeleteInsightsReportResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Requests Insights Deployments for a Report

`GET` `/api/{spaceId}/insights/reports/{reportId}/deployments`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/deployments`, `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/deployments/csv`, `/api/{spaceId}/insights/reports/{reportId}/deployments/csv`.

**Parameters**

- **`reportId`** <span class="type-label">string</span> *(required)* — ID of the Insights Report.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Insights Deployments

`GetInsightsDeploymentsForReportResponse`.

- **`ReportName`** <span class="type-label">string</span> — Minimum length 1.
- **`Streams`** <span class="type-label">array of object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`ChannelName`** <span class="type-label">string</span>
  - **`Deployments`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`EnvironmentName`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
  - **`TenantName`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ReportName": "string",
  "Streams": [
    {
      "ChannelId": "string",
      "ChannelName": "string",
      "Deployments": [
        {}
      ],
      "EnvironmentId": "string",
      "EnvironmentName": "string",
      "ProjectId": "string",
      "ProjectName": "string",
      "TenantId": "string",
      "TenantName": "string"
    }
  ]
}
```
</div>

## GET /api/{spaceId}/insights/reports/{reportId}/logo

`GET` `/api/{spaceId}/insights/reports/{reportId}/logo`

Also reachable at `/api/insights/reports/{reportId}/logo`, `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/logo`.

**Parameters**

- **`reportId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Updates the logo associated with the report

`POST` `/api/{spaceId}/insights/reports/{reportId}/logo`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/logo`.

**Parameters**

- **`reportId`** <span class="type-label">string</span> *(required)* — The ID of the Insights report.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Modifies the logo of an insights report to be a specified icon

`POST` `/api/{spaceId}/insights/reports/{reportId}/logo/icon`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/logo/icon`.

**Parameters**

- **`reportId`** <span class="type-label">string</span> *(required)* — The ID of the insights report to change logo for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyInsightsReportIconCommand`

- **`IconColor`** <span class="type-label">string</span> *(required)* — Color of the icon in hex format. Example: '#0D80D8'. Minimum length 1. Must match `^#[0-9a-fA-F]{6}$`.
- **`IconId`** <span class="type-label">string</span> *(required)* — ID of the icon. Example: 'octopus-deploy'. Minimum length 1.
- **`ReportId`** <span class="type-label">string</span> *(required)* — The ID of the insights report to change logo for.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "IconColor": "string",
  "IconId": "string",
  "ReportId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Insights Report Icon has been modified

`ModifyInsightsReportIconResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Modifies the logo of an insights report to be a specified icon

`POST` `/api/{spaceId}/insights/reports/{reportId}/logo/icon/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/logo/icon/v1`.

**Parameters**

- **`reportId`** <span class="type-label">string</span> *(required)* — The ID of the insights report to change logo for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyInsightsReportIconCommand`

- **`IconColor`** <span class="type-label">string</span> *(required)* — Color of the icon in hex format. Example: '#0D80D8'. Minimum length 1. Must match `^#[0-9a-fA-F]{6}$`.
- **`IconId`** <span class="type-label">string</span> *(required)* — ID of the icon. Example: 'octopus-deploy'. Minimum length 1.
- **`ReportId`** <span class="type-label">string</span> *(required)* — The ID of the insights report to change logo for.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "IconColor": "string",
  "IconId": "string",
  "ReportId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Insights Report Icon has been modified

`ModifyInsightsReportIconResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Get Insights metrics series for the Insights Report

`GET` `/api/{spaceId}/insights/reports/{reportId}/metrics`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/metrics`.

Returns the aggregated insights metrics for this insights report for the chosen granularity and time period grouped by the chosen split

**Parameters**

- **`reportId`** <span class="type-label">string</span> *(required)* — ID of the Insights Report.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`granularity`** <span class="type-label">enum</span> — The data grouping granularity, defaults to weekly if not supplied. Allowed values: `Monthly`, `Weekly`, `Daily`.
- **`split`** <span class="type-label">enum</span> *(required)* — How to split the metrics. Allowed values: `None`, `Project`, `ProjectGroup`, `Environment`, `EnvironmentGroup`, `Tenant`, `TenantTagSet`.
- **`tenantTagSetId`** <span class="type-label">string</span> — If TenantTagSet is chosen for Split, this is required, otherwise it is ignored. It is the tag set to split on.
- **`timeRange`** <span class="type-label">enum</span> — The time period to get data for, defaults to last quarter if not supplied. Allowed values: `LastMonth`, `LastQuarter`, `LastYear`.

**Response**

`200` — Success

`GetInsightsMetricsSeriesForReportResponse`.

- **`Series`** <span class="type-label">array of object</span>
  - **`Intervals`** <span class="type-label">array of object</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## Get Insights metrics series for the Insights Report

`GET` `/api/{spaceId}/insights/reports/{reportId}/metrics/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/insights/reports/{reportId}/metrics/v1`.

Returns the aggregated insights metrics for this insights report for the chosen granularity and time period grouped by the chosen split

**Parameters**

- **`reportId`** <span class="type-label">string</span> *(required)* — ID of the Insights Report.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`granularity`** <span class="type-label">enum</span> — The data grouping granularity, defaults to weekly if not supplied. Allowed values: `Monthly`, `Weekly`, `Daily`.
- **`split`** <span class="type-label">enum</span> *(required)* — How to split the metrics. Allowed values: `None`, `Project`, `ProjectGroup`, `Environment`, `EnvironmentGroup`, `Tenant`, `TenantTagSet`.
- **`tenantTagSetId`** <span class="type-label">string</span> — If TenantTagSet is chosen for Split, this is required, otherwise it is ignored. It is the tag set to split on.
- **`timeRange`** <span class="type-label">enum</span> — The time period to get data for, defaults to last quarter if not supplied. Allowed values: `LastMonth`, `LastQuarter`, `LastYear`.

**Response**

`200` — Success

`GetInsightsMetricsSeriesForReportResponse`.

- **`Series`** <span class="type-label">array of object</span>
  - **`Intervals`** <span class="type-label">array of object</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## Get Insights Deployments for a Project

`GET` `/api/{spaceId}/projects/{projectId}/insights/deployments`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/insights/deployments`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/insights/deployments/csv`, `/api/{spaceId}/projects/{projectId}/insights/deployments/csv`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`channelId`** <span class="type-label">string</span> *(required)* — ID of the Channel.
- **`environmentId`** <span class="type-label">string</span> *(required)* — ID of the Environment.
- **`tenantFilter`** <span class="type-label">enum</span> — How to filter for tenants, defaults to untenanted and all tenants if not supplied. Allowed values: `UntenantedAndAllTenants`, `Untenanted`, `SingleTenant`.
- **`tenantId`** <span class="type-label">string</span> — ID of the Tenant.

**Response**

`200` — The requested Insights Deployments

`GetInsightsDeploymentsForProjectResponse`.

- **`ProjectName`** <span class="type-label">string</span> — Minimum length 1.
- **`Streams`** <span class="type-label">array of object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`ChannelName`** <span class="type-label">string</span>
  - **`Deployments`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`EnvironmentName`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
  - **`TenantName`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ProjectName": "string",
  "Streams": [
    {
      "ChannelId": "string",
      "ChannelName": "string",
      "Deployments": [
        {}
      ],
      "EnvironmentId": "string",
      "EnvironmentName": "string",
      "ProjectId": "string",
      "ProjectName": "string",
      "TenantId": "string",
      "TenantName": "string"
    }
  ]
}
```
</div>

## Get Insights metrics series for the project

`GET` `/api/{spaceId}/projects/{projectId}/insights/metrics`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/insights/metrics`.

Returns the aggregated insights metrics for this project for the chosen granularity and time period

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`channelId`** <span class="type-label">string</span> *(required)* — ID of the Channel.
- **`environmentId`** <span class="type-label">string</span> *(required)* — ID of the Environment.
- **`granularity`** <span class="type-label">enum</span> — The data grouping granularity, defaults to weekly if not supplied. Allowed values: `Monthly`, `Weekly`, `Daily`.
- **`tenantFilter`** <span class="type-label">enum</span> — How to filter for tenants, defaults to untenanted and all tenants (combined) if not supplied. Allowed values: `UntenantedAndAllTenants`, `Untenanted`, `SingleTenant`.
- **`tenantId`** <span class="type-label">string</span> — ID of the Tenant.
- **`timeRange`** <span class="type-label">enum</span> — The time period to get data for, defaults to last quarter if not supplied. Allowed values: `LastMonth`, `LastQuarter`, `LastYear`.
- **`timeZone`** <span class="type-label">string</span> — The IANA timezone to use when grouping data, defaults to UTC if not supplied.

**Response**

`200` — Success

`GetInsightsMetricsSeriesForProjectResponse`.

- **`Series`** <span class="type-label">array of object</span>
  - **`Intervals`** <span class="type-label">array of object</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>

## Get Insights metrics series for the project

`GET` `/api/{spaceId}/projects/{projectId}/insights/metrics/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/insights/metrics/v1`.

Returns the aggregated insights metrics for this project for the chosen granularity and time period

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`channelId`** <span class="type-label">string</span> *(required)* — ID of the Channel.
- **`environmentId`** <span class="type-label">string</span> *(required)* — ID of the Environment.
- **`granularity`** <span class="type-label">enum</span> — The data grouping granularity, defaults to weekly if not supplied. Allowed values: `Monthly`, `Weekly`, `Daily`.
- **`tenantFilter`** <span class="type-label">enum</span> — How to filter for tenants, defaults to untenanted and all tenants (combined) if not supplied. Allowed values: `UntenantedAndAllTenants`, `Untenanted`, `SingleTenant`.
- **`tenantId`** <span class="type-label">string</span> — ID of the Tenant.
- **`timeRange`** <span class="type-label">enum</span> — The time period to get data for, defaults to last quarter if not supplied. Allowed values: `LastMonth`, `LastQuarter`, `LastYear`.
- **`timeZone`** <span class="type-label">string</span> — The IANA timezone to use when grouping data, defaults to UTC if not supplied.

**Response**

`200` — Success

`GetInsightsMetricsSeriesForProjectResponse`.

- **`Series`** <span class="type-label">array of object</span>
  - **`Intervals`** <span class="type-label">array of object</span>
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

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
</div>
