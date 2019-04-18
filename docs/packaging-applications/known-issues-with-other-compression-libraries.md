---
title: Known Issues with Other Compression Libraries
description: Known issues with other compression libraries
position: 150
---

These are known issues to be aware of with other compression libraries:

- Atlassian Bamboo users who are using [Adam Myatt's  Zip File Task](https://bitbucket.org/adammyatt/bamboo-zip-file-tasks) and are extracting to a Linux machine may find that the contents don't get extracted into the correct folder structure but instead flattened with the path as the file name. This is the result of a [known issue](https://bitbucket.org/adammyatt/bamboo-zip-file-tasks/issues/4/change-request-use-forward-slashes-as-file) whereby the task does not confirm to the correct [PKWARE ZIP §4.4.17.1](http://help.octopus.com/discussions/problems/48081/r?go=aHR0cHM6Ly9wa3dhcmUuY2FjaGVmbHkubmV0L3dlYmRvY3MvY2FzZXN0dWRpZXMvQVBQTk9URS5UWFQ= "Link outside Support: https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT") specifications and is using a back slash instead of forward slash as the file separator. We would recommend avoiding this task where possible.
- Prior to the .NET framework 4.6.1, the *System.IO.Compression* library incorrectly preserved the windows-style back slash separator for file paths. This has since been fixed from [.NET Framework 4.6.1](https://msdn.microsoft.com/en-us/library/mt712573) and the fix carried over into [.NET Core](https://github.com/dotnet/corefx/commit/7b9331e89a795c72709aef38898929e74c343dfb).
- The above *System.IO.Compression bug* found its way into [Octo.exe](https://github.com/OctopusDeploy/Issues/issues/2583) when support for zip compression was added. A fix was not included until release 3.3.18 of Octo.exe to manually convert a back slash the to forward slash.
- The PKZIP specification requires that Zip files only need to store dates in the internal file headers with two bytes in the [MS-DOS format](https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html) (whereas tar file headers are stored in [UNIX epoch format](http://www.gnu.org/software/tar/manual/html_node/Standard.html)). This means that unless the compression library makes use of extra fields in the file headers, that a file compressed at some point in time on a machine in one timezone, may result in misleading dates when uncompressed in a different timezone.
