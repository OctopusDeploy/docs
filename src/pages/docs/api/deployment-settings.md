---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Deployment Settings
---

## Gets deployment settings by ID

`GET` `/api/{spaceId}/deploymentsettings/{id}`

Also reachable at `/api/deploymentsettings/{id}`, `/api/spaces/{spaceIdentifier}/deploymentsettings/{id}`.

**Deprecated.** This endpoint may be removed in a future release.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the DeploymentSettings to load.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — Success

`DeploymentSettingsResource`.

- **`CancelQueuedTasks`** <span class="type-label">boolean</span>
- **`CancelRunningTasks`** <span class="type-label">boolean</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "string",
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

## Modifies deployment settings

`PUT` `/api/{spaceId}/deploymentsettings/{projectId}`

Also reachable at `/api/deploymentsettings/{projectId}`, `/api/projects/{projectId}/deploymentsettings`, `/api/spaces/{spaceIdentifier}/deploymentsettings/{projectId}`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentsettings`, `/api/{spaceId}/projects/{projectId}/deploymentsettings`.

**Deprecated.** This endpoint may be removed in a future release.

Modifies deployment settings for a project.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The Project ID to get the deployment settings from. Example `Projects-1`.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyDeploymentSettingsInDatabaseCommand`

- **`CancelQueuedTasks`** <span class="type-label">boolean</span> — When enabled, creating a new deployment will cancel all previously queued deployments to the same project/environment/tenant.
- **`CancelRunningTasks`** <span class="type-label">boolean</span> — When enabled, completing a deployment will cancel older running or paused deployments to the same project/environment/tenant.
- **`ChangeDescription`** <span class="type-label">string</span> — The description for the deployment settings modification.
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — The action related to when a deployment error occurs. (IE: Enabling guided failure will pause the deployment failure to allow error correction before proceeding). Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span> — If true, and the version of the package being deployed is already present on the machine, its re-deployment will be skipped.
- **`DeploymentChangesTemplate`** <span class="type-label">string</span> — A markdown template generated for each deployment's changes.
- **`FailTargetDiscovery`** <span class="type-label">boolean</span> — Fail cloud discovery steps if no targets found.
- **`ForcePackageDownload`** <span class="type-label">boolean</span> — Option to force re-downloading packages for deployment.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — The Project ID to get the deployment settings from. Example `Projects-1`.
- **`ReleaseNotesTemplate`** <span class="type-label">string</span> — Template text pre-filled as the release notes when a release of this project is created; may contain Octopus variable expressions. Omitting this clears the project's existing template.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ChangeDescription": "string",
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "ProjectId": "string",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "string",
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

`200` — Confirmation that the Deployment Settings were modified, contains the updated Deployment Settings

`DeploymentSettingsResource`.

- **`CancelQueuedTasks`** <span class="type-label">boolean</span>
- **`CancelRunningTasks`** <span class="type-label">boolean</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "string",
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

## Gets deployment settings by ID

`GET` `/api/{spaceId}/projects/{projectId}/deploymentsettings`

Also reachable at `/api/projects/{projectId}/deploymentsettings`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/deploymentsettings`.

**Parameters**

- **`projectId`** <span class="type-label">string</span> *(required)* — The Project ID to get the deployment settings from. Example `Projects-1`.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Deployment Settings.

`DeploymentSettingsResource`.

- **`CancelQueuedTasks`** <span class="type-label">boolean</span>
- **`CancelRunningTasks`** <span class="type-label">boolean</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "string",
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

## Gets deployment settings by ID

`GET` `/api/{spaceId}/projects/{projectId}/{gitRef}/deploymentsettings`

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentsettings`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentsettings`.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)*
- **`projectId`** <span class="type-label">string</span> *(required)* — The Project ID to get the deployment settings from. Example `Projects-1`.
- **`spaceId`** <span class="type-label">string</span> *(required)*

**Response**

`200` — The requested Deployment Settings.

`DeploymentSettingsResource`.

- **`CancelQueuedTasks`** <span class="type-label">boolean</span>
- **`CancelRunningTasks`** <span class="type-label">boolean</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "string",
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

## Modifies deployment settings

`PUT` `/api/{spaceId}/projects/{projectId}/{gitRef}/deploymentsettings`

Also reachable at `/api/projects/{projectId}/{gitRef}/deploymentsettings`, `/api/spaces/{spaceIdentifier}/projects/{projectId}/{gitRef}/deploymentsettings`.

Modifies deployment settings for a project.

**Parameters**

- **`gitRef`** <span class="type-label">string</span> *(required)* — Git reference to use when modifying deployment settings.
- **`projectId`** <span class="type-label">string</span> *(required)* — The Project ID to get the deployment settings from. Example `Projects-1`.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Request Body**

`ModifyDeploymentSettingsInGitCommand`

- **`CancelQueuedTasks`** <span class="type-label">boolean</span> — When enabled, creating a new deployment will cancel all previously queued deployments to the same project/environment/tenant.
- **`CancelRunningTasks`** <span class="type-label">boolean</span> — When enabled, completing a deployment will cancel older running or paused deployments to the same project/environment/tenant.
- **`ChangeDescription`** <span class="type-label">string</span> — Used as the Git commit message. Omit to use the default message 'Update deployment settings'.
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — The action related to when a deployment error occurs. (IE: Enabling guided failure will pause the deployment failure to allow error correction before proceeding). Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span> — If true, and the version of the package being deployed is already present on the machine, its re-deployment will be skipped.
- **`DeploymentChangesTemplate`** <span class="type-label">string</span> — A markdown template generated for each deployment's changes.
- **`FailTargetDiscovery`** <span class="type-label">boolean</span> — Option to fail a step if no matching targets found in cloud discovery steps.
- **`ForcePackageDownload`** <span class="type-label">boolean</span> — Option to force re-downloading packages for deployment.
- **`GitRef`** <span class="type-label">string</span> *(required)* — Git reference to use when modifying deployment settings.
- **`ProjectId`** <span class="type-label">string</span> *(required)* — The Project ID to get the deployment settings from. Example `Projects-1`.
- **`ReleaseNotesTemplate`** <span class="type-label">string</span> — Template text pre-filled as the release notes when a release of this project is created; may contain Octopus variable expressions. Omitting this clears the project's existing template.
- **`SpaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Request">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ChangeDescription": "string",
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "GitRef": "string",
  "ProjectId": "string",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "string",
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

`200` — Confirmation that the Deployment Settings were modified, contains the updated Deployment Settings

`DeploymentSettingsResource`.

- **`CancelQueuedTasks`** <span class="type-label">boolean</span>
- **`CancelRunningTasks`** <span class="type-label">boolean</span>
- **`ConnectivityPolicy`** <span class="type-label">object</span>
  - **`AllowDeploymentsToNoTargets`** <span class="type-label">boolean</span>
  - **`ExcludeUnhealthyTargets`** <span class="type-label">boolean</span>
  - **`SkipMachineBehavior`** <span class="type-label">enum</span> — Allowed values: `None`, `SkipUnavailableMachines`.
  - **`TargetRoles`** <span class="type-label">array of string</span>
- **`DefaultGuidedFailureMode`** <span class="type-label">enum</span> — Allowed values: `EnvironmentDefault`, `Off`, `On`.
- **`DefaultToSkipIfAlreadyInstalled`** <span class="type-label">boolean</span>
- **`DeploymentChangesTemplate`** <span class="type-label">string</span>
- **`FailTargetDiscovery`** <span class="type-label">boolean</span>
- **`ForcePackageDownload`** <span class="type-label">boolean</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`ProjectId`** <span class="type-label">string</span>
- **`ReleaseNotesTemplate`** <span class="type-label">string</span>
- **`SpaceId`** <span class="type-label">string</span>
- **`VersioningStrategy`** <span class="type-label">object</span>
  - **`DonorPackage`** <span class="type-label">object</span>
  - **`Template`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "CancelQueuedTasks": true,
  "CancelRunningTasks": true,
  "ConnectivityPolicy": {
    "AllowDeploymentsToNoTargets": true,
    "ExcludeUnhealthyTargets": true,
    "SkipMachineBehavior": "None",
    "TargetRoles": [
      "string"
    ]
  },
  "DefaultGuidedFailureMode": "EnvironmentDefault",
  "DefaultToSkipIfAlreadyInstalled": true,
  "DeploymentChangesTemplate": "string",
  "FailTargetDiscovery": true,
  "ForcePackageDownload": true,
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "ProjectId": "string",
  "ReleaseNotesTemplate": "string",
  "SpaceId": "string",
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
