---
title: Import Certificates into Tomcat
description: Configure Tomcat with a certificate managed by Octopus.
position: 40
---

With the `Deploy a certificate to Tomcat` step, certificates managed by Octopus can be configured as part of a Tomcat instance to allow HTTPS traffic to be served.

## Prerequisites

Before a certificate can be deployed to a Tomcat instance, the certificate itself must be uploaded to Octopus. [Add a Certificate to Octopus](add-certificate.md) provides instructions on how to add a new certificate to the Octopus library.

Once uploaded, the certificate has to be referenced by a variable. [Certificate Variables](/docs/deployment-process/variables/certificate-variables.md) provides instructions on how to define a certificate variable.

## Deploying a Certificate to Tomcat

The `Deploy a certificate to Tomcat` step is used to deploy a certificate managed by Octopus to a Tomcat instance. At a minimum, the `Tomcat Location` and `Tomcat Certificate` sections must be populated to deploy a certificate.

### Tomcat Location Fields

The `Tomcat Location` section defines two fields.

The first field is the `Tomcat CATALINA_HOME path`. This is the location of the root directory of the "binary" distribution of Tomcat. Specifically Octopus looks for the file `$CATALINA_HOME/lib/catalina.jar`, which is used to determine the Tomcat version.

The second field is the `Tomcat CATALINA_BASE path`. This is the location of the root directory of the "active configuration" of Tomcat. Specifically Octopus looks for the `$CATALINA_BASE/conf/server.xml` file, which will be edited to reference the certificate being deployed.

When a single binary distribution of Tomcat is shared among multiple users on the same server, `CATALINA_HOME` will be a different value to `CATALINA_BASE`. When the binary distribution of Tomcat is hosting only one instance, `CATALINA_HOME` and `CATALINA_BASE` will reference the same directory, and in this case the `Tomcat CATALINA_BASE path` field is optional.

### Tomcat Certificate Fields

The `Tomcat Certificate` section defines the details of the certificate being deployed.

The `Select certificate variable` field provides a list of all the certificate variables defined in the project. [Certificate Variables](/docs/deployment-process/variables/certificate-variables.md) provides instructions on how to define a certificate variable.

The `Tomcat service name` field references that name of the service in the `conf/server.xml` file that the certificate will be deployed to. By default, the service is called `Catalina`, as defined by the `name` attribute in the `<Service name="Catalina">` element.

The `SSL implementation` field lists the standard Tomcat SSL implementations. Different versions of Tomcat support different SSL implementations. You can find more information on the implementations supported by each version of Tomcat in the following Tomcat documentation links:

* [Tomcat 9](https://tomcat.apache.org/tomcat-9.0-doc/ssl-howto.html#Edit_the_Tomcat_Configuration_File)
* [Tomcat 8.5](https://tomcat.apache.org/tomcat-8.5-doc/ssl-howto.html#Edit_the_Tomcat_Configuration_File)
* [Tomcat 8](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html#Edit_the_Tomcat_Configuration_File)
* [Tomcat 7](https://tomcat.apache.org/tomcat-7.0-doc/ssl-howto.html#Edit_the_Tomcat_Configuration_File)

:::hint
If you select an SSL implementation that is not supported by the version of Tomcat that the certificate is being deployed to, an error will be reported at deploy time.
:::

The `HTTPS port` field defines the HTTPS port of the Tomcat connector that will be created or edited by the step. The port is considered to be a connector identifier. This means that if a `<Connector>` element exists with the specified port, it will be updated with the new certificate. If a `<Connector>` element does not exist with that port, a new connector will be created.

:::hint
Existing `<Connector>` elements can only be updated with the same SSL implementation. Octopus does not support changing the SSL implementation of an existing connector.
:::

## Advanced Options

A number of optional advanced options can be defined when deploying a certificate to Tomcat. These include configuring SNI hostnames, certificate passwords, aliases and overriding the default filenames used when saving the certificates.

### Tomcat SNI Options

Server Name Indication (SNI) is supported by Tomcat 8.5 and above to map a certificate to the hostname of the request. In this way a single Tomcat instance can be configured with multiple certificates on a single port.

The `Certificate SNI hostname` field defines the hostname that the deployed certificate will map to. If left blank, this value is assumed to be `_default_`, which is the default value for the `defaultSSLHostConfigName` attribute on the `<Connector>` element.

For example, when set to the hostname `example.org`, the certificate being deployed will be used to secure requests to URLs like `https://example.org`.

:::hint
Defining the `Certificate SNI hostname` field will result in an error when deploying to Tomcat 8 and below.
:::

The `Default certificate` field can be used to indicate if the certificate being deployed will be the default for the connector. By selecting `Make this the default certificate`, this certificate will be used for any request to a hostname that does not have a certificate specifically mapped to it. Selecting `Leave this certificate's default status unchanged` will leave the existing default hostname unchanged.

:::hint
There must always be a default certificate. If the certificate being deployed is the only certificate available to the connector, it will be made the default even if `Make this the default certificate` is not selected.
:::

### Tomcat Certificate Options

A number of optional settings around how the certificate is created are defined in the `Tomcat Certificate Options` section. These options differ depending on the SSL implementation that was selected.

The JSSE SSL implementations of BIO, NIO and NIO2 rely on a Java KeyStore file. The APR implementation uses a certificate file and a PEM private key file.

#### Java KeyStore Options

When no `Private key password` is defined, the Java KeyStore will have the default password of `changeit`. This is the default password specified by Tomcat. If a password is defined then that password will be used to secure the Java KeyStore and included in the Tomcat configuration.

The `KeyStore filename` field can be used to define the location of the KeyStore created as part of the step. If left blank, the KeyStore file will be created with a unique filename in the `CATALINA_BASE/conf` directory, and the filename will be based on the certificate subject. If specified, a KeyStore will be created at the specified location, overwriting any existing file. Any value entered for the filename must be an absolute path.

The `KeyStore alias` field defines the alias under which the certificate will be saved. If not defined, it will default to the alias of `octopus`.

#### Certificate and PEM File Options

When no password is defined, PEM files created for the `APR` SSL implementation remain unencrypted, with a key file starting with `-----BEGIN RSA PRIVATE KEY-----`. When a password is defined, the key file is encrypted, starts with `-----BEGIN ENCRYPTED PRIVATE KEY-----`, and the password is included in the Tomcat configuration file.

The `Private key filename` field is used to define the location of the private key PEM file. If left blank, the private key file will be created with a unique filename in the `CATALINA_BASE/conf` directory, and the filename will be based on the certificate subject. If specified, a private key file will be created at the specified location, overwriting any existing file. Any value entered for the filename must be an absolute path.

The `Public key filename` field is used to define the location of the public certificate. If left blank, the public certificate file will be created with a unique filename in the `CATALINA_BASE/conf` directory, and the filename will be based on the certificate subject. If specified, a certificate file will be created at the specified location, overwriting any existing file. Any value entered for the filename must be an absolute path.

## Multiple Certificate Types
In Tomcat 8.5 and above, [multiple certificates](https://octopus.com/blog/mixing-keys-in-tomcat) can be assigned to a single port. This is most useful for assigning a RSA and a ECDSA certificate, and allowing the client to select the most secure option.

When exporting a certificate from Octopus to Tomcat 8.5+, the type of certificate is automatically determined, and multiple certificates of different types can be assigned to the same port.

For example, if you had both an RSA and a ECDSA certificate managed by Octopus, and you had two `Deploy a certificate to Tomcat` steps that deployed each certificate to the same Tomcat 8.5+ instance and the same port, you would end up with a configuration that looks like this:

```xml
<Connector SSLEnabled="true" port="8443" protocol="org.apache.coyote.http11.Http11AprProtocol">
  <SSLHostConfig>
    <Certificate certificateFile="${catalina.base}/conf/ecdsa.crt" certificateKeyFile="${catalina.base}/conf/ecdsa.key" type="EC"/>
    <Certificate certificateFile="${catalina.base}/conf/rsa.crt" certificateKeyFile="${catalina.base}/conf/rsa.key" type="RSA"/>
  </SSLHostConfig>
</Connector>
```

:::hint
Although the example above uses the `APR` protocol, any protocol can be used to deploy multiple certificate types.
:::

With this configuration, newer browsers would select the ECDSA certificate, while older browsers may fall back to the RSA certificate.

## Configuration File Backups

Before any change is made to the `server.xml` file, it is saved to the `octopus_backup.zip` archive. This archive can be used to restore previous versions of the `server.xml` file.
