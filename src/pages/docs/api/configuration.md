---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Configuration
---

## Returns a list of configuration section settings

`GET` `/api/configuration`

**Response**

`200` — The list of configuration section settings

`ConfigurationSectionCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
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
      "Description": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
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

## Returns a single configuration section for the given id

`GET` `/api/configuration/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested configuration section

`ConfigurationSection`.

- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string"
}
```
</div>

## Returns a structure that describes how to dynamically render the configuration section

`GET` `/api/configuration/{id}/metadata`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested configuration section metadata

`Metadata`.

- **`Description`** <span class="type-label">string</span>
- **`Types`** <span class="type-label">array of object</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Properties`** <span class="type-label">array of object</span>

<div data-example="Response">

```json
{
  "Description": "string",
  "Types": [
    {
      "Name": "string",
      "Properties": [
        {}
      ]
    }
  ]
}
```
</div>

## Returns the current configuration for a specific configuration section

`GET` `/api/configuration/{id}/values`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The current configuration for the specified configuration section

<div data-example="Response">

```json
"string"
```
</div>

## Updates the configuration values for a specific configuration section

`PUT` `/api/configuration/{id}/values`

Refer to the configuration/{id}/metadata endpoint for details on the specific data structure required for a given configuration section id.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*

**Request Body**

A `string` payload.

<div data-example="Request">

```json
"string"
```
</div>

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>
