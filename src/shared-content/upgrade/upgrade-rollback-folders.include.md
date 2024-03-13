### Restore Octopus folders

Octopus Deploy expects the artifacts, packages, tasklog, and event export folders to be in a specific format.  The best chance of success is to:

1. Copy the existing folders to a safe location.
2. Delete the contents of the existing folders.
3. Copy the contents of the existing folders from the backup.
4. Once the rollback is complete, delete the copy from the first step.