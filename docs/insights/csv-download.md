---
title: CSV download
description: Download your data as a CSV
position: 150
---

| Column                     | Description |
| -------------------------- | ----------- |
| Deployment                 | The id of the deployment. |
| Project                    | The name of the project.  |
| Release                    | The release which was deployed. |
| Channel                    | The channel for the deployment. |
| Completed                  | When the deployment completed. |
| Environment                | The environment of the release was deployed to. |
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