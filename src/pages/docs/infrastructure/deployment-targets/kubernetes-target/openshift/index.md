---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: OpenShift Kubernetes cluster
description: How to configure an OpenShift Kubernetes cluster as a deployment target in Octopus.
navOrder: 40
---

[OpenShift](https://www.openshift.com/) is a popular Kubernetes (K8s) management platform by Red Hat.  OpenShift provides an interface to manage and deploy containers to your K8s cluster as well as centrally manage security.  The OpenShift Container Platform rides on top of standard Kubernetes, this means that it can easily be integrated with Octopus Deploy as a deployment target.

## Authentication

To connect your OpenShift K8s cluster to Octopus Deploy, you must first create a means to authenticate with. We recommend that you create a [Service Account](https://docs.openshift.com/container-platform/4.4/authentication/understanding-and-creating-service-accounts.html) for Octopus Deploy to use.

:::div{.hint}
Service Accounts in OpenShift are project specific.  You will need to create a Service Account per project (namespace) for Octopus Deploy in OpenShift.
:::

### Create Service Account

Each project within OpenShift has a section where you can define Service Accounts.  After your project has been created:

- Expand **User Management**.
- Click **Service Accounts**.
- Click **Create Service Account**.

### Create Role Binding

The Service Account will need to have a role so it can create resources on the cluster.

In this example, the Service Account `octopusdeploy` is granted the role `cluster-admin` for the currently logged in project:

```
C:\Users\Shawn.Sesna\.kube>oc.exe policy add-role-to-user cluster-admin -z octopusdeploy
```

### Service Account Token

OpenShift will automatically create a Token for your Service Account.  This Token is how the Service Account authenticates to OpenShift from Octopus Deploy.  To retrieve the value of the token:

- Click Service Accounts.
- Click octopusdeploy (or whatever you named yours).
- Scroll down to the Secrets section.
- Click on the entry that has the `type` of `kubernetes.io/service-account-token`.

:::figure
![OpenShift Service Account](/docs/infrastructure/deployment-targets/kubernetes-target/openshift/openshift-service-account-secrets.png "width=500")
:::

Copy the Token value by clicking on the copy to clipboard icon on the right hand side.

#### Getting the cluster URL

To add OpenShift as a deployment target, you need the URL to the cluster.  The `status` argument for the `oc.exe` command-line tool will display the URL of the OpenShift K8s cluster:

```
C:\Users\Shawn.Sesna\.kube>oc.exe status
In project testproject on server https://api.crc.testing:6443
```

#### Project names are Namespaces

When you create projects within OpenShift, you are creating Namespaces in the K8s cluster.  The project name of your project is the Namespace within the K8s cluster.

## Connecting an OpenShift Kubernetes Deployment Target

Adding an OpenShift K8s target is done in exactly the same way you would add any other [Kubernetes target](/docs/infrastructure/deployment-targets/kubernetes-target/#add-a-kubernetes-target).