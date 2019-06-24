---
title: Getting Started
description: This section provides a conceptual overview of Octopus Deploy, and links to documentation that guides you through your own self-hosted or cloud-hosted Octopus server.
position: 1
---

Welcome!

This section provides an overview of Octopus Deploy concepts and links to the relevant documentation, which explore the concepts further and guides you through implementing them with your own [self-hosted](#self-hosted-octopus) or [cloud-hosted](#octopus-cloud) Octopus server.


## How Octopus Works

<!-- Comment: This sentence doesn't read quite right to me "reliably deploy by creating" I think makes assumptions about what the reader already knows. We could expand on the sentence, but then it would duplicate the following paragraph.

Octopus Deploy allows users to consistently and reliably deploy by creating a Release and deploying it following the steps defined in a Projects Deployment Process. -->

As an Octopus user, you define the process for deploying your software. You specify the environments the applications are deployed to and who on your team can deploy to which environments. For instance, you might want QA to deploy to test environments, but not to production. Taking this approach means that even if different members of the team trigger deployments, the deployment process remains consistent. Once releases have been created, they can be deployed as many times as you need.

<!-- comment: "Below outlines", doesn't read quite right to me.

Below outlines the main steps for doing your first deployment and some of the terms you will need to know.
-->

<!-- I've removed the numbers from the subsections and made the subsections top level as much as possible. There's a styling issue where subsections beyond a certain point result in headings smaller than the main text. -->
## The Octopus Deploy Server {#octopus-server}

You can install your own [self-hosted](#self-hosted-octopus) instance of the Octopus Deploy Server or use [Octopus Cloud](#octopus-cloud).

## Self-Hosted Octopus {#self-hosted-octopus}

Installing the self-hosted [Octopus Deploy server](/docs/installation/index.md) configures the [Octopus Web Portal](/docs/getting-started/index.md#the-octopus-web-portal) and the [Octopus REST API](/docs/octopus-rest-api/index.md). The [installation documentation](/docs/installation/index.md) provides instructions for downloading, installing, and configuring your Octopus Deploy server.

### Octopus Cloud {#octopus-cloud}

Octopus Cloud is the hosted version of Octopus Deploy. We designed Octopus Cloud and self-hosted Octopus to provide the same functionality; however, there are some minor differences, for instance, with Octopus Cloud, we're [responsible](/docs/administration/security/index.md#responsibility) for taking backups, upgrading the service, and maintaining and monitoring the underlying systems.

Learn more about [Octopus Cloud](/docs/octopus-cloud/index.md).

### The Octopus Web Portal

Whether you're self-hosting the Octopus server, or using Octopus Cloud, the Octopus Web Portal is where you'll manage your infrastructure, projects, access the built-in repository, grant your team access to projects, and create your automated deployments.


<!-- Comment: I've commented this section out. And moved the original Infrastructure section back in with a link to the terms section. The terms were repeated here and in the terms section and then again on the infrastructure page. The terms section is a great addition, but at this stage of the discovery process, I think sone of the information will be too much for new users/readers.

### 2. Set up Deployment Environments

Octopus will need to know where you are going to deploy to. You can deploy to Windows servers, Linux servers, Microsoft Azure, an Offline Package Drop, Cloud Regions, or Kubernetes. These are known as your deployment targets, and they are organized into environments so you can promote your software through your deployment pipeline, for instance, from Development to Testing and finally into Production.

#### Deployment Targets

Deployment targets represent the servers, machines and cloud services where your software and services will be deployed.

#### Environments

Octopus organizes your deployment targets into groups called environments so you can promote your software through your deployment pipeline, for instance, from Development to Test and finally into Production.

#### Target Roles

Target roles allow you to “tag” deployment targets with a specific keyword which can be used in your deployments.

#### Tentacle Agent

When you deploy to servers, running either Windows, Linux or Mac, you need to install the Tentacle Agent, a lightweight agent service, on your servers so they can communicate with the Octopus server in either a listening or a polling mode.
A Tentacle Agent isn't required for deploying to Azure Web Apps, Kubernetes clusters, Azure Service Fabric and Azure Cloud Service targets.

#### Lifecycle

Lifecycles give you control over the way releases are promoted between environments.

Learn more about managing your [Infrastructure](/docs/infrastructure/index.md)

-->

## Infrastructure

Octopus Deploy organizes your deployment targets (the machines and services you deploy software to) into groups called environments. Typical environments are **Development**, **Test**, and **Production**.

With Octopus Deploy your deployment targets could be Windows servers, Linux servers, Microsoft Azure, AWS, Cloud Regions, or even an Offline Package Drop.

Organizing your infrastructure into environments lets you define your deployment processes (no matter how many steps or deployment targets are involved) and have Octopus deploy the right versions of your software, with the right configuration, to the right environments at the right time.

Learn more about managing your [infrastructure](/docs/infrastructure/index.md) or get to know some of the [common terms](/docs/getting-started/terms.md) you use when deploying software with octopus.

<!-- I've swapped the title back to packaging applications, because it mimics the TOC on the left of the page as a kind of navigation aid  -->
## Packaging Applications

Before you can deploy software with Octopus Deploy, you need to bundle all the files required for the software to run into a supported package. The package must be versioned and stored in a repository. Octopus Deploy includes a built-in repository. We recommend configuring your existing tool chain to push packages automatically to the built-in repository; however, you can push packages manually to the repository if you choose to.  Octopus supports a variety of package [formats](/docs/packaging-applications/index.md##supported-formats) and you can host your packages in external repositories or the built-in Octopus repository.

<!-- Comment: I've added information from these definitions to the text above with slight rewording.
#### Package

A Package is an archive (zip, tar, NuGet) that contains all the files needed to run your software. You can host Packages in external repositories or the built-in Octopus repository.

#### Naming a Package

The package will need to be named correctly with a packageID, version number and format, for Octopus to recognize it. For example MyPackage.1.0.1.zip
-->

<!-- comment: for new users I'm wary of jumping past the intro content at docs/packaging-applications and going straight to the tools (experienced users will likely find their own way there, but getting started users will benefit from the intro content).

#### Creating a Package

There are many more tools you might choose to use to create your package, but as long as you can create one of our [supported packages](/docs/packaging-applications/index.md#supported-formats) you can deploy your applications with Octopus Deploy.

We've created the following tools to help package your applications for deployment with Octopus:

 - [Octo.exe](/docs/packaging-applications/octo.exe.md) to create Zip Archives and NuGet packages for **.NET Core** apps and full **.NET framework** applications.
 - [Octopack](/docs/packaging-applications/octopack/index.md) to create NuGet packages for **ASP.NET** apps (.NET Framework) and **Windows Services** (.NET Framework).
 - A [TeamCity plugin](/docs/packaging-applications/build-servers/teamcity.md).
 - An [Azure DevOps plugin](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension/index.md).

#### Getting your package into Octopus

Most Octopus users push their package from their build server to Octopus. But you can manually upload the package or host it in an external repository.

:::hint
**New to Octopus and don’t have a package?**

Use our example package to quickly create your first deployment. [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)
:::
-->
Learn more about [packaging your applications](/docs/packaging-applications/index.md) or how to automate your existing tool chain to push packages to your Octopus Deploy server with our [Build Server Integration](/docs/octopus-rest-api/index.md).

## Define your Deployment Process

<!-- I comment: I think this works better than the old 'recipe' content. It's much more direct! I commented out the definitions again. They're on the terms page and the deployment process page that's linked to a the bottom of the section. I've also added a hello world process, and I'd be eager to hear if you think that helps.  -->
Octopus Deploy is designed to work with teams following agile software development methodologies, that is, continuously deploying software, iterating, making changes, and redeploying.

Before you can deploy your software, you need to create Project which will include your Deployment Process and all the information needed for your teams to successfully redeploy every time.

### Hello World Deployment Process

This is a simple deployment process with only one step that runs a script on the Octopus server to say hello.

If you have access to an [Octopus server](#octopus-server), log in to the web portal and follow the instructions below:

1. Create an empty environment by clicking **{{Infrastrcuture,Environments,Add Environment}}** and give the environment a name, for instance, *Test*.
2. Select **Projects** from the main navigation, and click **ADD PROJECT**.
3. Name the project, for instance, *Hello World*, and click **Save**.
4. From your new project's overview page, click **DEFINE YOUR DEPLOYMENT PROCESS**.
5. Click **ADD STEP**, and then select the **Run a Script** step.
6. Give the step a name, for instance, *Say Hello*.
7. For the execution location, select **Run on Octopus Server**.
8. For the script section, paste the following PowerShell script into the text box:

​```
Write-Host "Hello, World!"
​```

9. Save the deployment process by clicking **Save**.
10. From the project's overview page, click **CREATE RELEASE**, and then click **Save**.
11. Click **DEPLOY TO TEST**, then click **DEPLOY**.

<!-- terms are also on the terms page and the deployment process page.
#### Projects

Projects let you manage multiple software projects from the Octopus Web Portal. For each project you have, you define a deployment process, configuration variables, and the environments the software will be deployed to.

#### Deployment Process

The deployment process is like a recipe for deploying your software. You define the recipe by adding steps and variables to a project. Each step contains a specific action (or set of actions) that is executed as part of the deployment process each time your software is deployed.

#### Variables

Octopus lets you define variables for configuration values that change, so you can have a different value for each environment or deployment target
-->
Learn more about the [deployment process](/docs/deployment-process/index.md), how you can set up [projects](/docs/deployment-process/projects/index.md), use [variables](/docs/deployment-process/variables/index.md) and [deploy releases](/docs/deployment-process/releases/index.md).

<!-- slight rewording here for flow -->
## Deploy your Software

Once you have access to an Octopus Server, your infrastructure is configured, your applications packaged, and the deployment process defined, you're ready to start deploying your software. To deploy your software, you first create a release:

### Creating a Release

A Release is a snapshot of your deployment process, configuration variables, and software packages. Releases are created from Projects and deployed via a [Lifecycle](/docs/deployment-process/lifecycle/index.md) to your Environments.

### Deploying a Release

When you deploy a release, you are executing the deployment process with all the associated details, as they existed when the release was created. You can deploy a release as many times as you want to.

Learn more about how you can [deploy releases](/docs/deployment-process/releases/index.md), or see some [deployment examples](/docs/deployment-examples/index.md).

## Next

Learn more about the [terms](/docs/getting-started/terms.md) you'll use when deploying software with Octopus Deploy.
