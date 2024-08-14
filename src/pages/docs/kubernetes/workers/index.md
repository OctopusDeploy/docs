---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-14
title: Kubernetes Workers
navTitle: Workers
navSection: Workers
description: Kubernetes workers
navOrder: 60
---

[Workers](/docs/infrastructure/workers) are a core component of Octopus Deploy; they provide the compute-resources required for executing tasks that don't need to be run on Octopus Server or individual
deployment targets.

A worker's ability to run workloads in parallel is constrained only by the available resources - however, during idle periods, being able to release

A single worker may run multiple workloads in parallel - or none during idle periods. As such, the ability to scale the worker's resources
to match its demands is critical

When running worker(s) in a Kubernetes Cluster, every operation is executed in its own pod - meaning workloads will automatically scale as necessary

## Installing the Kubernetes Worker
The Kubernetes Worker is installed using [Helm](https://helm.sh) via the [octopusdeploy/kubernetes-agent](https://github.com/OctopusDeploy/helm-charts/tree/main/charts/kubernetes-agent) chart (which is published to [dockerhub](octopusdeploy)).

To simplify this, there is an installation wizard in octopus to generate the required values.

:::div{.warning}
Helm will use your current kubectl config, so make sure your kubectl config is pointing to the correct cluster before executing the following helm commands.
You can see the current kubectl config by executing:
```bash
kubectl config view
```
:::

1. In the Octopus Web Portal, navigate to the **Infrastructure** tab, select **Workers**, and click **ADD WORKER**
2. Choose **Kubernetes** and click **ADD* on the Kubernetes Worker card.
3. Enter a **Name** for the worker, and select the **Worker Pools** in which the worker should belong, and select **NEXT**
   4. Click **Show advanced** to provide a custom Storage class or override the Octopus Server URL if required
5. Select the desired language (bash or powershell), then copy and execute the supplied helm install command in a terminal configured with your k8s cluster, and click **NEXT**
   6. This step is not required if the NFS driver already exists in your cluster (due to prior installs of k8s worker or deployment target)
7. Select the desired language (bash or powershell), then copy and execute the supplied helm install command in a terminal configured with your k8s cluster, and wait.

