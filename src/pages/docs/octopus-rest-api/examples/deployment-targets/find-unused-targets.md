---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Find unused targets
description: An example script the will find provide a list of targets being unused that might cause your target count to be inflated.
---

This script will loop through all the targets in all spaces on an instance and will return:

- How many cloud region targets which are not counted against your license
- How many duplicate listening Tentacles you have
- How many targets that are disabled
- How many targets are being reported as offline
- How many targets have never been used in a deployment
- How many targets haven't had a deployment in over `x` days

## Usage

Provide values for the following:
- Octopus URL
- Octopus API Key - the user associated with the API key will need read-only permissions on all spaces
- Days Since Last Deployment - the number of days to allow before considering the target is inactive, default is 90
- Include machine lists - boolean specifying whether to include the machines as part of the summary

## Script

!include <find-unused-targets>