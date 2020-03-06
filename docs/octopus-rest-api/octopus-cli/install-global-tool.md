---
title: Octopus CLI Global Tool
description: Octopus CLI installation
position: 0
---

You can install the Octopus CLI as a .NET Core [Global Tool](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools). This requires that you have the [.NET Core SDK](https://dotnet.microsoft.com/download/) installed.

## Specific location
A local installation can be done into a specified location using the `--tool-path` parameter.

```bash
dotnet tool install Octopus.DotNet.Cli --tool-path /path/for/tool --version <version>
```
This will install the Octopus CLI into the specified location and generate a platform specific executable called `dotnet-octo` into the specified location. In order to enable `dotnet` to find your custom tool location, you will need to add the tool location to the current environment path.

**PowerShell**

```powershell
$env:PATH = "your\tool\folder;" + $env:PATH
```

**Bash**
```
export PATH="$PATH:/your/tool/folder"
```

Once the tool folder is in the path you can run the Octopus CLI commands with .NET: `dotnet octo pack`.

## User installation

In order to install The Octopus CLI for the current user you can do so by installing the tool globally using
`--global` flag.

```bash
dotnet tool install Octopus.DotNet.Cli --global --version 4.39.1
```
You may also omit the `--version` parameter to install the latest version of the tools.

Check the output to make sure the installation works correctly. After the installation has completed, you can run the following to verify the version the Octopus CLI that was installed:

```
dotnet octo --version
```

### Updating
In order to update to the latest version of the tool you can use the `dotnet update` command

```bash
dotnet tool update Octopus.DotNet.Cli --global
```

If you would like to update to a specific version or downgrade to an older version you can do
so by first uninstalling the tool and installing it again.

```bash
dotnet tool uninstall Octopus.DotNet.Cli --global
dotnet tool install Octopus.DotNet.Cli --global --version <version>
```
