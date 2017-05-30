---
title: How to regenerate certificates with Octopus Server and Tentacle
description: How to regenerate the certificates used for communication between Octopus Server and its Tentacle.
position: 19
version: "[3.14,)"
---

Octopus uses self-signed certificates to securely communicate between Tentacles and the server. Prior to Octopus 3.14, the certificates were SHA1, and following the [shattered](https://octopus.com/blog/shattered) exploit, the certificate generation was upgraded to SHA256. This guide walks through the process of regenerating certificates to use the new algorithm. This is not only useful for upgrading from SHA1 to SHA256, but also if you want to rotate certificates.
For more information on self-signed certificates, see the [blog post](https://octopusdeploy.com/blog/why-self-signed-certificates) on the topic.

You can view the algorithm used by the Server certificate on the {{Configuration,Certificates}} page. If the algorithm contains `sha1`, we recommend regenerating your certificate.

:::warning
**Updating an existing Octopus server or Tentacle**
It's important to consider the impact of updating an existing Octopus server or Tentacle as changes are required to ensure each component trusts the other. Read the information below carefully.
:::

## Configuring Octopus Server to use a new certificate {#ConfiguringOctopusServerToUseANewCertificate}

This assumes you have already installed Octopus on the target server.

1. Backup your existing certificate by executing the following statement at an elevated command line on the server, from the directory containing the Octopus binaries:

```powershell
Octopus.Server.exe export-certificate --instance OctopusServer --export-file="C:\PathToCertificate\oldcert.txt" --console
```

This should display something like the following:

```powershell
Octopus Deploy: Server version 3.14.x instance OctopusServer
...
Exporting certificate...
...
The certificate has been written to C:\PathToCertificate\oldcert.txt.
```

Save this certificate somewhere secure.

:::hint
If you see a warning message about `The X509 certificate CN=Octopus Portal was loaded but the private key was not loaded.`, you are most likely not running with elevated permissions. 
:::

2. Execute the following statement at a command line on the same server:

```powershell
Octopus.Server.exe new-certificate --instance OctopusServer --export-file="C:\PathToCertificate\newcert.txt" --console
```

This should display something like the following:

```powershell
Octopus Deploy: Server version 3.14.x instance OctopusServer
...
Generating certificate...
...
The Octopus Server currently uses a certificate with thumbprint:
B2F3A3E9978AbD621AFB0116BE6F0B63235552BD
A new certificate has been generated with thumbprint:
1EC602C5D0621C06E2F209A918761DDAC020A5B5
The new certificate has been written to C:\PathToCertificate\newcert.txt.
```

Take a note of the thumbprint of the new certificate (`1EC602C5D0621C06E2F209A918761DDAC020A5B5` in the output above). We will use this thumbprint when we update the Tentacles to trust the new certificate.

3. The next step is to update all the associated Tentacles to trust the new certificate. The easiest way to do this is by running the following commands in the [Script Console](/docs/administration/script-console.md):

```powershell
C:\Program Files\OctopusDeploy\Tentacle\Tentacle.exe configure --instance Tentacle --trust <thumbprint> --console
C:\Program Files\OctopusDeploy\Tentacle\Tentacle.exe service --instance Tentacle --stop --start --console
```

:::note
Note: this will appear to fail, as the Tentacle service disconnects when it restarts. This is expected.
:::

4. Run a healthcheck on the associated Tentacles and check they return to healthy.

5. Now that the Tentacles all trust the new certificate, we can update the Server certificate to the new one we created earlier. In the command prompt run:

```powershell
Octopus.Server.exe import-certificate --instance OctopusServer --from-file="C:\PathToCertificate\newcert.txt" --console
Octopus.Server.exe service --instance OctopusServer --stop --start --console
```

This should display something like the following:

```powershell
Octopus Deploy: Server version 3.14.x instance OctopusServer
...
Importing the certificate stored in C:\PathToCertificate\newcert.txt...
...
The certificate CN=Octopus Portal was updated; old thumbprint = B2F3A3E9978AbD621AFB0116BE6F0B63235552BD, new thumbprint = 1EC602C5D0621C06E2F209A918761DDAC020A5B5
Certificate imported successfully.
```

6. Run a healthcheck on the associated Tentacles and confirm they are all healthy.

7. Now we are trusting the new certificate, we can now stop the Tentacles trusting the old certificate. In the script console:

```powershell
C:\Program Files\OctopusDeploy\Tentacle\Tentacle.exe configure --instance Tentacle --remove-trust <oldthumbprint> --console
C:\Program Files\OctopusDeploy\Tentacle\Tentacle.exe service --instance Tentacle --stop --start --console
```
:::note
Note: this will appear to fail, as the Tentacle service disconnects when it restarts. This is expected.
:::

8. Run a healthcheck again, and confirm all Tentacles are healthy.

9. Confirm on the {{Configuration,Certificates}} page that the new certificate is using the `sha256` algorithm.
