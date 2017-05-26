---
title: Bamboo
description: Octopus Deploy and Bamboo can work together to make automated, continuous delivery easy.
position: 0
---

The Octopus Deploy add-on for Bamboo allows packages to be uploaded to an Octopus Deploy server, as well as creating, deploying and promoting releases to your Octopus Deploy [environments](https://octopus.com/docs/key-concepts/environments). The add-on does this by running the [Octopus Deploy Command Line tool](https://octopus.com/docs/api-and-integration/octo.exe-command-line).

# Getting Started

The plugin relies on a local copy of the Octopus Deploy Command Line tool being available to the build agent. The command line tool can be downloaded from the [Octopus Deploy Download](https://octopus.com/docs/api-and-integration/octo.exe-command-line) page.

Note that while the command line tool package is largely self contained, some Linux distributions require additional libraries to be installed before .NET Core applications will run. These packages are documented at the [Get started with .NET Core](https://www.microsoft.com/net/core) website.

To verify that the command line tool can be run, execute it from a terminal. When run with no arguments, the `Octo` executable will display a list of available commands.

# Installing the Add-on

Follow the instructions at [Installing add-ons](https://confluence.atlassian.com/display/UPM/Installing+add-ons) to install the Octopus Deploy Bamboo add-on.

TODO: Include some instructions about finding the Octopus Deploy add-on here (i.e. what do you search for).

# A Typical Workflow for Pushing Packages and Deploying Releases

There are a number of typical steps that are required to push a package to Octopus Deploy and deploy a release:

1. Build the application with Bamboo.
2. Create an archive with a tool like tar or 7zip complying with the Octopus Deploy [versioning requirements](https://octopus.com/docs/packaging-applications/versioning-in-octopus-deploy).
3. Push the package to Octopus Deploy.
4. Create a release in Octopus Deploy.
5. Deploy a release with Octopus Deploy.

Let's take a look at the steps that you could use to push a Java WAR file built with Maven to Octopus Deploy.

## 1. Build the Application
We'll assume that there is already a Bamboo build plan in place that produces a WAR file using Maven. The [Bamboo Documentation](https://confluence.atlassian.com/bamboo/maven-289277038.html) describes how this is done.

## 2. Create the Package
With the WAR file built, we need to add it to an archive that complies with the Octopus Deploy [versioning requirements](https://octopus.com/docs/packaging-applications/versioning-in-octopus-deploy). In this example we will stick to a simple `AppName.Major.Minor.Patch` semver format.

Creating the archive is done with a [Bamboo Script task](https://confluence.atlassian.com/bamboo/script-289277046.html) that calls an archive tool to generate an appropriately named archive file. Octopus Deploy supports a number of package types; see [Supported Packages in Octopus Deploy](https://octopus.com/docs/packaging-applications/supported-packages) for more information.

For Bamboo build agents hosted on a Linux server, the script body can call `tar` to create the archive. Note that we first enter the `target` directory and then create the archive. This is required to ensure the resulting gzip file does not include the `target` directory, just the WAR file.

```
cd target
tar -czf ../myapplication.0.0.${bamboo.buildNumber}.tar.gz *.war
```

For Bamboo build agents hosted on a Windows server, you may want to use a tool like [7Zip](http://www.7-zip.org/download.html) to build the archive, in which case the following command can be used. Note the leading `./` before the path to the WAR file is significant, as it removes the `target` directory from the resulting zip file. See [this discussion](https://stackoverflow.com/questions/10753667/compressing-only-files-using-7z-without-preserving-the-path) on StackOverflow for more information.

```
"C:\Program Files\7-Zip\7z.exe" a -tzip myapplication.0.0.%bamboo_buildNumber%.zip ./target/*.war
```

In both cases we have used the variable `bamboo.buildNumber` to generate a package whose filename includes the build number as the semver patch version e.g. `myapplication.0.0.23.tar.gz`. It is highly recommended that all packages and releases across Bamboo and Octopus Deploy reference a unique version tied to a specific build to make management and auditing easier.

## 3. Push the Packages

Pushing the package to Octopus Deploy is done with the `Octopus Deploy: Push Packages` task. In addition to the [common configuration fields](#commonConfiguration), this task requires the paths to the packages to be pushed and forcing package uploads.

This step runs the [push command](https://octopus.com/docs/api-and-integration/octo.exe-command-line/pushing-packages) on the command line tool.

### Package paths

The `Package paths` field defines the [Ant paths](https://ant.apache.org/manual/dirtasks.html) that are used to match packages to be pushed to Octopus Deploy. The Ant path `**/*${bamboo.buildNumber}.tar.gz` mathes the gzip file created with `tar`, while the path `**/*${bamboo.buildNumber}.zip` matches the zip file created with `7z`.

Note that it is recommended that the package paths defined here are specific to the build. While the Ant paths `**/*.tar.gz` and `**/*.zip` do match the packages, they also match any old packages that might have been created in previous builds and not cleaned up. This means these less specific paths can result in old packages being uploaded, which is usually not the desired result.

### Force overwrite existing packages

The `Force overwrite existing packages` option can be selected to allow existing packages to be overwritten.

Tick this option, as it allows a build to be rebuilt and the new package to be pushed again without error.

![Push Package](PushPackage.PNG)

## 4. Create a Release

Creating a release is done with the `Octopus Deploy: Create Release` task. In addition to the [common configuration fields](#commonConfiguration), this task requires the Octopus Deploy project to create the release for and the version number of the release.

This steps runs the [create-release command](https://octopus.com/docs/api-and-integration/octo.exe-command-line/creating-releases) on the command line tool.

### Project

The `Project` field defines the name of the [Octopus Deploy project](https://octopus.com/docs/key-concepts#KeyConcepts-Projects,deploymentprocesses,lifecyclesandvariables) that the release will be created for.

### Release number

The `Release Number` field defines the version number for the release.

Although this field is optional, it is highly recommended that the release number be tied to the Bamboo build number e.g. `0.0.${bamboo.buildNumber}`. The reason for this is Bamboo allows you to rebuild old builds, and if the `Release number` is not defined it will be assigned a default version number in Octopus Deploy. This can lead to a situation where build number 10 in Bamboo is rebuilt, and release number like 0.0.128 is created in Octopus Deploy, which is almost certainly not the desired result.

### Environment(s)

The `Environment(s)` field defines the [Octopus Deploy environments](https://octopus.com/docs/key-concepts#KeyConcepts-Environments,machinesandroles) that the new release is to be deployed to.

It is recommended that this field be left blank, because the `Ignore existing releases` option needs to be enabled to allow builds to be rebuilt,
and if the environment already exists and the `Ignore existing releases` option is enabled no deployments will take place. We'll use a dedicated
step to handle deployments.

### Ignore existing releases

The `Ignore existing releases` option can be selected to skip the create release step if the release version already exists.

Tick this option, as it allows builds to be rebuilt. Otherwise rebuilds will attempt to recreate an existing environment and the step will fail.

![Create Release](CreateRelease.PNG)

## 5. Deploy a Release

Releases can be deployed with the `Octopus Deploy: Deploy Release` task. In addition to the [common configuration fields](#commonConfiguration), this task requires the Octopus Deploy project to deploy, the environments to deploy to, and the release number to deploy.

This steps runs the [deploy-release command](https://octopus.com/docs/api-and-integration/octo.exe-command-line/deploying-releases) on the command line tool.

### Project

The `Project` field defines the name of the [Octopus Deploy project](https://octopus.com/docs/key-concepts#KeyConcepts-Projects,deploymentprocesses,lifecyclesandvariables) that the deployment will be done for.

### Environment(s)

The `Environment(s)` field defines the [Octopus Deploy environments](https://octopus.com/docs/key-concepts#KeyConcepts-Environments,machinesandroles) that the release is to be deployed to.

### Release number

The `Release Number` field defines the release version number to deploy.

![Deploy Release](DeployRelease.PNG)

## (Optional, and not recommended) Promote a Release

Releases can be promoted to new environments with the `Octopus Deploy: Promote Release` task. In addition to the [common configuration fields](#commonConfiguration), this task requires the Octopus Deploy project to deploy, the environment to promote from, and the environment to promote to.

This steps runs the [promote-release command](https://octopus.com/docs/api-and-integration/octo.exe-command-line/promoting-releases) on the command line tool.

:::warning
Because the promotion from one environment to another is not tied to any particular release number, adding this task to a Bamboo build plan means every time the plan is run (or more importantly rerun), releases will be promoted between environments. This is almost certainly not the desired result, and so it is not recommended that promotions be done as part of a Bamboo build plan.
:::

### Project

The `Project` field defines the name of the [Octopus Deploy project](https://octopus.com/docs/key-concepts#KeyConcepts-Projects,deploymentprocesses,lifecyclesandvariables) that the deployment will be done for.

### Promote from

This `Promote from` field defines the environment whose release will be promoted to the `Promote to` environment.

### Promote to

This `Promote to` field defines the environment whose release will be promoted from the `Promote from` environment.

<a name="commonConfiguration"></a>
# Common Configuration

All of the Octopus Deploy tasks share a number of common configuration fields.

#### Octopus URL

The `Octopus URL` field defines the URL of the Octopus Deploy server that the package will be pushed to. This URL must include the scheme `http:\\` or `https:\\`, and also include the port if it is not the default of `80` or `443`.

#### API key

The `API key` field defines the API key that is used to authenticate with the Octopus Deploy server. See [How to create an API key](https://octopus.com/docs/how-to/how-to-create-an-api-key) for more information.

#### Octopus CLI
The `Octopus CLI` field references a [Bamboo capability](https://confluence.atlassian.com/bamboo/capability-289277445.html) that defines the path to the Octopus Deploy Command Line tool.

Click the `Add new executable` link to specify the location of the command line tool. The `Executable label` can be anything you want, and the `Path` is the full path to the command line tool executable file.

![Add new executable](Executable.PNG)

#### Enable debug logging

The `Enable debug logging` option is used to enable detailed logging from the command line tool.

#### Additional command line arguments

The `Additional command line arguments` field is used to specify additional arguments to pass to the command line tool.
You can find more information on the arguments accepted by the command line tool at the
[Octo.exe Command Line](https://octopus.com/docs/api-and-integration/octo.exe-command-line) page.

# Using Bamboo Deployment Plans

The Octopus Deploy add-on tasks can be used either in Bamboo build or deployment plans. Where you use these tasks is up to you.

If you already have a number of environments set up in Bamboo, it may make sense to create and deploy Octopus Deploy releases from the Bamboo deployment plan. Doing so allows you to retain the familiar Bamboo build and deployment workflow, while having Octopus Deploy do the actual deployment.

The recommended task sequence for a deployment project in Bamboo is this:
1. A `Octopus Deploy: Push Packages` task in the Bamboo build plan with a package version number linked to the Bamboo build number and the `Force overwrite existing packages` selected.
1. A `Octopus Deploy: Create Release` task in the Bamboo deployment plan with a `Release number` linked to the Bamboo build number, the `Ignore existing releases` option selected, and no `Environments(s)` set to deploy to.
2. A `Octopus Deploy: Deploy Release` task in the Bamboo deployment plan with a `Release number` linked to the Bamboo build number.

These steps will allow packages to be pushed and repushed, and new releases to be created, deployed and rolled back to previous releases.

# Troubleshooting

## Unexpected Behaviour in Deployment Plans
There are some issues to keep in mind when using the Octopus Deploy add-on tasks from a Bamboo deployment project.

The first issue is that the `Octopus Deploy: Create Release` task is only suitable for creating and optionally deploying new releases, not rolling back to previous releases. Consider these following scenarios:
1. The create release task is defined with no release number. Each time it is run, or rerun via a rollback initiated via the Bamboo deployment project, this task will create a new release in Octopus Deploy. This is not appropriate behaviour for a Bamboo deployment project.
2. The create release task is defined with a fixed release number related to the Bamboo build. To allow this task to be rerun without error, the `Ignore existing releases` option needs to be selected. When `Ignore existing releases` is selected, the create release task is essentially skipped during a rerun, meaning no deployment is done. This is not the expected behaviour of a rollback initiated via the Bamboo deployment project.

The second issue is that the `Octopus Deploy: Promote Release` task may not work as you expect when used with a Bamboo deployment plan. Because the promotion from one environment to another is not dependent on any release versions, every time this step is run it will attempt to promote a release forward in Octopus Deploy, even if the task was run as part of a rollback.

For this reason it is recommended that the promote release task not be used as part of either a Bamboo build or deployment plan.

## Octopus Command Line Tool Failed to Run in Linux

The Octopus Command Line tool packages for Linux are relatively self contained, but depending on your Linux distribution you may need to install some additional dependencies for the command line tool to run.

For example, in Centos 7 you might see this error:

```
Failed to load /tmp/libcoreclr.so, error: libunwind.so.8: cannot open shared object file: No such file or directory
Failed to bind to CoreCLR at '/tmp/libcoreclr.so'
```

The solution is to install the packages detailed at the [Get started with .NET Core](https://www.microsoft.com/net/core) website.

```
sudo yum install libunwind libicu
```

## Manually Running the Command Line Tool

The Bamboo build logs show how the command line tool is run. Look for log messages like this:

```
running command line: \n/opt/octocli/Octo push --server http://localhost --apiKey API-....................QGWUHKO --replace-existing --debug --package /opt/atlassian-bamboo-6.0.0/xml-data/build-dir/BPT-TBD-JOB1/myapplication.0.0.5.tar.gz
```

This is the command that was run to perform the actual interaction with the Octopus Deploy server, with the exception of the
redacted API key. You can take this command and run it manually to help diagnose any issues.

# Error Codes

Error conditions encountered by the add-on have unique error codes, which are listed here.

| Error Code | Description |
|------------|-------------|
| OCTOPUS-BAMBOO-INPUT-ERROR-0001 | No matching files could be found to push to Octopus Deploy. Check that the file pattern matches a file in the Bamboo working directory. |
| OCTOPUS-BAMBOO-INPUT-ERROR-0002 | A required field was empty. |
| OCTOPUS-BAMBOO-INPUT-ERROR-0003 | The server capability that defines the path to the Octopus CLI has an incorrect path. Make sure The path you assigned to the Octopus CLI is correct. |
