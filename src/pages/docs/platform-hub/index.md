---
layout: src/layouts/Default.astro
pubDate: 2025-09-11
modDate: 2025-11-20
title: Platform Hub
subtitle: An overview of Platform Hub
icon: fa-solid fa-landmark
navTitle: Overview
navSection: Platform Hub
description: Platform Hub is a new capability in Octopus that helps platform teams standardize how software is delivered across teams using connected templates and enforceable policies. Together, these features create a governance layer for software delivery, making it easier for platform teams to scale best practices, reduce drift, and deliver with confidence.
navOrder: 32
---

[Platform Hub](https://octopus.com/blog/introducing-platform-hub) is a new capability in Octopus that helps platform teams standardize how software is delivered across teams using connected templates and enforceable policies. Together, these features create a governance layer for software delivery, making it easier for platform teams to scale best practices, reduce drift, and deliver with confidence.

You can create and manage your process templates and policies from Platform Hub.

- [Process templates](/docs/platform-hub/process-templates) are reusable sets of deployment steps that can be shared across multiple spaces in Octopus Deploy
- [Policies](/docs/platform-hub/policies) in Octopus are designed to ensure compliance and governance by default, making enforcing pre- and post-deployment controls at scale easier.

To get started, configure your version control.

:::figure
![The overview page for Platform Hub](/docs/img/platform-hub/platform-hub-overview.png)
:::

:::div{.hint}
This Git repository will be used for all features in Platform Hub.
:::

### Accounts in Platform Hub

You can create and manage accounts in Platform Hub that can be used inside process templates.

You can create the following account types by visiting the **Accounts** area in Platform Hub.

- AWS Accounts
- Azure Accounts
- Google Cloud Account
- Username/Password
- Generic OIDC

To use these accounts inside a process template, you must create a parameter that references these accounts first.

:::figure
![Accounts in Platform Hub](/docs/img/platform-hub/platform-hub-accounts.png)
:::

### Git Credentials in Platform Hub

You can create and manage Git credentials in Platform Hub by visiting the Git credentials area in the Platform Hub navigation menu. You can use Git credentials inside your process templates by selecting them from a dropdown in the step field that requires them.

:::figure
![Platform Hub Git credentials area](/docs/img/platform-hub/platform-hub-git-credential.png)
:::