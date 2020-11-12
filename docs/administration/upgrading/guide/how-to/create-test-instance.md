---
title: How to create a test instance
description: How to create a test instance of Octopus Deploy to test out new features and functionality.
position: 4
---

!include <upgrade-consider-test-instance>

## Overview

Creating a test instance will involve:

1. Downloading and installing the same version of Octopus Deploy as your main, or production, instance.  
2. Exporting a subset of your projects from your main instance.
3. Importing those projects into the new test instance.
4. Upgrading the test instance to the desired version.

### Downloading same version of Octopus Deploy

It is important to download the same version as your main, or production, instance.  This is due to a requirement from the migration tool.  You can find the version you are running by clicking on your name in the top right corner of your Octopus Deploy instance.

Once you know the version you can download it [here](https://octopus.com/downloads/previous).

### Installing Octopus Deploy

Run the MSI you downloaded to install Octopus Deploy.  After you install Octopus Deploy the Octopus Manager will automatically launch.  Follow the wizard.  A few notes:

1. You can reuse your same license key on up to three unique instances of Octopus Deploy.  We determine uniqueness based on the database it connects to.  If you are going to exceed the three instance limit please reach out to advice@octopus.com to discuss options.
2. Create a new database for this test instance.  Do not reuse an existing one or restore a backup.  Doing those will treat this as a cloned instance not a test instance.

### Export Subset of projects

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

### Upgrading the test instance to the desired version

Upgrading the test instance is the exact same process as installing a new instance, or performing an in-place upgrade.  Download the MSI, run it and follow the wizard.  

For more information on doing an in-place upgrade please see [our guide](INSERT LINK).

## Going Forward

Any instances with more than 100 targets should have a test instance.  100 targets seems to be the time when Octopus Deploy becomes a standard across multiple teams.  Any sort of downtime becomes less and less acceptable.  

The test instance should be kept up to date.  It should always be whatever the current version of the main instance, unless you are testing out an upgrade.  This will make it easier to export/import projects from the main instance.  And it provides a sandbox for other people to try out new features without affecting production.