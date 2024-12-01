---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-11-21
title: Octopus Cloud Uptime SLO
navOrder: 50
description: The uptime SLO for Octopus Cloud instances
---

Each Octopus Cloud customer has their own Octopus Server delivered as a highly available, scalable, secure SaaS application hosted for you. Octopus Deploy manages maintenance and resource provisioning for these hosted servers, letting our customers focus on happy deployments. 

Octopus Cloud's monthly uptime SLO is 99.99%. 

We calculate uptime as 100% of the month, less all unplanned downtime. 

Planned maintenance is a key benefit of Octopus Cloud and is scheduled in advance, so we exclude it from our uptime SLO calculation. Other than in exceptional circumstances, planned maintenance occurs during the customer’s [maintenance window](/docs/octopus-cloud/maintenance-window). In the 4 months ending October 2024, planned maintenance averaged fewer than 8 minutes of downtime per week. 

## Uptime Track Record

This table lists Octopus Cloud's monthly uptime statistics for the last 12 months. 

We list our achieved uptime percentage and the average amount of unplanned downtime for each month. We also show these data points including planned maintenance.

| Month  | Uptime % | Average weekly unplanned downtime | Uptime % incl. planned maintenance | Average weekly downtime incl. planned maintenance |
| :----- | ------: | ------: |------: | ------: |
| November 2024 | 100% | 2s | 99.8895% | 446s |
| October 2024 | 99.9973% | 5s | 99.917% | 309s |
| September 2024 | 99.9977% | 4s | 99.9165% | 313s |
| August 2024 | 99.9955% | 8s | 99.8978% | 447s |
| July 2024 | 99.9978% | 6s | 99.8602% | 616s |
| June 2024 | 99.9931% | 9s | 99.9196% | * 279s |
| May 2024 | 99.9976% | 11s |- | - |
| April 2024 | 99.9687% | 17s |- | - |
| March 2024 | 99.9914% | 10s |- | - |
| February 2024 | 100% | 2s |- | - |
| January 2024 | 99.9976% | 3s |- | - |
| December 2023 | 99.998% | 5s |- | - |

\* We began capturing planned downtime metrics on June 10, 2024.

### How we calculate uptime

We calculate uptime as 100% minus the percentage of unplanned downtime seconds out of the total seconds in a calendar month. We measure uptime performance at the 95th percentile of all paid subscriptions (95% of customers experienced at minimum the listed uptime %).

We exclude downtime that arises from planned or customer-requested maintenance from our uptime SLO calculation, but we measure and report it for transparency. 
Some Octopus Cloud customers use [dynamic workers](/docs/infrastructure/workers/dynamic-worker-pools). As the name implies, these workers are dynamically assigned to a cloud instance and are spun up and down as required by the Deployment or Runbook executed. We exclude Dynamic Workers from our calculation of uptime.

**“Downtime”** means a period where the customer instance is unavailable, according to Octopus Deploy's internal and external monitoring systems.

**"Average weekly unplanned downtime"** is measured in seconds per week, as an arithmetic mean across all paid customers. It excludes planned maintenance and customer-requested maintenance.

**"Average weekly downtime incl. planned maintenance"** is measured in seconds per week, as an arithmetic mean across all paid customers. It includes planned maintenance and customer-requested maintenance.

