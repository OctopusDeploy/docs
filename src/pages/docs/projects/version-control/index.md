---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Configuration as Code
description: Projects can be version-controlled as text in a Git repository 
navOrder: 110 
hideInThisSection: true
---

## Introduction 

The Configuration as Code (config-as-code) feature adds support for configuring Octopus projects to store project resources in a Git repository. For now, only the _deployment process_, _deployment settings_, and _non-sensitive variables_ can be version-controlled.

The Octopus UI needed to remain fully functional for version-controlled projects, and it has. You can continue to use the UI exactly as you always have, but with an additional superpower: Git branches are now exposed in the UI, allowing editing of currently supported project configuration on any branch via the UI. If you type the name of a branch that doesn't exist in your repository, you'll see an option to create that branch. This option is available when committing changes too.

![Branch-switcher UI](branch-switcher-ui.png "width=500")

Of course, there is now a text representation of the process in the Git repository, and if you prefer editing text, open your favorite editor and go for it. We refer to the text format as Octopus Configuration Language (OCL), and it is very much inspired by [HCL](https://github.com/hashicorp/hcl).

That means that where previously there was only a single current version of the deployment process, it is now possible to have many. When creating releases, the relevant branch can be selected. We have also added [branch system variables](docs/projects/variables/system-variables.md#release-branch-information) that can be used in your custom deployment scripts.

:::warning
Config-as-code only supports [git](https://git-scm.com/) repositories.  Before using this feature, you should be familiar with [git concepts](https://git-scm.com/doc) such as distributed version control, pushing, pulling, branching, merging, and fetching.
:::

### What's next?

We have some strong opinions on what's next. The latest release of config-as-code supports _deployment processes_, _deployment settings_, and _non-sensitive variables_.  

We have plans for future releases of config-as-code to support Runbooks. In addition, we'd like to evolve the OCL schema to make it friendlier for editing by hand.

### We want your feedback

Our major goal for the early stages of this feature is to discover the ways people want config-as-code to evolve. What scenarios would you like to see unlocked? What doesn't work the way you hoped? 

You can provide feedback through whichever of the following channels you feel most comfortable with: 

- Feedback form. There is a link in a version-controlled project's **Version Control Settings** section that takes you to a feedback form when clicked. This is a great way to provide structured feedback. 
- Community slack. The `config-as-code` channel in the [Octopus community slack](https://octopus.com/slack) is the best place to have a conversation with the team.
- Support. For errors or issues, see our [official support](https://octopus.com/support) channels. 

## Configuring a project to be version-controlled 

Version-control is configured per project and is accessed via the **{{Settings,Version Control}}** navigation menu item. 

Learn more about [Configuring version control on a project](/docs/projects/version-control/converting/).

## Config-as-code reference

Several resources previously stored in SQL Server will now be stored in git once a project is version-controlled.

Learn more about [Configuration as Code reference](/docs/projects/version-control/config-as-code-reference.md)

## Making changes to a version-controlled project

Any changes to the deployment process or settings are made on a branch after a project is configured to be version-controlled.

Learn more about [Editing a project with version control enabled](/docs/projects/version-control/editing-a-project-with-version-control-enabled.md).

## Migrating projects to support new features

Since the initial public release of config-as-code, we've added support for additional project configuration in Git. Learn more about [migrating variables to Git](/docs/projects/version-control/converting/migrating-variables.md)

## Creating and deploying releases

Once an Octopus project is configured to be version-controlled, you can choose which branch to build from before creating a release in Octopus.

Learn more about [creating and deploying releases in a version controlled project](/docs/projects/version-control/creating-and-deploying-releases-version-controlled-project.md).

## Unsupported scenarios

The Configuration as Code feature is designed to give you the benefits of source control, branching, reverting, and pull requests while being able to use your tool of choice to manage your processes (and eventually) variables. While it has many benefits, there are some unsuitable use cases and scenarios.

Learn more about [unsupported config-as-code scenarios](/docs/projects/version-control/unsupported-config-as-code-scenarios.md)