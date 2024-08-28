---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-27
title: Space Level Insights
icon: fa-solid fa-chart-pie
description: Space level insights
navOrder: 140
---

Space level insights provide actionable DORA metrics for more complex scenarios across projects, project groups, environments, or tenants. This enables managers and decision-makers to get far more insight into the DevOps performance of their organization in line with their business context, such as team, portfolio, or platform.

:::div{.info}

Space level insights requires an [enterprise subscription](https://octopus.com/pricing).
:::

To get started with space level insights, choose the **Insights** item from the navigation menu. From there you can create one or more reports.

We recommend creating separate reports for each purpose. Typically a report would be configured in one of the following ways:
- One project or a small set of closely related projects and all the relevant environments
- Many projects and only similar environments (e.g. Production-like environments)

If there are many unrelated projects and environments in a report, it will be hard to see any trends.

## Settings

### Time zone

The time zone of a report affects which day's data is counted when aggregating. The time zone should be chosen to reflect the most
common understanding of what constitutes "midnight" for the team.

### Release selection

The releases that contribute to the report are determined via the channel that they belong to. The channel is used instead of the project itself to avoid pre-release and prior-version channels from skewing the data for the main release.

The included channels can be specified via the three fields:

- **Project Groups** - The default channels of all projects in those groups are included
- **Projects** - The default channels of those projects are included
- **Channels** - The selected channels are included.

There must be at least one channel selected, directly or indirectly, for the report to generate data. If a channel exists multiple times in the selection, it will not be double counted. 

### Environments

Environment groups are a way to logically group environments so that they can be reported on together. In this section, create a group for each logical group of environments and then add the relevant environments to the group. By doing this you are able to compare the data between these groups using the split function. There must be at least one environment group containing one environment for the report to generate data.

For example, the environment group "Production" may contain the environments "Production US", "Production EU" and "Disaster Recovery".

### Tenants

If the current space has tenants, there will be an additional section to select tenants. This selection works similar to other areas of the application. First select whether you want to include untenanted data, tenanted data or both. If you select tenanted, specify the tenants directly, or choose them via tags.

## Charts

On the Overview page, a chart is shown for each [metric](/docs/insights/metrics). On each of the metric detail pages, the same chart is shown along with a breakdown of the trends and lists of the data viewed from different angles.

The top left drop down allows you to split the data on a particular dimension and compare them on the one chart. Only the first 10 lines are shown. If splitting by tenant tag set, a tenant's data will be shown for each of their tags.

The top right allows you to change the time range and granularity of the chart.

The data is real time and based on the deployment completion time.

See the [trend indicators](/docs/insights/trend-indicators) section for more details on the trend indicator and trend tables on each page.


## Tables

Below the chart on the single metric pages are various tables showing a more detailed view of the data.

For each of projects, environments and tenants, a list of [trends](/docs/insights/trend-indicators) may be shown. The list is only shown if there are at least two of that item present in the data. The list shows the top 10 of that dimension where the trend for the metric is up or down.

Below that there are tables showing a particular measure grouped by project, environment and tenant combination. These give you a starting point when investigating how to improve a metric.

## Permissions

Permissions are available to help you manage access to Insights reports. You can limit your team's ability to view, edit, delete and create Insights reports by customizing the roles. 

:::div{.warning}
By creating a report, permission to view the aggregated data is granted to anyone with the `InsightsReportView` permission. Someone who has restricted view permissions will be able to see the aggregated data but not the name of the object.
:::

The permissions are:

| Permission           | Description            |
| -------------------- | ---------------------- |
| InsightsReportView   | You can view Insights reports. |
| InsightsReportEdit   | You can edit Insights reports, including changing the report's project groups, projects, and environment groups. |
| InsightsReportDelete | You can delete Insights reports. |
| InsightsReportCreate | You can create Insights reports. |

There is a built-in role to for users who create reports:

| Role                    | Description            |
| ----------------------- | ---------------------- |
| Insights report manager | Insights report managers can view, edit, create, and delete Insights reports.  They can also view environments, project groups, projects, tenants, and deployment processes and channels. These view permissions are necessary to see the Insights report data. |

By default, built-in roles also include these permissions:

| Permission           | Roles            |
| -------------------- | ---------------------- |
| InsightsReportView   | Project initiator, Project contributor, Project lead, Project deployer, Project viewer, Release creator, Deployment creator, Build server |
| InsightsReportEdit   | Project initiator, Project contributor, Project lead, Project deployer |
| InsightsReportDelete | Project initiator |
| InsightsReportCreate | Project initiator |

For more information on how to do this, please see [creating user roles](https://octopus.com/docs/security/users-and-teams/user-roles#UserRoles-CreatingUserRoles).