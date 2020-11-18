#### Export Subset of projects

All versions of Octopus Deploy since version 3.x has include a [data migration tool](/docs/administration/data/data-migration).  The Octopus Manager only allows for the migration of all the data.  We only need a subset of data.  Use the command-line option [Partial Export](/docs/octopus-rest-api/octopus.migrator.exe-command-line/partial-export) to export a subset of projects. 

Run this command for each project you wish to export on the main, or production instance.  Create a new folder per project.

```
Octopus.Migrator.exe partial-export --instance=OctopusServer --project=AcmeWebStore --password=5uper5ecret --directory=C:\Temp\AcmeWebStore --ignore-history --ignore-deployments --ignore-machines
```

:::hint
This command ignores all deployment targets to prevent your test instance and your main instance from deploying to the same targets.
:::

### Import subset of projects

The data migration tool also includes [import functionality](docs/octopus-rest-api/octopus.migrator.exe-command-line/import).  First, copy all the project folders from the main instance to the test instance.  Then run this command for each project.


```
Octopus.Migrator.exe import --instance=OctopusServer --password=5uper5ecret --directory=C:\Temp\AcmeWebStore
```