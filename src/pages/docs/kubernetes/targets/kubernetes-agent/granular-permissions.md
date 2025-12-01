---
layout: src/layouts/Default.astro
pubDate: 2025-9-24
modDate: 2025-9-24
title: Granular Permissions
description: Define Kubernetes RBAC for your Kubernetes agent deployment based on Octopus context
navOrder: 22
---

Kubernetes offers an RBAC system to lock down what Kubernetes objects your workloads can create and access. The Kubernetes agent supports setting a [single service account](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/permissions) for your script pods during installation, but this does not fit all use cases.

If you are sharing a cluster between teams and/or environments, granular Kubernetes agent permissions can help lock down your cluster without creating a Kubernetes agent per permission set.

Granular Kubernetes agent permissions works by having the cluster admin create objects on the target cluster that create links between Octopus scope and Kubernetes permissions.

## How does it work?

For each namespace you are deploying to in your Kubernetes cluster, you'll create a `WorkloadServiceAccount` that specifies which spaces, projects, environments and/or tenants are allowed to act under a set of permissions.

When you don't create a `WorkloadServiceAccount` with a matching scope for your deployment, the default script pod permissions configured during installation of the Kubernetes agent will be used instead.

Once you've added your `WorkloadServiceAccounts`, Octopus will handle assigning permissions transparently.

## Who should use this feature

Use it if you require principle of least privilege or limited access for your developers. This feature increases friction when creating new applications so we do not recommend it for all circumstances.

## How do I use it?

Granular permissions uses a Kubernetes controller and custom resources to configure Kubernetes RBAC per deployment.

### Installing Octopus Permissions Controller

Octopus Permissions Controller is a standalone component that is installed via Helm, much like the Kubernetes agent. The installation includes the controller itself and the `WorkloadServiceAccount` CRD.

Only a single Octopus Permissions Controller is required per cluster.

The below Helm command will install Octopus Permissions Controller.
```
helm upgrade --install --atomic \
--create-namespace --namespace octopus-permissions-controller-system \
--reset-then-reuse-values \
octopus-permissions-controller \
oci://registry-1.docker.io/octopusdeploy/octopus-permissions-controller-chart
```

:::div{.info}
**Pre-requisites:**
- Kubernetes agent v2.28.1+
:::

### Workload Service Accounts

`WorkloadServiceAccounts` can be created as you would any other Kubernetes object. Your `WorkloadServiceAccount` should be created in the namespace you will be deploying your application resources into.

:::figure
![Deployed resources](/docs/img/kubernetes/targets/kubernetes-agent/granular-permissions/deployed-resources.png)
:::

`Roles` and `RoleBindings` will be created in the application namespace by Octopus Permissions Controller. A linked `ServiceAccount` will be created in the Kubernetes agent namespace.

:::figure
![Created resources](/docs/img/kubernetes/targets/kubernetes-agent/granular-permissions/created-resources.png)
:::

When a deployment that matches the scope configured on the `WorkloadServiceAccount` starts, the created `ServiceAccount` will automatically be assigned.

#### Creating Workload Service Accounts

The `WorkloadServiceAccount` spec consists of two main parts; the scope and the permission set.

```yaml
apiVersion: agent.octopus.com/v1beta1
kind: WorkloadServiceAccount
metadata:
  name: sample-wsa
  namespace: your-application-namespace
spec:
  scope:
    spaces: [default]
    projects: [guestbook]
    environments: [dev-a,dev-b]
  permissions:
    permissions:
      - verbs: ["*"]
        apiGroups: ["*"]
        resources: ["*"]
    roles:
      - apiGroup: rbac.authorization.k8s.io/v1 
        kind: Role
        name: your-existing-role
```

:::div{.info}
For more examples and common scenarios, have a look at the [Octopus Permissions Controller repo](https://github.com/OctopusDeploy/octopus-permissions-controller/tree/main/examples)
:::

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

When non-namespaced scoped permissions are required, `ClusterWorkloadServiceAccount` are available to configure your permissions. These work the same way as `WorkloadServiceAccounts`.

#### Combining WSAs

Not all permissions exist in a vacuum and we don't want to repeat ourselves too much when creating `WorkloadServiceAccount` definitions. To help compose your desired permissions, `WorkloadServiceAccounts` are built additively.

When a workload with a particular scope matches multiple `WorkloadServiceAccount` scopes, the permissions are combined and both applied to a single `ServiceAccount`.

### Running deployments

With the Octopus Permissions Controller and your `WorkloadServiceAccounts` configured, running deployments is done exactly as before and it will seamlessly apply the appropriate `ServiceAccount` that best matches the scope of the deployment.

If there are no `WorkloadServiceAccounts` that match the deployments scope, the deployment will use the default permissions configured for script pods when you installed the Kubernetes agent.

:::div{.info}
We recommend restricting the default permissions to be completely empty so that deployments without matching scopes will fail quickly.
:::

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

Because this component is shared between Kubernetes agents on your cluster, we have opted to separate its upgrade cycle from a single Kubernetes agent.

As we deploy Octopus Permissions Controller as a Helm chart, you can use any method you wish to install new versions. Notification of new versions will be available in the connectivity page of your Kubernetes agent, as well as a command to help upgrade your existing installation.

:::figure
![Permissions controller update](/docs/img/kubernetes/targets/kubernetes-agent/granular-permissions/opc-update.png)
:::

### Installing on a cluster with existing agents

Octopus Permissions Controller can be installed on a cluster with existing Kubernetes agents and it will immediately start applying permissions from matching `WorkloadServiceAccounts`.

It is highly recommended that you update each of your agents default script pod permissions to be more restrictive. If a matching `WorkloadServiceAccount` is found, it will correctly apply restricted permissions, but any misconfiguration that results in no matching `WorkloadServiceAccount` could result in your deployment having more permissive permissions than intended.

For basic installations of the Kubernetes agent, this command will remove default permissions.
```
helm upgrade --install --atomic \
--create-namespace --namespace ${agent_namespace} \
--reset-then-reuse-values \
--set scriptPods.serviceAccount.clusterRole.enabled="false" \
${release_name) \
oci://registry-1.docker.io/octopusdeploy/octopus-permissions-controller-chart
```

### Removing Octopus Permissions Controller

If the Octopus Permissions Controller is no longer desired, it can be removed in two steps.

1. Uninstall the Helm chart from your cluster. If you installed the permissions controller with the default parameters the commands below will do this.
```
helm uninstall --namespace octopus-permissions-controller-system octopus-permissions-controller
kubectl delete namespace octopus-permissions-controller-system
```

2. Update your Kubernetes agent default permissions if required. This command below will allow for unrestricted deployments.
```
helm upgrade --install --atomic \
--create-namespace --namespace ${agent_namespace} \
--reset-then-reuse-values \
--set scriptPods.serviceAccount.clusterRole.enabled="true" \
${release_name) \
oci://registry-1.docker.io/octopusdeploy/octopus-permissions-controller-chart
```

## Troubleshooting

### Is Octopus Permissions Controller operational?

Octopus Permissions Controller will report it's status via the health check each of the Kubernetes agents on the same cluster performs.

:::figure
![Permissions controller connectivity](/docs/img/kubernetes/targets/kubernetes-agent/granular-permissions/opc-connectivity.png)
:::

If the permissions controller is reported as not found, try running a new health check and monitor the Octopus Permissions Controller pod logs in Kubernetes to confirm that the script pod is being discovered.

### Deployment fails during verification

When using [deployment verification](/docs/kubernetes/deployment-verification) with granular permissions, your deployment may fail during the verification phase even though the resources were created successfully. This occurs because the script pod that performs the deployment also needs to read the deployed resources to verify they reached the desired state.

To resolve this issue, update your `WorkloadServiceAccount` to include read permissions:
- The `get` verb for parent resources (such as Deployments)
- The `list` verb for child resources (such as Pods and ReplicaSets)

You can further troubleshoot permission related deployment failures by adding `kubectl auth whoami` to and `kubectl auth can-i` commands to your deployment process using the "Run a kubectl script" step.
