---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Installing the Octopus CLI as a capability
description: This guide covers how to add the Octopus CLI as a capability to your Azure DevOps custom build agents.
---

Tasks in the Octopus extension use the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/) to execute commands with an instance of Octopus. As a result, the Octopus CLI is required to be installed and available on an agent before subsequent tasks run. There are two ways to fulfill this requirement:

1. Use the tool installer task, **Octopus CLI Installer** as part of a build pipeline definition
2. Install the Octopus CLI into a [self-hosted agent](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/agents#install)

Using the tool installer task **Octopus CLI Installer** in a build pipeline definition is suitable for installing the Octopus CLI just in time for a build. This is required for builds executed on [Microsoft-hosted agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted), which do not offer the ability to pre-load custom software. Alternatively, the Octopus CLI may be installed on a self-hosted agent and expressed as a capability. Once configured, a pipeline may express demands of agents to ensure that the Octopus CLI is available when executing builds.

## Using the Octopus CLI Installer

The **Octopus CLI Installer** task downloads and installs the Octopus CLI, making it available to other tasks in a build pipeline definition. It can be added to a definition through the Classic editor of Azure Pipelines or through the YAML pipeline editor.

Currently, the Octopus extension ships two versions of the **Octopus CLI Installer** task; version 4 is provided for backward compatibility with older pipeline definitions while version 5 is recommended because it offers additional features.

### Octopus CLI Installer v4

In the Classic editor, version 4 of the **Octopus CLI Installer** task has a required field, `Octopus CLI Version` that is used to specify the version of the Octopus CLI to be installed:

![Octopus CLI Installer v4 in Azure Pipelines](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension/images/octopus-cli-installer-v4.png)

The accepted values for this field are:

- `embedded`: use the built-in version of the Octopus CLI
- `latest`: downloads and installs the latest version of the Octopus CLI
- A specific version number of the Octopus CLI to use e.g. `7.4.3556`

:::hint
**Wildcards not supported**
Please note: Wildcard values are **NOT** supported when providing a specific version of the Octopus CLI to use.
:::

The **Octopus CLI Installer** task may be used in a YAML-based build pipeline. Using the YAML pipeline editor, the following snippet will download and install the latest version of the Octopus CLI:

```yaml
- task: OctoInstaller@4
  displayName: "Octopus CLI Installer"
  inputs:
    version: "latest"
```

### Octopus CLI Installer v5

In the Classic editor, version 5 of the **Octopus CLI Installer** task has a required field, `Octopus CLI Version` that is used to specify the version of the Octopus CLI to be installed:

![Octopus CLI Installer v5 in Azure Pipelines](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension/images/octopus-cli-installer-v5.png)

This field accepts a limited set of values, specified as `MAJOR.MINOR.PATCH` with wildcard support that adheres to [Semantic Versioning](https://semver.org/) rules. For example:

- `8.*`: install latest minor version for v8 of the Octopus CLI
- `7.3.*`: install the latest patch version for v7.3 of the Octopus CLI
- `9.0.0`: install the exact version 9.0 of the Octopus CLI
- `*`: install the latest version of the Octopus CLI

:::hint
**Range operators not supported**
Please note: Range and range operators e.g. `~1.2.3` are not supported.
:::

The **Octopus CLI Installer** task may be used in a YAML-based build pipeline. Using the YAML pipeline editor, the following snippet will download and install the latest version of the Octopus CLI:

```yaml
- task: OctoInstaller@5
  displayName: "Octopus CLI Installer"
  inputs:
    version: "*"
```

### Octopus CLI Installer v6

:::warning
Version 6+ of each of the steps no longer require installing the CLI
:::

Version 6 of the Octo CLI installer will only install the new [Octopus CLI](https://github.com/OctopusDeploy/cli).

## Using the Octopus CLI with Self-Hosted Agents

Self-hosted agents provide the ability to install tools that are required for builds and deployments. They can also improve build performance since their associated configuration is persisted between runs.

Self-hosted agents are available for Linux, macOS, or Windows. They may also be used in a Docker container. For more information about installing a self-hosted agent, see:

- [macOS agent](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-osx)
- [Linux agent](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-linux) (x64, ARM, ARM64, RHEL6)
- [Windows agent](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-windows) (x64, x86)
- [Docker agent](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/docker)

A self-hosted agent must be configured to include the Octopus CLI before using it in a pipeline. Binaries and/or packages for the Octopus CLI can be downloaded from the [Octopus CLI downloads](https://octopus.com/downloads/octopuscli) page.

:::warning
**Breaking Change in Version 5**

Tasks in version 5 of the Octopus extension now assert [demands](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/demands) for agent capabilities. These tasks now require that self-hosted agents expose the user-defined capability `octo` along with the version of the Octopus CLI installed on the agent (i.e. `8.0.1`).
:::

These task demands were introduced and mandated in version 5 to ensure the availability of the Octopus CLI.

![Self-Hosted Agent User Capability](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension/images/self-hosted-agent-user-capability.png)

If this user-defined capability described above is not defined for self-hosted agents then jobs will fail with the following error:

```
No agent found in pool [POOL-NAME] which satisfies demands: octo
```

Please note that tasks in version 4 (and below) of the Octopus extension do not assert demands for agent capabilities. Therefore, it is not required to specify agent capabilities for these tasks.
