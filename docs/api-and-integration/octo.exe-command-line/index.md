---
title: Octo.exe Command Line
position: 6
---


**Octo.exe** is a command line tool that builds on top of the [Octopus Deploy HTTP API](/docs/api-and-integration/octopus-rest-api.md).


The latest version of Octo.exe can always be downloaded from the [Octopus downloads page](https://octopus.com/downloads) or [installed via Chocolatey](http://chocolatey.org/packages/OctopusTools).

## Commands


Octo.exe supports the following commands:

- **`create-release`**: [Learn more](/docs/api-and-integration/octo.exe-command-line/creating-releases.md)
- **`deploy-release`**: [Learn more](/docs/api-and-integration/octo.exe-command-line/deploying-releases.md)
- **`promote-release`**: [Learn more](http://docs.octopusdeploy.com/display/OD/Promoting+releases)
- **`create-project`**: [Learn more](http://docs.octopusdeploy.com/display/OD/Creating+projects)
- **`create-environment`**: [Learn more](http://docs.octopusdeploy.com/display/OD/Creating+environments)
- **`create-channel`**: [Learn more](/docs/api-and-integration/octo.exe-command-line/creating-channels.md)
- **`create-autodeployoverride`**: [Learn more](/docs/api-and-integration/octo.exe-command-line/creating-auto-deploy-overrides.md)
- **`clean-environment`**: [Learn more](/docs/api-and-integration/octo.exe-command-line/cleaning-environments.md)
- `export`: [Learn more](/docs/api-and-integration/octo.exe-command-line/export.md)
- `import`:  [Learn more](/docs/api-and-integration/octo.exe-command-line/import.md)
- `list-machines`: Lists the machines in one or more environments matching one or more statuses
- `list-projects`: Lists all projects on the server
- `list-latestdeployments`: Lists the latest deployments of a project
- `delete-releases`: [Learn more](http://docs.octopusdeploy.com/display/OD/Deleting+releases)
- `delete-autodeployoverride`: [Learn more](/docs/api-and-integration/octo.exe-command-line/creating-auto-deploy-overrides/deleting-auto-deploy-overrides.md)
- **`pack`**: [Learn More](/docs/packaging-applications/nuget-packages/using-octo.exe.md) Creates a NUPKG from files on disk, without needing a .nuspec
- `push`: [Learn more](/docs/api-and-integration/octo.exe-command-line/pushing-packages.md): Pushes a package to the Octopus built-in repository





## General usage


All commands take the form of:

```powershell
octo <command> [<options>]
```


You can see a list of commands using:

```powershell
octo help
```


And you can get help for a specific command using:

```powershell
octo help <command>
```


Arguments are not case sensitive and can take the following forms:

```powershell
--project OctoFX                # Space between argument name and value
--project=OctoFX                # Equal sign between argument name and value
--project "OctoFX Web Site"     # Argument values with spaces need to be quoted
"--project=OctoFX Web Site"     # If using equals, quote both the name and value, not just the value
```


All commands require you to pass the URL of the Octopus Server's API endpoint, and an API key which is used to authenticate you.

```text
octo ... --server http://your-octopus-server/ --apiKey API-ABCDEF123456
```

:::success
**Creating API keys**
Learn about [how to create an API key](/docs/how-to/how-to-create-an-api-key.md).
:::

:::hint
Octo.exe is built and maintained by the Octopus Deploy team, but it is also open source. You can [view the Octopus Tools project on GitHub](https://github.com/OctopusDeploy/Octo.exe).
:::
