Octopus stores several files that are not suitable to store in the database. These include:

- Packages used by the [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository). These packages can often be very large in size.
- [Artifacts](/docs/projects/deployment-process/artifacts) collected during a deployment. Teams using Octopus sometimes use this feature to collect large log files and other files from machines during a deployment.
- Task logs are text files that store all of the log output from deployments and other tasks.
- Imported zip files used by the [Export/Import Projects feature](/docs/projects/export-import).
- Archived audit logs by the [Archived audit logs feature](/docs/security/users-and-teams/auditing/#archived-audit-events).

As with the database, you'll tell the Octopus Servers where to store them as a file path within your operating system. The shared storage needs to be accessible by all Octopus nodes. Each of these three types of data can be stored in a different location.

Whichever way you provide the shared storage, there are a few considerations to keep in mind:

- To Octopus, it needs to appear as either:
  - A mapped network drive e.g. `X:\`
  - A UNC path to a file share e.g. `\\server\share`
  - A [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link) pointing at a local folder, e.g. 

    `C:\OctopusShared\Artifacts <<===>> \\server\share\Artifacts` 
- The service account that Octopus runs needs **full control** over the directory.
- Drives are mapped per-user, so you should map the drive using the same service account that Octopus is running under.