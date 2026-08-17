---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Tasks
---

## List all of the tasks in the supplied Octopus Deploy Space. The results will be sorted from newest to oldest

:span[GET]{.api-get} `/api/{spaceId}/tasks`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks`, `/api/tasks`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`active`** :span[boolean]{.type-label}  
  Set to true for tasks that have not finished (New, Queued, Executing or Cancelling), or false for tasks that have.
- **`batch`** :span[string]{.type-label}
- **`description`** :span[string]{.type-label}  
  Text to match within a task's description, such as a project or release name. This is a partial match, not an exact one.
- **`environment`** :span[string]{.type-label}  
  The ID of an environment, to return only tasks against that environment. This is an ID such as 'Environments-1', not an environment name.
- **`fromCompletedDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`fromQueueDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`fromStartDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`hasPendingInterruptions`** :span[boolean]{.type-label}
- **`hasPendingPreconditions`** :span[boolean]{.type-label}
- **`hasWarningsOrErrors`** :span[boolean]{.type-label}
- **`ids`** :span[array of string]{.type-label}  
  Task IDs to return, such as 'ServerTasks-1'.
- **`name`** :span[array of string]{.type-label}  
  Task type names to match exactly, such as 'Deploy' or 'RunbookRun'. Use ListServerTaskTypes to get the supported values.
- **`node`** :span[string]{.type-label}  
  The ID of the Octopus Server node a task ran on, to return only tasks from that node.
- **`partialName`** :span[string]{.type-label}  
  A partial task type name, to match tasks whose type name includes it.
- **`project`** :span[string]{.type-label}  
  The ID of a project, to return only tasks against that project. This is an ID such as 'Projects-1', not a project name.
- **`runbook`** :span[string]{.type-label}  
  The ID of a runbook, to return only runs of that runbook.
- **`running`** :span[boolean]{.type-label}  
  Set to true for tasks currently in progress (Executing or Cancelling), or false for tasks that are not.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`states`** :span[array of string]{.type-label}  
  Task states to match. One or more of New, Queued, Executing, Cancelling, Success, Failed, Canceled, TimedOut.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`tenant`** :span[string]{.type-label}  
  The ID of a tenant, to return only tasks against that tenant. This is an ID such as 'Tenants-1', not a tenant name.
- **`tenantTag`** :span[string]{.type-label}  
  A tenant tag in canonical form, such as 'Regions/EMEA', to return only tasks against tenants carrying it.
- **`toCompletedDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`toQueueDate`** :span[string]{.type-label}  
  Format `date-time`.
- **`toStartDate`** :span[string]{.type-label}  
  Format `date-time`.

**Response**

`200` — Holds a TaskResourceCollection generated in response to a ListServerTasksRequest

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Arguments`** :span[object]{.type-label}  
    Gets or sets any arguments to the task.
  - **`CanRerun`** :span[boolean]{.type-label}  
    If true, then the task can be used as the basis for a new task with the same effect.
  - **`Completed`** :span[string]{.type-label}  
    Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
  - **`CompletedTime`** :span[string]{.type-label}  
    Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
  - **`Duration`** :span[string]{.type-label}  
    Gets or sets a string indicating how long the task took to run.
  - **`ErrorMessage`** :span[string]{.type-label}  
    Gets or sets a short summary of the errors encountered when the task ran (if any).
  - **`EstimatedRemainingQueueDurationSeconds`** :span[integer]{.type-label}
  - **`FinishedSuccessfully`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the task ran to completion successfully.
  - **`HasBeenPickedUpByProcessor`** :span[boolean]{.type-label}  
    Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
  - **`HasPendingInterruptions`** :span[boolean]{.type-label}  
    True if the task has any pending interruptions.
  - **`HasPendingPreconditions`** :span[boolean]{.type-label}  
    True if the task has any pending preconditions.
  - **`HasWarningsOrErrors`** :span[boolean]{.type-label}  
    True if any warnings or non-fatal errors were recorded in the task log during execution.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastUpdatedTime`** :span[string]{.type-label}  
    Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
  - **`PendingInterruptionTypes`** :span[array of enum]{.type-label}  
    Contains a list of the types of any pending interruptions.  
    Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** :span[array of string]{.type-label}  
    Contains a list of the types of any pending preconditions.
  - **`ProjectId`** :span[string]{.type-label}  
    If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
  - **`QueueTime`** :span[string]{.type-label}  
    Gets or sets the time at which the task was queued. Format `date-time`.
  - **`QueueTimeExpiry`** :span[string]{.type-label}  
    Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
  - **`ServerNode`** :span[string]{.type-label}  
    Gets the ID of the Octopus server that created and will control this task.
  - **`SpaceId`** :span[string]{.type-label}
  - **`StartTime`** :span[string]{.type-label}  
    Gets or sets the time at which the task started executing. Format `date-time`.
  - **`State`** :span[enum]{.type-label}  
    Gets or sets the current state of the task.  
    Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
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

## Create a new Task

:span[POST]{.api-post} `/api/{spaceId}/tasks`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks`, `/api/tasks`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Arguments`** :span[object]{.type-label}
- **`Description`** :span[string]{.type-label} *(required)*
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`QueueTime`** :span[string]{.type-label}  
  Format `date-time`.
- **`QueueTimeExpiry`** :span[string]{.type-label}  
  Format `date-time`.
- **`SpaceId`** :span[string]{.type-label}
- **`Weight`** :span[number]{.type-label}

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

- **`Arguments`** :span[object]{.type-label}  
  Gets or sets any arguments to the task.
- **`CanRerun`** :span[boolean]{.type-label}  
  If true, then the task can be used as the basis for a new task with the same effect.
- **`Completed`** :span[string]{.type-label}  
  Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
- **`CompletedTime`** :span[string]{.type-label}  
  Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
- **`Duration`** :span[string]{.type-label}  
  Gets or sets a string indicating how long the task took to run.
- **`ErrorMessage`** :span[string]{.type-label}  
  Gets or sets a short summary of the errors encountered when the task ran (if any).
- **`EstimatedRemainingQueueDurationSeconds`** :span[integer]{.type-label}
- **`FinishedSuccessfully`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the task ran to completion successfully.
- **`HasBeenPickedUpByProcessor`** :span[boolean]{.type-label}  
  Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
- **`HasPendingInterruptions`** :span[boolean]{.type-label}  
  True if the task has any pending interruptions.
- **`HasPendingPreconditions`** :span[boolean]{.type-label}  
  True if the task has any pending preconditions.
- **`HasWarningsOrErrors`** :span[boolean]{.type-label}  
  True if any warnings or non-fatal errors were recorded in the task log during execution.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsCompleted`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUpdatedTime`** :span[string]{.type-label}  
  Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
- **`PendingInterruptionTypes`** :span[array of enum]{.type-label}  
  Contains a list of the types of any pending interruptions.  
  Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
- **`PendingPreconditionTypes`** :span[array of string]{.type-label}  
  Contains a list of the types of any pending preconditions.
- **`ProjectId`** :span[string]{.type-label}  
  If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
- **`QueueTime`** :span[string]{.type-label}  
  Gets or sets the time at which the task was queued. Format `date-time`.
- **`QueueTimeExpiry`** :span[string]{.type-label}  
  Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
- **`ServerNode`** :span[string]{.type-label}  
  Gets the ID of the Octopus server that created and will control this task.
- **`SpaceId`** :span[string]{.type-label}
- **`StartTime`** :span[string]{.type-label}  
  Gets or sets the time at which the task started executing. Format `date-time`.
- **`State`** :span[enum]{.type-label}  
  Gets or sets the current state of the task.  
  Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

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

## Create a new task and execute it, using a given task as the input. Note that deployment tasks cannot be re-run

:span[POST]{.api-post} `/api/{spaceId}/tasks/rerun/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/rerun/{id}`, `/api/tasks/rerun/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Task to re-run.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resources.

**Response**

`200` — Carries the new task created in response to re-running an existing task via RerunServerTaskCommand.

- **`Arguments`** :span[object]{.type-label}  
  Gets or sets any arguments to the task.
- **`CanRerun`** :span[boolean]{.type-label}  
  If true, then the task can be used as the basis for a new task with the same effect.
- **`Completed`** :span[string]{.type-label}  
  Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
- **`CompletedTime`** :span[string]{.type-label}  
  Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
- **`Duration`** :span[string]{.type-label}  
  Gets or sets a string indicating how long the task took to run.
- **`ErrorMessage`** :span[string]{.type-label}  
  Gets or sets a short summary of the errors encountered when the task ran (if any).
- **`EstimatedRemainingQueueDurationSeconds`** :span[integer]{.type-label}
- **`FinishedSuccessfully`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the task ran to completion successfully.
- **`HasBeenPickedUpByProcessor`** :span[boolean]{.type-label}  
  Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
- **`HasPendingInterruptions`** :span[boolean]{.type-label}  
  True if the task has any pending interruptions.
- **`HasPendingPreconditions`** :span[boolean]{.type-label}  
  True if the task has any pending preconditions.
- **`HasWarningsOrErrors`** :span[boolean]{.type-label}  
  True if any warnings or non-fatal errors were recorded in the task log during execution.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsCompleted`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUpdatedTime`** :span[string]{.type-label}  
  Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
- **`PendingInterruptionTypes`** :span[array of enum]{.type-label}  
  Contains a list of the types of any pending interruptions.  
  Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
- **`PendingPreconditionTypes`** :span[array of string]{.type-label}  
  Contains a list of the types of any pending preconditions.
- **`ProjectId`** :span[string]{.type-label}  
  If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
- **`QueueTime`** :span[string]{.type-label}  
  Gets or sets the time at which the task was queued. Format `date-time`.
- **`QueueTimeExpiry`** :span[string]{.type-label}  
  Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
- **`ServerNode`** :span[string]{.type-label}  
  Gets the ID of the Octopus server that created and will control this task.
- **`SpaceId`** :span[string]{.type-label}
- **`StartTime`** :span[string]{.type-label}  
  Gets or sets the time at which the task started executing. Format `date-time`.
- **`State`** :span[enum]{.type-label}  
  Gets or sets the current state of the task.  
  Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

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

## List supported task types

:span[GET]{.api-get} `/api/{spaceId}/tasks/tasktypes`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/tasktypes`, `/api/tasks/tasktypes`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Holds a list of supported task types, generated in response to a ListServerTaskTypesRequest

- **`Id`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}
- **`Name`** :span[string]{.type-label}

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

:span[GET]{.api-get} `/api/{spaceId}/tasks/{id}`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}`, `/api/tasks/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Task to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resources.

**Response**

`200` — Holds a task, returned in response to GetServerTaskByIdRequest

- **`Arguments`** :span[object]{.type-label}  
  Gets or sets any arguments to the task.
- **`CanRerun`** :span[boolean]{.type-label}  
  If true, then the task can be used as the basis for a new task with the same effect.
- **`Completed`** :span[string]{.type-label}  
  Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
- **`CompletedTime`** :span[string]{.type-label}  
  Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
- **`Duration`** :span[string]{.type-label}  
  Gets or sets a string indicating how long the task took to run.
- **`ErrorMessage`** :span[string]{.type-label}  
  Gets or sets a short summary of the errors encountered when the task ran (if any).
- **`EstimatedRemainingQueueDurationSeconds`** :span[integer]{.type-label}
- **`FinishedSuccessfully`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the task ran to completion successfully.
- **`HasBeenPickedUpByProcessor`** :span[boolean]{.type-label}  
  Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
- **`HasPendingInterruptions`** :span[boolean]{.type-label}  
  True if the task has any pending interruptions.
- **`HasPendingPreconditions`** :span[boolean]{.type-label}  
  True if the task has any pending preconditions.
- **`HasWarningsOrErrors`** :span[boolean]{.type-label}  
  True if any warnings or non-fatal errors were recorded in the task log during execution.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsCompleted`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUpdatedTime`** :span[string]{.type-label}  
  Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
- **`PendingInterruptionTypes`** :span[array of enum]{.type-label}  
  Contains a list of the types of any pending interruptions.  
  Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
- **`PendingPreconditionTypes`** :span[array of string]{.type-label}  
  Contains a list of the types of any pending preconditions.
- **`ProjectId`** :span[string]{.type-label}  
  If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
- **`QueueTime`** :span[string]{.type-label}  
  Gets or sets the time at which the task was queued. Format `date-time`.
- **`QueueTimeExpiry`** :span[string]{.type-label}  
  Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
- **`ServerNode`** :span[string]{.type-label}  
  Gets the ID of the Octopus server that created and will control this task.
- **`SpaceId`** :span[string]{.type-label}
- **`StartTime`** :span[string]{.type-label}  
  Gets or sets the time at which the task started executing. Format `date-time`.
- **`State`** :span[enum]{.type-label}  
  Gets or sets the current state of the task.  
  Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

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

## Mark the given task as canceled

:span[POST]{.api-post} `/api/{spaceId}/tasks/{id}/cancel`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/cancel`, `/api/tasks/{id}/cancel`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Task to cancel.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resources.

**Response**

`200` — Returned in response to CancelServerTaskRequest. If the ServerTask cancellation failed, clients should receive an error instead.

- **`Arguments`** :span[object]{.type-label}  
  Gets or sets any arguments to the task.
- **`CanRerun`** :span[boolean]{.type-label}  
  If true, then the task can be used as the basis for a new task with the same effect.
- **`Completed`** :span[string]{.type-label}  
  Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
- **`CompletedTime`** :span[string]{.type-label}  
  Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
- **`Duration`** :span[string]{.type-label}  
  Gets or sets a string indicating how long the task took to run.
- **`ErrorMessage`** :span[string]{.type-label}  
  Gets or sets a short summary of the errors encountered when the task ran (if any).
- **`EstimatedRemainingQueueDurationSeconds`** :span[integer]{.type-label}
- **`FinishedSuccessfully`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the task ran to completion successfully.
- **`HasBeenPickedUpByProcessor`** :span[boolean]{.type-label}  
  Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
- **`HasPendingInterruptions`** :span[boolean]{.type-label}  
  True if the task has any pending interruptions.
- **`HasPendingPreconditions`** :span[boolean]{.type-label}  
  True if the task has any pending preconditions.
- **`HasWarningsOrErrors`** :span[boolean]{.type-label}  
  True if any warnings or non-fatal errors were recorded in the task log during execution.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsCompleted`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUpdatedTime`** :span[string]{.type-label}  
  Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
- **`PendingInterruptionTypes`** :span[array of enum]{.type-label}  
  Contains a list of the types of any pending interruptions.  
  Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
- **`PendingPreconditionTypes`** :span[array of string]{.type-label}  
  Contains a list of the types of any pending preconditions.
- **`ProjectId`** :span[string]{.type-label}  
  If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
- **`QueueTime`** :span[string]{.type-label}  
  Gets or sets the time at which the task was queued. Format `date-time`.
- **`QueueTimeExpiry`** :span[string]{.type-label}  
  Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
- **`ServerNode`** :span[string]{.type-label}  
  Gets the ID of the Octopus server that created and will control this task.
- **`SpaceId`** :span[string]{.type-label}
- **`StartTime`** :span[string]{.type-label}  
  Gets or sets the time at which the task started executing. Format `date-time`.
- **`State`** :span[enum]{.type-label}  
  Gets or sets the current state of the task.  
  Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

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

## Get a single task by ID, including the full task log as a tree of activity elements

:span[GET]{.api-get} `/api/{spaceId}/tasks/{id}/details`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/details`, `/api/tasks/{id}/details`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the task to load details for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ranges`** :span[string]{.type-label}
- **`tail`** :span[integer]{.type-label}  
  If set, determines how many log entries will be returned.
- **`verbose`** :span[boolean]{.type-label}  
  If true, includes verbose output.

**Response**

`200` — Returns details about a specific server task

- **`ActivityLogs`** :span[array of object]{.type-label}
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
- **`PhysicalLogSize`** :span[integer]{.type-label}
- **`Progress`** :span[object]{.type-label}
  - **`EstimatedTimeRemaining`** :span[string]{.type-label}
  - **`ProgressPercentage`** :span[integer]{.type-label}
- **`Task`** :span[object]{.type-label}
  - **`Arguments`** :span[object]{.type-label}  
    Gets or sets any arguments to the task.
  - **`CanRerun`** :span[boolean]{.type-label}  
    If true, then the task can be used as the basis for a new task with the same effect.
  - **`Completed`** :span[string]{.type-label}  
    Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
  - **`CompletedTime`** :span[string]{.type-label}  
    Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
  - **`Duration`** :span[string]{.type-label}  
    Gets or sets a string indicating how long the task took to run.
  - **`ErrorMessage`** :span[string]{.type-label}  
    Gets or sets a short summary of the errors encountered when the task ran (if any).
  - **`EstimatedRemainingQueueDurationSeconds`** :span[integer]{.type-label}
  - **`FinishedSuccessfully`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the task ran to completion successfully.
  - **`HasBeenPickedUpByProcessor`** :span[boolean]{.type-label}  
    Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
  - **`HasPendingInterruptions`** :span[boolean]{.type-label}  
    True if the task has any pending interruptions.
  - **`HasPendingPreconditions`** :span[boolean]{.type-label}  
    True if the task has any pending preconditions.
  - **`HasWarningsOrErrors`** :span[boolean]{.type-label}  
    True if any warnings or non-fatal errors were recorded in the task log during execution.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastUpdatedTime`** :span[string]{.type-label}  
    Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
  - **`PendingInterruptionTypes`** :span[array of enum]{.type-label}  
    Contains a list of the types of any pending interruptions.  
    Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** :span[array of string]{.type-label}  
    Contains a list of the types of any pending preconditions.
  - **`ProjectId`** :span[string]{.type-label}  
    If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
  - **`QueueTime`** :span[string]{.type-label}  
    Gets or sets the time at which the task was queued. Format `date-time`.
  - **`QueueTimeExpiry`** :span[string]{.type-label}  
    Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
  - **`ServerNode`** :span[string]{.type-label}  
    Gets the ID of the Octopus server that created and will control this task.
  - **`SpaceId`** :span[string]{.type-label}
  - **`StartTime`** :span[string]{.type-label}  
    Gets or sets the time at which the task started executing. Format `date-time`.
  - **`State`** :span[enum]{.type-label}  
    Gets or sets the current state of the task.  
    Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

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

:span[POST]{.api-post} `/api/{spaceId}/tasks/{id}/prioritize`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/prioritize`, `/api/tasks/{id}/prioritize`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Get a list of tasks that this task is currently queued behind

:span[GET]{.api-get} `/api/{spaceId}/tasks/{id}/queued-behind`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/queued-behind`, `/api/tasks/{id}/queued-behind`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Task.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Holds the list of tasks that a task is currently queued behind. Response to GetServerTaskQueuedBehindRequest.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Arguments`** :span[object]{.type-label}  
    Gets or sets any arguments to the task.
  - **`CanRerun`** :span[boolean]{.type-label}  
    If true, then the task can be used as the basis for a new task with the same effect.
  - **`Completed`** :span[string]{.type-label}  
    Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
  - **`CompletedTime`** :span[string]{.type-label}  
    Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
  - **`Description`** :span[string]{.type-label}  
    Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
  - **`Duration`** :span[string]{.type-label}  
    Gets or sets a string indicating how long the task took to run.
  - **`ErrorMessage`** :span[string]{.type-label}  
    Gets or sets a short summary of the errors encountered when the task ran (if any).
  - **`EstimatedRemainingQueueDurationSeconds`** :span[integer]{.type-label}
  - **`FinishedSuccessfully`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the task ran to completion successfully.
  - **`HasBeenPickedUpByProcessor`** :span[boolean]{.type-label}  
    Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
  - **`HasPendingInterruptions`** :span[boolean]{.type-label}  
    True if the task has any pending interruptions.
  - **`HasPendingPreconditions`** :span[boolean]{.type-label}  
    True if the task has any pending preconditions.
  - **`HasWarningsOrErrors`** :span[boolean]{.type-label}  
    True if any warnings or non-fatal errors were recorded in the task log during execution.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LastUpdatedTime`** :span[string]{.type-label}  
    Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
  - **`PendingInterruptionTypes`** :span[array of enum]{.type-label}  
    Contains a list of the types of any pending interruptions.  
    Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** :span[array of string]{.type-label}  
    Contains a list of the types of any pending preconditions.
  - **`ProjectId`** :span[string]{.type-label}  
    If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
  - **`QueueTime`** :span[string]{.type-label}  
    Gets or sets the time at which the task was queued. Format `date-time`.
  - **`QueueTimeExpiry`** :span[string]{.type-label}  
    Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
  - **`ServerNode`** :span[string]{.type-label}  
    Gets the ID of the Octopus server that created and will control this task.
  - **`SpaceId`** :span[string]{.type-label}
  - **`StartTime`** :span[string]{.type-label}  
    Gets or sets the time at which the task started executing. Format `date-time`.
  - **`State`** :span[enum]{.type-label}  
    Gets or sets the current state of the task.  
    Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
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

## Get the full task log of a given resource as plain text. Useful when the log needs to be rendered to a console or sent as an email attachment

:span[GET]{.api-get} `/api/{spaceId}/tasks/{id}/raw`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/raw`, `/api/tasks/{id}/raw`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the task.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Change the state of a task

:span[POST]{.api-post} `/api/{spaceId}/tasks/{id}/state`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/state`, `/api/tasks/{id}/state`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the task.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the task.
- **`Reason`** :span[string]{.type-label} *(required)*  
  The reason for the state change. Minimum length 1.
- **`SpaceId`** :span[string]{.type-label}  
  The ID of the space containing the resource(s).
- **`State`** :span[enum]{.type-label} *(required)*  
  The state to set the task to.  
  Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

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

- **`Arguments`** :span[object]{.type-label}  
  Gets or sets any arguments to the task.
- **`CanRerun`** :span[boolean]{.type-label}  
  If true, then the task can be used as the basis for a new task with the same effect.
- **`Completed`** :span[string]{.type-label}  
  Gets or sets a value indicating the completion status of the task. May be "Timed out", "Queued...", "Executing...", or the time at which the task completed for completed tasks.
- **`CompletedTime`** :span[string]{.type-label}  
  Gets or sets the date/time that the task completed. Will be null if the task has not yet completed. Format `date-time`.
- **`Description`** :span[string]{.type-label}  
  Gets or sets a short, human-understandable description of this task. An example might be "Manual database backup". This is the name that will be shown in the task list.
- **`Duration`** :span[string]{.type-label}  
  Gets or sets a string indicating how long the task took to run.
- **`ErrorMessage`** :span[string]{.type-label}  
  Gets or sets a short summary of the errors encountered when the task ran (if any).
- **`EstimatedRemainingQueueDurationSeconds`** :span[integer]{.type-label}
- **`FinishedSuccessfully`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the task ran to completion successfully.
- **`HasBeenPickedUpByProcessor`** :span[boolean]{.type-label}  
  Gets or sets a boolean value indicating whether the Octopus Server is processing this task.
- **`HasPendingInterruptions`** :span[boolean]{.type-label}  
  True if the task has any pending interruptions.
- **`HasPendingPreconditions`** :span[boolean]{.type-label}  
  True if the task has any pending preconditions.
- **`HasWarningsOrErrors`** :span[boolean]{.type-label}  
  True if any warnings or non-fatal errors were recorded in the task log during execution.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsCompleted`** :span[boolean]{.type-label}  
  Gets or sets a value indicating whether the task has completed (that is, not queued, not running, and not paused; may have finished successfully or failed).
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LastUpdatedTime`** :span[string]{.type-label}  
  Gets or sets the time that the Octopus server last updated the status of this task. For a running task this should happen at least every couple of minutes. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of the task to create. This name must be one of the list of possible names documented in the create API operation documentation.
- **`PendingInterruptionTypes`** :span[array of enum]{.type-label}  
  Contains a list of the types of any pending interruptions.  
  Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
- **`PendingPreconditionTypes`** :span[array of string]{.type-label}  
  Contains a list of the types of any pending preconditions.
- **`ProjectId`** :span[string]{.type-label}  
  If the task belongs to a project (e.g. a deployment), the ID of the project it belongs to.
- **`QueueTime`** :span[string]{.type-label}  
  Gets or sets the time at which the task was queued. Format `date-time`.
- **`QueueTimeExpiry`** :span[string]{.type-label}  
  Gets or sets the time at which the task will timeout if it has not started executing. Format `date-time`.
- **`ServerNode`** :span[string]{.type-label}  
  Gets the ID of the Octopus server that created and will control this task.
- **`SpaceId`** :span[string]{.type-label}
- **`StartTime`** :span[string]{.type-label}  
  Gets or sets the time at which the task started executing. Format `date-time`.
- **`State`** :span[enum]{.type-label}  
  Gets or sets the current state of the task.  
  Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.

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

:span[GET]{.api-get} `/api/{spaceId}/tasks/{id}/status/messages`

Also reachable at `/api/spaces/{spaceIdentifier}/tasks/{id}/status/messages`, `/api/tasks/{id}/status/messages`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Task to load status messages for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resources.

**Response**

`200` — The requested Task Status Messages

- **`Messages`** :span[array of object]{.type-label}
  - **`Category`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Message`** :span[string]{.type-label}
  - **`Title`** :span[string]{.type-label}

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
