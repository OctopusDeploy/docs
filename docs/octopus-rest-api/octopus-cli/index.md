---
title: The Octopus Command Line (CLI)
description: The Octopus CLI (octo) is the Octopus command line tool that builds on top of the Octopus REST API.
position: 160
hideInThisSection: true
---

!include <octopus-cli>

## Commands {#octoCommandLine-Commands}

`octo` supports the following commands:

- **[allow-releaseprogression](/docs/octopus-rest-api/octopus-cli/allow-releaseprogression.md)**: Allows a release to progress to next phase.
- **[build-information](/docs/octopus-rest-api/octopus-cli/build-information.md)**:  Pushes build information to Octopus Server.
- **[clean-environment](/docs/octopus-rest-api/octopus-cli/clean-environment.md)**:  Cleans all Offline Machines from an Environment.
- **[clean-workerpool](/docs/octopus-rest-api/octopus-cli/clean-workerpool.md)**:  Cleans all Offline Workers from a WorkerPool.
- **[create-autodeployoverride](/docs/octopus-rest-api/octopus-cli/create-autodeployoverride.md)**:  Overrides the release that auto deploy will use.
- **[create-channel](/docs/octopus-rest-api/octopus-cli/create-channel.md)**:  Creates a channel for a project.
- **[create-environment](/docs/octopus-rest-api/octopus-cli/create-environment.md)**:  Creates a deployment environment.
- **[create-project](/docs/octopus-rest-api/octopus-cli/create-project.md)**:  Creates a project.
- **[create-release](/docs/octopus-rest-api/octopus-cli/create-release.md)**:  Creates (and, optionally, deploys) a release.
- **[create-workerpool](/docs/octopus-rest-api/octopus-cli/create-workerpool.md)**:  Creates a pool for workers.
- **[delete-autodeployoverride](/docs/octopus-rest-api/octopus-cli/delete-autodeployoverride.md)**:  Deletes auto deploy release overrides.
- **[delete-releases](/docs/octopus-rest-api/octopus-cli/delete-releases.md)**:  Deletes a range of releases.
- **[deploy-release](/docs/octopus-rest-api/octopus-cli/deploy-release.md)**:  Deploys a release.
- **[dump-deployments](/docs/octopus-rest-api/octopus-cli/dump-deployments.md)**:  Writes deployments to an XML file that can be imported in Excel.
- **[export](/docs/octopus-rest-api/octopus-cli/export.md)**:  Exports an object to a JSON file. Deprecated. Please see [https://g.octopushq.com/DataMigration](https://g.octopushq.com/DataMigration) for alternative options.
- **[import](/docs/octopus-rest-api/octopus-cli/import.md)**:  Imports an Octopus object from an export file. Deprecated. Please see [https://g.octopushq.com/DataMigration](https://g.octopushq.com/DataMigration) for alternative options.
- **[list-deployments](/docs/octopus-rest-api/octopus-cli/list-deployments.md)**:  Lists a number of deployments by project, environment or by tenant.
- **[list-environments](/docs/octopus-rest-api/octopus-cli/list-environments.md)**:  Lists environments.
- **[list-latestdeployments](/docs/octopus-rest-api/octopus-cli/list-latestdeployments.md)**:  Lists the releases last-deployed in each environment.
- **[list-machines](/docs/octopus-rest-api/octopus-cli/list-machines.md)**:  Lists all machines.
- **[list-projects](/docs/octopus-rest-api/octopus-cli/list-projects.md)**:  Lists all projects.
- **[list-releases](/docs/octopus-rest-api/octopus-cli/list-releases.md)**:  Lists releases by project.
- **[list-tenants](/docs/octopus-rest-api/octopus-cli/list-tenants.md)**:  Lists tenants.
- **[list-workerpools](/docs/octopus-rest-api/octopus-cli/list-workerpools.md)**:  Lists worker pools.
- **[list-workers](/docs/octopus-rest-api/octopus-cli/list-workers.md)**:  Lists all workers.
- **[pack](/docs/octopus-rest-api/octopus-cli/pack.md)**:  Creates a package (.nupkg or .zip) from files on disk, without needing a .nuspec or .csproj.
- **[prevent-releaseprogression](/docs/octopus-rest-api/octopus-cli/prevent-releaseprogression.md)**: Prevents a release from progressing to next phase.
- **[promote-release](/docs/octopus-rest-api/octopus-cli/promote-release.md)**:  Promotes a release.
- **[push](/docs/octopus-rest-api/octopus-cli/push.md)**:  Pushes a package (.nupkg, .zip, .tar.gz, etc.) package to the built-in NuGet repository in an Octopus Server.
- **[push-metadata](/docs/octopus-rest-api/octopus-cli/push-metadata.md)**:  Pushes package metadata to Octopus Server.  Deprecated. Please use the build-information command for Octopus Server 2019.10.0 and above.
- **[version](/docs/octopus-rest-api/octopus-cli/version.md)**:  Outputs Octopus CLI version.

## General Usage {#OctopusCLI-GeneralUsage}

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
**Create an API key**
Learn about [how to create an API key](/docs/octopus-rest-api/how-to-create-an-api-key.md).
:::

:::hint
The Octopus CLI is built and maintained by the Octopus Deploy team, but it is also open source. You can [view the Octopus CLI project on GitHub](https://github.com/OctopusDeploy/OctopusCli), which leans heavily on the [Octopus Clients library](https://github.com/OctopusDeploy/OctopusClients).
:::

The server URL, API key, username and password can be set as the environment variables `OCTOPUS_CLI_SERVER`, `OCTOPUS_CLI_API_KEY`, `OCTOPUS_CLI_USERNAME` and `OCTOPUS_CLI_PASSWORD` respectively. Values set via command line arguments take precedence over environment variables.

## Tab completion for commands and options {#OctopusCLI-TabCompletion}
Tab completion is available for the following shell environments: `powershell`, `pwsh` (PowerShell Core), `bash` & `zsh`. This feature requires that `octo` or `Octo` is available from your $PATH, which is the default state if installed via a package manager or Chocolatey. If you've manually installed the CLI, please ensure your $PATH is also updated if you wish to use this feature. This is an optional feature that requires additional [installation steps](#OctopusCLI-TabCompletionInstallation) on a per user basis, since this feature relies on built-in shell auto completion facilities.

### Additional installation steps for tab completion. {#OctopusCLI-TabCompletionInstallation}

1. Check that `octo` is available on your path:

```bash
which octo
```
This should return a valid location on your path like `/usr/bin/octo`.

2. Install tab completion scripts into your profile, choosing from `powershell`, `pwsh`, `bash` or `zsh`:

```bash
octo install-autocomplete --shell zsh
```

:::hint
If you're using PowerShell on Windows use `powershell` if you're using PowerShell Core on Windows, Mac or Linux, use `pwsh`.
:::

:::hint
You can review changes to your profile without writing to disk by using the `--dryRun` option

```powershell
octo install-autocomplete --shell powershell --dryRun
```
:::

3. Either restart your shell environment or 'dot source' your profile:

```bash Bash
. ~/.bashrc
```
```bash Zsh
. ~/.zshrc
```
```powershell PowerShell
. $PROFILE
```

4. You can now discover sub-commands by typing `octo [searchterm]` and hitting the [tab] key. If you don't provide a search term, the full list of available sub-commands will be shown.

![animation showing the tab completion feature in Zsh to list all environments in the default space](images/autocomplete.gif)
