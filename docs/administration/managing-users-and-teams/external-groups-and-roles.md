---
title: External Groups and Roles
position: 3
---


Some of the authentication providers allow external groups or roles to be added as Members of Teams in Octopus.  This section outlines how to add external groups/roles to Teams.





Depending on which authentication providers you have enabled, the following buttons may appear on the Team page.


![](/docs/images/5672303/5866190.png "width=694")

## Add Active Directory group {#ExternalGroupsandRoles-AddActiveDirectorygroup}


This button appears if you have the Active Directory authentication provider enabled, and when activated you will see the following dialog


![](/docs/images/5672303/5866191.png)


The search on this dialog will locate any groups in the domain that start with the text you provide.

### Trusted Domains {#ExternalGroupsandRoles-TrustedDomainsTrustedDomains}


If your environment has trusted domains, you can search for groups in the trusted domain by prefixing the search text with "**domain\**" (where domain is the name of the Trusted Domain).

## Add External Role {#ExternalGroupsandRoles-AddExternalRole}


This button appears if you have an external authentication provider enabled (e.g. Azure AD), and when activated you will see the following dialog


![](/docs/images/5672303/5866192.png)


The Role Id corresponds to the role id from the external provider (learn more about [roles for Azure AD](/docs/administration/authentication-providers/azure-ad-authentication.md)), Display Name is purely for display in the Team page.
