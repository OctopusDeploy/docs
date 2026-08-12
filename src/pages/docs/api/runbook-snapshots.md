---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Runbook Snapshots
---

## Get the packages and Git references that were used in a Runbook run

`GET` `/api/{spaceId}/projects/{projectId}/runbookRuns/{id}/details/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookRuns/{id}/details/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook run to load packages for.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project to get Runbook run packages for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Packages and Git references that were used in a Runbook run

`GetRunbookRunDetailsResponse`.

- **`GitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> — Minimum length 1.
  - **`DefaultBranch`** <span class="type-label">string</span> — Minimum length 1.
  - **`FilePathFilters`** <span class="type-label">array of string</span>
  - **`GitCredentialId`** <span class="type-label">string</span>
  - **`GitHubConnectionId`** <span class="type-label">string</span>
  - **`GitResourceSelectedLastRelease`** <span class="type-label">object</span>
  - **`IsResolvable`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`RepositoryUri`** <span class="type-label">string</span> — Minimum length 1.
- **`Packages`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span>
  - **`FeedId`** <span class="type-label">string</span>
  - **`FeedName`** <span class="type-label">string</span>
  - **`FixedVersion`** <span class="type-label">string</span>
  - **`IsResolvable`** <span class="type-label">boolean</span> — Gets or sets a value indicating whether the PackageId or FeedId contain no references to other variables. Variables can be used to select different NuGet feeds or packages at deployment time, however, this means that it's not possible to resolve which feed/package to search when creating a release.
  - **`NuGetFeedId`** <span class="type-label">string</span>
  - **`NuGetFeedName`** <span class="type-label">string</span>
  - **`NuGetPackageId`** <span class="type-label">string</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`ProjectName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`VersionSelectedLastRelease`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Gets a paginated list of all of the Runbook Snapshots that belong to the given Project

`GET` `/api/{spaceId}/projects/{projectId}/runbookSnapshots`

Also reachable at `/api/projects/{projectId}/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots`.

Runbook Snapshots will be ordered from most recent to least recent.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project to get runbook snapshots for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`searchByName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of all of the Runbook Snapshots that belong to the given Project.

`RunbookSnapshotResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
  - **`FrozenProjectVariableSetId`** <span class="type-label">string</span> — Minimum length 1.
  - **`FrozenRunbookProcessId`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitReference`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`Notes`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
  - **`RunbookId`** <span class="type-label">string</span>
  - **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`SelectedPackages`** <span class="type-label">array of object</span>
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
</div>

## Create a Runbook Snapshot

`POST` `/api/{spaceId}/projects/{projectId}/runbookSnapshots`

Also reachable at `/api/projects/{projectId}/runbookSnapshots`, `/api/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/runbookSnapshots`, `/api/{spaceId}/runbookSnapshots`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the project that owns the runbook to snapshot.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`CreateRunbookSnapshotCommand`

- **`Name`** <span class="type-label">string</span> *(required)* — The name of the runbook snapshot. Minimum length 1.
- **`Notes`** <span class="type-label">string</span> — Any additional information about the runbook snapshot.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — ID of the project that owns the runbook to snapshot.
- **`Publish`** <span class="type-label">string</span> — String which will publish the runbook snapshot if anything is specified.
- **`RunbookId`** <span class="type-label">string</span> *(required)* — ID of the runbook to snapshot.
- **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`ActionName`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`GitReferenceResource`** <span class="type-label">object</span> *(required)*
  - **`GitResourceReferenceName`** <span class="type-label">string</span>
- **`SelectedPackages`** <span class="type-label">array of object</span> — The packages and versions used in the runbook snapshot.
  - **`ActionName`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

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
</div>

**Response**

`201` — Created

`RunbookSnapshotResource`.

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`FrozenProjectVariableSetId`** <span class="type-label">string</span> — Minimum length 1.
- **`FrozenRunbookProcessId`** <span class="type-label">string</span> — Minimum length 1.
- **`GitReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Notes`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
- **`RunbookId`** <span class="type-label">string</span>
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

<div data-example="Response">

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
</div>

## Gets a single Runbook Snapshot by project ID and name

`GET` `/api/{spaceId}/projects/{projectId}/runbookSnapshots/{idOrName}`

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{idOrName}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{idOrName}`.

**Parameters**

- **`idOrName`** <span class="type-label">string</span> *(required)* — ID or Name of the RunbookSnapshot to load.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project to get Runbook Snapshot for.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

`RunbookSnapshotResource`.

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`FrozenProjectVariableSetId`** <span class="type-label">string</span> — Minimum length 1.
- **`FrozenRunbookProcessId`** <span class="type-label">string</span> — Minimum length 1.
- **`GitReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Notes`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
- **`RunbookId`** <span class="type-label">string</span>
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

<div data-example="Response">

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
</div>

## Modifies a Runbook Snapshot

`PUT` `/api/{spaceId}/projects/{projectId}/runbookSnapshots/{id}`

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}`, `/api/runbookSnapshots/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}`, `/api/{spaceId}/runbookSnapshots/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the runbook snapshot to modify.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the project that owns the runbook.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyRunbookSnapshotCommand`

- **`Id`** <span class="type-label">string</span> *(required)* — ID of the runbook snapshot to modify.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the runbook snapshot. Minimum length 1.
- **`Notes`** <span class="type-label">string</span> — Any additional information about the runbook snapshot.
- **`ProjectId`** <span class="type-label">string</span> — ID of the project that owns the runbook.
- **`SelectedGitResources`** <span class="type-label">array of object</span> — The git resources and versions used in the runbook snapshot.
  - **`ActionName`** <span class="type-label">string</span> *(required)* — Minimum length 1.
  - **`GitReferenceResource`** <span class="type-label">object</span> *(required)*
  - **`GitResourceReferenceName`** <span class="type-label">string</span>
- **`SelectedPackages`** <span class="type-label">array of object</span> — The packages and versions used in the runbook snapshot.
  - **`ActionName`** <span class="type-label">string</span>
  - **`PackageReferenceName`** <span class="type-label">string</span>
  - **`StepName`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

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
</div>

**Response**

`200` — Confirmation that the Runbook Snapshot was modified, containing the updated snapshot

`RunbookSnapshotResource`.

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`FrozenProjectVariableSetId`** <span class="type-label">string</span> — Minimum length 1.
- **`FrozenRunbookProcessId`** <span class="type-label">string</span> — Minimum length 1.
- **`GitReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Notes`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
- **`RunbookId`** <span class="type-label">string</span>
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

<div data-example="Response">

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
</div>

## Get the runbook runs for the given snapshot

`GET` `/api/{spaceId}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns`

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/runbookRuns`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Contains the Runbook Runs for the given Runbook Snapshot.

`RunbookRunResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Comments`** <span class="type-label">string</span>
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`DebugMode`** <span class="type-label">string</span>
  - **`DeployedBy`** <span class="type-label">string</span>
  - **`DeployedById`** <span class="type-label">string</span>
  - **`DeployedToMachineIds`** <span class="type-label">array of string</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ExcludedMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** <span class="type-label">object</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`FailureEncountered`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`FormValues`** <span class="type-label">object</span>
  - **`FrozenRunbookProcessId`** <span class="type-label">string</span>
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
  - **`RunbookId`** <span class="type-label">string</span> — Minimum length 1.
  - **`RunbookName`** <span class="type-label">string</span>
  - **`RunbookSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
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
</div>

## Gets a Runbook Run Preview for a Runbook Snapshot

`GET` `/api/{spaceId}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}`

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}`, `/api/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`, `/api/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}`, `/api/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`, `/api/{spaceId}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`, `/api/{spaceId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}`, `/api/{spaceId}/runbookSnapshots/{id}/runbookRuns/preview/{environmentId}/{tenant}`.

Gets a document that describes what steps will/won't be run during a run to a given environment (and tenant if supplied)

**Parameters**

- **`environmentId`** <span class="type-label">string</span> *(required)* — ID of the Environment.
- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook Snapshot.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`includeDisabledSteps`** <span class="type-label">boolean</span> — Boolean to include/exclude disabled steps from response.
- **`tenant`** <span class="type-label">string</span> — ID of the Tenant.

**Response**

`200` — The requested Runbook Run preview

`RunbookRunPreviewResource`.

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

## Gets a Runbook Run Template for a Runbook Snapshot

`GET` `/api/{spaceId}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/template`

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/template`, `/api/runbookSnapshots/{id}/runbookRuns/template`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/runbookRuns/template`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}/runbookRuns/template`, `/api/{spaceId}/runbookSnapshots/{id}/runbookRuns/template`.

Gets all of the information necessary for creating or editing a run for this snapshot.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook Snapshot to get a Runbook Run Template for.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project the Runbook Snapshot belongs to.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Runbook Run Template

`RunbookRunTemplateResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsGitResourceModified`** <span class="type-label">boolean</span>
- **`IsLibraryVariableSetModified`** <span class="type-label">boolean</span>
- **`IsRunbookProcessModified`** <span class="type-label">boolean</span>
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
</div>

## Update the variable snapshots for a Runbook Snapshot

`POST` `/api/{spaceId}/projects/{projectId}/runbookSnapshots/{id}/snapshot-variables`

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/snapshot-variables`, `/api/runbookSnapshots/{id}/snapshot-variables`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/snapshot-variables`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}/snapshot-variables`, `/api/{spaceId}/runbookSnapshots/{id}/snapshot-variables`.

Update the variable snapshots associated with the runbook snapshot to the latest versions. The runbook's process must not have changed since the snapshot was created.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook Snapshot.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Runbook Snapshot Variables were refreshed, containing the updated Snapshot

`RunbookSnapshotResource`.

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`FrozenProjectVariableSetId`** <span class="type-label">string</span> — Minimum length 1.
- **`FrozenRunbookProcessId`** <span class="type-label">string</span> — Minimum length 1.
- **`GitReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Notes`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
- **`RunbookId`** <span class="type-label">string</span>
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

<div data-example="Response">

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
</div>

## Update the variable snapshots for a Runbook Snapshot

`POST` `/api/{spaceId}/projects/{projectId}/runbookSnapshots/{id}/snapshot-variables/v1`

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/snapshot-variables/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/snapshot-variables/v1`.

Update the variable snapshots associated with the runbook snapshot to the latest versions. The runbook's process must not have changed since the snapshot was created.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook Snapshot.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project containing this resource. Will be inferred if not provided.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Runbook Snapshot Variables were refreshed, containing the updated Snapshot

`RefreshRunbookSnapshotVariablesResponse`.

- **`Resource`** <span class="type-label">object</span>
  - **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
  - **`FrozenProjectVariableSetId`** <span class="type-label">string</span> — Minimum length 1.
  - **`FrozenRunbookProcessId`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitReference`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`Notes`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
  - **`RunbookId`** <span class="type-label">string</span>
  - **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`SelectedPackages`** <span class="type-label">array of object</span>
  - **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Get a list of Variable Sets included in the Runbook Snapshot's current Variable Snapshot

`GET` `/api/{spaceId}/projects/{projectId}/runbookSnapshots/{id}/variables`

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{id}/variables`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{id}/variables`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook Snapshot to get variables for.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project the Runbook Snapshot is in.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested list of Runbook Snapshot Variables

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

## Get a list of Runbook Run Previews for a Runbook Snapshot

`POST` `/api/{spaceId}/projects/{projectId}/runbookSnapshots/{runbookSnapshotId}/runbookRuns/previews`

Also reachable at `/api/projects/{projectId}/runbookSnapshots/{runbookSnapshotId}/runbookRuns/previews`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbookSnapshots/{runbookSnapshotId}/runbookRuns/previews`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`runbookSnapshotId`** <span class="type-label">string</span> *(required)* — ID of the Runbook Snapshot.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`GetRunbookRunPreviewsForRunbookSnapshotRequest`

- **`DeploymentPreviews`** <span class="type-label">array of object</span> *(required)* — A list of Tenant/Environment mappings to retrieve runbook run previews for.
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`IncludeDisabledSteps`** <span class="type-label">boolean</span> — Boolean to include/exclude disabled steps from response.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`RunbookSnapshotId`** <span class="type-label">string</span> *(required)* — ID of the Runbook Snapshot.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

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
  "ProjectId": "string",
  "RunbookSnapshotId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — A preview for a Runbook run, representing the planned execution.

an array of `RunbookRunPreviewResource`.

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

## Gets a paginated list of all of the Runbook Snapshots that belong to the given Runbook

`GET` `/api/{spaceId}/projects/{projectId}/runbooks/{id}/runbookSnapshots`

Also reachable at `/api/projects/{projectId}/runbooks/{id}/runbookSnapshots`, `/api/runbooks/{id}/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooks/{id}/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/runbooks/{id}/runbookSnapshots`, `/api/{spaceId}/runbooks/{id}/runbookSnapshots`.

Runbook Snapshots will be ordered from most recent to least recent.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the runbook to get runbook Snapshots for.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project the runbook belongs to.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`searchByName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of all of the Runbook Snapshots that belong to the given Runbook.

`RunbookSnapshotResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
  - **`FrozenProjectVariableSetId`** <span class="type-label">string</span> — Minimum length 1.
  - **`FrozenRunbookProcessId`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitReference`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`Notes`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
  - **`RunbookId`** <span class="type-label">string</span>
  - **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`SelectedPackages`** <span class="type-label">array of object</span>
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
</div>

## Deletes an existing Runbook Snapshot

`DELETE` `/api/{spaceId}/projects/{projectId}/runbooksnapshots/{id}`

Also reachable at `/api/projects/{projectId}/runbooksnapshots/{id}`, `/api/runbooksnapshots/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/runbooksnapshots/{id}`, `/api/spaces/{spaceIdentifier}/runbooksnapshots/{id}`, `/api/{spaceId}/runbooksnapshots/{id}`.

Also deletes all of the Runbook Runs, Tasks and other associated resources belonging to the Runbook Snapshot.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Runbook Snapshot to delete.
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project that the Runbook Snapshot belongs to.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Get a paginated list of Runbook Snapshots

`GET` `/api/{spaceId}/runbookSnapshots`

Also reachable at `/api/runbookSnapshots`, `/api/spaces/{spaceIdentifier}/runbookSnapshots`.

Gets a paginated list of the runbook snapshots in the supplied Octopus Deploy Space, from all projects. The results will be sorted from most recent to least recent snapshot.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — A paginated list of the runbook snapshots in the supplied Octopus Deploy Space, from all projects. The results will be sorted from most recent to least recent snapshot.

`RunbookSnapshotResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
  - **`FrozenProjectVariableSetId`** <span class="type-label">string</span> — Minimum length 1.
  - **`FrozenRunbookProcessId`** <span class="type-label">string</span> — Minimum length 1.
  - **`GitReference`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.
  - **`Notes`** <span class="type-label">string</span>
  - **`ProjectId`** <span class="type-label">string</span>
  - **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
  - **`RunbookId`** <span class="type-label">string</span>
  - **`SelectedGitResources`** <span class="type-label">array of object</span>
  - **`SelectedPackages`** <span class="type-label">array of object</span>
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
</div>

## Get a Runbook Snapshot by ID

`GET` `/api/{spaceId}/runbookSnapshots/{id}`

Also reachable at `/api/runbookSnapshots/{id}`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the RunbookSnapshot to retrieve.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested runbook snapshot

`RunbookSnapshotResource`.

- **`Assembled`** <span class="type-label">string</span> — Format `date-time`.
- **`FrozenProjectVariableSetId`** <span class="type-label">string</span> — Minimum length 1.
- **`FrozenRunbookProcessId`** <span class="type-label">string</span> — Minimum length 1.
- **`GitReference`** <span class="type-label">object</span>
  - **`GitCommit`** <span class="type-label">string</span>
  - **`GitRef`** <span class="type-label">string</span>
  - **`VariablesGitCommit`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LibraryVariableSetSnapshotIds`** <span class="type-label">array of string</span> — Snapshots of the project's included library variable sets. The snapshots are VariableSetResources, not LibraryVariableSetResources.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span> — Minimum length 1.
- **`Notes`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span>
- **`ProjectVariableSetSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
- **`RunbookId`** <span class="type-label">string</span>
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

<div data-example="Response">

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
</div>

## Get the runbook runs for the given snapshot

`GET` `/api/{spaceId}/runbookSnapshots/{id}/runbookRuns`

Also reachable at `/api/runbookSnapshots/{id}/runbookRuns`, `/api/spaces/{spaceIdentifier}/runbookSnapshots/{id}/runbookRuns`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Contains the Runbook Runs for the given Runbook Snapshot.

`RunbookRunResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`ChangeRequestSettings`** <span class="type-label">array of object</span>
  - **`Comments`** <span class="type-label">string</span>
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`DebugMode`** <span class="type-label">string</span>
  - **`DeployedBy`** <span class="type-label">string</span>
  - **`DeployedById`** <span class="type-label">string</span>
  - **`DeployedToMachineIds`** <span class="type-label">array of string</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ExcludedMachineIds`** <span class="type-label">array of string</span> — A collection of machines in the target environment that should be excluded from the deployment.
  - **`ExcludedTargetTagIds`** <span class="type-label">array of string</span> — A collection of target tag IDs that should be excluded from the deployment. Only deployment targets that have none of these tags will be deployed to. Tag IDs are in the format "TagSets-{id}/Tags-{id}".
  - **`ExecutionPlanLogContext`** <span class="type-label">object</span>
  - **`FailTargetDiscovery`** <span class="type-label">boolean</span>
  - **`FailureEncountered`** <span class="type-label">boolean</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`FormValues`** <span class="type-label">object</span>
  - **`FrozenRunbookProcessId`** <span class="type-label">string</span>
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
  - **`RunbookId`** <span class="type-label">string</span> — Minimum length 1.
  - **`RunbookName`** <span class="type-label">string</span>
  - **`RunbookSnapshotId`** <span class="type-label">string</span> — Minimum length 1.
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
</div>
