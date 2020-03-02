---
title: Troubleshooting Octopus Server in a Container
description: An Octopus Deploy Server instance can be run directly from within a container.
position: 10
---

## Ensure you've accepted the EULA

When you create an Octopus Server container, you must agree with the [Octopus Deploy EULA](https://octopus.com/company/legal).

If you get an error similar to:

```
ERROR: You must accept the EULA
```

You must pass `--env "ACCEPT_EULA=Y"` when using `docker run` with an Octopus Server image to accept the Octopus Deploy EULA.

## Use the correct Docker engine

When running Windows Containers, you must have Docker set to use Windows Containers and not Linux Containers. Please refer to [switching to Windows Containers](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers) documentation for switching to Windows Containers.

### Invalid Volume Specification

You should create your Windows Containers with a volume mount so files such as logs can be stored outside the container. If you get an error similar to:

```
Error response from daemon: invalid volume specification: '...': invalid mount config for type "bind": bind source path does not exist: ...
```

Please ensure that the folder you are mounting exists on the host machine and try again. For example, if you passed `--volume "C:\Octopus\Data:C:\Octopus"` then `C:\Octopus\Data` needs to exist on the host machine.

## Linux Containers on Windows

When you run Linux Containers on Windows, you must have Docker set to use Linux Containers and not Windows Containers. Please refer to [switching to Linux Containers](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers) documentation for switching to Linux Containers.

### How can I install other softare in the container?

When you have the container running, you may need to install other programs within it or read/modify files within. For example, you may want to have [PowerShell Core](https://github.com/PowerShell/PowerShell) available to run PowerShell scripts on the Octopus Server. To access bash within the container first run the command `docker ps` to find your container, then copy the Container ID. Next run `docker exec -it <container id> /bin/bash` to enter bash within the container. From there, you can install, remove or access anything else that is required. 
