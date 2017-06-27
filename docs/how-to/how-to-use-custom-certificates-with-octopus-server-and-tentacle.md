---
title: How to use custom certificates with Octopus Server and Tentacle
description: How to use custom certificates with Octopus Server and Tentacle.
position: 19
---

Octopus uses self-signed certificates to securely communicate between Tentacles and the server. However, if you have a requirement to use your own certificates, you can use the import-certificate command to import your own certificate.  Octopus Server has supported the import-certificate command as of Octopus 3.2.9 and Tentacle has always supported it.  The import command supports importing certificates in the Personal Information Exchange (PFX) files with an optional password.  Octopus requires PFX files contain the certificate private key.

For more information on self-signed certificates, see the [blog post](https://octopusdeploy.com/blog/why-self-signed-certificates) on the topic.

:::warning
**Updating an existing Octopus server or Tentacle**
It's important to consider the impact of updating an existing Octopus server or Tentacle as changes are required to ensure each component trusts the other. Read the information below carefully.
:::

## Configuring Octopus Server to use custom certificates {#HowtousecustomcertificateswithOctopusServerandTentacle-ConfiguringOctopusServertousecustomcertificates}

This assumes you have already installed Octopus on the target server.

1. Stop the OctopusDeploy service on the target Octopus server you wish to update.
2. Optionally export the current certificate as a backup, by executing the following statement at a command line on the same server.

```Batchfile
Octopus.Server.exe export-certificate --export-pfx="C:\PathToCertificate\cert.pfx" --pfx-password="Password" --console
```

3. Execute the following statement at a command line on the same server.  Note that the password is optional.

```Batchfile
Octopus.Server.exe import-certificate --from-file="C:\PathToCertificate\cert.pfx" --pfx-password="Password" --console
```

This should display something like the following.

```Batchfile
Octopus Deploy: Server version 3.14.x
Importing the certificate stored in PFX file in C:\PathToCertificate\cert.pfx using the provided password...
The certificate CN=OctopusServer was regenerated; old thumbprint = F1D30DE16AFBA30CB8FD20070856EECC15DDF06C,
new thumbprint = 1EA1B432478117393C8BA435FD42727C0E87445C
Certificate imported successfully.
```

:::hint
**Letting the Server regenerate its own certificate**
If you have come from an earlier version of Octopus with a shorter security key, or just want the Server to use a new certificate without having to generate one yourself, you can follow these steps in this section but substitute the command in step 2, with the following

```Batchfile
Octopus.Server.exe new-certificate --export-pfx="C:\PathToCertificate\cert.pfx" --pfx-password="Password" --console
```

The command will then return

```Batchfile
Octopus Deploy: Server version 3.14.x
Generating certificate...
The Octopus Server currently uses a certificate with thumbprint:
C7524763110D271520C15B6A50296200DA6DDCAA
A new certificate has been generated with thumbprint:
CF3B5562510A2DFCB95909878C1ADD7CCE50FE2B
The new certificate has been written to C:\PathToCertificate\cert.pfx.
```

Then import the new certificate (see step 2 above).
:::

3. Restart the OctopusDeploy service.
4. The next step is to update all the associated Tentacles to trust the new certificate.  This is done by stopping the Tentacle service you wish to update and then executing the following statement with the new thumbprint from the step above.  Finally, restart the Tentacle service.

```powershell
Tentacle.exe configure --trust NewOctopusServerCertificateThumbprint --console
```

## Configuring Tentacle to use custom certificates {#HowtousecustomcertificateswithOctopusServerandTentacle-ConfiguringTentacletousecustomcertificates}

This assumes you have already installed a Tentacle on the target server.

1. Stop the Tentacle service on the target server you wish to update.
2. Execute the following statement at a command line on the same server.

```Batchfile
tentacle.exe import-certificate --from-file="C:\PathToCertificate\cert.pfx" --pfx-password="Password" --console
```

This should display something like the following.

```Batchfile
Octopus Deploy: Tentacle version 3.14.x
Importing the certificate stored in PFX file in C:\PathToCertificate\cert.pfx using the provided password...
Certificate with thumbprint DE010ABF6FF8ED1B7895A31F005B8D88A3329867 imported successfully.
```

:::hint
**Letting the Tentacle regenerate its own certificate**
If you have come from an earlier version of Octopus with a shorter security key, or just want the Tentacle to use a new certificate without having to generate one yourself, you can follow these steps in this section but substitute the command in step 2, with the following

```Batchfile
tentacle.exe new-certificate --export-pfx="C:\PathToCertificate\cert.pfx" --pfx-password="Password" --console
```

The command will then return

```Batchfile
Octopus Deploy: Tentacle version 3.2.x
A new certificate has been generated and written to C:\PathToCertificate\cert.pfx. Thumbprint:
DE010ABF6FF8ED1B7895A31F005B8D88A3329867
```

Import the new certificate as above.
:::

3. Restart the Tentacle service.
4. Execute the following command to display the updated thumbprint.

```Batchfile
Tentacle.exe show-thumbprint
```

This should display something like the following.

```Batchfile
Octopus Deploy: Tentacle version 3.12.x
The thumbprint of this Tentacle is: DE010ABF6FF8ED1B7895A31F005B8D88A3329867
```

5. Open the Octopus web portal and select to the Tentacle on the Environments Page.
6. Update the Tentacle thumbprint to use the value from Step 4 above and click the save button.

![](/docs/images/3049117/3278508.png "width=500")

7. Select the Connectivity tab and then click Check health to verify the connection is working.  If it's not, double check the Octopus Server and Tentacle thumbprints to ensure their correct.
