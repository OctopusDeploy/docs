---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Varying Azure subscription by environment
description: Information on how to use a different Azure subscription when deploying to different environments.
navOrder: 5
---

You may want to use a different Azure subscription depending on which environment you are targeting. This can be achieved by binding the account field to an Octopus variable:

1. Add an [Azure Subscription Account](/docs/infrastructure/accounts/azure) to Octopus.
   * If you want to use the Account ID in your variable, open the account you just added from **Infrastructure ➜ Accounts ➜ [Account name]** and copy the account ID from the URL.

   ![Account Id](/docs/deployments/azure/images/varying-account-id.png)
   ​    
   The Account ID is the value after the last `/` in the URL.

2. Create a variable in your project and set the Account ID or Account Name as its value. Make sure to scope this variable to the Environment/Role/Target where you'll be using it.

   ![variable](/docs/deployments/azure/images/varying-variable.png)

3. If you are deploying an **Azure Web App**, you will need to create an [Azure Web App Target](/docs/deployments/azure/deploying-a-package-to-an-azure-web-app) for each environment.

   If you are deploying an **Azure Cloud Service**, you will need to create an [Azure Cloud Service Target](/docs/infrastructure/deployment-targets/azure/cloud-service-targets) for each environment.

4. Once you start the deployment, Octopus will resolve the variables that hold the Account and WebApp/Cloud Service info based on their scope. To use a different account, repeat steps 1-3 and scope the new account variable accordingly.

## Learn more

- Generate an Octopus guide for [Azure and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Azure%20websites).
