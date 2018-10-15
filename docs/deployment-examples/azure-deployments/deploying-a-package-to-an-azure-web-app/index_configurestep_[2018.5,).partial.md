## Step 2: Create an Azure Account {#DeployingapackagetoanAzureWebApp-Step2:CreateanAzureAccount}

If you haven't already, create an [Azure Account](/docs/infrastructure/azure/index.md) to grant Octopus Deploy access to your Azure Subscription.

If instead you want to **dynamically** create you account during your deployment, check our [documentation on how to do so](/docs/infrastructure/dynamic-infrastructure/index.md)

## Step 3: Configure your Azure Web App Step. {#DeployingapackagetoanAzureWebApp-Step4:ConfigureyourAzureWebAppstep}

:::hint
The below instructions are valid Octopus Servers running version **Octopus 2018.5** and above. If you are running an older version, please select it from the **Version** green button at the top right of this page to enable the docs that suit your Octopus version.
:::

1. Add a new **Deploy an Azure Web App** step to your [project's deployment process](/docs/deployment-process/steps/index.md).

![](/docs/images/5671696/5865899.png "width=170")

2. On the **Execution Plan** section, select the Roles that match the *Azure Web App Targets* you want to deploy to. Remember that you can create these targets using any of the following approaches:

- Manually before running your deployment. [See documentation](/docs/infrastructure/azure/web-app-targets/index.md).

- Dynamically during the deployment using scripts. [See documentation](/docs/infrastructure/dynamic-infrastructure/index.md)

3. On the **Package** section, select your **Package Feed** and **Package Id**.

![](deploying-an-azure-web-app.png "width=500")
