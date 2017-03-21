---
title: Packaging a Service Fabric application
description: Learn how to package a Service Fabric application so it can be deployed from Octopus.
---

The deployment-related Service Fabric PowerShell cmdlets that come with the Service Fabric SDK deploy an application from a given folder on disk.

## Service Fabric solution/project files

The Package target that is part of a Service Fabric application project is designed to produce a package folder containing the ApplicationManifest.xml file, plus a folder for each service. The content of this folder however is not enough to actually deploy an Service Fabric application. In order to perform a deployment, a PublishProfile and its corresponding ApplicationParameters file are required.

When deploying straight from Visual Studio, the profile and parameters files are referenced from the source code, but when deploying through Octopus, they must be included in the NuGet/Zip package so they are available at deployment time.

## Packaging options
There are a couple of options available to bring all of the required files together for the package. Illustrated below are two possible options. Both options are based off a build process that starts with the following MSBuild call (assumed to be executed from the solution's folder)

```
msbuild -t:Package MyFabricApplication\MyFabricApplication.sfproj
```

### Build step
The first option is to simply add another build step, using your build tool of choice, to copy the required PublishProfiles and ApplicationParameters files from the Service Fabric application folder to the _same_ folder that the above step outputs the package to.

```bash
xcopy /I MyFabricApplication\PublishProfiles\*.xml MyFabricApplication\pkg\Release\PublishProfiles
xcopy /I MyFabricApplication\ApplicationParameters\*.xml MyFabricApplication\pkg\Release\ApplicationParameters
```

### Custom build targets
Alternatively you could create a custom MSBuild targets file that does the file copying for you. One advantage of this option is that it also executes if you use "right-click > Package" in Visual Studio. To do this, create a custom targets file containing the following

```xml
<Project xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
    <PropertyGroup>
		<PackageDependsOn>
			$(PackageDependsOn);
			OctoSFPackage
    	</PackageDependsOn>
	</PropertyGroup>  
	<PropertyGroup>
    	<RunOctoSFPackage Condition="'$(RunOctoSFPackage)'==''">false</RunOctoSFPackage>
	</PropertyGroup>

	<Target Name="OctoSFPackage">
		<Message Text="Customising package for Octo packing => $([System.IO.Path]::GetFullPath($(PackageLocation)))" />	
		<ItemGroup>  
			<ApplicationParametersFiles Include="$([System.IO.Path]::GetFullPath($(PackageLocation)))\..\..\ApplicationParameters\*.xml"/>  
			<PublishProfilesFiles Include="$([System.IO.Path]::GetFullPath($(PackageLocation)))\..\..\PublishProfiles\*.xml"/>  
		</ItemGroup>
	
		<Copy  
			SourceFiles="@(PublishProfilesFiles)" 
			DestinationFolder="$([System.IO.Path]::GetFullPath($(PackageLocation)))\PublishProfiles"  
		/>  
		<Copy  
            SourceFiles="@(ApplicationParametersFiles)" 
            DestinationFolder="$([System.IO.Path]::GetFullPath($(PackageLocation)))\ApplicationParameters"  
		/>  
	</Target>
</Project>
```
If we assume that this file was saved as OctoSFPackage.targets in a tools folder below the solutions folder, you then simply add the following line as the last child element of the Project element of the sfproj file.

```xml
<Import Project="..\tools\OctoSFPackage.targets" Condition="Exists('..\tools\OctoSFPackage.targets')" />
```

## Octo.exe
Whichever option from above that you select, the objective is to get the PublishProfiles and the ApplicationParameters folders from the Service Fabric project into the same folder as its package output. Octo.exe can then be used to create a package that is compatible with the Octopus package feed. You can get Octo.exe from the [Octopus downloads](http://octopus.com/downloads) page. The following example assumes you've added Octo.exe to a tools folder in your solution's folder.

```bash
tools\octo.exe pack --id=MyFabricApplication --version=VERSION --format=Zip --outFolder=OUTPUT --basePath=MyFabricApplication\pkg\Release
```

VERSION and OUTPUT are parameters provided by your build tool of choice, the exact syntax will depend on the tool.
