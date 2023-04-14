---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Nexus Hosted NuGet repository
description: Configuring a Nexus Hosted NuGet repository as an Octopus feed.
navOrder: 50
---
Both Nexus OSS and Nexus Pro offer three types of NuGet repository, Hosted, Group, and Proxy.  This guide will cover creating a Hosted NuGet repository and adding it as an External Feed in Octopus Deploy.

:::info
This guide was written using Nexus OSS version 3.37.0-01
:::

## Configuring a Hosted NuGet repository

From the Nexus web portal, click on the **gear icon** to get to the **Administration** screen.

![Administration gear Icon](/docs/packaging-applications/package-repositories/guides/images/nexus-nuget-administration.png)

Click on **Repositories**

![Repositories](/docs/packaging-applications/package-repositories/guides/images/nexus-repositories.png)

Click **Create repository**

![Create repository](/docs/packaging-applications/package-repositories/guides/images/nexus-create-repository.png)

Choose **nuget (hosted)** from the list of repositories to create

![NuGet (hosted)](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/nexus-nuget-repository.png)

Give the repository a name and change any applicable configuration options.  Click **Create repository** when you are done.

![Create repository](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/nexus-create-nuget-repository.png)

When the repository has been created, click on the entry in the list to bring up the repository properties.

![MyNexusNugetRepo](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/nexus-mynexusnugetrepo.png)

Copy the URL property, that is what you will use when adding it as an external feed

![Repository URL](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/nexus-nuget-url.png)

Optionally upload a NuGet package to the repository so you can verify search functionality when added as an external feed.

## Adding an Nexus NuGet repository as an Octopus External Feed
Create a new Octopus Feed by navigating to **{{Library, External Feeds}}** and select the `NuGet Feed` Feed type. 

Give the feed a name and in the URL field, paste the URL you copied earlier.  It should look similar to this format:

`https://your.nexus.url/repository/[repository name]`

![Nexus NuGet feed](/docs/packaging-applications/package-repositories/guides/nuget-repositories/images/nexus-nuget-feed.png)