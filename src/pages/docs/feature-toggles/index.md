---
layout: src/layouts/Default.astro
pubDate: 2025-05-21
modDate: 2025-05-21
title: Feature Toggles 
navTitle: Feature Toggles
navSection: Feature Toggles
description: Octopus Feature Toggles allow progressive delivery of changes and instant rollback 
navOrder: 95 
---

Octopus Feature Toggles support toggling features on or off in real-time, without redeploying, and progressively releasing changes to subsets of your users.

:::div{.hint}
Octopus Feature Toggles are currently in Alpha, available to a small set of customers. 

If you are interested in this feature please register your interest on the [roadmap card](https://roadmap.octopus.com/c/121-feature-toggles) and we'll keep you updated.
:::

## Usage 

### Create a Feature Toggle 

Feature Toggles are located within Octopus Projects: 
**Project ➜ Feature Toggles**

Create a new Toggle and give it name.

![New toggle name](/docs/feature-toggles/new-toggle-name.png "width=500")

### Configure OpenFeature in your client application {#configure-open-feature-client-app}

Octopus Feature Toggles rely on [OpenFeature](https://openfeature.dev/) as the client SDK.

Follow the [OpenFeature guide for installing the SDK for your language](https://openfeature.dev/ecosystem?instant_search%5BrefinementList%5D%5Btype%5D%5B0%5D=SDK) into your application. 

Configure OpenFeature to use the [Octopus Provider](#providers).

The Octopus OpenFeature Provider requires a client identifier when instantiated. This is a [JWT](https://jwt.io/introduction) which specifies the Octopus Project, Environment, and Tenant (if applicable). This tells the Octopus Feature Toggle service which set of toggles to evaluate.

:::div{.hint}
The Octopus Feature Toggle client identifier is available via the Octopus variable `Octopus.FeatureToggles.ClientIdentifier` or via the Feature Toggle UI (see below). 
:::

For applications deployed by Octopus, the recommended way is to have Octopus inject the client identifier as part of deployment, for example by injecting it into a configuration file or environment variable. The client identifier is made available via the Octopus variable `Octopus.FeatureToggles.ClientIdentifier`.   

For applications not deployed by Octopus, or cannot have the client identifier supplied during deployment for any reason, the client identifier can be obtained via the portal UI, as shown below.

![Client identifier preview menu item](/docs/feature-toggles/client-identifier-preview-menu-item.png "width=500")

![Client identifier preview UI](/docs/feature-toggles/client-identifier-preview.png "width=500")

The previewed client identifier may then be copied into your application configuration.

For example, an ASP.NET application could have an `appsettings.json` file which contained the following: 

```json
{
  "FeatureToggles": {
    "ClientId": "#{Octopus.FeatureToggles.ClientIdentifier}"
  }
}
```

This would be transformed during deployment by Octopus to contain the correct client identifier for the current Project and Environment.

This would then be used during application startup to configure the OpenFeature with the Octopus Provider, similar to:

```cs
// Retrieve client identifier from config 
var builder = WebApplication.CreateBuilder(args);
var octopusFeatureTogglesClientId = builder.Configuration["FeatureToggles:ClientId"] ?? "";

// Instantiate the Octopus Provider
var octopusProvider = new OctopusFeatureProvider(new OctopusFeatureConfiguration(octopusFeatureTogglesClientId));

// Set Octopus as the OpenFeature provider
await OpenFeature.Api.Instance.SetProviderAsync(octopusProvider);
```

### Evaluate a Toggle

The [Provider](#providers) for each language documents how to evaluate toggles.

You will need the Toggle slug in order to reference the toggle in code. This can be found in the Octopus portal:

![Feature Toggle slug](/docs/feature-toggles/feature-toggle-slug.png "width=500")

Below is an example of evaluating the toggle with slug `dark-mode` in C#:

```cs
var darkModeEnabled = await featureClient.GetBooleanValueAsync("dark-mode", false);
```

The second argument is the default value. Read more about [default values](#default-values) below.

### Rollout 
To enable your toggle for an environment, add the environment to the Toggle. 

![Add Environment button](/docs/feature-toggles/add-environment-button.png "width=500")

Select your environment, and whether you want the toggle on or off.

![Add Environment dialog](/docs/feature-toggles/add-environment-dialog.png "width=500")

You can additionally target specific [Tenants](#tenants) or [User Segments](#segments).

## Providers {#providers}

Below are the Octopus OpenFeature provider SDKs currently available:

- [.NET](https://github.com/OctopusDeploy/openfeature-provider-dotnet)
- JavaScript/TypeScript

Configuring the providers is documented in the README files in the repositories.

## Segments {#segments}

Segments allow enabling a toggle for a subset of users. 

Segments are key/value pairs, and are supplied by your applications via the [OpenFeature EvaluationContext](https://openfeature.dev/docs/reference/concepts/evaluation-context).


Common segment examples include:

- Specific users. e.g. `user-id/123456`  
- Specific accounts. e.g. `account-id/123456` 
- License types. e.g. `license-type/free`  
- Geographic regions. e.g. `region/eu` 
- Rollout rings. e.g. `ring/early-adopter`

The Evaluation Context can be supplied at different points in your application, for example:

- On start-up
- During each web request
- At the evaluation site

The following example shows adding a key/value to the evaluation context in C#.

```cs
// The client would be injected by IoC in many cases
var client = OpenFeature.Api.Instance.GetClient();
// The following is hard-coded, whereas a real-world use would set this dynamically
client.SetContext(EvaluationContext.Builder().Set("license-type", "free").Build());
```

Segments can then be configured for Environments on the Feature Toggle in Octopus.

![Add Segment](/docs/feature-toggles/segment-add.png "width=500")

A Toggle evaluation will match on segments if the evaluation context matches at least one segment for each key. 

Some examples:

|Segments   | Evaluation Context | Result |
|-----------|--------------------|--------|
| `user-id/123456`   | `user-id/123456` | `On` |
| `user-id/123456`   | `user-id/789383` | `Off` |
| `license-type/free` `region/Asia` `region/EU`  | `license-type/free` `region/Asia`  | `On` |
| `license-type/free` `region/Asia` `region/EU`  | `license-type/free` `region/US`  | `Off` |

## Tenants {#tenants}

If your Project uses [Tenants](/docs/tenants), then Toggles may be enabled for subsets of your Tenants. 

The options for configuring a Feature Toggle for Tenants are:

- All Tenants
- Specific Tenants Included
- % of Tenants
- Specific Tenants Excluded

For example, the configuration shown below will result in the Toggle evaluating as `On` for 10% of Tenants, always including `Acme` and never including `Cyberdyne Systems`. 

![Tenanted Rollout](/docs/feature-toggles/tenant-rollout.png "width=500")

## Default Values {#default-values}

Toggle default values are configured both on the Toggle in Octopus, and at the evaluation site in your client application. It's important to understand how these interact. 

The default value on the Toggle in Octopus will be returned if the environment being evaluated has not been configured with an explicit value.

In the example below, the `Production` and `Staging` environments have values configured. The default value for the Toggle is `Off`. If an evaluation is made by an application running in the `Development` environment, or any other environment not configured, it would receive the default value (`Off`).  

![Default Values](/docs/feature-toggles/default-values.png "width=500")

The default value supplied in client code (the `false` argument in the example below) will only be used if the Octopus Feature Toggle service cannot be reached, for example if there are network issues or the service is unavailable.

```cs
var darkModeEnabled = await featureClient.GetBooleanValueAsync("dark-mode", false);
```