---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Export
description: Using the Octopus CLI to export items from one Octopus Server to import into another.
navOrder: 130
---

:::div{.warning}
The export command has been **deprecated**. The recommended way to export data from an Octopus instance is with the **Export/Import Projects** feature that was released in **Octopus 2021.1**. Learn more: [Exporting and Importing Projects](/docs/projects/export-import).

If you are running an earlier version of Octopus, please see our [data migration](/docs/administration/data/data-migration) section for alternative options.
:::

When you try to run **export**, you'll now receive the following error:

```text
The octo import/export commands have been deprecated. See [https://g.octopushq.com/DataMigration](https://g.octopushq.com/DataMigration) for alternative options.
Exit code: -1
```

