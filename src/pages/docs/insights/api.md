---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: API
description: The Insights API
navOrder: 160
---

:::div{.warning}
The DevOps Insights feature is still in development.  You can use this API; however, please keep in mind that it could change at anytime.
:::

## Insights Reports API

### Get a list of Insights reports
GET: `/api/{spaceId}/insights/reports`
Returns a paginated list of the Insights reports in the supplied Octopus Deploy space.

#### Parameters
| Name | Description |
| ---- | ----------- |
| spaceId | Id of the space |
| skip | Number of items to skip. Defaults to zero |
| take | Number of items to take (i.e. the page size). Defaults to 30 |

#### Sample response
```json
{
  "ItemType": "InsightsReport",
  "TotalResults": 2,
  "ItemsPerPage": 30,
  "NumberOfPages": 1,
  "LastPageNumber": 0,
  "Items": [
    {
      "Id": "InsightsReports-1",
      "SpaceId": "Spaces-1",
      "Name": "High Volume Report",
      "Description": "High volume tenanted deployments report",
      "ProjectGroupIds": ["ProjectGroups-1", "ProjectGroups-2"],
      "ProjectIds": ["Projects-1", "Projects-2"],
      "TenantIds": ["Tenants-1", "Tenants-2", "Tenants-3"],
      "TenantTags": [
        "Deployment Group/Group A",
        "Deployment Group/Group B",
        "Deployment Group/Group C",
        "Location/Australia",
        "Location/Asia",
        "Location/Europe",
        "Location/US"
      ],
      "TenantMode": "TenantedAndUntenanted",
      "EnvironmentGroups": [
        {
          "Name": "Test",
          "Environments": ["Environments-1", "Environments-2"]
        },
        {
          "Name": "Internal",
          "Environments": ["Environments-3", "Environments-4"]
        },
        {
          "Name": "Production",
          "Environments": ["Environments-5", "Environments-6"]
        }
      ],
      "TimeZone": "UTC",
      "IconId": "map-signs",
      "IconColor": "#3CA4F3",
      "Links": {
        "Self": "/api/Spaces-1/insights/reports/InsightsReports-1",
        "Logo": "/api/Spaces-1/insights/reports/InsightsReports-1/logo"
      }
    }
  ],
  "Links": {
    "Self": "/api/Spaces-1/insights/reports?skip=0&take=30",
    "Template": "/api/Spaces-1/insights/reports{?skip,take}",
    "Page.All": "/api/Spaces-1/insights/reports?skip=0&take=2147483647",
    "Page.Current": "/api/Spaces-1/insights/reports?skip=0&take=30",
    "Page.Last": "/api/Spaces-1/insights/reports?skip=0&take=30"
  }
}
```

#### Properties
| Property | Description |
| -------- | ----------- |
| ItemType | The type of resource - for Insights Reports, this will always be  "InsightsReport” |
| TotalResults | The total number of reports |
| ItemsPerPage | The number of reports per page |
| NumberOfPages | The total number of pages |
| LastPageNumber | The number of the last page of reports, counting from zero |
| Items | An array of the reports returned for the current page.  See the section [Get a specific Insights Report](#get-a-specific-insights-report) for details of the report structure |
| Links | Links to other resources.  See REST API Links https://octopus.com/docs/octopus-rest-api#api-links |


### Create an Insights report
POST: `/api/{spaceId}/insights/reports`
Create a new Insights report.

#### Parameters
| Name | Description |
| ---- | ----------- |
| spaceId | Id of the space | 

#### Request Body
The request body is in JSON format.

#### Sample request
```json
{
    "SpaceId": "Spaces-1",
    "Name": "High Volume Report",
    "Description": "High volume tenanted deployments report",
    "ProjectGroupIds": ["ProjectGroups-1", "ProjectGroups-2"],
    "ProjectIds": ["Projects-1", "Projects-2"],
    "TenantIds": ["Tenants-1", "Tenants-2", "Tenants-3"],
    "TenantTags": [
      "Deployment Group/Group A",
      "Deployment Group/Group B",
      "Deployment Group/Group C",
      "Location/Australia",
      "Location/Asia",
      "Location/Europe",
      "Location/US"
    ],
    "TenantMode": "TenantedAndUntenanted",
    "EnvironmentGroups": [
      {
        "Name": "Test",
        "Environments": ["Environments-1", "Environments-2"]
      },
      {
        "Name": "Internal",
        "Environments": ["Environments-3", "Environments-4"]
      },
      {
        "Name": "Production",
        "Environments": ["Environments-5", "Environments-6"]
      }
    ],
    "TimeZone": "UTC"
}
```

#### Properties
| Property |  | Description |
| -------- | -------- | ----------- |
| SpaceId  | Required | The id of the space to contain the report | 
| Name     | Required | The name of the report | 
| Description | Optional | The description of the report | 
| ProjectGroupIds | Optional | An array of the project group ids to be included in the report | 
| ProjectIds | Optional | An array of the project ids to be included in the report | 
| TenantIds  | Optional | An array of the tenant ids to be  included in the report | 
| TenantTags | Optional | An array of the tenant tags  to be associated with this report | 
| TenantMode | Optional | Indicates what types of deployments will be contributing to this report. May be TenantedAndUntenanted, Tenanted, or Untenanted | 
| EnvironmentGroups | Optional | An array of the environment groups to be  included in this report.  See below for details | 
| TimeZone | Optional | The timezone to be used in the report. Must be either a Windows or IANA (Tzdb) timezone |

#### EnvironmentGroups Properties
| Property |  | Description |
| -------- | -------- | ----------- |
| Name | Required | The name of the environment group.  Must be unique per report |
| Environments | Required | An array of the ids of the environments to include in the group |


### Get a specific Insights report
GET: `/api/{spaceId}/insights/reports/{reportId}`
Retrieves an existing Insights report.

#### Parameters
| Name | Description |
| ---- | ----------- |
| spaceId | Id of the space containing the report |
| reportId | Id of the report to retrieve |

#### Sample response
```json
{
  "Id": "InsightsReports-1",
  "SpaceId": "Spaces-1",
  "Name": "High Volume Report",
  "Description": "High volume tenanted deployments report",
  "ProjectGroupIds": ["ProjectGroups-1", "ProjectGroups-2"],
  "ProjectIds": ["Projects-1", "Projects-2"],
  "TenantIds": ["Tenants-1", "Tenants-2", "Tenants-3"],
  "TenantTags": [
    "Deployment Group/Group A",
    "Deployment Group/Group B",
    "Deployment Group/Group C",
    "Location/Australia",
    "Location/Asia",
    "Location/Europe",
    "Location/US"
  ],
  "TenantMode": "TenantedAndUntenanted",
  "EnvironmentGroups": [
    {
      "Name": "Test",
      "Environments": ["Environments-1", "Environments-2"]
    },
    {
      "Name": "Internal",
      "Environments": ["Environments-3", "Environments-4"]
    },
    {
      "Name": "Production",
      "Environments": ["Environments-5", "Environments-6"]
    }
  ],
  "TimeZone": "UTC",
  "IconId": null,
  "IconColor": null,
  "Links": {
    "Self": "/api/Spaces-1/insights/reports/InsightsReports-1",
    "Logo": "/api/Spaces-1/insights/reports/InsightsReports-1/logo"
  }
}
```

#### Properties
| Property | Description |
| -------- | ----------- |
| Id       | The id of the Insights report | 
| SpaceId  | The id of the space containing the report |
| Name     | The name of the report | 
| Description     | The description of the report | 
| ProjectGroupIds | An array of the project group ids included in the report | 
| ProjectIds | An array of the project ids included in the report | 
| TenantIds  | An array of the tenant ids included in the report | 
| TenantTags | An array of the tenant tags associated with this report | 
| TenantMode | Indicates what types of deployments contributed to this report. May be TenantedAndUntenanted, Tenanted, or Untenanted |
| EnvironmentGroups | An array of the environment groups included in this report | 
| TimeZone  | The timezone used in the report, in Windows timezone format | 
| IconId    | A [Font Awesome](https://fontawesome.com) icon name | 
| IconColor | The icon color in hex format (example: '#0D80D8') | 
| Links     | Links to other resources.  See [REST API Links](https://octopus.com/docs/octopus-rest-api#api-links) |

### Update an Insights report
PUT: `/api/{spaceId}/insights/reports/{reportId}`
Updates an existing Insights report.

#### Parameters
| Name | Description |
| ---- | ----------- |
| spaceId  | Id of the space containing the report |
| reportId | The id of the Insights report to update |

#### Request Body
The request body is in JSON format.

#### Sample request
```json
{
    "SpaceId": "Spaces-1",
    "Id": "InsightsReports-1",
    "Name": "High Volume Report",
    "Description": "High volume tenanted deployments report",
    "ProjectGroupIds": ["ProjectGroups-1", "ProjectGroups-2"],
    "ProjectIds": ["Projects-1", "Projects-2"],
    "TenantIds": ["Tenants-1", "Tenants-2", "Tenants-3"],
    "TenantTags": [
      "Deployment Group/Group A",
      "Deployment Group/Group B",
      "Deployment Group/Group C",
      "Location/Australia",
      "Location/Asia",
      "Location/Europe",
      "Location/US"
    ],
    "TenantMode": "TenantedAndUntenanted",
    "EnvironmentGroups": [
      {
        "Name": "Test",
        "Environments": ["Environments-1", "Environments-2"]
      },
      {
        "Name": "Internal",
        "Environments": ["Environments-3", "Environments-4"]
      },
      {
        "Name": "Production",
        "Environments": ["Environments-5", "Environments-6"]
      }
    ],
    "TimeZone": "UTC"
}
```

#### Properties
| Property | Required | Description |
| -------- | -------- | ----------- |
| SpaceId  | Required | The id of the space containing the report. | 
| Id       | Required | The id of the report to be updated. | 
| Name     | Required | The name of the report. | 
| Description | Optional | The description of the report. | 
| ProjectGroupIds | Optional | An array of the project group ids to be included in the report. | 
| ProjectIds | Optional | An array of the project ids to be included in the report. | 
| TenantIds  | Optional | An array of the tenant ids to be  included in the report. | 
| TenantTags | Optional | An array of the tenant tags  to be associated with this report. | 
| TenantMode | Optional | Indicates what types of deployments will be contributing to this report. May be TenantedAndUntenanted, Tenanted, or Untenanted. | 
| EnvironmentGroups | Optional | An array of the environment groups to be  included in this report. | 
| TimeZone | Optional | The timezone to be used in the report. Must be either a Windows or IANA (Tzdb) timezone. | 

### Delete an Insights report
DELETE: `/api/{spaceId}/insights/reports/{reportId}`
Deletes an existing Insights report.

#### Parameters
| Name | Description |
| ---- | ----------- |
| spaceId  | Id of the space containing the report |
| reportId | The id of the Insights report to delete |

### Get deployment level insights metrics
GET: `/api/{spaceId}/insights/reports/{reportId}/deployments`
Returns the streams of deployments for the given report. A stream is a sequence of deployments used to calculate metrics. Includes all the deployments with their Insights metrics for the last 12 whole months and this month, for the specified report.

#### Parameters
| Name | Description |
| ---- | ----------- |
| spaceId  | Id of the space containing the report |
| reportId | The id of the Insights report for which to retrieve details |

#### Sample response
```json
{
  "ReportName": "High Volume Report",
  "Streams": [
    {
      "ProjectId": "Projects-1",
      "ProjectName": "My Project 1",
      "ChannelId": "Channels-1",
      "ChannelName": "My Channel 1",
      "EnvironmentId": "Environments-1",
      "EnvironmentName": "Test Environment",
      "TenantId": "Tenants-1",
      "TenantName": "Australia East",
      "Deployments": [
        {
          "Id": "Deployments-1",
          "ReleaseVersion": "2022.3.1",
          "TaskState": "Success",
          "CompletedTime": "2022-08-18T14:28:15.9395818Z",
          "HadGuidedFailure": false,
          "LeadTime": "1:12:39.41517",
          "LeadTimeCalculatedFromVersion": "2022.3.0",
          "TimeSincePreviouslySuccessfulDeployment": null,
          "PreviousSuccessfulDeploymentId": null,
          "TimeToRecovery": null,
          "DeploymentsUntilRecovery": null,
          "RecoveredFromFailedDeploymentId": null,
          "RecoveredFromFailedReleaseVersion": null
        },
        {
          "Id": "Deployments-2",
          "ReleaseVersion": "2022.3.1",
          "TaskState": "Success",
          "CompletedTime": "2022-08-18T15:28:15.9395818Z",
          "HadGuidedFailure": false,
          "LeadTime": "0:01:00.0",
          "LeadTimeCalculatedFromVersion": "2022.3.1",
          "TimeSincePreviouslySuccessfulDeployment": "0:01:00.0",
          "PreviousSuccessfulDeploymentId": "Deployments-1",
          "TimeToRecovery": null,
          "DeploymentsUntilRecovery": null,
          "RecoveredFromFailedDeploymentId": null,
          "RecoveredFromFailedReleaseVersion": null
        }
      ]
    }
  ]
}
```

#### Properties
| Property | Description |
| -------- | ----------- |
| ReportName | The name of the report |
| Streams | An array of streams.  A stream is a sequence of deployments used to calculate metrics |

#### Streams properties
| Property | Description |
| -------- | ----------- |
| ProjectId   | The id of the project for this stream. | 
| ProjectName | The name of the project for this stream.  Will be null if you don't have access to this project. | 
| ChannelId   | The id of the channel for this stream. | 
| ChannelName | The name of the channel for this stream.  Will be null if you don't have access to this channel. | 
| EnvironmentId   | The id of the environment for this stream. | 
| EnvironmentName | The name of the environment for this stream.  Will be null if you don't have access to this environment. | 
| TenantId    | The id of the tenant for this stream. | 
| TenantName  | The name of the tenant for this stream.  Will be null if you don't have access to this tenant. | 
| Deployments | An array of the deployments in this stream.  | Deployments belong to the same stream if they have the same project, channel, environment and tenant. | 

#### Deployments properties
| Property | Description |
| -------- | ----------- |
| Id | The id of the deployment. | 
| ReleaseVersion | The version of the release that was deployed.  | 
| TaskState | Indicates the state of the deployment task. | 
| CompletedTime | When the deployment completed. | 
| HadGuidedFailure | Whether or not the deployment had a guided failure. | 
| LeadTime | The lead time of the deployment. | 
| LeadTimeCalculatedFromVersion | The version of the release containing the earliest change included in the deployment. |
| TimeSincePreviouslySuccessfulDeployment | The time period since the previous successful deployment. | 
| PreviousSuccessfulDeploymentId | The id of the previous successful deployment. | 
| TimeToRecovery | The period of time taken to recover from one or more failed deployments, until this deployment (if successful). | 
| DeploymentsUntilRecovery | Number of attempted deployments until this deployment occurred (if successful). | 
| RecoveredFromFailedDeploymentId | The id of the first failed deployment in a series of one or more failed deployments. | 
| RecoveredFromFailedReleaseVersion | The first version which had a failed deployment in a series of one or more failed deployments. |  | 


### Get deployment level aggregated insights metrics
GET: `/api/{spaceId}/insights/reports/{reportId}/metrics`


#### Parameters
| Name | Description |
| ---- | ----------- |
| spaceId  | Id of the space containing the report. | 
| reportId | The id of the Insights report to retrieve details for. | 
| split    | How to split the metrics.  Should be 'None', 'Project', 'ProjectGroup', 'Environment', 'EnvironmentGroup', 'Tenant', 'TenantTagSet'. | 
| tenantTagSetId | If TenantTagSet is chosen for Split, this is required, otherwise it is ignored. It is the tag set to split on. | 
| timeRange   | The time period to get data for. Should be 'LastMonth', 'LastQuarter', or 'LastYear' | 
| granularity | The data grouping granularity, defaults to weekly if not supplied.  Should be 'Monthly', 'Weekly', or 'Daily'. | 

#### Sample response
```json
{
  "Series": [
    {
      "Name": "All",
      "Intervals": [
        {
          "StartOfInterval": "2022-06-05",
          "NumberOfSuccessfulDeployments": 247,
          "LeadTime": {
            "Count": 243,
            "Mean": "-2:32:31.0",
            "Median": "3:17:51.0",
            "Min": "-426:53:44.0",
            "Max": "93:32:33.0",
            "NinetyFifth": "28:15:32.0"
          },
          "DeploymentFailureRate": {
            "Successful": 247,
            "DeploymentFailure": 8,
            "SuccessfulButHadGuidedFailure": 0,
            "Total": 255,
            "Failed": 8,
            "Rate": 0.03137
          },
          "TimeSincePreviousDeployment": {
            "Count": 241,
            "Mean": "2:12:32.0",
            "Median": "1:21:56.0",
            "Min": "0:10:00.0",
            "Max": "12:40:01.0",
            "NinetyFifth": "7:29:43.0"
          },
          "MeanTimeToRecovery": {
            "Count": 8,
            "Mean": "5:26:50.0",
            "Median": "2:17:17.0",
            "Min": "0:41:12.0",
            "Max": "17:11:09.0",
            "NinetyFifth": "14:55:01.0"
          },
          "DeploymentsUntilRecovery": {
            "Count": 8,
            "Mean": 1.0,
            "Median": 1.0,
            "Min": 1.0,
            "Max": 1.0,
            "NinetyFifth": 1.0
          }
        }
      ]
    }
  ]
}
```

#### Properties
| Property | Description |
| -------- | ----------- |
| Series   | An array of the series returned, each containing the values for the split provided   |

#### Series Properties
| Property | Description |
| -------- | ----------- |
| Name     |  The name of the series.  If no split is provided, this will be 'All'  |
| Intervals |  An array of the time periods containing the data returned |

#### LeadTime, TimeSincePreviousDeployment, MeanTimeToRecovery and DeploymentsUntilRecovery Properties
| Property | Description |
| -------- | ----------- |
| Count    | The number of deployments aggregated in the current metric for the interval | 
| Mean     | The mean value for the current metric for the interval | 
| Median   | The median value for the current metric for the interval  | 
| Min      | The minimum value for the current metric for the interval  | 
| Max      | The maximum value for the current metric for the interval  | 
| NinetyFifth | The 95th percentile value for the current metric for the interval  | 

#### DeploymentFailureRate Properties
| Property | Description |
| -------- | ----------- |
| Successful | The number of successful deployments for the interval | 
| DeploymentFailure | The number of deployments with failures | 
| SuccessfulButHadGuidedFailure | The number of deployments which succeeded, but only with guided failures | 
| Total    | The total number of deployments for the interval | 
| Failed   | The number of failed deployments for the interval | 
| Rate     | The percentage of failed deployments to successful deployments for the interval | 
