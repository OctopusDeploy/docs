---
title: System and Space Permissions
description: An explanation of the two levels that permissions can apply at, the Space and the System.
---

Octopus Deploy supports partitioning your server up into [Spaces](../spaces) which enables teams to stay focused on only the projects and content that matter to those teams. As a result, permission scoping needs to respect boundaries that support both the administration of the whole server, as well as support the administration of an individual space.

This introduces some complexity that can be useful to understand when things don't work quite the way you expect. Reading this page should give you a general understanding of how permissions work in these two contexts. 

## Levels of permission
While designing this feature, we needed to reason about which API resources would need to be configured _outside_ of a space and which resources should _only_ be configured _within_ a space. 

That means that when considering permissions, we need to think in terms of the two administrative use cases of an Octopus Deploy instance - administering the system itself, and administering a space. Since these are very different things, permissions need to be considered as applying at these two 'levels': the **System** and **Space** levels.  

These levels are in fact attached to the nature of the API resources themselves, if a resource is considered 'space only' then permissions required to access that resource are considered to be space level permissions.

When you design or inspect your own custom **user roles**, we present this information to help you reason about the types of permissions you are granting that role, so that you are able to appropriately restrict access to the various resources that you care about.

### What is a 'System level' permission?
**System** level permissions are those that involve administering the entire system, but do not include permissions within an individual Space. An example of system level permissions are the **User** permissions, since users are not scoped to a space. 

### What is a 'Space level' permission?
**Space** level permissions are those that apply to resources within spaces, for example, **Projects** and **Environments**. 

As an example, a team of users with **ProjectView** permission in the **Finance Dept.** space can see projects in that space. In order to allow them to view projects in the **IT Dept.** space, they would need to be a member of a Team that had **ProjectView** permission in that space.  

### Can permissions apply at both levels?
Yes, in some special cases, permissions can apply at both levels. A good example here are **Teams**. In order to support the two administrative use cases mentioned earlier, it is conceivable that some teams would be required to operate across all spaces, whereas other teams would not.

As such, when creating a Team, the team can be marked as 'Accessible in all spaces' (i.e a System level team) or 'Accessible in **Finance Dept.** space only' where **Finance Dept.** is the name of the currently selected space (i.e. a Space level team). 

## What does this mean for configuring User Roles & Teams?
When we create or edit User Roles, we can choose a combination of system and space level permissions. Since not all scenarios are compatible when mixing system or space level concerns, some rules exist when applying user roles to team.
 
### Rules of the road {#SystemAndSpacePermissions-RulesOfTheRoad}
When you're including a user role in a team, that role will apply at either the space or system level. This is due to the roles constituent permissions needing to be applied at different levels.

#### Roles with system level permissions only
If the role only contains system level permissions, then the role will be automatically applied at the system level. In addition, roles of this nature can only be used for 'system only' teams. Applying a set of system permissions to a 'space team' is not permitted. 

#### Roles with a combination of system and space level permissions
However, a user role can be created with a combination of both system and space level permissions. When adding a role, if that role contains *any* space permissions, then the role will be applied at the space level. 

There are two potential outcomes for this space assignment:
1) If the team you are editing is a space team, then the role is assigned to the space that team belongs to
2) If the team is a system team, then the user is prompted to pick the space that is assigned to.

Any of the system level permissions from that role are then implicitly assigned at the system level. 

 
