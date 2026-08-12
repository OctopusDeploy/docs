---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deprecations
---

## Toggles a deprecation on or off in Octopus Server. Used to test the impact of deprecations

`POST` `/api/deprecations/toggle`

**Request Body**

`ToggleDeprecationCommand`

- **`Deprecation`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Enabled`** <span class="type-label">boolean</span> *(required)*

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

`ToggleDeprecationResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Toggles a deprecation on or off in Octopus Server. Used to test the impact of deprecations

`POST` `/api/deprecations/toggle/v1`

**Request Body**

`ToggleDeprecationCommand`

- **`Deprecation`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Enabled`** <span class="type-label">boolean</span> *(required)*

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

`ToggleDeprecationResponse`.

<div data-example="Response">

```json
{}
```
</div>
