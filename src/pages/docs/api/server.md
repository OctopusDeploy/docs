---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Server
---

## Requests the current server configuration

`GET` `/api/serverconfiguration`

**Response**

`200` — The current server configuration

`ServerConfigurationResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ServerUri`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ServerUri": "string"
}
```
</div>

## Sets the server configuration

`PUT` `/api/serverconfiguration`

**Request Body**

`SetServerConfigurationCommand`

- **`ServerUri`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "ServerUri": "string"
}
```
</div>

**Response**

`200` — The updated server configuration

`ServerConfigurationResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ServerUri`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ServerUri": "string"
}
```
</div>

## Requests the current server configuration settings

`GET` `/api/serverconfiguration/settings`

**Response**

`200` — The current server configuration settings

an array of `ServerConfigurationSettingsResource`.

- **`ConfigurationSet`** <span class="type-label">string</span>
- **`ConfigurationValues`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Key`** <span class="type-label">string</span>
  - **`Value`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "ConfigurationSet": "string",
    "ConfigurationValues": [
      {
        "Description": "string",
        "Key": "string",
        "Value": "string"
      }
    ]
  }
]
```
</div>
