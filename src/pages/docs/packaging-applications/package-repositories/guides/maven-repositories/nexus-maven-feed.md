---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Nexus Hosted Maven repository
description: Configuring a Nexus Hosted Maven repository as an Octopus feed.
navOrder: 10
---
Both Nexus OSS and Nexus Pro offer three types of Maven repository, Hosted, Group, and Proxy.  This guide will cover creating a Hosted Maven repository and adding it as an External Feed in Octopus Deploy.

:::div{.info}

This guide was written using Nexus OSS version 3.37.0-01
:::


## Configuring a Hosted Maven repository

From the Nexus web portal, click on the **gear icon** to get to the **Administration** screen.

:::figure
![Administration gear Icon](/docs/packaging-applications/package-repositories/guides/images/nexus-nuget-administration.png)
:::

Click on **Repositories**

:::figure
![Repositories](/docs/packaging-applications/package-repositories/guides/images/nexus-repositories.png)
:::

Click **Create repository**

:::figure
![Create repository](/docs/packaging-applications/package-repositories/guides/images/nexus-create-repository.png)
:::

Choose **maven2 (hosted)** from the list of repositories to create

:::figure
![Maven (hosted)](/docs/packaging-applications/package-repositories/guides/maven-repositories/images/nexus-maven-repository.png)
:::

Give the repository a name and change any applicable configuration options.  Click **Create repository** when you are done.

:::figure
![Create repository](/docs/packaging-applications/package-repositories/guides/maven-repositories/images/nexus-create-maven-repository.png)
:::

When the repository has been created, click on the entry in the list to bring up the repository properties.

:::figure
![MyNexusMavenRepo](/docs/packaging-applications/package-repositories/guides/maven-repositories/images/nexus-mynexusmavenrepo.png)
:::

Copy the URL property, that is what you will use when adding it as an external feed

:::figure
![Repository URL](/docs/packaging-applications/package-repositories/guides/maven-repositories/images/nexus-maven-url.png)
:::

Optionally upload a package to the repository so you can verify search functionality when added as an external feed.

## Adding a Nexus Maven repository as an Octopus External Feed
Create a new Octopus Feed by navigating to **Library ➜ External Feeds** and select the `Maven Feed` Feed type. 

Give the feed a name and in the URL field, paste the URL you copied earlier.  It should look similar to this format:

`https://your.nexus.url/repository/[repository name]`

![Nexus NuGet feed](/docs/packaging-applications/package-repositories/guides/maven-repositories/images/nexus-maven-feed.png)