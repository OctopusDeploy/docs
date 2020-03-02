---
title: Troubleshooting Octopus Server in a Container
description: An Octopus Deploy Server instance can be run directly from within a container.
position: 10
---

## Accept the EULA

When you create an Octopus Server container, you must agree with the [Octopus Deploy EULA](https://octopus.com/company/legal).

If you get an error similar to:

```
ERROR: You must accept the EULA
```

You must pass `--env "ACCEPT_EULA=Y"` when using `docker run` with an Octopus Server image. By passing this value, you accept the Octopus Deploy EULA.

## Windows Containers

When running Windows Containers, you must have Docker set to use Windows Containers and not Linux Containers. Please refer to [switching to Windows Containers](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers) documentation for switching to Windows Containers.

### Issues setting the volume

You should create your Windows Containers with a volume mount so files such as logs can be stored outside the container. If you get an error similar to:

```
Error response from daemon: invalid volume specification: '...': invalid mount config for type "bind": bind source path does not exist: ...
```

Please ensure that the folder you are mounting exists on the host machine and try again. For example, if you passed `--volume "C:\Octopus\Data:C:\Octopus"` then `C:\Octopus\Data` needs to exist on the host machine.

## Linux Containers

When you run Linux Containers on Windows, you must have Docker set to use Linux Containers and not Windows Containers. Please refer to [switching to Linux Containers](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers) documentation for switching to Linux Containers.

### Access Bash within the container

When you have the container running, it could be a requirement to install other programs within it or read/modify files within. For example, you may want to have PowerShell Core available to run PowerShell on the Octopus Server. To access bash within the container first run the command `docker ps` to find your container, then copy the Container ID. Next run `docker exec -it CONTAINERID /bin/bash` replace CONTAINERID with your copied Container ID to enter bash within the container. From there, you can install, remove or access anything else that is required. 
