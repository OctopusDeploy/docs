---
layout: src/layouts/Default.astro
pubDate: 2024-05-08
modDate: 2024-05-08
title: Troubleshooting
description: How to troubleshoot common Kubernetes Agent issues
navOrder: 10
---


## Common errors:

### `Unexpected Script Pod log line number, expected: expected-line-no, actual: actual-line-no` 

This error indicates that the logs from the Script Pods are incomplete or malformed. 

When scripts are executed, any outputs or logs are stored in the Script Pod's container logs. The Tentacle Pod then reads from the container logs to feed back to Octopus Server.

There's a limit to the size of logs kept before they are [rotated](https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-rotation) out. If a particular log line is rotated before Octopus Server reads it, then it means log lines are missing - hence we fail the deployment prevent unexpected changes from being hidden.

### `The Script Pod 'octopus-script-xyz' could not be found`

This error indicates that the Script Pods were deleted unexpectedly - typically being evicted/terminated by Kubernetes.

If you are using the default NFS storage however, then the Script Pod would be deleted if the NFS Server Pod is restarted. Some possible causes are:

- being evicted due to exceeding its storage quota
- being moved or restarted as part of routine cluster operation
