---
title: Running Tentacle Under a Specific User Account
description: Information on how to run Tentacle under a specific user account.
position: 50
---

Every process within a Tentacle is executed by the user account configured on the **OctopusDeploy Tentacle** service. By default this is the **Local System** account. There are times when you might need to run the Tentacle under a specific user account, for instance:

- Run a script that needs to be executed by a user with higher permissions.
- Run a process that talks to a SQL database, and you want to use integrated authentication.

To change this setting, go to {{Services,OctopusDeploy Tentacle,Properties,Log On}}.

![](/docs/images/3048117/3277918.jpg "width=500")

Making the user a local administrator will be the easiest path to full functionality. If this is not possible, the following table acts as a guide for the minimal permission set that Tentacle must have for successful operation.

| Permission   | Object                                   | Reason                                   | Applied with     |
| ------------ | ---------------------------------------- | ---------------------------------------- | ---------------- |
| Full control | The Octopus "Home" folder, e.g. `C:\Octopus` | Tentacle stores logs, temporary data, and dynamic configuration in this folder. | Windows Explorer |
| Read         | The `HKLM\Software\Octopus\Tentacle` registry key | Tentacle determines the location of its configuration files from this key. | Regedit          |
| Full control | The `Octopus Tentacle` Windows Service   | Tentacle must be able to upgrade and restart itself for remote administration. | SC.EXE           |
| Listen       | Port **10933**                           | Tentacle accepts commands from Octopus on this port. | NETSH.EXE        |

Additional permissions will be necessary depending on the kind of deployments Tentacle will perform (e.g. IIS configuration and so-on).
