---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: GitLab Maven repository
description: Configuring a GitLab Maven repository as an Octopus feed.
navOrder: 20
---
GitLab creates a Maven Registry for each Project or Group.  To add the Maven Registry to Octopus Deploy as an external feed, you will first need to get the Project or Group Id

Project Id

:::figure
![GitLab Project Id](/docs/packaging-applications/package-repositories/guides/images/gitlab-project-id.png)
:::

Group Id

:::figure
![GitLab Group Id](/docs/packaging-applications/package-repositories/guides/images/gitlab-group-id.png)
:::

## Adding a GitLab Maven repository as an Octopus External Feed
Create a new Octopus Feed by navigating to **Library ➜ External Feeds** and select the `Maven Feed` Feed type. 

Give the feed a name and in the URL field, enter the HTTP/HTTPS URL of the feed for your GitLab Project or Group in the format:

Project:

`https://your.gitlab.url/api/v4/projects/[project id]/packages/packages/maven`

Group:

`https://your.gitlab.url/api/v4/groups/[group id]/-/packages/maven`

Replace the URL from the examples above.

:::figure
![GitLab NuGet Feed](/docs/packaging-applications/package-repositories/guides/maven-repositories/images/gitlab-maven-feed.png)
:::

Optionally add Credentials if they are required.