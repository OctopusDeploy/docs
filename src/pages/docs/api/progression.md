---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Progression
---

## Returns a list of runbook dashboard items, filtered by various criteria including projectIds, environmentIds, tenantIds, tenantTags, runbookIds, runbookTags, taskIds

`GET` `/api/{spaceId}/progression/runbooks/taskRuns`

Also reachable at `/api/progression/runbooks/taskRuns`, `/api/spaces/{spaceIdentifier}/progression/runbooks/taskRuns`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the space.

- **`environmentIds`** <span class="type-label">array of string</span>
- **`projectIds`** <span class="type-label">array of string</span>
- **`runbookIds`** <span class="type-label">array of string</span>
- **`runbookTags`** <span class="type-label">array of string</span>
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`taskIds`** <span class="type-label">array of string</span>
- **`tenantIds`** <span class="type-label">array of string</span>
- **`tenantTags`** <span class="type-label">array of string</span>

**Response**

`200` — The list of runbook dashboard items

`RunbooksDashboardItemResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CompletedTime`** <span class="type-label">string</span> — Format `date-time`.
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`Duration`** <span class="type-label">string</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ErrorMessage`** <span class="type-label">string</span>
  - **`GitReference`** <span class="type-label">object</span>
  - **`HasPendingInterruptions`** <span class="type-label">boolean</span>
  - **`HasPendingPreconditions`** <span class="type-label">boolean</span>
  - **`HasWarningsOrErrors`** <span class="type-label">boolean</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** <span class="type-label">array of string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`QueueTime`** <span class="type-label">string</span> — Format `date-time`.
  - **`RunBy`** <span class="type-label">string</span>
  - **`RunName`** <span class="type-label">string</span>
  - **`RunbookId`** <span class="type-label">string</span>
  - **`RunbookSnapshotId`** <span class="type-label">string</span>
  - **`RunbookSnapshotName`** <span class="type-label">string</span>
  - **`RunbookSnapshotNotes`** <span class="type-label">string</span>
  - **`StartTime`** <span class="type-label">string</span> — Format `date-time`.
  - **`State`** <span class="type-label">enum</span> — Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
  - **`TaskId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
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
      "CompletedTime": "2020-01-01T00:00:00.000Z",
      "Created": "2020-01-01T00:00:00.000Z",
      "Duration": "string",
      "EnvironmentId": "string",
      "ErrorMessage": "string",
      "GitReference": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "HasPendingInterruptions": true,
      "HasPendingPreconditions": true,
      "HasWarningsOrErrors": true,
      "Id": "string",
      "IsCompleted": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "PendingInterruptionTypes": [
        "ManualIntervention"
      ],
      "PendingPreconditionTypes": [
        "string"
      ],
      "ProjectId": "string",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "RunBy": "string",
      "RunName": "string",
      "RunbookId": "string",
      "RunbookSnapshotId": "string",
      "RunbookSnapshotName": "string",
      "RunbookSnapshotNotes": "string",
      "StartTime": "2020-01-01T00:00:00.000Z",
      "State": "Queued",
      "TaskId": "string",
      "TenantId": "string"
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

## Gets the progress of a runbook in the environment lifecycle

`GET` `/api/{spaceId}/progression/runbooks/{runbookId}`

Also reachable at `/api/progression/runbooks/{runbookId}`, `/api/spaces/{spaceIdentifier}/progression/runbooks/{runbookId}`.

**Parameters**

- **`runbookId`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Progression information

`RunbooksProgressionResource`.

- **`Environments`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`RunbookRuns`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "Environments": [
    {
      "Id": "string",
      "Name": "string"
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
  "RunbookRuns": {
    "additionalProp1": [
      {
        "CompletedTime": "2020-01-01T00:00:00.000Z",
        "Created": "2020-01-01T00:00:00.000Z",
        "Duration": "string",
        "EnvironmentId": "string",
        "ErrorMessage": "string",
        "GitReference": {},
        "HasPendingInterruptions": true,
        "HasPendingPreconditions": true,
        "HasWarningsOrErrors": true,
        "Id": "string",
        "IsCompleted": true,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "PendingInterruptionTypes": [
          "ManualIntervention"
        ],
        "PendingPreconditionTypes": [
          "string"
        ],
        "ProjectId": "string",
        "QueueTime": "2020-01-01T00:00:00.000Z",
        "RunBy": "string",
        "RunName": "string",
        "RunbookId": "string",
        "RunbookSnapshotId": "string",
        "RunbookSnapshotName": "string",
        "RunbookSnapshotNotes": "string",
        "StartTime": "2020-01-01T00:00:00.000Z",
        "State": "Queued",
        "TaskId": "string",
        "TenantId": "string"
      }
    ],
    "additionalProp2": [
      {
        "CompletedTime": "2020-01-01T00:00:00.000Z",
        "Created": "2020-01-01T00:00:00.000Z",
        "Duration": "string",
        "EnvironmentId": "string",
        "ErrorMessage": "string",
        "GitReference": {},
        "HasPendingInterruptions": true,
        "HasPendingPreconditions": true,
        "HasWarningsOrErrors": true,
        "Id": "string",
        "IsCompleted": true,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "PendingInterruptionTypes": [
          "ManualIntervention"
        ],
        "PendingPreconditionTypes": [
          "string"
        ],
        "ProjectId": "string",
        "QueueTime": "2020-01-01T00:00:00.000Z",
        "RunBy": "string",
        "RunName": "string",
        "RunbookId": "string",
        "RunbookSnapshotId": "string",
        "RunbookSnapshotName": "string",
        "RunbookSnapshotNotes": "string",
        "StartTime": "2020-01-01T00:00:00.000Z",
        "State": "Queued",
        "TaskId": "string",
        "TenantId": "string"
      }
    ],
    "additionalProp3": [
      {
        "CompletedTime": "2020-01-01T00:00:00.000Z",
        "Created": "2020-01-01T00:00:00.000Z",
        "Duration": "string",
        "EnvironmentId": "string",
        "ErrorMessage": "string",
        "GitReference": {},
        "HasPendingInterruptions": true,
        "HasPendingPreconditions": true,
        "HasWarningsOrErrors": true,
        "Id": "string",
        "IsCompleted": true,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "PendingInterruptionTypes": [
          "ManualIntervention"
        ],
        "PendingPreconditionTypes": [
          "string"
        ],
        "ProjectId": "string",
        "QueueTime": "2020-01-01T00:00:00.000Z",
        "RunBy": "string",
        "RunName": "string",
        "RunbookId": "string",
        "RunbookSnapshotId": "string",
        "RunbookSnapshotName": "string",
        "RunbookSnapshotNotes": "string",
        "StartTime": "2020-01-01T00:00:00.000Z",
        "State": "Queued",
        "TaskId": "string",
        "TenantId": "string"
      }
    ]
  }
}
```
</div>

## Gets the progress of a runbook in the environment lifecycle

`GET` `/api/{spaceId}/progression/runbooks/{runbookId}/v1`

Also reachable at `/api/progression/runbooks/{runbookId}/v1`, `/api/spaces/{spaceIdentifier}/progression/runbooks/{runbookId}/v1`.

**Parameters**

- **`runbookId`** <span class="type-label">string</span> *(required)* — ID of the Runbook.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Progression information

`GetRunbookProgressionResponse`.

- **`Progression`** <span class="type-label">object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`RunbookRuns`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "Progression": {
    "Environments": [
      {
        "Id": "string",
        "Name": "string"
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
    "RunbookRuns": {
      "additionalProp1": [
        {}
      ],
      "additionalProp2": [
        {}
      ],
      "additionalProp3": [
        {}
      ]
    }
  }
}
```
</div>

## Gets the progress of a release in the environment lifecycle

`GET` `/api/{spaceId}/progression/{projectId}`

Also reachable at `/api/progression/{projectId}`, `/api/projects/{projectId}/progression`, `/api/spaces/{spaceIdentifier}/progression/{projectId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/progression`, `/api/{spaceId}/projects/{projectId}/progression`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`releaseHistoryCount`** <span class="type-label">integer</span> — Number of releases to include per environment/channel/tenant combination. Defaults to 3. Maximum allowed is 100. Minimum `1`. Maximum `100`.

**Response**

`200` — The requested Project Progression information

`ProgressionResource`.

- **`ChannelEnvironments`** <span class="type-label">object</span>
- **`Environments`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleEnvironments`** <span class="type-label">object</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Releases`** <span class="type-label">array of object</span>
  - **`Channel`** <span class="type-label">object</span>
  - **`Deployments`** <span class="type-label">object</span>
  - **`HasUnresolvedDefect`** <span class="type-label">boolean</span>
  - **`NextDeployments`** <span class="type-label">array of string</span>
  - **`Release`** <span class="type-label">object</span>
  - **`ReleaseRetentionPeriod`** <span class="type-label">object</span>
  - **`TentacleRetentionPeriod`** <span class="type-label">object</span>

<div data-example="Response">

```json
{
  "ChannelEnvironments": {
    "additionalProp1": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "additionalProp2": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "additionalProp3": [
      {
        "Id": "string",
        "Name": "string"
      }
    ]
  },
  "Environments": [
    {
      "Id": "string",
      "Name": "string"
    }
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LifecycleEnvironments": {
    "additionalProp1": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "additionalProp2": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "additionalProp3": [
      {
        "Id": "string",
        "Name": "string"
      }
    ]
  },
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Releases": [
    {
      "Channel": {
        "AutomaticEphemeralEnvironmentDeployments": true,
        "CustomFieldDefinitions": [
          {}
        ],
        "Description": "string",
        "EphemeralEnvironmentNameTemplate": "string",
        "GitReferenceRules": [
          "string"
        ],
        "GitResourceRules": [
          {}
        ],
        "Id": "string",
        "IsDefault": true,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "LifecycleId": "string",
        "Links": {},
        "Name": "string",
        "ParentEnvironmentId": "string",
        "ProjectId": "string",
        "Rules": [
          {}
        ],
        "Slug": "string",
        "SpaceId": "string",
        "TenantTags": [
          "string"
        ],
        "Type": "string"
      },
      "Deployments": {
        "additionalProp1": [
          {}
        ],
        "additionalProp2": [
          {}
        ],
        "additionalProp3": [
          {}
        ]
      },
      "HasUnresolvedDefect": true,
      "NextDeployments": [
        "string"
      ],
      "Release": {
        "Assembled": "2020-01-01T00:00:00.000Z",
        "BuildInformation": [
          {}
        ],
        "ChannelId": "string",
        "CustomFields": {},
        "Id": "string",
        "IgnoreChannelRules": true,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "LibraryVariableSetSnapshotIds": [
          "string"
        ],
        "Links": {},
        "ProjectDeploymentProcessSnapshotId": "string",
        "ProjectId": "string",
        "ProjectVariableSetSnapshotId": "string",
        "ReleaseNotes": "string",
        "SelectedGitResources": [
          {}
        ],
        "SelectedPackages": [
          {}
        ],
        "SpaceId": "string",
        "Version": "string",
        "VersionControlReference": {}
      },
      "ReleaseRetentionPeriod": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPeriod": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ]
}
```
</div>

## Gets the progress of a release in the environment lifecycle

`GET` `/api/{spaceId}/projects/{projectId}/progression/v1`

Also reachable at `/api/projects/{projectId}/progression/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/progression/v1`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`releaseHistoryCount`** <span class="type-label">integer</span> — Number of releases to include per environment/channel/tenant combination. Defaults to 3. Maximum allowed is 100. Minimum `1`. Maximum `100`.

**Response**

`200` — The requested Project Progression information

`GetProjectProgressionResponse`.

- **`Progression`** <span class="type-label">object</span>
  - **`ChannelEnvironments`** <span class="type-label">object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LifecycleEnvironments`** <span class="type-label">object</span>
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Releases`** <span class="type-label">array of object</span>

<div data-example="Response">

```json
{
  "Progression": {
    "ChannelEnvironments": {
      "additionalProp1": [
        {}
      ],
      "additionalProp2": [
        {}
      ],
      "additionalProp3": [
        {}
      ]
    },
    "Environments": [
      {
        "Id": "string",
        "Name": "string"
      }
    ],
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "LifecycleEnvironments": {
      "additionalProp1": [
        {}
      ],
      "additionalProp2": [
        {}
      ],
      "additionalProp3": [
        {}
      ]
    },
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Releases": [
      {
        "Channel": {},
        "Deployments": {},
        "HasUnresolvedDefect": true,
        "NextDeployments": [
          "string"
        ],
        "Release": {},
        "ReleaseRetentionPeriod": {},
        "TentacleRetentionPeriod": {}
      }
    ]
  }
}
```
</div>
