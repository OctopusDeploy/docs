---
title: Configuring SSH Connection
position: 2
---

Setting up a SSH target is a simple process and in many ways requires less steps than standard targets due its lack of need for a separate Tentacle installation.

Begin by clicking 'Add deployment target' from the environments page.

![](/docs/images/3048064/3277603.png "width=500")

Don't worry too much about which environment you do this through as you will be able to specify the correct environment later in the machine configuration page.

### Discovery {#ConfiguringSSHConnection-Discovery}

Select SSH Connection from the list of available targets. Notice that you then are prompted to enter the host name and port (defaulted to SSH standard 22) for discovery. This allows you to let Octopus attempt to perform the required protocol handshakes and obtain the remote endpoint's public key fingerprint automatically rather than have you enter it manually. This fingerprint is stored and verified by the server on all subsequent connections. If the endpoint is not yet available continue by entering the details manually.

![](/docs/images/3048064/3277605.png "width=500")

### Configuration {#ConfiguringSSHConnection-Configuration}

Just as with other targets, SSH Endpoints can be linked to environments and roles. Unlike conventional Tentacles however, the deployment target must be configured with a specific account that will allow the server to connect over the SSH protocol. We currently support [Key Pair](/docs/key-concepts/environments/accounts/ssh-key-pair.md) or [Username and Password](/docs/key-concepts/environments/accounts/username-and-password.md) as valid authentication methods which can be set up via the accounts area.

![](/docs/images/3048064/3277604.png "width=500")

If you didn't run the discovery process or the fingerprint on the target has changed for some reason, you can retrieve the correct fingerprint in a couple of ways. The first is to just let the health check take place. If the fingerprint returned during the handshake is different to whats been stored in the database, the new fingerprint will show up in the logs (Remember if you aren't expecting a change and you start getting this error it might mean you have been compromised!). The other way to get the fingerprint is directly off the machine itself. Running the following command will print out the fingerprint of the default key configured in your sshd\_config file.

**Finding the fingerprint**

```bash
ssh-keygen -lf /etc/ssh/ssh_host_rsa_key.pub | cut -d' ' -f2 | awk '{ print $1}'
```

:::success
**Don&#39;t forget to open your port!**
Remember to ensure that your target machine is accessible over the selected SSH port. This is usually port 22.
:::

When you complete the machine details and hit `Save`, Octopus will perform an initial health check. These health checks are done periodically or on demand and ensure that the endpoint is reachable and is appropriately configured, ready for performing a deployment task.

In the case of SSH endpoints this involves checking for the presence of Mono and Calamari, as well as providing details about available space and the user account used for connectivity. As SSH endpoints do not involve any actual Tentacle, the running version that is displayed will always indicate the version of the Octopus Server instance itself.

With the health check complete, you can continue to set up a deployment or run script tasks just like any other endpoint!
