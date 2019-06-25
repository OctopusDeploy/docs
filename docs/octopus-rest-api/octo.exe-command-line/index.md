---
title: Octo.exe Command Line
description: Octo.exe is the Octopus command line tool that builds on top of the Octopus REST API.
position: 160
hideInThisSection: true
---

**Octo.exe** is a command line tool that builds on top of the [Octopus Deploy REST API](/docs/octopus-rest-api/index.md).

We provide a number of ways to install Octo onto your machine:

- Using .Net Core CLI as a [global tool](/docs/octopus-rest-api/octo.exe-command-line/install-global-tool.md) (recommended).
- Download from [Octopus downloads page](https://octopus.com/downloads).
- Using [Chocolatey](https://chocolatey.org/packages/OctopusTools)

## Commands {#octo.exeCommandLine-Commands}

`octo.exe` supports the following commands:

- **[clean-environment](/docs/octopus-rest-api/octo.exe-command-line/clean-environment.md)**:  Cleans all Offline Machines from an Environment.
- **[clean-workerpool](/docs/octopus-rest-api/octo.exe-command-line/clean-workerpool.md)**:  Cleans all Offline Workers from a WorkerPool.
- **[create-autodeployoverride](/docs/octopus-rest-api/octo.exe-command-line/create-autodeployoverride.md)**:  Override the release that auto deploy will use.
- **[create-channel](/docs/octopus-rest-api/octo.exe-command-line/create-channel.md)**:  Creates a channel for a project.
- **[create-environment](/docs/octopus-rest-api/octo.exe-command-line/create-environment.md)**:  Creates a deployment environment.
- **[create-project](/docs/octopus-rest-api/octo.exe-command-line/create-project.md)**:  Creates a project.
- **[create-release](/docs/octopus-rest-api/octo.exe-command-line/create-release.md)**:  Creates (and, optionally, deploys) a release.
- **[create-workerpool](/docs/octopus-rest-api/octo.exe-command-line/create-workerpool.md)**:  Creates a pool for workers.
- **[delete-autodeployoverride](/docs/octopus-rest-api/octo.exe-command-line/delete-autodeployoverride.md)**:  Delete auto deploy release overrides.
- **[delete-releases](/docs/octopus-rest-api/octo.exe-command-line/delete-releases.md)**:  Deletes a range of releases.
- **[deploy-release](/docs/octopus-rest-api/octo.exe-command-line/deploy-release.md)**:  Deploys a release.
- **[dump-deployments](/docs/octopus-rest-api/octo.exe-command-line/dump-deployments.md)**:  Writes deployments to an XML file that can be imported in Excel.
- **[export](/docs/octopus-rest-api/octo.exe-command-line/export.md)**:  Exports an object to a JSON file.
- **[import](/docs/octopus-rest-api/octo.exe-command-line/import.md)**:  Imports an Octopus object from an export file.
- **[list-deployments](/docs/octopus-rest-api/octo.exe-command-line/list-deployments.md)**:  List a number of deployments by project, environment or by tenant.
- **[list-environments](/docs/octopus-rest-api/octo.exe-command-line/list-environments.md)**:  List environments.
- **[list-latestdeployments](/docs/octopus-rest-api/octo.exe-command-line/list-latestdeployments.md)**:  List the releases last-deployed in each environment.
- **[list-machines](/docs/octopus-rest-api/octo.exe-command-line/list-machines.md)**:  Lists all machines.
- **[list-projects](/docs/octopus-rest-api/octo.exe-command-line/list-projects.md)**:  Lists all projects.
- **[list-releases](/docs/octopus-rest-api/octo.exe-command-line/list-releases.md)**:  List releases by project.
- **[list-tenants](/docs/octopus-rest-api/octo.exe-command-line/list-tenants.md)**:  List tenants.
- **[list-workerpools](/docs/octopus-rest-api/octo.exe-command-line/list-workerpools.md)**:  List worker pools.
- **[list-workers](/docs/octopus-rest-api/octo.exe-command-line/list-workers.md)**:  Lists all workers.
- **[pack](/docs/octopus-rest-api/octo.exe-command-line/pack.md)**:  Creates a package (.nupkg or .zip) from files on disk, without needing a .nuspec or .csproj.
- **[promote-release](/docs/octopus-rest-api/octo.exe-command-line/promote-release.md)**:  Promotes a release.
- **[push](/docs/octopus-rest-api/octo.exe-command-line/push.md)**:  Pushes a package (.nupkg, .zip, .tar.gz, etc.) package to the built-in NuGet repository in an Octopus Server.
- **[push-metadata](/docs/octopus-rest-api/octo.exe-command-line/push-metadata.md)**:  Pushes package metadata to Octopus Server.
- **[version](/docs/octopus-rest-api/octo.exe-command-line/version.md)**:  Output Octo command line tool version.

## General Usage {#Octo.exeCommandLine-Generalusage}

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
octo <command> --help
```

Arguments are not case sensitive and can take the following forms:

```powershell
--project OctoFX                # Space between argument name and value
--project=OctoFX                # Equal sign between argument name and value
--project "OctoFX Web Site"     # Argument values with spaces need to be quoted
"--project=OctoFX Web Site"     # If using equals, quote both the name and value, not just the value
```

All commands require you to pass the URL of the Octopus Server's API endpoint, and an API key which is used to authenticate you.

```bash
octo ... --server http://your-octopus-server/ --apiKey API-ABCDEF123456
```

Most commands also support [JSON formatted output](formatted-output.md).

:::success
**Creating API keys**
Learn about [how to create an API key](/docs/octopus-rest-api/how-to-create-an-api-key.md).
:::

:::hint
Octo.exe is built and maintained by the Octopus Deploy team, but it is also open source. You can [view the Octopus Clients project on GitHub](https://github.com/OctopusDeploy/OctopusClients).
:::

The server url, api key, username and password can be set as the environment variables `OCTOPUS_CLI_SERVER`, `OCTOPUS_CLI_API_KEY`, `OCTOPUS_CLI_USERNAME` and `OCTOPUS_CLI_PASSWORD` respectively. Values set via command line arguments take precedence over environment variables.
