---
title: Configuring Target Machine
description: This guide describes how to configure your target machine running Linux to be used in Octopus deployments.
position: 0
---

:::hint
This guide can be used with an AWS AMI instance of Ubuntu 14.04 LTS or an Azure VM running Ubuntu 14.04 LTS. If you want to use a different base instance there may be some slightly different steps you need to take during the configuration.
:::

Deploying projects over [SSH](/docs/infrastructure/deployment-targets/linux/ssh-targets/index.md) has some slightly different requirements to a standard Tentacle. Although you don't need to install and run a Tentacle service, there is some configuration that is required to allow Calamari to run on non Windows systems.

## Install Mono {#ConfiguringTargetMachine-InstallMono}

:::hint
**Authoritative Documentation**
The best and most up-to-date guide to installing mono will continue to be on the [mono website](http://www.mono-project.com/docs/getting-started/install/linux/). More detailed instructions can be found on their website which may change in future versions so check their documentation out for more info.
:::

Starting with a fresh instance of Ubuntu 14.04, update the package repository and install **mono-complete** to get the latest stable version.

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
echo "deb http://download.mono-project.com/repo/debian wheezy main" | sudo tee /etc/apt/sources.list.d/mono-xamarin.list
sudo apt-get update
sudo apt-get install mono-complete
```

## Add User {#ConfiguringTargetMachine-AddUser}

Rather than connecting and deploying your application as the root user, you should create a custom user account that will be used for the purposes of deployment. The login credentials will then be able to be easily revoked without affecting other users who access the machine. Resources will also be able to be more granularly assigned, allowing greater control if the account is used maliciously.

:::hint
**Security**
Entire books have been published on the subject of security on Unix based systems. These steps are intended to serve a basic level of security, while making sure you stop and consider the role that it plays in your environment.
:::

In this case we are going to create a simple user account with a password which will be used for both the deployment process and running the application process itself. In your case you may want to use different accounts for each task. Replace **<the-password-you-want>** with a random password of your choice and remember this value as it will be needed later when configuring the target on the Octopus Server

```bash
sudo useradd -m octopus
echo octopus:<the-password-you-want> | sudo chpasswd
```

By default the AWS Ubuntu AMI only allows authentication via SSH keys and not password. Although passwords are typically less secure, for the purposes of this guide we are going to enable their use.

**Enable password authentication in AWS**

```bash
sudo sed -i.bak -e s/'PasswordAuthentication no'/'PasswordAuthentication yes'/g /etc/ssh/sshd_config
sudo restart ssh
```

## Install Application Dependencies {#ConfiguringTargetMachine-InstallApplicationDependencies}

In this step we will install [Node.js](https://nodejs.org), [npm](https://www.npmjs.com/) and [pm2](https://github.com/Unitech/pm2) which are required for hosting the sample application.

:::success
Your application may have different requirements, and this is the point where you would install all of those dependencies.
:::

Firstly install Node.js, and then create a symlink as /usr/bin/node so that it can be invoked with the command "node".

```bash
sudo apt-get install nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

To help manage the web process when it runs on the machine, we will install the [pm2 library](https://github.com/Unitech/pm2) (which itself is a node module) as a global module. This library is available in the **npm** repository which will also need to be installed if not already available.

```bash
sudo apt-get install npm
sudo npm install pm2 -g
```
