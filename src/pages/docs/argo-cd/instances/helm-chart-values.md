---
layout: src/layouts/Default.astro
pubDate: 2026-08-27
modDate: 2026-08-27
title: Argo CD Gateway Chart Values
description: Gateway Helm chart values and their descriptions
navOrder: 10
hideInThisSectionHeader: true
---

## Values

### Image

| Key | Default | Description |
| ----- | --------- | ------------- |
| image.repository | `"octopusdeploy/octopus-argocd-gateway"` | Image name to use |
| image.registry | `"docker.io"` | Registry host to pull images from |
| image.pullPolicy | `"IfNotPresent"` | Image pull policy |
| image.tag | `.Chart.AppVersion` | Image tag to use |
| image.tagSuffix | `""` | Suffix to append to the image tag |
| image.imagePullSecrets | `[]` | This is for the secrets for pulling an image from a private repository, more information can be found in the [Kubernetes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) |

### Gateway

| Key | Default | Description |
| ----- | --------- | ------------- |
| gateway.debug | `false` | Enable debug logs |
| gateway.serverCertificateSecretName | `""` | The name of a secret containing one or more base64-encoded public keys of x509 certificates used by Octopus and Argo CD that the Gateway should trust. The secret must be in the same namespace as the Gateway and all certificates must be in the PEM format. |
| gateway.serverCertificates | `[]` | A list of base64-encoded public key of the self-signed x509 certificates or root CA certificates used by the target Octopus and/or Argo CD Server. Must be in the PEM format. |
| gateway.octopus.serverGrpcUrl | `""` | The gRPC url (including the port) of the Octopus Deploy server to communicate with |
| gateway.octopus.serverThumbprint | `""` | The thumbprint of the Octopus Deploy server the gateway is communicating with. This should only be used if you wish to pin the certificate. |
| gateway.octopus.plaintext | `false` | Disables TLS on the connection to the Octopus Deploy server This should only be used if your Octopus Server is running without a certificate on its gRPC listener. |
| gateway.octopus.serverCertificate | `""` | DEPRECATED: use gateway.serverCertificates instead - The base64-encoded public key of the self-signed x509 certificate or root CA certificate used by the target Octopus Server. Must be in the PEM format. |
| gateway.octopus.keepAlive.intervalSeconds | `30` | Duration between sending a keep alive to the Octopus Deploy server. Set to 0 to disable keep alives. |
| gateway.octopus.keepAlive.maxConsecutiveFailures | `10` | Maximum number of keep alive consecutive failures before the application will restart |
| gateway.argocd.serverGrpcUrl | `""` | The gRPC url (including the port) of the Argo CD instance to communicate with |
| gateway.argocd.authenticationToken | `""` | The bearer token used to authenticate with the Argo CD instance. If supplied, a Kubernetes secret is created to hold this token. Mutually exclusive with authenticationTokenSecretName/authenticationTokenSecretKey, and with projectAuthentication/projectAuthenticationSecretName. |
| gateway.argocd.authenticationTokenSecretName | `""` | Required when authenticationToken is not set: name of an existing secret that contains the Argo CD authentication token. When authenticationToken is set, this overrides the default secret name. Mutually exclusive with projectAuthentication/projectAuthenticationSecretName. |
| gateway.argocd.authenticationTokenSecretKey | `""` | Required when authenticationToken is not set: the key within the secret that holds the token. When authenticationToken is set, this overrides the default key ("token"). |
| gateway.argocd.plaintext | `false` | Disable TLS on the connection to the Argo CD instance |
| gateway.argocd.insecure | `false` | Skip server certificate and domain verification on the TLS connection to the Argo CD instance |
| gateway.argocd.grpcWeb | `false` | Use the gRPC-Web protocol to connect to the Argo CD instance. Useful when the Argo CD API is behind a proxy that does not support HTTP/2. |
| gateway.argocd.grpcWebRootPath | `""` | Enables gRPC-Web and sets a root path prefix that the Argo CD API is served under (e.g. /argocd). Takes precedence over grpcWeb if both are set. |
| gateway.argocd.serverCertificate | `""` | DEPRECATED: use gateway.serverCertificates instead - The base64-encoded public key of the self-signed x509 certificate or root CA certificate used by the target Argo CD Server. Must be in the PEM format. |
| gateway.argocd.projectAuthentication | `[]` | A list of per-project Argo CD authentication tokens. Each entry is `{ project: <name>, token: <token> }`. If supplied, a Kubernetes Secret is created and projected into the gateway container via `envFrom`. Mutually exclusive with `projectAuthenticationSecretName`, and with `authenticationToken`/`authenticationTokenSecretName`. |
| gateway.argocd.projectAuthenticationSecretName | `""` | Name of an existing Secret whose keys (`PROJECT_AUTH_TOKEN_<project>`) hold per-project Argo CD tokens. Mutually exclusive with `projectAuthentication` being set, and with `authenticationToken`/`authenticationTokenSecretName`. |
| gateway.serviceAccount.create | `true` | Specifies whether a service account should be created |
| gateway.serviceAccount.automountServiceAccountToken | `true` | Controls if the service account token should be automatically mounted into the gateway pod |
| gateway.serviceAccount.name | `""` | Name of an existing service account to use for the gateway pod |
| gateway.serviceAccount.annotations | `{}` | Additional annotations for the service account |

### Registration

| Key | Default | Description |
| ----- | --------- | ------------- |
| registration.register | `true` | Automatically register the gateway with the Octopus Deploy server, if set to false the gateway will not register itself |
| registration.serviceAccount.create | `true` | Specifies whether a service account should be created, if registration.register is set to false this will not be used |
| registration.serviceAccount.automountServiceAccountToken | `true` | Controls if the service account token should be automatically mounted into the registration pod |
| registration.serviceAccount.name | `""` | Name of an existing service account to use for the registration pod |
| registration.serviceAccount.annotations | `{}` | Additional annotations for the service account |
| registration.octopus.name | `""` | Name of the gateway |
| registration.octopus.serverApiUrl | `""` | The API URL of Octopus Deploy for registration e.g. `https://my-instance.octopus.app` |
| registration.octopus.serverAccessToken | `""` | The access token to authenticate to Octopus Deploy. If supplied, a Kubernetes secret is created to hold this token. Mutually exclusive with authenticationTokenSecretName/authenticationTokenSecretKey. |
| registration.octopus.serverAccessTokenSecretName | `""` | Required when serverAccessToken is not set: name of an existing secret that contains the Octopus Deploy access token. When serverAccessToken is set, this overrides the default secret name. |
| registration.octopus.serverAccessTokenSecretKey | `""` | Required when serverAccessToken is not set: the key within the secret that holds the token. When serverAccessToken is set, this overrides the default key ("token"). |
| registration.octopus.environments | `[]` | Environment slugs or ids that the gateway should be associated with |
| registration.octopus.spaceId | `""` | The space id that the gateway is registering with. Merged with spaceIds when both are set. |
| registration.octopus.spaceIds | `[]` | IDs of spaces to register the gateway with, merged with spaceId. The configured environments and tenants must exist in every space. At least one of spaceId or spaceIds is required. |
| registration.octopus.serverCertificate | `""` | DEPRECATED: use gateway.serverCertificates instead - The base64-encoded public key of the self-signed x509 certificate or root CA certificate used by the Octopus Server for its HTTP API. Must be in the PEM format. |
| registration.argocd.webUiUrl | `""` | The URL of the Argo CD instance's Web UI |

### Automatic update

| Key | Default | Description |
| ----- | --------- | ------------- |
| autoUpdate.enabled | `true` | Indicates if the automatic update process CronJob is enabled. If set to false, the CronJob is not created |
| autoUpdate.schedule | `"0 0 * * *"` | A Cron expression for how often the CronJob executes. |
| autoUpdate.successfulJobsHistoryLimit | `1` | The number of successful finished jobs to keep. Set to 0 to not keep any successful jobs. |
| autoUpdate.failedJobsHistoryLimit | `1` | The number of failed finished jobs to keep. Set to 0 to not keep any failed jobs. |
| autoUpdate.serviceAccount.create | `true` | Specifies whether a service account should be created, if autoUpdate.enabled is set to false this will not be used |
| autoUpdate.serviceAccount.automountServiceAccountToken | `true` | Controls if the service account token should be automatically mounted into the automatic update Job pod |
| autoUpdate.serviceAccount.name | `""` | Name of an existing service account to use for the automatic update Job pod |
| autoUpdate.serviceAccount.annotations | `{}` | Additional annotations for the service account |
| autoUpdate.job.backoffLimit | `3` | Sets the number of times the job re-runs on failure |

### Security context

| Key | Default | Description |
| ----- | --------- | ------------- |
| podSecurityContext.seccompProfile.type | `"RuntimeDefault"` | Seccomp profile applied to the gateway pods |
| securityContext.readOnlyRootFilesystem | `true` | Mount the container root filesystem as read-only. When true, an emptyDir volume is mounted at /tmp so the gateway still has scratch space |
| securityContext.allowPrivilegeEscalation | `false` | Allow a process to gain more privileges than its parent process |
| securityContext.capabilities.drop | `["ALL"]` | Linux capabilities to drop from the gateway container |

### Metrics

| Key | Default | Description |
| ----- | --------- | ------------- |
| metrics.enabled | `false` | Enable the Prometheus metrics server |
| metrics.port | `9090` | Port to expose Prometheus metrics on |
| metrics.service.labels | `{}` | Additional labels for the metrics Service |
| metrics.service.annotations | `{}` | Additional annotations for the metrics Service |
| metrics.serviceMonitor.enabled | `false` | Create a ServiceMonitor resource (requires metrics.enabled and Prometheus Operator) |
| metrics.serviceMonitor.path | `"/metrics"` | Metrics scrape path |
| metrics.serviceMonitor.interval | `""` | Scrape interval (e.g. "30s"). Defaults to the Prometheus global interval if unset |
| metrics.serviceMonitor.scrapeTimeout | `""` | Scrape timeout. Defaults to the Prometheus global scrapeTimeout if unset |
| metrics.serviceMonitor.scheme | `""` | Scheme to use for scraping (http or https) |
| metrics.serviceMonitor.tlsConfig | `{}` | TLS configuration for scraping |
| metrics.serviceMonitor.labels | `{}` | Additional labels to add to the ServiceMonitor (useful for Prometheus selector rules) |
| metrics.serviceMonitor.annotations | `{}` | Additional annotations to add to the ServiceMonitor |
| metrics.serviceMonitor.relabelings | `[]` | Relabeling rules applied before ingestion |
| metrics.serviceMonitor.metricRelabelings | `[]` | Metric relabeling rules applied after scraping |
| metrics.serviceMonitor.namespaceSelector | `{}` | Namespace selector for the ServiceMonitor |

### Other values

| Key | Default | Description |
| ----- | --------- | ------------- |
| replicaCount | `1` | Number of gateway replicas to run. The gateway uses Kubernetes leader election so that only one replica processes events at a time; the others stand by as warm passives and take over if the leader fails. Increase this for active-passive high availability. |
| nameOverride | `""` | This is to override the chart name. |
| podAnnotations | `{}` | Annotations to be added to kubernetes gateway pods |
| podLabels | `{}` | Labels to be added to kubernetes gateway pods |
| nodeSelector | `{}` | Custom node selector for kubernetes gateway pods |
| tolerations | `[]` | Custom tolerations for kubernetes gateway pods |
| affinity | `{}` | Custom affinity for kubernetes gateway pods |
| extraEnv | `[]` | Extra environment variables to inject into the gateway container. Each entry is a standard Kubernetes EnvVar (supports `value`, `valueFrom`, etc.). |
| resources | `{}` | Custom resources for kubernetes gateway pods |
