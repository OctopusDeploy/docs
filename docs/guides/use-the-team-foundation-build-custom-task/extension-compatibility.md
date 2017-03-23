---
title: VSTS and TFS Extension version compatibility
description: This guide explains the Octopus extension versions that are compatible with different versions of VSTS and TFS
---

## Octopus Extension versions

There are three distinct versions (or version ranges) you need to worry about with respect to the Octopus Extension:

- **Version 1.2.x** - now obsolete, but still usable for older versions of TFS and VSTS
- **Version 2.0.36** - a specific "version 2" build for TFS 2015 Update 2, TFS 2015 Update 3, TFS 2015 Update 4, and TFS 2017 RTM
- **Version 2.0.x** - the current, most recent version of the extension, for VSTS and TFS 2017 Update 1 and above

## Extension Compatibility with Team Foundation Server

The following table shows compatibility between versions of VSTS, TFS, and the Octopus extension

| VSTS/TFS Version / Extension Version | 1.2.x | 2.0.36 | 2.0.x |
| ------------------------------------ |:-----:|:------:|:-----:|
| VSTS                                 | <i class="fa fa-check"></i> | <i class="fa fa-times"></i> | <i class="fa fa-check"></i> |
| TFS 2017 Update 1                    | <i class="fa fa-check"></i> | <i class="fa fa-asterisk"></i> | <i class="fa fa-check"></i> |
| TFS 2017 RTM                         | <i class="fa fa-check"></i> | <i class="fa fa-check"></i> | <i class="fa fa-times"></i> |
| TFS 2015 Updates 2,3,4               | <i class="fa fa-check"></i> | <i class="fa fa-check"></i> | <i class="fa fa-times"></i> |

<i class="fa fa-asterisk"></i> *Technically supported, but not recommended*

Any version older than TFS 2015 Update 2 is not supported by any extension version.

## Upgrading Extensions

The ease of upgrades depends very much on the version of TFS (or VSTS) being used, and the extension versions involved.

### Extension Upgrades in VSTS and TFS 2017 Update 1 (and above)

In VSTS, extension versions within the same major version (e.g. 2.0.62 to 2.0.63) are applied automatically. These should never be breaking changes. The same applies in TFS 2017.1, the only difference being the need to upload the new extension to TFS manually.

Extension updates that increment major version numbers (e.g. 1.2.28 to 2.0.63) will result in both versions being available. Your administrator will be prompted to update the extension before it's available to users.

![](/docs/images/3048175/extension-upgrade.png)

![](/docs/images/3048175/extension-upgrade-2.png)

Once it's available, you can choose the version you want to use using the dropdown in the task details.

![](/docs/images/3048175/extension-version-choice.png)

### Extension Upgrades in TFS 2015 Updates 2, 3, and 4, and TFS 2017 RTM

:::warning
Extension updates that increment major versions (e.g. 1.2.28 to 2.0.63) are breaking changes! Your build definitions will need to be updated before they can be successfully run again.
:::

Upgrades within the same major version number (e.g. 2.0.62 to 2.0.63) can be applied safely. These should never be breaking changes.

Upgrades that increment major versions (e.g. 1.2.28 to 2.0.63) are breaking changes and any builds using these tasks will fail until they are fixed. Version 2.x of the extension changed the way TFS connects to Octopus, so the new service connection must be configured before builds or releases will successfully run.