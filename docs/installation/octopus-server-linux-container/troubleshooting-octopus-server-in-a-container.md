---
title: Troubleshooting Octopus Server in a Container
description: Troubleshooting steps for running Octopus in a Container
position: 100
---

:::warning
The Octopus Server Windows container is deprecated, and no longer maintained. We recommend using the [Octopus Server Linux Container](/docs/installation/octopus-server-linux-container/index.md). To migrate an existing Octopus Server Windows Container to the Linux Container, please see this [guide](/docs/installation/octopus-server-linux-container/migration/migrate-to-server-container-linux-from-windows-container.md).
:::

## Ensure you've accepted the EULA

When you create an Octopus Server container, you must agree with the [Octopus Deploy EULA](https://octopus.com/company/legal).

If you get an error similar to:

```
ERROR: You must accept the EULA
```

You must pass `--env "ACCEPT_EULA=Y"` when using `docker run` with an Octopus Server image to accept the Octopus Deploy EULA.

## Use the correct Docker engine

If you get an error similar to:

```
image operating system "windows" cannot be used on this platform.
```
or

```
image operating system "linux" cannot be used on this platform.
```
then you likely are using a Windows image with Linux Containers or a Linux image with Windows Containers.

When running Containers on a Windows host machine, there is the options to run both Windows Containers and Linux Containers. Docker must be set to the correct container mode for the image you are using. Please refer to [switching between Windows and Linux Containers](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers) documentation to learn how to switch between them.

### Invalid Volume Specification

You should create your Windows Containers with a volume mount so files such as logs can be stored outside the container. If you get an error similar to:

```
Error response from daemon: invalid volume specification: '...': invalid mount config for type "bind": bind source path does not exist: ...
```

Please ensure that the folder you are mounting exists on the host machine and try again. For example, if you passed `--volume "C:\Octopus\Data:C:\Octopus"` then `C:\Octopus\Data` needs to exist on the host machine.

### How can I install other software in the container?

When you have the container running, you may need to install other programs within it or read/modify files within. For example, you may want to have [PowerShell Core](https://github.com/PowerShell/PowerShell) available to run PowerShell scripts on the Octopus Server. To access bash within the container first run the command `docker ps` to find your container, then copy the Container ID. Next run `docker exec -it <container id> /bin/bash` to enter bash within the container. From there, you can install, remove or access anything else that is required. 
