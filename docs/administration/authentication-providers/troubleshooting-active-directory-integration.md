---
title: Troubleshooting Active Directory integration
position: 3
---


It's very common for companies to integrate Octopus with Active Directory to manage their users and teams.  Active Directory is very flexible and can have fairly complex configurations so we've put together this troubleshooting guide to help people troubleshoot and resolve authentication issues.

:::hint
This information is provided as a guide to help teams troubleshoot Octopus authentication issues with Active Directory. This combined with a strong working knowledge of your own infrastructure and some perseverance should help resolve most issues.
:::


- Configuring Active Directory users
- Verifying configuration values
- Logging
- Read-Only Domain Controllers are not supported
- Run as a different user not working


Octopus integrates with Active Directory to authenticate users as well as authorize what actions they can perform.  Our [Active Directory authentication](/docs/administration/authentication-providers/active-directory-authentication.md) page provides more information on how to set up Octopus to work with Active Directory as well as some details on how it's technically implemented.  Essentially, Octopus interacts with active directory in two ways:

1. First, we authenticate a users's credentials are valid by invoking the Windows API `LogonUser()` function.
2. If that is successful, Octopus will then query Active Directory for information about the user.  In this second interaction, we retrieve the groups a user is a member of and use that to determine what teams they belong to etc.


:::hint
**Teams are not Distribution Groups**
Whilst you might have a team that you would think maps to a Distribution Group, this does not mean that [subscriptions](/docs/administration/subscriptions.md) will send emails to the DG email address configured in Active Directory. Teams in Octopus are more synonymous with Security Groups and are used to determine accessibility. To send subscription emails to a Distribution Group email address will require setting up a user with that email address, and assigning them to the appropriate Octopus team.
:::

## Configuring Active Directory users {#TroubleshootingActiveDirectoryintegration-ConfiguringActiveDirectoryusers}


Octopus relies on Active Directory users being configured with enough information to distinguish them. We recommend making sure each Active Directory user you want to use with Octopus has been configured with:

1. samAccountName (pre-Windows 2000 Logon Name)
2. UPN (User Principal Name)
3. Email Address



![](/docs/images/5669864/5866202.png?effects=drop-shadow "width=500")


![](/docs/images/5669864/5866203.png?effects=drop-shadow "width=500")


These values can be used by Octopus to uniquely identify which Octopus User Account should be associated with each Active Directory User.

## Verifying configuration values {#TroubleshootingActiveDirectoryintegration-Verifyingconfigurationvalues}


Most errors we've seen are due to a lack of permissions or various active directory configuration issues.  Additionally, the errors are generally found when trying to retrieve a user's groups.  The following are some examples.

- `System.Runtime.InteropServices.COMException (0x8007054B): The specified domain either does not exist or could not be contacted.`
- `System.DirectoryServices.ActiveDirectory.ActiveDirectoryServerDownException: The server is not operational.`



The best way we've found to troubleshoot Active Directory issues is by running the PowerShell script below.  This script duplicates the exact logic we use to retrieve groups from Active Directory.  The benefit of this script is that you can try different settings and get immediate feedback whereas it's much slower and disruptive to do the same with the Octopus Server service.

```powershell
[System.Reflection.Assembly]::LoadWithPartialName("System.DirectoryServices.AccountManagement")
[System.Reflection.Assembly]::LoadWithPartialName("System.DirectoryServices")
[System.Reflection.Assembly]::LoadWithPartialName("System.DirectoryServices.ActiveDirectory")
$principalContext = new-object -TypeName System.DirectoryServices.AccountManagement.PrincipalContext "Domain", "acme.local", "CN=Users, DC=acme, DC=local"
$principal = [System.DirectoryServices.AccountManagement.UserPrincipal]::FindByIdentity($principalContext, "ExampleUser")
# Get Authorized Users Groups. This reads inherited groups but fails in some situations based on security and configuration
$groups = $principal.GetAuthorizationGroups()
Write-Output $groups
# Try Number two. Reads just the groups they are a member of - more reliable but not ideal
$groups = $principal.GetGroups()
Write-Output $groups
$principalContext.Dispose()
```


Notes:

- Ensure you replace the domain name ``acme.local`` with the appropriate value for you network.
- Ensure you replace the active directory container string ``CN=Users, DC=acme, DC=local`` with the appropriate value for your network. If you're not sure of this value, we'd suggest talking to your network team (active directory expert) or trying different values and testing it w/ the script. For additional help on building/finding your container string, this StackOverflow answer is excellent. [http://serverfault.com/a/130556](http://serverfault.com/a/130556)
- Ensure you replace the domain user name ``ExampleUser`` with a sample octopus username who would normally log into the system.
- It's recommended that you run this script as the same user you're running the Octopus service under and on the same server so it reproduces the problem accurately.


## Logging {#TroubleshootingActiveDirectoryintegration-Logging}


If problems persist, we suggest turning on active directory diagnostic logging and then executing the PowerShell script above to test changes based on the results.  We've found the best way to get actionable details out of the logs is to set the following registry settings on the the server running active directory directory services (i.e. you relevant domain controller).

:::problem
It's recommended that you backup any registry entries before making changes.
:::

```text
Path: HKLM\SYSTEM\CurrentControlSet\Services\NTDS\Diagnostics\15 Field Engineering
Type: DWORD
Value: 5

Path: HKLM\SYSTEM\CurrentControlSet\Services\NTDS\Parameters\Expensive Search Results Threshold
Type: DWORD
Value: 1
```


Full credit to this StackOverflow answer for the tip.  [http://serverfault.com/a/454362](http://serverfault.com/a/454362)


For more information on diagnostic logging, see the following Microsoft TechNet article.  Note that we're setting the 'Field Engineering' registry entry mentioned in this article. [https://technet.microsoft.com/en-us/library/cc961809.aspx](https://technet.microsoft.com/en-us/library/cc961809.aspx)


The diagnostic logs can be viewed in the Event Viewer.


![](/docs/images/5669864/5865632.png "width=500")

:::hint
Remember to reset the registry values once you're finished troubleshooting.
:::

## Read-Only Domain Controllers are not supported {#TroubleshootingActiveDirectoryintegration-Read-OnlyDomainControllersarenotsupported}


Read-only Domain Controllers are not currently supported by Octopus. The .NET API we're using ignores read-only DCs.


If there are any development teams willing to investigate RODCs further, our [AD/Directory Services authentication provider](https://github.com/OctopusDeploy/DirectoryServicesAuthenticationProvider) is open source (if you are using Octopus 3.5+), so please feel free to checkout the current implementation if you wish to "roll your own" AD provider that includes support for RODCs and share with the Octopus community ![(smile)](images/icons/emoticons/smile.png).

## Run as a different user not working {#TroubleshootingActiveDirectoryintegration-Runasadifferentusernotworking}


If you are signed into your Windows AD account and wish to sign in as a different AD user to Octopus, you need to do so via forms-based authentication and login with a fully qualified domain username (*eg. domain\user*). You **cannot** right-click and launch your browser as a different AD user.


If forms-based authentication has previously been disabled, you may re-enable it again by running the following command:

```powershell
Octopus.Server.exe service --stop
Octopus.Server.exe configure --allowFormsAuthenticationForDomainUsers=true
Octopus.Server.exe service --start
```
