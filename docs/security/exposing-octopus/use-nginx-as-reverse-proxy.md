---
title: Use NGINX as a reverse proxy for Octopus Deploy
description: How to set up NGINX as a Reverse Proxy for Octopus Deploy
position: 10
---

There are scenarios in which you may be required to run Octopus Deploy behind a reverse proxy, such as compliance with specific organization standards or a need to add custom HTTP headers. This document outlines how to use NGINX as that reverse proxy.

This example assumes:

- NGINX will terminate your SSL connections.
- [Polling Tentacles](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication.md#polling-tentacles) are not required.

Our starting configuration:

- Octopus Deploy installed and running on <http://servername:8080/>
   For guidance on this topic, see [Installing Octopus](/docs/installation/index.md).
- Valid SSL certificate NGINX recognizes with a .key file.

At the end of this walk-through, you should be able to:

- Communicate with Octopus Deploy over a secure connection.
- Use NGINX as a load balancer.

Unlike a web server such as Microsoft's Internet Information Services (IIS), NGINX doesn't have a user interface.  All configuration in NGINX is done via a configuration file such as the `nginx.conf` file.  An SSL certificate doesn't have to be "installed" in a certificate store.  They are placed in a folder, and the configuration file references them.  See [NGINX's documentation](https://docs.nginx.com/nginx/admin-guide/) for more details.

## NGINX hosted on a server
Follow these steps if you're running NGINX directly on a server, such as Windows or Linux.

The first step is to copy the SSL certificate to a folder NGINX can access, for example, `/etc/nginx`.  This example will use two files, `STAR_octopusdemos.app.pem` and `STAR_octopusdemos.app.key`.  The .pem file contains the entire certificate chain.  

:::warning
The certificate file (.crt, .pem, etc.) should contain the entire certificate chain.  Failure to do so could cause the browser to reject the certificate.
:::

The next step is to modify the configuration file.  The file to edit depends on how the NGINX server use case.  Modify the `/etc/nginx/nginx.conf` file if this reverse proxy is the only item hosted by NGINX.  Otherwise, modify the appropriate `/etc/nginx/sites-enabled/[Site_name.com.conf]` or `/etc/nginx/conf.d/[Site_Name.com.conf]` file.

Below is an example reverse proxy configuration:

```
upstream octopusdeploy {
   server servername:8080;               
}

server {
   listen       443 ssl;
   server_name  localhost;

   ssl_certificate /etc/nginx/STAR_octopusdemos_app.pem;
   ssl_certificate_key /etc/nginx/STAR_octopusdemos_app.key;
        
   location / {
      proxy_set_header Host $host;
      proxy_pass http://octopusdeploy;
    }        
}
```

## NGINX hosted in a Docker Container

NGINX 1.19 added support for environment variables.  Instead of modifying the `nginx.conf` file, you'll create a `default.conf.template` file.  The environment variable is `${OCTOPUS_SERVER}`.  That value will be replaced when the Docker container starts up.

```
upstream octopusdeploy {
    server ${OCTOPUS_SERVER};    
}

server {
    listen       443 ssl;
    listen       90;
    server_name  localhost;

    ssl_certificate /etc/nginx/STAR_octopusdemos_app.pem;
    ssl_certificate_key /etc/nginx/STAR_octopusdemos_app.key;
    
    location / {
        proxy_set_header Host $host;
        proxy_pass http://octopusdeploy;
    }        
}
```

The Dockerfile will copy that template file to `/etc/nginx/templates/default.conf.template` and copy in the certificate and key files.  

```
FROM nginx:latest

ENV OCTOPUS_SERVER servername:8080

COPY ./default.conf.template /etc/nginx/templates/default.conf.template
COPY ./STAR_octopusdemos_app.key /etc/nginx/STAR_octopusdemos_app.key
COPY ./STAR_octopusdemos_app.pem /etc/nginx/STAR_octopusdemos_app.pem
```

Build the Docker image like any other Docker image.  The `-t` parameter tags the image to make it easier to reference.  Replace `octopusbob` with the name of your repository.

```
docker build -t octopusbob/nginx:1.0.0 -t octopusbob/nginx:latest .
```

### Running the NGINX Container
Then you can run the docker image in a container by running the command.  

```
docker run --name octopus-reverse-proxy -p 443:443 -e OCTOPUS_SERVER=servername:8080 octopusbob/nginx:latest
```

### Referencing the NGINX Container in Docker Compose
If you prefer, you can run the image via a docker-compose file.

```
version: '3'
services:  
  db:
    image: ${SQL_IMAGE}
    environment:
      SA_PASSWORD: ${SA_PASSWORD}
      ACCEPT_EULA: ${ACCEPT_EULA}
      # Prevent SQL Server from consuming the defult of 80% physical memory.
      MSSQL_MEMORY_LIMIT_MB: 4096
    ports:
      - 1401:1433
    healthcheck:
      test: [ "CMD", "/opt/mssql-tools/bin/sqlcmd", "-U", "sa", "-P", "${SA_PASSWORD}", "-Q", "select 1"]
      interval: 10s
      retries: 10
    volumes:
      - ./mssql:/var/opt/mssql/data      
  octopus:
    image: octopusdeploy/octopusdeploy:${OCTOPUS_SERVER_TAG}
    privileged: true
    environment:
      ACCEPT_EULA: ${ACCEPT_OCTOPUS_EULA}
      OCTOPUS_SERVER_NODE_NAME: ${OCTOPUS_SERVER_NODE}
      DB_CONNECTION_STRING: ${DB_CONNECTION_STRING}            
      MASTER_KEY: ${MASTER_KEY}      
    ports:
      - 8080:8080
      - 10943:10943
    depends_on:
      - db
    volumes:
      - ./taskLogs:/taskLogs
      - ./artifacts:/artifacts
      - ./repository:/repository
      - ./eventExports:/eventExports
  nginx:
    image: ${NGINX_IMAGE}
    environment:
      OCTOPUS_SERVER: ${OCTOPUS_SERVER}      
    ports: 
      - 443:443
    depends_on: 
      - db
      - octopus      
```
:::hint
EventExports is available from **2023.3** onwards as part of the audit log retention feature.
:::

The .env file will look something like this:
```
# It is highly recommended this value is changed as it's the password used for the database user.
SA_PASSWORD=REPLACE ME!

# Tag for the Octopus Server image. See https://hub.docker.com/repository/docker/octopusdeploy/octopusdeploy for the tags.
OCTOPUS_SERVER_TAG=2020.4.0

# Sql Server image. Set this variable to the version you wish to use. Default is to use the latest.
SQL_IMAGE=mcr.microsoft.com/mssql/server

# NGINX Server Image
NGINX_IMAGE=octopusbob/nginx:latest

# Octopus Server Port
OCTOPUS_SERVER=servername:8080

# The default created user username for login to the Octopus Server
ADMIN_USERNAME=USER.NAME!

# It is highly recommended this value is changed as it's the default user password for login to the Octopus Server
ADMIN_PASSWORD=REPLACE ME!

# Email associated with the default created user. If empty will default to octopus@example.local
ADMIN_EMAIL=test@test.com

# Accept the Microsoft Sql Server Eula found here: https://go.microsoft.com/fwlink/?linkid=857698
ACCEPT_EULA=Y

# Use of this Image means you must accept the Octopus Deploy Eula found here: https://octopus.com/company/legal
ACCEPT_OCTOPUS_EULA=Y

# Unique Server Node Name - If left empty will default to the machine Name
OCTOPUS_SERVER_NODE=HANode01

# Database Connection String. If using database in sql server container, it is highly recommended to change the password.
DB_CONNECTION_STRING=Server=db,1433;Database=OctopusDeploy;User=sa;Password=REPLACE ME!

# Your License key for Octopus Deploy. If left empty, it will try and create a free license key for you
OCTOPUS_SERVER_BASE64_LICENSE=CONVERT YOUR LICENSE TO BASE 64

# Octopus Deploy uses a Master Key for encryption of your database. If you're using an external database that's already been setup for Octopus Deploy, you can supply the Master Key to use it. If left blank, a new Master Key will be generated with the database creation.
MASTER_KEY=

# The API Key to set for the administrator. If this is set and no password is provided then a service account user will be created. If this is set and a password is also set then a standard user will be created.
ADMIN_API_KEY=
```
## NGINX as a Load Balancer

NGINX can be used as a load balancer for Octopus Deploy configured for [High Availability](docs/administration/high-availability/index.md).  To do so, add all the HA nodes to this section.

```
upstream octopusdeploy {
   server servername:8080;               
   server servername02:8080;               
}
```

The full file will look like:

```
http {
    upstream octopusdeploy {
        server servername:8080;
        server servername02:8080;               
    }

    server {
        listen       443 ssl;
        server_name  localhost;

        ssl_certificate /etc/nginx/STAR_octopusdemos_app.pem;
        ssl_certificate_key /etc/nginx/STAR_octopusdemos_app.key;
        
        location / {
            proxy_set_header Host $host;
            proxy_pass http://octopusdeploy;
        }        
    }
}
```

By default, NGINX uses round robin.  The Octopus Deploy UI is stateless; round robin should work without issues.  Another option is the least connections, where the server routes the request with the least amount of active connections.  See the [NGINX documentation](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/#choosing-a-load-balancing-method) for more details on load balancing.
