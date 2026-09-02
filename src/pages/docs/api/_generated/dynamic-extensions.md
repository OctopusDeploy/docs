---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Dynamic Extensions
---

## Request the current dynamic extensions feature metadata

:endpoint{method="GET" path="/api/dynamic-extensions/features/metadata"}

**Response**

`200` — The current dynamic extensions feature metadata

- **`Features`** :span[array of object]{.type-label}
  - **`Default`** :span[string]{.type-label}
  - **`Description`** :span[string]{.type-label}  
    Markdown formatted.
  - **`Key`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Options`** :span[object]{.type-label}

:::api-example{label="Response"}
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
:::

## Request the current dynamic extensions feature values

:endpoint{method="GET" path="/api/dynamic-extensions/features/values"}

**Response**

`200` — The current dynamic extensions feature values

- **`Values`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "Values": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
:::

## Modify the current dynamic extensions feature values

:endpoint{method="PUT" path="/api/dynamic-extensions/features/values"}

**Request Body**

- **`Values`** :span[object]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "Values": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
:::

**Response**

`200` — The new dynamic extensions feature values

- **`Values`** :span[object]{.type-label}

:::api-example{label="Response"}
```json
{
  "Values": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
:::
