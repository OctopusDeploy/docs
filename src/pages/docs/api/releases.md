---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Releases
---

## List all of the releases that belong to the given Channel

:endpoint{method="GET" path="/api/\{spaceId\}/channels/\{id\}/releases"}

Also reachable at `/api/channels/{id}/releases`, `/api/spaces/{spaceIdentifier}/channels/{id}/releases`.

Releases will be ordered from most recent to least recent,

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Channel to get Releases for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space to which the given Channel belongs.

**Query Parameters**

- **`projectId`** :span[string]{.type-label}  
  ID of the Project to which the given Channel belongs.
- **`searchByVersion`** :span[string]{.type-label}  
  A partial version, to limit the set of Releases to those with a version that includes the partial version.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — List of Releases on the given Channel.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Assembled`** :span[string]{.type-label}  
    Format `date-time`.
  - **`BuildInformation`** :span[array of object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`CustomFields`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IgnoreChannelRules`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
    Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectDeploymentProcessSnapshotId`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`SelectedPackages`** :span[array of object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}  
    Maximum length 349.
  - **`VersionControlReference`** :span[object]{.type-label}
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
:::

## List all of the releases that belong to the given Channel

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/channels/\{id\}/releases"}

Also reachable at `/api/projects/{projectId}/channels/{id}/releases`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{id}/releases`.

Releases will be ordered from most recent to least recent,

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Channel to get Releases for.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project to which the given Channel belongs.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space to which the given Channel belongs.

**Query Parameters**

- **`searchByVersion`** :span[string]{.type-label}  
  A partial version, to limit the set of Releases to those with a version that includes the partial version.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — List of Releases on the given Channel.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Assembled`** :span[string]{.type-label}  
    Format `date-time`.
  - **`BuildInformation`** :span[array of object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`CustomFields`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IgnoreChannelRules`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
    Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectDeploymentProcessSnapshotId`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`SelectedPackages`** :span[array of object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}  
    Maximum length 349.
  - **`VersionControlReference`** :span[object]{.type-label}
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
:::

## List all of the releases that belong to the given Project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/releases"}

Also reachable at `/api/projects/{projectId}/releases`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/releases`.

Releases will be ordered from most recent to least recent

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project to get Releases for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space to which the given Project belongs.

**Query Parameters**

- **`searchByVersion`** :span[string]{.type-label}  
  A partial version, to limit the set of Releases to those with a version that includes the partial version.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The list of Releases

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Assembled`** :span[string]{.type-label}  
    Format `date-time`.
  - **`BuildInformation`** :span[array of object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`CustomFields`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IgnoreChannelRules`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
    Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectDeploymentProcessSnapshotId`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`SelectedPackages`** :span[array of object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}  
    Maximum length 349.
  - **`VersionControlReference`** :span[object]{.type-label}
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
:::

## Get a list of Variable Sets included in the Release's current Variable Snapshot

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/releases/\{id\}/variables"}

Also reachable at `/api/projects/{projectId}/releases/{id}/variables`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/releases/{id}/variables`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Release to get variables for.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project the Release is in.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Variables

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`OwnerId`** :span[string]{.type-label}  
  Gets or sets the ID of the document that owns these variables.
- **`ScopeValues`** :span[object]{.type-label}
  - **`Actions`** :span[array of object]{.type-label}
  - **`Channels`** :span[array of object]{.type-label}
  - **`EnvironmentParameters`** :span[array of object]{.type-label}
  - **`Environments`** :span[array of object]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`ProcessTemplateSteps`** :span[array of object]{.type-label}
  - **`Processes`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of object]{.type-label}
  - **`TargetTagParameters`** :span[array of object]{.type-label}
  - **`TenantTagParameters`** :span[array of object]{.type-label}
  - **`TenantTags`** :span[array of object]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Variables`** :span[array of object]{.type-label}  
  Gets the collection of variables.
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsEditable`** :span[boolean]{.type-label}
  - **`IsSensitive`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Prompt`** :span[object]{.type-label}
  - **`Scope`** :span[object]{.type-label}
  - **`Type`** :span[string]{.type-label}
  - **`Value`** :span[string]{.type-label}
- **`Version`** :span[integer]{.type-label}  
  Gets or sets the version number.

:::api-example{label="Response"}
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
:::

## Get a single release by project ID and version number

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/releases/\{version\}"}

Also reachable at `/api/projects/{projectId}/releases/{version}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/releases/{version}`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project containing the release.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the release.
- **`version`** :span[string]{.type-label} *(required)*  
  The version of the requested release.

**Response**

`200` — Success

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`BuildInformation`** :span[array of object]{.type-label}
  - **`Branch`** :span[string]{.type-label}
  - **`BuildEnvironment`** :span[string]{.type-label}
  - **`BuildNumber`** :span[string]{.type-label}
  - **`BuildUrl`** :span[string]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}
  - **`IssueTrackerName`** :span[string]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`VcsCommitNumber`** :span[string]{.type-label}
  - **`VcsCommitUrl`** :span[string]{.type-label}
  - **`VcsRoot`** :span[string]{.type-label}
  - **`VcsType`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}
- **`ChannelId`** :span[string]{.type-label}
- **`CustomFields`** :span[object]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}
- **`ReleaseNotes`** :span[string]{.type-label}
- **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label}
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}  
  Maximum length 349.
- **`VersionControlReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a list of Releases for the given Space

:endpoint{method="GET" path="/api/\{spaceId\}/releases"}

Also reachable at `/api/releases`, `/api/spaces/{spaceIdentifier}/releases`.

Lists all of the Releases in the supplied Octopus Deploy Space, from all projects. The results will be sorted from most recent to least recent release.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space to which the Releases belong.

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The list of Releases for the requested Space.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Assembled`** :span[string]{.type-label}  
    Format `date-time`.
  - **`BuildInformation`** :span[array of object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`CustomFields`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IgnoreChannelRules`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
    Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ProjectDeploymentProcessSnapshotId`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`SelectedPackages`** :span[array of object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}  
    Maximum length 349.
  - **`VersionControlReference`** :span[object]{.type-label}
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
:::

## Create a Release

:endpoint{method="POST" path="/api/\{spaceId\}/releases"}

Also reachable at `/api/releases`, `/api/spaces/{spaceIdentifier}/releases`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`ChannelId`** :span[string]{.type-label}
- **`CustomFields`** :span[object]{.type-label}
- **`IgnoreChannelRules`** :span[boolean]{.type-label}  
  Ignore channel rules.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`ReleaseNotes`** :span[string]{.type-label}
- **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label} *(required)*
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Version`** :span[string]{.type-label} *(required)*  
  Maximum length 349.
- **`VersionControlReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`BuildInformation`** :span[array of object]{.type-label}
  - **`Branch`** :span[string]{.type-label}
  - **`BuildEnvironment`** :span[string]{.type-label}
  - **`BuildNumber`** :span[string]{.type-label}
  - **`BuildUrl`** :span[string]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}
  - **`IssueTrackerName`** :span[string]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`VcsCommitNumber`** :span[string]{.type-label}
  - **`VcsCommitUrl`** :span[string]{.type-label}
  - **`VcsRoot`** :span[string]{.type-label}
  - **`VcsType`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}
- **`ChannelId`** :span[string]{.type-label}
- **`CustomFields`** :span[object]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}
- **`ReleaseNotes`** :span[string]{.type-label}
- **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label}
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}  
  Maximum length 349.
- **`VersionControlReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Create a Release

:endpoint{method="POST" path="/api/\{spaceId\}/releases/create/v1"}

Also reachable at `/api/releases/create/v1`, `/api/spaces/{spaceIdentifier}/releases/create/v1`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChannelName`** :span[string]{.type-label}  
  Name of the channel to use for the new release. Omit this argument to automatically select the best channel.
- **`CustomFields`** :span[object]{.type-label}  
  Values for the project's custom release fields, if it defines any, keyed by field name.
- **`GitCommit`** :span[string]{.type-label}  
  Only set alongside GitRef, when a specific commit is needed; GitRef alone uses the tip of that ref.
- **`GitRef`** :span[string]{.type-label}  
  The Git branch, tag or commit to snapshot the deployment process from. Required for a project that stores its configuration in Git, and must be left unset for one stored in the database — the command fails either way round. List a project's branches with get_branches.
- **`GitResources`** :span[array of string]{.type-label}  
  Git ref to use for a git resource in the release. Format: StepName:GitRef or StepName:GitResourceName:GitRef. If the GitResourceName is omitted, it's assumed to be the primary git resource for the step. The GitRef can be replaced with an asterisk. An asterisk will use the tip ref of the step-defined default branch.
- **`IgnoreChannelRules`** :span[boolean]{.type-label}  
  Create the release even when a package version, or the Git reference, violates the channel's version rules. This overrides a deliberate guardrail, so prefer correcting the versions or letting Octopus select the channel; only set it when explicitly asked to.
- **`IgnoreIfAlreadyExists`** :span[boolean]{.type-label}  
  If a release with the same version number already exists, return that one instead of failing — so the returned ReleaseId may be an existing release rather than a newly created one.
- **`PackagePrerelease`** :span[string]{.type-label}  
  Restrict automatic version selection to pre-release versions carrying this tag, for example "beta". Ignored for steps whose version is pinned by PackageVersion or Packages.
- **`PackageVersion`** :span[string]{.type-label}  
  One version to use for every package step. Leave unset to take the latest version of each package; use Packages instead to pin versions per step.
- **`Packages`** :span[array of string]{.type-label}  
  Version number to use for a package in the release. Format: StepName:Version or PackageID:Version or StepName:PackageName:Version. StepName, PackageID, and PackageName can be replaced with an asterisk. An asterisk will be assumed for StepName, PackageID, or PackageName if they are omitted.
- **`ProjectName`** :span[string]{.type-label} *(required)*
- **`ReleaseNotes`** :span[string]{.type-label}  
  Release Notes for the new release. Styling with Markdown is supported.
- **`ReleaseVersion`** :span[string]{.type-label}  
  Leave unset to let Octopus pick the next version from the project's versioning strategy, which is usually what you want.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`SpaceIdOrName`** :span[string]{.type-label} *(required)*  
  Both this and SpaceId are required, and normally hold the same space ID; set both.

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`ReleaseId`** :span[string]{.type-label}
- **`ReleaseVersion`** :span[string]{.type-label}  
  Minimum length 1.

:::api-example{label="Response"}
```json
{
  "ReleaseId": "string",
  "ReleaseVersion": "string"
}
```
:::

## Get a Release by ID

:endpoint{method="GET" path="/api/\{spaceId\}/releases/\{id\}"}

Also reachable at `/api/releases/{id}`, `/api/spaces/{spaceIdentifier}/releases/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Release to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space that owns the Release.

**Response**

`200` — The requested Release

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`BuildInformation`** :span[array of object]{.type-label}
  - **`Branch`** :span[string]{.type-label}
  - **`BuildEnvironment`** :span[string]{.type-label}
  - **`BuildNumber`** :span[string]{.type-label}
  - **`BuildUrl`** :span[string]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}
  - **`IssueTrackerName`** :span[string]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`VcsCommitNumber`** :span[string]{.type-label}
  - **`VcsCommitUrl`** :span[string]{.type-label}
  - **`VcsRoot`** :span[string]{.type-label}
  - **`VcsType`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}
- **`ChannelId`** :span[string]{.type-label}
- **`CustomFields`** :span[object]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}
- **`ReleaseNotes`** :span[string]{.type-label}
- **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label}
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}  
  Maximum length 349.
- **`VersionControlReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Update an existing Release

:endpoint{method="PUT" path="/api/\{spaceId\}/releases/\{id\}"}

Also reachable at `/api/releases/{id}`, `/api/spaces/{spaceIdentifier}/releases/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Release.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`ChannelId`** :span[string]{.type-label} *(required)*
- **`CustomFields`** :span[object]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the Release.
- **`IgnoreChannelRules`** :span[boolean]{.type-label}  
  If altering the Channel of an existing Release, its rules may be violated. This ignores those violations. If not altering the Release Channel, this parameter is ignored.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`ReleaseNotes`** :span[string]{.type-label}
- **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label} *(required)*
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Version`** :span[string]{.type-label} *(required)*  
  Maximum length 349.

:::api-example{label="Request"}
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
:::

**Response**

`200` — Confirmation that the Release was modified, containing the updated Release

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`BuildInformation`** :span[array of object]{.type-label}
  - **`Branch`** :span[string]{.type-label}
  - **`BuildEnvironment`** :span[string]{.type-label}
  - **`BuildNumber`** :span[string]{.type-label}
  - **`BuildUrl`** :span[string]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}
  - **`IssueTrackerName`** :span[string]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`VcsCommitNumber`** :span[string]{.type-label}
  - **`VcsCommitUrl`** :span[string]{.type-label}
  - **`VcsRoot`** :span[string]{.type-label}
  - **`VcsType`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}
- **`ChannelId`** :span[string]{.type-label}
- **`CustomFields`** :span[object]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}
- **`ReleaseNotes`** :span[string]{.type-label}
- **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label}
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}  
  Maximum length 349.
- **`VersionControlReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Delete an existing release, along with all of the deployments, tasks and other associated resources belonging to the release

:endpoint{method="DELETE" path="/api/\{spaceId\}/releases/\{id\}"}

Also reachable at `/api/releases/{id}`, `/api/spaces/{spaceIdentifier}/releases/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Release to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Get all of the information necessary for creating or editing a deployment for this release

:endpoint{method="GET" path="/api/\{spaceId\}/releases/\{id\}/deployments/template"}

Also reachable at `/api/releases/{id}/deployments/template`, `/api/spaces/{spaceIdentifier}/releases/{id}/deployments/template`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Release.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space.

**Response**

`200` — The requested Deployment Template for the release.

- **`DeploymentNotes`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDeploymentProcessModified`** :span[boolean]{.type-label}
- **`IsGitResourceModified`** :span[boolean]{.type-label}
- **`IsLibraryVariableSetModified`** :span[boolean]{.type-label}
- **`IsVariableSetModified`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PromoteTo`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`TenantPromotions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`PromoteTo`** :span[array of object]{.type-label}

:::api-example{label="Response"}
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
:::

## Get all defects for a release

:endpoint{method="GET" path="/api/\{spaceId\}/releases/\{releaseId\}/defects"}

Also reachable at `/api/releases/{releaseId}/defects`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/defects`.

**Path Parameters**

- **`releaseId`** :span[string]{.type-label} *(required)*  
  Id of the release.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Get all defects for a release.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Status`** :span[enum]{.type-label}  
    Allowed values: `Unresolved`, `Resolved`.
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
:::

## Record defect in a release

:endpoint{method="POST" path="/api/\{spaceId\}/releases/\{releaseId\}/defects"}

Also reachable at `/api/releases/{releaseId}/defects`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/defects`.

**Path Parameters**

- **`releaseId`** :span[string]{.type-label} *(required)*  
  Id of the release.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Description`** :span[string]{.type-label} *(required)*  
  Defect in the release. Minimum length 1.
- **`ReleaseId`** :span[string]{.type-label} *(required)*  
  Id of the release.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`Status`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "Description": "string",
  "ReleaseId": "string",
  "SpaceId": "string",
  "Status": "string"
}
```
:::

**Response**

`200` — The defect resource that was recorded against a release

- **`Description`** :span[string]{.type-label}  
  Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Status`** :span[enum]{.type-label}  
  Allowed values: `Unresolved`, `Resolved`.

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
  "Status": "Unresolved"
}
```
:::

## Resolve defect in a release

:endpoint{method="POST" path="/api/\{spaceId\}/releases/\{releaseId\}/defects/resolve"}

Also reachable at `/api/releases/{releaseId}/defects/resolve`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/defects/resolve`.

**Path Parameters**

- **`releaseId`** :span[string]{.type-label} *(required)*  
  Id of the release.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the release.

**Response**

`200` — Resolved defect

- **`Description`** :span[string]{.type-label}  
  Minimum length 1.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Status`** :span[enum]{.type-label}  
  Allowed values: `Unresolved`, `Resolved`.

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
  "Status": "Unresolved"
}
```
:::

## List all of the Deployments that belong to the given Release

:endpoint{method="GET" path="/api/\{spaceId\}/releases/\{releaseId\}/deployments"}

Also reachable at `/api/releases/{releaseId}/deployments`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/deployments`.

Deployments will be ordered from most recent to least recent.

**Path Parameters**

- **`releaseId`** :span[string]{.type-label} *(required)*  
  ID of the Release to load.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the Space to which the Release belongs.

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The list of Deployments for the given Release.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Changes`** :span[array of object]{.type-label}
  - **`ChangesMarkdown`** :span[string]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`Comments`** :span[string]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DebugMode`** :span[string]{.type-label}
  - **`DeployedBy`** :span[string]{.type-label}
  - **`DeployedById`** :span[string]{.type-label}
  - **`DeployedToMachineIds`** :span[array of string]{.type-label}
  - **`DeploymentProcessId`** :span[string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ExcludedMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`FailureEncountered`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`ForcePackageRedeployment`** :span[boolean]{.type-label}
  - **`FormValues`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`ManifestVariableSetId`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`Priority`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`QueueTime`** :span[string]{.type-label}  
    If set this time will be the used to schedule the deployment to a later time, null is assumed to mean the time will be executed immediately. Format `date-time`.
  - **`QueueTimeExpiry`** :span[string]{.type-label}  
    Format `date-time`.
  - **`ReleaseId`** :span[string]{.type-label}
  - **`SkipActions`** :span[array of string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`SpecificMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be deployed to. If the collection is empty, all enabled machines are deployed.
  - **`SpecificTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be included in the deployment. Only deployment targets that have at least one of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`TaskId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
  - **`TentacleRetentionPeriod`** :span[object]{.type-label}
  - **`UseGuidedFailure`** :span[boolean]{.type-label}  
    If set to true, the deployment will prompt for manual intervention (Fail/Retry/Ignore) when failures are encountered in activities that support it. May be overridden with the Octopus.UseGuidedFailure special variable.
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
:::

## Get a document that describes what steps will/won't be run during a deployment to a given environment (and tenant if supplied)

:endpoint{method="GET" path="/api/\{spaceId\}/releases/\{releaseId\}/deployments/preview/\{environmentId\}"}

Also reachable at `/api/releases/{releaseId}/deployments/preview/{environmentId}`, `/api/releases/{releaseId}/deployments/preview/{environmentId}/{tenantId}`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/deployments/preview/{environmentId}`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/deployments/preview/{environmentId}/{tenantId}`, `/api/{spaceId}/releases/{releaseId}/deployments/preview/{environmentId}/{tenantId}`.

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*  
  ID of the environment.
- **`releaseId`** :span[string]{.type-label} *(required)*  
  ID of the release.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the space containing the resources.

**Query Parameters**

- **`includeDisabledSteps`** :span[boolean]{.type-label}  
  Whether to include Disabled Steps in the preview.
- **`tenantId`** :span[string]{.type-label}  
  ID of the tenant.

**Response**

`200` — The requested Release Deployment Preview

- **`Changes`** :span[array of object]{.type-label}
  - **`BuildInformation`** :span[array of object]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}  
    Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}  
    Aggregate of distinct work items from all VersionMetadata.
- **`ChangesMarkdown`** :span[string]{.type-label}
- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** :span[array of object]{.type-label}
  - **`ActionId`** :span[string]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`ActionNumber`** :span[string]{.type-label}
  - **`AvailableTagSets`** :span[array of object]{.type-label}
  - **`CanBeSkipped`** :span[boolean]{.type-label}
  - **`ExcludedMachines`** :span[array of object]{.type-label}
  - **`HasNoApplicableMachines`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`MachineNames`** :span[array of string]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`UnavailableMachines`** :span[array of object]{.type-label}
- **`UseGuidedFailureModeByDefault`** :span[boolean]{.type-label}

:::api-example{label="Response"}
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
:::

## Return an array of documents that describes what steps will/won't be run during deployments to a given set of environments and tenants

:endpoint{method="POST" path="/api/\{spaceId\}/releases/\{releaseId\}/deployments/previews"}

Also reachable at `/api/releases/{releaseId}/deployments/previews`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/deployments/previews`.

**Path Parameters**

- **`releaseId`** :span[string]{.type-label} *(required)*  
  ID of the release.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the space containing the resources.

**Request Body**

- **`DeploymentPreviews`** :span[array of object]{.type-label} *(required)*  
  The array of requests you would like to make.
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`IncludeDisabledSteps`** :span[boolean]{.type-label}  
  Whether to include Disabled Steps in the preview.
- **`ReleaseId`** :span[string]{.type-label} *(required)*  
  ID of the release.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  ID of the space containing the resources.

:::api-example{label="Request"}
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
:::

**Response**

`200` — The requested array of Release Deployment Previews

- **`Changes`** :span[array of object]{.type-label}
  - **`BuildInformation`** :span[array of object]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}  
    Aggregate of distinct commits from all VersionMetadata.
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}  
    Aggregate of distinct work items from all VersionMetadata.
- **`ChangesMarkdown`** :span[string]{.type-label}
- **`Form`** :span[object]{.type-label}
  - **`Elements`** :span[array of object]{.type-label}  
    Elements of the form.
  - **`Values`** :span[object]{.type-label}  
    Values supplied for the form elements.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`StepsToExecute`** :span[array of object]{.type-label}
  - **`ActionId`** :span[string]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`ActionNumber`** :span[string]{.type-label}
  - **`AvailableTagSets`** :span[array of object]{.type-label}
  - **`CanBeSkipped`** :span[boolean]{.type-label}
  - **`ExcludedMachines`** :span[array of object]{.type-label}
  - **`HasNoApplicableMachines`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`MachineNames`** :span[array of string]{.type-label}
  - **`Machines`** :span[array of object]{.type-label}
  - **`Roles`** :span[array of string]{.type-label}
  - **`UnavailableMachines`** :span[array of object]{.type-label}
- **`UseGuidedFailureModeByDefault`** :span[boolean]{.type-label}

:::api-example{label="Response"}
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
:::

## Get the list of Packages that are missing from the built-in feed for a release

:endpoint{method="GET" path="/api/\{spaceId\}/releases/\{releaseId\}/missingPackages"}

Also reachable at `/api/spaces/{spaceIdentifier}/releases/{releaseId}/missingPackages`.

**Path Parameters**

- **`releaseId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The list of Packages from the built-in feed missing for a Release.

- **`Packages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Version`** :span[string]{.type-label}  
    Minimum length 1.

:::api-example{label="Response"}
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
:::

## Get all of the information necessary for creating or editing a deployment for this release

:endpoint{method="GET" path="/api/\{spaceId\}/releases/\{releaseId\}/progression"}

Also reachable at `/api/releases/{releaseId}/progression`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/progression`.

**Path Parameters**

- **`releaseId`** :span[string]{.type-label} *(required)*  
  Id of the release.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Lifecycle progression information necessary for creating or editing a deployment for a release

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NextDeployments`** :span[array of string]{.type-label}
- **`NextDeploymentsMinimumRequired`** :span[integer]{.type-label}
- **`Phases`** :span[array of object]{.type-label}
  - **`AutomaticDeploymentTargets`** :span[array of string]{.type-label}
  - **`Blocked`** :span[boolean]{.type-label}
  - **`Deployments`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsOptionalPhase`** :span[boolean]{.type-label}
  - **`IsPriorityPhase`** :span[boolean]{.type-label}
  - **`MinimumEnvironmentsBeforePromotion`** :span[integer]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`OptionalDeploymentTargets`** :span[array of string]{.type-label}
  - **`Progress`** :span[enum]{.type-label}  
    Allowed values: `Pending`, `Current`, `Complete`.

:::api-example{label="Response"}
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
:::

## Update the release notes on an existing Release

:endpoint{method="POST" path="/api/\{spaceId\}/releases/\{releaseId\}/release-notes"}

Also reachable at `/api/releases/{releaseId}/release-notes`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/release-notes`.

Only the release notes are changed and everything else about the Release is left alone. Variable expressions in the notes are evaluated before they are stored, so the saved text is the resolved one.

**Path Parameters**

- **`releaseId`** :span[string]{.type-label} *(required)*  
  Id of the release.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`ReleaseId`** :span[string]{.type-label} *(required)*  
  The ID of the release, for example 'Releases-123'.
- **`ReleaseNotes`** :span[string]{.type-label} *(required)*  
  The notes to store, replacing whatever the release currently has. Markdown is supported. Build information is in scope, so expressions such as #{Octopus.Release.WorkItems} and #{Octopus.Release.Number} are resolved before the notes are saved. Send an empty string to clear them.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "ReleaseId": "string",
  "ReleaseNotes": "string",
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Confirmation that the release notes were updated, containing the updated Release

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`BuildInformation`** :span[array of object]{.type-label}
  - **`Branch`** :span[string]{.type-label}
  - **`BuildEnvironment`** :span[string]{.type-label}
  - **`BuildNumber`** :span[string]{.type-label}
  - **`BuildUrl`** :span[string]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}
  - **`IssueTrackerName`** :span[string]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`VcsCommitNumber`** :span[string]{.type-label}
  - **`VcsCommitUrl`** :span[string]{.type-label}
  - **`VcsRoot`** :span[string]{.type-label}
  - **`VcsType`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}
- **`ChannelId`** :span[string]{.type-label}
- **`CustomFields`** :span[object]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}
- **`ReleaseNotes`** :span[string]{.type-label}
- **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label}
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}  
  Maximum length 349.
- **`VersionControlReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Update the Variable Snapshot for a Release

:endpoint{method="POST" path="/api/\{spaceId\}/releases/\{releaseId\}/snapshot-variables"}

Also reachable at `/api/releases/{releaseId}/snapshot-variables`, `/api/spaces/{spaceIdentifier}/releases/{releaseId}/snapshot-variables`.

**Path Parameters**

- **`releaseId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Confirmation that the Variable Snapshot for a Release was updated, containing the updated Release

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`BuildInformation`** :span[array of object]{.type-label}
  - **`Branch`** :span[string]{.type-label}
  - **`BuildEnvironment`** :span[string]{.type-label}
  - **`BuildNumber`** :span[string]{.type-label}
  - **`BuildUrl`** :span[string]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}
  - **`IssueTrackerName`** :span[string]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`VcsCommitNumber`** :span[string]{.type-label}
  - **`VcsCommitUrl`** :span[string]{.type-label}
  - **`VcsRoot`** :span[string]{.type-label}
  - **`VcsType`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}
- **`ChannelId`** :span[string]{.type-label}
- **`CustomFields`** :span[object]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IgnoreChannelRules`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectDeploymentProcessSnapshotId`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}
- **`ReleaseNotes`** :span[string]{.type-label}
- **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label}
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}  
  Maximum length 349.
- **`VersionControlReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::
