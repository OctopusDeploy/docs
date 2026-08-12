---
layout: src/layouts/Api.astro
pubDate: 2026-08-11
modDate: 2026-08-11
title: Features Configuration
---

## Get features configuration

`GET` `/api/featuresconfiguration`

Gets the features configuration of the current instance

**Response**

`200` — The requested features configuration

`FeaturesConfigurationResource`.

- **`DefaultPowerShellEdition`** <span class="type-label">string</span>
- **`HelpSidebarSupportLink`** <span class="type-label">string</span>
- **`HelpSidebarSupportLinkLabel`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsAutomaticStepUpdatesEnabled`** <span class="type-label">boolean</span>
- **`IsBuiltInWorkerEnabled`** <span class="type-label">boolean</span>
- **`IsCommunityActionTemplatesEnabled`** <span class="type-label">boolean</span>
- **`IsCompositeDockerHubRegistryFeedEnabled`** <span class="type-label">boolean</span>
- **`IsConfigureFeedsWithLocalOrSmbPathsEnabled`** <span class="type-label">boolean</span>
- **`IsExperimentalUIFeatureEnabled`** <span class="type-label">boolean</span>
- **`IsGitHubAppEnabled`** <span class="type-label">boolean</span>
- **`IsHelpSidebarEnabled`** <span class="type-label">boolean</span>
- **`IsKubernetesCloudTargetDiscoveryEnabled`** <span class="type-label">boolean</span>
- **`IsProjectsPageOnboardingEnabled`** <span class="type-label">boolean</span>
- **`IsProjectsPageOptimizationEnabled`** <span class="type-label">boolean</span>
- **`IsWebhookTriggerEnabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

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

`PUT` `/api/featuresconfiguration`

Updates the features configuration of the current instance

**Request Body**

`UpdateFeaturesConfigurationCommand`

- **`DefaultPowerShellEdition`** <span class="type-label">string</span> — Default PowerShell edition for deployments and runbooks.
- **`HelpSidebarSupportLink`** <span class="type-label">string</span> — Enable help sidebar support link feature.
- **`HelpSidebarSupportLinkLabel`** <span class="type-label">string</span> — Custom label for the help sidebar support link.
- **`Id`** <span class="type-label">string</span> — The id of features configuration resource.
- **`IsAutomaticStepUpdatesEnabled`** <span class="type-label">boolean</span> — Enable automatic step updates feature.
- **`IsBuiltInWorkerEnabled`** <span class="type-label">boolean</span> — Enable built-in worker feature.
- **`IsCommunityActionTemplatesEnabled`** <span class="type-label">boolean</span> — Enable community action templates feature.
- **`IsCompositeDockerHubRegistryFeedEnabled`** <span class="type-label">boolean</span> — Enable composite DockerHub registry feed feature.
- **`IsConfigureFeedsWithLocalOrSmbPathsEnabled`** <span class="type-label">boolean</span> — Enable local or SMB paths for feeds feature.
- **`IsExperimentalUIFeatureEnabled`** <span class="type-label">boolean</span> — Enable experimental UI feature.
- **`IsGitHubAppEnabled`** <span class="type-label">boolean</span> — Enable the Octopus Deploy GitHub App.
- **`IsHelpSidebarEnabled`** <span class="type-label">boolean</span> — Enable help sidebar feature.
- **`IsKubernetesCloudTargetDiscoveryEnabled`** <span class="type-label">boolean</span> — Enable Kubernetes cloud target discovery feature.
- **`IsNavigationVisualUpliftEnabled`** <span class="type-label">boolean</span> — Enable navigation visual uplift feature.
- **`IsProjectsPageOnboardingEnabled`** <span class="type-label">boolean</span> — Enable projects page onboarding experience.
- **`IsProjectsPageOptimizationEnabled`** <span class="type-label">boolean</span> — Enable new project page bff datasource.
- **`IsWebhookTriggerEnabled`** <span class="type-label">boolean</span> — Enable the webhook triggers feature.

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

`FeaturesConfigurationResource`.

- **`DefaultPowerShellEdition`** <span class="type-label">string</span>
- **`HelpSidebarSupportLink`** <span class="type-label">string</span>
- **`HelpSidebarSupportLinkLabel`** <span class="type-label">string</span>
- **`Id`** <span class="type-label">string</span> — Gets or sets a unique identifier for this resource.
- **`IsAutomaticStepUpdatesEnabled`** <span class="type-label">boolean</span>
- **`IsBuiltInWorkerEnabled`** <span class="type-label">boolean</span>
- **`IsCommunityActionTemplatesEnabled`** <span class="type-label">boolean</span>
- **`IsCompositeDockerHubRegistryFeedEnabled`** <span class="type-label">boolean</span>
- **`IsConfigureFeedsWithLocalOrSmbPathsEnabled`** <span class="type-label">boolean</span>
- **`IsExperimentalUIFeatureEnabled`** <span class="type-label">boolean</span>
- **`IsGitHubAppEnabled`** <span class="type-label">boolean</span>
- **`IsHelpSidebarEnabled`** <span class="type-label">boolean</span>
- **`IsKubernetesCloudTargetDiscoveryEnabled`** <span class="type-label">boolean</span>
- **`IsProjectsPageOnboardingEnabled`** <span class="type-label">boolean</span>
- **`IsProjectsPageOptimizationEnabled`** <span class="type-label">boolean</span>
- **`IsWebhookTriggerEnabled`** <span class="type-label">boolean</span>
- **`LastModifiedBy`** <span class="type-label">string</span> — Gets or sets the username of the user who last modified this resource.
- **`LastModifiedOn`** <span class="type-label">string</span> — Gets or sets the date/time that this resource was last modified. Format `date-time`.
- **`Links`** <span class="type-label">object</span> — Gets or sets a dictionary of links to other related resources. These links can be used to navigate the resources on the server.

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
