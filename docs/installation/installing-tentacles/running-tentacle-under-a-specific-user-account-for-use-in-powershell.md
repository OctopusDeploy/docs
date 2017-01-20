---
title: Running Tentacle under a specific user account for use in Powershell
position: 5
---


Every process within a Tentacle is executed by the user account configured on the **Octopus Tentacle**service. By default this account is **Local System.** There are times when you might like to run the Tentacle under a specific user account (i.e. you want to run administrator-level Powershell commands from your deployment process).


To change this setting go to Services -> "Octopus Tentacle" -> Properties -> Log On


![](/docs/images/3048117/3277918.jpg)


If possible making the user a local administrator will be the easiest path to full functionality. If this is not possible, the following table acts as a guide for the minimal permission set that Tentacle must have for successful operation.

| Permission | Object | Reason | Applied with |
| --- | --- | --- | --- |
| Full control | The Octopus "Home" folder, e.g. `C:\Octopus` | Tentacle stores logs, temporary data, and dynamic configuration in this folder | Windows Explorer |
| Read | The `HLKM\Software\Octopus\Tentacle` registry key | Tentacle determines the location of its configuration files from this key | Regedit |
| Full control | The `Octopus Tentacle` Windows Service | Tentacle must be able to upgrade and restart itself for remote administration | SC.EXE |
| Listen | Port **10933** | Tentacle accepts commands from Octopus on this port | NETSH.EXE |


Additional permissions will be necessary depending on the kinds of deployments Tentacle will perform (e.g. IIS configuration and so-on).
