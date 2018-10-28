---
title: Create Kubernetes Target Command
description: Cmdlet for creating a Kubernetes target
position: 40
---

## Kubernetes
Command: **_New-OctopusKubernetesTarget_**

| Parameter                     | Value                                                                                   |
| ------------------------------| --------------------------------------------------------------------------------------- |
| `-name`  |  Name for the Octopus deployment target.  |
| `-clusterUrl`   | The Kubernetes cluster URL. This must be a complete URL such as `https://mycluster.org`.  |
| `-octopusServerCertificateIdOrName`   |  The name of the Octopus certificate to used as the cluster CA.  |
| `-octopusRoles`    | Comma separated list of Roles to assign.   |
| `-octopusAccountIdOrName`   |  The name of the Octopus account used to authentication with the cluster. This or the `-octopusClientCertificateIdOrName` option must be defined. |
|  `-octopusClientCertificateIdOrName`   |  The name of the Octopus certificate used to authentication with the cluster. This or the `-octopusAccountIdOrName` option must be defined. |
| `-clusterResourceGroup`   | When using an Azure account, this defines the name of the resource group that holds the AKS cluster.  |
|  `-clusterName`    | When using a AWS or Azure account, this defines the name of the EKS or AKS cluster.  |
| `-namespace`   | The default kubectl namespace.  |
| `-updateIfExisting`    | Will update an existing Kubernetes target with the same name, create if it doesn't exist.  |
| `-skipTlsVerification`   | The server's certificate will not be checked for validity. This will make your HTTPS connections insecure.  |

### Examples

Create a target with a username/password or token account.

```
New-OctopusKubernetesTarget `
    -name "The name of the target" `
    -clusterUrl "https://k8scluster" `
    -octopusRoles "The target role" `
    -octopusAccountIdOrName "The name of an account" `
    -namespace "kubernetes-namespace" `
    -updateIfExisting `
    -skipTlsVerification True
```

When creating a target with a client certificate, the name of the certificate is required.

```
New-OctopusKubernetesTarget `
    -name "The name of the target" `
    -clusterUrl "https://k8scluster" `
    -octopusRoles "The target role" `
    -octopusClientCertificateIdOrName "The name of a certificate" `
    -namespace "kubernetes-namespace" `
    -updateIfExisting `
    -skipTlsVerification True
```

When creating a target using an Azure account, the cluster URL and certificates are not required. The Azure resource group and AKS name are required.

```
New-OctopusKubernetesTarget `
    -name "The name of the target" `
    -octopusRoles "The target role" `
    -octopusAccountIdOrName "The name of an azure account" `
    -clusterResourceGroup "AzureResourceGroupName" `
    -clusterName "AzureAKSClusterName" `
    -namespace "kubernetes-namespace" `
    -updateIfExisting `
    -skipTlsVerification True
```

When creating a target using an AWS account, the EKS cluster name is required.

```
New-OctopusKubernetesTarget `
    -name "The name of the target" `
    -octopusRoles "The target role" `
    -clusterUrl "https://k8scluster" `
    -octopusAccountIdOrName "The name of an aws account" `
    -clusterName "AwsEKSClusterName" `
    -namespace "kubernetes-namespace" `
    -updateIfExisting `
    -skipTlsVerification True
```
