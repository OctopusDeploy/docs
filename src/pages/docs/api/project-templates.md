---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Project Templates
---

## Command to share a project template to spaces

`POST` `/api/platformhub/{gitRef}/projecttemplates/{slug}/share`

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`slug`** <span class="type-label">string</span> *(required)*

**Request Body**

`ShareProjectTemplateCommand`

- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`IndividuallySharedSpaceIds`** <span class="type-label">array of string</span> *(required)*
- **`ShareToAllSpaces`** <span class="type-label">boolean</span> *(required)*
- **`Slug`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "GitRef": "string",
  "IndividuallySharedSpaceIds": [
    "string"
  ],
  "ShareToAllSpaces": true,
  "Slug": "string"
}
```
</div>

**Response**

`200` — Response containing the results of the share project template command

`ShareProjectTemplateResponse`.

- **`IndividuallySharedSpaceIds`** <span class="type-label">array of string</span>
- **`IndividuallyUnsharedSpaceIds`** <span class="type-label">array of string</span>
- **`SharedToAllSpaces`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "IndividuallySharedSpaceIds": [
    "string"
  ],
  "IndividuallyUnsharedSpaceIds": [
    "string"
  ],
  "SharedToAllSpaces": true
}
```
</div>
