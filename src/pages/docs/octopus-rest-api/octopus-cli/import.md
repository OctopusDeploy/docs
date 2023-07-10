---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Import
description: Using the Octopus CLI to import items exported from another Octopus Server.
navOrder: 150
---

:::div{.warning}
The import command has been **deprecated**. The recommended way to import data to an Octopus instance is with the **Export/Import Projects** feature that was released in **Octopus 2021.1**. Learn more: [Exporting and Importing Projects](/docs/projects/export-import).

If you are running an earlier version of Octopus, please see our [data migration](/docs/administration/data/data-migration) section for alternative options.
:::

When you try to run **import**, you'll now receive the following error:

```text
The octo import/export commands have been deprecated. See [https://g.octopushq.com/DataMigration](https://g.octopushq.com/DataMigration) for alternative options.
Exit code: -1
```

