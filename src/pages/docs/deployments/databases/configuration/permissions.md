---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Recommended database permissions
description: Permission recommendations for database deployments.
navOrder: 15
---

When you decided on the permissions required to automate your database deployments, you'll need to find the balance between functionality and security. Below are some considerations around permissions and a couple of recommendations.

## Application account permissions

Applications should run using a unique service account with the least amount of rights.  Each environment for each application should have a unique user account.  

Having separate service accounts for each environment can make automated database deployments very tricky, especially when the accounts require a username and password.  None of the user account should be stored in source control, instead, assign permissions to roles, and attach the correct service account for the environment to that role.

## Deployment permission considerations

The service account used to make schema changes requires elevated permissions.  Because of that, create a special user account to handle database deployments.  Do not use the same service account used by the application.  If an application's service account can modify the schema and it was ever compromised, it could do quite a bit of damage.

The level of elevated permissions is up to you.   More restrictions placed on the deployment service account means more manual steps.  Deployments will fail due to missing or restricted permissions.  Octopus will provide the error message to fix the issue, but it will need manual intervention to resolve the issue.  It is up to you to decide which is best.

## Recommendations

Following DevOps principles, everything that can be automated should be automated. That includes creating databases, user management, schema changes, and data changes. Octopus Deploy plus the third-party tool of your choice can handle that.  

The deployment service account being used for database deployments should have ownership of the database.  Not ownership of the server, just the database.  

That level of permission does open the door to concerns about giving the process too much power.  Please read this post: [how to add manual interventions and auto-approvals](https://octopus.com/blog/autoapprove-database-deployments) to your database deployment process.