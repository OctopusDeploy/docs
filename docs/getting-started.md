---
title: Getting Started
description: This section provides a conceptual overview of Octopus Deploy.
position: 0
---

This section provides an overview of Octopus Deploy concepts and links to the relevant documentation, which explore the concepts further and guide you through implementing them with your own self-hosted Octopus server or the hosted version Octopus Cloud.

## Consistent Deployments

As an Octopus user, you define the process for deploying your software. The deployment process consists of the steps Octopus will execute and the configuration variables that make it possible to use the same deployment process across the environments in your infrastructure.

Octopus includes more than 300 step templates, including community contributed step templates, that you can use to define your deployment process, you can even create your own custom steps templates. Each step contains specific actions that are executed as part of the deployment process each time your software is deployed.

After the initial setup, your deployment process shouldn't change between deployments even though the software being deployed will continue to change and evolve as part of the development process.

## Consistent Releases

Managing software releases in Octopus lets you define how your releases occur. You specify the environments the applications are deployed to and who on your team can deploy to which environments. For instance, you might want developers to deploy to dev environments but not testing or production, and members of QA to deploy to test environments, but not to production. Taking this approach means that even if different members of the team trigger deployments, the deployment process remains consistent.

Releases can be fully automated, or you can require approval from key personnel to verify the build before the deployment proceeds. You can easily see the progress of every release on the Octopus dashboard or configure automatic notifications through email or slack.

After releases have been created, they can be deployed as many times as you need.

## Consistent Operations Processes

With Octopus's operations runbooks you can automate routine maintenance and emergency operations tasks like infrastructure provisioning, database management, and website failover and restoration. Runbooks can be scheduled and parameterized with prompted variables.

Runbooks have the necessary permissions to run on the infrastructure they’ve been created for, which means everybody on the team can execute the runbook even if they don’t have permission for the infrastructure the runbook will be executed on.

Runbooks are managed and executed by Octopus, so this means there’s a complete audit trail that can be reviewed in retrospectives, making it easy to see what happened, when and why, and if anything needs to be changed.

## Octopus Deploy Server

You can install your own self-hosted instance of the Octopus Deploy server or use Octopus Cloud.

Installing the self-hosted [Octopus Deploy server](/docs/installation/index.md) sets up the [Octopus Web Portal](/docs/getting-started.md#the-octopus-web-portal) and the [Octopus REST API](/docs/octopus-rest-api/index.md).

The [installation documentation](/docs/installation/index.md) provides instructions for downloading, installing, and configuring your self-hosted Octopus Deploy server.

!include <octopus-cloud>

Learn more about [Octopus Cloud](/docs/octopus-cloud/index.md).

## The Octopus Web Portal

!include <octopus-web-portal>

## Infrastructure

Octopus Deploy organizes your deployment targets (the machines and services you deploy software to) into groups called environments. Typical environments are **development**, **test**, and **production**.

With Octopus Deploy your deployment targets can be Windows servers, Linux servers, Microsoft Azure, AWS, Kubernetes Clusters, Cloud Regions, or Offline Package Drops.

Organizing your infrastructure into environments lets you define your deployment processes (no matter how many steps, environments, or deployment targets are involved) and have Octopus deploy the right versions of your software, with the right configuration, to the right environments at the right time.

Learn more about managing your [infrastructure](/docs/infrastructure/index.md).

## Packaging Applications

Before you can deploy software with Octopus Deploy, you need to bundle all the files required for the software to run into a supported package. The package must be versioned and stored in a repository. We recommend configuring your existing tool chain to push packages automatically to the built-in repository or an external feed; however, you can push packages manually to the repository if you choose to.

Learn more about [packaging your applications](/docs/packaging-applications/index.md) or how to automate your existing tool chain to push packages to your Octopus Deploy server with our [REST API](/docs/octopus-rest-api/index.md).

## Integrations

Octopus Deploy integrates with your build server to take over where your continuous integration server ends. You can also keep an eye on your builds with our issue tracker integrations with Jira, GitHub, and Azure DevOps.

Learn more about [build server integration](/docs/packaging-applications/build-servers/index.md) and our [issue tracker integrations](/docs/release-management/issue-tracking/index.md).

## Spaces

If you're a large organization with lots of teams working in Octopus, you can use the [Spaces](/docs/administration/spaces/index.md) feature to provide each of your teams with a space for the projects, environments, and infrastructure they work with, while keeping other team's assets separate in their own space.

Learn more about [Spaces](/docs/administration/spaces/index.md).

## Learn More

Read more to learn about the following topics:

- [Installing the Octopus server](/docs/installation/index.md)
- [Octopus Cloud](/docs/octopus-cloud/index.md)
- [Packaging your applications](/docs/packaging-applications/index.md)
- [Defining your deployment process](/docs/deployment-process/index.md)
- [Operations runbooks](/docs/operations-runbooks/index.md)

Or create your own end-to-end CI/CD pipeline tutorial with our [interactive documentation](https://octopus.com/docs/guides).
