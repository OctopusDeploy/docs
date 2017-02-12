---
title: Docker
description: This guide covers the basics of using the Octopus Docker steps.
position: 9
---

:::hint
**Introduced for early access in Octopus Deploy 3.5**
Support for Docker for Linux and Windows Containers was introduced in Octopus Deploy 3.5 as an early access program. See below for more details on enabling these features in Octopus Deploy 3.5.
:::

Rather than try to reinvent the wheel and manage container orchestration, Octopus Deploy has decided to leverage existing Docker tools and will wrap them in specific build steps that can be integrated into a standard project.

Octopus Deploy 3.5 will introduce steps to perform the the first basic docker steps that are available with the installation of the docker engine. As of this release we are primarily targeting execution on SSH targets who have the docker engine available. For guides on setting up docker engine on your server check out some of the following posts.

:::hint
**Enabling Docker features**
While the Docker functionality undergoes development, the Docker steps and feed types will be disabled in the portal by default. To enable Docker in your Octopus Server instance, toggle the feature on via *Configuration &#10140; Features &#10140; Docker.*
![](/docs/images/5670982/5865815.png "width=500")

As they are currently considered to be in an alpha-stage of development, the docker steps and behavior may change in future releases. Once the docker feature has been finalized for general use, it is expected that it will be enabled by default and the feature toggle removed.
:::
