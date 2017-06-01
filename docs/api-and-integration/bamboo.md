---
title: Bamboo
description: Octopus Deploy integrates with Bamboo to provide for a full automated build and deployment pipeline.
position: 3
---

[Bamboo from Atlassian](https://www.atlassian.com/software/bamboo) is a popular continuous integration and build server that supports a wide variety of different build runners and source control systems. While Bamboo has some built-in deployment concepts, you can also combine Octopus Deploy with Bamboo to get a full end-to-end build and deployment experience.

![](/docs/images/3048164/3278152.png "width=500")

![](/docs/images/3048164/3278150.png "width=500")

## Why Octopus + Bamboo? {#Bamboo-WhyOctopus+Bamboo?}

Bamboo deployments provide many advantages. For example, if you are using JIRA, it's easy to see which JIRA issues are included in a deployment. However, when it comes to the actual deployment automation tasks, there are some compelling reasons to combine Bamboo with Octopus Deploy:

- Octopus can run deployment steps in parallel across many agents. Instead of having a single agent remotely installing and configuring software, Octopus can send packages to all of the web and application servers in parallel, and execute the deployments locally, bringing the results back to a central log.
- Octopus has a large number of built-in conventions for common deployment tasks, such as [managing configuration files](/docs/deploying-applications/configuration-files/index.md), installing [Windows Services](/docs/deploying-applications/windows-services.md), and creating [IIS web sites](/docs/deploying-applications/iis-websites-and-application-pools.md), reducing the amount of scripting required.
- Octopus makes it easy to coordinate deployments with machines across a [variety of network configurations](/docs/installation/installing-tentacles/index.md)
- [Manual steps](/docs/deploying-applications/manual-intervention-and-approvals.md) in Octopus make it possible to include both automated and human deployment steps

The rest of this page will walk you through the process of integrating Octopus Deploy with Bamboo.

## Building with Bamboo and OctoPack {#Bamboo-BuildingwithBambooandOctoPack}

The first step to making Octopus and Bamboo work together, is for Bamboo to create artifacts that Octopus is able to deploy. [Octopus uses NuGet packages](/docs/packaging-applications/index.md), and [OctoPack](/docs/packaging-applications/nuget-packages/using-octopack/index.md) makes it easy to package your application using MSBuild.

During our build, we will:

1. Compile the code, run unit tests, and so on
2. Have OctoPack create NuGet packages
3. Publish these NuGet packages to the Octopus Deploy server
4. Create a release in Octopus, ready to be deployed

To interact with our Octopus Deploy server, we need an API key. It's a good idea to define this as a password variable in Bamboo:

![](/docs/images/3048164/3278160.png "width=500")

:::success
**Creating API keys**
Learn about [how to create an API key](/docs/how-to/how-to-create-an-api-key.md).
:::

Bamboo uses an MSBuild runner to compile Visual Studio solutions. [Once OctoPack has been installed](/docs/packaging-applications/nuget-packages/using-octopack/index.md) on your C#/VB projects, you can configure Bamboo's MSBuild task to pass the appropriate parameters to MSBuild to have OctoPack run:

![](/docs/images/3048164/3278161.png "width=500")

There are a number of parameters that you will want to define. For this page, we are using:

```bash
/p:RunOctoPack=true /p:OctoPackPackageVersion=1.0.${bamboo.buildNumber} /p:OctoPackPublishPackageToHttp=http://localhost/nuget/packages /p:OctoPackPublishApiKey=${bamboo.OctopusApiKey_Password}
```

The settings are:

- **RunOctoPack**: specifies that OctoPack should create packages during the build
- **OctoPackPackageVersion**: version number that should be given to packages created by OctoPack. Since Bamboo build numbers are integers like "12", we combine it with "1.0." to produce package versions such as "1.0.12".
- **OctoPackPublishPackageToHttp**: tells OctoPack to push the package to the Octopus Deploy server. Read more about the [built-in NuGet repository in Octopus](/docs/packaging-applications/package-repositories/index.md). You'll find the URL to your repository on the {{Library,Packages}} tab in Octopus.  Simply click the `Show examples` link.
- **OctoPackPublishApiKey**: your Octopus Deploy API key. Since we defined it as a Bamboo variable above, we reference the variable here.

:::success
**OctoPack arguments**
Learn more about the available [OctoPack parameters](/docs/packaging-applications/nuget-packages/using-octopack/index.md).
:::

## Creating a release {#Bamboo-Creatingarelease}

At this point, Bamboo has compiled the code, and packages have been pushed to Octopus Deploy, ready to be deployed. You can go to the Octopus web portal, and manually create releases using those packages.

You can go one step further and automate release creation using [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md), a command-line tool for automating Octopus.

1. [Download Octo.exe](https://octopus.com/downloads), and extract it to a folder on your Bamboo build runner, such as `C:\Tools\Octo\Octo.exe`
2. Add a new Command Line task to your build plan, and define the new executable:
![](/docs/images/3048164/3278159.png "width=500")
3. Describe the command line task, and specify the arguments to Octo.exe:
![](/docs/images/3048164/3278158.png "width=500")

In the **Argument** field, we are passing:

```bash
create-release --project OctoFX --version 1.0.${bamboo.buildNumber} --packageversion 1.0.${bamboo.buildNumber} --server http://localhost/ --apiKey ${bamboo.OctopusApiKey_Password} --releaseNotes "Bamboo build [${bamboo.buildNumber}](http://bambooserver:8085/browse/${bamboo.buildKey})"
```

Importantly:

- The `--project` specifies the name of the Octopus Deploy project that we want to create a release for.
- The `--version` specifies the version number of the release in Octopus. We want this to contain the Bamboo build number.
- The `--packageversion` tells Octo.exe to ensure that the release references the right version of the NuGet packages that we published using OctoPack.
- The `--releaseNotes` will appear in Octopus, and link back to the build in Bamboo. Of course, change the URL to the address of your Bamboo server

:::success
**Octo.exe arguments**
Learn more about [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) and the arguments it accepts. If you wanted to, you could even deploy automatically to a test environment using the `--deployto` parameter, without using Bamboo's deploy plans.
:::

## Deploying releases with Octopus and Bamboo deployment plans {#Bamboo-DeployingreleaseswithOctopusandBamboodeploymentplans}

In the previous steps, we configured a Bamboo build plan that:

1. Compiles the code and produces packages using OctoPack
2. Pushes the packages to Octopus
3. Creates a release in Octopus

At this point, you could stop here, and use Octopus to manage deployments and promotion between environments: Bamboo builds, Octopus deploys.

However, you can also make use of **Bamboo deployment plans**, and use them to control Octopus. When deploying between environments in Bamboo, a corresponding deployment in Octopus will be triggered. Again, we'll be using [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) to provide the glue.

For this example, we have four environments in Octopus - Development, Test, Staging and Production. We have a deployment plan in Bamboo that is linked to the build plan, and looks like this:

![](/docs/images/3048164/3278157.png "width=500")

The release versioning scheme in the deployment plan has been configured to look like this - again, so that we have consistent release numbers:

![](/docs/images/3048164/3278154.png "width=500")

Each of the environments in the deployment plan simply contains a single deployment task: it uses the Octo.exe executable that we created earlier to trigger a deployment in Octopus:

![](/docs/images/3048164/3278153.png "width=500")

Each of the deployment tasks have a similar set of arguments:

```bash
deploy-release --project OctoFX --deployTo Development --version 1.0.${bamboo.buildNumber} --server=http://localhost/ --apikey=${bamboo.OctopusApiKey_Password} --progress
```

Importantly:

- The `--project` setting specifies which project in Octopus Deploy that we want to deploy
- The `--deployTo` setting specifies the environment in Octopus that we are deploying to. This changes with each environment in Bamboo.
- The `--version` matches the version of the Octopus release that we created in the build plan
- The `--progress` flag tells Octo.exe to write the deployment log from Octopus to the log in Bamboo. This flag was added in 2.5; in previous versions of Octo.exe you can use `--waitfordeployment` instead. You can also remove this flag if you want the Bamboo deployment to complete immediately without waiting for the deployment in Octopus to complete.

:::success
**Octo.exe arguments**
Again, see the [arguments to Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) to see other parameters that you can specify. If your deployment is likely to take longer than 10 minutes, for example, consider passing `--deploymenttimeout=00:20:00` to make it 20 minutes.
:::

Keep in mind that you can also configure triggers in Bamboo so that you deploy to Development on a successful build plan completion, for example.

All going well, you should be able to see the build and deployment plans in Bamboo:

![](/docs/images/3048164/3278152.png "width=500")

Alongside the deployments in Octopus:

![](/docs/images/3048164/3278150.png "width=500")

**Give us feedback**

We're Octopus Deploy experts, not Bamboo experts, so we're always looking for ways to improve this page. If you think this can be improved, or if you get stuck, [get in touch on our support site](https://octopus.com/support)!
