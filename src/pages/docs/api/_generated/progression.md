---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-09-03
title: Progression
---

## List Runbook Dashboard Items

:endpoint{method="GET" path="/api/\{spaceId\}/progression/runbooks/taskRuns"}

Also reachable at `/api/progression/runbooks/taskRuns`, `/api/spaces/{spaceIdentifier}/progression/runbooks/taskRuns`.

Return a list of runbook dashboard items, filtered by various criteria including projectIds, environmentIds, tenantIds, tenantTags, runbookIds, runbookTags, taskIds

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the space.

**Query Parameters**

- **`environmentIds`** :span[array of string]{.type-label}
- **`projectIds`** :span[array of string]{.type-label}
- **`runbookIds`** :span[array of string]{.type-label}
- **`runbookTags`** :span[array of string]{.type-label}
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`taskIds`** :span[array of string]{.type-label}
- **`tenantIds`** :span[array of string]{.type-label}
- **`tenantTags`** :span[array of string]{.type-label}

**Response**

`200` — The list of runbook dashboard items

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`CompletedTime`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Duration`** :span[string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ErrorMessage`** :span[string]{.type-label}
  - **`GitReference`** :span[object]{.type-label}
  - **`HasPendingInterruptions`** :span[boolean]{.type-label}
  - **`HasPendingPreconditions`** :span[boolean]{.type-label}
  - **`HasWarningsOrErrors`** :span[boolean]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`PendingInterruptionTypes`** :span[array of enum]{.type-label}  
    Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** :span[array of string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`QueueTime`** :span[string]{.type-label}  
    Format `date-time`.
  - **`RunBy`** :span[string]{.type-label}
  - **`RunName`** :span[string]{.type-label}
  - **`RunbookId`** :span[string]{.type-label}
  - **`RunbookSnapshotId`** :span[string]{.type-label}
  - **`RunbookSnapshotName`** :span[string]{.type-label}
  - **`RunbookSnapshotNotes`** :span[string]{.type-label}
  - **`StartTime`** :span[string]{.type-label}  
    Format `date-time`.
  - **`State`** :span[enum]{.type-label}  
    Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
  - **`TaskId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
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
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "CompletedTime": "2020-01-01T00:00:00.000Z",
      "Created": "2020-01-01T00:00:00.000Z",
      "Duration": "string",
      "EnvironmentId": "Environments-1",
      "ErrorMessage": "string",
      "GitReference": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "HasPendingInterruptions": false,
      "HasPendingPreconditions": false,
      "HasWarningsOrErrors": false,
      "Id": "string",
      "IsCompleted": false,
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
      "ProjectId": "Projects-1",
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
      "TenantId": "Tenants-1"
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
:::

## Get the progress of a runbook in the environment lifecycle

:endpoint{method="GET" path="/api/\{spaceId\}/progression/runbooks/\{runbookId\}"}

Also reachable at `/api/progression/runbooks/{runbookId}`, `/api/spaces/{spaceIdentifier}/progression/runbooks/{runbookId}`.

**Path Parameters**

- **`runbookId`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Progression information

- **`Environments`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`RunbookRuns`** :span[object]{.type-label}

:::api-example{label="Response"}
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
        "EnvironmentId": "Environments-1",
        "ErrorMessage": "string",
        "GitReference": {},
        "HasPendingInterruptions": false,
        "HasPendingPreconditions": false,
        "HasWarningsOrErrors": false,
        "Id": "string",
        "IsCompleted": false,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "PendingInterruptionTypes": [
          "ManualIntervention"
        ],
        "PendingPreconditionTypes": [
          "string"
        ],
        "ProjectId": "Projects-1",
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
        "TenantId": "Tenants-1"
      }
    ],
    "additionalProp2": [
      {
        "CompletedTime": "2020-01-01T00:00:00.000Z",
        "Created": "2020-01-01T00:00:00.000Z",
        "Duration": "string",
        "EnvironmentId": "Environments-1",
        "ErrorMessage": "string",
        "GitReference": {},
        "HasPendingInterruptions": false,
        "HasPendingPreconditions": false,
        "HasWarningsOrErrors": false,
        "Id": "string",
        "IsCompleted": false,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "PendingInterruptionTypes": [
          "ManualIntervention"
        ],
        "PendingPreconditionTypes": [
          "string"
        ],
        "ProjectId": "Projects-1",
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
        "TenantId": "Tenants-1"
      }
    ],
    "additionalProp3": [
      {
        "CompletedTime": "2020-01-01T00:00:00.000Z",
        "Created": "2020-01-01T00:00:00.000Z",
        "Duration": "string",
        "EnvironmentId": "Environments-1",
        "ErrorMessage": "string",
        "GitReference": {},
        "HasPendingInterruptions": false,
        "HasPendingPreconditions": false,
        "HasWarningsOrErrors": false,
        "Id": "string",
        "IsCompleted": false,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "PendingInterruptionTypes": [
          "ManualIntervention"
        ],
        "PendingPreconditionTypes": [
          "string"
        ],
        "ProjectId": "Projects-1",
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
        "TenantId": "Tenants-1"
      }
    ]
  }
}
```
:::

## Get the progress of a runbook in the environment lifecycle

:endpoint{method="GET" path="/api/\{spaceId\}/progression/runbooks/\{runbookId\}/v1"}

Also reachable at `/api/progression/runbooks/{runbookId}/v1`, `/api/spaces/{spaceIdentifier}/progression/runbooks/{runbookId}/v1`.

**Path Parameters**

- **`runbookId`** :span[string]{.type-label} *(required)*  
  ID of the Runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Progression information

- **`Progression`** :span[object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`RunbookRuns`** :span[object]{.type-label}

:::api-example{label="Response"}
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
:::

## Get the progress of a release in the environment lifecycle

:endpoint{method="GET" path="/api/\{spaceId\}/progression/\{projectId\}"}

Also reachable at `/api/progression/{projectId}`, `/api/projects/{projectId}/progression`, `/api/spaces/{spaceIdentifier}/progression/{projectId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/progression`, `/api/{spaceId}/projects/{projectId}/progression`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`releaseHistoryCount`** :span[integer]{.type-label}  
  Number of releases to include per environment/channel/tenant combination. Defaults to 3. Maximum allowed is 100. Minimum `1`. Maximum `100`.

**Response**

`200` — The requested Project Progression information

- **`ChannelEnvironments`** :span[object]{.type-label}
- **`Environments`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleEnvironments`** :span[object]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Releases`** :span[array of object]{.type-label}
  - **`Channel`** :span[object]{.type-label}
  - **`Deployments`** :span[object]{.type-label}
  - **`HasUnresolvedDefect`** :span[boolean]{.type-label}
  - **`NextDeployments`** :span[array of string]{.type-label}
  - **`Release`** :span[object]{.type-label}
  - **`ReleaseRetentionPeriod`** :span[object]{.type-label}
  - **`TentacleRetentionPeriod`** :span[object]{.type-label}

:::api-example{label="Response"}
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
        "AutomaticEphemeralEnvironmentDeployments": false,
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
        "IsDefault": false,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "LifecycleId": "string",
        "Links": {},
        "Name": "string",
        "ParentEnvironmentId": "Environments-1",
        "ProjectId": "Projects-1",
        "Rules": [
          {}
        ],
        "Slug": "string",
        "SpaceId": "Spaces-1",
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
      "HasUnresolvedDefect": false,
      "NextDeployments": [
        "Environments-1",
        "..."
      ],
      "Release": {
        "Assembled": "2020-01-01T00:00:00.000Z",
        "BuildInformation": [
          {}
        ],
        "ChannelId": "Channels-1",
        "CustomFields": {},
        "Id": "Releases-1",
        "IgnoreChannelRules": false,
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "LibraryVariableSetSnapshotIds": [
          "string"
        ],
        "Links": {},
        "ProjectDeploymentProcessSnapshotId": "string",
        "ProjectId": "Projects-1",
        "ProjectVariableSetSnapshotId": "string",
        "ReleaseNotes": "string",
        "SelectedGitResources": [
          {}
        ],
        "SelectedPackages": [
          {}
        ],
        "SpaceId": "Spaces-1",
        "VariableSnapshotConcurrencyToken": "string",
        "Version": "string",
        "VersionControlReference": {}
      },
      "ReleaseRetentionPeriod": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPeriod": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ]
}
```
:::

## Get the progress of a release in the environment lifecycle

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/progression/v1"}

Also reachable at `/api/projects/{projectId}/progression/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/progression/v1`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`releaseHistoryCount`** :span[integer]{.type-label}  
  Number of releases to include per environment/channel/tenant combination. Defaults to 3. Maximum allowed is 100. Minimum `1`. Maximum `100`.

**Response**

`200` — The requested Project Progression information

- **`Progression`** :span[object]{.type-label}
  - **`ChannelEnvironments`** :span[object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LifecycleEnvironments`** :span[object]{.type-label}
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Releases`** :span[array of object]{.type-label}

:::api-example{label="Response"}
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
        "HasUnresolvedDefect": false,
        "NextDeployments": [
          "Environments-1",
          "..."
        ],
        "Release": {},
        "ReleaseRetentionPeriod": {},
        "TentacleRetentionPeriod": {}
      }
    ]
  }
}
```
:::
