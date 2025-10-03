---
layout: src/layouts/Default.astro
pubDate: 2025-9-24
modDate: 2025-9-24
title: Granular Permissions
description: Define Kubernetes RBAC for your Kubernetes agent deployment based on Octopus context
navOrder: 99
---

Kubernetes offers a RBAC system to lock down what Kubernetes objects your workloads can create and access. The Kubernetes agent supports setting a [single service account](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/permissions) for your script pods during installation, but this does not fit all use cases.

If you are sharing a cluster between teams and/or environments, granular Kubernetes agent permissions can help lock down your cluster without creating a Kubernetes agent per permission set.

Granular Kubernetes agent permissions works by having the cluster admin create objects on the target cluster that create links between Octopus scope and Kubernetes permissions.

## How does it work?

For each namespace you are deploying to in your Kubernetes cluster, you'll create a `WorkloadServiceAccount` that specifies the which spaces, projects, environments and/or tenants are allowed to act under a set of permissions.

When you don't create a `WorkloadServiceAccount` with a matching scope for your deployment, the default script pod permissions configured during installation of the Kubernetes agent will be used instead.

Once you've added your `WorkloadServiceAccounts`, Octopus will handle assigning permissions transparently.

## How do I use it?

### Installing OPC 

Octopus Permissions Controller is a standalone component that is installed via Helm, much like the Kubernetes agent. The installation includes the controller itself and the `WorkloadServiceAccount` CRD.

Only a single Octopus Permissions Controller is required per cluster.

### Workload Service Accounts

```yaml
TODO: Example WSA
```

#### Creating Workload Service Accounts

`WorkloadServiceAccounts` can be created as you would any other Kubernetes object. Your `WorkloadServiceAccount` should be created in the namespace you will be deploying your application resources into.

TODO: Diagram of SA, WSA, roles, rolebindings

The `WorkloadServiceAccount` consists of two main parts; the scope and the permission set.

##### Scope

Each `WorkloadServiceAccount` is assigned a scope with the following fields
- Spaces
- Projects
- Environments
- Tenants
- Steps

These fields are matched against the corresponding slug within Octopus.

Each field adheres to the following rules to match:
- A field that is omitted entirely is treated as a wildcard, it will match any value
- A field with one or more values will match exactly to one or more slugs
- Each value must be a complete slug, partial matches are not supported

Each `WorkloadServiceAccount` must have at least one non-empty field. You cannot have a `WorkloadServiceAccount` that matches every scope.

##### Permissions

The permissions applied for each scope can be configured a couple of ways:
- Directly reference permissions on the `WorkloadServiceAccount`
- Reference existing `Roles` or `ClusterRoles`

#### Cluster Workload Service Accounts

When cluster scoped permissions are required (ie. `ClusterRoleBindings` are required), `ClusterWorkloadServiceAccount` are available to configure your permissions. These work the same way as `WorkloadServiceAccounts`.

#### Combining WSAs

Not all permissions exist in a vacuum and we don't want to repeat ourselves too much when creating `WorkloadServiceAccount` definitions. To help compose your desired permissions, `WorkloadServiceAccounts` are built additively.

When a workload with a particular scope matches multiple `WorkloadServiceAccount` scopes, the permissions are combined and both applied to a single `ServiceAccount`.

A deployment workload can access two namespaces in a single step by matching the scope of two or more `WorkloadServiceAccounts` that are spread across namespaces.

```yaml
TODO: Example
```

### Running deployments

With the Octopus Permissions Controller and your `WorkloadServiceAccounts` configured, running deployments is done exactly as before and it will seamlessly apply the appropriate `ServiceAccount` that best matches the scope of the deployment.

If there are no `WorkloadServiceAccounts` that match the deployments scope, the deployment will use the default permissions configured for script pods when you installed the Kubernetes agent.

:::div{.info}
We recommend restricting the default permissions to be completely empty so that deployments without matching scopes will fail quickly.
:::

## Who should use this feature

Use it if you require principle of least privilege or limited access for your developers. This feature does increase friction when creating new applications so we do not recommend it for all circumstances.

## Suggested Workflows

### Permission assignment strategies

#### Full access within each namespace

TODO:
Start with a WSA that gives control to do whatever in the namespace

- No further tweaking needed to manage the deployment
- Cannot reduce permissions

#### WSA access to craft granular permissions

TODO:
Start with a WSA with permissions to create WSAs

- Lets each step have it's own permissions

### Namespace and WSA provisioning

#### Provision namespaces with runbooks for self service

TODO:
Example

#### Manual/External system provisioning

TODO:

## Octopus Permissions Controller

### How does it work under the covers

Octopus Permissions Controller is in charge of several duties:
- Managing the lifecycle of `WSAs`
- Creating roles, role bindings and service accounts as defined by your `WSAs`
- Applying service accounts to your Kubernetes agent script pods that run your deployment workloads

`ServiceAccounts` are generated ahead of time by calculating the minimum number of unique permissions combinations that are defined by your `WorkloadServiceAccounts`.

At the time of creation of a new script pod, Octopus Permissions Controller acts as a mutating admission webhook controller to match the scope annotated on the script pod with a matching `ServiceAccount` (if any).

For some cases (eg. health checks), the Kubernetes agent runs a workload without a specific scope and so no `ServiceAccount` is applied to the script pod by Octopus Permissions Controller.

Interested in more detail? Check out the [Octopus Permissions Controller repository](https://github.com/OctopusDeploy/octopus-permissions-controller).

### Upgrades

Because this component is shared between Kubernetes agents on your cluster, we have opted to separate it's upgrade cycle from a since Kubernetes agent.

As we deploy Octopus Permissions Controller as a Helm chart, you can use any method you wish to install new versions. Notification of new versions will be available in the "Machines" page of your Kubernetes agent, as well as a command to help upgrade your existing installation.

### Installing on a cluster with existing agents

Octopus Permissions Controller can be installed on a cluster with existing Kubernetes agents and it will immediately start applying permissions from matching `WorkloadServiceAccounts`.

It is highly recommended that you update each of your agents default script pod permissions to be more restrictive. If a matching `WorkloadServiceAccount` is found, it will correctly apply restricted permissions, but any misconfiguration that results in no matching `WorkloadServiceAccount` could result in your deployment having more permissive permissions than intended.

## Troubleshooting

### Is Octopus Permissions Controller operational?

Octopus Permissions Controller will report it's status via the health check each of the Kubernetes agents on the same cluster performs.

TODO: Image

### Expected permissions are not being applied to script pods

TODO: Checking what scope was applied via deployment logs
TODO: Checking what WSAs contributed to the SA
TODO: Example
