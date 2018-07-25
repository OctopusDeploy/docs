---
title: Deploy to a Kubernetes cluster
description: Deploy to a Kubernetes cluster.
---

This featured was introduced as a prerelease in Octopus 2018.8.

:::warning
Kubernetes steps in Octopus are an alpha level quality, and have been made available for testing and feedback. They must not be used for production deployments, or enabled on production Octopus instances. The information provided here is subject to change at any point, and existing Kubernetes steps will most likely need to be deleted and recreated with Octopus upgrades.
:::

Octopus supports the deployment of Kubernetes resources through the `Deploy Kubernetes containers` step. This step exposes a UI that builds up a [Kubernetes Deployment resource](http://g.octopushq.com/KubernetesDeploymentResource), a [Service resource](http://g.octopushq.com/KubernetesServiceResource), and an [Ingress resource](http://g.octopushq.com/KuberntesIngressResource). The combination of these resources represents an opinionated view about what makes up a typical Kubernetes deployment.

## Deploy Kubernetes Containers Step

To begin, add the `Deploy Kubernetes containers` step to a project.

![Deploy Container Step](deploy-container-step.png)

This step has three important sections that make up the combined objects that are deployed to Kubernetes.

The first section is the `Deployment`. This section is used to build of the [Kubernetes Deployment resource](http://g.octopushq.com/KubernetesDeploymentResource).

:::hint
Kubernetes terminology overlaps with a number of general concepts in Octopus. For example, Kubernetes has the notion of a Deployment, which is distinct from the act of performing a deployment in Octopus.

To distinguish between Kubernetes and Octopus terminology, we will reference to Kubernetes "resources" e.g. a Deployment resource or Pod resource.
:::

A Deployment resource provides a declarative interface for a [Pod resource](http://g.octopushq.com/KubernetesPodResource) and a [ReplicaSet resource](http://g.octopushq.com/KubernetesReplicaSetResource).

A Pod resource in turn configures one or more [Containers resources](http://g.octopushq.com/KubernetesContainer). Container resources reference a Docker container image, and provide all the additional configuration required for Kubernetes to deploy, run, expose, monitor and secure the Docker container.

A ReplicaSet resource monitors the Pod resources to ensure that the required number of instances are running.

### Deployment name

Each Deployment resource requires a unique `Deployment Name`. Kubernetes resources are identified by their names, so the name must be unique in the target [namespace](http://g.octopushq.com/KubernetesNamespace).

### Replicas

The desired number of Pod resources is set in the `Replicas` field. This is the number of replicas maintained by the ReplicaSet resource. This field is optional, and will default to a value of `1`.

### Progression deadline

An optional value that defines the maximum time in seconds for a deployment to make progress before it is considered to be failed. If this value is not specified, it will default to `600` seconds (or 10 minutes).

This value affects [Blue/Green deployments](#bluegreen-deployment-strategy), which will point the service to the new deployment only once the new deployments has succeeded.

### Add Label

Labels are custom key/value pairs that are assigned to Kubernetes resources. The labels defined in the `Deployment` section are applied to the Deployment, Pod, Service and Ingress resources.

The labels are optional, as Octopus will automatically add the tags required to manage the Kubernetes resources created as part of this step.

### Deployment strategy

Kubernetes exposes two native deployment strategies.

### Recreate deployment strategy
The first native deployment strategy is the [Recreate](http://g.octopushq.com/KubernetesRecreateStrategy) deployment. This strategy will kill all existing Pod resources before new Pod resources are created. This means that one Pod resource version is exposed at any time, but can result in downtime before the new Pod resources are fully deployed.

### Rolling update deployment strategy
The second native deployment strategy is the [Rolling Update](http://g.octopushq.com/KubernetesRollingStrategy) deployment. This strategy will incrementally replace old Pod resources with new ones. This means that two Pod resource versions can be deployed and accessible at the same time, but can be performed in a way that results in no downtime.

### Blue/Green deployment strategy
The third deployment strategy, Blue/Green, is not a native concept in Kubernetes. It is a deployment strategy that is achieved by the `Deploy Kubernetes containers` step because it creates and coordinates both the Deployment resource and the Service resources.

The Blue/Green deployment strategy involves four phases.

#### Phase 1

The first phase is the state of the existing Deployment and Service resources.

If a previous Octopus deployment was performed, there will be both a Deployment and a Service resource in Kubernetes. These resources will have tags like `Octopus.Step.Id` and `Octopus.Deployment.Id` that identify the Octopus step and specific deployment that created the resources (these tags are added automatically by Octopus). This Deployment resource is considered to be the green half of the blue/green deployment.

#### Phase 2

The second phase involves creating the new Deployment resource. This new resource is considered to be the blue half of the blue/green deployment. It is important to note that the new Deployment resource is a completely new resource in Kubernetes. The existing green Deployment resource is not updated.

Because the names of distinct resources must be unique in Kubernetes, Octopus will append the Octopus deployment ID to the Deployment resource name. So if the Deployment resource name was defined as `my-application` in the step, the resulting Deployment resource name would look something like `my-application-deployment-1232`.

At the end of Phase 2 there are three resources in Kubernetes: the green Deployment resource, the Blue deployment resource, and the Service resource which is still pointing at the green Deployment resource.

#### Phase 3

The third phase involves waiting for the blue Deployment resource to be ready.

Octopus executes the command `rollout status "deployment/blue-deployment-name`, which will wait until the newly created blue Deployment resource is ready. For a Deployment resource to be considered ready, it must have been successfully created, and any Container resource [Readiness Probes](http://g.octopushq.com/KubernetesProbes) must have successfully complete.

:::hint
The [progression deadline](#progression-deadline) can be used to limit how long Kubernetes will wait for a Deployment to be successful.
:::

If the Deployment resource was successfully created, we move to phase 4. If the Deployment resource was not successfully created, the deployment process stops with an error.

#### Phase 4

If the Deployment resource was successfully created, Octopus will execute the final phase which involves pointing the Service resource to the blue Deployment resource, and cleaning up any old green Deployment resources.

At the beginning of Phase 4 there are three resources in Kubernetes: the green Deployment resource, the Blue deployment resource (now completely deployed and ready to accept traffic), and the Service resource which is still pointing at the green Deployment resource.

Octopus now updates the Service resource to direct traffic to the Blue deployment resource.

Once the Service resource is updated, any old Deployment resources are deleted. Old Deployment resources are defined as any Deployment resource with a `Octopus.Step.Id` label that matches the Octopus step that was just deployed, and a `Octopus.Deployment.Id` label that does not match the ID of the deployment that was just completed.

:::hint
If the deployment fails at phase 3, the Kubernetes cluster can be left with multiple Deployment resources in a failed state. Because Deployment resources with a `Octopus.Deployment.Id` label that does not match the current deployment are deleted in phase 4, a successful deployment will remove all previously created Deployment resource objects.

This means failed deployments can be retried, and once successful all previous Deployment resources will be cleaned up.
:::

#### Deployment strategy summary

The choice of which deployment strategy to use is influenced by three major factors:

1. Does the deployment require no downtime?
2. Can multiple versions of the Deployment resource coexist, even if different versions can not receive external traffic? This may not be possible if for example the act of deploying a new Deployment resource results in incompatible database upgrades.
3. Can multiple versions of the Deployment resource accept traffic at the same time? This may not be possible if for example APIs have changed in ways that are not backwards compatible.


| Strategy   | No Downtime  | Multiple Deployed Versions  | Multiple Accessible Versions |
|-|-|-|-|
| Recreate   |   |   |  |
| Rolling Update   | *  | *  | * |
| Blue/Green   | *  | *  |   |

### Volumes

[Volume resources](http://g.octopushq.com/KubernetesVolumes) allow external data to be accessed by a Container resource. Volume resources are defined in the `Volumes` section, and later referenced by the container configuration.

Kubernetes provides a wide range of Volume resource types. The common, cloud agnostic Volume resource types can be configured directly by Octopus. Other Volume resource types are configured as raw YAML.

#### Common values

All Volume resources must have a unique name defined in the `Name` field.

#### ConifgMap

The ConfigMap Volume resource exposes the data saved in a [ConfigMap resource](http://g.octopushq.com/KubernetesConfigMap) as files in a container.

The `ConfigMap name` field defines the name of the ConfigMap resource that is to be exposed.

Individual ConfigMap resource values can be optionally mapped to custom files by adding them as items. The item `Key` is the name of the ConfigMap resource key. The item `Path` is the name of the file that the ConfigMap value will be placed in.

For example, consider a ConfigMap secret resource created with the following YAML.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: special-config
  namespace: default
data:
  special.level: very
  special.type: charm
```

To mount this ConfigMap as a volume, the `ConfigMap name` would be set to `special-config`.

To expose the `special.level` key as a file called `my-special-level.txt`, an item would be added with the `Key` of `special.level` and a `Path` of `my-special-level.txt`.

If this Volume resource is mounted by a container under the directory `/data`, the file `/data/my-special-level.txt` would have the contents of `very`.

#### Secret

The Secret Volume resource exposes the data saving in a [Secret resource](http://g.octopushq.com/KubernetesSecretResource) as files in a container.

The `Secret name` field defines the name of the Secret resource that is to be exposed.

Individual Secret resource values can be optionally mapped to custom files by adding them as items. The item `Key` is the name of the Secret resource key. The item `Path` is the name of the file that the Secret value will be placed in.

For example, consider a Secret resource created with the following YAML.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  username: admin
  password: MWYyZDFlMmU2N2Rm
```

To mount this Secret as a volume, the `Secret name` would be set to `mysecret`.

To expose the `username` key as a file called `username.txt`, an item would be added with the `Key` of `username` and a `Path` of `username.txt`.

If this Volume resource is mounted by a container under the directory `/data`, the file `/data/username.txt` would have the contents of `admin`.
