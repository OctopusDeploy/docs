---
title: Node on *Nix
description: This guide covers how to package and deploy a Node.js application to a Linux deployment target over a SSH connection.
position: 120
---

As Octopus Deploy expands its capabilities beyond the standard Microsoft world, its easier than ever to deploy non .Net projects to non Windows platforms. From **Octopus 3.3** onwards you are able to package up your projects using [other formats in addition to the current NuGet style](/docs/packaging-applications/supported-packages.md).

In this guide we will go through the process of packaging up a Node.js project into a tarball and deploying to a Linux based target over a SSH connection. Any part of this guide can be attempted on its own in conjunction with other project or target types, however this aims to provide an end-to-end example of one particular set up. Please note that these pages are not intended as an "ultimate guide to Linux" and are only an introductory guide to show how you can quickly get started today with a simple deployment scenario.
