---
title: Permissions
description: Permission recommendations for database deployments.
position: 15
---

The level of permissions required to automate database deployments is tricky.  There is a fine line between functionality and security.  There is no single magic bullet.  It will be up to you and your security team to discuss.  With that said, below are some considerations around permissions and a couple of recommendations.

## Application Account Permissions

Applications should run under their own accounts with the least amount of rights.  Each environment for each application should have their own account.  

Having separate accounts for each environment can make automated database deployments very tricky.  Which account should be stored in source control?  All of them or none of them?  None of them.  Assign permissions to roles.  Attach the correct user for the environment to that role.

## Deployment Permission Considerations

The account used to make schema changes requires elevated permissions.  Because of that, create a special account to handle database deployments.  Do not use the same account used by an IIS Web Application.

The level of elevated permissions is up to you.   More restrictions placed on the deployment account means more manual steps.  Deployments will fail due to missing or restricted permissions.  Octopus will provide the error message to fix the issue.  It will need a manual intervention to resolve the issue.  It is up to you to decide which is best.

## Recommendations

Following DevOps principles, everything that can be automated should be automated. This includes creating databases, user management, schema changes and data changes. Octopus Deploy plus the third-party tool of your choice can handle that.  

The account being used for database deployments should have ownership of the database.  Not ownership of the server, just the database.  

This does open the door to concerns about giving the process too much power.  Please read [this article](https://octopus.com/blog/autoapprove-database-deployments) on how to add manual interventions and auto-approvals into your database deployment process.