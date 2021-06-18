## Step 2: Create an Azure account {#DeployingapackagetoanAzureWebApp-Step2:CreateanAzureAccount}

If you haven't already, create an [Azure Account](/docs/infrastructure/accounts/azure/index.md) to grant Octopus Deploy access to your Azure Subscription.

## Step 3: Configure your Azure web app step {#DeployingapackagetoanAzureWebApp-Step4:ConfigureyourAzureWebAppstep}

1. Add a new `Deploy an Azure Web App` step to your [project's deployment process](/docs/projects/steps/index.md).

![](5865899.png "width=170")

2. On the `Package` section of the step configuration page, select your `Package Feed` and `Package ID`

3. On the `Azure` Section, select the `Azure Account` that you created in the previous step. Once you do this, the web apps in your subscription will populate the `Web App` drop-down list for you to pick the one you want to deploy to.

For both the `Azure Account` and the `Web App` you can use [variable binding](/docs/projects/variables/variable-substitutions.md) to set their values.

If you choose to run this step on behalf of target roles (maybe you are deploying to multiple geographic regions), you will need to ensure a deployment target exists when deploying your Azure Web App. For this, we introduced [Cloud Regions](/docs/infrastructure/deployment-targets/cloud-regions.md). If you select a role and no deployment targets exist at the time of deploying, Octopus will log warnings in your deployment's task log.

![](deploying-an-azure-web-app.png "width=500")
