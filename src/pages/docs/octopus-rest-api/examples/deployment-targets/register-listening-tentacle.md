---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Register Listening Tentacle
description: An example script to register a listening tentacle using the REST API.
---

This script demonstrates how to programmatically register a [Listening Tentacle](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#listening-tentacles-recommended).

## Usage

Provide values for the following:
- Octopus URL
- Octopus API Key
- Name of the space to work with
- Hostname (DNS entry will also work) of the machine to register
- Communications style (API method only): `TentaclePassive` for listening
- Port number the Tentacle is listening on
- An array of environments for the Tentacle
- An array of roles for the Tentacle

## Script

!include <register-listening-tentacle-scripts>
