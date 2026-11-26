---
layout: src/layouts/Default.astro
pubDate: 2026-03-06
modDate: 2026-11-26
title: Publishing and sharing templates
subtitle: How to save, publish, and share templates in Platform Hub
icon: fa-solid fa-layer-group
navTitle: Publishing and sharing
navSection: Templates
description: How to save, publish, and share templates in Platform Hub
navOrder: 147
---

## Saving a template

Once you've finished making changes, commit them to save to your Git repository. You can either **Commit** with a description or quick commit without one.

:::figure
![The commit experience for a template](/docs/img/platform-hub/process-templates-commit-experience.png)
:::

## Publishing a template

After committing your changes, publish the template to make them available. You have three options when publishing:

- **Major** changes (breaking)
- **Minor** changes (non-breaking)
- **Patch** (bug fixes)

You can also publish a pre-release version to test the template before promoting it.

:::div{.hint}
The first time you publish a template, you can only publish a major or pre-release version.
:::

Selecting any option increments the version number following [Semantic Versioning](https://semver.org). For minor or patch updates, projects that accept these changes will automatically upgrade to the newly published version.

:::figure
![The publish experience for a template](/docs/img/platform-hub/process-templates-publishing.png)
:::

### Pre-releases

If you want to test your changes before publishing a major, minor, or patch version, you can mark a template as a pre-release version.

:::figure
![Marking a template as pre-release](/docs/img/platform-hub/process-template-prerelease.png)
:::

## Sharing a template

You must share a template before any space can use it. Templates can be shared with all current and future spaces, or with a select few.

:::div{.hint}
Sharing settings can be updated at any time.
:::

:::figure
![The sharing experience for a template](/docs/img/platform-hub/process-template-sharing.png)
:::

### What spaces can see

:::div{.warning}
Treat any resource a shared template uses as visible to every space it's shared with.
:::

A template uses a Platform Hub resource, such as an account, certificate, feed, or Git credential, when one of its variables, parameters, or steps refers to it. The same applies to the template's own variables and parameters.

In some cases, any project in a space you share the template with can use these resources, such as in deployments, runbooks, and Git triggers. This applies to every project in the space, not just projects created from the template.

Before you share a template:

- Check which resources it uses.
- Share it only with spaces you trust, not with all spaces.

Check again each time you publish a new version.