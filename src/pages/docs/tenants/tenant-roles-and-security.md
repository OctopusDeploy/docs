---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-09-14
title: Tenant roles and security
icon: fa-solid fa-people-group
description: Common approaches to structuring roles and teams to secure a multi-tenant Octopus instance.
navOrder: 70
---

This page describes several conventional approaches to structuring roles and teams to secure a multi-tenant Octopus instance. Using the permissions system in Octopus, you can configure internal team members with different roles who interact with tenants in different ways. You can also configure Octopus to provide access for your external customers. This page explores several of those roles for both internal and external parties.

:::div{.success}
To get the most out of this guide you will need to understand how to [manage users and teams](/docs/security/users-and-teams/) and how to [work with custom roles](/docs/security/users-and-teams/user-roles). Octopus provides an expressive permissions system, and you can customize the security configuration to your particular scenario.
:::

## Account manager {#account-manager}

Toby is a member of the sales team for [Vet Clinic](https://samples.octopus.app/app#/Spaces-682/projects/vet-clinic/deployments) and manages the relationships for several of the largest customers. In his role Toby:

- Is the main point of contact for specific tenants.
- Manages the details/variables of particular tenants and keeps them up to date.
- Works with customers to deploy releases to their environments on their behalf.

Toby needs two built-in roles:

| Built-in role | What it gives Toby |
| --- | --- |
| [Deployment Creator](/docs/security/users-and-teams/default-permissions#DefaultPermissions-DeploymentCreator) | Deploy existing releases and run runbooks, and view the projects, releases, lifecycles and tasks involved. It cannot create releases or edit the deployment process. |
| [Tenant Manager](/docs/security/users-and-teams/default-permissions#DefaultPermissions-TenantManager) | View and edit tenant details, variables and tags. |

### Step 1: Configure the account managers team {#step-1-configure-account-managers-team}

1. In **Configuration ➜ Teams** click **Add team** and call it **Toby's clients**. Be sure to select "Accessible in the X space only" unless you have tenants spread over multiple [Spaces](/docs/administration/spaces) and then click **Save**.

    :::figure
    ![Creating a team called Toby's clients](/docs/img/tenants/images/add-account-manager-team.png)
    :::

2. Navigate to **User Roles** and click **Include user role**.

    :::figure
    ![The Include user role button on the team's User Roles tab](/docs/img/tenants/images/multi-tenant-include-user-role.png)
    :::

3. From the dropdown, select **Deployment Creator**. Before saving, click **Define scope** and select the tenants Toby is responsible for: Midland Veterinary and Valley Veterinary Clinic.

    :::figure
    ![Selecting a user role to include in the team](/docs/img/tenants/images/multi-tenant-select-user-role.png)
    :::

4. Repeat for the **Tenant Manager** role, scoped to the same tenants.

5. Navigate to **Members ➜ Add member** and add any user accounts that will form part of this team.

:::div{.warning}
**Scope each role as you include it.** Until a role is scoped, the team holds it over every tenant in the space, including the ability to edit tenant variables. Use **Define scope** on the **Include User Role** screen rather than adding the role and narrowing it afterwards.
:::

To change the scope of a role already on a team, click the overflow menu (`...`) next to it and select **Edit**.

:::figure
![Limiting the team's access to specific tenants](/docs/img/tenants/images/edit-tenant-team.png)
:::

Select the tenants and click **Apply**.

:::figure
![A user role scoped to the selected tenants](/docs/img/tenants/images/scope-tenant-user-role.png)
:::

:::div{.warning}
**Tenant Manager can create and delete tenants, not only edit them.** Scoping the role limits which tenants Toby can edit and delete, but `TenantCreate` cannot be scoped to tenants — anyone with Tenant Manager can create tenants in the space.

To let Toby edit tenants without creating or deleting them, create a custom role containing `TenantView` and `TenantEdit`, and include that in place of Tenant Manager.
:::

:::div{.hint}
Deployment Creator does not include the permissions to respond to a manual intervention or cancel a running task. If Toby needs those, create a custom role containing `InterruptionView`, `InterruptionViewSubmitResponsible` and `TaskCancel`, and scope it to the same tenants. Add `VariableView` if he also needs to see project variables on the deployment screen.
:::

## Infrastructure manager {#infrastructure-manager}

Bob is a member of the IT infrastructure team for [Car Rental](https://samples.octopus.app/app#/Spaces-682/projects/car-rental/deployments), and he manages all the virtual servers for the different regions in the cloud. His only interaction with tenants is to associate them with the appropriate [deployment targets](/docs/infrastructure/) and [environments](/docs/infrastructure/environments). He should have read-only access to the tenant details he needs, and the ability to manage deployment targets and accounts.

Bob needs two built-in roles:

| Built-in role | What it gives Bob |
| --- | --- |
| [Environment Manager](/docs/security/users-and-teams/default-permissions#DefaultPermissions-EnvironmentManager) | View and edit infrastructure: environments, machines, workers, proxies and accounts. |
| [Project Viewer](/docs/security/users-and-teams/default-permissions#DefaultPermissions-ProjectViewer) | Read-only access across projects, including viewing tenants. |

### Step 1: Configure the tenant environment managers team {#step-1-configure-environment-managers-team}

1. Create a new team called **Tenant Environment Managers**.
2. Include the **Environment Manager** and **Project Viewer** roles.
   :::figure
   ![A team with tenant and environment management roles](/docs/img/tenants/images/multi-tenant-environment-managers-team.png)
   :::
3. Add any specific tenant or environment scoping that makes sense.
4. Add any specific members.

:::div{.hint}
To give Bob visibility of tenants without the rest of the read-only project access, create a custom role containing `TenantView` and include it in place of Project Viewer.
:::

:::div{.warning}
**Scoping this team to tenants does not limit Bob's infrastructure access.** `EnvironmentCreate`, `EnvironmentEdit`, `EnvironmentDelete`, the `MachinePolicy` and `Proxy` permissions, and `TargetTagAdminister` cannot be scoped to tenants, because the resources they govern are not tenant-specific.

Tenant scoping limits which tenants Bob can see. It does not limit what he can change about the infrastructure those tenants deploy to.
:::

## Self-service {#self-service}

[OctoPetShop](https://samples.octopus.app/app#/Spaces-682/projects/octopetshop/deployments) has development teams that work concurrently.  These teams deploy to Development in upwards of ten times a day and need the autonomy to deploy themselves.

### Step 1: Configure a team for the tenant {#step-1-configure-self-service-team}

Firstly we need to create a team with a scope limited to the single tenant.

1. Create a new team called **Self-Service: <TenantName>** like **Self-Service: Avengers** in our example.
2. Add any roles you desire. In our example, we're providing the tenant with the **Deployment Creator** role, scoped to their tenant.
3. Scope the team to a single tenant:

:::figure
![A team scoped to a single tenant](/docs/img/tenants/images/multi-tenant-self-service-team.png)
:::
