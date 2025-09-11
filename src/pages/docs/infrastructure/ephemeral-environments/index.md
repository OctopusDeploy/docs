---
layout: src/layouts/Default.astro
pubDate: 2025-09-08
modDate: 2025-09-08
title: Ephemeral Environments
navTitle: Ephemeral Environments
navSection: Ephemeral Environments
description: Gain confidence in your changes with Ephemeral environments in Octopus.
navOrder: 41
---

Ephemeral environments in Octopus Deploy allow to you automatically create test environments on-demand to gain confidence in your changes while helping to keep your infrastructure costs down.

:::div{.hint}
Support for Ephemeral Environments is rolling out as an Early Access Preview to Octopus Cloud.
:::

Ephemeral environments are designed to be created and removed as part of testing changes within the development lifecycle.

[Releases](/docs/releases) can be deployed to in the same way as long-lived environments such as **Staging** or **Production**, and provide additional capabilities to provision and deprovision infrastructure associated with the environment using [Runbooks](/docs/runbooks).

## Getting started

Ephemeral environments are configured within Projects, see the [Getting Started](/docs/projects/ephemeral-environments) guide.

## Scoping variables, deployment targets and accounts

In order to support scoping of variables and access to deployment targets and accounts, an ephemeral environment is associated with a **Parent Environment**.

Parent environments are configured alongside existing environments in the Octopus Web Portal. They cannot be used in lifecycles or deployed to, instead they are only used for scoping and access for ephemeral environments.

Parent environments can be selected alongside existing environments in the following areas:

- Deployment targets
- Accounts
- Certificates
- Variable sets
- Project variables
- User roles assigned to teams.
