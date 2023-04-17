---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Publish a runbook snapshot
description: An example script to publish an existing runbook snapshot
---

This script demonstrates how to programmatically publish an *existing* runbook snapshot. To learn how to create a new snapshot and publish it see [this example](/docs/octopus-rest-api/examples/runbooks/create-and-publish-runbook).

## Usage

Provide values for the following:

- Octopus URL
- Octopus API Key
- Name of the space to work with
- Name of the project with the runbook
- Name of the runbook
- Name of the snapshot to publish

## Script

!include <publish-runbook-scripts>
