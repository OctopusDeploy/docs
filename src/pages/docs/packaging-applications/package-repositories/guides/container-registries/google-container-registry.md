---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-04-14
title: Google Cloud Container Registry (GCR) 
description: How to add a Google Cloud Container Registry (GCR) as an Octopus feed
navOrder: 70
---

Google Cloud provides a [container registry](https://cloud.google.com/container-registry). Google Container Registry can be configured in Octopus as a Docker Container Registry Feed.  

## Adding a Google Container Registry to Octopus 

1. To enable Octopus to communicate with Google Cloud registries, the [Cloud Resource Manager API](https://console.developers.google.com/apis/api/cloudresourcemanager.googleapis.com/overview) must be enabled. 
2. Create a [JSON key file Google Cloud service account](https://cloud.google.com/container-registry/docs/advanced-authentication#json-key) 
3. In Octopus go to **Deploy ➜ Manage ➜ External Feeds** and add a new feed with the following properties
    - **Feed Type:** Google Container Registry
    - **Name:** _{{This one's up to you}}_
    - **URL:** `https://[REGION]-docker.pkg.dev`
    - **Credentials:** Google Cloud JSON Key
    - **Google Cloud JSON Key:** _{{Upload your JSON keyfile}}_

:::figure
![](/docs/img/packaging-applications/package-repositories/guides/container-registries/images/google-container-registry.png)
:::

## Adding an OpenID Connect Google Container Registry to Octopus 

Octopus Server `2025.2` adds support for OpenID Connect to GCR feeds. To use OpenID Connect authentication you have to follow the [required minimum configuration](/docs/infrastructure/accounts/openid-connect#configuration). 

To set up an OpenID Connect GCR feed:

1. Follow the [Google cloud documentation](https://cloud.google.com/iam/docs/workload-identity-federation-with-other-providers) to create and configure a Workload Identity Federation.
2. Set the IAM access control on your Artifact Registry following the [access control instructions](https://cloud.google.com/artifact-registry/docs/access-control#:~:text=On%20the%20Permissions%20tab%2C%20click,prevent%20misuse%20by%20unauthenticated%20users).
3. In Octopus go to **Deploy ➜ Manage ➜ External Feeds** and add a new feed with the following properties
    - **Feed Type:** Google Container Registry
    - **Name:** _{{This one's up to you}}_
    - **URL:** `https://[REGION]-docker.pkg.dev`
    - **Credentials:** OpenID Connect
    - **Subject:** *Please read [OpenID Connect Subject Identifier](/docs/infrastructure/accounts/openid-connect#subject-keys) for how to customize the **Subject** value*
    - **Audience**  _{{The audience set on the workload identity provider}}_ *This should match the audience set on the Workload Identity Federation. By default, this is* `https://iam.googleapis.com/projects/{project-id}/locations/global/workloadIdentityPools/{pool-id}/providers/{provider-id}`

:::div{.warning}
At this time, OpenID Connect external feeds are not supported for use with Kubernetes containers. This is because the short-lived credentials they generate are not suitable for long-running workloads.
:::
