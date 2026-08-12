---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Event Retention
---

## Get the list of archived event files

`GET` `/api/events/archives`

**Parameters**

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Archived Event files

`ArchivedEventFileResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CreatedDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`FileBytes`** <span class="type-label">number</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ModifiedDate`** <span class="type-label">string</span> — Format `date-time`.
  - **`Name`** <span class="type-label">string</span>
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
      "CreatedDate": "2020-01-01T00:00:00.000Z",
      "FileBytes": 0,
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ModifiedDate": "2020-01-01T00:00:00.000Z",
      "Name": "string"
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

## Get the list of archived event files

`GET` `/api/events/archives/v1`

**Parameters**

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested Archived Event files

`GetArchivedEventFilesResponse`.

- **`ArchivedFiles`** <span class="type-label">object</span>
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
  "ArchivedFiles": {
    "Id": "string",
    "ItemType": "string",
    "Items": [
      {
        "CreatedDate": "2020-01-01T00:00:00.000Z",
        "FileBytes": 0,
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "ModifiedDate": "2020-01-01T00:00:00.000Z",
        "Name": "string"
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

## Download an archived event file

`GET` `/api/events/archives/{fileName}`

**Parameters**

- **`fileName`** <span class="type-label">string</span> *(required)* — The file name of archived events file to download.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Delete an archived event file

`DELETE` `/api/events/archives/{fileName}`

**Parameters**

- **`fileName`** <span class="type-label">string</span> *(required)* — The file name of archived events file to delete.

**Response**

`200` — Success

## Delete an archived event file

`DELETE` `/api/events/archives/{fileName}/v1`

**Parameters**

- **`fileName`** <span class="type-label">string</span> *(required)* — The file name of archived events file to delete.

**Response**

`200` — Confirmation that the Archived Event File has been deleted, containing the filename

`DeleteArchivedEventFileResponse`.

- **`FileName`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "FileName": "string"
}
```
</div>
