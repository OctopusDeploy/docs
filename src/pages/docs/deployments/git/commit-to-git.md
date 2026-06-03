---
layout: src/layouts/Default.astro
pubDate: 2026-06-03
modDate: 2026-06-03
title: Commit to Git
description: Commit packages and files to a Git repository as part of your deployment process.
navOrder: 10
---

The **Commit to Git** step commits packages and files to a Git repository as part of your deployment process. You can copy files from packages and other Git repositories into a target repository, optionally transform them with a script, and then commit the changes directly or through a pull request.

The step brings together two behaviors you may already know from other steps: it accepts multiple input packages, like the [Deploy a Helm Chart](/docs/deployments/kubernetes/helm-update) step, and it can run a script over those files, like the [Run a Script](/docs/deployments/custom-scripts/run-a-script-step) step. The difference is that the result is committed back to Git rather than deployed to a target.

:::div{.info}
The Commit to Git step is currently in Early Access. The available options may change as we refine the step based on your feedback.
:::

## Caveats

Before you configure the step, note the following limitations on the destination repository:

- The destination repository must use a credential from the [Git credential library](/docs/infrastructure/git-credentials). GitHub App connections aren't supported for the destination repository.
- To create or wait for pull requests, the credential must use a username and password. SSH credentials can commit directly to the target branch, but they can't create or wait for pull requests.
- Pull requests can only be created for GitHub, GitLab, and Azure DevOps repositories.

## Destination Git repository

:::figure
![The Commit to Git step in the process editor](/docs/img/deployments/git/commit-to-git/commit-to-git-step.png)
:::

The destination repository is the repository you commit to. Configure it with the following options:

- **Git credential** select the [Git credential](/docs/infrastructure/git-credentials) for the destination repository. See [Caveats](#caveats) for the credential types you can use.
- **Branch** the branch to commit to. This defaults to `main`.
- **Destination path** the path in the repository where Octopus copies your input files. Leave it blank to use the root of the repository.

### Commit message

The commit message has a summary and an optional description. If you leave the description blank, Octopus populates a default for you. If you commit through a pull request, Octopus reuses this message for the pull request.

:::div{.warning}
If the commit summary or description references a [sensitive variable](/docs/projects/variables/sensitive-variables), the deployment fails. This stops sensitive data leaking to Git through the commit or pull request message.
:::

### Git commit method

The Git commit method controls how Octopus applies the change to your target branch:

- **Direct commit** commits straight to the target branch.
- **Pull request** opens a pull request instead of committing directly.

If you open pull requests, you can do so for all environments or only a selection. Environments you don't select commit directly to the target branch. See [Caveats](#caveats) for the providers that support pull requests.

## Input files (optional)

Input files are the files you want to commit. Each input source comes from either a package or a Git repository. You can't use inline content as an input file.

For each input source, specify:

- The package or Git repository to take files from.
- **Input file paths**, one or more glob patterns that select the files to copy.
- **Destination subfolder**, the subfolder, under the destination path, to copy the matched files into.

:::div{.info}
Octopus copies matched files flat into the destination subfolder, so the directory structure of the source isn't preserved. If you need a nested layout in the destination, add a separate input source for each target subfolder.
:::

## Script (optional)

You can run a single script during the step, for example to transform your input files before Octopus commits them. The script can be Bash, PowerShell, C#, or Python, and you can source it inline, from a package, or from a Git repository.

- For package and Git repository scripts, you can pass parameters and reference other packages as dependencies. Inline scripts don't support parameters.
- The script runs from the standard Calamari working directory, with the cloned destination repository available to it. Octopus exposes the path to the repository through the `Octopus.Calamari.Git.RepositoryPath` variable, which points to the root of the repository so your script can read and modify files before the commit.

## Step verification

Step verification controls how Octopus decides the step succeeded. There are 2 options.

:::figure
![The step verification options in the process editor](/docs/img/deployments/git/commit-to-git/commit-to-git-step-verification.png)
:::

### Direct commit or pull request created

Octopus confirms the changes were committed to Git, then completes the step without any further checks.

### Pull request merged

Octopus pauses the deployment until all the pull requests created by the step are merged. For environments that commit directly, Octopus doesn't wait.

Octopus reviews this status once every 60 seconds. While the task is paused, the deployment doesn't count toward your task cap.

## What happens during deployment

When you deploy a release with a Commit to Git step, Octopus:

- Clones the destination repository on the worker.
- Copies the configured input files into their destination subfolders.
- Runs your script, if you configured one.
- Commits the changed files, and either pushes them to the target branch or opens a pull request, based on the commit method for the environment.
- Waits until the pull requests are merged before completing, if step verification is set to pull request merged.

## Output variables

The step creates [output variables](/docs/projects/variables/output-variables) you can use in later steps. Each is empty if no pull request was created.

| Variable name                  | Content                                                          |
| ------------------------------ | ---------------------------------------------------------------- |
| CommitToGit.PullRequest.Title  | The title of the pull request created by the step.               |
| CommitToGit.PullRequest.Number | The identifier of the pull request in your Git repository.   |
| CommitToGit.PullRequest.Url     | The URL of the pull request created by the step.                |
| CommitToGit.PullRequest.RepositoryUrl | The URL of the repository the pull request was created in. |

## Learn more

- [Git credentials](/docs/infrastructure/git-credentials)
- [Output variables](/docs/projects/variables/output-variables)
- [Sensitive variables](/docs/projects/variables/sensitive-variables)
