---
title: Configuration Variables
description: Configuring applications to work in specific environments is an essential part of deploying applications with Octopus Deploy and this can include updating database connection strings and app settings.
position: 60
---

This feature can be enabled for package deploy steps.

![Configuration variables screenshot](configuration-variables.png)

If a [variable](/docs/deployment-process/variables/index.md) is defined in the Octopus web portal, and an **appSettings, applicationSettings** or **connectionStrings** element exists for it in any of your **.config** files, Tentacle will automatically replace the value after extracting your package.

For example, suppose you have this configuration file:

```xml
<configuration>
  <appSettings>
    <add key="AWSAccessKey" value="testkey"/>
    <add key="AWSSecretKey" value="testsecret"/>
  </appSettings>
  <connectionStrings>
    <add name="DBConnectionString" connectionString="Server=(local)\SQLExpress;Database=OnlineStore;Integrated Security=SSPI" />
  </connectionStrings>
  <applicationSettings>
    <AppSettings.Properties.Settings>
      <setting name="WelcomeMessage" serializeAs="String">
        <value>Hello</value>
      </setting>
    </AppSettings.Properties.Settings>
  </applicationSettings>
</configuration>
```

The variables **AWSAccessKey**, **AWSSecretKey**, and **DBConnectionString** can be access in the project menu under variables.

After deploying to an environment named "**Production**", Octopus will have updated the file to:

```xml
<configuration>
  <appSettings>
    <add key="AWSAccessKey" value="ABCDEFGHIJKLMNOP"/>
    <add key="AWSSecretKey" value="MfOWQdSJWi8JDYc/6YmoaHafz8jByBl9aksCoSLB"/>
  </appSettings>

  <connectionStrings>
    <add name="DBConnectionString" connectionString="Server=PRDSQL02;Database=OnlineStore;Integrated Security=SSPI" />
  </connectionStrings>
</configuration>
```

:::warning
Variables marked sensitive (`AWSSecretKey` in this example) will be decrypted and written in clear-text to the configuration files just like normal variables.
:::

The same concept applies to strongly-typed **applicationSettings** using the [Application Settings Architecture](https://msdn.microsoft.com/en-us/library/8eyb2ct1.aspx) built in to .NET. An equivalent example would be:

```xml
<configuration>
  <applicationSettings>
    <MyApplication.Properties.Settings>
      <setting name="AWSAccessKey" serializeAs="String">
        <value>ABCDEFGHIJKLMNOP</value>
      </setting>
      <setting name="AWSSecretKey" serializeAs="String">
        <value>MfOWQdSJWi8JDYc</value>
      </setting>
      <setting name="DBConnectionString" serializeAs="String">
        <value>Server=PRDSQL02;Database=OnlineStore;Integrated Security=SSPI</value>
      </setting>
    </MyApplication.Properties.Settings>
  </applicationSettings>
</configuration>
```

:::success
Values are matched based on the **key** attribute for **appSettings**, and the **name** element for **applicationSettings** and **connectionStrings**.
:::

## Replacing Variables Outside appSettings, applicationSettings and connectionStrings {#Configurationfiles-VariablesInFilesReplacingvariablesoutsideappSettings,applicationSettingsandconnectionStrings}

There may be other variables you would like Octopus to replace in your configuration files that are outside both the appSettings and connectionStrings areas.

There are three ways you can do this, two of which involve using [Octopus Variables](/docs/deployment-process/variables/index.md).

1. Insert `#{OctopusVariables}` where you would like the replacement to happen and use the [Substitute Variables in Files](/docs/deployment-process/configuration-features/substitute-variables-in-files.md) feature in the package step (see below for sample)
2. Insert `#{OctopusVariables}` where you would like the replacement to happen and then use the [Regular Expression Find and Replace](https://library.octopusdeploy.com/step-templates/0bef8c07-5739-4030-8c04-287ceeb51153/actiontemplate-file-system-regular-expression-find-and-replace-(updated)) library template (this means you can replace any Octopus Variable in any file outside of the package step, the only distinction to the first option)
3. Write and use a PowerShell script to find and replace variables inside of your configuration files

```powershell
    <authentication mode="Forms">
      <forms loginUrl="#{LoginURL}" timeout="2880" />
    </authentication>
```

There are pros and cons to each of these methods. For the first two it can break your configuration files locally. But if you make use of environment transforms (see below) you can avoid this. See the [Substitute Variables in Files](/docs/deployment-process/configuration-features/substitute-variables-in-files.md) documentation for an example of using Octopus Variables in your config files.

:::success
Using the Substitute Variables in Files feature will change the order that variables are replaced. Using Configuration Transformations and Configuration Variables, does the transformation and then replaces variables. Defining files within the substitution will have all of their variables replaced first prior to the transformation. But this will only happen for any configuration or transformation files that are explicitly listed in the Substitute files list. Read about the order of [package step feature ordering here](/docs/deployment-examples/deploying-packages/package-deployment-feature-ordering.md).
:::
