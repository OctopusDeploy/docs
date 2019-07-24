---
title: Linux Tentacle (Early Access)
description: Configuring Linux Tentacle deployment targets in Octopus.
position: 20
---

Welcome to Linux Tentacle early access. This page provides information about getting started with pre-release builds of Linux Tentacle. Note that these builds are a work in progress, use them at your own risk. Please provide feedback in the #linux-tentacle channel on the [Octopus community slack](https://octopus.com/slack) or by e-mailing support@octopus.com.

## Requirements

- Octopus Server 2019.5.7 or newer

Linux Tentacle is a .NET Core application distributed as a [self-contained deployment](https://docs.microsoft.com/en-us/dotnet/core/deploying/#self-contained-deployments-scd). On most linux distributions it will "just work", but be aware that there are [.NET Core prerequisites](https://github.com/dotnet/core/blob/master/Documentation/prereqs.md) that may need to be installed.

## Known limitations

Linux Tentacle is intended to provide feature parity with Windows Tentacle. The currently known limitations of Linux Tentacle are:

- PowerShell, C# and F# script types are not supported. The alternatives are Bash and Python scripts.
- Automatic Tentacle upgrade from the Octopus Server is not currently supported for Linux Tentacle.

## Downloads

So far there is a .deb package for use with `apt-get` on Debian distributions, an .rpm package for use with `yum` on Fedora distributions, and a .tar.gz archive for manual installations:

- [Download the archive](https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta14-linux_x64.tar.gz)

## Installing and configuring Linux Tentacle
Note that many of the steps described below must be run as a super user using `sudo`.

### Installing Tentacle
```bash Debian/Ubuntu repository
apt-key adv --fetch-keys https://apt.octopus.com/public.key
add-apt-repository "deb https://apt.octopus.com/ stretch main"
apt-get update
apt-get install tentacle
```

```bash CentOS/Fedora repository
wget https://rpm.octopus.com/tentacle.repo -O /etc/yum.repos.d/tentacle.repo
yum install tentacle
```

```bash Archive
wget https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta14-linux_x64.tar.gz
#or
curl https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta14-linux_x64.tar.gz --output tentacle-5.0.0-beta14-linux_x64.tar.gz

mkdir /opt/octopus
tar xvzf tentacle-5.0.0-beta1-linux_x64.tar.gz -C /opt/octopus
```

### Setting up a Tentacle instance
Many instances of Tentacle can be configured on a single machine. To configure an instance run the following setup script:

```bash
/opt/octopus/tentacle/configure-tentacle.sh
```

Additional instances of Tentacle can be created and configured by passing the `--instance $instanceName` argument to all of the commands listed here.

## Running Tentacle

### Running Tentacle interactively
Start the Tentacle interactively by running:

```
/opt/octopus/tentacle/Tentacle run --instance <instance name>
```

### Running Tentacle as a service (systemd)
1. Create a systemd **Unit file** to run Tentacle.
    ```
    [Unit]
    Description=Octopus Tentacle Server
    After=network.target

    [Service]
    Type=simple
    User=root
    WorkingDirectory=/etc/octopus/default/
    ExecStart=/opt/octopus/tentacle/Tentacle run --instance <instance name> --noninteractive
    Restart=always

    [Install]
    WantedBy=multi-user.target
    ```

2. Copy the unit file to `/etc/systemd/system` and give it permissions
    ```
    sudo cp myservice.service /etc/systemd/system/tentacle.service
    sudo chmod 644 /etc/systemd/system/tentacle.service
    ```

3. Start the Tentacle service
    ```
    sudo systemctl start tentacle
    ```

4. Use the `enable` command to ensure that the service start whenever the system boots.
    ```
    sudo systemctl enable tentacle
    ```


## Automation scripts
The following bash scripts install, configure and register Linux Tentacle for use in automated environments:

!include <quickstart-debian>

!include <quickstart-fedora>

!include <quickstart-archive>
