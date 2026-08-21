---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Api Keys
---

## Get a list of API Keys for a User

:endpoint{method="GET" path="/api/users/\{userId\}/apikeys"}

Lists all API keys for a user, returning the most recent results first.

**Path Parameters**

- **`userId`** :span[string]{.type-label} *(required)*  
  ID of the User.

**Query Parameters**

- **`partialKeyword`** :span[string]{.type-label}  
  Optional case-insensitive filter on the API key purpose or hint.
- **`partialPurpose`** :span[string]{.type-label}  
  Optional case-insensitive filter on the API key purpose.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`AccessLevel`** :span[enum]{.type-label}  
    The access level this API key grants.  
    Allowed values: `FullAccess`, `ReadOnly`, `Custom`.
  - **`ActorType`** :span[enum]{.type-label}  
    Allowed values: `User`, `AiAgent`.
  - **`ApiKey`** :span[sensitive value]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Expires`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsLastUsedTimestampKnown`** :span[boolean]{.type-label}  
    Whether the API key's last-used time is being tracked. False for keys that predate last-used tracking, whose usage history is unknown. When true, a null LastUsedTimeStamp means the key has never been used.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastUsedTimeStamp`** :span[string]{.type-label}  
    The date and time (UTC) the API key was last used to authenticate; null if it has never been used. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Purpose`** :span[string]{.type-label}
  - **`UserId`** :span[string]{.type-label}  
    Minimum length 1.
- **`ItemsPerPage`** :span[integer]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastPageNumber`** :span[integer]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NumberOfPages`** :span[integer]{.type-label}
- **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "AccessLevel": "FullAccess",
      "ActorType": "User",
      "ApiKey": {
        "HasValue": false,
        "Hint": "string",
        "NewValue": "string"
      },
      "Created": "2020-01-01T00:00:00.000Z",
      "Expires": "2020-01-01T00:00:00.000Z",
      "Id": "string",
      "IsLastUsedTimestampKnown": false,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LastUsedTimeStamp": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Purpose": "string",
      "UserId": "string"
    }
  ],
  "ItemsPerPage": 0,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastPageNumber": 0,
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NumberOfPages": 0,
  "TotalResults": 0
}
```
:::

## Generate a new API key for a User

:endpoint{method="POST" path="/api/users/\{userId\}/apikeys"}

The API Key returned in the result must be saved by the caller, as it cannot be retrieved subsequently from the Octopus server

**Path Parameters**

- **`userId`** :span[string]{.type-label} *(required)*  
  ID of the user.

**Request Body**

- **`ActorType`** :span[enum]{.type-label}  
  The kind of actor that will hold this API key. Defaults to User when omitted.  
  Allowed values: `User`, `AiAgent`.
- **`Expires`** :span[string]{.type-label}  
  The date after which the API key ceases to be usable. Provide a null value to create an API key with the maximum allowable expiry. If unspecified, will use the system default which is 180 days unless otherwise configured. Format `date-time`.
- **`Purpose`** :span[string]{.type-label}  
  Informational text specifying the intended usage of the api key.
- **`UserId`** :span[string]{.type-label} *(required)*  
  ID of the user.

:::api-example{label="Request"}
```json
{
  "ActorType": "User",
  "Expires": "2020-01-01T00:00:00.000Z",
  "Purpose": "string",
  "UserId": "Users-1"
}
```
:::

**Response**

`200` — The created API Key, containing the unencrypted value of the key which must be saved by the caller, as it cannot be retrieved subsequently from the Octopus server.

- **`ActorType`** :span[enum]{.type-label}  
  Allowed values: `User`, `AiAgent`.
- **`ApiKey`** :span[string]{.type-label}  
  Minimum length 1.
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`Expires`** :span[string]{.type-label}  
  Format `date-time`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsLastUsedTimestampKnown`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUsedTimeStamp`** :span[string]{.type-label}  
  Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Purpose`** :span[string]{.type-label}
- **`UserId`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "ActorType": "User",
  "ApiKey": "string",
  "Created": "2020-01-01T00:00:00.000Z",
  "Expires": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "IsLastUsedTimestampKnown": false,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastUsedTimeStamp": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Purpose": "string",
  "UserId": "string"
}
```
:::

## Get a list of API Keys for a User

:endpoint{method="GET" path="/api/users/\{userId\}/apikeys/v1"}

Lists all API keys for a user, returning the most recent results first.

**Path Parameters**

- **`userId`** :span[string]{.type-label} *(required)*  
  ID of the User.

**Query Parameters**

- **`partialKeyword`** :span[string]{.type-label}  
  Optional case-insensitive filter on the API key purpose or hint.
- **`partialPurpose`** :span[string]{.type-label}  
  Optional case-insensitive filter on the API key purpose.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

- **`ApiKeys`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`ItemType`** :span[string]{.type-label}
  - **`Items`** :span[array of object]{.type-label}
  - **`ItemsPerPage`** :span[integer]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastPageNumber`** :span[integer]{.type-label}
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`NumberOfPages`** :span[integer]{.type-label}
  - **`TotalResults`** :span[integer]{.type-label}

:::api-example{label="Response"}
```json
{
  "ApiKeys": {
    "Id": "string",
    "ItemType": "string",
    "Items": [
      {
        "AccessLevel": "FullAccess",
        "ActorType": "User",
        "ApiKey": {},
        "Created": "2020-01-01T00:00:00.000Z",
        "Expires": "2020-01-01T00:00:00.000Z",
        "Id": "string",
        "IsLastUsedTimestampKnown": false,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "LastUsedTimeStamp": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "Purpose": "string",
        "UserId": "string"
      }
    ],
    "ItemsPerPage": 0,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "LastPageNumber": 0,
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "NumberOfPages": 0,
    "TotalResults": 0
  }
}
```
:::

## Get an API Key by ID

:endpoint{method="GET" path="/api/users/\{userId\}/apikeys/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the ApiKeyResource to load.
- **`userId`** :span[string]{.type-label} *(required)*  
  ID of the User that owns the ApiKey.

**Response**

`200` — The requested API Key

- **`AccessLevel`** :span[enum]{.type-label}  
  The access level this API key grants.  
  Allowed values: `FullAccess`, `ReadOnly`, `Custom`.
- **`ActorType`** :span[enum]{.type-label}  
  Allowed values: `User`, `AiAgent`.
- **`ApiKey`** :span[sensitive value]{.type-label}
  - **`HasValue`** :span[boolean]{.type-label}
  - **`Hint`** :span[string]{.type-label}
  - **`NewValue`** :span[string]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`Expires`** :span[string]{.type-label}  
  Format `date-time`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsLastUsedTimestampKnown`** :span[boolean]{.type-label}  
  Whether the API key's last-used time is being tracked. False for keys that predate last-used tracking, whose usage history is unknown. When true, a null LastUsedTimeStamp means the key has never been used.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUsedTimeStamp`** :span[string]{.type-label}  
  The date and time (UTC) the API key was last used to authenticate; null if it has never been used. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Purpose`** :span[string]{.type-label}
- **`UserId`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "AccessLevel": "FullAccess",
  "ActorType": "User",
  "ApiKey": {
    "HasValue": false,
    "Hint": "string",
    "NewValue": "string"
  },
  "Created": "2020-01-01T00:00:00.000Z",
  "Expires": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "IsLastUsedTimestampKnown": false,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastUsedTimeStamp": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Purpose": "string",
  "UserId": "string"
}
```
:::

## Revoke an API Key

:endpoint{method="DELETE" path="/api/users/\{userId\}/apikeys/\{id\}"}

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the ApiKey to delete.
- **`userId`** :span[string]{.type-label} *(required)*  
  Id of the User that owns the ApiKey to delete.

**Response**

`200` — Confirmation that a User API Key has been deleted

:::api-example{label="Response"}
```json
{}
```
:::
