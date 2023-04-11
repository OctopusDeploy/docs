---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: migrate
description: Imports data from an Octopus 2.6 backup
---

Imports data from an Octopus 2.6 backup

**migrate options**

```
Usage: octopus.migrator migrate [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --file=VALUE           Octopus 2.6 (.octobak) file
      --master-key=VALUE     Master Key used to decrypt the file
      --dry-run              Do not commit changes, just print what would
                               have happened
      --maxage=VALUE         Ignore historical data older than x days
      --nologs               Do not import the raw server log entries.
      --onlylogs             Only import the raw server log entries.

Or one of the common options:

      --help                 Show detailed help for this command
```

