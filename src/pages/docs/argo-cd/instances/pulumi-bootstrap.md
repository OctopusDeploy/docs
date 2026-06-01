---
layout: src/layouts/Default.astro
pubDate: 2026-05-28
modDate: 2026-05-28
title: Pulumi Bootstrap
description: How to bootstrap Argo CD + Argo CD Gateway using Pulumi (TypeScript)
navOrder: 11
---

When provisioning a new cluster, it is possible to install Argo CD while provisioning the required token secrets for the upcoming Argo CD Gateway installation. Once Argo CD is installed, the Argo CD Gateway can be installed using an Argo CD Application as described in [Automated Installation](/docs/argo-cd/instances/automated-installation). Another approach would be to install the Argo CD Gateway as part of the Pulumi program, as described under the [Note](#gateway).

Here is a simplified example to make this happen:

| File | Purpose |
| - | - |
| [Pulumi.yaml](#project) | Pulumi project descriptor — name, runtime, and description |
| [package.json](#package) | Node dependencies — `@pulumi/pulumi`, `@pulumi/kubernetes`, `@pulumi/command` |
| [tsconfig.json](#tsconfig) | TypeScript compiler options expected by `pulumi up` |
| [config.ts](#config) | All inputs — kubeconfig, Argo CD URLs, Octopus credentials, gateway config |
| [argocd.ts](#argo-cd) | Installs Argo CD via Helm; enables apiKey,login on the admin account |
| [argocd-token.ts](#argo-cd-token) | Generates the Argo CD API key via the CLI and stores it in a k8s secret |
| [gateway.ts](#gateway) | Creates Octopus API key secret; optionally installs the gateway Helm chart |
| [index.ts](#index) | Composes the modules above and declares stack exports |
| [Pulumi.dev.yaml.example](#pulumi-stack) | Copy → `Pulumi.<stack>.yaml` and fill in |

## Project

```yaml
# Pulumi.yaml
name: argocd-bootstrap
runtime: nodejs
description: Bootstrap Argo CD and the Octopus Argo CD Gateway on a Kubernetes cluster.
```

## Package

```json
// package.json
{
  "name": "argocd-bootstrap",
  "main": "index.ts",
  "devDependencies": {
    "@types/node": "^20"
  },
  "dependencies": {
    "@pulumi/pulumi": "^3.140.0",
    "@pulumi/kubernetes": "^4.20.0",
    "@pulumi/command": "^1.0.0"
  }
}
```

## Tsconfig

```json
// tsconfig.json
{
    "compilerOptions": {
        "strict": true,
        "outDir": "bin",
        "target": "es2020",
        "module": "commonjs",
        "moduleResolution": "node",
        "sourceMap": true,
        "experimentalDecorators": true,
        "pretty": true,
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,
        "forceConsistentCasingInFileNames": true
    },
    "files": [
        "index.ts",
        "config.ts",
        "argocd.ts",
        "argocd-token.ts",
        "gateway.ts"
    ]
}
```

This matches the file `pulumi new typescript` generates, with the `files` list extended to cover every module in the program.

## Config

```typescript
// config.ts
import * as pulumi from "@pulumi/pulumi";

const cfg = new pulumi.Config();

// ─── Kubernetes ───────────────────────────────────────────────────────────────
export const kubeconfigPath = cfg.get("kubeconfigPath") ?? "~/.kube/config";
export const kubeContext    = cfg.get("kubeContext"); // optional; falls back to current context

// ─── Argo CD ──────────────────────────────────────────────────────────────────
export const argocdNamespace    = cfg.get("argocdNamespace")    ?? "argocd";
export const argocdChartVersion = cfg.get("argocdChartVersion") ?? "9.4.6";

// External Web UI URL — used during Octopus registration for the Argo CD link.
export const argocdWebUiUrl = cfg.require("argocdWebUiUrl");

// Skip TLS verification on the gRPC connection from the gateway to Argo CD.
export const argocdInsecure = cfg.getBoolean("argocdInsecure") ?? false;

// ─── Octopus Deploy ───────────────────────────────────────────────────────────
export const octopusApiUrl  = cfg.require("octopusApiUrl");
export const octopusGrpcUrl = cfg.require("octopusGrpcUrl");

// `requireSecret` enforces that the value was stored with `pulumi config set --secret`.
export const octopusApiKey = cfg.requireSecret("octopusApiKey");

export const octopusSpaceId      = cfg.get("octopusSpaceId") ?? "Spaces-1";
export const octopusEnvironments = cfg.getObject<string[]>("octopusEnvironments") ?? [];

// Disable TLS on the Octopus gRPC connection. Only for development/local setups.
export const octopusGrpcPlaintext = cfg.getBoolean("octopusGrpcPlaintext") ?? false;

// ─── Gateway ──────────────────────────────────────────────────────────────────
export const gatewayNamespace    = cfg.get("gatewayNamespace") ?? "octopus-argocd-gateway";
export const gatewayName         = cfg.require("gatewayName");
export const gatewayChartVersion = cfg.require("gatewayChartVersion");
```

Pulumi reads configuration from `Pulumi.<stack>.yaml` (see [Pulumi stack file](#pulumi-stack) below). Set secrets with `pulumi config set --secret octopusApiKey API-XXXXXX` so they are encrypted at rest.

## Argo CD

```typescript
// argocd.ts
import * as k8s from "@pulumi/kubernetes";
import { interpolate } from "@pulumi/pulumi";
import * as cfg from "./config";

// A single Kubernetes provider bound to the configured kubeconfig + context.
// Pulumi creates resources through this provider instead of relying on the ambient kubectl context.
export const k8sProvider = new k8s.Provider("k8s", {
    kubeconfig: cfg.kubeconfigPath,
    context: cfg.kubeContext,
});

export const argocdNs = new k8s.core.v1.Namespace("argocd-ns", {
    metadata: { name: cfg.argocdNamespace },
}, { provider: k8sProvider });

// Install Argo CD via the official Helm chart.
// Creates a dedicated "octopus" service account with apiKey capability and the
// permissions required by Octopus Deploy (applications, clusters, logs).
// Admin retains login-only access so the bootstrap script can generate the octopus token.
export const argocd = new k8s.helm.v3.Release("argocd", {
    name: "argocd",
    chart: "oci://ghcr.io/argoproj/argo-helm/argo-cd",
    version: cfg.argocdChartVersion,
    namespace: argocdNs.metadata.name,
    values: {
        configs: {
            cm: {
                // Dedicated service account for Octopus Deploy — API key only, no interactive login.
                "accounts.octopus": "apiKey",
            },
            rbac: {
                "policy.default": "role:readonly",
                "policy.csv": [
                    "g, admin, role:admin",
                    "p, octopus, applications, get, *, allow",
                    "p, octopus, applications, sync, *, allow",
                    "p, octopus, clusters, get, *, allow",
                    "p, octopus, logs, get, */*, allow",
                ].join("\n") + "\n",
            },
        },
    },
    // Wait until all Argo CD pods are healthy before continuing.
    timeout: 600,
    skipAwait: false,
}, { provider: k8sProvider });

// Derived from the Helm release name and namespace — no user input required.
// The argo-cd chart names its server service as "<release-name>-server".
export const argocdGrpcUrl = interpolate`${argocd.name}-server.${cfg.argocdNamespace}.svc.cluster.local:443`;
```

:::div{.hint}
**Note**
Unlike Terraform's `helm_release`, Pulumi's `k8s.helm.v3.Release` does not have an explicit `wait` boolean — it waits by default. Set `skipAwait: true` only if you need fire-and-forget behaviour. Argo CD's CRDs and pods will be Ready before the resource is considered complete.
:::

## Argo CD Token

```typescript
// argocd-token.ts
import * as k8s from "@pulumi/kubernetes";
import * as command from "@pulumi/command";
import * as pulumi from "@pulumi/pulumi";
import * as cfg from "./config";
import { argocd, k8sProvider } from "./argocd";

// Name of the Kubernetes secret that will hold the generated Argo CD token.
// The secret is created in the gateway namespace so the gateway pod can mount it.
export const argocdTokenSecretName = "argocd-gateway-token";

export const gatewayNs = new k8s.core.v1.Namespace("gateway-ns", {
    metadata: { name: cfg.gatewayNamespace },
}, { provider: k8sProvider });

// Use @pulumi/command's local.Command to:
//   1. Wait for the Argo CD server deployment to be fully ready (plus a 30s settle).
//   2. Port-forward the Argo CD server locally.
//   3. Log in with the argocd CLI using the auto-generated admin password.
//   4. Generate an API key for the octopus account.
//   5. Store that key in a Kubernetes secret in the gateway namespace.
//
// Prerequisites (must be available on the machine running `pulumi up`):
//   - kubectl  (configured to reach the target cluster)
//   - argocd   (https://argo-cd.readthedocs.io/en/stable/cli_installation/)
//   - nc / netcat
export const argocdToken = new command.local.Command("argocd-token", {
    // Re-run whenever Argo CD is reinstalled or the gateway namespace changes.
    triggers: [argocd.id, cfg.gatewayNamespace],

    create: pulumi.interpolate`
set -euo pipefail

echo ">>> Waiting for argocd-server deployment to be ready..."
kubectl rollout status deployment/argocd-server \
  --namespace "${cfg.argocdNamespace}" \
  --timeout=300s

# Give the Argo CD server a moment to fully initialize its API
# (the rollout-status check alone isn't always sufficient).
sleep 30

echo ">>> Fetching initial admin password..."
ARGOCD_PASSWORD=$(kubectl get secret argocd-initial-admin-secret \
  --namespace "${cfg.argocdNamespace}" \
  -o jsonpath='{.data.password}' | base64 --decode)

echo ">>> Starting port-forward on localhost:18080 -> argocd-server:443..."
# Use port 18080 to avoid conflicts with any local service on 8080.
kubectl port-forward svc/argocd-server \
  --namespace "${cfg.argocdNamespace}" \
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

echo ">>> Storing token in Kubernetes secret '${argocdTokenSecretName}' (namespace: ${cfg.gatewayNamespace})..."
kubectl create secret generic "${argocdTokenSecretName}" \
  --namespace "${cfg.gatewayNamespace}" \
  --from-literal=ARGOCD_AUTH_TOKEN="$ARGOCD_TOKEN" \
  --dry-run=client -o yaml | kubectl apply -f -

echo ">>> Done. Argo CD API token is ready."
    `,
    interpreter: ["bash", "-c"],
}, { dependsOn: [argocd, gatewayNs] });
```

## Gateway

```typescript
// gateway.ts
import * as k8s from "@pulumi/kubernetes";
import * as cfg from "./config";
import { k8sProvider } from "./argocd";
import { gatewayNs } from "./argocd-token";

// Store the Octopus API key as a Kubernetes secret so it is never passed
// as a plain-text Helm value. The chart reads it via serverAccessTokenSecretName.
export const octopusApiKeySecret = new k8s.core.v1.Secret("octopus-api-key", {
    metadata: {
        name: "octopus-server-access-token",
        namespace: gatewayNs.metadata.name,
    },
    stringData: {
        OCTOPUS_SERVER_ACCESS_TOKEN: cfg.octopusApiKey,
    },
    type: "Opaque",
}, { provider: k8sProvider });
```

:::div{.hint}
**Note**
In order to deploy the Argo CD Gateway using Helm directly, you can re-use the Kubernetes provider. **Replace the entire `gateway.ts` above with the following**:

```typescript
// gateway.ts
import * as k8s from "@pulumi/kubernetes";
import * as cfg from "./config";
import { k8sProvider, argocdGrpcUrl } from "./argocd";
import { gatewayNs, argocdToken, argocdTokenSecretName } from "./argocd-token";

// Store the Octopus API key as a Kubernetes secret so it is never passed
// as a plain-text Helm value. The chart reads it via serverAccessTokenSecretName.
export const octopusApiKeySecret = new k8s.core.v1.Secret("octopus-api-key", {
    metadata: {
        name: "octopus-server-access-token",
        namespace: gatewayNs.metadata.name,
    },
    stringData: {
        OCTOPUS_SERVER_ACCESS_TOKEN: cfg.octopusApiKey,
    },
    type: "Opaque",
}, { provider: k8sProvider });

// Install the Octopus Argo CD Gateway.
// The chart is referenced from the published Docker Hub OCI Helm repository.
// Both the Argo CD token and the Octopus API key are supplied via existing
// Kubernetes secrets rather than inline values to avoid storing credentials
// in Pulumi state or Helm release history.
export const gateway = new k8s.helm.v3.Release("gateway", {
    name: "octopus-argocd-gateway",
    chart: "oci://registry-1.docker.io/octopusdeploy/octopus-argocd-gateway-chart",
    version: cfg.gatewayChartVersion,
    namespace: gatewayNs.metadata.name,
    values: {
        gateway: {
            argocd: {
                // gRPC URL derived automatically from the Argo CD Helm release.
                serverGrpcUrl: argocdGrpcUrl,
                // Skip TLS verification if Argo CD is using a self-signed cert.
                insecure: cfg.argocdInsecure,
                // Reference the secret created by argocdToken.
                // The chart looks for the key ARGOCD_AUTH_TOKEN inside this secret.
                authenticationTokenSecretName: argocdTokenSecretName,
                authenticationTokenSecretKey: "ARGOCD_AUTH_TOKEN",
            },
            octopus: {
                serverGrpcUrl: cfg.octopusGrpcUrl,
                plaintext: cfg.octopusGrpcPlaintext,
            },
        },
        registration: {
            octopus: {
                name: cfg.gatewayName,
                serverApiUrl: cfg.octopusApiUrl,
                spaceId: cfg.octopusSpaceId,
                environments: cfg.octopusEnvironments,
                // Reference the Octopus API key secret created above.
                serverAccessTokenSecretName: octopusApiKeySecret.metadata.name,
                serverAccessTokenSecretKey: "OCTOPUS_SERVER_ACCESS_TOKEN",
            },
            argocd: {
                webUiUrl: cfg.argocdWebUiUrl,
            },
        },
    },
    timeout: 300,
}, {
    provider: k8sProvider,
    // The Argo CD token secret must exist before the gateway pod starts.
    dependsOn: [argocdToken, octopusApiKeySecret],
});
```

:::

## Index

```typescript
// index.ts
import { argocd, argocdNs } from "./argocd";
import { argocdTokenSecretName, gatewayNs } from "./argocd-token";
import * as cfg from "./config";

// Re-importing for side effects so the gateway secret (and optional Helm release) is created.
import "./gateway";

// Useful one-liners and resource references.
export const argocdNamespace = argocdNs.metadata.name;
export const gatewayNamespace = gatewayNs.metadata.name;

export const argocdTokenSecret = `${cfg.gatewayNamespace}/${argocdTokenSecretName}`;

export const getArgocdAdminPassword =
    `kubectl get secret argocd-initial-admin-secret -n ${cfg.argocdNamespace} -o jsonpath='{.data.password}' | base64 --decode && echo`;

export const getArgocdToken =
    `kubectl get secret ${argocdTokenSecretName} -n ${cfg.gatewayNamespace} -o jsonpath='{.data.ARGOCD_AUTH_TOKEN}' | base64 --decode && echo`;
```

Exports show up under `pulumi stack output` (`pulumi stack output --show-secrets` for sensitive ones).

## Pulumi stack

```yaml
# Pulumi.dev.yaml.example
# Copy this file to Pulumi.<stack>.yaml (e.g. Pulumi.dev.yaml) and fill in the values.
# Never commit a stack file containing real secrets to source control.
#
# For secret values, prefer:
#   pulumi config set --secret argocd-bootstrap:octopusApiKey API-XXXXXXXX
# which encrypts the value at rest using the stack's secrets provider.

config:
  # ─── Kubernetes ─────────────────────────────────────────────────────────────
  argocd-bootstrap:kubeconfigPath: "~/.kube/config"
  argocd-bootstrap:kubeContext: "my-cluster-context"   # omit to use the current context

  # ─── Argo CD ────────────────────────────────────────────────────────────────
  argocd-bootstrap:argocdNamespace: "argocd"
  argocd-bootstrap:argocdChartVersion: "9.4.6"

  # External Web UI URL — used during Octopus registration for the Argo CD link.
  argocd-bootstrap:argocdWebUiUrl: "https://argocd.example.com"

  # Set to true if Argo CD uses a self-signed certificate.
  argocd-bootstrap:argocdInsecure: "false"

  # ─── Octopus Deploy ─────────────────────────────────────────────────────────
  argocd-bootstrap:octopusApiUrl: "https://my-instance.octopus.app"
  argocd-bootstrap:octopusGrpcUrl: "my-instance.octopus.app:8443"
  # Set via: pulumi config set --secret argocd-bootstrap:octopusApiKey API-XXXXXXXX
  argocd-bootstrap:octopusApiKey:
    secure: "v1:AAAA...encrypted..."
  argocd-bootstrap:octopusSpaceId: "Spaces-1"

  # List of environment slugs or IDs to associate with this gateway.
  argocd-bootstrap:octopusEnvironments:
    - "production"
    - "staging"

  # Set to true only when Octopus runs without TLS on its gRPC port (dev only).
  argocd-bootstrap:octopusGrpcPlaintext: "false"

  # ─── Gateway ────────────────────────────────────────────────────────────────
  argocd-bootstrap:gatewayNamespace: "octopus-argocd-gateway"

  # only used if deploying the octopus-argocd-gateway using @pulumi/kubernetes
  argocd-bootstrap:gatewayName: "my-argocd-gateway"
  argocd-bootstrap:gatewayChartVersion: "1.23.0"
```

Run the bootstrap with:

```bash
pulumi stack init dev
pulumi config set --secret argocd-bootstrap:octopusApiKey API-XXXXXXXX
# ...set the remaining config values...
pulumi up
```
