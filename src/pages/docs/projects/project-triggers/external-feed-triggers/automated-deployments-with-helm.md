---
layout: src/layouts/Default.astro
pubDate: 2024-04-22
modDate: 2024-04-22
title: Automated deployments with Helm
description: Replace me
navOrder: 12
---

Once written, many Helm charts change infrequently with the exception of changing the image tag as updates to the application are made.

Use variable image tags in your Helm charts to keep application image updates out of your infrastructure definitions. Add an external feed trigger to automatically create a release and deploy it to select environments whenever any of your chosen application images is updated.
