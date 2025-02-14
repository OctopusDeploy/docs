---
layout: src/layouts/Default.astro
pubDate: 2024-11-24
modDate: 2024-11-24
title: Config as Code runbooks
description: Details about using configuration as code with runbooks.
navOrder: 20
icon: fa-brands fa-git-alt
---

:::div{.success}
Support for CaC Runbooks is rolling out to Octopus Cloud as of Q1 2025 and will be available in Octopus Server in a future release.
:::

Config as Code (or CaC) Runbooks stores your runbook process as code in your project repository. This means that you can now use version control to track changes to your runbook processes alongside changes to your project code.

You may already be using CaC to store your Octopus deployment process, deployment settings and non-sensitive variables. Adding CaC Runbooks completes that picture. 

The configuration for your runbooks, as well as your deployment process, settings and variables, are stored as OCL files which you can edit in Octopus or directly in your IDE. 

Using CaC Runbooks is currently optional. You can also choose to keep using Runbooks as you always have on your existing version controlled projects and on projects without version control.

## CaC Runbooks on a new version controlled project

If you're [creating a new version controlled project](/docs/projects/version-control/converting#creating-a-new-version-controlled-project) or [adding version control to an existing project](/docs/projects/version-control/converting#configuring-an-existing-project-to-use-git), CaC Runbooks will be automatically enabled on your project. 

## CaC Runbooks on an existing version controlled project 

:::div{.info}
Converting a project to use CaC Runbooks is a one-way change. Once you convert a project, you **cannot** convert it back. Please make sure you want to do this, and consider cloning your project to test how it works, so that you know what to expect before converting important projects.
:::

You can migrate an existing version controlled project to use CaC Runbooks by clicking on the 'Store Runbooks in Git' banner at the top of the **Runbooks** page of your project and following the prompts.

Once that's done, you should see a branch selector at the top of the **Runbooks** page, and a new 'runbooks/' directory in your repository alongside your existing OCL files. (See the '.octopus/ directory' of your repository project repository.) 

## Drafts vs branches

One of the exciting things about CaC is that it allows you to edit your runbooks over as many branches as you would like, creating as many copies of each runbook as you have branches. This means that we no longer need 'draft' runbooks. 

When you convert your project to use CaC Runbooks, only published runbooks will be available in Octopus as CaC Runbooks. 

Draft runbooks will still be converted to code. They can be found in the 'runbooks/migrated-drafts/' directory alongside the other runbooks OCL files in your 'runbooks/' directory. 

To access your draft runbooks in Octopus, you can simply move their OCL files up to the 'runbooks/' folder. 

But first, it's important to consider how CaC Runbooks uses branches to handle permissions. 

## Permissions by branch

When converting your project to CaC, you specify a 'default' branch to contain the approved versions of your OCL files. 

Other branches can be thought of as containing restricted versions of your runbooks. These may be unfinished runbooks or runbooks which you want to place extra permissions around.

You also have the option to specify 'protected' branches. Protected branches cannot be changed from within Octopus. Consider marking any branch which you would normally follow a PR review process to update as protected, including your default branch. 

Octopus provides [two built in roles](/docs/runbooks/runbook-permissions) to help you to manage permissions around editing and running runbooks: 'Runbook Consumer' and 'Runbook Producer'. 

#### Runbook Consumer:
- Non-CaC Runbooks - Runbook Consumers cannot edit runbooks and can only run published runbooks. 
- CaC Runbooks - Runbook Consumers cannot edit runbooks and can only run runbooks from the latest commit on the default branch. 

#### Runbook Producer:
- Non-CaC Runbooks - Runbook Producers can edit and run both draft and published runbooks.
- CaC Runbooks - Runbook Producers can edit runbooks on any unprotected branches and can run runbooks from any commit on any branch. 

Assuming your default branch is protected, this means that your old 'published' runbooks are equivalent to the runbooks in the latest commit on your default branch, and your old 'draft' runbooks are equivalent to the runbooks on any other commit on any branch. 

💡 If you are using Octopus's built in roles, keep these permissions in mind when moving your draft runbooks out of the 'migrated-drafts/' folder and consider storing these runbooks on a non-default branch.

## Snapshots vs commits

Another exciting thing about CaC Runbooks is that every revision to your runbook process, settings and variables is captured in your commit history. This means that you can now re-run any previous version of your runbook without the need for snapshots.

To re-run a previous version of a CaC Runbook, simply enter a commit hash on the branch selector at the top of the **Runbooks** page then run from that commit. If you are using the Octopus built in roles, this will require the Runbook Producer role.

The information that was previously found on the **Snapshot** page is still available on the **Details** tab of each runbook run. 

💡 Rather than setting package versions in your runbook snapshots, you can now specify fixed package versions inside your runbook steps and store these in CaC alongside the rest of your runbook process. 

## Scheduled triggers

[Runbook triggers](/docs/runbooks/scheduled-runbook-trigger) will always run CaC Runbooks from the latest commit on your default branch, just as non-CaC runbook triggers will only run published runbooks.

## Custom automated scripts

If you use automated scripts that run runbooks via the Octopus Server API and you convert your runbooks to Config As Code the URL for the runbook will change to include a branch reference (e.g. `refs/heads/main`) as a result you need to update your scripts to include the branch reference where the runbook is stored. 

- [PowerShell example](https://github.com/OctopusDeploy/OctopusDeploy-Api/blob/master/REST/PowerShell/Runbooks/RunConfigAsCodeRunbook.ps1)

## Deleting required resources

Once your Runbooks are version controlled, it's up to you to take care to avoid deleting any Octopus resources required by your Runbooks. See our [core design decisions](/docs/projects/version-control/unsupported-config-as-code-scenarios#core-design-decision) for more information. 


