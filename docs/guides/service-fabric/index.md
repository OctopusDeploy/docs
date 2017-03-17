---
title: Continuous Integration for Service Fabric
description: Learn how Octopus Deploy fits into a Continuous Deployment pipeline for you Service Fabric applications.
position: 2
---

In this section you'll learn how Octopus Deploy fits into a Continuous Deployment pipeline for Service Fabric applications.

## Building
Apart from the requirement to have the Service Fabric SDK installed, Service Fabric applications are built the same way all other .NET based applications are built.

## Packaging
Service Fabric deployments are based on a package. A package in this context is a folder containing loose files.

Octopus Deploy deployments are also based on a package. A package in this context is a NuGet or Zip file, which is upload to the Octopus Deploy package feed, and contains the application files.

To package and deploy Service Fabric applications through Octopus Deploy we combine these 2 package concepts. A NuGet/Zip package is uploaded to Octopus Deploy and it contains the files/folders that make up the Service Fabric package.

Learn more about how to create an Octopus Deploy NuGet/Zip package for a Service Fabric application package.

## Deployment
Service Fabric application deployments follow the same conceptual process as other deployments in Octopus Deploy. The process is summarized as:

- Obtain the NuGet/Zip package from the Octopus Deploy feed
- Unpack the package to a work folder
- Perform variable substitution on the files in the work folder (both .xml and .config files are supported)
- Invoke a PowerShell script that uses cmdlets to perform the deployment

### Versioning
One of the places that Service Fabric applications differ from a typical .NET applications is in their versioning configuration. They are more complex in that they are actually made up of 1 or more services, and each of those services can have it's own code and config version, which all combine to make a specific application version.

Octopus Deploy does not enforce a particular process for managing application/service versions. In this section we will however explore how Octopus Deploy could be used to [automate updates to the application/service versions](/docs/guides/service-fabric/version-automation-with-service-fabric-application-packages/index.md).
