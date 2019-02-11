---
title: Export a Certificate to a Java KeyStore
description: Export a Java KeyStore from a certificate managed by Octopus.
position: 70
---

The `Deploy a KeyStore to the filesystem` step can be used to take a certificate managed by Octopus and save it as a Java KeyStore on the target machine.

The `Select certificate variable` field is used to define the variable that references the certificate to be deployed.

The location of the new KeyStore file must be defined in the `KeyStore filename` field. This must be an absolute path, and any existing file at that location will be overwritten.

The `Private key password` field defines a custom password for the new KeyStore file. If this field is left blank, the KeyStore will be configured with the default password of `changeit`.

The `KeyStore alias` field defines a custom alias under which the certificate and private key are stored. If left blank, the default alias of `Octopus` will be used.
