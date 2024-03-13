---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Specify a custom container for AD authentication
description: How to specifying a custom container to use for AD Authentication.
navOrder: 20
---

In **Octopus 2.5.11** and newer you can now specify a custom container to use for AD Authentication. This feature addresses the issue of authenticating with Active Directory where the Users container is not in default location and permissions prevent queries as a result. Specifying the container will result in the container being used as the root of the context. The container is the distinguished name of a container object. All queries are performed under this root which can be useful in a more restricted environment.

**Configure container example**

```powershell
Octopus.Server.exe service --stop
Octopus.Server.exe configure --activeDirectoryContainer "CN=Users,DC=GPN,DC=COM"
Octopus.Server.exe service --start
```
