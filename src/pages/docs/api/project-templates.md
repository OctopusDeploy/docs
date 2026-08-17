---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Project Templates
---

## Share a project template to spaces

:span[POST]{.api-post} `/api/platformhub/{gitRef}/projecttemplates/{slug}/share`

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`slug`** :span[string]{.type-label} *(required)*

**Request Body**

- **`GitRef`** :span[string]{.type-label} *(required)*
- **`IndividuallySharedSpaceIds`** :span[array of string]{.type-label} *(required)*
- **`ShareToAllSpaces`** :span[boolean]{.type-label} *(required)*
- **`Slug`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

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

- **`IndividuallySharedSpaceIds`** :span[array of string]{.type-label}
- **`IndividuallyUnsharedSpaceIds`** :span[array of string]{.type-label}
- **`SharedToAllSpaces`** :span[boolean]{.type-label}

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
