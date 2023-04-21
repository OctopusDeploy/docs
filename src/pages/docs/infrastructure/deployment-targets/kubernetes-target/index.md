---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Kubernetes cluster
description: How to configure a Kubernetes cluster as a deployment target in Octopus
navOrder: 50
---
Kubernetes targets are used by the [Kubernetes steps](/docs/deployments/kubernetes) to define the context in which deployments and scripts are run.

Conceptually, a Kubernetes target represent a permission boundary and an endpoint. Kubernetes [permissions](https://oc.to/KubernetesRBAC) and [quotas](https://oc.to/KubernetesQuotas) are defined against a namespace, and both the account and namespace are captured as a Kubernetes target, along with the cluster endpoint URL.  A namespace is required when registering the Kubernetes cluster with Octopus Deploy. By default, the namespace used in the registration is used in health checks and deployments. The namespace can be overwritten in the deployment process.

:::div{.hint}
From **Octopus 2022.2**, AKS target discovery has been added to the 
Kubernetes Target Discovery Early Access Preview and is enabled via **{{Configuration, Features}}**.

From **Octopus 2022.3** will include EKS cluster support.
:::

## Discovering Kubernetes targets

Octopus can discover Kubernetes targets in _Azure Kubernetes Service_ (AKS) or _Amazon Elastic Container Service for Kubernetes_ (EKS) as part of your deployment using tags on your AKS or EKS resource. 

:::div{.hint}
From **Octopus 2022.3**, you can configure the well-known variables used to discover Kubernetes targets when editing your deployment process in the Web Portal. See [cloud target discovery](/docs/infrastructure/deployment-targets/cloud-target-discovery) for more information.
:::

To discover targets use the following steps:

- Add an Azure account variable named **Octopus.Azure.Account** or the appropriate AWS authentication variables ([more info here](/docs/infrastructure/deployment-targets/cloud-target-discovery/#aws)) to your project.
- [Add tags](/docs/infrastructure/deployment-targets/cloud-target-discovery/#tag-cloud-resources) to your cluster so that Octopus can match it to your deployment step and environment.
- Add any of the Kubernetes built-in steps to your deployment process. During deployment, the target role on the step will be used along with the environment being deployed to, to discover Kubernetes targets to deploy to.

Kubernetes targets discovered will not have a namespace set, the namespace on the step will be used during deployment (or the default namespace in the cluster if no namespace is set on the step).

See [cloud target discovery](/docs/infrastructure/deployment-targets/cloud-target-discovery) for more information.

## A sample config file

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

## Add a Kubernetes target

1. Navigate to **{{Infrastructure,Deployment Targets}}**, and click **ADD DEPLOYMENT TARGET**.
2. Select **KUBERNETES CLUSTER** and click **ADD** on the Kubernetes Cluster card.
3. Enter a display name for the Kubernetes Cluster.
4. Select at least one [environment](/docs/infrastructure/environments) for the target.
5. Select at least one [target role](/docs/infrastructure/deployment-targets/#target-roles) for the target.
6. Select the authentication method. Kubernetes targets support multiple [account types](https://oc.to/KubernetesAuthentication):
    - **Usernames/Password**: In the example YAML above, the user name is found in the `username` field, and the password is found in the `password` field. These values can be added as an Octopus  [Username and Password](/docs/infrastructure/accounts/username-and-password) account.
    - **Tokens**: In the example YAML above, the token is defined in the `token` field. This value can be added as an Octopus [Token](/docs/infrastructure/accounts/tokens) account.
    - **Azure Service Principal**: When using an AKS cluster, [Azure Service Principal accounts](/docs/infrastructure/accounts/azure) allow Azure Active Directory accounts to be used.

      The Azure Service Principal is only used with AKS clusters. To log into ACS or ACS-Engine clusters, standard Kubernetes credentials like certificates or service account tokens must be used.

      :::div{.hint}
      Available from **Octopus 2020.6**, the **Login with administrator credentials** option may be required to authenticate with an AKS cluster with Azure Active Directory integration, as performing a non-interactive login with `kubectl` is not currently available. See this <a href="https://feedback.azure.com/forums/914020-azure-kubernetes-service-aks/suggestions/35146387-support-non-interactive-login-for-aad-integrated-c">Azure UserVoice</a> suggestion for more details on this limitation.
      :::

    - **AWS Account**: When using an EKS cluster, [AWS accounts](/docs/infrastructure/accounts/aws) allow IAM accounts and roles to be used.

      The interaction between AWS IAM and Kubernetes Role Based Access Control (RBAC) can be tricky. We highly recommend reading the [AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/managing-auth.html).    

      :::div{.hint}
      **Common issues:**
      From version 2022.4 Octopus can use the `aws cli` to authenticate to an EKS cluster, earlier versions rely on the `aws-iam-authenticator`. If using the AWS account type, the Octopus Server or worker must have either the `aws cli` (1.16.156 or later) or `aws-iam-authenticator` executable on the path. If both are present the `aws cli` will be used. The EKS api version is selected based on the kubectl version. For Octopus 2022.3 and earlier `kubectl` `1.23.6` and `aws-iam-authenticator` version `0.5.3` or earlier must be used, these target `v1alpha1` endpoints. For `kubectl` `1.24.0` and later `v1beta1` endpoints are used and versions `0.5.5` and later of the `aws-iam-authenticator` are required. See the [AWS documentation](https://oc.to/AWSEKSKubectl) for download links.

      The error `You must be logged into the server (the server has asked for the client to provide credentials)` generally indicates the AWS account does not have permissions in the Kubernetes cluster.

      When you create an Amazon EKS cluster, the IAM entity user or role that creates the cluster is automatically granted `system:master` permissions in the cluster's RBAC configuration. To grant additional AWS users or roles the ability to interact with your cluster, you must edit the `aws-auth` ConfigMap within Kubernetes. See the [Managing Users or IAM Roles for your Cluster](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html).
      :::
    - **Google Cloud Account**: When using a GKE cluster, [Google Cloud accounts](/docs/infrastructure/accounts/google-cloud) allow you to authenticate using a Google Cloud IAM service account.

      :::div{.hint}
      From `kubectl` version `1.26`, authentication against a GKE cluster [requires an additional plugin called `gke-cloud-auth-plugin` to be available](https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke) on the PATH where your step is executing. If you manage your own execution environment (eg self-hosted workers, custom execution containers etc), you will need to ensure the auth plugin is available alongside `kubectl`
      :::
    - **Client Certificate**: When authenticating with certificates, both the certificate and private key must be provided.

      In the example YAML above, the `client-certificate-data` field is a base 64 encoded certificate, and the `client-key-data` field is a base 64 encoded private key (both have been truncated for readability in this example).

      The certificate and private key can be combined and saved in a single pfx file. The script below accepts the base 64 encoded certificate and private key and uses the [Windows OpenSSL binary from Shining Light Productions](https://oc.to/OpenSSLWindows) to save them in a single pfx file.

      ```powershell
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

      This file can then be uploaded to the [Octopus certificate management area](/docs/deployments/certificates), after which, it will be made available to the Kubernetes target.

      The Certificates Library can be accessed via **{{Library>Certificates}}**.

7. Enter the Kubernetes cluster URL. Each Kubernetes target requires the cluster URL, which is defined in the `Kubernetes cluster URL` field. In the example YAML about, this is defined in the `server` field.
8. Optionally, select the certificate authority if you've added one. Kubernetes clusters are often protected with self-signed certificates. In the YAML example above the certificate is saved as a base 64 encoded string in the `certificate-authority-data` field.

To communicate with a Kubernetes cluster with a self signed certificate over HTTPS, you can either select the **Skip TLS verification** option, or supply the certificate in `The optional cluster certificate authority` field.

Decoding the `certificate-authority-data` field results in a string that looks something like this (the example has been truncated for readability):

```
-----BEGIN CERTIFICATE-----
MIIEyDCCArCgAwIBAgIRAOBNYnhYDBamTvQn...
-----END CERTIFICATE-----
```

Save this text to a file called `ca.pem`, and upload it to the [Octopus certificate management area](https://oc.to/CertificatesDocumentation). The certificate can then be selected in the `cluster certificate authority` field.

9. Enter the Kubernetes Namespace.
When a single Kubernetes cluster is shared across environments, resources deployed to the cluster will often be separated by environment and by application, team, or service. In this situation, the recommended approach is to create a namespace for each application and environment (e.g., `myapplication-development` and `my-application-production`), and create a Kubernetes service account that has permissions to just that namespace.

Where each environment has its own Kubernetes cluster, namespaces can be assigned to each application, team or service (e.g. `myapplication`).

In both scenarios, a target is then created for each Kubernetes cluster and namespace. The `Target Role` tag is set to the application name (e.g. `myapplication`), and the `Environments` are set to the matching environment.

When a Kubernetes target is used, the namespace it references is created automatically if it does not already exist.

10. Select a worker pool for the target.
To make use of the Kubernetes steps, the Octopus Server or workers that will run the steps need to have the `kubectl` executable installed. Linux workers also need to have the `jq`, `xargs` and `base64` applications installed.
11. Click **SAVE**.

## Create service accounts

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

```yaml
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

```powershell
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

Kubernetes targets use the `kubectl` executable to communicate with the Kubernetes cluster. This executable must be available on the path on the target where the step is run. When using workers, this means the `kubectl` executable must be in the path on the worker that is executing the step. Otherwise the `kubectl` executable must be in the path on the Octopus Server itself.

## Vendor Authentication Plugins
Prior to `kubectl` version 1.26, the logic for authenticating against various cloud providers (eg Azure Kubernetes Services, Google Kubernetes Engine) was included "in-tree" in `kubetcl`. From version 1.26 onward, the cloud-vendor specific authentication code has been removed from `kubectl`, in favor of a plugin approach.

What this means for your deployments:

* Amazon Elastic Container Services (ECS): No change required. Octopus already supports using either the AWS CLI or the `aws-iam-authenticator` plugin.
* Azure Kubernetes Services (AKS): No change required. The way Octopus authenticates against AKS clusters never used the in-tree Azure authentication code, and will continue to function as normal.
* Google Kubernetes Engine (GKE): If you upgrade to `kubectl` 1.26 or higher, you will need to ensure that the `gke-gcloud-auth-plugin` tool is also available. More information can be found on [Google's announcement about this change](https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke).

## Helm

When a Kubernetes target is used with a Helm step, the `helm` executable must be on the target where the step is run.

## Dynamic targets

Kubernetes targets can be created dynamically at deploy time with the PowerShell function `New-OctopusKubernetesTarget`.

See [Create Kubernetes Target Command](/docs/infrastructure/deployment-targets/dynamic-infrastructure/kubernetes-target) for more information.

## Troubleshooting

If you're running into issues with your Kubernetes targets, it's possible you'll be able to resolve the issue using some of these troubleshooting tips. If this section doesn't help, please [get in touch](https://octopus.com/support).

### Debugging

Setting the Octopus variable `Octopus.Action.Kubernetes.OutputKubeConfig` to `True` for any deployment or runbook using a Kubernetes target will cause the generated kube config file to be printed into the logs (with passwords masked). This can be used to verify the configuration file used to connect to the Kubernetes cluster.

If Kubernetes targets fail their health checks, the best way to diagnose the issue to to run a `Run a kubectl CLI Script` step with a script that can inspect the various settings that must be in place for a Kubernetes target to function correctly. Octopus deployments will run against unhealthy targets by default, so the fact that the target failed its health check does not prevent these kinds of debugging steps from running.

An example script for debugging a Kubernetes target is shown below:

```powershell
$ErrorActionPreference = 'SilentlyContinue'

# The details of the AWS Account. This will be populated for EKS clusters using the AWS authentication scheme.
# AWS_SECRET_ACCESS_KEY will be redacted, but that means it was populated successfully.
Write-Host "Getting the AWS user"
Write-Host "AWS_ACCESS_KEY_ID: $($env:AWS_ACCESS_KEY_ID)"
Write-Host "AWS_SECRET_ACCESS_KEY: $($env:AWS_SECRET_ACCESS_KEY)"

# The details of the Azure Account. This will be populated for an AKS cluster using the Azure authentication scheme.
Write-Host "Getting the Azure user"
cat azure-cli/azureProfile.json

# View the generated config. kubectl will redact any secrets from this output.
Write-Host "kubectl config view"
kubectl config view

# View the environment variable that defines the kube config path
Write-Host "KUBECONFIG is $($env:KUBECONFIG)"

# Save kube config as artifact (will expose credentials in log). This is useful to take the generated config file
# and run it outside of octopus.
# New-OctopusArtifact $env:KUBECONFIG

# List any proxies. Failure to connect to the cluster when a proxy is configured may be casued by the proxy.
Write-Host "HTTP_PROXY: $($env:HTTP_PROXY)"
Write-Host "HTTPS_PROXY: $($env:HTTPS_PROXY)"
Write-Host "NO_PROXY: $($env:NO_PROXY)"

# Execute the same command that the target health check runs.
Write-Host "Simulating a health check"
kubectl version --short

# Write a custom kube config. This is useful when you have a config that works, and you want to confirm it works in Octopus.
Write-Host "Health check with custom config file"
Set-Content -Path "myconfig.yml" -Value @"
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ca-cert-goes-here
    server: https://myk8scluster
  name: test
contexts:
- context:
    cluster: test
    user: testadmin
  name: testadmin
- context:
    cluster: test
    user: test
  name: test
current-context: test
kind: Config
preferences: {}
users:
- name: testadmin
  user:
    token: auth-token-goes-here
- name: test
  user:
    client-certificate-data: certificate-data-goes-here
    client-key-data: certificate-key-gies-here
"@

kubectl version --short --kubeconfig myconfig.yml

exit 0

```

### API calls failing

If you are finding that certain API calls are failing, for example `https://your.octopus.app/api/users/Users-1/apikeys?take=2147483647`, it's possible that your WAF is blocking the traffic. To confirm this you should investigate your WAF logs to determine why the API call is being blocked and make the necessary adjustments to your WAF rules.

## Learn more

- [Kubernetes Deployment](/docs/deployments/kubernetes)
- [Kubernetes blog posts](https://octopus.com/blog/tag/kubernetes)
