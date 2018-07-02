---
title: Server Configuration
description: The Octopus Server Configuration screen is available from Configuration > Nodes > Configuration Settings and allows administrators to see which server extensions are enabled for the Octopus Server.
position: 160
---

## Server Extensions Configuration {#ServerConfiguration-ServerExtensionsConfiguration}

The Server Configuration screen is available from {{Configuration,Nodes,Configuration Settings}} and allows administrators to see which [server extensions](/docs/api-and-integration/server-extensibility/index.md) are enabled for the Octopus Server. To learn more about customizing server extensions, please see [the documentation](/docs/api-and-integration/server-extensibility/customising-an-octopus-deploy-server-extension.md).

Each configuration value has properties that will determine whether it is shown on this Server Configuration screen.

For example, any server extensions conforming to the **IHasConfigurationSettings** interface will contribute configuration values:

```cs
namespace Octopus.Server.Extensibility.Extensions.Infrastructure.Configuration
{
    public interface IHasConfigurationSettings
    {
        string ConfigurationSetName { get; }
        IEnumerable<ConfigurationValue> GetConfigurationValues();
    }
}
```

Where each **ConfigurationValue** is an object as follows:

```cs
namespace Octopus.Server.Extensibility.Extensions.Infrastructure.Configuration
{
    public class ConfigurationValue
    {
        public ConfigurationValue(string key, string value, bool showInPortalSummary, string description = "", bool isSensitive = false);
        protected ConfigurationValue();
        public string Description { get; set; }
        public bool IsSensitive { get; set; }
        public string Key { get; set; }
        public bool ShowInPortalSummary { get; set; }
        public string Value { get; set; }
    }
}
```

Any configuration values contributed by server extensions that have set the "ShowInPortalSummary" property to **True** will be shown in this list with their "Description" property. Any configuration values marked as "IsSensitive" will be blanked out on this screen with \*\*\*\*.

Checkout the [UsernamePasswordAuthenticationProvider](https://github.com/OctopusDeploy/UsernamePasswordAuthenticationProvider/blob/master/source/Octopus.Server.Extensibility.Authentication.UsernamePassword/Configuration/UsernamePasswordConfigurationStore.cs) and [DirectoryServicesAuthenticationProvider](https://github.com/OctopusDeploy/DirectoryServicesAuthenticationProvider/blob/master/source/Octopus.Server.Extensibility.Authentication.DirectoryServices/Configuration/DirectoryServicesConfigurationStore.cs) for examples of how these ConfigurationValues are used.

### ShowInPortalSummary {#ServerConfiguration-ShowInPortalSummary}

The configuration values provided via this interface actually serve 2 purposes.  The first is that they are displayed by the [Show Configuration](/docs/administration/show-configuration.md) command (all values are displayed by the command).  The second is being displayed on the Server Configuration page in the web UI (only value with ShowInPortalSummary will be displayed).

## Publicly Accessible URL {#ServerConfiguration-PubliclyAccessibleURL}

This Server Configuration screen also allows administrators to edit the "publicly accessible URL" for your Octopus Server. This value is used by email notifications in [Subscriptions](/docs/administration/subscriptions/index.md) and should be set to the publicly-available URL of your Octopus Server if you wish to include a link to your Octopus Server in your subscription emails. E.g. **https://your-octopus-server.com:8080/**

The subscriptions engine will use this value to include a link to your Octopus Server's audit page by appending the audit screen route to the end of this URL.
