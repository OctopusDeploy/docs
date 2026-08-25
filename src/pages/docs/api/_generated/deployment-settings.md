---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployment Settings
---

## Get deployment settings by ID

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/deploymentsettings"}

Also reachable at `/api/projects/{projectId}/deploymentsettings`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentsettings`.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The Project ID to get the deployment settings from. Example `Projects-1`.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Deployment Settings.

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "CancelQueuedTasks": false,
  "CancelRunningTasks": false,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": false,
  "ForcePackageDownload": false,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "Projects-1",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "Spaces-1",
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

## Get deployment settings by ID

:endpoint{method="GET" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/deploymentsettings"}

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentsettings`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentsettings`.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*
- **`projectId`** :span[string]{.type-label} *(required)*  
  The Project ID to get the deployment settings from. Example `Projects-1`.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — The requested Deployment Settings.

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "CancelQueuedTasks": false,
  "CancelRunningTasks": false,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": false,
  "ForcePackageDownload": false,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "Projects-1",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "Spaces-1",
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

## Modify deployment settings

:endpoint{method="PUT" path="/api/\{spaceId\}/projects/\{projectId\}/\{gitRef\}/deploymentsettings"}

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentsettings`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentsettings`.

Modifies deployment settings for a project.

**Path Parameters**

- **`gitRef`** :span[string]{.type-label} *(required)*  
  Git reference to use when modifying deployment settings.
- **`projectId`** :span[string]{.type-label} *(required)*  
  The Project ID to get the deployment settings from. Example `Projects-1`.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`CancelQueuedTasks`** :span[boolean]{.type-label}  
  When enabled, creating a new deployment will cancel all previously queued deployments to the same project/environment/tenant.
- **`CancelRunningTasks`** :span[boolean]{.type-label}  
  When enabled, completing a deployment will cancel older running or paused deployments to the same project/environment/tenant.
- **`ChangeDescription`** :span[string]{.type-label}  
  Used as the Git commit message. Omit to use the default message 'Update deployment settings'.
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  The action related to when a deployment error occurs. (IE: Enabling guided failure will pause the deployment failure to allow error correction before proceeding).  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}  
  If true, and the version of the package being deployed is already present on the machine, its re-deployment will be skipped.
- **`DeploymentChangesTemplate`** :span[string]{.type-label}  
  A markdown template generated for each deployment's changes.
- **`FailTargetDiscovery`** :span[boolean]{.type-label}  
  Option to fail a step if no matching targets found in cloud discovery steps.
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Option to force re-downloading packages for deployment.
- **`GitRef`** :span[string]{.type-label} *(required)*  
  Git reference to use when modifying deployment settings.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  The Project ID to get the deployment settings from. Example `Projects-1`.
- **`ReleaseNotesTemplate`** :span[string]{.type-label}  
  Template text pre-filled as the release notes when a release of this project is created; may contain Octopus variable expressions. Omitting this clears the project's existing template.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "CancelQueuedTasks": false,
  "CancelRunningTasks": false,
  "ChangeDescription": "string",
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": false,
  "ForcePackageDownload": false,
  "GitRef": "string",
  "ProjectId": "Projects-1",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "Spaces-1",
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

`200` — Confirmation that the Deployment Settings were modified, contains the updated Deployment Settings

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "CancelQueuedTasks": false,
  "CancelRunningTasks": false,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": false,
  "ForcePackageDownload": false,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "Projects-1",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "Spaces-1",
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

## Get deployment settings by ID

:endpoint{method="GET" path="/api/\{spaceId\}/deploymentsettings/\{id\}" deprecated=true}

Also reachable at `/api/deploymentsettings/{id}`, `/api/spaces/{spaceIdentifier}/deploymentsettings/{id}`.

:::div{.warning}
**Deprecated.** This endpoint may be removed in a future release.
:::

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the DeploymentSettings to load.
- **`spaceId`** :span[string]{.type-label} *(required)*

**Response**

`200` — Success

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "CancelQueuedTasks": false,
  "CancelRunningTasks": false,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": false,
  "ForcePackageDownload": false,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "Projects-1",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "Spaces-1",
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

## Modify deployment settings

:endpoint{method="PUT" path="/api/\{spaceId\}/deploymentsettings/\{projectId\}" deprecated=true}

Also reachable at `/api/deploymentsettings/{projectId}`, `/api/projects/{projectId}/deploymentsettings`, `/api/spaces/{spaceIdentifier}/deploymentsettings/{projectId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentsettings`, `/api/{spaceId}/projects/{projectId}/deploymentsettings`.

:::div{.warning}
**Deprecated.** This endpoint may be removed in a future release.
:::

Modifies deployment settings for a project.

**Path Parameters**

- **`projectId`** :span[string]{.type-label} *(required)*  
  The Project ID to get the deployment settings from. Example `Projects-1`.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Request Body**

- **`CancelQueuedTasks`** :span[boolean]{.type-label}  
  When enabled, creating a new deployment will cancel all previously queued deployments to the same project/environment/tenant.
- **`CancelRunningTasks`** :span[boolean]{.type-label}  
  When enabled, completing a deployment will cancel older running or paused deployments to the same project/environment/tenant.
- **`ChangeDescription`** :span[string]{.type-label}  
  The description for the deployment settings modification.
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  The action related to when a deployment error occurs. (IE: Enabling guided failure will pause the deployment failure to allow error correction before proceeding).  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}  
  If true, and the version of the package being deployed is already present on the machine, its re-deployment will be skipped.
- **`DeploymentChangesTemplate`** :span[string]{.type-label}  
  A markdown template generated for each deployment's changes.
- **`FailTargetDiscovery`** :span[boolean]{.type-label}  
  Fail cloud discovery steps if no targets found.
- **`ForcePackageDownload`** :span[boolean]{.type-label}  
  Option to force re-downloading packages for deployment.
- **`ProjectId`** :span[string]{.type-label} *(required)*  
  The Project ID to get the deployment settings from. Example `Projects-1`.
- **`ReleaseNotesTemplate`** :span[string]{.type-label}  
  Template text pre-filled as the release notes when a release of this project is created; may contain Octopus variable expressions. Omitting this clears the project's existing template.
- **`SpaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Request"}
```json
{
  "CancelQueuedTasks": false,
  "CancelRunningTasks": false,
  "ChangeDescription": "string",
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": false,
  "ForcePackageDownload": false,
  "ProjectId": "Projects-1",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "Spaces-1",
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

`200` — Confirmation that the Deployment Settings were modified, contains the updated Deployment Settings

- **`CancelQueuedTasks`** :span[boolean]{.type-label}
- **`CancelRunningTasks`** :span[boolean]{.type-label}
- **`ConnectivityPolicy`** :span[object]{.type-label}
  - **`AllowDeploymentsToNoTargets`** :span[boolean]{.type-label}
  - **`ExcludeUnhealthyTargets`** :span[boolean]{.type-label}
  - **`SkipMachineBehavior`** :span[enum]{.type-label}  
    Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** :span[array of string]{.type-label}
- **`DefaultGuidedFailureMode`** :span[enum]{.type-label}  
  Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** :span[boolean]{.type-label}
- **`DeploymentChangesTemplate`** :span[string]{.type-label}
- **`FailTargetDiscovery`** :span[boolean]{.type-label}
- **`ForcePackageDownload`** :span[boolean]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** :span[string]{.type-label}
- **`ReleaseNotesTemplate`** :span[string]{.type-label}
- **`SpaceId`** :span[string]{.type-label}
- **`VersioningStrategy`** :span[object]{.type-label}
  - **`DonorPackage`** :span[object]{.type-label}
  - **`Template`** :span[string]{.type-label}

:::api-example{label="Response"}
```json
{
  "CancelQueuedTasks": false,
  "CancelRunningTasks": false,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": false,
    "ExcludeUnhealthyTargets": false,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": false,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": false,
  "ForcePackageDownload": false,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "Projects-1",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "Spaces-1",
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
