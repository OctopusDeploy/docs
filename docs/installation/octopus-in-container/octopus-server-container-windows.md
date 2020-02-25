---
title: Octopus Deploy Server Container Windows
description: An Octopus Deploy Server instance can be run directly from within a container.
position: 1
---

If you want to run an Octopus Deploy Linux container, please refer to the [Octopus Deploy Server Container Linux](/docs/installation/octopus-in-container/octopus-server-container-linux.md) documentation.

Running the Octopus Deploy Server inside a container provides a simple way to set up an Octopus Deploy instance. Upgrading to the latest version of Octopus is just a matter of running a new container with the new image version.

Although there are a few different configuration options, a simple example of starting up an Octopus Deploy server container is as follows:

```PowerShell
docker run --interactive 
           --detach `
           --name OctopusServer `
           --publish 1322:81 `
           --env DB_CONNECTION_STRING="..." `
           octopusdeploy/octopusdeploy:2019.13.4
```

We run in detached mode with `--detach` to allow the container to run in the background.

The `--interactive` argument ensures that `STDIN` is kept open which is required since internally this is what the running `Octopus.Server.exe` process is waiting on to close.

Setting `--name OctopusServer` just gives us an easy to remember name for this container. This is optional, but we recommend you provide a name that is meaningful to you, as that will make it easier to perform actions on the container later if necessary.

Using `--publish 1322:81` we map the _container port_ `81` to `1322` on the host so that the Octopus instance is accessible outside this sever.

To set the connection string we provide an _environment variable_ `DB_CONNECTION_STRING` (this can be to a local database or an external database).

In this example, we are running the image `octopusdeploy/octopusdeploy:2019.13.4`. The tag maps directly to the Octopus Server version that is bundled inside the image.

## Configuration

When running an Octopus Server Image, the following values can be provided to configure the running Octopus Server instance.

### Environment Variables

Read the Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file) about setting environment variables.

|  Name       |    |
| ------------- | ------- |
|**DB_CONNECTION_STRING**|Connection string to the database to use|
|**MASTER_KEY**|The master key to use to connect to an existing database. If not supplied, and the database does not exist, it will generate a new one. This is mandatory if the database exists|
|**OCTOPUS_SERVER_BASE64_LICENSE**|Your license key for Octopus Deploy. If left empty, it will try and create a free license key for use
|**ADMIN_USERNAME**|The admin user to create for the Octopus Server|
|**ADMIN_PASSWORD**|The password for the admin user for the Octopus Server|
|**ADMIN_EMAIL**|The email associated with the admin user account|

### Exposed Container Ports
Read Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose) about exposing ports.

|  Port       |    |
| ------------- | ------- |
|**81**| Port for API and HTTP portal |
|**10943**|Port for Polling Tentacles to contact the server|

_The Octopus Server container does not currently support HTTPS however this should be available sometime in the future_

### Volume Mounts

Read the Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only) about mounting volume.

|  Name       |    |
| ------------- | ------- |
|**C:\Import**|Imports from this folder if [Octopus Migrator](/docs/octopus-rest-api/octopus.migrator.exe-command-line/index.md) metadata.json exists then migrator `Import` takes place on startup|
|**C:\Repository**|Package path for the built-in package repository|
|**C:\Artifacts**|Path where artifacts are stored|
|**C:\TaskLogs**|Path where task logs are stored|
|**C:\Cache**|Path where cached files are stored|

## Upgrading

When the volumes are externally mounted to the host filesystem, upgrades between Octopus versions are much easier. We can picture the upgrade process with a container as being similar to [moving a standard Octopus Server](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-database-and-server.md) since containers, being immutable, don't themselves get updated.

Similar to moving an instance, to perform the container upgrade you will need the master key that was used to set up the original database. The master key for an Octopus Server in a container can be found by using the container exec command.

```
> docker container exec <container name/ID> 'C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe' show-master-key --console --instance OctopusServer

5qJcW9E6B99teMmrOzaYNA==
```

When you have the master key, you can stop the running Octopus Server container instance (delete it if you plan on using the same name), and run _almost_ the same command as before, but this time, pass in the master key as an environment variable and reference the new Octopus Server version. When this new container starts up, it will use the same credentials and detect that the database has already been set up and use the master key to access its sensitive values:

```PowerShell
docker run --interactive
           --detach `
           --name OctopusServer `
           --publish "1322:81" `
           --env DB_CONNECTION_STRING="..." `
           --volume "E:/Octopus/Logs:C:/TaskLogs" `
           --env MASTER_KEY=5qJcW9E6B99teMmrOzaYNA== `
           octopusdeploy/octopusdeploy:2019.13.4
```

While you don't strictly _need_ to mount the internal directory locations, it will mean that the newly upgraded server will still have access to all the same packages, logs, and artifacts as before. The standard backup and restore procedures for the [data stored on the filesystem](/docs/administration/data/backup-and-restore.md#octopus-file-storage) and the connected [SQL Server](/docs/administration/data/octopus-database/index.md) still apply as per normal Octopus installations.

## Learn more

 - [Docker blog posts](http://octopus.com/blog/tag/docker)
