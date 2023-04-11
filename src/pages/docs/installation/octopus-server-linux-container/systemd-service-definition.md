---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Octopus Server Container with systemd
description: Using systemd, you can have the Octopus Server Linux Container running in Docker each time the OS starts on your host machine.
navOrder: 20
---

You can use `systemd` to boot the Octopus Server Linux container each time the OS starts. To do this, create a file called `/etc/systemd/system/docker-octopusdeploy.service` with the following contents:

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

```bash
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

```bash
systemctl daemon-reload
```

Then start the services with the commands:

```bash
systemctl start docker-mssql
systemctl start docker-octopusdeploy
```