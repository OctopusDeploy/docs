---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: User Roles
---

## Get a list of User Roles

`GET` `/api/userroles`

Lists all of the User Roles in the current Octopus Deploy instance. The results will be sorted alphabetically by name.

**Parameters**

- **`ids`** <span class="type-label">array of string</span> — A list of User Role IDs, to limit the result to those with a particular ID. Example: ["UserRoles-1", "UserRoles-2"].
- **`partialName`** <span class="type-label">string</span> — A partial name, to limit the result to those with a name that includes the partial name.
- **`skip`** <span class="type-label">integer</span> — Number of items to skip. Defaults to zero. Minimum `0`.
- **`take`** <span class="type-label">integer</span> — Number of items to take. Defaults to 30. Minimum `0`.

**Response**

`200` — Request list of user roles.

`UserRoleResourceCollection`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`ItemType`** <span class="type-label">string</span>
- **`Items`** <span class="type-label">array of object</span>
  - **`CanBeDeleted`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`GrantedSpacePermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
  - **`GrantedSystemPermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
  - **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
  - **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
  - **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
  - **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
  - **`Name`** <span class="type-label">string</span>
  - **`SpacePermissionDescriptions`** <span class="type-label">array of string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
  - **`SystemPermissionDescriptions`** <span class="type-label">array of string</span>
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

`POST` `/api/userroles`

**Request Body**

`CreateUserRoleCommand`

- **`Description`** <span class="type-label">string</span>
- **`GrantedSpacePermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Name`** <span class="type-label">string</span> *(required)* — Minimum length 1.

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

`UserRoleResource`.

- **`CanBeDeleted`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span>
- **`GrantedSpacePermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`SpacePermissionDescriptions`** <span class="type-label">array of string</span>
- **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SystemPermissionDescriptions`** <span class="type-label">array of string</span>

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

`GET` `/api/userroles/all`

Lists all of the User Roles in the current Octopus Deploy instance. The results will be sorted alphabetically by name.

**Response**

`200` — The requested list of user roles.

an array of `UserRoleResource`.

- **`CanBeDeleted`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span>
- **`GrantedSpacePermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`SpacePermissionDescriptions`** <span class="type-label">array of string</span>
- **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SystemPermissionDescriptions`** <span class="type-label">array of string</span>

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

`GET` `/api/userroles/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the UserRole to load.

**Response**

`200` — The requested user role.

`UserRoleResource`.

- **`CanBeDeleted`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span>
- **`GrantedSpacePermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`SpacePermissionDescriptions`** <span class="type-label">array of string</span>
- **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SystemPermissionDescriptions`** <span class="type-label">array of string</span>

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

## Modifies an existing User Role

`PUT` `/api/userroles/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — Id of the User Role to modify.

**Request Body**

`ModifyUserRoleCommand`

- **`Description`** <span class="type-label">string</span>
- **`GrantedSpacePermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Id`** <span class="type-label">string</span> *(required)* — Id of the User Role to modify.
- **`Name`** <span class="type-label">string</span>

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

`UserRoleResource`.

- **`CanBeDeleted`** <span class="type-label">boolean</span>
- **`Description`** <span class="type-label">string</span>
- **`GrantedSpacePermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`GrantedSystemPermissions`** <span class="type-label">array of enum</span> — Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`Name`** <span class="type-label">string</span>
- **`SpacePermissionDescriptions`** <span class="type-label">array of string</span>
- **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SystemPermissionDescriptions`** <span class="type-label">array of string</span>

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

## Deletes an existing User Role

`DELETE` `/api/userroles/{id}`

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the User Role to delete.

**Response**

`200` — Success
