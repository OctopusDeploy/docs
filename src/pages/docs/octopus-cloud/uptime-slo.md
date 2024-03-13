---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Octopus Cloud Uptime SLO
navOrder: 50
description: The uptime SLO for Octopus Cloud instances
---

Each Octopus Cloud customer has their own instance of the Octopus Server and can use [dynamic workers](/docs/infrastructure/workers/dynamic-worker-pools). As the name implies, these workers are assigned to a cloud instance dynamically and are spun up and down as required by the Deployment or Runbook executed. The following uptime SLO (service level objective), therefore, refers to the customer's Cloud instance.

Each customer's instance may experience its own series of maintenance operations and reprovisioning for operational and upgrade reasons. Therefore the 95th percentile of monthly uptime is used as the basis for the Octopus Cloud uptime SLO. Operational downtime is, other than in exceptional circumstances, scheduled in the customer's [maintenance window](/docs/octopus-cloud/#set-the-outage-window). All downtime (unplanned and planned) is used in the determination of the uptime SLO.

## Uptime SLO
Monthly uptime SLO: 99.5%

**“Monthly uptime of an instance”** means 100% minus the percentage of downtime (planned and unplanned) minutes out of the total minutes in a calendar month.

**“Downtime of an instance”** means a period of time where the customer instance is unavailable according to Octopus Deploy's internal and external monitoring systems.

**Basis:** 95th percentile of the monthly average of paid subscriptions (95% of customers would be above 99.5%). Included in the downtime is any planned downtime during the customer's maintenance window.
