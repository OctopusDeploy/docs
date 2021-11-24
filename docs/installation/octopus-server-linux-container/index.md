---
title: Octopus Server in a Container
description: Running the Octopus Server in the official Docker container
position: 8
hideInThisSectionHeader: true
---

:::warning
The [Octopus Server Windows Container](/docs/installation/octopus-server-windows-container.md) is deprecated, and no longer maintained.
:::

This page describes how to run Octopus Server in a **Linux Container**, introduced in Octopus **2020.6**. 

Running the Octopus Server inside a container provides a simple way to set up an Octopus Deploy instance, and upgrading to the latest version of Octopus is just a matter of running a new container with the new image version.

**Note:** When using Linux containers on a Windows machine, please ensure you have [switched to Linux Containers](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers).

Although there are a few different configuration options, the following is a simple example of starting an Octopus Server container:

```Bash
$ docker run --interactive --detach --name OctopusDeploy --publish 1322:8080 --env ACCEPT_EULA="Y" --env DB_CONNECTION_STRING="..." !docker-image <octopusdeploy/octopusdeploy>
```

- We run in detached mode with `--detach` to allow the container to run in the background.
- The `--interactive` argument ensures that `STDIN` is kept open which is required since internally this is what the running `Octopus.Server.exe` process is waiting on to close.
- Setting `--name OctopusServer` gives us an easy to remember name for this container. This is optional, but we recommend you provide a name that is meaningful to you, as that will make it easier to perform actions on the container later if necessary.
- Using `--publish 1322:8080` maps the _container port_ `8080` to `1322` on the host so that the Octopus instance is accessible outside this sever.
- To set the connection string we provide an _environment variable_ `DB_CONNECTION_STRING` (this can be to a local database or an external database).

In this example, we are running the image `!docker-image <octopusdeploy/octopusdeploy>`. The tag maps directly to the Octopus Server version that is bundled inside the image.

## Configuration

:::hint
Support for authentication providers differs depending on how you host Octopus Server. Please see our [authentication provider compatibility section](/docs/security/authentication/auth-provider-compatibility.md) to ensure any existing authentication provider is supported when running Octopus in a Linux Container.
:::

When running an Octopus Server Image, the following values can be provided to configure the running Octopus Server instance.

### Master Key

If you do not specify a master key when Octopus is first run, Octopus will generate one for you, which you then must pass as the `MASTER_KEY` environment variable with each subsequent run. However, it is also possible to generate your own master key which is used by Octopus when configuring the database.

Master keys must be a 128 bit string that is then base 64 encoded. You can generate a random string to use as the master key with the command:

```
openssl rand 16 | base64
```

### Helm chart

Octopus can be installed into a Kubernetes cluster using a Helm chart.

Add the helm chart repository with the following commands:

```
helm repo add octopus https://octopus-helm-charts.s3.amazonaws.com
helm repo update
```

Then install the chart with the command:

```
helm upgrade --install octopus octopus/octopusdeploy --set octopus.acceptEula=Y --set mssql-linux.acceptEula.value=Y --set octopus.image=octopusdeploy/octopusdeploy --set octopus.masterKey=YOUR_GENERATED_KEY
```

The source code for the Helm chart can be found on [GitHub](https://github.com/OctopusSamples/OctopusHelmChart). The [values.yaml](https://github.com/OctopusSamples/OctopusHelmChart/blob/master/values.yaml) contains comments describing the options available.

For more information on how the helm chart works, especially with regards to high availability deployments, see the blog post [Introducing the Octopus Server Linux Docker image](https://octopus.com/blog/introducing-linux-docker-image).

### Service Definition with systemd

You can use systemd to boot the Octopus Docker container each time the OS starts. To do this, create a file called `/etc/systemd/system/docker-octopusdeploy.service` with the following contents:

:::hint
Be sure to change the `ADMIN_PASSWORD` and `MASTER_KEY` from the defaults shown here.
:::

```
[Unit]
Description=Daemon for octopusdeploy
After=docker-mssql.service docker.service
Wants=
Requires=docker-mssql.service docker.service
StartLimitIntervalSec=20
StartLimitBurst=3

[Service]
Restart=on-failure
TimeoutStartSec=0
RestartSec=5
Environment="HOME=/root"
SyslogIdentifier=docker-octopusdeploy
ExecStartPre=-/usr/bin/docker create --net octopus -m 0b -e "ADMIN_USERNAME=admin" -e "ADMIN_EMAIL=example@example.org" -e "ADMIN_PASSWORD=Password01!" -e "ACCEPT_EULA=Y" -e "DB_CONNECTION_STRING=Server=mssql,1433;Database=Octopus;User Id=SA;Password=Password01!;ConnectRetryCount=6" -e "MASTER_KEY=6EdU6IWsCtMEwk0kPKflQQ==" -e "DISABLE_DIND=Y" -p 80:8080 -p 10943:10943 --restart=always --name octopusdeploy octopusdeploy/octopusdeploy
ExecStart=/usr/bin/docker start -a octopusdeploy
ExecStop=-/usr/bin/docker stop --time=0 octopusdeploy

[Install]
WantedBy=multi-user.target
```

Note that we assume a Docker bridge network called `octopus` exists. This can be created with the command:

```
docker network create -d bridge octopus
```

The Octopus service also relies on a MS SQL service define in the file `/etc/systemd/system/docker-mssql.service` with the following contents:

```
[Unit]
Description=Daemon for mssql
After=docker.service
Wants=
Requires=docker.service
StartLimitIntervalSec=20
StartLimitBurst=3

[Service]
Restart=on-failure
TimeoutStartSec=0
RestartSec=5
Environment="HOME=/root"
SyslogIdentifier=docker-mssql
ExecStartPre=-/usr/bin/docker create --net octopus -m 0b -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Password01!" -e "MSSQL_PID=Express" -e "MSSQL_MEMORY_LIMIT_MB=2048" -p 1433:1433 --restart=always --name mssql mcr.microsoft.com/mssql/server:2019-latest
ExecStart=/usr/bin/docker start -a mssql
ExecStop=-/usr/bin/docker stop --time=0 mssql

[Install]
WantedBy=multi-user.target
```

To load the new service files, run:

```
systemctl daemon-reload
```

Then start the services with the commands:

```
systemctl start docker-mssql
systemctl start docker-octopusdeploy
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
|**DISABLE_DIND**|The Linux image will by default attempt to run Docker-in-Docker to support [worker execution containers](/docs/projects/steps/execution-containers-for-workers/index.md). This requires the image be launched with [privileged permissions](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities). Setting `DISABLE_DIND` to `Y` prevents Docker-in-Docker from being run when the container is booted.|

### Exposed Container Ports
Read Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose) about exposing ports.

|  Port       |    |
| ------------- | ------- |
|**8080**| Port for API and HTTP portal |
|**443**| SSL Port for API and HTTP portal |
|**10943**|Port for Polling Tentacles to contact the server|

### Volume Mounts

Read the Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only) about mounting volume.

|  Name       |    |
| ------------- | ------- |
|**/import**|Imports from this folder if [Octopus Migrator](/docs/octopus-rest-api/octopus.migrator.exe-command-line/index.md) metadata.json exists then migrator `Import` takes place on startup|
|**/repository**|Package path for the built-in package repository|
|**/artifacts**|Path where artifacts are stored|
|**/taskLogs**|Path where task logs are stored|
|**/cache**|Path where cached files are stored|

## Upgrading

When the volumes are externally mounted to the host filesystem, upgrades between Octopus versions are much easier. We can picture the upgrade process with a container as being similar to [moving a standard Octopus Server](/docs/administration/managing-infrastructure/moving-your-octopus/move-the-database-and-server.md) since containers, being immutable, don't themselves get updated.

Similar to moving an instance, to perform the container upgrade you will need the Master Key that was used to set up the original database. The Master Key for an Octopus Server in a container can be found by using the container exec command:

```
> docker container exec <container name/ID> /Octopus/Octopus.Server show-master-key --console --instance OctopusServer

5qJcW9E6B99teMmrOzaYNA==
```

When you have the Master Key, you can stop the running Octopus Server container instance (delete it if you plan on using the same name), and run _almost_ the same command as before, but this time, pass in the Master Key as an environment variable and reference the new Octopus Server version. When this new container starts up, it will use the same credentials and detect that the database has already been set up and use the Master Key to access its sensitive values:

```bash
$ docker run --interactive --detach --name OctopusServer --publish 1322:8080 --env DB_CONNECTION_STRING="..." --env MASTER_KEY "5qJcW9E6B99teMmrOzaYNA==" !docker-image <octopusdeploy/octopusdeploy>
```

The standard backup and restore procedures for the [data stored on the filesystem](/docs/administration/data/backup-and-restore.md#octopus-file-storage) and the connected [SQL Server](/docs/administration/data/octopus-database/index.md) still apply as per normal Octopus installations.

## Learn more

 - [Docker blog posts](http://octopus.com/blog/tag/docker)
 - [Linux blog posts](https://octopus.com/blog/tag/linux)
 - [Introducing the Octopus Server Linux Docker image](https://octopus.com/blog/introducing-linux-docker-image)
 - [Octopus Deploy on Docker Hub](https://hub.docker.com/r/octopusdeploy/octopusdeploy)
 - [Octopus Tentacle on Docker Hub](https://hub.docker.com/r/octopusdeploy/tentacle/)
