---
title: Installing the Octopus CLI as a capability
description: This guide covers how to add the Octopus CLI as a capability to your Azure DevOps custom build agents.
---

There are times when you may want to install the Octopus CLI on a build agent, such as to avoid downloads, opening any firewalls and or changing proxy rules. There are a few ways in which this can be
achieved. In every option presented here, you must [install the Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md) so that it's in your current environment path. 

## Images and automation

Microsoft provide a number of starting points to create your own build agent images which can be modified to include the Octopus CLI as an added capability. This includes [packer images](https://github.com/actions/virtual-environments/tree/main/images) as well as instructions on [running a self-hosted agent in Docker](https://docs.microsoft.com/en-gb/azure/devops/pipelines/agents/docker).

