---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Features Configuration
---

## Get features configuration

:span[GET]{.api-get} `/api/featuresconfiguration`

Gets the features configuration of the current instance

**Response**

`200` — The requested features configuration

- **`DefaultPowerShellEdition`** :span[string]{.type-label}
- **`HelpSidebarSupportLink`** :span[string]{.type-label}
- **`HelpSidebarSupportLinkLabel`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsAutomaticStepUpdatesEnabled`** :span[boolean]{.type-label}
- **`IsBuiltInWorkerEnabled`** :span[boolean]{.type-label}
- **`IsCommunityActionTemplatesEnabled`** :span[boolean]{.type-label}
- **`IsCompositeDockerHubRegistryFeedEnabled`** :span[boolean]{.type-label}
- **`IsConfigureFeedsWithLocalOrSmbPathsEnabled`** :span[boolean]{.type-label}
- **`IsExperimentalUIFeatureEnabled`** :span[boolean]{.type-label}
- **`IsGitHubAppEnabled`** :span[boolean]{.type-label}
- **`IsHelpSidebarEnabled`** :span[boolean]{.type-label}
- **`IsKubernetesCloudTargetDiscoveryEnabled`** :span[boolean]{.type-label}
- **`IsProjectsPageOnboardingEnabled`** :span[boolean]{.type-label}
- **`IsProjectsPageOptimizationEnabled`** :span[boolean]{.type-label}
- **`IsWebhookTriggerEnabled`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "DefaultPowerShellEdition": "string",
  "HelpSidebarSupportLink": "string",
  "HelpSidebarSupportLinkLabel": "string",
  "Id": "string",
  "IsAutomaticStepUpdatesEnabled": true,
  "IsBuiltInWorkerEnabled": true,
  "IsCommunityActionTemplatesEnabled": true,
  "IsCompositeDockerHubRegistryFeedEnabled": true,
  "IsConfigureFeedsWithLocalOrSmbPathsEnabled": true,
  "IsExperimentalUIFeatureEnabled": true,
  "IsGitHubAppEnabled": true,
  "IsHelpSidebarEnabled": true,
  "IsKubernetesCloudTargetDiscoveryEnabled": true,
  "IsProjectsPageOnboardingEnabled": true,
  "IsProjectsPageOptimizationEnabled": true,
  "IsWebhookTriggerEnabled": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>

## Update features configuration

:span[PUT]{.api-put} `/api/featuresconfiguration`

Updates the features configuration of the current instance

**Request Body**

- **`DefaultPowerShellEdition`** :span[string]{.type-label}  
  Default PowerShell edition for deployments and runbooks.
- **`HelpSidebarSupportLink`** :span[string]{.type-label}  
  Enable help sidebar support link feature.
- **`HelpSidebarSupportLinkLabel`** :span[string]{.type-label}  
  Custom label for the help sidebar support link.
- **`Id`** :span[string]{.type-label}  
  The id of features configuration resource.
- **`IsAutomaticStepUpdatesEnabled`** :span[boolean]{.type-label}  
  Enable automatic step updates feature.
- **`IsBuiltInWorkerEnabled`** :span[boolean]{.type-label}  
  Enable built-in worker feature.
- **`IsCommunityActionTemplatesEnabled`** :span[boolean]{.type-label}  
  Enable community action templates feature.
- **`IsCompositeDockerHubRegistryFeedEnabled`** :span[boolean]{.type-label}  
  Enable composite DockerHub registry feed feature.
- **`IsConfigureFeedsWithLocalOrSmbPathsEnabled`** :span[boolean]{.type-label}  
  Enable local or SMB paths for feeds feature.
- **`IsExperimentalUIFeatureEnabled`** :span[boolean]{.type-label}  
  Enable experimental UI feature.
- **`IsGitHubAppEnabled`** :span[boolean]{.type-label}  
  Enable the Octopus Deploy GitHub App.
- **`IsHelpSidebarEnabled`** :span[boolean]{.type-label}  
  Enable help sidebar feature.
- **`IsKubernetesCloudTargetDiscoveryEnabled`** :span[boolean]{.type-label}  
  Enable Kubernetes cloud target discovery feature.
- **`IsNavigationVisualUpliftEnabled`** :span[boolean]{.type-label}  
  Enable navigation visual uplift feature.
- **`IsProjectsPageOnboardingEnabled`** :span[boolean]{.type-label}  
  Enable projects page onboarding experience.
- **`IsProjectsPageOptimizationEnabled`** :span[boolean]{.type-label}  
  Enable new project page bff datasource.
- **`IsWebhookTriggerEnabled`** :span[boolean]{.type-label}  
  Enable the webhook triggers feature.

<div data-example="Request">

```json
{
  "DefaultPowerShellEdition": "string",
  "HelpSidebarSupportLink": "string",
  "HelpSidebarSupportLinkLabel": "string",
  "Id": "string",
  "IsAutomaticStepUpdatesEnabled": true,
  "IsBuiltInWorkerEnabled": true,
  "IsCommunityActionTemplatesEnabled": true,
  "IsCompositeDockerHubRegistryFeedEnabled": true,
  "IsConfigureFeedsWithLocalOrSmbPathsEnabled": true,
  "IsExperimentalUIFeatureEnabled": true,
  "IsGitHubAppEnabled": true,
  "IsHelpSidebarEnabled": true,
  "IsKubernetesCloudTargetDiscoveryEnabled": true,
  "IsNavigationVisualUpliftEnabled": true,
  "IsProjectsPageOnboardingEnabled": true,
  "IsProjectsPageOptimizationEnabled": true,
  "IsWebhookTriggerEnabled": true
}
```
</div>

**Response**

`200` — Confirmation that features configuration has been updated, containing the new configuration

- **`DefaultPowerShellEdition`** :span[string]{.type-label}
- **`HelpSidebarSupportLink`** :span[string]{.type-label}
- **`HelpSidebarSupportLinkLabel`** :span[string]{.type-label}
- **`Id`** :span[string]{.type-label}  
  Gets or sets a unique identifier for this resource.
- **`IsAutomaticStepUpdatesEnabled`** :span[boolean]{.type-label}
- **`IsBuiltInWorkerEnabled`** :span[boolean]{.type-label}
- **`IsCommunityActionTemplatesEnabled`** :span[boolean]{.type-label}
- **`IsCompositeDockerHubRegistryFeedEnabled`** :span[boolean]{.type-label}
- **`IsConfigureFeedsWithLocalOrSmbPathsEnabled`** :span[boolean]{.type-label}
- **`IsExperimentalUIFeatureEnabled`** :span[boolean]{.type-label}
- **`IsGitHubAppEnabled`** :span[boolean]{.type-label}
- **`IsHelpSidebarEnabled`** :span[boolean]{.type-label}
- **`IsKubernetesCloudTargetDiscoveryEnabled`** :span[boolean]{.type-label}
- **`IsProjectsPageOnboardingEnabled`** :span[boolean]{.type-label}
- **`IsProjectsPageOptimizationEnabled`** :span[boolean]{.type-label}
- **`IsWebhookTriggerEnabled`** :span[boolean]{.type-label}
- **`LastModifiedBy`** :span[string]{.type-label}  
  Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** :span[string]{.type-label}  
  Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** :span[object]{.type-label}  
  Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

<div data-example="Response">

```json
{
  "DefaultPowerShellEdition": "string",
  "HelpSidebarSupportLink": "string",
  "HelpSidebarSupportLinkLabel": "string",
  "Id": "string",
  "IsAutomaticStepUpdatesEnabled": true,
  "IsBuiltInWorkerEnabled": true,
  "IsCommunityActionTemplatesEnabled": true,
  "IsCompositeDockerHubRegistryFeedEnabled": true,
  "IsConfigureFeedsWithLocalOrSmbPathsEnabled": true,
  "IsExperimentalUIFeatureEnabled": true,
  "IsGitHubAppEnabled": true,
  "IsHelpSidebarEnabled": true,
  "IsKubernetesCloudTargetDiscoveryEnabled": true,
  "IsProjectsPageOnboardingEnabled": true,
  "IsProjectsPageOptimizationEnabled": true,
  "IsWebhookTriggerEnabled": true,
  "LastModifiedBy": "string",
  "LastModifiedOn": "2020-01-01T00:00:00.000Z",
  "Links": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
```
</div>
