---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Jenkins
description: Jenkins can work together with Octopus Deploy to create releases, push packages, push build information, and execute deployments.
navOrder: 60
---

[Jenkins](https://www.jenkins.io/) is an extendable, open-source continuous integration server that makes build automation easy.

Using Jenkins and Octopus Deploy together, you can:

- Use Jenkins to compile, test, and package your applications.
- Automatically trigger deployments in Octopus from Jenkins whenever a build completes.
- Automatically fail a build in Jenkins if the deployment in Octopus fails.
- Securely deploy your applications with Octopus Deploy across your infrastructure.
- Fully automate your continuous integration and continuous deployment processes.

Octopus Deploy will take those packages and push them to development, test, and production environments.

## Jenkins installation

If you need guidance installing Jenkins for the first time, see the [Jenkins documentation](https://www.jenkins.io/doc/book/installing/), or the blog post, [installing Jenkins from Scratch](https://octopus.com/blog/installing-jenkins-from-scratch).

## Install the Octopus Jenkins plugin {#install-the-octopus-jenkins-plugin}

Plugins are central to expanding Jenkins' functionality, and a number of plugins are may be needed depending on the projects you are building. Before you start, you'll need to ensure the following plugins are installed and enabled.

If you're building a .NET project:
- [MSBuild Plugin](https://plugins.jenkins.io/msbuild/): to compile your Visual Studio solution.

If you're building a Java project:
- [Maven Plugin](https://plugins.jenkins.io/maven-plugin/): to compile your Java project.

Once any of the above plugins are installed, you can then search and install the [Octopus Deploy Plugin](https://plugins.jenkins.io/octopusdeploy/).

## Configure the Octopus Deploy plugin

After you have installed the Octopus Deploy plugin. First navigate to **Manage Jenkins ➜ Global Tool Configuration** to supply the details for the Octopus CLI.

:::div{.success}
**Creating API keys**
Learn [how to create an API key](/docs/octopus-rest-api/how-to-create-an-api-key) so the plugin can interact with your Octopus Server.
:::

### Octopus CLI

This is a good time to install the [Octopus CLI](/docs/octopus-rest-api/octopus-cli).

 The [OctopusDeploy Plugin](https://plugins.jenkins.io/octopusdeploy/) is a wrapper for the [Octopus CLI](/docs/octopus-rest-api/octopus-cli), the Octopus command line tool for creating and deploying releases, such as `/home/your-user-name/.dotnet/tools/dotnet-octo`.

You can do either of these:
  - Use the `dotnet tool install` command to install it, the [Octopus CLI Global Tool](/docs/octopus-rest-api/octopus-cli/install-global-tool) this works great on Linux and Windows.
  - [Download Octopus CLI](https://octopus.com/downloads) and extract it to a folder on your Jenkins server, such as `C:\Tools\Octo` or `/usr/local/bin`.

Then we can let the plugin know where it is installed.

:::figure
![](/docs/packaging-applications/build-servers/jenkins/images/global-tools-cli-configure.png "width=500")
:::

### Configure system

Next, navigate to **Manage Jenkins ➜ Configure System**.

#### Octopus Server settings

Here you can create the link to your Octopus Server. You can add more than one if your organization uses multiple servers. This is where you supply an API Key, select a Service Account with suitable permission and see [how to create an API key](/docs/octopus-rest-api/how-to-create-an-api-key) for it.

:::figure
![](/docs/packaging-applications/build-servers/jenkins/images/octopusdeploy-servers.png "width=500")
:::

After the [Octopus Deploy Plugin](https://plugins.jenkins.io/octopusdeploy/) is configured, you can configure a Jenkins *Freestyle* or *Pipeline* Project.

## Build job

During our Jenkins job, we will:

1. Compile the code, and run unit tests.
2. Create NuGet packages with OctoPack.
3. Publish these NuGet packages to the Octopus Server.
4. Create a release in Octopus, ready to be deployed.

Jenkins uses the MSBuild plugin to compile .NET solutions, the Maven Plugin for Java solutions, or a variety of others depending on your tech/language stack.

## Add build steps

The Octopus Jenkins plugin comes with these Octopus Build Steps:
  1. **Octopus Deploy: Package Application** Create a NuGet or Zip formatted package.
  1. **Octopus Deploy: Push Build Information** Add information about the build, including work items and commit messages, that is then stored in Octopus Deploy.
  1. **Octopus Deploy: Push Packages** Push packages to the Octopus Deploy built-in repository.
  1. **Octopus Deploy: Create Release** Create a new release in Octopus Deploy, and optionally deploys it to an environment.
  1. **Octopus Deploy: Deploy Release** Deploy an existing release to a new environment.

  You can make use of any combination of these to achieve your deployment objective. They are Build Steps so you can have multiple instances of any of the types, it is a Jenkins limitation to have that with post-build actions.

 ![](/docs/packaging-applications/build-servers/jenkins/images/menu-options.png "width=500")

## Package application {#Jenkins-Packageapplication}

Octopus supports multiple [package formats](/docs/packaging-applications/#supported-formats) for deploying your software.

You can configure your Jenkins project to [package](/docs/octopus-rest-api/octopus-cli/pack) your application or other files on disk, without the need of any specification files, e.g. `.nuspec`.

The two supported formats are `zip` and `nuget`.

To see the full set of additional arguments that can be supplied see the [pack documentation](/docs/octopus-rest-api/octopus-cli/pack)

[Pack syntax for Pipeline](/docs/packaging-applications/build-servers/jenkins/pipeline/#pack)

:::figure
![](/docs/packaging-applications/build-servers/jenkins/images/package-application.png "width=500")
:::

This action works well combined with the next action `Push Packages`.

## Push packages {#Jenkins-Pushpackages}

Octopus can be used as a [NuGet package repository](/docs/packaging-applications/package-repositories/built-in-repository), using this action you can push packages to Octopus.

This action will push all packages that match the `Package paths` supplied.

:::div{.hint}
Note that the package paths defined here should be full paths, not including any wildcards.
:::

[Push Package syntax for Pipeline](/docs/packaging-applications/build-servers/jenkins/pipeline/#push)

:::figure
![](/docs/packaging-applications/build-servers/jenkins/images/push-packages.png "width=500")
:::

## Push build information {#Jenkins-Pushbuildinformation}

Build information is passed to Octopus as a file using a custom format. The Jenkins plugin also supports this feature. For more information see the [Build Information documentation](/docs/packaging-applications/build-servers/build-information).

The build information is associated with a package and includes:

 - Build URL: A link to the build which produced the package.
 - Commits: Details of the source commits related to the build.
 - Issues: Issue references parsed from the commit messages.

This allows you to capture all related details and create clear traceability between build and deployment.

[Push Build Information syntax for Pipeline](/docs/packaging-applications/build-servers/jenkins/pipeline/#build-information)

:::figure
![](/docs/packaging-applications/build-servers/jenkins/images/push-build-information.png "width=500")
:::

As an example here is what build information looks like when attached to a release:

:::figure
![Build information on release page](/docs/packaging-applications/build-servers/jenkins/images/build-information-release.png "width=500")
:::

## Creating a release {#Jenkins-Creatingarelease}

Jenkins is compiling our code and publishing packages to Octopus Deploy. If we wish, we can also have Jenkins automatically create (and optionally, deploy) a release in Octopus along with other supporting actions.


:::div{.success}
**Octopus CLI more information**
Learn more about the [Octopus CLI](/docs/octopus-rest-api/octopus-cli) and the arguments it accepts.
:::

When this job runs, Jenkins will now not only build and publish packages, it will also create a release in Octopus Deploy.

As an example here, we're relying on the `${BUILD_NUMBER}` value generated by Jenkins to use in the Release Version: `1.1.${BUILD_NUMBER}`.

[Create Release syntax for Pipeline](/docs/packaging-applications/build-servers/jenkins/pipeline/#create-release)

:::figure
![](/docs/packaging-applications/build-servers/jenkins/images/create-release.png "width=500")
:::

## Deploying releases {#Jenkins-Deployingreleases}

You might like to configure Jenkins to not only create a release, but deploy it to a *test environment*. This can be done by ticking the `Deploy this release after it is created?` option.

Alternatively, you can use the `Deploy Release` action if you need to specify more deployment criteria, for example the channel or other required packages.

:::figure
![](/docs/packaging-applications/build-servers/jenkins/images/deploy-release.png "width=500")
:::

A successful run looks like this:

[Deploy Release syntax for Pipeline](/docs/packaging-applications/build-servers/jenkins/pipeline/#deploy-release)

:::figure
![](/docs/packaging-applications/build-servers/jenkins/images/random-quotes-successful-run.png "width=500")
:::

:::div{.success}
**Contributing to the plugin**

We welcome contributions; issues, bug fixes, enhancements.

If you are starting to work on something more detailed please reach out to support@octopus.com to ensure it aligns with what we have going on, and that we are not doubling up efforts.

Have a look at the [Octopus-Jenkins-Plugin repository](https://github.com/OctopusDeploy/octopus-jenkins-plugin) on GitHub. We also have the following [developer focused guidelines](https://github.com/OctopusDeploy/octopus-jenkins-plugin/blob/master/developer-guide/) to get you started working on the plugin.
:::

## Learn more

- Generate an Octopus guide for [Jenkins and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?buildServer=Jenkins)
 - [Jira blog posts](https://octopus.com/blog/tag/jira)
