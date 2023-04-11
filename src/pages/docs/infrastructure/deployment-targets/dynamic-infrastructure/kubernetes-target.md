---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Create Kubernetes Target Command
description: Cmdlet for creating a Kubernetes target
navOrder: 40
---

## Kubernetes
Command: **_New-OctopusKubernetesTarget_**

| Parameter                                | Cloud Provider  | Value                                                                                                                                               |
|------------------------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `-name`                                  |                 | Name for the Octopus deployment target.                                                                                                             |
| `-clusterUrl`                            |                 | The Kubernetes cluster URL. This must be a complete URL such as `https://mycluster.org`.                                                            |
| `-octopusServerCertificateIdOrName`      |                 | The name of the Octopus certificate to use as the cluster CA.                                                                                       |
| `-octopusRoles`                          |                 | Comma separated list of Roles to assign.                                                                                                            |
| `-octopusAccountIdOrName`                | Azure, AWS, GCE | The name of the Octopus account used for authentication with the cluster. This or the `-octopusClientCertificateIdOrName` option must be defined.   |
| `-octopusClientCertificateIdOrName`      |                 | The name of the Octopus certificate used for authentication with the cluster. This or the `-octopusAccountIdOrName` option must be defined.         |
| `-clusterResourceGroup`                  |                 | When using an Azure account, this defines the name of the resource group that holds the AKS cluster.                                                |
| `-clusterAdminLogin`                     | Azure           | Set to `$True` when building an AKS target to use the admin login.                                                                                  |
| `-clusterName`                           | Azure, AWS      | When using a AWS or Azure account, this defines the name of the EKS or AKS cluster.                                                                 |
| `-namespace`                             |                 | The default kubectl namespace.                                                                                                                      |
| `-updateIfExisting`                      |                 | Will update an existing Kubernetes target with the same name, create if it doesn't exist.                                                           |
| `-skipTlsVerification`                   |                 | The server's certificate will not be checked for validity. This will make your HTTPS connections insecure.                                          |
| `-octopusDefaultWorkerPoolIdOrName`      |                 | Name or Id of the Worker Pool for the deployment target to use. (Optional). Added in 2020.6.                                                        |
| `-healthCheckContainerImageFeedIdOrName` |                 | Name or Id of the feed that contains the health check container image. Added in 2021.2.                                                             |
| `-healthCheckContainerImage`             |                 | The name of the health check container image. Added in 2021.2.                                                                                      |
| `-clusterProject`                        | GCE             | The ID of the GCE project containing the GKE cluster to connect to.                                                                                 |
| `-clusterRegion`                         | GCE             | The name of the GKE cluster region (for regional clusters).                                                                                         |
| `-clusterZone`                           | GCE             | The name of the GKE cluster zone (for zonal clusters).                                                                                              |
| `-clusterImpersonateServiceAccount`      | GCE             | Set to `$True` to impersonate service accounts when defining a GKE cluster.                                                                         |
| `-clusterServiceAccountEmails`           | GCE             | Defines the service account emails to assume when defining a GKE cluster.                                                                           |
| `-clusterUseVmServiceAccount`            | GCE             | Set to `$True` to use the service account assigned to the virtual machine hosting the GKE target worker.                                            |
| `-awsUseWorkerCredentials`               | AWS             | Will create a Kubernetes Target configured to authenticate to AWS using Worker Credentials. `-octopusAccountIdOrName` option must _not_ be defined. |
| `-awsAssumeRoleArn`                      | AWS             | Adds an IAM Role to AWS Credentials. Can only be used with an AWS Account in `-octopusAccountIdOrName` or with `-awsUseWorkerCredentials`.          |
| `-awsAssumeRoleSession`                  | AWS             | Adds a Session Name to the IAM Role configuration. Can only be used when `-awsAssumeRoleArn` is used.                                               |
| `-awsAssumeRoleSessionDurationSeconds`   | AWS             | Adds a Session Duration in Seconds to the IAM Role Configuration. Can only be used when `-awsAssumeRoleArn` is used.                                |
| `-awsAssumeRoleExternalId`               | AWS             | Adds an External Id to the IAM Role Configuration. Can only be used when `-awsAssumeRoleArn` is used.                                               |

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

When creating a target using an AWS account with optional IAM Role, the EKS cluster name is 
required.

_Note:_ When using an IAM Role, Session, Session Duration and External ID are not 
required if the default is preferred.

```
New-OctopusKubernetesTarget `
    -name "The name of the target" `
    -octopusRoles "The target role" `
    -clusterUrl "https://k8scluster" `
    -octopusAccountIdOrName "The name of an aws account" `
    -clusterName "AwsEKSClusterName" `
    -namespace "kubernetes-namespace" `
    -updateIfExisting `
    -skipTlsVerification True `
    -awsAssumeRoleArn "MyIamRoleArnHere"`
    -awsAssumeRoleSession "MySessionNameHere"`
    -awsAssumeRoleSessionDurationSeconds 1200`
    -awsAssumeRoleExternalId "MyExternalIdHere"
```

When creating a target using AWS Worker Credentials, use the `-awsUseWorkerCredentials` option. The 
IAM Role options in the example above can also be used.

_Note:_ In this case, no `-octopusAccountIdOrName` is required.

```
New-OctopusKubernetesTarget `
    -name "The name of the target" `
    -octopusRoles "The target role" `
    -clusterUrl "https://k8scluster" `
    -clusterName "AwsEKSClusterName" `
    -namespace "kubernetes-namespace" `
    -updateIfExisting `
    -skipTlsVerification True `
    -awsUseWorkerCredentials
```

When creating a GKE target, the GCE project, region or zone, and cluster names are required:

```
New-OctopusKubernetesTarget `
    -name dynamicGKE `
    -octopusRoles gke `
    -environment Development `
    -octopusAccountIdOrName Google `
    -clusterProject kubernetes-demo-198002 `
    -clusterRegion australia-southeast1 `
    -clusterName mattc-test `
    -updateIfExisting
```

!include <create-deployment-targets-hint>