---
title: Long Paths
description: How to enable long path support in Windows Server 2016 and Windows 10.
position: 28
---
In Server 2016 and Windows 10, Microsoft has added an option to remove the character limit for file paths. 

To enable it:
1. Open Group Policy Editor (Press Windows Key and type `gpedit.msc` and hit Enter key)
2. Navigate to the following directory:  `Local Computer Policy > Computer Configuration > Administrative Templates > System > Filesystem > NTFS`
3. Click `Enable NTFS long paths` option and enable it

Once this option is on, PowerShell scripts automatically support long file names. 

As of Octopus `3.8.6`, Calamari supports this feature as well. This means that the majority of
tentacle actions support long paths. For exampled packages resulting in long paths can be extracted and powershells scripts
with a long filename can be run. 

Some features, for example C# scripts, do not yet support long paths.