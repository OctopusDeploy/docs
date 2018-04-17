---
title: Octopus as a Container
description: Running the Octopus Server or Tentacle from inside the official Docker container
position: 8
---

Octopus Server and Octopus Tentacle Docker containers are published and made available for each release. Running Octopus from inside a container allows you to avoid installing Octopus directly on top of your infrastructure and makes getting up and running with Octopus as simple as a one line command.

:::info

Both of the following containers are built on top of the `microsoft/windowsservercore:latest` base image so at the time of writing they will only run on Windows where the [Windows Containers](https://docs.microsoft.com/en-us/virtualization/windowscontainers/about/) feature has been enabled. The images are available from [DockerHub](https://hub.docker.com/r/octopusdeploy/) and the DockerFiles can be accessed via the open source [Octopus-Docker GitHub repository](https://github.com/OctopusDeploy/Octopus-Docker).

:::

This documentation wont be doing into all the details about using Docker and running containers and assumes some minimum level of knowledge on these topics.

## Octopus Server
Running the Octopus Server inside a container provides a simple way to set up an Octopus Deploy instance. Upgrades becomes just a matter of running a new container with the new image version.

Although there are a few different configuration options, a simple example of starting up an Octopus Server container is as follows:

```shell
docker run -i -d --name OctopusServer -p "1322:81" -e sqlDbConnectionString="Server=172.23.192.1,1433;Initial Catalog=Octopus;Persist Security Info=False;User ID=sa;Password=P@ssw0rd;MultipleActiveResultSets=False;Connection Timeout=30;" -v "C:/Octopus/Logs:C:/TaskLogs" octopusdeploy/octopusdeploy:2018.3.13
```

We run in detached mode with `-d` to allow the container to run in the background.

The `-i` argument ensures that `STDIN` is kept open which is required since internally this is what the running `Octopus.Server.exe` process is waiting on to close.

Setting `--name OctopusServer` just gives us an easy to remember name for this container for if we want to perform some action on the container later. This is optional, but we recommend you provide a name that is meaningful to you.

Using `-p "1322:81"` we are mapping the _container port_ `81` to `1322` on the host so that the Octopus instance is accessible outside this sever.

To set the connection string we provide an _environment variable_ `sqlDbConnectionString` (in this case to a local SQL server).

In this case we are running the image `octopusdeploy/octopusdeploy:2018.3.13`. The tag maps directly to the Octopus Server version that is bundled in the image.

### Configuration
When running an Octopus Server Image, the following values can be provided to configure the running Octopus Server instance.

#### Environment Variables
Read Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file) about setting environment variables.
|||
|---| --- |
|**SqlDbConnectionString**|Connection string to the database to use|
|**masterKey**|The master key to use to connect to an existing database. If not supplied, and the database does not exist, it will generate a new one. If the database does exist, this is mandatory|
|**OctopusAdminUsername**|The admin user to create for the Octopus Server|
|**OctopusAdminPassword**|The password for the admin user for the Octopus Server|

#### Exposed Ports
Read Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose) about exposing ports.
|||
|--|--|
|**81**|Port for API and HTTP portal |
|**10943**|Port for Polling Tentacles to contact the server|

_The Octopus Server container does not currently support HTTPS however this should be available sometime soon_

#### Volume Mounts
Read Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only) about mounting volume.
|||
|--|--|
|**C:\Import**|Imports from this folder if [Octopus Migrator](/docs/api-and-integration/octopus.migrator.exe-command-line/index.md) metadata.json exists then migrator `Import` takes place on startup|
|**C:\Repository**|Package path for the built-in package repository|
|**C:\Artifacts**|Path where artifacts are stored|
|**C:\TaskLogs**|Path where task logs are stored|

### Upgrading
When the volume are externally mounted to the host filesystem, upgrades between Octopus versions become a breeze. We can picture the upgrade process with a container as being similar to [moving a standard Octopus Server](/docs/administration/moving-your-octopus/move-the-database-and-server.md) since containers, being immutable, don't themselves get updated.

Similar to when moving an instance, to perform the container upgrade you will need the master key that was used to set up the original database. The master-key for for an Octopus Server in a container can be found by consulting its logs. When the initial configuration takes place, the same [`show-master-key`](/docs/api-and-integration/octopus.server.exe-command-line/show-master-key.md) command is invoked that you could otherwise do with a standard installation.

e.g
```
> docker logs 2fdf54eab150

...
VERBOSE: [2018-04-16T02:21:21] Display master key ...
VERBOSE: [2018-04-16T02:21:21] Executing command 'C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe show-master-key --console --instance OctopusServer'
VERBOSE: 
VERBOSE:  | 5qJcW9E6B99teMmrOzaYNA==
VERBOSE: 
VERBOSE: [2018-04-16T02:21:26] done.
...
```

With the master key in hand, you can stop the running Octopus Server container instance (delete if if you plan on using the same name), and run _almost_ the same command as before, but passing in the master key as an environment variable and referencing the new Octopus Server version. When this new container starts up, it will use the same credentials to and detect that the database has already been set up and use the master key to access its sensitive values.

```shell
docker run -i  --name OctopusServer -d -p "1322:81" -e masterKey=5qJcW9E6B99teMmrOzaYNA== -e sqlDbConnectionString="Server=172.23.192.1,1433;Initial Catalog=Octopus;Persist Security Info=False;User ID=sa;Password=P@ssw0rd;MultipleActiveResultSets=False;Connection Timeout=30;" -v "C:/Octopus/Logs:C:/TaskLogs" octopusdeploy/octopusdeploy:2018.4.0
```

While you dont strictly _need_ to mount the internal directory locations to somewhere on the host, it will mean that the newly upgraded server has access to all the same packages, logs and artifacts as before. The standard backup and restore procedures for this [data stored on the filesystem](/docs/administration/backup-and-restore.md#octopus-file-storage) and the connected [SQL Server](/docs/administration/octopus-database/index.md) still apply as per normal Octopus installations.

## Octopus Tentacle
Running a Tentacle inside a container may be a preferable approach for some environments where installing one directly on the host is not an option. Keep in mind that because the Tentacle will be running _inside a container_, script execution wont be happening on the host itself and so Octopus Tentacles inside a container may not be appropriate for many deployment tasks. The currently available Octopus Tentacle Docker container is available to be run in either [polling](docs/infrastructure/windows-targets/polling-tentacles/index.md) or [listening](/docs/infrastructure/windows-targets/listening-tentacles/index.md) mode.

When an Octopus Tentacle container starts up, it will attempt to invoke the [`register-with`](/docs/api-and-integration/tentacle.exe-command-line/register-with.md) command to connect and add itself as a machine to that server with the provided roles and environments. Note that due to some limitations in Windows Containers that have only recently been fixed and made available in the 1709 Windows release, this registration will occur on every startup and you may end up with multiple instances if you stop/start a container. Our goal is to update this image to de-register the Tentacle when the container `SIGKILL` signal is passed in.

```
docker run --name OctopusTentacle -p 10931:10933 -i --env "ListeningPort=10931" --env "ServerApiKey=API-MZKUUUMK3EYX7TBJP6FAKIFHIEO" --env "TargetEnvironment=Development" --env "TargetRole=container-server" --env "ServerUrl=http://172.23.191.1:8065" octopusdeploy/tentacle:3.19.2
```

### Configuration
When running an Octopus Tentacle Image, the following values can be provided to configure the running Octopus Tentacle instance.

#### Environment Variables
Read Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file) about setting environment variables.
|||
|---| --- |
|**ServerApiKey**|The API Key of the Octopus Server the Tentacle should register with|
|**ServerUsername**|If not using an api key, the user to use when registering the Tentacle with the Octopus Server|
|**ServerPassword**|If not using an api key, the password to use when registering the Tentacle|
|**ServerUrl**|The Url of the Octopus Server the Tentacle should register with|
|**TargetEnvironment**|Comma delimited list of environments to add this target to|
|**TargetRole**|Comma delimited list of roles to add to this target|
|**TargetName**|Optional Target name, defaults to host|
|**ServerPort**|The port on the Octopus Server that the Tentacle will poll for work. Implies a polling Tentacle|
|**ListeningPort**|The port that the Octopus Server will connect back to the Tentacle with. Defaults to `10933`. Implies a listening Tentacle|
|**PublicHostNameConfiguration**|How the url that the Octopus server will use to communicate with the Tentacle is determined. Can be `PublicIp`, `FQDN`, `ComputerName` or `Custom`. Defaults to `PublicIp`|
|**CustomPublicHostName**|If PublicHostNameConfiguration is set to `Custom`, the host name that the Octopus Server should use to communicate with the Tentacle|

#### Exposed Ports
Read Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose) about exposing ports.
|||
|--|--|
|**10933**|Port tentacle will be listening on (if in listening mode)|

_The Octopus Server container does not currently support HTTPS however this should be available sometime soon_

#### Volume Mounts
Read Docker [docs](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only) about mounting volume.
|||
|--|--|
|**C:\Applications**|Default directory to deploy applications to|

## Start everything with Docker Compose
For evaluation purposes you may want to run a stand-alone sql instance to run alongside the Octopus Server (it is generally discouraged to run a production database server inside a container). For this scenario you can leverage [Docker Compose](https://docs.docker.com/compose/overview/) to spin up and manage a multi-container Docker application as a single unit.

A simple example of a `docker-compose.yml` file combining a SQL Server instance along with a dependant Octopus Server looks as follows.

```YAML
version: '2.1'
services:
  db:
    image: microsoft/mssql-server-windows-express
    environment:
      sa_password: "${SA_PASSWORD}"
      ACCEPT_EULA: "Y"
    healthcheck:
      test: [ "CMD", "sqlcmd", "-U", "sa", "-P", "${SA_PASSWORD}", "-Q", "select 1" ]
      interval: 10s
      retries: 10
  octopus:
    image: octopusdeploy/octopusdeploy:${OCTOPUS_VERSION}
    environment:
      OctopusAdminUsername: "${OCTOPUS_ADMIN_USERNAME}"
      OctopusAdminPassword: "${OCTOPUS_ADMIN_PASSWORD}"
      sqlDbConnectionString: "Server=db,1433;Initial Catalog=Octopus;Persist Security Info=False;User ID=sa;Password=${SA_PASSWORD};MultipleActiveResultSets=False;Connection Timeout=30;"
    ports:
     - "5441:81"
    depends_on:
      db:
        condition: service_healthy
    stdin_open: true
    volumes:
      - "./Repository:C:/Repository"
      - "./TaskLogs:C:/TaskLogs"
networks:
  default:
    external:
      name: nat
```

We will provide some of the environment variables to run this container with an additional `.env` file.

```
SA_PASSWORD=P@ssw0rd!
OCTOPUS_VERSION=2018.3.13
OCTOPUS_ADMIN_USERNAME=admin
OCTOPUS_ADMIN_PASSWORD=SecreTP@ass
```

In this case we will specify the `sa` password that is used when starting the sql container and for db connectivity from the Octopus Server. We have also  provided the Octopus admin credentials and set a host port mapping to port `81` so that we can access the server externally.

Start both containers at once by running
```
docker-compose --poject-name Octopus up -d
```

Once both containers are healthy you can brows directly to `http://localhost:5441` from your host machine.

Upgrades with a Docker Compose project as similar to the steps with upgrading a single container above. You will still need to get the master-key from the original Octopus Server container used when initially setting up the database. With a simple change to the `.env` file to include the master-key and update the Octopus version...

```
SA_PASSWORD=P@ssw0rd!
OCTOPUS_VERSION=2018.4.0
OCTOPUS_ADMIN_USERNAME=admin
OCTOPUS_ADMIN_PASSWORD=SecreTP@ass
OCTOPUS_MASTER_KEY=U9ZrQR98uLXyz4CXJzUuCA==
```

... run the same `docker-compose` command above and Docker will detect the changes only impact the the Octopus container. It will then only stop and recreated the Octopus Server, leaving the SQL Server running as in place. For further information about the additional configuration of the SQL Server container consult the appropriate [Docker Hub repository information](https://hub.docker.com/r/microsoft/mssql-server-windows-express/) pages.