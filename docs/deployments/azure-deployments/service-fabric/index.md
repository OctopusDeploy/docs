---
title: Continuous integration for Service Fabric
description: Learn how Octopus Deploy fits into a Continuous Deployment pipeline for you Service Fabric applications.
position: 2
---

In this section you'll learn about how to configure your Continuous Deployment pipeline to deploy Service Fabric applications using Octopus Deploy.

## Compiling
Apart from the requirement to have the Service Fabric SDK installed, Service Fabric applications are built the same way all other .NET-based applications are built.

## Packaging
Service Fabric deployments are based on a package. A package in this context is a folder containing loose files.

Octopus Deploy deployments are also based on a package. A package in this context is a NuGet or Zip file, which is uploaded to the Octopus Deploy package feed, and contains the application files.

To package and deploy Service Fabric applications through Octopus Deploy, we combine these two package concepts. A NuGet/Zip package is uploaded to Octopus Deploy and it contains the files/folders that make up the Service Fabric package.

[Learn more about how to create an Octopus Deploy NuGet/Zip package for a Service Fabric application package](/docs/deployments/azure-deployments/service-fabric/packaging.md).

## Deployment
Service Fabric application deployments follow the same conceptual process as other deployments in Octopus Deploy. The process is summarized as:

- Obtain the NuGet/Zip package version from the Octopus Deploy feed.
- Unpack the package to a work folder.
- Perform variable substitution on the files in the work folder (both .xml and .config files are supported).
- Invoke a PowerShell script that uses cmdlets to perform the deployment.

For a more detailed look at the deployment process see [Deploying a package to a Azure Service Fabric cluster](/docs/deployments/azure-deployments/deploying-to-service-fabric/deploying-a-package-to-a-service-fabric-cluster/index.md#deployment-process)

### Versioning
One of the places that Service Fabric applications differ from typical .NET applications is in their versioning configuration. They are more complex in that they are actually made up of one or more services, and each of those services can have its own code and config version, which all combine to make a specific application version. The set of services that make up an application are always deployed to the cluster using a single package.

Octopus Deploy does not enforce a particular process for managing application/service versions. [Learn more about using Octopus Deploy to automate updates to the application/service versions](/docs/deployments/azure-deployments/service-fabric/version-automation-with-service-fabric-application-packages/index.md).

### Overwrite vs rolling upgrades

The default behavior of the Service Fabric deployments is to overwrite an existing  application. What this means is that if the application already exists in the cluster it will be removed first and the redeployed (you'll see it using *RegisterAndCreate* in the logs).

The alternative approach is to use rolling deployments. To use this, add the following line to your publish profile in the source

```xml
<UpgradeDeployment Enabled="true" />
```

It will then update each node in turn with the new version (you'll see it using *RegisterAndUpgrade* in the logs).