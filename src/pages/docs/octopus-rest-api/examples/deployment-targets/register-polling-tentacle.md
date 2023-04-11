---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Register Polling Tentacle
description: An example script to register a Polling Tentacle using the REST API.
---

This script demonstrates how to programmatically add a [Polling Tentacle](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#polling-tentacles).  Polling Tentacles usually self-register during the installation process, but in cases where the Tentacle was deleted from the server and needs to be re-added, this script shows you how.

## Usage
Provide values for the following:
- Octopus URL
- Octopus API Key
- Name of the space to work with
- Hostname of the machine to register
- Tentacle thumbprint
- Tentacle identifier
- Array of environments
- Array of roles

## Script

!include <register-polling-tentacle-scripts>
