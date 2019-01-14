---
title: Kubernetes Cluster
description: How to configure a Kubernetes Cluster as a deployment target in Octopus
position: 40
---
Kubernetes targets are used by the Kubernetes steps to define the context in which deployments and scripts are run.

Conceptually, a Kubernetes target represent a permission boundary and an endpoint. Kubernetes [permissions](http://g.octopushq.com/KubernetesRBAC) and [quotas](http://g.octopushq.com/KubernetesQuotas) are defined against a namespace, and both the account and namespace are captured as a Kubernetes target, along with the cluster endpoint URL.

## Add a Kubernetes Target

1. Navigate to {{Infrastructure,Deployment Targets}}, and click **ADD DEPLOYMENT TARGET**.
2. Select **KUBERNETES CLUSTER** and click **ADD** on the Kubernetes Cluster card.
3. Enter a display name for the Kubernetes Cluster.
4. Select at least one [environment](/docs/infrastructure/environments/index.md) for the target.
5. Select at least one [target role](/docs/infrastructure/deployment-targets/target-roles/index.md) for the target.
6. Select the authentication method for Kubernetes:
  - [Username and Password](/docs/infrastructure/accounts/username-and-password.md)
  - [Token](/docs/infrastructure/accounts/tokens.md)
  - [Azure Service Principal](/docs/infrastructure/accounts/azure/index.md#azure-service-principal)
  - [AWS Account](/docs/infrastructure/accounts/aws/index.md)
  - [Client Certificate](/docs/deployment-examples/kubernetes-deployments/kubernetes-target/index.md#certificates)
7. Enter the Kubernetes cluster URL.
7. Optionally, select the certificate authority if you've added one. If you need to add a certificate see [Kubernetes Certificate](/docs/deployment-examples/kubernetes-deployments/kubernetes-target/index.md#kubernetes-certificate). If you are not providing a certificate, tick the **Slip TLS verification**.
9. Enter the Kubernetes Namespace. For more information see, [Kubernetes Namespace](/docs/deployment-examples/kubernetes-deployments/kubernetes-target/index.md#kubernetes-namespaces).
10. Select a default worker pool for the target.
11. Click **SAVE**.

Learn more about [Kubernetes Deployment](/docs/deployment-examples/kubernetes-deployments/index.md) with Octopus.
