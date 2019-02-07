---
title: Export
description: Using the Octo.exe command line tool to export items from one Octopus Deploy Server to import into another.
position: 5
---

This command allows you to export items from one Octopus Deploy Server and import them into another Octopus Deploy Server.

We currently support exporting/importing:

- Projects
- Releases

Usage:

```text
Usage: octo export [<options>]

Where [<options>] is any of:

Export:

      --type=VALUE           The type to export
      --filePath=VALUE       The full path and name of the export file
      --project=VALUE        [Optional] Name of the project
      --name=VALUE           [Optional] Name of the item to export
      --releaseVersion=VALUE [Optional] The version number, or range of
                             version numbers to export

Common options:

      --help                 [Optional] Print help for a command
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, only valid
                             option is json
      --server=VALUE         [Optional] The base URL for your Octopus Server -
                              e.g., http://your-octopus/. This URL can also
                             be set in the OCTOPUS_CLI_SERVER environment
                             variable.
      --apiKey=VALUE         [Optional] Your API key. Get this from the user
                             profile page. Your must provide an apiKey or
                             username and password. If the guest account is
                             enabled, a key of API-GUEST can be used. This
                             key can also be set in the OCTOPUS_CLI_API_KEY
                             environment variable.
      --user=VALUE           [Optional] Username to use when authenticating
                             with the server. Your must provide an apiKey or
                             username and password. This Username can also be
                             set in the OCTOPUS_CLI_USERNAME environment
                             variable.
      --pass=VALUE           [Optional] Password to use when authenticating
                             with the server. This Password can also be set
                             in the OCTOPUS_CLI_PASSWORD environment variable.
      --configFile=VALUE     [Optional] Text file of default values, with one
                             'key = value' per line.
      --debug                [Optional] Enable debug logging
      --ignoreSslErrors      [Optional] Set this flag if your Octopus Server
                             uses HTTPS but the certificate is not trusted on
                             this machine. Any certificate errors will be
                             ignored. WARNING: this option may create a
                             security vulnerability.
      --enableServiceMessages
                             [Optional] Enable TeamCity or Team Foundation
                             Build service messages when logging.
      --timeout=VALUE        [Optional] Timeout in seconds for network
                             operations. Default is 600.
      --proxy=VALUE          [Optional] The URI of the proxy to use, eg
                             http://example.com:8080.
      --proxyUser=VALUE      [Optional] The username for the proxy.
      --proxyPass=VALUE      [Optional] The password for the proxy. If both
                             the username and password are omitted and
                             proxyAddress is specified, the default
                             credentials are used.
      --space=VALUE          [Optional] The name of a space within which this
                             command will be executed. The default space will
                             be used if it is omitted.
      --logLevel=VALUE       [Optional] The log level. Valid options are
                             verbose, debug, information, warning, error and
                             fatal. Defaults to 'debug'.
```

## Exporting a Project {#Export-Exportingaproject}

The following options are required when exporting a project.

**project export options**

```powershell
--type				The type of object to export
--filePath			The full path and name of the export file
--name				Name of the project to export

```

Usage:

```powershell
octo export --server=http://octopusdeploy/api --apiKey=ABCDEF123456 --type=project --name=ProjectName --filePath=C:\path\to\export\file.json
```

### Project Export Output {#Export-ProjectExportOutput}

```powershell
Octopus Deploy Command Line Tool, version 1.0.0.0

Handshaking with Octopus Server: http://localhost/Octopus
Handshake successful. Octopus version: 2.4.4.43; API version: 3.0.0
Finding exporter 'project'
Beginning the export
Finding project: OctoFX Rate Service
Finding project group for project
Finding variable set for project
Finding deployment process for project
Finding NuGet feed for deployment process...
Finding NuGet feed for step Database
Finding NuGet feed for step Rate Service
Export file C:\tmp\OctoFX_Rate_Service.json successfully created.
```

### Project Export File Format {#Export-ProjectExportFileFormat}

```json
{
  // This contains the basic settings for the project you have exported.
  // If the project already exists on your other Octopus Deploy Server, then it will be updated with the new settings from the exported project.
  "Project": {
    ...
  },
 
  // This is used as a reference when importing to ensure that the same project group exists on your other Octopus Deploy Server.
  // If it doesn't already exist, you will need to create it.
  "ProjectGroup": {
    ...
  },
 
  // This contains the variables that have been created for the exported project.
  // If the project already existed and has variables set, these will be replaced with the variables from the project that is being imported.
  // Sensitive variable values will NOT be imported.
  "VariableSet": {
    ...
  },
 
  // This is used as a reference when importing to ensure that the same NuGet feed exists on your 
  // target Octopus Deploy Server.
  "NuGetFeeds": [
    ...
  ],
 
  // This contains the deployment process for the exported project.
  // If the project already existed and had a deployment process setup, this will be replaced with 
  // the deployment process from the project that is being imported.
  "DeploymentProcess": {
    ...
  },
 
  // This contains any library variable sets that are used by the project.
  // These are included as a reference when importing to ensure that the same 
  // Library Variable Set exists on your other Octopus Deploy Server.
  "LibraryVariableSets": [
    ...
  ],
 
  // Metadata about the export: when it was exported, what version of Octopus was used, etc.
  "$Meta": {
    ...
  }
}
```

:::warning
**Sensitive variable values will not be imported**
When the project variables contain values marked 'sensitive', their values will not be exported. The variable will be created with an empty value, and you can then modify the variables manually, typing in the new sensitive values once you have imported the project. If the variable already exists on a re-import and has a value, the value will be kept.
:::

## Exporting a Release, or Range of Releases {#Export-Exportingarelease,orrangeofreleases}

The following options are required when exporting releases.

**release export options**

```powershell
--type				The type of object to export
--filePath			The full path and name of the export file
--project			Name of the project to export
--releaseVersion	The release number, or range of release numbers to export
```

Usage for a release:

```powershell
octo export --server=http://octopusdeploy/api --apiKey=ABCDEF123456 --type=release --project=ProjectName --releaseVersion=1.0.0 --filePath=C:\path\to\export\file.json
```

Usage for a range of releases:

```powershell
octo export --server=http://octopusdeploy/api --apiKey=ABCDEF123456 --type=release --project=ProjectName --releaseVersion=1.0.0-1.0.5 --filePath=C:\path\to\export\file.json
```

### Release Export Output {#Export-ReleaseExportOutput}

```powershell
Octopus Deploy Command Line Tool, version 1.0.0.0

Handshaking with Octopus Server: http://localhost/Octopus
Handshake successful. Octopus version: 2.4.4.43; API version: 3.0.0
Finding exporter 'release'
Beginning the export
Finding project: OctoFX Rate Service
Finding releases for project...
Found release 2.7.2067
Export file C:\tmp\OctoFX_Rate_Service_release.json successfully created.
```

### Release Export File Format {#Export-ReleaseExportFileFormat}

```json
{
  // This contains the list of the settings for a release/range of releases that have been exported.
  "Items": [
    {
      ...
      "Version": "2.7.2067",
      ...
    }
  ],
  // The metadata about the export, this is used the same way as for exporting a project.
  "$Meta": {
    ...
  }
}
```
