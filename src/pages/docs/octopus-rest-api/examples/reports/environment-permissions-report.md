---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Environment permissions report
description: An example script that will provide a report of which users have access to a specific permission for a specific environment.
---

The Octopus Web Portal provides the ability to see the permissions from a user's point of view.  This script demonstrates how to generate a report for a specific permission for specific environments.  For example, what users have permissions to deploy to **Production.**

This report will look for teams scoped to a role with a specific environment (Production) or no environments.  For example, you want to find out all the users who have permissions to deploy to **Production**.  If a user is on a team scoped to the role `Deployment Creator` with no environments that user will show up in the report with an environment scoping of **All** because they have permissions to deploy to **Production**.

![Sample environment permissions report](/docs/octopus-rest-api/examples/reports/images/environment-permissions-example.png)

**Please note:** The report is generated as a CSV file, formatting was added to the screenshot to make it easier to read.

## Usage

Provide values for the following:

- Octopus URL
- Octopus API Key
- Report Path
- Space Filter
- Environment Filter
- User Filter
- Permission Name

The filters allow you to choose which space(s), project(s), and user(s) to generate a report for.  They all have the same features.

- `all` will return the results for all spaces/environments.
- Wildcard or `*` will return all spaces/environments matching the wildcard search.
- Specific name will only show the exact matchin spaces/environments.

The filters support comma-separated entries.  Setting the Environment Filter to `Test,Prod*` will find all environments with the display name of `Test` or that start with `Prod`.

!include <environment-permissions-report>