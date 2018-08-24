---
title: Capture a Crash Dump
description: How to capture a crash dump to help the Octopus team diagnose problems when something unexpected happens.
position: 13
---

When something goes wrong in Octopus we may ask you to provide a Crash Dump to help us diagnose the problem. Most Octopus Deploy Servers or agents will be in a production environment so you may not want to install any software. Windows comes with the Windows Error Reporting Service or WER which you can configure to automatically record dumps of certain processes (If you don't mind installing software you can also use [DebugDiag](http://blogs.msdn.com/b/chaun/archive/2013/11/12/steps-to-catch-a-simple-crash-dump-of-a-crashing-process.aspx) [Download: [Microsoft Debug Diagnostic Tool](https://www.microsoft.com/en-us/download/details.aspx?id=49924)] but this article focuses on WER).

To enable crash dumps for Octopus you'll need to add a registry key for the Octopus process. The following code can be saved to a .reg file to automatically update the necessary registry keys

**RecordOctopusDump.reg**

```text
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Windows Error Reporting\LocalDumps\Octopus.Server.exe]
"DumpFolder"=hex(2):43,00,3a,00,5c,00,44,00,75,00,6d,00,70,00,73,00,00,00 ; C:\Dumps
"DumpCount"=dword:00000002 ; 2 (At most 2 dumps will be saved to disk)
"DumpType"=dword:00000002 ; 2 (Full Dump)
```

If you'd like to check the other options for these settings refer to the [Microsoft documentation](http://msdn.microsoft.com/en-us/library/windows/desktop/bb787181(v=vs.85).aspx).

After you run the .reg file, if you want to check the entries in regedit, it should look like this:

![](/docs/images/3048156/3278137.png)

Once you have a dump they'll then be written to `C:\Dumps\` named something similar to `Octopus.Server.exe.6127.dmp`. Next just zip the dump and upload it to the link that we'll have provided you.
