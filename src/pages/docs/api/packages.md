---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Packages
---

## List packages according to specified search criteria

:endpoint{method="GET" path="/api/\{spaceId\}/feeds/\{feedId\}/packages"}

Also reachable at `/api/feeds/{feedId}/packages`, `/api/spaces/{spaceIdentifier}/feeds/{feedId}/packages`.

**Path Parameters**

- **`feedId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`descriptionsOptional`** :span[boolean]{.type-label}
- **`includeMultipleVersions`** :span[boolean]{.type-label}
- **`includeNotes`** :span[boolean]{.type-label}
- **`includePreRelease`** :span[boolean]{.type-label}
- **`includeWorkItems`** :span[boolean]{.type-label}
- **`packageId`** :span[string]{.type-label}
- **`packageIds`** :span[array of string]{.type-label}
- **`partialMatch`** :span[boolean]{.type-label}
- **`preReleaseTag`** :span[string]{.type-label}
- **`take`** :span[integer]{.type-label}
- **`versionRange`** :span[string]{.type-label}
- **`versionTagRegex`** :span[string]{.type-label}  
  Applied to the full version string when set.
- **`versioningStrategy`** :span[string]{.type-label}  
  SemVer or MostRecentlyPublished.

**Response**

`200` — The requested Packages

- **`Description`** :span[string]{.type-label}
- **`FeedId`** :span[string]{.type-label}
- **`FileExtension`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NuGetFeedId`** :span[string]{.type-label}
- **`NuGetPackageId`** :span[string]{.type-label}
- **`PackageId`** :span[string]{.type-label}
- **`PackageVersionBuildInformation`** :span[object]{.type-label}
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
- **`Published`** :span[string]{.type-label}  
  Format `date-time`.
- **`ReleaseNotes`** :span[string]{.type-label}
- **`Summary`** :span[string]{.type-label}
- **`Title`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get the release notes for the specified package

:endpoint{method="GET" path="/api/\{spaceId\}/feeds/\{feedId\}/packages/notes"}

Also reachable at `/api/feeds/{feedId}/packages/notes`, `/api/spaces/{spaceIdentifier}/feeds/{feedId}/packages/notes`.

**Path Parameters**

- **`feedId`** :span[string]{.type-label} *(required)*  
  ID of the Feed.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`packageId`** :span[string]{.type-label} *(required)*  
  ID of the package.
- **`version`** :span[string]{.type-label} *(required)*  
  Version of the package.

**Response**

`200` — The requested Package Notes

:::api-example{label="Response"}
```json
"string"
```
:::

## Get the built in packages

:endpoint{method="GET" path="/api/\{spaceId\}/packages"}

Also reachable at `/api/packages`, `/api/spaces/{spaceIdentifier}/packages`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`filter`** :span[string]{.type-label}  
  Only return the latest versions of packages which contain this value, if specified.
- **`includeNotes`** :span[boolean]{.type-label}  
  Include release notes in the response.
- **`includeWorkItems`** :span[boolean]{.type-label}
- **`latest`** :span[boolean]{.type-label}  
  Indicates whether or not to only return the latest version of any packages found.
- **`nuGetPackageId`** :span[string]{.type-label}  
  Return versions of the NuGet package with this id, if specified.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Built-in Packages

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`FeedId`** :span[string]{.type-label}
  - **`FileExtension`** :span[string]{.type-label}
  - **`Hash`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`NuGetFeedId`** :span[string]{.type-label}
  - **`NuGetPackageId`** :span[string]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`PackageSizeBytes`** :span[integer]{.type-label}
  - **`PackageVersionBuildInformation`** :span[object]{.type-label}
  - **`Published`** :span[string]{.type-label}  
    Format `date-time`.
  - **`ReleaseNotes`** :span[string]{.type-label}
  - **`Summary`** :span[string]{.type-label}
  - **`Title`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}
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
:::

## Bulk delete Packages

:endpoint{method="DELETE" path="/api/\{spaceId\}/packages/bulk"}

Also reachable at `/api/packages/bulk`, `/api/spaces/{spaceIdentifier}/packages/bulk`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Ids`** :span[array of string]{.type-label} *(required)*  
  Ids of the Packages to delete.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Ids": [
    "string"
  ],
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Success

## Bulk delete Packages

:endpoint{method="DELETE" path="/api/\{spaceId\}/packages/bulk/v1"}

Also reachable at `/api/packages/bulk/v1`, `/api/spaces/{spaceIdentifier}/packages/bulk/v1`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Ids`** :span[array of string]{.type-label} *(required)*  
  Ids of the Packages to delete.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Ids": [
    "string"
  ],
  "SpaceId": "string"
}
```
:::

**Response**

`200` — Confirmation that the Packages were deleted

:::api-example{label="Response"}
```json
{}
```
:::

## Request a list of Release Notes for the specified Packages

:endpoint{method="GET" path="/api/\{spaceId\}/packages/notes"}

Also reachable at `/api/packages/notes`, `/api/spaces/{spaceIdentifier}/packages/notes`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`packageIds`** :span[array of string]{.type-label}  
  List of package IDs.

**Response**

`200` — The requested list of Notes

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Packages`** :span[array of object]{.type-label}
  - **`FeedId`** :span[string]{.type-label}
  - **`Notes`** :span[object]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`Version`** :span[string]{.type-label}

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
:::

## Upload a package to the built in package feed

:endpoint{method="POST" path="/api/\{spaceId\}/packages/raw"}

Also reachable at `/api/packages/raw`, `/api/spaces/{spaceIdentifier}/packages/raw`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — PackageFromBuiltInFeedResource returned

- **`Description`** :span[string]{.type-label}
- **`FeedId`** :span[string]{.type-label}
- **`FileExtension`** :span[string]{.type-label}
- **`Hash`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NuGetFeedId`** :span[string]{.type-label}
- **`NuGetPackageId`** :span[string]{.type-label}
- **`PackageId`** :span[string]{.type-label}
- **`PackageSizeBytes`** :span[integer]{.type-label}
- **`PackageVersionBuildInformation`** :span[object]{.type-label}
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
- **`Published`** :span[string]{.type-label}  
  Format `date-time`.
- **`ReleaseNotes`** :span[string]{.type-label}
- **`Summary`** :span[string]{.type-label}
- **`Title`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Validate a package intended for the built in package feed, but does not write the package

:endpoint{method="POST" path="/api/\{spaceId\}/packages/raw/validate"}

Also reachable at `/api/packages/raw/validate`, `/api/spaces/{spaceIdentifier}/packages/raw/validate`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The validation issue detected for a package, or null if the package passes all validation checks.

- **`Issue`** :span[enum]{.type-label}  
  Allowed values: `CorruptedNugetPackage`, `CouldNotValidate`, `EmptyFile`, `FileNameTooLong`, `InvalidCharactersInFileName`, `InvalidPackageId`, `PackageAlreadyExists`, `UnsupportedFileExtension`.

:::api-example{label="Response"}
```json
{
  "Issue": "CorruptedNugetPackage"
}
```
:::

## Return package information for the specified package id

:endpoint{method="GET" path="/api/\{spaceId\}/packages/\{id\}"}

Also reachable at `/api/packages/{id}`, `/api/spaces/{spaceIdentifier}/packages/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the package to retrieve.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`includeNotes`** :span[boolean]{.type-label}  
  Include release notes in the response.
- **`includeWorkItems`** :span[boolean]{.type-label}

**Response**

`200` — The requested Built-in package

- **`Description`** :span[string]{.type-label}
- **`FeedId`** :span[string]{.type-label}
- **`FileExtension`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NuGetFeedId`** :span[string]{.type-label}
- **`NuGetPackageId`** :span[string]{.type-label}
- **`PackageId`** :span[string]{.type-label}
- **`PackageVersionBuildInformation`** :span[object]{.type-label}
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
- **`Published`** :span[string]{.type-label}  
  Format `date-time`.
- **`ReleaseNotes`** :span[string]{.type-label}
- **`Summary`** :span[string]{.type-label}
- **`Title`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Delete the specified Package

:endpoint{method="DELETE" path="/api/\{spaceId\}/packages/\{id\}"}

Also reachable at `/api/packages/{id}`, `/api/spaces/{spaceIdentifier}/packages/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Package to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Download the specified package from the built in feed

:endpoint{method="GET" path="/api/\{spaceId\}/packages/\{id\}/raw"}

Also reachable at `/api/packages/{id}/raw`, `/api/spaces/{spaceIdentifier}/packages/{id}/raw`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the package to download.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## Delete the specified Package

:endpoint{method="DELETE" path="/api/\{spaceId\}/packages/\{id\}/v1"}

Also reachable at `/api/packages/{id}/v1`, `/api/spaces/{spaceIdentifier}/packages/{id}/v1`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the Package to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Package was deleted

:::api-example{label="Response"}
```json
{}
```
:::

## Upload a delta patch for the given file. Used to optimize file upload

:endpoint{method="POST" path="/api/\{spaceId\}/packages/\{packageId\}/\{baseVersion\}/delta"}

Also reachable at `/api/packages/{packageId}/{baseVersion}/delta`, `/api/spaces/{spaceIdentifier}/packages/{packageId}/{baseVersion}/delta`.

**Path Parameters**

- **`baseVersion`** :span[string]{.type-label} *(required)*  
  The version of the package that was used to create the signature.
- **`packageId`** :span[string]{.type-label} *(required)*  
  Package ID of the package to be uploaded.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — PackageFromBuiltInFeedResource returned

- **`Description`** :span[string]{.type-label}
- **`FeedId`** :span[string]{.type-label}
- **`FileExtension`** :span[string]{.type-label}
- **`Hash`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`NuGetFeedId`** :span[string]{.type-label}
- **`NuGetPackageId`** :span[string]{.type-label}
- **`PackageId`** :span[string]{.type-label}
- **`PackageSizeBytes`** :span[integer]{.type-label}
- **`PackageVersionBuildInformation`** :span[object]{.type-label}
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
- **`Published`** :span[string]{.type-label}  
  Format `date-time`.
- **`ReleaseNotes`** :span[string]{.type-label}
- **`Summary`** :span[string]{.type-label}
- **`Title`** :span[string]{.type-label}
- **`Version`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Request the delta-signature for a given package. Used to optimize file upload

:endpoint{method="GET" path="/api/\{spaceId\}/packages/\{packageId\}/\{version\}/delta-signature"}

Also reachable at `/api/packages/{packageId}/{version}/delta-signature`, `/api/spaces/{spaceIdentifier}/packages/{packageId}/{version}/delta-signature`.

**Path Parameters**

- **`packageId`** :span[string]{.type-label} *(required)*  
  Package ID of the package to be uploaded.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`version`** :span[string]{.type-label} *(required)*  
  The version of the package to be uploaded.

**Response**

`200` — Returns the delta-signature for a given package. Used to optimize file upload.

- **`BaseVersion`** :span[string]{.type-label}
- **`Signature`** :span[string]{.type-label}  
  Format `byte`.

:::api-example{label="Response"}
```json
{
  "BaseVersion": "string",
  "Signature": "c3RyaW5n"
}
```
:::
