---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: User roles
description: User roles are a critical part of the Octopus security model whereby they are assigned to Teams and they dictate what the members of those teams can do in Octopus.
---

User roles and group permissions play a major part in the Octopus security model. These roles are assigned to Teams and they dictate what the members of those teams can do in Octopus.

## Built-in user roles {#UserRoles-Built-inUserRoles}

Octopus comes with a set of built-in user roles that are designed to work for most common scenarios:

| User role            | Description                              |
| -------------------- | ---------------------------------------- |
| Build Server         | Build servers can publish packages, and create releases, deployments, runbook snapshots and runbook runs. |
| Certificate Manager  | Certificate managers can edit certificates and export private-keys |
| Deployment Creator   | Deployment creators can create new deployments and runbook runs. |
| Environment Manager  | Environment managers can view and edit environments and their machines. |
| Environment Viewer   | Environment viewers can view environments and their machines, but not edit them. |
| Package Publisher    | Permits packages to be pushed to the Octopus Server's built-in NuGet feed. |
| Project Viewer       | Project viewers have read-only access to a project. They can see a project in their dashboard, view releases and deployments. Restrict this role by project to limit it to a subset of projects, and restrict it by environment to limit which environments they can view deployments to. |
| Project Contributor  | All project viewer permissions, plus: editing and viewing variables, editing the deployment steps. Project contributors can't create or deploy releases. |
| Project Initiator    | All project viewer permissions, plus: create new projects. |
| Project Deployer     | All project contributor permissions, plus: deploying releases, but not creating them. |
| Project Lead         | All project contributor permissions, plus: creating releases, but not deploying them. |
| Release Creator      | Release creators can create new releases and runbook snapshots. |
| Runbook Consumer     | Runbook consumers can view and execute runbooks. |
| Runbook Producer     | Runbook producers can edit and execute runbooks. |
| System Administrator | System administrators can do everything at the system level.  |
| System Manager       | System managers can do everything at the system level except certain system-level functions reserved for system administrators. |
| Tenant Manager       | Tenant managers can edit tenants and their tags |

The built-in user roles can be modified to contain more or less roles to suit specific needs. But instead of modifying the built-in ones, we recommend that you leave them as an example and instead create your own user roles.

:::success
To view the default permissions for each of the built-in user roles, please see [default permissions](/docs/security/users-and-teams/default-permissions).
:::

### Additional user roles for spaces


| User Role            | Description                              |
| -------------------- | ---------------------------------------- |
| Space Manager        | Space managers can do everything within the context of the space they own. |

:::success
For more information regarding the _system or space level_, please see [system and space permissions](/docs/security/users-and-teams/system-and-space-permissions).
:::

## Creating user roles {#UserRoles-CreatingUserRoles}

A custom User Role can be created with any combination of permissions. To create a custom user role:

1. Under the **Configuration** page, click **Roles**.

   ![](/docs/security/users-and-teams/images/roles-link.png "width=500")

2. Click **Add custom role**.

3. Select the set of permissions you'd like this new User Role to contain, and give the role a name and description. These can be system or space level permissions.

   ![](/docs/security/users-and-teams/images/select-permissions.png "width=500")

Once the custom role is saved, the new role will be available to be assigned to teams in Octopus. [Some rules apply](/docs/security/users-and-teams/system-and-space-permissions/#SystemAndSpacePermissions-RulesOfTheRoad), depending on the mix of system or space level permissions you chose.

When applying roles to a team, you can optionally specify a scope for each role applied. This enables some complex scenarios, like granting a team [different levels of access](/docs/security/users-and-teams/creating-teams-for-a-user-with-mixed-environment-privileges) based on the environment they are authorized for.

![](/docs/security/users-and-teams/images/define-scope-for-user-role.png "width=500")

## Troubleshooting permissions {#UserRoles-TroubleshootingPermissions}

If for some reason a user has more/fewer permissions than they should, you can use the **Test Permissions** feature to get an easy to read list of all the permissions that a specific user has on the Octopus instance.

To test the permissions go to **{{Configuration,Test Permissions}}** and select a user from the drop-down.

The results will show:

- The teams of which the user is a member of. There are two separate Permission context that you can check.
   - **Show System permissions** will show [System level permissions](/docs/security/users-and-teams/system-and-space-permissions)
   - **Show permissions within a specific space** will show [Space specific Permissions](/docs/security/users-and-teams/system-and-space-permissions).
- A chart detailing each role and on which Environment/Project this permission can be executed. The chart can be exported to a CSV file by clicking the Export button. Once the file is downloaded it can viewed in browser using [Online CSV Editor and Viewer](http://www.convertcsv.com/csv-viewer-editor.htm).

![](/docs/security/users-and-teams/images/systempermissions.png "width=500")

![](/docs/security/users-and-teams/images/spacelevelpermissions.png "width=500")

If a user tries to perform an action without having enough permissions to do it, an error message will pop up showing which permissions the user is lacking, and which teams actually have these permissions.

![](/docs/security/users-and-teams/images/errors.png "width=500")

:::warning
As further versions of Octopus are released, we might create new roles to improve our security model. These new roles will not be automatically included in any of the built-in user roles, to avoid giving users permissions they are not supposed to have. These new roles will have to be added manually to a User Role by an administrator.
:::
