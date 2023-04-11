---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Hardening an Ubuntu server
description: With Octopus Deploy you can harden an Ubuntu server as part of a routine operations task.
navOrder: 70
---

Hackers, viruses, worms, and malware, today's world needs constant vigilance in terms of security.  To that end, it is important to make sure that your server attack surface is as minimal as you can make it.  With a runbook, you can automate the security configuration of an Ubuntu server.  It is recommended that you review the guidelines from [CIS](https://www.cisecurity.org/benchmark/ubuntu_linux/) to ensure that your server is as secure as possible.

!include <security-disclaimer>

## Create the runbook

To create a runbook to harden your Ubuntu server:

1. From your project's overview page, navigate to **{{Operations, Runbooks}}**, and click **ADD RUNBOOK**.
1. Give the runbook a name and click **SAVE**.
1. Click **DEFINE YOUR RUNBOOK PROCESS**, and then click **ADD STEP**.
1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, select **Bash** and add the following code:

:::warning
The following script will make changes to the default installation of SSH and disables the root logon.  Please review carefully if you plan to implement.
:::

```bash
# Update repos
sudo apt-get update

# Upgrade existing packages to latest
sudo apt-get upgrade

# harden SSH - grab the Octopus project variable SSH_PORT
sudo cp /etc/ssh/sshd_config /etc/ssh/backup.sshd_config
SSH_PORT=$(get_octopusvariable "SSH_PORT")
sudo cat > /etc/ssh/sshd_config <<EOL
Port $SSH_PORT
Protocol 2
HostKey /etc/ssh/ssh_host_ed25519_key
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_dsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key
Ciphers aes128-ctr,aes192-ctr,aes256-ctr,aes128-gcm@openssh.com,aes256-gcm@openssh.com
macs umac-128-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,umac-128@openssh.com,hmac-sha2-256,hmac-sha2-512
KexAlgorithms curve25519-sha256@libssh.org,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group-exchange-sha256
SyslogFacility AUTH
ClientAliveCountMax 2
Compression no
LogLevel VERBOSE
MaxAuthTries 2
MaxSessions 2
LoginGraceTime 30
PermitRootLogin no
StrictModes yes
PubkeyAuthentication yes
IgnoreRhosts yes
HostbasedAuthentication no
PermitEmptyPasswords no
ChallengeResponseAuthentication no
PasswordAuthentication no
X11Forwarding no
AllowTcpForwarding no
AllowAgentForwarding no
PermitUserEnvironment no
X11DisplayOffset 10
PrintMotd no
PrintLastLog yes
TCPKeepAlive no
AcceptEnv LANG LC_*
Subsystem sftp /usr/lib/openssh/sftp-server
UsePAM yes
UseDNS no
MaxStartups 2
EOL

# Install fail2ban
sudo apt-get install fail2ban

# Create new user with sudo rights
newAdminUser=$(get_octopusvariable "AdminUser")
sudo adduser $newAdminUser
sudo usermod -aG sudo $newAdminUser
su - $newAdminUser

# Disable root login
sudo passwd -l root
```

The above script is a very basic hardening of Ubuntu.  Using the CIS guidelines, you could further harden the installation per your organizations requirements.

## Disabling weak TLS protocols {#disable-weak-tls-protocols}

To harden the TLS implementation used, review our documentation on [Disabling weak TLS protocols](/docs/security/hardening-octopus.md#disable-weak-tls-protocols).