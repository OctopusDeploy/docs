---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: SQL Server DACPAC deployment
description: How to do database deployments with DACPAC.
navOrder: 20
---


Starting with SQL Server 2008, Microsoft introduced a new project type called Database Projects.  These projects use the [state-based approach](https://octopus.com/blog/sql-server-deployment-options-for-octopus-deploy) to applying changes to your database.  Initially, Database Projects were not available as part of the initial Visual Studio install and had to be downloaded separately. This download was referred to as SQL Server Data Tools (SSDT) and included project types for Database projects, SQL Server Reporting Services (SSRS) projects, and SQL Server Integration Services (SSIS) projects.  Modern versions of Visual Studio have SSDT available to choose when installing or modifying an existing installation.

## Installing SSDT for Visual Studio
For earlier versions of Visual Studio such as 2015 and below, installing the SSDT was a matter of locating the download for your version of Visual Studio.  Microsoft has provided a convenient way of finding the appropriate download on [this page](https://docs.microsoft.com/en-us/sql/ssdt/previous-releases-of-sql-server-data-tools-ssdt-and-ssdt-bi?view=sql-server-ver15).

For more modern versions of Visual Studio (2017+), checkout [Microsofts installation instructions](https://docs.microsoft.com/en-us/sql/ssdt/download-sql-server-data-tools-ssdt?view=sql-server-ver15)

:::div{.success}
This guide uses Visual Studio 2019
:::

## Connect the project to the database

With SSDT for Visual Studio installed you can connect the project to the database with the following steps. First, we create the project:

1. Navigate to the **Other Toolsets** category.
2. Click the **Data storage and processing** option.
3. Select **SQL Server Database Project** and click **Next**.
4. Enter the project name and click **Create**.

The project has been created, now we connect it to a database. This example uses a preexisting database called OctoFXDemo:

1. Right-click the project name, then click **Import ➜ Database**.
2. Click **Select Connection**.
3. Add the **Server Name** and select the type of authentication. In this screenshot, a SQL Account is used to connect to the database server.  

:::figure
![Connection details for the database](/docs/deployments/databases/sql-server/images/visual-studio-2019-connect-database.png)
:::

4. Click **Connect** and then click **Start** to import the database.

Importing the database will populate your project with the existing objects from the database. You will see a summary of the importing process:

:::figure
![Summary of the database import process](/docs/deployments/databases/sql-server/images/visual-studio-2019-connect-database-import-complete.png)
:::

The project is now ready for creating database schema objects (tables, views, stored procedures, etc...)

## Compare the project to the database schema

When the project has some objects, we can compare the project to the target database.

1. Right-click on the project and choose **Schema Compare...**.
2. Select the target database connection by clicking **Select Target ➜ Select Connection**, and select the connection.
3. Click **Compare**.

Visual studio will now compare the project to the database and list the steps it will take during a deployment:

:::figure
![The results of the Schema Compare in Visual Studio](/docs/deployments/databases/sql-server/images/visual-studio-2019-project-schema-compare-results.png)
:::

:::div{.hint}
For databases that have a dependency on other databases, it is possible to add a reference to another database project.  This should be done with caution to avoid circular dependencies with each database depending on each other, as this will result in neither database project compiling.
:::

## Build definition

You can use most build servers to build the SQL Server Database project, you just need to install the Visual Studio build tools for the version of Visual Studio that you're using on the build agent.

This guide uses Azure DevOps as the build platform, but any build server can do this.

### Create the build definition

To create the build definition, take the following steps:

:::div{.warning}
Note, this example uses the classic editor without YAML.
:::

1. From the Azure DevOps repo, click **Pipelines ➜ New Pipeline**.
2. Select **Empty job** to start.
3. Choose a build pool, then click on the **+** to add a step to the build definition.
4. Click on the Build category and scroll down to **Visual Studio build**.

:::div{.hint}
An MSBuild task will accomplish the same thing
:::

5. Add `/p:OutDir=$(build.stagingdirectory)` to the MSBuild Arguments so that the built artifacts are separated from the source code.

:::figure
![MSBuild arguments](/docs/deployments/databases/sql-server/images/azure-devops-build-visual-studio-arguments.png)
:::

6. Click on the **+**, select **Package**, and select **Package Application for Octopus**.

:::div{.hint}
The Octopus Deploy extension is available in the Marketplace, install the extension if you haven't already done so.
:::

7. Add the properties for the task:
    - **Package ID**: Give the package a meaningful name.
    - **Package Format**: Chose whichever package type you wish.
    - **Package Version**:  Use the build server build number to associate a package version back to a build number.
    - **Source Path**: This will be the same path as what we set the MSBuild argument to, `$(build.stagingdirectory)`.
    - **Output Path**: Location to store the created package.

:::div{.hint}
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

:::figure
![](/docs/deployments/databases/sql-server/images/azure-devops-build-successful.png)
:::

## Create the Octopus Deploy project

Now that the build server has been configured to push the artifact to the Octopus Server, we need to create a project in Octopus deploy to deploy the package.

1. From the Octopus Web Portal, click the **Projects** tab.
2. Select the Project Group and click the **ADD PROJECT**.
3. Give the project a unique name, a description (optional) , select the Project Group and the Lifecycle, and click **SAVE**.

### Define the project variables

1. Click **Variables** from the project's overview screen.
2. Define the following variables:
	- `Project.SQLServer.Name`
	- `Project.SQLServer.Admin.User.Name` (optional)
	- `Project.SQLServer.Admin.User.Password` (optional)
	- `Project.Database.Name`
	- `Project.DACPAC.Name`

It is considered best practice to namespace your variables.  Doing this helps prevent any variable name conflicts from library variable sets or step template variables.  Prefixing `Project.` to the front indicates that this is a project variable.

:::div{.hint}
If you're using Integrated Authentication with Windows, you do not need either of the `Project.SQLServer.Admin*` variables.
:::

:::figure
![The project variables in the Octopus Web Portal](/docs/deployments/databases/sql-server/images/octopus-project-variables.png)
:::

Note, both `Project.SQLServer.Admin.Password` and `Project.SQLServer.Name` have multiple variables that are scoped to different environments. Learn more about [scoping variables](/docs/projects/variables/#scoping-variables).

### Define the deployment process

With variables defined, we can add steps to our deployment process.

1. Click the **Process** tab.
2. Click  **ADD STEP**.
3. Search for `dacpac` steps, select the **SQL - Deploy DACPAC from Package Parameter** step, and enter the following details:
	- **DACPACPackageName**: The name of the dacpac file.  The `Project.DACPAC.Name` variable was created for this field.
	- **Publish profile name**: Complete this field if you use Publish profiles.
	- **Report**: True.
	- **Script**: True.
	- **Deploy**: False.
	- **Extract target database to dacpac**: False.
	- **Target Servername**: `Project.SQLServer.Name` variable.
	- **Target Database**: `Project.Database.Name` variable.
	- **Target Database Version**: Select from the drop-down if DLLs are locally installed, otherwise you can leave it blank.
	- **Use Integrated Security**: False (if using SQL Authentication).
	- **Username**: `Project.SQLServer.Admin.User.Name` variable.
	- **Password**: `Project.SQLServer.Admin.User.Password` variable.
	- **Enable multi subnet failover**
	- **Additional deployment contributors**
	- **DACPAC Package**: The package from the repository, OctoFXDemo.dacpac for this guide.

4. Add a manual intervention step, scoped to production, so the report from the previous step can be examined before deploying to production.
5. Add another **SQL - Deploy DACPAC from Referenced Package** step, and change the Report and Script values to `False`, and the Deploy value to `True`.

The deployment process should look like this:

:::figure
![](/docs/deployments/databases/sql-server/images/octopus-project-steps.png)
:::

### Create and deploy a release

1. Create a release by clicking on the **CREATE RELEASE** button.
2. Click **SAVE**.
3. Click the **DEPLOY TO DEVELOPMENT** button.
4. Finally, click **DEPLOY**.

The results will look like:

:::figure
![](/docs/deployments/databases/sql-server/images/octopus-project-deploy-complete.png)
:::

The first part of this process gathers the changes and creates two [artifacts](/docs/projects/deployment-process/artifacts), an XML file that reports which objects will be changed and the script it will use to apply those changes.  The deployment (deploy DACPAC) uses that generated script and applies it to the target so the database matches the desired state.
