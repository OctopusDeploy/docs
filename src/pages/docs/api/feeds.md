---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Feeds
---

## Get a list of feeds

:span[GET]{.api-get} `/api/{spaceId}/feeds`

Also reachable at `/api/feeds`, `/api/spaces/{spaceIdentifier}/feeds`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space for the Feed.

**Query Parameters**

- **`feedType`** :span[array of string]{.type-label}  
  The feed types to be matched, provided as a comma separated list of strings.
- **`ids`** :span[array of string]{.type-label}  
  The feed ids to be matched, provided as a comma separated list of strings.
- **`name`** :span[string]{.type-label}  
  The exact name of a feed to be matched.
- **`partialName`** :span[string]{.type-label}  
  The partial name of feeds to be matched.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Feeds

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`FeedType`** :span[enum]{.type-label}  
    Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
    Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
  - **`Slug`** :span[string]{.type-label}
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

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "FeedType": "None",
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "PackageAcquisitionLocationOptions": [
        "Server"
      ],
      "Slug": "string",
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

## Create a feed

:span[POST]{.api-post} `/api/{spaceId}/feeds`

Also reachable at `/api/feeds`, `/api/spaces/{spaceIdentifier}/feeds`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space that contains the feed.

**Request Body**

- **`ClientVersion`** :span[object]{.type-label}
  - **`Format`** :span[enum]{.type-label}  
    Allowed values: `Semver`, `Maven`, `Docker`, `Octopus`, `Lexicographic`.
  - **`HasMetadata`** :span[boolean]{.type-label}
  - **`IsLegacyVersion`** :span[boolean]{.type-label}
  - **`IsPrerelease`** :span[boolean]{.type-label}
  - **`IsSemVer2`** :span[boolean]{.type-label}
  - **`Major`** :span[integer]{.type-label}
  - **`Metadata`** :span[string]{.type-label}
  - **`Minor`** :span[integer]{.type-label}
  - **`OriginalString`** :span[string]{.type-label}
  - **`Patch`** :span[integer]{.type-label}
  - **`Release`** :span[string]{.type-label}
  - **`ReleaseLabels`** :span[array of string]{.type-label}
  - **`Revision`** :span[integer]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`FeedType`** :span[enum]{.type-label} *(required)*  
  The type of the feed.  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the feed. Maximum length 44.
- **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
  The feed's package acquisition location options.  
  Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** :span[string]{.type-label}  
  The slug of the feed.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The id of the space that contains the feed.

<div data-example="Request">

```json
{
  "ClientVersion": {
    "Format": "Semver",
    "HasMetadata": true,
    "IsLegacyVersion": true,
    "IsPrerelease": true,
    "IsSemVer2": true,
    "Major": 0,
    "Metadata": "string",
    "Minor": 0,
    "OriginalString": "string",
    "Patch": 0,
    "Release": "string",
    "ReleaseLabels": [
      "string"
    ],
    "Revision": 0,
    "Version": "string"
  },
  "FeedType": "None",
  "Name": "string",
  "PackageAcquisitionLocationOptions": [
    "Server"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`201` — Created

- **`FeedType`** :span[enum]{.type-label}  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
  Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "FeedType": "None",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "PackageAcquisitionLocationOptions": [
    "Server"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Get all Feeds

:span[GET]{.api-get} `/api/{spaceId}/feeds/all`

Also reachable at `/api/feeds/all`, `/api/spaces/{spaceIdentifier}/feeds/all`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space for the Feed.

**Response**

`200` — The requested list of Feeds

- **`FeedType`** :span[enum]{.type-label}  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
  Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

<div data-example="Response">

```json
[
  {
    "FeedType": "None",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "PackageAcquisitionLocationOptions": [
      "Server"
    ],
    "Slug": "string",
    "SpaceId": "string"
  }
]
```
</div>

## Get all feed statistics

:span[GET]{.api-get} `/api/{spaceId}/feeds/stats`

Also reachable at `/api/feeds/stats`, `/api/spaces/{spaceIdentifier}/feeds/stats`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space for the Feed.

**Response**

`200` — The requested Feed Statistics

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`TotalPackages`** :span[integer]{.type-label}

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
  "TotalPackages": 0
}
```
</div>

## Get a feed resource by ID

:span[GET]{.api-get} `/api/{spaceId}/feeds/{id}`

Also reachable at `/api/feeds/{id}`, `/api/spaces/{spaceIdentifier}/feeds/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the feed resource.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space that contains the feed.

**Response**

`200` — The requested Feed

- **`FeedType`** :span[enum]{.type-label}  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
  Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "FeedType": "None",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "PackageAcquisitionLocationOptions": [
    "Server"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Modify a feed by ID

:span[PUT]{.api-put} `/api/{spaceId}/feeds/{id}`

Also reachable at `/api/feeds/{id}`, `/api/spaces/{spaceIdentifier}/feeds/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the feed.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space that contains the feed.

**Request Body**

- **`ClientVersion`** :span[object]{.type-label}
  - **`Format`** :span[enum]{.type-label}  
    Allowed values: `Semver`, `Maven`, `Docker`, `Octopus`, `Lexicographic`.
  - **`HasMetadata`** :span[boolean]{.type-label}
  - **`IsLegacyVersion`** :span[boolean]{.type-label}
  - **`IsPrerelease`** :span[boolean]{.type-label}
  - **`IsSemVer2`** :span[boolean]{.type-label}
  - **`Major`** :span[integer]{.type-label}
  - **`Metadata`** :span[string]{.type-label}
  - **`Minor`** :span[integer]{.type-label}
  - **`OriginalString`** :span[string]{.type-label}
  - **`Patch`** :span[integer]{.type-label}
  - **`Release`** :span[string]{.type-label}
  - **`ReleaseLabels`** :span[array of string]{.type-label}
  - **`Revision`** :span[integer]{.type-label}
  - **`Version`** :span[string]{.type-label}
- **`FeedType`** :span[enum]{.type-label} *(required)*  
  The type of the feed.  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** :span[string]{.type-label} *(required)*  
  The id of the feed.
- **`Name`** :span[string]{.type-label} *(required)*  
  The name of the feed. Maximum length 44.
- **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
  The feed's package acquisition location options.  
  Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** :span[string]{.type-label}  
  The slug of the feed.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The id of the space that contains the feed.

<div data-example="Request">

```json
{
  "ClientVersion": {
    "Format": "Semver",
    "HasMetadata": true,
    "IsLegacyVersion": true,
    "IsPrerelease": true,
    "IsSemVer2": true,
    "Major": 0,
    "Metadata": "string",
    "Minor": 0,
    "OriginalString": "string",
    "Patch": 0,
    "Release": "string",
    "ReleaseLabels": [
      "string"
    ],
    "Revision": 0,
    "Version": "string"
  },
  "FeedType": "None",
  "Id": "string",
  "Name": "string",
  "PackageAcquisitionLocationOptions": [
    "Server"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — The response returned from the request to modify a feed.

- **`FeedType`** :span[enum]{.type-label}  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`PackageAcquisitionLocationOptions`** :span[array of enum]{.type-label}  
  Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}

<div data-example="Response">

```json
{
  "FeedType": "None",
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "PackageAcquisitionLocationOptions": [
    "Server"
  ],
  "Slug": "string",
  "SpaceId": "string"
}
```
</div>

## Delete an existing Feed

:span[DELETE]{.api-delete} `/api/{spaceId}/feeds/{id}`

Also reachable at `/api/feeds/{id}`, `/api/spaces/{spaceIdentifier}/feeds/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The ID of the Feed.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the Space that contains the Feed.

**Response**

`200` — Success

## Search the specified feed for packages based on the provided search term

:span[GET]{.api-get} `/api/{spaceId}/feeds/{id}/packages/search`

Also reachable at `/api/feeds/{id}/packages/search`, `/api/spaces/{spaceIdentifier}/feeds/{id}/packages/search`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the feed resource.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space for the Feed.

**Query Parameters**

- **`packageType`** :span[string]{.type-label}  
  The package type to filter results by. Used by feeds that can contain multiple package types. Valid values are ContainerImage and HelmChart.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 20. Minimum `0`.
- **`term`** :span[string]{.type-label}  
  The term to search for.

**Response**

`200` — Holds a paginated collection of searched package descriptions

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`LatestVersion`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`Name`** :span[string]{.type-label}
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

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "Description": "string",
      "Id": "string",
      "LatestVersion": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string"
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

## List available package versions for the specified feed and package

:span[GET]{.api-get} `/api/{spaceId}/feeds/{id}/packages/versions`

Also reachable at `/api/feeds/{id}/packages/versions`, `/api/spaces/{spaceIdentifier}/feeds/{id}/packages/versions`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  The id of the feed resource.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The id of the space for the Feed.

**Query Parameters**

- **`filter`** :span[string]{.type-label}  
  Version number text to filter by.
- **`includePreRelease`** :span[boolean]{.type-label}  
  Flag to include pre-release versions, defaults to true.
- **`includeReleaseNotes`** :span[boolean]{.type-label}  
  Flag to include release notes, defaults to false.
- **`packageId`** :span[string]{.type-label} *(required)*  
  The id of the package.
- **`preReleaseTag`** :span[string]{.type-label}  
  The semver tag regex pattern to filter by.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.
- **`versionRange`** :span[string]{.type-label}  
  The range of versions to filter by.
- **`versionTagRegex`** :span[string]{.type-label}  
  The version-tag regex, applied to the full version string when set.
- **`versioningStrategy`** :span[string]{.type-label}  
  The versioning strategy: SemVer or MostRecentlyPublished.

**Response**

`200` — Contains a paginated collection of package versions returned from a search

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`FeedId`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}
  - **`PackageId`** :span[string]{.type-label}
  - **`Published`** :span[string]{.type-label}  
    Date the package was published. Optional Property. Format `date-time`.
  - **`ReleaseNotes`** :span[string]{.type-label}  
    Release notes for the package.
  - **`SizeBytes`** :span[integer]{.type-label}  
    Size of package in bytes. Optional Property.
  - **`Title`** :span[string]{.type-label}  
    Title of the package. This may be just the package name if the feed does not expose any version specific name.
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

<div data-example="Response">

```json
{
  "Id": "string",
  "ItemType": "string",
  "Items": [
    {
      "FeedId": "string",
      "Id": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "PackageId": "string",
      "Published": "2020-01-01T00:00:00.000Z",
      "ReleaseNotes": "string",
      "SizeBytes": 0,
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
