---
title: Troubleshooting the Octopus Installation
description: Troubleshooting steps for installing Octopus Deploy
position: 6
---
In a few cases a bug in a 3rd party component causes the installer to display an "Installation directory must be on a local hard drive" error. If this occurs, run the install again from an elevated command prompt using the following command (replacing `Octopus.3.3.4-x64.msi` with the name of the installer you are using):

`msiexec /i Octopus.3.3.4-x64.msi WIXUI_DONTVALIDATEPATH="1"`

:::warning
**Deploying applications to an Azure website?**
If you get the following error it means you have a local copy of Web Deploy and that is being used. You will either need to upgrade your local version of Web Deploy to 3.5 or greater, or uninstall the local copy so Octopus can reference the embedded copy.
:::
