
## Create an Account {#GettingstartedwithAzureWebApps-Createanaccount}

To set up a new Azure account, follow the directions in [Creating an Azure Account](/docs/infrastructure/azure/creating-an-azure-account/index.md).

## Create an Environment {#GettingstartedwithAzureWebApps-Createanenvironment}

In order to deploy a Web App we require an Octopus environment to deploy to. Under {{Infrastructure, Environments}}, create a new environment called "Staging":

![Create environment](create-env.png "width=500")

## Create a Project {#GettingstartedwithAzureWebApps-Createaproject}

We now have the NuGet package we want to deploy, the account we are going to use for the deployment and an environment to deploy to: all we need is a project to do all the work.  Create a new project:

![Create project](create-project.png "width=500")

In the new project's *Process* tab, add a new 'Deploy an Azure Web App' step. Select the NuGet package that you are going to deploy and the Azure account to use for the deployment. The settings for this step should look something like this:

![Azure Web App Step](web-app-step.png "width=500")

Save the step and create a release for your project. Deploy the release to the Staging environment:

![Deploy Web App](deploy-to-staging.png "width=500")

Grab a coffee and by the time you get back your application should be deployed to Azure Web Apps.
