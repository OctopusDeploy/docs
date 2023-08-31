---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Editing a project with version control enabled
description: What to expect when using the Configuration as Code feature in Octopus Deploy
navOrder: 30 
---

Once an Octopus Project is configured to be version-controlled, your experience making changes to a project will change. With the configuration as code feature, you can either edit the resources via the Octopus Deploy UI or your favorite file editing tool. This page will walk through what to expect.

## Editing via the Octopus UI

Editing via the Octopus Deploy UI works the same whether you are saving to a git repository or to SQL Server. You can add steps, update processes, remove steps, just like before. When you enable version control on a project, you get additional functionality.

### Branch Switcher 

The first difference is the addition of a branch-switcher. When editing the deployment process via the Octopus UI, the branch is selected in the branch-switcher in the left-hand navigation. 

:::figure
![Branch-switcher user-interface](/docs/projects/version-control/branch-switcher-ui.png)
:::

You can only switch branches on a version-controlled page (Process, Variables, etc.). If you have set up Protected branches in the Version Control Settings, you will see a padlock 🔒 next to the relevant branch in the Branch switcher.

:::figure
![branch-switcher protected-branches user-interface](/docs/projects/version-control/branch-switcher-protected-branches.png)
:::

Each branch can have a different deployment process. For example, if you decide to move from running web applications on VMs to PaaS, you could create a branch to hold all your code changes and your deployment process changes. You can make the necessary updates to your deployment process to deploy to a PaaS target. The deployment process currently being used to deploy to **Production** can be left alone until you are ready to merge in both the code changes and the deployment process changes.

### Commits

Before enabling version control on the project, clicking save updated a record in the SQL Server database. That record would be overwritten with each change. Once version control is enabled, that is no longer the case. You'll be generating commits each time you "save."  As such, the save experience has been updated. The **Save** button has been replaced with **Commit**, and clicking on that will allow you to enter a commit message before saving. Next to the **Commit** button is a quick save, useful when you make a minor change. Below the **Commit** button, you can see the branch you are committing to.

:::figure
![committing a change to version control](/docs/projects/version-control/commit-process.png)
:::

### Commits to Protected branches

If you are making changes on a protected branch, the quick save option will be disabled. When you click the **Commit** button, you will always be asked to Commit to a new branch. The option to commit to this branch will be disabled.

:::figure
![committing a change on a protected branch](/docs/projects/version-control/commit-process-protected.png)
:::

### Viewing and Editing OCL

Enabling version control also enables you to edit the OCL (Octopus Configuration Language) file directly. We suggest using your favorite text editor or IDE to make changes, commit and push them just as you would any other code change. 

:::div{.hint}
We have a [Visual Studio Code Plug-in](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.vscode-octopusdeploy) that will add syntax highlighting, OCL snippets, and an integrated tree view for navigating nodes in an HCL file.
:::

Any changes made to an OCL file via a text editor will not be reflected in the Octopus UI right away. The process for Octopus to reflect any changes is:

1. Commit the file.  
1. Push any changes to the remote git repo.

Octopus will periodically fetch from the remote, so you might have to wait a short time for the changes to appear. To see the changes immediately, simply reload the page.

:::div{.hint}
The Octopus Deploy Web Portal will only add non-default properties to the OCL files. For example, if a step isn't scoped to run for a specific environment(s), that property will not show up when you view the deployment process there.
:::

### OCL vs. Octopus Terraform Provider

While OCL is similar to HCL, it is not the exact same. In addition, there is not a 1:1 match between the resources generated for OCL and the resources for the [Octopus Terraform Provider](https://registry.terraform.io/providers/OctopusDeployLabs/octopusdeploy/latest/docs). That means you cannot copy resources between OCL files and TF files.

## Version Control features

Storing the deployment process in the same repository as your source code has many benefits. But don't forget to take advantage of all the version control features, including:

- Branching a deployment process when needing to make changes.
- Leveraging Pull Requests for approvals to any changes.
- Reverting changes if something doesn't work right.

If you make any changes outside of the Octopus UI (merging a branch, reverting a change, etc.), you'll need to either need to wait for Octopus to fetch from the remote repo, or reload the page for those changes to be reflected in the Octopus Web Portal.