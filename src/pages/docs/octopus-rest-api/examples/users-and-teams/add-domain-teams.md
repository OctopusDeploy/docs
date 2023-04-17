---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Add domain teams
description: An example script that adds teams from a new domain to existing Octopus teams.
---

This script demonstrates how to programmatically add teams from a new domain to existing Octopus teams. This can be useful when you are migrating from one domain to another.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Maximum number of records to update
- Name of new to domain to use

## Script

!include <add-domain-teams-scripts>