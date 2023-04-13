---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: SSH key pair account
description: SSH key pair accounts allow you to securely authenticate with SSH targets.
navOrder: 40
---

An SSH key pair account is one of the more secure authentication methods available for connections to [SSH Targets](/docs/infrastructure/deployment-targets/linux/ssh-target/).

## Creating an SSH key pair  {#SSHKeyPair-CreatingaSSHKeyPaircreate-key-pair}

Before you can configure the SSH key pair account in Octopus, you need to generate public and private keys. This can be done on either the [Linux target](#SSHKeyPair-Linux) or the [Octopus Server](#SSHKeyPair-Windows).

### Generating a key pair on Linux {#SSHKeyPair-Linux}

:::hint
From **Octopus 2021.1.7466**, Octopus supports newer ED25519 SSH keys. For older versions, and legacy compatibility, please follow the RSA instructions.
:::

1. Run the following command on your Linux server:
```bash ED25519
ssh-keygen -t ed25519
```
```bash RSA
ssh-keygen -t rsa -m PEM
```
This will bring up an interactive dialog, prompting for:
1. The folder that the generated will be placed, defaulting to `~/.ssh/id_ed25519` or `~/.ssh/id_rsa`, depending on your selection above.
1. Enter a passphrase (or press enter for no passphrase).
1. If you entered a passphrase, re-enter the passphrase.

You now have two files:
- `id_ed25519` or `id_rsa` (the private key)
- `id_ed25519.pub` or `id_rsa.pub` (the public key)

The public key will be stored on this (the Linux) server and the private key will be copied to the Octopus Server.

5. Copy the public key to the `authorized_keys` file that is used during authentication:

```bash ED25519
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
```
```bash RSA
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

6. Modify the permissions of the `authorized_keys` file:

```bash
chmod 600 ~/.ssh/authorized_keys
```

7. Copy the private key to the machine your Octopus Server is installed on.

Proceed to [creating the the SSH key pair account](#SSHKeyPair-Creatingtheaccount).

If you need more information about generating an SSH key pair, see the [useful links section](#SSHKeyPair-UsefulLinks).

### Generating a key pair on Windows {#SSHKeyPair-Windows}

The easiest way to generate valid keys on windows is to use a tool like[ PuTTYgen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html). Start by clicking "Generate" and wait for the tool to finish creating the random key pair.

![](/docs/infrastructure/accounts/ssh-key-create-putty.png "width=400")

Provide your passphrase if desired and export the private key to the accepted format by going to **{{Conversions,Export OpenSSH Key}}**.  Clicking "Save private key" will actually produce a file that, while it can be used by this tool again, is not compatible with the standard SSH process. To get the public key over to the server you can either click "Save public key", copy the file across to the server and add the key to `~/.ssh/authorized_keys` as outlined above, or just cut+paste the content from the textbox directly into the remote file.

If you need more information about generating an SSH key pair, see the [useful links section](#SSHKeyPair-UsefulLinks).

## Creating the SSH key pair account {#SSHKeyPair-Creatingtheaccount}

1. Navigate to **{{infrastructure,Accounts}}** and click **ADD ACCOUNT**.
1. Select **SSH key pair** from the drop-down menu.
1. Give the account a name so you can easily identify it when you need to use the account.
1. Add a description.
1. Enter the username you will use to access the remote host.
1. Upload the private key to the Octopus Server.
1. Enter the passphrase for the private key if you created one.
1. If you want to restrict which environments can use the account, select only the environments that are allowed to account. If you don't select any environments, all environments will be allowed to use the account.
1. Click **SAVE**.

The account is now ready to be used when you configure your [SSH deployment target](/docs/infrastructure/deployment-targets/linux/ssh-target/).

The server will confirm that this private key matches its public key at the start of each SSH connection.

If you are storing the private key on disk it is recommended, but not mandatory, that you encrypt the key.

## Useful links {#SSHKeyPair-UsefulLinks}

Due to the number and configurable nature of the various Linux distributions available, there are other dedicated sites that can provide more precise information & tutorials for your specific use case.

- [PuTTY download page](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) has several useful Windows tools.
- [ssh-keygen man page](https://linux.die.net/man/1/ssh-keygen).
- [sshd\_config man page (Ubuntu)](http://manpages.ubuntu.com/manpages/hirsute/en/man5/sshd_config.5.html).
- Great intro SSH keygen articles from [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2), [GitHub](https://help.github.com/articles/connecting-to-github-with-ssh/) or [Atlassian](https://confluence.atlassian.com/display/STASH/Creating+SSH+keys).

## Learn more

- [Linux blog posts](https://octopus.com/blog/tag/linux)
