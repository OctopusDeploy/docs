---
title: Create and publish a new runbook snapshot
description: An example script to create and publish a new runbook snapshot
---

This script demonstrates how to programmatically create a new runbook snapshot and publish it for use by runbook consumers. If the runbook references any packages from the [Octopus built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md), then the latest package versions will be included in the snapshot.

## Usage

Provide values for the following:

- Octopus URL
- Octopus API Key
- Name of the space to work with
- Name of the project with the runbook
- Name of the runbook

## Script

!include <create-and-publish-runbook-scripts>
