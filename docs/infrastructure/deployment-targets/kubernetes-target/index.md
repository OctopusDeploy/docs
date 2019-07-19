---
title: Kubernetes Cluster
description: How to configure a Kubernetes Cluster as a deployment target in Octopus
position: 40
---
Kubernetes targets are used by the [Kubernetes steps](/docs/deployment-examples/kubernetes-deployments/index.md) to define the context in which deployments and scripts are run.

Conceptually, a Kubernetes target represent a permission boundary and an endpoint. Kubernetes [permissions](http://g.octopushq.com/KubernetesRBAC) and [quotas](http://g.octopushq.com/KubernetesQuotas) are defined against a namespace, and both the account and namespace are captured as a Kubernetes target, along with the cluster endpoint URL.

## A Sample Config File

The YAML file below shows a sample **kubectl** configuration file. Existing Kubernetes users will likely have a similar configuration file.

A number of the fields in this configuration file map directly to the fields in an Octopus Kubernetes target, as noted in the next section.

```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUV5REN...
    server: https://kubernetes.example.org:443
  name: k8scluster
contexts:
- context:
    cluster: k8scluster
    user: k8suser
  name: k8suser
current-context: k8scluster
kind: Config
preferences: {}
users:
- name: k8suser
  user:
    client-certificate-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tL...
    client-key-data: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlKS0FJQkFBS0...
    token: 1234567890abcdefghijkl
- name: k8suser2
  user:
    password: some-password
    username: exp
- name: k8suser3
  user:
    token: 1234567890abcdefghijkl    
```

## Add a Kubernetes Target

1. Navigate to **{{Infrastructure,Deployment Targets}}**, and click **ADD DEPLOYMENT TARGET**.
2. Select **KUBERNETES CLUSTER** and click **ADD** on the Kubernetes Cluster card.
3. Enter a display name for the Kubernetes Cluster.
4. Select at least one [environment](/docs/infrastructure/environments/index.md) for the target.
5. Select at least one [target role](/docs/infrastructure/deployment-targets/index.md#target-roles) for the target.
6. Select the authentication method. Kubernetes targets support multiple [account types](http://g.octopushq.com/KubernetesAuthentication):
    - **Usernames/Password**: In the example YAML above, the user name is found in the `username` field, and the password is found in the `password` field. These values can be added as an Octopus  [Username and Password](/docs/infrastructure/deployment-targets/username-and-password.md) account.
    - **Tokens**: In the example YAML above, the token is defined in the `token` field. This value can be added as an Octopus [Token](/docs/infrastructure/deployment-targets/tokens.md) account.
    - **Azure Service Principal**: When using an AKS cluster, [Azure Service Principal accounts](/docs/infrastructure/deployment-targets/azure/index.md) allow Azure Active Directory accounts to be used.

    :::warning
    Azure accounts are not currently supported on SSH workers. If you attempt to use an Azure account with an SSH worker, you will receive an error like `Calamari.exe: cannot execute binary file `. The workaround is to use a Windows worker for Kubernetes targets with Azure accounts.
    :::

    :::hint
    The Azure Service Principal is only used with AKS clusters. To log into ACS or ACS-Engine clusters, standard Kubernetes credentials like certificates or service account tokens must be used.
    :::

    - **AWS Account**: When using an EKS cluster, [AWS accounts](/docs/infrastructure/deployment-targets/aws/index.md) allow IAM accounts and roles to be used.

    :::warning
    AWS accounts are not currently supported on SSH workers. If you attempt to use an AWS account with an SSH worker, you will receive an error like `Calamari.exe: cannot execute binary file `. The workaround is to use a Windows worker for Kubernetes targets with AWS accounts.
    :::

    The interaction between AWS IAM and Kubernetes Role Based Access Control (RBAC) can be tricky. You will certainly want to read the [AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/managing-auth.html).  A few frequently encountered snares are listed below:   

    :::hint
    If using the AWS account type, the Octopus server or worker will need to have the `aws-iam-authenticator.exe` executable available on the path. See the
    [AWS documentation](http://g.octopushq.com/AWSEKSKubectl) for download links.
    :::

    :::hint
    The error `You must be logged into the server (the server has asked for the client to provide credentials)` generally indicates the AWS account does not have permissions in the Kubernetes cluster.

    When you create an Amazon EKS cluster, the IAM entity user or role that creates the cluster is automatically granted `system:master` permissions in the cluster's RBAC configuration. To grant additional AWS users or roles the ability to interact with your cluster, you must edit the `aws-auth` ConfigMap within Kubernetes. See the [Managing Users or IAM Roles for your Cluster](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html).
    :::
    - **Client Certificate**: When authenticating with certificates, both the certificate and private key must be provided.

    In the example YAML above, the `client-certificate-data` field is a base 64 encoded certificate, and the `client-key-data` field is a base 64 encoded private key (both have been truncated for readability in this example).

    The certificate and private key can be combined and saved in a single pfx file. The script below accepts the base 64 encoded certificate and private key and uses the [Windows OpenSSL binary from Shining Light Productions](http://g.octopushq.com/OpenSSLWindows) to save them in a single pfx file.

    ```Powershell
    param (
      [Parameter(Mandatory = $true)]
      [string]$Certificate,
      [Parameter(Mandatory = $true)]
      [string]$PrivateKey
    )

    [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($Certificate)) | `
    	Set-Content -Path certificate.crt
    [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($PrivateKey)) | `
    	Set-Content -Path private.key
    C:\OpenSSL-Win32\bin\openssl pkcs12 `
      -passout pass: `
      -export `
      -out certificateandkey.pfx `
      -in certificate.crt `
      -inkey private.key
    ```
    ```bash
    #!/bin/bash
    echo $1 | base64 --decode > certificate.crt
    echo $2 | base64 --decode > private.key
    openssl pkcs12 \
      -passout pass: \
      -export \
      -out certificateandkey.pfx \
      -in certificate.crt \
      -inkey private.key
    ```

    This file can then be uploaded to the [Octopus certificate management area](/docs/deployment-examples/certificates/index.md), after which, it will be made available to the Kubernetes target.

    The Certificates Library can be access via **{{Library>Certificates}}**.

7. Enter the Kubernetes cluster URL. Each Kubernetes target requires the cluster URL, which is defined in the `Kubernetes cluster URL` field. In the example YAML about, this is defined in the `server` field.
8. Optionally, select the certificate authority if you've added one. Kubernetes clusters are often protected with self-signed certificates. In the YAML example above the certificate is saved as a base 64 encoded string in the `certificate-authority-data` field.

To communicate with a Kubernetes cluster with a self signed certificate over HTTPS, you can either select the **Skip TLS verification** option, or supply the certificate in `The optional cluster certificate authority` field.

Decoding the `certificate-authority-data` field results in a string that looks something like this (the example has been truncated for readability):

```
-----BEGIN CERTIFICATE-----
MIIEyDCCArCgAwIBAgIRAOBNYnhYDBamTvQn...
-----END CERTIFICATE-----
```

Save this text to a file called `ca.pem`, and upload it to the [Octopus certificate management area](http://g.octopushq.com/CertificatesDocumentation). The certificate can then be selected in the `cluster certificate authority` field.
9. Enter the Kubernetes Namespace.
When a single Kubernetes cluster is shared across environments, resources deployed to the cluster will often be separated by environment and by application, team, or service. In this situation, the recommended approach is to create a namespace for each application and environment (e.g., `myapplication-development` and `my-application-production`), and create a Kubernetes service account that has permissions to just that namespace.

Where each environment has its own Kubernetes cluster, namespaces can be assigned to each application, team or service (e.g. `myapplication`).

In both scenarios, a target is then created for each Kubernetes cluster and namespace. The `Target Role` tag is set to the application name (e.g. `myapplication`), and the `Environments` are set to the matching environment.

When a Kubernetes target is used, the namespace it references is created automatically if it does not already exist.

10. Select a worker pool for the target.
To make use of the Kubernetes steps, the Octopus server or workers that will run the steps need to have the `kubectl` executable installed. Linux workers also need to have the `jq`, `xargs` and `base64` applications installed.
11. Click **SAVE**.

## Creating Service Accounts

The recommended approach to configuring a Kubernetes target is to have a service account for each application and namespace.

In the example below, a service account called `jenkins-development` is created to represent the deployment of an application called `jenkins` to an environment called `development`. This service account has permissions to perform all operations (i.e. `get`, `list`, `watch`, `create`, `update`, `patch`, `delete`) on the resources created by the `Deploy kubernetes containers` step (i.e. `deployments`, `replicasets`, `pods`, `services`, `ingresses`, `secrets`, `configmaps`).

```yaml
---
kind: Namespace
apiVersion: v1
metadata:
  name: jenkins-development
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: jenkins-deployer
  namespace: jenkins-development
---
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: jenkins-development
  name: jenkins-deployer-role
rules:
- apiGroups: ["", "extensions", "apps"]
  resources: ["deployments", "replicasets", "pods", "services", "ingresses", "secrets", "configmaps"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: [""]
  resources: ["namespaces"]
  verbs: ["get"]     
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: jenkins-deployer-binding
  namespace: jenkins-development
subjects:
- kind: ServiceAccount
  name: jenkins-deployer
  apiGroup: ""
roleRef:
  kind: Role
  name: jenkins-deployer-role
  apiGroup: ""
```

In cases where it is necessary to have an administrative service account created (for example, when using AWS EKS because the initial admin account is tied to an IAM role), the following YAML can be used.

```YAML
apiVersion: v1
kind: ServiceAccount
metadata:
  name: octopus-administrator
  namespace: default
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: octopus-administrator-binding
  namespace: default
subjects:
- kind: ServiceAccount
  name: octopus-administrator
  namespace: default
  apiGroup: ""
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
```

Creating service accounts automatically results in a token being generated. The PowerShell snippet below returns the token for the `jenkins-deployer` account.

```PowerShell
$user="jenkins-deployer"
$namespace="jenkins-development"
$data = kubectl get secret $(kubectl get serviceaccount $user -o jsonpath="{.secrets[0].name}" --namespace=$namespace) -o jsonpath="{.data.token}" --namespace=$namespace
[System.Text.Encoding]::ASCII.GetString([System.Convert]::FromBase64String($data))
```

This bash snippet also returns the token value.

```bash
kubectl get secret $(kubectl get serviceaccount jenkins-deployer -o jsonpath="{.secrets[0].name}" --namespace=jenkins-development) -o jsonpath="{.data.token}" --namespace=jenkins-development | base64 --decode
```

The token can then be saved as a Token Octopus account, and assigned to the Kubernetes target.

## Kubectl

Kubernetes targets use the `kubectl` executable to communicate with the Kubernetes cluster. This executable must be available on the path on the target where the step is run. When using workers, this means the `kubectl` executable must be in the path on the worker that is executing the step. Otherwise the `kubectl` executable must be in the path on the Octopus server itself.

## Helm

When a Kubernetes target is used with a Helm step, the `helm` executable must be on the target where the step is run.

## Dynamic Targets

Kubernetes targets can be created dynamically at deploy time with the Powershell function `New-OctopusKubernetesTarget`.

See [Create Kubernetes Target Command](/docs/infrastructure/deployment-targets/dynamic-infrastructure/kubernetes-target.md) for more information.

## Next

Learn more about [Kubernetes Deployment](/docs/deployment-examples/kubernetes-deployments/index.md) with Octopus.
