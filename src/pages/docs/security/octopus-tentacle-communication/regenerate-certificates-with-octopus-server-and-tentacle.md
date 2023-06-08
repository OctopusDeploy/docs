---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: How to regenerate certificates with Octopus Server and Tentacle
description: How to regenerate the certificates used for communication between Octopus Server and its Tentacles.
navOrder: 2
---

Octopus uses self-signed certificates to securely communicate between Tentacles and the Octopus Server. Prior to Octopus 3.14, the certificates were SHA1, and following the [shattered](https://octopus.com/blog/shattered) exploit, the certificate generation was upgraded to SHA256. 

This guide walks through the process of regenerating certificates to use the new algorithm. This is useful for upgrading from SHA1 to SHA256, and if you want to rotate certificates.

For more information on why Octopus uses self-signed certificates, please see the blog post [Why Octopus uses self-signed certificates](https://octopusdeploy.com/blog/why-self-signed-certificates).

You can view the algorithm used by the Server certificate on the **Configuration ➜ Thumbprint** page. If the algorithm contains `sha1`, we recommend regenerating your certificate.

:::div{.warning}
**Updating an existing Octopus Server or Tentacle**
It's important to consider the impact of updating an existing Octopus Server or Tentacle as changes are required to ensure each component trusts the other. If there is a mismatch between the certificate and the expected thumbprint, communication between the components will not be possible and must be resolved manually. Read the information below carefully.
:::

## Configuring Octopus Server to use a new certificate {#ConfiguringOctopusServerToUseANewCertificate}

At a high level, changing the certificate on an Octopus Server involves the following steps:

* Backup your existing certificate.
* Generate a new certificate to a file.
* Make the Tentacles trust the new certificate.
* Replace the certificate on the Octopus Server.
* Remove the old trusted certificate from the Tentacles.

:::div{.hint}
At present, this process is more manual than we would prefer, and we are aiming to improve this process over time.
:::

1. Backup your existing certificate by executing the following statement at an elevated command-line on the server, from the directory where Octopus Deploy is installed (`C:\Program Files\Octopus Deploy\Octopus` by default):

<details data-group="regenerate-certificate-configure-new">
<summary>Windows</summary>

```powershell
Octopus.Server.exe export-certificate --instance OctopusServer --export-pfx="C:\PathToCertificate\oldcert.pfx" --pfx-password MySecretPassword
```

</details>
<details data-group="regenerate-certificate-configure-new">
<summary>Linux</summary>

```bash Linux
./Octopus.Server export-certificate --instance OctopusServer --export-pfx="/tmp/oldcert.pfx" --pfx-password MySecretPassword
```

</details>

This will display output similar to the following:

```
Checking the Octopus Master Key has been configured.
...
Exporting certificate...
The certificate has been written to C:\PathToCertificate\oldcert.pfx.
```

Save this certificate and the specified password somewhere secure.

:::div{.hint}
If you see a warning message about `The X509 certificate CN=Octopus Portal was loaded but the private key was not loaded.`, you are most likely not running with elevated permissions. 
:::

2. Execute the following statement at a command-line on the same server:

<details data-group="regenerate-certificate-export-pfx">
<summary>Windows</summary>

```powershell
Octopus.Server.exe new-certificate --instance OctopusServer --export-pfx="C:\PathToCertificate\newcert.pfx" --pfx-password MySecretPassword
```

</details>
<details data-group="regenerate-certificate-export-pfx">
<summary>Linux</summary>

```bash
./Octopus.Server new-certificate --instance OctopusServer --export-pfx="/tmp/newcert.pfx" --pfx-password MySecretPassword
```

</details>

This will display output similar to the following:

```
Checking the Octopus Master Key has been configured.
...
Generating certificate...
The Octopus Server currently uses a certificate with thumbprint:
1111111111111111111111111111111111111111
A new certificate has been generated with thumbprint:
1234567890123456789012345678901234567890
The new certificate has been written to C:\PathToCertificate\newcert.pfx.
```

Take a note of the thumbprint of the new certificate (`1234567890123456789012345678901234567890` in the output above). We will use this thumbprint when we update the Tentacles to trust the new certificate.

3. The next step is to update all of the Tentacles to trust the new certificate. At present, this functionality is not exposed in the UI; it has to be done via the command-line. 

On each Tentacle machine, execute the following command to trust the thumbprint of the newly-created certificate in the directory that the Tentacle agent is installed (`C:\Program Files\OctopusDeploy\Tentacle\` by default):

<details data-group="regenerate-certificate-tentacle-trust">
<summary>Windows</summary>

```powershell
Tentacle.exe configure --trust="1234567890123456789012345678901234567890"
```

</details>
<details data-group="regenerate-certificate-tentacle-trust">
<summary>Linux</summary>

```bash
./Tentacle configure --trust="1234567890123456789012345678901234567890"
```

</details>

This will display output similar to the following:

```
Adding 1 trusted Octopus Servers
These changes require a restart of the Tentacle.
```

You will need to restart each Tentacle at this point: 

<details data-group="regenerate-certificate-restart-tentacle">
<summary>Windows</summary>

```powershell
tentacle.exe service --restart
```

</details>
<details data-group="regenerate-certificate-restart-tentacle">
<summary>Linux</summary>

```bash
./Tentacle service --restart
```

</details>

4. Now that the Tentacles all trust the new certificate, we can update the Octopus Server certificate to the new one we created earlier. In the command prompt on the Octopus Server run:

<details data-group="regenerate-certificate-update-server">
<summary>Windows</summary>

```powershell
Octopus.Server.exe import-certificate --instance OctopusServer --from-file="C:\PathToCertificate\newcert.pfx" --pfx-password MySecretPassword
Octopus.Server.exe service --instance OctopusServer --restart
```

</details>
<details data-group="regenerate-certificate-update-server">
<summary>Linux</summary>

```bash
./Octopus.Server import-certificate --instance OctopusServer --from-file="/tmp/newcert.pfx" --pfx-password MySecretPassword
./Octopus.Server service --instance OctopusServer --restart
```

</details>

This will display something like the following:

```
Importing the certificate stored in PFX file in C:\PathToCertificate\newcert.pfx using the provided password...
Checking the Octopus Master Key has been configured.
...
The certificate CN=Octopus Portal was updated; old thumbprint = 1111111111111111111111111111111111111111, new thumbprint = 1234567890123456789012345678901234567890
Certificate imported successfully.
These changes require a restart of the Octopus Server.
```

5. Run a healthcheck on the associated Tentacles and confirm they are all healthy.

6. Now we are trusting the new certificate, we can now stop the Tentacles trusting the old certificate. On each of the Tentacle machines run:

<details data-group="regenerate-certificate-remove-trust">
<summary>Windows</summary>

```powershell
C:\Program Files\OctopusDeploy\Tentacle\Tentacle.exe configure --instance Tentacle --remove-trust <oldthumbprint>
C:\Program Files\OctopusDeploy\Tentacle\Tentacle.exe service --instance Tentacle --restart
```

</details>
<details data-group="regenerate-certificate-remove-trust">
<summary>Linux</summary>

```bash
./Tentacle configure --instance Tentacle --remove-trust <oldthumbprint>
./Tentacle service --instance Tentacle --restart
```

</details>

7. Run a healthcheck, and confirm all Tentacles are healthy.

8. Confirm on the **Configuration ➜ Thumbprint** page that the new certificate is using the `sha256` algorithm.

## Configuring a Tentacle to use a new certificate {#ConfiguringATentacleToUseANewCertificate}

1. To update the certificate that is used by a Tentacle, run the following commands on the Tentacle machine:

<details data-group="regenerate-certificate-update-tentacle-certificate">
<summary>Windows</summary>

```powershell
C:\Program Files\OctopusDeploy\Tentacle\Tentacle.exe new-certificate
C:\Program Files\OctopusDeploy\Tentacle\Tentacle.exe service --restart
```

</details>
<details data-group="regenerate-certificate-update-tentacle-certificate">
<summary>Linux</summary>

```bash
./Tentacle new-certificate
./Tentacle service --restart
```

</details>

2. After this is generated on the Tentacle, it can be updated on the Octopus Server. Navigate to **Infrastructure ➜ Deployment Targets** and update the Thumbprint for the updated target.
