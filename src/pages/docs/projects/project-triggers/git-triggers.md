---
layout: src/layouts/Default.astro
pubDate: 2024-11-05
modDate: 2025-05-13
title: Git repository triggers
description: Git repository triggers allow you to automatically create a new release when a new commit is pushed to a Git repository.
navOrder: 16
icon: fa-brands fa-git-alt
---

Git repository triggers allow you to automatically create a new release when a new commit is pushed to a Git repository.

## Getting started

Navigate to your project and click **Triggers**. Click **Add Trigger** on the right-hand side of the page, and select **Git repository**.

Enter a name and description for your trigger.

## Channels and lifecycles

:::div{.hint}
Git repository triggers create releases based on the default branch in version controlled projects
:::

If your project contains multiple [channels](/docs/releases/channels), you have the option of selecting which channel this trigger will apply to. The releases created by the trigger will use this channel.

The versions used for those releases is guided by [release versioning](/docs/releases/release-versioning) under **Settings**. They will use the rules defined there.

A preview of the [lifecycle](/docs/releases/lifecycles) used by the selected channel is displayed. By clicking the link you can modify the [lifecycle's phases](/docs/releases/lifecycles/#Lifecycles-LifecyclePhases) to have a release created and deployed to selected environments whenever a new commit is pushed to the monitored repository.

## Trigger sources

Git repositories referenced in your project's deployment process can be selected to be monitored by the trigger to create releases.

Please note that for [version control](/docs/projects/version-control/version-control-reference) enabled projects, only steps that reference Git repositories in the deployment process from the **default branch** are able to be referenced. Any changes to the deployment process in other branches will not be available for use in git triggers.

:::figure
![Repository selection](/docs/projects/project-triggers/images/git-triggers/git-triggers-repository-selection.png)
:::

### File path filters

When selecting a repository to monitor you will be provided with the option to add file path filters. These filters allow you to specify file paths to include or exclude from the monitoring of new commits.

:::figure
![File path filters](/docs/projects/project-triggers/images/git-triggers/git-triggers-file-path-filters.png)
:::

- If no file path filters are specified, all commits to the monitored repository will trigger the creation of a new release. 
- If file paths are set to be included, only changes to those file paths will be monitored, all other file paths will be excluded.
- If file paths are set to be excluded, changes to those file paths will not be monitored, all other file paths will be included.

The file path filters support glob patterns and can include the following wildcard characters:

| **Character** | **Description**                           | **Example**                                                                                                                        |
|---------------|-------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| `*`           | Matches multiple characters except `/`    | File path pattern of `source/*` will match the file path `source/data` but not `source/data/pages`                                 |
| `**`          | Matches multiple characters including `/` | File path pattern of `source/**` will match the file paths `source/data` and `source/data/pages`                                   |
| `?`           | Matches a single character                | File path pattern of `api/v?` will match a file path of `api/v1` but not `api/v1.1`                                                |
| `[0-9]`       | Matches a single character in the range   | File path pattern of `source/docs/version/[0-9]` will match the file path `source/docs/version/1` but not `source/docs/version/10` |
| `[abc]`       | Matches a single character from the set   | File path pattern of `docs/[abc]*` will match the file path `docs/credits` but not `docs/references`                               |

## History

The history section contains information about the last time the trigger was evaluated and the last release that was created by the trigger. Triggers are evaluated every three minutes and the results will be reported here.

- Outcome: Was any action taken, or if there was an error during processing.
- Reason: Additional information about the outcome.
- Last executed at: The time the task was run.
- Discovered commits: The branch and commit hash that were found in this execution.

If the trigger has created a release, a link to the created release will be shown alongside the date it was created.

:::figure
![History](/docs/projects/project-triggers/images/git-triggers/git-triggers-history.png)
:::
