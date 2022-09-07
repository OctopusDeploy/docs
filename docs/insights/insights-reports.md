---
title: Insights Reports
description: Space level insights
position: 140
---

Insights Reports provide actionable DORA metrics for more complex scenarios across projects, project groups, environments, or tenants.

## Settings

You must select at least one project and one environment group before a report can be generated.

Selecting a Project Group will include all projects in that group in the report. You can select a combination of project groups and single projects.

Environment groups are unique to Insights Reports. They are a way to logically group environments. For example, if you have multiple production environments, you would create a Production group and include those environments.

Tenants are optional. You have the ability to select single tenants or Tenant Tags. Selecting a tag will include all of the tenants with that tag in your report.

You can give your report a name, description and logo. You can either upload an image or use the icon picker.

## Projects

- You can select both project groups and single projects
- Any intersecting projects will only be included once

## Environments
- Environment groups must have a unique name
- An environment can only exist in one group

## Tenants
The tenant selection works like it does in other sections of Octopus:

- There is a multi-select for Tenants
- There is a multi-select for each Tenant Tag Set

Any tenants with the selected tags will be included in the report

## Charts

The time range select for reports works the same as it does for project level insights.

## Splits

You can split the data by project, environment, environment group, tenant, or tag set.

## Permissions

Permissions are available to help you manage access to Insights reports, these include:

| Permission           | Description            |
| -------------------- | ---------------------- |
| InsightsReportView   | You can view Insights reports. |
| InsightsReportEdit   | You can edit Insights reports, including changing the report's project groups, projects, and environment groups. |
| InsightsReportDelete | You can delete Insights reports. |
| InsightsReportCreate | You can create Insights reports. |

You can limit your team’s ability to view, edit, delete and create Insights reports by disabling these permissions.

There is a role we include out-of-the-box to encapsulate these new permissions:

| Role                    | Description            |
| ----------------------- | ---------------------- |
| Insights report manager | Insights report managers can view, edit, create, and delete Insights reports.  They can also view environments, project groups, projects, tenants, and deployment processes and channels. These view permissions are necessary to see the Insights report data. |

By default, some other built-in roles also include Insights report permissions:

| Permission           | Roles            |
| -------------------- | ---------------------- |
| InsightsReportView   | Project initiator, Project contributor, Project lead, Project deployer, Project viewer, Release creator, Deployment creator, Build server |
| InsightsReportEdit   | Project initiator, Project contributor, Project lead, Project deployer |
| InsightsReportDelete | Project initiator |
| InsightsReportCreate | Project initiator |

If you do not have view permissions for any given project/environment/tenant, you will still be able to see the aggregated data that includes them, however their names will be hidden.

If you don’t like that these roles include these permissions, then you should create custom roles catered to your specific needs.

:::success
For more information on how to do this, please see [creating user roles](https://octopus.com/docs/security/users-and-teams/user-roles#UserRoles-CreatingUserRoles).
:::