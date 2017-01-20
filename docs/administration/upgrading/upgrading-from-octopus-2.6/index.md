---
title: Upgrading from Octopus 2.6
position: 2
---


Normally, Octopus automatically upgrades Tentacles when you upgrade Octopus. Since we made some really big changes to the communication protocols in Octopus 3.x, upgrading from 2.6 is a bit more complicated.


Upgrading to 3.x is only possible from Octopus 2.6; if you're running a previous version of Octopus, just upgrade to first 2.6, then upgrade to 3.x.

:::success
**Upgrade to the latest version**
When upgrading to Octopus 3.x please use the latest version available. We have been constantly improving the 2.6 to 3.x data migration process whilst adding new features and fixing bugs.
:::


Smaller installations


> "I have an Octopus server and a handful of Tentacles. I don't mind manually running the new Tentacle MSI's on each of my Tentacle machines."



If you only have a small number of Tentacles, it's easiest to just download the new Octopus and Tentacle MSI's and install them manually.


Read the full guide: [Manual upgrades for smaller instances](/docs/home/administration/upgrading/upgrading-from-octopus-2.6/manual-upgrade.md)

## Larger installations


> "I have lots of Tentacles; there's no way I'm manually updating them all!"



Don't worry, we've got you covered!

:::warning
Please pay careful attention to the instructions in these guides; if you skip ahead and do the upgrade in the wrong order, you might be stuck upgrading all Tentacles manually!
:::


There are two approaches you can use to upgrade from 2.6 to 3.x:

### Approach 1: Install 3.x on a new server, and migrate to it (recommended)


If you are able to provision a new Octopus server, this is the safest option. That way, if something goes wrong in the upgrade, it will be easy to discard the new server and start the process again. And when it works, you can decommission the old Octopus server.


Read the full guide: [Upgrade with a new Server instance](/docs/home/administration/upgrading/upgrading-from-octopus-2.6/upgrade-with-a-new-3.0-server-instance.md)

### Approach 2: In-place (over the top) upgrade of an existing server


It is possible to install Octopus 3.x over the top of a 2.6 instance. You'll upgrade the Tentacles to 3.x, then upgrade the Octopus server.


Read the full guide: [In place (over the top) upgrade](/docs/home/administration/upgrading/upgrading-from-octopus-2.6/in-place-upgrade-(install-over-2.6).md)
