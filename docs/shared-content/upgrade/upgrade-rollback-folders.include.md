### Restore Octopus Folders

Octopus Deploy expects the artifacts, packages, tasklog, and event export folders to be in a specific format.  The best chance of success is to:

1. Copy the existing folders to a safe location.
2. Delete the contents of the existing folders.
3. Copy the contents of the existing folders from the backup.
4. Once the rollback is complete, delete the copy from the first step.

:::hint
EventExports is available from **2023.3** onwards as part of the audit log retention feature.
:::