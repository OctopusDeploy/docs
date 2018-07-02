---
title: Configure Environment-specific configuration transforms while keeping sensitive values in Octopus
description: How to configure environment-specific configuration transforms while keeping sensitive values in Octopus.
position: 50
---

Octopus Deploy has great support for transforming configuration files based on the environment or machine you're deploying to.

As an example scenario, let's assume we have a web application that's being deployed to a Development, Staging, and Production environment, and you want to change your `Web.Config` file to reflect environment-specific values.

There are three Octopus features that are commonly used to help provide an environment-specific configuration to your deployed application.

1. Use the [Configuration Variables](/docs/deployment-process/configuration-features/configuration-variables.md) feature to automatically replace `appSettings`, `applicationSettings`, and `connectionStrings` values in your `.config` files with ones from your variables list.
The limitation of this technique is you're restricted to these two configuration sections. If you have settings in other parts of your configuration file, this technique won't work.
2. Use the [Substitute Variables](/docs/deployment-process/configuration-features/substitute-variables-in-files.md) in Files feature to replace any values specified by the `#{variable}` syntax in any text-based file.
The limitation of this technique is the Octopus variable syntax needs to already be in the file. If you're relying on that config file for your development, this can be difficult to manage.
3. Use the [Configuration Transforms](/docs/deployment-process/configuration-features/configuration-transforms.md) feature to transform your XML configuration files for each environment or machine either based on conventions or explicitly.
The problem with this method is twofold. First, the transform files need to be in the nuget package, which probably means they'll be in source control. If there are sensitive values, that means the developers will have access to them. In addition, you can't easily tell what transformations are taking place from within Octopus.
Second, for a large number of environments or machines, you'll need to manage a large number of transform files.

To solve these limitations, you can combine the techniques.

## One Transform + Variable Replacement

One common technique is to combine options 2 and 3 above.

You would have a single configuration transformation file in your project. If it's named `Web.Release.Config`, the transformation will be applied to your `Web.Config` file automatically, however you can have your own filename and apply it to any config file you like.

This transform file can contain `#{variable}` values. Because your config will only get transformed on deployment, you can safely work with your `Web.Config` file during development, and you can keep sensitive variables like production passwords out of source control.

### The Process

It's important to note that the variable substitution occurs before your configuration transformation. That means you'll have to target your transform files for variable substitution by adding them to the **Target files** setting.

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

Finally, we have the following variables configured:

![](/docs/images/3049047/3278465.png "width=500")

On deployment to your Staging environment, your process would go like this:

1. Your package, complete with your original `Web.Config` and your `Web.Release.Config` transform file, will be extracted to the target.
2. Variable Substitution will run against your `Web.Release.Config` file (assuming it's been listed in the Target files setting)
This will change the `#{OctoFXDatabase}` string to the Staging connection string, and will insert `False` into the `TestMode` element.
3. Then, the Config Transformation feature will run and apply this new transform file to your `Web.Config`.

The end result is a correctly transformed configuration for your staging environment. All without a specific Staging transform file, and while keeping your `Web.Config` file clean for development.
