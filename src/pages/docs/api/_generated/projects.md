---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-09-02
title: Projects
---

## List all of the projects in the supplied Octopus Deploy Space, from all project groups. The results will be sorted alphabetically by name

:endpoint{method="GET" path="/api/\{spaceId\}/projects"}

Also reachable at `/api/projects`, `/api/spaces/{spaceIdentifier}/projects`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Query Parameters**

- **`clonedFromProjectId`** :span[string]{.type-label}
- **`ids`** :span[array of string]{.type-label}
- **`name`** :span[string]{.type-label}  
  (Obsolete) A partial or complete name to limit the set of retrieved Projects to. This will perform a "contains" style match against the supplied name or name-fragment. Left for backwards compatibility.
- **`partialName`** :span[string]{.type-label}  
  A partial name, to limit the set of Projects to those with a name that includes the partial name.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — List all of the projects in the supplied Octopus Deploy Space, from all project groups. The results will be sorted alphabetically by name.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`AllowIgnoreChannelRules`** :span[boolean]{.type-label}
  - **`AutoCreateRelease`** :span[boolean]{.type-label}
  - **`AutoDeployReleaseOverrides`** :span[array of object]{.type-label}
  - **`ClonedFromProjectId`** :span[string]{.type-label}
  - **`CombineHealthAndSyncStatusInDashboardLiveStatus`** :span[boolean]{.type-label}
  - **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
    Allowed values: `EnvironmentDefault`, `Off`, `On`.
  - **`DefaultPowerShellEdition`** :span[string]{.type-label}
  - **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
  - **`DeploymentChangesTemplate`** :span[string]{.type-label}
  - **`DeploymentProcessId`** :span[string]{.type-label}
  - **`DeprovisioningRunbookId`** :span[string]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`DiscreteChannelRelease`** :span[boolean]{.type-label}  
    Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
  - **`ExecuteDeploymentsOnEventBasedPipeline`** :span[boolean]{.type-label}
  - **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ForcePackageDownload`** :span[boolean]{.type-label}
  - **`Icon`** :span[object]{.type-label}
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`IncludedLibraryVariableSetIds`** :span[array of string]{.type-label}  
    Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
  - **`IsBadgesEnabled`** :span[boolean]{.type-label}
  - **`IsDisabled`** :span[boolean]{.type-label}
  - **`IsVersionControlled`** :span[boolean]{.type-label}
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`LifecycleId`** :span[string]{.type-label}
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`PersistenceSettings`** :span[object]{.type-label}
  - **`ProjectConnectivityPolicy`** :span[object]{.type-label}
  - **`ProjectGroupId`** :span[string]{.type-label}
  - **`ProjectTags`** :span[array of string]{.type-label}  
    List of tags assigned to this project.
  - **`ProjectTemplateDetails`** :span[object]{.type-label}
  - **`ProvisioningRunbookId`** :span[string]{.type-label}
  - **`ReleaseCreationStrategy`** :span[object]{.type-label}
  - **`ReleaseNotesTemplate`** :span[string]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}
  - **`Templates`** :span[array of object]{.type-label}
  - **`TenantedDeploymentMode`** :span[enum]{.type-label}  
    Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
  - **`VariableSetId`** :span[string]{.type-label}
  - **`VersioningStrategy`** :span[object]{.type-label}
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
      "AllowIgnoreChannelRules": false,
      "AutoCreateRelease": false,
      "AutoDeployReleaseOverrides": [
        {}
      ],
      "ClonedFromProjectId": "Projects-1",
      "CombineHealthAndSyncStatusInDashboardLiveStatus": false,
      "DefaultGuidedFailureMode": "EnvironmentDefault",
      "DefaultPowerShellEdition": "string",
      "DefaultToSkipIfAlreadyInstalled": false,
      "DeploymentChangesTemplate": "string",
      "DeploymentProcessId": "string",
      "DeprovisioningRunbookId": "Runbooks-1",
      "Description": "string",
      "DiscreteChannelRelease": false,
      "ExecuteDeploymentsOnEventBasedPipeline": false,
      "ExtensionSettings": [
        {}
      ],
      "ForcePackageDownload": false,
      "Icon": {
        "Color": "string",
        "Id": "string"
      },
      "Id": "string",
      "IncludedLibraryVariableSetIds": [
        "string"
      ],
      "IsBadgesEnabled": false,
      "IsDisabled": false,
      "IsVersionControlled": false,
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
        "AllowDeploymentsToNoTargets": false,
        "ExcludeUnhealthyTargets": false,
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
        "IsShared": false,
        "Slug": "string",
        "VersionMask": "string"
      },
      "ProvisioningRunbookId": "Runbooks-1",
      "ReleaseCreationStrategy": {
        "ChannelId": "string",
        "ReleaseCreationPackage": {}
      },
      "ReleaseNotesTemplate": "string",
      "Slug": "string",
      "SpaceId": "Spaces-1",
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
:::

## Create a new project

:endpoint{method="POST" path="/api/\{spaceId\}/projects"}

Also reachable at `/api/projects`, `/api/spaces/{spaceIdentifier}/projects`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AllowIgnoreChannelRules`** :span[boolean]{.type-label}
- **`AutoCreateRelease`** :span[boolean]{.type-label}
- **`AutoDeployReleaseOverrides`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ReleaseId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`Clone`** :span[string]{.type-label}  
  ID of an existing project in the same space whose configuration (deployment process, variables, channels, runbooks, triggers) is copied into the new project. The source project must store its configuration in the database, not Git.
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** :span[boolean]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`DiscreteChannelRelease`** :span[boolean]{.type-label}  
  Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** :span[boolean]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`IncludedLibraryVariableSetIds`** :span[array of string]{.type-label}  
  Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsDisabled`** :span[boolean]{.type-label}
- **`LifecycleId`** :span[string]{.type-label}  
  Required for non-templated projects. Templated projects source their lifecycle from the project template.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`PersistenceSettings`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`ProjectGroupId`** :span[string]{.type-label} *(required)*
- **`ProjectTags`** :span[array of string]{.type-label}  
  Tags to apply to the project, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Regions/us-east"). Call find_tag_sets to discover which tag sets apply to projects and what tags they contain.
- **`ReleaseCreationStrategy`** :span[object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`ReleaseCreationPackage`** :span[object]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`RetainTenantConnections`** :span[boolean]{.type-label}  
  When cloning, copy the source project's tenant connections to the new project. Only honoured when Clone is set. Defaults to false.
- **`Slug`** :span[string]{.type-label}  
  URL-friendly short identifier for the project, unique within the space (for example "web-store"). Leave unset to have one generated from the name.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Templates`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`TenantedDeploymentMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "AllowIgnoreChannelRules": false,
  "AutoCreateRelease": false,
  "AutoDeployReleaseOverrides": [
    {
      "EnvironmentId": "string",
      "ReleaseId": "string",
      "TenantId": "Tenants-1"
    }
  ],
  "Clone": "Projects-1",
  "CombineHealthAndSyncStatusInDashboardLiveStatus": false,
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "Description": "string",
  "DiscreteChannelRelease": false,
  "ExecuteDeploymentsOnEventBasedPipeline": false,
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "ForcePackageDownload": false,
  "IncludedLibraryVariableSetIds": [
    "string"
  ],
  "IsDisabled": false,
  "LifecycleId": "Lifecycles-1",
  "Name": "string",
  "PersistenceSettings": {
    "Type": "Database"
  },
  "ProjectConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "ProjectGroupId": "ProjectGroups-1",
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
  "RetainTenantConnections": false,
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "Templates": [
    {
      "DefaultValue": {
        "IsSensitive": false,
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
:::

**Response**

`201` — Created

- **`AllowIgnoreChannelRules`** :span[boolean]{.type-label}
- **`AutoCreateRelease`** :span[boolean]{.type-label}
- **`AutoDeployReleaseOverrides`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ReleaseId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`ClonedFromProjectId`** :span[string]{.type-label}
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** :span[boolean]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** :span[string]{.type-label}
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`DeploymentProcessId`** :span[string]{.type-label}
- **`DeprovisioningRunbookId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`DiscreteChannelRelease`** :span[boolean]{.type-label}  
  Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** :span[boolean]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IncludedLibraryVariableSetIds`** :span[array of string]{.type-label}  
  Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** :span[boolean]{.type-label}
- **`IsDisabled`** :span[boolean]{.type-label}
- **`IsVersionControlled`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`PersistenceSettings`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`ProjectGroupId`** :span[string]{.type-label}
- **`ProjectTags`** :span[array of string]{.type-label}  
  List of tags assigned to this project.
- **`ProjectTemplateDetails`** :span[object]{.type-label}
  - **`IsShared`** :span[boolean]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`VersionMask`** :span[string]{.type-label}  
    Minimum length 1.
- **`ProvisioningRunbookId`** :span[string]{.type-label}
- **`ReleaseCreationStrategy`** :span[object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`ReleaseCreationPackage`** :span[object]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Templates`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`TenantedDeploymentMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VariableSetId`** :span[string]{.type-label}
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AllowIgnoreChannelRules": false,
  "AutoCreateRelease": false,
  "AutoDeployReleaseOverrides": [
    {
      "EnvironmentId": "string",
      "ReleaseId": "string",
      "TenantId": "Tenants-1"
    }
  ],
  "ClonedFromProjectId": "Projects-1",
  "CombineHealthAndSyncStatusInDashboardLiveStatus": false,
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultPowerShellEdition": "string",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "DeploymentProcessId": "string",
  "DeprovisioningRunbookId": "Runbooks-1",
  "Description": "string",
  "DiscreteChannelRelease": false,
  "ExecuteDeploymentsOnEventBasedPipeline": false,
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "ForcePackageDownload": false,
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IncludedLibraryVariableSetIds": [
    "string"
  ],
  "IsBadgesEnabled": false,
  "IsDisabled": false,
  "IsVersionControlled": false,
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
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
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
    "IsShared": false,
    "Slug": "string",
    "VersionMask": "string"
  },
  "ProvisioningRunbookId": "Runbooks-1",
  "ReleaseCreationStrategy": {
    "ChannelId": "string",
    "ReleaseCreationPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    }
  },
  "ReleaseNotesTemplate": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "Templates": [
    {
      "DefaultValue": {
        "IsSensitive": false,
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
:::

## List all of the projects in the supplied Octopus Deploy Space

:endpoint{method="GET" path="/api/\{spaceId\}/projects/all"}

Also reachable at `/api/projects/all`, `/api/spaces/{spaceIdentifier}/projects/all`.

**Path Parameters**

- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the space.

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  Project Ids of Projects to filter results to.

**Response**

`200` — All of the project resources in the supplied Octopus Deploy Space.

- **`AllowIgnoreChannelRules`** :span[boolean]{.type-label}
- **`AutoCreateRelease`** :span[boolean]{.type-label}
- **`AutoDeployReleaseOverrides`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ReleaseId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`ClonedFromProjectId`** :span[string]{.type-label}
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** :span[boolean]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** :span[string]{.type-label}
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`DeploymentProcessId`** :span[string]{.type-label}
- **`DeprovisioningRunbookId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`DiscreteChannelRelease`** :span[boolean]{.type-label}  
  Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** :span[boolean]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IncludedLibraryVariableSetIds`** :span[array of string]{.type-label}  
  Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** :span[boolean]{.type-label}
- **`IsDisabled`** :span[boolean]{.type-label}
- **`IsVersionControlled`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`PersistenceSettings`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`ProjectGroupId`** :span[string]{.type-label}
- **`ProjectTags`** :span[array of string]{.type-label}  
  List of tags assigned to this project.
- **`ProjectTemplateDetails`** :span[object]{.type-label}
  - **`IsShared`** :span[boolean]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`VersionMask`** :span[string]{.type-label}  
    Minimum length 1.
- **`ProvisioningRunbookId`** :span[string]{.type-label}
- **`ReleaseCreationStrategy`** :span[object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`ReleaseCreationPackage`** :span[object]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Templates`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`TenantedDeploymentMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VariableSetId`** :span[string]{.type-label}
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
[
  {
    "AllowIgnoreChannelRules": false,
    "AutoCreateRelease": false,
    "AutoDeployReleaseOverrides": [
      {
        "EnvironmentId": "string",
        "ReleaseId": "string",
        "TenantId": "Tenants-1"
      }
    ],
    "ClonedFromProjectId": "Projects-1",
    "CombineHealthAndSyncStatusInDashboardLiveStatus": false,
    "DefaultGuidedFailureMode": "EnvironmentDefault",
    "DefaultPowerShellEdition": "string",
    "DefaultToSkipIfAlreadyInstalled": false,
    "DeploymentChangesTemplate": "string",
    "DeploymentProcessId": "string",
    "DeprovisioningRunbookId": "Runbooks-1",
    "Description": "string",
    "DiscreteChannelRelease": false,
    "ExecuteDeploymentsOnEventBasedPipeline": false,
    "ExtensionSettings": [
      {
        "ExtensionId": "string",
        "Values": "string"
      }
    ],
    "ForcePackageDownload": false,
    "Icon": {
      "Color": "string",
      "Id": "string"
    },
    "Id": "string",
    "IncludedLibraryVariableSetIds": [
      "string"
    ],
    "IsBadgesEnabled": false,
    "IsDisabled": false,
    "IsVersionControlled": false,
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
      "AllowDeploymentsToNoTargets": false,
      "ExcludeUnhealthyTargets": false,
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
      "IsShared": false,
      "Slug": "string",
      "VersionMask": "string"
    },
    "ProvisioningRunbookId": "Runbooks-1",
    "ReleaseCreationStrategy": {
      "ChannelId": "string",
      "ReleaseCreationPackage": {
        "DeploymentAction": "string",
        "PackageReference": "string"
      }
    },
    "ReleaseNotesTemplate": "string",
    "Slug": "string",
    "SpaceId": "Spaces-1",
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
:::

## Get the logo associated with the project

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{id\}/logo"}

Also reachable at `/api/projects/{id}/logo`, `/api/spaces/{spaceIdentifier}/projects/{id}/logo`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the resource.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  ID of the space.

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::

## Get a Project by ID or slug

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}"}

Also reachable at `/api/projects/{projectId}`, `/api/projects/{projectId}/{unusedGitRef}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{unusedGitRef}`, `/api/{spaceId}/projects/{projectId}/{unusedGitRef}`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project to return.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Project.

- **`AllowIgnoreChannelRules`** :span[boolean]{.type-label}
- **`AutoCreateRelease`** :span[boolean]{.type-label}
- **`AutoDeployReleaseOverrides`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ReleaseId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`ClonedFromProjectId`** :span[string]{.type-label}
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** :span[boolean]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** :span[string]{.type-label}
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`DeploymentProcessId`** :span[string]{.type-label}
- **`DeprovisioningRunbookId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`DiscreteChannelRelease`** :span[boolean]{.type-label}  
  Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** :span[boolean]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IncludedLibraryVariableSetIds`** :span[array of string]{.type-label}  
  Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** :span[boolean]{.type-label}
- **`IsDisabled`** :span[boolean]{.type-label}
- **`IsVersionControlled`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`PersistenceSettings`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`ProjectGroupId`** :span[string]{.type-label}
- **`ProjectTags`** :span[array of string]{.type-label}  
  List of tags assigned to this project.
- **`ProjectTemplateDetails`** :span[object]{.type-label}
  - **`IsShared`** :span[boolean]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`VersionMask`** :span[string]{.type-label}  
    Minimum length 1.
- **`ProvisioningRunbookId`** :span[string]{.type-label}
- **`ReleaseCreationStrategy`** :span[object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`ReleaseCreationPackage`** :span[object]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Templates`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`TenantedDeploymentMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VariableSetId`** :span[string]{.type-label}
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AllowIgnoreChannelRules": false,
  "AutoCreateRelease": false,
  "AutoDeployReleaseOverrides": [
    {
      "EnvironmentId": "string",
      "ReleaseId": "string",
      "TenantId": "Tenants-1"
    }
  ],
  "ClonedFromProjectId": "Projects-1",
  "CombineHealthAndSyncStatusInDashboardLiveStatus": false,
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultPowerShellEdition": "string",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "DeploymentProcessId": "string",
  "DeprovisioningRunbookId": "Runbooks-1",
  "Description": "string",
  "DiscreteChannelRelease": false,
  "ExecuteDeploymentsOnEventBasedPipeline": false,
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "ForcePackageDownload": false,
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IncludedLibraryVariableSetIds": [
    "string"
  ],
  "IsBadgesEnabled": false,
  "IsDisabled": false,
  "IsVersionControlled": false,
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
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
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
    "IsShared": false,
    "Slug": "string",
    "VersionMask": "string"
  },
  "ProvisioningRunbookId": "Runbooks-1",
  "ReleaseCreationStrategy": {
    "ChannelId": "string",
    "ReleaseCreationPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    }
  },
  "ReleaseNotesTemplate": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "Templates": [
    {
      "DefaultValue": {
        "IsSensitive": false,
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
:::

## Modify an existing Project

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}"}

Also reachable at `/api/projects/{projectId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the project to modify.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`AllowIgnoreChannelRules`** :span[boolean]{.type-label}
- **`AutoCreateRelease`** :span[boolean]{.type-label}
- **`AutoDeployReleaseOverrides`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ReleaseId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`ChangeDescription`** :span[string]{.type-label}  
  The change description.
- **`ClonedFromProjectId`** :span[string]{.type-label}
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** :span[boolean]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** :span[string]{.type-label}  
  Which edition of PowerShell the project's script steps run under: "Desktop" (Windows PowerShell) or "Core" (cross-platform PowerShell). Leave unset to inherit the server default.
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`DeprovisioningRunbookId`** :span[string]{.type-label}  
  ID of a runbook in this project that tears down an ephemeral environment. Must be an existing runbook of this project; call find_runbooks to look one up. Only relevant to projects using ephemeral environments.
- **`Description`** :span[string]{.type-label}
- **`DiscreteChannelRelease`** :span[boolean]{.type-label}  
  Treats releases of different channels to the same environment as a separate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** :span[boolean]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`IncludedLibraryVariableSetIds`** :span[array of string]{.type-label}  
  Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** :span[boolean]{.type-label}
- **`IsDisabled`** :span[boolean]{.type-label}
- **`LifecycleId`** :span[string]{.type-label}  
  Required for non-templated projects. Templated projects source their lifecycle from the project template.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`PersistenceSettings`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`ProjectGroupId`** :span[string]{.type-label} *(required)*
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  ID of the project to modify.
- **`ProjectTags`** :span[array of string]{.type-label}  
  The project's complete set of tags, each written as "TagSet/Tag" using either the names or the IDs of the tag set and tag (for example "Regions/us-east"). This replaces the project's current tags, so resubmit the existing ones you want to keep. Call find_tag_sets to discover which tag sets apply to projects.
- **`ProvisioningRunbookId`** :span[string]{.type-label}  
  ID of a runbook in this project that provisions an ephemeral environment. Must be an existing runbook of this project; call find_runbooks to look one up. Only relevant to projects using ephemeral environments.
- **`ReleaseCreationStrategy`** :span[object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`ReleaseCreationPackage`** :span[object]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}  
  URL-friendly short identifier for the project, unique within the space. Leave unset to keep the project's current slug.
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Templates`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`TenantedDeploymentMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "AllowIgnoreChannelRules": false,
  "AutoCreateRelease": false,
  "AutoDeployReleaseOverrides": [
    {
      "EnvironmentId": "string",
      "ReleaseId": "string",
      "TenantId": "Tenants-1"
    }
  ],
  "ChangeDescription": "string",
  "ClonedFromProjectId": "Projects-1",
  "CombineHealthAndSyncStatusInDashboardLiveStatus": false,
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultPowerShellEdition": "string",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "DeprovisioningRunbookId": "Runbooks-1",
  "Description": "string",
  "DiscreteChannelRelease": false,
  "ExecuteDeploymentsOnEventBasedPipeline": false,
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "ForcePackageDownload": false,
  "IncludedLibraryVariableSetIds": [
    "string"
  ],
  "IsBadgesEnabled": false,
  "IsDisabled": false,
  "LifecycleId": "Lifecycles-1",
  "Name": "string",
  "PersistenceSettings": {
    "Type": "Database"
  },
  "ProjectConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "ProjectGroupId": "ProjectGroups-1",
  "ProjectId": "Projects-1",
  "ProjectTags": [
    "string"
  ],
  "ProvisioningRunbookId": "Runbooks-1",
  "ReleaseCreationStrategy": {
    "ChannelId": "string",
    "ReleaseCreationPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    }
  },
  "ReleaseNotesTemplate": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "Templates": [
    {
      "DefaultValue": {
        "IsSensitive": false,
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
:::

**Response**

`200` — Confirms that the Project has been modified, containing the updated Project

- **`AllowIgnoreChannelRules`** :span[boolean]{.type-label}
- **`AutoCreateRelease`** :span[boolean]{.type-label}
- **`AutoDeployReleaseOverrides`** :span[array of object]{.type-label}
  - **`EnvironmentId`** :span[string]{.type-label}
  - **`ReleaseId`** :span[string]{.type-label}
  - **`TenantId`** :span[string]{.type-label}
- **`ClonedFromProjectId`** :span[string]{.type-label}
- **`CombineHealthAndSyncStatusInDashboardLiveStatus`** :span[boolean]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultPowerShellEdition`** :span[string]{.type-label}
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`DeploymentProcessId`** :span[string]{.type-label}
- **`DeprovisioningRunbookId`** :span[string]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`DiscreteChannelRelease`** :span[boolean]{.type-label}  
  Treats releases of different channels to the same environment as a seperate deployment dimension. 'False' indicates a "hotfix"-style usage of channels (single release active per environment ignoring channels), whereas `True` indicates "microservice"-style usage (single release per environment per channel).
- **`ExecuteDeploymentsOnEventBasedPipeline`** :span[boolean]{.type-label}
- **`ExtensionSettings`** :span[array of object]{.type-label}
  - **`ExtensionId`** :span[string]{.type-label}
  - **`Values`** :span[string]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Icon`** :span[object]{.type-label}
  - **`Color`** :span[string]{.type-label}  
    Icon background colour, as a Hex string.
  - **`Id`** :span[string]{.type-label}  
    Font Awesome Icon Id.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IncludedLibraryVariableSetIds`** :span[array of string]{.type-label}  
  Library variable sets included in the project. Sets are listed in order of precedence, with earlier items in the list overriding any variables with the same name and scope definition appearing later in the list.
- **`IsBadgesEnabled`** :span[boolean]{.type-label}
- **`IsDisabled`** :span[boolean]{.type-label}
- **`IsVersionControlled`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`LifecycleId`** :span[string]{.type-label}
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`PersistenceSettings`** :span[object]{.type-label}
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Database`, `VersionControlled`.
- **`ProjectConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`ProjectGroupId`** :span[string]{.type-label}
- **`ProjectTags`** :span[array of string]{.type-label}  
  List of tags assigned to this project.
- **`ProjectTemplateDetails`** :span[object]{.type-label}
  - **`IsShared`** :span[boolean]{.type-label}
  - **`Slug`** :span[string]{.type-label}
  - **`VersionMask`** :span[string]{.type-label}  
    Minimum length 1.
- **`ProvisioningRunbookId`** :span[string]{.type-label}
- **`ReleaseCreationStrategy`** :span[object]{.type-label}
  - **`ChannelId`** :span[string]{.type-label}
  - **`ReleaseCreationPackage`** :span[object]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`Slug`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`Templates`** :span[array of object]{.type-label}
  - **`DefaultValue`** :span[object]{.type-label}
  - **`DisplaySettings`** :span[object]{.type-label}
  - **`HelpText`** :span[string]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`Label`** :span[string]{.type-label}
  - **`Name`** :span[string]{.type-label}
- **`TenantedDeploymentMode`** :span[enum]{.type-label}  
  Allowed values: `Untenanted`, `TenantedOrUntenanted`, `Tenanted`.
- **`VariableSetId`** :span[string]{.type-label}
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AllowIgnoreChannelRules": false,
  "AutoCreateRelease": false,
  "AutoDeployReleaseOverrides": [
    {
      "EnvironmentId": "string",
      "ReleaseId": "string",
      "TenantId": "Tenants-1"
    }
  ],
  "ClonedFromProjectId": "Projects-1",
  "CombineHealthAndSyncStatusInDashboardLiveStatus": false,
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultPowerShellEdition": "string",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "DeploymentProcessId": "string",
  "DeprovisioningRunbookId": "Runbooks-1",
  "Description": "string",
  "DiscreteChannelRelease": false,
  "ExecuteDeploymentsOnEventBasedPipeline": false,
  "ExtensionSettings": [
    {
      "ExtensionId": "string",
      "Values": "string"
    }
  ],
  "ForcePackageDownload": false,
  "Icon": {
    "Color": "string",
    "Id": "string"
  },
  "Id": "string",
  "IncludedLibraryVariableSetIds": [
    "string"
  ],
  "IsBadgesEnabled": false,
  "IsDisabled": false,
  "IsVersionControlled": false,
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
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
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
    "IsShared": false,
    "Slug": "string",
    "VersionMask": "string"
  },
  "ProvisioningRunbookId": "Runbooks-1",
  "ReleaseCreationStrategy": {
    "ChannelId": "string",
    "ReleaseCreationPackage": {
      "DeploymentAction": "string",
      "PackageReference": "string"
    }
  },
  "ReleaseNotesTemplate": "string",
  "Slug": "string",
  "SpaceId": "Spaces-1",
  "Templates": [
    {
      "DefaultValue": {
        "IsSensitive": false,
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
:::

## Delete an existing Project

:endpoint{method="DELETE" path="/api/\{spaceId\}/projects/\{projectId\}"}

Also reachable at `/api/projects/{projectId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project to delete.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Test the Git settings to make sure we can connect

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/git/connectivity-test"}

Also reachable at `/api/projects/{projectId}/git/connectivity-test`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/connectivity-test`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`BasePath`** :span[string]{.type-label} *(required)*
- **`Credentials`** :span[object]{.type-label} *(required)*
  - **`Type`** :span[enum]{.type-label}  
    Allowed values: `Anonymous`, `UsernamePassword`, `Reference`, `GitHub`, `SshKey`.
- **`DefaultBranch`** :span[string]{.type-label} *(required)*
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*
- **`Url`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

:::api-example{label="Request"}
```json
{
  "BasePath": "string",
  "Credentials": {
    "Type": "Anonymous"
  },
  "DefaultBranch": "string",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
  "Url": "string"
}
```
:::

**Response**

`200` — The results from testing git settings.

- **`Messages`** :span[array of object]{.type-label}
  - **`Category`** :span[enum]{.type-label}  
    Allowed values: `Info`, `Error`.
  - **`Message`** :span[string]{.type-label}  
    Minimum length 1.

:::api-example{label="Response"}
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
:::

## Convert an existing project to store its configuration in version control

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/git/convert"}

Also reachable at `/api/projects/{projectId}/git/convert`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/convert`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`ChangeDescription`** :span[string]{.type-label} *(required)*  
  Minimum length 1.
- **`CommitMessage`** :span[string]{.type-label}
- **`InitialCommitBranchName`** :span[string]{.type-label}
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`VersionControlSettings`** :span[object]{.type-label} *(required)*
  - **`BasePath`** :span[string]{.type-label} *(required)*
  - **`ConversionState`** :span[object]{.type-label}
  - **`Credentials`** :span[object]{.type-label} *(required)*
  - **`DefaultBranch`** :span[string]{.type-label} *(required)*
  - **`ProtectedBranchNamePatterns`** :span[array of string]{.type-label}
  - **`ProtectedDefaultBranch`** :span[boolean]{.type-label}
  - **`SerializationFormat`** :span[enum]{.type-label}  
    Allowed values: `Ocl`, `Yaml`.
  - **`Type`** :span[enum]{.type-label} *(required)*  
    Defaults to `VersionControlled`.  
    Allowed values: `Database`, `VersionControlled`.
  - **`Url`** :span[string]{.type-label} *(required)*  
    Minimum length 1.

:::api-example{label="Request"}
```json
{
  "ChangeDescription": "string",
  "CommitMessage": "string",
  "InitialCommitBranchName": "string",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1",
  "VersionControlSettings": {
    "BasePath": "string",
    "ConversionState": {
      "RunbooksAreInGit": false,
      "VariablesAreInGit": false
    },
    "Credentials": {
      "Type": "Anonymous"
    },
    "DefaultBranch": "string",
    "ProtectedBranchNamePatterns": [
      "string"
    ],
    "ProtectedDefaultBranch": false,
    "SerializationFormat": "Ocl",
    "Type": "Database",
    "Url": "string"
  }
}
```
:::

**Response**

`200` — Empty response indicating the Project was converted

:::api-example{label="Response"}
```json
{}
```
:::

## Convert all Runbooks to be stored in Git rather than the database

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/git/migrate-runbooks"}

Also reachable at `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/migrate-runbooks`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`Branch`** :span[string]{.type-label}  
  Branch to commit the migrated Runbooks to. Required if there are Runbooks to migrate.
- **`CommitMessage`** :span[string]{.type-label}  
  Commit message to use when committing the migrated Runbooks to Git. Required if there are Runbooks to migrate.
- **`CreateBranch`** :span[boolean]{.type-label}
- **`ProjectId`** :span[string]{.type-label} *(required)*
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

:::api-example{label="Request"}
```json
{
  "Branch": "string",
  "CommitMessage": "string",
  "CreateBranch": false,
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Indicates that the project runbooks were converted to Git

- **`DraftRunbooks`** :span[array of object]{.type-label}
  - **`RunbookId`** :span[string]{.type-label}
  - **`RunbookName`** :span[string]{.type-label}
- **`PublishedRunbooks`** :span[array of object]{.type-label}
  - **`RunbookId`** :span[string]{.type-label}
  - **`RunbookName`** :span[string]{.type-label}
- **`ServerTaskId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
  "ServerTaskId": "ServerTasks-1"
}
```
:::

## Update the logo associated with the project

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/logo"}

Also reachable at `/api/projects/{projectId}/logo`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/logo`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project to change logo for.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Update the logo associated with the project

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/logo"}

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project to change logo for.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

## Update the logo associated with the project

:endpoint{method="PUT" path="/api/spaces/\{spaceIdentifier\}/projects/\{projectId\}/logo"}

Also reachable at `/api/projects/{projectId}/logo`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The ID of the project to change logo for.
- **`spaceIdentifier`** :span[string]{.type-label} *(required)*  
  Identifier (ID or slug) of the space.

**Response**

`200` — Success

## Get the custom settings metadata from the extensions

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/metadata"}

Also reachable at `/api/projects/{projectId}/metadata`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/metadata`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The custom settings metadata from the extensions.

- **`ExtensionId`** :span[string]{.type-label}  
  Minimum length 1.
- **`Metadata`** :span[object]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`Types`** :span[array of object]{.type-label}

:::api-example{label="Response"}
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
:::

## Get a summary of project-specific information

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/summary"}

Also reachable at `/api/projects/{projectId}/summary`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/summary`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Summary

- **`HasBeenSuccessfullyDeployed`** :span[boolean]{.type-label}
- **`HasDeploymentProcess`** :span[boolean]{.type-label}
- **`HasRunbooks`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "HasBeenSuccessfullyDeployed": false,
  "HasDeploymentProcess": false,
  "HasRunbooks": false
}
```
:::

## Get a summary of project-specific information

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/summary/v1"}

Also reachable at `/api/projects/{projectId}/summary/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/summary/v1`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Summary

- **`HasBeenSuccessfullyDeployed`** :span[boolean]{.type-label}
- **`HasDeploymentProcess`** :span[boolean]{.type-label}
- **`HasRunbooks`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "HasBeenSuccessfullyDeployed": false,
  "HasDeploymentProcess": false,
  "HasRunbooks": false
}
```
:::

## Get a summary of project-specific information

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/summary"}

Also reachable at `/api/projects/{projectId}/{gitRef}/summary`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/summary`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Summary

- **`HasBeenSuccessfullyDeployed`** :span[boolean]{.type-label}
- **`HasDeploymentProcess`** :span[boolean]{.type-label}
- **`HasRunbooks`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "HasBeenSuccessfullyDeployed": false,
  "HasDeploymentProcess": false,
  "HasRunbooks": false
}
```
:::

## Get a summary of project-specific information

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/summary/v1"}

Also reachable at `/api/projects/{projectId}/{gitRef}/summary/v1`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/summary/v1`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — The requested Project Summary

- **`HasBeenSuccessfullyDeployed`** :span[boolean]{.type-label}
- **`HasDeploymentProcess`** :span[boolean]{.type-label}
- **`HasRunbooks`** :span[boolean]{.type-label}

:::api-example{label="Response"}
```json
{
  "HasBeenSuccessfullyDeployed": false,
  "HasDeploymentProcess": false,
  "HasRunbooks": false
}
```
:::

## Validate the provided git ref

:endpoint{method="POST" path="/api/\{spaceId\}/projects/\{projectId\}/git/validate" deprecated=true}

Also reachable at `/api/projects/{projectId}/git/validate`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/git/validate`.

:::div{.warning}
**Deprecated.** This endpoint may be removed in a future release.
:::

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Request Body**

- **`GitRef`** :span[string]{.type-label} *(required)*
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  ID of the Project.
- **`SpaceId`** :span[string]{.type-label} *(required)*

:::api-example{label="Request"}
```json
{
  "GitRef": "string",
  "ProjectId": "Projects-1",
  "SpaceId": "Spaces-1"
}
```
:::

**Response**

`200` — Validated Git ref or error message

- **`Error`** :span[string]{.type-label}
- **`ValidatedGitRef`** :span[object]{.type-label}
  - **`CanonicalName`** :span[string]{.type-label}  
    Minimum length 1.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}  
    Minimum length 1.

:::api-example{label="Response"}
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
:::
