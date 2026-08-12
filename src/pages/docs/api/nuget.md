---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Nuget
---

## Octopus allows NuGet.exe and compatible tools to push packages to this endpoint

`PUT` `/api/{spaceId}/nuget/packages`

Also reachable at `/api/nuget/packages`.

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
