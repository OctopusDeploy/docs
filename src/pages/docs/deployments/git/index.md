---
layout: src/layouts/Default.astro
pubDate: 2026-06-03
modDate: 2026-06-03
title: Git
description: Built-in steps for committing packages and files to a Git repository as part of your deployment process.
icon: fa-brands fa-git-alt
navOrder: 90
hideInThisSectionHeader: true
---

Octopus includes built-in steps that commit packages and files to a Git repository as part of your deployment process. These steps let you write deployment artifacts back to Git, so you can drive GitOps workflows and keep a versioned history of what you deploy.

- [Commit to Git](/docs/deployments/git/commit-to-git) copies files from packages and other Git repositories into a target repository, optionally transforms them with a script, and commits the result directly or through a pull request.
