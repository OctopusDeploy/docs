---
layout: src/layouts/Default.astro
pubDate: 2025-07-17
title: Using process templates in a project
navTitle: Using Process Templates
description: How to use a process template in a project

---

Once your process template is created, published, and shared, you can consume it into a project's deployment process or runbook.

To add a template:

- Click **Add Step**
- Click **Add Process Template**
- Select the Process Template you want from the dropdown menu

## Template Overview

When you first add a process template to your deployment process or runbook you will be taken to the template overview screen. This contains important information about:

- The name of the template
- The versioning settings that determine what updates you receive
- The parameters that you have to fill out

You can also choose to consume the pre-release version of the template if available.

## Versioning settings

You can select the types of updates you want to receive for your process template.

- Minor updates
- Patch updates

Minor updates will automatically update your template if the process template gets published with a minor or patch update.

Patch updates will automatically update your template if the process template gets published with a patch update

Major updates will always have to be accepted manually.

## Process templates parameters

To tailor the process template to the project that it's in, you must fill in the parameters attached to the process template.

You can:

- Choose to use the default value if one is present
- Pass in a project variable
- Choose the resource in your space (for example, Worker Pools)

:::warning
Some parameters won't appear in a Process Template even though they've been configured inside Platform Hub:

- Tenant parameters won't appear if the consuming project is untenanted
- Channel parameters won't appear if the the template is being used in a Runbook
- Worker Pool parameters won't appear if the space has no Worker Pools

:::
