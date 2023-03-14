---
title: octopus deployment-target kubernetes create
description: Create a Kubernetes deployment target
position: 38
---

Create a Kubernetes deployment target in Octopus Deploy


```text
Usage:
  octopus deployment-target kubernetes create [flags]

Aliases:
  create, new

Flags:
      --account string                          The name of the account to use for authentication.
      --aks-cluster-name string                 The AKS cluster name.
      --aks-resource-group-name string          The AKS resource group name.
      --aks-use-admin-credentials               Enabling this option passes the --admin flag to az aks get-credentials. This is useful for AKS clusters with Azure Active Directory integration.
      --auth-type string                        The authentication type to use.
      --certificate string                      Name of Certificate in Octopus Deploy.
      --certificate-path string                 The path to the CA certificate of the cluster. The default value usually is: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      --client-certificate string               Name of client certificate in Octopus Deploy
      --cluster-url string                      Kubernetes cluster URL. Must be an absolute URL. e.g. https://kubernetes.example.com
      --docker-container-registry string        The feed of the docker container registery to use if running health check in a container on the worker
      --docker-image-flags string               The image (including the tag) to use from the container registery
      --eks-assume-service-role                 Assume a different AWS service role.
      --eks-assumed-role-arn string             ARN of assumed AWS service role.
      --eks-assumed-role-external-id string     AWS assumed role external ID.
      --eks-assumed-role-session-duration int   AWS assumed role session duration in seconds. (defaults to 3600 seconds, 1 hour)
      --eks-assumed-role-session-name string    Session name of assumed AWS service role.
      --eks-cluster-name string                 AWS EKS Cluster Name
      --eks-use-service-role                    Execute using the AWS service role for an EC2 instance.
      --environment strings                     Choose at least one environment for the deployment target.
      --gke-cluster-name string                 GKE Cluster Name.
      --gke-impersonate-service-account         Impersonate service accounts.
      --gke-project string                      GKE Project.
      --gke-region string                       GKE Region.
      --gke-service-account-emails string       Service Account Email.
      --gke-use-vm-service-account              When running in a Compute Engine virtual machine, use the associated VM service account.
      --gke-zone string                         GKE Zone.
  -n, --name string                             A short, memorable, unique name for this deployment target.
      --namespace string                        Kubernetes Namespace.
      --pod-token-path string                   The path to the token of the pod service account. The default value usually is: /var/run/secrets/kubernetes.io/serviceaccount/token
      --role strings                            Choose at least one role that this deployment target will provide.
      --skip-tls-verification                   Skip the verification of the cluster certificate. This can only be provided if no cluster certificate is specified.
      --tenant strings                          Associate the deployment target with tenants
      --tenant-tag strings                      Associate the deployment target with tenant tags, should be in the format 'tag set name/tag name'
      --tenanted-mode string                    
                                                Choose the kind of deployments where this deployment target should be included. Default is 'untenanted'
  -w, --web                                     Open in web browser
      --worker-pool string                      The worker pool for the deployment target, only required if not using the default worker pool


Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations

```

## Examples

!include <samples-instance>


```text
$ octopus deployment-target kubernetes create

```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)