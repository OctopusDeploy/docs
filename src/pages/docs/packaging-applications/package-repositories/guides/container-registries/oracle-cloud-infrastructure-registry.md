---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Oracle Cloud Infrastructure Container Registry  
description: How to add an Oracle Cloud Infrastructure (OCI) Container Registry as an Octopus feed 
navOrder: 90
---

Oracle Cloud Infrastructure (OCI) provides a container registry that can be used as an external feed for Octopus Deploy.

## Create an OCI container registry
Once you've logged into OCI, search for `Container Registry` and select the **Container Registry** link located under `Services`.

:::figure
![](/docs/packaging-applications/package-repositories/guides/container-registries/images/oracle-cloud-infrastructure-container-registry-search.png)
:::

Click on **Create repository**

:::figure
![](/docs/packaging-applications/package-repositories/guides/container-registries/images/oracle-cloud-infrastructure-create-registry.png)
:::

Fill in the following:
- **Compartment**: Select which compartment to place the repository in
- **Repository name**: Give the repository a name
- **Access**: Select whether this will be a `Public` or `Private` repository

Click **Create repository**

Take note of which region you created the repository in as this will be needed to determine the correct URL for the repository.  Use the [Oracle region documentation](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm) to lookup the **Region Key**.  In this example, the repository was created in `US West (San Jose)` which has the region key of `SJC`.

:::figure
![](/docs/packaging-applications/package-repositories/guides/container-registries/images/oracle-cloud-infrastructure-region.png)
:::

## Adding an OCI repository as an Octopus External Feed
Create a new Octopus Feed by navigating to **Library ➜ External Feeds** and select the `Docker Container Registry` Feed type. 

Give the feed a name, in the URL field, paste the URL to your OCI region repository. It should look similar to this format:

`https://[region key].ocir.io`

Replace `[region key]` with the region key where your OCI container repository is located.

:::figure
![OCI Docker Registry feed](/docs/packaging-applications/package-repositories/guides/container-registries/images/oracle-cloud-infrastructure-external-feed.png)
:::

Optionally add Credentials if they are required. 