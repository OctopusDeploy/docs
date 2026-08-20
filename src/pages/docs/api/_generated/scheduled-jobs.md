---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Scheduled Jobs
---

## Get the status of all the scheduled jobs

:endpoint{method="GET" path="/api/scheduler"}

**Response**

`200` — The Status of all the scheduled jobs

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsRunning`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`TaskStatus`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsEnabled`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Id": "string",
  "IsRunning": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "TaskStatus": [
    {
      "Id": "string",
      "IsEnabled": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ]
}
```
:::

## Enable a scheduled job or the job scheduler

:endpoint{method="GET" path="/api/scheduler/start"}

**Query Parameters**

- **`task`** :span[string]{.type-label}  
  The name of the Job to enable. If null the job scheduler itself will be enabled.

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## Disable a scheduled job or the job scheduler

:endpoint{method="GET" path="/api/scheduler/stop"}

**Query Parameters**

- **`task`** :span[string]{.type-label}  
  The name of the Job to disable. If null the job scheduler itself will be disableped.

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## Trigger a scheduled job immediately and waits for it to complete

:endpoint{method="GET" path="/api/scheduler/trigger"}

**Query Parameters**

- **`task`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## Get the structured log for a scheduled job

:endpoint{method="GET" path="/api/scheduler/\{name\}/logs"}

**Path Parameters**

- **`name`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`tail`** :span[integer]{.type-label}
- **`verbose`** :span[boolean]{.type-label}

**Response**

`200` — The structured log for a scheduled job

- **`ActivityLog`** :span[object]{.type-label}
  - **`Children`** :span[array of object]{.type-label}
  - **`Ended`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Id`** :span[string]{.type-label}
  - **`LogElements`** :span[array of object]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`ProgressMessage`** :span[string]{.type-label}
  - **`ProgressPercentage`** :span[integer]{.type-label}
  - **`ShowAtSummaryLevel`** :span[boolean]{.type-label}
  - **`Started`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Status`** :span[enum]{.type-label}  
    Allowed values: `Pending`, `Running`, `Success`, `Failed`, `Skipped`, `SuccessWithWarning`, `Canceled`.
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
  "ActivityLog": {
    "Children": [],
    "Ended": "2020-01-01T00:00:00.000Z",
    "Id": "0c5a872485ac4b10857939a92d082e67",
    "LogElements": [
      {
        "Category": "Trace",
        "Detail": "string",
        "GapLastNumber": 0,
        "MessageText": "string",
        "Number": 0,
        "OccurredAt": "2020-01-01T00:00:00.000Z"
      }
    ],
    "Name": "string",
    "ProgressMessage": "string",
    "ProgressPercentage": 0,
    "ShowAtSummaryLevel": true,
    "Started": "2020-01-01T00:00:00.000Z",
    "Status": "Pending"
  },
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

## Get the raw log for a scheduled job

:endpoint{method="GET" path="/api/scheduler/\{name\}/logs/raw"}

**Path Parameters**

- **`name`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::
