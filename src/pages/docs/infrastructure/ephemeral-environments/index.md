---
layout: src/layouts/Default.astro
pubDate: 2025-09-08
modDate: 2026-07-22
title: Ephemeral Environments
navTitle: Ephemeral Environments
navSection: Ephemeral Environments
description: Gain confidence in your changes with Ephemeral environments in Octopus.
navOrder: 41
---

Ephemeral environments in Octopus Deploy allow you to automatically create test environments on-demand to gain confidence in your changes while helping to keep your infrastructure costs down.

Ephemeral environments are designed to be created and removed as part of testing changes within the development lifecycle.

[Releases](/docs/releases) can be deployed to ephemeral environments in the same way as long-lived environments such as **Staging** or **Production**. Additional infrastructure associated with the environment can be provisioned and deprovisioned using [Runbooks](/docs/runbooks).

## Getting started

Ephemeral environments are configured within Projects, see the [Getting Started](/docs/projects/ephemeral-environments) guide.

## Scoping variables, deployment targets and accounts

Ephemeral environments will be created and removed regularly as part of testing changes. To avoid requiring ongoing configuration of variables, deployment targets and accounts, ephemeral environments inherit configuration from a **Parent Environment**.

Parent environments are configured alongside existing long-lived environments in the Octopus Web Portal but have key differences:

- Parent environments cannot be used in lifecycles.
- Parent environments cannot be deployed to.

Parent environments can be selected alongside existing long-lived environments in the following areas of Octopus:

- Deployment targets
- Accounts
- Certificates
- Variable sets
- Project variables
- User roles assigned to teams

## Availability

Ephemeral environments are available to all cloud and self-hosted customers from version `2025.4`.
