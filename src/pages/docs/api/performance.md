---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Performance
---

## Request the current performance configuration

:span[GET]{.api-get} `/api/performanceconfiguration`

**Response**

`200` — The current performance configuration

- **`DefaultDashboardRenderMode`** :span[enum]{.type-label}  
  Allowed values: `VirtualizeColumns`, `VirtualizeRowsAndColumns`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

:::api-example{label="Response"}
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
:::

## Set the performance configuration

:span[PUT]{.api-put} `/api/performanceconfiguration`

**Request Body**

- **`DefaultDashboardRenderMode`** :span[enum]{.type-label} *(required)*  
  Allowed values: `VirtualizeColumns`, `VirtualizeRowsAndColumns`.

:::api-example{label="Request"}
```json
{
  "DefaultDashboardRenderMode": "VirtualizeColumns"
}
```
:::

**Response**

`200` — The updated performance configuration

- **`DefaultDashboardRenderMode`** :span[enum]{.type-label}  
  Allowed values: `VirtualizeColumns`, `VirtualizeRowsAndColumns`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

:::api-example{label="Response"}
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
:::
