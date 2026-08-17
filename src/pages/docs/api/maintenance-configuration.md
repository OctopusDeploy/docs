---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Maintenance Configuration
---

## Get information about the maintenance configuration in use by the Octopus Server

:span[GET]{.api-get} `/api/maintenanceconfiguration`

**Response**

`200` — The requested Maintenance Configuration

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

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

## Update the maintenance configuration used by the Octopus Server

:span[PUT]{.api-put} `/api/maintenanceconfiguration`

**Request Body**

- **`IsInMaintenanceMode`** :span[boolean]{.type-label} *(required)*

<div data-example="Request">

```json
{
  "IsInMaintenanceMode": true
}
```
</div>

**Response**

`200` — Confirmation that the Maintenance Configuration has been modified, containing the updated configuration

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsInMaintenanceMode`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

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

## Update the maintenance configuration used by the Octopus Server

:span[PUT]{.api-put} `/api/maintenanceconfiguration/v1`

**Request Body**

- **`IsInMaintenanceMode`** :span[boolean]{.type-label} *(required)*

<div data-example="Request">

```json
{
  "IsInMaintenanceMode": true
}
```
</div>

**Response**

`200` — Confirmation that the Maintenance Configuration has been modified, containing the updated configuration

- **`Resource`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsInMaintenanceMode`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

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
