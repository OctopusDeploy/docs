---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Project Groups
---

## Gets a paginated list of the Project Groups in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

`GET` `/api/{spaceId}/projectgroups`

Also reachable at `/api/projectgroups`, `/api/spaces/{spaceIdentifier}/projectgroups`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`ids`** <span class="type-label">array of string</span> — A comma separated list of Project Group IDs to filter on.
- **`name`** <span class="type-label">string</span> — The exact name of a Project Group to be matched.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to limit the set of retrieved Project Groups to. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of the Project Groups in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

`ProjectGroupResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`EnvironmentIds`** <span class="type-label">array of string</span> — Gets or sets a collection of environment ID's. If this collection is empty, projects in this group can be deployed to any environment. If the collection is non-empty, then projects in the group are limited to only deploying to the environments listed in this collection. Obsolete. Environments are now controlled by lifecycles as of Oct 2014, version 2.6.5.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Gets or sets the name of this project group.
  - **`RetentionPolicyId`** <span class="type-label">string</span> — Gets or sets the ID of the retention policy that will apply to projects in this group.
  - **`Slug`** <span class="type-label">string</span>
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
      "Description": "string",
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
      "Name": "string",
      "RetentionPolicyId": "string",
      "Slug": "string",
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

## Creates a new project group

`POST` `/api/{spaceId}/projectgroups`

Also reachable at `/api/projectgroups`, `/api/spaces/{spaceIdentifier}/projectgroups`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`CreateProjectGroupCommand`

- **`Description`** <span class="type-label">string</span> — The description of the project group.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the project group. Minimum length 1.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "Description": "string",
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

`ProjectGroupResource`.

- **`Description`** <span class="type-label">string</span>
- **`EnvironmentIds`** <span class="type-label">array of string</span> — Gets or sets a collection of environment ID's. If this collection is empty, projects in this group can be deployed to any environment. If the collection is non-empty, then projects in the group are limited to only deploying to the environments listed in this collection. Obsolete. Environments are now controlled by lifecycles as of Oct 2014, version 2.6.5.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this project group.
- **`RetentionPolicyId`** <span class="type-label">string</span> — Gets or sets the ID of the retention policy that will apply to projects in this group.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Description": "string",
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
  "Name": "string",
  "RetentionPolicyId": "string",
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Lists the name and ID of all of the Project Groups in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

`GET` `/api/{spaceId}/projectgroups/all`

Also reachable at `/api/projectgroups/all`, `/api/spaces/{spaceIdentifier}/projectgroups/all`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The name and ID of all of the Project Groups in the supplied Octopus Deploy Space. The results are sorted alphabetically by name."

an array of `ProjectGroupResource`.

- **`Description`** <span class="type-label">string</span>
- **`EnvironmentIds`** <span class="type-label">array of string</span> — Gets or sets a collection of environment ID's. If this collection is empty, projects in this group can be deployed to any environment. If the collection is non-empty, then projects in the group are limited to only deploying to the environments listed in this collection. Obsolete. Environments are now controlled by lifecycles as of Oct 2014, version 2.6.5.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this project group.
- **`RetentionPolicyId`** <span class="type-label">string</span> — Gets or sets the ID of the retention policy that will apply to projects in this group.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "Description": "string",
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
    "Name": "string",
    "RetentionPolicyId": "string",
    "Slug": "string",
    "SpaceId": "string"
  }
]
```
</div>

## Get a Project Group by ID

`GET` `/api/{spaceId}/projectgroups/{id}`

Also reachable at `/api/projectgroups/{id}`, `/api/spaces/{spaceIdentifier}/projectgroups/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the ProjectGroup to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested project group

`ProjectGroupResource`.

- **`Description`** <span class="type-label">string</span>
- **`EnvironmentIds`** <span class="type-label">array of string</span> — Gets or sets a collection of environment ID's. If this collection is empty, projects in this group can be deployed to any environment. If the collection is non-empty, then projects in the group are limited to only deploying to the environments listed in this collection. Obsolete. Environments are now controlled by lifecycles as of Oct 2014, version 2.6.5.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this project group.
- **`RetentionPolicyId`** <span class="type-label">string</span> — Gets or sets the ID of the retention policy that will apply to projects in this group.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Description": "string",
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
  "Name": "string",
  "RetentionPolicyId": "string",
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Modifies an existing project group

`PUT` `/api/{spaceId}/projectgroups/{id}`

Also reachable at `/api/projectgroups/{id}`, `/api/spaces/{spaceIdentifier}/projectgroups/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the project group.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyProjectGroupCommand`

- **`Description`** <span class="type-label">string</span> — The description of the project group.
- **`Id`** <span class="type-label">string</span> *(required)* — The ID of the project group.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the project group. Minimum length 1.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "Description": "string",
  "Id": "string",
  "Name": "string",
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — The modified project group

`ProjectGroupResource`.

- **`Description`** <span class="type-label">string</span>
- **`EnvironmentIds`** <span class="type-label">array of string</span> — Gets or sets a collection of environment ID's. If this collection is empty, projects in this group can be deployed to any environment. If the collection is non-empty, then projects in the group are limited to only deploying to the environments listed in this collection. Obsolete. Environments are now controlled by lifecycles as of Oct 2014, version 2.6.5.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Gets or sets the name of this project group.
- **`RetentionPolicyId`** <span class="type-label">string</span> — Gets or sets the ID of the retention policy that will apply to projects in this group.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Description": "string",
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
  "Name": "string",
  "RetentionPolicyId": "string",
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Deletes an existing Project Group

`DELETE` `/api/{spaceId}/projectgroups/{id}`

Also reachable at `/api/projectgroups/{id}`, `/api/spaces/{spaceIdentifier}/projectgroups/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the project group to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Gets a paginated list of the Projects that belong to the given Project Group

`GET` `/api/{spaceId}/projectgroups/{id}/projects`

Also reachable at `/api/projectgroups/{id}/projects`, `/api/spaces/{spaceIdentifier}/projectgroups/{id}/projects`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the project group.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of the Projects that belong to the given Project Group

`ProjectResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`AllowIgnoreChannelRules`** <span class="type-label">boolean</span>
  - **`AutoCreateRelease`** <span class="type-label">boolean</span>
  - **`AutoDeployReleaseOverrides`** <span class="type-label">array of object</span>
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
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`Icon`** <span class="type-label">object</span>
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
  - **`ProjectConnectivityPolicy`** <span class="type-label">object</span>
  - **`ProjectGroupId`** <span class="type-label">string</span>
  - **`ProjectTags`** <span class="type-label">array of string</span> — List of tags assigned to this project.
  - **`ProjectTemplateDetails`** <span class="type-label">object</span>
  - **`ProvisioningRunbookId`** <span class="type-label">string</span>
  - **`ReleaseCreationStrategy`** <span class="type-label">object</span>
  - **`ReleaseNotesTemplate`** <span class="type-label">string</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Templates`** <span class="type-label">array of object</span>
  - **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`VariableSetId`** <span class="type-label">string</span>
  - **`VersioningStrategy`** <span class="type-label">object</span>
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
      "AllowIgnoreChannelRules": true,
      "AutoCreateRelease": true,
      "AutoDeployReleaseOverrides": [
        {}
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
        {}
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
        "ReleaseCreationPackage": {}
      },
      "ReleaseNotesTemplate": "string",
      "Slug": "string",
      "SpaceId": "string",
      "Templates": [
        {}
      ],
      "TenantedDeploymentMode": "Untenanted",
      "VariableSetId": "string",
      "VersioningStrategy": {
        "DonorPackage": {},
        "Template": "string"
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
