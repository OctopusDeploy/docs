---
title: Username and Password
position: 2
---


A Username/Password Account is one mechanism that can be used to authenticate to [SSH Targets](http://docs.octopusdeploy.com/display/OD3/SSH+Targets).

## Creating the account


You must provide both the username and password which will be used during the initial authentication phase of the SSH connection.


![](/docs/images/3048108/3277898.png)

## Enabling Username & Password Authentication


Depending on your target machine's distro it might not have password authentication enabled by default.


To allow the Octopus server to connect using the provided credentials you the will need to modify the sshd\_config file on the target machine with your favorite text editor

```powershell
vim /etc/ssh/sshd_config
```


find the line that refers to "PasswordAuthentication" and change it to

```powershell
PasswordAuthentication yes
```


once this has been done restart your ssh service under root privileges using

```powershell
service ssh restart
```


If you still experience problems it may help to try connect directly to the target machine using these credentials though a client like putty to help eliminate any networking related problems with your Octopus configuration.

:::warning
**Different distributions use different conventions**
While the above instructions should work on common platforms like Ubuntu or RedHat, you may need to double check the details for specific instructions relating to ssh authentication on target operating system. There are many different \*Nix based distributions some of which have their own unique way of doing things. For this reason we cannot guarantee that these SSH instructions will work in every case.
:::
