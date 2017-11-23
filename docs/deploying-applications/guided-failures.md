---
title: Guided failures
description: Guided failures allow problematic deployments to be reviewed and managed human intervention.  
position: 18
---

In an ideal world, every deployment would be successful. Sadly, things sometimes go wrong. Sometimes the cause of a failure is as simple as a missing dependency, Windows feature or configuration setting on a machine, a locked file or read-only path. The fastest way to go from broken to deployed is to let a human get involved, and when it makes sense, either ignore or retry the failing activity.

**Guided failure mode** tells Octopus that if something goes wrong during the deployment, instead of failing immediately, Octopus should ask for a human to intervene.

## Enabling guided failure mode {#Guidedfailures-Enablingguidedfailuremode}

Guided failure mode is off by default. You can enable it when deploying a release:

![](/docs/images/3048076/3277632.png "width=500")

:::hint
See the section on [managing environments](/docs/infrastructure/environments/index.md) to enable guided failure mode by default for all deployments to a specific environment.
:::

## What happens {#Guidedfailures-Whathappens}

If something goes wrong during the deployment, Octopus will interrupt the deployment, and request guidance for how to handle the failure. This uses the same [user experience that is used for manual steps](/docs/deploying-applications/manual-intervention-and-approvals.md) (internally, requests for failure guidance, and manual steps, use the same implementation: we call them Interruptions in the [REST API](/docs/api-and-integration/octopus-rest-api.md)).

![](/docs/images/3048076/3277631.png "width=500")

Anyone who has permission can handle the request for failure guidance by **clicking assign to me**. When assigned, they can choose how to handle the error.

![](/docs/images/3048076/3277630.png "width=500")

You can choose to:

- **Retry**: try the operation again. If it fails, another interruption will be raised.
- **Fail**: mark the deployment as failed, don't try anything else.
- **Ignore**: skip the operation, but keep going with the deployment.
