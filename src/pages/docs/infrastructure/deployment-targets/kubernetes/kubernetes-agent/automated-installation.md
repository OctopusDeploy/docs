---
layout: src/layouts/Default.astro
pubDate: 2024-05-14
modDate: 2024-05-14
title: Automated Installation
description: How to automate the installation and management of the Kubernetes agent
navOrder: 50
---

## Automated installation via Terraform
The Kubernetes agent can be installed and managed using a combination of the Kubernetes agent [Helm chart <= v1.1.0](https://hub.docker.com/r/octopusdeploy/kubernetes-agent), [Octopus Deploy <= v0.20.0 Terraform provider](https://registry.terraform.io/providers/OctopusDeployLabs/octopusdeploy/latest) and/or [Helm Terraform provider](https://registry.terraform.io/providers/hashicorp/helm).

### Octopus Deploy & Helm
Using a combination of the Octopus Deploy and Helm providers you can completely manage the Kubernetes agent via Terraform. 

:::div{.warning}
To ensure that the Kubernetes agent and the deployment target within Octopus associate with each other correctly the some of the Helm chart values and deployment target properties must meet the following criteria: 
`octopusdeploy_kubernetes_agent_deployment_target.name` and `agent.targetName` have the same values.
`octopusdeploy_kubernetes_agent_deployment_target.uri` and `agent.serverSubscriptionId` have the same values.
`octopusdeploy_kubernetes_agent_deployment_target.thumbprint` is the thumbprint calculated from the certificate used in `agent.certificate`.
:::

```hcl
terraform {
  required_providers {
    octopusdeploy = {
      source  = "octopus.com/com/octopusdeploy"
      version = "0.20.0"
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
  version          = "1.*.*"
  atomic           = true
  create_namespace = true
  namespace        = "octopus-agent-octopusagent"

  set {
    name  = "agent.acceptEula"
    value = "Y"
  }

  set {
    name  = "agent.targetName"
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

  set_list {
    name  = "agent.targetEnvironments"
    value = octopusdeploy_kubernetes_agent_deployment_target.agent.environments
  }

  set_list {
    name  = "agent.targetRoles"
    value = octopusdeploy_kubernetes_agent_deployment_target.agent.roles
  }
}
```

### Helm
The Kubernetes agent can be installed using just the Helm provider but the associated deployment target that is created in Octopus when the agent registers itself cannot be managed solely using the Helm provider, as the Helm chart values relating to the deployment target are only used on initial installation and any modifications to them will not trigger an update to the deployment target unless you perform a complete reinstall of the agent. This option is useful if you plan on managing the configuration of the deployment target via means such as the Portal or API.

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
  version          = "1.*.*"
  atomic           = true
  create_namespace = true
  namespace        = "octopus-agent-octopusagent"

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

  set_list {
    name  = "agent.targetEnvironments"
    value = ["Development"]
  }


  set_list {
    name  = "agent.targetRoles"
    value = ["Role-1"]
  }
}
```