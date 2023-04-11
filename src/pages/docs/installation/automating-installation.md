---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Automating Octopus installation
description: Information on how to install and configure an Octopus Server in a fully automated way from the command line.
navOrder: 7
---

Octopus comes in a MSI that can be deployed via group policy or other means.

## Downloads

You can use the permanent link below to download the Octopus Server.

!include <server-downloads>

Automating the installation of Octopus Server is a three step process.

### 1. Install the MSI on a temporary machine interactively
In this step we install the MSI on a machine interactively so that we can complete the wizard to add a new instance.

Follow all the steps in the [installation process](/docs/installation/index.md#install-octopus), but in the final step copy the generated script into a new file. **Do not click Install**.

Save the script into a new file.

Here is an example of what the script might look like:
```bash
"[INSTALLLOCATION]\Octopus.Server.exe" create-instance --instance "<instance name>" --config "<new instance config path>" --serverNodeName "<machine name>"
"[INSTALLLOCATION]\Octopus.Server.exe" database --instance "<instance name>" --connectionString "<database connection string>" --create
"[INSTALLLOCATION]\Octopus.Server.exe" configure --instance "<instance name>" --upgradeCheck "True" --upgradeCheckWithStatistics "True" --usernamePasswordIsEnabled "True" --webForceSSL "False" --webListenPrefixes "<url to expose>" --commsListenPort "10943"
"[INSTALLLOCATION]\Octopus.Server.exe" service --instance "<instance name>" --stop
"[INSTALLLOCATION]\Octopus.Server.exe" admin --instance "<instance name>" --username "<admin username>" --email "<admin email>" --password "<admin password>"
"[INSTALLLOCATION]\Octopus.Server.exe" license --instance "<instance name>" --licenseBase64 "<a very long license string>"
"[INSTALLLOCATION]\Octopus.Server.exe" service --instance "<instance name>" --install --reconfigure --start --dependOn "MSSQLSERVER"
```

### 2. Install MSI silently

To install the MSI silently:

```bash
msiexec /i Octopus.<version>.msi /quiet RUNMANAGERONEXIT=no
```

By default, the Octopus files are installed under **%programfiles%**. To change the installation directory, you can specify:

```bash
msiexec /i Octopus.<version>.msi /quiet RUNMANAGERONEXIT=no INSTALLLOCATION="<install path>"
```

### 3. Configuration

The MSI installer simply extracts files and adds some shortcuts and event log sources. The actual configuration of Octopus Server is done later, via the script you saved above.

To run the script start an admin shell prompt and execute the script, this should apply all the settings to the new instance.

## Desired State Configuration

Octopus can also be installed via Desired State Configuration (DSC). Using the module from the [OctopusDSC GitHub repository](https://www.powershellgallery.com/packages/OctopusDSC).

The following PowerShell script will install an Octopus Server listening on port `80`. Make sure the OctopusDSC module is on your `$env:PSModulePath`:

```powershell
Configuration SampleConfig
{
    Import-DscResource -Module OctopusDSC

    Node "localhost"
    {
        cOctopusServer OctopusServer
        {
            Ensure = "Present"
            State = "Started"

            # Server instance name. Leave it as 'OctopusServer' unless you have more than one instance
            Name = "OctopusServer"

            # The url that Octopus will listen on
            WebListenPrefix = "http://localhost:80"

            SqlDbConnectionString = "Server=(local)\SQLEXPRESS;Database=Octopus;Trusted_Connection=True;"

            # The admin user to create
            OctopusAdminUsername = "admin"
            OctopusAdminPassword = "<my secret password>"

            # optional parameters
            AllowUpgradeCheck = $true
            AllowCollectionOfAnonymousUsageStatistics = $true
            ForceSSL = $false
            ListenPort = 10943
            DownloadUrl = "https://octopus.com/downloads/latest/WindowsX64/OctopusServer"
        }
    }
}

# Execute the configuration above to create a mof file
SampleConfig

# Run the configuration
Start-DscConfiguration -Path ".\SampleConfig" -Verbose -wait

# Test the configuration ran successfully
Test-DscConfiguration
```

### Settings and properties

To review the latest available settings and properties, refer to the [OctopusDSC Server readme.md](https://github.com/OctopusDeploy/OctopusDSC/blob/master/README-cOctopusServer.md) in the GitHub repository.

## Taking DSC further

DSC can be applied in various ways, such as [Group Policy](https://sdmsoftware.com/group-policy-blog/desired-state-configuration/desired-state-configuration-and-group-policy-come-together/), a [DSC Pull Server](https://docs.microsoft.com/en-us/powershell/scripting/dsc/pull-server/pullserver), [Azure Automation](https://docs.microsoft.com/en-us/azure/automation/automation-dsc-overview), or even via configuration management tools such as [Chef](https://docs.chef.io/resource_dsc_resource.html) or [Puppet](https://github.com/puppetlabs/puppetlabs-dsc). Learn more about Desired State Configuration at [Windows PowerShell Desired State Configuration ](https://docs.microsoft.com/en-us/powershell/scripting/dsc/overview/overview).
