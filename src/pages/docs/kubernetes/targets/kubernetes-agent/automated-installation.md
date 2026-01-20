---
layout: src/layouts/Default.astro
pubDate: 2024-05-14
modDate: 2026-01-15
title: Automated Installation
description: How to automate the installation and management of the Kubernetes Agent
navOrder: 40
---

## Automated installation via Terraform

The Kubernetes Agent can be installed and managed using a combination of the Kubernetes Agent [Helm chart >= v2.2.1](https://hub.docker.com/r/octopusdeploy/kubernetes-agent), [Octopus Deploy >= v0.30.0 Terraform provider](https://registry.terraform.io/providers/OctopusDeployLabs/octopusdeploy/latest) and/or [Helm Terraform provider](https://registry.terraform.io/providers/hashicorp/helm).

### Octopus Deploy & Helm

Using a combination of the Octopus Deploy and Helm providers you can completely manage the Kubernetes Agent via Terraform.

:::div{.info}

To ensure that the Kubernetes Agent is correctly installed as a deployment target in Octopus, certain criteria must hold for the following Terraform resource properties:

| **Kubernetes Agent resource**                                 |                                                           | **Helm resource (chart value)** |
| ------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------- |
| `octopusdeploy_kubernetes_agent_deployment_target.name`       | must be the same value as                                 | `agent.name`                    |
| `octopusdeploy_kubernetes_agent_deployment_target.uri`        | must be the same value as                                 | `agent.serverSubscriptionId`    |
| `octopusdeploy_kubernetes_agent_deployment_target.thumbprint` | is the thumbprint calculated from the certificate used in | `agent.certificate`             |

:::

:::div{.warning}
Always specify the major version in the **version** property on the **helm_release** resource (e.g. `version = "2.*.*"`) to prevent Terraform from defaulting to the latest Helm chart version. This is important, as a newer major version of the Agent Helm chart could introduce breaking changes.

When upgrading to a new major version of the Agent, create a separate resource to ensure the Helm values match the updated schema. [Automatic upgrade support](/docs/kubernetes/targets/kubernetes-agent/upgrading#automatic-updates-coming-in-20234) is expected in version 2023.4.
:::

:::div{.warning}
It is recommended to completely delete the Kubernetes namespace when removing a Kubernetes agent.

If possible, prefer replacing `create_namespace = true` with an explicit Kubernetes namespace resource in your terraform configuration.
:::

```ruby
terraform {
  required_providers {
    octopusdeploy = {
      source = "OctopusDeploy/octopusdeploy"
      version = "1.7.1"
    }

    helm = {
      source  = "registry.terraform.io/hashicorp/helm"
      version = "3.1.1"
    }
  }
}

locals {
  octopus_api_key         = "API-XXXXXXXXXXXXXXXX"
  octopus_address         = "https://myinstance.octopus.app"
  octopus_grpc_address    = "https://myinstance.octopus.app:8443"
  octopus_polling_address = "https://polling.myinstance.octopus.app"
}

provider "octopusdeploy" {
  address = local.octopus_address
  api_key = local.octopus_api_key
}

provider "helm" {
  kubernetes = {
    # Configure authentication for me
  }
}

data "octopusdeploy_teams" "everyone" {
  partial_name = "Everyone"
  skip         = 0
  take         = 1
}

resource "octopusdeploy_space" "monitoring" {
  name                 = "Kubernetes Examples"
  description          = "Terraform created examples"
  space_managers_teams = [data.octopusdeploy_teams.everyone.teams[0].id]
}

resource "octopusdeploy_environment" "example" {
  name     = "Example"
  space_id = octopusdeploy_space.monitoring.id
}

# Create the Kubernetes agent deployment target
resource "octopusdeploy_polling_subscription_id" "agent_subscription_id" {}
resource "octopusdeploy_tentacle_certificate" "agent_cert" {}
resource "octopusdeploy_kubernetes_agent_deployment_target" "example" {
  name         = "Example Kubernetes Agent"
  space_id     = octopusdeploy_space.monitoring.id
  environments = [octopusdeploy_environment.example.id]
  roles        = ["k8s-agent", "monitoring-enabled"]

  thumbprint = octopusdeploy_tentacle_certificate.agent_cert.thumbprint
  uri        = octopusdeploy_polling_subscription_id.agent_subscription_id.polling_uri
}

# Create the Kubernetes monitor
resource "random_uuid" "monitor_installation" {}
resource "octopusdeploy_kubernetes_monitor" "example" {
  space_id        = octopusdeploy_space.monitoring.id
  installation_id = random_uuid.monitor_installation.result
  machine_id      = octopusdeploy_kubernetes_agent_deployment_target.example.id
}

# Install the Kubernetes agent and monitor via Helm
resource "helm_release" "kubernetes_agent" {
  name             = "example-kubernetes-agent"
  repository       = "oci://registry-1.docker.io"
  chart            = "octopusdeploy/kubernetes-agent"
  version          = "2.*.*"
  atomic           = true
  create_namespace = true
  namespace        = "octopus-agent-example"

  set = [
    {
      name  = "agent.acceptEula"
      value = "Y"
    },
    {
      name  = "agent.name"
      value = octopusdeploy_kubernetes_agent_deployment_target.example.name
    },
    {
      name  = "agent.serverUrl"
      value = local.octopus_address
    },
    {
      name  = "agent.serverCommsAddress"
      value = local.octopus_polling_address
    },
    {
      name  = "agent.serverSubscriptionId"
      value = octopusdeploy_polling_subscription_id.agent_subscription_id.polling_uri
    },
    {
      name  = "agent.space"
      value = octopusdeploy_space.monitoring.name
    },
    {
      name  = "agent.deploymentTarget.enabled"
      value = "true"
    },

    # Kubernetes monitor configuration (optional)
    {
      name  = "kubernetesMonitor.enabled"
      value = "true"
    },
    {
      name  = "kubernetesMonitor.registration.register"
      value = "false"
    },
    {
      name  = "kubernetesMonitor.monitor.serverGrpcUrl"
      value = local.octopus_grpc_address
    },
    {
      name  = "kubernetesMonitor.monitor.installationId"
      value = octopusdeploy_kubernetes_monitor.example.installation_id
    },
    {
      name  = "kubernetesMonitor.monitor.serverThumbprint"
      value = octopusdeploy_kubernetes_monitor.example.certificate_thumbprint
    }
  ]

  set_sensitive = [
    {
      name  = "agent.serverApiKey"
      value = local.octopus_api_key
    },
    {
      name  = "agent.certificate"
      value = octopusdeploy_tentacle_certificate.agent_cert.base64
    },
    {
      name  = "kubernetesMonitor.monitor.authenticationToken"
      value = octopusdeploy_kubernetes_monitor.example.authentication_token
    }
  ]

  set_list = [
    {
      name  = "agent.deploymentTarget.initial.environments"
      value = octopusdeploy_kubernetes_agent_deployment_target.example.environments
    },
    {
      name  = "agent.deploymentTarget.initial.tags"
      value = octopusdeploy_kubernetes_agent_deployment_target.example.roles
    }
  ]
}
```

### Helm

The Kubernetes Agent can be installed using just the Helm provider alone. However, the associated deployment target that is created in Octopus cannot be managed solely using the Helm provider. This is because the Helm chart values relating to the agent are only used on initial installation. Any further modifications to them will not trigger an update to the deployment target unless you perform a complete reinstall of the agent.

If you don't intend to manage the Kubernetes Agent configuration through Terraform (choosing to handle it via the Octopus Portal or API instead), this option will be beneficial to you as it is simpler to set up.

```ruby
terraform {
  required_providers {
    helm = {
      source  = "registry.terraform.io/hashicorp/helm"
      version = "3.1.1"
    }
  }
}

locals {
  octopus_api_key         = "API-XXXXXXXXXXXXXXXX"
  octopus_address         = "https://myinstance.octopus.app"
  octopus_grpc_address    = "https://myinstance.octopus.app:8443"
  octopus_polling_address = "https://polling.myinstance.octopus.app"
}

provider "helm" {
  kubernetes = {
    # Configure authentication for me
  }
}

# Install the Kubernetes agent and monitor via Helm
resource "helm_release" "kubernetes_agent" {
  name             = "example-kubernetes-agent"
  repository       = "oci://registry-1.docker.io"
  chart            = "octopusdeploy/kubernetes-agent"
  version          = "2.*.*"
  atomic           = true
  create_namespace = true
  namespace        = "octopus-agent-example"

  set = [
    {
      name  = "agent.acceptEula"
      value = "Y"
    },
    {
      name  = "agent.name"
      value = "octopus-agent"
    },
    {
      name  = "agent.serverUrl"
      value = local.octopus_address
    },
    {
      name  = "agent.serverCommsAddress"
      value = local.octopus_polling_address
    },
    {
      name  = "agent.space"
      value = "Default"
    },
    {
      name  = "agent.deploymentTarget.enabled"
      value = "true"
    }
  ]

  set_sensitive = [
    {
      name  = "agent.serverApiKey"
      value = local.octopus_api_key
    }
  ]

  set_list = [
    {
      name  = "agent.deploymentTarget.initial.environments"
      value = ["Development"]
    },
    {
      name  = "agent.deploymentTarget.initial.tags"
      value = ["k8s-agent"]
    }
  ]
}
```
