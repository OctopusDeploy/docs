---
title: SQL Server DACPAC deployment
description: How to do database deployments with DACPAC.
position: 20
---


Starting with SQL Server 2008, Microsoft introduced a new project type called Database Projects.  These projects use the [state-based approach](https://octopus.com/blog/sql-server-deployment-options-for-octopus-deploy) to applying changes to your database.  Initially, Database Projects were not available as part of the initial Visual Studio install and had to be downloaded separately. This download was referred to as SQL Server Data Tools (SSDT) and included project types for Database projects, SQL Server Reporting Services (SSRS) projects, and SQL Server Integration Services (SSIS) projects.  Modern versions of Visual Studio have SSDT available to choose when installing or modifying an existing installation.

## Installing SSDT for Visual Studio
For earlier versions of Visual Studio such as 2015 and below, installing the SSDT was a matter of locating the download for your version of Visual Studio.  Microsoft has provided a convenient way of finding the appropriate download on [this page](https://docs.microsoft.com/en-us/sql/ssdt/previous-releases-of-sql-server-data-tools-ssdt-and-ssdt-bi?view=sql-server-ver15).

For more modern versions of Visual Studio (2017+), the option appears on the `Workloads` selection screen during initial installation or when modifying an existing installation.

### Visual Studio 2017 Installer
To install the SSDT for Visual Studio 2017, scroll to the `Web & Cloud` category and select the `Data storage and processing` option

![](images/visual-studio-2017-installer.png)

### Visual Studio 2019 Installer
To install the SSDT for Visual Studio 2019, scroll to the `Other Toolsets` category and select the `Data storage and processing` option.

![](images/visual-studio-2019-installer.png)

For both versions Visual Studio, there will be a new project type of SQL Server Database Project:

Visual Studio 2017
![](images/visual-studio-2017-project.png)

Visual Studio 2019
![](images/visual-studio-2019-project.png)

:::success
This guide uses Visual Studio 2019
:::

## Connect the project to the database

With SSDT for Visual Studio installed you can connect the project to the database with the following steps. First, we create the project:

1. Navigate to the **Other Toolsets** category.
2. Click the **Data storage and processing** option.
3. Select **SQL Server Database Project** and click **Next**.
4. Enter the project name and click **Create**.

The project has been created, now we connect it to a database. This example uses a pre-existing database called OctoFXDemo:

1. Right-click the project name, then click **{{ Import,Database }}**.
2. Click **Select Connection**.
3. Add the **Server Name** and select the type of authentication. In this screenshot, an SQL Account is used to connect to the database server.  

![Connection details for the database](images/visual-studio-2019-connect-database.png "width=500")

4. Click **Connect** and then click **Start** to import the database.

Importing the database will populate your project with the existing objects from the database. You will see a summary of the importing process:

![Summary of the database import process](images/visual-studio-2019-connect-database-import-complete.png "width=500")

The project is now ready for creating database schema objects (tables, views, stored procedures, etc...)

## Compare the project to the database schema

When the project has some objects, we can compare the project to the target database. 

1. Right-click on the project and choose **Schema Compare...**.
2. Select the target database connection by clicking {{ Select Target, Select Connection }}, and select the connection.
3. Click **Compare**.

Visual studio will now compare the project to the database and list the steps it will take during a deployment:

![The results of the Schema Compare in Visual Studio](images/visual-studio-2019-project-schema-compare-results.png "width=500")

:::hint
For databases that have a dependency on other databases, it is possible to add a reference to another database project.  This should be done with caution to avoid circular dependencies with each database depending on each other, as this will result in neither database project compiling.
:::

## Build definition

You can use most build servers to build the SQL Server Database project, you just need to install the Visual Studio build tools for the version of Visual Studio that you're using on the build agent.

This guide uses Azure DevOps as the build platform, but any build server can do this.

### Create the build definition

To create the build definition, take the following steps:

:::warning
Note, this example uses the classic editor without YAML.
:::

1. From the Azure DevOps repo, click {{ Pipelines, New Pipeline }}.
2. Select **Empty job** to start.
3. Choose a build pool, then click on the **+** to add a step to the build definition.
4. Click on the Build category and scroll down to **Visual Studio build**.

:::hint
An MSBuild task will accomplish the same thing
:::

5. Add `/p:OutDir=$(build.stagingdirectory)` to the MSBuild Arguments so that the built artifacts are separated from the source code.

![MSBuild arguments](images/azure-devops-build-visual-studio-arguments.png)

6. Click on the **+**, select **Package**, and select **Package Application for Octopus**.

:::hint
The Octopus Deploy extension is available in the Marketplace, install the extension if you haven't already done so.
:::

7. Add the properties for the task:
    - **Package ID**: Give the package a meaningful name.
    - **Package Format**: Chose whichever package type you wish.
    - **Package Version**:  Use the build server build number to associate a package version back to a build number.
    - **Source Path**: This will be the same path as what we set the MSBuild argument to, `$(build.stagingdirectory)`.
    - **Output Path**: Location to store the created package.

:::hint
For Azure DevOps, the build number can be formatted on the Options tab under Build number format.  This guide uses the format `$(Year:yyyy).$(Month).$(DayOfMonth).$(Rev:r)`.
:::

8. Expand the Advanced Options section and add:
	- **Include**: The only file we need for deployment is the .dapac itself.  Add the filename here, this example uses `OctoFXDemo.dacpac`.
9. The final step in the definition pushes the package to a repository.  This guide uses Octopus Deploy's built-in package repository. Click on the **+**, select **Package**, and select **Push Package(s) to Octopus**.
10. Next, create a connection to the Octopus Server, by clicking **+ New** and add the connection details, then click **OK**.
11. Select the space in your Octopus instance to push to from the drop-down menu.
12. Enter the package(s) that you would like pushed to the Octopus repository and the individual packages or use wildcard syntax:
	1. Individual packages, for instance, `$(build.stagingdirectory)\OctoFXDemo.dacpac.$(Build.BuildNumber).nupkg`
	2. A wildcard `$(build.stagingdirectory)\*.nupkg`.

Queue the build to push the artifact to the Octopus Server:

![](images/azure-devops-build-successful.png)

## Creating the Octopus Deploy project
The build successfully pushed the artifacts for deployment, now we need to create the Octopus Deploy project to deploy it.

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

It is considered best practice to namespace your variables.  Doing this helps prevent any variable name conflicts from Library Variable Sets or Step Template variables.  Prefixing Project. to the front indicates that this is a Project variable.

:::hint
If you're using Integrated Authentication (Windows), you do not need either of the Project.SQLServer.Admin* variables.
:::

![](images/octopus-project-variables2.png)

Note that both Project.SQLServer.Admin.Password and Project.SQLServer.Name both have multiple values associated with them, but for different Environment specifications.  This is known as scoping.  Scoping a variable to an Environment lets Octopus Deploy know that when deploying to the Development environment to use the value of SQLSERVERDEV for the Project.SQLServer.Name variable.

With variables defined, we can add steps to our deployment process.  Click on the **Process** tab.

![](images/octopus-project-process-tab.png)

Click on **ADD STEP**

![](images/octopus-project-add-step.png)

Filter by `dacpac`

![](images/octopus-project-step-filter.png)

There will be three results returned

![](images/octopus-project-step-filter-results.png)

All three Step Templates have close to the same code within them and support the same features.  However, there are some differences.

### SQL - Deploy DACPAC
This is the original step template written for DACPAC deployments.  This step template requires the template to be run on a Deployment Target.  Recent versions of SQL Server are not placing the DLLs necessary to perform a DACPAC deployment on the servers directly, in such situations, this template will temporarily download the SqlServer PowerShell module, if not found locally, to load the DLLs necessary.  It's important to note that if the NuGet PowerShell Package Provider is not present on the target, it will be installed.

### SQL - Deploy DACPAC from Referenced Package
This version of the template does not need be exected directly on the Deployment Target and can be run from a Worker.  This version requires two packages to be supplied; the DACPAC and a package containing the DLLs to deploy DACPACs.  This would be ideal for situations where you would like to use a Worker and don't have access to the Internet.  With this version, you need to know the Feed Id, which can be problematic when not using the Default space.

### SQL - Deploy DACPAC from Package Parameter
Similar to `SQL - Deploy DACPAC`, this version will automatically download a temporary version of the SqlServer PowerShell module if it cannot find the DLLs locally for DACPAC deployment (and install the NuGet Package Provider).  It also can run from a Worker like `SQL - Deploy DACPAC from Referenced Package`.  However, the difference is that it uses a Package Parameter instead of a Package Reference making it easier to use in multi-space instances.

:::hint
All three templates support the use of SqlCmd Variables.  To use SqlCmd variables, apply a specific naming convention to your project variable by prefixing `SqlCmdVariable.` to the SqlCmd Variable.  For example, if your SqlCmd Variable is named MyVariable, then you would create an Octopus variable called SqlCmdVariable.MyVariable
:::

This guide uses the `SQL - Deploy DACPAC from Package Parameter` step template

Fill in the template inputs:
- DACPACPackageName - Name of the dacpac file.  The Project.DACPAC.Name variable was created for this field.
- Publish profile name - Fill this in if you use Publish profiles
- Report - True
- Script - True
- Deploy - False
- Extract target database to dacpac - False
- Target Servername - Project.SQLServer.Name variable
- Target Database - Project.Database.Name variable
- Target Database Version - Select from the drop-down if DLLs are locally installed, otherwise you can leave it blank
- Use Integrated Security - False (if using SQL Authentication)
- Username - Project.SQLServer.Admin.User.Name variable
- Password - Project.SQLServer.Admin.User.Password variable
- Enable multi subnet failover 
- Additional deployment contributors
- DACPAC Package - The package from the repository, OctoFXDemo.dacac for this guide

![](images/octopus-project-dacpac1.png)
![](images/octopus-project-dacpac2.png)
![](images/octopus-project-dacpac3.png)

This first step will report out what changes will be done without applying.  This allows for a manual intervention step to be placed for Production deployments in between the report and the deploy steps.

Add a manual intervention step, scoping it to Production

Finally, add another `SQL - Deploy DACPAC from Referenced Package` step, changing the Report and Script values to False, and the Deploy value to True.

When done, the deployment process should look like this:

![](images/octopus-project-steps.png)

Create a Release by clicking on the **CREATE RELEASE** button

![](images/octopus-project-create-release.png)

Click **SAVE**

![](images/octopus-project-create-release-save.png)

Click **DEPLOY** on the Development row or the **DEPLOY TO DEVELOPMENT** button

Finally, click **DEPLOY**

![](images/octopus-project-release-deploy2.png)

The results should look like:

![](images/octopus-project-deploy-complete.png)

The first step (Gather changes) creates two [artifacts](https://octopus.com/docs/deployment-process/artifacts), an XML file reporting which objects will be changed and the script it's going to use to apply those changes.  Step 3 (Deploy DACPAC) uses that generated script and applies it to the target so the database matches the desired state.