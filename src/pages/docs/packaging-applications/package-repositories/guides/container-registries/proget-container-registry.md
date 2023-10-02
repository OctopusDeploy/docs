---
layout: src/layouts/Default.astro
pubDate: 2023-22-09
modDate: 2023-22-09
title: ProGet Container Registry  
description: How to add a ProGet Docker Registry as an Octopus feed 
navOrder: 100
---

ProGet from Inedo is an package repository technology which contains a number of different feed types.  This guide provides instructions on how to create a private container registry in ProGet and connect it to Octopus Deploy as an External Feed.

## Configuring a ProGet Registry

From the ProGet web portal, click on **Feeds ➜ Create New Feed** 

:::figure
![Create New Feed](/docs/packaging-applications/package-repositories/images/proget-create-feed.png)
:::

Select the **Container Images** option from the `Container-based Applications & Images` category

:::figure
![Container Images](/docs/packaging-applications/package-repositories/guides/container-registries/images/proget-container-images.png)
:::

Select **No Connectors (private container images only)** from the wizard

:::figure
![No Connectors](/docs/packaging-applications/package-repositories/guides/container-registries/images/proget-connect-proget-feed.png)
:::

Enter a name for your Feed, eg: ProGet-Docker, then click **Create Feed**

:::figure
![Feed Name](/docs/packaging-applications/package-repositories/guides/container-registries/images/proget-docker-repository.png)
:::

The next screen allows you to set optional features for your registry, configure these features or click **Close**.  Once the feed has been created, ProGet will display the required Image Prefix to push images in the form of `<ProGet Server DNS>/<FeedName>`.  In this example it's `proget.octopusdemos.app/proget-docker`

:::figure
![Image Prefix](/docs/packaging-applications/package-repositories/guides/container-registries/images/proget-container-registry-image-prefix.png)
:::


## Adding a ProGet container registry as an Octopus External Feed

Create a new Octopus Feed by navigating to **Library ➜ External Feeds** and select the `Docker Container Registry` Feed type. 

Give the feed a name and in the URL field, enter the HTTP/HTTPS URL of the ProGet server:

`https://your.proget.url`

:::figure
![ProGet Docker Container Registry Feed](/docs/packaging-applications/package-repositories/guides/container-registries/images/proget-external-feed.png)
:::

Optionally add Credentials if they are required. 