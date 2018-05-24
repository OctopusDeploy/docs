---
title: Long Paths
description: How to enable long path support in Windows Server 2016 and Windows 10.
position: 28
---
In Server 2016 and Windows 10, Microsoft has added an option to remove the character limit for file paths. 

As of Octopus `2018.5.3`, most operations support long file names once enabled in Windows, including package extraction and retention.

## Enabling

1. On the target machine, Open Group Policy Editor (Press Windows Key and type `gpedit.msc` and hit Enter key)
2. Navigate to and enable
    - On the latest versions of Windows: {{Local Computer Policy,Computer Configuration,Administrative Templates,System,Filesystem}} and set the `Enable Win32 long paths` setting to `Enabled`
    - On Server 2016 and Windows 10 without the latest updates: {{Local Computer Policy,Computer Configuration,Administrative Templates,System,Filesystem,NTFS}} and set the `Enable NTFS long paths` setting to `Enabled`

Once this option is on, PowerShell scripts automatically support long file names. 

## Limitations

- C# and F# scripts do not support long filenames
- Windows limits the each component of the path to 255 characters