---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Lifecycles
---

## A paginated list of the Lifecycles in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

`GET` `/api/{spaceId}/lifecycles`

Also reachable at `/api/lifecycles`, `/api/spaces/{spaceIdentifier}/lifecycles`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`ids`** <span class="type-label">array of string</span>
- **`name`** <span class="type-label">string</span> — The exact name of a Lifecycle to be matched.
- **`partialName`** <span class="type-label">string</span>
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of lifecycles

`LifecycleResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`Phases`** <span class="type-label">array of object</span>
  - **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TentacleRetentionPolicy`** <span class="type-label">object</span>
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
      "Description": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "Phases": [
        {}
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "Slug": "string",
      "SpaceId": "string",
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      }
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

## Create a new Lifecycle

`POST` `/api/{spaceId}/lifecycles`

Also reachable at `/api/lifecycles`, `/api/spaces/{spaceIdentifier}/lifecycles`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the Space for the Lifecycle.

**Request Body**

`CreateLifecycleCommand`

- **`Description`** <span class="type-label">string</span> — A description of the Lifecycle.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the Lifecycle. Minimum length 1.
- **`Phases`** <span class="type-label">array of object</span> — The promotion phases in order. Each phase lists environments deployed to automatically (AutomaticDeploymentTargets) or manually (OptionalDeploymentTargets); an environment may appear in only one phase, and at most one phase may list no environments, meaning all remaining environments. MinimumEnvironmentsBeforePromotion is how many of the phase's environments must be deployed before a release can progress (0 means all). IsOptionalPhase allows skipping the phase, but not every phase may be optional. Per-phase retention policies override the lifecycle-level ones. Leave each phase's Id blank; the server assigns it.
  - **`AutomaticDeploymentTargets`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsOptionalPhase`** <span class="type-label">boolean</span>
  - **`IsPriorityPhase`** <span class="type-label">boolean</span>
  - **`MinimumEnvironmentsBeforePromotion`** <span class="type-label">integer</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OptionalDeploymentTargets`** <span class="type-label">array of string</span>
  - **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`TentacleRetentionPolicy`** <span class="type-label">object</span>
- **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`Slug`** <span class="type-label">string</span> — A slug for the Lifecycle.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The id of the Space for the Lifecycle.
- **`TentacleRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.

<div data-example="Request">

```json
{
  "Description": "string",
  "Name": "string",
  "Phases": [
    {
      "AutomaticDeploymentTargets": [
        "string"
      ],
      "Id": "string",
      "IsOptionalPhase": true,
      "IsPriorityPhase": true,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "string"
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "string",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
</div>

**Response**

`201` — Created

`LifecycleResource`.

- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Phases`** <span class="type-label">array of object</span>
  - **`AutomaticDeploymentTargets`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsOptionalPhase`** <span class="type-label">boolean</span>
  - **`IsPriorityPhase`** <span class="type-label">boolean</span>
  - **`MinimumEnvironmentsBeforePromotion`** <span class="type-label">integer</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OptionalDeploymentTargets`** <span class="type-label">array of string</span>
  - **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`TentacleRetentionPolicy`** <span class="type-label">object</span>
- **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TentacleRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.

<div data-example="Response">

```json
{
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Phases": [
    {
      "AutomaticDeploymentTargets": [
        "string"
      ],
      "Id": "string",
      "IsOptionalPhase": true,
      "IsPriorityPhase": true,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "string"
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "string",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
</div>

## Lists all the lifecycles in the supplied Octopus Deploy Space

`GET` `/api/{spaceId}/lifecycles/all`

Also reachable at `/api/lifecycles/all`, `/api/spaces/{spaceIdentifier}/lifecycles/all`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — All of the lifecycles in the supplied Octopus Deploy Space.

an array of `LifecycleResource`.

- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Phases`** <span class="type-label">array of object</span>
  - **`AutomaticDeploymentTargets`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsOptionalPhase`** <span class="type-label">boolean</span>
  - **`IsPriorityPhase`** <span class="type-label">boolean</span>
  - **`MinimumEnvironmentsBeforePromotion`** <span class="type-label">integer</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OptionalDeploymentTargets`** <span class="type-label">array of string</span>
  - **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`TentacleRetentionPolicy`** <span class="type-label">object</span>
- **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TentacleRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.

<div data-example="Response">

```json
[
  {
    "Description": "string",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "Phases": [
      {
        "AutomaticDeploymentTargets": [
          "string"
        ],
        "Id": "string",
        "IsOptionalPhase": true,
        "IsPriorityPhase": true,
        "MinimumEnvironmentsBeforePromotion": 0,
        "Name": "string",
        "OptionalDeploymentTargets": [
          "string"
        ],
        "ReleaseRetentionPolicy": {},
        "TentacleRetentionPolicy": {}
      }
    ],
    "ReleaseRetentionPolicy": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": true,
      "Strategy": "string",
      "Unit": "Days"
    },
    "Slug": "string",
    "SpaceId": "string",
    "TentacleRetentionPolicy": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": true,
      "Strategy": "string",
      "Unit": "Days"
    }
  }
]
```
</div>

## Get a list of Lifecycle previews

`GET` `/api/{spaceId}/lifecycles/previews`

Also reachable at `/api/lifecycles/previews`, `/api/spaces/{spaceIdentifier}/lifecycles/previews`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The Space ID of the Lifecycles.

- **`ids`** <span class="type-label">array of string</span> *(required)* — The IDs of the Lifecycles to retrieve.

**Response**

`200` — Get a list of Lifecycle previews

an array of `LifecycleResource`.

- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Phases`** <span class="type-label">array of object</span>
  - **`AutomaticDeploymentTargets`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsOptionalPhase`** <span class="type-label">boolean</span>
  - **`IsPriorityPhase`** <span class="type-label">boolean</span>
  - **`MinimumEnvironmentsBeforePromotion`** <span class="type-label">integer</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OptionalDeploymentTargets`** <span class="type-label">array of string</span>
  - **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`TentacleRetentionPolicy`** <span class="type-label">object</span>
- **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TentacleRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.

<div data-example="Response">

```json
[
  {
    "Description": "string",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "Phases": [
      {
        "AutomaticDeploymentTargets": [
          "string"
        ],
        "Id": "string",
        "IsOptionalPhase": true,
        "IsPriorityPhase": true,
        "MinimumEnvironmentsBeforePromotion": 0,
        "Name": "string",
        "OptionalDeploymentTargets": [
          "string"
        ],
        "ReleaseRetentionPolicy": {},
        "TentacleRetentionPolicy": {}
      }
    ],
    "ReleaseRetentionPolicy": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": true,
      "Strategy": "string",
      "Unit": "Days"
    },
    "Slug": "string",
    "SpaceId": "string",
    "TentacleRetentionPolicy": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": true,
      "Strategy": "string",
      "Unit": "Days"
    }
  }
]
```
</div>

## Gets a specific Lifecycle

`GET` `/api/{spaceId}/lifecycles/{id}`

Also reachable at `/api/lifecycles/{id}`, `/api/spaces/{spaceIdentifier}/lifecycles/{id}`.

This request does not support getting Lifecycles that belong to Templated Projects

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Lifecycle

`LifecycleResource`.

- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Phases`** <span class="type-label">array of object</span>
  - **`AutomaticDeploymentTargets`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsOptionalPhase`** <span class="type-label">boolean</span>
  - **`IsPriorityPhase`** <span class="type-label">boolean</span>
  - **`MinimumEnvironmentsBeforePromotion`** <span class="type-label">integer</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OptionalDeploymentTargets`** <span class="type-label">array of string</span>
  - **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`TentacleRetentionPolicy`** <span class="type-label">object</span>
- **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TentacleRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.

<div data-example="Response">

```json
{
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Phases": [
    {
      "AutomaticDeploymentTargets": [
        "string"
      ],
      "Id": "string",
      "IsOptionalPhase": true,
      "IsPriorityPhase": true,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "string"
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "string",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
</div>

## Modify a Lifecycle

`PUT` `/api/{spaceId}/lifecycles/{id}`

Also reachable at `/api/lifecycles/{id}`, `/api/spaces/{spaceIdentifier}/lifecycles/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The Id of the Lifecycle to modify.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the Space for the Lifecycle.

**Request Body**

`ModifyLifecycleCommand`

- **`Description`** <span class="type-label">string</span> — A description of the Lifecycle.
- **`Id`** <span class="type-label">string</span> *(required)* — The Id of the Lifecycle to modify.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the Lifecycle. Minimum length 1.
- **`Phases`** <span class="type-label">array of object</span> — The complete list of promotion phases in order; existing phases not resubmitted are deleted. Each phase lists environments deployed to automatically (AutomaticDeploymentTargets) or manually (OptionalDeploymentTargets); an environment may appear in only one phase, and at most one phase may list no environments, meaning all remaining environments. MinimumEnvironmentsBeforePromotion is how many of the phase's environments must be deployed before a release can progress (0 means all). IsOptionalPhase allows skipping the phase, but not every phase may be optional. Per-phase retention policies override the lifecycle-level ones.
  - **`AutomaticDeploymentTargets`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsOptionalPhase`** <span class="type-label">boolean</span>
  - **`IsPriorityPhase`** <span class="type-label">boolean</span>
  - **`MinimumEnvironmentsBeforePromotion`** <span class="type-label">integer</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OptionalDeploymentTargets`** <span class="type-label">array of string</span>
  - **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`TentacleRetentionPolicy`** <span class="type-label">object</span>
- **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`Slug`** <span class="type-label">string</span> — The slug of the Lifecycle.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The id of the Space for the Lifecycle.
- **`TentacleRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.

<div data-example="Request">

```json
{
  "Description": "string",
  "Id": "string",
  "Name": "string",
  "Phases": [
    {
      "AutomaticDeploymentTargets": [
        "string"
      ],
      "Id": "string",
      "IsOptionalPhase": true,
      "IsPriorityPhase": true,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "string"
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "string",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
</div>

**Response**

`200` — Contains a Lifecycle resource which represents changes to the Lifecycle.

`LifecycleResource`.

- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Phases`** <span class="type-label">array of object</span>
  - **`AutomaticDeploymentTargets`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsOptionalPhase`** <span class="type-label">boolean</span>
  - **`IsPriorityPhase`** <span class="type-label">boolean</span>
  - **`MinimumEnvironmentsBeforePromotion`** <span class="type-label">integer</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OptionalDeploymentTargets`** <span class="type-label">array of string</span>
  - **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`TentacleRetentionPolicy`** <span class="type-label">object</span>
- **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TentacleRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.

<div data-example="Response">

```json
{
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Phases": [
    {
      "AutomaticDeploymentTargets": [
        "string"
      ],
      "Id": "string",
      "IsOptionalPhase": true,
      "IsPriorityPhase": true,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "string"
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "string",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
</div>

## Deletes an existing Lifecycle

`DELETE` `/api/{spaceId}/lifecycles/{id}`

Also reachable at `/api/lifecycles/{id}`, `/api/spaces/{spaceIdentifier}/lifecycles/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the lifecycle to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

`DeleteLifecycleResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Gets a Lifecycle preview by Lifecycle id

`GET` `/api/{spaceId}/lifecycles/{id}/preview`

Also reachable at `/api/lifecycles/{id}/preview`, `/api/spaces/{spaceIdentifier}/lifecycles/{id}/preview`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the Lifecycle.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space for the Lifecycle.

**Response**

`200` — Returns a Lifecycle preview

`LifecycleResource`.

- **`Description`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`Phases`** <span class="type-label">array of object</span>
  - **`AutomaticDeploymentTargets`** <span class="type-label">array of string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsOptionalPhase`** <span class="type-label">boolean</span>
  - **`IsPriorityPhase`** <span class="type-label">boolean</span>
  - **`MinimumEnvironmentsBeforePromotion`** <span class="type-label">integer</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OptionalDeploymentTargets`** <span class="type-label">array of string</span>
  - **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`TentacleRetentionPolicy`** <span class="type-label">object</span>
- **`ReleaseRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TentacleRetentionPolicy`** <span class="type-label">object</span>
  - **`QuantityToKeep`** <span class="type-label">integer</span>
  - **`ShouldKeepForever`** <span class="type-label">boolean</span>
  - **`Strategy`** <span class="type-label">string</span>
  - **`Unit`** <span class="type-label">enum</span> — Allowed values: `Days`, `Items`.

<div data-example="Response">

```json
{
  "Description": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "Phases": [
    {
      "AutomaticDeploymentTargets": [
        "string"
      ],
      "Id": "string",
      "IsOptionalPhase": true,
      "IsPriorityPhase": true,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "string"
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "string",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": true,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
</div>

## Gets all projects that use this lifecycle

`GET` `/api/{spaceId}/lifecycles/{id}/projects`

Also reachable at `/api/lifecycles/{id}/projects`, `/api/spaces/{spaceIdentifier}/lifecycles/{id}/projects`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the Lifecycle.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space for the Lifecycle and projects.

**Response**

`200` — Gets all projects that use this lifecycle.

an array of `ProjectResource`.

- **`AllowIgnoreChannelRules`** <span class="type-label">boolean</span>
- **`AutoCreateRelease`** <span class="type-label">boolean</span>
- **`AutoDeployReleaseOverrides`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ReleaseId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`ClonedFromProjectId`** <span class="type-label">string</span>
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** <span class="type-label">boolean</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** <span class="type-label">string</span>
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`DeploymentProcessId`** <span class="type-label">string</span>
- **`DeprovisioningRunbookId`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`DiscreteChannelRelease`** <span class="type-label">boolean</span> — Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** <span class="type-label">boolean</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IncludedLibraryVariableSetIds`** <span class="type-label">array of string</span> — Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** <span class="type-label">boolean</span>
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`IsVersionControlled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`PersistenceSettings`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`ProjectGroupId`** <span class="type-label">string</span>
- **`ProjectTags`** <span class="type-label">array of string</span> — List of tags assigned to this project.
- **`ProjectTemplateDetails`** <span class="type-label">object</span>
  - **`IsShared`** <span class="type-label">boolean</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`VersionMask`** <span class="type-label">string</span> — Minimum length 1.
- **`ProvisioningRunbookId`** <span class="type-label">string</span>
- **`ReleaseCreationStrategy`** <span class="type-label">object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`ReleaseCreationPackage`** <span class="type-label">object</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Templates`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VariableSetId`** <span class="type-label">string</span>
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "AllowIgnoreChannelRules": true,
    "AutoCreateRelease": true,
    "AutoDeployReleaseOverrides": [
      {
        "EnvironmentId": "string",
        "ReleaseId": "string",
        "TenantId": "string"
      }
    ],
    "ClonedFromProjectId": "string",
    "CombineHealthAndSyncStatusInDashboardLiveStatus": true,
    "DefaultGuidedFailureMode": "EnvironmentDefault",
    "DefaultPowerShellEdition": "string",
    "DefaultToSkipIfAlreadyInstalled": true,
    "DeploymentChangesTemplate": "string",
    "DeploymentProcessId": "string",
    "DeprovisioningRunbookId": "string",
    "Description": "string",
    "DiscreteChannelRelease": true,
    "ExecuteDeploymentsOnEventBasedPipeline": true,
    "ExtensionSettings": [
      {
        "ExtensionId": "string",
        "Values": "string"
      }
    ],
    "ForcePackageDownload": true,
    "Icon": {
      "Color": "string",
      "Id": "string"
    },
    "Id": "string",
    "IncludedLibraryVariableSetIds": [
      "string"
    ],
    "IsBadgesEnabled": true,
    "IsDisabled": true,
    "IsVersionControlled": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "LifecycleId": "string",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "PersistenceSettings": {
      "Type": "Database"
    },
    "ProjectConnectivityPolicy": {
      "AllowDeploymentsToNoTargets": true,
      "ExcludeUnhealthyTargets": true,
      "SkipMachineBehavior": "None",
      "TargetRoles": [
        "string"
      ]
    },
    "ProjectGroupId": "string",
    "ProjectTags": [
      "string"
    ],
    "ProjectTemplateDetails": {
      "IsShared": true,
      "Slug": "string",
      "VersionMask": "string"
    },
    "ProvisioningRunbookId": "string",
    "ReleaseCreationStrategy": {
      "ChannelId": "string",
      "ReleaseCreationPackage": {
        "DeploymentAction": "string",
        "PackageReference": "string"
      }
    },
    "ReleaseNotesTemplate": "string",
    "Slug": "string",
    "SpaceId": "string",
    "Templates": [
      {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      }
    ],
    "TenantedDeploymentMode": "Untenanted",
    "VariableSetId": "string",
    "VersioningStrategy": {
      "DonorPackage": {
        "DeploymentAction": "string",
        "PackageReference": "string"
      },
      "Template": "string"
    }
  }
]
```
</div>
