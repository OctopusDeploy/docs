---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Nuget
---

## Push packages to this endpoint using NuGet.exe or compatible tools

:endpoint{method="PUT" path="/api/\{spaceId\}/nuget/packages"}

Also reachable at `/api/nuget/packages`.

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
