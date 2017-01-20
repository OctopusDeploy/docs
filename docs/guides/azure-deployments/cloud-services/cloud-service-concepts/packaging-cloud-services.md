---
title: Packaging Cloud Services
position: 0
---


In order to deploy Cloud Services they must be packaged into the Cloud Service .cspkg format and then packaged inside an Octopus compatible NuGet package.

## Generate a Cloud Service package


Packaging into a .cspkg can be done in Visual Studio by right-clicking on the Cloud Service and selecting "Package...".  This action with generate a .cspkg and .cscfg file which can be deployed to Azure Cloud Services.


![Packaging an Azure Cloud Service](/docs/images/3049365/3278541.png "Packaging an Azure Cloud Service")

## Generate a NuGet package


Octopus requires additional metadata that is not present in the .cspkg file.  The .cspkg and .cscfg must be packaged into a NuGet package for use by Octopus. The easiest way generate a NuGet package is to use the [Octo.exe](/docs/home/packaging-applications/nuget-packages/using-octo.exe.md) command line tool:

**Packaging a Cloud Service with Octo.exe**

```powershell
Octo.exe pack --id=HelloCloud --basePath=C:\PathToAzureCloudService
```


Octo.exe will generate a NuGet package containing the .cspkg and .cscfg files:


![](/docs/images/3049365/3278542.png)


Here is a sample Cloud Service NuGet package: [HelloCloud.1.0.0.nupkg](https://download.octopusdeploy.com/demo/HelloCloud.1.0.0.nupkg)

## Upload to a NuGet feed


In order to make the NuGet package accessible to Octopus it needs to be uploaded to a [package repository](/docs/home/packaging-applications/package-repositories.md). The built-in Octopus package repository is accessible from Library > Packages and is a suitable place to upload your Cloud Service NuGet package:


![](/docs/images/3049331/3278524.png)
