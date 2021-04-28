---
title: Ongoing Maintenance
description: Guidelines and recommendations for ongoing maintenance with Octopus Deploy.
position: 110
hideInThisSection: true
---

After the initial configuration, Octopus Deploy will happily chug along without a lot of day to day maintenance.  That being said, Octopus Deploy performs at its best when routine maintenance is performed.  

## Self-Hosted Octopus Deploy

Customers electing to self-host Octopus Deploy take on the responsibility for maintenance of the Octopus Server.  Our recommendations are:

- Perform routine database maintenance, such as rebuilding indexes, regenerating statistics, and creating backups.  Please see our [section on routine database maintenance](/docs/administration/data/octopus-database/index.md#maintenance) for more details.
- Keep your instance up to date with the latest version of Octopus Deploy.  In addition to new features we also release bug fixes, security patches, and performance improvements.  We have a major release of Octopus Deploy every quarter, with a patch releases every one to five days.  You can automate your upgrades by following [our upgrade guide](/docs/administration/upgrading/guide/automate-upgrades.md).
- Configure lifecycle retention policies.  By default, Octopus Deploy will keep every deployment in its system until the end of time.  Initially, that isn't a terrible thing, but as time goes on Octopus Deploy will consume more and more data.  That can be changed by configuring retention policy to match your internal business rules.  Please see our section on [retention policies](/docs/administration/retention-policies/index.md) for more details.

## Octopus Cloud

Customer electing to use Octopus Cloud don't have the same maintenance responsibilities of the Octopus Server.  We handle all the upgrades and database maintenance for you.  In addition, we limit the retention policy to 30 days.

## Octopus Cloud and Self-Hosted Octopus Deploy

Customers on either platform will need to make some configuration changes to keep Octopus Deploy running as smoothly as possible.

- Configure package retention policies (when using the built-in feed).  Just like deployments, every package will be kept in the internal feed until the end of time.  The package retention policy controls this.  It is a separate setting as you might have different rules for deployments than you do for packages.  Please see our section on [built-in feed retention policy](/docs/administration/retention-policies/index.md#set-builtinfeed-retentionpolicy) for more details.
- Configure runbook retention policies.  Each runbook has its own retention policy.  The default is 100 runbook runs per environment.  Please see our section on [runbook retention policies](/docs/runbooks/runbooks-vs-deployments.md#retention-policy) for more details.
- Leverage machine policies to verify target health.  Machine policies are used to verify the health of your deployment targets.  You can configure a custom interval to check the health and if any machine reports unhealthy you can trigger a notification.  By default they run a health check every hour.  Perhaps that is too often or not often enough.  Please see our secton on [machine policies](/docs/infrastructure/deployment-targets/machine-policies.md#health-check) to modify them to meet your needs.


<span><a class="btn btn-outline-dark" href="/docs/getting-started/best-practices/notifications">Previous</a></span>