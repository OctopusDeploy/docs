---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Machines
---

## Get the status of the network connection between the Octopus server and a machine

:endpoint{method="GET" path="/api/\{spaceId\}/machines/\{id\}/connection"}

Also reachable at `/api/machines/{id}/connection`, `/api/spaces/{spaceIdentifier}/machines/{id}/connection`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the machine whose connection status is being requested.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the space.

**Response**

`200` — The connection status

- **`CurrentTentacleVersion`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastChecked`** :span[string]{.type-label}  
  Format `date-time`.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Logs`** :span[array of object]{.type-label}
  - **`Category`** :span[string]{.type-label}
  - **`Detail`** :span[string]{.type-label}
  - **`GapLastNumber`** :span[integer]{.type-label}
  - **`MessageText`** :span[string]{.type-label}
  - **`Number`** :span[integer]{.type-label}
  - **`OccurredAt`** :span[string]{.type-label}  
    Format `date-time`.
- **`MachineId`** :span[string]{.type-label}
- **`Status`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::
