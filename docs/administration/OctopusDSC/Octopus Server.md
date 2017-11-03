OctopusDSC is an in-house PowerShell module designed for the automation of your Octopus infrastructure. The following documentation page will cover some basic examples of using OctopusDSC to automate the installation and configuration of an Octopus Server instance. Below is a sample script with a basic example of using OctopusDSC to install and configure the Octopus Server service.

:::note
Before continuing, please ensure that you have [installed the OctopusDSC PowerShell module](link to main page).
:::

##Install and Configure Octopus Deploy Server.

Below is a basic script to get you going. First, ensure the OctopusDSC module is on your `$env:PSModulePath`. Then you can create and apply configuration like this.

```PowerShell
Configuration SampleConfig
{
    Import-DscResource -Module OctopusDSC

    Node "localhost"
    {
        cOctopusServer OctopusServer
        {
            Ensure = "Present"
            State = "Started"

            # Server instance name. Leave it as 'OctopusServer' unless you have more
            # than one instance
            Name = "OctopusServer"

            # The url that Octopus will listen on
            WebListenPrefix = "http://localhost:81"

            SqlDbConnectionString = "Server=(local)\SQLEXPRESS;Database=Octopus;Trusted_Connection=True;"

            # The admin user to create
            OctopusAdminUsername = "Admin"
            OctopusAdminPassword = "SuperS3cretPassw0rd"

            # optional parameters
            AllowUpgradeCheck = $true
            AllowCollectionOfAnonymousUsageStatistics = $true
            ForceSSL = $false
            ListenPort = 10943
            DownloadUrl = "https://octopus.com/downloads/latest/WindowsX64/OctopusServer"

            # for pre 3.5, valid values are "UsernamePassword"
            # for 3.5 and above, only "Ignore" is valid (this is the default value)
            LegacyWebAuthenticationMode = "UsernamePassword"

            HomeDirectory = "C:\Octopus"
        }
    }
}

SampleConfig

Start-DscConfiguration .\SampleConfig -Verbose -wait

Test-DscConfiguration
```
:::hint
For more OctopusDSC server scripts and examples, please see our GitHub repository [examples page](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/Examples).
:::hint
You are able to define a custom `DownloadUrl` in your script which can point to internal drives or directories. When doing so, you must ensure that you are pointing directly to the .MSI installer and not the directory.
Example: `DownloadUrl = "\\192.168.10.100\installers\Octopus\Server\Latest\Octopus.3.17.11-x64.msi"`
:::

## Ensure and State settings. -- Better place for this?

When `Ensure` is set to `Present`, the resource will:

1. Download the Octopus Server MSI from the internet
2. Install the MSI
3. Create the database
4. Set the admin username and password
5. Configure with a free licence
6. Start the service

When `Ensure` is set to `Absent`, the resource will:

1. Delete the Octopus Server windows service
2. Uninstall using the MSI if there are no other instances installed on this machine

When `State` is `Started`, the resource will ensure that the Octopus Servr windows service is running. When `Stopped`, it will ensure the service is stopped.

## Properties
Below are the properties that you can define in your cOctopusServerDSC script.

| Property                                 | Type                                     | Default Value                            | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `Ensure`                                 | `string` - `Present` or `Absent`         | `Present`                                | The desired state of the Octopus Server - effectively whether to install or uninstall. |
| `Name`                                   | `string`                                 |                                          | The name of the Octopus Server instance. Use `OctopusServer` by convention unless you have more than one instance. |
| `State`                                  | `string` - `Started` or `Stopped`        | `Started`                                | The desired state of the Octopus Server service. |
| `DownloadUrl`                            | `string`                                 | `https://octopus.com/downloads/latest/WindowsX64/OctopusServer`, `C:\installers\OctopusServer\Latest\Octopus.3.17.11-x64.msi`, `\\192.168.10.100\installers\Octopus\Server\Latest\Octopus.3.17.11-x64.msi` | The url to use to download the msi.      |
| `SqlDbConnectionString`                  | `string`                                 |                                          | The connection string to use to connect to the SQL Server database. |
| `WebListenPrefix`                        | `string`                                 |                                          | A semi-colon (`;`) delimited list of urls on which the server should listen. eg `https://octopus.example.com:81`. |
| `OctopusAdminUsername`                   | `string`                                 |                                          | The name of the administrative user to create on first install. |
| `OctopusAdminPassword`                   | `string`                                 |                                          | The password of the administrative user to create on first install. |
| `AllowUpgradeCheck`                      | `boolean`                                | `$true`                                  | Whether the server should check for updates periodically. |
| `AllowCollectionOfAnonymousUsageStatistics` | `boolean`                                | `$true`                                  | Allow anonymous reporting of usage statistics. |
| `LegacyWebAuthenticationMode`            | `string` - `UsernamePassword`, `Domain` or `Ignore` | `Ignore`                                 | For Octopus version older than 3.5, allows you to configure how users login. For 3.5 and above, this must be set to `ignore`. |
| `ForceSSL`                               | `boolean`                                | `$false`                                 | Whether SSL should be required (HTTP requests get redirected to HTTPS) |
| `ListenPort`                             | `int`                                    | `10943`                                  | The port on which the Server should listen for communication from `Polling` Tentacles. |
| `AutoLoginEnabled`                       | `boolean`                                | `$false`                                 | If an authentication provider is enabled that supports pass through authentcation (eg Active Directory), allow the user to automatically sign in. Only supported from Octopus 3.5. |

## Drift

Currently the resource does not consider `SqlDbConnectionString`, `OctopusAdminUsername` or `OctopusAdminPassword` when testing for drift.

This means that the server will be automatically reconfigured if you change any properties except the ones listed above.

If the DownloadUrl property changes, it will detect the configuration drift and upgrade the Server as appropriate. However, if you leave it as default (ie 'install latest'), it will not upgrade when a new version is released - it only actions on change of the property.

However if you need to change any of the `SqlDbConnectionString`, `OctopusAdminUsername` or `OctopusAdminPassword`properties, you will need to uninstall then reinstall the server (by changing `Ensure` to `Absent` and then back to `Present`).

##Authentication automation with OctopusDSC -- Wondering what extra information I should put here
We also currently have the following resources for automating the configuration of various authentication methods/providers. See the below list for links to our script repository:
[cOctopusServerActiveDirectoryAuthentication](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerActiveDirectoryAuthentication)
[cOctopusServerAzureADAuthentication](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerAzureADAuthentication)
[cOctopusServerGoogleAppsAuthentication](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerGoogleAppsAuthentication)
[cOctopusServerGuestAuthentication](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerGuestAuthentication)
[cOctopusServerOktaAuthentiaction](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerOktaAuthentication)
[cOctopusServerUsernamePasswordAuthentication](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerUsernamePasswordAuthentication)
[cOctopusServerServerWatchdog](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerWatchdog)

##Links
If you would like to contribue to the OctopusDSC open source repository, please follow the instructions on this documentaitons parent page.

[Automating Infrastructure with DSC](link to main page)
[Installing Octopus Server via DSC](link to tentacle dsc page)