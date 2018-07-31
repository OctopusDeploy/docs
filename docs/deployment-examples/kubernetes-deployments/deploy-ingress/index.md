---
title: Deploy an ingress resource
description: Deploy an ingress resource to a Kubernetes cluster.
---

[Ingress resources](http://g.octopushq.com/KubernetesIngressResource) provide a way to direct HTTP traffic to Service resources based on the requested host and path.

#### Ingress Name

Each Ingress resource must have a unique name, defined in the `Ingress name` field.

#### Ingress Host Rules

Ingress resources configure routes based on the host that the request was sent to. New hosts can be added by clicking the `Add Host Rule` button.

The `Host` field defines the host where the request was sent to. This field is optional and if left blank will match all hosts.

The `Add Path` button adds a new mapping between a request path and the Service resource port.

The `Path` field is the path of the request to match. It must start with a `/`.

The `Service Port` field is the port from the associated Service resource that the traffic will be sent to.

The `Service Name` field is the name of the associated service to direct the traffic to.

#### Ingress Annotations

Ingress resources only provide configuration. A Ingress Controller resource uses the Ingress configuration to direct network traffic within the Kubernetes cluster.

There are many Ingress Controller resources available. [Nginx](https://g.octopushq.com/NginxIngressController) is a popular option, that is used by the [Azure AKS service](https://g.octopushq.com/AzureIngressController). Google Cloud provides its [own Ingress Controller resource](https://g.octopushq.com/GoogleCloudIngressController). A [third party Ingress Controller resource](https://g.octopushq.com/AwsIngressController) is available for AWS making use of the ALB service.

The diagram below shows a typical configuration with Ingress and Ingress Controller resources.

![Ingress](../ingress.svg)

:::hint
There is no standard behavior to the creation of load balancers when configuring Ingress Controller resources.

For example, the Google Cloud Ingress Controller will create a new load balancer for every Ingress resource. The [documentation](https://g.octopushq.com/GoogleCloudIngressFanOut) suggests to create a single Ingress resource to achieve a fanout pattern that shares a single load balancer.

On the other hand, the [Nginx Ingress Controller resource installation procedure](https://g.octopushq.com/NginxIngressControllerDocs) creates a single LoadBalancer Service resource that is shared by default.
:::

Each of these different implementations is configured through the Ingress resource annotations. Annotations are key value pairs, and the values assigned to them depend on the Ingress resource that is being configured. The list below links to the documentation that describes the supported annotations.

* [Nginx](https://g.octopushq.com/NginxIngressControllerAnnotations)
* [Google Cloud](https://g.octopushq.com/GoogleCloudIngressControllerGithub)
* [AWS](https://g.octopushq.com/AwsAlbAnnotations)

A new annotation is defined by clicking the `Add Annotation` button.

The `Name` field will provide suggested annotation names, but this list of suggestions is not exhaustive, and any name can be added.

The `Value` field defines the annotation value.

:::hint
Annotation values are always considered to be strings. See this [GitHub issue](https://g.octopushq.com/KubernetesAnnotationStringsIssue) for more information.
:::

#### Service Name

The `Service Name` defines the name of the Service resource that this Ingress will send traffic to.

#### Ingress Labels

[Labels](http://g.octopushq.com/KubernetesLabels) are optional name/value pairs that are assigned to the Service resource.
