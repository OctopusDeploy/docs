---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Dashboard
---

## Return information required to render the Octopus dashboard

:endpoint{method="GET" path="/api/\{spaceId\}/dashboard"}

Also reachable at `/api/dashboard`, `/api/spaces/{spaceIdentifier}/dashboard`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`highestLatestVersionPerProjectAndEnvironment`** :span[boolean]{.type-label}
- **`projectId`** :span[string]{.type-label}
- **`releaseId`** :span[string]{.type-label}
- **`selectedTags`** :span[array of string]{.type-label}
- **`selectedTenants`** :span[array of string]{.type-label}
- **`showAll`** :span[boolean]{.type-label}

**Response**

`200` — The requested Dashboard

- **`Environments`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsFiltered`** :span[boolean]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`CompletedTime`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DeploymentId`** :span[string]{.type-label}
  - **`Duration`** :span[string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ErrorMessage`** :span[string]{.type-label}
  - **`HasPendingInterruptions`** :span[boolean]{.type-label}
  - **`HasPendingPreconditions`** :span[boolean]{.type-label}
  - **`HasWarningsOrErrors`** :span[boolean]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** :span[boolean]{.type-label}
  - **`IsCurrent`** :span[boolean]{.type-label}
  - **`IsPrevious`** :span[boolean]{.type-label}
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
  - **`ReleaseId`** :span[string]{.type-label}
  - **`ReleaseVersion`** :span[string]{.type-label}
  - **`StartTime`** :span[string]{.type-label}  
    Format `date-time`.
  - **`State`** :span[enum]{.type-label}  
    Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
  - **`TaskId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectGroups`** :span[array of object]{.type-label}
  - **`EnvironmentIds`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
- **`ProjectLimit`** :span[integer]{.type-label}
- **`Projects`** :span[array of object]{.type-label}
  - **`CanPerformUntenantedDeployment`** :span[boolean]{.type-label}
  - **`EnvironmentIds`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`ProjectGroupId`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`TenantedDeploymentMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Tenants`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`ProjectEnvironments`** :span[object]{.type-label}
  - **`TenantTags`** :span[array of string]{.type-label}

:::api-example{label="Response"}
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
      "ChannelId": "Channels-1",
      "CompletedTime": "2020-01-01T00:00:00.000Z",
      "Created": "2020-01-01T00:00:00.000Z",
      "DeploymentId": "Deployments-1",
      "Duration": "string",
      "EnvironmentId": "Environments-1",
      "ErrorMessage": "string",
      "HasPendingInterruptions": true,
      "HasPendingPreconditions": true,
      "HasWarningsOrErrors": true,
      "Id": "Deployments-1",
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
      "ProjectId": "Projects-1",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "ReleaseId": "Releases-1",
      "ReleaseVersion": "string",
      "StartTime": "2020-01-01T00:00:00.000Z",
      "State": "Queued",
      "TaskId": "string",
      "TenantId": "Tenants-1"
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
        "Environments-1",
        "..."
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
        "Environments-1",
        "..."
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
:::

## Return the information required to render the dynamic dashboard. Deprecated

:endpoint{method="GET" path="/api/\{spaceId\}/dashboard/dynamic"}

Also reachable at `/api/dashboard/dynamic`, `/api/spaces/{spaceIdentifier}/dashboard/dynamic`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`environments`** :span[array of string]{.type-label}
- **`includePrevious`** :span[boolean]{.type-label}
- **`projects`** :span[array of string]{.type-label}

**Response**

`200` — The requested Dynamic Dashboared

- **`Environments`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsFiltered`** :span[boolean]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`CompletedTime`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DeploymentId`** :span[string]{.type-label}
  - **`Duration`** :span[string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ErrorMessage`** :span[string]{.type-label}
  - **`HasPendingInterruptions`** :span[boolean]{.type-label}
  - **`HasPendingPreconditions`** :span[boolean]{.type-label}
  - **`HasWarningsOrErrors`** :span[boolean]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsCompleted`** :span[boolean]{.type-label}
  - **`IsCurrent`** :span[boolean]{.type-label}
  - **`IsPrevious`** :span[boolean]{.type-label}
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
  - **`ReleaseId`** :span[string]{.type-label}
  - **`ReleaseVersion`** :span[string]{.type-label}
  - **`StartTime`** :span[string]{.type-label}  
    Format `date-time`.
  - **`State`** :span[enum]{.type-label}  
    Allowed values: `Queued`, `Executing`, `Failed`, `Canceled`, `TimedOut`, `Success`, `Cancelling`.
  - **`TaskId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectGroups`** :span[array of object]{.type-label}
  - **`EnvironmentIds`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
- **`ProjectLimit`** :span[integer]{.type-label}
- **`Projects`** :span[array of object]{.type-label}
  - **`CanPerformUntenantedDeployment`** :span[boolean]{.type-label}
  - **`EnvironmentIds`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`ProjectGroupId`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`TenantedDeploymentMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`Tenants`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`ProjectEnvironments`** :span[object]{.type-label}
  - **`TenantTags`** :span[array of string]{.type-label}

:::api-example{label="Response"}
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
      "ChannelId": "Channels-1",
      "CompletedTime": "2020-01-01T00:00:00.000Z",
      "Created": "2020-01-01T00:00:00.000Z",
      "DeploymentId": "Deployments-1",
      "Duration": "string",
      "EnvironmentId": "Environments-1",
      "ErrorMessage": "string",
      "HasPendingInterruptions": true,
      "HasPendingPreconditions": true,
      "HasWarningsOrErrors": true,
      "Id": "Deployments-1",
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
      "ProjectId": "Projects-1",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "ReleaseId": "Releases-1",
      "ReleaseVersion": "string",
      "StartTime": "2020-01-01T00:00:00.000Z",
      "State": "Queued",
      "TaskId": "string",
      "TenantId": "Tenants-1"
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
        "Environments-1",
        "..."
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
        "Environments-1",
        "..."
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
:::
