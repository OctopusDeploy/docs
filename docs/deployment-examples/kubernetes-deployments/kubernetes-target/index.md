---
title: Kubernetes Targets
description: Kubernetes Targets
---

This featured was introduced as a prerelease in Octopus 2018.8.

Kubernetes targets are used by the Kubernetes steps to define the context in which deployments and scripts are run.

Conceptually a Kubernetes target represent a permission boundary. Kubernetes [permissions](http://g.octopushq.com/KubernetesRBAC) and [quotas](http://g.octopushq.com/KubernetesQuotas) are defined against a namespace, and both the account and namespace are captured as a Kubernetes target.

When a single Kubernetes cluster is shared across environments, resources deployed to the cluster will often be separated by environment and by application, team or service. In this situation the recommended approach is to create a namespace for each application and environment (e.g. `myapplication-development` and `my-application-production`), and create a Kubernetes service account that has permissions to just that namespace.

Where each environment has its own Kubernetes cluster, namespaces can be assigned to each application, team or service (e.g. `myapplication`).

In both scenarios, a target is then created for each Kubernetes cluster and namespace. The `Target Role` tag is set to the application name (e.g. `myapplication`), and the `Environments` are set to the matching environment.

When a Kubernetes target is used, the namespace it references is created automatically if it does not already exist.

## Accounts

Kubernetes targets support multiple [account types](http://g.octopushq.com/KubernetesAuthentication):

* Username and password
* Token
* Certificates
* AWS Accounts

The YAML file below shows a sample kubectl config file with examples of these types of authentication.

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

### Username and password

In the example YAML above, the user name is found in the `username` field, and the password is found in the `password` field. These values can be added as an Octopus `Usernames/Passwords` account.

### Token

In the example YAML above, the token is defined in the `token` field. This value can be added as an Octopus `Tokens` account.

### Certificates

When authenticating with certificates, both the certificate and private key must be provided. In the example YAML above, the `client-certificate-data` field is a base 64 encoded certificate, and the `client-key-data` field is a base 64 encoded private key (both have been truncated for readability in this example).

The certificate and private key can be combined and saved in a single pfx file. The Powershell script below accepts the base 64 encoded certificate and private key, and uses the [Windows OpenSSL binary from Shining Light Productions](http://g.octopushq.com/OpenSSLWindows) to save them in a single pfx file.

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

This file can then be uploaded to the [Octopus certificate management area](http://g.octopushq.com/CertificatesDocumentation), after which it will be made available to the Kubernetes target.

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
