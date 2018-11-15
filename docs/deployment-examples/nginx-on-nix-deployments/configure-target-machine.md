---
title: Configuring target machine
description: This guide describes how to configure your target machine running Linux to be used in Octopus deployments.
position: 0
---

:::hint
This guide can be used with an AWS AMI instance of Ubuntu 14.04 LTS or an Azure VM running Ubuntu 14.04 LTS. If you want to use a different base instance there may be some slightly different steps you need to take during the configuration.
:::

Deploying projects over [SSH](/docs/infrastructure/deployment-targets/ssh-targets/index.md) has some slightly different requirements to a standard Tentacle. Although you don't need to install and run a Tentacle service, there is some configuration that is required to allow Calamari to run on non Windows systems.

## Install .NET Core {#ConfigureTargetMachine-InstallDotNetCore}

:::hint
**Authoritative Documentation**
The best and most up-to-date guide to installing .NET will continue to be on the [.NET website](https://www.microsoft.com/net/download/linux-package-manager/ubuntu16-04/runtime-current). More detailed instructions can be found on their website which may change in future versions so check their documentation out for more info.
:::

### Register Microsoft key and feed
Before installing .NET, you'll need to register the Microsoft key, register the product repository, and install required dependencies. This only needs to be done once per machine.

Open a command prompt and run the following commands:

```bash
wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
```

### Install .NET SDK

Update the products available for installation, then install the .NET SDK.

In your command prompt, run the following commands:

```bash
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install aspnetcore-runtime-2.1
```

## Install NGINX {#ConfigureTargetMachine-InstallNginx}

:::hint
**Authoritative Documentation**
The best and most up-to-date guide to installing NGINX will continue to be on the [NGINX website](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/). More detailed instructions can be found on their website which may change in future versions so check their documentation out for more info.
:::

### Download the key used to sign NGINX packages and the repository, and add it to the `apt` program’s key ring:

```bash
$ sudo wget https://nginx.org/keys/nginx_signing.key
$ sudo apt-key add nginx_signing.key
```

### Edit the **/etc/apt/sources.list** file, for example with `vi`:

```bash
$ sudo vi /etc/apt/sources.list
```

### Add these lines **sources.list** to name the repositories from which the NGINX Open Source source can be obtained:

```
deb https://nginx.org/packages/mainline/ubuntu/ <CODENAME> nginx
deb-src https://nginx.org/packages/mainline/ubuntu/ <CODENAME> nginx
```

where:

- The `/mainline` element in the pathname points to the latest mainline version of NGINX Open Source; delete it to get the latest stable version
- `<CODENAME>` is the codename of an Ubuntu release
For example, to get the latest mainline package for Ubuntu 16.04 (*xenial*), add:

```bash
deb https://nginx.org/packages/mainline/ubuntu/ xenial nginx
deb-src https://nginx.org/packages/mainline/ubuntu/ xenial nginx
```

Save the changes and quit `vi` (press **ESC** and type `wq` at the `:` prompt).

### Install NGINX Open Source:

```bash
$ sudo apt-get remove nginx-common
$ sudo apt-get update
$ sudo apt-get install nginx
```

### Start NGINX Open Source:

```bash
$ sudo nginx
```

### Verify that NGINX Open Source is up and running:

```bash
$ curl -I 127.0.0.1
HTTP/1.1 200 OK
Server: nginx/1.13.8
```

## Add User {#ConfiguringTargetMachine-AddUser}

Rather than connecting and deploying your application as the root user, you should create a custom user account that will be used for the purposes of deployment. The login credentials will then be able to be easily revoked without affecting other users who access the machine. Resources will also be able to be more granularly assigned, allowing greater control if the account is used maliciously.

:::hint
**Security**
Entire books have been published on the subject of security on Unix based systems. These steps are intended to serve a basic level of security, while making sure you stop and consider the role that it plays in your environment.
:::

In this case we are going to create a simple user account with a password which will be used for both the deployment process and running the application process itself. In your case you may want to use different accounts for each task. Replace **&lt;the-password-you-want&gt;** with a random password of your choice and remember this value as it will be needed later when configuring the target on the Octopus Server

```bash
sudo useradd -m octopus
echo octopus:<the-password-you-want> | sudo chpasswd
```

By default the AWS Ubuntu AMI only allows authentication via SSH keys and not password. Although passwords are typically less secure, for the purposes of this guide we are going to enable their use.

### Enable password authentication in AWS

```bash
sudo sed -i.bak -e s/'PasswordAuthentication no'/'PasswordAuthentication yes'/g /etc/ssh/sshd_config
sudo restart ssh
```

### Enable 'sudo' access without password {#ConfigureTargetMachine-EnableSudoAccessWithoutPassword}

By default `sudo` requires the user to enter their password, but this obviously won't work in a non-interactive session such as that of a running deployment. To successfully use the new *NGINX* feature in Octopus Deploy we need `sudo` access without password prompt for few commands `cp`, `mv`, `rm`, `systemctl` and `nginx`.

So, we need to configure this for our user that we will be using for the purposes of deployment. See [Sudo commands](/docs/infrastructure/deployment-targets/ssh-targets/sudo-commands.md) for more details on how to disable password prompt for all commands. To enable `sudo` without password prompt for only the required commands for NGINX, add the following lines into your file and then save the file:

```bash
Cmdn_Alias REQUIRED_NGINX_COMMANDS = /bin/cp, /bin/mv, /bin/rm, /bin/systemctl, /usr/sbin/nginx

octopus ALL=(ALL) NOPASSWD: REQUIRED_NGINX_COMMANDS
```