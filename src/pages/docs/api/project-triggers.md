---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Project Triggers
---

## Get Project Triggers within a given Project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/triggers"}

Also reachable at `/api/projects/{projectId}/triggers`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/triggers`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project to get Project Triggers for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`runbookTags`** :span[array of string]{.type-label}  
  A list of Runbook Tags to filter tag based triggers. Tag based triggers matching any of these tags will be included.
- **`runbooks`** :span[array of string]{.type-label}  
  A list of Runbook IDs, to limit the matching of Project Triggers to those with a particular Runbook ID. Example: ["Runbooks-1", "Runbooks-2"].
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`triggerActionCategory`** :span[enum]{.type-label}  
  Filters the Project Triggers using the specified Trigger Action Category.  
  Allowed values: `Deployment`, `Runbook`.
- **`triggerActionType`** :span[enum]{.type-label}  
  Filters the Project Triggers using the specified Trigger Action Type.  
  Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.

**Response**

`200` — The requested list of Project Triggers

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Action`** :span[object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Filter`** :span[object]{.type-label}
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
  - **`ProjectId`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
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
      "Action": {
        "ActionType": "AutoDeploy",
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {}
      },
      "Description": "string",
      "Filter": {
        "FilterType": "MachineFilter",
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {}
      },
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
      "ProjectId": "string",
      "SpaceId": "string"
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

## Create a new project trigger

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/triggers"}

Also reachable at `/api/projects/{projectId}/triggers`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/triggers`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  Id of the project to create a trigger in.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

**Request Body**

- **`Action`** :span[object]{.type-label} *(required)*
  - **`ActionType`** :span[enum]{.type-label}  
    Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** :span[string]{.type-label}  
  Description for the project trigger.
- **`Filter`** :span[object]{.type-label} *(required)*
  - **`FilterType`** :span[enum]{.type-label}  
    Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`IsDisabled`** :span[boolean]{.type-label}  
  Disables the trigger from being run when set.
- **`Name`** :span[string]{.type-label} *(required)*  
  Name of the project trigger. Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  Id of the project to create a trigger in.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

:::api-example{label="Request"}
```json
{
  "Action": {
    "ActionType": "AutoDeploy",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Description": "string",
  "Filter": {
    "FilterType": "MachineFilter",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "IsDisabled": true,
  "Name": "string",
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

**Response**

`201` — Created

- **`Action`** :span[object]{.type-label}
  - **`ActionType`** :span[enum]{.type-label}  
    Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** :span[string]{.type-label}
- **`Filter`** :span[object]{.type-label}
  - **`FilterType`** :span[enum]{.type-label}  
    Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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
- **`ProjectId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Action": {
    "ActionType": "AutoDeploy",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Description": "string",
  "Filter": {
    "FilterType": "MachineFilter",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
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
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

## Get project trigger by project id and trigger id

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/triggers/\{id\}"}

Also reachable at `/api/projects/{projectId}/triggers/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/triggers/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Project Trigger to load.
- **`projectId`** :span[string]{.type-label} *(required)*  
  Id of the project that trigger is in.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

**Response**

`200` — The requested Project Trigger

- **`Action`** :span[object]{.type-label}
  - **`ActionType`** :span[enum]{.type-label}  
    Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** :span[string]{.type-label}
- **`Filter`** :span[object]{.type-label}
  - **`FilterType`** :span[enum]{.type-label}  
    Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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
- **`ProjectId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Action": {
    "ActionType": "AutoDeploy",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Description": "string",
  "Filter": {
    "FilterType": "MachineFilter",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
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
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

## Modify a ProjectTriggerResource by ID

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/triggers/\{id\}"}

Also reachable at `/api/projects/{projectId}/triggers/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/triggers/{id}`.

Updates an existing project trigger

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the project trigger.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ProjectId of the project trigger.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

**Request Body**

- **`Action`** :span[object]{.type-label}
  - **`ActionType`** :span[enum]{.type-label}  
    Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** :span[string]{.type-label}  
  Description for the project trigger.
- **`Filter`** :span[object]{.type-label}
  - **`FilterType`** :span[enum]{.type-label}  
    Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Id`** :span[string]{.type-label} *(required)*  
  Id of the project trigger.
- **`IsDisabled`** :span[boolean]{.type-label}  
  Disables the trigger from being run when set.
- **`Name`** :span[string]{.type-label}  
  Name of the project trigger.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  ProjectId of the project trigger.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

:::api-example{label="Request"}
```json
{
  "Action": {
    "ActionType": "AutoDeploy",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Description": "string",
  "Filter": {
    "FilterType": "MachineFilter",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Id": "string",
  "IsDisabled": true,
  "Name": "string",
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Modified project trigger resource response

- **`Action`** :span[object]{.type-label}
  - **`ActionType`** :span[enum]{.type-label}  
    Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** :span[string]{.type-label}
- **`Filter`** :span[object]{.type-label}
  - **`FilterType`** :span[enum]{.type-label}  
    Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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
- **`ProjectId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Action": {
    "ActionType": "AutoDeploy",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Description": "string",
  "Filter": {
    "FilterType": "MachineFilter",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
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
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

## Delete an existing Project Trigger

:endpoint{method="DELETE" path="/api/\{spaceId\}/projects/\{projectId\}/triggers/\{id\}"}

Also reachable at `/api/projects/{projectId}/triggers/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/triggers/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the project trigger to delete.
- **`projectId`** :span[string]{.type-label} *(required)*  
  Id of the project to create a trigger in.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

**Response**

`200` — Confirmation that the Project Trigger was deleted

:::api-example{label="Response"}
```json
{}
```
:::

## Get a list of Project Triggers

:endpoint{method="GET" path="/api/\{spaceId\}/projecttriggers"}

Also reachable at `/api/projecttriggers`, `/api/spaces/{spaceIdentifier}/projecttriggers`.

Gets all the Project Triggers in the supplied Octopus Deploy Space, sorted by Id

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`runbooks`** :span[array of string]{.type-label}  
  A list of Runbook IDs, to limit the matching of Project Triggers to those with a particular Runbook ID. Example: ["Runbooks-1", "Runbooks-2"].
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Project Triggers

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Action`** :span[object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Filter`** :span[object]{.type-label}
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
  - **`ProjectId`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
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
      "Action": {
        "ActionType": "AutoDeploy",
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {}
      },
      "Description": "string",
      "Filter": {
        "FilterType": "MachineFilter",
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {}
      },
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
      "ProjectId": "string",
      "SpaceId": "string"
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

## Create a new project trigger

:endpoint{method="POST" path="/api/\{spaceId\}/projecttriggers"}

Also reachable at `/api/projecttriggers`, `/api/spaces/{spaceIdentifier}/projecttriggers`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

**Request Body**

- **`Action`** :span[object]{.type-label} *(required)*
  - **`ActionType`** :span[enum]{.type-label}  
    Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** :span[string]{.type-label}  
  Description for the project trigger.
- **`Filter`** :span[object]{.type-label} *(required)*
  - **`FilterType`** :span[enum]{.type-label}  
    Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`IsDisabled`** :span[boolean]{.type-label}  
  Disables the trigger from being run when set.
- **`Name`** :span[string]{.type-label} *(required)*  
  Name of the project trigger. Minimum length 1.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  Id of the project to create a trigger in.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

:::api-example{label="Request"}
```json
{
  "Action": {
    "ActionType": "AutoDeploy",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Description": "string",
  "Filter": {
    "FilterType": "MachineFilter",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "IsDisabled": true,
  "Name": "string",
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

**Response**

`201` — Created

- **`Action`** :span[object]{.type-label}
  - **`ActionType`** :span[enum]{.type-label}  
    Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** :span[string]{.type-label}
- **`Filter`** :span[object]{.type-label}
  - **`FilterType`** :span[enum]{.type-label}  
    Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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
- **`ProjectId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Action": {
    "ActionType": "AutoDeploy",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Description": "string",
  "Filter": {
    "FilterType": "MachineFilter",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
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
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

## Get a Project Trigger by ID

:endpoint{method="GET" path="/api/\{spaceId\}/projecttriggers/\{id\}"}

Also reachable at `/api/projecttriggers/{id}`, `/api/spaces/{spaceIdentifier}/projecttriggers/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Project Trigger to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

**Response**

`200` — The requested Project Trigger

- **`Action`** :span[object]{.type-label}
  - **`ActionType`** :span[enum]{.type-label}  
    Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** :span[string]{.type-label}
- **`Filter`** :span[object]{.type-label}
  - **`FilterType`** :span[enum]{.type-label}  
    Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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
- **`ProjectId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Action": {
    "ActionType": "AutoDeploy",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Description": "string",
  "Filter": {
    "FilterType": "MachineFilter",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
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
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

## Modify a ProjectTriggerResource by ID

:endpoint{method="PUT" path="/api/\{spaceId\}/projecttriggers/\{id\}"}

Also reachable at `/api/projecttriggers/{id}`, `/api/spaces/{spaceIdentifier}/projecttriggers/{id}`.

Updates an existing project trigger

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the project trigger.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

**Request Body**

- **`Action`** :span[object]{.type-label}
  - **`ActionType`** :span[enum]{.type-label}  
    Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** :span[string]{.type-label}  
  Description for the project trigger.
- **`Filter`** :span[object]{.type-label}
  - **`FilterType`** :span[enum]{.type-label}  
    Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Id`** :span[string]{.type-label} *(required)*  
  Id of the project trigger.
- **`IsDisabled`** :span[boolean]{.type-label}  
  Disables the trigger from being run when set.
- **`Name`** :span[string]{.type-label}  
  Name of the project trigger.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  ProjectId of the project trigger.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

:::api-example{label="Request"}
```json
{
  "Action": {
    "ActionType": "AutoDeploy",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Description": "string",
  "Filter": {
    "FilterType": "MachineFilter",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Id": "string",
  "IsDisabled": true,
  "Name": "string",
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Modified project trigger resource response

- **`Action`** :span[object]{.type-label}
  - **`ActionType`** :span[enum]{.type-label}  
    Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** :span[string]{.type-label}
- **`Filter`** :span[object]{.type-label}
  - **`FilterType`** :span[enum]{.type-label}  
    Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
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
- **`ProjectId`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Action": {
    "ActionType": "AutoDeploy",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Description": "string",
  "Filter": {
    "FilterType": "MachineFilter",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
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
  "ProjectId": "string",
  "SpaceId": "string"
}
```
:::

## Delete an existing Project Trigger

:endpoint{method="DELETE" path="/api/\{spaceId\}/projecttriggers/\{id\}"}

Also reachable at `/api/projecttriggers/{id}`, `/api/spaces/{spaceIdentifier}/projecttriggers/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the project trigger to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  Id of the space where the project is located.

**Response**

`200` — Confirmation that the Project Trigger was deleted

:::api-example{label="Response"}
```json
{}
```
:::
