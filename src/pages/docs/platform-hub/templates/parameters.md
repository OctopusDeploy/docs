---
layout: src/layouts/Default.astro
pubDate: 2026-03-05
modDate: 2026-03-06
title: Template parameters
subtitle: A reference for parameters in Platform Hub templates
icon: fa-solid fa-layer-group
navTitle: Parameters
navSection: Templates
description: A reference for parameters in Platform Hub templates
navOrder: 145
---

## Overview

Parameters make it easy to reuse the same template across projects while tailoring the inputs to each project's needs. Rather than hardcoding values that differ between teams or spaces, you expose them as parameters that each project supplies.

For process templates, parameters are supplied at the process template usage step level and applied during deployment or runbook runs. For project templates, parameters are set when configuring the project and define the values the template requires, such as accounts, worker pools, and target tags.

Templates can manage the following as parameters:

- AWS Account
- Azure Account
- Certificate
- Channels
- Checkbox
- Container Feed
- Dropdown
- Environments
- Generic OIDC Account
- Google Cloud Account
- Multi-line text box
- Sensitive/password box
- Single-line text box
- Target Tags
- Teams
- Tenant Tags
- Username Password Account
- Worker Pool
- Package
- Project
- A previous step name

To create a parameter, navigate to the **Parameters** tab on a template and add a new parameter.

## Parameter values

You can set an optional default value for these parameters:

- Single-line text
- Multi-line text
- Dropdown
- Checkbox
- Sensitive/password box (process templates only)
- AWS Account
- Azure Account
- Generic OIDC Account
- Google Cloud Account
- Username Password Account

You cannot set a default value for these parameters, they must be set inside a project:

- Certificate
- Worker Pool
- Package
- A previous step name
- Target Tags
- Teams
- Tenant Tags
- Environments
- Container Feed
- Channels
- Project

## Template-specific behavior

Some parameter behavior differs between template types.

:::div{.hint}
**Process templates** support sensitive parameter defaults and account parameter scoping. For more information, see [Process template parameters](/docs/platform-hub/templates/process-templates#parameters).
:::

:::div{.hint}
**Project templates** do not support parameter scoping or sensitive parameter values in the Alpha release. The following parameter types are not available for project templates: Multi-line text, Dropdown, Checkbox, and Sensitive/password box. For more information, see [Project template parameters](/docs/platform-hub/templates/project-templates#parameters).
:::
