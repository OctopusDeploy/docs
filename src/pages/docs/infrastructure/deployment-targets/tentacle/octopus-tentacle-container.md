---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-04-30
title: Octopus Tentacle in a Container
description: An Octopus Tentacle instance can be run directly from within a container.
navOrder: 40
---

Running an Octopus Tentacle inside a container may be preferable in some environments where installing one directly on the host is not an option. 

Octopus publishes both `windows/amd64` and `linux/amd64` Docker images for Tentacle and they are available on [DockerHub](https://hub.docker.com/r/octopusdeploy/tentacle).

The Octopus Tentacle Docker image can be run in either [polling](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#polling-tentacles) or [listening](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication/#listening-tentacles-recommend) mode.

:::div{.info}

Tentacles set up this way will run *inside a container* and script execution will not happen on the host itself. For this reason, Octopus Tentacles inside a container may not be appropriate for many deployment tasks.
:::

When an Octopus Tentacle container starts up, it will attempt to invoke the [`register-with`](/docs/octopus-rest-api/tentacle.exe-command-line/register-with/) command to connect and add itself as a machine to that server with the provided [target tags](/docs/infrastructure/deployment-targets/#target-roles) and environments. This registration will occur on every startup and you may end up with multiple instances if you stop/start a container. Our goal is to update this image to de-register the Tentacle when the container `SIGKILL` signal is passed in. In the meantime you may want to use [machine policies](/docs/infrastructure/deployment-targets/machine-policies) to remove the duplicated targets.

<details data-group="deployment-targets-tentacle-container">
<summary>Deployment Target</summary>

```powershell
docker run --interactive --detach `
 --name OctopusTentacle `
 --publish 10933:10933 `
 --env ACCEPT_EULA="Y" `
 --env ListeningPort="10933" `
 --env ServerApiKey="API-XXXXXXXX" `
 --env TargetEnvironment="Development" `
 --env TargetRole="container-server" `
 --env ServerUrl="http://10.0.0.1:8080" `
 octopusdeploy/tentacle
```

</details>
<details data-group="deployment-targets-tentacle-container">
<summary>Worker</summary>

```powershell
docker run --interactive --detach `
 --name OctopusWorker `
 --publish 10933:10933 `
 --env ACCEPT_EULA="Y" `
 --env ListeningPort="10933" `
 --env ServerApiKey="API-XXXXXXXX" `
 --env TargetWorkerPool="LinuxWorkers" `
 --env ServerUrl="http://10.0.0.1:8080" `
 octopusdeploy/tentacle
```

</details>

## Configuration
When running an Octopus Tentacle Image, the following values can be provided to configure the running Octopus Tentacle instance.

### Environment Variables
Read Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file) about setting environment variables.

|  Name       |    |
| ------------- | ------- |
|**DISABLE_DIND**|Setting `DISABLE_DIND` to `Y` will disable Docker-in-Docker (used for [execution containers for workers](/docs/projects/steps/execution-containers-for-workers)) when the container is run. **Note:** This requires the image to be launched with privileged permissions. See [this section](#using-execution-containers-dind) for more information|
|**ServerApiKey**|The API Key of the Octopus Server the Tentacle should register with|
|**ServerUsername**|If not using an API key, the user to use when registering the Tentacle with the Octopus Server|
|**ServerPassword**|If not using an API key, the password to use when registering the Tentacle|
|**ServerUrl**|The Url of the Octopus Server the Tentacle should register with|
|**Space**|The name of the space which the Tentacle will be added to. Defaults to the default space|
|**TargetEnvironment**|Comma delimited list of environments to add this target to|
|**TargetRole**|Comma delimited list of [target tags](/docs/infrastructure/deployment-targets/#target-roles) to add to this target|
|**TargetWorkerPool**|Comma delimited list of worker pools to add to this target to (not to be used with the environment or target tag variables).|
|**TargetName**|Optional Target name, defaults to container generated host name|
|**TargetTenant**|Comma delimited list of tenants to add to this target|
|**TargetTenantTag**|Comma delimited list of tenant tags to add to this target|
|**TargetTenantedDeploymentParticipation**|The tenanted deployment mode of the target. Allowed values are `Untenanted`, `TenantedOrUntenanted`, and `Tenanted`. Defaults to `Untenanted`|
|**MachinePolicy**|The name of the machine policy that will apply to this Tentacle. Defaults to the default machine policy|
|**ServerCommsAddress**|The URL of the Octopus Server that the Tentacle will poll for work. Defaults to `ServerUrl`. Implies a polling Tentacle|
|**ServerPort**|The port on the Octopus Server that the Tentacle will poll for work. Defaults to `10943`. Implies a Polling Tentacle|
|**ListeningPort**|The port that the Octopus Server will connect back to the Tentacle with. Defaults to `10933`. Implies a listening Tentacle|
|**PublicHostNameConfiguration**|How the url that the Octopus Server will use to communicate with the Tentacle is determined. Can be `PublicIp`, `FQDN`, `ComputerName` or `Custom`. Defaults to `PublicIp`|
|**CustomPublicHostName**|If PublicHostNameConfiguration is set to `Custom`, the host name that the Octopus Server should use to communicate with the Tentacle|

### Exposed Container Ports
Read the [Docker docs](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose) about exposing ports.

:::div{.warning}
**Listening Port Breaking Change:** 
On Linux containers, prior to version `6.1.1271` the internal listening port was set by the `ListeningPort` environment variable. Any containers which previously exposed Tentacle on a port other than `10933` will need to have their port configuration updated if updating to a version `>=6.1.1271`. For example if the container was run with `-p 10934:10934` this should be updated to `-p 10934:10933`.
:::

|  Name       |    |
| ------------- | ------- |
|**10933**|Port Tentacle will be listening on (if in listening mode)|

### Volume Mounts
Read the Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only) about mounting volume.

|  Name       |    |
| ------------- | ------- |
|**C:\Applications**|Default directory to deploy applications to|


### Using execution containers for Workers {#using-execution-containers-dind}

By default, Docker containers are "unprivileged" and cannot run a Docker daemon inside a Docker container. 

Unless disabled, the Octopus Tentacle image attempts to run Docker-in-Docker to support [execution containers for workers](/docs/projects/steps/execution-containers-for-workers). This requires the image to be launched with [privileged permissions](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities):

```bash
docker run --privileged
```

If you plan to host Octopus Tentacle in Kubernetes, you should set the `privileged` flag to `true` in the `containers` YAML section:

```yaml
containers:
- name: octopus_tentacle
  image: octopusdeploy/tentacle
  securityContext:
    privileged: true
```

:::div{.hint}
Setting the environment variable `DISABLE_DIND` to `Y` prevents Docker-in-Docker from being run when the container is booted, and will prevent the execution containers feature working successfully.
:::

## Learn more

 - [Docker blog posts](http://octopus.com/blog/tag/docker)
