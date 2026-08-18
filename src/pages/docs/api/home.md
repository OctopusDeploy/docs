---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Home
---

## GET /api/{spaceId}

:span[GET]{.api-get} `/api/{spaceId}`

Returns a document describing the specified Space and links to other parts of the API that apply to the Space.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  Must match `Spaces-\d+`.

**Response**

`200` — Success

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

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
  }
}
```
:::

## GET /api/

:span[GET]{.api-get} `/api/`

Returns a document describing the current Octopus Server and links to other parts of the API.

**Response**

`200` — Success

- **`ApiVersion`** :span[string]{.type-label}
- **`Application`** :span[string]{.type-label}
- **`HasLongTermSupport`** :span[boolean]{.type-label}  
  Every release from 2020.1 onwards of Octopus Server comes with long-term support. I wanted to remove this from the API, but that would be a breaking change. @michaelnoonan 2020-04-20.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`InstallationId`** :span[string]{.type-label}  
  Format `uuid`.
- **`IsEarlyAccessProgram`** :span[boolean]{.type-label}  
  Defaults to `false`.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Version`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::
