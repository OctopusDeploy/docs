---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-10-04
title: Upgrading a modern version of Octopus
description: Everything you need to know about upgrading a modern version of Octopus.
navOrder: 1
---

A modern version of Octopus Deploy is any version running on SQL Server.  When Octopus Deploy was originally introduced, it ran on RavenDB.  Octopus Deploy 3.x migrated from RavenDB to Microsoft SQL Server.  This section contains guides to covering various use cases you might encounter when upgrading a modern version of Octopus Deploy.

## Upgrade scenarios

The default upgrade scenario is an in-place upgrade.  Thousands of customers upgrade every month without errors.  However, no upgrade process is ever 100% error-free 100% of the time.  The typical errors we see are:

- Compatability Errors: Upgrading to a new version isn't supported by a license limitation, host OS version deprecation or SQL Server version deprecation.
- Hyper-specific use cases: Windows runs a specific version of Windows without a random patch of .NET Framework installed.
- Breaking changes introduced in the product: we do our best to minimize these, but they can happen.  For example, Octopus Deploy 2019.1.0 introduced spaces and how teams and roles were assigned.  Any API scripts manipulating teams had to be updated.

Please choose from one of five common upgrade scenarios:

- [Upgrading minor and patch releases](/docs/administration/upgrading/guide/upgrading-minor-and-patch-releases)
- [Upgrading major releases](/docs/administration/upgrading/guide/upgrading-major-releases)
- [Upgrading from Octopus 4.x or 2018.x to latest version](/docs/administration/upgrading/guide/upgrading-from-octopus-4.x-2018.x-to-modern)
- [Upgrading from Octopus 3.x to latest version](/docs/administration/upgrading/guide/upgrading-from-octopus-3.x-to-modern)
- [Upgrading host OS or .NET version](/docs/administration/upgrading/guide/upgrade-host-os-or-net)

## Mitigating risk

The best way to mitigate risk is to automate the upgrade and/or creating a test instance.  Automation ensures all steps, including backups, are followed for every upgrade.  A test instance allows you to test out upgrades and new features without affecting your main instance.

- [Automating upgrades](/docs/administration/upgrading/guide/automate-upgrades)
- [Create a test instance](/docs/administration/upgrading/guide/creating-test-instance)
