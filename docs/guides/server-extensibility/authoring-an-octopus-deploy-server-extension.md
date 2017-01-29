---
title: Authoring an Octopus Deploy server extension
---

:::hint
Server extensibility is available in Octopus Deploy 3.5 and later
:::

## Octopus.Server.Extensibility {#AuthoringanOctopusDeployserverextension-Octopus.Server.Extensibility}

This is the key NuGet package you will need in order to build an Octopus Deploy server extension.

### Octopus.Server.Extensibility.Extensions {#AuthoringanOctopusDeployserverextension-Octopus.Server.Extensibility.Extensions}

This namespace contains the interfaces and structures an extension can implement, which the Octopus Deploy server will go looking for.

The key interface to be aware of is **IOctopusExtension**, as this forms the entry point for your extension and without it the server cannot load your extension.  An example of its usage is as follows:

```csharp
    [OctopusPlugin("Directory Services", "Octopus Deploy")]
    public class DirectoryServicesExtension : IOctopusExtension
    {
        public void Load(ContainerBuilder builder)
        {

```

The second important component here is the **OctopusPluginAttribute**, which provides the description and author metadata for the extension.

Octopus Deploy itself uses Autofac as its IoC container, and as such the extensions are provided with the container builder during startup, so they can register their own internal services.

### Extension Configuration {#AuthoringanOctopusDeployserverextension-ExtensionConfiguration}

Many extensions will want to store configuration related to their own specific functionality, certainly all of the Octopus Deploy extensions do.  To facilitate this, the server provides the extensions the ability to register their need to store a configuration object in the **Configuration** table in the database. Below is an example of a configuration object and its mapping class:

```csharp
    public class DirectoryServicesConfiguration : IId
    {
        public string Id { get; set; }

        public bool IsEnabled { get; set; }
        public string ActiveDirectoryContainer { get; set; }
        public AuthenticationSchemes AuthenticationScheme { get; set; }
        public bool AllowFormsAuthenticationForDomainUsers { get; set; }
    }

    public class DirectoryServicesConfigurationMapping : IConfigurationDocumentMapper
    {
        public Type GetTypeToMap() => typeof(DirectoryServicesConfiguration);
    }

```

Things to note here are:

- the configuration object is a POCO stored as serialised Json in the database, so properties that are enums (as above) or POCOs themselves are supported.
- the configuration object itself must implement IId, to provide the Id for the Json data.  This is typically a constant unique to your extension.
- the mapping class must be registered as an **IConfigurationDocumentMapper** in Autofac when the extension is loaded.

#### Configuration Stores and the Configure Command {#AuthoringanOctopusDeployserverextension-ConfigurationStoresandtheConfigureCommand}

Now that your extension has configuration, how do you set the configuration values?  The pattern we're using involves a Configuration Store and a class that implements the **IContributeToConfigureCommand** interface.  The **IContributeToConfigureCommand** interface is the key part. The store is a pattern that we've found works well for us (because in some cases we have data that may need to be migrated from the server.config into the DB), but is not mandatory.  An example of an extension contributing to the configure command is as follows:

```csharp
    public class DirectoryServicesConfigureCommands : IContributeToConfigureCommand, IHandleLegacyWebAuthenticationModeConfigurationCommand
    {
        readonly ILog log;
        readonly IDirectoryServicesConfigurationStore activeDirectoryConfiguration;

        public DirectoryServicesConfigureCommands(
            ILog log,
            IDirectoryServicesConfigurationStore activeDirectoryConfiguration)
        {
            this.log = log;
            this.activeDirectoryConfiguration = activeDirectoryConfiguration;
        }

        public IEnumerable<ConfigureCommandOption> GetOptions()
        {
            yield return new ConfigureCommandOption("activeDirectoryIsEnabled=", "Set whether active directory is enabled.", v =>
            {
                var isEnabled = bool.Parse(v);
                activeDirectoryConfiguration.SetIsEnabled(isEnabled);
                log.Info($"Active directory IsEnabled set to: {isEnabled}");
            });
            yield return new ConfigureCommandOption("activeDirectoryContainer=", "Set the active directory container used for authentication.", v =>
            {
                activeDirectoryConfiguration.SetActiveDirectoryContainer(v);
                log.Info($"Active directory container set to: {v}");
            });
            yield return new ConfigureCommandOption("webAuthenticationScheme=", "When Domain authentication is used, specifies the scheme (Basic, Digest, IntegratedWindowsAuthentication, Negotiate, Ntlm)", v =>
            {
                var scheme = (AuthenticationSchemes) Enum.Parse(typeof(AuthenticationSchemes), v);
                activeDirectoryConfiguration.SetAuthenticationScheme(scheme);
                log.Info("Web authentication scheme: " + scheme);
            });
            yield return new ConfigureCommandOption("allowFormsAuthenticationForDomainUsers=", "When Domain authentication is used, specifies whether the HTML-based username/password form can be used to sign in.", v =>
            {
                var allowFormsAuthenticationForDomainUsers = bool.Parse(v);
                activeDirectoryConfiguration.SetAllowFormsAuthenticationForDomainUsers(allowFormsAuthenticationForDomainUsers);
                log.Info("Allow forms authentication for domain users: " + allowFormsAuthenticationForDomainUsers);
            });
        }

```

#### Services Provided by the Host {#AuthoringanOctopusDeployserverextension-ServicesProvidedbytheHost}

This section contains the interfaces and structures related to 'services' that the extensions can consume from the Octopus Deploy server itself.  In this section, we'll detail a couple of interfaces you're most likely to need. To use them install the relevant NuGet package and take a dependency in your extension constructor.

#### ILog from [Octopus.Diagnostics](https://www.nuget.org/packages/Octopus.Diagnostics/) {#AuthoringanOctopusDeployserverextension-ILogfromOctopus.Diagnostics}

This interface provides access to the server's logging infrastructure, so your extension can log Info, Warnings, Errors etc.

#### IKeyValueStore from [Octopus.Configuration](https://www.nuget.org/packages/Octopus.Configuration/) {#AuthoringanOctopusDeployserverextension-IKeyValueStorefromOctopus.Configuration}

This interface provides access to the server.config XML file, should your extension need to read/write configuration values there.

## Building the extension {#AuthoringanOctopusDeployserverextension-Buildingtheextension}

An extension is simply a .NET dll, so you can build it in any way that you would normally build your .NET code.

## Extension points {#AuthoringanOctopusDeployserverextension-Extensionpoints}

At the moment you can only extend [Authentication](https://github.com/OctopusDeploy/AuthenticationExtensibility) but we plan to expose more of Octopus internals in the future so stay tuned and check this page every now then for updates.

## 'Installing' a custom extension {#AuthoringanOctopusDeployserverextension-&#39;Installing&#39;acustomextension}

Once you've compiled the dll, [installing it is as simple as putting it in the right folder](/docs/guides/server-extensibility/installing-a-custom-server-extension.md) and restarting the Octopus Deploy server.
