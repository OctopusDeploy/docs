---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Rate Limiting
---

Rate Limiting policies can be configured via the API.

See https://octopus.com/docs/administration/managing-infrastructure/rate-limiting to understand the feature and what the settings mean.

## List all rate limiting policies

`GET` `/api/ratelimitingpolicies`

There are three builtin policies, so while this returns a paginated response, there is only ever a single page. - Unauthenticated requests - Authenticated requests - AI Agent requests

**Parameters**

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Minimum `0`.

**Response**

`200` — Success

`RateLimitingPolicyResourcePaginatedCollection`.

- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`AuditMode`** <span class="type-label">boolean</span> — When enabled, the policy logs requests that would be rate limited without rejecting them (no 429 response).
  - **`BurstLimit`** <span class="type-label">integer</span> — Maximum capacity of the token bucket.
  - **`Id`** <span class="type-label">string</span> — The ID of this policy.
  - **`IsBuiltIn`** <span class="type-label">boolean</span> — Whether this is a built-in policy that cannot be deleted or have its name or scope changed.
  - **`IsEnabled`** <span class="type-label">boolean</span> — Whether this policy is actively enforced.
  - **`Name`** <span class="type-label">string</span> — The display name of this policy. Minimum length 1.
  - **`RequestsPerMinute`** <span class="type-label">integer</span> — Number of requests permitted per minute.
  - **`ScopeType`** <span class="type-label">string</span> — The scope this policy applies to.
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`LastPageNumber`** <span class="type-label">integer</span>
- **`NumberOfPages`** <span class="type-label">integer</span>
- **`TotalResults`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "ItemType": "string",
  "Items": [
    {
      "AuditMode": true,
      "BurstLimit": 200,
      "Id": "RateLimitingPolicies-1",
      "IsBuiltIn": true,
      "IsEnabled": true,
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
</div>

## Get a rate limiting policy by ID

`GET` `/api/ratelimitingpolicies/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the rate limiting policy.

**Response**

`200` — A rate limiting policy that controls request throughput using token bucket semantics.

`RateLimitingPolicyResource`.

- **`AuditMode`** <span class="type-label">boolean</span> — When enabled, the policy logs requests that would be rate limited without rejecting them (no 429 response).
- **`BurstLimit`** <span class="type-label">integer</span> — Maximum capacity of the token bucket.
- **`Id`** <span class="type-label">string</span> — The ID of this policy.
- **`IsBuiltIn`** <span class="type-label">boolean</span> — Whether this is a built-in policy that cannot be deleted or have its name or scope changed.
- **`IsEnabled`** <span class="type-label">boolean</span> — Whether this policy is actively enforced.
- **`Name`** <span class="type-label">string</span> — The display name of this policy. Minimum length 1.
- **`RequestsPerMinute`** <span class="type-label">integer</span> — Number of requests permitted per minute.
- **`ScopeType`** <span class="type-label">string</span> — The scope this policy applies to.

<div data-example="Response">

```json
{
  "AuditMode": true,
  "BurstLimit": 200,
  "Id": "RateLimitingPolicies-1",
  "IsBuiltIn": true,
  "IsEnabled": true,
  "Name": "Authenticated requests",
  "RequestsPerMinute": 600,
  "ScopeType": "string"
}
```
</div>

## Modify an existing rate limiting policy

`PUT` `/api/ratelimitingpolicies/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the policy to modify.

**Request Body**

`ModifyRateLimitingPolicyCommand`

- **`AuditMode`** <span class="type-label">boolean</span> *(required)* — When enabled, the policy logs requests that would be rate limited without rejecting them (no 429 response).
- **`BurstLimit`** <span class="type-label">integer</span> *(required)* — Maximum capacity of the token bucket.
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the policy to modify.
- **`IsEnabled`** <span class="type-label">boolean</span> *(required)* — Whether this policy is actively enforced.
- **`Name`** <span class="type-label">string</span> *(required)* — The display name of the policy. Minimum length 1.
- **`RequestsPerMinute`** <span class="type-label">integer</span> *(required)* — Number of requests permitted per minute.
- **`ScopeType`** <span class="type-label">string</span> *(required)* — The scope this policy applies to.

<div data-example="Request">

```json
{
  "AuditMode": true,
  "BurstLimit": 0,
  "Id": "string",
  "IsEnabled": true,
  "Name": "string",
  "RequestsPerMinute": 0,
  "ScopeType": "string"
}
```
</div>

**Response**

`200` — A rate limiting policy that controls request throughput using token bucket semantics.

`RateLimitingPolicyResource`.

- **`AuditMode`** <span class="type-label">boolean</span> — When enabled, the policy logs requests that would be rate limited without rejecting them (no 429 response).
- **`BurstLimit`** <span class="type-label">integer</span> — Maximum capacity of the token bucket.
- **`Id`** <span class="type-label">string</span> — The ID of this policy.
- **`IsBuiltIn`** <span class="type-label">boolean</span> — Whether this is a built-in policy that cannot be deleted or have its name or scope changed.
- **`IsEnabled`** <span class="type-label">boolean</span> — Whether this policy is actively enforced.
- **`Name`** <span class="type-label">string</span> — The display name of this policy. Minimum length 1.
- **`RequestsPerMinute`** <span class="type-label">integer</span> — Number of requests permitted per minute.
- **`ScopeType`** <span class="type-label">string</span> — The scope this policy applies to.

<div data-example="Response">

```json
{
  "AuditMode": true,
  "BurstLimit": 200,
  "Id": "RateLimitingPolicies-1",
  "IsBuiltIn": true,
  "IsEnabled": true,
  "Name": "Authenticated requests",
  "RequestsPerMinute": 600,
  "ScopeType": "string"
}
```
</div>
