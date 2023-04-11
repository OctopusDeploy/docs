---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Private cloud migration
description: Guidelines for migrating an on-premises Octopus instance to private cloud hosting
navOrder: 55
hideInThisSectionHeader: true
---

Teams looking to migrate their on-premises Octopus instance to private cloud hosting must take multiple factors into account to ensure a smooth migration. This document provides a guide to ensure teams successfully migrate their instance with minimal interruption to their deployments.

## Checklist

There are a number of factors to consider when migrating an on-premises instance to cloud hosting:

* What version of Octopus are you running?
* Who is using the on-premises Octopus instance?
* How long can Octopus be offline for before it interrupts critical operations?
* Who can test each project to ensure it deploys correctly after the migration?
* Do you require a continuous audit history after the migration?
* How do users authenticate with Octopus?
* Where have tentacles been installed?
* What kind of tentacles have been configured (polling or listening)?
* Are there any firewall rules restricting traffic to tentacles?
* Do you want to host Octopus in a Linux container on a platform like Kubernetes or ECS?
* Do you have a direct network connection from your cloud provider to your on-premises infrastructure?
* Where are your packages stored?
* Do you have any CI servers integrated with Octopus?
* Do you have any subscriptions configured in Octopus?
* Do you have any external tools or scripts that call the Octopus API?
* Do you have external scripts or CI servers using API keys?


### What version of Octopus are you running?

Some of the migration options require a relatively recent version of Octopus to be installed. For this reason the first step in any migration is to update the on-premises instance to the latest version of Octopus.

### Who is using the on-premises Octopus instance?

Most teams looking to move their on-premises Octopus instance to a private cloud tend to have multiple teams deploying multiple projects through Octopus. How the migration is performed is largely dictated by the requirements of each of the impacted teams. It is therefore critical to understand which teams are using Octopus and what applications they are deploying. Having this information allows you to answer the next questions.

### How long can Octopus be offline for before it interrupts critical operations?

Some teams may deploy relatively infrequently, perhaps once per month. Other teams may perform multiple deployments per day.

Understanding the window in which Octopus can be unavailable without interrupting critical operations is a large factor in determining the migration path.

### Who can test each project to ensure it deploys correctly after the migration?

Once the migration is complete, each team using Octopus must ensure that their deployments continue to work correctly. Either a member of each team using Octopus must test the migrated instance to ensure their projects work correctly, or the team performing the migration must be provided with guidance on how to test the migrated projects. The success or failure of these tests determines if the migration must be rolled back or can continue.

### Do you require a continuous audit history after the migration?

The requirement to have a complete audit history available in the migrated instance will limit the migration paths you can take. For example, the [Import/Export feature](/docs/projects/export-import/index.md) does not copy audit logs from the on-premises Octopus instance to the new cloud hosted instance.

### How do users authenticate with Octopus?

Octopus can either maintain users and teams in its own internal database or delegate authentication to an external provider such as Active Directory.

Whether users and teams managed by Octopus are migrated or manually recreated depends on the migration path.

Also be aware that Octopus hosted in a [Linux container](docs/installation/octopus-server-linux-container/index.md) has some limitations with the supported authentication providers compared to the Windows version.

### Where have tentacles been installed?

All tentacles will need to connect to or receive connections from the new Octopus instance. Understanding where tentacles are installed allows you to answer the next questions.

### What kind of tentacles have been configured (polling or listening)?

Octopus tentacles can be configured in either listening or polling mode.

Listening tentacles expose an open network port that the Octopus server uses to establish in inbound connection to in order to initiate a deployment. Listening tentacles rely on the certificate presented by the Octopus server to trust inbound connections. This means listening tentacles must re-register with fresh Octopus instances in order to trust the inbound connections, while Octopus instances configured against a restored database retain the certificates and can establish connections to listening tentacles.

Polling tentacles establish an outbound connect to the Octopus server to poll it for any pending deployments. Polling tentacles can be configured to poll multiple Octopus instances, allowing a single polling tentacle to be shared by many Octopus instances.

### Are there any firewall rules restricting traffic to tentacles?

Machines hosting tentacles may have firewall rules that limit incoming and outgoing traffic. If these firewall rules exist, they must be updated to allow traffic to and from the migrated Octopus instance.

### Do you want to host Octopus in a Linux container on a platform like Kubernetes or ECS?

Octopus was initially provided only as a Windows application. Today Octopus is also provided as a Linux OCI image. The hosted platform provided by Octopus runs the Linux OCI image in Kubernetes, so running Octopus as a Linux container is a well tested and supported solution.

Teams may wish to migrate to the Linux version of Octopus when moving to the cloud. There are many benefits to doing so, including cheaper hosting costs and the option to host Octopus on platforms like Kubernetes or ECS.

The Windows and Linux versions are mostly identical. However, there are some caveats to be aware of as documented [here](docs/installation/octopus-server-linux-container/index.md).

### Do you have a direct network connection from your cloud provider to your on-premises infrastructure?

Most cloud providers provide the ability to link on-premises networks to cloud based networks such that they both appear to belong to the same contiguous network. This allows the cloud based Octopus instance to continue to communicate with on-premises tentacles and targets with the same host names used by the on-premises Octopus instance.

However, if the cloud network is separate or otherwise segregated from the on-premises network, you may be required to switch from listening tentacles to polling tentacles, as polling tentacles can establish a secure outbound network connection over the public internet.

### Where are your packages stored?

If you use an external package repository, both the on-premises and cloud hosted Octopus instances can continue to consume the same set of packages. However, if you use the built-in Octopus feed, the packages must be manually copied to the new cloud hosted Octopus instance.

In addition, any CI servers pushing packages to the Octopus instance must be updated to push packages to the cloud Octopus instance.

A sample script has been provided in the [Import/Export documentation](/docs/projects/export-import/index.md) to automate the process of copying packages.

### Do you have any CI servers integrated with Octopus?

A typical deployment workflow has a CI server which builds deployment artifacts, pushes those artifacts to a package repository, and then initiates a deployment to a development environment in Octopus.

The CI server must be updated to point to the new cloud hosted Octopus instance so any packages pushed to the Octopus built-in feed and plugins that create and deploy releases interact with the new instance.

### Do you have any subscriptions configured in Octopus?

Subscriptions are web hooks called by Octopus in response to certain events. Any service configured to respond to subscription events must have a network connection to the cloud hosted instance. And, depending on the migration path used, the subscriptions may need to be manually recreated.

### Do you have any external tools or scripts that call the Octopus API?

Octopus has a rich API that we encourage teams to use for advanced scenarios and management tasks. Any scripts written against the on-premises instance must be pointed to the cloud hosted instance.

### Do you have external scripts or CI servers using API keys?

API keys are the primary means with which external systems and scripts authenticate with the Octopus API. Depending on the migration path, these API keys may need to be regenerated.

## Migration paths

There are three main paths available when migrating Octopus to a new instance: incremental, complete, and double complete. All have advantages and disadvantages. Which migration path you select is determined by the answers to the questions above.

### Complete migration

A complete migration involves:

1. Placing the on-premises Octopus instance into maintenance mode.
1. Ensuring you have the master key.
1. Performing a full backup of the on-premises database.
1. Restoring the backup into the cloud based database.
1. Copying task logs to the cloud based file storage.
1. Copying built-in feed packages to the cloud based file storage.
1. Copying artifacts to the cloud based file storage.
1. Installing Octopus on your chosen hosting platform (e.g. a virtual machine or container orchestration platform).
1. Pointing the cloud Octopus instance to the cloud based database.
1. Reindexing the packages in the built-in feed.
1. If the cloud Octopus instance has a new DNS name:
    1. Reregistering polling tentacles to point to the cloud instance.
    1. Pointing CI servers and external scripts to the cloud instance.
    1. Updating firewall rules to allow the cloud instance to connect to listening tentacles.

This process is documented in more detail under [Moving your Octopus components to other servers](docs/administration/managing-infrastructure/moving-your-octopus/index.md).

Choose a complete migration when:

* There are few projects to test, or teams can collectively sign off the migration relatively quickly.
* You require a complete audit history to be present on the cloud Octopus instance.
* You have a large number of listening tentacles, as the cloud Octopus instance retains the certificates required to establish the inbound connections, allowing the existing listening tentacles to be reused without reregistering them.
* You have a large number of API keys in use and do not wish to regenerate them.
* You have a large number of subscriptions configured and you do not wish to reconfigure them.

A complete migration may not suitable when:

* There are many projects to migrate, and any project may take longer to validate than the downtime tolerated by any other team, as a complete migration assumes everyone can start using the new instance relatively quickly.

### Incremental migration

An incremental migration involves:

1. Installing the cloud hosted Octopus instance with a fresh database.
1. Using the [Import/Export feature](/docs/projects/export-import/index.md) to move individual projects to the cloud hosted instance.
1. Reregistering tentacles required by the imported project with the cloud hosted instance.
1. Copying packages used by the migrated project to the cloud hosted built-in feed.
1. Reindexing the built-in feed.
1. Updating CI servers and external scripts to point to the cloud instance.
1. Disabling the project on the on-premises instance after migration.

Choose an incremental migration when:

* Teams can only tolerate small downtime windows, as an incremental migration allows the on-premises instance to continue performing deployments as each team or project is migrated individually.
* You have so many CI projects or external scripts interacting with Octopus that it is not feasible to migrate them all at once, as an incremental migration means you migrate only the external services relating to the single Octopus project or team being migrated.
* You wish to limit the migration risk by limiting each migration step to a single project or team.

An incremental migration may not suitable when:

* You require the complete audit history to be present on the cloud instance, as the export/import feature does not migrate audit events.
* You have a large number of Config-as-Code enabled projects, as the export/import feature does not export these projects.
* You do not wish to reregister listening tentacles, as the new cloud instance has new certificates and will not be able to establish a connection to existing listening tentacles.
* You have a large number of project triggers, as the export/import feature does not export triggers.
* You have a large number of users and teams in the internal Octopus database, as these will have to be manually recreated.
* You have a large number of active API keys and do not wish to regenerate them.

### Double complete migration

A third option is to perform a complete migration but then treat the cloud instance as disposable. Once testing has been completed, the cloud instance is destroyed and a new complete migration is performed. This allows teams to switch to the cloud instance with a high degree of certainty that their projects will deploy correctly, while also ensuring that the cloud instance has all the recent configuration from the on-premises instance.

Choose a double complete migration when:

* You need all the features of a complete migration.
* You are unable to validate a complete migration within the outage window tolerated by your teams.

A double complete migration may not suitable when:

* You are unable to migrate all external services fast enough to satisfy the outage window tolerated by your teams.

## Conclusion

There are many factors to consider when migrating an on-premises Octopus instance to the cloud. The technical requirements to perform such a migration are usually the easiest to implement. It is typically the functional requirements of the teams using Octopus that require the most careful consideration.

Every migration will have unique requirements, but this document highlights a number of common factors that must be taken into consideration when performing a cloud migration.