---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Permissions
---

## Get all the available permissions and their descriptions and restrictions

:span[GET]{.api-get} `/api/permissions/all`

**Response**

`200` — A dictionary keyed by permission with their description

- **`AccountCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`AccountDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`AccountEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`AccountView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ActionTemplateCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ActionTemplateDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ActionTemplateEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ActionTemplateView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`AdministerSystem`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`AiAgentTranscriptView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ApprovalPolicyAdminister`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ArtifactCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ArtifactDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ArtifactEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ArtifactView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`BuildInformationAdminister`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`BuildInformationPush`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`BuiltInFeedAdminister`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`BuiltInFeedDownload`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`BuiltInFeedPush`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`CertificateCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`CertificateDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`CertificateEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`CertificateExportPrivateKey`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`CertificateView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ConfigureServer`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`DefectReport`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`DefectResolve`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`DeployedResourceAdminister`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`DeploymentCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`DeploymentDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`DeploymentFreezeAdminister`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`DeploymentView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`EnvironmentCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`EnvironmentDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`EnvironmentEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`EnvironmentView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`EventRetentionDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`EventRetentionView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`EventView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`FeatureToggleEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`FeedEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`FeedView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`GitCredentialEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`GitCredentialView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`InsightsReportCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`InsightsReportDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`InsightsReportEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`InsightsReportView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`InterruptionSubmit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`InterruptionView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`InterruptionViewSubmitResponsible`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`LibraryVariableSetCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`LibraryVariableSetDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`LibraryVariableSetEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`LibraryVariableSetView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`LifecycleCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`LifecycleDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`LifecycleEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`LifecycleView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`MachineCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`MachineDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`MachineEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`MachinePolicyCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`MachinePolicyDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`MachinePolicyEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`MachinePolicyView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`MachineView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`PlatformHubEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`PlatformHubView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProcessEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProcessView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProjectCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProjectDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProjectEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProjectGroupCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProjectGroupDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProjectGroupEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProjectGroupView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProjectView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProxyCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProxyDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProxyEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ProxyView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ReleaseCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ReleaseDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ReleaseEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`ReleaseView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`RetentionAdminister`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`RunbookEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`RunbookRunCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`RunbookRunDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`RunbookRunView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`RunbookSnapshotCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`RunbookView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SpaceCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SpaceDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SpaceEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SpaceView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SshKnownHostsAdminister`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SshKnownHostsView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SubscriptionCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SubscriptionDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SubscriptionEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`SubscriptionView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TagSetCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TagSetDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TagSetEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TargetTagAdminister`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TargetTagView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TaskCancel`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TaskCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TaskEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TaskPrioritize`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TaskView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TeamCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TeamDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TeamEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TeamView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TelemetryView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TenantCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TenantDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TenantEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TenantView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TriggerCreate`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TriggerDelete`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TriggerEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`TriggerView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`UserEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`UserInvite`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`UserRoleEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`UserRoleView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`UserView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`VariableEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`VariableEditUnscoped`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`VariableView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`VariableViewUnscoped`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`WorkerEdit`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}
- **`WorkerView`** :span[object]{.type-label}
  - **`CanApplyAtSpaceLevel`** :span[boolean]{.type-label}
  - **`CanApplyAtSystemLevel`** :span[boolean]{.type-label}
  - **`Description`** :span[string]{.type-label}
  - **`SupportedRestrictions`** :span[array of string]{.type-label}

:::api-example{label="Response"}
```json
{
  "AccountCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "AccountDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "AccountEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "AccountView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ActionTemplateCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ActionTemplateDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ActionTemplateEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ActionTemplateView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "AdministerSystem": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "AiAgentTranscriptView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ApprovalPolicyAdminister": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ArtifactCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ArtifactDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ArtifactEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ArtifactView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "BuildInformationAdminister": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "BuildInformationPush": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "BuiltInFeedAdminister": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "BuiltInFeedDownload": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "BuiltInFeedPush": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "CertificateCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "CertificateDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "CertificateEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "CertificateExportPrivateKey": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "CertificateView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ConfigureServer": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DefectReport": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DefectResolve": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DeployedResourceAdminister": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DeploymentCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DeploymentDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DeploymentFreezeAdminister": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DeploymentView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EnvironmentCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EnvironmentDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EnvironmentEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EnvironmentView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EventRetentionDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EventRetentionView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EventView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "FeatureToggleEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "FeedEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "FeedView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "GitCredentialEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "GitCredentialView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InsightsReportCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InsightsReportDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InsightsReportEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InsightsReportView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InterruptionSubmit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InterruptionView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InterruptionViewSubmitResponsible": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LibraryVariableSetCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LibraryVariableSetDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LibraryVariableSetEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LibraryVariableSetView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LifecycleCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LifecycleDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LifecycleEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LifecycleView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachineCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachineDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachineEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachinePolicyCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachinePolicyDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachinePolicyEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachinePolicyView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachineView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "PlatformHubEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "PlatformHubView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProcessEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProcessView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectGroupCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectGroupDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectGroupEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectGroupView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProxyCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProxyDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProxyEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProxyView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ReleaseCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ReleaseDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ReleaseEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ReleaseView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RetentionAdminister": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookRunCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookRunDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookRunView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookSnapshotCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SpaceCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SpaceDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SpaceEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SpaceView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SshKnownHostsAdminister": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SshKnownHostsView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SubscriptionCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SubscriptionDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SubscriptionEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SubscriptionView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TagSetCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TagSetDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TagSetEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TargetTagAdminister": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TargetTagView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TaskCancel": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TaskCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TaskEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TaskPrioritize": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TaskView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TeamCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TeamDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TeamEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TeamView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TelemetryView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TenantCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TenantDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TenantEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TenantView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TriggerCreate": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TriggerDelete": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TriggerEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TriggerView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "UserEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "UserInvite": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "UserRoleEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "UserRoleView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "UserView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "VariableEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "VariableEditUnscoped": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "VariableView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "VariableViewUnscoped": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "WorkerEdit": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "WorkerView": {
    "CanApplyAtSpaceLevel": true,
    "CanApplyAtSystemLevel": true,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  }
}
```
:::
