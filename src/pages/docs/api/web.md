---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Web
---

## POST /api/jiraservicemanagement-integration/connectivity-test

:span[POST]{.api-post} `/api/jiraservicemanagement-integration/connectivity-test`

**Request Body**

- **`BaseUrl`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`Token`** :span[string]{.type-label}
- **`Username`** :span[string]{.type-label}

<div data-example="Request">

```json
{
  "BaseUrl": "string",
  "Id": "string",
  "Token": "string",
  "Username": "string"
}
```
</div>

**Response**

`200` — OK

## POST /api/servicenow-integration/connectivity-test

:span[POST]{.api-post} `/api/servicenow-integration/connectivity-test`

**Request Body**

- **`BaseUrl`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}
- **`OAuthClientId`** :span[string]{.type-label}
- **`OAuthClientSecret`** :span[string]{.type-label}
- **`UserPassword`** :span[string]{.type-label}
- **`Username`** :span[string]{.type-label}

<div data-example="Request">

```json
{
  "BaseUrl": "string",
  "Id": "string",
  "OAuthClientId": "string",
  "OAuthClientSecret": "string",
  "UserPassword": "string",
  "Username": "string"
}
```
</div>

**Response**

`200` — OK
