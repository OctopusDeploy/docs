---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Project Release Deployment Targets Report
description: An example script that will provide a list of all the deployments and deployment targets deployed to.
---

The Octopus Web Portal allows you to see what deployments have gone out to a specific deployment target, but it doesn't provide you with a list of deployment targets for each deployment.  This script demonstrates how to generate a report of the deployment targets for a specific release version for a project.

![Sample project release deployment target report](/docs/octopus-rest-api/examples/reports/images/project-release-deployment-target-report.png)

**Please note:** The report is generated as a CSV file, formatting was added to the screenshot to make it easier to read.

## Usage

Provide values for the following:

- Octopus URL
- Octopus API Key
- Report Path
- Space Name
- Project Name
- Release Version

!include <project-deployment-targets-report>