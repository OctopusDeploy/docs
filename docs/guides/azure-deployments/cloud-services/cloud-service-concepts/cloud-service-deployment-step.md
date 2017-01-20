---
title: Cloud Service deployment step
position: 2
---


Octopus Deploy supports deployment of [Azure Cloud Services](http://azure.microsoft.com/en-us/services/cloud-services/). Note that the below deployment step was added in 3.1 and is not available in 3.0.

## Deployment Step


Add a new "Deploy an Azure Cloud Service" step to your project. For information about adding a step to the deployment process, see the [add step](http://docs.octopusdeploy.com/display/OD/Add+step) section.


![](/docs/images/5671696/5865904.png)

#### **Account**


Select the [account](/docs/home/guides/azure-deployments/cloud-services/cloud-service-concepts/cloud-service-accounts.md) that Octopus will use to deploy the Cloud Service.


The 'Cloud service' and 'Storage account' fields will list the Cloud Services and Storage Accounts available to the Azure subscription associated with the chosen Account.


Refer to the [Azure documentation](https://azure.microsoft.com/en-us/documentation/) for instructions on creating a Cloud Service and Storage Account.

#### Slot


You can choose to deploy to either the Staging or Production slots.

#### Swap


The Cloud Service target may be configured to either:

- Always deploy
- Swap staging to production if possible



If 'Always deploy' is select, the package will always be deployed to the selected Slot.


If 'Swap staging to production if possible' is selected and the selected Slot is Production, then a swap will occur between Production and Staging (if there is a deployment in the Staging slot). See [VIP Swap](/docs/home/guides/azure-deployments/cloud-services/vip-swap.md) for more information on how to configure a VIP swap.

#### Instance count


If you have scaled your Windows Azure service using the management portal (for example, changing the role count from 1 to 4), during a deployment Octopus can be configured to keep the existing instance counts rather than using the instance counts defined in your cloud service configuration file.

### Variable-expressions


Any of the fields above can be switched to use a custom expression by clicking the box next to the field:


![](/docs/images/3049373/3278553.png)

## Deployment process


Deployment to an Azure Cloud Service target proceeds as follows (more details provided below):

1. Download the NuGet package from the NuGet server
2. Extract the NuGet package on the Octopus server to a temporary location
3. Extract the Cloud Service package (`.cspkg`) to a temporary location
4. Any configured or packaged `PreDeploy` scripts are executed
5. Variable substitutions in Cloud Service configuration file (`.cscfg`)
6. Substitute variables in files (if configured)
7. [XML configuration transformations](/docs/home/deploying-applications/configuration-files.md) (if configured) are performed
8. [XML configuration variables](/docs/home/deploying-applications/configuration-files.md) (if configured) are replaced
9. Any configured or package `Deploy` scripts are executed
10. Re-package the Cloud Service Package
11. Upload the Cloud Service Package to Azure Storage
12. Deploy the Cloud Service Package (see 'Customizing the deployment process' section below)
13. Any configured or packaged `PostDeploy` scripts are executed


### Extract the Cloud Service Package


Cloud Service Package files are extracted during deployment, in order to make available features such as Configuration Transforms and Variable Substitution.


To extract the Cloud Service Package, it is first converted to the CTP format (also known as V20120315). This is the format described by Microsoft [documentation](https://msdn.microsoft.com/en-us/library/azure/jj151522.aspx), but is not used by default by the [CSPack ](https://msdn.microsoft.com/en-us/library/azure/gg432988.aspx)utility (passing the `/useCtpPackageFormat` switch is required for this format to be used).  This is just an implementation detail, but the documented archive layout gives a good starting point to understanding the layout of the extracted package.


Setting the `Octopus.Action.Azure.LogExtractedCspkg` variable to `true` will cause the layout of the extracted package to be written into the Task Log. This may assist with finding the path to a particular file.

### Variable substitutions in Cloud Service configuration file


Octopus will attempt to modify your `.cscfg` file. For example, take the following configuration:

```xml
<ServiceConfiguration serviceName="Humpty" xmlns="http://schemas.microsoft.com/ServiceHosting/2008/10/ServiceConfiguration" osFamily="2" osVersion="*" schemaVersion="2012-10.1.8">
  <Role name="Humpty.Web">
    <Instances count="1" />
    <ConfigurationSettings>
      <Setting name="Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" value="UseDevelopmentStorage=true" />
      <Setting name="HelloMessage" value="Hello world! This is a web role!" />
    </ConfigurationSettings>
  </Role>
  <Role name="Humpty.Worker">
    <Instances count="1" />
    <ConfigurationSettings>
      <Setting name="Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" value="UseDevelopmentStorage=true" />
      <Setting name="HelloMessage" value="Hello world! This is a worker!" />
    </ConfigurationSettings>
  </Role>
</ServiceConfiguration>
```


If a variable named `HelloMessage` is defined in your Octopus project variables, Octopus will automatically update it in the configuration file. You can also name the variable `Humpty.Worker/HelloMessage` to scope the setting to a specific web/worker role.

### Customizing the deployment process


The deployment is performed using a PowerShell script called `DeployToAzure.ps1`. If a file with this name exists within your NuGet package, Octopus will invoke it. Otherwise, Octopus will use a bundled version of the script as a default. You can **[view the bundled script here](https://github.com/OctopusDeploy/Calamari/blob/ce3b69e94b60c8c73619bc584eca52e11c68930a/source/Calamari.Azure/Scripts/DeployAzureCloudService.ps1)**, and use it as a basis for creating your own custom deployment script.




## PowerShell


PowerShell executed against an Azure Cloud Service target will have the Azure PowerShell module loaded, and the subscription from the chosen account will be selected.
