---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Octopus Server Linux Container
description: Running the Octopus Server in the official Docker Linux container
navOrder: 8
hideInThisSection: true
---

!include <octopus-server-in-container>

![Introducing the Octopus Server Linux Docker image](/docs/installation/octopus-server-linux-container/octopus-linux-docker-image.png "width=500")

This page describes how to run Octopus Server in the Linux Container.

**Note:** When using Linux containers on a Windows machine, please ensure you have [switched to Linux Containers](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers).

## Getting started

Although there are a few different configuration options, the following is a simple example of starting the  Octopus Server Linux container:

```bash
$ docker run --interactive --detach --name OctopusDeploy --publish 1322:8080 --env ACCEPT_EULA="Y" --env DB_CONNECTION_STRING="..." !docker-image <octopusdeploy/octopusdeploy>
```

- We run in detached mode with `--detach` to allow the container to run in the background.
- The `--interactive` argument ensures that `STDIN` is kept open which is required since internally this is what the running `Octopus.Server.exe` process is waiting on to close.
- Setting `--name OctopusServer` gives us an easy to remember name for this container. This is optional, but we recommend you provide a name that is meaningful to you, as that will make it easier to perform actions on the container later if necessary.
- Using `--publish 1322:8080` maps the _container port_ `8080` to `1322` on the host so that the Octopus instance is accessible outside this sever.
- To set the connection string we provide an _environment variable_ `DB_CONNECTION_STRING` (this can be to a local database or an external database).

In this example, we are running the image `!docker-image <octopusdeploy/octopusdeploy>`. The tag maps directly to the Octopus Server version that is bundled inside the image.

## Running Octopus Server in a Container

This section walks through some of the different ways you can run the Octopus Server Linux Container, from `docker compose` to using a full orchestration service such as Kubernetes:

- [Octopus Server Container with Docker Compose](/docs/installation/octopus-server-linux-container/docker-compose-linux/)
- [Octopus Server Container with systemd](/docs/installation/octopus-server-linux-container/systemd-service-definition/)
- [Octopus Server Container in Kubernetes](/docs/installation/octopus-server-linux-container/octopus-in-kubernetes/)

## Migration

You may already have an existing Octopus Server running on Windows Server or running in a Windows container that you wish to run in a Linux Container. This section walks through the different options and considerations for migration to the Octopus Server Linux Container. 

- [Migrate to Octopus Server Linux Container from Windows Server](/docs/installation/octopus-server-linux-container/migration/migrate-to-server-container-linux-from-windows-server/)
- [Migrate to Octopus Server Linux Container from Windows Container](/docs/installation/octopus-server-linux-container/migration/migrate-to-server-container-linux-from-windows-container/)

## Configuration

:::hint
Support for authentication providers differs depending on how you host Octopus Server. Please see our [authentication provider compatibility section](/docs/security/authentication/auth-provider-compatibility/) to ensure any existing authentication provider is supported when running Octopus in a Linux Container.
:::

When running an Octopus Server Image, the following values can be provided to configure the running Octopus Server instance.

### Master Key

If you do not specify a master key when Octopus is first run, Octopus will generate one for you, which you then must pass as the `MASTER_KEY` environment variable with each subsequent run. However, it is also possible to generate your own master key which is used by Octopus when configuring the database.

Master keys must be a 128 bit string that is then base 64 encoded. You can generate a random string to use as the master key with the command:

```
openssl rand 16 | base64
```

### Environment Variables

Read the Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file) about setting environment variables.

|  Name       |    |
| ------------- | ------- |
|**DB_CONNECTION_STRING**|Connection string to the database to use|
|**MASTER_KEY**|The Master Key to use to connect to an existing database. If not supplied, and the database does not exist, it will generate a new one. The Master Key is mandatory if the database exists.|
|**OCTOPUS_SERVER_BASE64_LICENSE**|Your license key for Octopus Deploy. If left empty, it will try and create a free license key for use
|**ADMIN_USERNAME**|The admin user to create for the Octopus Server|
|**ADMIN_PASSWORD**|The password for the admin user for the Octopus Server|
|**ADMIN_EMAIL**|The email associated with the admin user account|
|**DISABLE_DIND**|The Linux image will by default attempt to run Docker-in-Docker to support [execution containers for workers](/docs/projects/steps/execution-containers-for-workers/). This requires the image be launched with [privileged permissions](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities). Setting `DISABLE_DIND` to `Y` prevents Docker-in-Docker from being run when the container is booted.|

### Exposed Container Ports

Read Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose) about exposing ports.

|  Port       |    |
| ------------- | ------- |
|**8080**| Port for API and HTTP portal |
|**443**| SSL Port for API and HTTP portal |
|**10943**|Port for Polling Tentacles to contact the server|


### Volume Mounts

Read the Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only) about mounting volumes.

| Name     | Description | Mount source |
| ------------- | ------- | ------- | 
|**/import**| Imports from this folder if [Octopus Migrator](/docs/octopus-rest-api/octopus.migrator.exe-command-line/) metadata.json exists then migrator `Import` takes place on startup | Host filesystem or container |
|**/repository**| Package path for the built-in package repository | Shared storage |
|**/artifacts**| Path where artifacts are stored | Shared storage |
|**/taskLogs**| Path where task logs are stored | Shared storage |
|**/cache**| Path where cached files e.g. signature and delta files (used for package acquisition) are stored | Host filesystem or container |

:::hint
**Note:** We recommend using shared storage when mounting the volumes for files that need to be shared between multiple octopus container nodes, e.g. artifacts, packages and task logs.
:::

## Upgrading

When the volumes are externally mounted to the host filesystem, upgrades between Octopus versions are much easier. We can picture the upgrade process with a container as being similar to [moving a standard Octopus Server](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-database-and-server/) since containers, being immutable, don't themselves get updated.

Similar to moving an instance, to perform the container upgrade you will need the Master Key that was used to set up the original database. The Master Key for an Octopus Server in a container can be found by using the container exec command:

```
> docker container exec <container name/ID> /Octopus/Octopus.Server show-master-key --console --instance OctopusServer

5qJcW9E6B99teMmrOzaYNA==
```

When you have the Master Key, you can stop the running Octopus Server container instance (delete it if you plan on using the same name), and run _almost_ the same command as before, but this time, pass in the Master Key as an environment variable and reference the new Octopus Server version. When this new container starts up, it will use the same credentials and detect that the database has already been set up and use the Master Key to access its sensitive values:

```bash
$ docker run --interactive --detach --name OctopusServer --publish 1322:8080 --env DB_CONNECTION_STRING="..." --env MASTER_KEY "5qJcW9E6B99teMmrOzaYNA==" !docker-image <octopusdeploy/octopusdeploy>
```

The standard backup and restore procedures for the [data stored on the filesystem](/docs/administration/data/backup-and-restore/#octopus-file-storage) and the connected [SQL Server](/docs/administration/data/octopus-database/) still apply as per normal Octopus installations.

## Troubleshooting

If you're running into issues with the Octopus Server Linux Container then please use our [Troubleshooting](/docs/installation/octopus-server-linux-container/troubleshooting-octopus-server-in-a-container/) guide.


## Learn more

 - [Docker blog posts](http://octopus.com/blog/tag/docker)
 - [Linux blog posts](https://octopus.com/blog/tag/linux)
 - [Introducing the Octopus Server Linux Docker image](https://octopus.com/blog/introducing-linux-docker-image)
 - [Octopus Deploy on Docker Hub](https://hub.docker.com/r/octopusdeploy/octopusdeploy)
 - [Octopus Tentacle on Docker Hub](https://hub.docker.com/r/octopusdeploy/tentacle/)
