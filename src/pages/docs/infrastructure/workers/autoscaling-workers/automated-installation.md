---
layout: src/layouts/Default.astro
pubDate: 2024-08-22
modDate: 2024-08-22
title: Automated Installation
description: How to automate the installation and management of the Kubernetes Worker
navOrder: 30
--- 

## Automated installation via Terraform
The Kubernetes Worker can be installed and managed using a combination of the [Helm chart >= v2.0.2](https://hub.docker.com/r/octopusdeploy/kubernetes-agent), [Octopus Deploy >= v0.31.0 Terraform provider](https://registry.terraform.io/providers/OctopusDeployLabs/octopusdeploy/latest) and/or [Helm Terraform provider](https://registry.terraform.io/providers/hashicorp/helm).

### Octopus Deploy & Helm
Using a combination of the Octopus Deploy and Helm providers you can completely manage the Kubernetes Worker via Terraform. 

:::div{.warning}
To ensure that the Kubernetes Worker is correctly installed in Octopus, certain criteria must hold for the following Terraform resource properties:

| **Kubernetes Worker resource** | | **Helm resource (chart value)** |
|----------|----------|----------|
| `octopusdeploy_kubernetes_agent_worker.name` | must be the same value as | `agent.name` |
| `octopusdeploy_kubernetes_agent_worker.uri` | must be the same value as | `agent.serverSubscriptionId` |
| `octopusdeploy_kubernetes_agent_worker.thumbprint` | is the thumbprint calculated from the certificate used in | `agent.certificate` |
:::

```hcl
terraform {
  required_providers {
    octopusdeploy = {
      source  = "octopus.com/com/octopusdeploy"
      version = "0.31.0"
    }

    helm = {
      source  = "hashicorp/helm"
      version = "2.13.2"
    }
  }
}

locals {
  octopus_api_key         = "API-XXXXXXXXXXXXXXXX"
  octopus_address         = "https://myinstance.octopus.app"
  octopus_polling_address = "https://polling.myinstance.octopus.app"
}

provider "helm" {
  kubernetes {
    # Configure authentication for me
  }
}

provider "octopusdeploy" {
  address = local.octopus_address
  api_key = local.octopus_api_key
}

resource "octopusdeploy_space" "worker_space" {
  name                 = "worker space"
  space_managers_teams = ["teams-everyone"]
}

resource "octopusdeploy_polling_subscription_id" "agent_subscription_id" {}
resource "octopusdeploy_tentacle_certificate" "agent_cert" {}

resource "octopusdeploy_static_worker_pool" "workerpool_example" {
  name        = "Example"
  space_id = octopusdeploy_space.worker_space.id
  description = "An example worker pool"
  is_default  = false
  sort_order  = 3
}

resource "octopusdeploy_kubernetes_agent_worker" "worker" {
  name            = "worker-one"
  space_id        = octopusdeploy_space.worker_space.id
  worker_pool_ids = [octopusdeploy_static_worker_pool.workerpool_example.id]
  thumbprint      = octopusdeploy_tentacle_certificate.agent_cert.thumbprint
  uri             = octopusdeploy_polling_subscription_id.agent_subscription_id.polling_uri
}

resource "helm_release" "kubernetes_worker" {
  name             = "octopus-kubernetes-worker-release"
  repository       = "oci://registry-1.docker.io"
  chart            = "octopusdeploy/kubernetes-agent"
  version          = "2.*.*"
  atomic           = true
  create_namespace = true
  namespace        = "octopus-agent-worker"

  set {
    name  = "agent.acceptEula"
    value = "Y"
  }

  set {
    name  = "agent.name"
    value = octopusdeploy_kubernetes_agent_worker.worker.name
  }

  set_sensitive {
    name  = "agent.serverApiKey"
    value = local.octopus_api_key
  }

  set {
    name  = "agent.serverUrl"
    value = local.octopus_address
  }

  set {
    name  = "agent.serverCommsAddress"
    value = local.octopus_polling_address
  }

  set {
    name  = "agent.serverSubscriptionId"
    value = octopusdeploy_polling_subscription_id.agent_subscription_id.polling_uri
  }

  set_sensitive {
    name  = "agent.certificate"
    value = octopusdeploy_tentacle_certificate.agent_cert.base64
  }

  set {
    name  = "agent.space"
    value = octopusdeploy_space.worker_space.name
  }

  set {
    name  = "agent.worker.enabled"
    value = "true"
  }

  set_list {
    name  = "agent.worker.initial.workerPools"
    value = octopusdeploy_kubernetes_agent_worker.worker.worker_pool_ids
  }
}
```

### Helm
The Kubernetes Worker can be installed using just the Helm provider alone. However, the associated worker that is created in Octopus cannot be managed solely using the Helm provider. This is because the Helm chart values relating to the worker are only used on initial installation. Any further modifications to them will not trigger an update to the worker unless you perform a complete reinstall of the worker. 

If you don't intend to manage the Kubernetes Worker configuration through Terraform (choosing to handle it via the Octopus Portal or API instead), this option will be beneficial to you as it is simpler to set up.

```hcl
terraform {
  required_providers {
    helm = {
      source  = "hashicorp/helm"
      version = "2.13.2"
    }
  }
}

provider "helm" {
  kubernetes {
    # Configure authentication for me
  }
}

locals {
  octopus_api_key         = "API-XXXXXXXXXXXXXXXX"
  octopus_address         = "https://myinstance.octopus.app"
  octopus_polling_address = "https://polling.myinstance.octopus.app"
}

resource "helm_release" "kubernetes_worker" {
  name             = "octopus-kubernetes-worker-release"
  repository       = "oci://registry-1.docker.io"
  chart            = "octopusdeploy/kubernetes-agent"
  version          = "2.*.*"
  atomic           = true
  create_namespace = true
  namespace        = "octopus-agent-worker"

  set {
    name  = "agent.acceptEula"
    value = "Y"
  }

  set {
    name  = "agent.name"
    value = "octopus-worker"
  }

  set_sensitive {
    name  = "agent.serverApiKey"
    value = local.octopus_api_key
  }

  set {
    name  = "agent.serverUrl"
    value = local.octopus_address
  }

  set {
    name  = "agent.serverCommsAddress"
    value = local.octopus_polling_address
  }

  set {
    name  = "agent.space"
    value = "Default"
  }

  set {
    name  = "agent.worker.enabled"
    value = "true"
  }

  set_list {
    name  = "agent.worker.initial.workerPools"
    value = ["WorkerPools-1"]
  }
}
```