---
title: Create a Google Cloud account
description: An example script to create a Google Cloud (GCP) account in Octopus.
---

This script provides an example of how to programmatically create a Google Cloud (GCP) account.

:::hint
**Note:**
Please note there are some items to consider before using these scripts:
- Google Cloud Accounts were added in **Octopus 2021.2**. Using these script examples in earlier versions of Octopus won't work.
- Script examples that use the [Octopus Clients library](https://github.com/OctopusDeploy/OctopusClients) make use of a new `GoogleCloudAccountResource` type that was added in version **11.3.3355** of the library.
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