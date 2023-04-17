---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Replace existing certificate
description: An example script to replace an existing certificate in Octopus Deploy.
---

This script replaces an existing certificate in the Octopus [certificate library](/docs/deployments/certificates).

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Certificate name
- Replacement certificate file path
- Replacement certificate password

## Script

!include <replace-certificate-scripts>
