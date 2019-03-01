---
title: Import Certificates into WildFly and JBoss EAP
description: Configure WildFly or JBoss EAP with a certificate managed by Octopus.
position: 50
---

With the `Configure certificate for WildFly or EAP` step, certificates managed by Octopus can be configured as part of a WildFly of Red Hat JBoss EAP domain or standalone instance to allow HTTPS traffic to be served.

## Prerequisites

If a new KeyStore is to be created as part of the deployment, the certificate being deployed must be referenced by a variable. [Add a Certificate to Octopus](add-certificate.md) provides instructions on how to add a new certificate to the Octopus library, and [Certificate Variables](/docs/deployment-process/variables/certificate-variables.md) provides instructions on how to define a certificate variable.

## Common Connection Settings

Regardless of whether you are deploying a certificate to a standalone or domain instance, there are a number of common connection settings that need to be defined in the `Application Server Details` section.

Set the `Management host or IP` field to the address that the WildFly management interface is listening to. This value is relative to the target machine that is performing the deployment. Since the target machine performing the deployment is typically the same machine hosting the application server, this value will usually be `localhost`.

Set the `Management port` to the port bound to the WildFly management interface. For WildFly 10+ and JBoss EAP 7+, this will default to `9990`. For JBoss EAP 6, this will default to `9999`.

The `Management protocol` field defines the protocol to be used when interacting with the management interface. For WildFly 10+ and JBoss EAP 7+, this will default to `http-remoting` or `remote+http` (the two are equivalent). For JBoss EAP 6, this will default to `remoting`.

If you wish to use [silent authentication](https://access.redhat.com/documentation/en-us/jboss_enterprise_application_platform/6.2/html/security_guide/chap-network_security#Secure_the_Management_Interfaces), and have configured the required permissions for the `$JBOSS_HOME/standalone/tmp/auth` or `$JBOSS_HOME/domain/tmp/auth` directory, then the `Management user` and `Management password` fields can be left blank. Alternatively these fields can hold the credentials that were configured via the `add-user` script.

## Deploying a Certificate to a Standalone Instance

Selecting `Standalone` from the `Standalone or domain Server` field in the `Server Type Details` section indicates that the certificate is to be deployed to a standalone server instance.

:::hint
Selecting the wrong server type will result in an error at deploy time.
:::

When configuring a certificate with a standalone instance, you have the choice of configuring an existing Java KeyStore, or creating a new KeyStore from a certificate managed by Octopus. The options available in the `Server Type Details` section will change depending on how the certificate is deployed.

### Creating a New Java KeyStore

By selecting the `Create a new KeyStore` option, Octopus will create a new Java KeyStore file that will then be configured in the application server.

The `Select certificate variable` field is used to define the variable that references the certificate to be deployed as a Java KeyStore.

The location of the new KeyStore file can be optionally defined in the `KeyStore filename` field. Any path specified in this field must be an absolute path, and any existing file at that location will be overwritten. If left blank, a KeyStore will created with a unique filename based on the certificate subject in the application server `standalone/configuration` directory.

The `Private key password` field defines a custom password for the new KeyStore file. If this field is left blank, the KeyStore will be configured with the default password of `changeit`.

The `KeyStore alias` field defines a custom alias under which the certificate and private key are stored. If left blank, the default alias of `Octopus` will be used.

### Referencing an Existing KeyStore

When `Reference an existing KeyStore` is selected, a number of fields are required to define the location and properties of the existing KeyStore that is being referenced.

#### Defining the KeyStore File Name

The value of the `KeyStore filename` field can either be the absolute path to the KeyStore (in which case the `Relative base path` option has to be set to `none`), or it can be a path relative to one of the locations defined in the `Relative base path` field.

For example, if you wish the to reference an existing KeyStore file at `/opt/my.store`, set the `KeyStore filename` field to `/opt/my.store` and the `Relative base path` option to `none`. If you want to reference a KeyStore file in the `standalone/configuration` directory with a filename of `my.store`, set the `KeyStore filename` field to `my.store` and set the `Relative base path` field to `jboss.server.config.dir`.

#### Setting the KeyStore Password and Alias

The `Private key password` field defines a custom password for the existing KeyStore file. If this field is left blank, the KeyStore is assumed to have the default password of `changeit`.

The `KeyStore alias` field defines a custom alias under which the certificate and private key are stored. If left blank, the KeyStore is assumed to have the default alias of  `Octopus`.

## Deploying a Certificate to a Domain

Domains can be used to distribute the configuration required to access a KeyStore, but can not be used to distribute the KeyStore files themselves. Since each slave in the domain needs to have access to the KeyStore file, configuring certificates is therefor a two step process:

1. Deploying a KeyStore file to all slave instances.
2. Configuring the profiles managed by the domain controller to reference the KeyStore files.

### Deploying KeyStore Files

The `Deploy a KeyStore to the filesystem` step can be used to take a certificate managed by Octopus and save it as a Java KeyStore on the target machine.

The `Select certificate variable` field is used to define the variable that references the certificate to be deployed.

The location of the new KeyStore file must be defined in the `KeyStore filename` field. This must be an absolute path, and any existing file at that location will be overwritten.

The `Private key password` field defines a custom password for the new KeyStore file. If this field is left blank, the KeyStore will be configured with the default password of `changeit`.

The `KeyStore alias` field defines a custom alias under which the certificate and private key are stored. If left blank, the default alias of `Octopus` will be used.


:::hint
It is highly recommended that the KeyStore file be saved in the `domain/configuration` directory. This allows the KeyStore file to be referenced using a relative path against the base path identified by `jboss.domain.config.dir`.
:::

### Configuring the Domain

Once all the domain slaves have a local copy of the KeyStore file deployed to them, the domain profiles can be configured to reference these files.

Selecting `Domain` from the `Standalone or domain server` field in the `Server Type Details` section indicates that the certificate is to be configured as part of a WildFly or JBoss EAP domain.

The `Domain profiles` field defines a comma separated list of profiles that will be updated to reference the existing KeyStore file. Typical profiles names include `default`, `ha`, `full` and `full-ha`.

The `KeyStore filename` is either the absolute path to the existing KeyStore file (in which case the `Relative base path` field has to be set to `none`), or is a relative path using the value of the `Relative base path` field as the base.

The `Private key password` field defines the optional password used to access the existing KeyStore file. If this field is left blank, the KeyStore is assumed to have the default password of `changeit`.

The `KeyStore alias` field defines the optional alias under which the certificate and private key are stored. If left blank, the KeyStore is assumed to have a default alias of  `Octopus`.

## Advanced Options

:::hint
If you are unsure what these advanced values refer to, it is best to leave them blank and assume the default values.
:::

The `Advanced Options` section is the same whether deploying to a domain or standalone instance. The fields in this section can be used to override the default values used when configuring a KeyStore in WildFly or JBoss EAP.

The `HTTPS socket binding name` can be used to override the default socket binding that will be used to expose access to HTTPS. The default value is `https`.

This value refers to the `name` attribute in the `<socket-binding>` elements in the `domain/configuration/domain.xml` or `standalone/configuration/standalone.xml` files.

The default configuration for the `standard-sockets` socket binding group is shown below, and shows that the `https` socket binding uses port 8443 by default. This is the same port and socket binding name used by all default socket binding groups.

```xml
<socket-binding-group name="standard-sockets" default-interface="public">
    <!-- Needed for server groups using the 'default' profile  -->
    <socket-binding name="ajp" port="${jboss.ajp.port:8009}"/>
    <socket-binding name="http" port="${jboss.http.port:8080}"/>
    <socket-binding name="https" port="${jboss.https.port:8443}"/>
    <socket-binding name="txn-recovery-environment" port="4712"/>
    <socket-binding name="txn-status-manager" port="4713"/>
    <outbound-socket-binding name="mail-smtp">
        <remote-destination host="localhost" port="25"/>
    </outbound-socket-binding>
</socket-binding-group>
```

The `Legacy security realm name` defines the name of the security realm that is configured in application servers that do not support the `Elytron` subsystem. If left blank, this value will default to `OctopusHttps`.

![Security Realm](security-realm.png)

:::hint
Elytron is the new security subsystem introduced with WildFly 11 and JBoss EAP 7.1. All previous versions of WildFly and JBoss EAP use what is referred to as the "legacy" security system.
:::

The `Elytron key store name` defines the name of the Elytron Key Store in application servers that support the `Elytron` subsystem.  If left blank, this value defaults to `OctopusHttpsKS`.

![Elyton Key Store](elytron-KeyStore.png)

The `Elytron key manager name` defines the name of the Elytron Key Manager in application servers that support the `Elytron` subsystem.  If left blank, this value defaults to `OctopusHttpsKM`.

![Elyton Key Manager](elytron-keymanager.png)

The `Elytron server SSL context name` defines the name of the Elytron SSL Context name in application servers that support the `Elytron` subsystem.  If left blank, this value defaults to `OctopusHttpsSSC`.

![Elyton Server SSL Context](elytron-ssl-context.png)

:::hint
You can find more information of the Elytron subsystem components in the [WildFly documentation](https://docs.jboss.org/author/display/WFLY/Using+the+Elytron+Subsystem#UsingtheElytronSubsystem-onewayapps).
:::

## Configuration File Backups

Before any changes are made to the WildFly or JBoss EAP configurations, a `:take-snapshot` command is run. This will create a backup file in the `domain/configuration/standalone_xml_history/snapshot` or `standaline/configuration/standalone_xml_history/snapshot` directory.
