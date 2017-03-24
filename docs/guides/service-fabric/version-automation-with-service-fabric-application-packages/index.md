---
title: Version Automation with Service Fabric application packages
description: Octopus Deploy can help you automate versioning of your Service Fabric application packages.
---

In this section, we will discuss some ways Octopus Deploy can help with versioning your Service Fabric applications. Versioning in Service Fabric is a complex topic and the ideas discussed here are suggestions and possible options, not hard and fast rules.

## Application and Service versions
A Service Fabric application is not a single physical "thing". It is the combination of one or more services. Each service has its own individual version, based on its code and configuration versions. The combination of service versions then make up the overall application version.

### Code and Config versioning
As mentioned above, each service that makes up an application can be versioned independently. One strategy for managing these versions is to have the developers manually update them in the solution's manifest files. This is how the [Visual Studio based deployment model](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-application-upgrade-tutorial) works, and is the default behavior you will get from Octopus Deploy if no other action is taken.

When using an automated build system as part of a Continuous Delivery pipeline, it is common to stamp all of the binaries in the build as a set, with the same version number. Mature build tools will have a mechanism for easily managing the version number and assigning it to the assemblies during the build.

The service code versions in the manifest XML files should also be assigned the same version number. The build tools are less likely to have an easy way to manage this. Fortunately, Octopus Deploy has a way to manage this, as we'll see below.

The first step to setting this up is to update the service's manifest with specific variable names that we'll define in Octopus later. Repeat this for each service, using `Service_CodeVersion` for all services and varying `MyStatelessService_ConfigVersion` per service:

```xml
<ServiceManifest Name="MyStatelessServicePkg"
    Version="Code_#{Service_CodeVersion}_Config_#{MyStatelessService_ConfigVersion}"
    xmlns="http://schemas.microsoft.com/2011/01/fabric"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <ServiceTypes>
        <StatelessServiceType ServiceTypeName="MyStatelessServiceType" />
    </ServiceTypes>
    <CodePackage Name="Code" Version="#{Service_CodeVersion}">
        <EntryPoint>
            <ExeHost>
                <Program>MyStatelessService.exe</Program>
            </ExeHost>
        </EntryPoint>
    </CodePackage>
    <ConfigPackage Name="Config" Version="#{MyStatelessService_ConfigVersion}" />
    ...
```

Using this approach, the service's overall version is always a combination of its code and config version. Next, we use a similar approach to build the application's overall version, based on the services' code version and config versions:

```xml
<ApplicationManifest 
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    ApplicationTypeName="DemoFabricApplicationType" 
    ApplicationTypeVersion="DemoApp_#{Service_CodeVersion}_MyStatelessService_#{MyStatelessService_ConfigVersion}"
    xmlns="http://schemas.microsoft.com/2011/01/fabric">
    <Parameters>
        <Parameter Name="MyStatelessService_InstanceCount" DefaultValue="-1" />
    </Parameters>
    <ServiceManifestImport>
        <ServiceManifestRef 
            ServiceManifestName="MyStatelessServicePkg"
            ServiceManifestVersion="Code_#{Service_CodeVersion}_Config_#{MyStatelessService_ConfigVersion}" />
        <ConfigOverrides />
    </ServiceManifestImport>
	...
```

If you have multiple services, you'll probably want a more efficient abbreviation scheme to keep the version strings to a reasonable length. From the code side, that's all there is to do. Next, let's look at the Octopus Deploy variables we now need to define:

| Name | Value | Scope |
| ---- | ----- | ----- |
| Service_CodeVersion | #{Octopus.Action.Package.PackageVersion} | |
| MyStatelessService_ConfigVersion | 1.0.0 | |

The important part of this is `Octopus.Action.Package.PackageVersion`, which is the version taken from the package that was uploaded to the Octopus package feed. This lets us easily flow the version number from the build through to the deployment. From this point the code and overall versions will all be handled automatically. The config versions though are a little complicated and still require some manual handling.

They are complicated in that each service may have any number of configuration values, and when any one of them changes, then the service's config version should be bumped. This isn't something that Octopus has automatic support for, so these versions have to be handled manually.

To illustrate with an example, consider an application that is made up of two services (one that needs a connection setting and one that needs a port setting). We might end up with Octopus variables as follows:

| Name | Value | Scope |
| ---- | ----- | ----- |
| MyStatelessService1_ConfigVersion | 1.0.0 | |
| MyStatelessService1_Connection | abc | |
| MyStatelessService2_ConfigVersion | 1.0.0 | |
| MyStatelessService2_Port | 8000 | |

If the connection setting for the first service was changed, then the resulting variables should be:

| Name | Value | Scope |
| ---- | ----- | ----- |
| MyStatelessService1_ConfigVersion | **1.0.1** | |
| MyStatelessService1_Connection | **xyz** | |
| MyStatelessService2_ConfigVersion | 1.0.0 | |
| MyStatelessService2_Port | 8000 | |

### Environments and Tenants
Any feature of Octopus that causes one of the service variables to be scoped creates further complexity, as the version needs to also be scoped to the most granular level that the variables are being scoped to. To illustrate, let's expand on the previous example and say the connection for the first service is environment specific. Now the variables would look like this:

| Name | Value | Scope |
| ---- | ----- | ----- |
| MyStatelessService1_ConfigVersion | 1.0.0 | Dev |
| MyStatelessService1_Connection | abc | Dev |
| MyStatelessService1_ConfigVersion | 1.0.0 | UAT |
| MyStatelessService1_Connection | def | UAT |
| MyStatelessService2_ConfigVersion | 1.0.0 | |
| MyStatelessService2_Port | 8000 | |

Any changes to the variables will also change the version in the same environment scope.

For example, let's say the connection for the UAT environment needs to change, then the resulting variables would be:

| Name | Value | Scope |
| ---- | ----- | ----- |
| MyStatelessService1_ConfigVersion | 1.0.0 | Dev |
| MyStatelessService1_Connection | abc | Dev |
| MyStatelessService1_ConfigVersion | **1.0.1** | UAT |
| MyStatelessService1_Connection | **xyz** | UAT |
| MyStatelessService2_ConfigVersion | 1.0.0 | |
| MyStatelessService2_Port | 8000 | |
