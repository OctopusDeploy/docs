---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Reporting
description: Octopus reporting makes it easy to produce reports over your deployment history, using your preferred reporting tools.
navOrder: 80
---

The reporting feature makes it easy to produce reports over your deployment history, using your preferred reporting tools.

Currently Octopus doesn't display this reporting data in the user interface anywhere, but we do expose raw data that you can query or consume in your favorite reporting tools. Hopefully, you'll be able to import this data, combine it with data from other sources, and slice and dice it in ways that make the most sense to you.

Raw data is provided in two ways:

- As an XML feed, which can be consumed by tools like Microsoft Excel or PowerBI (preferred), or programmatically. We have a blog on how to do this using [PowerBI](https://octopus.com/blog/powerbi-report-for-octopus-deploy).
- As a table in the Octopus SQL database.

The data allows you to report on questions like:

- How many deployments have we done, over what period? For which projects or environments?
- How many deployments were successful? How many failed?
- How long do deployments take on average?

If you're using Octopus Cloud, you will only be able to work with the API for your Reporting needs, and if you're using Octopus Server on-premises or in the Cloud you will be able to use all approaches mentioned in the Reporting section.

## Learn more

- [Reporting blog posts](https://octopus.com/blog/tag/reporting)
