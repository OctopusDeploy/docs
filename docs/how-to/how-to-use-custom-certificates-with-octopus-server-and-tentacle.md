---
title: How to use custom certificates with Octopus Server and Tentacle
position: 19
---

Octopus uses self-signed certificates to securely communicate between tentacles and the server. However, if you have a requirement to use your own certificates, you can use the import-certificate command to import your own certificate.  Octopus Server has supported the import-certificate command as of Octopus 3.2.9 and Tentacle has always supported it.  The import command supports importing certificates in the Personal Information Exchange (PFX) files with an optional password.  Octopus requires PFX files contain the certificate private key.

For more information on self-signed certificates, see the [blog post](https://octopusdeploy.com/blog/why-self-signed-certificates) on the topic.

:::warning
**Updating an existing Octopus server or Tentacle**
It's important to consider the impact of updating an existing Octopus server or Tentacle as changes are required to ensure each component trusts the other. Read the information below carefully.
:::

## Configuring Octopus Server to use custom certificates {#HowtousecustomcertificateswithOctopusServerandTentacle-ConfiguringOctopusServertousecustomcertificates}

This assumes you have already installed Octopus on the target server.

1. Stop the OctopusDeploy service on the target Octopus server you wish to update.
2. Execute the following statement at a command line on the same server.  Note that the password is optional.  asdf

```powershell
Octopus.Server.exe import-certificate --from-file="C:\PathToCertificate\cert.pfx" --pfx-password="Password" --console
```
    This should display something like the following.

```powershell
Octopus Deploy: Server version 3.2.x
Importing the certificate stored in PFX file in C:\Temp\cert.pfx using the provided password...
The certificate CN=OctopusServer was regenerated; old thumbprint = F1D30DE16AFBA30CB8FD20070856EECC15DDF06C, 
new thumbprint = 1EA1B432478117393C8BA435FD42727C0E87445C
Certificate imported successfully.
```
3. Restart the OctopusDeploy service.
4. The next step is to update all the associated Tentacles to trust the new certificate.  This is done by stopping the Tentacle service you wish to update and then executing the following statetment with the new thumbprint from the step above.  Finally, restart the tentacle service.

```powershell
Tentacle.exe configure --trust NewOctopusServerCertificateThumbprint --console
```

## Configuring Tentacle to use custom certificates {#HowtousecustomcertificateswithOctopusServerandTentacle-ConfiguringTentacletousecustomcertificates}

This assumes you have already installed a Tentacle on the target server.

1. Stop the Tentacle service on the target server you wish to update.
2. Execute the following statement at a command line on the same server.

```powershell
tentacle.exe import-certificate --from-file="C:\PathToCertificate\cert.pfx" --pfx-password="Password" --console
```
    This should display something like the following.

```powershell
Octopus Deploy: Tentacle version 3.2.x
Importing the certificate stored in PFX file in C:\Temp\OctopusTentacle.pfx using the provided password...
Certificate with thumbprint DE010ABF6FF8ED1B7895A31F005B8D88A3329867 imported successfully.
```

:::hint
**Letting the Tentacle regenerate its own certificate**
If you have come from an earlier version of Octopus with a shorter security key, or just want the Tentacle to use a new certificate without having to generate one yourself, you can follow these steps in this section but substitute the command in step 2, with the following

```powershell
tentacle.exe new-certificate
```

The command will then return

```powershell
Octopus Deploy: Tentacle version 3.2.x
A new certificate has been generated and installed. Thumbprint:
DE010ABF6FF8ED1B7895A31F005B8D88A3329867
```

continue with the following steps to ensure the Octopus Server recognises this new thumbprint.
:::
3. Restart the Tentacle service.
4. Execute the following command to display the updated thumbprint.

```powershell
Tentacle.exe show-thumbprint
```
    This should display something like the following.

```powershell
Octopus Deploy: Tentacle version 3.2.x
The thumbprint of this Tentacle is: DE010ABF6FF8ED1B7895A31F005B8D88A3329867
```
5. Open the Octopus web portal and select to the Tentacle on the Environments Page.
6. Update the Tentacle thumbprint to use the value from Step 4 above and click the save button.  
![](/docs/images/3049117/3278508.png "width=500")
7. Select the Connectivity tab and then click Check health to verify the connection is working.  If it's not, double check the Octopus Server and Tentacle thumbprints to ensure their correct.
