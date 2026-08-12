---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: User Permissions
---

## Gets the user's permission information

`GET` `/api/{spaceId}/users/{id}/permissions`

Also reachable at `/api/spaces/{spaceIdentifier}/users/{id}/permissions`, `/api/users/{id}/permissions`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the user.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space to get permissions for.

- **`includeSystem`** <span class="type-label">boolean</span> — Whether to include permission information from the system context.

**Response**

`200` — The user's exported permissions

`UserPermissionSetResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsPermissionsComplete`** <span class="type-label">boolean</span> — If the requesting user had sufficient access to see a complete view of the permissions.
- **`IsTeamsComplete`** <span class="type-label">boolean</span> — If the requesting user had sufficient access to see a complete view of the teams that may drive permissions.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SpacePermissions`** <span class="type-label">object</span> — Lists individual permissions granted, including restrictions where applicable.
  - **`AccountCreate`** <span class="type-label">array of object</span>
  - **`AccountDelete`** <span class="type-label">array of object</span>
  - **`AccountEdit`** <span class="type-label">array of object</span>
  - **`AccountView`** <span class="type-label">array of object</span>
  - **`ActionTemplateCreate`** <span class="type-label">array of object</span>
  - **`ActionTemplateDelete`** <span class="type-label">array of object</span>
  - **`ActionTemplateEdit`** <span class="type-label">array of object</span>
  - **`ActionTemplateView`** <span class="type-label">array of object</span>
  - **`AdministerSystem`** <span class="type-label">array of object</span>
  - **`AiAgentTranscriptView`** <span class="type-label">array of object</span>
  - **`ApprovalPolicyAdminister`** <span class="type-label">array of object</span>
  - **`ArtifactCreate`** <span class="type-label">array of object</span>
  - **`ArtifactDelete`** <span class="type-label">array of object</span>
  - **`ArtifactEdit`** <span class="type-label">array of object</span>
  - **`ArtifactView`** <span class="type-label">array of object</span>
  - **`BuildInformationAdminister`** <span class="type-label">array of object</span>
  - **`BuildInformationPush`** <span class="type-label">array of object</span>
  - **`BuiltInFeedAdminister`** <span class="type-label">array of object</span>
  - **`BuiltInFeedDownload`** <span class="type-label">array of object</span>
  - **`BuiltInFeedPush`** <span class="type-label">array of object</span>
  - **`CertificateCreate`** <span class="type-label">array of object</span>
  - **`CertificateDelete`** <span class="type-label">array of object</span>
  - **`CertificateEdit`** <span class="type-label">array of object</span>
  - **`CertificateExportPrivateKey`** <span class="type-label">array of object</span>
  - **`CertificateView`** <span class="type-label">array of object</span>
  - **`ConfigureServer`** <span class="type-label">array of object</span>
  - **`DefectReport`** <span class="type-label">array of object</span>
  - **`DefectResolve`** <span class="type-label">array of object</span>
  - **`DeployedResourceAdminister`** <span class="type-label">array of object</span>
  - **`DeploymentCreate`** <span class="type-label">array of object</span>
  - **`DeploymentDelete`** <span class="type-label">array of object</span>
  - **`DeploymentFreezeAdminister`** <span class="type-label">array of object</span>
  - **`DeploymentView`** <span class="type-label">array of object</span>
  - **`EnvironmentCreate`** <span class="type-label">array of object</span>
  - **`EnvironmentDelete`** <span class="type-label">array of object</span>
  - **`EnvironmentEdit`** <span class="type-label">array of object</span>
  - **`EnvironmentView`** <span class="type-label">array of object</span>
  - **`EventRetentionDelete`** <span class="type-label">array of object</span>
  - **`EventRetentionView`** <span class="type-label">array of object</span>
  - **`EventView`** <span class="type-label">array of object</span>
  - **`FeatureToggleEdit`** <span class="type-label">array of object</span>
  - **`FeedEdit`** <span class="type-label">array of object</span>
  - **`FeedView`** <span class="type-label">array of object</span>
  - **`GitCredentialEdit`** <span class="type-label">array of object</span>
  - **`GitCredentialView`** <span class="type-label">array of object</span>
  - **`InsightsReportCreate`** <span class="type-label">array of object</span>
  - **`InsightsReportDelete`** <span class="type-label">array of object</span>
  - **`InsightsReportEdit`** <span class="type-label">array of object</span>
  - **`InsightsReportView`** <span class="type-label">array of object</span>
  - **`InterruptionSubmit`** <span class="type-label">array of object</span>
  - **`InterruptionView`** <span class="type-label">array of object</span>
  - **`InterruptionViewSubmitResponsible`** <span class="type-label">array of object</span>
  - **`LibraryVariableSetCreate`** <span class="type-label">array of object</span>
  - **`LibraryVariableSetDelete`** <span class="type-label">array of object</span>
  - **`LibraryVariableSetEdit`** <span class="type-label">array of object</span>
  - **`LibraryVariableSetView`** <span class="type-label">array of object</span>
  - **`LifecycleCreate`** <span class="type-label">array of object</span>
  - **`LifecycleDelete`** <span class="type-label">array of object</span>
  - **`LifecycleEdit`** <span class="type-label">array of object</span>
  - **`LifecycleView`** <span class="type-label">array of object</span>
  - **`MachineCreate`** <span class="type-label">array of object</span>
  - **`MachineDelete`** <span class="type-label">array of object</span>
  - **`MachineEdit`** <span class="type-label">array of object</span>
  - **`MachinePolicyCreate`** <span class="type-label">array of object</span>
  - **`MachinePolicyDelete`** <span class="type-label">array of object</span>
  - **`MachinePolicyEdit`** <span class="type-label">array of object</span>
  - **`MachinePolicyView`** <span class="type-label">array of object</span>
  - **`MachineView`** <span class="type-label">array of object</span>
  - **`PlatformHubEdit`** <span class="type-label">array of object</span>
  - **`PlatformHubView`** <span class="type-label">array of object</span>
  - **`ProcessEdit`** <span class="type-label">array of object</span>
  - **`ProcessView`** <span class="type-label">array of object</span>
  - **`ProjectCreate`** <span class="type-label">array of object</span>
  - **`ProjectDelete`** <span class="type-label">array of object</span>
  - **`ProjectEdit`** <span class="type-label">array of object</span>
  - **`ProjectGroupCreate`** <span class="type-label">array of object</span>
  - **`ProjectGroupDelete`** <span class="type-label">array of object</span>
  - **`ProjectGroupEdit`** <span class="type-label">array of object</span>
  - **`ProjectGroupView`** <span class="type-label">array of object</span>
  - **`ProjectView`** <span class="type-label">array of object</span>
  - **`ProxyCreate`** <span class="type-label">array of object</span>
  - **`ProxyDelete`** <span class="type-label">array of object</span>
  - **`ProxyEdit`** <span class="type-label">array of object</span>
  - **`ProxyView`** <span class="type-label">array of object</span>
  - **`ReleaseCreate`** <span class="type-label">array of object</span>
  - **`ReleaseDelete`** <span class="type-label">array of object</span>
  - **`ReleaseEdit`** <span class="type-label">array of object</span>
  - **`ReleaseView`** <span class="type-label">array of object</span>
  - **`RetentionAdminister`** <span class="type-label">array of object</span>
  - **`RunbookEdit`** <span class="type-label">array of object</span>
  - **`RunbookRunCreate`** <span class="type-label">array of object</span>
  - **`RunbookRunDelete`** <span class="type-label">array of object</span>
  - **`RunbookRunView`** <span class="type-label">array of object</span>
  - **`RunbookView`** <span class="type-label">array of object</span>
  - **`SpaceCreate`** <span class="type-label">array of object</span>
  - **`SpaceDelete`** <span class="type-label">array of object</span>
  - **`SpaceEdit`** <span class="type-label">array of object</span>
  - **`SpaceView`** <span class="type-label">array of object</span>
  - **`SshKnownHostsAdminister`** <span class="type-label">array of object</span>
  - **`SshKnownHostsView`** <span class="type-label">array of object</span>
  - **`SubscriptionCreate`** <span class="type-label">array of object</span>
  - **`SubscriptionDelete`** <span class="type-label">array of object</span>
  - **`SubscriptionEdit`** <span class="type-label">array of object</span>
  - **`SubscriptionView`** <span class="type-label">array of object</span>
  - **`TagSetCreate`** <span class="type-label">array of object</span>
  - **`TagSetDelete`** <span class="type-label">array of object</span>
  - **`TagSetEdit`** <span class="type-label">array of object</span>
  - **`TargetTagAdminister`** <span class="type-label">array of object</span>
  - **`TargetTagView`** <span class="type-label">array of object</span>
  - **`TaskCancel`** <span class="type-label">array of object</span>
  - **`TaskCreate`** <span class="type-label">array of object</span>
  - **`TaskEdit`** <span class="type-label">array of object</span>
  - **`TaskPrioritize`** <span class="type-label">array of object</span>
  - **`TaskView`** <span class="type-label">array of object</span>
  - **`TeamCreate`** <span class="type-label">array of object</span>
  - **`TeamDelete`** <span class="type-label">array of object</span>
  - **`TeamEdit`** <span class="type-label">array of object</span>
  - **`TeamView`** <span class="type-label">array of object</span>
  - **`TelemetryView`** <span class="type-label">array of object</span>
  - **`TenantCreate`** <span class="type-label">array of object</span>
  - **`TenantDelete`** <span class="type-label">array of object</span>
  - **`TenantEdit`** <span class="type-label">array of object</span>
  - **`TenantView`** <span class="type-label">array of object</span>
  - **`TriggerCreate`** <span class="type-label">array of object</span>
  - **`TriggerDelete`** <span class="type-label">array of object</span>
  - **`TriggerEdit`** <span class="type-label">array of object</span>
  - **`TriggerView`** <span class="type-label">array of object</span>
  - **`UserEdit`** <span class="type-label">array of object</span>
  - **`UserInvite`** <span class="type-label">array of object</span>
  - **`UserRoleEdit`** <span class="type-label">array of object</span>
  - **`UserRoleView`** <span class="type-label">array of object</span>
  - **`UserView`** <span class="type-label">array of object</span>
  - **`VariableEdit`** <span class="type-label">array of object</span>
  - **`VariableEditUnscoped`** <span class="type-label">array of object</span>
  - **`VariableView`** <span class="type-label">array of object</span>
  - **`VariableViewUnscoped`** <span class="type-label">array of object</span>
  - **`WorkerEdit`** <span class="type-label">array of object</span>
  - **`WorkerView`** <span class="type-label">array of object</span>
- **`SystemPermissions`** <span class="type-label">array of enum</span> — Lists individual system permissions granted, these do not have restrictions. Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Teams`** <span class="type-label">array of object</span> — Gets the teams that the user is a member of.
  - **`ExternalSecurityGroups`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsDirectlyAssigned`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "IsPermissionsComplete": true,
  "IsTeamsComplete": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "SpacePermissions": {
    "AccountCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "AccountDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "AccountEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "AccountView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ActionTemplateCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ActionTemplateDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ActionTemplateEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ActionTemplateView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "AdministerSystem": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "AiAgentTranscriptView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ApprovalPolicyAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ArtifactCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ArtifactDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ArtifactEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ArtifactView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "BuildInformationAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "BuildInformationPush": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "BuiltInFeedAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "BuiltInFeedDownload": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "BuiltInFeedPush": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "CertificateCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "CertificateDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "CertificateEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "CertificateExportPrivateKey": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "CertificateView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ConfigureServer": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DefectReport": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DefectResolve": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DeployedResourceAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DeploymentCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DeploymentDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DeploymentFreezeAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DeploymentView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EnvironmentCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EnvironmentDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EnvironmentEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EnvironmentView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EventRetentionDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EventRetentionView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EventView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "FeatureToggleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "FeedEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "FeedView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "GitCredentialEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "GitCredentialView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InsightsReportCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InsightsReportDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InsightsReportEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InsightsReportView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InterruptionSubmit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InterruptionView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InterruptionViewSubmitResponsible": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LibraryVariableSetCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LibraryVariableSetDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LibraryVariableSetEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LibraryVariableSetView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LifecycleCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LifecycleDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LifecycleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LifecycleView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachineCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachineDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachineEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachinePolicyCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachinePolicyDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachinePolicyEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachinePolicyView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachineView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "PlatformHubEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "PlatformHubView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProcessEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProcessView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectGroupCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectGroupDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectGroupEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectGroupView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProxyCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProxyDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProxyEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProxyView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ReleaseCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ReleaseDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ReleaseEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ReleaseView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RetentionAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RunbookEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RunbookRunCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RunbookRunDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RunbookRunView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RunbookView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SpaceCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SpaceDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SpaceEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SpaceView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SshKnownHostsAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SshKnownHostsView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SubscriptionCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SubscriptionDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SubscriptionEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SubscriptionView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TagSetCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TagSetDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TagSetEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TargetTagAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TargetTagView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TaskCancel": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TaskCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TaskEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TaskPrioritize": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TaskView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TeamCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TeamDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TeamEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TeamView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TelemetryView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TenantCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TenantDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TenantEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TenantView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TriggerCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TriggerDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TriggerEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TriggerView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "UserEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "UserInvite": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "UserRoleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "UserRoleView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "UserView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "VariableEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "VariableEditUnscoped": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "VariableView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "VariableViewUnscoped": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "WorkerEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "WorkerView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ]
  },
  "SystemPermissions": [
    "AdministerSystem"
  ],
  "Teams": [
    {
      "ExternalSecurityGroups": [
        {}
      ],
      "Id": "string",
      "IsDirectlyAssigned": true,
      "Name": "string",
      "SpaceId": "string"
    }
  ]
}
```
</div>

## Gets the user's permission information

`GET` `/api/{spaceId}/users/{id}/permissions/configuration`

Also reachable at `/api/spaces/{spaceIdentifier}/users/{id}/permissions/configuration`, `/api/users/{id}/permissions/configuration`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the user.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space to get permissions for.

- **`apiKeyId`** <span class="type-label">string</span> — When supplied, computes the permission set as it would apply through this existing API key. The key must belong to the user.
- **`includeSystem`** <span class="type-label">boolean</span> — Whether to include permission information from the system context.
- **`previewReadOnly`** <span class="type-label">boolean</span> — When supplied, previews the permission set of a hypothetical new API key with the given read-only flag. Mutually exclusive with ApiKeyId.

**Response**

`200` — The user's exported permissions

`UserPermissionSetResource`.

- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsPermissionsComplete`** <span class="type-label">boolean</span> — If the requesting user had sufficient access to see a complete view of the permissions.
- **`IsTeamsComplete`** <span class="type-label">boolean</span> — If the requesting user had sufficient access to see a complete view of the teams that may drive permissions.
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SpacePermissions`** <span class="type-label">object</span> — Lists individual permissions granted, including restrictions where applicable.
  - **`AccountCreate`** <span class="type-label">array of object</span>
  - **`AccountDelete`** <span class="type-label">array of object</span>
  - **`AccountEdit`** <span class="type-label">array of object</span>
  - **`AccountView`** <span class="type-label">array of object</span>
  - **`ActionTemplateCreate`** <span class="type-label">array of object</span>
  - **`ActionTemplateDelete`** <span class="type-label">array of object</span>
  - **`ActionTemplateEdit`** <span class="type-label">array of object</span>
  - **`ActionTemplateView`** <span class="type-label">array of object</span>
  - **`AdministerSystem`** <span class="type-label">array of object</span>
  - **`AiAgentTranscriptView`** <span class="type-label">array of object</span>
  - **`ApprovalPolicyAdminister`** <span class="type-label">array of object</span>
  - **`ArtifactCreate`** <span class="type-label">array of object</span>
  - **`ArtifactDelete`** <span class="type-label">array of object</span>
  - **`ArtifactEdit`** <span class="type-label">array of object</span>
  - **`ArtifactView`** <span class="type-label">array of object</span>
  - **`BuildInformationAdminister`** <span class="type-label">array of object</span>
  - **`BuildInformationPush`** <span class="type-label">array of object</span>
  - **`BuiltInFeedAdminister`** <span class="type-label">array of object</span>
  - **`BuiltInFeedDownload`** <span class="type-label">array of object</span>
  - **`BuiltInFeedPush`** <span class="type-label">array of object</span>
  - **`CertificateCreate`** <span class="type-label">array of object</span>
  - **`CertificateDelete`** <span class="type-label">array of object</span>
  - **`CertificateEdit`** <span class="type-label">array of object</span>
  - **`CertificateExportPrivateKey`** <span class="type-label">array of object</span>
  - **`CertificateView`** <span class="type-label">array of object</span>
  - **`ConfigureServer`** <span class="type-label">array of object</span>
  - **`DefectReport`** <span class="type-label">array of object</span>
  - **`DefectResolve`** <span class="type-label">array of object</span>
  - **`DeployedResourceAdminister`** <span class="type-label">array of object</span>
  - **`DeploymentCreate`** <span class="type-label">array of object</span>
  - **`DeploymentDelete`** <span class="type-label">array of object</span>
  - **`DeploymentFreezeAdminister`** <span class="type-label">array of object</span>
  - **`DeploymentView`** <span class="type-label">array of object</span>
  - **`EnvironmentCreate`** <span class="type-label">array of object</span>
  - **`EnvironmentDelete`** <span class="type-label">array of object</span>
  - **`EnvironmentEdit`** <span class="type-label">array of object</span>
  - **`EnvironmentView`** <span class="type-label">array of object</span>
  - **`EventRetentionDelete`** <span class="type-label">array of object</span>
  - **`EventRetentionView`** <span class="type-label">array of object</span>
  - **`EventView`** <span class="type-label">array of object</span>
  - **`FeatureToggleEdit`** <span class="type-label">array of object</span>
  - **`FeedEdit`** <span class="type-label">array of object</span>
  - **`FeedView`** <span class="type-label">array of object</span>
  - **`GitCredentialEdit`** <span class="type-label">array of object</span>
  - **`GitCredentialView`** <span class="type-label">array of object</span>
  - **`InsightsReportCreate`** <span class="type-label">array of object</span>
  - **`InsightsReportDelete`** <span class="type-label">array of object</span>
  - **`InsightsReportEdit`** <span class="type-label">array of object</span>
  - **`InsightsReportView`** <span class="type-label">array of object</span>
  - **`InterruptionSubmit`** <span class="type-label">array of object</span>
  - **`InterruptionView`** <span class="type-label">array of object</span>
  - **`InterruptionViewSubmitResponsible`** <span class="type-label">array of object</span>
  - **`LibraryVariableSetCreate`** <span class="type-label">array of object</span>
  - **`LibraryVariableSetDelete`** <span class="type-label">array of object</span>
  - **`LibraryVariableSetEdit`** <span class="type-label">array of object</span>
  - **`LibraryVariableSetView`** <span class="type-label">array of object</span>
  - **`LifecycleCreate`** <span class="type-label">array of object</span>
  - **`LifecycleDelete`** <span class="type-label">array of object</span>
  - **`LifecycleEdit`** <span class="type-label">array of object</span>
  - **`LifecycleView`** <span class="type-label">array of object</span>
  - **`MachineCreate`** <span class="type-label">array of object</span>
  - **`MachineDelete`** <span class="type-label">array of object</span>
  - **`MachineEdit`** <span class="type-label">array of object</span>
  - **`MachinePolicyCreate`** <span class="type-label">array of object</span>
  - **`MachinePolicyDelete`** <span class="type-label">array of object</span>
  - **`MachinePolicyEdit`** <span class="type-label">array of object</span>
  - **`MachinePolicyView`** <span class="type-label">array of object</span>
  - **`MachineView`** <span class="type-label">array of object</span>
  - **`PlatformHubEdit`** <span class="type-label">array of object</span>
  - **`PlatformHubView`** <span class="type-label">array of object</span>
  - **`ProcessEdit`** <span class="type-label">array of object</span>
  - **`ProcessView`** <span class="type-label">array of object</span>
  - **`ProjectCreate`** <span class="type-label">array of object</span>
  - **`ProjectDelete`** <span class="type-label">array of object</span>
  - **`ProjectEdit`** <span class="type-label">array of object</span>
  - **`ProjectGroupCreate`** <span class="type-label">array of object</span>
  - **`ProjectGroupDelete`** <span class="type-label">array of object</span>
  - **`ProjectGroupEdit`** <span class="type-label">array of object</span>
  - **`ProjectGroupView`** <span class="type-label">array of object</span>
  - **`ProjectView`** <span class="type-label">array of object</span>
  - **`ProxyCreate`** <span class="type-label">array of object</span>
  - **`ProxyDelete`** <span class="type-label">array of object</span>
  - **`ProxyEdit`** <span class="type-label">array of object</span>
  - **`ProxyView`** <span class="type-label">array of object</span>
  - **`ReleaseCreate`** <span class="type-label">array of object</span>
  - **`ReleaseDelete`** <span class="type-label">array of object</span>
  - **`ReleaseEdit`** <span class="type-label">array of object</span>
  - **`ReleaseView`** <span class="type-label">array of object</span>
  - **`RetentionAdminister`** <span class="type-label">array of object</span>
  - **`RunbookEdit`** <span class="type-label">array of object</span>
  - **`RunbookRunCreate`** <span class="type-label">array of object</span>
  - **`RunbookRunDelete`** <span class="type-label">array of object</span>
  - **`RunbookRunView`** <span class="type-label">array of object</span>
  - **`RunbookView`** <span class="type-label">array of object</span>
  - **`SpaceCreate`** <span class="type-label">array of object</span>
  - **`SpaceDelete`** <span class="type-label">array of object</span>
  - **`SpaceEdit`** <span class="type-label">array of object</span>
  - **`SpaceView`** <span class="type-label">array of object</span>
  - **`SshKnownHostsAdminister`** <span class="type-label">array of object</span>
  - **`SshKnownHostsView`** <span class="type-label">array of object</span>
  - **`SubscriptionCreate`** <span class="type-label">array of object</span>
  - **`SubscriptionDelete`** <span class="type-label">array of object</span>
  - **`SubscriptionEdit`** <span class="type-label">array of object</span>
  - **`SubscriptionView`** <span class="type-label">array of object</span>
  - **`TagSetCreate`** <span class="type-label">array of object</span>
  - **`TagSetDelete`** <span class="type-label">array of object</span>
  - **`TagSetEdit`** <span class="type-label">array of object</span>
  - **`TargetTagAdminister`** <span class="type-label">array of object</span>
  - **`TargetTagView`** <span class="type-label">array of object</span>
  - **`TaskCancel`** <span class="type-label">array of object</span>
  - **`TaskCreate`** <span class="type-label">array of object</span>
  - **`TaskEdit`** <span class="type-label">array of object</span>
  - **`TaskPrioritize`** <span class="type-label">array of object</span>
  - **`TaskView`** <span class="type-label">array of object</span>
  - **`TeamCreate`** <span class="type-label">array of object</span>
  - **`TeamDelete`** <span class="type-label">array of object</span>
  - **`TeamEdit`** <span class="type-label">array of object</span>
  - **`TeamView`** <span class="type-label">array of object</span>
  - **`TelemetryView`** <span class="type-label">array of object</span>
  - **`TenantCreate`** <span class="type-label">array of object</span>
  - **`TenantDelete`** <span class="type-label">array of object</span>
  - **`TenantEdit`** <span class="type-label">array of object</span>
  - **`TenantView`** <span class="type-label">array of object</span>
  - **`TriggerCreate`** <span class="type-label">array of object</span>
  - **`TriggerDelete`** <span class="type-label">array of object</span>
  - **`TriggerEdit`** <span class="type-label">array of object</span>
  - **`TriggerView`** <span class="type-label">array of object</span>
  - **`UserEdit`** <span class="type-label">array of object</span>
  - **`UserInvite`** <span class="type-label">array of object</span>
  - **`UserRoleEdit`** <span class="type-label">array of object</span>
  - **`UserRoleView`** <span class="type-label">array of object</span>
  - **`UserView`** <span class="type-label">array of object</span>
  - **`VariableEdit`** <span class="type-label">array of object</span>
  - **`VariableEditUnscoped`** <span class="type-label">array of object</span>
  - **`VariableView`** <span class="type-label">array of object</span>
  - **`VariableViewUnscoped`** <span class="type-label">array of object</span>
  - **`WorkerEdit`** <span class="type-label">array of object</span>
  - **`WorkerView`** <span class="type-label">array of object</span>
- **`SystemPermissions`** <span class="type-label">array of enum</span> — Lists individual system permissions granted, these do not have restrictions. Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Teams`** <span class="type-label">array of object</span> — Gets the teams that the user is a member of.
  - **`ExternalSecurityGroups`** <span class="type-label">array of object</span>
  - **`Id`** <span class="type-label">string</span>
  - **`IsDirectlyAssigned`** <span class="type-label">boolean</span>
  - **`Name`** <span class="type-label">string</span>
  - **`SpaceId`** <span class="type-label">string</span>

<div data-example="Response">

```json
{
  "Id": "string",
  "IsPermissionsComplete": true,
  "IsTeamsComplete": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "SpacePermissions": {
    "AccountCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "AccountDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "AccountEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "AccountView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ActionTemplateCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ActionTemplateDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ActionTemplateEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ActionTemplateView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "AdministerSystem": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "AiAgentTranscriptView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ApprovalPolicyAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ArtifactCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ArtifactDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ArtifactEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ArtifactView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "BuildInformationAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "BuildInformationPush": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "BuiltInFeedAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "BuiltInFeedDownload": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "BuiltInFeedPush": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "CertificateCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "CertificateDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "CertificateEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "CertificateExportPrivateKey": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "CertificateView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ConfigureServer": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DefectReport": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DefectResolve": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DeployedResourceAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DeploymentCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DeploymentDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DeploymentFreezeAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "DeploymentView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EnvironmentCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EnvironmentDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EnvironmentEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EnvironmentView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EventRetentionDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EventRetentionView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "EventView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "FeatureToggleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "FeedEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "FeedView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "GitCredentialEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "GitCredentialView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InsightsReportCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InsightsReportDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InsightsReportEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InsightsReportView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InterruptionSubmit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InterruptionView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "InterruptionViewSubmitResponsible": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LibraryVariableSetCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LibraryVariableSetDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LibraryVariableSetEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LibraryVariableSetView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LifecycleCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LifecycleDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LifecycleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "LifecycleView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachineCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachineDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachineEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachinePolicyCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachinePolicyDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachinePolicyEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachinePolicyView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "MachineView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "PlatformHubEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "PlatformHubView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProcessEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProcessView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectGroupCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectGroupDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectGroupEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectGroupView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProjectView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProxyCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProxyDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProxyEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ProxyView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ReleaseCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ReleaseDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ReleaseEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "ReleaseView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RetentionAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RunbookEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RunbookRunCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RunbookRunDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RunbookRunView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "RunbookView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SpaceCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SpaceDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SpaceEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SpaceView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SshKnownHostsAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SshKnownHostsView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SubscriptionCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SubscriptionDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SubscriptionEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "SubscriptionView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TagSetCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TagSetDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TagSetEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TargetTagAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TargetTagView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TaskCancel": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TaskCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TaskEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TaskPrioritize": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TaskView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TeamCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TeamDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TeamEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TeamView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TelemetryView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TenantCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TenantDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TenantEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TenantView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TriggerCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TriggerDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TriggerEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "TriggerView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "UserEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "UserInvite": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "UserRoleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "UserRoleView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "UserView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "VariableEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "VariableEditUnscoped": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "VariableView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "VariableViewUnscoped": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "WorkerEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ],
    "WorkerView": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "string"
        ],
        "RestrictedToTenantIds": [
          "string"
        ],
        "SpaceId": "string"
      }
    ]
  },
  "SystemPermissions": [
    "AdministerSystem"
  ],
  "Teams": [
    {
      "ExternalSecurityGroups": [
        {}
      ],
      "Id": "string",
      "IsDirectlyAssigned": true,
      "Name": "string",
      "SpaceId": "string"
    }
  ]
}
```
</div>

## Gets a list of permissions for the currently authenticated user

`GET` `/api/{spaceId}/users/{id}/permissions/export`

Also reachable at `/api/spaces/{spaceIdentifier}/users/{id}/permissions/export`, `/api/users/{id}/permissions/export`.

**Parameters**

- **`id`** <span class="type-label">string</span> *(required)* — ID of the user.
- **`spaceId`** <span class="type-label">string</span> *(required)* — The ID of the space containing the resource(s).

**Response**

`200` — Success

<div data-example="Response">

```json
"string"
```
</div>
