---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: User Permissions
---

## Get the user's permission information

:span[GET]{.api-get} `/api/{spaceId}/users/{id}/permissions`

Also reachable at `/api/spaces/{spaceIdentifier}/users/{id}/permissions`, `/api/users/{id}/permissions`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the user.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space to get permissions for.

**Query Parameters**

- **`includeSystem`** :span[boolean]{.type-label}  
  Whether to include permission information from the system context.

**Response**

`200` — The user's exported permissions

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsPermissionsComplete`** :span[boolean]{.type-label}  
  If the requesting user had sufficient access to see a complete view of the permissions.
- **`IsTeamsComplete`** :span[boolean]{.type-label}  
  If the requesting user had sufficient access to see a complete view of the teams that may drive permissions.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SpacePermissions`** :span[object]{.type-label}  
  Lists individual permissions granted, including restrictions where applicable.
  - **`AccountCreate`** :span[array of object]{.type-label}
  - **`AccountDelete`** :span[array of object]{.type-label}
  - **`AccountEdit`** :span[array of object]{.type-label}
  - **`AccountView`** :span[array of object]{.type-label}
  - **`ActionTemplateCreate`** :span[array of object]{.type-label}
  - **`ActionTemplateDelete`** :span[array of object]{.type-label}
  - **`ActionTemplateEdit`** :span[array of object]{.type-label}
  - **`ActionTemplateView`** :span[array of object]{.type-label}
  - **`AdministerSystem`** :span[array of object]{.type-label}
  - **`AiAgentTranscriptView`** :span[array of object]{.type-label}
  - **`ApprovalPolicyAdminister`** :span[array of object]{.type-label}
  - **`ArtifactCreate`** :span[array of object]{.type-label}
  - **`ArtifactDelete`** :span[array of object]{.type-label}
  - **`ArtifactEdit`** :span[array of object]{.type-label}
  - **`ArtifactView`** :span[array of object]{.type-label}
  - **`BuildInformationAdminister`** :span[array of object]{.type-label}
  - **`BuildInformationPush`** :span[array of object]{.type-label}
  - **`BuiltInFeedAdminister`** :span[array of object]{.type-label}
  - **`BuiltInFeedDownload`** :span[array of object]{.type-label}
  - **`BuiltInFeedPush`** :span[array of object]{.type-label}
  - **`CertificateCreate`** :span[array of object]{.type-label}
  - **`CertificateDelete`** :span[array of object]{.type-label}
  - **`CertificateEdit`** :span[array of object]{.type-label}
  - **`CertificateExportPrivateKey`** :span[array of object]{.type-label}
  - **`CertificateView`** :span[array of object]{.type-label}
  - **`ConfigureServer`** :span[array of object]{.type-label}
  - **`DefectReport`** :span[array of object]{.type-label}
  - **`DefectResolve`** :span[array of object]{.type-label}
  - **`DeployedResourceAdminister`** :span[array of object]{.type-label}
  - **`DeploymentCreate`** :span[array of object]{.type-label}
  - **`DeploymentDelete`** :span[array of object]{.type-label}
  - **`DeploymentFreezeAdminister`** :span[array of object]{.type-label}
  - **`DeploymentView`** :span[array of object]{.type-label}
  - **`EnvironmentCreate`** :span[array of object]{.type-label}
  - **`EnvironmentDelete`** :span[array of object]{.type-label}
  - **`EnvironmentEdit`** :span[array of object]{.type-label}
  - **`EnvironmentView`** :span[array of object]{.type-label}
  - **`EventRetentionDelete`** :span[array of object]{.type-label}
  - **`EventRetentionView`** :span[array of object]{.type-label}
  - **`EventView`** :span[array of object]{.type-label}
  - **`FeatureToggleEdit`** :span[array of object]{.type-label}
  - **`FeedEdit`** :span[array of object]{.type-label}
  - **`FeedView`** :span[array of object]{.type-label}
  - **`GitCredentialEdit`** :span[array of object]{.type-label}
  - **`GitCredentialView`** :span[array of object]{.type-label}
  - **`InsightsReportCreate`** :span[array of object]{.type-label}
  - **`InsightsReportDelete`** :span[array of object]{.type-label}
  - **`InsightsReportEdit`** :span[array of object]{.type-label}
  - **`InsightsReportView`** :span[array of object]{.type-label}
  - **`InterruptionSubmit`** :span[array of object]{.type-label}
  - **`InterruptionView`** :span[array of object]{.type-label}
  - **`InterruptionViewSubmitResponsible`** :span[array of object]{.type-label}
  - **`LibraryVariableSetCreate`** :span[array of object]{.type-label}
  - **`LibraryVariableSetDelete`** :span[array of object]{.type-label}
  - **`LibraryVariableSetEdit`** :span[array of object]{.type-label}
  - **`LibraryVariableSetView`** :span[array of object]{.type-label}
  - **`LifecycleCreate`** :span[array of object]{.type-label}
  - **`LifecycleDelete`** :span[array of object]{.type-label}
  - **`LifecycleEdit`** :span[array of object]{.type-label}
  - **`LifecycleView`** :span[array of object]{.type-label}
  - **`MachineCreate`** :span[array of object]{.type-label}
  - **`MachineDelete`** :span[array of object]{.type-label}
  - **`MachineEdit`** :span[array of object]{.type-label}
  - **`MachinePolicyCreate`** :span[array of object]{.type-label}
  - **`MachinePolicyDelete`** :span[array of object]{.type-label}
  - **`MachinePolicyEdit`** :span[array of object]{.type-label}
  - **`MachinePolicyView`** :span[array of object]{.type-label}
  - **`MachineView`** :span[array of object]{.type-label}
  - **`PlatformHubEdit`** :span[array of object]{.type-label}
  - **`PlatformHubView`** :span[array of object]{.type-label}
  - **`ProcessEdit`** :span[array of object]{.type-label}
  - **`ProcessView`** :span[array of object]{.type-label}
  - **`ProjectCreate`** :span[array of object]{.type-label}
  - **`ProjectDelete`** :span[array of object]{.type-label}
  - **`ProjectEdit`** :span[array of object]{.type-label}
  - **`ProjectGroupCreate`** :span[array of object]{.type-label}
  - **`ProjectGroupDelete`** :span[array of object]{.type-label}
  - **`ProjectGroupEdit`** :span[array of object]{.type-label}
  - **`ProjectGroupView`** :span[array of object]{.type-label}
  - **`ProjectView`** :span[array of object]{.type-label}
  - **`ProxyCreate`** :span[array of object]{.type-label}
  - **`ProxyDelete`** :span[array of object]{.type-label}
  - **`ProxyEdit`** :span[array of object]{.type-label}
  - **`ProxyView`** :span[array of object]{.type-label}
  - **`ReleaseCreate`** :span[array of object]{.type-label}
  - **`ReleaseDelete`** :span[array of object]{.type-label}
  - **`ReleaseEdit`** :span[array of object]{.type-label}
  - **`ReleaseView`** :span[array of object]{.type-label}
  - **`RetentionAdminister`** :span[array of object]{.type-label}
  - **`RunbookEdit`** :span[array of object]{.type-label}
  - **`RunbookRunCreate`** :span[array of object]{.type-label}
  - **`RunbookRunDelete`** :span[array of object]{.type-label}
  - **`RunbookRunView`** :span[array of object]{.type-label}
  - **`RunbookSnapshotCreate`** :span[array of object]{.type-label}
  - **`RunbookView`** :span[array of object]{.type-label}
  - **`SpaceCreate`** :span[array of object]{.type-label}
  - **`SpaceDelete`** :span[array of object]{.type-label}
  - **`SpaceEdit`** :span[array of object]{.type-label}
  - **`SpaceView`** :span[array of object]{.type-label}
  - **`SshKnownHostsAdminister`** :span[array of object]{.type-label}
  - **`SshKnownHostsView`** :span[array of object]{.type-label}
  - **`SubscriptionCreate`** :span[array of object]{.type-label}
  - **`SubscriptionDelete`** :span[array of object]{.type-label}
  - **`SubscriptionEdit`** :span[array of object]{.type-label}
  - **`SubscriptionView`** :span[array of object]{.type-label}
  - **`TagSetCreate`** :span[array of object]{.type-label}
  - **`TagSetDelete`** :span[array of object]{.type-label}
  - **`TagSetEdit`** :span[array of object]{.type-label}
  - **`TargetTagAdminister`** :span[array of object]{.type-label}
  - **`TargetTagView`** :span[array of object]{.type-label}
  - **`TaskCancel`** :span[array of object]{.type-label}
  - **`TaskCreate`** :span[array of object]{.type-label}
  - **`TaskEdit`** :span[array of object]{.type-label}
  - **`TaskPrioritize`** :span[array of object]{.type-label}
  - **`TaskView`** :span[array of object]{.type-label}
  - **`TeamCreate`** :span[array of object]{.type-label}
  - **`TeamDelete`** :span[array of object]{.type-label}
  - **`TeamEdit`** :span[array of object]{.type-label}
  - **`TeamView`** :span[array of object]{.type-label}
  - **`TelemetryView`** :span[array of object]{.type-label}
  - **`TenantCreate`** :span[array of object]{.type-label}
  - **`TenantDelete`** :span[array of object]{.type-label}
  - **`TenantEdit`** :span[array of object]{.type-label}
  - **`TenantView`** :span[array of object]{.type-label}
  - **`TriggerCreate`** :span[array of object]{.type-label}
  - **`TriggerDelete`** :span[array of object]{.type-label}
  - **`TriggerEdit`** :span[array of object]{.type-label}
  - **`TriggerView`** :span[array of object]{.type-label}
  - **`UserEdit`** :span[array of object]{.type-label}
  - **`UserInvite`** :span[array of object]{.type-label}
  - **`UserRoleEdit`** :span[array of object]{.type-label}
  - **`UserRoleView`** :span[array of object]{.type-label}
  - **`UserView`** :span[array of object]{.type-label}
  - **`VariableEdit`** :span[array of object]{.type-label}
  - **`VariableEditUnscoped`** :span[array of object]{.type-label}
  - **`VariableView`** :span[array of object]{.type-label}
  - **`VariableViewUnscoped`** :span[array of object]{.type-label}
  - **`WorkerEdit`** :span[array of object]{.type-label}
  - **`WorkerView`** :span[array of object]{.type-label}
- **`SystemPermissions`** :span[array of enum]{.type-label}  
  Lists individual system permissions granted, these do not have restrictions.  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Teams`** :span[array of object]{.type-label}  
  Gets the teams that the user is a member of.
  - **`ExternalSecurityGroups`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsDirectlyAssigned`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
    "RunbookSnapshotCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
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
:::

## Get the user's permission information

:span[GET]{.api-get} `/api/{spaceId}/users/{id}/permissions/configuration`

Also reachable at `/api/spaces/{spaceIdentifier}/users/{id}/permissions/configuration`, `/api/users/{id}/permissions/configuration`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the user.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space to get permissions for.

**Query Parameters**

- **`apiKeyId`** :span[string]{.type-label}  
  When supplied, computes the permission set as it would apply through this existing API key. The key must belong to the user.
- **`includeSystem`** :span[boolean]{.type-label}  
  Whether to include permission information from the system context.
- **`previewReadOnly`** :span[boolean]{.type-label}  
  When supplied, previews the permission set of a hypothetical new API key with the given read-only flag. Mutually exclusive with ApiKeyId.

**Response**

`200` — The user's exported permissions

- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsPermissionsComplete`** :span[boolean]{.type-label}  
  If the requesting user had sufficient access to see a complete view of the permissions.
- **`IsTeamsComplete`** :span[boolean]{.type-label}  
  If the requesting user had sufficient access to see a complete view of the teams that may drive permissions.
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.
- **`SpacePermissions`** :span[object]{.type-label}  
  Lists individual permissions granted, including restrictions where applicable.
  - **`AccountCreate`** :span[array of object]{.type-label}
  - **`AccountDelete`** :span[array of object]{.type-label}
  - **`AccountEdit`** :span[array of object]{.type-label}
  - **`AccountView`** :span[array of object]{.type-label}
  - **`ActionTemplateCreate`** :span[array of object]{.type-label}
  - **`ActionTemplateDelete`** :span[array of object]{.type-label}
  - **`ActionTemplateEdit`** :span[array of object]{.type-label}
  - **`ActionTemplateView`** :span[array of object]{.type-label}
  - **`AdministerSystem`** :span[array of object]{.type-label}
  - **`AiAgentTranscriptView`** :span[array of object]{.type-label}
  - **`ApprovalPolicyAdminister`** :span[array of object]{.type-label}
  - **`ArtifactCreate`** :span[array of object]{.type-label}
  - **`ArtifactDelete`** :span[array of object]{.type-label}
  - **`ArtifactEdit`** :span[array of object]{.type-label}
  - **`ArtifactView`** :span[array of object]{.type-label}
  - **`BuildInformationAdminister`** :span[array of object]{.type-label}
  - **`BuildInformationPush`** :span[array of object]{.type-label}
  - **`BuiltInFeedAdminister`** :span[array of object]{.type-label}
  - **`BuiltInFeedDownload`** :span[array of object]{.type-label}
  - **`BuiltInFeedPush`** :span[array of object]{.type-label}
  - **`CertificateCreate`** :span[array of object]{.type-label}
  - **`CertificateDelete`** :span[array of object]{.type-label}
  - **`CertificateEdit`** :span[array of object]{.type-label}
  - **`CertificateExportPrivateKey`** :span[array of object]{.type-label}
  - **`CertificateView`** :span[array of object]{.type-label}
  - **`ConfigureServer`** :span[array of object]{.type-label}
  - **`DefectReport`** :span[array of object]{.type-label}
  - **`DefectResolve`** :span[array of object]{.type-label}
  - **`DeployedResourceAdminister`** :span[array of object]{.type-label}
  - **`DeploymentCreate`** :span[array of object]{.type-label}
  - **`DeploymentDelete`** :span[array of object]{.type-label}
  - **`DeploymentFreezeAdminister`** :span[array of object]{.type-label}
  - **`DeploymentView`** :span[array of object]{.type-label}
  - **`EnvironmentCreate`** :span[array of object]{.type-label}
  - **`EnvironmentDelete`** :span[array of object]{.type-label}
  - **`EnvironmentEdit`** :span[array of object]{.type-label}
  - **`EnvironmentView`** :span[array of object]{.type-label}
  - **`EventRetentionDelete`** :span[array of object]{.type-label}
  - **`EventRetentionView`** :span[array of object]{.type-label}
  - **`EventView`** :span[array of object]{.type-label}
  - **`FeatureToggleEdit`** :span[array of object]{.type-label}
  - **`FeedEdit`** :span[array of object]{.type-label}
  - **`FeedView`** :span[array of object]{.type-label}
  - **`GitCredentialEdit`** :span[array of object]{.type-label}
  - **`GitCredentialView`** :span[array of object]{.type-label}
  - **`InsightsReportCreate`** :span[array of object]{.type-label}
  - **`InsightsReportDelete`** :span[array of object]{.type-label}
  - **`InsightsReportEdit`** :span[array of object]{.type-label}
  - **`InsightsReportView`** :span[array of object]{.type-label}
  - **`InterruptionSubmit`** :span[array of object]{.type-label}
  - **`InterruptionView`** :span[array of object]{.type-label}
  - **`InterruptionViewSubmitResponsible`** :span[array of object]{.type-label}
  - **`LibraryVariableSetCreate`** :span[array of object]{.type-label}
  - **`LibraryVariableSetDelete`** :span[array of object]{.type-label}
  - **`LibraryVariableSetEdit`** :span[array of object]{.type-label}
  - **`LibraryVariableSetView`** :span[array of object]{.type-label}
  - **`LifecycleCreate`** :span[array of object]{.type-label}
  - **`LifecycleDelete`** :span[array of object]{.type-label}
  - **`LifecycleEdit`** :span[array of object]{.type-label}
  - **`LifecycleView`** :span[array of object]{.type-label}
  - **`MachineCreate`** :span[array of object]{.type-label}
  - **`MachineDelete`** :span[array of object]{.type-label}
  - **`MachineEdit`** :span[array of object]{.type-label}
  - **`MachinePolicyCreate`** :span[array of object]{.type-label}
  - **`MachinePolicyDelete`** :span[array of object]{.type-label}
  - **`MachinePolicyEdit`** :span[array of object]{.type-label}
  - **`MachinePolicyView`** :span[array of object]{.type-label}
  - **`MachineView`** :span[array of object]{.type-label}
  - **`PlatformHubEdit`** :span[array of object]{.type-label}
  - **`PlatformHubView`** :span[array of object]{.type-label}
  - **`ProcessEdit`** :span[array of object]{.type-label}
  - **`ProcessView`** :span[array of object]{.type-label}
  - **`ProjectCreate`** :span[array of object]{.type-label}
  - **`ProjectDelete`** :span[array of object]{.type-label}
  - **`ProjectEdit`** :span[array of object]{.type-label}
  - **`ProjectGroupCreate`** :span[array of object]{.type-label}
  - **`ProjectGroupDelete`** :span[array of object]{.type-label}
  - **`ProjectGroupEdit`** :span[array of object]{.type-label}
  - **`ProjectGroupView`** :span[array of object]{.type-label}
  - **`ProjectView`** :span[array of object]{.type-label}
  - **`ProxyCreate`** :span[array of object]{.type-label}
  - **`ProxyDelete`** :span[array of object]{.type-label}
  - **`ProxyEdit`** :span[array of object]{.type-label}
  - **`ProxyView`** :span[array of object]{.type-label}
  - **`ReleaseCreate`** :span[array of object]{.type-label}
  - **`ReleaseDelete`** :span[array of object]{.type-label}
  - **`ReleaseEdit`** :span[array of object]{.type-label}
  - **`ReleaseView`** :span[array of object]{.type-label}
  - **`RetentionAdminister`** :span[array of object]{.type-label}
  - **`RunbookEdit`** :span[array of object]{.type-label}
  - **`RunbookRunCreate`** :span[array of object]{.type-label}
  - **`RunbookRunDelete`** :span[array of object]{.type-label}
  - **`RunbookRunView`** :span[array of object]{.type-label}
  - **`RunbookSnapshotCreate`** :span[array of object]{.type-label}
  - **`RunbookView`** :span[array of object]{.type-label}
  - **`SpaceCreate`** :span[array of object]{.type-label}
  - **`SpaceDelete`** :span[array of object]{.type-label}
  - **`SpaceEdit`** :span[array of object]{.type-label}
  - **`SpaceView`** :span[array of object]{.type-label}
  - **`SshKnownHostsAdminister`** :span[array of object]{.type-label}
  - **`SshKnownHostsView`** :span[array of object]{.type-label}
  - **`SubscriptionCreate`** :span[array of object]{.type-label}
  - **`SubscriptionDelete`** :span[array of object]{.type-label}
  - **`SubscriptionEdit`** :span[array of object]{.type-label}
  - **`SubscriptionView`** :span[array of object]{.type-label}
  - **`TagSetCreate`** :span[array of object]{.type-label}
  - **`TagSetDelete`** :span[array of object]{.type-label}
  - **`TagSetEdit`** :span[array of object]{.type-label}
  - **`TargetTagAdminister`** :span[array of object]{.type-label}
  - **`TargetTagView`** :span[array of object]{.type-label}
  - **`TaskCancel`** :span[array of object]{.type-label}
  - **`TaskCreate`** :span[array of object]{.type-label}
  - **`TaskEdit`** :span[array of object]{.type-label}
  - **`TaskPrioritize`** :span[array of object]{.type-label}
  - **`TaskView`** :span[array of object]{.type-label}
  - **`TeamCreate`** :span[array of object]{.type-label}
  - **`TeamDelete`** :span[array of object]{.type-label}
  - **`TeamEdit`** :span[array of object]{.type-label}
  - **`TeamView`** :span[array of object]{.type-label}
  - **`TelemetryView`** :span[array of object]{.type-label}
  - **`TenantCreate`** :span[array of object]{.type-label}
  - **`TenantDelete`** :span[array of object]{.type-label}
  - **`TenantEdit`** :span[array of object]{.type-label}
  - **`TenantView`** :span[array of object]{.type-label}
  - **`TriggerCreate`** :span[array of object]{.type-label}
  - **`TriggerDelete`** :span[array of object]{.type-label}
  - **`TriggerEdit`** :span[array of object]{.type-label}
  - **`TriggerView`** :span[array of object]{.type-label}
  - **`UserEdit`** :span[array of object]{.type-label}
  - **`UserInvite`** :span[array of object]{.type-label}
  - **`UserRoleEdit`** :span[array of object]{.type-label}
  - **`UserRoleView`** :span[array of object]{.type-label}
  - **`UserView`** :span[array of object]{.type-label}
  - **`VariableEdit`** :span[array of object]{.type-label}
  - **`VariableEditUnscoped`** :span[array of object]{.type-label}
  - **`VariableView`** :span[array of object]{.type-label}
  - **`VariableViewUnscoped`** :span[array of object]{.type-label}
  - **`WorkerEdit`** :span[array of object]{.type-label}
  - **`WorkerView`** :span[array of object]{.type-label}
- **`SystemPermissions`** :span[array of enum]{.type-label}  
  Lists individual system permissions granted, these do not have restrictions.  
  Allowed values: `AdministerSystem`, `ProjectEdit`, `ProjectView`, `ProjectCreate`, `ProjectDelete`, `ProcessView`, `ProcessEdit`, `VariableEdit`, `VariableEditUnscoped`, `VariableView`, `VariableViewUnscoped`, `ReleaseCreate`, `ReleaseView`, `ReleaseEdit`, `ReleaseDelete`, `DefectReport`, `DefectResolve`, `DeploymentCreate`, `DeploymentDelete`, `DeploymentView`, `EnvironmentView`, `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, `MachineCreate`, `MachineEdit`, `MachineView`, `MachineDelete`, `ArtifactView`, `ArtifactCreate`, `ArtifactEdit`, `ArtifactDelete`, `FeedView`, `EventView`, `LibraryVariableSetView`, `LibraryVariableSetCreate`, `LibraryVariableSetEdit`, `LibraryVariableSetDelete`, `ProjectGroupView`, `ProjectGroupCreate`, `ProjectGroupEdit`, `ProjectGroupDelete`, `TeamCreate`, `TeamView`, `TeamEdit`, `TeamDelete`, `UserView`, `UserInvite`, `UserRoleView`, `UserRoleEdit`, `TaskView`, `TaskCreate`, `TaskCancel`, `TaskEdit`, `TaskPrioritize`, `InterruptionView`, `InterruptionSubmit`, `InterruptionViewSubmitResponsible`, `BuiltInFeedPush`, `BuiltInFeedAdminister`, `BuiltInFeedDownload`, `ActionTemplateView`, `ActionTemplateCreate`, `ActionTemplateEdit`, `ActionTemplateDelete`, `LifecycleCreate`, `LifecycleView`, `LifecycleEdit`, `LifecycleDelete`, `AccountView`, `AccountEdit`, `AccountCreate`, `AccountDelete`, `TenantCreate`, `TenantEdit`, `TenantView`, `TenantDelete`, `TagSetCreate`, `TagSetEdit`, `TagSetDelete`, `TelemetryView`, `MachinePolicyCreate`, `MachinePolicyView`, `MachinePolicyEdit`, `MachinePolicyDelete`, `ProxyCreate`, `ProxyView`, `ProxyEdit`, `ProxyDelete`, `SubscriptionCreate`, `SubscriptionView`, `SubscriptionEdit`, `SubscriptionDelete`, `TriggerCreate`, `TriggerView`, `TriggerEdit`, `TriggerDelete`, `CertificateView`, `CertificateCreate`, `CertificateEdit`, `CertificateDelete`, `CertificateExportPrivateKey`, `UserEdit`, `ConfigureServer`, `FeedEdit`, `WorkerView`, `WorkerEdit`, `SpaceEdit`, `SpaceView`, `SpaceDelete`, `SpaceCreate`, `BuildInformationPush`, `BuildInformationAdminister`, `RunbookView`, `RunbookEdit`, `RunbookSnapshotCreate`, `RunbookRunView`, `RunbookRunDelete`, `RunbookRunCreate`, `GitCredentialView`, `GitCredentialEdit`, `EventRetentionDelete`, `EventRetentionView`, `InsightsReportView`, `InsightsReportCreate`, `InsightsReportEdit`, `InsightsReportDelete`, `DeploymentFreezeAdminister`, `TargetTagView`, `TargetTagAdminister`, `PlatformHubView`, `PlatformHubEdit`, `RetentionAdminister`, `FeatureToggleEdit`, `ApprovalPolicyAdminister`, `SshKnownHostsAdminister`, `SshKnownHostsView`, `AiAgentTranscriptView`, `DeployedResourceAdminister`.
- **`Teams`** :span[array of object]{.type-label}  
  Gets the teams that the user is a member of.
  - **`ExternalSecurityGroups`** :span[array of object]{.type-label}
  - **`Id`** :span[string]{.type-label}
  - **`IsDirectlyAssigned`** :span[boolean]{.type-label}
  - **`Name`** :span[string]{.type-label}
  - **`SpaceId`** :span[string]{.type-label}

:::api-example{label="Response"}
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
    "RunbookSnapshotCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "string"
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
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
:::

## Get a list of permissions for the currently authenticated user

:span[GET]{.api-get} `/api/{spaceId}/users/{id}/permissions/export`

Also reachable at `/api/spaces/{spaceIdentifier}/users/{id}/permissions/export`, `/api/users/{id}/permissions/export`.

**Path Parameters**

- **`id`** :span[string]{.type-label} *(required)*  
  ID of the user.
- **`spaceId`** :span[string]{.type-label} *(required)*  
  The ID of the space containing the resource(s).

**Response**

`200` — Success

:::api-example{label="Response"}
```json
"string"
```
:::
