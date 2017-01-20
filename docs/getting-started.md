---
title: Getting started
position: 0
---


Welcome! This section will guide you through the process of setting up Octopus Deploy and completing your first deployment.


- Octopus in your delivery process
- Install the Octopus server
- Create environments
- Add machines to your environments
- Package your applications for deployment
- Create a project
- Define your deployment process
- Create a release and deploy it
- Next steps

# Octopus in your delivery process


Octopus Deploy is an automated deployment server, which you install yourself, much like you would install SQL Server, Team Foundation Server or JetBrains TeamCity. Octopus makes it easy to automate deployment of ASP.NET web applications and Windows Services into development, test and production environments.


Along with the Octopus Deploy server, you'll also install a lightweight agent service on each of the machines that you plan to deploy to, for example your web and application servers. We call this the Tentacle agent; the idea being that one Octopus server controls many Tentacles, potentially a lot more than 8! With Octopus and Tentacle, you can easily deploy to your own servers, or virtual machines in the cloud from infrastructure as a service providers like Amazon EC2 or Windows Azure virtual machines.





![](/docs/images/3048178/5275670.png)





We designed Octopus to fit into teams that follow agile delivery practices. Octopus compliments your existing delivery pipeline:

- **Developers commit their code into your existing source control system**
You might be using Git, Team Foundation Server, Subversion or Mercurial; the choice is up to you.
- **Your CI/build server compiles the code and runs unit tests**
Again, you might be using TeamCity, Jenkins, Bamboo, Team Foundation Server or CruiseControl.NET; the choice is up to you.
- **Your application is packaged into a NuGet package**
When the build is done, your CI/build server bundles all of the files - the binaries, images, scripts, configuration files and so on - needed to deploy your application into a NuGet package



The job of Octopus, then, is to take these packages and push them to the machines that they will be deployed to. As a release manager, you define the process for deploying the software, including any environment-specific configuration variables. The Octopus web based dashboard then allows other members of your team to queue deployments; for example, you might enable testers to deploy applications to a test environment, but not to production. This approach means that even if different people are triggering the deployments, the deployment process is still consistent.

# Install the Octopus server


Download the latest [Octopus Deploy MSI installer](https://octopus.com/downloads) from the Octopus Deploy website, and follow the instructions.

:::hint
For more information, including a video walkthrough, see the [Installing Octopus](/docs/home/installation/installing-octopus.md) section.
:::


When the MSI installer completes, a wizard will take you through the process of configuring your Octopus Deploy server.


![](/docs/images/3048178/3278212.png)


When your Octopus server is configured, the Octopus Manager UI will appear. This is an administrator-only interface designed for configuring your Octopus server.


![](/docs/images/3048178/3278211.png)


Open the Octopus Web Portal in your browser and sign in, using the address and credentials you specified during the setup wizard.


![](/docs/images/3048178/3278210.png)

# Create environments


Next, you'll need to add environments to deploy to. Environments are really just groups of machines that you deploy to; for example, **Test**, **Staging** or **Production**.


![](/docs/images/3048178/3278205.png)

:::hint
Learn more on the [Environments](/docs/home/key-concepts/environments.md) page.
:::

# Add machines to your environments


On each of the web or application servers that you plan to deploy software to, you'll need to install the Tentacle agent, and then register the machines in your environments.


![](/docs/images/3048178/3278206.png)

:::hint
See how on the [Installing Tentacles](/docs/home/installation/installing-tentacles.md) page. Depending on network/firewall configuration, Tentacles can be installed in [listening](/docs/home/installation/installing-tentacles/listening-tentacles.md) (Octopus calls Tentacle) or [polling](/docs/home/installation/installing-tentacles/polling-tentacles.md) (Tentacle polls Octopus) mode. If you have many machines to manage, you can [install Tentacles automatically](/docs/home/installation/installing-tentacles/automating-tentacle-installation.md).
:::

# Package your applications for deployment


Whenever you want to deploy applications with Octopus, you'll need to package them into NuGet packages. There are three ways to do this:

- Create packages [manually using NuGet Package Explorer](/docs/home/packaging-applications/nuget-packages/manually.md); or,
- Create packages [using OctoPack](/docs/home/packaging-applications/nuget-packages/using-octopack.md) via MSBuild; or,
- Create packages [from the command line using NuGet.exe](/docs/home/packaging-applications/nuget-packages/using-nuget.exe.md)



Your packages need to be placed into a package repository.

# Create a project


Projects define a set of deployment steps that you want Octopus to perform, and their configuration variables.


![](/docs/images/3048178/3278204.png)

:::hint
Learn more about [creating projects](/docs/home/key-concepts/projects.md).
:::

# Define your deployment process


The **Process** tab within your project defines how your project will be deployed. You can add different steps to the process depending on what you plan to deploy:

- To deploy changes to a SQL Server database, see [SQL Server databases](/docs/home/deploying-applications/sql-server-databases.md)
- To deploy an ASP.NET web site to an IIS server, see [IIS Websites and Application Pools](/docs/home/deploying-applications/iis-websites-and-application-pools.md)
- To install or configure a Windows Service, see [Windows Services](/docs/home/deploying-applications/windows-services.md)
- For custom or advanced installation actions, see [Custom scripts](/docs/home/deploying-applications/custom-scripts.md)
- To pause deployment for a human to approve or perform an action, see [Manual intervention and approvals](/docs/home/deploying-applications/manual-intervention-and-approvals.md)



![](/docs/images/3048178/3278203.png)


Chances are, you'll need to configure your application differently depending on the what you are deploying to (for example, different connection strings in staging vs. production). Octopus has advanced support for managing these [variables](/docs/home/deploying-applications/variables.md) and scoping them, and can even manage passwords securely. Octopus can also take care of automatically [updating your .NET configuration files, and running configuration file transforms](/docs/home/deploying-applications/configuration-files.md).

# Create a release and deploy it


Next, create a release. Click the **Create release** button on any page of your project.


![](/docs/images/3048178/3278202.png)


Enter an overall release version number for the release, and select the NuGet package versions that you want to include in the release. You can also add release notes to tell your team what the release contains.


![](/docs/images/3048178/3278201.png)


Now that you have a release, you can deploy and promote it between environments. On the release page, use the green **Deploy to *<environment>*** button to promote it**.**


![](/docs/images/3048178/3278200.png)


The deployment page shows you a log of all the activity that happens during the deployment, on both the Octopus server and any Tentacles, including the output of any custom scripts.


![](/docs/images/3048178/3278199.png)

# Next steps


Congratulations, you've deployed a release! You might want to look at:

- Triggering deployments from [TeamCity](/docs/home/api-and-integration/teamcity.md) or [TFS](/docs/home/api-and-integration/team-foundation-server-(tfs).md)
- [Inviting other users and adding them to teams](/docs/home/administration/managing-users-and-teams.md)
- The comprehensive [Octopus Deploy REST API](/docs/home/api-and-integration/octopus-rest-api.md) and C# client
