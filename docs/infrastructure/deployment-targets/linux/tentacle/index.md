---
title: Linux Tentacle
description: Configuring Linux Tentacle deployment targets in Octopus.
position: 20
---

Welcome to Linux Tentacle early access. This page provides information about getting started with pre-release builds of Linux Tentacle. Note that these builds are a work in progress, use them at your own risk. Please provide feedback in the #linux-tentacle channel on the [Octopus community slack](https://octopus.com/slack) or by e-mailing support@octopus.com.

## Debian

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

grep -qxF 'https://s3.amazonaws.com/octopus-apt-repo/' /etc/apt/sources.list || echo 'deb https://s3.amazonaws.com/octopus-apt-repo/ stretch main' >> /etc/apt/sources.list
curl https://s3.amazonaws.com/octopus-apt-repo/public.key | apt-key add
apt-get update
apt-get install tentacle -y
/opt/octopus/tentacle/Tentacle configure --port 10933 --noListen False
/opt/octopus/tentacle/Tentacle configure --trust $thumbprint
echo "Registering the Tentacle $name with server $serverUrl in environment $environment with role $role"
/opt/octopus/tentacle/Tentacle register-with --server "$serverUrl" --apiKey "$apiKey" --name "$name" --env "$environment" --role "$role"
/opt/octopus/tentacle/Tentacle agent
```

### Configuring the Debian package repository

Octopus provides a debian package repository for downloading Tentacle packages.  The repository must be added to packages sources:

```
grep -qxF 'https://s3.amazonaws.com/octopus-apt-repo/' /etc/apt/sources.list || echo 'deb https://s3.amazonaws.com/octopus-apt-repo/ stretch main' >> /etc/apt/sources.list
```

The repository's public key must then be trusted:

```
apt-key adv --fetch-keys https://s3.amazonaws.com/octopus-apt-repo/public.key
```

or

```
curl https://s3.amazonaws.com/octopus-apt-repo/public.key | apt-key add
```

Now we can update `apt-get` so the Tentacle package are available for installation:

```
apt-get update
```

### Installing Tentacle
Tentacle can be installed once the package source has been configured:

```
apt-get install tentacle
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

### Polling Tentacle
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