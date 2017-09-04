---
title: Self-Contained Calamari
description: A self-contained build of Calamari can be used on SSH Targets. This means Mono does not need to be installed.  
position: 3
version: "[3.16,)"
---

SSH Targets can be configured to use a self-contained build of [Calamari](/docs/api-and-integration/calamari.md). This means neither Mono nor .NET Core needs to be installed on the target server (there are still some [pre-requisite dependencies](#dependencies)).

:::hint
Self-contained Calamari support was added in Octopus 3.16
:::

Self-contained Calamari is built as a [.NET Core self-contained distributable](https://docs.microsoft.com/en-us/dotnet/core/deploying/#self-contained-deployments-scd). 

## Supported Distros

A list of the distros supported by .NET Core 2.0 can be found on the [.NET Core road-map](https://github.com/dotnet/core/blob/master/roadmap.md#net-core-20---supported-os-versions).    

## Dependencies 

[.NET Core has some dependencies](https://github.com/dotnet/core/blob/master/Documentation/prereqs.md) which must be installed on the target server.

## Limitations

### ScriptCS and F# Scripts

ScriptCS and F# scripts can not execute when using a self-contained Calamari build. 

ScriptCS has not been ported for .NET Core ([GitHub issue](https://github.com/scriptcs/scriptcs/issues/1183)). 

 Similarly, the F# interpreter has also not yet been ported for .NET Core ([GitHub issue](https://github.com/Microsoft/visualfsharp/issues/2407)).