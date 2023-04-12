---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Create a certificate
description: An example script to add a certificate to the Octopus certificate library.
---

This script uploads a certificate file in pfx format to the Octopus [certificate library](/docs/deployments/certificates/) to be used in deployments or runbooks.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- PFX file path
- PFX file password
- Certificate Name

## Script

!include <create-certificate-scripts>
