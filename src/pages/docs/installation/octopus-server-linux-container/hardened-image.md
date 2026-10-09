---
layout: src/layouts/Default.astro
pubDate: 2026-10-01
modDate: 2026-10-01
title: Hardened Octopus Server Linux Container
description: Run Octopus Server in a minimal, shell-less Linux container that runs as a non-root user. Learn what's different from the standard image, how to configure it, and which features aren't supported.
navOrder: 30
---

The hardened Octopus Server Linux Container is a minimal variant of the [Octopus Server Linux Container](/docs/installation/octopus-server-linux-container). It's built for teams that need a reduced attack surface to meet security or compliance requirements.

Compared to the standard image, the hardened image:

- Is built on a [Docker Hardened Image](https://docs.docker.com/dhi/) minimal base, with no shell, package manager, or general-purpose OS tools.
- Runs as a non-root user (UID `1001`) by default.
- Supports running as an arbitrary UID, as long as that UID is a member of group `0`. This makes it compatible with OpenShift's `restricted` security context constraints.
- Contains no files with the SUID or SGID bit set, and no world-writable paths outside `/tmp` and `/var`.
- Doesn't run Docker-in-Docker and doesn't need privileged permissions.

The hardened image is opt-in. It's published alongside the standard image, and the standard image is unchanged.

## Security updates and compatibility

The hardened image exists to keep up with security changes. When the base image or the native libraries it ships with are updated, those changes flow into the next Octopus Server release without any compatibility shims.

The most visible example is OpenSSL. The hardened image uses OpenSSL for TLS, and OpenSSL updates regularly deprecate older TLS versions, cipher suites, and key sizes. When that happens, clients and targets that only support the older options may stop being able to connect to Octopus Server. This can include:

- Older Tentacles, or Tentacles running on older operating systems with outdated TLS libraries.
- SSH targets that only offer deprecated key exchange algorithms or ciphers.
- Older API clients, CLIs, or integrations that can't negotiate a modern TLS connection.

This is intentional. We won't hold back security updates in the hardened image to keep older clients working.

If you choose the hardened image, plan to:

- Upgrade Octopus Server regularly, so you pick up base image and library fixes.
- Keep your Tentacles, workers, and deployment targets on supported, up-to-date operating systems and Tentacle versions.
- Read the release notes for each upgrade and test it in a non-production instance before upgrading production.

If you need to support older clients or targets that can't keep up, use the [standard Octopus Server Linux Container](/docs/installation/octopus-server-linux-container) instead.

## Choose an image

| | Standard image | Hardened image |
| --- | --- | --- |
| Base image | Debian-based .NET runtime image | Docker Hardened Image (`static`), no shell |
| Runs as | `root` | UID `1001`, group `0` (or any UID in group `0`) |
| [Built-in worker](/docs/infrastructure/workers/built-in-worker) | Supported | Not supported |
| [Script Console](/docs/administration/managing-infrastructure/script-console) targeting the Octopus Server | Supported | Not supported |
| Docker-in-Docker for [execution containers](/docs/projects/steps/execution-containers-for-workers) on the built-in worker | Supported, needs `--privileged` | Not supported |
| Interactive troubleshooting with `docker exec ... bash` | Supported | Not supported |
| Architecture | `linux/amd64` | `linux/amd64` |
| Security update policy | Balances updates with compatibility | Takes the latest security changes, even when they break older clients |

## Getting started

The hardened image is published to the same [Docker Hub repository](https://hub.docker.com/r/octopusdeploy/octopusdeploy) as the standard image, using tags with a `-hardened` suffix.

```bash
docker run --detach --name OctopusDeploy \
  --publish 8080:8080 \
  --publish 10943:10943 \
  --env ACCEPT_EULA="Y" \
  --env DB_CONNECTION_STRING="..." \
  --env ADMIN_USERNAME="admin" \
  --env ADMIN_PASSWORD="..." \
  --volume ./masterKey:/masterKey \
  octopusdeploy/octopusdeploy:<version>-hardened
```

- You don't need `--interactive` or `--privileged`. The container runs Octopus Server in non-interactive mode and doesn't start Docker-in-Docker.
- Mounting `/masterKey` is optional. If you don't supply a `MASTER_KEY`, Octopus generates one on first startup and writes it to `/masterKey/OctopusServer`. You need this key for every subsequent startup against the same database.
- If you don't supply `ADMIN_USERNAME` and `ADMIN_PASSWORD`, Octopus creates an admin user with default credentials and logs a warning. Change the password the first time you sign in.

## Run as a non-root or arbitrary user

The image runs as UID `1001` by default. Every file and directory Octopus needs to write to is owned by group `0` and has group permissions that match the owner permissions (`g=u`). This means any UID that's a member of group `0` has the same access as UID `1001`.

To run as a different UID with Docker, pass `--user` with group `0`:

```bash
docker run --detach --user 12345:0 ... octopusdeploy/octopusdeploy:<version>-hardened
```

On Kubernetes, set a security context on the pod:

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1001
  runAsGroup: 0
  fsGroup: 0
```

On OpenShift, the default `restricted` security context constraint assigns a UID from the namespace's range and adds it to group `0`. You don't need to grant the service account any additional permissions.

### Volume permissions

Because the container doesn't run as `root`, it can't take ownership of mounted volumes. Make sure every volume you mount is writable by UID `1001` or by group `0`.

For host directories, either change their owner to UID `1001`, or give group `0` the same permissions as the owner:

```bash
sudo chown -R 1001:0 /path/to/octopus-data
sudo chmod -R g=u /path/to/octopus-data
```

On Kubernetes, setting `fsGroup: 0` in the pod's security context makes supported volume types writable by group `0`.

If Octopus can't write the generated master key to a mounted `/masterKey` volume, startup fails with an error that explains how to fix the volume's permissions.

### Read-only root filesystem

Every path the hardened image writes to is declared as a volume, so you can run it with a read-only root filesystem, for example `docker run --read-only` or `readOnlyRootFilesystem: true` in a Kubernetes security context. Mount a writable volume for each path listed in [volume mounts](#volume-mounts).

## Configuration

The hardened image supports the same core [environment variables](/docs/installation/octopus-server-linux-container#environment-variables) and [master key](/docs/installation/octopus-server-linux-container#master-key) behavior as the standard image.

### Environment variables

| Name | Description |
| --- | --- |
| **ACCEPT_EULA** | Must be set to `Y` to accept the [Octopus Deploy EULA](https://octopus.com/company/legal). The container won't start without it. |
| **DB_CONNECTION_STRING** | Connection string to the SQL Server database. Required. |
| **MASTER_KEY** | The master key for an existing database. If not supplied and the database doesn't exist, Octopus generates a new one. Required if the database already exists. |
| **OCTOPUS_SERVER_BASE64_LICENSE** | Your Octopus Deploy license key, base64 encoded. |
| **ADMIN_USERNAME** | The admin user to create. Defaults to `admin`. |
| **ADMIN_PASSWORD** | The password for the admin user. If not supplied, a default password is used. |
| **ADMIN_EMAIL** | The email address for the admin user. |
| **ADMIN_API_KEY** | An API key to create for the admin user. |
| **ADMIN_EXTERNAL_ID**, **ADMIN_OIDCIDENTITY_NAME**, **ADMIN_OIDCIDENTITY_ISSUER**, **ADMIN_OIDCIDENTITY_SUBJECT**, **ADMIN_OIDCIDENTITY_AUDIENCE** | When all five are set, the admin user is linked to an external OIDC identity instead of a local password. |
| **OCTOPUS_SERVER_NODE_NAME** | The name of this Octopus Server node. Set this to a unique value for each node in a [high availability](/docs/administration/high-availability) cluster. |
| **OCTOPUS_SERVER_URI** | The public URI of this Octopus Server. |
| **TASK_CAP** | The task cap for this node. Defaults to `5`. |
| **SSL_CERTIFICATE_FILE** | Path to a certificate file inside the container. When set, Octopus binds HTTPS. The container fails to start if the file doesn't exist. |
| **SSL_CERTIFICATE_PASSWORD** | The password for the certificate in `SSL_CERTIFICATE_FILE`. |
| **HTTPS_PORT** | The port to bind HTTPS on. Defaults to `443`. |
| **WEB_FORCE_SSL** | When a certificate is supplied, set to `False` to keep the HTTP listener on port `8080` available alongside HTTPS. Defaults to `True`. |
| **ENABLE_INSECURE_GRPC_LISTENER** | Set to `True` to enable the insecure gRPC listener. |
| **ENABLE_USAGE** | Set to `N` to opt out of sending usage telemetry. |
| **SERVICE_MODE** | Passed to Octopus Server as `--service-mode`. |

`DISABLE_DIND` has no effect on the hardened image, because it never runs Docker-in-Docker.

### Exposed container ports

| Port | Description |
| --- | --- |
| **8080** | Port for API and HTTP portal |
| **443** | SSL port for API and HTTP portal |
| **10943** | Port for Polling Tentacles to contact the server |
| **8443** | Port for gRPC clients to contact the server |

### Volume mounts

| Name | Description | Mount source |
| --- | --- | --- |
| **/import** | Imports from this folder if [Octopus Migrator](/docs/administration/octopus.migrator.exe-command-line) metadata.json exists | Host filesystem or container |
| **/repository** | Package path for the built-in package repository | Shared storage |
| **/artifacts** | Path where artifacts are stored | Shared storage |
| **/taskLogs** | Path where task logs are stored | Shared storage |
| **/eventExports** | Path where event audit logs are exported | Shared storage |
| **/cache** | Path where cached files, such as signature and delta files, are stored | Host filesystem or container |
| **/masterKey** | If mounted, Octopus writes a generated master key to `/masterKey/OctopusServer` on first startup | Host filesystem or secret store |
| **/diagnostics** | Startup logs and crash dumps | Host filesystem or container |
| **/Octopus/.octopus** | Octopus Server instance configuration | Host filesystem or container |
| **/Octopus/.octopus/OctopusServer/Server** | Octopus Server node configuration and logs | Host filesystem or container |
| **/etc/octopus** | Octopus instance registry | Host filesystem or container |
| **/tmp** | Temporary files | Container |

:::div{.hint}
Use shared storage for files that must be shared between multiple Octopus Server nodes, such as artifacts, packages, task logs, and event exports.
:::

## Health checks

The standard image's health check script needs `bash` and `curl`, which the hardened image doesn't include. Instead, the hardened image has a built-in Docker `HEALTHCHECK` that runs:

```bash
/Octopus/Octopus.Server container-healthcheck
```

This command sends a request to `/api/octopusservernodes/ping`. It uses HTTPS when `SSL_CERTIFICATE_FILE` is set, and HTTP on port `8080` otherwise. A node that's draining or in [maintenance mode](/docs/administration/managing-infrastructure/maintenance-mode) is reported as healthy.

Kubernetes ignores the Docker `HEALTHCHECK`. Use the same command as an `exec` probe, or use an `httpGet` probe against the same endpoint:

```yaml
startupProbe:
  exec:
    command: ["/Octopus/Octopus.Server", "container-healthcheck"]
  periodSeconds: 10
  failureThreshold: 30
livenessProbe:
  exec:
    command: ["/Octopus/Octopus.Server", "container-healthcheck"]
  periodSeconds: 30
  timeoutSeconds: 30
```

## Unsupported features

Because the hardened image has no shell, features that run scripts directly on the Octopus Server don't work.

### Built-in worker

The [built-in worker](/docs/infrastructure/workers/built-in-worker) isn't supported. Octopus turns it off the first time a hardened container starts.

Steps configured to run on the Octopus Server fail with an error explaining that no shell is available. Configure these steps to run on an [external worker](/docs/infrastructure/workers) or deployment target instead.

This also means [execution containers](/docs/projects/steps/execution-containers-for-workers) can only run on external workers, not on the built-in worker.

### Script Console on the Octopus Server

You can't use the [Script Console](/docs/administration/managing-infrastructure/script-console) to run scripts on the Octopus Server itself. You can still use it to run scripts on deployment targets and external workers.

## Switch between the standard and hardened images

You can switch an existing Octopus Server from the standard Linux image to the hardened image, and back, using the same database, volumes, and master key.

Before you switch to the hardened image:

1. Move any steps and runbooks that run on the Octopus Server to an external worker or deployment target. The built-in worker is turned off when the hardened container first starts.
2. Make sure every mounted volume is writable by UID `1001` or group `0`. See [volume permissions](#volume-permissions).
3. Get your master key. You can read it from a running container with:

   ```bash
   docker exec <container> /Octopus/Octopus.Server show-master-key --console --instance OctopusServer
   ```

Then stop the standard container and start the hardened container with the same `DB_CONNECTION_STRING`, `MASTER_KEY`, and volume mounts.

If you switch back to the standard image, the built-in worker stays turned off. You can turn it back on in **Configuration ➜ Features**.

## Upgrading

Upgrade the hardened image the same way as the [standard image](/docs/installation/octopus-server-linux-container#upgrading): stop the running container and start a new one with the new image tag, the same environment variables, the same master key, and the same volume mounts.

Upgrade regularly. Each release picks up the latest base image and library security updates. See [security updates and compatibility](#security-updates-and-compatibility).

## Troubleshooting

The hardened image has no shell, so you can't open an interactive session with `docker exec -it <container> bash`. You can still:

- Read the container logs with `docker logs <container>` or `kubectl logs <pod>`.
- Run Octopus Server commands directly, for example `docker exec <container> /Octopus/Octopus.Server show-configuration --instance OctopusServer`.
- Read startup logs and crash dumps from the `/diagnostics` volume.
- Attach a debug container that has its own tools, using `docker debug` or `kubectl debug`.

If you see `Permission denied` errors on startup, check that your mounted volumes are writable by the container's UID or by group `0`.

For other issues, see [troubleshooting Octopus Server in a container](/docs/installation/octopus-server-linux-container/troubleshooting-octopus-server-in-a-container).
