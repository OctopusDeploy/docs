---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Find events by date
description: An example script that finds events by date in Octopus using the REST API and Octopus.Client.
---

This script demonstrates how to programmatically finds events for a specific date.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Date to find events by

:::warning
**This script will query all events for a specific date in Octopus. It may take some time to execute on an Octopus instance with a large amount of Event records. Take care when running this script or one based on it.**
:::

## Script

!include <find-events-by-date-scripts>
