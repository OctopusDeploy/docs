---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Users, Roles, and Teams
description: Guidelines and recommendations for managing RBAC in Octopus Deploy.
navOrder: 80
hideInThisSection: true
---

A [user](/docs/security/users-and-teams/) is an entity that performs an action in Octopus Deploy.  [User roles](/docs/security/users-and-teams/user-roles) control what actions a user can perform.  Users and roles are assigned to [teams](/docs/security/users-and-teams/#Managingusersandteams-Creatingteams).  Teams are the core piece of the RBAC configuration in Octopus Deploy.  You control what specific users have permissions to perform specific actions on specific projects in specific environments by role assignment and scoping.

A user can be directly or indirectly associated with a team.  You can explicitly assign a user to a team.  Or you can assign teams from [external auth providers](/docs/security/authentication) to Octopus Deploy teams.

There are two kinds of users in Octopus Deploy:
- User Account: allowed to log in to both the Octopus Web Portal and Octopus API.  Can be authenticated with external auth providers, username and password, or an Octopus API Key.
- [Service Accounts](/docs/security/users-and-teams/service-accounts) are API-only accounts used for automated services that integrate with Octopus Deploy.  It can only be authenticated with an Octopus API Key.

## User Accounts

Our recommendation is each user has their own account in Octopus Deploy.  Every action a person performs is audited.  When sharing accounts, the audit log is unusable as it is impossible to know what action each person performed.

## Service Accounts

Our recommendation is only to use service accounts when external tools, such as build servers, JIRA, ServiceNow, etc., need to communicate with Octopus Deploy.  This is preferred over user accounts for a few reasons:

- If the person leaves and the account is deleted in Octopus, then all that integration fails.
- That person will show up in the audit log as the one who created the release, uploaded the package, or did the deployment.  This is very confusing and hard to trace as it was the build server or other integration that did the work.

We also recommend creating a unique service account per integration.  For example, if you had two build servers, such as GitHub Actions and TeamCity, then at the very least, you should have two service accounts.  You should also have individual service accounts per space per integration.  Going back to the GitHub Actions example, if you had GitHub Actions pushing to three spaces, then you should have three service accounts.  Limit the permissions of each service account. If the API key is ever compromised then that user is isolated to a single space for a set of projects.

## API Keys

[API Keys](/docs/octopus-rest-api/how-to-create-an-api-key/) allow you, or the service account, to access the [Octopus Deploy REST API](/docs/octopus-rest-api).  API keys for users should be kept to a minimum, if a key was ever shared, then anyone can impersonate that user.  Only use API keys for service accounts for any external integrations.  

**Octopus Deploy 2020.6** introduced the concept of expiring API keys.  Our recommendation is to set up a periodic rotation of API keys following your companies policy on key expiration.  

If your company doesn't already have a policy, then our recommendation is:
- 90 days for service accounts.  In other words, rotate the service account keys once a quarter.
- 10-30 days for users.  User account API keys should be used temporarily when writing an API script or testing an integration.  

## User Roles

Octopus Deploy also includes several built-in roles:
- Build Server: Can publish packages and create releases, deployments, runbook snapshots, and runbook runs.
- Certificate managers: can edit certificates and export private-keys
- Deployment creators: can create new deployments and runbook runs.
- Environment managers: can view and edit infrastructure, including environments, machines, workers, proxies, and accounts.
- Environment viewers: can view environments, machines, workers, proxies, and accounts but not edit them.
- Project contributor: All project viewer permissions, plus: editing and viewing variables, editing the deployment steps. Project contributors can't create or deploy releases.
- Project deployer: All project contributor permissions, plus: deploying releases but not creating them.
- Project lead: All project contributor permissions, plus: creating releases but not deploying them.
- Project viewers: have read-only access to a project. They can see a project in their dashboard, view releases and deployments, and tenants. Restrict this role by the project to limit it to a subset of projects, and restrict it by the environment to limit which environments they can view deployments to.
- Release creators: can create new releases and runbook snapshots.
- Runbook consumers: can view and execute runbooks.
- Runbook producers: can edit and execute runbooks.
- Space managers: can do everything within the context of the space they own.
- System administrators: can do everything at the system level.
- System managers: can do everything at the system level except certain system-level functions reserved for system administrators.
- Tenant managers: can edit tenants and their tags.

We recommend using the built-in roles as much as possible.  When we write migration scripts or upgrade scripts that add additional permissions, we will ensure we update those built-in roles.  Custom roles will be skipped, so we don't accidentally grant permissions.

## Teams

Octopus Deploy includes four built-in teams:
- Everyone
- Octopus Administrators
- Octopus Managers
- Space Managers

By default, no one has any permissions outside of members of Octopus Administrators, Octopus Managers, and Space Managers.  Every user is automatically a member of the everyone team.  Only assign roles to the `Everyone` team if you are sure you want every user to have that permission.

Teams can either be a system team, meaning it can be used across all spaces, or a space team, meaning a specific space can only access it.  We recommend creating space-specific teams whenever possible.  That will allow you to manage the membership and permissions on a smaller scale.  

## Common RBAC Scenarios

Here are some of the more common scenarios we get asked about, along with the associated user roles and scope.  For this example, our instance has four environments, **development**, **test**, **staging**, and **production**.  

- Developers have permissions to deploy to modify the deployment process and variables.  Can deploy to the **development** and **test** environments.
    - Add `Project Contributor` role to the Developers team, no scoping on environments or projects.
    - Add `Release Creator` role to the Developers team, no scoping on environments or projects.
    - Add `Environment Viewer` role to the Developers team, no scoping on environments or projects.
    - Add `Deployment Creator` role to the Developers team, scope to **development** and **test** environments.
- QA has permissions to deploy to **test** and **staging**, cannot modify anything in the project.
    - Add `Deployment Creator` role to the QA team, scope to **test**, and **staging**.
    - Add `Project Viewer` role to the QA team, no scoping on environment or projects.
- Operations has permissions to deploy to **staging** and **production**, cannot modify the deployment process.  They can add accounts, workers, and deployment targets.
    - Add `Deployment Creator` role to the Operations team, scope to **test**, and **staging**.
    - Add `Project Viewer` role to the Operations team, no scoping on environment or projects.
    - Add `Environment Manager` role to the Operations team, no scoping on environment or projects.
- Project Owners can only approve deployments; they cannot modify or deploy them.
    - Add `Project Viewer` role to the Project Owners team, no scoping on environment or projects.
    - Add `Environment Viewer` role to the Project Owners team, no scoping on environment or projects.

## Further reading

For further reading on users, roles, and teams in Octopus Deploy please see:

- [User](/docs/security/users-and-teams)
- [User roles](/docs/security/users-and-teams/user-roles)
- [Teams](/docs/security/users-and-teams/#Managingusersandteams-Creatingteams)
- [External Groups and Roles](/docs/security/users-and-teams/external-groups-and-roles)
- [Default Permissions for Built-in User Roles](/docs/security/users-and-teams/default-permissions)

<span><a class="btn btn-secondary" href="/docs/getting-started/best-practices/step-templates-and-script-modules">Previous</a></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a class="btn btn-success" href="/docs/getting-started/best-practices/deployment-and-runbook-processes">Next</a></span>
