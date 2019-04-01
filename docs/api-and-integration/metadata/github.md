---
title: GitHub Issue Tracking Integration
description: Configuring GitHub issue tracking with Octopus.
---

Integration with GitHub allows Octopus to display links to Github issues for work items received from your build server.

## Settings

The GitHub extension only requires the base Url configuration value, which defaults to https://github.org.

This is required when resolving issue references that cross repo boundaries. For example, you might have a commit message with the following content:

```
Fix bug with X

Resolves MyOrg/SomeOtherRepo#1234
```

`MyOrg/SomeOtherRepo#1234` refers to issue \#1234 in the `SomeOtherRepo` repository belonging to the `MyOrg` organization. While not all that common, this syntax is used when issues are tracked in a separate repo to the commit that resolves the issue.

## Commit Messages

The parsing of the commit messages occurs on the build server, in the build server plugin, and is based on the GitHub concepts around [closing issues using keywords](https://help.github.com/en/articles/closing-issues-using-keywords).

The build plugins look for these same keywords and pass work item details to Octopus when found.
