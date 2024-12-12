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

### Support for older versions

Each time the Kubernetes agent is updated to support a new version of Kubernetes, support for older versions will be dropped in line with the Kubernetes project's supported versions. Historically, the APIs in use have been stable and the Kubernetes agent has remained compatible with older version of Kubernetes, however we can make no guarantees of this in the future.

We strongly recommend leaving automatic Kubernetes agent updates enabled and keeping your Kubernetes cluster up to date in line with the latest support version. If you must maintain support for older versions, you can configure how the Kubernetes agent is automatically updated with [machine policies](/docs/infrastructure/deployment-targets/machine-policies#configure-machine-updates).