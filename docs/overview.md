---
title: Overview
description: This section provides a conceptual overview of Octopus Deploy.
position: 0
---

Welcome!

This section provides a conceptual overview of Octopus Deploy.

As an Octopus user, you define the process for deploying your software. You specify the environments where you will deploy your software, and you specify which teams can deploy to those environments. For instance, you might want developers to deploy to the Development environment, but not the Test or Production environments, you might want the QA team to deploy to the Test environment, but not the Development or Production environments. Taking this approach means that even if different members of the team trigger deployments, the deployment process remains consistent and predictable.

When a release of your software is created in Octopus, you can deploy it as many times as needed.

## The Octopus Deploy Server

The Octopus Deploy server includes the [Octopus Web Portal](/docs/getting-started/index.md#the-octopus-web-portal) and the [Octopus REST API](/docs/octopus-rest-api/index.md).



<p>
    You can install your own <a href="/docs/installation/">self-hosted</a> instance of the Octopus Deploy Server:<br>
    <a href="/downloads/server" class="btn btn-lg btn-primary" style="height: 46px;">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxOTIgMTkyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE5MnYtMTkyaDE5MnYxOTJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTk2LDE2Yy00LjQxODI4LDAgLTgsMy41ODE3MiAtOCw4YzAsNC40MTgyOCAzLjU4MTcyLDggOCw4YzQuNDE4MjgsMCA4LC0zLjU4MTcyIDgsLThjMCwtNC40MTgyOCAtMy41ODE3MiwtOCAtOCwtOHpNOTUuODc1LDQ3Ljg5MDYyYy00LjQxMjEzLDAuMDY4OTcgLTcuOTM1NDIsMy42OTcxMiAtNy44NzUsOC4xMDkzOHY2MC42ODc1bC0xOC4zNDM3NSwtMTguMzQzNzVjLTEuNTA2MTcsLTEuNTQ4MjYgLTMuNTc0MzYsLTIuNDIxNzUgLTUuNzM0MzcsLTIuNDIxODhjLTMuMjU1MzksMC4wMDA4NSAtNi4xODU2NywxLjk3NDA0IC03LjQxMDY1LDQuOTkwMTZjLTEuMjI0OTgsMy4wMTYxMiAtMC41MDAzNyw2LjQ3MzcyIDEuODMyNTMsOC43NDQyMWwzMiwzMmMzLjEyNDI0LDMuMTIyOTQgOC4xODgyNiwzLjEyMjk0IDExLjMxMjUsMGwzMiwtMzJjMi4wODk5MywtMi4wMDY1MyAyLjkzMTgxLC00Ljk4NjE0IDIuMjAwOTUsLTcuNzg5NjdjLTAuNzMwODUsLTIuODAzNTQgLTIuOTIwMjQsLTQuOTkyOTIgLTUuNzIzNzcsLTUuNzIzNzdjLTIuODAzNTQsLTAuNzMwODUgLTUuNzgzMTQsMC4xMTEwMiAtNy43ODk2NywyLjIwMDk1bC0xOC4zNDM3NSwxOC4zNDM3NXYtNjAuNjg3NWMwLjAyOTYxLC0yLjE2MjQgLTAuODE3NDEsLTQuMjQ0NjkgLTIuMzQ4MDgsLTUuNzcyNDFjLTEuNTMwNjYsLTEuNTI3NzIgLTMuNjE0NTgsLTIuMzcwNzQgLTUuNzc2OTIsLTIuMzM2OTZ6TTIzLjg3NSwxMzUuODkwNjJjLTQuNDEyMTMsMC4wNjg5NyAtNy45MzU0MiwzLjY5NzEyIC03Ljg3NSw4LjEwOTM4djE2YzAsOC43NDQ1IDcuMjU1NSwxNiAxNiwxNmgxMjhjOC43NDQ1LDAgMTYsLTcuMjU1NSAxNiwtMTZ2LTE2YzAuMDQwOCwtMi44ODUwOSAtMS40NzUsLTUuNTY4NjUgLTMuOTY2OTgsLTcuMDIzMWMtMi40OTE5OCwtMS40NTQ0NSAtNS41NzQwNSwtMS40NTQ0NSAtOC4wNjYwMywwYy0yLjQ5MTk4LDEuNDU0NDUgLTQuMDA3NzksNC4xMzgwMSAtMy45NjY5OCw3LjAyMzF2MTZoLTEyOHYtMTZjMC4wMjk2MSwtMi4xNjI0IC0wLjgxNzQxLC00LjI0NDY5IC0yLjM0ODA4LC01Ljc3MjQxYy0xLjUzMDY2LC0xLjUyNzcyIC0zLjYxNDU4LC0yLjM3MDc0IC01Ljc3NjkyLC0yLjMzNjk2eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+" style="margin: 0px; max-height: 20px; margin-right: 7px; vertical-align: text-top; display: inline-block;" alt="Download icon" />
        Download
    </a>
</p>

<p>
    Or you can use <a href="/docs/octopus-cloud/">Octopus Cloud</a>:<br>
    <a href="/register" class="btn btn-lg btn-primary">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxOTIgMTkyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE5MnYtMTkyaDE5MnYxOTJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTk2LDMyYy0yMi4zNzI3MywwLjAyMTggLTQyLjg3NTA3LDEyLjQ4OTQ0IC01My4xODc1LDMyLjM0Mzc1Yy0yNC4zMzQ2LDIuNjQ1MzggLTQyLjc4MDU3LDIzLjE3ODMgLTQyLjgxMjUsNDcuNjU2MjVjMCwyNi41MDk2NyAyMS40OTAzMyw0OCA0OCw0OGgxMDRjMjIuMDkxMzksMCA0MCwtMTcuOTA4NjEgNDAsLTQwYy0wLjAyNDE1LC0yMS4wMDYzOSAtMTYuMjkzMywtMzguNDE1MiAtMzcuMjUsLTM5Ljg1OTM4Yy01LjY0MTIsLTI3Ljk3NzQ3IC0zMC4yMDk0OCwtNDguMTA5MDkgLTU4Ljc1LC00OC4xNDA2MnoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==" style="margin: 0px; max-height: 20px; margin-right: 7px; vertical-align: text-top; display: inline-block;" alt="Cloud icon"/>
        Start free trial
    </a>
</p>

## The Octopus Web Portal

Whether you're self-hosting the Octopus Server, or using Octopus Cloud, the Octopus Web Portal is where you'll manage your infrastructure, projects, access the built-in repository, grant your team access to projects, and create your automated deployments.

## Infrastructure

Octopus Deploy organizes your deployment targets (the machines and services that host your deployed software) into groups called environments. Typical environments are **Development**, **Test**, and **Production**, but you can configure as many as you need.

With Octopus Deploy your deployment targets could be Windows servers, Linux servers, Microsoft Azure, AWS, Kubernetes Clusters, Cloud Regions, or even an Offline Package Drop.

Organizing your infrastructure into environments lets you define your deployment processes (no matter how many steps or deployment targets are involved) and have Octopus deploy the right versions of your software, with the right configuration, to the right environments at the right time.

Learn more about managing your [infrastructure](/docs/infrastructure/index.md).

## Packaging Applications

Before you can deploy software with Octopus Deploy, you need to bundle all the files required for the software to run into a supported package. The package must be versioned and stored in a repository. Octopus Deploy includes a built-in repository, but you can also host your packages in external repositories. We recommend configuring your existing tool chain to push packages automatically to the repository. Octopus supports a variety of package formats.

Learn more about [packaging your applications](/docs/packaging-applications/index.md) or how to automate your existing toolchain to push packages to your Octopus Deploy server with our [Build Server Integrations](/docs/octopus-rest-api/index.md).

## The Deployment Process

Octopus Deploy is designed to work with teams following agile software development methodologies, that is, continuously deploying software, iterating, making changes, and redeploying.

Before you can deploy your software, you need to create a project which will include your deployment process and all the information needed for your teams to successfully deploy your software every time. The deployment process is a series of steps, each step contains specific actions that are executed as part of the deployment process every time your software is deployed. Octopus Deploy includes a range of built-in steps you can use in your deployment processes.

As part of the deployment process, you can define variables that change based on the scope of your deployments. This means, for instance, you can use different connection strings when you deploy to different environments.

After the initial setup, you can deploy your software as often as makes sense for you and your customers. You can even update the deployment process over time as the needs of the project change.

Learn more about the [deployment process](/docs/deployment-process/index.md), how you can set up [projects](/docs/deployment-process/projects/index.md), use [variables](/docs/deployment-process/variables/index.md) and [deploy releases](/docs/deployment-process/releases/index.md).

## The Delivery Pipeline

A typical workflow using Octopus Deploy could something like the following:

1. **Commit Code to Your Existing Source Control System.**

   You might be using Git, Team Foundation Server, Subversion, or Mercurial. The choice is yours.

1. **Your CI/Build Server Compiles the Code and Runs Unit Tests.**

   You might be using TeamCity, Jenkins, Bamboo, Azure DevOps, Team Foundation Server (TFS), or CruiseControl.NET, or your preferred CI server.

1. **Package Your Application.**

   When the build is ready, your CI/build server takes all the files your software needs to run and bundles them up ready for deployment.

1. **Octopus Deploy Deploys Your Software to Your Infrastructure.**

   Octopus deploys your software to the infrastructure you've configured, whether that's on-premises servers or cloud services. Octopus promotes releases of your software through your environments from **Development**, to **Test**, and finally into **Production**, and because each environment has slightly different configurations, Octopus manages those for you too.

## Next

 - [Installing the self-hosted Octopus Deploy Server](/docs/installation/index.md)
 - [Octopus Cloud](/docs/octopus-cloud/index.md)
 - [Manage your Infrastructure](/docs/infrastructure/index.md)
 - [Packaging Applications](/docs/packaging-applications/index.md)
 - [Deployment Process](/docs/deployment-process/index.md)
