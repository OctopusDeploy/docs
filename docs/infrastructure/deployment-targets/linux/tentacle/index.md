---
title: Linux Tentacle
description: Configuring Linux Tentacle deployment targets in Octopus.
position: 20
---

Welcome to Linux Tentacle early access. This page provides information about getting started with pre-release builds of Linux Tentacle. Note that these builds are a work in progress, use them at your own risk. Please provide feedback in the #linux-tentacle channel on the [Octopus community slack](https://octopus.com/slack) or by e-mailing support@octopus.com.

## Requirements
- Octopus Server 2019.5.7 or newer
- [.NET core 2.x](https://docs.microsoft.com/en-us/dotnet/core/linux-prerequisites?tabs=netcore2x) installed on the Linux machine

## Known limitations
Linux Tentacle is intended to provide feature parity with Windows Tentacle. The currently known limitations of Linux Tentacle are:

- The Octopus portal does not have a Linux specific way to add Linux Tentacles. As a workaround, add the Tentacle using the Windows > Tentacle deployment target type.
- PowerShell, C# and F# script types are not supported. The alternatives are Bash and Python scripts.
- Automatic Tentacle upgrade is not currently supported for Linux Tentacle.

## Downloads

So far there is a .deb package for use with `apt-get` on Debian distributions, an .rpm package for use with `yum` on Fedora distributions, and a .tar.gz archive for manual installations:

- [Download the Debian package](https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-amd64.deb)
- [Download the archive](https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-linux_x64.tar.gz)

## Installing and configuring Linux Tentacle
Note that many of the steps described below must be run as a super user using `sudo`.

### Installing Tentacle
```bash Debian/Ubuntu repository
sudo add-apt-repository "deb https://s3.amazonaws.com/octopus-apt-repo/ stretch main"
apt-key adv --fetch-keys https://s3.amazonaws.com/octopus-apt-repo/public.key
apt-get update
apt-get install tentacle
```

```bash CentOS/Fedora repository
sudo wget https://s3.amazonaws.com/octopus-rpm-repo/tentacle.repo -O /etc/yum.repos.d/tentacle.repo
sudo yum install tentacle
```

```bash Archive
wget https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-linux_x64.tar.gz
#or
curl https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-linux_x64.tar.gz --output tentacle-5.0.0-beta1-linux_x64.tar.gz

mkdir /opt/octopus
tar xvzf tentacle-5.0.0-beta1-linux_x64.tar.gz -C /opt/octopus
```

When using either the apt or rpm package manager, the Tentacle installation will automatically configure a default Tentacle instance. If you installed Tentacle using a package manager you can skip to [Configuring Listening Tentacle](#LinuxTentacle-ConfigureListeningTentacle) or [Configuring Polling Tentacle](#LinuxTentacle-ConfigurePollingTentacle).

### Setting up a Tentacle instance
Many instances of Tentacle can be configured on a single machine. The default instance of Tentacle is named `Tentacle` and can be created via the command line:

```bash
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --reset-trust --app "$applicationPath"
```

Additional instances of Tentacle can be created and configured by passing the `--instance $instanceName` argument to all of the commands listed here.

### Configuring Listening Tentacle (recommended) {#LinuxTentacle-ConfigureListeningTentacle}
To configure a listening Tentacle:

```bash
thumbprint=""   # The thumbprint of your Octopus server

/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
```

The Tentacle can be added to Octopus via the Octopus portal, or by running a registration script:

```bash Register deployment target
serverUrl="https://my-octopus"   # The url of your Octous server
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle

/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role"
```

```bash Register worker
serverUrl="https://my-octopus"   # The url of your Octous server
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool" # The worker pool to register the Tentacle in

/opt/octopus/tentacle/Tentacle register-worker --server "$serverUrl" --apiKey "$apiKey" --name "$name" --workerPool "$workerPool"
```

### Configuring Polling Tentacle {#LinuxTentacle-ConfigurePollingTentacle}
To configure a polling Tentacle:

```bash
/opt/octopus/tentacle/Tentacle configure --noListen True
```

Octopus supports HTTP proxies for communication from the Tentacle and Octopus Server. See the [proxy documentation](/docs/infrastructure/deployment-targets/windows-targets/proxy-support.md) for more information about proxies. To configure a proxy for polling communication:

```bash
proxyHost=""
proxyPort=""
proxyUser=""
proxyPassword=""

/opt/octopus/tentacle/Tentacle proxy --proxyEnabled "true" --proxyHost "$proxyHost" --proxyPort "$proxyPort" --proxyUsername "$proxyUser" --proxyPassword "$proxyPassword"
```

The Tentacle must be registered with the Octopus Server from the command line:

```bash Register deployment target
serverUrl="https://my-octopus"   # The url of your Octous server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle

/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
```

```bash Register worker
serverUrl="https://my-octopus"   # The url of your Octous server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool"    # The worker pool to register the Tentacle in

/opt/octopus/tentacle/Tentacle register-worker --server "$serverUrl" --apiKey "$apiKey" --name "$name" --workerPool "$workerPool" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
```

### Running Tentacle
Start the Tentacle interactively by running:

```
/opt/octopus/tentacle/Tentacle agent
```

## Quick start scripts
The following bash scripts install, configure and register Linux Tentacle:

!include <quickstart-debian>

!include <quickstart-fedora>

!include <quickstart-archive>