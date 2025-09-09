---
layout: src/layouts/Default.astro
pubDate: 2025-09-08
modDate: 2025-09-08
title: Ephemeral Environments
navTitle: Ephemeral Environments
navSection: Ephemeral Environments
description: Gain confidence in your changes with Ephemeral environments in Octopus.
navOrder: 94
---

Ephemeral environments in Octopus Deploy allow to you automatically create test environments on-demand to gain confidence in your changes while helping to keep your infrastructure costs down.

:::div{.hint}
Support for Ephemeral Environments is rolling out as an Early Access Preview to Octopus Cloud.
:::

Ephemeral environments integrate smoothly into your existing development workflows by building on existing Octopus features such as [Releases](/docs/releases), [Channels](/docs/releases/channels) and [Runbooks](/docs/runbooks).

Octopus will automatically create and deploy to an ephemeral environment from releases created within a specifically configured channel in a project, and supports provisioning and deprovisioning of associated infrastructure using Runbooks.

# Getting started

To configure Ephemeral Environments for your project:

- Select **Deploy** from the main navigation in the Octopus Web Portal and select your project.
- Select the Ephemeral Environments navigation menu in the sidebar.
- Click the Configure Ephemeral Environments button.
- Follow the configuration wizard to enable the feature for your project.

![Getting started with ephemeral environments from within a project](/docs/ephemeral-environments/getting-started.png)

## Parent environment

A parent environment provides scoping of variables, deployment targets and accounts for ephemeral environments [link]. Parent environments are not included in Lifecycles and cannot be deployed to.

Enter the name for a new parent environment or if one already exists you have the option to select from an existing then click Next.

:::div{.hint}
**Tip:**
Give your parent environment a recognizable name that describes what you intend to use ephemeral environments for. Examples might include Pull request environments or Test environments.
:::

## Naming

Octopus will automatically provision a new ephemeral environment for you from releases in your project. The name of each environment can be configured using an Environment Name Template. Templates support the same powerful syntax as Variables, any variable from a release can be used [link].

Enter a template and click Next.

:::div{.hint}
**Tips: **

- Environment names only support a specific set of characters, Octopus will automatically replace any invalid characters with a -.
- Environment names can have spaces in them.
- Environment names have a limit of 50 characters, you can use Octostache filters to limit the length of the name if needed.

:::

### Custom Fields

Releases support Custom Fields which can be used to configure the name of an ephemeral environment. See Using custom fields in releases [link] for more information.

### Examples

| Template                                                                                        | Data                                             | Environment name     | Notes                                                                                               |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------------- | --------------------------------------------------------------------------------------------------- |
| `#{Octopus.Release.Git.BranchName}`                                                             | Branch: `ava/my-new-feature`                     | `ava-my-new-feature` | The `Octopus.Release.Git.BranchName` variable is only supported for projects using version control. |
| `pr-#{Octopus.Release.CustomFields[PullRequestNumber]}`                                         | PullRequestNumber: 451                           | `pr-451`             | Provide the `PullRequestNumber` custom field when creating the release.                             |
| `#{Octopus.Release.CustomFields[TeamName]} - #{Octopus.Release.CustomFields[JiraTicketNumber]}` | TeamName: `My Team`, JiraTicketNumber: `TST-150` | `My Team - TST-150`  | Multiple custom fields from a release can be combined.                                              |

## Provisioning

Any infrastructure required by an ephemeral environment can be created using a Runbook. Octopus will automatically run this Runbook as needed before deploying a release to the environment.

Create a new runbook, select an existing one or select to skip provisioning and click Next.

## Deprovisioning

Any infrastructure used by an ephemeral environment can be removed using a Runbook. Octopus will automatically run this Runbook as needed as part of deprovisioning the environment.

Create a new runbook, select an existing one or select to skip deprovisioning and click Next.

## Review and confirm

Review the selected configuration and click Confirm. You can go back and adjust before confirming.

![Confirming the configuration of ephemeral environments for a project](/docs/ephemeral-environments/confirm-ephemeral-environments-configuration.png)

Ephemeral environments are now configured for your project. A new channel has been created in the project which will automatically create and deploy to a new environment for each release.

Click Got it to continue to creating a new environment from a release.

![Ephemeral environments successfully configured for a project](/docs/ephemeral-environments/ephemeral-environments-configured.png)

# Creating an ephemeral environment

To create an ephemeral environment, simply create a release in the channel configured within the project. Octopus will automatically create a new environment and deploy the release to it.

A release can be created using the:

- Octopus Web Portal
- Octopus API
- `OctopusDeploy/create-release-action` GitHub Action
- Octopus CLI

:::div{.hint}
**Tip:**
Remember to provide any custom fields with the release that are used in the environment name template.
:::

:::div{.warning}
Support for providing custom fields is not yet available in the Octopus CLI.
:::

# Provisioning infrastructure

Infrastructure required for an ephemeral environment can be provisioned using a runbook. Octopus will automatically run this runbook before the first deployment to the environment.

- For projects using runbooks stored in Octopus the published snapshot will be used to run the runbook.
- For projects using runbooks stored in version control, the Git reference from the release will be used to run the runbook.

# Viewing ephemeral environments

To view ephemeral environments:

- Select **Deploy** from the main navigation in the Octopus Web Portal and select your project.
- Select the Ephemeral Environments navigation menu in the sidebar.

Environments can be filtered by name and by the current state of the environment for the project.

![Filtering the ephemeral environments used within a project by the name of the environment](/docs/ephemeral-environments/viewing-ephemeral-environments.png)

# Updating an existing environment

To update an existing ephemeral environment, create another release that results in the same environment name based on the template. The release will be automatically deployed into the environment.

# Deprovisioning an environment

When an ephemeral environment is no longer needed it can be deprovisioned and any infrastructure removed. Octopus will run the selected deprovisioning runbook before (optionally) removing the environment.

- For projects using runbooks stored in Octopus the published snapshot will be used to run the runbook.
- For projects using runbooks stored in version control, the Git reference used to provision the environment will be used to run the runbook.

To deprovision an environment:

- Select **Deploy** from the main navigation in the Octopus Web Portal and select your project.
- Select the Ephemeral Environments navigation menu in the sidebar.
- Click the menu next to the environment to deprovision and select Deprovision Environment.
- Select whether to keep the environment in Octopus or remove it after deprovisioning.
- Click Deprovision

![Deprovisioning an ephemeral environments from within a project](/docs/ephemeral-environments/deprovision-ephemeral-environments.png)

## Automatic deprovisioning of environments

Ephemeral environments can be automatically deprovisioned if they are inactive after after a configurable time period. Deploying a release to an environment or running a runbook against an environment marks the environment as still being active.

:::div{.hint}
By default, ephemeral environments are removed after 7 days of inactivity.
:::

To configure automatic deprovisioning of environments:

- Select **Deploy** from the main navigation in the Octopus Web Portal.
- Select Environments from the sub-navigation.
- Find the parent environment, click the menu and select Edit.
- Edit the Automatic Deprovisioning value.

:::div{.warning}
Automatic deprovisioning can be disabled, however it is recommended to enable it to ensure that environments are removed when they are no longer in use, reducing associated infrastructure costs.
:::

# Scoping variables, deployment targets and accounts

Ephemeral environments are designed to be created and removed as part of testing changes within the development lifecycle. In order to support scoping of variables and access to deployment targets and accounts, an ephemeral environment is associated with a **Parent Environment**.

Parent environments are configured alongside existing environments in the Octopus Web Portal. They cannot be used in lifecycles or deployed to, instead they are only used for scoping and access for ephemeral environments.

Parent environments can be selected alongside existing environments in the following areas:

- Deployment targets
- Accounts
- Certificates
- Variable sets
- Project variables
- User roles assigned to teams.

# Changing ephemeral environment settings

To change the ephemeral environment settings for a project:

- Select **Deploy** from the main navigation in the Octopus Web Portal and select your project.
- Select the Ephemeral Environments navigation menu in the sidebar.
- Select the Settings tab.

![Viewing ephemeral environments within a project](/docs/ephemeral-environments/ephemeral-environment-settings.png)

# Using multiple projects with ephemeral environments

Ephemeral environments can be used by multiple projects in the same way that other environments in Octopus can be used.

Important notes for using multiple projects:

- Each project using the same ephemeral environment must be configured to use the same parent environment.
- Ephemeral environments are shared across a space, and the name must be unique.
- If the environment name created from a release using the template is the same as an existing environment used in another project, a new environment will not be created.
- When deprovisioning an ephemeral environment being used by multiple projects, an option can be selected to deprovision and remove the entire environment, or only deprovision the current project and leave the environment in Octopus.

# Release retention

Releases in channels configured for ephemeral environments have a retention policy of 3 days. Releases currently deployed to an ephemeral environment will be kept.

# Limitations

The following limitations currently apply to the use of the Ephemeral Environments feature:

- Ephemeral environments cannot be deployed to tenants.
- Parent environments cannot be connected to tenants.
- Ephemeral environments and parent environments cannot be used within lifecycles, deployment freezes and insights reports.
- Ephemeral environments cannot be manually created outside of releases.
