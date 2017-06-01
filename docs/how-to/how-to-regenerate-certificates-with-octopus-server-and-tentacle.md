---
title: How to regenerate certificates with Octopus Server and Tentacle
description: How to regenerate the certificates used for communication between Octopus Server and its Tentacles.
position: 19
version: "[3.14,)"
---

Octopus uses self-signed certificates to securely communicate between Tentacles and the Server. Prior to Octopus 3.14, the certificates were SHA1, and following the [shattered](https://octopus.com/blog/shattered) exploit, the certificate generation was upgraded to SHA256. This guide walks through the process of regenerating certificates to use the new algorithm. This is not only useful for upgrading from SHA1 to SHA256, but also if you want to rotate certificates.
For more information on why Octopus uses self-signed certificates, please see the [blog post](https://octopusdeploy.com/blog/why-self-signed-certificates) on the topic.

You can view the algorithm used by the Server certificate on the {{Configuration,Certificates}} page. If the algorithm contains `sha1`, we recommend regenerating your certificate.

:::warning
**Updating an existing Octopus server or Tentacle**
It's important to consider the impact of updating an existing Octopus server or Tentacle as changes are required to ensure each component trusts the other. If there is a mismatch between the certificate and the expected thumbprint, communication between the components will not be possible and must be resolved manually. Read the information below carefully.
:::

## Configuring Octopus Server to use a new certificate {#ConfiguringOctopusServerToUseANewCertificate}

At a high level, changing the certificate on an Octopus Server involves the following steps:

* backup your existing certificate
* generate a new certificate to a file
* make the Tentacles trust the new certificate
* replace the certificate on the server
* remove the old trusted certificate from the Tentacles

:::hint
At present, this process is more manual than we would prefer, and we are aiming to improve this process over time.
:::

1. Backup your existing certificate by executing the following statement at an elevated command line on the server, from the directory containing the Octopus binaries:

```plaintext
Octopus.Server.exe export-certificate --instance OctopusServer --export-pfx="C:\PathToCertificate\oldcert.pfx" --pfx-password MySecretPassword --console
```

This should display something like the following:

```plaintext
Octopus Deploy: Server version 3.14.x instance OctopusServer
...
Exporting certificate...
...
The certificate has been written to C:\PathToCertificate\oldcert.pfx.
```

Save this certificate somewhere secure.

:::hint
If you see a warning message about `The X509 certificate CN=Octopus Portal was loaded but the private key was not loaded.`, you are most likely not running with elevated permissions. 
:::

2. Execute the following statement at a command line on the same server:

```plaintext
Octopus.Server.exe new-certificate --instance OctopusServer --export-pfx="C:\PathToCertificate\newcert.pfx" --pfx-password MySecretPassword --console
```

This should display something like the following:

```plaintext
Octopus Deploy: Server version 3.14.x instance OctopusServer
...
Generating certificate...
...
The Octopus Server currently uses a certificate with thumbprint:
B2F3A3E9978AbD621AFB0116BE6F0B63235552BD
A new certificate has been generated with thumbprint:
1EC602C5D0621C06E2F209A918761DDAC020A5B5
The new certificate has been written to C:\PathToCertificate\newcert.pfx.
```

Take a note of the thumbprint of the new certificate (`1EC602C5D0621C06E2F209A918761DDAC020A5B5` in the output above). We will use this thumbprint when we update the Tentacles to trust the new certificate.

3. The next step is to update all the associated Tentacles to trust the new certificate. At present, this functionality is not exposed in the UI; it has to be done via the api. 

First, determine the machine id's of the Tentacle's you wish to update. The easiest way to do this is get a list of all machines attached to your Octopus Server by going to <https://octopus.example.com/api/machines/all> and get the "id" property from each relevant machine.

Once you have this list, use the following powershell to target those specific machines:

```powershell
$OctopusURI = "https://octopus.example.com"
$OctopusAPIKey = "API-123456789ABCDEF"

Add-Type -Path "C:\Program Files\Octopus Deploy\Octopus\Octopus.Client.dll"

$endpoint = new-object Octopus.Client.OctopusServerEndpoint $OctopusURI, $OctopusAPIKey
$repository = new-object Octopus.Client.OctopusRepository $endpoint

$header = @{ "X-Octopus-ApiKey" = $OctopusAPIKey }

$body = @{
    Name = "TentacleAddTrust"
    Description = "Add trusted thumbprint to Tentacle(s)"
    Arguments = @{
        MachineIds = @("Machines-1", "Machines-2");
        Thumbprint = "<thumbprint>"
    }
} | ConvertTo-Json


Invoke-RestMethod $OctopusURI/api/tasks -Method Post -Body $body -Headers $header
```

View the execution status of this task under {{Tasks}}.

4. Now that the Tentacles all trust the new certificate, we can update the Server certificate to the new one we created earlier. In the command prompt run:

```plaintext
Octopus.Server.exe import-certificate --instance OctopusServer --from-file="C:\PathToCertificate\newcert.pfx" --pfx-password MySecretPassword --console
Octopus.Server.exe service --instance OctopusServer --stop --start --console
```

This should display something like the following:

```plaintext
Octopus Deploy: Server version 3.14.x instance OctopusServer
...
Importing the certificate stored in C:\PathToCertificate\newcert.pfx...
...
The certificate CN=Octopus Portal was updated; old thumbprint = B2F3A3E9978AbD621AFB0116BE6F0B63235552BD, new thumbprint = 1EC602C5D0621C06E2F209A918761DDAC020A5B5
Certificate imported successfully.
```

5. Run a healthcheck on the associated Tentacles and confirm they are all healthy.

6. Now we are trusting the new certificate, we can now stop the Tentacles trusting the old certificate. Again, this can be done manually on the Tentacle:

```powershell
C:\Program Files\OctopusDeploy\Tentacle\Tentacle.exe configure --instance Tentacle --remove-trust <oldthumbprint> --console
C:\Program Files\OctopusDeploy\Tentacle\Tentacle.exe service --instance Tentacle --stop --start --console
```

Or it can be done via an Octopus task. Using the list of machine id's we obtained earlier, submit a task:

```powershell
$OctopusURI = "https://octopus.example.com"
$OctopusAPIKey = "API-123456789ABCDEF"

Add-Type -Path "C:\Program Files\Octopus Deploy\Octopus\Octopus.Client.dll"

$endpoint = new-object Octopus.Client.OctopusServerEndpoint $OctopusURI, $OctopusAPIKey
$repository = new-object Octopus.Client.OctopusRepository $endpoint

$header = @{ "X-Octopus-ApiKey" = $OctopusAPIKey }

$body = @{
    Name = "TentacleRemoveTrust"
    Description = "Remove trusted thumbprint from Tentacle(s)"
    Arguments = @{
        MachineIds = @("Machines-1", "Machines-2");
        Thumbprint = "<thumbprint>"
    }
} | ConvertTo-Json


Invoke-RestMethod $OctopusURI/api/tasks -Method Post -Body $body -Headers $header
```

7. Run a healthcheck, and confirm all Tentacles are healthy.

8. Confirm on the {{Configuration,Certificates}} page that the new certificate is using the `sha256` algorithm.

## Configuring a Tentacle a new certificate {#ConfiguringATentacleToUseANewCertificate}

To update the certificate that is used by a Tentacle, you need to submit a task via powershell to the Octopus Server.
First, determine the id of the machine(s) you wish to update, by visiting <https://octopus.example.com/api/machines/all> on your server, and getting the `id` property for each relevant machine.

Once you have this, submit a task using the following powershell:

```powershell
$OctopusURI = "https://octopus.example.com"
$OctopusAPIKey = "API-123456789ABCDEF"

Add-Type -Path "C:\Program Files\Octopus Deploy\Octopus\Octopus.Client.dll"

$endpoint = new-object Octopus.Client.OctopusServerEndpoint $OctopusURI, $OctopusAPIKey
$repository = new-object Octopus.Client.OctopusRepository $endpoint

$header = @{ "X-Octopus-ApiKey" = $OctopusAPIKey }

$body = @{
    Name = "TentacleRegenerateCertificate"
    Description = "Regenerate tentacle certificate"
    Arguments = @{
        MachineIds = @("Machines-1", "Machines-21")
    }
} | ConvertTo-Json

Invoke-RestMethod $OctopusURI/api/tasks -Method Post -Body $body -Headers $header
```

This will ask the Tentacle to generate a new certificate, and then update the trusted thumbprint on the Octopus Server.

View the execution status of this task under {{Tasks}}.

Once complete, we recommend running a healthcheck to confirm everything is healthy.
