---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Releases
---

## Lists all of the releases that belong to the given Channel

`GET` `/api/{spaceId}/channels/{id}/releases`

Also reachable at `/api/channels/{id}/releases`, `/api/projects/{projectId}/channels/{id}/releases`, `/api/spaces/{spaceIdentifier}/channels/{id}/releases`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{id}/releases`, `/api/{spaceId}/projects/{projectId}/channels/{id}/releases`.

Releases will be ordered from most recent to least recent,

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Channel to get Releases for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space to which the given Channel belongs.

- **`projectId`** <span class="type-label">string</span> — ID of the Project to which the given Channel belongs.
- **`searchByVersion`** <span class="type-label">string</span> — A partial version, to limit the set of Releases to those with a version that includes the partial version.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — List of Releases on the given Channel.

`ReleaseResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
  - **`BuildInformation`** <span class="type-label">array of object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`CustomFields`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IgnoreChannelRules`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectDeploymentProcessSnapshotId`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span>
  - **`ReleaseNotes`** <span class="type-label">string</span>
  - **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span> — Maximum length 349.
  - **`VersionControlReference`** <span class="type-label">object</span>
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
      "Assembled": "2020-01-01T00:00:00.000Z",
      "BuildInformation": [
        {}
      ],
      "ChannelId": "string",
      "CustomFields": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Id": "string",
      "IgnoreChannelRules": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LibraryVariableSetSnapshotIds": [
        "string"
      ],
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
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
      "VersionControlReference": {
        "GitCommit": "string",
        "GitRef": "string",
        "VariablesGitCommit": "string"
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

## Lists all of the releases that belong to the given Project

`GET` `/api/{spaceId}/projects/{projectId}/releases`

Also reachable at `/api/projects/{projectId}/releases`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/releases`.

Releases will be ordered from most recent to least recent

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project to get Releases for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space to which the given Project belongs.

- **`searchByVersion`** <span class="type-label">string</span> — A partial version, to limit the set of Releases to those with a version that includes the partial version.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The list of Releases

`ReleaseResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
  - **`BuildInformation`** <span class="type-label">array of object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`CustomFields`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IgnoreChannelRules`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectDeploymentProcessSnapshotId`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span>
  - **`ReleaseNotes`** <span class="type-label">string</span>
  - **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span> — Maximum length 349.
  - **`VersionControlReference`** <span class="type-label">object</span>
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
      "Assembled": "2020-01-01T00:00:00.000Z",
      "BuildInformation": [
        {}
      ],
      "ChannelId": "string",
      "CustomFields": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Id": "string",
      "IgnoreChannelRules": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LibraryVariableSetSnapshotIds": [
        "string"
      ],
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
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
      "VersionControlReference": {
        "GitCommit": "string",
        "GitRef": "string",
        "VariablesGitCommit": "string"
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

## Get a list of Variable Sets included in the Release's current Variable Snapshot

`GET` `/api/{spaceId}/projects/{projectId}/releases/{id}/variables`

Also reachable at `/api/projects/{projectId}/releases/{id}/variables`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/releases/{id}/variables`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Release to get variables for.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project the Release is in.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Variables

an array of `VariableSetResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** <span class="type-label">string</span> — Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** <span class="type-label">object</span>
  - **`Actions`** <span class="type-label">array of object</span>
  - **`Channels`** <span class="type-label">array of object</span>
  - **`EnvironmentParameters`** <span class="type-label">array of object</span>
  - **`Environments`** <span class="type-label">array of object</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`ProcessTemplateSteps`** <span class="type-label">array of object</span>
  - **`Processes`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of object</span>
  - **`TargetTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTagParameters`** <span class="type-label">array of object</span>
  - **`TenantTags`** <span class="type-label">array of object</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Variables`** <span class="type-label">array of object</span> — Gets the collection of variables.
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsEditable`** <span class="type-label">boolean</span>
  - **`IsSensitive`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Prompt`** <span class="type-label">object</span>
  - **`Scope`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">string</span>
  - **`Value`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">integer</span> — Gets or sets the version number.

<div data-example="Response">

```json
[
  {
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "OwnerId": "string",
    "ScopeValues": {
      "Actions": [
        {}
      ],
      "Channels": [
        {}
      ],
      "EnvironmentParameters": [
        {}
      ],
      "Environments": [
        {}
      ],
      "Machines": [
        {}
      ],
      "ProcessTemplateSteps": [
        {}
      ],
      "Processes": [
        {}
      ],
      "Roles": [
        {}
      ],
      "TargetTagParameters": [
        {}
      ],
      "TenantTagParameters": [
        {}
      ],
      "TenantTags": [
        {}
      ]
    },
    "SpaceId": "string",
    "Variables": [
      {
        "Description": "string",
        "Id": "string",
        "IsEditable": true,
        "IsSensitive": true,
        "Name": "string",
        "Prompt": {},
        "Scope": {},
        "Type": "string",
        "Value": "string"
      }
    ],
    "Version": 0
  }
]
```
</div>

## Gets a single release by project ID and version number

`GET` `/api/{spaceId}/projects/{projectId}/releases/{version}`

Also reachable at `/api/projects/{projectId}/releases/{version}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/releases/{version}`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project containing the release.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the release.
- **`version`** <span class="type-label">string</span> *(required)* — The version of the requested release.

**Response**

`200` — Success

`ReleaseResource`.

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Branch`** <span class="type-label">string</span>
  - **`BuildEnvironment`** <span class="type-label">string</span>
  - **`BuildNumber`** <span class="type-label">string</span>
  - **`BuildUrl`** <span class="type-label">string</span>
  - **`Commits`** <span class="type-label">array of object</span>
  - **`IssueTrackerName`** <span class="type-label">string</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`VcsCommitNumber`** <span class="type-label">string</span>
  - **`VcsCommitUrl`** <span class="type-label">string</span>
  - **`VcsRoot`** <span class="type-label">string</span>
  - **`VcsType`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span>
- **`ChannelId`** <span class="type-label">string</span>
- **`CustomFields`** <span class="type-label">object</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span>
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitReferenceResource`** <span class="type-label">object</span>
  - **`GitResourceReferenceName`** <span class="type-label">string</span>
- **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span> — Maximum length 349.
- **`VersionControlReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "BuildInformation": [
    {
      "Branch": "string",
      "BuildEnvironment": "string",
      "BuildNumber": "string",
      "BuildUrl": "string",
      "Commits": [
        {}
      ],
      "IssueTrackerName": "string",
      "PackageId": "string",
      "VcsCommitNumber": "string",
      "VcsCommitUrl": "string",
      "VcsRoot": "string",
      "VcsType": "string",
      "Version": "string",
      "WorkItems": [
        {}
      ]
    }
  ],
  "ChannelId": "string",
  "CustomFields": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Id": "string",
  "IgnoreChannelRules": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariableSetSnapshotIds": [
    "string"
  ],
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectDeploymentProcessSnapshotId": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "ReleaseNotes": "string",
  "SelectedGitResources": [
    {
      "ActionName": "string",
      "GitReferenceResource": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "GitResourceReferenceName": "string"
    }
  ],
  "SelectedPackages": [
    {
      "ActionName": "string",
      "PackageReferenceName": "string",
      "StepName": "string",
      "Version": "string"
    }
  ],
  "SpaceId": "string",
  "Version": "string",
  "VersionControlReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  }
}
```
</div>

## Get a list of Releases for the given Space

`GET` `/api/{spaceId}/releases`

Also reachable at `/api/releases`, `/api/spaces/{spaceIdentifier}/releases`.

Lists all of the Releases in the supplied Octopus Deploy Space, from all projects. The results will be sorted from most recent to least recent release.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space to which the Releases belong.

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The list of Releases for the requested Space.

`ReleaseResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
  - **`BuildInformation`** <span class="type-label">array of object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`CustomFields`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IgnoreChannelRules`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectDeploymentProcessSnapshotId`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span>
  - **`ReleaseNotes`** <span class="type-label">string</span>
  - **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span> — Maximum length 349.
  - **`VersionControlReference`** <span class="type-label">object</span>
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
      "Assembled": "2020-01-01T00:00:00.000Z",
      "BuildInformation": [
        {}
      ],
      "ChannelId": "string",
      "CustomFields": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Id": "string",
      "IgnoreChannelRules": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LibraryVariableSetSnapshotIds": [
        "string"
      ],
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
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
      "VersionControlReference": {
        "GitCommit": "string",
        "GitRef": "string",
        "VariablesGitCommit": "string"
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

## Create a Release

`POST` `/api/{spaceId}/releases`

Also reachable at `/api/releases`, `/api/spaces/{spaceIdentifier}/releases`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateReleaseCommand`

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`ChannelId`** <span class="type-label">string</span>
- **`CustomFields`** <span class="type-label">object</span>
- **`IgnoreChannelRules`** <span class="type-label">boolean</span> — Ignore channel rules.
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`GitReferenceResource`** <span class="type-label">object</span> *(required)*
  - **`GitResourceReferenceName`** <span class="type-label">string</span>
- **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Version`** <span class="type-label">string</span> *(required)* — Maximum length 349.
- **`VersionControlReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "ChannelId": "string",
  "CustomFields": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "IgnoreChannelRules": true,
  "ProjectId": "string",
  "ReleaseNotes": "string",
  "SelectedGitResources": [
    {
      "ActionName": "string",
      "GitReferenceResource": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "GitResourceReferenceName": "string"
    }
  ],
  "SelectedPackages": [
    {
      "ActionName": "string",
      "PackageReferenceName": "string",
      "StepName": "string",
      "Version": "string"
    }
  ],
  "SpaceId": "string",
  "Version": "string",
  "VersionControlReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  }
}
```
</div>

**Response**

`201` — Created

`ReleaseResource`.

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Branch`** <span class="type-label">string</span>
  - **`BuildEnvironment`** <span class="type-label">string</span>
  - **`BuildNumber`** <span class="type-label">string</span>
  - **`BuildUrl`** <span class="type-label">string</span>
  - **`Commits`** <span class="type-label">array of object</span>
  - **`IssueTrackerName`** <span class="type-label">string</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`VcsCommitNumber`** <span class="type-label">string</span>
  - **`VcsCommitUrl`** <span class="type-label">string</span>
  - **`VcsRoot`** <span class="type-label">string</span>
  - **`VcsType`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span>
- **`ChannelId`** <span class="type-label">string</span>
- **`CustomFields`** <span class="type-label">object</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span>
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitReferenceResource`** <span class="type-label">object</span>
  - **`GitResourceReferenceName`** <span class="type-label">string</span>
- **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span> — Maximum length 349.
- **`VersionControlReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "BuildInformation": [
    {
      "Branch": "string",
      "BuildEnvironment": "string",
      "BuildNumber": "string",
      "BuildUrl": "string",
      "Commits": [
        {}
      ],
      "IssueTrackerName": "string",
      "PackageId": "string",
      "VcsCommitNumber": "string",
      "VcsCommitUrl": "string",
      "VcsRoot": "string",
      "VcsType": "string",
      "Version": "string",
      "WorkItems": [
        {}
      ]
    }
  ],
  "ChannelId": "string",
  "CustomFields": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Id": "string",
  "IgnoreChannelRules": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariableSetSnapshotIds": [
    "string"
  ],
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectDeploymentProcessSnapshotId": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "ReleaseNotes": "string",
  "SelectedGitResources": [
    {
      "ActionName": "string",
      "GitReferenceResource": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "GitResourceReferenceName": "string"
    }
  ],
  "SelectedPackages": [
    {
      "ActionName": "string",
      "PackageReferenceName": "string",
      "StepName": "string",
      "Version": "string"
    }
  ],
  "SpaceId": "string",
  "Version": "string",
  "VersionControlReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  }
}
```
</div>

## Creates a Release

`POST` `/api/{spaceId}/releases/create/v1`

Also reachable at `/api/releases/create/v1`, `/api/spaces/{spaceIdentifier}/releases/create/v1`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateReleaseCommandV1`

- **`ChannelName`** <span class="type-label">string</span> — Name of the channel to use for the new release. Omit this argument to automatically select the best channel.
- **`CustomFields`** <span class="type-label">object</span> — Values for the project's custom release fields, if it defines any, keyed by field name.
- **`GitCommit`** <span class="type-label">string</span> — Only set alongside GitRef, when a specific commit is needed; GitRef alone uses the tip of that ref.
- **`GitRef`** <span class="type-label">string</span> — The Git branch, tag or commit to snapshot the deployment process from. Required for a project that stores its configuration in Git, and must be left unset for one stored in the database — the command fails either way round. List a project's branches with get_branches.
- **`GitResources`** <span class="type-label">array of string</span> — Git ref to use for a git resource in the release. Format: StepName:GitRef or StepName:GitResourceName:GitRef. If the GitResourceName is omitted, it's assumed to be the primary git resource for the step. The GitRef can be replaced with an asterisk. An asterisk will use the tip ref of the step-defined default branch.
- **`IgnoreChannelRules`** <span class="type-label">boolean</span> — Create the release even when a package version, or the Git reference, violates the channel's version rules. This overrides a deliberate guardrail, so prefer correcting the versions or letting Octopus select the channel; only set it when explicitly asked to.
- **`IgnoreIfAlreadyExists`** <span class="type-label">boolean</span> — If a release with the same version number already exists, return that one instead of failing — so the returned ReleaseId may be an existing release rather than a newly created one.
- **`PackagePrerelease`** <span class="type-label">string</span> — Restrict automatic version selection to pre-release versions carrying this tag, for example "beta". Ignored for steps whose version is pinned by PackageVersion or Packages.
- **`PackageVersion`** <span class="type-label">string</span> — One version to use for every package step. Leave unset to take the latest version of each package; use Packages instead to pin versions per step.
- **`Packages`** <span class="type-label">array of string</span> — Version number to use for a package in the release. Format: StepName:Version or PackageID:Version or StepName:PackageName:Version. StepName, PackageID, and PackageName can be replaced with an asterisk. An asterisk will be assumed for StepName, PackageID, or PackageName if they are omitted.
- **`ProjectName`** <span class="type-label">string</span> *(required)*
- **`ReleaseNotes`** <span class="type-label">string</span> — Release Notes for the new release. Styling with Markdown is supported.
- **`ReleaseVersion`** <span class="type-label">string</span> — Leave unset to let Octopus pick the next version from the project's versioning strategy, which is usually what you want.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`SpaceIdOrName`** <span class="type-label">string</span> *(required)* — Both this and SpaceId are required, and normally hold the same space ID; set both.

<div data-example="Request">

```json
{
  "ChannelName": "string",
  "CustomFields": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "GitCommit": "string",
  "GitRef": "string",
  "GitResources": [
    "string"
  ],
  "IgnoreChannelRules": true,
  "IgnoreIfAlreadyExists": true,
  "PackagePrerelease": "string",
  "PackageVersion": "string",
  "Packages": [
    "string"
  ],
  "ProjectName": "string",
  "ReleaseNotes": "string",
  "ReleaseVersion": "string",
  "SpaceId": "string",
  "SpaceIdOrName": "string"
}
```
</div>

**Response**

`201` — Created

`CreateReleaseResponseV1`.

- **`ReleaseId`** <span class="type-label">string</span>
- **`ReleaseVersion`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "ReleaseId": "string",
  "ReleaseVersion": "string"
}
```
</div>

## Get a Release by ID

`GET` `/api/{spaceId}/releases/{id}`

Also reachable at `/api/releases/{id}`, `/api/spaces/{spaceIdentifier}/releases/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Release to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space that owns the Release.

**Response**

`200` — The requested Release

`ReleaseResource`.

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Branch`** <span class="type-label">string</span>
  - **`BuildEnvironment`** <span class="type-label">string</span>
  - **`BuildNumber`** <span class="type-label">string</span>
  - **`BuildUrl`** <span class="type-label">string</span>
  - **`Commits`** <span class="type-label">array of object</span>
  - **`IssueTrackerName`** <span class="type-label">string</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`VcsCommitNumber`** <span class="type-label">string</span>
  - **`VcsCommitUrl`** <span class="type-label">string</span>
  - **`VcsRoot`** <span class="type-label">string</span>
  - **`VcsType`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span>
- **`ChannelId`** <span class="type-label">string</span>
- **`CustomFields`** <span class="type-label">object</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span>
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitReferenceResource`** <span class="type-label">object</span>
  - **`GitResourceReferenceName`** <span class="type-label">string</span>
- **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span> — Maximum length 349.
- **`VersionControlReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "BuildInformation": [
    {
      "Branch": "string",
      "BuildEnvironment": "string",
      "BuildNumber": "string",
      "BuildUrl": "string",
      "Commits": [
        {}
      ],
      "IssueTrackerName": "string",
      "PackageId": "string",
      "VcsCommitNumber": "string",
      "VcsCommitUrl": "string",
      "VcsRoot": "string",
      "VcsType": "string",
      "Version": "string",
      "WorkItems": [
        {}
      ]
    }
  ],
  "ChannelId": "string",
  "CustomFields": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Id": "string",
  "IgnoreChannelRules": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariableSetSnapshotIds": [
    "string"
  ],
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectDeploymentProcessSnapshotId": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "ReleaseNotes": "string",
  "SelectedGitResources": [
    {
      "ActionName": "string",
      "GitReferenceResource": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "GitResourceReferenceName": "string"
    }
  ],
  "SelectedPackages": [
    {
      "ActionName": "string",
      "PackageReferenceName": "string",
      "StepName": "string",
      "Version": "string"
    }
  ],
  "SpaceId": "string",
  "Version": "string",
  "VersionControlReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  }
}
```
</div>

## Updates an existing Release

`PUT` `/api/{spaceId}/releases/{id}`

Also reachable at `/api/releases/{id}`, `/api/spaces/{spaceIdentifier}/releases/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Release.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyReleaseCommand`

- **`ChannelId`** <span class="type-label">string</span> *(required)*
- **`CustomFields`** <span class="type-label">object</span>
- **`Id`** <span class="type-label">string</span> *(required)* — ID of the Release.
- **`IgnoreChannelRules`** <span class="type-label">boolean</span> — If altering the Channel of an existing Release, its rules may be violated. This ignores those violations. If not altering the Release Channel, this parameter is ignored.
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`GitReferenceResource`** <span class="type-label">object</span> *(required)*
  - **`GitResourceReferenceName`** <span class="type-label">string</span>
- **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Version`** <span class="type-label">string</span> *(required)* — Maximum length 349.

<div data-example="Request">

```json
{
  "ChannelId": "string",
  "CustomFields": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Id": "string",
  "IgnoreChannelRules": true,
  "ProjectId": "string",
  "ReleaseNotes": "string",
  "SelectedGitResources": [
    {
      "ActionName": "string",
      "GitReferenceResource": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "GitResourceReferenceName": "string"
    }
  ],
  "SelectedPackages": [
    {
      "ActionName": "string",
      "PackageReferenceName": "string",
      "StepName": "string",
      "Version": "string"
    }
  ],
  "SpaceId": "string",
  "Version": "string"
}
```
</div>

**Response**

`200` — Confirmation that the Release was modified, containing the updated Release

`ReleaseResource`.

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Branch`** <span class="type-label">string</span>
  - **`BuildEnvironment`** <span class="type-label">string</span>
  - **`BuildNumber`** <span class="type-label">string</span>
  - **`BuildUrl`** <span class="type-label">string</span>
  - **`Commits`** <span class="type-label">array of object</span>
  - **`IssueTrackerName`** <span class="type-label">string</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`VcsCommitNumber`** <span class="type-label">string</span>
  - **`VcsCommitUrl`** <span class="type-label">string</span>
  - **`VcsRoot`** <span class="type-label">string</span>
  - **`VcsType`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span>
- **`ChannelId`** <span class="type-label">string</span>
- **`CustomFields`** <span class="type-label">object</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span>
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitReferenceResource`** <span class="type-label">object</span>
  - **`GitResourceReferenceName`** <span class="type-label">string</span>
- **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span> — Maximum length 349.
- **`VersionControlReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "BuildInformation": [
    {
      "Branch": "string",
      "BuildEnvironment": "string",
      "BuildNumber": "string",
      "BuildUrl": "string",
      "Commits": [
        {}
      ],
      "IssueTrackerName": "string",
      "PackageId": "string",
      "VcsCommitNumber": "string",
      "VcsCommitUrl": "string",
      "VcsRoot": "string",
      "VcsType": "string",
      "Version": "string",
      "WorkItems": [
        {}
      ]
    }
  ],
  "ChannelId": "string",
  "CustomFields": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Id": "string",
  "IgnoreChannelRules": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariableSetSnapshotIds": [
    "string"
  ],
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectDeploymentProcessSnapshotId": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "ReleaseNotes": "string",
  "SelectedGitResources": [
    {
      "ActionName": "string",
      "GitReferenceResource": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "GitResourceReferenceName": "string"
    }
  ],
  "SelectedPackages": [
    {
      "ActionName": "string",
      "PackageReferenceName": "string",
      "StepName": "string",
      "Version": "string"
    }
  ],
  "SpaceId": "string",
  "Version": "string",
  "VersionControlReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  }
}
```
</div>

## Deletes an existing release, along with all of the deployments, tasks and other associated resources belonging to the release

`DELETE` `/api/{spaceId}/releases/{id}`

Also reachable at `/api/releases/{id}`, `/api/spaces/{spaceIdentifier}/releases/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Release to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Gets all of the information necessary for creating or editing a deployment for this release

`GET` `/api/{spaceId}/releases/{id}/deployments/template`

Also reachable at `/api/releases/{id}/deployments/template`, `/api/spaces/{spaceIdentifier}/releases/{id}/deployments/template`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Release.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space.

**Response**

`200` — The requested Deployment Template for the release.

`DeploymentTemplateResource`.

- **`DeploymentNotes`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDeploymentProcessModified`** <span class="type-label">boolean</span>
- **`IsGitResourceModified`** <span class="type-label">boolean</span>
- **`IsLibraryVariableSetModified`** <span class="type-label">boolean</span>
- **`IsVariableSetModified`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PromoteTo`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span>
  - **`Name`** <span class="type-label">string</span>
- **`TenantPromotions`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`PromoteTo`** <span class="type-label">array of object</span>

<div data-example="Response">

```json
{
  "DeploymentNotes": "string",
  "Id": "string",
  "IsDeploymentProcessModified": true,
  "IsGitResourceModified": true,
  "IsLibraryVariableSetModified": true,
  "IsVariableSetModified": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PromoteTo": [
    {
      "Id": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
    }
  ],
  "TenantPromotions": [
    {
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "PromoteTo": [
        {}
      ]
    }
  ]
}
```
</div>

## Gets all defects for a release

`GET` `/api/{spaceId}/releases/{releaseId}/defects`

Also reachable at `/api/releases/{releaseId}/defects`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/defects`.

**Parameters**

- **`releaseId`** <span class="type-label">string</span> *(required)* — Id of the release.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Gets all defects for a release.

`DefectResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span> — Minimum length 1.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Status`** <span class="type-label">enum</span> — Allowed values: `Unresolved`, `Resolved`.
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
      "Status": "Unresolved"
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

## Record defect in a release

`POST` `/api/{spaceId}/releases/{releaseId}/defects`

Also reachable at `/api/releases/{releaseId}/defects`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/defects`.

**Parameters**

- **`releaseId`** <span class="type-label">string</span> *(required)* — Id of the release.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`CreateReleaseDefectCommand`

- **`Description`** <span class="type-label">string</span> *(required)* — Defect in the release. Minimum length 1.
- **`ReleaseId`** <span class="type-label">string</span> *(required)* — Id of the release.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`Status`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "Description": "string",
  "ReleaseId": "string",
  "SpaceId": "string",
  "Status": "string"
}
```
</div>

**Response**

`200` — The defect resource that was recorded against a release

`DefectResource`.

- **`Description`** <span class="type-label">string</span> — Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Status`** <span class="type-label">enum</span> — Allowed values: `Unresolved`, `Resolved`.

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
  "Status": "Unresolved"
}
```
</div>

## Resolve defect in a release

`POST` `/api/{spaceId}/releases/{releaseId}/defects/resolve`

Also reachable at `/api/releases/{releaseId}/defects/resolve`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/defects/resolve`.

**Parameters**

- **`releaseId`** <span class="type-label">string</span> *(required)* — Id of the release.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the release.

**Response**

`200` — Resolved defect

`DefectResource`.

- **`Description`** <span class="type-label">string</span> — Minimum length 1.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Status`** <span class="type-label">enum</span> — Allowed values: `Unresolved`, `Resolved`.

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
  "Status": "Unresolved"
}
```
</div>

## Lists all of the Deployments that belong to the given Release

`GET` `/api/{spaceId}/releases/{releaseId}/deployments`

Also reachable at `/api/releases/{releaseId}/deployments`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/deployments`.

Deployments will be ordered from most recent to least recent.

**Parameters**

- **`releaseId`** <span class="type-label">string</span> *(required)* — ID of the Release to load.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the Space to which the Release belongs.

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The list of Deployments for the given Release.

`DeploymentResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Changes`** <span class="type-label">array of object</span>
  - **`ChangesMarkdown`** <span class="type-label">string</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`Comments`** <span class="type-label">string</span>
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`DebugMode`** <span class="type-label">string</span>
  - **`DeployedBy`** <span class="type-label">string</span>
  - **`DeployedById`** <span class="type-label">string</span>
  - **`DeployedToMachineIds`** <span class="type-label">array of string</span>
  - **`DeploymentProcessId`** <span class="type-label">string</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ExcludedMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** <span class="type-label">object</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`FailureEncountered`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`ForcePackageRedeployment`** <span class="type-label">boolean</span>
  - **`FormValues`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ManifestVariableSetId`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
  - **`Priority`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`QueueTime`** <span class="type-label">string</span> — If set this time will be the used to schedule the deployment to a later time, null is assumed to mean the time will be executed immediately. Format `date-time`.
  - **`QueueTimeExpiry`** <span class="type-label">string</span> — Format `date-time`.
  - **`ReleaseId`** <span class="type-label">string</span>
  - **`SkipActions`** <span class="type-label">array of string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`SpecificMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
  - **`SpecificTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`TaskId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
  - **`TentacleRetentionPeriod`** <span class="type-label">object</span>
  - **`UseGuidedFailure`** <span class="type-label">boolean</span> — If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.
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
      "ChangeRequestSettings": [
        {}
      ],
      "Changes": [
        {}
      ],
      "ChangesMarkdown": "string",
      "ChannelId": "string",
      "Comments": "string",
      "Created": "2020-01-01T00:00:00.000Z",
      "DebugMode": "string",
      "DeployedBy": "string",
      "DeployedById": "string",
      "DeployedToMachineIds": [
        "string"
      ],
      "DeploymentProcessId": "string",
      "EnvironmentId": "string",
      "ExcludedMachineIds": [
        "string"
      ],
      "ExcludedTargetTagIds": [
        "string"
      ],
      "ExecutionPlanLogContext": {
        "Steps": [
          {}
        ]
      },
      "FailTargetDiscovery": true,
      "FailureEncountered": true,
      "ForcePackageDownload": true,
      "ForcePackageRedeployment": true,
      "FormValues": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "ManifestVariableSetId": "string",
      "Name": "string",
      "Priority": "string",
      "ProjectId": "string",
      "QueueTime": "2020-01-01T00:00:00.000Z",
      "QueueTimeExpiry": "2020-01-01T00:00:00.000Z",
      "ReleaseId": "string",
      "SkipActions": [
        "string"
      ],
      "SpaceId": "string",
      "SpecificMachineIds": [
        "string"
      ],
      "SpecificTargetTagIds": [
        "string"
      ],
      "TaskId": "string",
      "TenantId": "string",
      "TentacleRetentionPeriod": {
        "QuantityToKeep": 0,
        "ShouldKeepForever": true,
        "Strategy": "string",
        "Unit": "Days"
      },
      "UseGuidedFailure": true
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

## Gets a document that describes what steps will/won't be run during a deployment to a given environment (and tenant if supplied)

`GET` `/api/{spaceId}/releases/{releaseId}/deployments/preview/{environmentId}`

Also reachable at `/api/releases/{releaseId}/deployments/preview/{environmentId}`, `/api/releases/{releaseId}/deployments/preview/{environmentId}/{tenantId}`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/deployments/preview/{environmentId}`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/deployments/preview/{environmentId}/{tenantId}`, `/api/{spaceId}/releases/{releaseId}/deployments/preview/{environmentId}/{tenantId}`.

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)* — ID of the environment.
- **`releaseId`** <span class="type-label">string</span> *(required)* — ID of the release.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the space containing the resources.

- **`includeDisabledSteps`** <span class="type-label">boolean</span> — Whether to include Disabled Steps in the preview.
- **`tenantId`** <span class="type-label">string</span> — ID of the tenant.

**Response**

`200` — The requested Release Deployment Preview

`DeploymentPreviewResource`.

- **`Changes`** <span class="type-label">array of object</span>
  - **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Commits`** <span class="type-label">array of object</span> — Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span> — Aggregate of distinct work items from all VersionMetadata.
- **`ChangesMarkdown`** <span class="type-label">string</span>
- **`Form`** <span class="type-label">object</span>
  - **`Elements`** <span class="type-label">array of object</span> — Elements of the form.
  - **`Values`** <span class="type-label">object</span> — Values supplied for the form elements.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** <span class="type-label">array of object</span>
  - **`ActionId`** <span class="type-label">string</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`ActionNumber`** <span class="type-label">string</span>
  - **`AvailableTagSets`** <span class="type-label">array of object</span>
  - **`CanBeSkipped`** <span class="type-label">boolean</span>
  - **`ExcludedMachines`** <span class="type-label">array of object</span>
  - **`HasNoApplicableMachines`** <span class="type-label">boolean</span>
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`MachineNames`** <span class="type-label">array of string</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of string</span>
  - **`UnavailableMachines`** <span class="type-label">array of object</span>
- **`UseGuidedFailureModeByDefault`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Changes": [
    {
      "BuildInformation": [
        {}
      ],
      "Commits": [
        {}
      ],
      "ReleaseNotes": "string",
      "Version": "string",
      "WorkItems": [
        {}
      ]
    }
  ],
  "ChangesMarkdown": "string",
  "Form": {
    "Elements": [
      {
        "Control": {},
        "IsValueRequired": true,
        "Name": "string"
      }
    ],
    "Values": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "StepsToExecute": [
    {
      "ActionId": "string",
      "ActionName": "string",
      "ActionNumber": "string",
      "AvailableTagSets": [
        {}
      ],
      "CanBeSkipped": true,
      "ExcludedMachines": [
        {}
      ],
      "HasNoApplicableMachines": true,
      "IsDisabled": true,
      "MachineNames": [
        "string"
      ],
      "Machines": [
        {}
      ],
      "Roles": [
        "string"
      ],
      "UnavailableMachines": [
        {}
      ]
    }
  ],
  "UseGuidedFailureModeByDefault": true
}
```
</div>

## Returns an array of documents that describes what steps will/won't be run during deployments to a given set of environments and tenants

`POST` `/api/{spaceId}/releases/{releaseId}/deployments/previews`

Also reachable at `/api/releases/{releaseId}/deployments/previews`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/deployments/previews`.

**Parameters**

- **`releaseId`** <span class="type-label">string</span> *(required)* — ID of the release.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the space containing the resources.

**Request Body**

`GetReleaseDeploymentPreviewsRequest`

- **`DeploymentPreviews`** <span class="type-label">array of object</span> *(required)* — The array of requests you would like to make.
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`IncludeDisabledSteps`** <span class="type-label">boolean</span> — Whether to include Disabled Steps in the preview.
- **`ReleaseId`** <span class="type-label">string</span> *(required)* — ID of the release.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — ID of the space containing the resources.

<div data-example="Request">

```json
{
  "DeploymentPreviews": [
    {
      "EnvironmentId": "string",
      "TenantId": "string"
    }
  ],
  "IncludeDisabledSteps": true,
  "ReleaseId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — The requested array of Release Deployment Previews

an array of `DeploymentPreviewResource`.

- **`Changes`** <span class="type-label">array of object</span>
  - **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Commits`** <span class="type-label">array of object</span> — Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span> — Aggregate of distinct work items from all VersionMetadata.
- **`ChangesMarkdown`** <span class="type-label">string</span>
- **`Form`** <span class="type-label">object</span>
  - **`Elements`** <span class="type-label">array of object</span> — Elements of the form.
  - **`Values`** <span class="type-label">object</span> — Values supplied for the form elements.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** <span class="type-label">array of object</span>
  - **`ActionId`** <span class="type-label">string</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`ActionNumber`** <span class="type-label">string</span>
  - **`AvailableTagSets`** <span class="type-label">array of object</span>
  - **`CanBeSkipped`** <span class="type-label">boolean</span>
  - **`ExcludedMachines`** <span class="type-label">array of object</span>
  - **`HasNoApplicableMachines`** <span class="type-label">boolean</span>
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`MachineNames`** <span class="type-label">array of string</span>
  - **`Machines`** <span class="type-label">array of object</span>
  - **`Roles`** <span class="type-label">array of string</span>
  - **`UnavailableMachines`** <span class="type-label">array of object</span>
- **`UseGuidedFailureModeByDefault`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
[
  {
    "Changes": [
      {
        "BuildInformation": [
          {}
        ],
        "Commits": [
          {}
        ],
        "ReleaseNotes": "string",
        "Version": "string",
        "WorkItems": [
          {}
        ]
      }
    ],
    "ChangesMarkdown": "string",
    "Form": {
      "Elements": [
        {}
      ],
      "Values": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      }
    },
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "StepsToExecute": [
      {
        "ActionId": "string",
        "ActionName": "string",
        "ActionNumber": "string",
        "AvailableTagSets": [
          {}
        ],
        "CanBeSkipped": true,
        "ExcludedMachines": [
          {}
        ],
        "HasNoApplicableMachines": true,
        "IsDisabled": true,
        "MachineNames": [
          "string"
        ],
        "Machines": [
          {}
        ],
        "Roles": [
          "string"
        ],
        "UnavailableMachines": [
          {}
        ]
      }
    ],
    "UseGuidedFailureModeByDefault": true
  }
]
```
</div>

## Gets the list of Packages that are missing from the built-in feed for a release

`GET` `/api/{spaceId}/releases/{releaseId}/missingPackages`

Also reachable at `/api/spaces/{spaceIdentifier}/releases/{releaseId}/missingPackages`.

**Parameters**

- **`releaseId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The list of Packages from the built-in feed missing for a Release.

`GetMissingPackagesForReleaseResponse`.

- **`Packages`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Minimum length 1.
  - **`Version`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "Packages": [
    {
      "Id": "string",
      "Version": "string"
    }
  ]
}
```
</div>

## Gets all of the information necessary for creating or editing a deployment for this release

`GET` `/api/{spaceId}/releases/{releaseId}/progression`

Also reachable at `/api/releases/{releaseId}/progression`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/progression`.

**Parameters**

- **`releaseId`** <span class="type-label">string</span> *(required)* — Id of the release.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Lifecycle progression information necessary for creating or editing a deployment for a release

`LifecycleProgressionResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextDeployments`** <span class="type-label">array of string</span>
- **`NextDeploymentsMinimumRequired`** <span class="type-label">integer</span>
- **`Phases`** <span class="type-label">array of object</span>
  - **`AutomaticDeploymentTargets`** <span class="type-label">array of string</span>
  - **`Blocked`** <span class="type-label">boolean</span>
  - **`Deployments`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsOptionalPhase`** <span class="type-label">boolean</span>
  - **`IsPriorityPhase`** <span class="type-label">boolean</span>
  - **`MinimumEnvironmentsBeforePromotion`** <span class="type-label">integer</span>
  - **`Name`** <span class="type-label">string</span>
  - **`OptionalDeploymentTargets`** <span class="type-label">array of string</span>
  - **`Progress`** <span class="type-label">enum</span> — Allowed values: `Pending`, `Current`, `Complete`.

<div data-example="Response">

```json
{
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NextDeployments": [
    "string"
  ],
  "NextDeploymentsMinimumRequired": 0,
  "Phases": [
    {
      "AutomaticDeploymentTargets": [
        "string"
      ],
      "Blocked": true,
      "Deployments": [
        {}
      ],
      "Id": "string",
      "IsOptionalPhase": true,
      "IsPriorityPhase": true,
      "MinimumEnvironmentsBeforePromotion": 0,
      "Name": "string",
      "OptionalDeploymentTargets": [
        "string"
      ],
      "Progress": "Pending"
    }
  ]
}
```
</div>

## Updates the release notes on an existing Release

`POST` `/api/{spaceId}/releases/{releaseId}/release-notes`

Also reachable at `/api/releases/{releaseId}/release-notes`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/release-notes`.

Only the release notes are changed and everything else about the Release is left alone. Variable expressions in the notes are evaluated before they are stored, so the saved text is the resolved one.

**Parameters**

- **`releaseId`** <span class="type-label">string</span> *(required)* — Id of the release.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`UpdateReleaseNotesCommand`

- **`ReleaseId`** <span class="type-label">string</span> *(required)* — The ID of the release, for example 'Releases-123'.
- **`ReleaseNotes`** <span class="type-label">string</span> *(required)* — The notes to store, replacing whatever the release currently has. Markdown is supported. Build information is in scope, so expressions such as #{Octopus.Release.WorkItems} and #{Octopus.Release.Number} are resolved before the notes are saved. Send an empty string to clear them.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "ReleaseId": "string",
  "ReleaseNotes": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Confirmation that the release notes were updated, containing the updated Release

`ReleaseResource`.

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Branch`** <span class="type-label">string</span>
  - **`BuildEnvironment`** <span class="type-label">string</span>
  - **`BuildNumber`** <span class="type-label">string</span>
  - **`BuildUrl`** <span class="type-label">string</span>
  - **`Commits`** <span class="type-label">array of object</span>
  - **`IssueTrackerName`** <span class="type-label">string</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`VcsCommitNumber`** <span class="type-label">string</span>
  - **`VcsCommitUrl`** <span class="type-label">string</span>
  - **`VcsRoot`** <span class="type-label">string</span>
  - **`VcsType`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span>
- **`ChannelId`** <span class="type-label">string</span>
- **`CustomFields`** <span class="type-label">object</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span>
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitReferenceResource`** <span class="type-label">object</span>
  - **`GitResourceReferenceName`** <span class="type-label">string</span>
- **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span> — Maximum length 349.
- **`VersionControlReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "BuildInformation": [
    {
      "Branch": "string",
      "BuildEnvironment": "string",
      "BuildNumber": "string",
      "BuildUrl": "string",
      "Commits": [
        {}
      ],
      "IssueTrackerName": "string",
      "PackageId": "string",
      "VcsCommitNumber": "string",
      "VcsCommitUrl": "string",
      "VcsRoot": "string",
      "VcsType": "string",
      "Version": "string",
      "WorkItems": [
        {}
      ]
    }
  ],
  "ChannelId": "string",
  "CustomFields": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Id": "string",
  "IgnoreChannelRules": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariableSetSnapshotIds": [
    "string"
  ],
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectDeploymentProcessSnapshotId": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "ReleaseNotes": "string",
  "SelectedGitResources": [
    {
      "ActionName": "string",
      "GitReferenceResource": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "GitResourceReferenceName": "string"
    }
  ],
  "SelectedPackages": [
    {
      "ActionName": "string",
      "PackageReferenceName": "string",
      "StepName": "string",
      "Version": "string"
    }
  ],
  "SpaceId": "string",
  "Version": "string",
  "VersionControlReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  }
}
```
</div>

## Updates the Variable Snapshot for a Release

`POST` `/api/{spaceId}/releases/{releaseId}/snapshot-variables`

Also reachable at `/api/releases/{releaseId}/snapshot-variables`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/snapshot-variables`.

**Parameters**

- **`releaseId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Confirmation that the Variable Snapshot for a Release was updated, containing the updated Release

`ReleaseResource`.

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`BuildInformation`** <span class="type-label">array of object</span>
  - **`Branch`** <span class="type-label">string</span>
  - **`BuildEnvironment`** <span class="type-label">string</span>
  - **`BuildNumber`** <span class="type-label">string</span>
  - **`BuildUrl`** <span class="type-label">string</span>
  - **`Commits`** <span class="type-label">array of object</span>
  - **`IssueTrackerName`** <span class="type-label">string</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`VcsCommitNumber`** <span class="type-label">string</span>
  - **`VcsCommitUrl`** <span class="type-label">string</span>
  - **`VcsRoot`** <span class="type-label">string</span>
  - **`VcsType`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span>
- **`ChannelId`** <span class="type-label">string</span>
- **`CustomFields`** <span class="type-label">object</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span>
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitReferenceResource`** <span class="type-label">object</span>
  - **`GitResourceReferenceName`** <span class="type-label">string</span>
- **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span> — Maximum length 349.
- **`VersionControlReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "BuildInformation": [
    {
      "Branch": "string",
      "BuildEnvironment": "string",
      "BuildNumber": "string",
      "BuildUrl": "string",
      "Commits": [
        {}
      ],
      "IssueTrackerName": "string",
      "PackageId": "string",
      "VcsCommitNumber": "string",
      "VcsCommitUrl": "string",
      "VcsRoot": "string",
      "VcsType": "string",
      "Version": "string",
      "WorkItems": [
        {}
      ]
    }
  ],
  "ChannelId": "string",
  "CustomFields": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Id": "string",
  "IgnoreChannelRules": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LibraryVariableSetSnapshotIds": [
    "string"
  ],
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectDeploymentProcessSnapshotId": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "ReleaseNotes": "string",
  "SelectedGitResources": [
    {
      "ActionName": "string",
      "GitReferenceResource": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "GitResourceReferenceName": "string"
    }
  ],
  "SelectedPackages": [
    {
      "ActionName": "string",
      "PackageReferenceName": "string",
      "StepName": "string",
      "Version": "string"
    }
  ],
  "SpaceId": "string",
  "Version": "string",
  "VersionControlReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  }
}
```
</div>
