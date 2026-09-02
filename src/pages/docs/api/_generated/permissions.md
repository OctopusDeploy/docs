---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-25
title: Permissions
---

## Get all the available permissions and their descriptions and restrictions

:endpoint{method="GET" path="/api/permissions/all"}

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
- **`ApprovalRuleAdminister`** :span[object]{.type-label}
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
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "AccountDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "AccountEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "AccountView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ActionTemplateCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ActionTemplateDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ActionTemplateEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ActionTemplateView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "AdministerSystem": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "AiAgentTranscriptView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ApprovalRuleAdminister": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ArtifactCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ArtifactDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ArtifactEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ArtifactView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "BuildInformationAdminister": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "BuildInformationPush": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "BuiltInFeedAdminister": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "BuiltInFeedDownload": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "BuiltInFeedPush": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "CertificateCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "CertificateDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "CertificateEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "CertificateExportPrivateKey": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "CertificateView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ConfigureServer": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DefectReport": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DefectResolve": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DeployedResourceAdminister": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DeploymentCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DeploymentDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DeploymentFreezeAdminister": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "DeploymentView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EnvironmentCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EnvironmentDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EnvironmentEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EnvironmentView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EventRetentionDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EventRetentionView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "EventView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "FeatureToggleEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "FeedEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "FeedView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "GitCredentialEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "GitCredentialView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InsightsReportCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InsightsReportDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InsightsReportEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InsightsReportView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InterruptionSubmit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InterruptionView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "InterruptionViewSubmitResponsible": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LibraryVariableSetCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LibraryVariableSetDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LibraryVariableSetEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LibraryVariableSetView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LifecycleCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LifecycleDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LifecycleEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "LifecycleView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachineCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachineDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachineEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachinePolicyCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachinePolicyDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachinePolicyEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachinePolicyView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "MachineView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "PlatformHubEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "PlatformHubView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProcessEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProcessView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectGroupCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectGroupDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectGroupEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectGroupView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProjectView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProxyCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProxyDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProxyEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ProxyView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ReleaseCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ReleaseDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ReleaseEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "ReleaseView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RetentionAdminister": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookRunCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookRunDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookRunView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookSnapshotCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "RunbookView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SpaceCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SpaceDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SpaceEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SpaceView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SshKnownHostsAdminister": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SshKnownHostsView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SubscriptionCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SubscriptionDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SubscriptionEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "SubscriptionView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TagSetCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TagSetDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TagSetEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TargetTagAdminister": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TargetTagView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TaskCancel": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TaskCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TaskEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TaskPrioritize": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TaskView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TeamCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TeamDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TeamEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TeamView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TelemetryView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TenantCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TenantDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TenantEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TenantView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TriggerCreate": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TriggerDelete": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TriggerEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "TriggerView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "UserEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "UserInvite": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "UserRoleEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "UserRoleView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "UserView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "VariableEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "VariableEditUnscoped": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "VariableView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "VariableViewUnscoped": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "WorkerEdit": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  },
  "WorkerView": {
    "CanApplyAtSpaceLevel": false,
    "CanApplyAtSystemLevel": false,
    "Description": "string",
    "SupportedRestrictions": [
      "string"
    ]
  }
}
```
:::
