---
title: Project permissions report
description: An example script that will provide a report which users have access to specific projects.
---

The current Octopus UI provides the ability to see the permissions from a user's point of view.  This script demonstrates how to generate a report of permissions from a project's point of view.

## Usage

Provide values for the following:

- Octopus URL
- Octopus API Key
- Report Path
- Space Filter
- Project Filter
- User Filter

The filters allow you to choose which space(s), project(s), and user(s) to generate a report for.  They all have the same features.

- `all` will return the results for all spaces/projects/users.
- Wildcard or `*` will return all spaces/projects/users matching the wildcard search.
- Specific name will only show the exact matchin spaces/projects/users.

The filters support comma-separated entries.  Setting the User Filter to `Test,Bob*` will find all users with the display name of Test or that start with Bob.

!include <project-permissions-report>