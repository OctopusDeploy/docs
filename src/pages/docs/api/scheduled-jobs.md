---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Scheduled Jobs
---

## Get the status of all the scheduled jobs

`GET` `/api/scheduler`

**Response**

`200` — The Status of all the scheduled jobs

`SchedulerStatusResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsRunning`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`TaskStatus`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsEnabled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Enables a scheduled job or the job scheduler

`GET` `/api/scheduler/start`

**Parameters**

- **`task`** <span class="type-label">string</span> — The name of the Job to enable. If null the job scheduler itself will be enabled.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Disables a scheduled job or the job scheduler

`GET` `/api/scheduler/stop`

**Parameters**

- **`task`** <span class="type-label">string</span> — The name of the Job to disable. If null the job scheduler itself will be disableped.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Triggers a scheduled job immediately and waits for it to complete

`GET` `/api/scheduler/trigger`

**Parameters**

- **`task`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Gets the structured log for a scheduled job

`GET` `/api/scheduler/{name}/logs`

**Parameters**

- **`name`** <span class="type-label">string</span> *(required)*

- **`tail`** <span class="type-label">integer</span>
- **`verbose`** <span class="type-label">boolean</span>

**Response**

`200` — The structured log for a scheduled job

`ScheduledTaskDetailsResource`.

- **`ActivityLog`** <span class="type-label">object</span>
  - **`Children`** <span class="type-label">array of object</span>
  - **`Ended`** <span class="type-label">string</span> — Format `date-time`.
  - **`Id`** <span class="type-label">string</span>
  - **`LogElements`** <span class="type-label">array of object</span>
  - **`Name`** <span class="type-label">string</span>
  - **`ProgressMessage`** <span class="type-label">string</span>
  - **`ProgressPercentage`** <span class="type-label">integer</span>
  - **`ShowAtSummaryLevel`** <span class="type-label">boolean</span>
  - **`Started`** <span class="type-label">string</span> — Format `date-time`.
  - **`Status`** <span class="type-label">enum</span> — Allowed values: `Pending`, `Running`, `Success`, `Failed`, `Skipped`, `SuccessWithWarning`, `Canceled`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "ActivityLog": {
    "Children": [],
    "Ended": "2020-01-01T00:00:00.000Z",
    "Id": "string",
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
</div>

## Gets the raw log for a scheduled job

`GET` `/api/scheduler/{name}/logs/raw`

**Parameters**

- **`name`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>
