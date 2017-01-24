---
title: Multi-tenant roles and security
position: 8
---


Previous step: [Designing a multi-tenant upgrade process](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md)


This page describes several common approaches to structuring roles and teams to secure a multi-tenant Octopus instance. Using the permissions system in Octopus you can configure internal team members with different roles who interact with tenants in different ways. You can also configure Octopus to provide access for your external customers. This page explores several of those roles for both internal and external parties.

:::success
To get the most out of this guide you will need to understand how to [manage users and teams](/docs/administration/managing-users-and-teams/index.md) and how to [work with custom roles](/docs/administration/managing-users-and-teams/user-roles.md). Octopus provides an expressive permissions system and you can customize the security configuration to your particular scenario.
:::


On this page:


- Account Manager
- Infrastructure manager
- Self-service
- Next steps

## Account Manager {#Multi-tenantrolesandsecurity-AccountManager}


Toby is a member of the sales team and manages the relationships for several of your largest customers. In his role Toby:

- is the main point of contact for specific tenants
- manages the details/variables of specific tenants and keeps them up to date
- works with customers to deploy releases to their environments on their behalf


### Step 1: Configure the Tenant project deployer role {#Multi-tenantrolesandsecurity-Step1:ConfiguretheTenantprojectdeployerrole}


Firstly we will create a custom role with the permissions required to deploy releases into tenant environments.

:::hint
This role is loosely based on the built-in **Project deployer** role but removing the permissions to edit the project.
:::

:::success
It is usually a good idea to build smaller roles that can be composed together into a team to provide easier management of your team permissions. In this example we are creating a single role to grant all of the required permissions to keep the example simple. In this case you could create a **Tenant project viewer** role and a **Tenant project deployer** role and combine them together into a single team.
:::

1. In *Configuration > Teams > Roles* click **Add custom role** and call it **Tenant project deployer**
2. Set the description to **Tenant project deployers can deploy releases on behalf of tenants**
3. Choose the following permissions:
 1. AccountView
 2. ArtifactView
 3. DeploymentCreate
 4. DeploymentView
 5. EnvironmentView
 6. EventView
 7. FeedView
 8. InterruptionView
 9. InterruptionViewSubmitResponsible
 10. LibraryVariableSetView
 11. LifecycleView
 12. MachinePolicyView
 13. MachineView
 14. ProcessView
 15. ProjectGroupView
 16. ProjectView
 17. ReleaseView
 18. TaskCancel
 19. TaskCreate
 20. TaskView
 21. TaskViewLog
 22. TeamView
 23. TenantEdit
 24. TenantView
 25. VariableView
 26. VariableViewUnscoped


### Step 2: Configure the Account Managers team {#Multi-tenantrolesandsecurity-Step2:ConfiguretheAccountManagersteam}


Now we will create a team for all the Account Managers and add the role we created in the last step.

1. In *Configuration > Teams* click Add team and call it **Account Managers**
2. Click the **Add role** button and add the **Tenant project deployer role**
3. Click the **Add member** button and add any user accounts that will form part of this team



![](/docs/images/5669453/5865792.png "width=500")

### Step 3: Test! {#Multi-tenantrolesandsecurity-Step3:Test!}


Now it's time to test the results of our configuration.

1. Create a test user account and add them to your new **Account Managers** team.
2. Sign in as the test user and see the results.
3. Experiment with what you can and can't do.



You will probably notice you can see all tenants, projects and environments. We will experiment with reducing scope this in the next steps.

### Step 4: Reduce scope of the team {#Multi-tenantrolesandsecurity-Step4:Reducescopeoftheteam}


Quite often you will want to allocate certain tenants to a team, or restrict which projects/environments a team can access. Using the team you just created you can experiment with reducing scope. You can restrict the team to a specific list of tenants, projects and/or environments.


![](/docs/images/5669453/5865793.png "width=500")

## Infrastructure manager {#Multi-tenantrolesandsecurity-Infrastructuremanager}


Bob is a member of IT infrastructure team and he manages all the virtual servers in the cloud. His only interaction with tenants is to associate them with the appropriate [deployment targets](/docs/deployment-targets/index.md) and [environments](/docs/key-concepts/environments/index.md).  He should have read-only access to tenant details required, and have the ability to manage deployment targets and accounts. This time we will configure the team using a composition of built-in and custom roles.

### Step 1: Configure the Tenant viewer role {#Multi-tenantrolesandsecurity-Step1:ConfiguretheTenantviewerrole}


Similarly to the previous example we will create a custom role with minimum permissions, in this case for viewing tenant details. Later on we will create a team that combines multiple roles together to achieve the desired effect.

1. Create a role called **Tenant viewer** with the following permissions:
 1. TenantView


### Step 2: Configure the Tenant Environment Managers team {#Multi-tenantrolesandsecurity-Step2:ConfiguretheTenantEnvironmentManagersteam}


In this example we will create a new team and combine multiple roles together to achieve the desired result.

1. Create a new team called Tenant Environment Managers
2. Add the Tenant viewer and Environment manager roles to the team
![](/docs/images/5669453/5865794.png "width=500")
3. Add any specific tenant/environment scoping that makes sense
4. Add any specific members to the team that make sense


### Step 3: Test! {#Multi-tenantrolesandsecurity-Step3:Test!.1}


Similarly to the previous example assign a user account, sign in, and test out the resulting behaviour. You should notice you can configure new or existing deployment targets including tenant configuration as we described in [Designing a multi-tenant hosting model](/docs/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md).

### Step 4: Reduce scope of the team {#Multi-tenantrolesandsecurity-Step4:Reducescopeoftheteam.1}


You can also reduce the scope of this team to a certain set of tenants or environments as that makes sense for your scenario. For example, a team might be allocated to manage infrastructure for a particular group of tenants.

## Self-service {#Multi-tenantrolesandsecurity-Self-service}


You may want to provide your actual customers with their own user account in Octopus and the ability to see a personalized dashboard, and potentially perform their own upgrades. This is possible by using the techniques we've already used by scoping a team to a single tenant.

:::success
You may want to provide the capabilities of Octopus Deploy to your customers without them knowing it's Octopus under the covers. Octopus is built API-first, and you can use the [Octopus API](/docs/api-and-integration/octopus-rest-api.md) to build your own web user interface over the top of Octopus to provide all the capabilities of Octopus with your own user experience.
:::

### Step 1: Configure a team for the tenant {#Multi-tenantrolesandsecurity-Step1:Configureateamforthetenant}


Firstly we need to create a team with scope limited to the single tenant.

1. Create a new team called **Self-Service: <TenantName>** like**Self-Service: Beverley Sanchez** in our example.
2. Add any roles you desire, in our example we're providing the tenant with the **Tenant project deployer** role
3. Scope the team to a single tenant



![](/docs/images/5669453/5865795.png "width=500")

### Step 2: Test! {#Multi-tenantrolesandsecurity-Step2:Test!}


Just like the previous examples, create a user account and test Octopus behaves as you'd expect based on the permissions you've granted to the team. You may want to consider limiting scope to a subset of environments or projects depending on your scenario.

### Step 3: Configure user accounts for the tenant {#Multi-tenantrolesandsecurity-Step3:Configureuseraccountsforthetenant}


Now you can create standard Octopus [user accounts](/docs/administration/managing-users-and-teams/index.md) and add them as members of the tenant-specific team.

## Next steps {#Multi-tenantrolesandsecurity-Nextsteps}


It's important to note that these are example roles and they may not suit every company.  The good news is that they're a great starting point and can be customised to suit different scenarios.
