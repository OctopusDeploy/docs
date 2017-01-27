---
title: NanoPack
---

[Nano Server ](https://technet.microsoft.com/en-us/windows-server-docs/get-started/getting-started-with-nano-server)is a new installation option available for Windows Server 2016. It is optimized as a lightweight operating system for running applications based on containers or in virtual machines. Due to its small size it opens the possibility of treating complete virtual machine VHDs as build artifacts. NanoPack is a tool to help you bundle your ASP.NET Core application in to a Nano Server VHD that is ready to be deployed with Octopus. A zipped Nano Server VHD with IIS installed is under 200Mb.

NanoPack is a wrapper around the `New-NanoServerImage`PowerShell script that is provided on the Windows Server 2016 ISO. To proceed you will need the \NanoServer folder from the ISO copied to a location that is accessible by NanoPack and to be running with Administrator rights. For complicated scenarios it may make sense to use New-NanoServerImage directly rather than using NanoPack. Guidance can be found in Microsoft's documentation [here](https://technet.microsoft.com/en-us/windows-server-docs/get-started/nano-server-quick-start).

## Preparing Your Application {#NanoPack-PreparingYourApplication}

To work with NanoPack your application needs to be published as a standalone app (i.e. one that bundles up the .NET Core runtime and does not require .NET Core to be installed). To do this remove the `&quot;type=&quot;platform&quot;` from the `Microsoft.NETCore.App` dependency in your `project.json` so that it looks like:

```powershell
"frameworks": {
  "netcoreapp1.0": {
    "dependencies": {
      "Microsoft.NETCore.App": {
        "version": "1.0.1"
      }
    }
  } 
}
```

Then add the `win10-x64` target to your `runtimes` section:

```powershell
"runtimes": {
  "win10-x64": {}
}
```

## Installing NanoPack {#NanoPack-InstallingNanoPack}

To begin using NanoPack you need to add to add it to the `tools`section of your ASP.NET Core application's `project.json` file (the other tools shown are part of the default ASP.NET Core template and not needed by NanoPack itself).

```powershell
"tools": {
  "BundlerMinifier.Core": "2.0.238",
  "Microsoft.AspNetCore.Razor.Tools": "1.0.0-preview2-final",
  "Microsoft.AspNetCore.Server.IISIntegration.Tools": "1.0.0-preview2-final",
  "NanoPack": "0.1.21"
}
```

## Calling NanoPack During Publish {#NanoPack-CallingNanoPackDuringPublish}

Now that you have added NanoPack to your tools it is available for use in the `scripts` section of your `project.json`. To correctly package your application with NanoPack you need to point it to the output of `dotnet` publish, to do this add the call as a `postpublish` script in your `project.json`. For example:

```powershell
  "scripts": {
    "postpublish": [
      "dotnet publish-iis --publish-folder %publish:OutputPath% --framework %publish:FullTargetFramework%",
      "dotnet nanopack --inputpath %publish:OutputPath% --nanoServerFilesPath C:\\NanoServerFiles"
    ]
  }
```

This is the minimum required to get NanoPack to work, here `%publish:OutputPath%` is a variable filled in my the `dotnet` build tooling, and `C:\\NanoServerFiles` is the location you have copied the`\NanoServer` folder from the Windows Server 2016 ISO to. The `dotnet publish-iis` call is in the ASP.NET Core template and modifies your web.config to correctly run within IIS and should generally be kept. As shown NanoPack will create a VHD and place it in a NanoPacked folder next to the input path provided. The VHD will have IIS installed and your application served on port 80.

:::warning
The path handed to --nanoServerFilesPath must contain the \NanoServer folder, not the contents of that folder. For example if you pass --nanoServerFilesPath C:\\NanoServerFiles the directory structure should look like:

```powershell
C:\
├── NanoServerFiles\
    ├── NanoServer\
        ├── NanoServerImageGenerator\
        ├── Packages\       
        ├── NanoServer.vim
        ├── ReadMe.txt
```
:::

## More Options {#NanoPack-MoreOptions}

NanoPack can also be used to build a VHD, package it in to a versioned zip file and post it to Octopus:

```powershell
dotnet nanopack --inputpath %publish:OutputPath% --nanoServerFilesPath C:\\NanoServerFiles --package --octopusUrl http:/my.octopus.server.com:8888 --apiKey API-MYOCTOPUSAPIKEY
```

The complete options for NanoPack are:

```powershell
Usage:  [options]
Options:
  -o | --outputPath <folder>    The folder the output VHD will be created (optional). If not supplied a /Nanopacked folder will be created one level up from your inputpath folder
  -i | --inputPath <folder>     The path to the application folder to be packaged (required)
  -m | --mediaPath <folder>     The path to your nano server installation files (required)
     | --maxSize <size>         The maximum size of the VHD (optional). Default is 4GB
     | --publishPath <folder>   The path within the VHD to copy your application to (optional). Default is /PublishedApp
  -e | --executableName <name>  The name of the executable file in the publish folder to extract version information from (optional, if not provided NanoPack will scan the target folder for an executable)
  -p | --port <port>            The port IIS will serve your app on (optional). Default is 80
  -n | --computerName <name>    The name of your NanoServer (optional). Default is NanoServer
       --package                Package the VHD into a Zip file with the app version in its name, ready to be pushed to Octopus
       --keepPackagedVhd        Do not delete the original VHD after it has been packaged with the --package option
       --keepUploadedZip        Do not delete the zipped VHD after it has been uploaded to Octopus
  -u | --octopusUrl <url>       The URL of your Octopus server. If provided, and --package is set, NanoPack will push the packaged VHD to the built in package feed (optional)
  -k | --apiKey <key>           An Octopus API key (required if --octopusUrl is set)
       --password <password>    The Administrator password of the resulting NanoServer image (optional). Default is P@ssw0rd
  -x | --vhdx                   Build a VHDX rather than a VHD
       --edition <edition>      The windows server edition. Standard or Datacenter
  -s | --firstBootScript <path> Path to a PowerShell script that will be copied to the VHD and run on its first boot. Multiple allowed.
     | --copyPath <path object> Copy files to your VHD. This argument is passed through to the  New-NanoServerImage cmdlet and must be a string that evals to a PowerShell array or hash map.
  -a | --additional             Extra options to pass to New-NanoServerImage, for example: -a "-Ipv4Address \"172.21.22.101\"". Multiple allowed.
  -? | --help                   Show help information
```

## Copying Additional Files {#NanoPack-CopyingAdditionalFiles}

To copy additional files to your VHD use the`--copyPath` option. The parameter to this argument must evaluate to a valid PowerShell array or hash map as it is handed through to the `copyPath` argument of the `New-NanoServerImage` cmdlet. If argument evaluates to an array of file paths, those files will be copied to the root of the VHD, if it is a hash map the hash keys are file paths that will be copied to a folder specified by the hash values. For example:

```powershell
# Hash map syntax will copy both files into the CopiedFiles folder on your VHD
--copyPath @{ "c:\temp\file1.txt" = "CopiedFiles" ; "c:\temp\file2.txt" = "CopiedFiles" }
 
# Array syntax will copy both files into the root of your VHD
--copyPath ( "c:\temp\file1.txt" , "c:\temp\file2.txt" )
 
# These arguments will have to be escaped differently depending on whether you are calling NanoPack directly from the command line, or from within project.json
# Command line escaping (surround in double quotes so it is seen as a single string argument then escape other double quotes):
--copyPath "@{ \"c:\temp\file1.txt\" = \"CopiedFiles\" ; \"c:\temp\file2.txt\" = \"CopiedFiles\" }"
--copyPath  "( \"c:\temp\file1.txt\" , \"c:\temp\file2.txt\" )"
 
# project.json unfortunately requires double escaping:
--copyPath \"@{ \\\"c:\\temp\\file1.txt\\\" = \\\"CopiedFiles\\\" ; \\\"c:\\temp\\file2.txt\\\" = \\\"CopiedFiles\\\" }\"
--copyPath \"( \\\"c:\\temp\\file1.txt\\\" , \\"c:\\temp\\file2.txt\\\" )\"
```
