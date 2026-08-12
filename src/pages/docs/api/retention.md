---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Retention
---

## Get the default retention configuration

`GET` `/api/configuration/retention-default`

**Response**

`200` — The default retention configuration

`RetentionDefaultConfigurationResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`RetentionDays`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "RetentionDays": 0
}
```
</div>

## Updates the default retention configuration

`PUT` `/api/configuration/retention-default`

**Request Body**

`ModifyRetentionDefaultConfigurationCommand`

- **`RetentionDays`** <span class="type-label">integer</span>

<div data-example="Request">

```json
{
  "RetentionDays": 0
}
```
</div>

**Response**

`200` — Success

## Get the configured default retention policies for the given retention type

`GET` `/api/{spaceId}/retentionpolicies`

Also reachable at `/api/retentionpolicies`, `/api/spaces/{spaceIdentifier}/retentionpolicies`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`retentionType`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Returns the configured default retention policy values

`SpaceDefaultRetentionPolicyResource`.

- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span>
- **`RetentionType`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "Name": "string",
  "RetentionType": "string",
  "SpaceId": "string"
}
```
</div>

## Modify a default retention policy

`PUT` `/api/{spaceId}/retentionpolicies/{id}`

Also reachable at `/api/retentionpolicies/{id}`, `/api/spaces/{spaceIdentifier}/retentionpolicies/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the default retention policy.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space that contains the default retention policy.

**Request Body**

`ModifyDefaultRetentionPolicyCommand`

- **`Id`** <span class="type-label">string</span> *(required)* — The id of the default retention policy.
- **`RetentionType`** <span class="type-label">string</span> *(required)* — The type of the default retention policy. ["MachinePackageCache", "LifecycleRetention", "TentacleRetention", "RunbookRetention"].
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The id of the space that contains the default retention policy.

<div data-example="Request">

```json
{
  "Id": "string",
  "RetentionType": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — The response returned from the request to modify a default retention policy.

`SpaceDefaultRetentionPolicyResource`.

- **`Id`** <span class="type-label">string</span>
- **`Name`** <span class="type-label">string</span>
- **`RetentionType`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "Name": "string",
  "RetentionType": "string",
  "SpaceId": "string"
}
```
</div>
