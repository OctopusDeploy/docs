---
title: Manually install the Build Task (not recommended)

---


If you'd like more control over the build task we've created, you can manually upload it yourself using Microsoft's [TFX CLI tool](https://github.com/Microsoft/tfs-cli).


This is also the method you'll need to use if you want to install the build task in your on-premises TFS instance.

# Installing the Build Task


Clone the repository locally

```powershell
git clone https://github.com/OctopusDeploy/OctoTFS.git
```


![](/docs/images/3048587/3278346.png "width=500")


Install TFX-CLI using NPM. You'll obviously need node installed to do this.

```powershell
npm install -g tfx-cli
```


![](/docs/images/3048587/3278347.png "width=500")

:::warning
If you are using an on-premises TFS instance, authentication can only be performed using Basic authentication. [See this page](https://github.com/Microsoft/tfs-cli/blob/master/docs/configureBasicAuth.md) for information on how to enable it for your on-premises server.


When you log in, use `--authType basic` to authenticate that way. NTLM authentication is coming to the TFX tool soon.
:::


Create a new **Personal Access Token** in Visual Studio Online or TFS in the **Security** tab for your Profile.


![](/docs/images/3048587/3278348.png)


![](/docs/images/3048587/3278349.png "width=500")


Specify All scopes. You can revoke this token as soon as the task is uploaded.


![](/docs/images/3048587/3278350.png "width=500")


Login to your Visual Studio or TFS account using the TFX-CLI tool

```powershell
 tfx login
```


![](/docs/images/3048587/3278375.png "width=500")


Use the TFX-CLI tool to upload the Octopus Create Release task. You will need to point at the `source\VSTSExtensions\OctopusBuildTasks\CreateOctopusRelease` folder in the cloned repository.

```powershell
 tfx build tasks upload <path-to-task>
```


![](/docs/images/3048587/3278376.png "width=500")
