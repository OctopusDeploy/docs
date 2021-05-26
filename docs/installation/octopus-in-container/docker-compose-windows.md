---
title: Octopus Windows Container with Docker Compose
description: A fully self-contained SQL Server, Octopus Server and Octopus Tentacle can be provisioned through Docker Compose
position: 3
---

:::warning
The Octopus Deploy Server Windows containers are deprecated, and no longer maintained.
For hosting Octopus Server in a container, we recommend using the [Octopus Server Linux Container](/docs/installation/octopus-in-container/docker-compose-linux.md).
:::

For evaluation purposes you may want to run a stand-alone SQL Server instance to run alongside the Octopus Server. For this scenario, you can leverage [Docker Compose](https://docs.docker.com/compose/overview/) to spin up and manage a multi-container Docker application as a single unit.

The following example is a simple `docker-compose.yml` file combining a SQL Server instance with a dependent Octopus Server:

```YAML
version: '2.1'
services:
  db:
    image: microsoft/mssql-server-windows-express
    environment:
      sa_password: "${SA_PASSWORD}"
      ACCEPT_EULA: "${SQL_SERVER_ACCEPT_EULA}"
    healthcheck:
      test: [ "CMD", "sqlcmd", "-U", "sa", "-P", "${SA_PASSWORD}", "-Q", "select 1" ]
      interval: 10s
      retries: 10
  octopus:
    image: octopusdeploy/octopusdeploy:${OCTOPUS_VERSION}
    environment:
      ADMIN_USERNAME: "${OCTOPUS_ADMIN_USERNAME}"
      ADMIN_PASSWORD: "${OCTOPUS_ADMIN_PASSWORD}"
      DB_CONNECTION_STRING: "${DB_CONNECTION_STRING}"
      ACCEPT_EULA: "${OCTOPUS_ACCEPT_EULA}"
      ADMIN_EMAIL: "${ADMIN_EMAIL}"
    ports:
     - "1322:8080"
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

We will provide some of the environment variables to run this container with an additional `.env` file:

```
# It is highly recommended this value is changed as it's the password used for the database user.
SA_PASSWORD=N0tS3cr3t!

# Tag for the Octopus Server image. Use "latest" to pull the latest image or specify a specific tag
OCTOPUS_VERSION=2019.13.4

DB_CONNECTION_STRING=Server=db,1433;Initial Catalog=Octopus;Persist Security Info=False;User ID=sa;Password=N0tS3cr3t!;MultipleActiveResultSets=False;Connection Timeout=30;

# The default created user username for login to the Octopus Server
OCTOPUS_ADMIN_USERNAME=admin

# It is highly recommended this value is changed as it's the default user password for login to the Octopus Server
OCTOPUS_ADMIN_PASSWORD=Passw0rd123

# Email associated with the default created user. If empty will default to octopus@example.local
ADMIN_EMAIL=

# Use of this Image means you must accept the Octopus Deploy Eula found here: https://octopus.com/company/legal
OCTOPUS_ACCEPT_EULA=N

# Use of the SQL Server docker image means you accept the Microsoft SQL Server Eula found here: https://hub.docker.com/r/microsoft/mssql-server-windows-express/
SQL_SERVER_ACCEPT_EULA=N
```

In this case, we are specifying the `sa` password that is used when starting the sql container and is used for db connectivity from the Octopus Server. We have also provided the Octopus admin credentials and set a host port mapping to port `81` so that we can access the server externally.

Start both containers by running:

```
docker-compose --project-name Octopus up -d
```

When both containers are healthy, you can browse directly to `http://localhost:5441` from your host machine.

## Upgrade with Docker Compose

Upgrades with a Docker Compose project are similar to the steps to [upgrade a single Octopus Server container](octopus-server-container-windows.md). You will still need to get the Master Key from the original Octopus Server container you used when initially setting up the database. When you have the Master Key, a simple change to the `.env` file to include the Master Key and update the Octopus version is all that is required:

```
SA_PASSWORD=N0tS3cr3t!
OCTOPUS_ACCEPT_EULA=N
OCTOPUS_SERVER_TAG=2019.13.4
DB_CONNECTION_STRING=Server=db,1433;Initial Catalog=Octopus;Persist Security Info=False;User ID=sa;Password=N0tS3cr3t!;MultipleActiveResultSets=False;Connection Timeout=30;
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Passw0rd123
MASTER_KEY=U9ZrQR98uLXyz4CXJzUuCA==
```

Run the same `docker-compose` command as provided above and Docker will detect that the changes only impact the Octopus container. It will then stop and recreate only the Octopus Server, leaving the SQL Server running as-is. For further information about the additional configuration of the SQL Server container consult the appropriate [Docker Hub repository information](https://hub.docker.com/r/microsoft/mssql-server-windows-express/) pages. It is generally advised, however, to not run SQL Server inside a container for production purposes.

## Octopus Server and Tentacle

For a complete environment of SQL Server, Octopus Server, and Octopus Tentacle, you can use the following sample `docker-compose.yml` file:

```yml
version: '2.1'
services:
  db:
    image: microsoft/mssql-server-windows-express
    environment:
      sa_password: "${SA_PASSWORD}"
      ACCEPT_EULA: "${SQL_SERVER_ACCEPT_EULA}"
    healthcheck:
      test: [ "CMD", "sqlcmd", "-U", "sa", "-P", "${SA_PASSWORD}", "-Q", "select 1" ]
      interval: 10s
      retries: 10
  octopus:
    image: octopusdeploy/octopusdeploy:${OCTOPUS_VERSION}
    environment:
      ADMIN_USERNAME: "${ADMIN_USERNAME}"
      ADMIN_PASSWORD: "${ADMIN_PASSWORD}"
      DB_CONNECTION_STRING: "${DB_CONNECTION_STRING}"
      ACCEPT_EULA: "${OCTOPUS_ACCEPT_EULA}"
      ADMIN_EMAIL: "${ADMIN_EMAIL}"
    ports: 
      - "1322":"8080"
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
      ServerUsername: "${ADMIN_USERNAME}"
      ServerPassword: "${ADMIN_PASSWORD}"
      TargetEnvironment: "Development"
      TargetRole: "app-server"
      ServerUrl: "http://octopus:1322"
    stdin_open: true
    volumes:
      - "./ListeningApplications:C:/Applications"
  pollingtentacle:
    image: octopusdeploy/tentacle:${TENTACLE_VERSION}
    depends_on:
      octopus:
        condition: service_healthy
    environment:
      ServerUsername: "${ADMIN_USERNAME}"
      ServerPassword: "${ADMIN_PASSWORD}"
      TargetEnvironment: "Development"
      TargetRole: "web-server"
      ServerUrl: "http://octopus:1322"
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
SA_PASSWORD=N0tS3cr3t!
OCTOPUS_VERSION=2019.13.4
DB_CONNECTION_STRING=Server=db,1433;Initial Catalog=Octopus;Persist Security Info=False;User ID=sa;Password=N0tS3cr3t!;MultipleActiveResultSets=False;Connection Timeout=30;
TENTACLE_VERSION=5.0.12
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Passw0rd123
ADMIN_EMAIL=
OCTOPUS_ACCEPT_EULA=N
SQL_SERVER_ACCEPT_EULA=N
```

### Import
Since the Tentacle will perform a `register-with` command when it starts, we need to ensure that our fresh new Octopus Server has an environment available to add the targets to. This is accomplished above by providing some files in the `./Import` directory. This folder contains files that are generated as part of an [Octopus.Migrator.exe export](docs/octopus-rest-api/octopus.migrator.exe-command-line/index.md) invocation performed against an existing installation. Currently the import process requires the export password to be `blank`. When the Octopus Server starts in the container, this directory is inspected and [Octopus.Migrator.exe import](docs/octopus-rest-api/octopus.migrator.exe-command-line/import.md) is invoked if a `metadata.json` file is present.

## Learn more

 - [Docker blog posts](http://octopus.com/blog/tag/docker)
