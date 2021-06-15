---
title: Create a Google Cloud account
description: An example script to create a Google Cloud (GCP) account in Octopus.
---

This script provides an example of how to programmatically create a Google Cloud (GCP) account.

:::hint
**Note:**
This script uses an API endpoint introduced in **Octopus 2021.2**. Using this script in earlier versions of Octopus won't work.
:::

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Octopus Space ID
- Name for the Google Cloud account
- *Optional* description for the Google Cloud account
- Path to the [json key file](https://g.octopushq.com/GoogleCloudServiceAccountKey) to use when authenticating against Google Cloud
- *Optional* Array of Environment IDs
- Octopus Tenanted Participation Type (`Tenanted` | `Untenanted` | `TenantedOrUntenanted`)
- *Optional* Array of Tenant IDs
- *Optional* Array of Tenant Tags

## Script

!include <create-google-cloud-account-scripts>