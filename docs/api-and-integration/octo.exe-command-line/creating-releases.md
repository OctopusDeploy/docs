---
title: Creating Releases
description: Using the Octo.exe command line tool to create releases.
position: 2
---

[Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) can be used to automate the creation of releases using the **`create-release`** command. This allows you to easily integrate Octopus with other continuous integration servers.

This command allows you to create a release, and optionally deploy it to one or more environments.

:::success
**Using Channels?**
If you are using [Channels](/docs/deployment-process/channels/index.md) (introduced in **Octopus 3.2**) this command will automatically select the most appropriate channel for your release, unless you provide a specific channel using `--channel=VALUE`.
:::

Usage:

```bash
octo create-release [<options>]
```

Where `[<options>]` is any of:

**Create release options**

```text
!include <create-release>
```

## Basic Examples {#Creatingreleases-Basicexamples}

This will create a new release of the *HelloWorld* project using the latest available NuGet packages for each step in the project. The version number of the release will be the highest NuGet package version. You can override this using:

```bash
octo create-release --project HelloWorld --server http://octopus/ --apiKey API-ABCDEF123456
```

This will create a release with a specified release number (note that this is not the NuGet package version number):

```bash
octo create-release --project HelloWorld --version 1.0.3 --server http://octopus/ --apiKey API-ABCDEF123456
```

## Specifying the Package Version {#Creatingreleases-Specifyingthepackageversion}

For each step that has a package, the version is determined in the following order:

 1. The step name matches a `--package` parameter or a file filename found by `--packagesFolder`
 1. The package id matches a `--package` parameter or a file found by `--packagesFolder`
 1. The value from the ` --defaultpackageversion` or `--packageversion` parameter

 If there are duplicate names/ids resulting from the `--package` and `--packagesFolder` parameters, the last one specified is used.

### Option --packageVersion
This will create a release *(1.0.3)* with a specified NuGet package version *(1.0.1)*:

```bash
octo create-release --project HelloWorld --version 1.0.3 --packageVersion 1.0.1 --server http://octopus/ --apiKey API-ABCDEF123456
```

### Option --package
This will create a release for a project with multiple packages, each with a different version. You are able to specify a step name and version pair with this option. This way you can use different versions of the same package for different steps:

```bash
octo create-release --project HelloWorld --version 1.0.3 --package StepA:1.0.1 --package StepB:1.0.2 --server http://octopus/ --apiKey API-ABCDEF123456
```

If you want to use a specific version of a package for `StepA`, and the latest version of the package available for `StepB`, you can simply omit the parameter for the second step/package:

```bash
octo create-release --project HelloWorld --version 1.0.3 --package StepA:1.0.1 --server http://octopus/ --apiKey API-ABCDEF123456
```

This example will use `1.0.3` for `StepA`, and the latest version available at the moment for `StepB`.

### Option --packagesFolder

This will create a release for a project with multiple packages, by taking the version for each package from a folder containing the packages (this approach works well if your build server has just built the packages):

```bash
octo create-release --project HelloWorld --version 1.0.3 --packagesFolder packages --server http://octopus/ --apiKey API-ABCDEF123456
```

## Deploying a Release After Creating It {#Creatingreleases-Deployingareleaseaftercreatingit}

To create a release *and* deploy it to an environment named *Production*:

```bash
octo create-release --project HelloWorld --deployto Production --server http://octopus/ --apiKey API-ABCDEF123456 --progress
```

## Release Notes Supported Syntax
We use [showdownjs](https://github.com/showdownjs/showdown) to render release notes on the dashboard.
Showdownjs supports the common markdown syntax as well as a rich set of extras such as tables and task lists. For the full list see https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax.
