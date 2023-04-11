---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Promote a release not in the destination
description: An example script that will promote a release if it is not in the destination.
---

This script demonstrates how to programmatically find the latest deployment in each environment and compare releases.  If they don't match then promote the release to the next environment.

## Usage

Provide values for the following:

- Octopus URL
- Octopus API Key
- Name of the space to use
- Comma seperated list of projects
- Source Environment Name
- Destination Environment Name

## Script

!include <promote-releases-not-in-destination>