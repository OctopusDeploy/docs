---
title: Varying Azure Subscription by Environment

---


You may want to use a different Azure subscription depending on which environment you are targeting. This can be achieved by binding the account field to an Octopus variable:

1. Add an [Azure Subscription Account](/docs/key-concepts/environments/accounts/azure-subscription-account.md) to Octopus.

 1. If you want to use the Account ID in your variable, open the account you just added from **Environments -> Accounts -> [Account name]** and copy the account ID from the URL.
        ![](/docs/images/3049102/3278481.jpg)
        In the screenshot the account URL is **localhost/app#/accounts/azuresubscription-dalmiro-octopusdeploy-com** . The Account ID in this case would be **azuresubscription-dalmiro-octopusdeploy-com**
2. Create a variable in your project and set the Account ID or Account Name as its value. Make sure to scope this variable to the Environment/Role/Target where you'll be using it.
    ![](/docs/images/3049102/3278490.jpg)
3. If you are deploying an **Azure Web App**, create another variable that holds the name of your App. 
![](/docs/images/3049102/3278485.jpg)
    ![](/docs/images/3049102/3278486.jpg)

If you are deploying an **Azure Web Service,** create 2 more variables for the **Service** and **Storage Account** names
    ![](/docs/images/3049102/3278489.jpg)
    ![](/docs/images/3049102/3278494.jpg)
![](/docs/images/3049102/3278487.jpg)
4. If you are deploying an **Azure Web App -**On you [Azure Web App step](http://docs.octopusdeploy.com/display/OD/Deploying+a+package+to+an+Azure+Web+App) use the variables to set the **Account** and **WebApp**
    **![](/docs/images/3049102/3278496.jpg)**If you are deploying an**Azure Cloud Service -** On your [Azure Cloud Service step](http://docs.octopusdeploy.com/display/OD/Deploying+a+package+to+an+Azure+Cloud+Service) use the variables to set the **Account**, **Cloud Service** and **Storage Account

![](/docs/images/3049102/3278497.jpg)**
5. Once you start the deployment, Octopus will resolve the variables that hold the Account and WebApp/Cloud Service info based on their scope. To use a different account, repeat steps 1-3 and scope the new account variable accordingly.
