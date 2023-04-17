---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Teams with mixed environment privileges
description: This guide describes how to create a teams for a user with mixed environment privileges.
navOrder: 10
---

A common scenario some users may face, is the desire to provide full access to one environment, but only read access to the next stage. For example, the developers might be able to fully manage deployments to the development and staging environments, but only view the production deployments.

## Creating teams for users with mixed environment privileges {#Creatingteamsforauserwithmixedenvironmentprivileges2019-1}

### Creating the developers team {#Creatingteamsforauserwithmixedenvironmentprivileges-Creatingthe&quot;Developers&quot;Team}

Start by clicking the **Teams** tab under **Configuration** in the Octopus Web Portal.  Then click **Add team**.

![](/docs/security/users-and-teams/images/add-team.png "width=500")

When you create the team, it is possible to change the visibility of the team to either:

 - Visible only within the space we are in.
 - Visible to all spaces.

For this example, we'll choose this team to only be visible in the space we are currently in.

![](/docs/security/users-and-teams/images/add-team-detail.png "width=500")
project viewer role for all environments
Give the team an appropriate name like *Developers* and click **Save**.

### Add the Project viewer role

We can now add the **Project viewer** role to all environments by clicking **Include user role** from the **User Roles** tab. This role provides read only access to deployment processes and releases. Because we will not provide any scoping for this role - this role will form the baseline permissions
for this team in any scope.

![](/docs/security/users-and-teams/images/add-unscoped-role.png "width=500")

### Adding additional roles for a subset of environments

Since our goal is to give members of the Developers team the ability to create and deploy releases _in the Development and Staging environments only_, we can click **Include user role** again, this time adding the **Project lead** role. This role provides all the permissions of the **Project viewer** role as well as allowing a team member to create and deploy releases. This time, we will click on **Define Scope** and choose the environments that we would like to scope the role to, before hitting the **Apply** button.

![](/docs/security/users-and-teams/images/define-scope-for-user-role.png "width=500")

We can repeat this process as many times as necessary to configure the team to your needs. The resulting team configuration screen should now display all of the different roles and their scopes so that you can review them.

![](/docs/security/users-and-teams/images/add-team-with-scoped-roles.png "width=500")

When you are happy with these changes hit **Save** to make them effective.

## Summary {#Creatingteamsforauserwithmixedenvironmentprivileges-Summary}

The permissions system in Octopus Deploy provides a very flexible way of defining broad access to system functionality, while still allowing it to be constrained to very specific environments or projects. In this guide we have seen how a developer can have their permissions configured so they can have full access to the first few stages of the deployment lifecycle, while restricting access to the business critical production areas.
