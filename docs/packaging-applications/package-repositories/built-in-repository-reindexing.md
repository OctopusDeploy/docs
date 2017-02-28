---
title: Built-in Repository Reindexing
description: Octopus automatically re-indexes the built-in repository at startup to ensure that it is in sync.
---

Octopus automatically re-indexes the built-in repository at startup to ensure that it is in sync.

We do not recommend manually placing packages into the package store, however in certain limited circumstances (such as restoring a backup or a big package migration) it can be useful.

For most users, this will be a seamless background task. However, for some installations, this may cause performance issues. Users with `AdministerSystem` rights can disable the re-indexing task on the {{Library,Packages}} page.

Note that packages uploaded via the [recommended methods](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md) will still be indexed.
