---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Dynamic Extensions
---

## Requests the current dynamic extensions feature metadata

`GET` `/api/dynamic-extensions/features/metadata`

**Response**

`200` — The current dynamic extensions feature metadata

`DynamicExtensionsFeaturesMetadataResource`.

- **`Features`** <span class="type-label">array of object</span>
  - **`Default`** <span class="type-label">string</span>
  - **`Description`** <span class="type-label">string</span> — Markdown formatted.
  - **`Key`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Options`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "Features": [
    {
      "Default": "string",
      "Description": "string",
      "Key": "string",
      "Name": "string",
      "Options": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      }
    }
  ]
}
```
</div>

## Requests the current dynamic extensions feature values

`GET` `/api/dynamic-extensions/features/values`

**Response**

`200` — The current dynamic extensions feature values

`DynamicExtensionsFeaturesValuesResource`.

- **`Values`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "Values": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>

## Modifies the current dynamic extensions feature values

`PUT` `/api/dynamic-extensions/features/values`

**Request Body**

`SetDynamicExtensionsFeaturesValuesCommand`

- **`Values`** <span class="type-label">object</span> *(required)*

<div data-example="Request">

```json
{
  "Values": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>

**Response**

`200` — The new dynamic extensions feature values

`DynamicExtensionsFeaturesValuesResource`.

- **`Values`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "Values": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>
