---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Google cloud CLI scripts
description: Google cloud CLI Scripts allow you to manage your Google cloud resources as part of your deployment process.
navOrder: 10
hideInThisSectionHeader: true
---

Octopus Deploy can help you run scripts on targets within Google Cloud Platform.

These scripts typically rely on tools being available when they execute.

It is best that you control the version of these tools - your scripts will rely on a specific version that they are compatible with to function correctly.

The easiest way to achieve this is to use an [execution container](/docs/projects/steps/execution-containers-for-workers) for your script step.

If this is not an option in your scenario, we recommend that you provision your own tools on your worker.

When executing a script against GCP, Octopus Deploy will automatically use your provided Google cloud account details to authenticate you to the target instance, or you can choose to use the service account associated with the target instance.

This functionality requires the Google cloud (gcloud) CLI to be installed on the worker.

## Run a gcloud script step {#RunningGcloudScript}

:::div{.hint}
The **Run gcloud in a Script** step was added in Octopus **2021.2**.
:::

Octopus Deploy provides a _Run gcloud in a Script_ step type, for executing script in the context of a Google Cloud Platform instance. For information about adding a step to the deployment process, see the [add step](/docs/projects/steps) section.

:::figure
![](/docs/deployments/google-cloud/run-gcloud-script/google-cloud-script-step.png "width=170")
:::

![](/docs/deployments/google-cloud/run-gcloud-script/google-cloud-script-step-body.png "width=500")

## Learn more

- How to create [Google cloud accounts](/docs/infrastructure/accounts/google-cloud)
