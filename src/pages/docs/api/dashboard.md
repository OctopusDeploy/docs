---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Dashboard
---

## Returns information required to render the Octopus dashboard

`GET` `/api/{spaceId}/dashboard`

Also reachable at `/api/dashboard`, `/api/spaces/{spaceIdentifier}/dashboard`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`highestLatestVersionPerProjectAndEnvironment`** <span class="type-label">boolean</span>
- **`projectId`** <span class="type-label">string</span>
- **`releaseId`** <span class="type-label">string</span>
- **`selectedTags`** <span class="type-label">array of string</span>
- **`selectedTenants`** <span class="type-label">array of string</span>
- **`showAll`** <span class="type-label">boolean</span>

**Response**

`200` — The requested Dashboard

`DashboardResource`.

- **`Environments`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsFiltered`** <span class="type-label">boolean</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`CompletedTime`** <span class="type-label">string</span> — Format `date-time`.
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`DeploymentId`** <span class="type-label">string</span>
  - **`Duration`** <span class="type-label">string</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ErrorMessage`** <span class="type-label">string</span>
  - **`HasPendingInterruptions`** <span class="type-label">boolean</span>
  - **`HasPendingPreconditions`** <span class="type-label">boolean</span>
  - **`HasWarningsOrErrors`** <span class="type-label">boolean</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** <span class="type-label">boolean</span>
  - **`IsCurrent`** <span class="type-label">boolean</span>
  - **`IsPrevious`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** <span class="type-label">array of string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`QueueTime`** <span class="type-label">string</span> — Format `date-time`.
  - **`ReleaseId`** <span class="type-label">string</span>
  - **`ReleaseVersion`** <span class="type-label">string</span>
  - **`StartTime`** <span class="type-label">string</span> — Format `date-time`.
  - **`State`** <span class="type-label">enum</span> — Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
  - **`TaskId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectGroups`** <span class="type-label">array of object</span>
  - **`EnvironmentIds`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
- **`ProjectLimit`** <span class="type-label">integer</span>
- **`Projects`** <span class="type-label">array of object</span>
  - **`CanPerformUntenantedDeployment`** <span class="type-label">boolean</span>
  - **`EnvironmentIds`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectGroupId`** <span class="type-label">string</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Tenants`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectEnvironments`** <span class="type-label">object</span>
  - **`TenantTags`** <span class="type-label">array of string</span>

<div data-example="Response">

```json
{
  "Environments": [
    {
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ],
  "Id": "string",
  "IsFiltered": true,
  "Items": [
    {
      "ChannelId": "string",
      "CompletedTime": "2020-01-01T00:00:00.000Z",
      "Created": "2020-01-01T00:00:00.000Z",
      "DeploymentId": "string",
      "Duration": "string",
      "EnvironmentId": "string",
      "ErrorMessage": "string",
      "HasPendingInterruptions": true,
      "HasPendingPreconditions": true,
      "HasWarningsOrErrors": true,
      "Id": "string",
      "IsCompleted": true,
      "IsCurrent": true,
      "IsPrevious": true,
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
      "ReleaseId": "string",
      "ReleaseVersion": "string",
      "StartTime": "2020-01-01T00:00:00.000Z",
      "State": "Queued",
      "TaskId": "string",
      "TenantId": "string"
    }
  ],
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectGroups": [
    {
      "EnvironmentIds": [
        "string"
      ],
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ],
  "ProjectLimit": 0,
  "Projects": [
    {
      "CanPerformUntenantedDeployment": true,
      "EnvironmentIds": [
        "string"
      ],
      "Id": "string",
      "IsDisabled": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "ProjectGroupId": "string",
      "Slug": "string",
      "TenantedDeploymentMode": "Untenanted"
    }
  ],
  "Tenants": [
    {
      "Id": "string",
      "IsDisabled": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "ProjectEnvironments": {
        "additionalProp1": [
          "string"
        ],
        "additionalProp2": [
          "string"
        ],
        "additionalProp3": [
          "string"
        ]
      },
      "TenantTags": [
        "string"
      ]
    }
  ]
}
```
</div>

## Returns the information required to render the dynamic dashboard. Deprecated

`GET` `/api/{spaceId}/dashboard/dynamic`

Also reachable at `/api/dashboard/dynamic`, `/api/spaces/{spaceIdentifier}/dashboard/dynamic`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`environments`** <span class="type-label">array of string</span>
- **`includePrevious`** <span class="type-label">boolean</span>
- **`projects`** <span class="type-label">array of string</span>

**Response**

`200` — The requested Dynamic Dashboared

`DashboardResource`.

- **`Environments`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsFiltered`** <span class="type-label">boolean</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`CompletedTime`** <span class="type-label">string</span> — Format `date-time`.
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`DeploymentId`** <span class="type-label">string</span>
  - **`Duration`** <span class="type-label">string</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ErrorMessage`** <span class="type-label">string</span>
  - **`HasPendingInterruptions`** <span class="type-label">boolean</span>
  - **`HasPendingPreconditions`** <span class="type-label">boolean</span>
  - **`HasWarningsOrErrors`** <span class="type-label">boolean</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** <span class="type-label">boolean</span>
  - **`IsCurrent`** <span class="type-label">boolean</span>
  - **`IsPrevious`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`PendingInterruptionTypes`** <span class="type-label">array of enum</span> — Allowed values: `ManualIntervention`, `GuidedFailure`, `PullRequestCompletion`, `ArgoCDApplicationSync`, `KubernetesResourceVerification`.
  - **`PendingPreconditionTypes`** <span class="type-label">array of string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`QueueTime`** <span class="type-label">string</span> — Format `date-time`.
  - **`ReleaseId`** <span class="type-label">string</span>
  - **`ReleaseVersion`** <span class="type-label">string</span>
  - **`StartTime`** <span class="type-label">string</span> — Format `date-time`.
  - **`State`** <span class="type-label">enum</span> — Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
  - **`TaskId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectGroups`** <span class="type-label">array of object</span>
  - **`EnvironmentIds`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
- **`ProjectLimit`** <span class="type-label">integer</span>
- **`Projects`** <span class="type-label">array of object</span>
  - **`CanPerformUntenantedDeployment`** <span class="type-label">boolean</span>
  - **`EnvironmentIds`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectGroupId`** <span class="type-label">string</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Tenants`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectEnvironments`** <span class="type-label">object</span>
  - **`TenantTags`** <span class="type-label">array of string</span>

<div data-example="Response">

```json
{
  "Environments": [
    {
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ],
  "Id": "string",
  "IsFiltered": true,
  "Items": [
    {
      "ChannelId": "string",
      "CompletedTime": "2020-01-01T00:00:00.000Z",
      "Created": "2020-01-01T00:00:00.000Z",
      "DeploymentId": "string",
      "Duration": "string",
      "EnvironmentId": "string",
      "ErrorMessage": "string",
      "HasPendingInterruptions": true,
      "HasPendingPreconditions": true,
      "HasWarningsOrErrors": true,
      "Id": "string",
      "IsCompleted": true,
      "IsCurrent": true,
      "IsPrevious": true,
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
      "ReleaseId": "string",
      "ReleaseVersion": "string",
      "StartTime": "2020-01-01T00:00:00.000Z",
      "State": "Queued",
      "TaskId": "string",
      "TenantId": "string"
    }
  ],
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectGroups": [
    {
      "EnvironmentIds": [
        "string"
      ],
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ],
  "ProjectLimit": 0,
  "Projects": [
    {
      "CanPerformUntenantedDeployment": true,
      "EnvironmentIds": [
        "string"
      ],
      "Id": "string",
      "IsDisabled": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "ProjectGroupId": "string",
      "Slug": "string",
      "TenantedDeploymentMode": "Untenanted"
    }
  ],
  "Tenants": [
    {
      "Id": "string",
      "IsDisabled": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "ProjectEnvironments": {
        "additionalProp1": [
          "string"
        ],
        "additionalProp2": [
          "string"
        ],
        "additionalProp3": [
          "string"
        ]
      },
      "TenantTags": [
        "string"
      ]
    }
  ]
}
```
</div>
