---
title: Octopus as a Container
description: Running the Octopus Server or Tentacle from inside the official Docker container
position: 8
---

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
