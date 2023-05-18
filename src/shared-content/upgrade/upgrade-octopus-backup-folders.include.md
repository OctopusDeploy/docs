### Backup the server folders

The server folders store large binary data outside of the database.  By default, the location is `C:\Octopus`.  If you have High Availability configured, they will likely be stored on a NAS or some other file share.

- **Packages**: The default location is `C:\Octopus\Packages\`. It stores all the packages in the internal feed.
- **Artifacts**: The default location is `C:\Octopus\Artifacts`. It stores all the artifacts collected during a deployment along with project images.  
- **Tasklogs**: The default location is `C:\Octopus\Tasklogs`. It stores all the deployment logs.  
- **EventExports**: The default location is `C:\Octopus\EventExports`. It stores all the exported event audit logs.  

:::div{.hint}
EventExports is available from **2023.3** onwards as part of the audit log retention feature.
:::

Any standard file-backup tool will work, even [RoboCopy](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/robocopy).  Very rarely will an upgrade change these folders.  The release notes will indicate if these folders are going to be modified.
