---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-09-05
title: Uptime SLO
navTitle: Uptime SLO
navOrder: 70
description: Information about Octopus Cloud's uptime SLO, including the last 12 month's historical uptime data
---

Each Octopus Cloud customer has their own Octopus Server delivered as a highly available, scalable, secure SaaS application hosted for you. Octopus Deploy manages maintenance and resource provisioning for these hosted servers, letting our customers focus on happy deployments.  

Octopus Cloud's monthly uptime SLO is 99.99%.  

We calculate uptime as 100% of the month, less all unplanned downtime.  

Planned maintenance is a key benefit of Octopus Cloud and is scheduled in advance, so we exclude it from our uptime SLO calculation. Other than in exceptional circumstances, planned maintenance occurs during the customer’s [maintenance window](/docs/octopus-cloud/maintenance-window).

In the 9 months ending February 2025, Octopus Cloud customers averaged fewer than 9 minutes of downtime per week, including all scheduled maintenance.

## Uptime Track Record

This table lists Octopus Cloud's monthly uptime statistics for the last 12 months.  

We list our achieved uptime percentage and weekly unplanned downtime duration. We also show these data points including planned maintenance. Data points measured at 95th percentile of all paid subscriptions.

| Month  | Uptime % | Weekly unplanned downtime | Uptime % incl. planned maintenance | Weekly downtime incl. planned maintenance |
| :----- | ------: | ------: | ------: | ------: |
| August 2025 | 99.9989% | 7s | 99.9281% | 441s |
| July 2025 | 99.9992% | 7s | 99.9207% | 483s |
| June 2025 | 99.9974% | 21s | 99.9307% | 420s |
| May 2025 | 100% | 0s | 99.9125% | 532s |
| April 2025 | 99.9925% | 49s | 99.9479% | 315s |
| March 2025 | 99.9809% | 119s | 99.9292% | 434s |
| February 2025 | 100% | 0s | 99.9212% | 483s |
| January 2025 | 99.9924% | 49s | 99.9397% | 371s |
| December 2024 | 100% | 0s | 99.9666% | 203s |
| November 2024 | 100% | 0s | 99.8895% | 672s |
| October 2024 | 99.9973% | 21s | 99.917% | 504s |
| September 2024 | 99.9977% | 14s | 99.9165% | 511s |
| August 2024 | 99.9955% | 28s | 99.8978% | 623s |

### How we calculate uptime

We calculate uptime as 100% minus the percentage of unplanned downtime seconds out of the total seconds in a calendar month. We measure all data points at the 95th percentile of all paid subscriptions (95% of customers experienced the listed measurement *or better*).

We exclude downtime that arises from planned or customer-requested maintenance from our uptime SLO calculation, but we measure and report it separately for transparency.

Some Octopus Cloud customers use [dynamic workers](/docs/infrastructure/workers/dynamic-worker-pools). As the name implies, these workers are dynamically assigned to a cloud instance and are spun up and down as required by the Deployment or Runbook executed. We exclude Dynamic Workers from our calculation of uptime.

**“Downtime”** means a period where the customer instance is unavailable, according to Octopus Deploy's internal and external monitoring systems.

**"Weekly unplanned downtime"** is shown as seconds per week. We use the month's total unplanned downtime duration measured at the 95th percentile of all paid subscriptions to calculate a weekly average duration. It excludes planned and customer-requested maintenance.

**"Weekly downtime incl. planned maintenance"** is shown as seconds per week. We use the month's total downtime duration measured at the 95th percentile of all paid subscriptions to calculate a weekly average duration. It includes unplanned downtime, as well as downtime arising from planned and customer-requested maintenance.
