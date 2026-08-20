---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Project Groups
---

## Get a paginated list of the Project Groups in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

:endpoint{method="GET" path="/api/\{spaceId\}/projectgroups"}

Also reachable at `/api/projectgroups`, `/api/spaces/{spaceIdentifier}/projectgroups`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A comma separated list of Project Group IDs to filter on.
- **`name`** :span[string]{.type-label}  
  The exact name of a Project Group to be matched.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to limit the set of retrieved Project Groups to. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of the Project Groups in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`EnvironmentIds`** :span[array of string]{.type-label}  
    Gets or sets a collection of environment ID's. If this collection is empty, projects in this group can be deployed to any environment. If the collection is non-empty, then projects in the group are limited to only deploying to the environments listed in this collection. Obsolete. Environments are now controlled by lifecycles as of Oct 2014, version 2.6.5.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Gets or sets the name of this project group.
  - **`RetentionPolicyId`** :span[string]{.type-label}  
    Gets or sets the ID of the retention policy that will apply to projects in this group.
  - **`Slug`** :span[string]{.type-label}
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
      "SpaceId": "Spaces-1"
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

## Create a new project group

:endpoint{method="POST" path="/api/\{spaceId\}/projectgroups"}

Also reachable at `/api/projectgroups`, `/api/spaces/{spaceIdentifier}/projectgroups`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Description`** :span[string]{.type-label}  
  The description of the project group.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the project group. Minimum length 1.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Name": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`201` — Created

- **`Description`** :span[string]{.type-label}
- **`EnvironmentIds`** :span[array of string]{.type-label}  
  Gets or sets a collection of environment ID's. If this collection is empty, projects in this group can be deployed to any environment. If the collection is non-empty, then projects in the group are limited to only deploying to the environments listed in this collection. Obsolete. Environments are now controlled by lifecycles as of Oct 2014, version 2.6.5.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this project group.
- **`RetentionPolicyId`** :span[string]{.type-label}  
  Gets or sets the ID of the retention policy that will apply to projects in this group.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
  "SpaceId": "Spaces-1"
}
```
:::

## List the name and ID of all of the Project Groups in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name

:endpoint{method="GET" path="/api/\{spaceId\}/projectgroups/all"}

Also reachable at `/api/projectgroups/all`, `/api/spaces/{spaceIdentifier}/projectgroups/all`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The name and ID of all of the Project Groups in the supplied Octopus Deploy Space. The results are sorted alphabetically by name."

- **`Description`** :span[string]{.type-label}
- **`EnvironmentIds`** :span[array of string]{.type-label}  
  Gets or sets a collection of environment ID's. If this collection is empty, projects in this group can be deployed to any environment. If the collection is non-empty, then projects in the group are limited to only deploying to the environments listed in this collection. Obsolete. Environments are now controlled by lifecycles as of Oct 2014, version 2.6.5.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this project group.
- **`RetentionPolicyId`** :span[string]{.type-label}  
  Gets or sets the ID of the retention policy that will apply to projects in this group.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
    "SpaceId": "Spaces-1"
  }
]
```
:::

## Get a Project Group by ID

:endpoint{method="GET" path="/api/\{spaceId\}/projectgroups/\{id\}"}

Also reachable at `/api/projectgroups/{id}`, `/api/spaces/{spaceIdentifier}/projectgroups/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the ProjectGroup to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested project group

- **`Description`** :span[string]{.type-label}
- **`EnvironmentIds`** :span[array of string]{.type-label}  
  Gets or sets a collection of environment ID's. If this collection is empty, projects in this group can be deployed to any environment. If the collection is non-empty, then projects in the group are limited to only deploying to the environments listed in this collection. Obsolete. Environments are now controlled by lifecycles as of Oct 2014, version 2.6.5.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this project group.
- **`RetentionPolicyId`** :span[string]{.type-label}  
  Gets or sets the ID of the retention policy that will apply to projects in this group.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
  "SpaceId": "Spaces-1"
}
```
:::

## Modify an existing project group

:endpoint{method="PUT" path="/api/\{spaceId\}/projectgroups/\{id\}"}

Also reachable at `/api/projectgroups/{id}`, `/api/spaces/{spaceIdentifier}/projectgroups/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the project group.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Description`** :span[string]{.type-label}  
  The description of the project group.
- **`Id`** :span[string]{.type-label} *(required)*  
  The ID of the project group.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the project group. Minimum length 1.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "Id": "ProjectGroups-1",
  "Name": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — The modified project group

- **`Description`** :span[string]{.type-label}
- **`EnvironmentIds`** :span[array of string]{.type-label}  
  Gets or sets a collection of environment ID's. If this collection is empty, projects in this group can be deployed to any environment. If the collection is non-empty, then projects in the group are limited to only deploying to the environments listed in this collection. Obsolete. Environments are now controlled by lifecycles as of Oct 2014, version 2.6.5.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Gets or sets the name of this project group.
- **`RetentionPolicyId`** :span[string]{.type-label}  
  Gets or sets the ID of the retention policy that will apply to projects in this group.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
  "SpaceId": "Spaces-1"
}
```
:::

## Delete an existing Project Group

:endpoint{method="DELETE" path="/api/\{spaceId\}/projectgroups/\{id\}"}

Also reachable at `/api/projectgroups/{id}`, `/api/spaces/{spaceIdentifier}/projectgroups/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the project group to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Get a paginated list of the Projects that belong to the given Project Group

:endpoint{method="GET" path="/api/\{spaceId\}/projectgroups/\{id\}/projects"}

Also reachable at `/api/projectgroups/{id}/projects`, `/api/spaces/{spaceIdentifier}/projectgroups/{id}/projects`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the project group.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of the Projects that belong to the given Project Group

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`AllowIgnoreChannelRules`** :span[boolean]{.type-label}
  - **`AutoCreateRelease`** :span[boolean]{.type-label}
  - **`AutoDeployReleaseOverrides`** :span[array of object]{.type-label}
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
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`Icon`** :span[object]{.type-label}
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
  - **`ProjectConnectivityPolicy`** :span[object]{.type-label}
  - **`ProjectGroupId`** :span[string]{.type-label}
  - **`ProjectTags`** :span[array of string]{.type-label}  
    List of tags assigned to this project.
  - **`ProjectTemplateDetails`** :span[object]{.type-label}
  - **`ProvisioningRunbookId`** :span[string]{.type-label}
  - **`ReleaseCreationStrategy`** :span[object]{.type-label}
  - **`ReleaseNotesTemplate`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Templates`** :span[array of object]{.type-label}
  - **`TenantedDeploymentMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`VariableSetId`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[object]{.type-label}
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
      "AllowIgnoreChannelRules": true,
      "AutoCreateRelease": true,
      "AutoDeployReleaseOverrides": [
        {}
      ],
      "ClonedFromProjectId": "Projects-1",
      "CombineHealthAndSyncStatusInDashboardLiveStatus": true,
      "DefaultGuidedFailureMode": "EnvironmentDefault",
      "DefaultPowerShellEdition": "string",
      "DefaultToSkipIfAlreadyInstalled": true,
      "DeploymentChangesTemplate": "string",
      "DeploymentProcessId": "string",
      "DeprovisioningRunbookId": "Runbooks-1",
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
      "ProvisioningRunbookId": "Runbooks-1",
      "ReleaseCreationStrategy": {
        "ChannelId": "string",
        "ReleaseCreationPackage": {}
      },
      "ReleaseNotesTemplate": "string",
      "Slug": "string",
      "SpaceId": "Spaces-1",
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
:::
