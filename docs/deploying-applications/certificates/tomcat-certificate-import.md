---
title: Importing Certificates into Tomcat
description: Configure Tomcat with a certificate managed by Octopus.
version: "4.1"
---

With the `Deploy a certificate to Tomcat` step, certificates managed by Octopus can be added to a Tomcat instance to allow HTTPS traffic to be served.

## Prerequisites

Before a certificate can be deployed to a Tomcat instance, the certificate itself must be uploaded to Octopus. [Add a Certificate to Octopus](add-certificate.md) provides instructions on how to add a new certificate to the Octopus library.

Once uploaded, the certificate has to be referenced by a variable. [Certificate Variables](variables/certificate-variables.md) provides instructions on how to define a certificate variable.

## Deploying a Certificate to Tomcat

The `Deploy a certificate to Tomcat` step is used to deploy a certificate managed by Octopus to a Tomcat instance. At a minimum, the `Tomcat Location` and `Tomcat Certificate` sections must be populated to deploy a certificate.

### Tomcat Location Fields

The `Tomcat Location` section defines two fields.

The first field is the `Tomcat CATALINA_HOME path`. This is the location of the root directory of the "binary" distribution of Tomcat. Specifically Octopus looks for the file `$CATALINA_HOME/lib/catalina.jar`, which is used to determine the Tomcat version.

The second field is the `Tomcat CATALINA_BASE path`. This is the location of the root directory of the "active configuration" of Tomcat. Specifically Octopus looks for the `$CATALINA_BASE/conf/server.xml` file, which will be edited to reference the certificate being deployed.

When a single binary distribution of Tomcat is shared among multiple users on the same server, `CATALINA_HOME` will be a different value to `CATALINA_BASE`. When the binary distribution of Tomcat is hosting only one instance, `CATALINA_HOME` and `CATALINA_BASE` will reference the same directory, and in this case the `Tomcat CATALINA_BASE path` field is optional.

### Tomcat Certificate Fields

The `Tomcat Certificate` section defines the details of the certificate being deployed.

The `Select certificate variable` field provides a list of all the certificate variables defined in the project. [Certificate Variables](variables/certificate-variables.md) provides instructions on how to define a certificate variable.

The `Tomcat service name` field references that name of the service in the `conf/server.xml` file that the certificate will be deployed to. By default, the service is called `Catalina`, as defined in the `<Service name="Catalina">` element.

The `SSL Implementation` field lists the standard Tomcat SSL implementations. Different versions of Tomcat support different SSL implementations. You can find more information on the implementations supported by each version of Tomcat in the following Tomcat documentation links:

* [Tomcat 9](https://tomcat.apache.org/tomcat-9.0-doc/ssl-howto.html#Edit_the_Tomcat_Configuration_File)
* [Tomcat 8.5](https://tomcat.apache.org/tomcat-8.5-doc/ssl-howto.html#Edit_the_Tomcat_Configuration_File)
* [Tomcat 8](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html#Edit_the_Tomcat_Configuration_File)
* [Tomcat 7](https://tomcat.apache.org/tomcat-7.0-doc/ssl-howto.html#Edit_the_Tomcat_Configuration_File)

:::hint
If you select an SSL implementation that is not supported by the version of Tomcat that the certificate is being deployed to, an error will be reported at deploy time.
:::

The `HTTPS port` field defines the Tomcat connector that will be created or edited by the step. The port is considered to be a connector identifier. This means that if a `<Connector>` element exists with that port, it will be updated with the new certificate. If a `<Connector>` element does not exist with that port, a new connector will be created.

:::hint
Existing `<Connector>` elements can only be updated with the same SSL implementation. Octopus does not support changing the implementation of an existing connector.
:::

## Advanced Options

A number of optional advanced options can be defined when deploying a certificate to Tomcat. These include configuring SNI hostnames, certificate passwords, aliases and overriding the default filenames used when saving the certificates.

### Tomcat SNI Options

Server Name Indication (SNI) is supported by Tomcat 8.5 and above to provide a way to map a certificate to the hostname of the request. In this way a single Tomcat instance can be configured with multiple certificates.

The `Certificate SNI hostname` field defines the hostname that the deployed certificate will map to. If left blank, this value is assumed to be `_default_`, which is the default value for the `defaultSSLHostConfigName` attribute on the `<Connector>` element.

When set to a hostname like `example.org`, the certificate being deployed with be used to secure requests to URLs like `https://example.org`.

:::hint
Defining the `Certificate SNI hostname` field will result in an error when deploying to Tomcat 8 and below.
:::

The `Make this the default certificate` field can be checked to indicate that the certificate being deployed will be used for any request to a hostname that does not have a certificate specifically mapped to it.

:::hint
There must always be a default certificate. If the certificate being deployed is the only certificate available to the connector, it will be made the default even if `Make this the default certificate` is not checked.

For this reason the `Make this the default certificate` field only has an effect when there are two or more certificates available to the connector.
:::

### Tomcat Certificate Options

A number of optional settings around how the certificate is created are defined in `Tomcat Certificate Options` section. These options differ depending on the SSL implementation that was selected.

The JSEE SSL implementations of BIO, NIO and NIO2 rely on a Java keystore file. The APR implementation uses PEM files for the certificate and private key.

#### Java Keystore Options

When no `Private Key Password` is defined, the Java keystore will have the default password of `changeit`. This is the default password used by Tomcat. If a password is defined then that password will be used to secure the Java keystore.

The `Keystore Filename` field can be used to define the location of the certificate created as part of the step. If left blank, the keystore file will be created in the `CATALINA_BASE/conf` directory, and the filename will be based on the certificate subject. If specified, a keystore will be created at the specified location, overwriting any existing file.

The `Keystore Alias` field defines the alias under which the certificate will be saved. If not defined, it will default to the alias of `octopus`.

#### PEM File Options

When no password is defined, PEM files used by the `APR` SSL implementation remain unencrypted, with a key file starting with `-----BEGIN RSA PRIVATE KEY-----`. When a password is defined, the key file is encrypted, and starts with `-----BEGIN ENCRYPTED PRIVATE KEY-----`.

The `Private Key Filename` field is used to define the location of the private key PEM file. If left blank, the private key file will be created in the `CATALINA_BASE/conf` directory, and the filename will be based on the certificate subject. If specified, a private key file will be created at the specified location, overwriting any existing file.

The `Public Key Filename` field is used to define the location of the public certificate. If left blank, the private certificate file will be created in the `CATALINA_BASE/conf` directory, and the filename will be based on the certificate subject. If specified, a certificate will be created at the specified location, overwriting any existing file.
