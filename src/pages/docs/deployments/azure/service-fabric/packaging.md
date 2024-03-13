---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Packaging a Service Fabric application
description: Learn how to package a Service Fabric application so it can be deployed from Octopus.
navOrder: 10
---

The Service Fabric SDK contains PowerShell cmdlets for deploying an application from a given folder on disk. The Service Fabric application projects provide targets that can be accessed via MSBuild, or used directly from Visual Studio, to package the content of that folder. The scripts provided in these projects can also be used to deploy the resulting package, but require access to the original source code tree to access the PublishProfiles and ApplicationParameters.

This guide will illustrate how the built in targets can be extended to produce a package that can be deployed using Octopus Deploy.

## Service Fabric solution/project files

The Package target that is part of a Service Fabric application project is designed to produce a package folder containing the `ApplicationManifest.xml` file, plus a folder for each service. The content of this folder however is not enough to actually deploy a Service Fabric application. In order to perform a deployment, a PublishProfile and its corresponding ApplicationParameters file are required.

When deploying straight from Visual Studio, the profile and parameters files are referenced from the source code, but when deploying through Octopus, they must be included in the NuGet/Zip package so they are available at deployment time.

## Packaging options

There are a couple of options available to bring all of the required files together for the package. Illustrated below are two possible options. Both options are based off a build process that starts with the following MSBuild call (assumed to be executed from the solution's folder).

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

Alternatively you could create a custom MSBuild targets file that does the file copying for you. One advantage of this option is that it also executes if you use "right-click > Package" in Visual Studio. To do this, create a custom targets file containing the following:

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
		<Message Text="Customizing package for octo packing => $([System.IO.Path]::GetFullPath($(PackageLocation)))" />
		<ItemGroup>  
			<ApplicationParametersFiles Include="$([System.IO.Path]::GetFullPath($(PackageLocation)))\..\..\ApplicationParameters\*.xml"/>  
			<PublishProfilesFiles Include="$([System.IO.Path]::GetFullPath($(PackageLocation)))\..\..\PublishProfiles\*.xml"/>  
		</ItemGroup>

		<Copy SourceFiles="@(PublishProfilesFiles)"
			DestinationFolder="$([System.IO.Path]::GetFullPath($(PackageLocation)))\PublishProfiles" />  
		<Copy SourceFiles="@(ApplicationParametersFiles)"
			DestinationFolder="$([System.IO.Path]::GetFullPath($(PackageLocation)))\ApplicationParameters" />  
	</Target>
</Project>
```

If we assume that this file was saved as OctoSFPackage.targets in a tools folder below the solutions folder, you then need to add the following line as the last child element of the Project element of the sfproj file.

```xml
<Import Project="..\tools\OctoSFPackage.targets" Condition="Exists('..\tools\OctoSFPackage.targets')" />
```

Once this line is added to the sfproj file, the target will get executed whenever the Package target executes. The Package target gets executed when the MSBuild command above (which is what your build server would be calling) is run or when you right-click the application project in Visual Studio and select Package.

## Package for Octopus with the Octopus CLI

Whichever option from above that you select, the objective is to get the `PublishProfiles` and the `ApplicationParameters` folders from the Service Fabric project into the same folder as its package output. The Octopus CLI can then be used to create a package that is compatible with the Octopus package feed. You can get the Octopus CLI from the [Octopus downloads](http://octopus.com/downloads) page.

<details data-group="deployments-azure-service-fabric">
<summary>PowerShell</summary>

```powershell
octo pack --id=MyFabricApplication --version=VERSION --format=Zip --outFolder=OUTPUT --basePath=MyFabricApplication\pkg\Release
```

</details>
<details data-group="deployments-azure-service-fabric">
<summary>Bash</summary>

```bash
octo pack --id=MyFabricApplication --version=VERSION --format=Zip --outFolder=OUTPUT --basePath=MyFabricApplication/pkg/Release
```

</details>

VERSION and OUTPUT are parameters provided by your build tool of choice, the exact syntax will depend on the tool.

## Final package structure

Once you have finished packaging, the package structure should look similar to the following, including an `ApplicationManifest.xml` file at the root, `ApplicationParameters` and `PublishProfiles` folders, plus folders for your services:

```
/ApplicationParameters/
/PublishProfiles/
/YourService1/
/YourService2/
/ApplicationManifest.xml
```

This structure includes the standard package output from Visual Studio (from a _Right-click > Publish_) plus the `ApplicationParameters` and `PublishProfiles` folders taken from the Service Fabric project.
