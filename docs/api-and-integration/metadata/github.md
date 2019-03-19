---
title: GitHub integration
description: Configuring Octopus integration for GitHub.
---

Integration to GitHub allows Octopus to correctly resolve issue links that are received in the custom metadata from the build server.

## Settings

The GitHub extension only requires 1 configuration value, the base Url. 

This is required when resolving issue references that cross repo boundaries. For example you might have a commit message with the following in it

```
Fix bug with X

Resolves MyOrg/SomeOtherRepo#1234
```

So the issue it is referring to is part of a repo that is separate to where the commit is happening.

The value will default to https://github.org.