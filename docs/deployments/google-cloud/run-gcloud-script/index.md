---
title: Google cloud CLI scripts
description: Google cloud CLI Scripts allow you to manage your Google cloud resources as part of your deployment process.
position: 10
hideInThisSectionHeader: true
---

Octopus Deploy can help you run scripts on targets or workers within Google Cloud Platform.

These scripts typically rely on tools being available when they execute.

It is best that you control the version of these tools - your scripts will rely on a specific version that they are compatible with to function correctly.

The easiest way to achieve this is to use an [execution container](/docs/projects/steps/execution-containers-for-workers/index.md) for your script step.

If this is not an option in your scenario, we recommend that you provision your own tools on your server.

When executing a script against GCP, Octopus Deploy will automatically use your provided Google cloud account details for authentication, or if you are running on a server in GCP, you can choose to use the service account associated with that server.

This functionality requires the Google cloud (gcloud) CLI to be installed on the server.

## Run a gcloud script step {#RunningGcloudScript}

:::hint
The **Run gcloud in a Script** step was added in Octopus **2021.2**.
:::

Octopus Deploy provides a _Run gcloud in a Script_ step type, for executing script in the context of a Google Cloud Platform instance. For information about adding a step to the deployment process, see the [add step](/docs/projects/steps/index.md) section.

![](google-cloud-script-step.png "width=170")

![](google-cloud-script-step-body.png "width=500")

## Learn more

- How to create [Google cloud accounts](/docs/infrastructure/accounts/google-cloud/index.md)
