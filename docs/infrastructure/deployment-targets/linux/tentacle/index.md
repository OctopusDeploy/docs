---
title: Linux Tentacle
description: Configuring Linux Tentacle deployment targets in Octopus.
position: 20
---

Welcome to Linux Tentacle early access. This page provides information about getting started with pre-release builds of Linux Tentacle. Note that these builds are a work in progress, use them at your own risk. Please provide feedback in the #linux-tentacle channel on the [Octopus community slack](https://octopus.com/slack) or by e-mailing support@octopus.com.

## Requirements
Octopus Server 2019.5.1 or newer

## Known limitations
Linux Tentacle is intended to provide feature parity with Windows Tentacle. The currently known limitations of Linux Tentacle are:

- The Octopus portal does not have a Linux specific way to add Linux Tentacles. As a workaround, add the Tentacle using the Windows > Tentacle deployment target type.
- PowerShell, C# and F# script types are not supported. The alternatives are Bash and Python scripts.
- Automatic Tentacle upgrade is not currently supported for Linux Tentacle.

## Downloads

At the moment we only have a .deb package. There is also a .tar.gz archive for manual installations.

```
https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-amd64.deb

https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-linux_x64.tar.gz
```

## Debian

### Download the package

```
curl https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-amd64.deb --output tentacle_5.0.0-beta1.deb
```
or
``` 
wget https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-amd64.deb
```

### Quick start scripts

The following bash scripts install and configure Linux Tentacle. More detailed information follows.

Listening Tentacle running as root
```
serverUrl="http://localhost:8065"
thumbprint="5B584A2B09098E85A128242E5C3C590FF7E9B077"
apiKey=""
name=$HOSTNAME
environment="Test"
role="web server"

curl https://download.octopusdeploy.com/linux-tentacle/tentacle-5.0.0-beta1-amd64.deb --output tentacle_5.0.0-beta1.deb

sudo apt install ./tentacle_5.0.0-beta1.deb

/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role"
/opt/octopus/tentacle/Tentacle agent
```

### Installing Tentacle
Tentacle can be installed using a debian package or archive:

#### Debian Package
```
sudo apt install ./tentacle_<VERSION>_amd64.deb
```

#### Archive
```
sudo mkdir /opt/octopus
sudo tar xvzf tentacle_<VERSION>_amd64.deb -C /opt/octopus
```

The Tentacle installation will configure a default instance.

#### Listening Tentacle (recommended)
To configure a listening Tentacle:

```
thumbprint="5B584A2B09098E85A128242E5C3C590FF7E9B077"

/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
```

The Tentacle can be added to Octopus via the Octopus portal, or by running a registration script:

```
serverUrl="http://localhost:8065"
apiKey=""
name=$HOSTNAME
environment="Test"
role="web server"

/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role"
```

#### Polling Tentacle
To configure a polling Tentacle:

```
thumbprint="5B584A2B09098E85A128242E5C3C590FF7E9B077"

/opt/octopus/tentacle/Tentacle configure --noListen True
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
```

The Tentacle must be registered with the Octopus Server by running the Tentacle register-with command:

```
serverUrl="http://localhost:8065"
serverCommsPort=10943
apiKey=""
name=$HOSTNAME
environment="Test"
role="web server"

/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role" --comms-style "TentacleActive" --server-comms-port $serverCommsPort
```

### Running Tentacle
Start the Tentacle interactively by running:

```
/opt/octopus/tentacle/Tentacle agent
```