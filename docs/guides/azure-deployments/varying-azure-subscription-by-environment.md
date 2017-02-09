---
title: Varying Azure Subscription by Environment
description: Information on how to use a different Azure subscription when deploying to different environments.
---

You may want to use a different Azure subscription depending on which environment you are targeting. This can be achieved by binding the account field to an Octopus variable:

1. Add an [Azure Subscription Account](/docs/key-concepts/environments/accounts/azure-subscription-account.md) to Octopus.

 1. If you want to use the Account ID in your variable, open the account you just added from **Environments &#10140; Accounts &#10140; [Account name]** and copy the account ID from the URL.
        ![](/docs/images/3049102/3278481.jpg "width=500")
        
        In the screenshot the account URL is **localhost/app#/accounts/azuresubscription-dalmiro-octopusdeploy-com** . The Account ID in this case would be **azuresubscription-dalmiro-octopusdeploy-com**
2. Create a variable in your project and set the Account ID or Account Name as its value. Make sure to scope this variable to the Environment/Role/Target where you'll be using it.
    ![](/docs/images/3049102/3278490.jpg "width=500")
3. If you are deploying an **Azure Web App**, create another variable that holds the name of your App. 
![](/docs/images/3049102/3278485.jpg "width=500")
    ![](/docs/images/3049102/3278486.jpg "width=500")

If you are deploying an **Azure Web Service,** create 2 more variables for the **Service** and **Storage Account** names
    ![](/docs/images/3049102/3278489.jpg "width=500")
    ![](/docs/images/3049102/3278494.jpg "width=500")
![](/docs/images/3049102/3278487.jpg "width=500")

4. If you are deploying an **Azure Web App** - On your [Azure Web App step](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/index.md) use the variables to set the **Account** and **WebApp**

    ![](/docs/images/3049102/3278496.jpg "width=500")
    
    If you are deploying an **Azure Cloud Service** - On your [Azure Cloud Service step](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-cloud-service/index.md) use the variables to set the **Account**, **Cloud Service** and **Storage Account**

![](/docs/images/3049102/3278497.jpg "width=500")

5. Once you start the deployment, Octopus will resolve the variables that hold the Account and WebApp/Cloud Service info based on their scope. To use a different account, repeat steps 1-3 and scope the new account variable accordingly.
