---
title: Library Variable Sets
description: Library variable sets allow you to define and share common variables between your Octopus projects.
position: 2
---

Octopus [variables](/docs/deployment-process/variables/index.md) can be added to library variables sets, which makes it possible to share variables between projects. You can create them by navigating to {{Library,Variable Sets}} and clicking **Add new variable set**.

![](/docs/images/3048089/3277721.png "width=500")

Just like defining project variables, library variables can be scoped to environments, machines or roles.

![](/docs/images/3048089/3277720.png "width=500")

Once library variable sets have been defined, they can be referenced from a project by viewing the project variables, selecting **Library Sets** and clicking **Include library variable sets**.

![](/docs/images/3048089/3277719.png "width=500")

Select the variable set to include and click the **Save** button.

![](/docs/images/3048089/3277718.png "width=500")

The **Project Variables** page, while under **Library Sets** will show the shared variable set that has been included.

![](/docs/images/3048089/3277717.png "width=500")
