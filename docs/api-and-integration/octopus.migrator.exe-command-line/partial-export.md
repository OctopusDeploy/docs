---
title: Partial Export

---


:::hint
This feature is available in Octopus 3.4 and newer.
:::





This command exports configuration data to a directory filtered by a single project.


Usage:

```text
Octopus.Migrator partial-export [<options>]
```


Where `[&lt;options&gt;]` is any of:

**Create release options**

```text
Partial export:
      --instance=VALUE       Name of the instance to use
      --directory=VALUE      Directory for exported files
      --password=VALUE       Password to encrypt any sensitive values
      --include-tasklogs     Include the task log folder as part of the
                               export.
      --project=VALUE        Project to filter export for
      --releaseVersion=VALUE [Optional] Release of provided project to filter
                               export for
      --ignore-deployments   [Optional] Excludes deployments from partial
                               export
      --ignore-machines      [Optional] Excludes machines from partial export
      --ignore-tenants       [Optional] Excludes tenants from partial export


Common Options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
```

### Basic examples


This will export the project files from *AcmeWebStore*and then spider back through the relevant linked documents in the database and back up *only those that are required in some way* to reproduce that project in its entireity.

```text
Octopus.Migrator.exe partial-export --instance=MyOctopusInstanceName --project=AcmeWebStore --password=5uper5ecret --directory=C:\Temp\AcmeWebStore
```
