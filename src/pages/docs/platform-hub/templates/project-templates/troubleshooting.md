---
layout: src/layouts/Default.astro
pubDate: 2026-03-05
modDate: 2026-03-16
title: Troubleshooting
subtitle: Known issues and limitations for project templates
icon: fa-solid fa-layer-group
navTitle: Troubleshooting
navSection: Project Templates
description: Known issues and limitations for project templates
navOrder: 173
---

:::div{.warning}
Project templates are in Alpha. The feature is incomplete and standard SLAs do not apply. Don't use it for production workloads. It is available to Enterprise customers on Cloud. Self-hosted customers can access it as an early preview via Octopus 2026.2. We're actively developing this feature and would love your feedback.
:::

## Alpha limitations

Project templates are in Alpha. The following features are not yet supported and are planned for future releases:

- Channels
- Lifecycles
- Environments
- Ephemeral environments
- Cloud target discovery on steps. Use project variables in the project instead
- Cloning a project template through the Octopus UI
- Creating and managing project templates through the REST API, CLI, or Terraform provider
- Feeds
- Project settings
- Runbooks
- Triggers
- Import and export of templated projects
- Inline variable and parameter configuration within the deployment process editor

We'll update this page as the feature evolves.

## Step support

Project templates support most Octopus steps. The following step package framework steps are not supported:

- Deploy a Bicep Template
- AWS S3 Create Bucket
- AWS ECS

These steps are being migrated away from the step package framework and will be supported in the future.

## Cloning project templates

You can't clone a project template through the Octopus UI. To clone a template:

1. Copy the template's folder in the Platform Hub Git repository.
2. Rename the folder to the desired slug.
3. Update the template name inside `template.ocl`.
4. Commit and push the changes.
5. Refresh the project template list in the Octopus UI to find the newly created template.
6. Publish the template and configure the spaces that have access to it.

## Public API

The Alpha release doesn't support creating and managing project templates through the REST API. We're planning REST API support for a future release.

## Losing access to an Octopus Enterprise license

Project templates and all Platform Hub features require an Enterprise license. When you no longer have an Enterprise license, project templates behave differently.

### What will continue to work

- Existing deployments can be redeployed.
- Auto-scheduled deployments will continue to run.

### What will no longer work

- Users will lose access to Platform Hub, including the ability to create and manage project templates.
- You can no longer update or publish project templates.
