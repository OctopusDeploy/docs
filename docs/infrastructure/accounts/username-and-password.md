---
title: Username/Password
description: Username and Password Accounts allow you securely authenticate with different services.
position: 40
---

A Username/Password account can be used to connect [SSH Targets](/docs/infrastructure/deployment-targets/ssh-targets/index.md) and services like Google Cloud Platform if you are using the [Kubernetes](/docs/deployment-examples/kubernetes-deployments/index.md) functionality in Octopus.

<!-- re-order this. Users need to enable this before it will work. -->


## Create a Username and Password Account {#UsernameandPassword-Creatingtheaccount}

1. Navigate to {{infrastructure,Accounts}} and click **ADD ACCOUNT**.
1. Select **Username/Password** from the dropdown menu.
1. Give the account a name, for instance, **SSH backup server** or **Google**.
1. Add a description.
1. Add the username and password you use to authenticate against the remote host.
1. If you want to restrict which environments can use the account, select the environments that are allowed to use the account. If you select no environments, all environments will be allowed to use the account.

## SSH Username and Password

A Username/Password Account is one mechanism that can be used to authenticate to [SSH Targets](/docs/infrastructure/deployment-targets/ssh-targets/index.md).

### Enabling Username & Password Authentication {#UsernameandPassword-EnablingUsername&amp;PasswordAuthentication}

Depending on your target machine's distro it might not have password authentication enabled by default.

To allow the Octopus Server to connect using the provided credentials you the will need to modify the sshd\_config file on the target machine with your favorite text editor:

```powershell
vim /etc/ssh/sshd_config
```
Find the line that refers to "PasswordAuthentication" and change it to:

```powershell
PasswordAuthentication yes
```

Once this has been done restart your ssh service under root privileges using:

```powershell
service ssh restart
```

If you still experience problems it may help to try connect directly to the target machine using these credentials though a client like putty to help eliminate any networking related problems with your Octopus configuration.

:::warning
**Different Distributions use Different Conventions**
While the above instructions should work on common platforms like Ubuntu or RedHat, you may need to double check the details for specific instructions relating to ssh authentication on target operating system. There are many different \*Nix based distributions some of which have their own unique way of doing things. For this reason we cannot guarantee that these SSH instructions will work in every case.
:::
