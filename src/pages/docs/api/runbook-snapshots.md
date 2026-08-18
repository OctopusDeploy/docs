---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Runbook Snapshots
---

## Get the packages and Git references that were used in a Runbook run

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookRuns/\{id\}/details/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookRuns/{id}/details/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook run to load packages for.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project to get Runbook run packages for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Packages and Git references that were used in a Runbook run

- **`GitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`DefaultBranch`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FilePathFilters`** :span[array of string]{.type-label}
  - **`GitCredentialId`** :span[string]{.type-label}
  - **`GitHubConnectionId`** :span[string]{.type-label}
  - **`GitResourceSelectedLastRelease`** :span[object]{.type-label}
  - **`IsResolvable`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`RepositoryUri`** :span[string]{.type-label}  
    Minimum length 1.
- **`Packages`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label}
  - **`FeedId`** :span[string]{.type-label}
  - **`FeedName`** :span[string]{.type-label}
  - **`FixedVersion`** :span[string]{.type-label}
  - **`IsResolvable`** :span[boolean]{.type-label}  
    Gets or sets a value indicating whether the PackageId or FeedId contain no references to other variables. Variables can be used to select different NuGet feeds or packages at deployment time, however, this means that it's not possible to resolve which feed/package to search when creating a release.
  - **`NuGetFeedId`** :span[string]{.type-label}
  - **`NuGetFeedName`** :span[string]{.type-label}
  - **`NuGetPackageId`** :span[string]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`ProjectName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`VersionSelectedLastRelease`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "GitResources": [
    {
      "ActionName": "string",
      "DefaultBranch": "string",
      "FilePathFilters": [
        "string"
      ],
      "GitCredentialId": "string",
      "GitHubConnectionId": "string",
      "GitResourceSelectedLastRelease": {
        "GitCommit": "string",
        "GitRef": "string"
      },
      "IsResolvable": true,
      "Name": "string",
      "RepositoryUri": "string"
    }
  ],
  "Packages": [
    {
      "ActionName": "string",
      "FeedId": "string",
      "FeedName": "string",
      "FixedVersion": "string",
      "IsResolvable": true,
      "NuGetFeedId": "string",
      "NuGetFeedName": "string",
      "NuGetPackageId": "string",
      "PackageId": "string",
      "PackageReferenceName": "string",
      "ProjectName": "string",
      "StepName": "string",
      "VersionSelectedLastRelease": "string"
    }
  ]
}
```
:::

## Get a paginated list of all of the Runbook Snapshots that belong to the given Project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookSnapshots"}

Also reachable at `/api/projects/{projectId}/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots`.

Runbook Snapshots will be ordered from most recent to least recent.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project to get runbook snapshots for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`searchByName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of all of the Runbook Snapshots that belong to the given Project.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Assembled`** :span[string]{.type-label}  
    Format `date-time`.
  - **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FrozenRunbookProcessId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitReference`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
    Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Notes`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RunbookId`** :span[string]{.type-label}
  - **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`SelectedPackages`** :span[array of object]{.type-label}
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
      "Assembled": "2020-01-01T00:00:00.000Z",
      "FrozenProjectVariableSetId": "string",
      "FrozenRunbookProcessId": "string",
      "GitReference": {
        "GitCommit": "string",
        "GitRef": "string",
        "VariablesGitCommit": "string"
      },
      "Id": "string",
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
      "Name": "string",
      "Notes": "string",
      "ProjectId": "string",
      "ProjectVariableSetSnapshotId": "string",
      "RunbookId": "string",
      "SelectedGitResources": [
        {}
      ],
      "SelectedPackages": [
        {}
      ],
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

## Create a Runbook Snapshot

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/runbookSnapshots"}

Also reachable at `/api/projects/{projectId}/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the project that owns the runbook to snapshot.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the runbook snapshot. Minimum length 1.
- **`Notes`** :span[string]{.type-label}  
  Any additional information about the runbook snapshot.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  ID of the project that owns the runbook to snapshot.
- **`Publish`** :span[string]{.type-label}  
  Publishes the snapshot when set to any non-blank value, making it the snapshot that runbook triggers and 'published' runs use. The value itself is not stored. Leave unset to create the snapshot without publishing it.
- **`RunbookId`** :span[string]{.type-label} *(required)*  
  ID of the runbook to snapshot.
- **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label} *(required)*
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}  
  The packages and versions used in the runbook snapshot.
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
  "Publish": "string",
  "RunbookId": "string",
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
  "SpaceId": "string"
}
```
:::

**Response**

`201` — Created

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
  Minimum length 1.
- **`FrozenRunbookProcessId`** :span[string]{.type-label}  
  Minimum length 1.
- **`GitReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Notes`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookId`** :span[string]{.type-label}
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

:::api-example{label="Response"}
```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "FrozenProjectVariableSetId": "string",
  "FrozenRunbookProcessId": "string",
  "GitReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  },
  "Id": "string",
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
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "RunbookId": "string",
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
  "SpaceId": "string"
}
```
:::

## Get a single Runbook Snapshot by project ID and name

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookSnapshots/\{idOrName\}"}

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{idOrName}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{idOrName}`.

**Path Parameters**

- **`idOrName`** :span[string]{.type-label} *(required)*  
  ID or Name of the RunbookSnapshot to load.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project to get Runbook Snapshot for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
  Minimum length 1.
- **`FrozenRunbookProcessId`** :span[string]{.type-label}  
  Minimum length 1.
- **`GitReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Notes`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookId`** :span[string]{.type-label}
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

:::api-example{label="Response"}
```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "FrozenProjectVariableSetId": "string",
  "FrozenRunbookProcessId": "string",
  "GitReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  },
  "Id": "string",
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
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "RunbookId": "string",
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
  "SpaceId": "string"
}
```
:::

## Modify a Runbook Snapshot

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/runbookSnapshots/\{id\}"}

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the runbook snapshot to modify.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the project that owns the runbook.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the runbook snapshot to modify.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the runbook snapshot. Minimum length 1.
- **`Notes`** :span[string]{.type-label}  
  Any additional information about the runbook snapshot.
- **`ProjectId`** :span[string]{.type-label}  
  Not used to locate the snapshot; the snapshot ID alone finds it. Safe to omit.
- **`SelectedGitResources`** :span[array of object]{.type-label}  
  The git resources and versions used in the runbook snapshot.
  - **`ActionName`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label} *(required)*
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}  
  The packages and versions used in the runbook snapshot.
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Id": "string",
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
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
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Confirmation that the Runbook Snapshot was modified, containing the updated snapshot

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
  Minimum length 1.
- **`FrozenRunbookProcessId`** :span[string]{.type-label}  
  Minimum length 1.
- **`GitReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Notes`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookId`** :span[string]{.type-label}
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

:::api-example{label="Response"}
```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "FrozenProjectVariableSetId": "string",
  "FrozenRunbookProcessId": "string",
  "GitReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  },
  "Id": "string",
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
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "RunbookId": "string",
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
  "SpaceId": "string"
}
```
:::

## Get the runbook runs for the given snapshot

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookSnapshots/\{id\}/runbookRuns"}

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/runbookRuns`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Contains the Runbook Runs for the given Runbook Snapshot.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Comments`** :span[string]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DebugMode`** :span[string]{.type-label}
  - **`DeployedBy`** :span[string]{.type-label}
  - **`DeployedById`** :span[string]{.type-label}
  - **`DeployedToMachineIds`** :span[array of string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ExcludedMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`FailureEncountered`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`FormValues`** :span[object]{.type-label}
  - **`FrozenRunbookProcessId`** :span[string]{.type-label}
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
  - **`RunbookId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RunbookName`** :span[string]{.type-label}
  - **`RunbookSnapshotId`** :span[string]{.type-label}  
    Minimum length 1.
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
      "Comments": "string",
      "Created": "2020-01-01T00:00:00.000Z",
      "DebugMode": "string",
      "DeployedBy": "string",
      "DeployedById": "string",
      "DeployedToMachineIds": [
        "string"
      ],
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
      "FormValues": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "FrozenRunbookProcessId": "string",
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
      "RunbookId": "string",
      "RunbookName": "string",
      "RunbookSnapshotId": "string",
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

## Get a Runbook Run Preview for a Runbook Snapshot

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookSnapshots/\{id\}/runbookRuns/preview/\{environmentId\}"}

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}`, `/api/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`, `/api/{spaceId}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`.

Gets a document that describes what steps will/won't be run during a run to a given environment (and tenant if supplied)

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`includeDisabledSteps`** :span[boolean]{.type-label}  
  Boolean to include/exclude disabled steps from response.
- **`tenant`** :span[string]{.type-label}  
  ID of the Tenant.

**Response**

`200` — The requested Runbook Run preview

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

## Get a Runbook Run Template for a Runbook Snapshot

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookSnapshots/\{id\}/runbookRuns/template"}

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/template`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/template`.

Gets all of the information necessary for creating or editing a run for this snapshot.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot to get a Runbook Run Template for.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project the Runbook Snapshot belongs to.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Run Template

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsGitResourceModified`** :span[boolean]{.type-label}
- **`IsLibraryVariableSetModified`** :span[boolean]{.type-label}
- **`IsRunbookProcessModified`** :span[boolean]{.type-label}
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
  "Id": "string",
  "IsGitResourceModified": true,
  "IsLibraryVariableSetModified": true,
  "IsRunbookProcessModified": true,
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

## Update the variable snapshots for a Runbook Snapshot

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/runbookSnapshots/\{id\}/snapshot-variables"}

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/snapshot-variables`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/snapshot-variables`.

Update the variable snapshots associated with the runbook snapshot to the latest versions. The runbook's process must not have changed since the snapshot was created.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Runbook Snapshot Variables were refreshed, containing the updated Snapshot

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
  Minimum length 1.
- **`FrozenRunbookProcessId`** :span[string]{.type-label}  
  Minimum length 1.
- **`GitReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Notes`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookId`** :span[string]{.type-label}
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

:::api-example{label="Response"}
```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "FrozenProjectVariableSetId": "string",
  "FrozenRunbookProcessId": "string",
  "GitReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  },
  "Id": "string",
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
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "RunbookId": "string",
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
  "SpaceId": "string"
}
```
:::

## Update the variable snapshots for a Runbook Snapshot

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/runbookSnapshots/\{id\}/snapshot-variables/v1"}

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/snapshot-variables/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/snapshot-variables/v1`.

Update the variable snapshots associated with the runbook snapshot to the latest versions. The runbook's process must not have changed since the snapshot was created.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Runbook Snapshot Variables were refreshed, containing the updated Snapshot

- **`Resource`** :span[object]{.type-label}
  - **`Assembled`** :span[string]{.type-label}  
    Format `date-time`.
  - **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FrozenRunbookProcessId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitReference`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
    Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Notes`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RunbookId`** :span[string]{.type-label}
  - **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`SelectedPackages`** :span[array of object]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Resource": {
    "Assembled": "2020-01-01T00:00:00.000Z",
    "FrozenProjectVariableSetId": "string",
    "FrozenRunbookProcessId": "string",
    "GitReference": {
      "GitCommit": "string",
      "GitRef": "string",
      "VariablesGitCommit": "string"
    },
    "Id": "string",
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
    "Name": "string",
    "Notes": "string",
    "ProjectId": "string",
    "ProjectVariableSetSnapshotId": "string",
    "RunbookId": "string",
    "SelectedGitResources": [
      {
        "ActionName": "string",
        "GitReferenceResource": {},
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
    "SpaceId": "string"
  }
}
```
:::

## Get a list of Variable Sets included in the Runbook Snapshot's current Variable Snapshot

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbookSnapshots/\{id\}/variables"}

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/variables`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/variables`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot to get variables for.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project the Runbook Snapshot is in.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Runbook Snapshot Variables

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

## Get a list of Runbook Run Previews for a Runbook Snapshot

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/runbookSnapshots/\{runbookSnapshotId\}/runbookRuns/previews"}

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{runbookSnapshotId}/runbookRuns/previews`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{runbookSnapshotId}/runbookRuns/previews`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`runbookSnapshotId`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`DeploymentPreviews`** :span[array of object]{.type-label} *(required)*  
  The environment/tenant combinations to preview, one entry per combination. Leave an entry's TenantId unset to preview an untenanted run in that environment.
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`IncludeDisabledSteps`** :span[boolean]{.type-label}  
  Boolean to include/exclude disabled steps from response.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`RunbookSnapshotId`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

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
  "ProjectId": "string",
  "RunbookSnapshotId": "string",
  "SpaceId": "string"
}
```
:::

**Response**

`200` — A preview for a Runbook run, representing the planned execution.

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

## Get a paginated list of all of the Runbook Snapshots that belong to the given Runbook

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/runbooks/\{id\}/runbookSnapshots"}

Also reachable at `/api/projects/{projectId}/runbooks/{id}/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/runbookSnapshots`.

Runbook Snapshots will be ordered from most recent to least recent.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the runbook to get runbook Snapshots for.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project the runbook belongs to.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`searchByName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of all of the Runbook Snapshots that belong to the given Runbook.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Assembled`** :span[string]{.type-label}  
    Format `date-time`.
  - **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FrozenRunbookProcessId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitReference`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
    Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Notes`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RunbookId`** :span[string]{.type-label}
  - **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`SelectedPackages`** :span[array of object]{.type-label}
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
      "Assembled": "2020-01-01T00:00:00.000Z",
      "FrozenProjectVariableSetId": "string",
      "FrozenRunbookProcessId": "string",
      "GitReference": {
        "GitCommit": "string",
        "GitRef": "string",
        "VariablesGitCommit": "string"
      },
      "Id": "string",
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
      "Name": "string",
      "Notes": "string",
      "ProjectId": "string",
      "ProjectVariableSetSnapshotId": "string",
      "RunbookId": "string",
      "SelectedGitResources": [
        {}
      ],
      "SelectedPackages": [
        {}
      ],
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

## Delete an existing Runbook Snapshot

:endpoint{method="DELETE" path="/api/\{spaceId\}/projects/\{projectId\}/runbooksnapshots/\{id\}"}

Also reachable at `/api/projects/{projectId}/runbooksnapshots/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooksnapshots/{id}`.

Also deletes all of the Runbook Runs, Tasks and other associated resources belonging to the Runbook Snapshot.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot to delete.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project that the Runbook Snapshot belongs to.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Get a paginated list of Runbook Snapshots

:endpoint{method="GET" path="/api/\{spaceId\}/runbookSnapshots"}

Also reachable at `/api/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/runbookSnapshots`.

Gets a paginated list of the runbook snapshots in the supplied Octopus Deploy Space, from all projects. The results will be sorted from most recent to least recent snapshot.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of the runbook snapshots in the supplied Octopus Deploy Space, from all projects. The results will be sorted from most recent to least recent snapshot.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Assembled`** :span[string]{.type-label}  
    Format `date-time`.
  - **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FrozenRunbookProcessId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitReference`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
    Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Notes`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RunbookId`** :span[string]{.type-label}
  - **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`SelectedPackages`** :span[array of object]{.type-label}
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
      "Assembled": "2020-01-01T00:00:00.000Z",
      "FrozenProjectVariableSetId": "string",
      "FrozenRunbookProcessId": "string",
      "GitReference": {
        "GitCommit": "string",
        "GitRef": "string",
        "VariablesGitCommit": "string"
      },
      "Id": "string",
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
      "Name": "string",
      "Notes": "string",
      "ProjectId": "string",
      "ProjectVariableSetSnapshotId": "string",
      "RunbookId": "string",
      "SelectedGitResources": [
        {}
      ],
      "SelectedPackages": [
        {}
      ],
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

## Create a Runbook Snapshot

:endpoint{method="POST" path="/api/\{spaceId\}/runbookSnapshots"}

Also reachable at `/api/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/runbookSnapshots`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the runbook snapshot. Minimum length 1.
- **`Notes`** :span[string]{.type-label}  
  Any additional information about the runbook snapshot.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  ID of the project that owns the runbook to snapshot.
- **`Publish`** :span[string]{.type-label}  
  Publishes the snapshot when set to any non-blank value, making it the snapshot that runbook triggers and 'published' runs use. The value itself is not stored. Leave unset to create the snapshot without publishing it.
- **`RunbookId`** :span[string]{.type-label} *(required)*  
  ID of the runbook to snapshot.
- **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`ActionName`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label} *(required)*
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}  
  The packages and versions used in the runbook snapshot.
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
  "Publish": "string",
  "RunbookId": "string",
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
  "SpaceId": "string"
}
```
:::

**Response**

`201` — Created

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
  Minimum length 1.
- **`FrozenRunbookProcessId`** :span[string]{.type-label}  
  Minimum length 1.
- **`GitReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Notes`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookId`** :span[string]{.type-label}
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

:::api-example{label="Response"}
```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "FrozenProjectVariableSetId": "string",
  "FrozenRunbookProcessId": "string",
  "GitReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  },
  "Id": "string",
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
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "RunbookId": "string",
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
  "SpaceId": "string"
}
```
:::

## Get a Runbook Snapshot by ID

:endpoint{method="GET" path="/api/\{spaceId\}/runbookSnapshots/\{id\}"}

Also reachable at `/api/runbookSnapshots/{id}`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the RunbookSnapshot to retrieve.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested runbook snapshot

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
  Minimum length 1.
- **`FrozenRunbookProcessId`** :span[string]{.type-label}  
  Minimum length 1.
- **`GitReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Notes`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookId`** :span[string]{.type-label}
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

:::api-example{label="Response"}
```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "FrozenProjectVariableSetId": "string",
  "FrozenRunbookProcessId": "string",
  "GitReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  },
  "Id": "string",
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
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "RunbookId": "string",
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
  "SpaceId": "string"
}
```
:::

## Modify a Runbook Snapshot

:endpoint{method="PUT" path="/api/\{spaceId\}/runbookSnapshots/\{id\}"}

Also reachable at `/api/runbookSnapshots/{id}`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the runbook snapshot to modify.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Id`** :span[string]{.type-label} *(required)*  
  ID of the runbook snapshot to modify.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the runbook snapshot. Minimum length 1.
- **`Notes`** :span[string]{.type-label}  
  Any additional information about the runbook snapshot.
- **`ProjectId`** :span[string]{.type-label}  
  Not used to locate the snapshot; the snapshot ID alone finds it. Safe to omit.
- **`SelectedGitResources`** :span[array of object]{.type-label}  
  The git resources and versions used in the runbook snapshot.
  - **`ActionName`** :span[string]{.type-label} *(required)*  
    Minimum length 1.
  - **`GitReferenceResource`** :span[object]{.type-label} *(required)*
  - **`GitResourceReferenceName`** :span[string]{.type-label}
- **`SelectedPackages`** :span[array of object]{.type-label}  
  The packages and versions used in the runbook snapshot.
  - **`ActionName`** :span[string]{.type-label}
  - **`PackageReferenceName`** :span[string]{.type-label}
  - **`StepName`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Id": "string",
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
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
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Confirmation that the Runbook Snapshot was modified, containing the updated snapshot

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
  Minimum length 1.
- **`FrozenRunbookProcessId`** :span[string]{.type-label}  
  Minimum length 1.
- **`GitReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Notes`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookId`** :span[string]{.type-label}
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

:::api-example{label="Response"}
```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "FrozenProjectVariableSetId": "string",
  "FrozenRunbookProcessId": "string",
  "GitReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  },
  "Id": "string",
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
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "RunbookId": "string",
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
  "SpaceId": "string"
}
```
:::

## Get the runbook runs for the given snapshot

:endpoint{method="GET" path="/api/\{spaceId\}/runbookSnapshots/\{id\}/runbookRuns"}

Also reachable at `/api/runbookSnapshots/{id}/runbookRuns`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}/runbookRuns`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Contains the Runbook Runs for the given Runbook Snapshot.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`ChangeRequestSettings`** :span[array of object]{.type-label}
  - **`Comments`** :span[string]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`DebugMode`** :span[string]{.type-label}
  - **`DeployedBy`** :span[string]{.type-label}
  - **`DeployedById`** :span[string]{.type-label}
  - **`DeployedToMachineIds`** :span[array of string]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ExcludedMachineIds`** :span[array of string]{.type-label}  
    A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** :span[array of string]{.type-label}  
    A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** :span[object]{.type-label}
  - **`FailTargetDiscovery`** :span[boolean]{.type-label}
  - **`FailureEncountered`** :span[boolean]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`FormValues`** :span[object]{.type-label}
  - **`FrozenRunbookProcessId`** :span[string]{.type-label}
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
  - **`RunbookId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RunbookName`** :span[string]{.type-label}
  - **`RunbookSnapshotId`** :span[string]{.type-label}  
    Minimum length 1.
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
      "Comments": "string",
      "Created": "2020-01-01T00:00:00.000Z",
      "DebugMode": "string",
      "DeployedBy": "string",
      "DeployedById": "string",
      "DeployedToMachineIds": [
        "string"
      ],
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
      "FormValues": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "FrozenRunbookProcessId": "string",
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
      "RunbookId": "string",
      "RunbookName": "string",
      "RunbookSnapshotId": "string",
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

## Get a Runbook Run Preview for a Runbook Snapshot

:endpoint{method="GET" path="/api/\{spaceId\}/runbookSnapshots/\{id\}/runbookRuns/preview/\{environmentId\}"}

Also reachable at `/api/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}`, `/api/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`, `/api/{spaceId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`.

Gets a document that describes what steps will/won't be run during a run to a given environment (and tenant if supplied)

**Path Parameters**

- **`environmentId`** :span[string]{.type-label} *(required)*  
  ID of the Environment.
- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`includeDisabledSteps`** :span[boolean]{.type-label}  
  Boolean to include/exclude disabled steps from response.
- **`projectId`** :span[string]{.type-label}  
  ID of the Project.
- **`tenant`** :span[string]{.type-label}  
  ID of the Tenant.

**Response**

`200` — The requested Runbook Run preview

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

## Get a Runbook Run Template for a Runbook Snapshot

:endpoint{method="GET" path="/api/\{spaceId\}/runbookSnapshots/\{id\}/runbookRuns/template"}

Also reachable at `/api/runbookSnapshots/{id}/runbookRuns/template`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}/runbookRuns/template`.

Gets all of the information necessary for creating or editing a run for this snapshot.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot to get a Runbook Run Template for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`projectId`** :span[string]{.type-label}  
  ID of the Project the Runbook Snapshot belongs to.

**Response**

`200` — The requested Runbook Run Template

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsGitResourceModified`** :span[boolean]{.type-label}
- **`IsLibraryVariableSetModified`** :span[boolean]{.type-label}
- **`IsRunbookProcessModified`** :span[boolean]{.type-label}
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
  "Id": "string",
  "IsGitResourceModified": true,
  "IsLibraryVariableSetModified": true,
  "IsRunbookProcessModified": true,
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

## Update the variable snapshots for a Runbook Snapshot

:endpoint{method="POST" path="/api/\{spaceId\}/runbookSnapshots/\{id\}/snapshot-variables"}

Also reachable at `/api/runbookSnapshots/{id}/snapshot-variables`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}/snapshot-variables`.

Update the variable snapshots associated with the runbook snapshot to the latest versions. The runbook's process must not have changed since the snapshot was created.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Runbook Snapshot Variables were refreshed, containing the updated Snapshot

- **`Assembled`** :span[string]{.type-label}  
  Format `date-time`.
- **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
  Minimum length 1.
- **`FrozenRunbookProcessId`** :span[string]{.type-label}  
  Minimum length 1.
- **`GitReference`** :span[object]{.type-label}
  - **`GitCommit`** :span[string]{.type-label}
  - **`GitRef`** :span[string]{.type-label}
  - **`VariablesGitCommit`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
  Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}  
  Minimum length 1.
- **`Notes`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label}
- **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
  Minimum length 1.
- **`RunbookId`** :span[string]{.type-label}
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

:::api-example{label="Response"}
```json
{
  "Assembled": "2020-01-01T00:00:00.000Z",
  "FrozenProjectVariableSetId": "string",
  "FrozenRunbookProcessId": "string",
  "GitReference": {
    "GitCommit": "string",
    "GitRef": "string",
    "VariablesGitCommit": "string"
  },
  "Id": "string",
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
  "Name": "string",
  "Notes": "string",
  "ProjectId": "string",
  "ProjectVariableSetSnapshotId": "string",
  "RunbookId": "string",
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
  "SpaceId": "string"
}
```
:::

## Get a paginated list of all of the Runbook Snapshots that belong to the given Runbook

:endpoint{method="GET" path="/api/\{spaceId\}/runbooks/\{id\}/runbookSnapshots"}

Also reachable at `/api/runbooks/{id}/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/runbooks/{id}/runbookSnapshots`.

Runbook Snapshots will be ordered from most recent to least recent.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the runbook to get runbook Snapshots for.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`projectId`** :span[string]{.type-label}  
  The ID of the project the runbook belongs to.
- **`searchByName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of all of the Runbook Snapshots that belong to the given Runbook.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Assembled`** :span[string]{.type-label}  
    Format `date-time`.
  - **`FrozenProjectVariableSetId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`FrozenRunbookProcessId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`GitReference`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** :span[array of string]{.type-label}  
    Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Notes`** :span[string]{.type-label}
  - **`ProjectId`** :span[string]{.type-label}
  - **`ProjectVariableSetSnapshotId`** :span[string]{.type-label}  
    Minimum length 1.
  - **`RunbookId`** :span[string]{.type-label}
  - **`SelectedGitResources`** :span[array of object]{.type-label}
  - **`SelectedPackages`** :span[array of object]{.type-label}
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
      "Assembled": "2020-01-01T00:00:00.000Z",
      "FrozenProjectVariableSetId": "string",
      "FrozenRunbookProcessId": "string",
      "GitReference": {
        "GitCommit": "string",
        "GitRef": "string",
        "VariablesGitCommit": "string"
      },
      "Id": "string",
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
      "Name": "string",
      "Notes": "string",
      "ProjectId": "string",
      "ProjectVariableSetSnapshotId": "string",
      "RunbookId": "string",
      "SelectedGitResources": [
        {}
      ],
      "SelectedPackages": [
        {}
      ],
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

## Delete an existing Runbook Snapshot

:endpoint{method="DELETE" path="/api/\{spaceId\}/runbooksnapshots/\{id\}"}

Also reachable at `/api/runbooksnapshots/{id}`, `/api/spaces/{spaceIdentifier}/runbooksnapshots/{id}`.

Also deletes all of the Runbook Runs, Tasks and other associated resources belonging to the Runbook Snapshot.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Runbook Snapshot to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success
