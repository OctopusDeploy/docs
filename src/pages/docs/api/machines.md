---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Machines
---

## Get the status of the network connection between the Octopus server and a machine

`GET` `/api/{spaceId}/machines/{id}/connection`

Also reachable at `/api/machines/{id}/connection`, `/api/spaces/{spaceIdentifier}/machines/{id}/connection`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the machine whose connection status is being requested.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the space.

**Response**

`200` — The connection status

`MachineConnectionStatus`.

- **`CurrentTentacleVersion`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastChecked`** <span class="type-label">string</span> — Format `date-time`.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Logs`** <span class="type-label">array of object</span>
  - **`Category`** <span class="type-label">string</span>
  - **`Detail`** <span class="type-label">string</span>
  - **`GapLastNumber`** <span class="type-label">integer</span>
  - **`MessageText`** <span class="type-label">string</span>
  - **`Number`** <span class="type-label">integer</span>
  - **`OccurredAt`** <span class="type-label">string</span> — Format `date-time`.
- **`MachineId`** <span class="type-label">string</span>
- **`Status`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CurrentTentacleVersion": "string",
  "Id": "string",
  "LastChecked": "2020-01-01T00:00:00.000Z",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Logs": [
    {
      "Category": "string",
      "Detail": "string",
      "GapLastNumber": 0,
      "MessageText": "string",
      "Number": 0,
      "OccurredAt": "2020-01-01T00:00:00.000Z"
    }
  ],
  "MachineId": "string",
  "Status": "string"
}
```
</div>
