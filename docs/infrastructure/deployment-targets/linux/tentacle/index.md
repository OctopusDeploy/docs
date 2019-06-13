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

So far there is a .deb package for use with `apt-get` on Debian distributions and a .tar.gz archive for manual installations:

- [Download the Debian package](https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-amd64.deb)
- [Download the archive](https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-linux_x64.tar.gz)

## Installing and configuring Linux Tentacle
Note that many of the steps described below must be run as a super user using `sudo`.

### Download the package
```bash Debian package
wget https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-amd64.deb
```

```bash Arhive
wget https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-linux_x64.tar.gz
```

### Installing Tentacle
Tentacle can be installed using the debian package or archive:

```bash Debian package
apt install ./tentacle_<VERSION>_amd64.deb
```

```bash Archive
mkdir /opt/octopus
tar xvzf tentacle_<VERSION>_amd64.deb -C /opt/octopus
```

When using the Debian package, the Tentacle installation will automatically configure a default Tentacle instance. If you are using the Debian package you can skip to [Configuring Listening Tentacle](#LinuxTentacle-ConfigureListeningTentacle) or [Configuring Polling Tentacle](#LinuxTentacle-ConfigurePollingTentacle).

### Setting up a Tentacle instance
Many instances of Tentacle can be configured on a single machine. The default instance of Tentacle is named `Tentacle` and can be created via the command line:

```bash
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath" --reset-trust --app "$applicationPath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
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

### Debian

```bash Listening deployment target
serverUrl="https://my-octopus"   # The url of your Octous server
thumbprint=""       # The thumbprint of your Octopus server
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle

curl https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-amd64.deb --output tentacle_5.0.0-beta1.deb

apt install ./tentacle_5.0.0-beta1.deb

/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role"
/opt/octopus/tentacle/Tentacle agent
```

```bash Polling deployment target
serverUrl="https://my-octopus"   # The url of your Octous server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle

curl https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-amd64.deb --output tentacle_5.0.0-beta1.deb

apt install ./tentacle_5.0.0-beta1.deb

/opt/octopus/tentacle/Tentacle configure --noListen True
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
/opt/octopus/tentacle/Tentacle agent
```

```bash Listening worker
serverUrl="https://my-octopus"   # The url of your Octous server
thumbprint=""       # The thumbprint of your Octopus server
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool"    # The worker pool to register the Tentacle in

curl https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-amd64.deb --output tentacle_5.0.0-beta1.deb

apt install ./tentacle_5.0.0-beta1.deb

/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-worker --server "$serverUrl" --apiKey "$apiKey" --name "$name" --workerPool "$workerPool"
/opt/octopus/tentacle/Tentacle agent
```

```bash Polling worker
serverUrl="https://my-octopus"   # The url of your Octous server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool"    # The worker pool to register the Tentacle in

curl https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-amd64.deb --output tentacle_5.0.0-beta1.deb

apt install ./tentacle_5.0.0-beta1.deb

/opt/octopus/tentacle/Tentacle configure --noListen True
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --workerPool "$workerPool" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
/opt/octopus/tentacle/Tentacle agent
```

### Archive

```bash Listening deployment target
serverUrl="https://my-octopus"   # The url of your Octous server
thumbprint=""       # The thumbprint of your Octopus server
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

wget https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-linux_x64.tar.gz

mkdir /opt/octopus
tar xvzf tentacle_<VERSION>_amd64.deb -C /opt/octopus

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath" --reset-trust --app "$applicationPath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role"
/opt/octopus/tentacle/Tentacle agent
```

```bash Polling deployment target
serverUrl="https://my-octopus"   # The url of your Octous server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
environment="Test"  # The environment to register the Tentacle in
role="web server"   # The role to assign to the Tentacle
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

wget https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-linux_x64.tar.gz

mkdir /opt/octopus
tar xvzf tentacle_<VERSION>_amd64.deb -C /opt/octopus

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath" --reset-trust --app "$applicationPath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --noListen True
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
/opt/octopus/tentacle/Tentacle agent
```

```bash Listening worker
serverUrl="https://my-octopus"   # The url of your Octous server
thumbprint=""       # The thumbprint of your Octopus server
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool"    # The worker pool to register the Tentacle in
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

wget https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-linux_x64.tar.gz

mkdir /opt/octopus
tar xvzf tentacle_<VERSION>_amd64.deb -C /opt/octopus

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath" --reset-trust --app "$applicationPath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-worker --server "$serverUrl" --apiKey "$apiKey" --name "$name" --workerPool "$workerPool"
/opt/octopus/tentacle/Tentacle agent
```

```bash Polling worker
serverUrl="https://my-octopus"   # The url of your Octous server
serverCommsPort=10943            # The communication port the Octopus Server is listening on (10943 by default)
apiKey=""           # An Octopus Server api key with permission to add machines
name=$HOSTNAME      # The name of the Tentacle at is will appear in the Octopus portal
workerPool="Default Worker Pool"    # The worker pool to register the Tentacle in
configFilePath="/etc/octopus/default/tentacle-default.config"
applicationPath="/home/Octopus/Applications/"

wget https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-linux_x64.tar.gz

mkdir /opt/octopus
tar xvzf tentacle_<VERSION>_amd64.deb -C /opt/octopus

/opt/octopus/tentacle/Tentacle create-instance --config "$configFilePath" --reset-trust --app "$applicationPath"
/opt/octopus/tentacle/Tentacle new-certificate --if-blank
/opt/octopus/tentacle/Tentacle configure --noListen True
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --workerPool "$workerPool" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
/opt/octopus/tentacle/Tentacle agent
```