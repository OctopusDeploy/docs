---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Rancher Kubernetes cluster
description: How to configure a Rancher Kubernetes cluster as a deployment target in Octopus
navOrder: 40
---
[Rancher](http://www.rancher.com) is a Kubernetes (K8s) cluster management tool that can be used to manage K8s clusters on local infrastructure, cloud infrastructure, and even cloud managed K8s services.  Not only can Rancher be used to centrally manage all of your K8s clusters, it can also be used to provide a central point for deployment, proxying commands through Rancher to the K8s clusters it manages.  This provides the advantage of managing access to your K8s clusters without having to add users to the clusters individually.

## Authentication

Before you can add your Rancher managed cluster, you must first create a means of authenticating to it.  This can be accomplished using the Rancher UI to create an access key.

1. Log into Rancher, then click on your profile in the upper right-hand corner.
1. Select **API & Keys**.
1. Click on **Add Key**.
1. Give the API Key an expiration and a scope.  
1. We recommend adding a description so you know what this key will be used for, then click **Create**.

After you click create, you will be shown the API Key information:
- Access Key (username): Used for Username/Password accounts in Octopus Deploy.
- Secret Key (password): Used for Username/Password accounts in Octopus Deploy.
- Bearer Token: Used for Token accounts in Octopus Deploy.

**Save this information, you will not be able to retrieve it later.**

## Rancher cluster endpoints

As previously mentioned, you can proxy communication to your clusters through Rancher.  Instead of connecting to the individual K8s API endpoints directly, you can use API endpoints within Rancher to issue commands.  The format of the URL is as follows: `https://<RancherUrl>/k8s/clusters/<ClusterId>`.

A quick way to find the correct URL is to grab it from the provided Kubeconfig file information.  For each cluster you define, Rancher provides a *Kubeconfig file* that can be downloaded directly from the UI.  To find it, select the cluster you need from the Global dashboard, and click the **Kubeconfig File** button:

![Rancher Kubeconfig file](/docs/infrastructure/deployment-targets/kubernetes-target/rancher/rancher-kubeconfig-file.png "width=500")

The next screen has the Kubeconfig file which contains the specific URL you need to use to connect your cluster to Octopus Deploy:

![Rancher cluster URL](/docs/infrastructure/deployment-targets/kubernetes-target/rancher/rancher-cluster-url.png "width=500")

## Add the account to Octopus Deploy

In order for Octopus Deploy to deploy to the cluster, it needs credentials to log in with. In the Octopus Web Portal, navigate to the **Infrastructure** tab and click **Accounts**.

Use one of the methods Rancher provided you with, *Username and Password* or *Token*.

1. Click **ADD ACCOUNT**.
1. Select which account type you want to create.
1. Enter the values for your selection, then click **SAVE**.


## Connecting a Rancher Kubernetes Deployment Target

Adding a Rancher K8s target is done in exactly the same way you would add any other [Kubernetes target](/docs/infrastructure/deployment-targets/kubernetes-target/#add-a-kubernetes-target).  The only Rancher specific component is the URL.  Other than that, the process is exactly the same.