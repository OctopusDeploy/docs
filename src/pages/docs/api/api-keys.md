---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Api Keys
---

## Get a list of API Keys for a given User

`GET` `/api/users/{userId}/apikeys`

Lists all API keys for a user, returning the most recent results first.

**Parameters**

- **`userId`** <span class="type-label">string</span> *(required)* — ID of the User.

- **`partialKeyword`** <span class="type-label">string</span> — Optional case-insensitive filter on the API key purpose or hint.
- **`partialPurpose`** <span class="type-label">string</span> — Optional case-insensitive filter on the API key purpose.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`ApiKeyResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`AccessLevel`** <span class="type-label">enum</span> — The access level this API key grants. Allowed values: `FullAccess`, `ReadOnly`, `Custom`.
  - **`ActorType`** <span class="type-label">enum</span> — Allowed values: `User`, `AiAgent`.
  - **`ApiKey`** <span class="type-label">sensitive value</span>
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`Expires`** <span class="type-label">string</span> — Format `date-time`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsLastUsedTimestampKnown`** <span class="type-label">boolean</span> — Whether the API key's last-used time is being tracked. False for keys that predate last-used tracking, whose usage history is unknown. When true, a null LastUsedTimeStamp means the key has never been used.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastUsedTimeStamp`** <span class="type-label">string</span> — The date and time (UTC) the API key was last used to authenticate; null if it has never been used. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Purpose`** <span class="type-label">string</span>
  - **`UserId`** <span class="type-label">string</span>
- **`ItemsPerPage`** <span class="type-label">integer</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastPageNumber`** <span class="type-label">integer</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NumberOfPages`** <span class="type-label">integer</span>
- **`TotalResults`** <span class="type-label">integer</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "AccessLevel": "FullAccess",
      "ActorType": "User",
      "ApiKey": {
        "HasValue": true,
        "Hint": "string",
        "NewValue": "string"
      },
      "Created": "2020-01-01T00:00:00.000Z",
      "Expires": "2020-01-01T00:00:00.000Z",
      "Id": "string",
      "IsLastUsedTimestampKnown": true,
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
</div>

## Generates a new API key for the specified user. The API key returned in the result must be saved by the caller, as it cannot be retrieved subsequently from the Octopus server

`POST` `/api/users/{userId}/apikeys`

**Parameters**

- **`userId`** <span class="type-label">string</span> *(required)* — ID of the user.

**Request Body**

`CreateUserApiKeyCommand`

- **`ActorType`** <span class="type-label">enum</span> — The kind of actor that will hold this API key. Defaults to User when omitted. Allowed values: `User`, `AiAgent`.
- **`Expires`** <span class="type-label">string</span> — The date after which the API key ceases to be usable. Provide a null value to create an API key with the maximum allowable expiry. If unspecified, will use the system default which is 180 days unless otherwise configured. Format `date-time`.
- **`Purpose`** <span class="type-label">string</span> — Informational text specifying the intended usage of the api key.
- **`UserId`** <span class="type-label">string</span> *(required)* — ID of the user.

<div data-example="Request">

```json
{
  "ActorType": "User",
  "Expires": "2020-01-01T00:00:00.000Z",
  "Purpose": "string",
  "UserId": "string"
}
```
</div>

**Response**

`200` — The created Api Key, containing the unencrypted value of the key which must be saved by the caller, as it cannot be retrieved subsequently from the Octopus server.

`ApiKeyCreatedResource`.

- **`ActorType`** <span class="type-label">enum</span> — Allowed values: `User`, `AiAgent`.
- **`ApiKey`** <span class="type-label">string</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`Expires`** <span class="type-label">string</span> — Format `date-time`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsLastUsedTimestampKnown`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUsedTimeStamp`** <span class="type-label">string</span> — Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Purpose`** <span class="type-label">string</span>
- **`UserId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ActorType": "User",
  "ApiKey": "string",
  "Created": "2020-01-01T00:00:00.000Z",
  "Expires": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "IsLastUsedTimestampKnown": true,
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
</div>

## Get a list of API Keys for a given User

`GET` `/api/users/{userId}/apikeys/v1`

Lists all API keys for a user, returning the most recent results first.

**Parameters**

- **`userId`** <span class="type-label">string</span> *(required)* — ID of the User.

- **`partialKeyword`** <span class="type-label">string</span> — Optional case-insensitive filter on the API key purpose or hint.
- **`partialPurpose`** <span class="type-label">string</span> — Optional case-insensitive filter on the API key purpose.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Success

`GetUserApiKeysResponse`.

- **`ApiKeys`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`ItemType`** <span class="type-label">string</span>
  - **`Items`** <span class="type-label">array of object</span>
  - **`ItemsPerPage`** <span class="type-label">integer</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastPageNumber`** <span class="type-label">integer</span>
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`NumberOfPages`** <span class="type-label">integer</span>
  - **`TotalResults`** <span class="type-label">integer</span>

<div data-example="Response">

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
        "IsLastUsedTimestampKnown": true,
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
</div>

## Get a ApiKeyResource by ID

`GET` `/api/users/{userId}/apikeys/{id}`

Gets a API key by ID.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the ApiKeyResource to load.
- **`userId`** <span class="type-label">string</span> *(required)* — ID of the User that owns the ApiKey.

**Response**

`200` — The requested Api Key

`ApiKeyResource`.

- **`AccessLevel`** <span class="type-label">enum</span> — The access level this API key grants. Allowed values: `FullAccess`, `ReadOnly`, `Custom`.
- **`ActorType`** <span class="type-label">enum</span> — Allowed values: `User`, `AiAgent`.
- **`ApiKey`** <span class="type-label">sensitive value</span>
  - **`HasValue`** <span class="type-label">boolean</span>
  - **`Hint`** <span class="type-label">string</span>
  - **`NewValue`** <span class="type-label">string</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`Expires`** <span class="type-label">string</span> — Format `date-time`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsLastUsedTimestampKnown`** <span class="type-label">boolean</span> — Whether the API key's last-used time is being tracked. False for keys that predate last-used tracking, whose usage history is unknown. When true, a null LastUsedTimeStamp means the key has never been used.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUsedTimeStamp`** <span class="type-label">string</span> — The date and time (UTC) the API key was last used to authenticate; null if it has never been used. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Purpose`** <span class="type-label">string</span>
- **`UserId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AccessLevel": "FullAccess",
  "ActorType": "User",
  "ApiKey": {
    "HasValue": true,
    "Hint": "string",
    "NewValue": "string"
  },
  "Created": "2020-01-01T00:00:00.000Z",
  "Expires": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "IsLastUsedTimestampKnown": true,
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
</div>

## Revokes an existing API key

`DELETE` `/api/users/{userId}/apikeys/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the ApiKey to delete.
- **`userId`** <span class="type-label">string</span> *(required)* — Id of the User that owns the ApiKey to delete.

**Response**

`200` — Confirmation that a User API Key has been deleted

`DeleteUserApiKeyByIdResponse`.

<div data-example="Response">

```json
{}
```
</div>
