---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Worker Task Leases
---

## Get WorkerTaskLeases

:endpoint{method="GET" path="/api/\{spaceId\}/workertaskleases"}

Also reachable at `/api/spaces/{spaceIdentifier}/workertaskleases`.

Gets a paginated set of WorkerTaskLeases.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space for the WorkerTaskLease.

**Query Parameters**

- **`skip`** :span[integer]{.type-label} *(required)*  
  Number of items to skip. Minimum `0`.
- **`take`** :span[integer]{.type-label} *(required)*  
  Number of items to take. Minimum `0`.

**Response**

`200` — Rseponse to getting set of WorkerTaskLeases

- **`WorkerTaskLeases`** :span[object]{.type-label}
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
  "WorkerTaskLeases": {
    "Id": "string",
    "ItemType": "string",
    "Items": [
      {
        "Exclusive": true,
        "Id": "string",
        "Name": "string",
        "ServerTaskId": "ServerTasks-1",
        "SpaceId": "Spaces-1",
        "TakenAt": "2020-01-01T00:00:00.000Z",
        "WorkerId": "Workers-1",
        "WorkerPoolId": "WorkerPools-1"
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
