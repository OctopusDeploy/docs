---
title: Azure AD authentication
position: 1
---

:::hint
Azure Active Directory (AAD) authentication is available in Octopus Deploy 3.5 and later
:::

To use Azure Active Directory (AAD) authentication with Octopus you will need to get a few pieces lined up just right:

1. Configure AAD to trust your Octopus Deploy instance (by setting it up as an App in AAD)
2. Optionally map AAD Users into Roles so you the users can be automatically connected to Octopus Teams.
3. Configure your Octopus Deploy instance to trust and use AAD as an Identity Provider.

## Configuring Azure Active Directory (AAD) {#AzureADauthentication-ConfiguringAzureActiveDirectory(AAD)}

The first steps are to configure your Azure Active Directory to trust your instance of Octopus Deploy by configuring an App in your AAD.

### Configure Octopus Deploy as an App in your AAD {#AzureADauthentication-ConfigureOctopusDeployasanAppinyourAAD}

:::hint
At the time of writing this documentation, the "new" Azure Portal's **Azure Active Directory** feature was in preview.  The following instructions are based on the "old" portal at [https://manage.windowsazure.com](https://manage.windowsazure.com).
:::

:::success
**Get the right permissions for your Azure Active Directory tenant before starting**
In order to configure the your instance of Octopus Deploy as an App, you will need administrator permissions to the desired Azure Active Directory tenant in your subscription.
:::

1. Navigate to Azure Active Directory, select the directory you want to use, and select the Applications tab.
   ![](/docs/images/5670656/5865860.png "width=500")
2. Click the **ADD** button and select **Add an application my organization is developing**.
   ![](/docs/images/5670656/5865861.png "width=500")
3. Choose **Web Application and/or Web API** for the **Type**, and enter a **Name** like Octopus Deploy. *This is the name that will appear at the top of the Azure authentication page when the users are entering their credentials.*
   ![](/docs/images/5670656/5865862.png "width=500")
4. Enter the public URL to your Octopus Server as both the Sign-On URL and AppId URL. *In this example we are configuring our own demo server, but you should use the public URL to your own Octopus Server.*
   ![](/docs/images/5670656/5865863.png "width=500")

#### Configuring trusted Reply URLs {#AzureADauthentication-ConfiguringtrustedReplyURLs}

During the authentication with Azure AD, the user will be directed to an Azure page to enter their credentials. As part of the authentication flow, Octopus passes a Reply URL to tell Azure where to POST the user's security token. This URL must be added to a trusted whitelist in the App configuration or the authentication flow will be terminated by Azure.

1. Find your App in AAD and go to the Configure tab.
   ![](/docs/images/5670656/5865865.png "width=500")
2. Scroll down to find the Reply URL section. Enter the public URL to your Octopus Server with `/api/users/authenticatedToken/AzureAD`.
   In our example this would be `https://demo.octopus.com/api/users/authenticatedToken/AzureAD`

:::hint
**Reply URLs are sensitive**
Please take care when adding this URL! They are **case-sensitive** and can be sensitive to trailing **slash** characters
:::

:::hint
**Not using SSL?**
The specification highly recommends using SSL to ensure the security and integrity of your tokens. You can use `http` if you do not have SSL enabled on the public interface of your Octopus Server. Please beware of the security implications in accepting a security token over an insecure channel.
:::

#### Mapping AAD Users into Octopus Teams (optional) {#AzureADauthentication-MappingRolesMappingAADUsersintoOctopusTeams(optional)}

If you want to manage user/team membership via AAD, you will need to configure Roles for your App.  To add a Role(s) you will need to edit the App's manifest.

- In the [modern portal](https://portal.azure.com) you can edit the manifest directly in the browser
- In the [old portal](https://manage.windowsazure.com) you will need to download and hand-edit the file:
  ![](/docs/images/5670656/5865864.png "width=500")

- Select **Manage Manifest** and download your App's manifest JSON file.
- Edit the downloaded file to add the required Role(s), see below for further details.
- Select **Manage Manifest** and upload the modified manifest.

The example below illustrates two roles, one for administrators and one for application testers.

:::success
Make sure you replace `NEWGUID` with a generated guid.
:::

```powershell
{
  "appId": "myAppGuid",
  "appRoles": [
	{
		"id": "NEWGUID",
		"allowedMemberTypes": ["User"],
		"description": "Octopus Administrators",
		"displayName": "Octopus Admins",
		"isEnabled": true,
		"origin": "Application",
		"value": "octopusAdmins"
	},
	{
		"id": "NEWGUID",
		"allowedMemberTypes": ["User"],
		"description": "Octopus Testers",
		"displayName": "Octopus Testers",
		"isEnabled": true,
		"origin": "Application",
		"value": "octopusTesters"
	}
  ]
}
```

:::hint
The **value** property is the most important one. This value becomes the external Role ID you will use later on when [adding this role to a Team](/docs/administration/managing-users-and-teams/index.md) in Octopus Deploy.
:::

:::success
**Want a more advanced manifest?**
For more advanced scenarios, please see the [Azure manifest file documentation](https://azure.microsoft.com/en-us/documentation/articles/active-directory-application-manifest/).
:::

#### Setting up users and groups in Azure AD {#AzureADauthentication-SettingupusersandgroupsinAzureAD}

Once the App Role(s) have been defined, users/groups from Azure AD may be mapped into these Roles.

:::hint
At the time of writing, the Azure Active Directory is in preview in the modern portal[ and mapping users has been problematic.](https://portal.azure.com) We currently recommend doing this in the old portal.
:::

1. In the old portal, go to the **Applications** tab, select the App and then select the **Users** tab.
   ![](/docs/images/5670656/5865867.png "width=500")
2. The users/groups from your Azure AD should be displayed, with the Assigned column indicating whether they are already mapped.
3. You can click the **Assign** or **Remove** buttons to manage which Users and Groups can access your instance of Octopus Deploy. You can also manage which Roles are assigned to each User and Group.

:::hint
If you only have one Role it will be automatically assigned. If you have **multiple** Roles a popup will appear when you click the **Assign** button so you can select the Role to assign.
:::

## Configuring Octopus Deploy Server {#AzureADauthentication-ConfiguringOctopusDeployServer}

:::hint
There is currently no UI for configuring Octopus to use Azure AD - it must be configured from the command line.
:::

### Get the Client ID and Issuer {#AzureADauthentication-GettheClientIDandIssuer}

There are two values you will need from the Azure AD configuration to complete the Octopus configuration: the **Client ID** and **Issuer**.

:::success
Your Client ID should be a GUID.

Your Issuer should be a URL like `https://login.microsoftonline.com/GUID` where the GUID is a special GUID identifying your Azure Active Directory tenant.
:::

#### Using the old Azure portal {#AzureADauthentication-UsingtheoldAzureportal}

1. Find the **Client ID** in your App's **Configure** tab and copy it as-is
   ![](/docs/images/5670656/5865868.png "width=500")
2. To get the **Issuer,** click on the View Endpoints button
   ![](/docs/images/5670656/5865870.png "width=500")
3. Copy the **OAuth 2.0 Authorization Endpoint** and delete the **`/oauth2/authorize`** section from the end of the URL
   ![](/docs/images/5670656/5865871.png)
   In our example the OAuth 2.0 Authorization Endpoint is
   **`https://login.microsoftonline.com/b91ebf6a-84be-4c6f-97f3-32a1d0a11c8a/oauth2/authorize`**
   So the Issuer should be
   **`https://login.microsoftonline.com/b91ebf6a-84be-4c6f-97f3-32a1d0a11c8a`**

#### Using the modern Azure portal {#AzureADauthentication-UsingthemodernAzureportal}

1. In the modern portal, the **Application ID** in your App's **Settings/Properties** is your**Client ID
   ![](/docs/images/5670656/5865869.png "width=500")**
2. To get the **Issuer**, go the **App Registrations > Endpoints** and copy the **OAuth 2.0 Authorization Endpoint**and delete the **`/oauth2/authorize`**section from the end of the URL
   ![](/docs/images/5670656/5865872.png "width=500")

In our example the **OAuth 2.0 Authorization Endpoint** is
**`https://login.microsoftonline.com/b91ebf6a-84be-4c6f-97f3-32a1d0a11c8a/oauth2/authorize`**
So the Issuer should be
**`https://login.microsoftonline.com/b91ebf6a-84be-4c6f-97f3-32a1d0a11c8a`**

### Setting the Client ID and Issuer into Octopus Deploy {#AzureADauthentication-SettingtheClientIDandIssuerintoOctopusDeploy}

Once you have those values, run the following from a command prompt in the folder where you installed Octopus Server:

```powershell
Octopus.Server.exe configure --azureADIsEnabled=true --azureADIssuer=Issuer --azureADClientId=ClientID

```

### Octopus user accounts are still required {#AzureADauthentication-Octopususeraccountsarestillrequired}

Even if you are using an external identity provider, Octopus still requires a [user account](/docs/administration/managing-users-and-teams/index.md) so you can assign those people to Octopus teams and subsequently grant permissions to Octopus resources. Octopus will automatically create a [user account](/docs/administration/managing-users-and-teams/index.md) based on the profile information returned in the security token, which includes an **Identifier**, **Name**, and **Email Address**.

:::hint
**How Octopus matches external identities to user accounts**
When the security token is returned from the external identity provider, Octopus looks for a user account with a **matching Identifier**. If there is no match, Octopus looks for a user account with a **matching Email Address**. If a user account is found, the External Identifier will be added to the user account for next time. If a user account is not found, Octopus will create one using the profile information in the security token.
:::

:::success
**Already have Octopus user accounts?**
If you already have Octopus user accounts and you want to enable external authentication, simply make sure the Email Address matches in both Octopus and the external identity provider. This means your existing users will be able to sign in using an external identity provider and still belong to the same teams in Octopus.
:::

## What next? {#AzureADauthentication-Whatnext?}

Now you're using an external identity provider it is easy to increase your security. You could consider configuring [Multi-Factor Authentication](https://docs.microsoft.com/en-us/azure/multi-factor-authentication/multi-factor-authentication) - after all Octopus Deploy has access to your production environments!

You should also consider disabling any authentication providers you aren't using, like Username and Password authentication which can now be disabled since Octopus Deploy 3.5.

## Troubleshooting {#AzureADauthentication-Troubleshooting}

We do our best to log warnings to your Octopus Server log whenever possible. If you are having difficulty configuring Octopus to authenticate with Azure Active Directory, be sure to check your [server logs](/docs/reference/log-files.md) for warnings.

### Double and Triple check your configuration {#AzureADauthentication-DoubleandTriplecheckyourconfiguration}

Unfortunately security-related configuration is sensitive to everything. Make sure:

- you don't have any typos or copy-paste errors
- remember things are case-sensitive
- remember to remove or add slash characters as we've instructed - they matter too!

### Check OpenID Connect metadata is working {#AzureADauthentication-CheckOpenIDConnectmetadataisworking}

You can see the OpenID Connect metadata by going to the Issuer address in your browser adding`/.well-known/openid-configuration` to the end. In our example this would have been something like `https://login.microsoftonline.com/b91ebf6a-84be-4c6f-97f3-32a1d0a11c8a/.well-known/openid-configuration`

### Inspect the contents of the security token {#AzureADauthentication-Inspectthecontentsofthesecuritytoken}

Sometimes the contents of the security token sent back by Azure AD aren't exactly the way Octopus expected, especially certain claims which may be missing or named differently. This will usually result in the Azure AD user incorrectly mapping to a different Octopus User than expected. The best way to diagnose this is to inspect the JSON Web Token (JWT) which is sent from Azure AD to Octopus via your browser. To inspect the contents of your security token:

1. Open the Developer Tools of your browser and enable Network logging making sure the network logging is preserved across requests.
2. In Chrome Dev Tools this is called "Preserve Log".
   ![](/docs/images/5670656/5866122.png)
3. Attempt to sign into Octopus using Azure AD and find the HTTP POST coming back to your Octopus instance from Azure AD on a route like `/api/users/authenticatedToken/azureAD`. You should see an `id_token` field in the HTTP POST body.
4. Grab the contents of the `id_token` field and paste that into [https://jwt.io/](https://jwt.io/) which will decode the token for you.
   ![](/docs/images/5670656/5866123.png "width=500")

5. Don't worry if jwt.io complains about the token signature, it doesn't support RS256 which is used by Azure AD.
6. Octopus uses most of the data to validate the token, but primarily uses the `sub`, `email` and `name` claims. If these claims are not present you will likely see unexpected behaviour.

### Get in touch with our support team {#AzureADauthentication-Getintouchwithoursupportteam}

If you aren't able to resolve the authentication problems yourself using these troubleshooting tips, please reach out to our [support team](https://octopus.com/support) with:

1. The contents of your OpenID Connect Metadata or the link to download it (see above) - this can be different for each Azure AD App.
2. A copy of the decoded payload for some security tokens (see above) - perhaps some are working as expected and others are not.
3. A screenshot of the Octopus User Accounts including their username, email address and name.
