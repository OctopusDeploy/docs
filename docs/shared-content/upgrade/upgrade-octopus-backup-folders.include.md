### Backup the server folders

The server folders store large binary data outside of the database.  By default, the location is `C:\Octopus`.  If you have High Availability configured, they must be stored on a NAS or some other file share.

- **Packages** Default location is `C:\Octopus\Packages\` -> stores all the packages in the internal feed.
- **Artifacts** Default location is `C:\Octopus\Artifacts` -> stores all the artifacts collected during a deployment along with project images.  
- **Tasklogs** Default location is `C:\Octopus\Tasklogs` -> stores all the deployment logs.  

Any standard file-backup tool will work, even [RoboCopy](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/robocopy).  Very rarely will an upgrade change these folders.  The release notes will indicate if these folders are going to be modified.