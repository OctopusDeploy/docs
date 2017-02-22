---
title: Export and import Tentacle certificates without a profile
description: How to export and import Tentacle certificates without a profile.
position: 8
---

When the Tentacle agent is configured, the default behavior is to generate a new X.509 certificate. When automating the provisioning of Tentacles on a machine, however, you may run into problems when trying to generate a certificate when running as a user without a profile loaded. This occurs commonly when running via PowerShell remoting, or trying to [automate Tentacle setup](/docs/installation/installing-tentacles/automating-tentacle-installation.md).

A simple workaround is to generate a certificate on one machine (such as your workstation), export it to a file, and then import that certificate when provisioning Tentacles.

## Generating and exporting a certificate {#ExportandimportTentaclecertificateswithoutaprofile-Generatingandexportingacertificate}

First, [install the Tentacle agent](/docs/installation/installing-tentacles/index.md) on a computer, and run the following command:

```powershell
tentacle.exe new-certificate -e MyFile.txt
```

The output file will now contain a base-64 encoded version of a PKCS#12 export of the X.509 certificate and corresponding private key. This file is now ready to be used in your setup scripts.

## Importing a certificate {#ExportandimportTentaclecertificateswithoutaprofile-Importingacertificate}

When [automatically provisioning your Tentacle](/docs/installation/installing-tentacles/automating-tentacle-installation.md), the commands typically look something like this:

```powershell
Tentacle.exe create-instance --instance "Tentacle" --config "C:\Octopus\Tentacle\Tentacle.config" --console
Tentacle.exe new-certificate --instance "Tentacle" --console
Tentacle.exe configure --instance "Tentacle" --home "C:\Octopus" --console
...
```

Instead, replace the `new-certificate` command with `import-certificate`. For example:

```powershell
Tentacle.exe create-instance --instance "Tentacle" --config "C:\Octopus\Tentacle\Tentacle.config" --console
Tentacle.exe import-certificate --instance "Tentacle" -f MyFile.txt --console
Tentacle.exe configure --instance "Tentacle" --home "C:\Octopus" --console
...
```
