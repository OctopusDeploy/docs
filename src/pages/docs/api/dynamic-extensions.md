---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Dynamic Extensions
---

## Request the current dynamic extensions feature metadata

:span[GET]{.api-get} `/api/dynamic-extensions/features/metadata`

**Response**

`200` — The current dynamic extensions feature metadata

- **`Features`** :span[array of object]{.type-label}
  - **`Default`** :span[string]{.type-label}
  - **`Description`** :span[string]{.type-label}  
    Markdown formatted.
  - **`Key`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Options`** :span[object]{.type-label}

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

## Request the current dynamic extensions feature values

:span[GET]{.api-get} `/api/dynamic-extensions/features/values`

**Response**

`200` — The current dynamic extensions feature values

- **`Values`** :span[object]{.type-label}

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

## Modify the current dynamic extensions feature values

:span[PUT]{.api-put} `/api/dynamic-extensions/features/values`

**Request Body**

- **`Values`** :span[object]{.type-label} *(required)*

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

- **`Values`** :span[object]{.type-label}

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
