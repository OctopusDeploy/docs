---
title: CSV download
description: Download your data as a CSV
position: 150
---

A CSV of the deployments and associated Insights data can be downloaded via the **DOWNLOAD CSV** link underneath the chart
on each of the single metric pages. 

On the project pages, the last 12 months of data that matches the channel, environment and tenant filter is returned.

On the Insights report pages, the last 12 months of data that matches the selection in the report settings is returned. Note that
any deployments that you do not have permission to view are omitted.

The same data is available in JSON format via an API call.

:::warning
The columns included and their order may vary in the future, particularly during the EAP period. Please take this into account if ingesting the file into an automated process.
:::

The CSV contains the following columns

| Column                     | Description |
| -------------------------- | ----------- |
| Deployment                 | The id of the deployment. |
| Project                    | The name of the project.  |
| Release                    | The release which was deployed. |
| Channel                    | The channel for the deployment. |
| Completed                  | When the deployment completed. |
| Environment                | The environment the release was deployed to. |
| Tenant                     | The tenant the release was deployed to. |
| State                      | Indicates the success or failure of the deployment. |
| Had Guided Failure         | Whether or not the deployment had a guided failure. |
| Lead Time                  | The lead time of the deployment, in hours, minutes, and seconds. |
| Lead Time Calculated From  | The version of the release containing the earliest change included in the deployment. |
| Since Previous Successful  | The time period since the previous successful deployment, in hours, minutes, and seconds. |
| Previous Successful        | The id of the previous successful deployment. |
| Time to Recovery           | The period of time taken to recover from one or more failed deployments, until this deployment (if successful), in hours, minutes, and seconds|
| Deployments Until Recovery | Number of attempted deployments until this deployment occurred (if successful). |
| Recovery From              | The first failed deployment in a series of one or more failed deployments. | 
| Recovery From Version      | The first version which had a failed deployment in a series of one or more failed deployments. |
