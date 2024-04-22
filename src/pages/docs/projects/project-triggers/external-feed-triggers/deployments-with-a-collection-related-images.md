---
layout: src/layouts/Default.astro
pubDate: 2024-04-22
modDate: 2024-04-22
title: Deployments with a collection of related images
description: Replace me
navOrder: 12
---

Often microservices are more tightly coupled than we'd like and that means certain versions of many images need to be deployed in a single operation.

External feed triggers check for updates periodically which means they can result in unexpected behavior if these images aren't published at exactly the same time.

In cases like this, we recommend to setup the external feed trigger to watch the image that is known to be published after all the other images are. If that's not an option available for your use case, we have [extensions and plugins available for the most popular build servers](/docs/packaging-applications/build-servers/) that allow you to have full control over when your deployments are sent out.
