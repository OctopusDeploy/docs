
## Create an account {#GettingstartedwithAzureWebApps-Createanaccount}

In Octopus Deploy, go to the Environments tab and select Accounts:

![Accounts](account-link.png "width=500")

Add an Azure Subscription account and fill in your account details:

![Azure account](/docs/images/3049356/3278536.png "width=500")

If you are allowing Octopus to generate a management certificate for you, first save the account and then upload the generated certificate to your Azure management certificates in the Azure Portal.

![Upload certificate](azure-cert-upload.png "width=500")

## Create an environment {#GettingstartedwithAzureWebApps-Createanenvironment}

In order to deploy a Web App we require an Octopus environment to deploy to. Create a new environment called "Staging":

![](/docs/images/3049356/3278537.png "width=500")

## Create a project {#GettingstartedwithAzureWebApps-Createaproject}

Now have the NuGet package we want to deploy, the account we are going to use for the deployment and an environment to deploy to.  Now all we need is a project to do all the work.  Create a new project:

![](/docs/images/3049356/3278538.png "width=500")

In the project's process add a new Deploy an Azure Web App step. Select the NuGet package that you are going to deploy and the Azure account to use for the deployment. The settings for this step should look something like this:

![](/docs/images/3049356/3278539.png "width=500")

Save the step and create a release for your project. Deploy the release to the Staging environment:

![](/docs/images/3049356/3278540.png "width=500")

Grab a coffee and by the time you get back your application should be deployed to Azure Web Apps.
