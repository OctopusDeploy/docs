---
title: Deploying Octopus with Docker Compose
description: A fully self-contained SQL Server, Octopus Server and Octopus Tentacle can be provisioned through Docker Compose
position: 3
---

## Start Everything with Docker Compose
For evaluation purposes you may want to run a stand-alone SQL Server instance to run alongside the Octopus Server. For this scenario, you can leverage [Docker Compose](https://docs.docker.com/compose/overview/) to spin up and manage a multi-container Docker application as a single unit.

A simple example of a `docker-compose.yml` file combining a SQL Server instance along with a dependent Octopus Server looks as follows.

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

In this case we are specifying the `sa` password that is used when starting the sql container and is used for db connectivity from the Octopus Server. We have also provided the Octopus admin credentials and set a host port mapping to port `81` so that we can access the server externally.

Startup both containers by running:

```
docker-compose --poject-name Octopus up -d
```

Once both containers are healthy you can browse directly to `http://localhost:5441` from your host machine.

Upgrades with a Docker Compose project are similar to the steps with [upgrading a single Octopus Server container](octopus-server-container.md). You will still need to get the master key from the original Octopus Server container used when initially setting up the database. When you have the master key, a simple change to the `.env` file to include the master key and update the Octopus version is all that is required.

```
SA_PASSWORD=P@ssw0rd!
OCTOPUS_VERSION=2018.4.0
OCTOPUS_ADMIN_USERNAME=admin
OCTOPUS_ADMIN_PASSWORD=SecreTP@ass
OCTOPUS_MASTER_KEY=U9ZrQR98uLXyz4CXJzUuCA==
```

Run the same `docker-compose` command as provided above and Docker will detect that the changes only impact the the Octopus container. It will then stop and recreate only the Octopus Server, leaving the SQL Server running as-is. For further information about the additional configuration of the SQL Server container consult the appropriate [Docker Hub repository information](https://hub.docker.com/r/microsoft/mssql-server-windows-express/) pages. It is generally advised however, to not run SQL Server inside a container for production purposes.

### Octopus Server and Tentacle
For a complete environment of SQL Server, Octopus Server, and Octopus Tentacle, you can use the following sample `docker-compose.yml` file:

```yml
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
     - "81"
     - "10943"
    depends_on:
      db:
        condition: service_healthy
    stdin_open: true
    volumes:
      - "./Import:C:/Import"
  listeningtentacle:
    image: octopusdeploy/tentacle:${TENTACLE_VERSION}
    depends_on:
      octopus:
        condition: service_healthy
    environment:
      ServerUsername: "${OCTOPUS_ADMIN_USERNAME}"
      ServerPassword: "${OCTOPUS_ADMIN_PASSWORD}"
      TargetEnvironment: "Development"
      TargetRole: "app-server"
      ServerUrl: "http://octopus:81"
    stdin_open: true
    volumes:
      - "./ListeningApplications:C:/Applications"
  pollingtentacle:
    image: octopusdeploy/tentacle:${TENTACLE_VERSION}
    depends_on:
      octopus:
        condition: service_healthy
    environment:
      ServerUsername: "${OCTOPUS_ADMIN_USERNAME}"
      ServerPassword: "${OCTOPUS_ADMIN_PASSWORD}"
      TargetEnvironment: "Development"
      TargetRole: "web-server"
      ServerUrl: "http://octopus:81"
      ServerPort: "10943"
    stdin_open: true
    volumes:
      - "./PollingApplications:C:/Applications"
networks:
  default:
    external:
      name: nat
```

With the `TENTACLE_VERSION` environment variable added to the previous `.env` file:

```
SA_PASSWORD=P@ssw0rd!
OCTOPUS_VERSION=2018.3.13
TENTACLE_VERSION=3.19.2
OCTOPUS_ADMIN_USERNAME=admin
OCTOPUS_ADMIN_PASSWORD=Password01!
```

#### Import
Since the tentacle will perform a `register-with` command when it starts up, we need to ensure that our fresh new Octopus Server has an environment available to add the targets to. This is accomplished above by providing some files in the `./Import` directory. This folder contains files that are generated as part of an [Octopus.Migrator.exe export](docs/api-and-integration/octopus.migrator.exe-command-line/index.md) invocation performed against an existing installation. Currently the import process requires the export password to be `blank`. When the Octopus Server starts up in the container, this directory is inspected and [Octopus.Migrator.exe import](docs/api-and-integration/octopus.migrator.exe-command-line/migrator-import.md) is invoked if a `metadata.json` file is present.
