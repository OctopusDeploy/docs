---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Google Cloud
description: Octopus Deploy can help you perform repeatable and controlled deployments of your applications into Google Cloud Platform (GCP).
navOrder: 30
hideInThisSection: true
---

Google Cloud Platform (GCP) is a leading provider of cloud computing services and infrastructure, including hosted virtual machines, Kubernetes clusters, and serverless environments.

Building and shipping systems to Google cloud has its challenges. Different teams have different processes and there's a raft of application and infrastructure artifacts to manage. 

:::figure
![Google Cloud Platform accounts in Octopus](/docs/deployments/google-cloud/centralized-google-cloud-accounts.png)
:::

Octopus makes it easier to ship to Google cloud by helping you to:
* Connect and authenticate with GCP via a [dedicated account type](/docs/infrastructure/accounts/google-cloud). This allows you to centralize and secure your GCP authentication and use it in your deployments and runbooks.
* Use [gcloud](https://cloud.google.com/sdk/gcloud), the GCP command-line tool, in custom scripts out-of-the-box with the [**Run gcloud in a Script** step](/docs/deployments/google-cloud/run-gcloud-script). This step can be used to execute scripts on targets within Google Cloud Platform.
* Create and tear down GCP infrastructure with [Terraform](/docs/deployments/terraform).
* Access Docker images hosted with [Google Container Registry (GCR)](/docs/packaging-applications/package-repositories/guides/container-registries/google-container-registry).
* Deploy, scale and manage containerized applications on GCP with Octopus and [Kubernetes](/docs/deployments/kubernetes).

:::div{.hint}
**Where do Google cloud Steps execute?**
All Google cloud steps execute on a worker. By default, that will be the built-in worker in the Octopus Server. Learn about [workers](/docs/infrastructure/workers) and the different configuration options.
:::

## Learn more

- How to use the [Run gcloud in a Script](/docs/deployments/google-cloud/run-gcloud-script) step
- How to create [Google cloud accounts](/docs/infrastructure/accounts/google-cloud)
- [Google cloud blog posts](https://octopus.com/blog/search?q=google)