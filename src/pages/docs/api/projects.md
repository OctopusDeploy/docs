---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Projects
---

## Lists all of the projects in the supplied Octopus Deploy Space, from all project groups. The results will be sorted alphabetically by name

`GET` `/api/{spaceId}/projects`

Also reachable at `/api/projects`, `/api/spaces/{spaceIdentifier}/projects`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

- **`clonedFromProjectId`** <span class="type-label">string</span>
- **`ids`** <span class="type-label">array of string</span>
- **`name`** <span class="type-label">string</span> — (Obsolete) A partial or complete name to limit the set of retrieved Projects to. This will perform a "contains" style match against the supplied name or name-fragment. Left for backwards compatibility.
- **`partialName`** <span class="type-label">string</span> — A partial name, to limit the set of Projects to those with a name that includes the partial name.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Lists all of the projects in the supplied Octopus Deploy Space, from all project groups. The results will be sorted alphabetically by name.

`ProjectResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`AllowIgnoreChannelRules`** <span class="type-label">boolean</span>
  - **`AutoCreateRelease`** <span class="type-label">boolean</span>
  - **`AutoDeployReleaseOverrides`** <span class="type-label">array of object</span>
  - **`ClonedFromProjectId`** <span class="type-label">string</span>
  - **`CombineHealthAndSyncStatusInDashboardLiveStatus`** <span class="type-label">boolean</span>
  - **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`DefaultPowerShellEdition`** <span class="type-label">string</span>
  - **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
  - **`DeploymentChangesTemplate`** <span class="type-label">string</span>
  - **`DeploymentProcessId`** <span class="type-label">string</span>
  - **`DeprovisioningRunbookId`** <span class="type-label">string</span>
  - **`Description`** <span class="type-label">string</span>
  - **`DiscreteChannelRelease`** <span class="type-label">boolean</span> — Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
  - **`ExecuteDeploymentsOnEventBasedPipeline`** <span class="type-label">boolean</span>
  - **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ForcePackageDownload`** <span class="type-label">boolean</span>
  - **`Icon`** <span class="type-label">object</span>
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`IncludedLibraryVariableSetIds`** <span class="type-label">array of string</span> — Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
  - **`IsBadgesEnabled`** <span class="type-label">boolean</span>
  - **`IsDisabled`** <span class="type-label">boolean</span>
  - **`IsVersionControlled`** <span class="type-label">boolean</span>
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LifecycleId`** <span class="type-label">string</span>
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`PersistenceSettings`** <span class="type-label">object</span>
  - **`ProjectConnectivityPolicy`** <span class="type-label">object</span>
  - **`ProjectGroupId`** <span class="type-label">string</span>
  - **`ProjectTags`** <span class="type-label">array of string</span> — List of tags assigned to this project.
  - **`ProjectTemplateDetails`** <span class="type-label">object</span>
  - **`ProvisioningRunbookId`** <span class="type-label">string</span>
  - **`ReleaseCreationStrategy`** <span class="type-label">object</span>
  - **`ReleaseNotesTemplate`** <span class="type-label">string</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>
  - **`Templates`** <span class="type-label">array of object</span>
  - **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`VariableSetId`** <span class="type-label">string</span>
  - **`VersioningStrategy`** <span class="type-label">object</span>
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
      "AllowIgnoreChannelRules": true,
      "AutoCreateRelease": true,
      "AutoDeployReleaseOverrides": [
        {}
      ],
      "ClonedFromProjectId": "string",
      "CombineHealthAndSyncStatusInDashboardLiveStatus": true,
      "DefaultGuidedFailureMode": "EnvironmentDefault",
      "DefaultPowerShellEdition": "string",
      "DefaultToSkipIfAlreadyInstalled": true,
      "DeploymentChangesTemplate": "string",
      "DeploymentProcessId": "string",
      "DeprovisioningRunbookId": "string",
      "Description": "string",
      "DiscreteChannelRelease": true,
      "ExecuteDeploymentsOnEventBasedPipeline": true,
      "ExtensionSettings": [
        {}
      ],
      "ForcePackageDownload": true,
      "Icon": {
        "Color": "string",
        "Id": "string"
      },
      "Id": "string",
      "IncludedLibraryVariableSetIds": [
        "string"
      ],
      "IsBadgesEnabled": true,
      "IsDisabled": true,
      "IsVersionControlled": true,
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "LifecycleId": "string",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "PersistenceSettings": {
        "Type": "Database"
      },
      "ProjectConnectivityPolicy": {
        "AllowDeploymentsToNoTargets": true,
        "ExcludeUnhealthyTargets": true,
        "SkipMachineBehavior": "None",
        "TargetRoles": [
          "string"
        ]
      },
      "ProjectGroupId": "string",
      "ProjectTags": [
        "string"
      ],
      "ProjectTemplateDetails": {
        "IsShared": true,
        "Slug": "string",
        "VersionMask": "string"
      },
      "ProvisioningRunbookId": "string",
      "ReleaseCreationStrategy": {
        "ChannelId": "string",
        "ReleaseCreationPackage": {}
      },
      "ReleaseNotesTemplate": "string",
      "Slug": "string",
      "SpaceId": "string",
      "Templates": [
        {}
      ],
      "TenantedDeploymentMode": "Untenanted",
      "VariableSetId": "string",
      "VersioningStrategy": {
        "DonorPackage": {},
        "Template": "string"
      }
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

## Creates a new project

`POST` `/api/{spaceId}/projects`

Also reachable at `/api/projects`, `/api/spaces/{spaceIdentifier}/projects`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`CreateProjectCommand`

- **`AllowIgnoreChannelRules`** <span class="type-label">boolean</span>
- **`AutoCreateRelease`** <span class="type-label">boolean</span>
- **`AutoDeployReleaseOverrides`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ReleaseId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`Clone`** <span class="type-label">string</span> — ID of an existing project in the same space whose configuration (deployment process, variables, channels, runbooks, triggers) is copied into the new project. The source project must store its configuration in the database, not Git.
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** <span class="type-label">boolean</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`DiscreteChannelRelease`** <span class="type-label">boolean</span> — Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** <span class="type-label">boolean</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`IncludedLibraryVariableSetIds`** <span class="type-label">array of string</span> — Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LifecycleId`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`PersistenceSettings`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`ProjectGroupId`** <span class="type-label">string</span> *(required)*
- **`ProjectTags`** <span class="type-label">array of string</span> — Tags to apply to the project, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Regions/us-east"). Call find_tag_sets to discover which tag sets apply to projects and what tags they contain.
- **`ReleaseCreationStrategy`** <span class="type-label">object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`ReleaseCreationPackage`** <span class="type-label">object</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`RetainTenantConnections`** <span class="type-label">boolean</span> — When cloning, copy the source project's tenant connections to the new project. Only honoured when Clone is set. Defaults to false.
- **`Slug`** <span class="type-label">string</span> — URL-friendly short identifier for the project, unique within the space (for example "web-store"). Leave unset to have one generated from the name.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Templates`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "AllowIgnoreChannelRules": true,
  "AutoCreateRelease": true,
  "AutoDeployReleaseOverrides": [
    {
      "EnvironmentId": "string",
      "ReleaseId": "string",
      "TenantId": "string"
    }
  ],
  "Clone": "string",
  "CombineHealthAndSyncStatusInDashboardLiveStatus": true,
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "Description": "string",
  "DiscreteChannelRelease": true,
  "ExecuteDeploymentsOnEventBasedPipeline": true,
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "ForcePackageDownload": true,
  "IncludedLibraryVariableSetIds": [
    "string"
  ],
  "IsDisabled": true,
  "LifecycleId": "string",
  "Name": "string",
  "PersistenceSettings": {
    "Type": "Database"
  },
  "ProjectConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "ProjectGroupId": "string",
  "ProjectTags": [
    "string"
  ],
  "ReleaseCreationStrategy": {
    "ChannelId": "string",
    "ReleaseCreationPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    }
  },
  "ReleaseNotesTemplate": "string",
  "RetainTenantConnections": true,
  "Slug": "string",
  "SpaceId": "string",
  "Templates": [
    {
      "DefaultValue": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "Id": "string",
      "Label": "string",
      "Name": "string"
    }
  ],
  "TenantedDeploymentMode": "Untenanted",
  "VersioningStrategy": {
    "DonorPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    },
    "Template": "string"
  }
}
```
</div>

**Response**

`201` — Created

`ProjectResource`.

- **`AllowIgnoreChannelRules`** <span class="type-label">boolean</span>
- **`AutoCreateRelease`** <span class="type-label">boolean</span>
- **`AutoDeployReleaseOverrides`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ReleaseId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`ClonedFromProjectId`** <span class="type-label">string</span>
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** <span class="type-label">boolean</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** <span class="type-label">string</span>
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`DeploymentProcessId`** <span class="type-label">string</span>
- **`DeprovisioningRunbookId`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`DiscreteChannelRelease`** <span class="type-label">boolean</span> — Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** <span class="type-label">boolean</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IncludedLibraryVariableSetIds`** <span class="type-label">array of string</span> — Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** <span class="type-label">boolean</span>
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`IsVersionControlled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`PersistenceSettings`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`ProjectGroupId`** <span class="type-label">string</span>
- **`ProjectTags`** <span class="type-label">array of string</span> — List of tags assigned to this project.
- **`ProjectTemplateDetails`** <span class="type-label">object</span>
  - **`IsShared`** <span class="type-label">boolean</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`VersionMask`** <span class="type-label">string</span> — Minimum length 1.
- **`ProvisioningRunbookId`** <span class="type-label">string</span>
- **`ReleaseCreationStrategy`** <span class="type-label">object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`ReleaseCreationPackage`** <span class="type-label">object</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Templates`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VariableSetId`** <span class="type-label">string</span>
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AllowIgnoreChannelRules": true,
  "AutoCreateRelease": true,
  "AutoDeployReleaseOverrides": [
    {
      "EnvironmentId": "string",
      "ReleaseId": "string",
      "TenantId": "string"
    }
  ],
  "ClonedFromProjectId": "string",
  "CombineHealthAndSyncStatusInDashboardLiveStatus": true,
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultPowerShellEdition": "string",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "DeploymentProcessId": "string",
  "DeprovisioningRunbookId": "string",
  "Description": "string",
  "DiscreteChannelRelease": true,
  "ExecuteDeploymentsOnEventBasedPipeline": true,
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "ForcePackageDownload": true,
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IncludedLibraryVariableSetIds": [
    "string"
  ],
  "IsBadgesEnabled": true,
  "IsDisabled": true,
  "IsVersionControlled": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LifecycleId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "PersistenceSettings": {
    "Type": "Database"
  },
  "ProjectConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "ProjectGroupId": "string",
  "ProjectTags": [
    "string"
  ],
  "ProjectTemplateDetails": {
    "IsShared": true,
    "Slug": "string",
    "VersionMask": "string"
  },
  "ProvisioningRunbookId": "string",
  "ReleaseCreationStrategy": {
    "ChannelId": "string",
    "ReleaseCreationPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    }
  },
  "ReleaseNotesTemplate": "string",
  "Slug": "string",
  "SpaceId": "string",
  "Templates": [
    {
      "DefaultValue": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "Id": "string",
      "Label": "string",
      "Name": "string"
    }
  ],
  "TenantedDeploymentMode": "Untenanted",
  "VariableSetId": "string",
  "VersioningStrategy": {
    "DonorPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    },
    "Template": "string"
  }
}
```
</div>

## Lists all of the projects in the supplied Octopus Deploy Space

`GET` `/api/{spaceId}/projects/all`

Also reachable at `/api/projects/all`, `/api/spaces/{spaceIdentifier}/projects/all`.

**Parameters**

- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the space.

- **`ids`** <span class="type-label">array of string</span> — Project Ids of Projects to filter results to.

**Response**

`200` — All of the project resources in the supplied Octopus Deploy Space.

an array of `ProjectResource`.

- **`AllowIgnoreChannelRules`** <span class="type-label">boolean</span>
- **`AutoCreateRelease`** <span class="type-label">boolean</span>
- **`AutoDeployReleaseOverrides`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ReleaseId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`ClonedFromProjectId`** <span class="type-label">string</span>
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** <span class="type-label">boolean</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** <span class="type-label">string</span>
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`DeploymentProcessId`** <span class="type-label">string</span>
- **`DeprovisioningRunbookId`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`DiscreteChannelRelease`** <span class="type-label">boolean</span> — Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** <span class="type-label">boolean</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IncludedLibraryVariableSetIds`** <span class="type-label">array of string</span> — Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** <span class="type-label">boolean</span>
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`IsVersionControlled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`PersistenceSettings`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`ProjectGroupId`** <span class="type-label">string</span>
- **`ProjectTags`** <span class="type-label">array of string</span> — List of tags assigned to this project.
- **`ProjectTemplateDetails`** <span class="type-label">object</span>
  - **`IsShared`** <span class="type-label">boolean</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`VersionMask`** <span class="type-label">string</span> — Minimum length 1.
- **`ProvisioningRunbookId`** <span class="type-label">string</span>
- **`ReleaseCreationStrategy`** <span class="type-label">object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`ReleaseCreationPackage`** <span class="type-label">object</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Templates`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VariableSetId`** <span class="type-label">string</span>
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Response">

```json
[
  {
    "AllowIgnoreChannelRules": true,
    "AutoCreateRelease": true,
    "AutoDeployReleaseOverrides": [
      {
        "EnvironmentId": "string",
        "ReleaseId": "string",
        "TenantId": "string"
      }
    ],
    "ClonedFromProjectId": "string",
    "CombineHealthAndSyncStatusInDashboardLiveStatus": true,
    "DefaultGuidedFailureMode": "EnvironmentDefault",
    "DefaultPowerShellEdition": "string",
    "DefaultToSkipIfAlreadyInstalled": true,
    "DeploymentChangesTemplate": "string",
    "DeploymentProcessId": "string",
    "DeprovisioningRunbookId": "string",
    "Description": "string",
    "DiscreteChannelRelease": true,
    "ExecuteDeploymentsOnEventBasedPipeline": true,
    "ExtensionSettings": [
      {
        "ExtensionId": "string",
        "Values": "string"
      }
    ],
    "ForcePackageDownload": true,
    "Icon": {
      "Color": "string",
      "Id": "string"
    },
    "Id": "string",
    "IncludedLibraryVariableSetIds": [
      "string"
    ],
    "IsBadgesEnabled": true,
    "IsDisabled": true,
    "IsVersionControlled": true,
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "LifecycleId": "string",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "PersistenceSettings": {
      "Type": "Database"
    },
    "ProjectConnectivityPolicy": {
      "AllowDeploymentsToNoTargets": true,
      "ExcludeUnhealthyTargets": true,
      "SkipMachineBehavior": "None",
      "TargetRoles": [
        "string"
      ]
    },
    "ProjectGroupId": "string",
    "ProjectTags": [
      "string"
    ],
    "ProjectTemplateDetails": {
      "IsShared": true,
      "Slug": "string",
      "VersionMask": "string"
    },
    "ProvisioningRunbookId": "string",
    "ReleaseCreationStrategy": {
      "ChannelId": "string",
      "ReleaseCreationPackage": {
        "DeploymentAction": "string",
        "PackageReference": "string"
      }
    },
    "ReleaseNotesTemplate": "string",
    "Slug": "string",
    "SpaceId": "string",
    "Templates": [
      {
        "DefaultValue": {},
        "DisplaySettings": {},
        "HelpText": "string",
        "Id": "string",
        "Label": "string",
        "Name": "string"
      }
    ],
    "TenantedDeploymentMode": "Untenanted",
    "VariableSetId": "string",
    "VersioningStrategy": {
      "DonorPackage": {
        "DeploymentAction": "string",
        "PackageReference": "string"
      },
      "Template": "string"
    }
  }
]
```
</div>

## Gets the logo associated with the project

`GET` `/api/{spaceId}/projects/{id}/logo`

Also reachable at `/api/projects/{id}/logo`, `/api/spaces/{spaceIdentifier}/projects/{id}/logo`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the resource.
- **`spaceId`** <span class="type-label">string</span> *(required)* — ID of the space.

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>

## Get a Project by ID or slug

`GET` `/api/{spaceId}/projects/{projectId}`

Also reachable at `/api/projects/{projectId}`, `/api/projects/{projectId}/{unusedGitRef}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{unusedGitRef}`, `/api/{spaceId}/projects/{projectId}/{unusedGitRef}`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project to return.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Project.

`ProjectResource`.

- **`AllowIgnoreChannelRules`** <span class="type-label">boolean</span>
- **`AutoCreateRelease`** <span class="type-label">boolean</span>
- **`AutoDeployReleaseOverrides`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ReleaseId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`ClonedFromProjectId`** <span class="type-label">string</span>
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** <span class="type-label">boolean</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** <span class="type-label">string</span>
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`DeploymentProcessId`** <span class="type-label">string</span>
- **`DeprovisioningRunbookId`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`DiscreteChannelRelease`** <span class="type-label">boolean</span> — Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** <span class="type-label">boolean</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IncludedLibraryVariableSetIds`** <span class="type-label">array of string</span> — Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** <span class="type-label">boolean</span>
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`IsVersionControlled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`PersistenceSettings`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`ProjectGroupId`** <span class="type-label">string</span>
- **`ProjectTags`** <span class="type-label">array of string</span> — List of tags assigned to this project.
- **`ProjectTemplateDetails`** <span class="type-label">object</span>
  - **`IsShared`** <span class="type-label">boolean</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`VersionMask`** <span class="type-label">string</span> — Minimum length 1.
- **`ProvisioningRunbookId`** <span class="type-label">string</span>
- **`ReleaseCreationStrategy`** <span class="type-label">object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`ReleaseCreationPackage`** <span class="type-label">object</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Templates`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VariableSetId`** <span class="type-label">string</span>
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AllowIgnoreChannelRules": true,
  "AutoCreateRelease": true,
  "AutoDeployReleaseOverrides": [
    {
      "EnvironmentId": "string",
      "ReleaseId": "string",
      "TenantId": "string"
    }
  ],
  "ClonedFromProjectId": "string",
  "CombineHealthAndSyncStatusInDashboardLiveStatus": true,
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultPowerShellEdition": "string",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "DeploymentProcessId": "string",
  "DeprovisioningRunbookId": "string",
  "Description": "string",
  "DiscreteChannelRelease": true,
  "ExecuteDeploymentsOnEventBasedPipeline": true,
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "ForcePackageDownload": true,
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IncludedLibraryVariableSetIds": [
    "string"
  ],
  "IsBadgesEnabled": true,
  "IsDisabled": true,
  "IsVersionControlled": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LifecycleId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "PersistenceSettings": {
    "Type": "Database"
  },
  "ProjectConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "ProjectGroupId": "string",
  "ProjectTags": [
    "string"
  ],
  "ProjectTemplateDetails": {
    "IsShared": true,
    "Slug": "string",
    "VersionMask": "string"
  },
  "ProvisioningRunbookId": "string",
  "ReleaseCreationStrategy": {
    "ChannelId": "string",
    "ReleaseCreationPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    }
  },
  "ReleaseNotesTemplate": "string",
  "Slug": "string",
  "SpaceId": "string",
  "Templates": [
    {
      "DefaultValue": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "Id": "string",
      "Label": "string",
      "Name": "string"
    }
  ],
  "TenantedDeploymentMode": "Untenanted",
  "VariableSetId": "string",
  "VersioningStrategy": {
    "DonorPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    },
    "Template": "string"
  }
}
```
</div>

## Modifies an existing Project

`PUT` `/api/{spaceId}/projects/{projectId}`

Also reachable at `/api/projects/{projectId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the project to modify.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ModifyProjectCommand`

- **`AllowIgnoreChannelRules`** <span class="type-label">boolean</span>
- **`AutoCreateRelease`** <span class="type-label">boolean</span>
- **`AutoDeployReleaseOverrides`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ReleaseId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`ChangeDescription`** <span class="type-label">string</span> — The change description.
- **`ClonedFromProjectId`** <span class="type-label">string</span>
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** <span class="type-label">boolean</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** <span class="type-label">string</span> — Which edition of PowerShell the project's script steps run under: "Desktop" (Windows PowerShell) or "Core" (cross-platform PowerShell). Leave unset to inherit the server default.
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`DeprovisioningRunbookId`** <span class="type-label">string</span> — ID of a runbook in this project that tears down an ephemeral environment. Must be an existing runbook of this project; call find_runbooks to look one up. Only relevant to projects using ephemeral environments.
- **`Description`** <span class="type-label">string</span>
- **`DiscreteChannelRelease`** <span class="type-label">boolean</span> — Treats releases of different channels to the same environment as a separate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** <span class="type-label">boolean</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`IncludedLibraryVariableSetIds`** <span class="type-label">array of string</span> — Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** <span class="type-label">boolean</span>
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`LifecycleId`** <span class="type-label">string</span> *(required)*
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`PersistenceSettings`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`ProjectGroupId`** <span class="type-label">string</span> *(required)*
- **`ProjectId`** <span class="type-label">string</span> *(required)* — ID of the project to modify.
- **`ProjectTags`** <span class="type-label">array of string</span> — The project's complete set of tags, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Regions/us-east"). This replaces the project's current tags, so resubmit the existing ones you want to keep. Call find_tag_sets to discover which tag sets apply to projects.
- **`ProvisioningRunbookId`** <span class="type-label">string</span> — ID of a runbook in this project that provisions an ephemeral environment. Must be an existing runbook of this project; call find_runbooks to look one up. Only relevant to projects using ephemeral environments.
- **`ReleaseCreationStrategy`** <span class="type-label">object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`ReleaseCreationPackage`** <span class="type-label">object</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span> — URL-friendly short identifier for the project, unique within the space. Leave unset to keep the project's current slug.
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Templates`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "AllowIgnoreChannelRules": true,
  "AutoCreateRelease": true,
  "AutoDeployReleaseOverrides": [
    {
      "EnvironmentId": "string",
      "ReleaseId": "string",
      "TenantId": "string"
    }
  ],
  "ChangeDescription": "string",
  "ClonedFromProjectId": "string",
  "CombineHealthAndSyncStatusInDashboardLiveStatus": true,
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultPowerShellEdition": "string",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "DeprovisioningRunbookId": "string",
  "Description": "string",
  "DiscreteChannelRelease": true,
  "ExecuteDeploymentsOnEventBasedPipeline": true,
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "ForcePackageDownload": true,
  "IncludedLibraryVariableSetIds": [
    "string"
  ],
  "IsBadgesEnabled": true,
  "IsDisabled": true,
  "LifecycleId": "string",
  "Name": "string",
  "PersistenceSettings": {
    "Type": "Database"
  },
  "ProjectConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "ProjectGroupId": "string",
  "ProjectId": "string",
  "ProjectTags": [
    "string"
  ],
  "ProvisioningRunbookId": "string",
  "ReleaseCreationStrategy": {
    "ChannelId": "string",
    "ReleaseCreationPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    }
  },
  "ReleaseNotesTemplate": "string",
  "Slug": "string",
  "SpaceId": "string",
  "Templates": [
    {
      "DefaultValue": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "Id": "string",
      "Label": "string",
      "Name": "string"
    }
  ],
  "TenantedDeploymentMode": "Untenanted",
  "VersioningStrategy": {
    "DonorPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    },
    "Template": "string"
  }
}
```
</div>

**Response**

`200` — Confirms that the Project has been modified, containing the updated Project

`ProjectResource`.

- **`AllowIgnoreChannelRules`** <span class="type-label">boolean</span>
- **`AutoCreateRelease`** <span class="type-label">boolean</span>
- **`AutoDeployReleaseOverrides`** <span class="type-label">array of object</span>
  - **`EnvironmentId`** <span class="type-label">string</span>
  - **`ReleaseId`** <span class="type-label">string</span>
  - **`TenantId`** <span class="type-label">string</span>
- **`ClonedFromProjectId`** <span class="type-label">string</span>
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** <span class="type-label">boolean</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** <span class="type-label">string</span>
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`DeploymentProcessId`** <span class="type-label">string</span>
- **`DeprovisioningRunbookId`** <span class="type-label">string</span>
- **`Description`** <span class="type-label">string</span>
- **`DiscreteChannelRelease`** <span class="type-label">boolean</span> — Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** <span class="type-label">boolean</span>
- **`ExtensionSettings`** <span class="type-label">array of object</span>
  - **`ExtensionId`** <span class="type-label">string</span>
  - **`Values`** <span class="type-label">string</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Icon`** <span class="type-label">object</span>
  - **`Color`** <span class="type-label">string</span> — Icon background colour, as a Hex string.
  - **`Id`** <span class="type-label">string</span> — Font Awesome Icon Id.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IncludedLibraryVariableSetIds`** <span class="type-label">array of string</span> — Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** <span class="type-label">boolean</span>
- **`IsDisabled`** <span class="type-label">boolean</span>
- **`IsVersionControlled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** <span class="type-label">string</span>
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`PersistenceSettings`** <span class="type-label">object</span>
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`ProjectGroupId`** <span class="type-label">string</span>
- **`ProjectTags`** <span class="type-label">array of string</span> — List of tags assigned to this project.
- **`ProjectTemplateDetails`** <span class="type-label">object</span>
  - **`IsShared`** <span class="type-label">boolean</span>
  - **`Slug`** <span class="type-label">string</span>
  - **`VersionMask`** <span class="type-label">string</span> — Minimum length 1.
- **`ProvisioningRunbookId`** <span class="type-label">string</span>
- **`ReleaseCreationStrategy`** <span class="type-label">object</span>
  - **`ChannelId`** <span class="type-label">string</span>
  - **`ReleaseCreationPackage`** <span class="type-label">object</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`Slug`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`Templates`** <span class="type-label">array of object</span>
  - **`DefaultValue`** <span class="type-label">object</span>
  - **`DisplaySettings`** <span class="type-label">object</span>
  - **`HelpText`** <span class="type-label">string</span>
  - **`Id`** <span class="type-label">string</span>
  - **`Label`** <span class="type-label">string</span>
  - **`Name`** <span class="type-label">string</span>
- **`TenantedDeploymentMode`** <span class="type-label">enum</span> — Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VariableSetId`** <span class="type-label">string</span>
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "AllowIgnoreChannelRules": true,
  "AutoCreateRelease": true,
  "AutoDeployReleaseOverrides": [
    {
      "EnvironmentId": "string",
      "ReleaseId": "string",
      "TenantId": "string"
    }
  ],
  "ClonedFromProjectId": "string",
  "CombineHealthAndSyncStatusInDashboardLiveStatus": true,
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultPowerShellEdition": "string",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "DeploymentProcessId": "string",
  "DeprovisioningRunbookId": "string",
  "Description": "string",
  "DiscreteChannelRelease": true,
  "ExecuteDeploymentsOnEventBasedPipeline": true,
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "ForcePackageDownload": true,
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IncludedLibraryVariableSetIds": [
    "string"
  ],
  "IsBadgesEnabled": true,
  "IsDisabled": true,
  "IsVersionControlled": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "LifecycleId": "string",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "PersistenceSettings": {
    "Type": "Database"
  },
  "ProjectConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "ProjectGroupId": "string",
  "ProjectTags": [
    "string"
  ],
  "ProjectTemplateDetails": {
    "IsShared": true,
    "Slug": "string",
    "VersionMask": "string"
  },
  "ProvisioningRunbookId": "string",
  "ReleaseCreationStrategy": {
    "ChannelId": "string",
    "ReleaseCreationPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    }
  },
  "ReleaseNotesTemplate": "string",
  "Slug": "string",
  "SpaceId": "string",
  "Templates": [
    {
      "DefaultValue": {
        "IsSensitive": true,
        "SensitiveValue": {},
        "Value": "string"
      },
      "DisplaySettings": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "HelpText": "string",
      "Id": "string",
      "Label": "string",
      "Name": "string"
    }
  ],
  "TenantedDeploymentMode": "Untenanted",
  "VariableSetId": "string",
  "VersioningStrategy": {
    "DonorPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    },
    "Template": "string"
  }
}
```
</div>

## Deletes an existing Project

`DELETE` `/api/{spaceId}/projects/{projectId}`

Also reachable at `/api/projects/{projectId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project to delete.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Tests the Git settings to make sure we can connect

`POST` `/api/{spaceId}/projects/{projectId}/git/connectivity-test`

Also reachable at `/api/projects/{projectId}/git/connectivity-test`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/connectivity-test`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`TestGitSettingsCommand`

- **`BasePath`** <span class="type-label">string</span> *(required)*
- **`Credentials`** <span class="type-label">object</span> *(required)*
  - **`Type`** <span class="type-label">enum</span> — Allowed values: `Anonymous`, `UsernamePassword`, `Reference`, `GitHub`, `SshKey`.
- **`DefaultBranch`** <span class="type-label">string</span> *(required)*
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)*
- **`Url`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "BasePath": "string",
  "Credentials": {
    "Type": "Anonymous"
  },
  "DefaultBranch": "string",
  "ProjectId": "string",
  "SpaceId": "string",
  "Url": "string"
}
```
</div>

**Response**

`200` — The results from testing git settings.

`TestGitSettingsResponse`.

- **`Messages`** <span class="type-label">array of object</span>
  - **`Category`** <span class="type-label">enum</span> — Allowed values: `Info`, `Error`.
  - **`Message`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "Messages": [
    {
      "Category": "Info",
      "Message": "string"
    }
  ]
}
```
</div>

## Converts an existing project to store its configuration in version control

`POST` `/api/{spaceId}/projects/{projectId}/git/convert`

Also reachable at `/api/projects/{projectId}/git/convert`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/convert`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ConvertProjectToVersionControlledCommand`

- **`ChangeDescription`** <span class="type-label">string</span> *(required)* — Minimum length 1.
- **`CommitMessage`** <span class="type-label">string</span>
- **`InitialCommitBranchName`** <span class="type-label">string</span>
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`VersionControlSettings`** <span class="type-label">object</span> *(required)*
  - **`BasePath`** <span class="type-label">string</span> *(required)*
  - **`ConversionState`** <span class="type-label">object</span>
  - **`Credentials`** <span class="type-label">object</span> *(required)*
  - **`DefaultBranch`** <span class="type-label">string</span> *(required)*
  - **`ProtectedBranchNamePatterns`** <span class="type-label">array of string</span>
  - **`ProtectedDefaultBranch`** <span class="type-label">boolean</span>
  - **`SerializationFormat`** <span class="type-label">enum</span> — Allowed values: `Ocl`, `Yaml`.
  - **`Type`** <span class="type-label">enum</span> *(required)* — Allowed values: `Database`, `VersionControlled`. Defaults to `VersionControlled`.
  - **`Url`** <span class="type-label">string</span> *(required)* — Minimum length 1.

<div data-example="Request">

```json
{
  "ChangeDescription": "string",
  "CommitMessage": "string",
  "InitialCommitBranchName": "string",
  "ProjectId": "string",
  "SpaceId": "string",
  "VersionControlSettings": {
    "BasePath": "string",
    "ConversionState": {
      "RunbooksAreInGit": true,
      "VariablesAreInGit": true
    },
    "Credentials": {
      "Type": "Anonymous"
    },
    "DefaultBranch": "string",
    "ProtectedBranchNamePatterns": [
      "string"
    ],
    "ProtectedDefaultBranch": true,
    "SerializationFormat": "Ocl",
    "Type": "Database",
    "Url": "string"
  }
}
```
</div>

**Response**

`200` — Empty response indicating the Project was converted

`ConvertProjectToVersionControlledResponse`.

<div data-example="Response">

```json
{}
```
</div>

## Converts all Runbooks to be stored in Git rather than the database

`POST` `/api/{spaceId}/projects/{projectId}/git/migrate-runbooks`

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/migrate-runbooks`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ConvertProjectRunbooksToGitCommand`

- **`Branch`** <span class="type-label">string</span> — Branch to commit the migrated Runbooks to. Required if there are Runbooks to migrate.
- **`CommitMessage`** <span class="type-label">string</span> — Commit message to use when committing the migrated Runbooks to Git. Required if there are Runbooks to migrate.
- **`CreateBranch`** <span class="type-label">boolean</span>
- **`ProjectId`** <span class="type-label">string</span> *(required)*
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

<div data-example="Request">

```json
{
  "Branch": "string",
  "CommitMessage": "string",
  "CreateBranch": true,
  "ProjectId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Indicates that the project runbooks were converted to Git

`ConvertProjectRunbooksToGitResponse`.

- **`DraftRunbooks`** <span class="type-label">array of object</span>
  - **`RunbookId`** <span class="type-label">string</span>
  - **`RunbookName`** <span class="type-label">string</span>
- **`PublishedRunbooks`** <span class="type-label">array of object</span>
  - **`RunbookId`** <span class="type-label">string</span>
  - **`RunbookName`** <span class="type-label">string</span>
- **`ServerTaskId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "DraftRunbooks": [
    {
      "RunbookId": "string",
      "RunbookName": "string"
    }
  ],
  "PublishedRunbooks": [
    {
      "RunbookId": "string",
      "RunbookName": "string"
    }
  ],
  "ServerTaskId": "string"
}
```
</div>

## Validates the provided git ref

`POST` `/api/{spaceId}/projects/{projectId}/git/validate`

Also reachable at `/api/projects/{projectId}/git/validate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/validate`.

**Deprecated.** This endpoint may be removed in a future release.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Request Body**

`ValidateGitRefCommand`

- **`GitRef`** <span class="type-label">string</span> *(required)*
- **`ProjectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`SpaceId`** <span class="type-label">string</span> *(required)*

<div data-example="Request">

```json
{
  "GitRef": "string",
  "ProjectId": "string",
  "SpaceId": "string"
}
```
</div>

**Response**

`200` — Validated Git ref or error message

`ValidateGitRefResponse`.

- **`Error`** <span class="type-label">string</span>
- **`ValidatedGitRef`** <span class="type-label">object</span>
  - **`CanonicalName`** <span class="type-label">string</span> — Minimum length 1.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span> — Minimum length 1.

<div data-example="Response">

```json
{
  "Error": "string",
  "ValidatedGitRef": {
    "CanonicalName": "string",
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string"
  }
}
```
</div>

## Updates the logo associated with the project

`POST` `/api/{spaceId}/projects/{projectId}/logo`

Also reachable at `/api/projects/{projectId}/logo`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/logo`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project to change logo for.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Updates the logo associated with the project

`PUT` `/api/{spaceId}/projects/{projectId}/logo`

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project to change logo for.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

## Updates the logo associated with the project

`PUT` `/api/spaces/{spaceIdentifier}/projects/{projectId}/logo`

Also reachable at `/api/projects/{projectId}/logo`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The ID of the project to change logo for.
- **`spaceIdentifier`** <span class="type-label">string</span> *(required)* — Identifier (ID or slug) of the space.

**Response**

`200` — Success

## Gets the custom settings metadata from the extensions

`GET` `/api/{spaceId}/projects/{projectId}/metadata`

Also reachable at `/api/projects/{projectId}/metadata`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/metadata`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)*
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The custom settings metadata from the extensions.

an array of `ProjectSettingsMetadata`.

- **`ExtensionId`** <span class="type-label">string</span> — Minimum length 1.
- **`Metadata`** <span class="type-label">object</span>
  - **`Description`** <span class="type-label">string</span>
  - **`Types`** <span class="type-label">array of object</span>

<div data-example="Response">

```json
[
  {
    "ExtensionId": "string",
    "Metadata": {
      "Description": "string",
      "Types": [
        {}
      ]
    }
  }
]
```
</div>

## Gets a summary of project-specific information

`GET` `/api/{spaceId}/projects/{projectId}/summary`

Also reachable at `/api/projects/{projectId}/summary`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/summary`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Summary

`GetProjectSummaryInDatabaseResponse`.

- **`HasBeenSuccessfullyDeployed`** <span class="type-label">boolean</span>
- **`HasDeploymentProcess`** <span class="type-label">boolean</span>
- **`HasRunbooks`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "HasBeenSuccessfullyDeployed": true,
  "HasDeploymentProcess": true,
  "HasRunbooks": true
}
```
</div>

## Gets a summary of project-specific information

`GET` `/api/{spaceId}/projects/{projectId}/summary/v1`

Also reachable at `/api/projects/{projectId}/summary/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/summary/v1`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Summary

`GetProjectSummaryInDatabaseResponse`.

- **`HasBeenSuccessfullyDeployed`** <span class="type-label">boolean</span>
- **`HasDeploymentProcess`** <span class="type-label">boolean</span>
- **`HasRunbooks`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "HasBeenSuccessfullyDeployed": true,
  "HasDeploymentProcess": true,
  "HasRunbooks": true
}
```
</div>

## Gets a summary of project-specific information

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/summary`

Also reachable at `/api/projects/{projectId}/{gitRef}/summary`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/summary`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Summary

`GetProjectSummaryInGitResponse`.

- **`HasBeenSuccessfullyDeployed`** <span class="type-label">boolean</span>
- **`HasDeploymentProcess`** <span class="type-label">boolean</span>
- **`HasRunbooks`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "HasBeenSuccessfullyDeployed": true,
  "HasDeploymentProcess": true,
  "HasRunbooks": true
}
```
</div>

## Gets a summary of project-specific information

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/summary/v1`

Also reachable at `/api/projects/{projectId}/{gitRef}/summary/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/summary/v1`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)* — ID of the Project.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Summary

`GetProjectSummaryInGitResponse`.

- **`HasBeenSuccessfullyDeployed`** <span class="type-label">boolean</span>
- **`HasDeploymentProcess`** <span class="type-label">boolean</span>
- **`HasRunbooks`** <span class="type-label">boolean</span>

<div data-example="Response">

```json
{
  "HasBeenSuccessfullyDeployed": true,
  "HasDeploymentProcess": true,
  "HasRunbooks": true
}
```
</div>
