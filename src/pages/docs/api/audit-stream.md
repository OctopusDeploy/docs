---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Audit Stream
---

## Get the audit stream configuration

:span[GET]{.api-get} `/api/audit-stream`

**Response**

`200` — The Audit Stream configuration

- **`Active`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StreamConfigurationResource`** :span[object]{.type-label}

<div data-example="Response">

```json
{
  "Active": true,
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "StreamConfigurationResource": {}
}
```
</div>

## Modify the audit stream configuration

:span[PUT]{.api-put} `/api/audit-stream`

**Request Body**

- **`Active`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`StreamConfigurationResource`** :span[object]{.type-label}

<div data-example="Request">

```json
{
  "Active": true,
  "Description": "string",
  "StreamConfigurationResource": {}
}
```
</div>

**Response**

`200` — The modified Audit Stream configuration

- **`Active`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StreamConfigurationResource`** :span[object]{.type-label}

<div data-example="Response">

```json
{
  "Active": true,
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "StreamConfigurationResource": {}
}
```
</div>
