---
title: List users
description: An example script to list all users in an Octopus instance.
---

This script will list all active users in an Octopus instance. It will include any associated Active Directory and Azure Active Directory identity details. You can optionally include disabled users too.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- (Optional) whether or not to include disabled users
- (Optional) path to export the results to a csv file

## Script

!include <list-users-scripts>
