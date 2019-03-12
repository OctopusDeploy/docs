---
title: Environment Specific Configuration Transforms with Sensitive Values
description: How to configure environment-specific configuration transforms while keeping sensitive values in Octopus.
position: 30
---

It is possible to combine the configuration features that you use in your deployments. One scenario where this is useful is if you need to provide environment specific configuration that includes sensitive values.

This can be achieved using both the [Substitute Variables in Files](/docs/deployment-process/configuration-features/substitute-variables-in-files.md) feature and the [Configuration Transforms](/docs/deployment-process/configuration-features/configuration-transforms/index.md) features.

## One Transform and Variable Replacement

For example, let's assume we have a web application that's being deployed to Development, Staging, and Production environments, and you want to change your `Web.Config` file to reflect environment-specific values.

To achieve this you would have a single configuration transformation file in your project. If it's named `Web.Release.Config`, the transformation will be applied to your `Web.Config` file automatically, however you can have your own filename and apply it to any config file you like.

This transform file can contain `#{variable}` values. Because your config will only get transformed on deployment, you can safely work with your `Web.Config` file during development, and you can keep sensitive variables like production passwords out of source control.

### The Process

It's important to note that variable substitution occurs before the configuration transformation. This means you need to target your transform files for variable substitution by adding them to the **Target files** setting.

For example, let's assume our `Web.Config` file has a `MyDatabaseConnection` connection string and a special `MyCustomSettingsSection` element. Something like this:

```xml
<?xml version="1.0"?>
<configuration>
  <connectionStrings>
    <add name="MyDatabaseConnection" connectionString="Server=(local)\SQLExpress;Database=OctoFX;Trusted_connection=SSPI"/>
  </connectionStrings>
  <MyCustomSettingsSection>
    <TestMode>True</TestMode>
  </MyCustomSettingsSection>
</configuration>
```

We also have a `Web.Release.Config` transform file with the following contents:

```xml
<?xml version="1.0"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
  <connectionStrings>
    <add name="MyDatabaseConnection" connectionString="#{OctoFXDatabase}" xdt:Transform="SetAttributes" xdt:Locator="Match(name)"/>
  </connectionStrings>
  <MyCustomSettingsSection>
    <TestMode xdt:Transform="Replace">#{RunTestMode}</TestMode>
  </MyCustomSettingsSection>
</configuration>
```

Finally, we have the following [variables](/docs/deployment-process/variables/index.md) configured in Octopus:

| Name       | Value   | Scope   |
| ------------- | ------- | ------ |
| OctoFXDatabase | server=staging-server;Database=OctoFX;Trusted_connection=SSPI | Staging |
| OctoFXDatabase | server=(local)\SQLEXPRESS;Database=OctoFX-Development;Trusted_connection=SSPI | Development |
| OctoFXDatabase | server=prod-server;Database=OctoFx;Trusted_connection=SSPI | Production |
| RunTestMode   | False    | Production, Staging |
| RunTestMode   | True     | Development         |

On deployment to your Staging environment, your process would go like this:

1. Your package, complete with your original `Web.Config` and your `Web.Release.Config` transform file, will be extracted to the target.
2. Variable Substitution will run against your `Web.Release.Config` file (assuming it's been listed in the Target files setting).
This will change the `#{OctoFXDatabase}` string to the Staging connection string, and will insert `False` into the `TestMode` element.
3. Then, the Config Transformation feature will run and apply this new transform file to your `Web.Config`.

The end result is a correctly transformed configuration for your staging environment. All without a specific Staging transform file, and while keeping your `Web.Config` file clean for development.
