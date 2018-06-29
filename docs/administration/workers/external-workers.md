---
title: External Workers
description: External workers are machines that Octopus can use to delegate steps to during a deployment.  You can disable the built-in worker and delegate work to external workers instead. Using external workers makes your Octopus Server more secure, and allows you to decide where your workers do their work, and the context in which they perform their work.
position: 3
---

An **external worker** is either a [tentacle](/docs/infrastructure/windows-targets/index.md) or an [SSH machine](/docs/infrastructure/ssh-targets/index.md) that has been registered with the Octopus server as a worker.  The setup of a worker is the same as setting up a deployment target as a [Windows tentacle target](/docs/infrastructure/windows-targets/index.md) or an [SSH target](/docs/infrastructure/ssh-targets/index.md), except that instead of being added to an environment, a worker is added to a worker pool.

Workers have machine policies, are health checked, and run Calamari, just like deployment targets.

!toc

## Registering an External Worker

Once the tentacle or SSH machine has been configured, workers can be added using the UI, the [Octopus Deploy REST API](/docs/api-and-integration/api/index.md), the [Octopus.Clients library](/docs/api-and-integration/octopus.client.md) or with the tentacle executable.  Only a user with the `ConfigureServer` permission can add or edit workers.

To register a worker in the **Octopus Web Portal**, navigate to the **Infrastructure** tab, select **Workers** and click **ADD WORKER**.

Tentacle workers can also register with the server using the tentacle executable (version 3.22.0 or later), for example:

```
.\Tentacle.exe register-worker --instance MyInstance --server "https://example.com/" --comms-style TentaclePassive --apikey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO" --workerpool "Default Worker Pool"
```

Use `TentacleActive` instead of `TentaclePassive` to register a polling tentacle worker.

The tentacle executable can also be used to deregister workers, for example:
```
.\Tentacle.exe deregister-worker --instance MyInstance --server "https://example.com/" --apikey "API-CS0SW5SQJNLUBQCUBPK8LZY3KYO"
```

## Recommendations for External Workers

We highly recommend setting up external workers on a different machine to the Octopus Server.

We also recommend running external workers as a different user account to the Octopus Server.

It can be advantageous to have workers on the same local network as the server to reduce package transfer times.

Default pools attached to cloud targets allow co-location of workers and targets, this can help make workers specific to your targets as well as for security.

## Multiple Projects Run Simultaneously on Workers

The built-in worker can run many steps simultaneously.  For example, the task cap determines how many deployments can run simultaneously and those deployments could run many steps concurrently on the built-in worker.  External workers are the same.  External workers will run steps from different projects simultaneously.  This means external workers keep the behavior of the built-in worker, including that a step doesn't have exclusive access to the worker, which could allow one project to access the working folder of another project.
