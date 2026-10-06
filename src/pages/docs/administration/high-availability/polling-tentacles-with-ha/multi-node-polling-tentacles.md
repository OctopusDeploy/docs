---
layout: src/layouts/Default.astro
pubDate: 2026-09-28
modDate: 2026-10-06
title: Multi-node support for Polling Tentacles
description: Use Redis to let Polling Tentacles connect to any node in an Octopus High Availability cluster through a single load-balanced address.
navOrder: 10
---

In an Octopus High Availability (HA) cluster, a Polling Tentacle normally has to [poll every Octopus Server node](/docs/administration/high-availability/polling-tentacles-with-ha/poll-every-node). Work for a Tentacle is queued in memory on the node that runs the task, and only that node can hand it to the Tentacle. So each Tentacle needs a unique address or port for every node, and you need to update every Tentacle when you add or remove a node.

Multi-node support for Polling Tentacles removes that restriction. The nodes share a pending request queue stored in Redis, so a request queued by any node can be collected by whichever node the Tentacle is connected to. Each Tentacle only needs to poll a single address, which a load balancer spreads across all the nodes.

:::div{.hint}
Multi-node support for Polling Tentacles is available from Octopus Server 2026.4.6342.
:::

## How it works

When multi-node support for Polling Tentacles is turned on:

- Each node stores the requests it queues for Polling Tentacles in Redis, instead of in its own memory. When a Tentacle polls a node, that node collects the next request for the Tentacle from Redis, sends it, and returns the response to the node that queued it.
- Requests stored in Redis are compressed and encrypted with your [Master Key](/docs/security/data-encryption).
- Small data streams travel inside the encrypted request in Redis. Larger data streams are written to a `DataStreams` directory in the [cluster shared directory](#cluster-shared-storage) so every node can read them. Packages that are already on shared storage, such as the shared package cache, are read from where they are and are not copied.
- Tentacle communication logs, shown on the deployment target's **Connectivity** page, are collected from every active node, not only the node you are connected to.

Listening Tentacles are not affected.

## Requirements

To use multi-node support for Polling Tentacles, you need:

- An Octopus HA cluster where every node runs a version of Octopus Server that supports the feature.
- A [Redis instance](#redis-requirements) that every node can reach, configured the way Octopus needs.
- A [cluster shared directory](#cluster-shared-storage) on storage every node can read and write.
- A [TCP load balancer](#load-balancer) in front of the nodes' Polling Tentacle port (`10943` by default).

### Redis requirements \{#redis-requirements}

We have tested multi-node support for Polling Tentacles with Redis 8.0.3, and recommend Redis 8.0 or later. Earlier versions may work, but we have not tested them.

Octopus uses Redis as a short-lived queue, not a database. Redis must hold data in memory only:

- **Turn off persistence.** Do not use RDB snapshots or AOF.
- **Do not use replication or automatic failover.** Replication is asynchronous, so a promoted replica can bring back requests that a node has already collected, and they would be sent to the Tentacle again.
- **Set the eviction policy to `noeviction`.** Evicting keys would silently drop requests.

Octopus detects when Redis loses all of its data, for example when it restarts. Each node checks for this every minute, so it can take up to a minute to notice. It fails the requests that were in flight at the time and then decides whether to retry them. New requests work again as soon as Redis is back. Octopus cannot detect a partial restore, which is why persistence and replication must be off.

A single Redis node started with these options meets the requirements:

```bash
redis-server --save "" --appendonly no --maxmemory-policy noeviction --requirepass "your-secret-password"
```

If you use a managed Redis service, choose a tier or configuration without persistence and replicas, and set the eviction policy to `noeviction`.

### Cluster shared storage \{#cluster-shared-storage}

Every node must be able to read the data streams written by the other nodes, so Octopus stores them in the cluster shared directory. If multi-node support for Polling Tentacles is on, but neither a cluster shared directory nor an executions cluster shared directory is configured, Octopus Server fails to start with this error:

```text
Multi-node support for polling tentacles is enabled, but no cluster shared directory has been configured.
```

Set the cluster shared directory with the [path command](/docs/administration/octopus.server.exe-command-line/path):

```powershell
Octopus.Server.exe path --instance="OctopusServer" --clusterShared \\OctoShared\OctopusData
```

Octopus stores transient execution data, which is only needed while tasks run, in these folders in the cluster shared directory:

- `DataStreams`, for data streams sent to Polling Tentacles
- `DataBus`, used internally by Octopus Server
- `SharedPackageCache`, for the package cache

To keep transient execution data on separate storage, such as faster storage that does not need to be backed up, use `--executionsClusterShared` instead of, or as well as, `--clusterShared`. Octopus then uses the same folders in the executions cluster shared directory. Both must point to storage every node can read and write.

If you are running the [Octopus Server Linux container](#linux-container) or the [Helm chart](#helm-chart), configure this with the settings in those sections instead.

### Load balancer \{#load-balancer}

Put a load balancer in front of the Polling Tentacle port on every node that processes tasks. The load balancer must:

- Pass TCP traffic straight through. Octopus terminates TLS and authenticates Tentacles with certificates, so the load balancer must not terminate TLS.
- Route to every node that processes tasks. You do not need to include [UI-only nodes](/docs/installation/octopus-server-linux-container/octopus-in-kubernetes#ui-and-backend-nodes).

You do not need session affinity. Any node can serve any Tentacle.

## Turn on multi-node support for Polling Tentacles

Multi-node support for Polling Tentacles is turned on when a Redis connection string is configured, and turned off when it is not. Configure **every node** in the cluster with the same connection string.

The value is a [StackExchange.Redis connection string](https://stackexchange.github.io/StackExchange.Redis/Configuration.html), for example:

```text
your-redis-host:6380,password=your-secret-password,ssl=true
```

You can set the connection string in any of the following ways. If more than one is set, the environment variable takes precedence over the configuration file.

| Method | Name |
| --- | --- |
| Command line | `Octopus.Server configure --multiNodePollingTentaclesRedisConnectionString="<connection string>"` |
| Environment variable | `OCTOPUS_MULTI_NODE_POLLING_TENTACLES_REDIS_CONNECTION_STRING` |
| Server configuration file key | `Octopus.Communications.MultiNodePollingTentaclesRedisConnectionString` |

### Windows and Linux servers

1. Make sure the [cluster shared directory](#cluster-shared-storage) is configured.
1. On each node, run the [configure command](/docs/administration/octopus.server.exe-command-line/configure):

    ```powershell
    Octopus.Server.exe configure --instance="OctopusServer" --multiNodePollingTentaclesRedisConnectionString="your-redis-host:6380,password=your-secret-password,ssl=true"
    ```

    The command checks that the connection string is valid before saving it. The value is treated as sensitive, so it is masked in the command's output.
1. Restart each node. The setting takes effect when Octopus Server starts.
1. [Check the connection to Redis](#check-redis).
1. [Point your Polling Tentacles at the load balancer](#register-polling-tentacles).

### Octopus Server Linux container \{#linux-container}

Set these environment variables on every Octopus Server container:

| Name | Value |
| --- | --- |
| `OCTOPUS_MULTI_NODE_POLLING_TENTACLES_REDIS_CONNECTION_STRING` | Your Redis connection string. |
| `CLUSTER_SHARED_CONFIG` | `CLUSTER_SHARED` for a new installation, or `SEPARATE_VOLUMES_WITH_CLUSTER_SHARED` to keep the existing `/repository`, `/artifacts`, `/taskLogs`, and `/eventExports` volumes of an existing installation. |

Then mount `/clusterShared` on storage every node can read and write. Octopus writes data streams to `/clusterShared/DataStreams`, or to `/executionsClusterShared/DataStreams` if `USE_EXECUTIONS_CLUSTER_SHARED` is `True`. See [cluster shared configuration](/docs/installation/octopus-server-linux-container#cluster-shared-configuration) for what each `CLUSTER_SHARED_CONFIG` value does.

The container checks these settings when it starts:

- If `OCTOPUS_MULTI_NODE_POLLING_TENTACLES_REDIS_CONNECTION_STRING` is set and `CLUSTER_SHARED_CONFIG` is `SEPARATE_VOLUMES`, the container stops with an error.
- If `OCTOPUS_MULTI_NODE_POLLING_TENTACLES_REDIS_CONNECTION_STRING` is set and `CLUSTER_SHARED_CONFIG` is not set, the container logs a warning. Octopus Server then fails to start unless a cluster shared or executions cluster shared directory was already configured.

### Helm chart \{#helm-chart}

The [Octopus Deploy Helm chart](https://github.com/OctopusDeploy/helm-charts/tree/main/charts/octopus-deploy) can configure multi-node support for Polling Tentacles, the cluster shared volume, and the load balancer for you. It can also run Redis in your cluster, configured to meet the [Redis requirements](#redis-requirements):

```yaml
octopus:
  clusterShared:
    mode: SEPARATE_VOLUMES_WITH_CLUSTER_SHARED
  multiNodePollingTentacles:
    enabled: true
redis:
  enabled: true
```

This example uses `SEPARATE_VOLUMES_WITH_CLUSTER_SHARED`, which keeps the existing volumes of an installation you are moving to multiple nodes. For a new installation, we recommend `CLUSTER_SHARED`, which stores everything in a single cluster shared volume. See [cluster shared configuration](/docs/installation/octopus-server-linux-container#cluster-shared-configuration).

The in-cluster Redis is a single pod. Requests that are in flight when it restarts fail, and new requests work again once it is back.

By default, the in-cluster Redis has no memory limit, so the `noeviction` policy never applies and Redis can grow until the pod runs out of memory and restarts. Set `redis.maxMemory`, for example to `200mb`. When Redis reaches it, new requests are rejected instead of queued requests being evicted. If you also set a memory limit in `redis.resources`, set `redis.maxMemory` below it.

To use your own Redis instead, provide the connection string:

```yaml
octopus:
  clusterShared:
    mode: SEPARATE_VOLUMES_WITH_CLUSTER_SHARED
  multiNodePollingTentacles:
    enabled: true
    redis:
      connectionString: "your-redis-host:6380,password=your-secret-password,ssl=true"
```

This setting is under `octopus.multiNodePollingTentacles`, not the top-level `redis` key, which only controls the in-cluster Redis. Leave `redis.enabled` set to `false`. If it is `true`, the chart ignores your connection string and uses the in-cluster Redis.

The chart will not render if multi-node support for Polling Tentacles is on but `octopus.clusterShared.mode` is not set, or if there is neither an in-cluster Redis nor a connection string.

When the feature is on, the chart creates a `LoadBalancer` service, named `<release name>-octopus-deploy-polling-tentacles` by default, which passes Tentacle traffic through to any node. Point your Polling Tentacles at this service's address.

The chart's per-node services and ingresses are still created, so existing Tentacles that poll every node keep working. For all the chart's settings, including load balancer annotations and supplying the connection string from your own secret, see the [chart's README](https://github.com/OctopusDeploy/helm-charts/tree/main/charts/octopus-deploy#multi-node-polling-tentacles).

## Check the connection to Redis \{#check-redis}

After the nodes restart, send a `GET` request to `/api/serverstatus/redis` on each node. The endpoint does not need an API key:

```bash
curl https://your-octopus-url/api/serverstatus/redis
```

The response tells you whether that node can use Redis:

| Property | Meaning when `true` |
| --- | --- |
| `IsEnabled` | A Redis connection string is configured, so the feature is on. |
| `IsConfigured` | Octopus could create a Redis connection from the connection string. |
| `IsReachable` | Octopus connected to Redis and ran a command. |

All three values should be `true` on every node. Because the request goes through your web load balancer, you might need to send it to each node's own address to check every node.

## Point Polling Tentacles at the load balancer \{#register-polling-tentacles}

Register each Polling Tentacle with the load balancer's address as its only comms address. Use `--server` for the Octopus Web Portal address, and `--server-comms-address` for the Polling Tentacle load balancer:

```bash
tentacle register-with --server="https://your-octopus-url" --apiKey="API-YOUR-KEY" --comms-style="TentacleActive" --server-comms-address="https://your-polling-load-balancer:10943" --environment="Production" --role="web-server"
```

Then restart the Tentacle:

```bash
tentacle service --restart
```

To point an existing Polling Tentacle at the load balancer:

1. Add the load balancer with the [poll-server](/docs/administration/tentacle.exe-command-line/poll-server) command:

   ```bash
   tentacle poll-server --server="https://your-octopus-url" --apiKey="API-YOUR-KEY" --server-comms-address="https://your-polling-load-balancer:10943"
   ```

   The Tentacle reuses the subscription ID it already has for your Octopus Server, so Octopus still sees it as the same Tentacle.

1. Remove the per-node entries with the `clear-trusted-servers` command, keeping the load balancer:

   ```bash
   tentacle clear-trusted-servers --keep="https://your-polling-load-balancer:10943"
   ```

   This removes every trusted server whose address is not listed in `--keep`. Each address must match the stored address exactly, so use the same scheme, host, and port you passed to `--server-comms-address`. For example, `https://your-polling-load-balancer` does not match `https://your-polling-load-balancer:10943`. If the Tentacle also trusts another Octopus Server, add that server's address to `--keep` as a comma-separated list.

   The `clear-trusted-servers` command needs Tentacle 8.1.1713 or later. On an older Tentacle, upgrade it first.

1. Restart the Tentacle:

   ```bash
   tentacle service --restart
   ```

Do not use `configure --reset-trust` for this. It removes the load balancer entry and the Tentacle's subscription ID as well, so you would need to register the Tentacle again.

You can run the first step on its own and remove the per-node entries later. A Tentacle that polls the load balancer and the individual nodes at the same time works, because each request is collected by only one connection. The extra connections add traffic but do not change how tasks run.

Tentacles that still poll every node individually keep working while multi-node support for Polling Tentacles is on, so you can move them to the load balancer at your own pace.

### Kubernetes agents

Kubernetes agents also poll for work, and can use the load balancer the same way. When multi-node support for Polling Tentacles is on, the Kubernetes agent creation wizard asks for a single Communications URL instead of one for each node. To learn how to set this URL, and how to move an existing agent to the load balancer, see [Kubernetes agent HA Cluster Support](/docs/kubernetes/targets/kubernetes-agent/ha-cluster-support#multi-node-support-for-polling-tentacles).

## Turn off multi-node support for Polling Tentacles

To turn the feature off, clear the connection string on every node and restart them:

```powershell
Octopus.Server.exe configure --instance="OctopusServer" --multiNodePollingTentaclesRedisConnectionString=
```

If the `OCTOPUS_MULTI_NODE_POLLING_TENTACLES_REDIS_CONNECTION_STRING` environment variable is still set, the feature stays on and the command logs a warning. Remove the environment variable as well.

Before you turn the feature off, make sure every Polling Tentacle and Kubernetes agent polls each node individually, as described in [Polling every node](/docs/administration/high-availability/polling-tentacles-with-ha/poll-every-node). Otherwise, tasks run by a node that a Tentacle is not polling will wait for that Tentacle until they time out.

## Troubleshooting

**Octopus Server does not start, and reports that no cluster shared directory has been configured.**
Configure a [cluster shared directory](#cluster-shared-storage) on storage every node can access, then start the node again.

**The configure command reports that the Redis connection string is not valid.**
Check the value follows the [StackExchange.Redis connection string format](https://stackexchange.github.io/StackExchange.Redis/Configuration.html). Wrap the whole value in quotes so your shell does not split it on commas.

**`IsReachable` is `false`.**
Check the node can reach the Redis host and port through any firewalls, that the password is correct, and that `ssl=true` is set if your Redis requires TLS.

**Tentacles fail to connect through the load balancer.**
Check the load balancer passes TCP traffic straight through on the Polling Tentacle port, and does not terminate TLS.

**Deployments to Polling Tentacles fail or wait, only on some nodes.**
Check every node is configured with the same Redis connection string, and that each node's `/api/serverstatus/redis` response is `true` for all three values.

## Learn more

- [Polling Tentacles with HA](/docs/administration/high-availability/polling-tentacles-with-ha)
- [Octopus Server Linux container](/docs/installation/octopus-server-linux-container)
- [Octopus Server in Kubernetes](/docs/installation/octopus-server-linux-container/octopus-in-kubernetes)
- [Configure command](/docs/administration/octopus.server.exe-command-line/configure)
- [Path command](/docs/administration/octopus.server.exe-command-line/path)
