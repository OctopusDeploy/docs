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

### Username/Password

If you specify a username and password/personal access token then Octopus will retrieve issue descriptions when viewing package details and when creating releases. 

### Release Note Prefix

Once you've specified a username/password, if you also specify a release note prefix the Octopus extension will look through the issue comments for one that starts with that prefix. If it finds one it will use the text following the prefix as the `WorkItemLink.Description`. If you leave this field blank, or a comment starting with the prefix isn't found, the issue's title will be used for the `WorkItemLink.Description`.

## Commit Messages

The parsing of the commit messages is based on the GitHub concepts around [closing issues using keywords](https://help.github.com/en/articles/closing-issues-using-keywords).

The Octopus extension looks for these same keywords, and ignores issue references where the keywords are not also present.
