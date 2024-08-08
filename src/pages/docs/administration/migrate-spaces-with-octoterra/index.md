---
layout: src/layouts/Default.astro
pubDate: 2099-01-01
modDate: 2099-01-01
title: Migrating spaces with octoterra
description: How to migrate spaces using the octoterra tool
navOrder: 100
hideInThisSection: true
navSearch: false
navSitemap: false
navMenu: false
robots: noindex, follow
---

[Octoterra](github.com/OctopusSolutionsEngineering/OctopusTerraformExport/actions) exports Octopus projects, runbooks, and spaces to a Terraform module. Octoterra can be used to migrate resources between spaces and instances.

[Octoterra Wizard](https://github.com/OctopusSolutionsEngineering/OctoterraWizard) prepares a source space to allow the space and projects to be migrated to a new space or instance. It configures runbooks on the source space to run Octoterra and to apply the Terraform modules created by Octoterra.\

This documentation provides details on how to use the Octoterra Wizard to migrate a space from one instance to another, as well as noting the limitations and any special requirements of the process.

## Choosing between Octoterra and the Import/Export tool

The [Import/Export tool](https://octopus.com/docs/projects/export-import) is built into Octopus and provides much of the same functionality as the Octoterra Wizard.

Typically, you would choose the Import/Export tool to perform a migration. However, there are cases where the Import/Export tool is not suitable:

* You wish to migrate CaC projects, as the Import/Export tool does not support CaC projects
* You wish to recreate targets, as the Import/Export tool does not migrate targets
* You wish to "own" the intermediate format used for the migration, as the Import/Export tool uses an undocumented JSON formation

## Limitations of Octoterra and migrating projects between instances

There are limitations that must be accounted for as part of a migration.

### Sensitive values

Sensitive values are not exposed by the Octopus API and therefore are not captured in the Terraform configuration created by Octoterra.

Sensitive variables can be passed to the Terraform module if the source Octopus instance deploys the Terraform configuration itself, as Octopus exposes sensitive values to a deployment process or runbook. In order to ensure sensitive variables can be passed to the Terraform configuration, all sensitive variables must be unscoped and have a unique name. Existing sensitive variables can be modified to fulfil these requirements by spreading them. See the section on variable spreading for more information.

The sensitive values associated with feed, account, and Git credentials, the contents of certificate, sensitive values embedded in steps (such as the `Deploy to IIS` step), and sensitive values defined as parameters on step templates can not be captured by Octoterra. These values are replaced with placeholder values and must be manually reentered on the destination instance once the space has been migrated.

### New step framework

Some steps rely on a new framework. Steps that use the new framework are not currently supported by the Terraform provider. These steps can not be exported by Octoterra.

Octoterra will display an error like this when an unsupported step is encountered:

```bash
Action <step name> has the "Items" property, which indicates that it is from the new step framework. These steps are not supported and are not exported.
```

### Config-as-Code (CaC) repositories

Octoterra converts CaC projects back to regular projects as part of the migration. The project can be converted back to CaC on the destination space. 

However, be aware that Octopus does not support sharing project CaC configuration between two projects. You are prevented from doing so with multiple projects on a single Octopus instance. While you are not prevented from configuring two projects against a shared CaC project configuration from multiple Octopus instance, there are cases where the CaC configuration references space specific resource IDs, such as step templates, which have unique (and incompatible) IDs across spaces and instances. This means you can not assume you can configure a new project in a new space or on a new instance against an existing project CaC configuration hosted in Git.

The recommended solution is to convert the projects in the destination space to a new directory or Git repository. This ensures that the new projects have valid CaC configuration.

### Other settings

The following is a non-exhaustive list of settings that are not exported by Octoterra:

* Users, teams, and roles
* Authentication settings
* Packages in the built-in feed
* Audit logs
* Releases and deployments
* Runbook runs
* Subscriptions
* API Keys
* SEIM settings
* ITSM settings
* GitHub app connections
* License details
* Node configuration
* SMTP settings
* Insights dashboards
* OIDC accounts

## Prerequisites

These are the prerequisites for migrating projects with octoterra:

* Download the Octoterra Wizard from [GitHub](https://github.com/mcasperson/OctoterraWizard)
* Install [Terraform](https://developer.hashicorp.com/terraform/install) on your local workstation
* [Create an API key](https://octopus.com/docs/octopus-rest-api/how-to-create-an-api-key) for the source Octopus instance
* [Create an API key](https://octopus.com/docs/octopus-rest-api/how-to-create-an-api-key) for the destination Octopus instance
* Create a remote [Terraform backend](https://developer.hashicorp.com/terraform/language/settings/backends/configuration) to maintain the state of the Terraform resources. [AWS S3](https://developer.hashicorp.com/terraform/language/settings/backends/s3) and [Azure Storage Accounts](https://developer.hashicorp.com/terraform/language/settings/backends/azurerm) are supported.

## Running the wizard

The Octoterra Wizard presents a wizard that prompts you for the details of your source Octopus space, the destination Octopus space, and the Terraform backend.

You are also prompted to spread sensitive variables after confirming that you understand the implications of modifying variables in this manner. See the section called Spreading sensitive variables for more details on the implications of this step.

You are given the choice to use local tools or container images when running the runbooks to create and apply the Terraform modules. See the section called Local Tools vs Container Images for more information on making this choice.

The final steps do not involve any input. They manage the process of installing the required community step template steps into the source space, creating runbooks to export the space level resources and projects, and finally running the runbooks. See the section Space vs project level resources for more information on the distinction between these resources.

## Spreading sensitive variables

In order for Octopus to expose sensitive variables defined in the project and in library variable sets to the Terraform module created by Octoterra, each sensitive variable must have a unique name and no scopes.

However, it is common for sensitive variables to share a name use scopes to define unique values for different contexts. For example, you may have two sensitive variables called `Database.Password`, with the first variable scoped to the `Dev` environment, and the second scoped to the `Production` environment. This is demonstrated in the screenshot below:

![Sensitive project variables](sensitive-variables.png)

The process of renaming the sensitive variables, removing their scopes, and recursively referencing them via regular variables that have the names and scopes of the original sensitive variables is called "spreading" the variables.

Here is a screenshot that shows the spread variables:

![Spread sensitive variables](spread-variables.png)

Existing steps that referenced the variable `Database.Password` will continue to function, as the value of that variable is recursively resolved from the Octostache template syntax in the regular variable to return the value held by the referenced sensitive variable.

Because each sensitive variable now has a unique name and no scope, the value of sensitive variables can be reliably passed to a Terraform module applied by Octopus, effectively allowing sensitive variables to be migrated.

Note there are security considerations to take into account with variable spreading. Notably, every sensitive variable is exposed to every deployment or runbook run.

:::div{.warning}
It is important to understand the implications of variable spreading before migrating projects with the Octoterra Wizard.
:::

## Local Tools vs Container Images

The runbooks created by the Octoterra Wizard have the option to use locally installed tools or run the runbooks from a container image that provides the required tools.

Container images require that the source server or the default worker pool used by the source server have Docker installed. This is common on Linux servers (especially as Octopus is distributed as a Linux container for on-premises Linux users), and is available on the dynamic workers provided by cloud Octopus instances, but less common on on-premises Windows servers.

Local tools are locally installed versions of the tool listed in the Required local tools section. Using this option does not require Docker to be installed on the source server.

If you are migrating from an on-premises Windows server, you will likely select the `Local tools` options.

### Required local tools

If you select the Local tools option, your on-premises server or default worker pool must have the following tools installed:

* [Terraform](https://developer.hashicorp.com/terraform/install)
* [Python](https://www.python.org/downloads/)
* [PowerShell Core](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell)

## Space vs project level resources

Octoterra distinguishes between space and project level resources. Broadly speaking, project level resources include deployment projects and everything directly attached to projects such as project variables, runbooks, triggers, channels, and project settings.

:::div{.hint}
Octoterra does not export releases or deployments.
:::

Space level resources include everything else including feeds, accounts, tenants, library variable sets, certificates, workers, worker pools, project groups etc.

The relationship between a tenant and a project, including project level tenant variables, are considered to be project level resources.

Migrating a space involves:

1. Migrating space level resources
2. Migrating individual projects
   1. Reestablishing the link between a tenant and a project

Projects can typically be migrated independently of each other. However, some steps, such as the `Deploy a release` step, reference other projects. The projects referenced by `Deploy a release` steps must be migrated before the project that defines the step.

## Migration strategies

Because the Octoterra Wizard serialized and Octopus space to Terraform modules, there are a number of strategies that can be implemented for migrating spaces:

* Big bang migration, where the migration is done all at once
* Incremental migration, where projects are migrated over time
* Continual migration, where the destination server is updated as changes are made to the source server

### Big bang migration

This is conceptually the easiest migration as it means migrating Octopus resources from the source server to the destination server once, shutting down the source server, and switching to the destination server.

To perform a big bang migration, run the wizard to completion. This will migrate the space level resources and all projects for you.

Consider a big bang migration strategy when:

* You can migrate the space and project level resources in one operation
* You are confident that the migrated resources work as expected
* You can perform all the post-migration steps before the destination server is put into operation

### Incremental migration

Incremental migrations require the space level resources to be migrated from the source server to the destination server.

To perform an incremental migration, complete the `Migrate Space Level Resources` step and then exit the wizard. This ensures that the space level resources are migrated.

Then, when a project is ready to be migrated, run the `__ 1. Serialize Project` runbook, followed by the `__ 2. Deploy Project` runbook. This will serialize and then migrate a single project.

You may consider disabling the project on the source server once it has been migrated to prevent deployments taking place on both the source and the destination server.

Consider an incremental migration strategy when:

* You need to break down the migration into multiple steps
* Your projects have different risk profiles i.e. you have low risk projects you can migrate first, and only when they are successful can you migrate high risk projects
* You wish to delegate the process of migrating projects to different teams who will perform the migration on their own schedule

### Continual migration

Continual migration means updating the project on the destination server with any changes from the source server after the initial migration.

Continual migrations are useful when both the source and destination servers must run side by side for some time. A typical scenario is testing the migrated projects on the destination server while the associated projects on the source server are still in active use, and redeploying the projects to update the destination server with any changes made to the source server.

:::div{.hint}
The source server is considered the source of truth for space and project level resources until the source server is decommissioned. The configuration of the destination server will be replaced each time space and project level resources are redeployed.
:::

Consider a continual migration strategy when:

* You wish to perform the bulk of the migration up front
* You need to test the destination server while the source service is still actively used
* You need to update the destination server with any changes made to the source server while testing the migration


## Post-migration steps

The migration of space and project level resources will transfer most, but not all, configuration from the source to the destination server. There are a number of post-migration steps that must be completed before the destination server is fully operational.

### Update sensitive values

A number of sensitive values can not be migrated by Octoterra including:

* Account credentials
* Feed credentials
* Git credentials
* Certificates
* Secret values define in steps such as the `Deploy to IIS` and `Deploy to Tomcat` steps
* Sensitive values defined for secret step templates parameters

All these values must be manually reconfigured on the destination server.

### Convert projects back to CaC

CaC projects are converted back to regular projects during the migration. These projects must be manually converted back to CaC on the destination server.

:::div{.warning}
You can not assume that you can point the projects back to their original configuration stored in Git. Values like step template IDs are hard coded in CaC configuration but are different between servers. Octopus also does not support pointing two projects to the same directory in a Git repository, so the source and destination servers can not reference the same Git repository and directory at the same time.
:::

### Migrate packages from built-in feed

Packages must be manually copied from the source to the destination server. [The documentation for the import/export tool](https://octopus.com/docs/projects/export-import#packages) includes a link to a script that copies packages between servers.

### Reconfigure firewalls

Any firewall rules relating to the Octopus server must be updated to reflect the new address of the destination server.

### Regenerate API keys

Any external scripts and platforms to connect to Octopus must make use of a new [API key](https://octopus.com/docs/octopus-rest-api/how-to-create-an-api-key).

### Reconfigure polling tentacles

[Polling tentacles](https://octopus.com/docs/infrastructure/deployment-targets/tentacle/tentacle-communication#polling-tentacles) must be configured with the address of the Octopus server they connect to. This means that any polling tentacles must be reconfigured to point to the destination server.

The [poll-server](https://octopus.com/docs/octopus-rest-api/tentacle.exe-command-line/poll-server) command is used to configure a tentacle with a new server.

You also need to deregister polling tentacles from the source server. The [deregister-from](https://octopus.com/docs/octopus-rest-api/tentacle.exe-command-line/deregister-from) command is used to deregister a tentacle from a server.

A polling tentacle can be configured against both the source and destination servers when performing an incremental or continual migration, and deregistered from the source server with the migration is complete.

### Update CI servers

Any CI servers must be reconfigured to point to the destination server.

You will likely configure your CI server to push packages to the built-in feed for both the source and destination servers when performing an incremental or continual migration, and remove the steps that interact with the source server when the migration is complete.

### Reconfigure subscriptions

[Subscriptions](https://octopus.com/docs/administration/managing-infrastructure/subscriptions) must be manually recreated on the destination server.

If subscriptions are used to trigger external events based on project events, you must take care to incrementally migrate subscriptions as part of a incremental or continual migration.

### Reconfigure SEIM connections

You must manually configure the [audit stream](https://octopus.com/docs/security/users-and-teams/auditing/audit-stream) to SEIM tools like Sumo or Splunk on the destination server.

### Reconfigure ITSM connection

You must manually configure the link to ITSM tools like [Service Now](https://octopus.com/docs/approvals/servicenow) and [Jira Service Management](https://octopus.com/docs/approvals/jira-service-management) on the destination server.

### Recreate Insights dashboards

You must manually recreate any [Insights dashboards](https://octopus.com/docs/insights) on the destination server.

### Users and teams

You must manually recreate any [users and teams](https://octopus.com/docs/security/users-and-teams) on the destination server.

### SMTP settings

You must manually configure the [SMTP settings](https://octopus.com/docs/projects/built-in-step-templates/email-notifications#smtp-configuration) on the destination server.


