---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Channels
---

## Create a Channel

:endpoint{method="POST" path="/api/\{spaceId\}/channels"}

Also reachable at `/api/channels`, `/api/spaces/{spaceIdentifier}/channels`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
- **`CustomFieldDefinitions`** :span[array of object]{.type-label}  
  Custom fields (FieldName plus a human-facing Description) that become mandatory when creating a release in this channel.
  - **`Description`** :span[string]{.type-label}
  - **`FieldName`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}  
  Maximum length 1000.
- **`GitReferenceRules`** :span[array of string]{.type-label}  
  Git reference patterns (e.g. 'refs/heads/main', 'refs/heads/feature/*') restricting which branches or tags can create releases in this channel. Only valid for version-controlled (Config-as-Code) projects.
- **`GitResourceRules`** :span[array of object]{.type-label}  
  Rules restricting which Git refs may be used for external Git dependencies referenced by deployment steps. Each rule targets step Git dependencies via GitDependencyActions (DeploymentActionSlug plus GitDependencyName) and lists the allowed Git reference patterns in Rules.
  - **`GitDependencyActions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Rules`** :span[array of string]{.type-label}
- **`IsDefault`** :span[boolean]{.type-label}
- **`LifecycleId`** :span[string]{.type-label}  
  The lifecycle for this channel. Must be null for ephemeral environment channels.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ParentEnvironmentId`** :span[string]{.type-label}  
  The parent environment for all ephemeral environments created in this channel. Required for ephemeral environment channels.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`Rules`** :span[array of object]{.type-label}  
  Version rules restricting which package versions may be used when creating a release in this channel. Each rule targets step packages via ActionPackages (DeploymentAction is the step name or ID, PackageReference the package reference name or ID) and constrains versions with a NuGet-style VersionRange (e.g. '[1.0,2.0)') and/or a Tag regex matched against the package's pre-release tag (e.g. '^$' for stable versions only). Leave each rule's Id blank; the server assigns it.
  - **`ActionPackages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** :span[string]{.type-label}
  - **`VersionRange`** :span[string]{.type-label}
  - **`VersionTagRegex`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantTags`** :span[array of string]{.type-label}  
  Canonical tenant tag names in 'TagSet/Tag' format restricting which tenants can deploy releases from this channel.
- **`Type`** :span[string]{.type-label}

:::api-example{label="Request"}
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
:::

**Response**

`201` — Created

- **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
- **`CustomFieldDefinitions`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`FieldName`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}
- **`GitReferenceRules`** :span[array of string]{.type-label}
- **`GitResourceRules`** :span[array of object]{.type-label}
  - **`GitDependencyActions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Rules`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`ParentEnvironmentId`** :span[string]{.type-label}  
  The parent environment for all ephemeral environments created in this channel.
- **`ProjectId`** :span[string]{.type-label}
- **`Rules`** :span[array of object]{.type-label}
  - **`ActionPackages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** :span[string]{.type-label}
  - **`VersionRange`** :span[string]{.type-label}
  - **`VersionTagRegex`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`Type`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a list of Channels

:endpoint{method="GET" path="/api/\{spaceId\}/channels/all"}

Also reachable at `/api/channels/all`, `/api/spaces/{spaceIdentifier}/channels/all`.

Lists all of the channels in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A set of Channel IDs to retrieve Channels for. Example: Channel-101,Channel-201.

**Response**

`200` — List of all of the channels in the supplied Octopus Deploy Space. The results will be sorted alphabetically by name.

- **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
- **`CustomFieldDefinitions`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`FieldName`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}
- **`GitReferenceRules`** :span[array of string]{.type-label}
- **`GitResourceRules`** :span[array of object]{.type-label}
  - **`GitDependencyActions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Rules`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`ParentEnvironmentId`** :span[string]{.type-label}  
  The parent environment for all ephemeral environments created in this channel.
- **`ProjectId`** :span[string]{.type-label}
- **`Rules`** :span[array of object]{.type-label}
  - **`ActionPackages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** :span[string]{.type-label}
  - **`VersionRange`** :span[string]{.type-label}
  - **`VersionTagRegex`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`Type`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Perform Channel version rule test against provided Package version

:endpoint{method="GET" path="/api/\{spaceId\}/channels/rule-test"}

Also reachable at `/api/channels/rule-test`, `/api/spaces/{spaceIdentifier}/channels/rule-test`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`actions`** :span[array of string]{.type-label}  
  A list of step names to find a package step which the feed type will determine which version format should be used.
- **`feedId`** :span[string]{.type-label}  
  A feed ID to determine which version format should be used.
- **`feedType`** :span[enum]{.type-label}  
  A feed type to determine which version format should be used.  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTag`** :span[string]{.type-label}  
  A regular expression to test the version pre-release tag against.
- **`projectId`** :span[string]{.type-label}  
  A deployment process ID in which to search for the steps referenced by the 'Actions' parameter.
- **`version`** :span[string]{.type-label} *(required)*  
  The version to test.
- **`versionRange`** :span[string]{.type-label}  
  A version range to test the version against.

**Response**

`200` — Result of testing Channel version rules

- **`Errors`** :span[array of string]{.type-label}
- **`SatisfiesPreReleaseTag`** :span[boolean]{.type-label}
- **`SatisfiesVersionRange`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesPreReleaseTag": true,
  "SatisfiesVersionRange": true
}
```
:::

## Perform Channel version rule test against provided Package version

:endpoint{method="POST" path="/api/\{spaceId\}/channels/rule-test"}

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Query Parameters**

- **`actions`** :span[array of string]{.type-label}  
  A list of step names to find a package step which the feed type will determine which version format should be used.
- **`feedId`** :span[string]{.type-label}  
  A feed ID to determine which version format should be used.
- **`feedType`** :span[enum]{.type-label}  
  A feed type to determine which version format should be used.  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTag`** :span[string]{.type-label}  
  A regular expression to test the version pre-release tag against.
- **`projectId`** :span[string]{.type-label}  
  A deployment process ID in which to search for the steps referenced by the 'Actions' parameter.
- **`version`** :span[string]{.type-label} *(required)*  
  The version to test.
- **`versionRange`** :span[string]{.type-label}  
  A version range to test the version against.

**Response**

`200` — Result of testing Channel version rules

- **`Errors`** :span[array of string]{.type-label}
- **`SatisfiesPreReleaseTag`** :span[boolean]{.type-label}
- **`SatisfiesVersionRange`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesPreReleaseTag": true,
  "SatisfiesVersionRange": true
}
```
:::

## Perform Channel version rule test against provided Package version

:endpoint{method="POST" path="/api/spaces/\{spaceIdentifier\}/channels/rule-test"}

Also reachable at `/api/channels/rule-test`.

**Path Parameters**

- **`spaceIdentifier`** :span[string]{.type-label} *(required)*  
  Identifier (ID or slug) of the space.

**Query Parameters**

- **`actions`** :span[array of string]{.type-label}  
  A list of step names to find a package step which the feed type will determine which version format should be used.
- **`feedId`** :span[string]{.type-label}  
  A feed ID to determine which version format should be used.
- **`feedType`** :span[enum]{.type-label}  
  A feed type to determine which version format should be used.  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTag`** :span[string]{.type-label}  
  A regular expression to test the version pre-release tag against.
- **`projectId`** :span[string]{.type-label}  
  A deployment process ID in which to search for the steps referenced by the 'Actions' parameter.
- **`version`** :span[string]{.type-label} *(required)*  
  The version to test.
- **`versionRange`** :span[string]{.type-label}  
  A version range to test the version against.

**Response**

`200` — Result of testing Channel version rules

- **`Errors`** :span[array of string]{.type-label}
- **`SatisfiesPreReleaseTag`** :span[boolean]{.type-label}
- **`SatisfiesVersionRange`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesPreReleaseTag": true,
  "SatisfiesVersionRange": true
}
```
:::

## Test Channel version rules

:endpoint{method="GET" path="/api/\{spaceId\}/channels/rule-test/v1"}

Also reachable at `/api/channels/rule-test/v1`, `/api/spaces/{spaceIdentifier}/channels/rule-test/v1`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`deploymentProcessId`** :span[string]{.type-label}
- **`feedId`** :span[string]{.type-label}
- **`feedType`** :span[enum]{.type-label}  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTagPattern`** :span[string]{.type-label}
- **`stepName`** :span[string]{.type-label}
- **`version`** :span[string]{.type-label} *(required)*
- **`versionRange`** :span[string]{.type-label}
- **`versionTagRegex`** :span[string]{.type-label}

**Response**

`200` — The result of testing the Channel version rules

- **`Errors`** :span[array of string]{.type-label}
- **`SatisfiesPreReleaseTag`** :span[boolean]{.type-label}
- **`SatisfiesVersionRange`** :span[boolean]{.type-label}
- **`SatisfiesVersionTagRegex`** :span[boolean]{.type-label}  
  Whether the version satisfies the rule's version-tag regex. Defaults to true (no regex, or a legacy caller, counts as satisfied).

:::api-example{label="Response"}
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
:::

## Test Channel version rules

:endpoint{method="POST" path="/api/\{spaceId\}/channels/rule-test/v1"}

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`deploymentProcessId`** :span[string]{.type-label}
- **`feedId`** :span[string]{.type-label}
- **`feedType`** :span[enum]{.type-label}  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTagPattern`** :span[string]{.type-label}
- **`stepName`** :span[string]{.type-label}
- **`version`** :span[string]{.type-label} *(required)*
- **`versionRange`** :span[string]{.type-label}
- **`versionTagRegex`** :span[string]{.type-label}

**Response**

`200` — The result of testing the Channel version rules

- **`Errors`** :span[array of string]{.type-label}
- **`SatisfiesPreReleaseTag`** :span[boolean]{.type-label}
- **`SatisfiesVersionRange`** :span[boolean]{.type-label}
- **`SatisfiesVersionTagRegex`** :span[boolean]{.type-label}  
  Whether the version satisfies the rule's version-tag regex. Defaults to true (no regex, or a legacy caller, counts as satisfied).

:::api-example{label="Response"}
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
:::

## Test Channel version rules

:endpoint{method="POST" path="/api/spaces/\{spaceIdentifier\}/channels/rule-test/v1"}

Also reachable at `/api/channels/rule-test/v1`.

**Path Parameters**

- **`spaceIdentifier`** :span[string]{.type-label} *(required)*  
  Identifier (ID or slug) of the space.

**Query Parameters**

- **`deploymentProcessId`** :span[string]{.type-label}
- **`feedId`** :span[string]{.type-label}
- **`feedType`** :span[enum]{.type-label}  
  Allowed values: `None`, `NuGet`, `Docker`, `Maven`, `OctopusProject`, `GitHub`, `Helm`, `OciRegistry`, `AwsElasticContainerRegistry`, `BuiltIn`, `S3`, `AzureContainerRegistry`, `GoogleContainerRegistry`, `ArtifactoryGeneric`, `Npm`, `GcsStorage`, `PyPi`.
- **`preReleaseTagPattern`** :span[string]{.type-label}
- **`stepName`** :span[string]{.type-label}
- **`version`** :span[string]{.type-label} *(required)*
- **`versionRange`** :span[string]{.type-label}
- **`versionTagRegex`** :span[string]{.type-label}

**Response**

`200` — The result of testing the Channel version rules

- **`Errors`** :span[array of string]{.type-label}
- **`SatisfiesPreReleaseTag`** :span[boolean]{.type-label}
- **`SatisfiesVersionRange`** :span[boolean]{.type-label}
- **`SatisfiesVersionTagRegex`** :span[boolean]{.type-label}  
  Whether the version satisfies the rule's version-tag regex. Defaults to true (no regex, or a legacy caller, counts as satisfied).

:::api-example{label="Response"}
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
:::

## Update an existing Channel

:endpoint{method="PUT" path="/api/\{spaceId\}/channels/\{id\}"}

Also reachable at `/api/channels/{id}`, `/api/spaces/{spaceIdentifier}/channels/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Gets or sets a unique identifier for this resource.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
- **`CustomFieldDefinitions`** :span[array of object]{.type-label}  
  Custom fields (FieldName plus a human-facing Description) that become mandatory when creating a release in this channel. Omit to keep the current definitions; an empty list clears them.
  - **`Description`** :span[string]{.type-label}
  - **`FieldName`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}  
  Maximum length 1000.
- **`GitReferenceRules`** :span[array of string]{.type-label}  
  Git reference patterns (e.g. 'refs/heads/main', 'refs/heads/feature/*') restricting which branches or tags can create releases in this channel. Only valid for version-controlled (Config-as-Code) projects. Omit to keep the current rules; an empty list clears them.
- **`GitResourceRules`** :span[array of object]{.type-label}  
  Rules restricting which Git refs may be used for external Git dependencies referenced by deployment steps. Each rule targets step Git dependencies via GitDependencyActions (DeploymentActionSlug plus GitDependencyName) and lists the allowed Git reference patterns in Rules. Omit to keep the current rules; an empty list clears them.
  - **`GitDependencyActions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Rules`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LifecycleId`** :span[string]{.type-label}  
  The lifecycle for this channel. Must be null for ephemeral environment channels.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ParentEnvironmentId`** :span[string]{.type-label}  
  The parent environment for all ephemeral environments created in this channel. Required for ephemeral environment channels.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`Rules`** :span[array of object]{.type-label}  
  Version rules restricting which package versions may be used when creating a release in this channel. Each rule targets step packages via ActionPackages (DeploymentAction is the step name or ID, PackageReference the package reference name or ID) and constrains versions with a NuGet-style VersionRange (e.g. '[1.0,2.0)') and/or a Tag regex matched against the package's pre-release tag (e.g. '^$' for stable versions only). Keep each existing rule's Id; leave it blank on new rules. Omit to keep the current rules; an empty list clears them.
  - **`ActionPackages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** :span[string]{.type-label}
  - **`VersionRange`** :span[string]{.type-label}
  - **`VersionTagRegex`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantTags`** :span[array of string]{.type-label}  
  Canonical tenant tag names in 'TagSet/Tag' format restricting which tenants can deploy releases from this channel. Omit to keep the current tags; an empty collection clears them.

:::api-example{label="Request"}
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
:::

**Response**

`200` — Confirms the Channel was modified, containing the updated Channel

- **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
- **`CustomFieldDefinitions`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`FieldName`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}
- **`GitReferenceRules`** :span[array of string]{.type-label}
- **`GitResourceRules`** :span[array of object]{.type-label}
  - **`GitDependencyActions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Rules`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`ParentEnvironmentId`** :span[string]{.type-label}  
  The parent environment for all ephemeral environments created in this channel.
- **`ProjectId`** :span[string]{.type-label}
- **`Rules`** :span[array of object]{.type-label}
  - **`ActionPackages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** :span[string]{.type-label}
  - **`VersionRange`** :span[string]{.type-label}
  - **`VersionTagRegex`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`Type`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Delete a ChannelResource by ID

:endpoint{method="DELETE" path="/api/\{spaceId\}/channels/\{id\}"}

Also reachable at `/api/channels/{id}`, `/api/spaces/{spaceIdentifier}/channels/{id}`.

Deletes an existing channel.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the ChannelResource to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Get a list of ChannelResources for the given ProjectResource

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/channels"}

Also reachable at `/api/projects/{projectId}/channels`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels`.

Lists all the channels for the given project

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to limit the set of retrieved Tenants to. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — List of all the channels for the given project

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
  - **`CustomFieldDefinitions`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}
  - **`GitReferenceRules`** :span[array of string]{.type-label}
  - **`GitResourceRules`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDefault`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LifecycleId`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`ParentEnvironmentId`** :span[string]{.type-label}  
    The parent environment for all ephemeral environments created in this channel.
  - **`ProjectId`** :span[string]{.type-label}
  - **`Rules`** :span[array of object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TenantTags`** :span[array of string]{.type-label}
  - **`Type`** :span[string]{.type-label}
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
:::

## Create a Channel

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/channels"}

Also reachable at `/api/projects/{projectId}/channels`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
- **`CustomFieldDefinitions`** :span[array of object]{.type-label}  
  Custom fields (FieldName plus a human-facing Description) that become mandatory when creating a release in this channel.
  - **`Description`** :span[string]{.type-label}
  - **`FieldName`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}  
  Maximum length 1000.
- **`GitReferenceRules`** :span[array of string]{.type-label}  
  Git reference patterns (e.g. 'refs/heads/main', 'refs/heads/feature/*') restricting which branches or tags can create releases in this channel. Only valid for version-controlled (Config-as-Code) projects.
- **`GitResourceRules`** :span[array of object]{.type-label}  
  Rules restricting which Git refs may be used for external Git dependencies referenced by deployment steps. Each rule targets step Git dependencies via GitDependencyActions (DeploymentActionSlug plus GitDependencyName) and lists the allowed Git reference patterns in Rules.
  - **`GitDependencyActions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Rules`** :span[array of string]{.type-label}
- **`IsDefault`** :span[boolean]{.type-label}
- **`LifecycleId`** :span[string]{.type-label}  
  The lifecycle for this channel. Must be null for ephemeral environment channels.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ParentEnvironmentId`** :span[string]{.type-label}  
  The parent environment for all ephemeral environments created in this channel. Required for ephemeral environment channels.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`Rules`** :span[array of object]{.type-label}  
  Version rules restricting which package versions may be used when creating a release in this channel. Each rule targets step packages via ActionPackages (DeploymentAction is the step name or ID, PackageReference the package reference name or ID) and constrains versions with a NuGet-style VersionRange (e.g. '[1.0,2.0)') and/or a Tag regex matched against the package's pre-release tag (e.g. '^$' for stable versions only). Leave each rule's Id blank; the server assigns it.
  - **`ActionPackages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** :span[string]{.type-label}
  - **`VersionRange`** :span[string]{.type-label}
  - **`VersionTagRegex`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantTags`** :span[array of string]{.type-label}  
  Canonical tenant tag names in 'TagSet/Tag' format restricting which tenants can deploy releases from this channel.
- **`Type`** :span[string]{.type-label}

:::api-example{label="Request"}
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
:::

**Response**

`200` — The newly-created Channel

- **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
- **`CustomFieldDefinitions`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`FieldName`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}
- **`GitReferenceRules`** :span[array of string]{.type-label}
- **`GitResourceRules`** :span[array of object]{.type-label}
  - **`GitDependencyActions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Rules`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`ParentEnvironmentId`** :span[string]{.type-label}  
  The parent environment for all ephemeral environments created in this channel.
- **`ProjectId`** :span[string]{.type-label}
- **`Rules`** :span[array of object]{.type-label}
  - **`ActionPackages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** :span[string]{.type-label}
  - **`VersionRange`** :span[string]{.type-label}
  - **`VersionTagRegex`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`Type`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Determine if a git reference satisfies the rules of a channel

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/channels/\{channelId\}/git-reference-rule-validation/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{channelId}/git-reference-rule-validation/v1`.

**Path Parameters**

- **`channelId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`gitReference`** :span[string]{.type-label} *(required)*

**Response**

`200` — Represents the result of testing Channel git protection rules.

- **`Errors`** :span[array of string]{.type-label}
- **`SatisfiesGitReferenceRules`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesGitReferenceRules": true
}
```
:::

## Determine if a git reference satisfies a channel's Git resource rules

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/channels/\{channelId\}/git-resource-rule-validation/v1"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{channelId}/git-resource-rule-validation/v1`.

**Path Parameters**

- **`channelId`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`deploymentActionSlug`** :span[string]{.type-label} *(required)*
- **`gitDependencyName`** :span[string]{.type-label} *(required)*
- **`gitReference`** :span[string]{.type-label} *(required)*

**Response**

`200` — Represents the result of testing Channel Git resource rules.

- **`Errors`** :span[array of string]{.type-label}
- **`SatisfiesGitResourceRules`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "Errors": [
    "string"
  ],
  "SatisfiesGitResourceRules": true
}
```
:::

## Get a Channel by ID

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/channels/\{id\}"}

Also reachable at `/api/projects/{projectId}/channels/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID or name of a space channel, or the slug of a templated Channel to load.
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The channel matching the supplied Id

- **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
- **`CustomFieldDefinitions`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`FieldName`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}
- **`GitReferenceRules`** :span[array of string]{.type-label}
- **`GitResourceRules`** :span[array of object]{.type-label}
  - **`GitDependencyActions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Rules`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`ParentEnvironmentId`** :span[string]{.type-label}  
  The parent environment for all ephemeral environments created in this channel.
- **`ProjectId`** :span[string]{.type-label}
- **`Rules`** :span[array of object]{.type-label}
  - **`ActionPackages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** :span[string]{.type-label}
  - **`VersionRange`** :span[string]{.type-label}
  - **`VersionTagRegex`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`Type`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Update an existing Channel

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/channels/\{id\}"}

Also reachable at `/api/projects/{projectId}/channels/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{id}`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Gets or sets a unique identifier for this resource.
- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
- **`CustomFieldDefinitions`** :span[array of object]{.type-label}  
  Custom fields (FieldName plus a human-facing Description) that become mandatory when creating a release in this channel. Omit to keep the current definitions; an empty list clears them.
  - **`Description`** :span[string]{.type-label}
  - **`FieldName`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}  
  Maximum length 1000.
- **`GitReferenceRules`** :span[array of string]{.type-label}  
  Git reference patterns (e.g. 'refs/heads/main', 'refs/heads/feature/*') restricting which branches or tags can create releases in this channel. Only valid for version-controlled (Config-as-Code) projects. Omit to keep the current rules; an empty list clears them.
- **`GitResourceRules`** :span[array of object]{.type-label}  
  Rules restricting which Git refs may be used for external Git dependencies referenced by deployment steps. Each rule targets step Git dependencies via GitDependencyActions (DeploymentActionSlug plus GitDependencyName) and lists the allowed Git reference patterns in Rules. Omit to keep the current rules; an empty list clears them.
  - **`GitDependencyActions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Rules`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label} *(required)*  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LifecycleId`** :span[string]{.type-label}  
  The lifecycle for this channel. Must be null for ephemeral environment channels.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`ParentEnvironmentId`** :span[string]{.type-label}  
  The parent environment for all ephemeral environments created in this channel. Required for ephemeral environment channels.
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`Rules`** :span[array of object]{.type-label}  
  Version rules restricting which package versions may be used when creating a release in this channel. Each rule targets step packages via ActionPackages (DeploymentAction is the step name or ID, PackageReference the package reference name or ID) and constrains versions with a NuGet-style VersionRange (e.g. '[1.0,2.0)') and/or a Tag regex matched against the package's pre-release tag (e.g. '^$' for stable versions only). Keep each existing rule's Id; leave it blank on new rules. Omit to keep the current rules; an empty list clears them.
  - **`ActionPackages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** :span[string]{.type-label}
  - **`VersionRange`** :span[string]{.type-label}
  - **`VersionTagRegex`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`TenantTags`** :span[array of string]{.type-label}  
  Canonical tenant tag names in 'TagSet/Tag' format restricting which tenants can deploy releases from this channel. Omit to keep the current tags; an empty collection clears them.

:::api-example{label="Request"}
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
:::

**Response**

`200` — Confirms the Channel was modified, containing the updated Channel

- **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
- **`CustomFieldDefinitions`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`FieldName`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}
- **`GitReferenceRules`** :span[array of string]{.type-label}
- **`GitResourceRules`** :span[array of object]{.type-label}
  - **`GitDependencyActions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Rules`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`ParentEnvironmentId`** :span[string]{.type-label}  
  The parent environment for all ephemeral environments created in this channel.
- **`ProjectId`** :span[string]{.type-label}
- **`Rules`** :span[array of object]{.type-label}
  - **`ActionPackages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** :span[string]{.type-label}
  - **`VersionRange`** :span[string]{.type-label}
  - **`VersionTagRegex`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`Type`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::

## Delete a ChannelResource by ID

:endpoint{method="DELETE" path="/api/\{spaceId\}/projects/\{projectId\}/channels/\{id\}"}

Also reachable at `/api/projects/{projectId}/channels/{id}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{id}`.

Deletes an existing channel.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the ChannelResource to delete.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

## Delete a ChannelResource by ID

:endpoint{method="DELETE" path="/api/\{spaceId\}/projects/\{projectId\}/channels/\{id\}/v2"}

Also reachable at `/api/projects/{projectId}/channels/{id}/v2`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/channels/{id}/v2`.

Deletes an existing channel.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the ChannelResource to delete.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Confirmation that the Channel has been deleted

:::api-example{label="Response"}
```json
{}
```
:::

## Get a list of Channels

:endpoint{method="GET" path="/api/\{spaceId\}/channels" deprecated=true}

Also reachable at `/api/channels`, `/api/spaces/{spaceIdentifier}/channels`.

:::div{.warning}
**Deprecated.** This endpoint may be removed in a future release.
:::

Lists all of the Channels in the supplied Octopus Deploy Space, from all projects, sorted by name.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  Comma separated list of Ids.
- **`partialName`** :span[string]{.type-label}  
  A partial or complete name to search on. This will perform a "contains" style match against the supplied name or name-fragment.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — List of all the Channels in the supplied Octopus Deploy Space, from all projects, sorted by name.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
  - **`CustomFieldDefinitions`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}
  - **`GitReferenceRules`** :span[array of string]{.type-label}
  - **`GitResourceRules`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IsDefault`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LifecycleId`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`ParentEnvironmentId`** :span[string]{.type-label}  
    The parent environment for all ephemeral environments created in this channel.
  - **`ProjectId`** :span[string]{.type-label}
  - **`Rules`** :span[array of object]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`TenantTags`** :span[array of string]{.type-label}
  - **`Type`** :span[string]{.type-label}
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
:::

## Get a Channel by ID

:endpoint{method="GET" path="/api/\{spaceId\}/channels/\{id\}" deprecated=true}

Also reachable at `/api/channels/{id}`, `/api/spaces/{spaceIdentifier}/channels/{id}`.

:::div{.warning}
**Deprecated.** This endpoint may be removed in a future release.
:::

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the Channel to load.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

- **`AutomaticEphemeralEnvironmentDeployments`** :span[boolean]{.type-label}
- **`CustomFieldDefinitions`** :span[array of object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`FieldName`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`EphemeralEnvironmentNameTemplate`** :span[string]{.type-label}
- **`GitReferenceRules`** :span[array of string]{.type-label}
- **`GitResourceRules`** :span[array of object]{.type-label}
  - **`GitDependencyActions`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Rules`** :span[array of string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsDefault`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`ParentEnvironmentId`** :span[string]{.type-label}  
  The parent environment for all ephemeral environments created in this channel.
- **`ProjectId`** :span[string]{.type-label}
- **`Rules`** :span[array of object]{.type-label}
  - **`ActionPackages`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Tag`** :span[string]{.type-label}
  - **`VersionRange`** :span[string]{.type-label}
  - **`VersionTagRegex`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`TenantTags`** :span[array of string]{.type-label}
- **`Type`** :span[string]{.type-label}

:::api-example{label="Response"}
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
:::
