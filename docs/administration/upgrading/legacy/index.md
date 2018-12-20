---
title: Upgrading Old Versions of Octopus
description: Everything you need to know to upgrade an older version of Octopus to a modern version.
position: 1
---

Upgrading from an older version of Octopus takes some care and preparation. Please take time to read the right guides for your situation, and plan your upgrade carefully. If you run into any problems along the way [we are here to help!](https://octopus.com/support)

## Supported Upgrade Paths {#upgrade-path}

The supported upgrade paths are as follows:

- Currently running `1.x`? Upgrade `1.x` to `1.6` to `2.6.5` to `2018.10 LTS` to any newer version
- Currently running `2.x`? Upgrade `2.x` to `2.6.5` to `2018.10 LTS` to any newer version
- Currently running `2.6.5`? Upgrade `2.6.5` to `2018.10 LTS` to any newer version
- Currently running `3.x`, `4.x`, `2018.x` onwards? Upgrade to any newer version - we generally recommend choosing LTS

:::warning
**Broken upgrade paths**

We track any unresolved upgrade problems which require special attention using [this GitHub issue](https://github.com/OctopusDeploy/Issues/issues/4979).
:::

## Detailed Upgrade Guides {#upgrade-guides}

- Upgrade from `1.x` to `1.6` by [downloading and running the installer](https://octopus.com/downloads/1.6.3.1723).
- Upgrade from `1.6` to `2.6.5` using [this detailed guide](upgrading-from-octopus-1.6.md).
- Upgrade from `2.x` to `2.6.5` using [this detailed guide](upgrading-from-octopus-2.0.md).
- Upgrade from `2.6.5` to `2018.10 LTS` using [this detailed guide](/docs/administration/upgrading/upgrading-from-octopus-2.6/index.md).
- Upgrade any modern version of Octopus using [this detailed guide](/docs/administration/upgrading/upgrading-from-octopus-3.x.md).
