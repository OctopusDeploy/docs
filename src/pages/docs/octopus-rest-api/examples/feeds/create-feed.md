---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Create a feed
description: An example script that creates a nuget feed in Octopus.
---

This script demonstrates how to programmatically create a NuGet external feed in Octopus.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Name of the space to use
- Name of the feed
- Feed URL
- Download retry attempts
- Download retry backoff (in seconds)
- Optional Username to use for authentication
- Optional Password to use for authentication
- Whether to use the extended API

!include <create-nuget-feed-scripts>
