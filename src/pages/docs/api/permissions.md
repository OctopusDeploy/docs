---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Permissions
---

## Gets all the available permissions and their descriptions and restrictions

`GET` `/api/permissions/all`

**Response**

`200` — A dictionary keyed by permission with their description

- **`AccountCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`AccountDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`AccountEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`AccountView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ActionTemplateCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ActionTemplateDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ActionTemplateEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ActionTemplateView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`AdministerSystem`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`AiAgentTranscriptView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ApprovalPolicyAdminister`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ArtifactCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ArtifactDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ArtifactEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ArtifactView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`BuildInformationAdminister`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`BuildInformationPush`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`BuiltInFeedAdminister`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`BuiltInFeedDownload`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`BuiltInFeedPush`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`CertificateCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`CertificateDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`CertificateEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`CertificateExportPrivateKey`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`CertificateView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ConfigureServer`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`DefectReport`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`DefectResolve`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`DeployedResourceAdminister`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`DeploymentCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`DeploymentDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`DeploymentFreezeAdminister`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`DeploymentView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`EnvironmentCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`EnvironmentDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`EnvironmentEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`EnvironmentView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`EventRetentionDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`EventRetentionView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`EventView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`FeatureToggleEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`FeedEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`FeedView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`GitCredentialEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`GitCredentialView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`InsightsReportCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`InsightsReportDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`InsightsReportEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`InsightsReportView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`InterruptionSubmit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`InterruptionView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`InterruptionViewSubmitResponsible`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`LibraryVariableSetCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`LibraryVariableSetDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`LibraryVariableSetEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`LibraryVariableSetView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`LifecycleCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`LifecycleDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`LifecycleEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`LifecycleView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`MachineCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`MachineDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`MachineEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`MachinePolicyCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`MachinePolicyDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`MachinePolicyEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`MachinePolicyView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`MachineView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`PlatformHubEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`PlatformHubView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProcessEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProcessView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProjectCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProjectDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProjectEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProjectGroupCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProjectGroupDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProjectGroupEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProjectGroupView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProjectView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProxyCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProxyDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProxyEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ProxyView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ReleaseCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ReleaseDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ReleaseEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`ReleaseView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`RetentionAdminister`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`RunbookEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`RunbookRunCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`RunbookRunDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`RunbookRunView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`RunbookView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SpaceCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SpaceDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SpaceEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SpaceView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SshKnownHostsAdminister`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SshKnownHostsView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SubscriptionCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SubscriptionDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SubscriptionEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`SubscriptionView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TagSetCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TagSetDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TagSetEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TargetTagAdminister`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TargetTagView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TaskCancel`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TaskCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TaskEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TaskPrioritize`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TaskView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TeamCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TeamDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TeamEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TeamView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TelemetryView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TenantCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TenantDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TenantEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TenantView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TriggerCreate`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TriggerDelete`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TriggerEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`TriggerView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`UserEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`UserInvite`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`UserRoleEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`UserRoleView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`UserView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`VariableEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`VariableEditUnscoped`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`VariableView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`VariableViewUnscoped`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`WorkerEdit`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>
- **`WorkerView`** <span class="type-label">object</span>
  - **`CanApplyAtSpaceLevel`** <span class="type-label">boolean</span>
  - **`CanApplyAtSystemLevel`** <span class="type-label">boolean</span>
  - **`Description`** <span class="type-label">string</span>
  - **`SupportedRestrictions`** <span class="type-label">array of string</span>

<div data-example="Response">

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
</div>
