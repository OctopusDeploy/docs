---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Maintenance Configuration
---

## Gets information about the maintenance configuration in use by the Octopus Server

`GET` `/api/maintenanceconfiguration`

**Response**

`200` — The requested Maintenance Configuration

`MaintenanceConfigurationResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "Id": "string",
  "IsInMaintenanceMode": true,
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

## Updates the maintenance configuration used by the Octopus Server

`PUT` `/api/maintenanceconfiguration`

**Request Body**

`ModifyMaintenanceConfigurationCommand`

- **`IsInMaintenanceMode`** <span class="type-label">boolean</span> *(required)*

<div data-example="Request">

```json
{
  "IsInMaintenanceMode": true
}
```
</div>

**Response**

`200` — Confirmation that the Maintenance Configuration has been modified, containing the updated configuration

`MaintenanceConfigurationResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "Id": "string",
  "IsInMaintenanceMode": true,
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

## Updates the maintenance configuration used by the Octopus Server

`PUT` `/api/maintenanceconfiguration/v1`

**Request Body**

`ModifyMaintenanceConfigurationCommand`

- **`IsInMaintenanceMode`** <span class="type-label">boolean</span> *(required)*

<div data-example="Request">

```json
{
  "IsInMaintenanceMode": true
}
```
</div>

**Response**

`200` — Confirmation that the Maintenance Configuration has been modified, containing the updated configuration

`ModifyMaintenanceConfigurationResponse`.

- **`Resource`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsInMaintenanceMode`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "Resource": {
    "Id": "string",
    "IsInMaintenanceMode": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  }
}
```
</div>
