---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Change feed
description: An example script that changes an existing feed by updating the feed name in Octopus using the REST API and Octopus.Client.
---

This script demonstrates how to programmatically change an existing feed and update its name in Octopus. 

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Name of the space to use
- Name of the feed to modify
- New value for the name of the feed

## Script

!include <change-feed-scripts>
