---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Home
---

## GET /api/{spaceId}

`GET` `/api/{spaceId}`

Returns a document describing the specified Space and links to other parts of the API that apply to the Space.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — Must match `Spaces-\d+`.

**Response**

`200` — Success

`SpaceRootResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

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
  }
}
```
</div>

## GET /api/

`GET` `/api/`

Returns a document describing the current Octopus Server and links to other parts of the API.

**Response**

`200` — Success

`RootResource`.

- **`ApiVersion`** <span class="type-label">string</span>
- **`Application`** <span class="type-label">string</span>
- **`HasLongTermSupport`** <span class="type-label">boolean</span> — Every release from 2020.1 onwards of Octopus Server comes with long-term support. I wanted to remove this from the API, but that would be a breaking change. @michaelnoonan 2020-04-20.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`InstallationId`** <span class="type-label">string</span> — Format `uuid`.
- **`IsEarlyAccessProgram`** <span class="type-label">boolean</span> — Defaults to `false`.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Version`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "ApiVersion": "string",
  "Application": "string",
  "HasLongTermSupport": true,
  "Id": "string",
  "InstallationId": "00000000-0000-0000-0000-000000000000",
  "IsEarlyAccessProgram": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Version": "string"
}
```
</div>
