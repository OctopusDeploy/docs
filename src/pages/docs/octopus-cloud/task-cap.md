---
layout: src/layouts/Default.astro
pubDate: 2023-10-13
modDate: 2023-10-13
title: Octopus Cloud Task Cap
navOrder: 60
description: How to increase the task cap on an Octopus Cloud Instance.
---

Every Octopus Deploy instance has a task cap.  The task cap is the number of concurrent tasks an instance can run.  A task can be:

- Deployments
- Runbook run
- Retention Policies
- Health Checks
- Let’s Encrypt
- Process triggers
- Process subscriptions
- Script console run
- Sync built-in package repository
- Sync community library step-templates
- Tentacle upgrade
- Upgrade calamari
- Active Directory sync

The most common tasks are deployments and runbook runs.

The default task cap for Octopus Cloud instances is based on the license tier:
- Community: 5
- Professional: 5
- Enterprise: 20

## Increasing the Task Cap
Self-hosted customers can change their instance's task cap via the Octopus Deploy UI.  That is because self-hosted customers take on the responsibility of hosting their instance and allocating resources.  They pay any additional hosting fees to their cloud providers.  

Octopus Cloud provides the following Task Cap options:
- Community: 5
- Professional: 5, 10, 20
- Enterprise: 20, 40, 80, 160

**Please note:** If you need a task cap higher than 160 please reach out to sales@octopus.com to discuss your use case.  These options are meant to cover the majority of use cases.  

Deployments and runbook runs are computationally expensive.  More concurrent deployments and runbook runs requires more resources from the Cloud Platform.  As such, increasing the task cap increases your platform fee.  

You can increase the task cap on your instance by contacting sales@octopus.com.  They will provide you with the latest fees and discuss options.

**Important:** 5, 10, 20, 40, 80, and 160 are the only options we offer.  If you want an instance with a task cap above 160, again, reach out to sales@octopus.com.  There are no options between those tiers.  For example, no Octopus Cloud instance can have a task cap of 15, 34, 45, or 68.  

## How to choose a task cap
We recommend the number of deployments required for a production deployment.  Deployments and runbook runs are the most common tasks.  Deployments typically take longer than runbook runs.  Production deployments are time constrained.  They are done off-hours during an outage window.

**Important:** These tables represent the _MAX_ number of deployments.  Additional tasks such as runbook runs, retention policies, or health checks can reduce the number.  Use these tables as guidelines.

### Task Cap 5
| Deployment Window | 10 Minute Deployments | 15 Minute Deployments | 30 Minute Deployments |
| ----------------- | --------------------- | --------------------- | --------------------- |
| 2 Hours           | 60 Deployments        | 40 Deployments        | 20 Deployments        |
| 4 Hours           | 120 Deployments       | 80 Deployments        | 40 Deployments        |
| 8 Hours           | 240 Deployments       | 160 Deployments       | 80 Deployments        |
| 16 Hours          | 480 Deployments       | 320 Deployments       | 160 Deployments       |
| 24 Hours          | 720 Deployments       | 480 Deployments       | 320 Deployments       |

### Task Cap 10
| Deployment Window | 10 Minute Deployments | 15 Minute Deployments | 30 Minute Deployments |
| ----------------- | --------------------- | --------------------- | --------------------- |
| 2 Hours           | 120 Deployments       | 80 Deployments        | 40 Deployments        |
| 4 Hours           | 240 Deployments       | 160 Deployments       | 80 Deployments        |
| 8 Hours           | 480 Deployments       | 320 Deployments       | 160 Deployments       |
| 16 Hours          | 960 Deployments       | 640 Deployments       | 320 Deployments       |
| 24 Hours          | 1,440 Deployments     | 960 Deployments       | 640 Deployments       |

### Task Cap 20
| Deployment Window | 10 Minute Deployments | 15 Minute Deployments | 30 Minute Deployments |
| ----------------- | --------------------- | --------------------- | --------------------- |
| 2 Hours           | 240 Deployments       | 160 Deployments       | 80 Deployments        |
| 4 Hours           | 480 Deployments       | 320 Deployments       | 160 Deployments       |
| 8 Hours           | 960 Deployments       | 640 Deployments       | 320 Deployments       |
| 16 Hours          | 1,920 Deployments     | 1,280 Deployments     | 640 Deployments       |
| 24 Hours          | 2,880 Deployments     | 1,920 Deployments     | 960 Deployments       |

### Task Cap 40
| Deployment Window | 10 Minute Deployments | 15 Minute Deployments | 30 Minute Deployments |
| ----------------- | --------------------- | --------------------- | --------------------- |
| 2 Hours           | 480 Deployments       | 320 Deployments       | 160 Deployments       |
| 4 Hours           | 960 Deployments       | 640 Deployments       | 320 Deployments       |
| 8 Hours           | 1,920 Deployments     | 1,280 Deployments     | 640 Deployments       |
| 16 Hours          | 3,840 Deployments     | 2,560 Deployments     | 1,280 Deployments     |
| 24 Hours          | 5,760 Deployments     | 3,840 Deployments     | 1,920 Deployments     |

### Task Cap 80
| Deployment Window | 10 Minute Deployments | 15 Minute Deployments | 30 Minute Deployments |
| ----------------- | --------------------- | --------------------- | --------------------- |
| 2 Hours           | 960 Deployments       | 640 Deployments       | 320 Deployments       |
| 4 Hours           | 1,920 Deployments     | 1,280 Deployments     | 640 Deployments       |
| 8 Hours           | 3,840 Deployments     | 2,560 Deployments     | 1,280 Deployments     |
| 16 Hours          | 7,680 Deployments     | 5,120 Deployments     | 2,560 Deployments     |
| 24 Hours          | 11,520 Deployments    | 7,680 Deployments     | 3,840 Deployments     |

### Task Cap 160
| Deployment Window | 10 Minute Deployments | 15 Minute Deployments | 30 Minute Deployments |
| ----------------- | --------------------- | --------------------- | --------------------- |
| 2 Hours           | 1,920 Deployments     | 1,280 Deployments     | 640 Deployments       |
| 4 Hours           | 3,840 Deployments     | 2,560 Deployments     | 1,280 Deployments     |
| 8 Hours           | 7,680 Deployments     | 5,120 Deployments     | 2,560 Deployments     |
| 16 Hours          | 15,360 Deployments    | 10,240 Deployments    | 5,120 Deployments     |
| 24 Hours          | 23,040 Deployments    | 15,360 Deployments    | 7,680 Deployments     |