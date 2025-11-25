---
layout: src/layouts/Default.astro
pubDate: 2025-11-25
modDate: 2025-11-25
title: Troubleshooting
subtitle: Known issues that you may run into
icon: fa-solid fa-layer-group
navTitle: Troubleshooting
navSection: Policies
description: Known issues and limitations for policies
navOrder: 175
---

## Troubleshooting common issues

You may run into known issues when using policies. We've put together this page to help you diagnose and fix common issues.

### Windows Server missing dependency

If you try to load or create a policy you might see the following error "The Compliance Policy engine failed to load. There may be missing dependencies on the machine hosting Octopus Server.". 

:::figure
![A error callout trying to load the policies page](/docs/img/platform-hub/policies/policies-missing-dependency.png)
:::

If your host machine is running Windows Server then you are missing the Visual C++ Redistributable. To resolve this error you need to install the latest redistributable version for your machine, see [Visual C++ dependency](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#latest-supported-redistributable-version) for more information.
