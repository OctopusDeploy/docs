1. Add an [Azure Subscription Account](/docs/infrastructure/azure/index.md) to Octopus.
    * If you want to use the Account ID in your variable, open the account you just added from {{Environments,Accounts,[Account name]}} and copy the account ID from the URL.

    ![Account Id](../../images/3049102/3278481.jpg "width=500")
    ​    
    In the screenshot the account URL is **localhost/app#/accounts/azuresubscription-dalmiro-octopusdeploy-com** . The Account ID in this case would be **azuresubscription-dalmiro-octopusdeploy-com**
2. Create a variable in your project and set the Account ID or Account Name as its value. Make sure to scope this variable to the Environment/Role/Target where you'll be using it.

    ![variable](../../images/3049102/3278490.jpg "width=500")

3. If you are deploying an **Azure Web App**, create another variable that holds the name of your App.  

    ![Azure web app](../../images/3049102/3278485.jpg "width=500")

    ![Scoped variables](../../images/3049102/3278486.jpg "width=500")

    If you are deploying an **Azure Cloud Service,** create 2 more variables for the **Service** and **Storage Account** names

    ![Cloud service](../../images/3049102/3278489.jpg "width=500")

    ![Azure storage](../../images/3049102/3278494.jpg "width=500")

    ![](../../images/3049102/3278487.jpg "width=500")

4. If you are deploying an **Azure Web App** - On your [Azure Web App step](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/index.md) use the variables to set the **Account** and **WebApp**

    ![Web app bindings](../../images/3049102/3278496.jpg "width=500")

    If you are deploying an **Azure Cloud Service** - On your [Azure Cloud Service step](/docs/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-cloud-service/index.md) use the variables to set the **Account**, **Cloud Service** and **Storage Account**

    ![Cloud service bindings](../../images/3049102/3278497.jpg "width=500")

5. Once you start the deployment, Octopus will resolve the variables that hold the Account and WebApp/Cloud Service info based on their scope. To use a different account, repeat steps 1-3 and scope the new account variable accordingly.
