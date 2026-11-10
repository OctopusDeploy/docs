---
layout: src/layouts/Default.astro
pubDate: 2026-11-05
modDate: 2026-11-05
title: Getting started with feature flags
sidebarLabel: Getting started
navTitle: Getting started
navSection: Feature Flags
navOrder: 10
icon: fa-solid fa-play
description: Create an Octopus feature flag, connect your application with OpenFeature, evaluate the flag in code, and turn it on for an environment.
subject: feature flags, OpenFeature, client identifier, getting started, feature flag slug
type: guide
audience: [app-dev, devops-eng, new-user]
image:
imageAlt:
---

This page takes you from no feature flags to a flag your application checks at runtime. You'll create a flag in Octopus, connect your application to the Octopus feature flag service, evaluate the flag in code, and turn it on for an environment.

## Create a feature flag

A feature flag lives in an Octopus project. Create one for each feature you want to control independently.

**Before you begin**

You'll need:

- An Octopus project that deploys the application you want to add the flag to.
- The permission required to create feature flags (`FeatureToggleEdit`). If you can edit other parts of a project like a deployment process, you probably already have this permission.

To create a feature flag:

1. From your project, select **Feature Flags**.
2. Select **Add Feature Flag**.
3. Enter a **Name** for the flag.
4. Select **Save**.

The flag appears in the project's feature flag list. Octopus generates a slug from the name, which is how your application refers to the flag.

## Add the Octopus provider to your application

Your application evaluates flags through the OpenFeature SDK, using the Octopus provider to fetch flag values from the Octopus feature flag service. Do this once per application.

To add the Octopus provider:

1. Install the [OpenFeature SDK](https://openfeature.dev/docs/reference/sdks/) for your language.
2. Install the [Octopus provider](/docs/feature-flags/providers) for your language.
3. In your application's startup code, create the Octopus provider with your client identifier and set it as the OpenFeature provider.

For example, in an ASP.NET application:

```cs
// Read the client identifier from configuration
var builder = WebApplication.CreateBuilder(args);
var octopusFeatureFlagsClientId = builder.Configuration["FeatureFlags:ClientId"] ?? "";

// Create the Octopus provider
var octopusProvider = new OctopusFeatureProvider(new OctopusFeatureConfiguration(octopusFeatureFlagsClientId));

// Set Octopus as the OpenFeature provider
await OpenFeature.Api.Instance.SetProviderAsync(octopusProvider);
```

Each provider's README covers setup for that language.

:::div{.warning}
Projects that use feature flag rules need a minimum provider version. See [OpenFeature providers](/docs/feature-flags/providers) for the versions.
:::

Next, give your application its client identifier during deployment.

## Supply the client identifier during deployment

The client identifier is a [JWT](https://jwt.io/introduction) that names the project, environment, and tenant (if applicable) your application belongs to. Octopus provides it in the `Octopus.FeatureFlags.ClientIdentifier` variable, so you can inject the right value for each environment and tenant as you deploy.

**Before you begin**

You'll need:

- A deployment step that can substitute Octopus variables into your application's configuration, such as [structured configuration variables](/docs/projects/steps/configuration-features/structured-configuration-variables-feature) or [substitute variables in templates](/docs/projects/steps/configuration-features/substitute-variables-in-templates).

To supply the client identifier during deployment:

1. In your application's configuration file, add a setting for the client identifier with the value `#{Octopus.FeatureFlags.ClientIdentifier}`.
2. In your deployment process, turn on variable substitution for that configuration file.
3. Deploy a release to the environment.

For example, an `appsettings.json` file could contain:

```json
{
  "FeatureFlags": {
    "ClientId": "#{Octopus.FeatureFlags.ClientIdentifier}"
  }
}
```

The deployed configuration file contains a client identifier for the environment, and tenant if applicable, that you deployed to.

:::div{.hint}
Earlier versions of these docs used the variable `Octopus.FeatureToggles.ClientIdentifier`. It still works as a deprecated alias of `Octopus.FeatureFlags.ClientIdentifier`.
:::

## Get a client identifier for an application Octopus doesn't deploy

If Octopus doesn't deploy your application, or you can't inject the client identifier during deployment, you can generate one in the Octopus Web Portal and add it to your configuration yourself.

To get a client identifier:

1. From your project, select **Feature Flags**.
2. Open the overflow menu and select **Preview Client Identifiers**.
3. Select the **Environment**, and the **Tenant** if your project uses tenants.
4. Copy the client identifier into your application's configuration.

![Client identifier preview menu item](/docs/img/feature-flags/client-identifier-preview-menu-item.png)

:::div{.warning}
A generated client identifier doesn't carry the version of a deployed release. Any [**Minimum version**](/docs/feature-flags/rules#rule-conditions) conditions on flags will be ignored.
:::

## Evaluate a feature flag

Your application asks OpenFeature for a flag's value by its slug wherever it needs to decide whether to show the feature.

To evaluate a feature flag:

1. From your project, select **Feature Flags**, then select the flag.
2. Copy the flag's **Slug**.
3. In your application, call the OpenFeature client with the slug and a default value.

For example, to evaluate the flag with the slug `dark-mode` in C#:

```cs
var featureClient = OpenFeature.Api.Instance.GetClient();
var darkModeEnabled = await featureClient.GetBooleanValueAsync("dark-mode", false);
```

The second argument is the default value your code uses if it can't reach the Octopus feature flag service. To learn how it differs from the default value you set in Octopus, see [Default values](/docs/feature-flags/how-evaluation-works#default-values).

## Turn on a feature flag for an environment

A new flag returns its default value everywhere until you add an environment to it. Adding an environment gives the flag a switch for that environment, which turns the flag on for everyone there.

**Before you begin**

You'll need:

- An environment in one of your project's lifecycles.

To turn on a feature flag for an environment:

1. From your project, select **Feature Flags**, then select the flag.
2. In the **Environments** section, select **Add Environment**.
3. Select the environment.
4. Save the flag.

The environment appears in the flag's environment list with its switch on, and applications in that environment get `true` for the flag.

To turn the flag on for only some users in the environment, add rules. See [Targeting users with feature flag rules](/docs/feature-flags/rules).

## Related links

- [Feature flags](/docs/feature-flags)
- [How feature flag evaluation works](/docs/feature-flags/how-evaluation-works)
- [Targeting users with feature flag rules](/docs/feature-flags/rules)
- [OpenFeature providers](/docs/feature-flags/providers)
