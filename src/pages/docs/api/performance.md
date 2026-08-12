---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Performance
---

## Requests the current performance configuration

`GET` `/api/performanceconfiguration`

**Response**

`200` — The current performance configuration

`PerformanceConfigurationResource`.

- **`DefaultDashboardRenderMode`** <span class="type-label">enum</span> — Allowed values: `VirtualizeColumns`, `VirtualizeRowsAndColumns`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "DefaultDashboardRenderMode": "VirtualizeColumns",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>

## Sets the performance configuration

`PUT` `/api/performanceconfiguration`

**Request Body**

`SetPerformanceConfigurationCommand`

- **`DefaultDashboardRenderMode`** <span class="type-label">enum</span> *(required)* — Allowed values: `VirtualizeColumns`, `VirtualizeRowsAndColumns`.

<div data-example="Request">

```json
{
  "DefaultDashboardRenderMode": "VirtualizeColumns"
}
```
</div>

**Response**

`200` — The updated performance configuration

`PerformanceConfigurationResource`.

- **`DefaultDashboardRenderMode`** <span class="type-label">enum</span> — Allowed values: `VirtualizeColumns`, `VirtualizeRowsAndColumns`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "DefaultDashboardRenderMode": "VirtualizeColumns",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>
