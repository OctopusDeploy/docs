---
title: List users
description: An example script to list all users in an Octopus instance.
---

This script will list all active users in an Octopus instance. It will optionally include any associated [Active Directory](/docs/security/authentication/active-directory/index.md) and [Azure Active Directory](/docs/security/authentication/azure-ad-authentication.md) details. You can also include disabled users too.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- (Optional) whether or not to include Active Directory details
- (Optional) whether or not to include Azure Active Directory details
- (Optional) whether or not to include disabled users
- (Optional) path to export the results to a csv file

## Script

!include <list-users-scripts>
