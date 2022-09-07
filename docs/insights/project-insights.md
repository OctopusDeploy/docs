---
title: Project Insights
description: Project level insights
position: 130
---

## Charts

Project level insights can be filtered by Channel, Environment and/or Tenant.

The Channel filter will only appear if there are multiple channels configured for the project and will default to the default project channel.

The Tenant filter will only appear if the project is scoped to tenants. It has an option for each tenant, as well as the following three options:

- All tenants and untenanted
- Untenanted
- All Tenants

These options group all of the deployments together and show an aggregated view of the data.

You can also change the time range of the dataset. This allows you to see trends over different periods of time. This is especially useful for projects that only have a limited number of deployments.

## Tenant trends

The tenant trend lists only appear within project level insights in certain situations. Firstly, the project must have tenanted deployments enabled and be scoped to at least one tenant. Secondly, the project must have had enough tenanted deployments over the past eight weeks to draw a trend.

If this criteria is met, two lists will be rendered. These lists will be specific to the metric page you are on. They show the tenants that have trended up or down in the last 28 days compared with the previous 28 days.

The first 10 in descending order by the percentage difference between the current and previous value are shown.
