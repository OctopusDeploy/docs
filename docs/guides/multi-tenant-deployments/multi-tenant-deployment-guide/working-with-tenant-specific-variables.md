---
title: Working with tenant-specific variables
position: 3
---


Previous step: [Deploying a simple multi-tenant project](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md)


This page describes how to use [variable templates](/docs/home/deploying-applications/variables/variable-templates.md) as part of a multi-tenant deployment design. We start by building on the existing scenario, providing some background information, and then providing an end-to-end implementation of that scenario.

## Tenant-provided variable values


Quite often you want to define variable values that are different for each tenant, like database connection settings or a tenant-specific URL. Previously you would have defined these values in the project itself, but now you can define these values directly on the tenant for any connected projects.

:::hint
**Tenant-provided variables are not snapshotted**
When you [create a release](/docs/home/api-and-integration/octo.exe-command-line/creating-releases.md) in Octopus Deploy we take a snapshot of the deployment process and the current state of the [project-variables](/docs/home/deploying-applications/variables.md), however we do not take a snapshot of tenant-variables. This enables you to add new tenants at any time and deploy to them without creating a new release. This means any changes you make to tenant-variables will take immediate effect.
:::


We set out with a vision to make this as easy as possible to manage, like the examples shown below.


![](/docs/images/5669247/5865614.png)


*In the example above we are collecting common variable values that remain constant across projects and environments. This could be really useful for values like a tenant alias, contact details, or other values that will remain constant for each tenant across any projects they are connected to. You could think of these like "custom fields" for your tenants. You can also see a warning indicator leading the way to a problem with Project Variables.*


![](/docs/images/5669247/5865615.png)


*In the example above we are collecting tenant-specific values that differ between projects and environments. This could be really useful for settings for connecting to a database for that tenant/environment. In this example we are using a default value as a template drawing from some common variable values. You can also see the warning indicator telling us we need to provide a value for the **Database password** in the **MT Staging** environment.*

:::success
If you have a wide display we will also put environments side-by-side for easy comparison.
:::

## Introducing variable templates


To make this possible we have introduced the concept of [variable templates](/docs/home/deploying-applications/variables/variable-templates.md). Variable templates let you configure which variables are required to successfully deploy a project. Each variable template can define the data type, name, label, help text, and default value.


For more information see our reference section: [Variable templates](/docs/home/deploying-applications/variables/variable-templates.md)

:::success
**Which variable templates apply to each tenant?**
Good question! When you connect a tenant to a project, variable templates defined by the project itself, or by included library variable sets, will be required by the tenant.

1. Library variable templates will be collected once - they are considered to be constant for the tenant. Think of these like "custom fields" for your tenants.
2. Project variable templates will be collected once for each project/environment combination the tenant is connected to. Think of these like database connection settings for the specific tenant/project/environment combination.



By carefully designing your variable templates you can implement complex multi-tenant deployment scenarios.
:::

## Example scenario: a simple multi-tenant web application


Let's walk through an example of deploying a multi-tenant web application using our example project **Mojo**. To successfully deploy this web application we will need the **DatabaseConnectionString** to connect to the tenant database and a **HostURL** to configure IIS:

| Variable | Description | Example resultant value required to configure the application |
| --- | --- | --- |
| `DatabaseConnectionString` | Provides access to the tenant's database for that environment. | `Server=db.mojo.com;Database=mojo-mytenant-production;User ID=mytenant-production;Password=DC7y6KEMYaA6HVjf` |
| `HostURL` | The URL customers will use to access their instance of the web application for that environment. | 

`https://mytenant.mojo.com`(for the customer's production environment)
`https://mytenant-staging.mojo.com` (for the customer's staging environment)
 |


By carefully designing our variables to be constructed using some conventions, we can make it much easier to collect tenant-specific values, but also allow the tenant to override these conventions if required.


- Step 1: Create project variables
- Step 2: Create project variable templates
- Step 3: Create the "Environment variables" library variable set
- Step 4: Create the "Standard tenant details" library variable set
- Step 5: Include the library variable sets into the project
- Step 6: Fill out the variable values for our tenants
- Step 7: Validate the variable values for the project
- Step 8: Deploy!
- Step 9: Review

### Step 1: Create project variables


Let's start with the end in mind by creating the project variables we need. You'll notice we are binding to some variables that don't exist yet.

1. Go to the *Variables* tab in the **Mojo** project.
2. Create the variables shown below.


| Variable | Value | Description |
| --- | --- | --- |
| `DatabaseConnectionString` | `Server=db.mojo.com;Database=#{Tenant.Database.Name};User ID=#{Tenant.Database.UserID};Password=#{Tenant.Database.Password}` | The full database connection string |
| `HostURL` | `https://#{Tenant.Domain.Name}` | The URL each customer will use to access their instance of the web application, can be overridden to use a custom domain name. |


The result should look like the screenshot below:


![](/docs/images/5669247/5865610.png)

### Step 2: Create project variable templates


Some of the variables we just created require tenant-specific values like `#{Tenant.Database.Name}`. We will create variable templates to collect those values from the tenant.


Rather than managing lots of duplicate data, we will use some default values that continue building upon a simple convention. In this case we will use some URL-friendly versions of the tenant and environment names to build our variable values, `Tenant.Alias` and `Environment.Alias`.

1. Go to the *Variables > Variable Templates* tab in the **Mojo** project.
2. Create the variable templates shown below:


| Name | Label | Default value | Help text | Control type |
| --- | --- | --- | --- | --- |
| `Tenant.Database.Name` | Database name | `mojo-#{Environment.Alias}.#{Tenant.Alias}` | The Name of the database - consider changing the Tenant Alias before changing this. | Single-line text box |
| `Tenant.Database.UserID` | Database username | `mojo-#{Environment.Alias}-#{Tenant.Alias}` | The User ID used to connect to the tenant database. | Single-line text box |
| `Tenant.Database.Password` | Database password |  | The password used to connect to the tenant database. | Sensitive/password box |
| `Tenant.Domain.Name` | Domain name | `#{Tenant.Alias}.mojo.com` | An environment-specific name for the Mojo application domain name for this tenant | Single-line text box |


The result should look like the screenshot below:


![](/docs/images/5669247/5865609.png)

### Step 3: Create the "Environment variables" library variable set


In the previous step we created some variable templates that use the `Environment.Alias` variable. We will create a simple [library variable set](/docs/home/deploying-applications/variables/library-variable-sets.md) to provide URL-friendly versions of the target environment's name which we can use in our other variables for defining environment-specific database and domain names.

1. Go to *Library > Variable sets* and add a new variable set called **Environment variables**
2. Create the variables shown below:


| Variable | Value | Scope |
| --- | --- | --- |
| `Environment.Alias` | `dev` | `MT Dev` |
| `Environment.Alias` | `test` | `MT Test` |
| `Environment.Alias` | `staging` | `MT Staging` |
| `Environment.Alias` | `production` | `MT Production` |


The result should look like the screenshot below:


![](/docs/images/5669247/5865607.png)

### Step 4: Create the "Standard tenant details" library variable set


In previous steps we also created some variable templates that depend on a variable called Tenant.Alias. In this case we want the tenant to provide a URL-friendly version of the tenant's name, and we will create a library variable template. By using a variable template from a library variable set the tenant will only be prompted once for this value.

1. Go to *Library > Variable sets* and add a new variable set called **Standard tenant details**
2. Go to the *Variable templates* tab and create the templates shown below:


| Name | Label | Default value | Help text | Control type |
| --- | --- | --- | --- | --- |
| `Tenant.Alias` | Alias |  | This alias will be used to build convention-based settings for the tenant | Single-line text box |
| `Tenant.ContactEmail` | Contact email |  | A comma-separated list of email addresses to send deployment notifications | Single-line text box |


The result should look like the screenshot below:


![](/docs/images/5669247/5865608.png)

### Step 5: Include the library variable sets into the project


Now we have created the library variable sets we need to include them in the **Mojo** project so they take effect.

1. Go to the *Variables > Library Variable Sets* tab of the **Mojo** project
2. Click *Include variable sets from the Library* and select the newly created **Environment variables** and **Standard tenant details** variable sets into the project, clicking *Apply* then *Save*.


### Step 6: Fill out the variable values for our tenants


Go to our tenant **Beverley Sanchez** and go to *Variables > Common Variables* where you should be able to fill in the variables required by our **Standard tenant details** variable set:


![](/docs/images/5669247/5865611.png)


Now go to the *Project Variables* tab and you should see the variables required by the **Mojo** project for each environment **Beverley Sanchez** will be deployed into, in this case just **MT Production**. Leave the convention-based variables alone, and click the *Set* button to set a random password for the database, and click *Save* to save your changes.


![](/docs/images/5669247/5865612.png)

### Step 7: Validate the variable values for the project


Go to the *Variables > All Variables* tab of the **Mojo** project and you can inspect all of the variables that will be used by the project. If something is wrong, you can click on the link to the source of the value and fix the problem.


![](/docs/images/5669247/5865620.png)

### Step 8: Deploy!


Go to the **Mojo** project, create a new release, and deploy it to the **MT Production** environment for **Beverley Sanchez** and you should see all of the variables flowing through properly now.


![](/docs/images/5669247/5865613.png)

### Step 9: Review


Now that we've configured the variables in this way, let's take a look at the results:

- The configuration that changes per-project is defined in the project
- The configuration that changes per-tenant is set on the tenant
- You can use the convention-based default value for **Tenant.Domain.Name** as defined by the project or you can override it completely by setting a custom value in the tenant
- You can add a new template to the project and know which tenants need that value defined before performing a deployment


## Next steps


Learn about [working with groups of tenants using tags](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-groups-of-tenants-using-tags.md) as the foundation for [designing a multi-tenant upgrade process](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md) and [designing a multi-tenant hosting model](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md).
