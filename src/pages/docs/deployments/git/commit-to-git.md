---
layout: src/layouts/Default.astro
pubDate: 2026-06-03
modDate: 2026-06-03
title: Commit to Git
description: Commit packages and files to a Git repository as part of your deployment process.
navOrder: 10
---

The **Commit to Git** step commits packages and files to a Git repository as part of your deployment process. You can copy files from packages and other Git repositories into a target repository, optionally transform them with a script, and then commit the changes directly or through a pull request.

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

- **Authentication** select the [Git credential](/docs/infrastructure/git-credentials) to authenticate with the destination repository. See [Caveats](#caveats) for the credential types you can use.
- **Repository URL** the HTTPS URL of the destination repository.
- **Branch** the branch to commit to. This defaults to `main`.
- **Destination path** the path, relative to the root of the repository, where Octopus copies your input files. Leave it blank to use the root of the repository.

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

:::div{.warning}
When an input file path includes a wildcard, Octopus removes the fixed part of the path before the first wildcard when it works out where to place each matched file. For example, with the input file path `config/app/*.yaml`, the file `config/app/settings.yaml` is copied to `settings.yaml` in the destination subfolder.
:::

:::div{.warning}
The input file paths are relative to the root of the input source, and the destination subfolder is relative to the destination path you set for the target repository. Both must be relative paths rather than absolute, and you can use [variables](/docs/projects/variables) to define them.
:::

## Script (optional)

You can run a single script during the step, for example to transform your input files before Octopus commits them. Octopus runs the script after it copies your input sources into the repository, so the script can work with those files before they're committed. The script can be Bash, PowerShell, C#, or Python, and you can source it inline, from a package, or from a Git repository.

- For package and Git repository scripts, you can pass parameters and reference other packages as dependencies. Inline scripts don't support parameters.
- The script runs from the standard Calamari working directory, with the cloned destination repository available to it. Octopus exposes the path to the repository through the `Octopus.Calamari.Git.RepositoryPath` variable, which points to the root of the repository so your script can read and modify files before the commit.

For example, the following scripts write a release marker into the repository before Octopus commits it:

<details data-group="deployments-git-commit-to-git-script">
<summary>PowerShell</summary>

```powershell PowerShell
# Get the path to the cloned repository
$repoPath = $OctopusParameters["Octopus.Calamari.Git.RepositoryPath"]

# Write a file that will be included in the commit
"Released #{Octopus.Release.Number} to #{Octopus.Environment.Name}" | Out-File -FilePath "$repoPath/release-marker.txt"
```

</details>
<details data-group="deployments-git-commit-to-git-script">
<summary>C#</summary>

```csharp C#
// Get the path to the cloned repository
var repoPath = OctopusParameters["Octopus.Calamari.Git.RepositoryPath"];

// Write a file that will be included in the commit
System.IO.File.WriteAllText(System.IO.Path.Combine(repoPath, "release-marker.txt"), "Released #{Octopus.Release.Number} to #{Octopus.Environment.Name}");
```

</details>
<details data-group="deployments-git-commit-to-git-script">
<summary>Bash</summary>

```bash Bash
# Get the path to the cloned repository
repo_path=$(get_octopusvariable "Octopus.Calamari.Git.RepositoryPath")

# Write a file that will be included in the commit
echo "Released #{Octopus.Release.Number} to #{Octopus.Environment.Name}" > "$repo_path/release-marker.txt"
```

</details>
<details data-group="deployments-git-commit-to-git-script">
<summary>Python</summary>

```python Python
# Get the path to the cloned repository
repo_path = get_octopusvariable("Octopus.Calamari.Git.RepositoryPath")

# Write a file that will be included in the commit
with open(f"{repo_path}/release-marker.txt", "w") as marker:
    marker.write("Released #{Octopus.Release.Number} to #{Octopus.Environment.Name}")
```

</details>

## Step verification

Step verification controls how Octopus decides the step succeeded. There are 2 options.

:::figure
![The step verification options in the process editor](/docs/img/deployments/git/commit-to-git/commit-to-git-step-verification.png)
:::

### Direct commit

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

The step creates [output variables](/docs/projects/variables/output-variables) you can use in later steps. The pull request variables are empty if the step didn't create a pull request.

| Variable name                         | Content                                                    |
| ------------------------------------- | ---------------------------------------------------------- |
| CommitToGit.PullRequest.Title         | The title of the pull request created by the step.         |
| CommitToGit.PullRequest.Number        | The identifier of the pull request in your Git repository. |
| CommitToGit.PullRequest.Url           | The URL of the pull request created by the step.           |
| CommitToGit.PullRequest.RepositoryUrl | The URL of the repository the pull request was created in. |
| CommitToGit.CommitSha                 | The SHA of the commit applied to the target branch.        |

### Referencing the commit SHA

The Commit to Git step doesn't always create the final commit itself. When the step waits for a pull request to be merged, a separate action creates the final commit, so the `CommitToGit.CommitSha` output variable is stored against that action rather than the step.

To read the SHA reliably, first get the name of the action that created the final commit from the `Octopus.Action[<your step name>].Git.CommitDetailsActionName` variable, where `<your step name>` is the name you gave your Commit to Git step. Then use that name to look up the SHA:

```text
#{Octopus.Action[#{Octopus.Action[<your step name>].Git.CommitDetailsActionName}].Output.CommitToGit.CommitSha}
```

## Learn more

- [Git credentials](/docs/infrastructure/git-credentials)
- [Output variables](/docs/projects/variables/output-variables)
- [Sensitive variables](/docs/projects/variables/sensitive-variables)
