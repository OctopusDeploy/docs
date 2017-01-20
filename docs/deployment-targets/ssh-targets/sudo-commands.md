---
title: Sudo Commands
position: 2
---


By default, most distros will require the user to provide a password when executing a command with the security privileges of another user. This behavior takes place typically when a user wishes to execute some command as the superuser or root by using the `sudo` command.


By its very nature, the scripts run by the Octopus Deploy run in the background without any opportunity for a password prompt and so executing an innocuous sudo command such as


> sudo echo "I HAVE THE POWER"



will result in the script failing with `exit code 1` and the message to stderr


> sudo: no tty present and no askpass program specified



in Ubuntu, and


> sudo: sorry you must have a tty to run sudo



in Red Hat

## Enabling Sudo command


The recommended way to enable these commands to be run is to disable the password prompt for the user account used for deployments.

### Disable Password Prompt


Running the following command (from a shell with interactive mode so you can enter any required passwords) adds a file that is read conjunction with the sudoers file to configure valid sudo policies.


> sudo visudo -f /etc/sudoers.d/octopus



add the following line to this file, substituting `<username>` with the appropriate user used by the Octopus Deploy.


> <username\> ALL=(ALL) NOPASSWD:ALL



further information regarding how this file is used and how to make the configuration more precise can be found at the following links.

- [visudo manual](http://www.sudo.ws/man/1.8.13/visudo.man.html)


- [sudoers manual](http://www.sudo.ws/man/1.8.13/sudoers.man.html)


- [simple configuration explanation](http://superuser.com/questions/357467/what-do-the-alls-in-the-line-admin-all-all-all-in-ubuntus-etc-sudoers#357472)



If you are using a distro such as Ubuntu, you should now be able to utilize the sudo command throughout your scripts.


Some distros however, such as Centos and its derivatives, require the following further steps to be taken.




### Disble RequireTTY


Although the sudo may no longer require a password, some distros are configured by default to still require interactive input, or tty, when running sudo.


To disable this, edit your `/etc/sudoers` file and change the line


> Defaults: requiretty



to


> Defaults: !requiretty



Alternatively you can make this configuration more precice by targeting specific users or groups as outlined at [How to disable requiretty for a single command in sudoers](http://docs.octopusdeploy.com/(http:/unix.stackexchange.com/questions/79960/how-to-disable-requiretty-for-a-single-command-in-sudoers)?.
(By default the Ubuntu does not contain this configuration and this modification should not be required)




:::problem
**Be selective with permissions**
Ideally your Octopus Deploy ssh endpoint should be configured with a special user user solely for the purposes of running deployments. In this case you should consider configuring just that user's sudo capabilities to be limited to those commands needed to execute the deployment scripts.
:::

:::warning
**Different distributions use different conventions**
While the above instructions should work on common platforms like Ubuntu or RedHat, you may need to double check the details for specific instructions relating to ssh authentication on target operating system. There are many different \*Nix based distributions some of which have their own unique way of doing things. For this reason we cannot guarantee that these instructions will work in every case.
:::
