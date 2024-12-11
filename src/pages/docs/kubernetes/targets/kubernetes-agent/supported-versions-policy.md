---
layout: src/layouts/Default.astro
pubDate: 2024-12-11
modDate: 2024-12-11
title: Support Policy for Kubernetes Versions
navTitle: Supported Versions Policy
navSection: Kubernetes agent
description: Policy for which versions of Kubernetes are supported by the Kubernetes agent
navOrder: 100
---

[The Kubernetes project](https://kubernetes.io/releases/version-skew-policy/#supported-versions) maintains release branches for the most recent three minor releases of Kubernetes.

Octopus aims to follow this support policy as closely as makes sense.

## Kubernetes Agent

The Kubernetes agent uses the [Kubernetes C# client](https://github.com/kubernetes-client/csharp) to interact with the Kubernetes API, so we are bound to their release cadence. The Kubernetes agent will receive an update within **3 months** of a new major release of the Kubernetes C# client being released.

If your use case requires the latest and greatest version of Kubernetes before we have released a new version, please [contact support](https://octopus.com/company/contact) to discuss options.