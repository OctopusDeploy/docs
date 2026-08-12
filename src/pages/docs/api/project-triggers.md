---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Project Triggers
---

## Gets Project Triggers within a given Project

`GET` `/api/{spaceId}/projects/{projectId}/triggers`

Also reachable at `/api/projects/{projectId}/triggers`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/triggers`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project to get Project Triggers for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`runbookTags`** <span class="type-label">array of string</span> — A list of Runbook Tags to filter tag based triggers. Tag based triggers matching any of these tags will be included.
- **`runbooks`** <span class="type-label">array of string</span> — A list of Runbook IDs, to limit the matching of Project Triggers to those with a particular Runbook ID. Example: ["Runbooks-1", "Runbooks-2"].
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`triggerActionCategory`** <span class="type-label">enum</span> — Filters the Project Triggers using the specified Trigger Action Category. Allowed values: `Deployment`, `Runbook`.
- **`triggerActionType`** <span class="type-label">enum</span> — Filters the Project Triggers using the specified Trigger Action Type. Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.

**Response**

`200` — The requested list of Project Triggers

`ProjectTriggerResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Action`** <span class="type-label">object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Filter`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
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
</div>

## Creates a new project trigger

`POST` `/api/{spaceId}/projects/{projectId}/triggers`

Also reachable at `/api/projects/{projectId}/triggers`, `/api/projecttriggers`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/triggers`, `/api/spaces/{spaceIdentifier}/projecttriggers`, `/api/{spaceId}/projecttriggers`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — Id of the project to create a trigger in.
- **`spaceId`** <span class="type-label">string</span> *(required)* — Id of the space where the project is located.

**Request Body**

`CreateProjectTriggerCommand`

- **`Action`** <span class="type-label">object</span> *(required)*
  - **`ActionType`** <span class="type-label">enum</span> — Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** <span class="type-label">string</span> — Description for the project trigger.
- **`Filter`** <span class="type-label">object</span> *(required)*
  - **`FilterType`** <span class="type-label">enum</span> — Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`IsDisabled`** <span class="type-label">boolean</span> — Disables the trigger from being run when set.
- **`Name`** <span class="type-label">string</span> *(required)* — Name of the project trigger. Minimum length 1.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — Id of the project to create a trigger in.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — Id of the space where the project is located.

<div data-example="Request">

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
</div>

**Response**

`201` — Created

`ProjectTriggerResource`.

- **`Action`** <span class="type-label">object</span>
  - **`ActionType`** <span class="type-label">enum</span> — Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** <span class="type-label">string</span>
- **`Filter`** <span class="type-label">object</span>
  - **`FilterType`** <span class="type-label">enum</span> — Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Get project trigger by project id and trigger id

`GET` `/api/{spaceId}/projects/{projectId}/triggers/{id}`

Also reachable at `/api/projects/{projectId}/triggers/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/triggers/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Project Trigger to load.
- **`projectId`** <span class="type-label">string</span> *(required)* — Id of the project that trigger is in.
- **`spaceId`** <span class="type-label">string</span> *(required)* — Id of the space where the project is located.

**Response**

`200` — The requested Project Trigger

`ProjectTriggerResource`.

- **`Action`** <span class="type-label">object</span>
  - **`ActionType`** <span class="type-label">enum</span> — Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** <span class="type-label">string</span>
- **`Filter`** <span class="type-label">object</span>
  - **`FilterType`** <span class="type-label">enum</span> — Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Modify a ProjectTriggerResource by ID

`PUT` `/api/{spaceId}/projects/{projectId}/triggers/{id}`

Also reachable at `/api/projects/{projectId}/triggers/{id}`, `/api/projecttriggers/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/triggers/{id}`, `/api/spaces/{spaceIdentifier}/projecttriggers/{id}`, `/api/{spaceId}/projecttriggers/{id}`.

Updates an existing project trigger

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the project trigger.
- **`projectId`** <span class="type-label">string</span> *(required)* — ProjectId of the project trigger.
- **`spaceId`** <span class="type-label">string</span> *(required)* — Id of the space where the project is located.

**Request Body**

`ModifyProjectTriggerCommand`

- **`Action`** <span class="type-label">object</span>
  - **`ActionType`** <span class="type-label">enum</span> — Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** <span class="type-label">string</span> — Description for the project trigger.
- **`Filter`** <span class="type-label">object</span>
  - **`FilterType`** <span class="type-label">enum</span> — Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Id`** <span class="type-label">string</span> *(required)* — Id of the project trigger.
- **`IsDisabled`** <span class="type-label">boolean</span> — Disables the trigger from being run when set.
- **`Name`** <span class="type-label">string</span> — Name of the project trigger.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — ProjectId of the project trigger.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — Id of the space where the project is located.

<div data-example="Request">

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
</div>

**Response**

`200` — Modified project trigger resource response

`ProjectTriggerResource`.

- **`Action`** <span class="type-label">object</span>
  - **`ActionType`** <span class="type-label">enum</span> — Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** <span class="type-label">string</span>
- **`Filter`** <span class="type-label">object</span>
  - **`FilterType`** <span class="type-label">enum</span> — Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Deletes an existing Project Trigger

`DELETE` `/api/{spaceId}/projects/{projectId}/triggers/{id}`

Also reachable at `/api/projects/{projectId}/triggers/{id}`, `/api/projecttriggers/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/triggers/{id}`, `/api/spaces/{spaceIdentifier}/projecttriggers/{id}`, `/api/{spaceId}/projecttriggers/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the project trigger to delete.
- **`projectId`** <span class="type-label">string</span> *(required)* — Id of the project to create a trigger in.
- **`spaceId`** <span class="type-label">string</span> *(required)* — Id of the space where the project is located.

**Response**

`200` — Confirmation that the Project Trigger was deleted

`DeleteProjectTriggerResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Get a list of Project Triggers

`GET` `/api/{spaceId}/projecttriggers`

Also reachable at `/api/projecttriggers`, `/api/spaces/{spaceIdentifier}/projecttriggers`.

Gets all the Project Triggers in the supplied Octopus Deploy Space, sorted by Id

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`runbooks`** <span class="type-label">array of string</span> — A list of Runbook IDs, to limit the matching of Project Triggers to those with a particular Runbook ID. Example: ["Runbooks-1", "Runbooks-2"].
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Project Triggers

`ProjectTriggerResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Action`** <span class="type-label">object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Filter`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
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
</div>

## Get a Project Trigger by ID

`GET` `/api/{spaceId}/projecttriggers/{id}`

Also reachable at `/api/projecttriggers/{id}`, `/api/spaces/{spaceIdentifier}/projecttriggers/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Project Trigger to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — Id of the space where the project is located.

**Response**

`200` — The requested Project Trigger

`ProjectTriggerResource`.

- **`Action`** <span class="type-label">object</span>
  - **`ActionType`** <span class="type-label">enum</span> — Allowed values: `AutoDeploy`, `DeployLatestRelease`, `DeployNewRelease`, `DeployLatestReleaseToEnvironment`, `RunRunbook`, `CreateRelease`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Description`** <span class="type-label">string</span>
- **`Filter`** <span class="type-label">object</span>
  - **`FilterType`** <span class="type-label">enum</span> — Allowed values: `MachineFilter`, `DailySchedule`, `DaysPerWeekSchedule`, `DaysPerMonthSchedule`, `CronExpressionSchedule`, `OnceDailySchedule`, `ContinuousDailySchedule`, `FeedFilter`, `ArcFeedFilter`, `GitFilter`, `WebhookFilter`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>
