## Step 2: Create an Azure account {#DeployingapackagetoanAzureWebApp-Step2:CreateanAzureAccount}

If you haven't already, create an [Azure Account](/docs/infrastructure/accounts/azure/index.md) to grant Octopus Deploy access to your Azure Subscription.

If instead you want to **dynamically** create you account during your deployment, check our [documentation on how to do so](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md)

## Step 3: Configure your Azure web app step {#DeployingapackagetoanAzureWebApp-Step4:ConfigureyourAzureWebAppstep}

1. Add a new **Deploy an Azure Web App** step to your [project's deployment process](/docs/projects/steps/index.md).

![](5865899.png "width=170")

2. On the **Execution Location** section, select the Roles that match the *Azure Web App Targets* you want to deploy to. Remember that you can create these targets using any of the following approaches:

- Manually before running your deployment. [See documentation](/docs/infrastructure/deployment-targets/azure/web-app-targets/index.md).

- Dynamically during the deployment using scripts. [See documentation](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md)

3. On the **Package** section, select your **Package Feed** and **Package ID**.

![](deploying-an-azure-web-app.png "width=500")
