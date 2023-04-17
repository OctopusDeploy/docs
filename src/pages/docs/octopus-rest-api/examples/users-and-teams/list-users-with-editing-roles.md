---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: List users with editing roles
description: An example script to list all users that have any user roles (permissions) containing the words Edit, Create or Delete.
---

This script will list all users in an Octopus instance that have user roles (permissions) containing the words Edit, Create or Delete.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- (Optional) path to export the results to a csv file

## Script

!include <list-users-with-editing-roles-scripts>
