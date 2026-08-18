---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Icons
---

## Get details of all icons

:endpoint{method="GET" path="/api/icons/all"}

**Response**

`200` — The requested list of Icons

- **`icons`** :span[array of object]{.type-label}
  - **`iconHeight`** :span[integer]{.type-label}
  - **`iconPath`** :span[string]{.type-label}
  - **`iconWidth`** :span[integer]{.type-label}
  - **`id`** :span[string]{.type-label}
  - **`label`** :span[string]{.type-label}
  - **`searchTerms`** :span[array of string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get all icon categories and icon IDs contained in each category

:endpoint{method="GET" path="/api/icons/categories"}

**Response**

`200` — The requested Icon Categories

- **`categories`** :span[object]{.type-label}

:::api-example{label="Response"}
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
:::

## Modify the logo of a Space to be a specified icon

:endpoint{method="POST" path="/api/spaces/\{spaceId\}/logo/icon"}

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space to change logo for. Example: 'Space-1'.

**Request Body**

- **`IconColor`** :span[string]{.type-label} *(required)*  
  Color of the icon in hex format. Example: '#0D80D8'. Minimum length 1. Must match `^#[0-9a-fA-F]{6}$`.
- **`IconId`** :span[string]{.type-label} *(required)*  
  ID of the icon. Example: 'octopus-deploy'. Minimum length 1.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space to change logo for. Example: 'Space-1'.

:::api-example{label="Request"}
```json
{
  "IconColor": "string",
  "IconId": "string",
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Confirmation that the Space Icon has been modified

:::api-example{label="Response"}
```json
{}
```
:::

## Modify the logo of a project to be a specified icon

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/logo/icon"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/logo/icon`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project to change logo for. Example: 'Projects-1'.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`IconColor`** :span[string]{.type-label} *(required)*  
  Color of the icon in hex format. Example: '#0D80D8'. Minimum length 1. Must match `^#[0-9a-fA-F]{6}$`.
- **`IconId`** :span[string]{.type-label} *(required)*  
  ID of the icon. Example: 'octopus-deploy'. Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  The ID of the project to change logo for. Example: 'Projects-1'.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "IconColor": "string",
  "IconId": "string",
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Confirmation that the Project Icon has been modified

:::api-example{label="Response"}
```json
{}
```
:::

## Modify the logo of a tenant to be a specified icon

:endpoint{method="POST" path="/api/\{spaceId\}/tenants/\{tenantId\}/logo/icon"}

Also reachable at `/api/spaces/{spaceIdentifier}/tenants/{tenantId}/logo/icon`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`tenantId`** :span[string]{.type-label} *(required)*  
  The ID of the tenant to change logo for. Example: 'Tenants-1'.

**Request Body**

- **`IconColor`** :span[string]{.type-label} *(required)*  
  Color of the icon in hex format. Example: '#0D80D8'. Minimum length 1. Must match `^#[0-9a-fA-F]{6}$`.
- **`IconId`** :span[string]{.type-label} *(required)*  
  ID of the icon. Example: 'octopus-deploy'. Minimum length 1.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`TenantId`** :span[string]{.type-label} *(required)*  
  The ID of the tenant to change logo for. Example: 'Tenants-1'.

:::api-example{label="Request"}
```json
{
  "IconColor": "string",
  "IconId": "string",
  "SpaceId": "string",
  "TenantId": "string"
}
```
:::

**Response**

`200` — Confirmation that the Tenant Icon has been modified

:::api-example{label="Response"}
```json
{}
```
:::
