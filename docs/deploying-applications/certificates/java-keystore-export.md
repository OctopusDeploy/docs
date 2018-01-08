---
title: Exporting a Certificate to a Java Keystore
description: Export a Java Keystore from a certificate managed by Octopus.
version: "4.1"
---

The `Deploy a keystore to the filesystem` step can be used to take a certificate managed by Octopus and save it as a Java keystore on the target machine.

The `Select certificate variable` field is used to define the variable that references the certificate to be deployed.

The location of the new keystore file must be defined in the `Keystore filename` field. This must be an absolute path, and any existing file at that location will be overwritten.

The `Private key password` field defines a custom password for the new keystore file. If this field is left blank, the keystore will be configured with the default password of `changeit`.

The `Keystore alias` field defines a custom alias under which the certificate and private key are stored. If left blank, the default alias of `Octopus` will be used.
