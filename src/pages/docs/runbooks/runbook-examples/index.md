---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Runbooks examples
description: Examples of using Runbooks to streamline and automate your routine and emergency operations tasks using Octopus Deploy.
navOrder: 50
---

When software is in production and customers rely on it, operations teams quickly find themselves needing to support that software with procedures to ensure things stay running smoothly.

It could be:

- **Routine operations** tasks that happen infrequently. For example:
  - Patching a server.
  - Stopping a website.
  - Renewing SSL certificates.

- **Emergency operations** tasks that you have to respond to quickly following an alert. For example:
  - Failing over to a disaster recovery site.
  - Restart a server.

- **Infrastructure provisioning** tasks that are used with an [elastic or transient](/docs/deployments/patterns/elastic-and-transient-environments/) environment. For example:
  - Deploying an AWS CloudFormation template.
  - Deploying an Azure ARM template.

These procedures can all be automated with [runbooks](/docs/runbooks/). 
