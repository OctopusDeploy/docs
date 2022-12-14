---
title: Product Change Notification
description: Describing the deprecation process of Ubuntu 18.04 Dynamic Workers.
position: 50
---

Our dynamic workers are being upgraded to use Ubuntu 22.04, this upgrade will result in breaking changes for users of GCloud CLI.

## What is changing?

Due to the deprecation of Ubuntu 18.04, we are upgrading our dynamic workers to use Ubuntu 22.04.  This change has also prompted an upgrade of our GCloud CLI version to 367.0.0 as our current version (339.0.0) is not supported on Ubuntu 22.04.

## Who will be impacted?

Users of Octopus Cloud utilizing Linux workers and running custom scripts or community steps may be impacted as there are **breaking changes between Ubuntu 18.04 and Ubuntu 22.04**.

Cloud customers impacted by the GCloud CLI update will be those with a deployment process which:

* Has a "Run gcloud in a Script" step, which runs on the "Hosted Ubuntu” Worker Pool, which does not use an Execution Container, and the script contains calls to gcloud; **OR**
* Has a "Run a Script” step, which runs on the "Hosted Ubuntu” Worker Pool, and the script contains calls to gcloud

### What do I need to do?

Any impacted custom scripts will need to be updated to use Ubuntu 22.04 and tested to ensure your deployment process has not been impacted by the breaking changes. To mitigate the risk in this process we will be releasing the updated dynamic worker two months prior to the deprecation date so users can test against the new workers prior to migration.  Please see the timeline below for more details.

**Note:** All Octopus Deploy steps will work under Ubuntu 22.04 but some community steps may be impacted.

## Timeline

Octopus preparation

| Date          |   Details                                                     |
|---------------|:--------------------------------------------------------------|
| Q4&nbsp;2022  | Octopus will produce and test an Ubuntu 22.04 worker image    |
| Jan&nbsp;2023 | Internal testing of existing tooling to confirm compatibility |


Customer action required

| Date                | Details                                                                                                                                                                                                                                                                                   |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1&nbsp;Feb&nbsp;2023 | Ubuntu 22.04 dynamic worker will be made available for customers<br><ul><li> Customers should test their impacted deployments and runbooks on an Ubuntu 22.04 worker with the aim of completing testing by the 15th of March 2023</ul>                                                    |
| 15&nbsp;Mar&nbsp;2023          | Octopus will switch over the default worker pool to use the Ubuntu 22.04 worker.<br>* If customers experience failed deployments or runbooks, they will be able to select the Ubuntu 18.04 worker until 1 April 2023 while they resolve any issues with running on an Ubuntu 22.04 worker |
| 1&nbsp;Apr&nbsp;2023          | Ubuntu 18.04 dynamic workers will no longer be available on Octopus Cloud.                                                                                                                                                                                                                |


## FAQ

**Q: Why the deadline of 1 April 2023?**
A: Ubuntu 18.04 exits LTS support and will not be patched including any security vulnerability. Consequently, Octopus will not provide an unsupported Dynamic worker image.

**Q: What are the breaking changes between Ubuntu releases?**
A: it is not possible to give a complete and definitive answer as this depends on your use cases. Therefore, please refer to the following two release notes:
[18.04 to 20.04 release notes](https://wiki.ubuntu.com/FocalFossa/ReleaseNotes?action=show&redirect=FocalFossa%2FReleaseNotes%2F20.04)
[20.04 to 22.04 release notes](https://discourse.ubuntu.com/t/jammy-jellyfish-release-notes/24668)

**Q: What if I experience a breaking change but I can’t remediate it in time?**
A: There is an option of provisioning your own supplied worker with Ubuntu 18.04 and selecting that worker pool for your deployment process that contains the breaking change.

**Q:  Why is GCloud CLI part of this notification?**
A: Ubuntu 22.04 requires a later version of GCloud CLI. We have selected the earliest version on GCloud CLI that is compatible with Ubuntu 22.04 to minimize the number of breaking changes we expose our customers to.  Customers can use the [GCloud Release Notes](https://cloud.google.com/sdk/docs/release-notes) to assess whether their GCloud script steps are impacted by the breaking changes between GCloud versions 339.0.0 and 367.0.0.
