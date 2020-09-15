---
title: Octopus Linux Container with Docker Compose
description: A fully self-contained SQL Server and Octopus Server
position: 3
---

If you want to run an Octopus Deploy Windows container or a Tentacle Windows Container, please refer to the [Docker Compose Windows](/docs/installation/octopus-in-container/docker-compose-windows.md) documentation.

For evaluation purposes you may want to run a stand-alone SQL Server instance alongside the Octopus Server. For this scenario, you can leverage [Docker Compose](https://docs.docker.com/compose/overview/) to spin up and manage a multi-container Docker application as a single unit.

The following example is a simple `docker-compose.yml` file combining a SQL Server instance with a dependent Octopus Server:

```YAML
version: '2.1'
services:
   db:
    image: ${SQL_IMAGE}
    environment:
      SA_PASSWORD: ${SA_PASSWORD}
      ACCEPT_EULA: ${ACCEPT_EULA}
    ports:
      - 1401:1433
    healthcheck:
      test: [ "CMD", "/opt/mssql-tools/bin/sqlcmd", "-U", "sa", "-P", "${SA_PASSWORD}", "-Q", "select 1"]
      interval: 10s
      retries: 10
   octopus-server:
    image: octopusdeploy/octopusdeploy${OCTOPUS_SERVER_REPO_SUFFIX}:${OCTOPUS_SERVER_TAG}
    environment:
      ACCEPT_EULA: ${ACCEPT_OCTOPUS_EULA}
      OCTOPUS_SERVER_NODE_NAME: ${OCTOPUS_SERVER_NODE_NAME}
      DB_CONNECTION_STRING: ${DB_CONNECTION_STRING}
      ADMIN_USERNAME: ${ADMIN_USERNAME}
      ADMIN_PASSWORD: ${ADMIN_PASSWORD}
      ADMIN_EMAIL: ${ADMIN_EMAIL}
      OCTOPUS_SERVER_BASE64_LICENSE: ${OCTOPUS_SERVER_BASE64_LICENSE}
      MASTER_KEY: ${MASTER_KEY}
      ADMIN_API_KEY: ${ADMIN_API_KEY}
    ports:
      - 80:8080
    depends_on:
      db:
        condition: service_healthy
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
OCTOPUS_SERVER_TAG=latest

# Sql Server image. Set this variable to the version you wish to use. Default is to use the latest.
SQL_IMAGE=mcr.microsoft.com/mssql/server

# The default created user username for login to the Octopus Server
ADMIN_USERNAME=admin

# It is highly recommended this value is changed as it's the default user password for login to the Octopus Server
ADMIN_PASSWORD=Passw0rd123

# Email associated with the default created user. If empty will default to octopus@example.local
ADMIN_EMAIL=

# Accept the Microsoft Sql Server Eula found here: https://hub.docker.com/r/microsoft/mssql-server-windows-express/
ACCEPT_EULA=N

# Use of this Image means you must accept the Octopus Deploy Eula found here: https://octopus.com/company/legal
ACCEPT_OCTOPUS_EULA=N

# Unique Server Node Name - If left empty will default to the machine Name
OCTOPUS_SERVER_NODE_NAME=

# Database Connection String. If using database in sql server container, it is highly recommended to change the password.
DB_CONNECTION_STRING=Server=db,1433;Database=OctopusDeploy;User=sa;Password=N0tS3cr3t!

# Your License key for Octopus Deploy. If left empty, it will try and create a free license key for you
OCTOPUS_SERVER_BASE64_LICENSE=

# Octopus Deploy uses a Master Key for encryption of your databse. If you're using an external database that's already been setup for Octopus Deploy, you can supply the Master Key to use it. If left blank, a new Master Key will be generated with the database creation.
MASTER_KEY=

# The API Key to set for the administrator. If this is set and no password is provided then a service account user will be created. If this is set and a password is also set then a standard user will be created.
ADMIN_API_KEY=
```


In this case, we are specifying the `sa` password that is used when starting the SQL container and for db connectivity from the Octopus Server. We have also provided the Octopus admin credentials and set a host port mapping to port `8080` so we can access the server externally.

Start both containers by running:

```
docker-compose --project-name Octopus up -d
```

When both containers are healthy, you can browse directly to `http://localhost` from your host machine.

## Upgrade with Docker Compose

Upgrades with a Docker Compose project are similar to the steps to [upgrade a single Octopus Server container](/docs/installation/octopus-in-container/octopus-server-container-linux.md). You will still need the Master Key from the original Octopus Server container you used when initially setting up the database. When you have the Master Key, a simple change to the `.env` file to include the Master Key and update the Octopus version is all that is required:

```
SA_PASSWORD=N0tS3cr3t!
OCTOPUS_SERVER_TAG=latest
SQL_IMAGE=mcr.microsoft.com/mssql/server
ADMIN_USERNAME=admin
ACCEPT_EULA=N
ACCEPT_OCTOPUS_EULA=N
DB_CONNECTION_STRING=Server=db,1433;Database=OctopusDeploy;User=sa;Password=N0tS3cr3t!
MASTER_KEY=U9ZrQR98uLXyz4CXJzUuCA==
```

Run the same `docker-compose` command as provided above, and Docker will detect that the changes only impact the the Octopus container. It will then stop and recreate only the Octopus Server, leaving the SQL Server running as-is. For further information about the additional configuration of the SQL Server container consult the appropriate [Docker Hub repository information](https://hub.docker.com/r/microsoft/mssql-server-windows-express/) pages. It is generally advised, however, not to run SQL Server inside a container for production purposes.

## Learn more

 - [Docker blog posts](http://octopus.com/blog/tag/docker)
 - [Linux blog posts](https://octopus.com/blog/tag/linux)
