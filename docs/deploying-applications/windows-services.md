---
title: Windows Services
position: 8
---

Octopus Deploy includes first class support for Windows Service deployments. Octopus can install, reconfigure, and start Windows Services during deployment, usually without requiring any custom scripts.

When deploying, `sc.exe` is used to create a Windows Service using the configured settings. If the service already exists, it will be stopped, re-configured, and re-started.

To deploy a Windows Service, add a *Deploy a Windows Service* step. For information about adding a step to the deployment process, see the [add step](/docs/deploying-applications/adding-steps.md) section.

![](/docs/images/5671696/5865909.png "width=170")

:::hint
**Pre Octopus 3.4.7**
The *Deploy a Windows Service Step* was introduced in Octopus version **3.4.7**. Prior to this Windows Services were deployed by enabling the *Windows Service* feature on a [Deploy a Package Step](/docs/deploying-applications/deploying-packages/index.md).

![](/docs/images/3048082/3277662.png "width=500")
:::

## Configuring the Step {#WindowsServices-ConfiguringtheStep}

![](/docs/images/3048082/5865715.png "width=500")

### Step 1: Select a Package {#WindowsServices-Step1:SelectaPackage}

Use the Package Feed and Package ID fields to select the [package](/docs/packaging-applications/index.md) containing the executable (.exe) to be installed as a Windows Service.

### Step 2: Configure Windows Service options {#WindowsServices-Step2:ConfigureWindowsServiceoptions}

| Field               | Meaning                                  |
| ------------------- | ---------------------------------------- |
| **Service Name**    | The name of the Windows Service to create, or re-configure if it already exists. |
| **Display Name**    | Optional display name of the service. If empty, the Service Name will be used instead. |
| **Description**     | A short description of service that will appear in the services control manager. |
| **Executable path** | The relative path to the executable in the package that the Windows Service will point to. Examples:  `MyService.exe`,  `bin\MyService.exe`, `foo\bin\MyService.exe`, `C:\Windows\myservice.exe` |
| **Arguments**       | Arguments that will always be passed to the service when it starts |
| **Service account** | The account that the Windows Service should run under. Options are: Local System, Network Service, Local Service, Custom user (you can specify the username and password). <br><br>See below for [Security Considerations](#WindowsServices-SecurityConsiderations) and [Using Managed Service Accounts (MSA)](#WindowsServices-UsingManagedServiceAccounts(MSA)) |
| **Start mode**      | When will the service start: Automatic, Automatic (delayed), Manual |
| **Dependencies**    | Any dependencies that the service has. Separate the names using forward slashes (/). For example: `LanmanWorkstation/TCPIP` |

## Windows Service deployment in action {#WindowsServices-WindowsServicedeploymentinaction}

This three minute video (with captions) demonstrates how to deploy a C# Windows Service project with Octopus Deploy.

<iframe src="//fast.wistia.net/embed/iframe/33yi0jfjpc" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" oallowfullscreen="" msallowfullscreen="" width="640" height="360" style="margin: 30px"></iframe>

## How does Octopus actually deploy my Windows Service? {#WindowsServices-HowdoesOctopusactuallydeploymyWindowsService?}

Out of the box, Octopus will do the right thing to deploy your Windows Service, and the conventions we have chosen will eliminate a lot of problems with file locks, and leaving stale files behind. By default Octopus will follow the conventions described in [Deploying packages](/docs/deploying-applications/deploying-packages/index.md) and apply the different features you select in the order described in [Package deployment feature ordering](/docs/reference/package-deployment-feature-ordering.md).

:::success
Avoid using the [Custom Installation Directory](/docs/deploying-applications/custom-installation-directory.md) feature unless you are absolutely required to put your packaged files into a specific physical location on disk.
:::

As an approximation including the Windows Service manager integration:

1. Acquire the package as optimally as possible (local package cache and [delta compression](/docs/deploying-applications/delta-compression-for-package-transfers.md))
2. Stop your Windows Service is already running
3. Create a new folder for the deployment (which avoids many common problems like file locks, and leaving stale files behind)
4. Example: `C:\Octopus\Applications\[Tenant name]\[Environment name]\[Package name]\[Package version]\` where `C:\Octopus\Applications` is the Tentacle application directory you configured when installing Tentacle)
5. Extract the package into the newly created folder
6. Execute each of your [custom scripts](/docs/deploying-applications/custom-scripts/index.md) and the [deployment features](/docs/deploying-applications/index.md) you've configured will be executed to perform the deployment [following this order by convention](/docs/reference/package-deployment-feature-ordering.md).
7. As part of this process Windows Service will be created, or reconfigured if it already exists, including updating the **binPath** to point to this folder and your executable entry point
8. Your Windows Service will be started
9. [Output variables](/docs/deploying-applications/variables/output-variables.md) and deployment [artifacts](/docs/deploying-applications/artifacts.md) from this step are sent back to the Octopus Server

:::success
You can see exactly how Octopus deploys your Windows Service by looking at the scripts in our open-source [open-source Calamari](https://github.com/OctopusDeploy/Calamari) project which actually performs the deployment:

- [Octopus.Features.WindowsService\_AfterPreDeploy.ps1](https://github.com/OctopusDeploy/Calamari/blob/master/source/Calamari/Scripts/Octopus.Features.WindowsService_AfterPreDeploy.ps1)
- [Octopus.Features.WindowsService\_BeforePostDeploy.ps1](https://github.com/OctopusDeploy/Calamari/blob/master/source/Calamari/Scripts/Octopus.Features.WindowsService_BeforePostDeploy.ps1)

You can inject your own logic into this process using [custom scripts](/docs/deploying-applications/custom-scripts/index.md) and understanding where your scripts will execute in the context of [package deployment feature ordering](/docs/reference/package-deployment-feature-ordering.md).
:::

## Setting advanced configuration options {#WindowsServices-Settingadvancedconfigurationoptions}

Windows Services support some advanced settings not exposed by this feature. You can customize your Windows Service by including a `PostDeploy.ps1` [custom script](/docs/deploying-applications/custom-scripts/index.md).

This example configures the service **Failure Action** to **Restart.**

**PostDeploy.ps1**

```powershell
$serviceName = $OctopusParameters["Octopus.Action.WindowsService.ServiceName"]
& "sc.exe" failure $serviceName reset= 30 actions= restart/5000
```

:::success
This script will run after the Windows Service has been created (or reconfigured), and then started. If you want to customize the Windows Service before it is started, set the Start Mode to Manual, and then start the Windows Service yourself as part of your custom script.
:::

:::success
**Using sc.exe**
This Microsoft TechNet [article](https://technet.microsoft.com/en-us/library/cc754599.aspx) is a great reference on the sc.exe utility including the failure action above.
:::

## Deploying Services built with Topshelf {#WindowsServices-DeployingServicesbuiltwithTopshelf}

[Topshelf](http://topshelf-project.com/) is a library to build and work with Windows Services easily by allowing your code to run (and be debugged) inside a Console Application, but giving you the option to install and run as a Windows Service.

While Topshelf has its own command line options to make Service Registration easy, you can still use SC.EXE. This means that deploying a Topshelf enabled application as a Windows Service is easy using the Octopus service deploy feature. The only caveat is the value you specify in the Service Name parameter must match the Service Name specified in your Topshelf configuration code (in Program.cs) or the service will not start.

## Security Considerations {#WindowsServices-SecurityConsiderations}

You will need to consider carefully which Service Account you choose for your Windows Service. If you decide to use a Custom Account, you will need to make sure the Account is granted the **Logon as a Service** logon right (**SeServiceLogonRight**).

When you use the Services snap-in console to configure your Windows Service, the **SeServiceLogonRight** logon right is automatically assigned to the account. If you use the Sc.exe tool or APIs to configure the account (like Octopus Deploy does on your behalf), the account has to be explicitly granted this right by using tools such as the Security Policy snap-in, `Secedit.exe`, or `NTRights.exe`. The built-in Windows Service accounts (`Local System`, `Network Service`, `Local Service`), and members of the **Local Administrators** group are assigned this right by default.

## Using Managed Service Accounts (MSA) {#WindowsServices-UsingManagedServiceAccounts(MSA)}

> Managed Service Accounts (MSA) allow you to eliminate those never-expire-service-accounts. An MSA is a special domain account that can be managed by the computer that uses it. That computer will change its password periodically without the need of an administrator.
>
>
> *[http://www.zeda.nl/index.php/en/en-managed-service-accounts](http://www.zeda.nl/index.php/en/en-managed-service-accounts)*

To configure the Windows Service to use a Managed Service Account:

1. Set the **Service account** to **Custom user...**
2. Enter the domain name and username, **making sure to append a $ to the username** as shown below
3. Bind the **Custom account password** to an **empty value** to ensure no password is set for this account - after all, we want the password managed by the server, not us!

![](/docs/images/3048082/5865840.png "width=500")

:::hint
**Important information about using Managed Service Accounts**
There must be a dollar sign ($) at the end of the account name. When you use the Services snap-in console to configure your Windows Service, the **SeServiceLogonRight** logon right is automatically assigned to the account. If you use the Sc.exe tool or APIs to configure the account (like Octopus Deploy does on your behalf), the account has to be explicitly granted this right by using tools such as the Security Policy snap-in, Secedit.exe, or NTRights.exe.

Learn about [Managed Service Accounts](https://technet.microsoft.com/en-us/library/dd560633(v=ws.10).aspx).
:::
