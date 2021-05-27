---
title: Ongoing Maintenance
description: Guidelines and recommendations for ongoing maintenance with Octopus Deploy.
position: 110
hideInThisSection: true
---

After the initial configuration, Octopus Deploy will happily chug along without a lot of day-to-day maintenance.  That being said, Octopus Deploy performs at its best when routine maintenance is performed.  

## Self-Hosted Octopus Deploy

Customers electing to self-host Octopus Deploy take on the responsibility for maintenance of the Octopus Server.  Our recommendations are:

- Perform routine database maintenance, such as rebuilding indexes, regenerating statistics, and creating backups.  Please see our [section on routine database maintenance](/docs/administration/data/octopus-database/index.md#maintenance) for more details.
- Keep your instance up to date with the latest version of Octopus Deploy.  In addition to new features, we also release bug fixes, security patches, and performance improvements.  We have a major release of Octopus Deploy every quarter, with patch releases every one to five days.  You can automate your upgrades by following [our upgrade guide](/docs/administration/upgrading/guide/automate-upgrades.md).
- Configure lifecycle retention policies.  By default, Octopus Deploy will keep every deployment in its system until the end of time.  Initially, that isn't a terrible thing, but Octopus Deploy will consume more and more data as time goes on.  That can be changed by configuring a retention policy to match your internal business rules.  Please see our section on [retention policies](/docs/administration/retention-policies/index.md) for more details.
- Configure package retention policies (when using the built-in feed).  Just like deployments, Octopus will keep every package in the internal feed forever.  The package retention policy controls this.  It is a separate setting as you might have different rules for deployments than you do for packages.  Please see our section on [built-in feed retention policy](/docs/administration/retention-policies/index.md#set-builtinfeed-retentionpolicy) for more details.

## Octopus Cloud

Customers electing to use Octopus Cloud don't have the same maintenance responsibilities of the Octopus Server as customers who elect to self-host.  We handle all the upgrades and database maintenance for you.

We impose [storage limits](/docs/octopus-cloud/index.md#octopus-cloud-storage-limits) on your instance to keep your file consumption and database size as small as possible.
- All lifecycle retention policies have a default of 30 days instead of forever.
- The internal feed package retention policy is also defaulted to 30 days.

Paid cloud instances can change these limits, whereas free cloud instances cannot. 

## Octopus Cloud and Self-Hosted Octopus Deploy

Customers on either platform will need to make some configuration changes to keep Octopus Deploy running as smoothly as possible.

- Configure runbook retention policies.  Each runbook has its own retention policy.  The default is 100 runbook runs per environment.  Please see our section on [runbook retention policies](/docs/runbooks/runbooks-vs-deployments/index.md#retention-policy) for more details.
- Leverage machine policies to verify deployment target health.  You can configure a custom interval to check the health, and if any machine reports unhealthy, you can trigger a notification.  By default, they run a health check every hour.  Perhaps that is too often or not often enough.  You are most likely deploying to machines in your test environment dozens of times per day. If one were unhealthy, you'd know about it.  While your targets in pre-production or staging environments might not get the same volume, so you'd want to verify the health more often.  Please see our section on [machine policies](/docs/infrastructure/deployment-targets/machine-policies.md#health-check) to modify them to meet your needs.

<span><a class="btn btn-secondary" href="/docs/getting-started/best-practices/notifications">Previous</a></span>