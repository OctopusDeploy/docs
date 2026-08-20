---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Build Information
---

## Retrieve a list of build information records describing the vcs information for a given package

:endpoint{method="GET" path="/api/\{spaceId\}/build-information"}

Also reachable at `/api/build-information`, `/api/spaces/{spaceIdentifier}/build-information`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`filter`** :span[string]{.type-label}  
  A version to look for.
- **`includeWorkItems`** :span[boolean]{.type-label}
- **`latest`** :span[boolean]{.type-label}  
  If true, returns only the latest build information.
- **`packageId`** :span[string]{.type-label}  
  An exact package to look for.
- **`partialPackageId`** :span[string]{.type-label}  
  A partial package ID used for a sub-string search.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Build Information

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Branch`** :span[string]{.type-label}
  - **`BuildEnvironment`** :span[string]{.type-label}
  - **`BuildNumber`** :span[string]{.type-label}
  - **`BuildUrl`** :span[string]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}
  - **`Created`** :span[string]{.type-label}  
    Format `date-time`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IncompleteDataWarning`** :span[string]{.type-label}
  - **`IssueTrackerName`** :span[string]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`PackageId`** :span[string]{.type-label}
  - **`VcsCommitNumber`** :span[string]{.type-label}
  - **`VcsCommitUrl`** :span[string]{.type-label}
  - **`VcsRoot`** :span[string]{.type-label}
  - **`VcsType`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
  - **`WorkItems`** :span[array of object]{.type-label}
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
      "Branch": "string",
      "BuildEnvironment": "string",
      "BuildNumber": "string",
      "BuildUrl": "string",
      "Commits": [
        {}
      ],
      "Created": "2020-01-01T00:00:00.000Z",
      "Id": "string",
      "IncompleteDataWarning": "string",
      "IssueTrackerName": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
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

## Create or update a specific build information record describing the vcs information for a given package

:endpoint{method="POST" path="/api/\{spaceId\}/build-information"}

Also reachable at `/api/build-information`, `/api/spaces/{spaceIdentifier}/build-information`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`OctopusBuildInformation`** :span[object]{.type-label} *(required)*
  - **`Branch`** :span[string]{.type-label}
  - **`BuildEnvironment`** :span[string]{.type-label}
  - **`BuildNumber`** :span[string]{.type-label}
  - **`BuildUrl`** :span[string]{.type-label}
  - **`Commits`** :span[array of object]{.type-label}
  - **`VcsCommitNumber`** :span[string]{.type-label}
  - **`VcsRoot`** :span[string]{.type-label}
  - **`VcsType`** :span[string]{.type-label}
- **`OverwriteMode`** :span[enum]{.type-label}  
  Allowed values: `FailIfExists`, `OverwriteExisting`, `IgnoreIfExists`.
- **`PackageId`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`Replace`** :span[boolean]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Version`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
```json
{
  "OctopusBuildInformation": {
    "Branch": "string",
    "BuildEnvironment": "string",
    "BuildNumber": "string",
    "BuildUrl": "string",
    "Commits": [
      {
        "Comment": "string",
        "Id": "string"
      }
    ],
    "VcsCommitNumber": "string",
    "VcsRoot": "string",
    "VcsType": "string"
  },
  "OverwriteMode": "FailIfExists",
  "PackageId": "string",
  "Replace": true,
  "SpaceId": "Spaces-1",
  "Version": "string"
}
```
:::

**Response**

`200` — Build information updated.

- **`Branch`** :span[string]{.type-label}
- **`BuildEnvironment`** :span[string]{.type-label}
- **`BuildNumber`** :span[string]{.type-label}
- **`BuildUrl`** :span[string]{.type-label}
- **`Commits`** :span[array of object]{.type-label}
  - **`Comment`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`LinkUrl`** :span[string]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IncompleteDataWarning`** :span[string]{.type-label}
- **`IssueTrackerName`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PackageId`** :span[string]{.type-label}
- **`VcsCommitNumber`** :span[string]{.type-label}
- **`VcsCommitUrl`** :span[string]{.type-label}
- **`VcsRoot`** :span[string]{.type-label}
- **`VcsType`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}
- **`WorkItems`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`LinkUrl`** :span[string]{.type-label}
  - **`Source`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Branch": "string",
  "BuildEnvironment": "string",
  "BuildNumber": "string",
  "BuildUrl": "string",
  "Commits": [
    {
      "Comment": "string",
      "Id": "string",
      "LinkUrl": "string"
    }
  ],
  "Created": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "IncompleteDataWarning": "string",
  "IssueTrackerName": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PackageId": "string",
  "VcsCommitNumber": "string",
  "VcsCommitUrl": "string",
  "VcsRoot": "string",
  "VcsType": "string",
  "Version": "string",
  "WorkItems": [
    {
      "Description": "string",
      "Id": "string",
      "LinkUrl": "string",
      "Source": "string"
    }
  ]
}
```
:::

## Bulk delete specific Build Information records

:endpoint{method="DELETE" path="/api/\{spaceId\}/build-information/bulk"}

Also reachable at `/api/build-information/bulk`, `/api/spaces/{spaceIdentifier}/build-information/bulk`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Ids`** :span[array of string]{.type-label} *(required)*  
  IDs of the multiple Build Information to delete.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Ids": [
    "string"
  ],
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Success

## Retrieve a specific build information record describing the vcs information for a given package

:endpoint{method="GET" path="/api/\{spaceId\}/build-information/\{id\}"}

Also reachable at `/api/build-information/{id}`, `/api/spaces/{spaceIdentifier}/build-information/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The build information id to retrieve.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Build Information

- **`Branch`** :span[string]{.type-label}
- **`BuildEnvironment`** :span[string]{.type-label}
- **`BuildNumber`** :span[string]{.type-label}
- **`BuildUrl`** :span[string]{.type-label}
- **`Commits`** :span[array of object]{.type-label}
  - **`Comment`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`LinkUrl`** :span[string]{.type-label}
- **`Created`** :span[string]{.type-label}  
  Format `date-time`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IncompleteDataWarning`** :span[string]{.type-label}
- **`IssueTrackerName`** :span[string]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PackageId`** :span[string]{.type-label}
- **`VcsCommitNumber`** :span[string]{.type-label}
- **`VcsCommitUrl`** :span[string]{.type-label}
- **`VcsRoot`** :span[string]{.type-label}
- **`VcsType`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}
- **`WorkItems`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`LinkUrl`** :span[string]{.type-label}
  - **`Source`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "Branch": "string",
  "BuildEnvironment": "string",
  "BuildNumber": "string",
  "BuildUrl": "string",
  "Commits": [
    {
      "Comment": "string",
      "Id": "string",
      "LinkUrl": "string"
    }
  ],
  "Created": "2020-01-01T00:00:00.000Z",
  "Id": "string",
  "IncompleteDataWarning": "string",
  "IssueTrackerName": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "PackageId": "string",
  "VcsCommitNumber": "string",
  "VcsCommitUrl": "string",
  "VcsRoot": "string",
  "VcsType": "string",
  "Version": "string",
  "WorkItems": [
    {
      "Description": "string",
      "Id": "string",
      "LinkUrl": "string",
      "Source": "string"
    }
  ]
}
```
:::

## Delete a specific Build Information record

:endpoint{method="DELETE" path="/api/\{spaceId\}/build-information/\{id\}"}

Also reachable at `/api/build-information/{id}`, `/api/spaces/{spaceIdentifier}/build-information/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Build Information to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success
