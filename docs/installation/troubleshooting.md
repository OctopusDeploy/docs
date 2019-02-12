---
title: Troubleshooting the Octopus Installation
description: Troubleshooting steps for installing Octopus Deploy
position: 6
---
In a few cases a bug in a 3rd party component causes the installer to display an "Installation directory must be on a local hard drive" error. If this occurs, run the install again from an elevated command prompt using the following command (replacing `Octopus.3.3.4-x64.msi` with the name of the installer you are using):

`msiexec /i Octopus.3.3.4-x64.msi WIXUI_DONTVALIDATEPATH="1"`

:::warning
**Deploying Applications to an Azure Website?**
If you get the following error it means you have a local copy of Web Deploy and that is being used. You will either need to upgrade your local version of Web Deploy to 3.5 or greater, or uninstall the local copy so Octopus can reference the embedded copy.
:::

## Long Paths

In Server 2016 and Windows 10, Microsoft has added an option to remove the character limit for file paths.

As of **Octopus 2018.5.3** and **Tentacle 3.21.0**, most operations support long file names once enabled in Windows, including package extraction and retention.

## Enabling

On the target machine:
1. Ensure .NET Framework 4.6.2 or later is installed.
1. Open Group Policy Editor (Press Windows Key and type `gpedit.msc` and hit Enter key).
1. Navigate to and enable.
    - On the latest versions of Windows: {{Local Computer Policy,Computer Configuration,Administrative Templates,System,Filesystem}} and set the `Enable Win32 long paths` setting to `Enabled`.
    - On Server 2016 and Windows 10 without the latest updates: {{Local Computer Policy,Computer Configuration,Administrative Templates,System,Filesystem,NTFS}} and set the `Enable NTFS long paths` setting to `Enabled`.

Once this option is on, PowerShell scripts automatically support long file names.

## Limitations

- C# and F# scripts do not support long filenames.
- Windows limits the each component of the path to 255 characters.
- Due to how we store and transfer packages, PackageIDs are limited to 100 characters and Package ID and Version combined to 216 characters.
- The package extraction path (`<TentacleApplicationDirectory>\<PackageId>\<Version>`) must be less than 256 characters long.
- The path to the directory of any script file being run by the deployment must be less than 256 characters long.
