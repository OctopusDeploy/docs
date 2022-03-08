---
title: Automatic Step Template Updates
description: How automatic updates of built-in steps work
position: 40
---

Starting with version **Octopus 2022.1** built-in step templates can be automatically updated to latest versions without updating the Server itself. Every hour Octopus Server will check for updates to the built-in step templates and automatically download them from the publicly available feed located at [steps-feed.octopus.com](https://steps-feed.octopus.com/).

Optionally, automatic version updates of built-in steps can be turned off by navigating to **{{Configuration,Features}}**. and turning off **Step Template Updates** feature.

![](images/automatic-updates-configuration.png "width=500")

### Notes

* Existing deployment processes and runbooks will be automatically updated to use the latest **minor** version of the built-in step templates, without any user-intervention. This enables rapid deployment of security and patch fixes in a backward compatible manner.
* Major version upgrades of steps within existing deployment processes and runbooks will require manual intervention, as the steps will not be backward compatible and likely require additional input.
![](images/step-migration-v2.png "width=500")
* Only steps that are compatible with the current Octopus Server version will be automatically downloaded and updated.
* Only the steps built with the new "step package" format are updated using the described mechanism. Existing steps will still require Server to be updated to receive new versions.