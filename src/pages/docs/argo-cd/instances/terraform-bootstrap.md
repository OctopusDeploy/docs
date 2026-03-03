---
layout: src/layouts/Default.astro
pubDate: 2026-03-02
modDate: 2026-03-02
title: Terraform Bootstrap
description: How to bootstrap Argo CD + Argo CD Gateway using Terraform
navOrder: 10
---

When provisioning a new cluster, it is possible to install Argo CD along with the Argo CD Gateway using terraform. In order to do that, you need to create an Argo CD token, and inject it to the Argo CD Gateway installation.

Here is a simplified example to make this happen:

| File | Purpose |
| - | - |
| [providers.tf](#providers) | Terraform + kubernetes, helm, null, time providers |
| [variables.tf](#variables) | All inputs — kubeconfig, Argo CD URLs, Octopus credentials, gateway config |
| [argocd.tf](#argo-cd) | Installs Argo CD via Helm; enables apiKey,login on the admin account |
| [argocd-token.tf](#argo-cd-token) | Generates the Argo CD API key via the CLI and stores it in a k8s secret |
| [gateway.tf](#gateway) | Creates Octopus API key secret; installs the gateway Helm chart |
| [outputs.tf](#outputs) | Useful one-liners and resource references |
| [terraform.tfvars.example](#terraform-tfvars) | Copy → terraform.tfvars and fill in |

## Providers

```yaml
# providers.yaml
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.27"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.13"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
    time = {
      source  = "hashicorp/time"
      version = "~> 0.11"
    }
  }
}

provider "kubernetes" {
  config_path    = var.kubeconfig_path
  config_context = var.kube_context
}

provider "helm" {
  kubernetes {
    config_path    = var.kubeconfig_path
    config_context = var.kube_context
  }
}
```

## Variables

```yaml
# variables.yaml
# ─── Kubernetes ───────────────────────────────────────────────────────────────

variable "kubeconfig_path" {
  description = "Path to the kubeconfig file."
  type        = string
  default     = "~/.kube/config"
}

variable "kube_context" {
  description = "Kubernetes context to use. Defaults to the current context."
  type        = string
  default     = null
}

# ─── Argo CD ──────────────────────────────────────────────────────────────────

variable "argocd_namespace" {
  description = "Namespace to install Argo CD into."
  type        = string
  default     = "argocd"
}

variable "argocd_chart_version" {
  description = "Argo CD Helm chart version (from https://argoproj.github.io/argo-helm)."
  type        = string
  default     = "9.4.6"
}


variable "argocd_web_ui_url" {
  description = "Argo CD Web UI URL used for gateway registration (e.g. https://argocd.example.com)."
  type        = string
}

variable "argocd_insecure" {
  description = "Skip TLS verification on the gRPC connection from the gateway to Argo CD."
  type        = bool
  default     = false
}

# ─── Octopus Deploy ───────────────────────────────────────────────────────────

variable "octopus_api_url" {
  description = "Octopus Deploy HTTP API URL used for registration (e.g. https://my-instance.octopus.app)."
  type        = string
}

variable "octopus_grpc_url" {
  description = "Octopus Deploy gRPC URL including port (e.g. my-instance.octopus.app:443)."
  type        = string
}

variable "octopus_api_key" {
  description = "Octopus Deploy API key used to register the gateway."
  type        = string
  sensitive   = true
}

variable "octopus_space_id" {
  description = "Octopus Deploy Space ID the gateway registers into."
  type        = string
  default     = "Spaces-1"
}

variable "octopus_environments" {
  description = "List of Octopus Deploy environment slugs or IDs to associate with the gateway."
  type        = list(string)
  default     = []
}

variable "octopus_grpc_plaintext" {
  description = "Disable TLS on the Octopus gRPC connection. Only for development/local setups."
  type        = bool
  default     = false
}

# ─── Gateway ──────────────────────────────────────────────────────────────────

variable "gateway_namespace" {
  description = "Namespace to install the Octopus Argo CD Gateway into."
  type        = string
  default     = "octopus-argocd-gateway"
}

variable "gateway_name" {
  description = "Display name for the gateway within Octopus Deploy."
  type        = string
}

variable "gateway_chart_version" {
  description = "Octopus Argo CD Gateway Helm chart version."
  type        = string
  default     = "1.18.0"
}
```

## Argo CD

```yaml
# argocd.yaml
locals {
  # Derived from the Helm release name and namespace — no user input required.
  # The argo-cd chart names its server service as "<release-name>-server".
  argocd_grpc_url = "${helm_release.argocd.name}-server.${var.argocd_namespace}.svc.cluster.local:443"
}

resource "kubernetes_namespace" "argocd" {
  metadata {
    name = var.argocd_namespace
  }
}

# Install Argo CD via the official Helm chart.
# Creates a dedicated "octopus" service account with apiKey capability and the
# permissions required by Octopus Deploy (applications, clusters, logs).
# Admin retains login-only access so the bootstrap script can generate the octopus token.
resource "helm_release" "argocd" {
  name       = "argocd"
  repository = null
  chart      = "oci://ghcr.io/argoproj/argo-helm/argo-cd"
  version    = var.argocd_chart_version
  namespace  = kubernetes_namespace.argocd.metadata[0].name

  values = [
    yamlencode({
      configs = {
        cm = {
          # Dedicated service account for Octopus Deploy — API key only, no interactive login.
          "accounts.octopus" = "apiKey"
        }
        rbac = {
          "policy.default" = "role:readonly"
          "policy.csv"     = <<-EOT
            g, admin, role:admin
            p, octopus, applications, get, *, allow
            p, octopus, applications, sync, *, allow
            p, octopus, clusters, get, *, allow
            p, octopus, logs, get, */*, allow
          EOT
        }
      }
    })
  ]

  # Wait until all Argo CD pods are healthy before continuing.
  timeout = 600
  wait    = true
}

# Give the Argo CD server a moment to fully initialise its API
# (the rollout-status check alone isn't always sufficient).
resource "time_sleep" "wait_for_argocd" {
  depends_on      = [helm_release.argocd]
  create_duration = "30s"
}
```

## Argo CD Token

```yaml
# argocd-token.yaml
locals {
  # Name of the Kubernetes secret that will hold the generated Argo CD token.
  # The secret is created in the gateway namespace so the gateway pod can mount it.
  argocd_token_secret_name = "argocd-gateway-token"
}

# Use a null_resource + local-exec to:
#   1. Wait for the Argo CD server deployment to be fully ready.
#   2. Port-forward the Argo CD server locally.
#   3. Log in with the argocd CLI using the auto-generated admin password.
#   4. Generate an API key for the octopus account.
#   5. Store that key in a Kubernetes secret in the gateway namespace.
#
# Prerequisites (must be available on the machine running `terraform apply`):
#   - kubectl  (configured to reach the target cluster)
#   - argocd   (https://argo-cd.readthedocs.io/en/stable/cli_installation/)
#   - nc / netcat
resource "null_resource" "argocd_token" {
  depends_on = [
    time_sleep.wait_for_argocd,
    kubernetes_namespace.gateway,
  ]

  # Re-run whenever Argo CD is reinstalled or the gateway namespace changes.
  triggers = {
    argocd_release_id = helm_release.argocd.id
    gateway_namespace = var.gateway_namespace
  }

  provisioner "local-exec" {
    interpreter = ["bash", "-c"]
    command     = <<-EOT
      set -euo pipefail

      echo ">>> Waiting for argocd-server deployment to be ready..."
      kubectl rollout status deployment/argocd-server \
        --namespace "${var.argocd_namespace}" \
        --timeout=300s

      echo ">>> Fetching initial admin password..."
      ARGOCD_PASSWORD=$(kubectl get secret argocd-initial-admin-secret \
        --namespace "${var.argocd_namespace}" \
        -o jsonpath='{.data.password}' | base64 --decode)

      echo ">>> Starting port-forward on localhost:18080 -> argocd-server:443..."
      # Use port 18080 to avoid conflicts with any local service on 8080.
      kubectl port-forward svc/argocd-server \
        --namespace "${var.argocd_namespace}" \
        18080:443 &
      PF_PID=$!
      trap 'echo ">>> Cleaning up port-forward (PID $PF_PID)"; kill "$PF_PID" 2>/dev/null || true' EXIT

      echo ">>> Waiting for port-forward to become available..."
      for i in $(seq 1 20); do
        if nc -z localhost 18080 2>/dev/null; then
          echo "    Ready after $i attempt(s)."
          break
        fi
        echo "    Attempt $i/20 — retrying in 3s..."
        sleep 3
      done

      echo ">>> Logging in to Argo CD..."
      argocd login localhost:18080 \
        --username admin \
        --password "$ARGOCD_PASSWORD" \
        --insecure \
        --grpc-web

      echo ">>> Generating API token for the octopus account..."
      ARGOCD_TOKEN=$(argocd account generate-token \
        --account octopus \
        --insecure \
        --grpc-web)

      echo ">>> Storing token in Kubernetes secret '${local.argocd_token_secret_name}' (namespace: ${var.gateway_namespace})..."
      kubectl create secret generic "${local.argocd_token_secret_name}" \
        --namespace "${var.gateway_namespace}" \
        --from-literal=ARGOCD_AUTH_TOKEN="$ARGOCD_TOKEN" \
        --dry-run=client -o yaml | kubectl apply -f -

      echo ">>> Done. Argo CD API token is ready."
    EOT
  }
}
```

## Gateway

```yaml
# gateway.yaml
resource "kubernetes_namespace" "gateway" {
  metadata {
    name = var.gateway_namespace
  }
}

# Store the Octopus API key as a Kubernetes secret so it is never passed
# as a plain-text Helm value. The chart reads it via serverAccessTokenSecretName.
resource "kubernetes_secret" "octopus_api_key" {
  metadata {
    name      = "octopus-server-access-token"
    namespace = kubernetes_namespace.gateway.metadata[0].name
  }

  data = {
    OCTOPUS_SERVER_ACCESS_TOKEN = var.octopus_api_key
  }

  type = "Opaque"
}

# Install the Octopus Argo CD Gateway.
# The chart is referenced from the published GitHub Pages Helm repository.
# Both the Argo CD token and the Octopus API key are supplied via existing
# Kubernetes secrets rather than inline values to avoid storing credentials
# in Terraform state or Helm release history.
resource "helm_release" "gateway" {
  name       = "octopus-argocd-gateway"
  repository = null
  chart      = "oci://registry-1.docker.io/octopusdeploy/octopus-argocd-gateway-chart"
  version    = var.gateway_chart_version
  namespace  = kubernetes_namespace.gateway.metadata[0].name

  depends_on = [
    # The Argo CD token secret must exist before the gateway pod starts.
    null_resource.argocd_token,
    kubernetes_secret.octopus_api_key,
  ]

  values = [
    yamlencode({
      gateway = {
        argocd = {
          # gRPC URL derived automatically from the Argo CD Helm release.
          serverGrpcUrl = local.argocd_grpc_url
          # Skip TLS verification if Argo CD is using a self-signed cert.
          insecure = var.argocd_insecure
          # Reference the secret created by null_resource.argocd_token.
          # The chart looks for the key ARGOCD_AUTH_TOKEN inside this secret.
          authenticationTokenSecretName = local.argocd_token_secret_name
          authenticationTokenSecretKey  = "ARGOCD_AUTH_TOKEN"
        }
        octopus = {
          serverGrpcUrl = var.octopus_grpc_url
          plaintext     = var.octopus_grpc_plaintext
        }
      }

      registration = {
        octopus = {
          name        = var.gateway_name
          serverApiUrl = var.octopus_api_url
          spaceId      = var.octopus_space_id
          environments = var.octopus_environments

          # Reference the Octopus API key secret created above.
          serverAccessTokenSecretName = kubernetes_secret.octopus_api_key.metadata[0].name
          serverAccessTokenSecretKey  = "OCTOPUS_SERVER_ACCESS_TOKEN"
        }
        argocd = {
          webUiUrl = var.argocd_web_ui_url
        }
      }
    })
  ]

  timeout = 300
  wait    = true
}
```

## Outputs

```yaml
# outputs.yaml
output "argocd_namespace" {
  description = "Namespace where Argo CD is installed."
  value       = kubernetes_namespace.argocd.metadata[0].name
}

output "gateway_namespace" {
  description = "Namespace where the Octopus Argo CD Gateway is installed."
  value       = kubernetes_namespace.gateway.metadata[0].name
}

output "argocd_token_secret" {
  description = "Kubernetes secret (namespace/name) that holds the generated Argo CD API token."
  value       = "${var.gateway_namespace}/${local.argocd_token_secret_name}"
}

output "get_argocd_admin_password" {
  description = "One-liner to retrieve the Argo CD initial admin password."
  value       = "kubectl get secret argocd-initial-admin-secret -n ${var.argocd_namespace} -o jsonpath='{.data.password}' | base64 --decode && echo"
}

output "get_argocd_token" {
  description = "One-liner to view the stored Argo CD API token."
  value       = "kubectl get secret ${local.argocd_token_secret_name} -n ${var.gateway_namespace} -o jsonpath='{.data.ARGOCD_AUTH_TOKEN}' | base64 --decode && echo"
}
```

## Terraform tfvars

```yaml
# terraform.tfvars.example
# Copy this file to terraform.tfvars and fill in the values.
# Never commit terraform.tfvars to source control — it contains secrets.

# ─── Kubernetes ───────────────────────────────────────────────────────────────
kubeconfig_path = "~/.kube/config"
kube_context    = "my-cluster-context"   # omit to use the current context

# ─── Argo CD ──────────────────────────────────────────────────────────────────
argocd_namespace     = "argocd"
argocd_chart_version = "9.4.6"

# External Web UI URL — used during Octopus registration for the Argo CD link.
argocd_web_ui_url = "https://argocd.example.com"

# Set to true if Argo CD uses a self-signed certificate.
argocd_insecure = false

# ─── Octopus Deploy ───────────────────────────────────────────────────────────
octopus_api_url  = "https://my-instance.octopus.app"
octopus_grpc_url = "my-instance.octopus.app:443"
octopus_api_key  = "API-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"   # sensitive
octopus_space_id = "Spaces-1"

# List of environment slugs or IDs to associate with this gateway.
octopus_environments = ["production", "staging"]

# Set to true only when Octopus runs without TLS on its gRPC port (dev only).
octopus_grpc_plaintext = false

# ─── Gateway ──────────────────────────────────────────────────────────────────
gateway_namespace     = "octopus-argocd-gateway"
gateway_name          = "my-argocd-gateway"
gateway_chart_version = "1.18.0"
```
