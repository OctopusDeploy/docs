---
title: System and Space Permissions
description: An explanation of the two levels that permissions can apply at, the Space and the System.
version: 2019.1
---

Octopus Deploy supports partitioning your server up into [Spaces](/docs/administration/spaces/indexx.md) which enables teams to stay focused on only the projects and content that matter to those teams. As a result, permission scoping needs to respect boundaries that support both the administration of the whole server, as well as support the administration of an individual space.

This introduces some complexity that can be useful to understand when things don't work quite the way you expect. Reading this page should give you a general understanding of how permissions work in these two contexts.

## Levels of Permission

While designing this feature, we needed to reason about which API resources needed to be configured _outside_ of a space and which resources should _only_ be configured _within_ a space.

That means that when considering permissions, we need to think in terms of the two administrative use cases of an Octopus Deploy instance - administering the system itself, and administering a space. Since these are very different things, permissions need to be considered as applying at these two 'levels': the **System** and **Space** levels.  

These levels are in fact attached to the nature of the API resources themselves, if a resource is considered _space only_ then permissions required to access that resource are considered to be space level permissions.

When you design or inspect your own custom **user roles**, we present this information to help you reason about the types of permissions you are granting that role, so that you can appropriately restrict access to the various resources that you care about.

### What is a 'System Level' Permission?

**System** level permissions are those that involve administering the entire system, but do not include permissions within an individual space. An example of system level permissions are the **User** permissions, since users are not scoped to a space.

### What is a 'Space Level' Permission?

**Space** level permissions are those that apply to resources within spaces, for example, **Projects** and **Environments**.

As an example, a team of users with **ProjectView** permission in the **Finance Dept.** space can see projects in that space. In order to allow them to view projects in the **IT Dept.** space, they need to be a member of a Team that had **ProjectView** permission in that space.  

### Can Permissions Apply at Both Levels?

Yes, in some special cases, permissions can apply at both levels. A good example here is **Teams**. In order to support the two administrative use cases mentioned earlier, it is conceivable that some teams would be required to operate across all spaces, whereas other teams would not.

As such, when creating a team, the team can be marked as 'Accessible in all spaces' (i.e a system level team) or 'Accessible in **Finance Dept.** space only' where **Finance Dept.** is the name of the currently selected space (i.e. a space level team).

## What Does This Mean for Configuring User Roles and Teams?

When we create or edit user roles, we can choose a combination of system and space level permissions. Since not all scenarios are compatible when mixing system or space level concerns, some rules exist when applying user roles to teams.

### Rules of the Road {#SystemAndSpacePermissions-RulesOfTheRoad}

When you're including a user role in a team, that role will apply at either the space or system level. This is due to the roles constituent permissions needing to be applied at different levels.

#### Roles with System Level Permissions Only

If the role only contains system level permissions, then the role will be automatically applied at the system level. In addition, roles of this nature can only be used for _system only_ teams. Applying a set of system permissions to a _space team_ is not permitted.

#### Roles With a Combination of System and Space Level Permissions

However, a user role can be created with a combination of both system and space level permissions. When adding a role, if that role contains *any* space permissions, then the role will be applied at the space level.

There are two potential outcomes for this space assignment:

1. If the team you are editing is a space team, then the role is assigned to the space that team belongs to.
2. If the team is a system team, then the user is prompted to pick the space that it is assigned to.

Any of the system level permissions from that role are then implicitly assigned at the system level.
