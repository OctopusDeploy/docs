---
title: Configuration as Code (Early Access) 
description: Projects can be version-controlled as text in a git repository 
position: 110 
hideInThisSection: true
---

:::hint
The Early Access Preview of the config-as-code feature was added in **Octopus 2021.3** and is enabled via **{{Configuration, Features}}**.
:::

![Config as code feature toggle](config-as-code-feature-toggle.png "width=500")

## Introduction 

Welcome to the config-as-code Early Access Preview! Support for version-controlling Octopus projects has been highly requested for a long time now, and we're excited to release the first cut. The goal of the EAP is to gather feedback and help us evaluate which problems are the most valuable to solve next.  

:::warning
Config-as-code is still in development. We firmly recommend not using it on critical production projects at this stage.
:::

The config-as-code EAP adds support for configuring Octopus projects with the details of a Git repository. For the EAP, this is the _deployment process_ which is version-controlled.  

It was important to us that the Octopus UI remain fully functional for version-controlled projects, and it has. You can continue to use the UI exactly as you always have, but with an additional super-power: Git branches are now exposed in the UI, allowing editing the deployment process on any branch via the UI. If you type the name of a branch that doesn't exist in your repository, you'll see an option to create that branch. This option is available when committing changes to your deployment process too.

![Branch-switcher UI](branch-switcher-ui.png "width=500")

Of course, there is now a text representation of the process in the git repository, and if you prefer editing text, open your favorite editor and go for it. We refer to the text format as Octopus Configuration Language (OCL), and it is very much inspired by [HCL](https://github.com/hashicorp/hcl).

That means that where previously there was only a single current version of the deployment process, it is now possible to have many. When creating releases, the relevant branch can be selected. We have also added [branch system variables](docs/projects/variables/system-variables.md#release-branch-information) that can be used in your custom deployment scripts.

:::warning
Config-as-code only supports [git](https://git-scm.com/) repositories.  Before using this feature, you should be familiar with [git concepts](https://git-scm.com/doc) such as distributed version control, pushing, pulling, branching, merging, and fetching.
:::

### What's next?

We have some strong opinions on what's next. The first release of config-as-code will only include the _deployment process_.  

Our plans for future releases of config-as-code are to add support for:

- Variables
- Runbooks

In addition, we'd like to evolve the OCL schema to make it friendlier for editing by hand.  

### We want your feedback

Our major goal for the early stages of this feature is to discover the ways people want config-as-code to evolve. What scenarios would you like to see unlocked? What doesn't work the way you hoped? 

You can provide feedback through whichever of the following channels you feel most comfortable with: 

- Feedback forms. The orange EAP chips in the product link to feedback forms when clicked. This is a great way to provide structured feedback. 
- Community slack. The `config-as-code` channel in the [Octopus community slack](https://octopus.com/slack) is the best place to have a conversation with the team.
- Support. For errors or issues, see our [official support](https://octopus.com/support) channels. 

## Configuring a project to be version-controlled 

Version-control is configured per project and is accessed via the {{Version Control}} navigation menu item. 

Learn more about [Configuring version control on a project](/docs/projects/version-control/configuring-version-control-on-a-project.md).

## Config-as-code reference

Several resources previously stored in SQL Server will now be stored in git once a project is version-controlled.

Learn more about [Configuration as Code reference](/docs/projects/version-control/config-as-code-reference.md)

## Making changes to a version-controlled project

Any changes to the deployment process or settings are made on a branch after a project is configured to be version-controlled.

Learn more about [Editing a project with version control enabled](/docs/projects/version-control/editing-a-project-with-version-control-enabled.md).

## Creating and deploying releases

Once an Octopus project is configured to be version-controlled, you can choose which branch to build from before creating a release in Octopus.

Learn more about [creatign and deploying releases in a version controlled project](/docs/projects/version-control/creating-and-deploying-releases-version-controlled-project.md).

## Unsupported Scenarios

The Configuration as Code feature is designed to give you the benefits of source control, branching, reverting, and pull requests while being able to use your tool of choice to manage your processes (and eventually) variables. While it has many benefits, there are some unsuitable use cases and scenarios.

Learn more about [unsuitable config-as-code scenarios](/docs/projects/version-control/unsupported-config-as-code-scenarios.md)
