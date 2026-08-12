---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Feeds
---

## Get a list of feeds

`GET` `/api/{spaceId}/feeds`

Also reachable at `/api/feeds`, `/api/spaces/{spaceIdentifier}/feeds`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space for the Feed.

- **`feedType`** <span class="type-label">array of string</span> — The feed types to be matched, provided as a comma separated list of strings.
- **`ids`** <span class="type-label">array of string</span> — The feed ids to be matched, provided as a comma separated list of strings.
- **`name`** <span class="type-label">string</span> — The exact name of a feed to be matched.
- **`partialName`** <span class="type-label">string</span> — The partial name of feeds to be matched.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — The requested list of Feeds

`FeedResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`FeedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
  - **`Slug`** <span class="type-label">string</span>
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

`POST` `/api/{spaceId}/feeds`

Also reachable at `/api/feeds`, `/api/spaces/{spaceIdentifier}/feeds`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space that contains the feed.

**Request Body**

`CreateFeedCommand`

- **`ClientVersion`** <span class="type-label">object</span>
  - **`Format`** <span class="type-label">enum</span> — Allowed values: `Semver`, `Maven`, `Docker`, `Octopus`, `Lexicographic`.
  - **`HasMetadata`** <span class="type-label">boolean</span>
  - **`IsLegacyVersion`** <span class="type-label">boolean</span>
  - **`IsPrerelease`** <span class="type-label">boolean</span>
  - **`IsSemVer2`** <span class="type-label">boolean</span>
  - **`Major`** <span class="type-label">integer</span>
  - **`Metadata`** <span class="type-label">string</span>
  - **`Minor`** <span class="type-label">integer</span>
  - **`OriginalString`** <span class="type-label">string</span>
  - **`Patch`** <span class="type-label">integer</span>
  - **`Release`** <span class="type-label">string</span>
  - **`ReleaseLabels`** <span class="type-label">array of string</span>
  - **`Revision`** <span class="type-label">integer</span>
  - **`Version`** <span class="type-label">string</span>
- **`FeedType`** <span class="type-label">enum</span> *(required)* — The type of the feed. Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the feed. Maximum length 44.
- **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — The feed's package acquisition location options. Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** <span class="type-label">string</span> — The slug of the feed.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The id of the space that contains the feed.

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

`FeedResource`.

- **`FeedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

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

`GET` `/api/{spaceId}/feeds/all`

Also reachable at `/api/feeds/all`, `/api/spaces/{spaceIdentifier}/feeds/all`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space for the Feed.

**Response**

`200` — The requested list of Feeds

an array of `FeedResource`.

- **`FeedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

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

`GET` `/api/{spaceId}/feeds/stats`

Also reachable at `/api/feeds/stats`, `/api/spaces/{spaceIdentifier}/feeds/stats`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space for the Feed.

**Response**

`200` — The requested Feed Statistics

`BuiltInFeedStatsResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`TotalPackages`** <span class="type-label">integer</span>

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

`GET` `/api/{spaceId}/feeds/{id}`

Also reachable at `/api/feeds/{id}`, `/api/spaces/{spaceIdentifier}/feeds/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the feed resource.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space that contains the feed.

**Response**

`200` — The requested Feed

`FeedResource`.

- **`FeedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

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

`PUT` `/api/{spaceId}/feeds/{id}`

Also reachable at `/api/feeds/{id}`, `/api/spaces/{spaceIdentifier}/feeds/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the feed.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space that contains the feed.

**Request Body**

`ModifyFeedCommand`

- **`ClientVersion`** <span class="type-label">object</span>
  - **`Format`** <span class="type-label">enum</span> — Allowed values: `Semver`, `Maven`, `Docker`, `Octopus`, `Lexicographic`.
  - **`HasMetadata`** <span class="type-label">boolean</span>
  - **`IsLegacyVersion`** <span class="type-label">boolean</span>
  - **`IsPrerelease`** <span class="type-label">boolean</span>
  - **`IsSemVer2`** <span class="type-label">boolean</span>
  - **`Major`** <span class="type-label">integer</span>
  - **`Metadata`** <span class="type-label">string</span>
  - **`Minor`** <span class="type-label">integer</span>
  - **`OriginalString`** <span class="type-label">string</span>
  - **`Patch`** <span class="type-label">integer</span>
  - **`Release`** <span class="type-label">string</span>
  - **`ReleaseLabels`** <span class="type-label">array of string</span>
  - **`Revision`** <span class="type-label">integer</span>
  - **`Version`** <span class="type-label">string</span>
- **`FeedType`** <span class="type-label">enum</span> *(required)* — The type of the feed. Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** <span class="type-label">string</span> *(required)* — The id of the feed.
- **`Name`** <span class="type-label">string</span> *(required)* — The name of the feed. Maximum length 44.
- **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — The feed's package acquisition location options. Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** <span class="type-label">string</span> — The slug of the feed.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The id of the space that contains the feed.

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

`FeedResource`.

- **`FeedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`PackageAcquisitionLocationOptions`** <span class="type-label">array of enum</span> — Allowed values: `Server`, `ExecutionTarget`, `NotAcquired`.
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>

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

`DELETE` `/api/{spaceId}/feeds/{id}`

Also reachable at `/api/feeds/{id}`, `/api/spaces/{spaceIdentifier}/feeds/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The ID of the Feed.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the Space that contains the Feed.

**Response**

`200` — Success

## Searches the specified feed for packages based on the provided search term

`GET` `/api/{spaceId}/feeds/{id}/packages/search`

Also reachable at `/api/feeds/{id}/packages/search`, `/api/spaces/{spaceIdentifier}/feeds/{id}/packages/search`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the feed resource.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space for the Feed.

- **`packageType`** <span class="type-label">string</span> — The package type to filter results by. Used by feeds that can contain multiple package types. Valid values are ContainerImage and HelmChart.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 20. Minimum `0`.
- **`term`** <span class="type-label">string</span> — The term to search for.

**Response**

`200` — Holds a paginated collection of searched package descriptions

`PackageDescriptionResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`LatestVersion`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span>
  - **`Name`** <span class="type-label">string</span>
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

## Lists available package versions for the specified feed and package

`GET` `/api/{spaceId}/feeds/{id}/packages/versions`

Also reachable at `/api/feeds/{id}/packages/versions`, `/api/spaces/{spaceIdentifier}/feeds/{id}/packages/versions`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — The id of the feed resource.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The id of the space for the Feed.

- **`filter`** <span class="type-label">string</span> — Version number text to filter by.
- **`includePreRelease`** <span class="type-label">boolean</span> — Flag to include pre-release versions, defaults to true.
- **`includeReleaseNotes`** <span class="type-label">boolean</span> — Flag to include release notes, defaults to false.
- **`packageId`** <span class="type-label">string</span> *(required)* — The id of the package.
- **`preReleaseTag`** <span class="type-label">string</span> — The semver tag regex pattern to filter by.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.
- **`versionRange`** <span class="type-label">string</span> — The range of versions to filter by.
- **`versionTagRegex`** <span class="type-label">string</span> — The version-tag regex, applied to the full version string when set.
- **`versioningStrategy`** <span class="type-label">string</span> — The versioning strategy: SemVer or MostRecentlyPublished.

**Response**

`200` — Contains a paginated collection of package versions returned from a search

`PackageVersionResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`FeedId`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span>
  - **`PackageId`** <span class="type-label">string</span>
  - **`Published`** <span class="type-label">string</span> — Date the package was published. Optional Property. Format `date-time`.
  - **`ReleaseNotes`** <span class="type-label">string</span> — Release notes for the package.
  - **`SizeBytes`** <span class="type-label">integer</span> — Size of package in bytes. Optional Property.
  - **`Title`** <span class="type-label">string</span> — Title of the package. This may be just the package name if the feed does not expose any version specific name.
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
