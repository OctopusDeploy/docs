---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Deploy an Ingress resource
description: Deploy an ingress resource to a Kubernetes cluster.
navOrder: 40
---

[Ingress resources](https://oc.to/KubernetesIngressResource) provide a way to direct HTTP traffic to service resources based on the requested host and path.

:::figure
![Deploy ingress step](/docs/deployments/kubernetes/deploy-ingress/deploy-ingress-step.png)
:::

## Ingress name

Each Ingress resource must have a unique name, defined in the `Ingress name` field.

## Ingress host rules

Ingress resources configure routes based on the host that the request was sent to. New hosts can be added by clicking the `Add Host Rule` button.

The `Host` field defines the host where the request was sent to. This field is optional and if left blank will match all hosts.

The `Add Path` button adds a new mapping between a request path and the Service resource port.

The `Path` field is the path of the request to match. It must start with a `/`.

The `Service Port` field is the port from the associated Service resource that the traffic will be sent to.

The `Service Name` field is the name of the associated service to direct the traffic to.

## Ingress annotations

Ingress resources only provide configuration. A Ingress Controller resource uses the Ingress configuration to direct network traffic within the Kubernetes cluster.

There are many Ingress Controller resources available. [NGINX](https://oc.to/NginxIngressController) is a popular option, that is used by the [Azure AKS service](https://oc.to/AzureIngressController). Google Cloud provides its [own Ingress Controller resource](https://oc.to/GoogleCloudIngressController). A [third party Ingress Controller resource](https://oc.to/AwsIngressController) is available for AWS making use of the ALB service.

The diagram below shows a typical configuration with Ingress and Ingress Controller resources.

:::figure
![Ingress](/docs/deployments/kubernetes/ingress.svg)
:::

:::div{.hint}
There is no standard behavior to the creation of load balancers when configuring Ingress Controller resources.

For example, the Google Cloud Ingress Controller will create a new load balancer for every Ingress resource. The [documentation](https://oc.to/GoogleCloudIngressFanOut) suggests to create a single Ingress resource to achieve a fanout pattern that shares a single load balancer.

On the other hand, the [NGINX Ingress Controller resource installation procedure](https://oc.to/NginxIngressControllerDocs) creates a single LoadBalancer Service resource that is shared by default.
:::

Each of these different implementations is configured through the Ingress resource annotations. Annotations are key value pairs, and the values assigned to them depend on the Ingress resource that is being configured. The list below links to the documentation that describes the supported annotations.

* [NGINX](https://oc.to/NginxIngressControllerAnnotations)
* [Google Cloud](https://oc.to/GoogleCloudIngressControllerGitHub)
* [AWS](https://oc.to/AwsAlbAnnotations)

A new annotation is defined by clicking the `Add Annotation` button.

The `Name` field will provide suggested annotation names, but this list of suggestions is not exhaustive, and any name can be added.

The `Value` field defines the annotation value.

:::div{.hint}
Annotation values are always considered to be strings. See this [GitHub issue](https://oc.to/KubernetesAnnotationStringsIssue) for more information.
:::

The `Service Name` defines the name of the Service resource that this Ingress will send traffic to.

## Default rule

When there are no matching ingress rules, traffic can be sent to the service configured as the default rule. The `Port` field defines the service port that traffic will be sent to, and the `Service name` defines the name of the Service resource to send traffic to.

## Ingress labels

[Labels](https://oc.to/KubernetesLabels) are optional name/value pairs that are assigned to the Ingress resource.

## Learn more

- Generate an Octopus guide for [Kubernetes and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?destination=Kubernetes)
- [Kubernetes blog posts](https://octopus.com/blog/tag/kubernetes)