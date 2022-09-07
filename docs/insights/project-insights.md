---
title: Project Insights
description: Project level insights are available as a new tab in every project so you can understand the performance of your projects across Channels, Environments, and Tenants.
position: 130
---

## Charts

The charts give an aggregated view of the deployment data for the chosen filter.

Project level insights can be filtered by Channel, Environment and/or Tenant.

You can also change the time range of the dataset. This allows you to see trends over different periods of time. This is especially useful for projects that only have a limited number of deployments.

The channel filter will only appear if there are multiple channels configured for the project and defaults to the default project channel.

The tenant filter will only appear if the project is scoped to tenants. It has an option for each tenant, as well as options for all tenants, untenanted deployments, and both all tenanted and untenanted deployments.

## Tenant trends

The tenant trend lists only appear in certain situations.

The project must have tenanted deployments enabled and be scoped to at least one tenant. It must also have had enough tenanted deployments over the past eight weeks to draw a trend.

If this criteria is met, two lists will be rendered. These lists will be specific to the metric page you are on. They show the tenants that have trended up or down in the last 28 days compared with the previous 28 days.

The first 10 in descending order by the percentage difference between the current and previous value are shown.
