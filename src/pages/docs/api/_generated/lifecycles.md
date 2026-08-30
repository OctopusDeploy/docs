---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Lifecycles
---

## List the Lifecycles in the supplied Octopus Deploy Space in pages. The results will be sorted alphabetically by name

:endpoint{method="GET" path="/api/\{spaceId\}/lifecycles"}

Also reachable at `/api/lifecycles`, `/api/spaces/{spaceIdentifier}/lifecycles`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}
- **`name`** :span[string]{.type-label}  
  The exact name of a Lifecycle to be matched.
- **`partialName`** :span[string]{.type-label}
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of lifecycles

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`Phases`** :span[array of object]{.type-label}
  - **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TentacleRetentionPolicy`** :span[object]{.type-label}
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
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      },
      "Slug": "string",
      "SpaceId": "Spaces-1",
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
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
:::

## Create a new Lifecycle

:endpoint{method="POST" path="/api/\{spaceId\}/lifecycles"}

Also reachable at `/api/lifecycles`, `/api/spaces/{spaceIdentifier}/lifecycles`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the Space for the Lifecycle.

**Request Body**

- **`Description`** :span[string]{.type-label}  
  A description of the Lifecycle.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the Lifecycle. Minimum length 1.
- **`Phases`** :span[array of object]{.type-label}  
  The promotion phases in order. Each phase lists environments deployed to automatically (AutomaticDeploymentTargets) or manually (OptionalDeploymentTargets); an environment may appear in only one phase, and at most one phase may list no environments, meaning all remaining environments. MinimumEnvironmentsBeforePromotion is how many of the phase's environments must be deployed before a release can progress (0 means all). IsOptionalPhase allows skipping the phase, but not every phase may be optional. Per-phase retention policies override the lifecycle-level ones. Leave each phase's Id blank; the server assigns it.
  - **`AutomaticDeploymentTargets`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsOptionalPhase`** :span[boolean]{.type-label}
  - **`IsPriorityPhase`** :span[boolean]{.type-label}
  - **`MinimumEnvironmentsBeforePromotion`** :span[integer]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OptionalDeploymentTargets`** :span[array of string]{.type-label}
  - **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`TentacleRetentionPolicy`** :span[object]{.type-label}
- **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`Slug`** :span[string]{.type-label}  
  A slug for the Lifecycle.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The id of the Space for the Lifecycle.
- **`TentacleRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Name": "string",
  "Phases": [
    {
      "AutomaticDeploymentTargets": [
        "Environments-1",
        "..."
      ],
      "Id": "string",
      "IsOptionalPhase": false,
      "IsPriorityPhase": false,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "Environments-1",
        "..."
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
:::

**Response**

`201` — Created

- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Phases`** :span[array of object]{.type-label}
  - **`AutomaticDeploymentTargets`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsOptionalPhase`** :span[boolean]{.type-label}
  - **`IsPriorityPhase`** :span[boolean]{.type-label}
  - **`MinimumEnvironmentsBeforePromotion`** :span[integer]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OptionalDeploymentTargets`** :span[array of string]{.type-label}
  - **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`TentacleRetentionPolicy`** :span[object]{.type-label}
- **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TentacleRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.

:::api-example{label="Response"}
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
        "Environments-1",
        "..."
      ],
      "Id": "string",
      "IsOptionalPhase": false,
      "IsPriorityPhase": false,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "Environments-1",
        "..."
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
:::

## List all the lifecycles in the supplied Octopus Deploy Space

:endpoint{method="GET" path="/api/\{spaceId\}/lifecycles/all"}

Also reachable at `/api/lifecycles/all`, `/api/spaces/{spaceIdentifier}/lifecycles/all`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — All of the lifecycles in the supplied Octopus Deploy Space.

- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Phases`** :span[array of object]{.type-label}
  - **`AutomaticDeploymentTargets`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsOptionalPhase`** :span[boolean]{.type-label}
  - **`IsPriorityPhase`** :span[boolean]{.type-label}
  - **`MinimumEnvironmentsBeforePromotion`** :span[integer]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OptionalDeploymentTargets`** :span[array of string]{.type-label}
  - **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`TentacleRetentionPolicy`** :span[object]{.type-label}
- **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TentacleRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.

:::api-example{label="Response"}
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
          "Environments-1",
          "..."
        ],
        "Id": "string",
        "IsOptionalPhase": false,
        "IsPriorityPhase": false,
        "MinimumEnvironmentsBeforePromotion": 0,
        "Name": "string",
        "OptionalDeploymentTargets": [
          "Environments-1",
          "..."
        ],
        "ReleaseRetentionPolicy": {},
        "TentacleRetentionPolicy": {}
      }
    ],
    "ReleaseRetentionPolicy": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": false,
      "Strategy": "string",
      "Unit": "Days"
    },
    "Slug": "string",
    "SpaceId": "Spaces-1",
    "TentacleRetentionPolicy": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": false,
      "Strategy": "string",
      "Unit": "Days"
    }
  }
]
```
:::

## Get a list of Lifecycle previews

:endpoint{method="GET" path="/api/\{spaceId\}/lifecycles/previews"}

Also reachable at `/api/lifecycles/previews`, `/api/spaces/{spaceIdentifier}/lifecycles/previews`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The Space ID of the Lifecycles.

**Query Parameters**

- **`ids`** :span[array of string]{.type-label} *(required)*  
  The IDs of the Lifecycles to retrieve.

**Response**

`200` — Get a list of Lifecycle previews

- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Phases`** :span[array of object]{.type-label}
  - **`AutomaticDeploymentTargets`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsOptionalPhase`** :span[boolean]{.type-label}
  - **`IsPriorityPhase`** :span[boolean]{.type-label}
  - **`MinimumEnvironmentsBeforePromotion`** :span[integer]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OptionalDeploymentTargets`** :span[array of string]{.type-label}
  - **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`TentacleRetentionPolicy`** :span[object]{.type-label}
- **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TentacleRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.

:::api-example{label="Response"}
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
          "Environments-1",
          "..."
        ],
        "Id": "string",
        "IsOptionalPhase": false,
        "IsPriorityPhase": false,
        "MinimumEnvironmentsBeforePromotion": 0,
        "Name": "string",
        "OptionalDeploymentTargets": [
          "Environments-1",
          "..."
        ],
        "ReleaseRetentionPolicy": {},
        "TentacleRetentionPolicy": {}
      }
    ],
    "ReleaseRetentionPolicy": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": false,
      "Strategy": "string",
      "Unit": "Days"
    },
    "Slug": "string",
    "SpaceId": "Spaces-1",
    "TentacleRetentionPolicy": {
      "QuantityToKeep": 0,
      "ShouldKeepForever": false,
      "Strategy": "string",
      "Unit": "Days"
    }
  }
]
```
:::

## Get a specific Lifecycle

:endpoint{method="GET" path="/api/\{spaceId\}/lifecycles/\{id\}"}

Also reachable at `/api/lifecycles/{id}`, `/api/spaces/{spaceIdentifier}/lifecycles/{id}`.

This request does not support getting Lifecycles that belong to Templated Projects

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Lifecycle

- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Phases`** :span[array of object]{.type-label}
  - **`AutomaticDeploymentTargets`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsOptionalPhase`** :span[boolean]{.type-label}
  - **`IsPriorityPhase`** :span[boolean]{.type-label}
  - **`MinimumEnvironmentsBeforePromotion`** :span[integer]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OptionalDeploymentTargets`** :span[array of string]{.type-label}
  - **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`TentacleRetentionPolicy`** :span[object]{.type-label}
- **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TentacleRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.

:::api-example{label="Response"}
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
        "Environments-1",
        "..."
      ],
      "Id": "string",
      "IsOptionalPhase": false,
      "IsPriorityPhase": false,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "Environments-1",
        "..."
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
:::

## Modify a Lifecycle

:endpoint{method="PUT" path="/api/\{spaceId\}/lifecycles/\{id\}"}

Also reachable at `/api/lifecycles/{id}`, `/api/spaces/{spaceIdentifier}/lifecycles/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The Id of the Lifecycle to modify.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the Space for the Lifecycle.

**Request Body**

- **`Description`** :span[string]{.type-label}  
  A description of the Lifecycle.
- **`Id`** :span[string]{.type-label} *(required)*  
  The Id of the Lifecycle to modify.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the Lifecycle. Minimum length 1.
- **`Phases`** :span[array of object]{.type-label}  
  The complete list of promotion phases in order; existing phases not resubmitted are deleted. Each phase lists environments deployed to automatically (AutomaticDeploymentTargets) or manually (OptionalDeploymentTargets); an environment may appear in only one phase, and at most one phase may list no environments, meaning all remaining environments. MinimumEnvironmentsBeforePromotion is how many of the phase's environments must be deployed before a release can progress (0 means all). IsOptionalPhase allows skipping the phase, but not every phase may be optional. Per-phase retention policies override the lifecycle-level ones.
  - **`AutomaticDeploymentTargets`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsOptionalPhase`** :span[boolean]{.type-label}
  - **`IsPriorityPhase`** :span[boolean]{.type-label}
  - **`MinimumEnvironmentsBeforePromotion`** :span[integer]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OptionalDeploymentTargets`** :span[array of string]{.type-label}
  - **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`TentacleRetentionPolicy`** :span[object]{.type-label}
- **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`Slug`** :span[string]{.type-label}  
  The slug of the Lifecycle.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The id of the Space for the Lifecycle.
- **`TentacleRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Id": "Lifecycles-1",
  "Name": "string",
  "Phases": [
    {
      "AutomaticDeploymentTargets": [
        "Environments-1",
        "..."
      ],
      "Id": "string",
      "IsOptionalPhase": false,
      "IsPriorityPhase": false,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "Environments-1",
        "..."
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
:::

**Response**

`200` — Contains a Lifecycle resource which represents changes to the Lifecycle.

- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Phases`** :span[array of object]{.type-label}
  - **`AutomaticDeploymentTargets`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsOptionalPhase`** :span[boolean]{.type-label}
  - **`IsPriorityPhase`** :span[boolean]{.type-label}
  - **`MinimumEnvironmentsBeforePromotion`** :span[integer]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OptionalDeploymentTargets`** :span[array of string]{.type-label}
  - **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`TentacleRetentionPolicy`** :span[object]{.type-label}
- **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TentacleRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.

:::api-example{label="Response"}
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
        "Environments-1",
        "..."
      ],
      "Id": "string",
      "IsOptionalPhase": false,
      "IsPriorityPhase": false,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "Environments-1",
        "..."
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
:::

## Delete an existing Lifecycle

:endpoint{method="DELETE" path="/api/\{spaceId\}/lifecycles/\{id\}"}

Also reachable at `/api/lifecycles/{id}`, `/api/spaces/{spaceIdentifier}/lifecycles/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the lifecycle to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

:::api-example{label="Response"}
```json
{}
```
:::

## Get a Lifecycle preview by Lifecycle id

:endpoint{method="GET" path="/api/\{spaceId\}/lifecycles/\{id\}/preview"}

Also reachable at `/api/lifecycles/{id}/preview`, `/api/spaces/{spaceIdentifier}/lifecycles/{id}/preview`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the Lifecycle.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space for the Lifecycle.

**Response**

`200` — Returns a Lifecycle preview

- **`Description`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`Phases`** :span[array of object]{.type-label}
  - **`AutomaticDeploymentTargets`** :span[array of string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsOptionalPhase`** :span[boolean]{.type-label}
  - **`IsPriorityPhase`** :span[boolean]{.type-label}
  - **`MinimumEnvironmentsBeforePromotion`** :span[integer]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OptionalDeploymentTargets`** :span[array of string]{.type-label}
  - **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`TentacleRetentionPolicy`** :span[object]{.type-label}
- **`ReleaseRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TentacleRetentionPolicy`** :span[object]{.type-label}
  - **`QuantityToKeep`** :span[integer]{.type-label}
  - **`ShouldKeepForever`** :span[boolean]{.type-label}
  - **`Strategy`** :span[string]{.type-label}
  - **`Unit`** :span[enum]{.type-label}  
    Allowed values: `Days`, `Items`.

:::api-example{label="Response"}
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
        "Environments-1",
        "..."
      ],
      "Id": "string",
      "IsOptionalPhase": false,
      "IsPriorityPhase": false,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "Environments-1",
        "..."
      ],
      "ReleaseRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      },
      "TentacleRetentionPolicy": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": false,
        "Strategy": "string",
        "Unit": "Days"
      }
    }
  ],
  "ReleaseRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  },
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "TentacleRetentionPolicy": {
    "QuantityToKeep": 0,
    "ShouldKeepForever": false,
    "Strategy": "string",
    "Unit": "Days"
  }
}
```
:::

## Get all projects that use this lifecycle

:endpoint{method="GET" path="/api/\{spaceId\}/lifecycles/\{id\}/projects"}

Also reachable at `/api/lifecycles/{id}/projects`, `/api/spaces/{spaceIdentifier}/lifecycles/{id}/projects`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the Lifecycle.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space for the Lifecycle and projects.

**Response**

`200` — Get all projects that use this lifecycle.

- **`AllowIgnoreChannelRules`** :span[boolean]{.type-label}
- **`AutoCreateRelease`** :span[boolean]{.type-label}
- **`AutoDeployReleaseOverrides`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ReleaseId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`ClonedFromProjectId`** :span[string]{.type-label}
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** :span[boolean]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** :span[string]{.type-label}
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`DeploymentProcessId`** :span[string]{.type-label}
- **`DeprovisioningRunbookId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`DiscreteChannelRelease`** :span[boolean]{.type-label}  
  Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** :span[boolean]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IncludedLibraryVariableSetIds`** :span[array of string]{.type-label}  
  Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** :span[boolean]{.type-label}
- **`IsDisabled`** :span[boolean]{.type-label}
- **`IsVersionControlled`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`PersistenceSettings`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`ProjectGroupId`** :span[string]{.type-label}
- **`ProjectTags`** :span[array of string]{.type-label}  
  List of tags assigned to this project.
- **`ProjectTemplateDetails`** :span[object]{.type-label}
  - **`IsShared`** :span[boolean]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`VersionMask`** :span[string]{.type-label}  
    Minimum length 1.
- **`ProvisioningRunbookId`** :span[string]{.type-label}
- **`ReleaseCreationStrategy`** :span[object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`ReleaseCreationPackage`** :span[object]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Templates`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`TenantedDeploymentMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VariableSetId`** :span[string]{.type-label}
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
[
  {
    "AllowIgnoreChannelRules": false,
    "AutoCreateRelease": false,
    "AutoDeployReleaseOverrides": [
      {
        "EnvironmentId": "string",
        "ReleaseId": "string",
        "TenantId": "Tenants-1"
      }
    ],
    "ClonedFromProjectId": "Projects-1",
    "CombineHealthAndSyncStatusInDashboardLiveStatus": false,
    "DefaultGuidedFailureMode": "EnvironmentDefault",
    "DefaultPowerShellEdition": "string",
    "DefaultToSkipIfAlreadyInstalled": false,
    "DeploymentChangesTemplate": "string",
    "DeploymentProcessId": "string",
    "DeprovisioningRunbookId": "Runbooks-1",
    "Description": "string",
    "DiscreteChannelRelease": false,
    "ExecuteDeploymentsOnEventBasedPipeline": false,
    "ExtensionSettings": [
      {
        "ExtensionId": "string",
        "Values": "string"
      }
    ],
    "ForcePackageDownload": false,
    "Icon": {
      "Color": "string",
      "Id": "string"
    },
    "Id": "string",
    "IncludedLibraryVariableSetIds": [
      "string"
    ],
    "IsBadgesEnabled": false,
    "IsDisabled": false,
    "IsVersionControlled": false,
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
      "AllowDeploymentsToNoTargets": false,
      "ExcludeUnhealthyTargets": false,
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
      "IsShared": false,
      "Slug": "string",
      "VersionMask": "string"
    },
    "ProvisioningRunbookId": "Runbooks-1",
    "ReleaseCreationStrategy": {
      "ChannelId": "string",
      "ReleaseCreationPackage": {
        "DeploymentAction": "string",
        "PackageReference": "string"
      }
    },
    "ReleaseNotesTemplate": "string",
    "Slug": "string",
    "SpaceId": "Spaces-1",
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
:::
