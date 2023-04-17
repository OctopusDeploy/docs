---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Project Insights
description: Project level insights are available as a new tab in every project so you can understand the performance of your projects across channels, environments, and tenants.
navOrder: 130
---

Project level insights allow a team to quickly understand the performance of their project. It is available from the project side menu. Beyond what is available on each page, it cannot be configured further.

The timezone of the viewer is used when generating the charts. Viewers in different timezones may see slightly different results.

## Charts

On the Overview page, a chart is shown for each [metric](/docs/insights/metrics/). On each of the metric detail pages, the same chart is shown along with a breakdown of the trends and lists of the data viewed from different angles.

The top left drop downs allow you to choose which channel, environment and tenant to view data for. The channel drop down is only shown if there is more than one channel. The tenant drop down is only shown if the project is tenanted.

The channel filter will only appear if the project has more than one channel. It defaults to the default channel.

The environment filter will default to the last environment in the channel's lifecycle.

The tenant filter will only appear if tenanted deployments is enabled for the project.

The data is real time and based on the deployment completion time.

See the [trend indicators](/docs/insights/trend-indicators/) section for more details on the trend indicator and trend tables on each page.

## Detail

Below the chart on the single metric pages are various tables showing more detailed view of the data.

For tenanted projects there is a list of the top 10 tenants whose [trend](/docs/insights/trend-indicators/) for that metric is up or down.

Below that are tables of deployments relevant to that metric. These give you a starting point when investigating how to improve a metric.
