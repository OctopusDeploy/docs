---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Icons
---

## Get details of all icons

`GET` `/api/icons/all`

**Response**

`200` — The requested list of Icons

`GetAllIconsResponse`.

- **`icons`** <span class="type-label">array of object</span>
  - **`iconHeight`** <span class="type-label">integer</span>
  - **`iconPath`** <span class="type-label">string</span>
  - **`iconWidth`** <span class="type-label">integer</span>
  - **`id`** <span class="type-label">string</span>
  - **`label`** <span class="type-label">string</span>
  - **`searchTerms`** <span class="type-label">array of string</span>

<div data-example="Response">

```json
{
  "icons": [
    {
      "iconHeight": 0,
      "iconPath": "string",
      "iconWidth": 0,
      "id": "string",
      "label": "string",
      "searchTerms": [
        "string"
      ]
    }
  ]
}
```
</div>

## Get all icon categories and icon IDs contained in each category

`GET` `/api/icons/categories`

**Response**

`200` — The requested Icon Categories

`GetIconCategoriesResponse`.

- **`categories`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "categories": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  }
}
```
</div>

## Modifies the logo of a Space to be a specified icon

`POST` `/api/spaces/{spaceId}/logo/icon`

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space to change logo for. Example: 'Space-1'.

**Request Body**

`ModifySpaceIconCommand`

- **`IconColor`** <span class="type-label">string</span> *(required)* — Color of the icon in hex format. Example: '#0D80D8'. Minimum length 1. Must match `^#[0-9a-fA-F]{6}$`.
- **`IconId`** <span class="type-label">string</span> *(required)* — ID of the icon. Example: 'octopus-deploy'. Minimum length 1.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space to change logo for. Example: 'Space-1'.

<div data-example="Request">

```json
{
  "IconColor": "string",
  "IconId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Space Icon has been modified

`ModifySpaceIconResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Modifies the logo of a project to be a specified icon

`POST` `/api/{spaceId}/projects/{projectId}/logo/icon`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/logo/icon`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project to change logo for. Example: 'Projects-1'.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyProjectIconCommand`

- **`IconColor`** <span class="type-label">string</span> *(required)* — Color of the icon in hex format. Example: '#0D80D8'. Minimum length 1. Must match `^#[0-9a-fA-F]{6}$`.
- **`IconId`** <span class="type-label">string</span> *(required)* — ID of the icon. Example: 'octopus-deploy'. Minimum length 1.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — The ID of the project to change logo for. Example: 'Projects-1'.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "IconColor": "string",
  "IconId": "string",
  "ProjectId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Project Icon has been modified

`ModifyProjectIconResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Modifies the logo of a tenant to be a specified icon

`POST` `/api/{spaceId}/tenants/{tenantId}/logo/icon`

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/logo/icon`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`tenantId`** <span class="type-label">string</span> *(required)* — The ID of the tenant to change logo for. Example: 'Tenants-1'.

**Request Body**

`ModifyTenantIconCommand`

- **`IconColor`** <span class="type-label">string</span> *(required)* — Color of the icon in hex format. Example: '#0D80D8'. Minimum length 1. Must match `^#[0-9a-fA-F]{6}$`.
- **`IconId`** <span class="type-label">string</span> *(required)* — ID of the icon. Example: 'octopus-deploy'. Minimum length 1.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`TenantId`** <span class="type-label">string</span> *(required)* — The ID of the tenant to change logo for. Example: 'Tenants-1'.

<div data-example="Request">

```json
{
  "IconColor": "string",
  "IconId": "string",
  "SpaceId": "string",
  "TenantId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Tenant Icon has been modified

`ModifyTenantIconResponse`.

<div data-example="Response">

```json
{}
```
</div>
