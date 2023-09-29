---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Octopus Server Container with Docker Compose
description: A fully self-contained SQL Server and Octopus Server provisioned as Linux containers using Docker Compose.
navOrder: 10
---

For evaluation purposes you may want to run a stand-alone SQL Server instance alongside the Octopus Server. For this scenario, you can leverage [Docker Compose](https://docs.docker.com/compose/overview/) to spin up and manage a multi-container Docker application as a single unit.

The following example is a simple `docker-compose.yml` file combining a SQL Server instance with a dependent Octopus Server:

```yaml
version: '3'
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
    volumes:
      - sqlvolume:/var/opt/mssql
   octopus-server:
    image: octopusdeploy/octopusdeploy:${OCTOPUS_SERVER_TAG}
    privileged: ${PRIVILEGED}
    user: ${CONTAINER_USER}
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
      DISABLE_DIND: ${DISABLE_DIND}
    ports:
      - 8080:8080
      - 11111:10943
    depends_on:
      - db
    volumes:
      - repository:/repository
      - artifacts:/artifacts
      - taskLogs:/taskLogs
      - cache:/cache
      - import:/import
      - eventExports:/eventExports
volumes:
  repository:
  artifacts:
  taskLogs:
  cache:
  import:
  eventExports:
  sqlvolume:
```

We will provide some of the environment variables to run this container with an additional `.env` file:

```
# Define the password for the SQL database. This also must be set in the DB_CONNECTION_STRING value.
SA_PASSWORD=

# Tag for the Octopus Deploy Server image. Use "latest" to pull the latest image or specify a specific tag
OCTOPUS_SERVER_TAG=latest

# Sql Server image. Set this variable to the version you wish to use. Default is to use the latest.
SQL_IMAGE=mcr.microsoft.com/mssql/server

# The default created user username for login to the Octopus Server
ADMIN_USERNAME=

# It is highly recommended this value is changed as it's the default user password for login to the Octopus Server
ADMIN_PASSWORD=

# Email associated with the default created user. If empty will default to octopus@example.local
ADMIN_EMAIL=

# Accept the Microsoft Sql Server Eula found here: https://go.microsoft.com/fwlink/?linkid=857698
ACCEPT_EULA=Y

# Use of this Image means you must accept the Octopus Deploy Eula found here: https://octopus.com/company/legal
ACCEPT_OCTOPUS_EULA=Y

# Unique Server Node Name - If left empty will default to the machine Name
OCTOPUS_SERVER_NODE_NAME=

# Database Connection String. If using database in sql server container, it is highly recommended to change the password.
DB_CONNECTION_STRING=Server=db,1433;Database=OctopusDeploy;User=sa;Password=THE_SA_PASSWORD_DEFINED_ABOVE

# Your License key for Octopus Deploy. If left empty, it will try and create a free license key for you
OCTOPUS_SERVER_BASE64_LICENSE=

# Octopus Deploy uses a master key for encryption of your database. If you're using an external database that's already been setup for Octopus Deploy, 
# you can supply the master key to use it. 
# If left blank, a new master key will be generated with the database creation.
# Create a new master key with the command: openssl rand 16 | base64
MASTER_KEY=

# The API Key to set for the administrator. If this is set and no password is provided then a service account user will be created. 
# If this is set and a password is also set then a standard user will be created.
#
ADMIN_API_KEY=

# Docker-In-Docker is used to support worker container images. It can be disabled by setting DISABLE_DIND to Y.
# The container only requires the privileged setting if DISABLE_DIND is set to N.
DISABLE_DIND=Y
PRIVILEGED=false

# Octopus can be run either as the user root or as octopus.
CONTAINER_USER=octopus
```

You will have to supply your own values for `SA_PASSWORD`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`. 

It is also highly recommended that you create a new master key with the command `openssl rand 16 | base64` and supply it through the `MASTER_KEY` property before you boot Octopus for the first time. If a master key is not supplied, Octopus will generate one, and the generated value must be saved in the `MASTER_KEY` property when the Octopus container is restarted.

Start both containers by running:

```
docker-compose --project-name Octopus up -d
```

When both containers are healthy, you can browse directly to `http://localhost:8080` from your host machine.

## Trusting custom/internal Certificate Authority (CA)

Octopus Server can interface with several external sources (feeds, git repos, etc.), and those sources are often configured to use SSL/TLS for secure communication.  It is common for organizations to have their own Certificate Authority (CA) servers for their internal networks.  A CA server can issue SSL certificates for internal resources, such as build servers or internally hosted applications, without purchasing from a third-party vendor.  Technologies such as Group Policy Objects (GPO) can configure machines (servers and clients) to trust the CA automatically, so users don't have to configure trust for them manually. However, this is not inherited in containers.  When attempting to configure a connection to an external resource with an untrusted CA, you'll most likely encounter an error similar to this:

```
Could not connect to the package feed. The SSL connection could not be established, see inner exception. The remote certificate is invalid because of errors in the certificate chain: UntrustedRoot
```
 
The recommended approach is to add the certificate to the Docker host, such as `/etc/ssl/certs`, and mount a volume to it inside the container.  To do this, add a `volumes` section to  the `octopus-server` container just after the `image` component

```yaml
  octopus-server:
    container_name: octopus-server
    image: octopusdeploy/octopusdeploy
    volumes:
      - /etc/ssl/certs:/etc/ssl/certs
```

## Upgrade with Docker Compose

If you have used the default image tag of `latest`, you can run `docker-compose pull` to download the most recent version of the image. Alternatively you can specify a fixed image tag via the `OCTOPUS_SERVER_TAG` property, and update the value as new images are released.

The new Octopus container will mount the files persisted in the Docker volumes, and update the database as needed.

For further information about the additional configuration of the SQL Server container consult the appropriate [Docker Hub repository information](https://hub.docker.com/_/microsoft-mssql-server) pages. It is generally advised, however, not to run SQL Server inside a container for production purposes.

## Learn more

 - [Docker blog posts](http://octopus.com/blog/tag/docker)
 - [Linux blog posts](https://octopus.com/blog/tag/linux)
