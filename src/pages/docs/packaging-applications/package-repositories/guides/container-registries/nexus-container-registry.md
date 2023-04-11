---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Nexus Container Registry  
description: How to add a Nexus Docker Registry as an Octopus feed 
navOrder: 80
---
Sonatype Nexus Repository Manager offers three types of docker registry;
- Group
- Hosted
- Proxy

This guide will focus on adding a `Hosted` docker registry as an External Octopus Feed.

:::info
This guide was written using Nexus OSS version 3.37.0-01
:::

## Configuring a Nexus Hosted Docker Registry

From the Nexus web portal, click on the **gear icon** to get to the **Administration** screen.

![Administration gear Icon](../images/nexus-nuget-administration.png)

Click on **Repositories**

![Repositories](../images/nexus-repositories.png)

Click **Create repository**

![Create repository](../images/nexus-create-repository.png)

Choose **docker (hosted)** from the list of repositories to create

![Docker hosted](images/nexus-create-docker-repository.png)

Give the repository a name and change any applicable configuration options.  When using HTTPS, a Nexus docker repository will listen on the specified port.

Click **Create repository** when you are done.

![Create Nexus docker repository](images/nexus-docker-repository.png)

When the repository has been created, click on the entry in the list to bring up the repository properties.

Optionally push a container to the feed to make sure the feed works when added to Octopus Deploy.

## Adding an Nexus Docker repository as an Octopus External Feed
Create a new Octopus Feed by navigating to **{{Library, External Feeds}}** and select the `Docker Container Registry` Feed type. 

Give the feed a name, in the URL field, paste the URL to your Nexus server with the associated port. It should look similar to this format:

`https://your.nexus.url:[repository port]`

![Nexus NuGet feed](images/nexus-docker-feed.png)

Optionally add Credentials if they are required. 