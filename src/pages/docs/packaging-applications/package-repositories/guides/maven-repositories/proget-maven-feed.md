---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-09-28
title: ProGet Maven repository
description: Configuring a ProGet Maven repository as an Octopus feed.
navOrder: 30
---

ProGet from Inedo is an package repository technology which contains a number of differnet feed types.  This guide provides instructions on how to create a private container registry in ProGet and connect it to Octopus Deploy as an External Feed.

## Configuring a ProGet Registry

From the ProGet web portal, click on **Feeds ➜ Create New Feed** 

:::figure
![Create New Feed](/docs/packaging-applications/package-repositories/images/proget-create-feed.png)
:::

Select the **Maven Artifacts** option from the `Developer Libraries` category

:::figure
![Container Images](/docs/packaging-applications/package-repositories/guides/maven-repositories/images/proget-new-maven-feed.png)
:::

Select **No Connectors (private artifacts only)** from the wizard

:::figure
![No Connectors](/docs/packaging-applications/package-repositories/guides/maven-repositories/images/proget-maven-no-connectors.png)
:::

Enter a name for your Feed, eg: ProGet-Docker, then click **Create Feed**

:::figure
![Feed Name](/docs/packaging-applications/package-repositories/guides/maven-repositories/images/proget-maven-repositories.png)
:::

The next screen allows you to set optional features for your registry, configure these features or click **Close**.  Once the feed has been created, ProGet will display the `API endpoint URL` to push packages.  In this example it's `https://proget.octopusdemos.app/maven2/ProGet-Maven/`

:::figure
![API endpoint Url](/docs/packaging-applications/package-repositories/guides/maven-repositories/images/proget-maven-api-endpoint.png)
:::

## Adding a ProGet Maven as an Octopus External Feed

Create a new Octopus Feed by navigating to **Library ➜ External Feeds** and select the `Maven Feed` Feed type. 

Give the feed a name and in the URL field, enter the HTTP/HTTPS URL of the ProGet server:

`https://your.proget.url/maven2/feedname/`

:::figure
![ProGet Maven Feed](/docs/packaging-applications/package-repositories/guides/maven-repositories/images/proget-external-feed.png)
:::

Optionally add Credentials if they are required. 