---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Adding Environments
description: An example script to create environments in a Space.
---

This script demonstrates how to programmatically create [environments](/docs/infrastructure/environments/index/) in an existing [Space](/docs/administration/spaces/).

It creates an environment for each entry in the supplied list. If the environment already exists in the Space, it skips the creation.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Space Name
- A list of environment names to create

## Script

!include <add-environments-scripts>
