---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Channels
---

## Get a list of Channels

`GET` `/api/{spaceId}/channels`

Also reachable at `/api/channels`, `/api/projects/{projectId}/channels`, `/api/spaces/{spaceIdentifier}/channels`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels`, `/api/{spaceId}/projects/{projectId}/channels`.

**Deprecated.** This endpoint may be removed in a future release.

Lists all of the Channels in the supplied Octopus Deploy Space, from all projects, sorted by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`ids`** <span class="type-label">array of string</span> — Comma separated list of Ids.
- **`partialName`** <span class="type-label">string</span> — A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — List of all the Channels in the supplied Octopus Deploy Space, from all projects, sorted by name.

`ChannelResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`AutomaticEphemeralEnvironmentDeployments`** <span class="type-label">boolean</span>
  - **`CustomFieldDefinitions`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`EphemeralEnvironmentNameTemplate`** <span class="type-label">string</span>
  - **`GitReferenceRules`** <span class="type-label">array of string</span>
  - **`GitResourceRules`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IsDefault`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LifecycleId`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`ParentEnvironmentId`** <span class="type-label">string</span> — The parent environment for all ephemeral environments created in this channel.
  - **`ProjectId`** <span class="type-label">string</span>
  - **`Rules`** <span class="type-label">array of object</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`TenantTags`** <span class="type-label">array of string</span>
  - **`Type`** <span class="type-label">string</span>
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
      "AutomaticEphemeralEnvironmentDeployments": true,
      "CustomFieldDefinitions": [
        {}
      ],
      "Description": "string",
      "EphemeralEnvironmentNameTemplate": "string",
      "GitReferenceRules": [
        "string"
      ],
      "GitResourceRules": [
        {}
      ],
      "Id": "string",
      "IsDefault": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LifecycleId": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "ParentEnvironmentId": "string",
      "ProjectId": "string",
      "Rules": [
        {}
      ],
      "Slug": "string",
      "SpaceId": "string",
      "TenantTags": [
        "string"
      ],
      "Type": "string"
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

## Creates a Channel

`POST` `/api/{spaceId}/channels`

Also reachable at `/api/channels`, `/api/projects/{projectId}/channels`, `/api/spaces/{spaceIdentifier}/channels`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels`, `/api/{spaceId}/projects/{projectId}/channels`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateChannelCommand`

- **`AutomaticEphemeralEnvironmentDeployments`** <span class="type-label">boolean</span>
- **`CustomFieldDefinitions`** <span class="type-label">array of object</span> — Custom fields (FieldName plus a human-facing Description) that become mandatory when creating a release in this channel.
  - **`Description`** <span class="type-label">string</span>
  - **`FieldName`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`EphemeralEnvironmentNameTemplate`** <span class="type-label">string</span> — Maximum length 1000.
- **`GitReferenceRules`** <span class="type-label">array of string</span> — Git reference patterns (e.g. 'refs/heads/main', 'refs/heads/feature/*') restricting which branches or tags can create releases in this channel. Only valid for version-controlled (Config-as-Code) projects.
- **`GitResourceRules`** <span class="type-label">array of object</span> — Rules restricting which Git refs may be used for external Git dependencies referenced by deployment steps. Each rule targets step Git dependencies via GitDependencyActions (DeploymentActionSlug plus GitDependencyName) and lists the allowed Git reference patterns in Rules.
  - **`GitDependencyActions`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Rules`** <span class="type-label">array of string</span>
- **`IsDefault`** <span class="type-label">boolean</span>
- **`LifecycleId`** <span class="type-label">string</span> — The lifecycle for this channel. Must be null for ephemeral environment channels.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ParentEnvironmentId`** <span class="type-label">string</span> — The parent environment for all ephemeral environments created in this channel. Required for ephemeral environment channels.
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`Rules`** <span class="type-label">array of object</span> — Version rules restricting which package versions may be used when creating a release in this channel. Each rule targets step packages via ActionPackages (DeploymentAction is the step name or ID, PackageReference the package reference name or ID) and constrains versions with a NuGet-style VersionRange (e.g. '[1.0,2.0)') and/or a Tag regex matched against the package's pre-release tag (e.g. '^$' for stable versions only). Leave each rule's Id blank; the server assigns it.
  - **`ActionPackages`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** <span class="type-label">string</span>
  - **`VersionRange`** <span class="type-label">string</span>
  - **`VersionTagRegex`** <span class="type-label">string</span>
  - **`VersioningStrategy`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantTags`** <span class="type-label">array of string</span> — Canonical tenant tag names in 'TagSet/Tag' format restricting which tenants can deploy releases from this channel.
- **`Type`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "AutomaticEphemeralEnvironmentDeployments": true,
  "CustomFieldDefinitions": [
    {
      "Description": "string",
      "FieldName": "string"
    }
  ],
  "Description": "string",
  "EphemeralEnvironmentNameTemplate": "string",
  "GitReferenceRules": [
    "string"
  ],
  "GitResourceRules": [
    {
      "GitDependencyActions": [
        {}
      ],
      "Id": "string",
      "Rules": [
        "string"
      ]
    }
  ],
  "IsDefault": true,
  "LifecycleId": "string",
  "Name": "string",
  "ParentEnvironmentId": "string",
  "ProjectId": "string",
  "Rules": [
    {
      "ActionPackages": [
        {}
      ],
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Tag": "string",
      "VersionRange": "string",
      "VersionTagRegex": "string",
      "VersioningStrategy": "string"
    }
  ],
  "Slug": "string",
  "SpaceId": "string",
  "TenantTags": [
    "string"
  ],
  "Type": "string"
}
```
</div>

**Response**

`201` — Created

`ChannelResource`.

- **`AutomaticEphemeralEnvironmentDeployments`** <span class="type-label">boolean</span>
- **`CustomFieldDefinitions`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`FieldName`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`EphemeralEnvironmentNameTemplate`** <span class="type-label">string</span>
- **`GitReferenceRules`** <span class="type-label">array of string</span>
- **`GitResourceRules`** <span class="type-label">array of object</span>
  - **`GitDependencyActions`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Rules`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ParentEnvironmentId`** <span class="type-label">string</span> — The parent environment for all ephemeral environments created in this channel.
- **`ProjectId`** <span class="type-label">string</span>
- **`Rules`** <span class="type-label">array of object</span>
  - **`ActionPackages`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** <span class="type-label">string</span>
  - **`VersionRange`** <span class="type-label">string</span>
  - **`VersionTagRegex`** <span class="type-label">string</span>
  - **`VersioningStrategy`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`Type`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AutomaticEphemeralEnvironmentDeployments": true,
  "CustomFieldDefinitions": [
    {
      "Description": "string",
      "FieldName": "string"
    }
  ],
  "Description": "string",
  "EphemeralEnvironmentNameTemplate": "string",
  "GitReferenceRules": [
    "string"
  ],
  "GitResourceRules": [
    {
      "GitDependencyActions": [
        {}
      ],
      "Id": "string",
      "Rules": [
        "string"
      ]
    }
  ],
  "Id": "string",
  "IsDefault": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LifecycleId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ParentEnvironmentId": "string",
  "ProjectId": "string",
  "Rules": [
    {
      "ActionPackages": [
        {}
      ],
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Tag": "string",
      "VersionRange": "string",
      "VersionTagRegex": "string",
      "VersioningStrategy": "string"
    }
  ],
  "Slug": "string",
  "SpaceId": "string",
  "TenantTags": [
    "string"
  ],
  "Type": "string"
}
```
</div>

## Get a list of Channels

`GET` `/api/{spaceId}/channels/all`

Also reachable at `/api/channels/all`, `/api/spaces/{spaceIdentifier}/channels/all`.

Lists all of the channels in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`ids`** <span class="type-label">array of string</span> — A set of Channel IDs to retrieve Channels for. Example: Channel-101,Channel-201.

**Response**

`200` — List of all of the channels in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

an array of `ChannelResource`.

- **`AutomaticEphemeralEnvironmentDeployments`** <span class="type-label">boolean</span>
- **`CustomFieldDefinitions`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`FieldName`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`EphemeralEnvironmentNameTemplate`** <span class="type-label">string</span>
- **`GitReferenceRules`** <span class="type-label">array of string</span>
- **`GitResourceRules`** <span class="type-label">array of object</span>
  - **`GitDependencyActions`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Rules`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ParentEnvironmentId`** <span class="type-label">string</span> — The parent environment for all ephemeral environments created in this channel.
- **`ProjectId`** <span class="type-label">string</span>
- **`Rules`** <span class="type-label">array of object</span>
  - **`ActionPackages`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** <span class="type-label">string</span>
  - **`VersionRange`** <span class="type-label">string</span>
  - **`VersionTagRegex`** <span class="type-label">string</span>
  - **`VersioningStrategy`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`Type`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "AutomaticEphemeralEnvironmentDeployments": true,
    "CustomFieldDefinitions": [
      {
        "Description": "string",
        "FieldName": "string"
      }
    ],
    "Description": "string",
    "EphemeralEnvironmentNameTemplate": "string",
    "GitReferenceRules": [
      "string"
    ],
    "GitResourceRules": [
      {
        "GitDependencyActions": [
          {}
        ],
        "Id": "string",
        "Rules": [
          "string"
        ]
      }
    ],
    "Id": "string",
    "IsDefault": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "LifecycleId": "string",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "ParentEnvironmentId": "string",
    "ProjectId": "string",
    "Rules": [
      {
        "ActionPackages": [
          {}
        ],
        "Id": "string",
        "LastModifiedBy": "string",
        "LastModifiedOn": "2020-01-01T00:00:00.000Z",
        "Links": {},
        "Tag": "string",
        "VersionRange": "string",
        "VersionTagRegex": "string",
        "VersioningStrategy": "string"
      }
    ],
    "Slug": "string",
    "SpaceId": "string",
    "TenantTags": [
      "string"
    ],
    "Type": "string"
  }
]
```
</div>

## Perform Channel version rule test against provided Package version

`GET` `/api/{spaceId}/channels/rule-test`

Also reachable at `/api/channels/rule-test`, `/api/spaces/{spaceIdentifier}/channels/rule-test`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`actions`** <span class="type-label">array of string</span> — A list of step names to find a package step which the feed type will determine which version format should be used.
- **`feedId`** <span class="type-label">string</span> — A feed ID to determine which version format should be used.
- **`feedType`** <span class="type-label">enum</span> — A feed type to determine which version format should be used. Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTag`** <span class="type-label">string</span> — A regular expression to test the version pre-release tag against.
- **`projectId`** <span class="type-label">string</span> — A deployment process ID in which to search for the steps referenced by the 'Actions' parameter.
- **`version`** <span class="type-label">string</span> *(required)* — The version to test.
- **`versionRange`** <span class="type-label">string</span> — A version range to test the version against.

**Response**

`200` — Result of testing Channel version rules

`TestChannelVersionRulesResponse`.

- **`Errors`** <span class="type-label">array of string</span>
- **`SatisfiesPreReleaseTag`** <span class="type-label">boolean</span>
- **`SatisfiesVersionRange`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesPreReleaseTag": true,
  "SatisfiesVersionRange": true
}
```
</div>

## Perform Channel version rule test against provided Package version

`POST` `/api/{spaceId}/channels/rule-test`

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

- **`actions`** <span class="type-label">array of string</span> — A list of step names to find a package step which the feed type will determine which version format should be used.
- **`feedId`** <span class="type-label">string</span> — A feed ID to determine which version format should be used.
- **`feedType`** <span class="type-label">enum</span> — A feed type to determine which version format should be used. Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTag`** <span class="type-label">string</span> — A regular expression to test the version pre-release tag against.
- **`projectId`** <span class="type-label">string</span> — A deployment process ID in which to search for the steps referenced by the 'Actions' parameter.
- **`version`** <span class="type-label">string</span> *(required)* — The version to test.
- **`versionRange`** <span class="type-label">string</span> — A version range to test the version against.

**Response**

`200` — Result of testing Channel version rules

`TestChannelVersionRulesResponse`.

- **`Errors`** <span class="type-label">array of string</span>
- **`SatisfiesPreReleaseTag`** <span class="type-label">boolean</span>
- **`SatisfiesVersionRange`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesPreReleaseTag": true,
  "SatisfiesVersionRange": true
}
```
</div>

## Perform Channel version rule test against provided Package version

`POST` `/api/spaces/{spaceIdentifier}/channels/rule-test`

Also reachable at `/api/channels/rule-test`.

**Parameters**

- **`spaceIdentifier`** <span class="type-label">string</span> *(required)* — Identifier (ID or slug) of the space.

- **`actions`** <span class="type-label">array of string</span> — A list of step names to find a package step which the feed type will determine which version format should be used.
- **`feedId`** <span class="type-label">string</span> — A feed ID to determine which version format should be used.
- **`feedType`** <span class="type-label">enum</span> — A feed type to determine which version format should be used. Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTag`** <span class="type-label">string</span> — A regular expression to test the version pre-release tag against.
- **`projectId`** <span class="type-label">string</span> — A deployment process ID in which to search for the steps referenced by the 'Actions' parameter.
- **`version`** <span class="type-label">string</span> *(required)* — The version to test.
- **`versionRange`** <span class="type-label">string</span> — A version range to test the version against.

**Response**

`200` — Result of testing Channel version rules

`TestChannelVersionRulesResponse`.

- **`Errors`** <span class="type-label">array of string</span>
- **`SatisfiesPreReleaseTag`** <span class="type-label">boolean</span>
- **`SatisfiesVersionRange`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesPreReleaseTag": true,
  "SatisfiesVersionRange": true
}
```
</div>

## Tests Channel version rules

`GET` `/api/{spaceId}/channels/rule-test/v1`

Also reachable at `/api/channels/rule-test/v1`, `/api/spaces/{spaceIdentifier}/channels/rule-test/v1`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`deploymentProcessId`** <span class="type-label">string</span>
- **`feedId`** <span class="type-label">string</span>
- **`feedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTagPattern`** <span class="type-label">string</span>
- **`stepName`** <span class="type-label">string</span>
- **`version`** <span class="type-label">string</span> *(required)*
- **`versionRange`** <span class="type-label">string</span>
- **`versionTagRegex`** <span class="type-label">string</span>

**Response**

`200` — The result of testing the Channel version rules

`TestChannelVersionRulesResponseV1`.

- **`Errors`** <span class="type-label">array of string</span>
- **`SatisfiesPreReleaseTag`** <span class="type-label">boolean</span>
- **`SatisfiesVersionRange`** <span class="type-label">boolean</span>
- **`SatisfiesVersionTagRegex`** <span class="type-label">boolean</span> — Whether the version satisfies the rule's version-tag regex. Defaults to true (no regex, or a legacy caller, counts as satisfied).

<div data-example="Response">

```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesPreReleaseTag": true,
  "SatisfiesVersionRange": true,
  "SatisfiesVersionTagRegex": true
}
```
</div>

## Tests Channel version rules

`POST` `/api/{spaceId}/channels/rule-test/v1`

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`deploymentProcessId`** <span class="type-label">string</span>
- **`feedId`** <span class="type-label">string</span>
- **`feedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTagPattern`** <span class="type-label">string</span>
- **`stepName`** <span class="type-label">string</span>
- **`version`** <span class="type-label">string</span> *(required)*
- **`versionRange`** <span class="type-label">string</span>
- **`versionTagRegex`** <span class="type-label">string</span>

**Response**

`200` — The result of testing the Channel version rules

`TestChannelVersionRulesResponseV1`.

- **`Errors`** <span class="type-label">array of string</span>
- **`SatisfiesPreReleaseTag`** <span class="type-label">boolean</span>
- **`SatisfiesVersionRange`** <span class="type-label">boolean</span>
- **`SatisfiesVersionTagRegex`** <span class="type-label">boolean</span> — Whether the version satisfies the rule's version-tag regex. Defaults to true (no regex, or a legacy caller, counts as satisfied).

<div data-example="Response">

```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesPreReleaseTag": true,
  "SatisfiesVersionRange": true,
  "SatisfiesVersionTagRegex": true
}
```
</div>

## Tests Channel version rules

`POST` `/api/spaces/{spaceIdentifier}/channels/rule-test/v1`

Also reachable at `/api/channels/rule-test/v1`.

**Parameters**

- **`spaceIdentifier`** <span class="type-label">string</span> *(required)* — Identifier (ID or slug) of the space.

- **`deploymentProcessId`** <span class="type-label">string</span>
- **`feedId`** <span class="type-label">string</span>
- **`feedType`** <span class="type-label">enum</span> — Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTagPattern`** <span class="type-label">string</span>
- **`stepName`** <span class="type-label">string</span>
- **`version`** <span class="type-label">string</span> *(required)*
- **`versionRange`** <span class="type-label">string</span>
- **`versionTagRegex`** <span class="type-label">string</span>

**Response**

`200` — The result of testing the Channel version rules

`TestChannelVersionRulesResponseV1`.

- **`Errors`** <span class="type-label">array of string</span>
- **`SatisfiesPreReleaseTag`** <span class="type-label">boolean</span>
- **`SatisfiesVersionRange`** <span class="type-label">boolean</span>
- **`SatisfiesVersionTagRegex`** <span class="type-label">boolean</span> — Whether the version satisfies the rule's version-tag regex. Defaults to true (no regex, or a legacy caller, counts as satisfied).

<div data-example="Response">

```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesPreReleaseTag": true,
  "SatisfiesVersionRange": true,
  "SatisfiesVersionTagRegex": true
}
```
</div>

## Get a Channel by ID

`GET` `/api/{spaceId}/channels/{id}`

Also reachable at `/api/channels/{id}`, `/api/projects/{projectId}/channels/{id}`, `/api/spaces/{spaceIdentifier}/channels/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{id}`, `/api/{spaceId}/projects/{projectId}/channels/{id}`.

**Deprecated.** This endpoint may be removed in a future release.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the Channel to load.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

`ChannelResource`.

- **`AutomaticEphemeralEnvironmentDeployments`** <span class="type-label">boolean</span>
- **`CustomFieldDefinitions`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`FieldName`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`EphemeralEnvironmentNameTemplate`** <span class="type-label">string</span>
- **`GitReferenceRules`** <span class="type-label">array of string</span>
- **`GitResourceRules`** <span class="type-label">array of object</span>
  - **`GitDependencyActions`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Rules`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ParentEnvironmentId`** <span class="type-label">string</span> — The parent environment for all ephemeral environments created in this channel.
- **`ProjectId`** <span class="type-label">string</span>
- **`Rules`** <span class="type-label">array of object</span>
  - **`ActionPackages`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** <span class="type-label">string</span>
  - **`VersionRange`** <span class="type-label">string</span>
  - **`VersionTagRegex`** <span class="type-label">string</span>
  - **`VersioningStrategy`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`Type`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AutomaticEphemeralEnvironmentDeployments": true,
  "CustomFieldDefinitions": [
    {
      "Description": "string",
      "FieldName": "string"
    }
  ],
  "Description": "string",
  "EphemeralEnvironmentNameTemplate": "string",
  "GitReferenceRules": [
    "string"
  ],
  "GitResourceRules": [
    {
      "GitDependencyActions": [
        {}
      ],
      "Id": "string",
      "Rules": [
        "string"
      ]
    }
  ],
  "Id": "string",
  "IsDefault": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LifecycleId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ParentEnvironmentId": "string",
  "ProjectId": "string",
  "Rules": [
    {
      "ActionPackages": [
        {}
      ],
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Tag": "string",
      "VersionRange": "string",
      "VersionTagRegex": "string",
      "VersioningStrategy": "string"
    }
  ],
  "Slug": "string",
  "SpaceId": "string",
  "TenantTags": [
    "string"
  ],
  "Type": "string"
}
```
</div>

## Updates an existing Channel

`PUT` `/api/{spaceId}/channels/{id}`

Also reachable at `/api/channels/{id}`, `/api/projects/{projectId}/channels/{id}`, `/api/spaces/{spaceIdentifier}/channels/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{id}`, `/api/{spaceId}/projects/{projectId}/channels/{id}`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Gets or sets a unique identifier for this resource.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyChannelCommand`

- **`AutomaticEphemeralEnvironmentDeployments`** <span class="type-label">boolean</span>
- **`CustomFieldDefinitions`** <span class="type-label">array of object</span> — Custom fields (FieldName plus a human-facing Description) that become mandatory when creating a release in this channel. Omit to keep the current definitions; an empty list clears them.
  - **`Description`** <span class="type-label">string</span>
  - **`FieldName`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`EphemeralEnvironmentNameTemplate`** <span class="type-label">string</span> — Maximum length 1000.
- **`GitReferenceRules`** <span class="type-label">array of string</span> — Git reference patterns (e.g. 'refs/heads/main', 'refs/heads/feature/*') restricting which branches or tags can create releases in this channel. Only valid for version-controlled (Config-as-Code) projects. Omit to keep the current rules; an empty list clears them.
- **`GitResourceRules`** <span class="type-label">array of object</span> — Rules restricting which Git refs may be used for external Git dependencies referenced by deployment steps. Each rule targets step Git dependencies via GitDependencyActions (DeploymentActionSlug plus GitDependencyName) and lists the allowed Git reference patterns in Rules. Omit to keep the current rules; an empty list clears them.
  - **`GitDependencyActions`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Rules`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> *(required)* — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`LifecycleId`** <span class="type-label">string</span> — The lifecycle for this channel. Must be null for ephemeral environment channels.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`ParentEnvironmentId`** <span class="type-label">string</span> — The parent environment for all ephemeral environments created in this channel. Required for ephemeral environment channels.
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`Rules`** <span class="type-label">array of object</span> — Version rules restricting which package versions may be used when creating a release in this channel. Each rule targets step packages via ActionPackages (DeploymentAction is the step name or ID, PackageReference the package reference name or ID) and constrains versions with a NuGet-style VersionRange (e.g. '[1.0,2.0)') and/or a Tag regex matched against the package's pre-release tag (e.g. '^$' for stable versions only). Keep each existing rule's Id; leave it blank on new rules. Omit to keep the current rules; an empty list clears them.
  - **`ActionPackages`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** <span class="type-label">string</span>
  - **`VersionRange`** <span class="type-label">string</span>
  - **`VersionTagRegex`** <span class="type-label">string</span>
  - **`VersioningStrategy`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`TenantTags`** <span class="type-label">array of string</span> — Canonical tenant tag names in 'TagSet/Tag' format restricting which tenants can deploy releases from this channel. Omit to keep the current tags; an empty collection clears them.

<div data-example="Request">

```json
{
  "AutomaticEphemeralEnvironmentDeployments": true,
  "CustomFieldDefinitions": [
    {
      "Description": "string",
      "FieldName": "string"
    }
  ],
  "Description": "string",
  "EphemeralEnvironmentNameTemplate": "string",
  "GitReferenceRules": [
    "string"
  ],
  "GitResourceRules": [
    {
      "GitDependencyActions": [
        {}
      ],
      "Id": "string",
      "Rules": [
        "string"
      ]
    }
  ],
  "Id": "string",
  "IsDefault": true,
  "LifecycleId": "string",
  "Name": "string",
  "ParentEnvironmentId": "string",
  "ProjectId": "string",
  "Rules": [
    {
      "ActionPackages": [
        {}
      ],
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Tag": "string",
      "VersionRange": "string",
      "VersionTagRegex": "string",
      "VersioningStrategy": "string"
    }
  ],
  "Slug": "string",
  "SpaceId": "string",
  "TenantTags": [
    "string"
  ]
}
```
</div>

**Response**

`200` — Confirms the Channel was modified, containing the updated Channel

`ChannelResource`.

- **`AutomaticEphemeralEnvironmentDeployments`** <span class="type-label">boolean</span>
- **`CustomFieldDefinitions`** <span class="type-label">array of object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`FieldName`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`EphemeralEnvironmentNameTemplate`** <span class="type-label">string</span>
- **`GitReferenceRules`** <span class="type-label">array of string</span>
- **`GitResourceRules`** <span class="type-label">array of object</span>
  - **`GitDependencyActions`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Rules`** <span class="type-label">array of string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsDefault`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`ParentEnvironmentId`** <span class="type-label">string</span> — The parent environment for all ephemeral environments created in this channel.
- **`ProjectId`** <span class="type-label">string</span>
- **`Rules`** <span class="type-label">array of object</span>
  - **`ActionPackages`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** <span class="type-label">string</span>
  - **`VersionRange`** <span class="type-label">string</span>
  - **`VersionTagRegex`** <span class="type-label">string</span>
  - **`VersioningStrategy`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`TenantTags`** <span class="type-label">array of string</span>
- **`Type`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AutomaticEphemeralEnvironmentDeployments": true,
  "CustomFieldDefinitions": [
    {
      "Description": "string",
      "FieldName": "string"
    }
  ],
  "Description": "string",
  "EphemeralEnvironmentNameTemplate": "string",
  "GitReferenceRules": [
    "string"
  ],
  "GitResourceRules": [
    {
      "GitDependencyActions": [
        {}
      ],
      "Id": "string",
      "Rules": [
        "string"
      ]
    }
  ],
  "Id": "string",
  "IsDefault": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LifecycleId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "ParentEnvironmentId": "string",
  "ProjectId": "string",
  "Rules": [
    {
      "ActionPackages": [
        {}
      ],
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Tag": "string",
      "VersionRange": "string",
      "VersionTagRegex": "string",
      "VersioningStrategy": "string"
    }
  ],
  "Slug": "string",
  "SpaceId": "string",
  "TenantTags": [
    "string"
  ],
  "Type": "string"
}
```
</div>

## Delete a ChannelResource by ID

`DELETE` `/api/{spaceId}/channels/{id}`

Also reachable at `/api/channels/{id}`, `/api/projects/{projectId}/channels/{id}`, `/api/spaces/{spaceIdentifier}/channels/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{id}`, `/api/{spaceId}/projects/{projectId}/channels/{id}`.

Deletes an existing channel.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the ChannelResource to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

## Represents a request to determine if a git reference satisfies the rules of a channel

`GET` `/api/{spaceId}/projects/{projectId}/channels/{channelId}/git-reference-rule-validation/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{channelId}/git-reference-rule-validation/v1`.

**Parameters**

- **`channelId`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`gitReference`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Represents the result of testing Channel git protection rules.

`GitReferenceSatisfiesChannelGitReferenceRulesResponseV1`.

- **`Errors`** <span class="type-label">array of string</span>
- **`SatisfiesGitReferenceRules`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesGitReferenceRules": true
}
```
</div>

## Represents a request to determine if a git reference satisfies channel's Git resource rules

`GET` `/api/{spaceId}/projects/{projectId}/channels/{channelId}/git-resource-rule-validation/v1`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{channelId}/git-resource-rule-validation/v1`.

**Parameters**

- **`channelId`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`deploymentActionSlug`** <span class="type-label">string</span> *(required)*
- **`gitDependencyName`** <span class="type-label">string</span> *(required)*
- **`gitReference`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Represents the result of testing Channel Git resource rules.

`GitReferenceSatisfiesChannelGitResourceRulesResponseV1`.

- **`Errors`** <span class="type-label">array of string</span>
- **`SatisfiesGitResourceRules`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesGitResourceRules": true
}
```
</div>

## Delete a ChannelResource by ID

`DELETE` `/api/{spaceId}/projects/{projectId}/channels/{id}/v2`

Also reachable at `/api/projects/{projectId}/channels/{id}/v2`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{id}/v2`.

Deletes an existing channel.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the ChannelResource to delete.
- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Channel has been deleted

`DeleteChannelResponseV2`.

<div data-example="Response">

```json
{}
```
</div>
