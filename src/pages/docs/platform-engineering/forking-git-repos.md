---
layout: src/layouts/Default.astro
pubDate: 2023-11-09
modDate: 2023-11-09
title: Forking Git repositories
description: Learn how to fork repositories when deploying a copy of CaC projects
navOrder: 7
---

Octopus does not support two Config-as-Code (CaC) enabled projects pointing to the same Git repo. This means you must fork the Git repository hosting the upstream project and then point the downstream project to the new fork.

The `GitHub - Fork Repo` step from the community step template library automates the process of forking repositories in GitHub.

:::div{.hint}
Other Git platforms may have CLI tools that allow repositories to be forked.
:::

The typical process used to deploy an upstream CaC project serialized with octoterra is to run a step like `GitHub - Fork Repo` to fork the upstream Git repository before the `Octopus - Populate Octoterra Space` step. This ensures a new Git repository has been created for the downstream project.

A CaC enabled project exported by octoterra exposes the CaC Git url as a Terraform variable. The variable is based on the name of the upstream project and ends with the `_git_url` suffix e.g. `project_frontend_webapp_git_url`. 

The default value of this variable is the upstream project's CaC Git repository. This Terraform variable must be defined when running the `Octopus - Populate Octoterra Space` by adding it to the `Terraform Additional Apply Params` field e.g `-var=project_frontend_webapp_git_url=#{Octopus.Action[GitHub - Fork Repo].Output.NewRepo}`.

