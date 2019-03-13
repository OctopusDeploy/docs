---
title: Reference Files Within a Package
description: How to reference files within a package.
position: 30
---

To reference files from the package you can use the below as a guide to where the parameters are pointing to, then it's just a case of using the values of these parameters to build up the absolute path to the file(s) that you want to manipulate or execute.

Relative paths will depend on a couple of things, if it's in a pre- or post-deploy script and if a custom installation directory has been defined. See below sections for differences.

`$OctopusParameters['Octopus.Action.Package.CustomInstallationDirectory']`will only be available if the **Custom installation directory** feature of the deploy step has been enabled.

In pre-deploy scripts:

- `$OctopusParameters['Octopus.Action.Package.CustomInstallationDirectory']`will be the path to where the contents of the package will be copied to once extracted, this could either not exist or contain the files from the previous release, not the new files being deployed.
- `$OctopusParameters['Octopus.Action.Output.Package.InstallationDirectoryPath']`will be where the contents of the package has been extracted
- The working directory for the Tentacle is the directory where the content of the package has been extracted to

In post-deploy scripts:

- `$OctopusParameters['Octopus.Action.Package.CustomInstallationDirectory']`will be the path to where the contents of the package has been copied to.
- `$OctopusParameters['Octopus.Action.Output.Package.InstallationDirectoryPath']`will be the same as the above.
- `$OctopusParameters['OctopusOriginalPackageDirectoryPath']` will be where the contents of the package has been extracted.
- The working directory for the Tentacle is the final destination for the contents of the package, either `$OctopusParameters['Octopus.Action.Output.Package.InstallationDirectoryPath']`, or if it's been specified `$OctopusParameters['Octopus.Action.Package.CustomInstallationDirectory']`.

So if you want to reference `file.txt` in `subfolder` within the package, you could do the following:

```powershell PowerShell
# in pre-deploy, in post-deploy if custom installation directory has not been defined
$extractPath = $OctopusParameters['Octopus.Action.Package.InstallationDirectoryPath'] 
# if a custom installation directory has been defined
$customPath = $OctopusParameters['Octopus.Action.Package.CustomInstallationDirectory']
# original extract path,
Get-Content "$extractPath\subfolder\file.txt"
# or when a custom installation directory has been defined,
Get-Content "$customPath\subfolder\file.txt"

# or as a relative path from the Tentacle's working directory, 
#   in pre-deploy this will be the original extract folder
#   in post-deploy this will be the custom install directory (if specified), otherwise the original extract folder
Get-Content ".\subfolder\file.txt"
```
```c# C#
// in pre-deploy, in post-deploy if custom installation directory has not been defined
var extractPath = Octopus.Parameters["Octopus.Action.Package.InstallationDirectoryPath"];
// if a custom installation directory has been defined
var customPath = Octopus.Parameters["Octopus.Action.Package.CustomInstallationDirectory"];
// original extract path,
Console.WriteLine(File.ReadAllText(extractPath + @"\subfolder\file.txt"));
// or when a custom installation directory has been defined,
Console.WriteLine(File.ReadAllText(customPath + @"\subfolder\file.txt"));

// or as a relative path from the Tentacle's working directory, 
//   in pre-deploy this will be the original extract folder
//   in post-deploy this will be the custom install directory (if specified), otherwise the original extract folder
Console.WriteLine(File.ReadAllText(@".\subfolder\file.txt"));
```
```bash Bash
# in pre-deploy, in post-deploy if custom installation directory has not been defined
extractPath="$(get_octopusvariable "Octopus.Action.Package.InstallationDirectoryPath")"
# if a custom installation directory has been defined
customPath="$(get_octopusvariable "Octopus.Action.Package.CustomInstallationDirectory")"
# original extract path,
cat "$extractPath/subfolder/file.txt"
# or when a custom installation directory has been defined,
cat "$customPath/subfolder/file.txt"

# or as a relative path from the Tentacle's working directory, 
#   in pre-deploy this will be the original extract folder
#   in post-deploy this will be the custom install directory (if specified), otherwise the original extract folder
cat "./subfolder/file.txt"
```
```fsharp F#
open System
open System.IO

// in pre-deploy, in post-deploy if custom installation directory has not been defined
let extractPath = Octopus.findVariable "Octopus.Action.Package.InstallationDirectoryPath"
// if a custom installation directory has been defined
let customPath = Octopus.findVariable "Octopus.Action.Package.CustomInstallationDirectory"
//original extract path,
printfn "%s" (File.ReadAllText(extractPath + @"\subfolder\file.txt"))
// or when a custom installation directory has been defined,
printfn "%s" (File.ReadAllText(customPath + @"\subfolder\file.txt"))

// or as a relative path from the Tentacle's working directory, 
//   in pre-deploy this will be the original extract folder
//   in post-deploy this will be the custom install directory (if specified), otherwise the original extract folder
printfn "%s" (File.ReadAllText(@".\subfolder\file.txt"))
```
