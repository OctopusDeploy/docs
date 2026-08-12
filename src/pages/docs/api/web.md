---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Web
---

## POST /api/jiraservicemanagement-integration/connectivity-test

`POST` `/api/jiraservicemanagement-integration/connectivity-test`

**Request Body**

`JiraServiceManagementConnectionCheckRequest`

- **`BaseUrl`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span>
- **`Token`** <span class="type-label">string</span>
- **`Username`** <span class="type-label">string</span>

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

`POST` `/api/servicenow-integration/connectivity-test`

**Request Body**

`ServiceNowConnectionCheckRequest`

- **`BaseUrl`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span>
- **`OAuthClientId`** <span class="type-label">string</span>
- **`OAuthClientSecret`** <span class="type-label">string</span>
- **`UserPassword`** <span class="type-label">string</span>
- **`Username`** <span class="type-label">string</span>

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
