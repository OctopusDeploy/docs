---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: List users
description: An example script to list all users in an Octopus instance.
---

This script will list all active users in an Octopus instance. In addition, there are a number of optional items you can include:

- scoped user roles
- any associated [Active Directory](/docs/security/authentication/active-directory/index.md) details
- any associated [Azure Active Directory](/docs/security/authentication/azure-ad-authentication.md) details
- inactive users

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- (Optional) whether or not to include user role details
- (Optional) whether or not to include Active Directory details
- (Optional) whether or not to include Azure Active Directory details
- (Optional) whether or not to include disabled users
- (Optional) path to export the results to a csv file

## Script

!include <list-users-scripts>
