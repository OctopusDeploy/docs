---
layout: src/layouts/Default.astro
pubDate: 2023-22-09
modDate: 2023-22-09
title: ProGet NuGet repository
description: Configuring a ProGet NuGet repository as an Octopus feed.
navOrder: 60
---

ProGet from Inedo is an package repository technology which contains a number of different feed types.  This guide provides instructions on how to create a NuGet feed in ProGet and connect it to Octopus Deploy as an External Feed.

## Configuring a ProGet NuGet feed

From the ProGet web portal, click on **Feeds ➜ Create New Feed** 

:::figure
![Create New Feed](/docs/packaging-applications/package-repositories/images/proget-create-feed.png)
:::

Select the **NuGet (.NET) Packages** option from the `Developer Libraries` category

:::figure
![NuGet Feed](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/proget-create-nuget-feed.png)
:::

Select **No Connectors (private container packages only)** from the wizard

:::figure
![No Connectors](/docs/packaging-applications/package-repositories/guides/container-registries/images/proget-connect-proget-feed.png)
:::

Enter a name for your Feed, eg: ProGet-NuGet, then click **Create Feed**

:::figure
![Feed Name](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/proget-create-feed-name.png)
:::

The next screen allows you to set optional features for your feed, configure these features or click **Close**.  Once the feed has been created, ProGet will display the `API endpoint URL` to push packages.  In this example it's `https://proget.octopusdemos.app/nuget/ProGet-NuGet/v3/index.json`

:::figure
![API endpoint URL](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/proget-nuget-api-endpoint.png)
:::

## Adding a ProGet NuGet as an Octopus External Feed

Create a new Octopus Feed by navigating to **Library ➜ External Feeds** and select the `NuGet Feed` Feed type. 

Give the feed a name and in the URL field, enter the HTTP/HTTPS URL of the ProGet server:

`https://your.proget.url/nuget/feedname/v3/index.json`

:::figure
![ProGet NuGet Feed](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/proget-external-feed.png)
:::

Optionally add Credentials if they are required. 