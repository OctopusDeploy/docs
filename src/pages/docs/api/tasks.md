---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Tasks
---

## Lists all of the tasks in the supplied Octopus Deploy Space. The results will be sorted from newest to oldest

`GET` `/api/{spaceId}/tasks`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks`, `/api/tasks`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`active`** <span class="type-label">boolean</span>
- **`batch`** <span class="type-label">string</span>
- **`description`** <span class="type-label">string</span>
- **`environment`** <span class="type-label">string</span>
- **`fromCompletedDate`** <span class="type-label">string</span> — Format `date-time`.
- **`fromQueueDate`** <span class="type-label">string</span> — Format `date-time`.
- **`fromStartDate`** <span class="type-label">string</span> — Format `date-time`.
- **`hasPendingInterruptions`** <span class="type-label">boolean</span>
- **`hasPendingPreconditions`** <span class="type-label">boolean</span>
- **`hasWarningsOrErrors`** <span class="type-label">boolean</span>
- **`ids`** <span class="type-label">array of string</span>
- **`name`** <span class="type-label">array of string</span>
- **`node`** <span class="type-label">string</span>
- **`partialName`** <span class="type-label">string</span>
- **`project`** <span class="type-label">string</span>
- **`runbook`** <span class="type-label">string</span>
- **`running`** <span class="type-label">boolean</span>
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`states`** <span class="type-label">array of string</span>
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`tenant`** <span class="type-label">string</span>
- **`tenantTag`** <span class="type-label">string</span>
- **`toCompletedDate`** <span class="type-label">string</span> — Format `date-time`.
- **`toQueueDate`** <span class="type-label">string</span> — Format `date-time`.
- **`toStartDate`** <span class="type-label">string</span> — Format `date-time`.

**Response**

`200` — Holds a TaskResourceCollection generated in response to a ListServerTasksRequest

`TaskResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Arguments`** <span class="type-label">object</span> — Gets or sets any arguments to the task.
  - **`CanRerun`** <span class="type-label">boolean</span> — If true, then the task can be used as the basis for a new task with the same effect.
  - **`Completed`** <span class="type-label">string</span> — Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
  - **`CompletedTime`** <span class="type-label">string</span> — Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
  - **`Description`** <span class="type-label">string</span> — Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
  - **`Duration`** <span class="type-label">string</span> — Gets or sets a string indicating how long the task took to run.
  - **`ErrorMessage`** <span class="type-label">string</span> — Gets or sets a short summary of the errors encountered when the task ran (if any).
  - **`EstimatedRemainingQueueDurationSeconds`** <span class="type-label">integer</span>
  - **`FinishedSuccessfully`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task ran to completion successfully.
  - **`HasBeenPickedUpByProcessor`** <span class="type-label">boolean</span> — Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
  - **`HasPendingInterruptions`** <span class="type-label">boolean</span> — True if the task has any pending interruptions.
  - **`HasPendingPreconditions`** <span class="type-label">boolean</span> — True if the task has any pending preconditions.
  - **`HasWarningsOrErrors`** <span class="type-label">boolean</span> — True if any warnings or non-fatal errors were recorded in the task log during execution.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastUpdatedTime`** <span class="type-label">string</span> — Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
  - **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Contains a list of the types of any pending interruptions. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** <span class="type-label">array of string</span> — Contains a list of the types of any pending preconditions.
  - **`ProjectId`** <span class="type-label">string</span> — If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
  - **`QueueTime`** <span class="type-label">string</span> — Gets or sets the time at which the task was queued. Format `date-time`.
  - **`QueueTimeExpiry`** <span class="type-label">string</span> — Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
  - **`ServerNode`** <span class="type-label">string</span> — Gets the ID of the Octopus server that created and will control this task.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`StartTime`** <span class="type-label">string</span> — Gets or sets the time at which the task started executing. Format `date-time`.
  - **`State`** <span class="type-label">enum</span> — Gets or sets the current state of the task. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
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
      "Arguments": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "CanRerun": true,
      "Completed": "string",
      "CompletedTime": "2020-01-01T00:00:00.000Z",
      "Description": "string",
      "Duration": "string",
      "ErrorMessage": "string",
      "EstimatedRemainingQueueDurationSeconds": 0,
      "FinishedSuccessfully": true,
      "HasBeenPickedUpByProcessor": true,
      "HasPendingInterruptions": true,
      "HasPendingPreconditions": true,
      "HasWarningsOrErrors": true,
      "Id": "string",
      "IsCompleted": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LastUpdatedTime": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "PendingInterruptionTypes": [
        "ManualIntervention"
      ],
      "PendingPreconditionTypes": [
        "string"
      ],
      "ProjectId": "string",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
      "ServerNode": "string",
      "SpaceId": "string",
      "StartTime": "2020-01-01T00:00:00.000Z",
      "State": "Queued"
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

## Creates a new Task

`POST` `/api/{spaceId}/tasks`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks`, `/api/tasks`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateServerTaskCommand`

- **`Arguments`** <span class="type-label">object</span>
- **`Description`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`QueueTime`** <span class="type-label">string</span> — Format `date-time`.
- **`QueueTimeExpiry`** <span class="type-label">string</span> — Format `date-time`.
- **`SpaceId`** <span class="type-label">string</span>
- **`Weight`** <span class="type-label">number</span>

<div data-example="Request">

```json
{
  "Arguments": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Description": "string",
  "Name": "string",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "SpaceId": "string",
  "Weight": 0
}
```
</div>

**Response**

`201` — Created

`TaskResource`.

- **`Arguments`** <span class="type-label">object</span> — Gets or sets any arguments to the task.
- **`CanRerun`** <span class="type-label">boolean</span> — If true, then the task can be used as the basis for a new task with the same effect.
- **`Completed`** <span class="type-label">string</span> — Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
- **`CompletedTime`** <span class="type-label">string</span> — Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
- **`Description`** <span class="type-label">string</span> — Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
- **`Duration`** <span class="type-label">string</span> — Gets or sets a string indicating how long the task took to run.
- **`ErrorMessage`** <span class="type-label">string</span> — Gets or sets a short summary of the errors encountered when the task ran (if any).
- **`EstimatedRemainingQueueDurationSeconds`** <span class="type-label">integer</span>
- **`FinishedSuccessfully`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task ran to completion successfully.
- **`HasBeenPickedUpByProcessor`** <span class="type-label">boolean</span> — Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
- **`HasPendingInterruptions`** <span class="type-label">boolean</span> — True if the task has any pending interruptions.
- **`HasPendingPreconditions`** <span class="type-label">boolean</span> — True if the task has any pending preconditions.
- **`HasWarningsOrErrors`** <span class="type-label">boolean</span> — True if any warnings or non-fatal errors were recorded in the task log during execution.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsCompleted`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUpdatedTime`** <span class="type-label">string</span> — Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
- **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Contains a list of the types of any pending interruptions. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
- **`PendingPreconditionTypes`** <span class="type-label">array of string</span> — Contains a list of the types of any pending preconditions.
- **`ProjectId`** <span class="type-label">string</span> — If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
- **`QueueTime`** <span class="type-label">string</span> — Gets or sets the time at which the task was queued. Format `date-time`.
- **`QueueTimeExpiry`** <span class="type-label">string</span> — Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
- **`ServerNode`** <span class="type-label">string</span> — Gets the ID of the Octopus server that created and will control this task.
- **`SpaceId`** <span class="type-label">string</span>
- **`StartTime`** <span class="type-label">string</span> — Gets or sets the time at which the task started executing. Format `date-time`.
- **`State`** <span class="type-label">enum</span> — Gets or sets the current state of the task. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

<div data-example="Response">

```json
{
  "Arguments": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "CanRerun": true,
  "Completed": "string",
  "CompletedTime": "2020-01-01T00:00:00.000Z",
  "Description": "string",
  "Duration": "string",
  "ErrorMessage": "string",
  "EstimatedRemainingQueueDurationSeconds": 0,
  "FinishedSuccessfully": true,
  "HasBeenPickedUpByProcessor": true,
  "HasPendingInterruptions": true,
  "HasPendingPreconditions": true,
  "HasWarningsOrErrors": true,
  "Id": "string",
  "IsCompleted": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastUpdatedTime": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "PendingInterruptionTypes": [
    "ManualIntervention"
  ],
  "PendingPreconditionTypes": [
    "string"
  ],
  "ProjectId": "string",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "ServerNode": "string",
  "SpaceId": "string",
  "StartTime": "2020-01-01T00:00:00.000Z",
  "State": "Queued"
}
```
</div>

## Creates a new task and executes it, using a given task as the input. Note that deployment tasks cannot be re-run

`POST` `/api/{spaceId}/tasks/rerun/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/rerun/{id}`, `/api/tasks/rerun/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Task to re-run.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resources.

**Response**

`200` — Carries the new task created in response to re-running an existing task via RerunServerTaskCommand.

`TaskResource`.

- **`Arguments`** <span class="type-label">object</span> — Gets or sets any arguments to the task.
- **`CanRerun`** <span class="type-label">boolean</span> — If true, then the task can be used as the basis for a new task with the same effect.
- **`Completed`** <span class="type-label">string</span> — Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
- **`CompletedTime`** <span class="type-label">string</span> — Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
- **`Description`** <span class="type-label">string</span> — Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
- **`Duration`** <span class="type-label">string</span> — Gets or sets a string indicating how long the task took to run.
- **`ErrorMessage`** <span class="type-label">string</span> — Gets or sets a short summary of the errors encountered when the task ran (if any).
- **`EstimatedRemainingQueueDurationSeconds`** <span class="type-label">integer</span>
- **`FinishedSuccessfully`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task ran to completion successfully.
- **`HasBeenPickedUpByProcessor`** <span class="type-label">boolean</span> — Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
- **`HasPendingInterruptions`** <span class="type-label">boolean</span> — True if the task has any pending interruptions.
- **`HasPendingPreconditions`** <span class="type-label">boolean</span> — True if the task has any pending preconditions.
- **`HasWarningsOrErrors`** <span class="type-label">boolean</span> — True if any warnings or non-fatal errors were recorded in the task log during execution.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsCompleted`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUpdatedTime`** <span class="type-label">string</span> — Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
- **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Contains a list of the types of any pending interruptions. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
- **`PendingPreconditionTypes`** <span class="type-label">array of string</span> — Contains a list of the types of any pending preconditions.
- **`ProjectId`** <span class="type-label">string</span> — If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
- **`QueueTime`** <span class="type-label">string</span> — Gets or sets the time at which the task was queued. Format `date-time`.
- **`QueueTimeExpiry`** <span class="type-label">string</span> — Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
- **`ServerNode`** <span class="type-label">string</span> — Gets the ID of the Octopus server that created and will control this task.
- **`SpaceId`** <span class="type-label">string</span>
- **`StartTime`** <span class="type-label">string</span> — Gets or sets the time at which the task started executing. Format `date-time`.
- **`State`** <span class="type-label">enum</span> — Gets or sets the current state of the task. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

<div data-example="Response">

```json
{
  "Arguments": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "CanRerun": true,
  "Completed": "string",
  "CompletedTime": "2020-01-01T00:00:00.000Z",
  "Description": "string",
  "Duration": "string",
  "ErrorMessage": "string",
  "EstimatedRemainingQueueDurationSeconds": 0,
  "FinishedSuccessfully": true,
  "HasBeenPickedUpByProcessor": true,
  "HasPendingInterruptions": true,
  "HasPendingPreconditions": true,
  "HasWarningsOrErrors": true,
  "Id": "string",
  "IsCompleted": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastUpdatedTime": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "PendingInterruptionTypes": [
    "ManualIntervention"
  ],
  "PendingPreconditionTypes": [
    "string"
  ],
  "ProjectId": "string",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "ServerNode": "string",
  "SpaceId": "string",
  "StartTime": "2020-01-01T00:00:00.000Z",
  "State": "Queued"
}
```
</div>

## Lists supported task types

`GET` `/api/{spaceId}/tasks/tasktypes`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/tasktypes`, `/api/tasks/tasktypes`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Holds a list of supported task types, generated in response to a ListServerTaskTypesRequest

an array of `TaskTypeResource`.

- **`Id`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span>
- **`Name`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "Id": "string",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string"
  }
]
```
</div>

## Get a single Task by ID

`GET` `/api/{spaceId}/tasks/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}`, `/api/tasks/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Task to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resources.

**Response**

`200` — Holds a task, returned in response to GetServerTaskByIdRequest

`TaskResource`.

- **`Arguments`** <span class="type-label">object</span> — Gets or sets any arguments to the task.
- **`CanRerun`** <span class="type-label">boolean</span> — If true, then the task can be used as the basis for a new task with the same effect.
- **`Completed`** <span class="type-label">string</span> — Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
- **`CompletedTime`** <span class="type-label">string</span> — Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
- **`Description`** <span class="type-label">string</span> — Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
- **`Duration`** <span class="type-label">string</span> — Gets or sets a string indicating how long the task took to run.
- **`ErrorMessage`** <span class="type-label">string</span> — Gets or sets a short summary of the errors encountered when the task ran (if any).
- **`EstimatedRemainingQueueDurationSeconds`** <span class="type-label">integer</span>
- **`FinishedSuccessfully`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task ran to completion successfully.
- **`HasBeenPickedUpByProcessor`** <span class="type-label">boolean</span> — Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
- **`HasPendingInterruptions`** <span class="type-label">boolean</span> — True if the task has any pending interruptions.
- **`HasPendingPreconditions`** <span class="type-label">boolean</span> — True if the task has any pending preconditions.
- **`HasWarningsOrErrors`** <span class="type-label">boolean</span> — True if any warnings or non-fatal errors were recorded in the task log during execution.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsCompleted`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUpdatedTime`** <span class="type-label">string</span> — Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
- **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Contains a list of the types of any pending interruptions. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
- **`PendingPreconditionTypes`** <span class="type-label">array of string</span> — Contains a list of the types of any pending preconditions.
- **`ProjectId`** <span class="type-label">string</span> — If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
- **`QueueTime`** <span class="type-label">string</span> — Gets or sets the time at which the task was queued. Format `date-time`.
- **`QueueTimeExpiry`** <span class="type-label">string</span> — Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
- **`ServerNode`** <span class="type-label">string</span> — Gets the ID of the Octopus server that created and will control this task.
- **`SpaceId`** <span class="type-label">string</span>
- **`StartTime`** <span class="type-label">string</span> — Gets or sets the time at which the task started executing. Format `date-time`.
- **`State`** <span class="type-label">enum</span> — Gets or sets the current state of the task. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

<div data-example="Response">

```json
{
  "Arguments": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "CanRerun": true,
  "Completed": "string",
  "CompletedTime": "2020-01-01T00:00:00.000Z",
  "Description": "string",
  "Duration": "string",
  "ErrorMessage": "string",
  "EstimatedRemainingQueueDurationSeconds": 0,
  "FinishedSuccessfully": true,
  "HasBeenPickedUpByProcessor": true,
  "HasPendingInterruptions": true,
  "HasPendingPreconditions": true,
  "HasWarningsOrErrors": true,
  "Id": "string",
  "IsCompleted": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastUpdatedTime": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "PendingInterruptionTypes": [
    "ManualIntervention"
  ],
  "PendingPreconditionTypes": [
    "string"
  ],
  "ProjectId": "string",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "ServerNode": "string",
  "SpaceId": "string",
  "StartTime": "2020-01-01T00:00:00.000Z",
  "State": "Queued"
}
```
</div>

## Marks the given task as canceled

`POST` `/api/{spaceId}/tasks/{id}/cancel`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/cancel`, `/api/tasks/{id}/cancel`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Task to cancel.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resources.

**Response**

`200` — Returned in response to CancelServerTaskRequest. If the ServerTask cancellation failed, clients should receive an error instead.

`TaskResource`.

- **`Arguments`** <span class="type-label">object</span> — Gets or sets any arguments to the task.
- **`CanRerun`** <span class="type-label">boolean</span> — If true, then the task can be used as the basis for a new task with the same effect.
- **`Completed`** <span class="type-label">string</span> — Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
- **`CompletedTime`** <span class="type-label">string</span> — Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
- **`Description`** <span class="type-label">string</span> — Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
- **`Duration`** <span class="type-label">string</span> — Gets or sets a string indicating how long the task took to run.
- **`ErrorMessage`** <span class="type-label">string</span> — Gets or sets a short summary of the errors encountered when the task ran (if any).
- **`EstimatedRemainingQueueDurationSeconds`** <span class="type-label">integer</span>
- **`FinishedSuccessfully`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task ran to completion successfully.
- **`HasBeenPickedUpByProcessor`** <span class="type-label">boolean</span> — Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
- **`HasPendingInterruptions`** <span class="type-label">boolean</span> — True if the task has any pending interruptions.
- **`HasPendingPreconditions`** <span class="type-label">boolean</span> — True if the task has any pending preconditions.
- **`HasWarningsOrErrors`** <span class="type-label">boolean</span> — True if any warnings or non-fatal errors were recorded in the task log during execution.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsCompleted`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUpdatedTime`** <span class="type-label">string</span> — Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
- **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Contains a list of the types of any pending interruptions. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
- **`PendingPreconditionTypes`** <span class="type-label">array of string</span> — Contains a list of the types of any pending preconditions.
- **`ProjectId`** <span class="type-label">string</span> — If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
- **`QueueTime`** <span class="type-label">string</span> — Gets or sets the time at which the task was queued. Format `date-time`.
- **`QueueTimeExpiry`** <span class="type-label">string</span> — Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
- **`ServerNode`** <span class="type-label">string</span> — Gets the ID of the Octopus server that created and will control this task.
- **`SpaceId`** <span class="type-label">string</span>
- **`StartTime`** <span class="type-label">string</span> — Gets or sets the time at which the task started executing. Format `date-time`.
- **`State`** <span class="type-label">enum</span> — Gets or sets the current state of the task. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

<div data-example="Response">

```json
{
  "Arguments": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "CanRerun": true,
  "Completed": "string",
  "CompletedTime": "2020-01-01T00:00:00.000Z",
  "Description": "string",
  "Duration": "string",
  "ErrorMessage": "string",
  "EstimatedRemainingQueueDurationSeconds": 0,
  "FinishedSuccessfully": true,
  "HasBeenPickedUpByProcessor": true,
  "HasPendingInterruptions": true,
  "HasPendingPreconditions": true,
  "HasWarningsOrErrors": true,
  "Id": "string",
  "IsCompleted": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastUpdatedTime": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "PendingInterruptionTypes": [
    "ManualIntervention"
  ],
  "PendingPreconditionTypes": [
    "string"
  ],
  "ProjectId": "string",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "ServerNode": "string",
  "SpaceId": "string",
  "StartTime": "2020-01-01T00:00:00.000Z",
  "State": "Queued"
}
```
</div>

## Gets a single task by ID, including the full task log as a tree of activity elements

`GET` `/api/{spaceId}/tasks/{id}/details`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/details`, `/api/tasks/{id}/details`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the task to load details for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ranges`** <span class="type-label">string</span>
- **`tail`** <span class="type-label">integer</span> — If set, determines how many log entries will be returned.
- **`verbose`** <span class="type-label">boolean</span> — If true, includes verbose output.

**Response**

`200` — Returns details about a specific server task

`TaskDetailsResource`.

- **`ActivityLogs`** <span class="type-label">array of object</span>
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
- **`PhysicalLogSize`** <span class="type-label">integer</span>
- **`Progress`** <span class="type-label">object</span>
  - **`EstimatedTimeRemaining`** <span class="type-label">string</span>
  - **`ProgressPercentage`** <span class="type-label">integer</span>
- **`Task`** <span class="type-label">object</span>
  - **`Arguments`** <span class="type-label">object</span> — Gets or sets any arguments to the task.
  - **`CanRerun`** <span class="type-label">boolean</span> — If true, then the task can be used as the basis for a new task with the same effect.
  - **`Completed`** <span class="type-label">string</span> — Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
  - **`CompletedTime`** <span class="type-label">string</span> — Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
  - **`Description`** <span class="type-label">string</span> — Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
  - **`Duration`** <span class="type-label">string</span> — Gets or sets a string indicating how long the task took to run.
  - **`ErrorMessage`** <span class="type-label">string</span> — Gets or sets a short summary of the errors encountered when the task ran (if any).
  - **`EstimatedRemainingQueueDurationSeconds`** <span class="type-label">integer</span>
  - **`FinishedSuccessfully`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task ran to completion successfully.
  - **`HasBeenPickedUpByProcessor`** <span class="type-label">boolean</span> — Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
  - **`HasPendingInterruptions`** <span class="type-label">boolean</span> — True if the task has any pending interruptions.
  - **`HasPendingPreconditions`** <span class="type-label">boolean</span> — True if the task has any pending preconditions.
  - **`HasWarningsOrErrors`** <span class="type-label">boolean</span> — True if any warnings or non-fatal errors were recorded in the task log during execution.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastUpdatedTime`** <span class="type-label">string</span> — Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
  - **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Contains a list of the types of any pending interruptions. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** <span class="type-label">array of string</span> — Contains a list of the types of any pending preconditions.
  - **`ProjectId`** <span class="type-label">string</span> — If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
  - **`QueueTime`** <span class="type-label">string</span> — Gets or sets the time at which the task was queued. Format `date-time`.
  - **`QueueTimeExpiry`** <span class="type-label">string</span> — Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
  - **`ServerNode`** <span class="type-label">string</span> — Gets the ID of the Octopus server that created and will control this task.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`StartTime`** <span class="type-label">string</span> — Gets or sets the time at which the task started executing. Format `date-time`.
  - **`State`** <span class="type-label">enum</span> — Gets or sets the current state of the task. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

<div data-example="Response">

```json
{
  "ActivityLogs": [
    {
      "Children": [],
      "Ended": "2020-01-01T00:00:00.000Z",
      "Id": "string",
      "LogElements": [
        {}
      ],
      "Name": "string",
      "ProgressMessage": "string",
      "ProgressPercentage": 0,
      "ShowAtSummaryLevel": true,
      "Started": "2020-01-01T00:00:00.000Z",
      "Status": "Pending"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PhysicalLogSize": 0,
  "Progress": {
    "EstimatedTimeRemaining": "string",
    "ProgressPercentage": 0
  },
  "Task": {
    "Arguments": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "CanRerun": true,
    "Completed": "string",
    "CompletedTime": "2020-01-01T00:00:00.000Z",
    "Description": "string",
    "Duration": "string",
    "ErrorMessage": "string",
    "EstimatedRemainingQueueDurationSeconds": 0,
    "FinishedSuccessfully": true,
    "HasBeenPickedUpByProcessor": true,
    "HasPendingInterruptions": true,
    "HasPendingPreconditions": true,
    "HasWarningsOrErrors": true,
    "Id": "string",
    "IsCompleted": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "LastUpdatedTime": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "PendingInterruptionTypes": [
      "ManualIntervention"
    ],
    "PendingPreconditionTypes": [
      "string"
    ],
    "ProjectId": "string",
    "QueueTime": "2020-01-01T00:00:00.000Z",
    "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
    "ServerNode": "string",
    "SpaceId": "string",
    "StartTime": "2020-01-01T00:00:00.000Z",
    "State": "Queued"
  }
}
```
</div>

## Prioritize given task to the top of the Task Queue

`POST` `/api/{spaceId}/tasks/{id}/prioritize`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/prioritize`, `/api/tasks/{id}/prioritize`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Gets a list of tasks that this task is currently queued behind

`GET` `/api/{spaceId}/tasks/{id}/queued-behind`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/queued-behind`, `/api/tasks/{id}/queued-behind`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Task.
- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Holds the list of tasks that a task is currently queued behind. Response to GetServerTaskQueuedBehindRequest.

`TaskResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Arguments`** <span class="type-label">object</span> — Gets or sets any arguments to the task.
  - **`CanRerun`** <span class="type-label">boolean</span> — If true, then the task can be used as the basis for a new task with the same effect.
  - **`Completed`** <span class="type-label">string</span> — Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
  - **`CompletedTime`** <span class="type-label">string</span> — Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
  - **`Description`** <span class="type-label">string</span> — Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
  - **`Duration`** <span class="type-label">string</span> — Gets or sets a string indicating how long the task took to run.
  - **`ErrorMessage`** <span class="type-label">string</span> — Gets or sets a short summary of the errors encountered when the task ran (if any).
  - **`EstimatedRemainingQueueDurationSeconds`** <span class="type-label">integer</span>
  - **`FinishedSuccessfully`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task ran to completion successfully.
  - **`HasBeenPickedUpByProcessor`** <span class="type-label">boolean</span> — Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
  - **`HasPendingInterruptions`** <span class="type-label">boolean</span> — True if the task has any pending interruptions.
  - **`HasPendingPreconditions`** <span class="type-label">boolean</span> — True if the task has any pending preconditions.
  - **`HasWarningsOrErrors`** <span class="type-label">boolean</span> — True if any warnings or non-fatal errors were recorded in the task log during execution.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastUpdatedTime`** <span class="type-label">string</span> — Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
  - **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Contains a list of the types of any pending interruptions. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** <span class="type-label">array of string</span> — Contains a list of the types of any pending preconditions.
  - **`ProjectId`** <span class="type-label">string</span> — If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
  - **`QueueTime`** <span class="type-label">string</span> — Gets or sets the time at which the task was queued. Format `date-time`.
  - **`QueueTimeExpiry`** <span class="type-label">string</span> — Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
  - **`ServerNode`** <span class="type-label">string</span> — Gets the ID of the Octopus server that created and will control this task.
  - **`SpaceId`** <span class="type-label">string</span>
  - **`StartTime`** <span class="type-label">string</span> — Gets or sets the time at which the task started executing. Format `date-time`.
  - **`State`** <span class="type-label">enum</span> — Gets or sets the current state of the task. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
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
      "Arguments": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "CanRerun": true,
      "Completed": "string",
      "CompletedTime": "2020-01-01T00:00:00.000Z",
      "Description": "string",
      "Duration": "string",
      "ErrorMessage": "string",
      "EstimatedRemainingQueueDurationSeconds": 0,
      "FinishedSuccessfully": true,
      "HasBeenPickedUpByProcessor": true,
      "HasPendingInterruptions": true,
      "HasPendingPreconditions": true,
      "HasWarningsOrErrors": true,
      "Id": "string",
      "IsCompleted": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LastUpdatedTime": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "PendingInterruptionTypes": [
        "ManualIntervention"
      ],
      "PendingPreconditionTypes": [
        "string"
      ],
      "ProjectId": "string",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
      "ServerNode": "string",
      "SpaceId": "string",
      "StartTime": "2020-01-01T00:00:00.000Z",
      "State": "Queued"
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

## Gets the full task log of a given resource as plain text. Useful when the log needs to be rendered to a console or sent as an email attachment

`GET` `/api/{spaceId}/tasks/{id}/raw`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/raw`, `/api/tasks/{id}/raw`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the task.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Change the state of a task

`POST` `/api/{spaceId}/tasks/{id}/state`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/state`, `/api/tasks/{id}/state`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the task.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyServerTaskStateCommand`

- **`Id`** <span class="type-label">string</span> *(required)* — The ID of the task.
- **`Reason`** <span class="type-label">string</span> *(required)* — The reason for the state change. Minimum length 1.
- **`SpaceId`** <span class="type-label">string</span> — The ID of the space containing the resource(s).
- **`State`** <span class="type-label">enum</span> *(required)* — The state to set the task to. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

<div data-example="Request">

```json
{
  "Id": "string",
  "Reason": "string",
  "SpaceId": "string",
  "State": "Queued"
}
```
</div>

**Response**

`200` — Returns the Task resource after the state has been changed in response to a ModifyServerTaskStateCommand

`TaskResource`.

- **`Arguments`** <span class="type-label">object</span> — Gets or sets any arguments to the task.
- **`CanRerun`** <span class="type-label">boolean</span> — If true, then the task can be used as the basis for a new task with the same effect.
- **`Completed`** <span class="type-label">string</span> — Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
- **`CompletedTime`** <span class="type-label">string</span> — Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
- **`Description`** <span class="type-label">string</span> — Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
- **`Duration`** <span class="type-label">string</span> — Gets or sets a string indicating how long the task took to run.
- **`ErrorMessage`** <span class="type-label">string</span> — Gets or sets a short summary of the errors encountered when the task ran (if any).
- **`EstimatedRemainingQueueDurationSeconds`** <span class="type-label">integer</span>
- **`FinishedSuccessfully`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task ran to completion successfully.
- **`HasBeenPickedUpByProcessor`** <span class="type-label">boolean</span> — Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
- **`HasPendingInterruptions`** <span class="type-label">boolean</span> — True if the task has any pending interruptions.
- **`HasPendingPreconditions`** <span class="type-label">boolean</span> — True if the task has any pending preconditions.
- **`HasWarningsOrErrors`** <span class="type-label">boolean</span> — True if any warnings or non-fatal errors were recorded in the task log during execution.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsCompleted`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUpdatedTime`** <span class="type-label">string</span> — Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
- **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Contains a list of the types of any pending interruptions. Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
- **`PendingPreconditionTypes`** <span class="type-label">array of string</span> — Contains a list of the types of any pending preconditions.
- **`ProjectId`** <span class="type-label">string</span> — If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
- **`QueueTime`** <span class="type-label">string</span> — Gets or sets the time at which the task was queued. Format `date-time`.
- **`QueueTimeExpiry`** <span class="type-label">string</span> — Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
- **`ServerNode`** <span class="type-label">string</span> — Gets the ID of the Octopus server that created and will control this task.
- **`SpaceId`** <span class="type-label">string</span>
- **`StartTime`** <span class="type-label">string</span> — Gets or sets the time at which the task started executing. Format `date-time`.
- **`State`** <span class="type-label">enum</span> — Gets or sets the current state of the task. Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

<div data-example="Response">

```json
{
  "Arguments": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "CanRerun": true,
  "Completed": "string",
  "CompletedTime": "2020-01-01T00:00:00.000Z",
  "Description": "string",
  "Duration": "string",
  "ErrorMessage": "string",
  "EstimatedRemainingQueueDurationSeconds": 0,
  "FinishedSuccessfully": true,
  "HasBeenPickedUpByProcessor": true,
  "HasPendingInterruptions": true,
  "HasPendingPreconditions": true,
  "HasWarningsOrErrors": true,
  "Id": "string",
  "IsCompleted": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LastUpdatedTime": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "PendingInterruptionTypes": [
    "ManualIntervention"
  ],
  "PendingPreconditionTypes": [
    "string"
  ],
  "ProjectId": "string",
  "QueueTime": "2020-01-01T00:00:00.000Z",
  "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
  "ServerNode": "string",
  "SpaceId": "string",
  "StartTime": "2020-01-01T00:00:00.000Z",
  "State": "Queued"
}
```
</div>

## Get messages for a single Task by Id

`GET` `/api/{spaceId}/tasks/{id}/status/messages`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/status/messages`, `/api/tasks/{id}/status/messages`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Task to load status messages for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resources.

**Response**

`200` — The requested Task Status Messages

`GetServerTaskStatusMessagesResponse`.

- **`Messages`** <span class="type-label">array of object</span>
  - **`Category`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Message`** <span class="type-label">string</span>
  - **`Title`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Messages": [
    {
      "Category": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Message": "string",
      "Title": "string"
    }
  ]
}
```
</div>
