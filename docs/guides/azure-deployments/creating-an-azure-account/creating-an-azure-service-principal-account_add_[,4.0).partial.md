
Navigate to {{Environments,Accounts}} and click *Add account* in the *Azure Subscriptions* section.

![](/docs/images/3702850/3964965.png "width=500")

On the Create New Account page, in the *Authentication Method* field select *Use a Service Principal*.

![](/docs/images/3702850/3964966.png "width=500")

The values for the following fields come from Azure:

**Subscription ID**:  The ID of the Azure Subscription this account will interact with.

**Client ID**:  This is the ID of the application in Azure Active Directory.  It is known as ApplicationID in the PowerShell API, but Client ID in the Azure Portal.

**Tenant ID**: The ID of the Active Directory tenant.  The *Creating a Service Principal via PowerShell* section above shows how the Tenant ID can be obtained.

Use the *Save and test* button to confirm the account can interact with Azure.

:::hint
**What is actually tested?**
When you click the Save and Test button, Octopus will attempt to use the account credentials to access the Azure Resource Management (ARM) API and list the Resource Groups in that subscription. You may need to whitelist the appropriate IP Addresses for the Azure Data Center you are targeting. See [deploying to Azure via a Firewall](/docs/deploying-applications/deploying-to-azure/index.md) for more details.
:::
