---
title: Username/Password
description: Username and Password Accounts allow you securely authenticate with different services.
position: 40
---

A Username/Password account can be used to connect [SSH Targets](/docs/infrastructure/deployment-targets/ssh-targets/index.md) and services like Google Cloud Platform if you are using the [Kubernetes](/docs/deployment-examples/kubernetes-deployments/index.md) functionality in Octopus.

## Enabling Username & Password Authentication on Linux {#UsernameandPassword-EnablingUsername&amp;PasswordAuthentication}

Depending on your SSH target machine's distribution you may need to enable password authentication.

To allow the Octopus server to connect using the provided credentials you the will need to modify the sshd\_config file on the target machine:

1. Open the /etc/ssh/sshd_config file.
1. Find the line that contains: `PasswordAuthentication` and change it to: `PasswordAuthentication yes`.
1. Restart the SSH service under root privileges: `service ssh restart`.

If you experience problems connecting, it may help to try connect directly to the target machine using these credentials though a client like putty. This will help eliminate any network related problems with your Octopus configuration.

:::warning
**Different Distributions use Different Conventions**
While the above instructions should work on common platforms like Ubuntu or Red Hat, you may need to double check the details for specific instructions relating to SSH authentication on target operating system. There are many different \*Nix based distributions, and some of these have their own unique way of doing things. For this reason we cannot guarantee that these SSH instructions will work in every case.
:::

## Create a Username and Password Account {#UsernameandPassword-Creatingtheaccount}

1. Navigate to {{infrastructure,Accounts}} and click **ADD ACCOUNT**.
1. Select **Username/Password** from the dropdown menu.
1. Give the account a name, for instance, **SSH backup server** or **Google**.
1. Add a description.
1. Add the username and password you use to authenticate against the remote host.
1. If you want to restrict which environments can use the account, select those environments. If you select no environments, all environments will be allowed to use the account.
1. Click **SAVE**.
