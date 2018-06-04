---
title: Moving your Octopus Server to Another Active Directory Domain
description: the steps and considerations to move your Octopus Server from one Active Directory domain to another.
position: 5
---

This page describes the steps and considerations to move your Octopus Server from one Active Directory domain to another.  

## Steps

We assume your Octopus Server and users are currently in the same domain - `Domain A`.  It's also assumed that your users will remain in `Domain A`.

1.  Update your infrastructure to move the server from one domain (`Domain A`) to another (`Domain B`).
2.  Ensure that `Domain B` trusts `Domain A`.  This can be either one way trust where `Domain B` trusts `Domain A` or two-way trust where `Domain B` trusts `Domain A` and `Domain A` trusts `Domain B`.  This is largely a decision you and your infrastructure personnel need to decide.  
3.  Update your Octopus Server windows service account if desired.

If needed, you can update the account the Octopus Server windows service is running under.  If you select an account from `Domain B` then you need to ensure that there is a two-way trust relationship in place.  If you do change the account, then you need to ensure that your Octopus Sql Server database grants this user access to the database as a `db_owner`.

---

Assuming your users' email address, SAMAccountName or UPN do not change, then they should now be able to login normally.

## Notes:

* If you move your users to the new domain as well, this should still work assuming that the user's email address, SAM or UPN do not change.  If they do, then you'll need to update your instance to migrate your users/teams over.

* If you need to edit your groups, this can get complicated.  Read our page on [external groups and roles](docs/administration/managing-users-and-teams/external-groups-and-roles.md) for more information.
