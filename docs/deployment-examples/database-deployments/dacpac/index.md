---
title: SQL Server DACPAC deployment
description: How to do database deployments with DACPAC.
position: 
---

One of the most complex aspects of full stack deployments is automating database changes.  There are two schools of thought in how changes should be implemented; state-based and migration-based.  The state-based approach captures the state of the database and uses that to compare against the target.  Differences are automatically scripted  and applied to the target so it matches the given state.  The migration-based approach starts with an intial script to define your database, then uses versioned scripts applied in sequence to migrate the database over time.

## Microsoft Data-tier application package (DACPAC)
Starting with SQL Server 2008, Microsoft introduced a new project type called Database Projects.  These projects use the state-based approach to applying changes to your database.  Initially, Database Projects were not available as part of the initial Visual Studio install and had to be downloaded separately. This download was referred to as SQL Server Data Tools (SSDT) and included project types for Database projects, SQL Server Reporting Services (SSRS) projects, and SQL Server Integration Services (SSIS) projects.  Modern versions of Visual Studio has SSDT available to choose when installing or modifying an existing installation.

### Installing SSDT for Visual Studio
For earlier versions of Visual Studio such as 2015 and below, installing the SSDT was a matter of locating the download for your version of Visual Studio.  Microsoft has provided a convenient way of finding the appropriate download on [this page](https://docs.microsoft.com/en-us/sql/ssdt/previous-releases-of-sql-server-data-tools-ssdt-and-ssdt-bi?view=sql-server-ver15).

For more modern versions of Visual Studio (2017+), the option appears on the project type selection screen during intial installation or when modifying an existing installation.

#### Visual Studio 2017 Installer
To install the SSDT for Visual Studio 2017, scroll to the `Web & Cloud` category and select the `Data storage and processing` option

![](images/visual-studio-2017-installer.png)

#### Visual Studio 2019 Installer
To install the SSDT for Visual Studio 2019, scroll to the `Other Toolsets` category and select the `Data storage and processing` option.

![](images/visual-studio-2019-installer.png)

For both versions Visual Studio, a new project type of SQL Server Database Project:

Visual Studio 2017
![](images/visual-studio-2017-project.png)

Visual Studio 2019
![](images/visual-studio-2019-project.png)

(The remainder of the images in this guide will use Visual Studio 2019)

### Connecting the project to the database
Once you've chosen the SQL Server Database Project type, chose Next.  Fill in the project name and click Create

![](images/visual-studio-2019-project-new.png)

Now that we have the project created, let's connect it to the database.  For this guide, I've already created an empty database called OctoFXDemo.

Right-click on the Project -> Import -> Database

![](images/visual-studio-2019-connect-database1.png)

Click on Select Connection

![](images/visual-studio-2019-connect-database2.png)

Fill in the details for connecting to the server and database.  In this screenshot, I'm using a SQL Account to connect to the database server simply because I'm not running an Active Directory domain.  Otherwise I could have chosen Windows Authentication.  Click Connect when done.

![](images/visual-studio-2019-connect-database3.png)

Once we've selected the connection, the Start button will enable.  Click Start to begin the process

![](images/visual-studio-2019-connect-database4.png)

You should see the following once the import has completed.

![](images/visual-studio-2019-connect-database-import-complete.png)

Our import didn't do much because this was an empty database, but we have something to compare the project with now.

:::hint
This guide uses an empty database to start with, however, using an existing database will work just the same.  The import process will populate your project with the existing objects from the database.
:::

At this point, we can start creating our database schema (tables, views, stored procedures, etc...)

### Comparing project the database schema
Once we've created some objects in our project, we can compare the project to the target database.  Right-click on the Project, then choose `Schema Compare...`

![](images/visual-studio-2019-project-schema-compare.png)

Select the target database connection

![](images/visual-studio-2019-project-schema-compare-target.png)
![](images/visual-studio-2019-project-schema-compare-connection.png)
![](images/visual-studio-2019-project-schema-compare-select.png)

Once you've selected the target, click on Compare

![](images/visual-studio-2019-project-schema-compare-project.png)

Visual studio will then compare the project to the database and list out what it will do on a deployment

![](images/visual-studio-2019-project-schema-compare-results.png)

:::hint
For databases that have a dependency on other databases, it is possible to add a reference to another database project.  This should be done with caution as you could end up with a circular dependency where database A depends on database B and database B depends on database A.  In this situation, neither database project will compile.
:::

### Build definition
Building the SQL Server Database Project can be done pretty much any build server (Azure DevOps, TeamCity, Jenkins, Bamboo, etc...).  The requirements for building are similar to those of Visual Studio itself, MSBuild and the SSDT.  The recommended approach to this is to install the Visual Studio build tools on the build agent(s) for the version of Visual Studio that you're using.  Just like Visual Studio, if you're using older versions, you'll need to locate the SSDT and install that separately.  If you're using the more modern versions, the option to install will SSDT will be on the Visual Studio tools installer.  This guide will use Azure DevOps as the build platform, but any build server can do this.

#### Creating the definition
From our Azure DevOps repo, click on Pipelines then New Pipeline

![](images/azure-devops-build-create.png)

Because it's easier to follow, we're going to use the classic editor without YAML

![](images/azure-devops-build-classic.png)

For this guide, we're going to be using a Azure DevOps Git repo with the master branch

![](images/azure-devops-build-source.png)

Our build process is going to be quite simple and doesn't need a template, we'll choose `Empty job` to start off with.

![](images/azure-devops-build-empty.png)

After choosing the build pool to use, click on the `+` to add a step to our build definition

![](images/azure-devops-build-add-task.png)

Click on the Build category and scroll down to `Visual Studio build`

:::hint
An MSBuild task will accomplish the same thing
:::

![](images/azure-devops-build-add-visual-studio-build.png)

Add `/p:OutDir=$(build.stagingdirectory)` to the MSBuild Arguments so that the built artifacts are separated from the source code.

![](images/azure-devops-build-visual-studio-arguments.png)

Click on the `+` to add an Octopus Package step

:::hint
The Octopus Deploy extension is available in the Marketplace, install the extension if you haven't already done so.
:::

![](images/azure-devops-build-package.png)

Fill in the properties of the task
- Package ID: Give the package a meaninful name
- Package Format: Chose whichever package type you wish
- Package Version:  Use the build server build number to associate a package version back to a build number
- Source Path: This will be the same path as what we set the MSBuild argument to, $(build.stagingdirectory)
- Output Path: I used the same folder as source

:::hint
For Azure DevOps, the build number can be formatted on the Options tab under Build number format.  For this guide, I used the format of `$(Year:yyyy).$(Month).$(DayOfMonth).$(Rev:r)`

![](images/azure-devops-build-format-number.png)
:::

Expand the Advanced Options section
- Include: The only file we need for deployment is the .dapac itself.  Add the filename here, in my case it's OctoFXDemo.dacpac

![](images/azure-devops-build-octo-package.png)

The final step in our definition will be pushing the package to a repository.  This guide will make use of the built-in Octopus Deploy NuGet package repository.

Click on the `+` to add an Octopus Push step

![](images/azure-devops-build-push.png)

This step requires that a connection to the Octopus server be created.  Click on the `+ New` button

![](images/azure-devops-build-add-octo-connection.png)

Add the connection details and click OK

![](images/azure-devops-build-octo-connection.png)

Choose the Space to push to

![](images/azure-devops-build-octo-space.png)

Enter the package(s) that you would like pushed to the Octopus repository.  This can be individual packages such as `OctoFXDemo.dacpac.$(Build.BuildNumber).nupkg` or something more generic like using a wildcard `*.nupkg`.  For this guide, I'll be using the wildcard approach.  You will also need to provide the path to where to find the package.  I used `$(build.stagingdirectory)\*.nupkg`

![](images/azure-devops-build-octo-push.png)

These three steps are all that we need for our build definition.  Queue the build to get our artifact pushed to our Octopus Server.

![](images/azure-devops-build-successful.png)

### Creating the Octopus Deploy project
We have successfully pushed the artifacts for deployment, now we need to create the Octopus Deploy project to deploy it.

From the Dashboard of Octopus Deploy, click on Projects

![](images/octopus-projects.png)

Select the Project Group and click the **ADD PROJECT** or the green **ADD PROJECT** button in the upper right-hand corner.

![](images/octopus-projects-add.png)

Give the project a unique name, (optional) a description, select the Project Group and the Lifecycle.  If you've clicked on the **ADD PROJECT** button on a specific project group, this selection will be pre-populated.

![](images/octopus-projects-new.png)

After you click **SAVE**, you will be brought to your new Project.  Before defining our deployment process, let's define some variables that will be used in the deployment process steps.  Click on **Variables**.

![](images/octopus-project-variables.png)

Define the following:
- Project.SQLServer.Name
- Project.SQLServer.Admin.User.Name (optional)
- Project.SQLServer.Admin.User.Password (optional)
- Project.Database.Name
- Project.DACPAC.Name

It is considered best practice to namespace your variables.  Doing this helps prevent any variable name conflicts from Library Variable Sets or Step Template variables.  Prefixing Project. to the front lets us know that this is a Project variable.

:::hint
Since I'm not running an Active Directory, I need to use SQL accounts.  If you're using Integrated Authentication (Windows), you do not need either of the Project.SQLServer.Admin* variables.
:::

![](images/octopus-project-variables2.png)

You'll note that both Project.SQLServer.Admin.Password and Project.SQLServer.Name both have multiple values associated with them, but for different Environment specifications.  This is known as scoping.  Scoping a variable to an Environment lets Octopus Deploy know that when deploying to the Development environment to use the value of SQLSERVERDEV for the Project.SQLServer.Name variable.

With our variables defined, we can add steps to our deployment process.  Click on the **Process** tab.

![](images/octopus-project-process-tab.png)

Click on **ADD STEP**

![](images/octopus-project-add-step.png)

Filter by `dacpac`

![](images/octopus-project-step-filter.png)

You'll note that there are three results returned

![](images/octopus-project-step-filter-results.png)

All three Step Templates have close to the same code within them and support the same features.  However, there are some differences that I'll briefly explain.

#### SQL - Deploy DACPAC
This is the original step template written for DACPAC deployments.  This step template requires the template to be run on a Deployment Target.  Recent versions of SQL Server are not placing the DLLs necessary to perform a DACPAC deployment on the servers directly, in such situations, this template will temporarily download the SqlServer PowerShell module, if not found locally, to load the DLLs necessary.  It's important to note that if the NuGet PowerShell Package Provider is not present on the target, it will be installed.

#### SQL - Deploy DACPAC from Referenced Package
This version of the template does not need be exected directly on the Deployment Target and can be run from a Worker.  This version requires two packages to be supplied; the DACPAC and a package containing the DLLs to deploy DACPACs.  This would be ideal for situations where you would like to use a Worker and don't have access to the Internet.  With this version, you need to know the Feed Id, which can be problematic when not using the Default space.

#### SQL - Deploy DACPAC from Package Parameter
Similar to `SQL - Deploy DACPAC`, this version will automatically download a temporary version of the SqlServer PowerShell module if it cannot find the DLLs locally for DACPAC deployment (and install the NuGet Package Provider).  It also has the ability to run from a Worker like `SQL - Deploy DACPAC from Referenced Package`.  However, the differece is that it uses a Package Parameter instead of a Package Reference making it easier to use in multi-space instances.

:::hint
All three templates support use of SqlCmd Variables.  To use SqlCmd variables, apply a specific naming convention to your project variable by prefixing `SqlCmdVariable.` to the SqlCmd Variable.  For example, if your SqlCmd Variable is named MyVariable, then you would create an Octopus variable called SqlCmdVariable.MyVariable
:::

For this guide, we'll be using the `SQL - Deploy DACPAC from Package Parameter` step template

Fill in the template inputs:
- DACPACPackageName - Name of the dacpac file.  We created the Project.DACPAC.Name variable for this.
- Publish profile name - fill this in if you use Publish profiles
- Report - True
- Script - True
- Deploy - False
- Extract target database to dacpac - false
- Target Servername - Project.SQLServer.Name variable
- Target Database - Project.Database.Name variable
- Target Database Version - Select from the drop down if DLLs are locally installed, otherwise you can leave it blank
- Use Integrated Security - False (if using SQL Authentication)
- Username - Project.SQLServer.Admin.User.Name variable
- Password - Project.SQLServer.Adming.User.Password variable
- Enable multi subnet failover 
- Additional deployment contributors
- DACPAC Package - The package from the repository, OctoFXDemo.dacac for this guide

![](images/octopus-project-dacpac1.png)
![](images/octopus-project-dacpac2.png)
![](images/octopus-project-dacpac3.png)

This first step that we've added will report out what changes will be done without applying.  This gives us the ability to place manual intervention step for Production deployments in between the report and the deploy steps.

Add a manual intervention step, scoping it to Production

Finally, add another `SQL - Deploy DACPAC from Referenced Package` step, changing the Report and Script values to False, and the Deploy value to True.

When done, your deployment process should look like this:

![](images/octopus-project-steps.png)

Create a Release by clicking on the **CREATE RELEASE** button

![](images/octopus-project-create-release.png)

Click **SAVE**

![](images/octopus-project-create-release-save.png)

Click **DEPLOY** on the Development row or the **DEPLOY TO DEVELOPMENT** button

Finally, click **DEPLOY**

![](images/octopus-project-release-deploy2.png)

Your results should look like:

![](images/octopus-project-deploy-complete.png)

You can see that the first step (Gather changes) creates two [artifacts](https://octopus.com/docs/deployment-process/artifacts), an XML file reporting which objects will be changed and the script it's going to use to apply those changes.  Step 3 (Deploy DACPAC) uses that generated script and applies it to the target so the database matches the desired state.