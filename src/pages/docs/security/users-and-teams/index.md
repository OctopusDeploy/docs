---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Users and teams
description: Octopus users can be organized into teams and given various permissions via roles based security.  Teams can be further restricted to specific projects, environments and more.
navOrder: 60
---

Octopus Deploy provides the most value when it is used by your whole team. Developers and testers might be allowed to deploy specific projects to pre-production environments, but not production environments. Stakeholders might be permitted to view certain projects, but not modify or deploy them. To support these scenarios, Octopus supports a permissions system based around the concept of **Teams**.

[Getting Started - Users, Roles & Teams](https://www.youtube.com/watch?v=f_JPU7sAE8M)

You can manage users and teams in the Octopus Web Portal:
- For users, navigate to **Configuration ➜ Users**.
- For teams, navigate to **Configuration ➜ Teams**.

:::figure
![](/docs/security/users-and-teams/images/teams.png)
:::

## User and service accounts {#Managingusersandteams-UserandServiceaccounts}

**User accounts** are allowed to use both the Octopus Web Portal and the Octopus API, and can authenticate with a username and password, [Active Directory credentials](/docs/security/authentication/active-directory/), or an [Octopus API key](/docs/octopus-rest-api/how-to-create-an-api-key).

[Service accounts](/docs/security/users-and-teams/service-accounts/) are **API-only accounts** that should be used for automated services that integrate with Octopus Deploy, and can only authenticate with an [Octopus API key](/docs/octopus-rest-api/how-to-create-an-api-key/). For more information refer to [Service accounts](/docs/security/users-and-teams/service-accounts).

:::div{.success}
You should create a different User account for each person that will use Octopus Deploy. You should create a different [Service account](/docs/security/users-and-teams/service-accounts) for each service that will integrate with Octopus Deploy.
:::

### User API Key Management

There are some things to be aware of when deleting or disabling an Octopus User:

- If a User account is deleted, any associated API keys will also be deleted and stop functioning.
- API keys cannot be transferred between Users, so if an in-use key has its associated User account deleted, that API key will no longer function, and a new API key from an active User would need to be created and used.
- Additionally, any scripts that reference a deleted API key need to be updated to a new API key.
- A disabled user's API keys will not function. Any attempt to use them will throw a `401 unauthorized error` and require the User to be re-enabled.

## Inviting users {#Managingusersandteams-Invitingusers}
:::div{.warning}
This feature is being deprecated for Cloud users. You can follow these instructions to invite users to your [Octopus Cloud instance](/docs/octopus-cloud).
:::
To streamline the process of adding multiple users you can use the **User invites** feature to generate one or more unique registration codes bound to one or more existing teams. These links can then be issued to users so that they can register their own details and be given automatic permissions for the team(s) the codes are bound to.

:::figure
![](/docs/security/users-and-teams/images/user-invites.png)
:::

:::div{.hint}
Prior to version 4.0 this feature was accessed via the **Invite users** button on the **Users** page
:::

In the example above, we are generating codes for the **Octopus Administrators** team, so anyone who uses one of the codes will automatically join that team when they have completed registration.

:::div{.warning}
Invite codes are only valid for 48-hours after being generated, so make sure you issue them quickly before the expire.
:::

## Creating teams {#Managingusersandteams-Creatingteams}

Creating teams lets you assign the same roles to groups of users. Users can be added to or removed from multiple teams, making it easier to manage permissions for specific users and teams. You can create new teams by using the **Add Team** button.

For example, we can create a team that gives Anne and Bob access to view projects and deploy them to pre-production environments by assigning the role **Project deployer** to the team.

We limit which projects and environments these permissions apply to by adding specific projects and environments to the team.

:::figure
![](/docs/security/users-and-teams/images/devdeployerteam.png)
:::

### Restricting project and project group access

When specifying both `Project Groups` and `Projects`  filters please be aware that both these filters complement each other. To better illustrate these filters in action let's consider the following project structure:

| Project Groups | Projects                     |
| -------------- | ---------------------------- |
| GroupA         | Project1, Project2, Project3 |
| GroupB         | Project4, Project5           |

The following table illustrates the combination of possible permissions when specifying both `Project Groups` and `Projects` filters:

| `Project Groups` | `Projects` | Result                                   |
| ---------------- | ---------- | ---------------------------------------- |
| `Empty`          | `Empty`    | Project1, Project2, Project3, Project4 and Project5 |
| `Empty`          | Project1   | Project1                                 |
| GroupB           | `Empty`    | Project4 and Project5                    |
| GroupA           | Project5   | Project1, Project2, Project3 and Project5 |
| GroupB           | Project4   | Project4 and Project5                    |

## Roles {#Managingusersandteams-Roles}

Team members can be assigned the following roles:

- **Project viewer**:
  Project viewers have read-only access to a project. They can see the project in their dashboard, view releases and deployments.
- **Project contributor**:
  Project viewer, plus: editing and viewing variables and deployment steps.
- **Project lead**: 
  Project contributor, plus: create releases (but not deploy them).
- **Project deployer**:
  Project contributor, plus: deploying releases (but not creating releases).
- **Environment viewer**:
  View environments and their machines, but not edit them.
- **Environment manager**:
  View and edit environments and their machines.

Note that project leads can create releases but not deploy them, while project deployers can deploy releases but not create them - this allows you assign these permissions independently. If you need members to be able to both create and deploy releases, you can add both roles.

The roles assigned by a team can be scoped by project or environment.

:::div{.hint}
You can learn more about User Roles in our [documentation](/docs/security/users-and-teams/user-roles).
:::

## System teams {#Managingusersandteams-Systemteams}

Octopus Deploy comes with several built-in teams.

The **Everyone** team always contains all users, but you can assign different roles to members of this Team (for example, you might allow everyone to view all projects and environments, but not edit anything). Out of the box, **Everyone** members can do nothing.

The second team is **Octopus Administrators.** Members of this team have permission to configure system level concerns of Octopus. You can add or remove members from this team. We recommend only adding a few key users to this team.

The third team is **Octopus Managers.** That can manage a smaller subset of system-level functions reserved. You can also add or remove members from this team. We recommend adding users to this team who should be able to manage teams and other top-level things in Octopus, but not be able to change how Octopus is hosted.

The fourth team is **Space Managers** Members of this team can do everything in a given space. Out of the box the initial user added to  **Octopus Administrators** is also added as a **Space Manager**. If you do not need granular access for what users need to do with Octopus relating to Projects, Tenants, Environments you can add them as **Space Managers**.
