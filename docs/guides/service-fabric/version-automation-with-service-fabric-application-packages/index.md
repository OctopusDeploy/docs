---
title: Version Automation with Service Fabric application packages
description: Octopus Deploy can help you automate versioning of your Service Fabric application packages.
---

In this section we will discuss some ways Octopus Deploy can help with versioning your Service Fabric applications. Versioning in Service Fabric is a complex topic and the ideas discussed here do not cover every specific variation of configuration and upgrading.

## Application and Service versions
A Service Fabric application is not a single physical "thing", it is the combination of 1 or more services. Each of those services may have it's own individual code and configuration version.

### Code and Config versioning
As mentioned above, each service that makes up an application can be versioned independently. One strategy for managing these versions is to have the developers manually update them in the solution's manifest files. This is how the default Visual Studio based deployment model works, and is the default behaviour you will get from Octopus Deploy if no other action is taken.

It is likely that this will be error prone and impractical for environments where Continuous Delivery is in play. In most CD environments a build number will be assigned by the build system and all binaries will be stamped with that version during the build. In this model all services in the Service Fabric application would have the same version, which would be updated in lock step with the builds.

It is recommended that the service versions in the manifest also match the version number that is assigned during the build. This could be achieved during the build itself, with the aid of custom MSBuild tasks, however it can also be achieved through the use of of the variable substitution capabilites of Octopus during the deployment.

To do this, the following steps are required.

1. Update the service's manifest to specific variable names that we'll define in Octopus later. Repeat this for each service, using Service_CodeVersion for all services and varying MyStatelessService_ConfigVersion per service


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

2. Update the application's manifest to have a variable for it's version and service versions that match those from the ServiceManifest elements in the previous step


	<ApplicationManifest 
        xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        ApplicationTypeName="DemoFabricApplicationType" 
        ApplicationTypeVersion="#{DemoApplication_Version}"
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

3. Define the variables in Octopus


    DemoApplication_Version: DemoApp_MyService_#{Service_CodeVersion}_#{MyStatelessService_ConfigVersion}
    Service_CodeVersion: #{Octopus.Action.Package.PackageVersion}
    MyStatelessService_ConfigVersion: 1.0.0


To summarize what's going on here, the NuGet/Zip package version is assumed to be the required Code version for the Service Fabric application's services. The rolled up service version is a combination of it's Code and Config version (we're going to look more at Config version shortly).  The application's version is a roll up of the rolled up service versions (in the example there's only 1 service but the DemoApplication_Version could easily be a concatenation of any number of services.  A good abbreviation strategy is recommended if there are multiple services, to avoid the version string becoming excessively long).

From this point the code and rolled up versions will all be handled automatically. That just leaves the service Config versions. Each service may have any number of configuration values, and when any one of them changes then the version of the config for that service should be bumped. This isn't something that Octopus has automatic support for, so these versions currently have to be handled manually.

To illustrate with an example, consider an application that is made up of 2 services (one that needs a connection setting and one that needs a port setting) we might end up with Octopus variables as follows

    MyStatelessService1_ConfigVersion: 1.0.0
    MyStatelessService1_Connection: abc
    MyStatelessService2_ConfigVersion: 1.0.0
    MyStatelessService2_Port: 8000

If the connection setting for the first service was changed, then the resulting variables should be

    MyStatelessService1_ConfigVersion: 1.0.1
    MyStatelessService1_Connection: xyz
    MyStatelessService2_ConfigVersion: 1.0.0
    MyStatelessService2_Port: 8000


### Environments and Tenants
Any feature of Octopus that causes one of the service variables to be scoped creates further complexity, as the version needs to also be scoped to the most granular level that the variables are being scoped. Again, this is probably easiest to understand through an illustration, lets expand on the previous example and say the connection for the first service is environment specific. Now the variables would look like this

    MyStatelessService1_ConfigVersion(Dev): 1.0.0
    MyStatelessService1_Connection(Dev): abc
    MyStatelessService1_ConfigVersion(UAT): 1.0.0
    MyStatelessService1_Connection(UAT): def
    MyStatelessService2_ConfigVersion: 1.0.0
    MyStatelessService2_Port: 8000

Then the changes to the variables change the version in the same scope. For example, let's say the connection for UAT needs to change then the resulting variables would be

    MyStatelessService1_ConfigVersion(Dev): 1.0.0
    MyStatelessService1_Connection(Dev): abc
    MyStatelessService1_ConfigVersion(UAT): 1.0.1
    MyStatelessService1_Connection(UAT): xyz
    MyStatelessService2_ConfigVersion: 1.0.0
    MyStatelessService2_Port: 8000

