---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Create an API Key
description: An example script that creates an API Key.
---

This script demonstrates how to programmatically create a new API Key.

:::warning
**Note:** You can only create a new API Key for your own user account. You will also need an existing API Key to authenticate with the Octopus REST API, created from the [Octopus Web Portal](/docs/octopus-rest-api/how-to-create-an-api-key/).
:::

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Name of the user to create the API Key for
- Description of the API Key's purpose

## Script

!include <create-api-key-scripts>