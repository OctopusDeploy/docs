---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Create a new scheduled runbook trigger
description: An example script to create and publish a new runbook scheduled trigger
---

This script demonstrates how to programmatically create a new [scheduled runbook trigger](/docs/runbooks/scheduled-runbook-trigger/). The trigger will run once a day at the time specified, on the days specified, in the timezone chosen (default is `GMT Standard Time`).

## Usage

Provide values for the following:

- Octopus URL
- Octopus API Key
- Name of the space to work with
- Name of the project with the runbook
- Name of the runbook
- Name of the scheduled trigger
- Description of the scheduled trigger
- List of environments to run the runbook in
- Timezone for the schedule
- List of the days of week to run the trigger on
- The time to run the trigger each day, provided in the format `yyyy-MM-ddTHH:mm:ss.fffZ`. For example, `2021-07-22T09:00:00.000Z`.


## Script

!include <create-scheduled-runbook-trigger-scripts>
