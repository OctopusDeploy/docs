---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Worker Task Leases
---

## Get WorkerTaskLeases

`GET` `/api/{spaceId}/workertaskleases`

Also reachable at `/api/spaces/{spaceIdentifier}/workertaskleases`.

Gets a paginated set of WorkerTaskLeases.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space for the WorkerTaskLease.

- **`skip`** <span class="type-label">integer</span> *(required)* — Number of items to skip. Minimum `0`.
- **`take`** <span class="type-label">integer</span> *(required)* — Number of items to take. Minimum `0`.

**Response**

`200` — Rseponse to getting set of WorkerTaskLeases

`GetWorkerTaskLeasesResponse`.

- **`WorkerTaskLeases`** <span class="type-label">object</span>
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
  "WorkerTaskLeases": {
    "Id": "string",
    "ItemType": "string",
    "Items": [
      {
        "Exclusive": true,
        "Id": "string",
        "Name": "string",
        "ServerTaskId": "string",
        "SpaceId": "string",
        "TakenAt": "2020-01-01T00:00:00.000Z",
        "WorkerId": "string",
        "WorkerPoolId": "string"
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
