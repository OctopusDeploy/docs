---
layout: src/layouts/Default.astro
pubDate: 2024-04-29
modDate: 2024-07-31
title: Kubernetes Monitor
description: How to manage the Kubernetes Monitor component
navOrder: 30
---

The Kubernetes Monitor is a component that runs alongside Tentacle in the cluster. The Kubernetes Monitor tracks the health of resources deployed to the cluster via Octopus Server. 

## How it works
It communicates with Octopus Server over gRPC on a new port (8443) to send back live status.

## Troubleshooting