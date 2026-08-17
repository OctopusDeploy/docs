---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: User Roles
---

## Get a list of User Roles

:span[GET]{.api-get} `/api/userroles`

Lists all of the User Roles in the current Octopus Deploy instance. The results will be sorted alphabetically by name.

**Query Parameters**

- **`ids`** :span[array of string]{.type-label}  
  A list of User Role IDs, to limit the result to those with a particular ID. Example: ["UserRoles-1", "UserRoles-2"].
- **`partialName`** :span[string]{.type-label}  
  A partial name, to limit the result to those with a name that includes the partial name.
- **`skip`** :span[integer]{.type-label}  
  Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** :span[integer]{.type-label}  
  Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Request list of user roles.

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`ItemType`** :span[string]{.type-label}
- **`Items`** :span[array of object]{.type-label}
  - **`CanBeDeleted`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`GrantedSpacePermissions`** :span[array of enum]{.type-label}  
    Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
  - **`GrantedSystemPermissions`** :span[array of enum]{.type-label}  
    Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
  - **`Id`** :span[string]{.type-label}  
    Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** :span[string]{.type-label}  
    Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** :span[string]{.type-label}  
    Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** :span[object]{.type-label}  
    Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** :span[string]{.type-label}
  - **`SpacePermissionDescriptions`** :span[array of string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
  - **`SystemPermissionDescriptions`** :span[array of string]{.type-label}
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
      "CanBeDeleted": true,
      "Description": "string",
      "GrantedSpacePermissions": [
        "AdministerSystem"
      ],
      "GrantedSystemPermissions": [
        "AdministerSystem"
      ],
      "Id": "string",
      "LastModifiedBy": "string",
      "LastModifiedOn": "2020-01-01T00:00:00.000Z",
      "Links": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
      },
      "Name": "string",
      "SpacePermissionDescriptions": [
        "string"
      ],
      "SupportedRestrictions": [
        "string"
      ],
      "SystemPermissionDescriptions": [
        "string"
      ]
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

## Create a custom user role definition

:span[POST]{.api-post} `/api/userroles`

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`GrantedSpacePermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Name`** :span[string]{.type-label} *(required)*  
  Minimum length 1.

<div data-example="Request">

```json
{
  "Description": "string",
  "GrantedSpacePermissions": [
    "AdministerSystem"
  ],
  "GrantedSystemPermissions": [
    "AdministerSystem"
  ],
  "Name": "string"
}
```
</div>

**Response**

`201` — Created

- **`CanBeDeleted`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GrantedSpacePermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`SpacePermissionDescriptions`** :span[array of string]{.type-label}
- **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SystemPermissionDescriptions`** :span[array of string]{.type-label}

<div data-example="Response">

```json
{
  "CanBeDeleted": true,
  "Description": "string",
  "GrantedSpacePermissions": [
    "AdministerSystem"
  ],
  "GrantedSystemPermissions": [
    "AdministerSystem"
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "SpacePermissionDescriptions": [
    "string"
  ],
  "SupportedRestrictions": [
    "string"
  ],
  "SystemPermissionDescriptions": [
    "string"
  ]
}
```
</div>

## Get a list of User Roles

:span[GET]{.api-get} `/api/userroles/all`

Lists all of the User Roles in the current Octopus Deploy instance. The results will be sorted alphabetically by name.

**Response**

`200` — The requested list of user roles.

- **`CanBeDeleted`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GrantedSpacePermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`SpacePermissionDescriptions`** :span[array of string]{.type-label}
- **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SystemPermissionDescriptions`** :span[array of string]{.type-label}

<div data-example="Response">

```json
[
  {
    "CanBeDeleted": true,
    "Description": "string",
    "GrantedSpacePermissions": [
      "AdministerSystem"
    ],
    "GrantedSystemPermissions": [
      "AdministerSystem"
    ],
    "Id": "string",
    "LastModifiedBy": "string",
    "LastModifiedOn": "2020-01-01T00:00:00.000Z",
    "Links": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    },
    "Name": "string",
    "SpacePermissionDescriptions": [
      "string"
    ],
    "SupportedRestrictions": [
      "string"
    ],
    "SystemPermissionDescriptions": [
      "string"
    ]
  }
]
```
</div>

## Get a User Role by ID

:span[GET]{.api-get} `/api/userroles/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the UserRole to load.

**Response**

`200` — The requested user role.

- **`CanBeDeleted`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GrantedSpacePermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`SpacePermissionDescriptions`** :span[array of string]{.type-label}
- **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SystemPermissionDescriptions`** :span[array of string]{.type-label}

<div data-example="Response">

```json
{
  "CanBeDeleted": true,
  "Description": "string",
  "GrantedSpacePermissions": [
    "AdministerSystem"
  ],
  "GrantedSystemPermissions": [
    "AdministerSystem"
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "SpacePermissionDescriptions": [
    "string"
  ],
  "SupportedRestrictions": [
    "string"
  ],
  "SystemPermissionDescriptions": [
    "string"
  ]
}
```
</div>

## Modify an existing User Role

:span[PUT]{.api-put} `/api/userroles/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  Id of the User Role to modify.

**Request Body**

- **`Description`** :span[string]{.type-label}
- **`GrantedSpacePermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Id`** :span[string]{.type-label} *(required)*  
  Id of the User Role to modify.
- **`Name`** :span[string]{.type-label}

<div data-example="Request">

```json
{
  "Description": "string",
  "GrantedSpacePermissions": [
    "AdministerSystem"
  ],
  "GrantedSystemPermissions": [
    "AdministerSystem"
  ],
  "Id": "string",
  "Name": "string"
}
```
</div>

**Response**

`200` — Successful modify operation.

- **`CanBeDeleted`** :span[boolean]{.type-label}
- **`Description`** :span[string]{.type-label}
- **`GrantedSpacePermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** :span[array of enum]{.type-label}  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** :span[string]{.type-label}
- **`SpacePermissionDescriptions`** :span[array of string]{.type-label}
- **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SystemPermissionDescriptions`** :span[array of string]{.type-label}

<div data-example="Response">

```json
{
  "CanBeDeleted": true,
  "Description": "string",
  "GrantedSpacePermissions": [
    "AdministerSystem"
  ],
  "GrantedSystemPermissions": [
    "AdministerSystem"
  ],
  "Id": "string",
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "Name": "string",
  "SpacePermissionDescriptions": [
    "string"
  ],
  "SupportedRestrictions": [
    "string"
  ],
  "SystemPermissionDescriptions": [
    "string"
  ]
}
```
</div>

## Delete an existing User Role

:span[DELETE]{.api-delete} `/api/userroles/{id}`

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the User Role to delete.

**Response**

`200` — Success
