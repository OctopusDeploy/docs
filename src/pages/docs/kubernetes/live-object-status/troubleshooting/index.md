---
layout: src/layouts/Default.astro
pubDate: 2025-03-28
modDate: 2025-03-28
navTitle: Troubleshooting
title: Troubleshooting
navSection: Troubleshooting
description: How to troubleshoot common Kubernetes Live Object Status issues
navOrder: 70
---

This page will help you diagnose and solve issues with Kubernetes Live Object Status.

## Installation Issues

### The Kubernetes Monitor can't connect gRPC port 8443

Some firewalls may prevent the applications from making outbound connections over non-standard ports. If this is preventing the Kubernetes Monitor from connecting to your Octopus Server, configure your environment to allow outbound connections.