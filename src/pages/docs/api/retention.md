---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Retention
---

## Get the default retention configuration

:span[GET]{.api-get} `/api/configuration/retention-default`

**Response**

`200` — The default retention configuration

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`RetentionDays`** :span[integer]{.type-label}

:::api-example{label="Response"}
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
:::

## Update the default retention configuration

:span[PUT]{.api-put} `/api/configuration/retention-default`

**Request Body**

- **`RetentionDays`** :span[integer]{.type-label}

:::api-example{label="Request"}
```json
{
  "RetentionDays": 0
}
```
:::

**Response**

`200` — Success

## Get the configured default retention policies for the given retention type

:span[GET]{.api-get} `/api/{spaceId}/retentionpolicies`

Also reachable at `/api/retentionpolicies`, `/api/spaces/{spaceIdentifier}/retentionpolicies`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`retentionType`** :span[string]{.type-label} *(required)*

**Response**

`200` — Returns the configured default retention policy values

- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}
- **`RetentionType`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "Name": "string",
  "RetentionType": "string",
  "SpaceId": "string"
}
```
:::

## Modify a default retention policy

:span[PUT]{.api-put} `/api/{spaceId}/retentionpolicies/{id}`

Also reachable at `/api/retentionpolicies/{id}`, `/api/spaces/{spaceIdentifier}/retentionpolicies/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the default retention policy.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space that contains the default retention policy.

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*  
  The id of the default retention policy.
- **`RetentionType`** :span[string]{.type-label} *(required)*  
  The type of the default retention policy. ["MachinePackageCache", "LifecycleRetention", "TentacleRetention", "RunbookRetention"].
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The id of the space that contains the default retention policy.

:::api-example{label="Request"}
```json
{
  "Id": "string",
  "RetentionType": "string",
  "SpaceId": "string"
}
```
:::

**Response**

`200` — The response returned from the request to modify a default retention policy.

- **`Id`** :span[string]{.type-label}
- **`Name`** :span[string]{.type-label}
- **`RetentionType`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "Name": "string",
  "RetentionType": "string",
  "SpaceId": "string"
}
```
:::
