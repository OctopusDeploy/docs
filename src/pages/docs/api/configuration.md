---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Configuration
---

## Return a list of configuration section settings

:span[GET]{.api-get} `/api/configuration`

**Response**

`200` — The list of configuration section settings

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
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

## Return a single configuration section for the given id

:span[GET]{.api-get} `/api/configuration/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested configuration section

- **`Description`** :span[string]{.type-label}
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

## Return a structure that describes how to dynamically render the configuration section

:span[GET]{.api-get} `/api/configuration/{id}/metadata`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested configuration section metadata

- **`Description`** :span[string]{.type-label}
- **`Types`** :span[array of object]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Properties`** :span[array of object]{.type-label}

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

## Return the current configuration for a specific configuration section

:span[GET]{.api-get} `/api/configuration/{id}/values`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

**Response**

`200` — The current configuration for the specified configuration section

<div data-example="Response">

```json
"string"
```
</div>

## Update the configuration values for a specific configuration section

:span[PUT]{.api-put} `/api/configuration/{id}/values`

Refer to the configuration/{id}/metadata endpoint for details on the specific data structure required for a given configuration section id.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*

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
