---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deprecations
---

## Toggle a deprecation on or off in Octopus Server. Used to test the impact of deprecations

:endpoint{method="POST" path="/api/deprecations/toggle"}

**Request Body**

- **`Deprecation`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Enabled`** :span[boolean]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "Deprecation": "string",
  "Enabled": true
}
```
:::

**Response**

`200` — Confirmation that the Toggle has been deprecated

:::api-example{label="Response"}
```json
{}
```
:::

## Toggle a deprecation on or off in Octopus Server. Used to test the impact of deprecations

:endpoint{method="POST" path="/api/deprecations/toggle/v1"}

**Request Body**

- **`Deprecation`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Enabled`** :span[boolean]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "Deprecation": "string",
  "Enabled": true
}
```
:::

**Response**

`200` — Confirmation that the Toggle has been deprecated

:::api-example{label="Response"}
```json
{}
```
:::
