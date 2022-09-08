---
title: Space Level Insights
description: Space level insights
position: 140
---

Space level insights provide actionable DORA metrics for more complex scenarios across projects, project groups, environments, or tenants. This enables managers and decision-makers to get far more insight into the DevOps performance of their organization in line with their business context, such as team, portfolio, or platform.

:::Information
Space level sights requires and [enterprise subscription](https://octopus.com/enterprise). Contact your Octopus sales for a trial.
:::

To get started with space level insights choose the `Insights` item from the top Menu. From there you can create one or more reports.

We recommend creating a separate reports for each purpose. Typically a report would be configured in one of the following ways:
- One project or a small set of closely related project and all the relevant environments
- Many projects and only similar environments (e.g. Production-like environments)

If there are many unrelated projects and environments in a report, it will be hard to see any trends.

## Settings

### Projects

Projects can be added to a report either by adding a project group, or individual projects. If a selected project already exists in a 
selected group, it will not be double counted. There must be at least one project selected, directly or indirectly, for the report to generate data.

### Environments

Environment groups are a way to logically group environments so that they can be reported on together. In this section, create a group for each logical group of environment and then add the relevant environments to the group. By doing this you are able to compare the data between these groups using the split function. There must be at least one environment group with one environment for the report to generate data.

For example, the environment group "Production" may contain the environments "Production US", "Production EU" and "Disaster Recovery".

### Tenants

If the current space has Tenants, there will be an additional section to select tenants. This selection works similar to other areas of the application. First select whether you want to include untenanted data, tenanted data or both. If you select tenanted, specify the tenants directly, or choose them via tags.

## Charts

On the Overview page, a chart is shown for each [metric](metrics.md). On each of the metric detail pages, the same chart is shown along with a breakdown of the trends and lists of the data viewed from different angles.

The top left drop down allows you to split the data on a particular dimension and compare them on the one chart. Only the first 10 lines are shown. If splitting by tenant tag set, a tenant's data will be shown for each of their tags.

The top right allows you to change the time range and granularity of the chart.

See the [trend indicators](trend-indicators.md) section for more details on the trend indicator and trend tables on each page.


## Permissions

Permissions are available to help you manage access to Insights reports. You can limit your team’s ability to view, edit, delete and create Insights reports by customizing the roles. During the EAP period, the whole feature may be disabled via the `Configuration -> Features` page.

:::warning
By creating a report, permission to view the aggregated data is granted to anyone with the `InsightsReportView` permission. Someone  who has restricted view permissions will be able to see the aggregated data but not the name of the object.
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