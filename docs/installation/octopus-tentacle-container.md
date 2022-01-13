---
title: Octopus Tentacle in a Container
description: An Octopus Tentacle instance can be run directly from within a container.
position: 10
---

Running an Octopus Tentacle inside a container may be preferable in some environments where installing one directly on the host is not an option. 

Octopus publishes both `windows/amd64` and `linux/amd64` Docker images for Tentacle and they are available on [DockerHub](https://hub.docker.com/r/octopusdeploy/).

The Octopus Tentacle Docker image can be run in either [polling](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#polling-tentacles) or [listening](/docs/infrastructure/deployment-targets/windows-targets/tentacle-communication.md#listening-tentacles-recommend) mode.

:::info
Tentacles set up this way will run *inside a container* and script execution will not happen on the host itself. For this reason, Octopus Tentacles inside a container may not be appropriate for many deployment tasks.
:::

When an Octopus Tentacle container starts up, it will attempt to invoke the [`register-with`](/docs/octopus-rest-api/tentacle.exe-command-line/register-with.md) command to connect and add itself as a machine to that server with the provided roles and environments. Due to some limitations in Windows Containers that have only [recently](https://github.com/moby/moby/issues/25982) been fixed and made available in the 1709 Windows release, this registration will occur on every startup and you may end up with multiple instances if you stop/start a container. Our goal is to update this image to de-register the Tentacle when the container `SIGKILL` signal is passed in. In the meantime you may want to use [machine policies](/docs/infrastructure/deployment-targets/machine-policies.md) to remove the duplicated targets.

```PowerShell Deployment Target
docker run --interactive --detach `
 --name OctopusTentacle `
 --publish 10933:10933 `
 --env "ListeningPort=10933" `
 --env "ServerApiKey=API-MZKUUUMK3EYX7TBJP6FAKIFHIEO" `
 --env "TargetEnvironment=Development" `
 --env "TargetRole=container-server" `
 --env "ServerUrl=http://10.0.0.1:8080" `
 !docker-image <octopusdeploy/tentacle>
```
```PowerShell Worker
docker run --interactive --detach `
 --name OctopusWorker `
 --publish 10933:10933 `
 --env "ListeningPort=10933" `
 --env "ServerApiKey=API-MZKUUUMK3EYX7TBJP6FAKIFHIEO" `
 --env "TargetWorkerPool=Windows2019Workers" `
 --env "ServerUrl=http://10.0.0.1:8080" `
 !docker-image <octopusdeploy/tentacle>
```

## Configuration
When running an Octopus Tentacle Image, the following values can be provided to configure the running Octopus Tentacle instance.

### Environment Variables
Read Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file) about setting environment variables.



|  Name       |    |
| ------------- | ------- |
|**ServerApiKey**|The API Key of the Octopus Server the Tentacle should register with|
|**ServerUsername**|If not using an API key, the user to use when registering the Tentacle with the Octopus Server|
|**ServerPassword**|If not using an API key, the password to use when registering the Tentacle|
|**ServerUrl**|The Url of the Octopus Server the Tentacle should register with|
|**Space**|The name of the space which the Tentacle will be added to. Defaults to the default space|
|**TargetEnvironment**|Comma delimited list of environments to add this target to|
|**TargetRole**|Comma delimited list of roles to add to this target|
|**TargetWorkerPool**|Comma delimited list of worker pools to add to this target to (not to be used with environments or role variable).|
|**TargetName**|Optional Target name, defaults to container generated host name|
|**TargetTenant**|Comma delimited list of tenants to add to this target|
|**TargetTenantTag**|Comma delimited list of tenant tags to add to this target|
|**TargetTenantedDeploymentParticipation**|The tenanted deployment mode of the target. Allowed values are Untenanted, TenantedOrUntenanted and Tenanted. Defaults to Untenanted|
|**MachinePolicy**|The name of the machine policy that will apply to this Tentacle. Defaults to the default machine policy|
|**ServerPort**|The port on the Octopus Server that the Tentacle will poll for work. Implies a polling Tentacle|
|**ListeningPort**|The port that the Octopus Server will connect back to the Tentacle with. Defaults to `10933`. Implies a listening Tentacle|
|**PublicHostNameConfiguration**|How the url that the Octopus Server will use to communicate with the Tentacle is determined. Can be `PublicIp`, `FQDN`, `ComputerName` or `Custom`. Defaults to `PublicIp`|
|**CustomPublicHostName**|If PublicHostNameConfiguration is set to `Custom`, the host name that the Octopus Server should use to communicate with the Tentacle|

### Exposed Container Ports
Read the [Docker docs](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose) about exposing ports.

|  Name       |    |
| ------------- | ------- |
|**10933**|Port Tentacle will be listening on (if in listening mode)|

### Volume Mounts
Read the Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only) about mounting volume.

|  Name       |    |
| ------------- | ------- |
|**C:\Applications**|Default directory to deploy applications to|

## Learn more

 - [Docker blog posts](http://octopus.com/blog/tag/docker)
