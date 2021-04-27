---
title: Users, Roles, and Teams
description: Guidelines and recommendations for managing RBAC in Octopus Deploy.
position: 80
hideInThisSection: true
---

A [users](/docs/security/users-and-teams/index.md) is an entity that performs an action in Octopus Deploy.  [User roles](/docs/security/users-and-teams/user-roles.md) control what actions a user can perform.  Users and roles are assigned to [teams](/docs/security/users-and-teams/index.md#Managingusersandteams-Creatingteams).  The team the core piece of the RBAC configuration in Octopus Deploy.  You control what specific users have permissions to perform specific actions on specific projects in specific environments by role assignment and scoping.

A user can be directly or indirectly associated with a team.  You can explicity assign a user to a team.  Or you can assign teams from [external auth providers](/docs/security/authentication/index.md) to Octopus Deploy teams.

There are two kinds of users in Octopus Deploy:
- User Account: allowed to login to both the Octopus Web Portal and Octopus API.  Can be authenticated with external auth providers, username and password, or an Octopus API Key.
- [Service Accounts](/docs/security/users-and-teams/service-accounts.md) are API only accounts used for automated services that integrate with Octopus Deploy.  Can only be authenticated with an Octopus API Key.

## User Accounts

Our recommendation is each user has their own account in Octopus Deploy.  Every action a person performs is audited.  When sharing accounts the audit log is unusable as it is impossible to know what action each person performed.

## Service Accounts

Our recommendation is to only use service accounts when external tools, such as build servers, JIRA, ServiceNow, etc., need to communicate with Octopus Deploy.  We also recommend creating a unique service account per integration.  For example, if you had two build servers, such as GitHub Actions and TeamCity, then at the very least you should have two service accounts.  You should also have unique service accounts per space per integration.  Going back to the GitHub Actions example, if you had GitHub Actions pushing to three spaces, then you should have a service account per space.  

## User Roles

Octopus Deploy also includes several built-in roles:
- Build Server: Can publish packages, and create releases, deployments, runbook snapshots and runbook runs.
- Certificate managers: can edit certificates and export private-keys
- Deployment creators: can create new deployments and runbook runs.
- Environment managers: can view and edit infrastructure, including environments, machines, workers, proxies and accounts.
- Environment viewers: can view environments, machines, workers, proxies and accounts, but not edit them.
- Project contributor: All project viewer permissions, plus: editing and viewing variables, editing the deployment steps. Project contributors can't create or deploy releases.
- Project deployer: All project contributor permissions, plus: deploying releases, but not creating them.
- Project lead: All project contributor permissions, plus: creating releases, but not deploying them.
- Project viewers: have read-only access to a project. They can see a project in their dashboard, view releases and deployments and tenants. Restrict this role by project to limit it to a subset of projects, and restrict it by environment to limit which environments they can view deployments to.
- Release creators: can create new releases and runbook snapshots.
- Runbook consumers: can view and execute runbooks.
- Runbook producers: can edit and execute runbooks.
- Space managers: can do everything within the context of the space they own.
- System administrators: can do everything at the system level.
- System managers: can do everything at the system level except certain system-level functions reserved for system administrators.
- Tenant managers: can edit tenants and their tags.

We recommend using the built-in roles as much as possible.  When we write migration scripts or upgrade scripts that add additional permissions we will ensure we update those built-in roles.  Custom roles will be skipped so we don't accidentially grant permissions.

## Teams

Octopus Deploy includes four built-in teams:
- Everyone
- Octopus Administrators
- Octopus Managers
- Space Managers

By default, no one has any permissions outside of members of Octopus Administrators, Octopus Managers, and Space Managers.  Every user is automatically a member of the everyone team.  Only assign roles to the everyone team if you are sure you want every user to have that permission.

Teams can either by a system team, meaning it can be used across all spaces, or a space team, meaning it can only be accessed by a specific space.  We recommend creating space specific teams whenever possible.  This will allow you to manage the membership and permissions at a smaller scale.  

## Common RBAC Scenarios

Here are some of the more common scenarios we get asked about along with the associated user roles and scoping.  For this example, our instance has four environments, **development**, **test**, **staging**, and **production**.  

- Developers have permissions to deploy to modify the deployment process and variables.  Can deploy to the **development** and **test** environments.
    - Add `Project Contributor` role to the Developers team, no scoping on environments or projects.
    - Add `Release Creator` role to the Developers team, no scoping on environments or projects.
    - Add `Environment Viewer` role to the Developers team, no scoping on environments or projects.
    - Add `Deployment Creator` role to the Developers team, scope to **development** and **test** environments.
- QA has permisions to deploy to **test** and **staging**, cannot modify anything in the project.
    - Add `Deployment Creator` role to the QA team, scope to **test** and **staging**.
    - Add `Project Viewer` role to the QA team, no scoping on environment or projects.
- Operations has permissions to deploy to **staging** and **production**, cannot modify the deployment process.  They can add accounts, workers, and deployment targets.
    - Add `Deployment Creator` role to the Operations team, scope to **test** and **staging**.
    - Add `Project Viewer` role to the Operations team, no scoping on environment or projects.
    - Add `Environment Manager` role to the Operations team, no scoping on environment or projects.
- Project Owners can only approve deployments, they cannot modify or deploy them.
    - Add `Project Viewer` role to the Project Owners team, no scoping on environment or projects.
    - Add `Environment Viewer` role to the Project Owners team, no scoping on environment or projects.

<span><a class="btn btn-outline-dark" href="/docs/getting-started/best-practices/step-templates-and-script-modules">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/best-practices/">Next</a></span>