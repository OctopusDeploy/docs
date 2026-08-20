---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: User Permissions
---

## Get the user's permission information

:endpoint{method="GET" path="/api/\{spaceId\}/users/\{id\}/permissions"}

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
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "AccountDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "AccountEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "AccountView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ActionTemplateCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ActionTemplateDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ActionTemplateEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ActionTemplateView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "AdministerSystem": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "AiAgentTranscriptView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ApprovalPolicyAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ArtifactCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ArtifactDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ArtifactEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ArtifactView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "BuildInformationAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "BuildInformationPush": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "BuiltInFeedAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "BuiltInFeedDownload": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "BuiltInFeedPush": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "CertificateCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "CertificateDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "CertificateEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "CertificateExportPrivateKey": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "CertificateView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ConfigureServer": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DefectReport": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DefectResolve": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DeployedResourceAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DeploymentCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DeploymentDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DeploymentFreezeAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DeploymentView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EnvironmentCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EnvironmentDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EnvironmentEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EnvironmentView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EventRetentionDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EventRetentionView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EventView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "FeatureToggleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "FeedEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "FeedView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "GitCredentialEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "GitCredentialView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InsightsReportCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InsightsReportDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InsightsReportEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InsightsReportView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InterruptionSubmit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InterruptionView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InterruptionViewSubmitResponsible": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LibraryVariableSetCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LibraryVariableSetDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LibraryVariableSetEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LibraryVariableSetView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LifecycleCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LifecycleDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LifecycleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LifecycleView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachineCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachineDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachineEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachinePolicyCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachinePolicyDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachinePolicyEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachinePolicyView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachineView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "PlatformHubEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "PlatformHubView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProcessEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProcessView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectGroupCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectGroupDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectGroupEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectGroupView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProxyCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProxyDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProxyEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProxyView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ReleaseCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ReleaseDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ReleaseEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ReleaseView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RetentionAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookRunCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookRunDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookRunView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookSnapshotCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SpaceCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SpaceDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SpaceEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SpaceView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SshKnownHostsAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SshKnownHostsView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SubscriptionCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SubscriptionDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SubscriptionEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SubscriptionView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TagSetCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TagSetDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TagSetEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TargetTagAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TargetTagView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TaskCancel": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TaskCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TaskEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TaskPrioritize": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TaskView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TeamCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TeamDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TeamEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TeamView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TelemetryView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TenantCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TenantDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TenantEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TenantView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TriggerCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TriggerDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TriggerEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TriggerView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "UserEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "UserInvite": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "UserRoleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "UserRoleView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "UserView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "VariableEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "VariableEditUnscoped": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "VariableView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "VariableViewUnscoped": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "WorkerEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "WorkerView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
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
      "SpaceId": "Spaces-1"
    }
  ]
}
```
:::

## Get the user's permission information

:endpoint{method="GET" path="/api/\{spaceId\}/users/\{id\}/permissions/configuration"}

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
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "AccountDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "AccountEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "AccountView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ActionTemplateCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ActionTemplateDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ActionTemplateEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ActionTemplateView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "AdministerSystem": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "AiAgentTranscriptView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ApprovalPolicyAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ArtifactCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ArtifactDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ArtifactEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ArtifactView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "BuildInformationAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "BuildInformationPush": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "BuiltInFeedAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "BuiltInFeedDownload": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "BuiltInFeedPush": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "CertificateCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "CertificateDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "CertificateEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "CertificateExportPrivateKey": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "CertificateView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ConfigureServer": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DefectReport": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DefectResolve": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DeployedResourceAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DeploymentCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DeploymentDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DeploymentFreezeAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "DeploymentView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EnvironmentCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EnvironmentDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EnvironmentEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EnvironmentView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EventRetentionDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EventRetentionView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "EventView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "FeatureToggleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "FeedEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "FeedView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "GitCredentialEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "GitCredentialView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InsightsReportCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InsightsReportDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InsightsReportEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InsightsReportView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InterruptionSubmit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InterruptionView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "InterruptionViewSubmitResponsible": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LibraryVariableSetCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LibraryVariableSetDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LibraryVariableSetEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LibraryVariableSetView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LifecycleCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LifecycleDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LifecycleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "LifecycleView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachineCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachineDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachineEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachinePolicyCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachinePolicyDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachinePolicyEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachinePolicyView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "MachineView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "PlatformHubEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "PlatformHubView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProcessEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProcessView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectGroupCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectGroupDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectGroupEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectGroupView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProjectView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProxyCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProxyDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProxyEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ProxyView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ReleaseCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ReleaseDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ReleaseEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "ReleaseView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RetentionAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookRunCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookRunDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookRunView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookSnapshotCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "RunbookView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SpaceCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SpaceDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SpaceEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SpaceView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SshKnownHostsAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SshKnownHostsView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SubscriptionCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SubscriptionDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SubscriptionEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "SubscriptionView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TagSetCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TagSetDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TagSetEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TargetTagAdminister": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TargetTagView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TaskCancel": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TaskCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TaskEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TaskPrioritize": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TaskView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TeamCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TeamDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TeamEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TeamView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TelemetryView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TenantCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TenantDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TenantEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TenantView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TriggerCreate": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TriggerDelete": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TriggerEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "TriggerView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "UserEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "UserInvite": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "UserRoleEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "UserRoleView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "UserView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "VariableEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "VariableEditUnscoped": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "VariableView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "VariableViewUnscoped": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "WorkerEdit": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
      }
    ],
    "WorkerView": [
      {
        "RestrictedToEnvironmentIds": [
          "Environments-1",
          "..."
        ],
        "RestrictedToProjectGroupIds": [
          "string"
        ],
        "RestrictedToProjectIds": [
          "Projects-1",
          "..."
        ],
        "RestrictedToTenantIds": [
          "Tenants-1",
          "..."
        ],
        "SpaceId": "Spaces-1"
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
      "SpaceId": "Spaces-1"
    }
  ]
}
```
:::

## Get a list of permissions for the currently authenticated user

:endpoint{method="GET" path="/api/\{spaceId\}/users/\{id\}/permissions/export"}

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
