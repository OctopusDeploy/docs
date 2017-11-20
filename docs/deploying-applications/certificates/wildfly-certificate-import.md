---
title: Importing Certificates into Tomcat
description: Configure Tomcat with a certificate managed by Octopus.
version: "4.1"
---

With the `Configure certificate for WildFly or EAP` step, certificates managed by Octopus can be configured as part of a WildFly of Red Hat JBoss EAP instance to allow HTTPS traffic to be served.

## Prerequisites

If a new keystore is to be created as part of the deployment, the certificate being deployed must be referenced by a variable. [Add a Certificate to Octopus](add-certificate.md) provides instructions on how to add a new certificate to the Octopus library, and [Certificate Variables](variables/certificate-variables.md) provides instructions on how to define a certificate variable.

## Common Connection Settings

Regardless of whether you are deploying a certificate to a standalone or domain instance, there are a number of common connection settings that need to be defined.

Set the `Management Host or IP` field to the address that the WildFly management interface is listening to. This value is relative to the target machine that is performing the deployment. Since the target machine performing the deployment is typically the same machine hosting the application server, this value will usually be `localhost`.

Set the `Management Port` to the port bound to the WildFly management interface. For WildFly 10+ and JBoss EAP 7+, this will default to `9990`. For JBoss EAP 6, this will default to `9999`.

The `Management Protocol` field defines the protocol to be used when interacting with the management interface. For WildFly 10+ and JBoss EAP 7+, this will default to `http-remoting` or `remote+http` (the two are equivalent). For JBoss EAP 6, this will default to `remoting`.

If you wish to use silent authentication, and have configured the required permissions for the `$JBOSS_HOME/standalone/tmp/auth` or `$JBOSS_HOME/domain/tmp/auth` directory, then the `Management User` and `Management Password` fields can be left blank. Alternatively these fields can hold the credentials that were configured via the `add-user` script.

## Deploying a Certificate to a Standalone Instance

When configuring a certificate with a standalone instance, you have the choice of configuring an existing Java keystore, or creating a new one from a certificate managed by Octopus.

### Creating a New Java Keystore

## Deploying a Certificate to a Standalone Domain
