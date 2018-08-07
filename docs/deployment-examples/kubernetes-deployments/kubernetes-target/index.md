---
title: Kubernetes Targets
description: Kubernetes Targets
position: 20
---

This featured was introduced as a prerelease in Octopus `2018.8`.

:::warning
Kubernetes steps in Octopus are of alpha level quality and have been made available for testing and feedback purposes only. They **must not** be used for production deployments, or enabled on production Octopus instances. The information provided here is subject to change at any point, and existing Kubernetes steps will most likely need to be deleted and recreated with Octopus upgrades.
:::

Kubernetes targets are used by the Kubernetes steps to define the context in which deployments and scripts are run.

Conceptually, a Kubernetes target represent a permission boundary. Kubernetes [permissions](http://g.octopushq.com/KubernetesRBAC) and [quotas](http://g.octopushq.com/KubernetesQuotas) are defined against a namespace, and both the account and namespace are captured as a Kubernetes target.

When a single Kubernetes cluster is shared across environments, resources deployed to the cluster will often be separated by environment and by application, team, or service. In this situation, the recommended approach is to create a namespace for each application and environment (e.g., `myapplication-development` and `my-application-production`), and create a Kubernetes service account that has permissions to just that namespace.

Where each environment has its own Kubernetes cluster, namespaces can be assigned to each application, team or service (e.g. `myapplication`).

In both scenarios, a target is then created for each Kubernetes cluster and namespace. The `Target Role` tag is set to the application name (e.g. `myapplication`), and the `Environments` are set to the matching environment.

When a Kubernetes target is used, the namespace it references is created automatically if it does not already exist.

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

Creating this service account automatically results in a token being generated. The PowerShell snippet below returns the token.

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

When using an AWS EKS Kubernetes cluster with IAM integration, the `heptio-authenticator-aws` executable must also be on the path.

## Helm

When a Kubernetes target is used with a Helm step, the `helm` executable must be on the target where the step is run.

## Accounts

Kubernetes targets support multiple [account types](http://g.octopushq.com/KubernetesAuthentication):

* Username and password
* Token
* Certificates
* AWS Accounts

The YAML file below shows a sample kubectl config file with examples of these types of authentication:

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

### Username and Password

In the example YAML above, the user name is found in the `username` field, and the password is found in the `password` field. These values can be added as an Octopus `Usernames/Passwords` account.

### Token

In the example YAML above, the token is defined in the `token` field. This value can be added as an Octopus `Tokens` account.

### Certificates

When authenticating with certificates, both the certificate and private key must be provided. In the example YAML above, the `client-certificate-data` field is a base 64 encoded certificate, and the `client-key-data` field is a base 64 encoded private key (both have been truncated for readability in this example).

The certificate and private key can be combined and saved in a single pfx file. The PowerShell script below accepts the base 64 encoded certificate and private key and uses the [Windows OpenSSL binary from Shining Light Productions](http://g.octopushq.com/OpenSSLWindows) to save them in a single pfx file.

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

This is a bash script to do the same thing.

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

This file can then be uploaded to the [Octopus certificate management area](http://g.octopushq.com/CertificatesDocumentation), after which, it will be made available to the Kubernetes target.

### AWS Accounts

To use an AWS account to connect to an [EKS](http://g.octopushq.com/AWSEKS) cluster, recent versions of the `kubectl` and `heptio-authenticator-aws` binaries need to be available where the step is being run. The [EKS documentation](http://g.octopushq.com/AWSEKSKubectl) provides download links for both these executables.

When an AWS account is selected, two additional fields are displayed in the target configuration: `AWS EKS cluster name` and `AWS region`.

## Kubernetes Details

Each Kubernetes target requires the cluster URL. In the example YAML about, this is defined in the `server` field.

Kubernetes clusters are quite often protected with self signed certificates. In the YAML example above the certificate is saved as a base 64 encoded string in the `certificate-authority-data` field.

To communicate with a Kubernetes cluster with a self signed certificate over HTTPS, you can either select the `Skip TLS verification` option, or supply the certificate in the `cluster certificate authority` field.

Decoding the `certificate-authority-data` field results in a string that looks something like this (the example has been truncated for readability):

```
-----BEGIN CERTIFICATE-----
MIIEyDCCArCgAwIBAgIRAOBNYnhYDBamTvQn...
-----END CERTIFICATE-----
```

Save this text to a file called `ca.pem`, and upload it to the [Octopus certificate management area](http://g.octopushq.com/CertificatesDocumentation). The certificate can then be selected in the `cluster certificate authority` field.
