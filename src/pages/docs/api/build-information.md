---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Build Information
---

## Retrieves a list of build information records describing the vcs information for a given package

`GET` `/api/{spaceId}/build-information`

Also reachable at `/api/build-information`, `/api/spaces/{spaceIdentifier}/build-information`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`filter`** <span class="type-label">string</span> — A version to look for.
- **`includeWorkItems`** <span class="type-label">boolean</span>
- **`latest`** <span class="type-label">boolean</span> — If true, returns only the latest build information.
- **`packageId`** <span class="type-label">string</span> — An exact package to look for.
- **`partialPackageId`** <span class="type-label">string</span> — A partial package ID used for a sub-string search.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Build Information

`OctopusPackageVersionBuildInformationMappedResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Branch`** <span class="type-label">string</span>
  - **`BuildEnvironment`** <span class="type-label">string</span>
  - **`BuildNumber`** <span class="type-label">string</span>
  - **`BuildUrl`** <span class="type-label">string</span>
  - **`Commits`** <span class="type-label">array of object</span>
  - **`Created`** <span class="type-label">string</span> — Format `date-time`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IncompleteDataWarning`** <span class="type-label">string</span>
  - **`IssueTrackerName`** <span class="type-label">string</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`PackageId`** <span class="type-label">string</span>
  - **`VcsCommitNumber`** <span class="type-label">string</span>
  - **`VcsCommitUrl`** <span class="type-label">string</span>
  - **`VcsRoot`** <span class="type-label">string</span>
  - **`VcsType`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
  - **`WorkItems`** <span class="type-label">array of object</span>
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
</div>

## Creates or updates a specific build information record describing the vcs information for a given package

`POST` `/api/{spaceId}/build-information`

Also reachable at `/api/build-information`, `/api/spaces/{spaceIdentifier}/build-information`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateBuildInformationCommand`

- **`OctopusBuildInformation`** <span class="type-label">object</span> *(required)*
  - **`Branch`** <span class="type-label">string</span>
  - **`BuildEnvironment`** <span class="type-label">string</span>
  - **`BuildNumber`** <span class="type-label">string</span>
  - **`BuildUrl`** <span class="type-label">string</span>
  - **`Commits`** <span class="type-label">array of object</span>
  - **`VcsCommitNumber`** <span class="type-label">string</span>
  - **`VcsRoot`** <span class="type-label">string</span>
  - **`VcsType`** <span class="type-label">string</span>
- **`OverwriteMode`** <span class="type-label">enum</span> — Allowed values: `FailIfExists`, `OverwriteExisting`, `IgnoreIfExists`.
- **`PackageId`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`Replace`** <span class="type-label">boolean</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Version`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

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
  "SpaceId": "string",
  "Version": "string"
}
```
</div>

**Response**

`200` — Build information updated.

`OctopusPackageVersionBuildInformationMappedResource`.

- **`Branch`** <span class="type-label">string</span>
- **`BuildEnvironment`** <span class="type-label">string</span>
- **`BuildNumber`** <span class="type-label">string</span>
- **`BuildUrl`** <span class="type-label">string</span>
- **`Commits`** <span class="type-label">array of object</span>
  - **`Comment`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`LinkUrl`** <span class="type-label">string</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IncompleteDataWarning`** <span class="type-label">string</span>
- **`IssueTrackerName`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PackageId`** <span class="type-label">string</span>
- **`VcsCommitNumber`** <span class="type-label">string</span>
- **`VcsCommitUrl`** <span class="type-label">string</span>
- **`VcsRoot`** <span class="type-label">string</span>
- **`VcsType`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span>
- **`WorkItems`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`LinkUrl`** <span class="type-label">string</span>
  - **`Source`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Bulk deletes specific Build Information records

`DELETE` `/api/{spaceId}/build-information/bulk`

Also reachable at `/api/build-information/bulk`, `/api/spaces/{spaceIdentifier}/build-information/bulk`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`BulkDeleteBuildInformationCommand`

- **`Ids`** <span class="type-label">array of string</span> *(required)* — IDs of the multiple Build Information to delete.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "Ids": [
    "string"
  ],
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Success

## Retrieves a specific build information record describing the vcs information for a given package

`GET` `/api/{spaceId}/build-information/{id}`

Also reachable at `/api/build-information/{id}`, `/api/spaces/{spaceIdentifier}/build-information/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The build information id to retrieve.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Build Information

`OctopusPackageVersionBuildInformationMappedResource`.

- **`Branch`** <span class="type-label">string</span>
- **`BuildEnvironment`** <span class="type-label">string</span>
- **`BuildNumber`** <span class="type-label">string</span>
- **`BuildUrl`** <span class="type-label">string</span>
- **`Commits`** <span class="type-label">array of object</span>
  - **`Comment`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`LinkUrl`** <span class="type-label">string</span>
- **`Created`** <span class="type-label">string</span> — Format `date-time`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IncompleteDataWarning`** <span class="type-label">string</span>
- **`IssueTrackerName`** <span class="type-label">string</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`PackageId`** <span class="type-label">string</span>
- **`VcsCommitNumber`** <span class="type-label">string</span>
- **`VcsCommitUrl`** <span class="type-label">string</span>
- **`VcsRoot`** <span class="type-label">string</span>
- **`VcsType`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span>
- **`WorkItems`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`LinkUrl`** <span class="type-label">string</span>
  - **`Source`** <span class="type-label">string</span>

<div data-example="Response">

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
</div>

## Deletes a specific Build Information record

`DELETE` `/api/{spaceId}/build-information/{id}`

Also reachable at `/api/build-information/{id}`, `/api/spaces/{spaceIdentifier}/build-information/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Build Information to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success
