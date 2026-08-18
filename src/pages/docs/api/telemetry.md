---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Telemetry
---

## Get the latest telemetry data

:endpoint{method="GET" path="/api/telemetry/download"}

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## Get the last telemetry task

:endpoint{method="GET" path="/api/telemetry/lastTask"}

**Response**

`200` — The requested last Telemetry Task

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

:::api-example{label="Response"}
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
:::

## Get the Telemetry configuration

:endpoint{method="GET" path="/api/telemetryconfiguration"}

**Response**

`200` — The requested Telemetry Configuration

- **`Enabled`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsTelemetryEnforced`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ShowAsNewUntil`** :span[string]{.type-label}  
  Format `date-time`.

:::api-example{label="Response"}
```json
{
  "Enabled": true,
  "Id": "string",
  "IsTelemetryEnforced": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ShowAsNewUntil": "2020-01-01T00:00:00.000Z"
}
```
:::

## Update the Telemetry Configuration

:endpoint{method="PUT" path="/api/telemetryconfiguration"}

**Request Body**

- **`Enabled`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsTelemetryEnforced`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ShowAsNewUntil`** :span[string]{.type-label}  
  Format `date-time`.

:::api-example{label="Request"}
```json
{
  "Enabled": true,
  "Id": "string",
  "IsTelemetryEnforced": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ShowAsNewUntil": "2020-01-01T00:00:00.000Z"
}
```
:::

**Response**

`200` — Confirmation that Telemetry Configuration was modified, containing the new configuration

- **`Enabled`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsTelemetryEnforced`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ShowAsNewUntil`** :span[string]{.type-label}  
  Format `date-time`.

:::api-example{label="Response"}
```json
{
  "Enabled": true,
  "Id": "string",
  "IsTelemetryEnforced": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ShowAsNewUntil": "2020-01-01T00:00:00.000Z"
}
```
:::
