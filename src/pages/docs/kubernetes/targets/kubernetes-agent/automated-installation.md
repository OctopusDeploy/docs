---
layout: src/layouts/Default.astro
pubDate: 2024-05-14
modDate: 2024-08-30
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

| **Kubernetes Agent resource** | | **Helm resource (chart value)** |
|----------|----------|----------|
| `octopusdeploy_kubernetes_agent_deployment_target.name` | must be the same value as | `agent.name` |
| `octopusdeploy_kubernetes_agent_deployment_target.uri` | must be the same value as | `agent.serverSubscriptionId` |
| `octopusdeploy_kubernetes_agent_deployment_target.thumbprint` | is the thumbprint calculated from the certificate used in | `agent.certificate` |
:::

:::div{.warning}
Always specify the major version in the **version** property on the **helm_release** resource (e.g. `version = "2.*.*"`) to prevent Terraform from defaulting to the latest Helm chart version. This is important, as a newer major version of the Agent Helm chart could introduce breaking changes.

When upgrading to a new major version of the Agent, create a separate resource to ensure the Helm values match the updated schema. [Automatic upgrade support](./upgrading#automatic-updates-coming-in-20234) is expected in version 2023.4.
:::

```hcl
terraform {
  required_providers {
    octopusdeploy = {
      source  = "OctopusDeployLabs/octopusdeploy"
      version = "0.30.0"
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

resource "octopusdeploy_space" "agent_space" {
  name                 = "agent space"
  space_managers_teams = ["teams-everyone"]
}

resource "octopusdeploy_environment" "dev_env" {
  name     = "Development"
  space_id = octopusdeploy_space.agent_space.id
}

resource "octopusdeploy_polling_subscription_id" "agent_subscription_id" {}
resource "octopusdeploy_tentacle_certificate" "agent_cert" {}

resource "octopusdeploy_kubernetes_agent_deployment_target" "agent" {
  name         = "agent-one"
  space_id     = octopusdeploy_space.agent_space.id
  environments = [octopusdeploy_environment.dev_env.id]
  roles        = ["role-1", "role-2", "role-3"]
  thumbprint   = octopusdeploy_tentacle_certificate.agent_cert.thumbprint
  uri          = octopusdeploy_polling_subscription_id.agent_subscription_id.polling_uri
}

resource "helm_release" "octopus_agent" {
  name             = "octopus-agent-release"
  repository       = "oci://registry-1.docker.io"
  chart            = "octopusdeploy/kubernetes-agent"
  version          = "2.*.*"
  atomic           = true
  create_namespace = true
  namespace        = "octopus-agent-target"

  set {
    name  = "agent.acceptEula"
    value = "Y"
  }

  set {
    name  = "agent.name"
    value = octopusdeploy_kubernetes_agent_deployment_target.agent.name
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
    value = octopusdeploy_space.agent_space.name
  }

  set {
    name  = "agent.deploymentTarget.enabled"
    value = "true"
  }

  set_list {
    name  = "agent.deploymentTarget.initial.environments"
    value = octopusdeploy_kubernetes_agent_deployment_target.agent.environments
  }

  set_list {
    name  = "agent.deploymentTarget.initial.tags"
    value = octopusdeploy_kubernetes_agent_deployment_target.agent.roles
  }
}
```

### Helm
The Kubernetes Agent can be installed using just the Helm provider alone. However, the associated deployment target that is created in Octopus cannot be managed solely using the Helm provider. This is because the Helm chart values relating to the agent are only used on initial installation. Any further modifications to them will not trigger an update to the deployment target unless you perform a complete reinstall of the agent. 

If you don't intend to manage the Kubernetes Agent configuration through Terraform (choosing to handle it via the Octopus Portal or API instead), this option will be beneficial to you as it is simpler to set up.

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

resource "helm_release" "octopus_agent" {
  name             = "octopus-agent-release"
  repository       = "oci://registry-1.docker.io"
  chart            = "octopusdeploy/kubernetes-agent"
  version          = "2.*.*"
  atomic           = true
  create_namespace = true
  namespace        = "octopus-agent-target"

  set {
    name  = "agent.acceptEula"
    value = "Y"
  }

  set {
    name  = "agent.targetName"
    value = "octopus-agent"
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
    name  = "agent.deploymentTarget.enabled"
    value = "true"
  }

  set_list {
    name  = "agent.deploymentTarget.initial.environments"
    value = ["Development"]
  }

  set_list {
    name  = "agent.deploymentTarget.initial.tags"
    value = ["Role-1"]
  }
}
```