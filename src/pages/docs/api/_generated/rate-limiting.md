---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Rate Limiting
---

Rate Limiting policies can be configured via the API.

See https://octopus.com/docs/administration/managing-infrastructure/rate-limiting to understand the feature and what the settings mean.

## List all rate limiting policies

:endpoint{method="GET" path="/api/ratelimitingpolicies"}

There are three builtin policies, so while this returns a paginated response, there is only ever a single page. - Unauthenticated requests - Authenticated requests - AI Agent requests

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Minimum `0`.

**Response**

`200` — Success

- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`AuditMode`** :span[boolean]{.type-label}  
    When enabled, the policy logs requests that would be rate limited without rejecting them (no 429 response).
  - **`BurstLimit`** :span[integer]{.type-label}  
    Maximum capacity of the token bucket.
  - **`Id`** :span[string]{.type-label}  
    The ID of this policy.
  - **`IsBuiltIn`** :span[boolean]{.type-label}  
    Whether this is a built-in policy that cannot be deleted or have its name or scope changed.
  - **`IsEnabled`** :span[boolean]{.type-label}  
    Whether this policy is actively enforced.
  - **`Name`** :span[string]{.type-label}  
    The display name of this policy. Minimum length 1.
  - **`RequestsPerMinute`** :span[integer]{.type-label}  
    Number of requests permitted per minute.
  - **`ScopeType`** :span[string]{.type-label}  
    The scope this policy applies to.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastPageNumber`** :span[integer]{.type-label}
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ItemType": "string",
  "Items": [
    {
      "AuditMode": false,
      "BurstLimit": 200,
      "Id": "RateLimitingPolicies-1",
      "IsBuiltIn": false,
      "IsEnabled": false,
      "Name": "Authenticated requests",
      "RequestsPerMinute": 600,
      "ScopeType": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastPageNumber": 0,
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
:::

## Get a rate limiting policy by ID

:endpoint{method="GET" path="/api/ratelimitingpolicies/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the rate limiting policy.

**Response**

`200` — A Rate Limiting Policy

- **`AuditMode`** :span[boolean]{.type-label}  
  When enabled, the policy logs requests that would be rate limited without rejecting them (no 429 response).
- **`BurstLimit`** :span[integer]{.type-label}  
  Maximum capacity of the token bucket.
- **`Id`** :span[string]{.type-label}  
  The ID of this policy.
- **`IsBuiltIn`** :span[boolean]{.type-label}  
  Whether this is a built-in policy that cannot be deleted or have its name or scope changed.
- **`IsEnabled`** :span[boolean]{.type-label}  
  Whether this policy is actively enforced.
- **`Name`** :span[string]{.type-label}  
  The display name of this policy. Minimum length 1.
- **`RequestsPerMinute`** :span[integer]{.type-label}  
  Number of requests permitted per minute.
- **`ScopeType`** :span[string]{.type-label}  
  The scope this policy applies to.

:::api-example{label="Response"}
```json
{
  "AuditMode": false,
  "BurstLimit": 200,
  "Id": "RateLimitingPolicies-1",
  "IsBuiltIn": false,
  "IsEnabled": false,
  "Name": "Authenticated requests",
  "RequestsPerMinute": 600,
  "ScopeType": "string"
}
```
:::

## Modify an existing rate limiting policy

:endpoint{method="PUT" path="/api/ratelimitingpolicies/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the policy to modify.

**Request Body**

- **`AuditMode`** :span[boolean]{.type-label} *(required)*  
  When enabled, the policy logs requests that would be rate limited without rejecting them (no 429 response).
- **`BurstLimit`** :span[integer]{.type-label} *(required)*  
  Maximum capacity of the token bucket.
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the policy to modify.
- **`IsEnabled`** :span[boolean]{.type-label} *(required)*  
  Whether this policy is actively enforced.
- **`Name`** :span[string]{.type-label} *(required)*  
  The display name of the policy. Minimum length 1.
- **`RequestsPerMinute`** :span[integer]{.type-label} *(required)*  
  Number of requests permitted per minute.
- **`ScopeType`** :span[string]{.type-label} *(required)*  
  The scope this policy applies to.

:::api-example{label="Request"}
```json
{
  "AuditMode": false,
  "BurstLimit": 200,
  "Id": "RateLimitingPolicies-1",
  "IsEnabled": false,
  "Name": "Authenticated requests",
  "RequestsPerMinute": 600,
  "ScopeType": "string"
}
```
:::

**Response**

`200` — A Rate Limiting Policy

- **`AuditMode`** :span[boolean]{.type-label}  
  When enabled, the policy logs requests that would be rate limited without rejecting them (no 429 response).
- **`BurstLimit`** :span[integer]{.type-label}  
  Maximum capacity of the token bucket.
- **`Id`** :span[string]{.type-label}  
  The ID of this policy.
- **`IsBuiltIn`** :span[boolean]{.type-label}  
  Whether this is a built-in policy that cannot be deleted or have its name or scope changed.
- **`IsEnabled`** :span[boolean]{.type-label}  
  Whether this policy is actively enforced.
- **`Name`** :span[string]{.type-label}  
  The display name of this policy. Minimum length 1.
- **`RequestsPerMinute`** :span[integer]{.type-label}  
  Number of requests permitted per minute.
- **`ScopeType`** :span[string]{.type-label}  
  The scope this policy applies to.

:::api-example{label="Response"}
```json
{
  "AuditMode": false,
  "BurstLimit": 200,
  "Id": "RateLimitingPolicies-1",
  "IsBuiltIn": false,
  "IsEnabled": false,
  "Name": "Authenticated requests",
  "RequestsPerMinute": 600,
  "ScopeType": "string"
}
```
:::
