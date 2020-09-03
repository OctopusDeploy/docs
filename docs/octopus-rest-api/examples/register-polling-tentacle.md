---
title: Register Polling Tentacle
description: An example script to register a Polling Tentacle.
---

## Description

These scrips demonstrate how to programmatically add a polling tentacle.  Polling tentacles usually self-register during the installation process, but in cases where the tentacle was deleted from the server and need to be readded, these scripts will show you how.

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

## Scripts

!include <register-polling-tentacle-scripts>
