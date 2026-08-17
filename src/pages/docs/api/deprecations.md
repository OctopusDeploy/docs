---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deprecations
---

## Toggle a deprecation on or off in Octopus Server. Used to test the impact of deprecations

:span[POST]{.api-post} `/api/deprecations/toggle`

**Request Body**

- **`Deprecation`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Enabled`** :span[boolean]{.type-label} *(required)*

<div data-example="Request">

```json
{
  "Deprecation": "string",
  "Enabled": true
}
```
</div>

**Response**

`200` — Confirmation that the Toggle has been deprecated

<div data-example="Response">

```json
{}
```
</div>

## Toggle a deprecation on or off in Octopus Server. Used to test the impact of deprecations

:span[POST]{.api-post} `/api/deprecations/toggle/v1`

**Request Body**

- **`Deprecation`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Enabled`** :span[boolean]{.type-label} *(required)*

<div data-example="Request">

```json
{
  "Deprecation": "string",
  "Enabled": true
}
```
</div>

**Response**

`200` — Confirmation that the Toggle has been deprecated

<div data-example="Response">

```json
{}
```
</div>
