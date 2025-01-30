---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-09
title: Troubleshooting invalid certificates
icon: fa-solid fa-lock
description: How to troubleshoot invalid certificates that won't load in Octopus Deploy
navOrder: 110
---

Some certificate generation libraries can generate certificates that are invalid. Some tools will allow you to work with them, and some won't.

Octopus Deploy uses a common certificate library called [Bouncy Castle](https://github.com/bcgit/bc-csharp) to parse and work with certificates. Recent versions of this have improved validation of certificates, which has, unfortunately, limited the usability of some certificates that don't strictly comply with the specification.

## Common errors:

### `failed to construct sequence from byte[]: extra data found after object` 

This error implies that the file being uploaded might be an SSH Key and not a valid certificate. Octopus only supports [SSH key pair accounts](/docs/infrastructure/accounts/ssh-key-pair) for securely authenticating with SSH targets.

### `PEM file must contain a certificate`

This error implies that the file being uploaded might be an SSH Key and not a valid certificate. Octopus only supports [SSH key pair accounts](/docs/infrastructure/accounts/ssh-key-pair) for securely authenticating with SSH targets.

### `corrupted stream detected malformed integer`

This error implies that a certificate violates the X.690 spec, section 8.3.2.

If you receive this error when creating a deployment, please review the certificate's variables on the project, and try to view each one in **Deploy ➜ Certificates**. One of them will either fail to load, or show the message: `Invalid Certificate: This certificate was unable to be parsed and may be in an invalid format`. Please modify any references to use a new, valid certificate, and use the REST API to delete the certificate in question.

This error may also appear on the variables page: `An error occurred on the mapping CertificateResource.CertificateDataFormat = Certificate.CertificateDataFormat [attempted value was (unknown)]: corrupted stream detected malformed integer`. Please review the certificates in  **Deploy ➜ Certificates** to find the invalid one, update any usages to use a new valid certificate, and delete the old certificate via the REST API.

Please see [BC-CSharp issue #156](https://github.com/bcgit/bc-csharp/issues/156) for further information.

If deleting the certificate is not an option, Bouncy Castle supports an environment variable that can be set to disable the strict validation. Set an environment variable `Org.BouncyCastle.Asn1.AllowUnsafeInteger` to 'true' for the Octopus Server process and a looser validation will be applied, allowing this certificate to be used. However, Bouncy Castle authors have noted that this is not ideal and may pave the way for an exploit based around a faulty encoding in the future.

### `Unable to parse certificate 'cert name' (id: some-id): corrupted stream detected malformed integer`

This is the same root cause as the message above, however, it includes details about which certificate is in error. Please update any uses to a new valid certificate, and use the REST API to delete the certificate in question.

### `problem parsing cert: Org.BouncyCastle.Security.Certificates.CertificateException: Failed to read certificate ---> System.ArgumentException: version 1 certificate contains extra data`

This can happen when certificates include extension data without specifying the certificate format of v3. If the version is omitted, then v1 is implied. Since only v3 certificates are allowed to have this additional data, this leads to an invalid certificate. Please see [BC-CSharp issue #158](https://github.com/bcgit/bc-csharp/issues/158) for further information.

Please review the certificates in  **Deploy ➜ Certificates** to find the invalid one, update any usages to use a new valid certificate, and delete the old certificate via the REST API.

### `Invalid certificate detected - Unable to parse certificate`

This sometimes happens when attempting to import _crt_ files. If you are having trouble importing a crt file, you can convert the crt file to a cer file using the following method, and try re-importing:

* Double-click on the file labeled .crt to open it into the certificate display.
* Select the Details tab, and then click Copy to File.
* Click the Next option in the certificate wizard.
* Choose Base-64 encoded X.509 (.cer), and then click on Next.
* Now, browse to store your file and type in the filename that you want to keep
* Finally, save the file.

**Note:** This will need to be completed on Windows.

### `Unknown encryption algorithm: 1.2.840.113549.1.5.13`

When attempting to import a certificate in `PKCS#12` format you might receive an error similar to:

```
Could not parse certificate data. Possible causes: 1) The certificate format is not supported. 2) The password is incorrect. 3) The file is corrupt. Error: Unable to parse certificate 'example.cert.domain'
(id: ): Unknown encryption algorithm: 1.2.840.113549.1.5.13
```

This error may be caused by the use of [openssl](https://www.openssl.org/) version **3.0** (or higher) to create the certificate. 
To workaround this error, you can try the following:

* Generate the certificate using openssl version **1.1.1** and re-attempting the certificate upload/import.
* Import the certificate into the Windows Certificate store, export it using the `PKCS#12` format, *optionally* with your private key and then re-attempt the certificate upload/import.
* Generate the certificate using openssl version **3.0** (or higher) using [legacy algorithms](https://wiki.openssl.org/index.php/OpenSSL_3.0#Legacy_Algorithms). This requires the [legacy provider](https://wiki.openssl.org/index.php/OpenSSL_3.0#Providers) to be loaded in the openssl configuration first, and then generating the certificate using the `-provider legacy` switch. Finally, re-attempting the certificate upload/import.

For more information, see this [GitHub issue](https://github.com/OctopusDeploy/Issues/issues/7156).
