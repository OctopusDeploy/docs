---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Packages
---

## Lists packages according to specified search criteria

`GET` `/api/{spaceId}/feeds/{feedId}/packages`

Also reachable at `/api/feeds/{feedId}/packages`, `/api/spaces/{spaceIdentifier}/feeds/{feedId}/packages`.

**Parameters**

- **`feedId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`descriptionsOptional`** <span class="type-label">boolean</span>
- **`includeMultipleVersions`** <span class="type-label">boolean</span>
- **`includeNotes`** <span class="type-label">boolean</span>
- **`includePreRelease`** <span class="type-label">boolean</span>
- **`includeWorkItems`** <span class="type-label">boolean</span>
- **`packageId`** <span class="type-label">string</span>
- **`packageIds`** <span class="type-label">array of string</span>
- **`partialMatch`** <span class="type-label">boolean</span>
- **`preReleaseTag`** <span class="type-label">string</span>
- **`take`** <span class="type-label">integer</span>
- **`versionRange`** <span class="type-label">string</span>
- **`versionTagRegex`** <span class="type-label">string</span> — Applied to the full version string when set.
- **`versioningStrategy`** <span class="type-label">string</span> — SemVer or MostRecentlyPublished.

**Response**

`200` — The requested Packages

an array of `PackageResource`.

- **`Description`** <span class="type-label">string</span>
- **`FeedId`** <span class="type-label">string</span>
- **`FileExtension`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NuGetFeedId`** <span class="type-label">string</span>
- **`NuGetPackageId`** <span class="type-label">string</span>
- **`PackageId`** <span class="type-label">string</span>
- **`PackageVersionBuildInformation`** <span class="type-label">object</span>
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
- **`Published`** <span class="type-label">string</span> — Format `date-time`.
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`Summary`** <span class="type-label">string</span>
- **`Title`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "Description": "string",
    "FeedId": "string",
    "FileExtension": "string",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "NuGetFeedId": "string",
    "NuGetPackageId": "string",
    "PackageId": "string",
    "PackageVersionBuildInformation": {
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
    },
    "Published": "2020-01-01T00:00:00.000Z",
    "ReleaseNotes": "string",
    "Summary": "string",
    "Title": "string",
    "Version": "string"
  }
]
```
</div>

## Gets the release notes for the specified package

`GET` `/api/{spaceId}/feeds/{feedId}/packages/notes`

Also reachable at `/api/feeds/{feedId}/packages/notes`, `/api/spaces/{spaceIdentifier}/feeds/{feedId}/packages/notes`.

**Parameters**

- **`feedId`** <span class="type-label">string</span> *(required)* — ID of the Feed.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`packageId`** <span class="type-label">string</span> *(required)* — ID of the package.
- **`version`** <span class="type-label">string</span> *(required)* — Version of the package.

**Response**

`200` — The requested Package Notes

<div data-example="Response">

```json
"string"
```
</div>

## Get the built in packages

`GET` `/api/{spaceId}/packages`

Also reachable at `/api/packages`, `/api/spaces/{spaceIdentifier}/packages`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`filter`** <span class="type-label">string</span> — Only return the latest versions of packages which contain this value, if specified.
- **`includeNotes`** <span class="type-label">boolean</span> — Include release notes in the response.
- **`includeWorkItems`** <span class="type-label">boolean</span>
- **`latest`** <span class="type-label">boolean</span> — Indicates whether or not to only return the latest version of any packages found.
- **`nuGetPackageId`** <span class="type-label">string</span> — Return versions of the NuGet package with this id, if specified.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Built-in Packages

`PackageFromBuiltInFeedResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`FeedId`** <span class="type-label">string</span>
  - **`FileExtension`** <span class="type-label">string</span>
  - **`Hash`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`NuGetFeedId`** <span class="type-label">string</span>
  - **`NuGetPackageId`** <span class="type-label">string</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`PackageSizeBytes`** <span class="type-label">integer</span>
  - **`PackageVersionBuildInformation`** <span class="type-label">object</span>
  - **`Published`** <span class="type-label">string</span> — Format `date-time`.
  - **`ReleaseNotes`** <span class="type-label">string</span>
  - **`Summary`** <span class="type-label">string</span>
  - **`Title`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>
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
      "FeedId": "string",
      "FileExtension": "string",
      "Hash": "string",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "NuGetFeedId": "string",
      "NuGetPackageId": "string",
      "PackageId": "string",
      "PackageSizeBytes": 0,
      "PackageVersionBuildInformation": {
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
        "Links": {},
        "PackageId": "string",
        "VcsCommitNumber": "string",
        "VcsCommitUrl": "string",
        "VcsRoot": "string",
        "VcsType": "string",
        "Version": "string",
        "WorkItems": [
          {}
        ]
      },
      "Published": "2020-01-01T00:00:00.000Z",
      "ReleaseNotes": "string",
      "Summary": "string",
      "Title": "string",
      "Version": "string"
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

## Bulk deletes Packages

`DELETE` `/api/{spaceId}/packages/bulk`

Also reachable at `/api/packages/bulk`, `/api/spaces/{spaceIdentifier}/packages/bulk`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`BulkDeletePackagesCommand`

- **`Ids`** <span class="type-label">array of string</span> *(required)* — Ids of the Packages to delete.
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

## Bulk deletes Packages

`DELETE` `/api/{spaceId}/packages/bulk/v1`

Also reachable at `/api/packages/bulk/v1`, `/api/spaces/{spaceIdentifier}/packages/bulk/v1`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`BulkDeletePackagesCommand`

- **`Ids`** <span class="type-label">array of string</span> *(required)* — Ids of the Packages to delete.
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

`200` — Confirmation that the Packages were deleted

`BulkDeletePackagesResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Request a list of Release Notes for the specified Packages

`GET` `/api/{spaceId}/packages/notes`

Also reachable at `/api/packages/notes`, `/api/spaces/{spaceIdentifier}/packages/notes`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`packageIds`** <span class="type-label">array of string</span> — List of package IDs.

**Response**

`200` — The requested list of Notes

`PackageNoteListResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Packages`** <span class="type-label">array of object</span>
  - **`FeedId`** <span class="type-label">string</span>
  - **`Notes`** <span class="type-label">object</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`Version`** <span class="type-label">string</span>

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
  "Packages": [
    {
      "FeedId": "string",
      "Notes": {
        "DisplayMessage": "string",
        "FailureReason": "string",
        "Notes": "string",
        "Published": "2020-01-01T00:00:00.000Z",
        "Succeeded": true
      },
      "PackageId": "string",
      "Version": "string"
    }
  ]
}
```
</div>

## Uploads a package to the built in package feed

`POST` `/api/{spaceId}/packages/raw`

Also reachable at `/api/packages/raw`, `/api/spaces/{spaceIdentifier}/packages/raw`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — PackageFromBuiltInFeedResource returned

`PackageFromBuiltInFeedResource`.

- **`Description`** <span class="type-label">string</span>
- **`FeedId`** <span class="type-label">string</span>
- **`FileExtension`** <span class="type-label">string</span>
- **`Hash`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NuGetFeedId`** <span class="type-label">string</span>
- **`NuGetPackageId`** <span class="type-label">string</span>
- **`PackageId`** <span class="type-label">string</span>
- **`PackageSizeBytes`** <span class="type-label">integer</span>
- **`PackageVersionBuildInformation`** <span class="type-label">object</span>
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
- **`Published`** <span class="type-label">string</span> — Format `date-time`.
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`Summary`** <span class="type-label">string</span>
- **`Title`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Description": "string",
  "FeedId": "string",
  "FileExtension": "string",
  "Hash": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NuGetFeedId": "string",
  "NuGetPackageId": "string",
  "PackageId": "string",
  "PackageSizeBytes": 0,
  "PackageVersionBuildInformation": {
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
  },
  "Published": "2020-01-01T00:00:00.000Z",
  "ReleaseNotes": "string",
  "Summary": "string",
  "Title": "string",
  "Version": "string"
}
```
</div>

## Validates a package intended for the built in package feed, but does not write the package

`POST` `/api/{spaceId}/packages/raw/validate`

Also reachable at `/api/packages/raw/validate`, `/api/spaces/{spaceIdentifier}/packages/raw/validate`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The validation issue detected for a package, or null if the package passes all validation checks.

`ValidateBuiltInPackageResponse`.

- **`Issue`** <span class="type-label">enum</span> — Allowed values: `CorruptedNugetPackage`, `CouldNotValidate`, `EmptyFile`, `FileNameTooLong`, `InvalidCharactersInFileName`, `InvalidPackageId`, `PackageAlreadyExists`, `UnsupportedFileExtension`.

<div data-example="Response">

```json
{
  "Issue": "CorruptedNugetPackage"
}
```
</div>

## Returns package information for the specified package id

`GET` `/api/{spaceId}/packages/{id}`

Also reachable at `/api/packages/{id}`, `/api/spaces/{spaceIdentifier}/packages/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the package to retrieve.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`includeNotes`** <span class="type-label">boolean</span> — Include release notes in the response.
- **`includeWorkItems`** <span class="type-label">boolean</span>

**Response**

`200` — The requested Built-in package

`PackageResource`.

- **`Description`** <span class="type-label">string</span>
- **`FeedId`** <span class="type-label">string</span>
- **`FileExtension`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NuGetFeedId`** <span class="type-label">string</span>
- **`NuGetPackageId`** <span class="type-label">string</span>
- **`PackageId`** <span class="type-label">string</span>
- **`PackageVersionBuildInformation`** <span class="type-label">object</span>
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
- **`Published`** <span class="type-label">string</span> — Format `date-time`.
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`Summary`** <span class="type-label">string</span>
- **`Title`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Description": "string",
  "FeedId": "string",
  "FileExtension": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NuGetFeedId": "string",
  "NuGetPackageId": "string",
  "PackageId": "string",
  "PackageVersionBuildInformation": {
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
  },
  "Published": "2020-01-01T00:00:00.000Z",
  "ReleaseNotes": "string",
  "Summary": "string",
  "Title": "string",
  "Version": "string"
}
```
</div>

## Deletes the specified Package

`DELETE` `/api/{spaceId}/packages/{id}`

Also reachable at `/api/packages/{id}`, `/api/spaces/{spaceIdentifier}/packages/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Package to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Downloads the specified package from the built in feed

`GET` `/api/{spaceId}/packages/{id}/raw`

Also reachable at `/api/packages/{id}/raw`, `/api/spaces/{spaceIdentifier}/packages/{id}/raw`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the package to download.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Deletes the specified Package

`DELETE` `/api/{spaceId}/packages/{id}/v1`

Also reachable at `/api/packages/{id}/v1`, `/api/spaces/{spaceIdentifier}/packages/{id}/v1`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the Package to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Package was deleted

`DeletePackageResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Uploads a delta patch for the given file. Used to optimize file upload

`POST` `/api/{spaceId}/packages/{packageId}/{baseVersion}/delta`

Also reachable at `/api/packages/{packageId}/{baseVersion}/delta`, `/api/spaces/{spaceIdentifier}/packages/{packageId}/{baseVersion}/delta`.

**Parameters**

- **`baseVersion`** <span class="type-label">string</span> *(required)* — The version of the package that was used to create the signature.
- **`packageId`** <span class="type-label">string</span> *(required)* — Package ID of the package to be uploaded.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — PackageFromBuiltInFeedResource returned

`PackageFromBuiltInFeedResource`.

- **`Description`** <span class="type-label">string</span>
- **`FeedId`** <span class="type-label">string</span>
- **`FileExtension`** <span class="type-label">string</span>
- **`Hash`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NuGetFeedId`** <span class="type-label">string</span>
- **`NuGetPackageId`** <span class="type-label">string</span>
- **`PackageId`** <span class="type-label">string</span>
- **`PackageSizeBytes`** <span class="type-label">integer</span>
- **`PackageVersionBuildInformation`** <span class="type-label">object</span>
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
- **`Published`** <span class="type-label">string</span> — Format `date-time`.
- **`ReleaseNotes`** <span class="type-label">string</span>
- **`Summary`** <span class="type-label">string</span>
- **`Title`** <span class="type-label">string</span>
- **`Version`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Description": "string",
  "FeedId": "string",
  "FileExtension": "string",
  "Hash": "string",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "NuGetFeedId": "string",
  "NuGetPackageId": "string",
  "PackageId": "string",
  "PackageSizeBytes": 0,
  "PackageVersionBuildInformation": {
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
  },
  "Published": "2020-01-01T00:00:00.000Z",
  "ReleaseNotes": "string",
  "Summary": "string",
  "Title": "string",
  "Version": "string"
}
```
</div>

## Requests the delta-signature for a given package. Used to optimize file upload

`GET` `/api/{spaceId}/packages/{packageId}/{version}/delta-signature`

Also reachable at `/api/packages/{packageId}/{version}/delta-signature`, `/api/spaces/{spaceIdentifier}/packages/{packageId}/{version}/delta-signature`.

**Parameters**

- **`packageId`** <span class="type-label">string</span> *(required)* — Package ID of the package to be uploaded.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`version`** <span class="type-label">string</span> *(required)* — The version of the package to be uploaded.

**Response**

`200` — Returns the delta-signature for a given package. Used to optimize file upload.

`PackageSignatureResource`.

- **`BaseVersion`** <span class="type-label">string</span>
- **`Signature`** <span class="type-label">string</span> — Format `byte`.

<div data-example="Response">

```json
{
  "BaseVersion": "string",
  "Signature": "c3RyaW5n"
}
```
</div>
