---
title: Java Error Messages and Troubleshooting
description: Java deployment steps include a number of unique error codes that may be displayed in the output if there was an error
position: 3
---

The Java deployment steps include a number of unique error codes that may be displayed in the output if there was an error. Below is a list of the errors, along with any additional troubleshooting steps that can be taken to rectify them.

## WILDFLY-DEPLOY-ERROR-0001
There was an error taking a snapshot of the current configuration.

## WILDFLY-DEPLOY-ERROR-0002
There was an error deploying the artifact.

## WILDFLY-DEPLOY-ERROR-0003
There was an error reading the existing deployments.

## WILDFLY-DEPLOY-ERROR-0004
There was an error adding the package to the server group.

## WILDFLY-DEPLOY-ERROR-0005
There was an error deploying the package to the server group.

This may be due to duplicate context paths. Check that the context path is not already assigned to an existing application.

See [Defining Context Paths](#context_path) for more information on how context paths are assigned in WildFly.

This may also occur if invalid server group names where supplied when deploying to a domain controller. Look for entries like this in the verbose log output:

```
INFO: Result as JSON: {
    "outcome" : "failed",
    "failure-description" : "WFLYCTL0216: Management resource '[(\"server-group\" => \"invalid-server-group-name\")]' not found",
    "rolled-back" : true
}
```

## WILDFLY-DEPLOY-ERROR-0006
There was an error undeploying the package to the server group

## WILDFLY-DEPLOY-ERROR-0007
There was an error deploying the package to the standalone server.

This may be due to duplicate context paths. Check that the context path is not already assigned to an existing application.

See [Defining Context Paths](#context_path) for more information on how context paths are assigned in WildFly.

This may also be caused by an error that prevents the application being deployed from starting up. Check the application server logs for more information.

## WILDFLY-DEPLOY-ERROR-0008
There was an error enabling the package in the standalone server

##  WILDFLY-DEPLOY-ERROR-0009
There was an error logging into the management API.

Ensure the server has started and that the ip/hostname and port details are correct.

Make sure the credentials are correct.

##  WILDFLY-DEPLOY-ERROR-0010
There was an error logging out of the management API

##  WILDFLY-DEPLOY-ERROR-0011
There was an error terminating the CLI object

##  WILDFLY-DEPLOY-ERROR-0012
There was an error changing the deployed state of the application.

Make sure the application name is correct.

## WILDFLY-DEPLOY-ERROR-0013
The login was not completed in a reasonable amount of time.

This can happen if no credentials where supplied with the step, and silent authentication failed.

Either supply credentials to be used, or ensure that the user performing the deployment (the Tentacle service user in Windows or the SSH user in Linux and MacOS) has access to the application server `$JBOSS_HOME/standalone/tmp/auth` or `$JBOSS_HOME/domain/tmp/auth` directory.

Also ensure that the hostname and port are correct. You should be able to open the admin console using these details.

![Wildfly Admin Console](wildfly-admin-console.png)

## WILDFLY-DEPLOY-ERROR-0014
An exception was thrown during the deployment.

##  WILDFLY-DEPLOY-ERROR-0015
Failed to deploy the package to the WildFly/EAP standalone instance

## WILDFLY-DEPLOY-ERROR-0016
Failed to deploy the package to the WildFly/EAP domain

## WILDFLY-DEPLOY-ERROR-0017
There was a mismatch between the server type defined in the Octopus Deploy step and the server that was being deployed to. For example, the Octopus Deploy step defined the server as `Standalone` in the `Standalone or Domain Server` field, but the server was actually a domain controller. This error won't stop the deployment, but possibly means that the Octopus Step has not configured the correct fields.

##  TOMCAT-DEPLOY-ERROR-0001
There was an error deploying the package to Tomcat

##  TOMCAT-DEPLOY-ERROR-0002
There was an error deploying a tagged package to Tomcat

##  TOMCAT-DEPLOY-ERROR-0003
There was an error undeploying a package from Tomcat

##  TOMCAT-DEPLOY-ERROR-0004
There was an error enabling or disabling a package in Tomcat

## TOMCAT-DEPLOY-ERROR-0005
This is a catch all error message for unexpected errors during a Tomcat deployment. Ensure that:

* The manager URL is correct. Ensure the URL includes the context of the manager application, and that the port and hostname/IP address are correct. Also ensure that the hostname/IP address can be resolved from the target machine hosting the Tentacle. A common example of a correct manager URL is `http://localhost:8080/manager`.
* The Tomcat credentials are correct.
* The firewall allows connection to the Tomcat server.
* Tomcat is started and running.

If you see errors such as:
```
23:22:33   Error    |       TOMCAT-DEPLOY-ERROR-0005: An exception was thrown during the deployment. http://g.octopushq.com/JavaAppDeploy#tomcat-deploy-error-0005
23:22:33   Error    |       org.apache.http.conn.HttpHostConnectException: Connect to tomcat-server:8080 [tomcat-server/127.0.1.1] failed: Connection refused
```

Then ensure that the IP address of the tomcat server (`127.0.1.1` in this example, as found in the list `[tomcat-server/127.0.1.1]`) is valid. If not, there may be a DNS issue.

## TOMCAT-DEPLOY-ERROR-0006
A HTTP return code indicated that the login failed due to bad credentials. Make sure the username and password are correct.

## TOMCAT-DEPLOY-ERROR-0007
A HTTP return code indicated that the login failed due to invalid group membership. Make sure the user is part of the `manager-script` group in the `tomcat-users.xml` file.

See the [Tomcat documentation](https://tomcat.apache.org/tomcat-7.0-doc/manager-howto.html#Configuring_Manager_Application_Access) for more details on the groups used by the manager application.

## TOMCAT-DEPLOY-ERROR-0008
The application was not successfully started or stopped.

This can happen if the application failed to initialize. Check the Tomcat logs for information on why the application could not be started.

Also confirm that the context path and version match a deployed application.

This is treated as a warning during deployment, but an error if encountered during the Tomcat start/stop step.

## JAVA-DEPLOY-ERROR-0001
The `Deploy a package` step was used with an unsupported package. This step does not support specialized file formats, like those used with Java packages.

You may want to use a step like `Deploy Java Archive` instead.

## TOMCAT-HTTPS-ERROR-0001

## TOMCAT-HTTPS-ERROR-0002

## TOMCAT-HTTPS-ERROR-0003
You have attempted to deploy a certificate using a protocol that is not supported by the installed version of Tomcat.

## TOMCAT-HTTPS-ERROR-0004

## TOMCAT-HTTPS-ERROR-0005

## TOMCAT-HTTPS-ERROR-0006
You have attempted to add an additional certificate to an existing `<Connector>` configuration in Tomcat 8.5 and above, or overwrite an existing `<Connector>` configuration, where the new protocol does not match the existing protocol. For example the configuration already defines a `<Connector>` with the NIO protocol, and you are attempting to add a certificate with the APR protocol. This is not supported as changing the protocol may leave existing configurations in an invalid state.

This error may also be thrown if a certificate is being added to an existing `<Connector>` that does not define the `protocol` attribute. Tomcat will auto-switch between APR and NIO if the `protocol` attribute is not set, but Octopus requires a fixed implementation to be defined before it can deploy a certificate.

To solve this problem, either deploy the certificate using the same protocol that is already configured in the `<Connector>`, manually remove the existing `<Connector>` and redeploy the certificate via Octopus, or manually configure the `<Connector>` to use the new protocol and then deploy the certificate into it with Octopus.

## TOMCAT-HTTPS-ERROR-0007
Tomcat 8.5 and above do not support the BIO protocol.

## TOMCAT-HTTPS-ERROR-0008:

If we have an existing configuration like this:
```xml
<Connector
  defaultSSLHostConfigName="myHostName"
  port="12345"
  scheme="https"
  secure="true"
  SSLEnabled="true"
  SSLCertificateFile="/usr/local/ssl/server.crt"
  SSLCertificateKeyFile="/usr/local/ssl/server.pem"/>
```
then this certificate configuration is assumed to have the hostName of `myHostName`, because it is derived from the `defaultSSLHostConfigName` attribute. At this point trying to add another default `<SSLHostConfig>` element will fail. For example, this is not a valid configuration:
```xml
 <Connector
  defaultSSLHostConfigName="myHostName"
  port="12345"
  scheme="https"
  secure="true"
  SSLEnabled="true"
  SSLCertificateFile="/usr/local/ssl/server.crt"
  SSLCertificateKeyFile="/usr/local/ssl/server.pem">
      <SSLHostConfig hostName="myHostName">
          <Certificate ... />
      </SSLHostConfig>
  </Connector>
```
The above will throw an error about having duplicate default configurations.

The error `TOMCAT-HTTPS-ERROR-0008` means Octopus prevented a certificate deployment that would lead to this invalid configuration.

You can fix this error by not deploying the new certificate as the default, or by manually moving the certificate configuration from the `<Connector>` element into a `<SSLHostConfig>` before deploying another certificate with Octopus.

## TOMCAT-HTTPS-ERROR-0009
Tomcat 7.0 does not support the Non-Blocking IO 2 Connector

## TOMCAT-HTTPS-ERROR-0010
The `server.xml` file could not be found.

When the `CATALINA_BASE` location is defined, `server.xml` is expected to be found at `$CATALINA_BASE/conf/server.xml`.

When the `CATALINA_BASE` location is not defined, `server.xml` is expected to be found at `CATALINA_HOME/conf/server.xml`.

Ensure that the `CATALINA_BASE` directory is valid (if it is defined) and that the user account performing the deployment (i.e. the Tentacle service or the SSH user) has permissions to access the `server.xml` file.

## TOMCAT-HTTPS-ERROR-0011
Failed to extract the version number from the information supplied.

## TOMCAT-HTTPS-ERROR-0012
Failed to generate a unique file.

## TOMCAT-HTTPS-ERROR-0013
The server.xml file was not valid XML, or was not accessible.

Check to make sure that the user running the Octopus Tentacle in Windows or the SSH user in Linux/MacOS has permissions to read the server.xml file.

## TOMCAT-HTTPS-ERROR-0014
Failed to save the server.xml file.

Check to make sure that the user running the Octopus Tentacle in Windows or the SSH user in Linux/MacOS has permissions to write to the server.xml file.

## TOMCAT-HTTPS-ERROR-0016
The private key could not be created.

Check to make sure that the user running the Octopus Tentacle in Windows or the SSH user in Linux/MacOS has permissions to create files in the Tomcat `conf` directory.

## TOMCAT-HTTPS-ERROR-0017
The public key could not be created.

Check to make sure that the user running the Octopus Tentacle in Windows or the SSH user in Linux/MacOS has permissions to create files in the Tomcat `conf` directory.

## TOMCAT-HTTPS-ERROR-0018
Failed to find the `lib/catalina.jar` file in the Tomcat directory.

Make sure the Tomcat installation path is correct.

Also check to make sure that the user running the Octopus Tentacle in Windows or the SSH user in Linux/MacOS has permissions list the Tomcat `lib` directory, and has read access to the `lib/catalina.jar` file.

## TOMCAT-HTTPS-ERROR-0019
The path defined to hold the keys does not exist.

## TOMCAT-HTTPS-ERROR-0020
The keystore, private key or public key filename must be an absolute path if it is specified.

## WILDFLY-HTTPS-ERROR-0001
An exception was thrown during the HTTPS configuration.

## WILDFLY-HTTPS-ERROR-0004
There was an error configuring the Elytron server SSL context

## WILDFLY-HTTPS-ERROR-0005
There was an error removing the legacy security realm.

## WILDFLY-HTTPS-ERROR-0006
There was an error adding the Elytron security context.

## WILDFLY-HTTPS-ERROR-0007
There was an error with the batched operation to remove the legacy security realm and add the Elytron security context.

## WILDFLY-HTTPS-ERROR-0008
There was an error reloading the server.

## WILDFLY-HTTPS-ERROR-0009
There was an error adding the Elytron key store.

## WILDFLY-HTTPS-ERROR-0010
There was an error configuring the Elytron key store.

## WILDFLY-HTTPS-ERROR-0011
There was an error adding the Elytron key manager.

## WILDFLY-HTTPS-ERROR-0012
There was an error configuring the Elytron key manager.

## WILDFLY-HTTPS-ERROR-0013
There was an error adding the Elytron server ssl context.

## WILDFLY-HTTPS-ERROR-0014
There was an error configuring the Elytron server ssl context.

## WILDFLY-HTTPS-ERROR-0015
There was an error reading the app server config path.

## WILDFLY-HTTPS-ERROR-0017
Configuring a keystore requires that the keystore name be defined.

## WILDFLY-HTTPS-ERROR-0018
A required property was not defined.

## WILDFLY-HTTPS-ERROR-0019
The server being configured did not match the type of server (either standalone or domain) defined in the step.

## WILDFLY-HTTPS-ERROR-0020
There was an error adding the security realm.

## WILDFLY-HTTPS-ERROR-0021
There was an error adding the keystore to the security realm.

## WILDFLY-HTTPS-ERROR-0022
There was an error configuring the existing keystore information in the security realm.

## WILDFLY-HTTPS-ERROR-0023
There was an error getting the undertow servers.

## WILDFLY-HTTPS-ERROR-0024
There was an error adding a new https listener in undertow.

This can happen if the application server fails to start an existing https listener. Check the log files for messages like:

```
No SSL Context available from security realm 'realmname'. Either the realm is not configured for SSL, or the server has not been reloaded since the SSL config was added.
```

## WILDFLY-HTTPS-ERROR-0025
There was an error configuring the existing https listener.

## WILDFLY-HTTPS-ERROR-0026
Failed to get the default interface for socket group.

## WILDFLY-HTTPS-ERROR-0027
Failed to get the https socket binding.

## WILDFLY-HTTPS-ERROR-0028
Failed to get socket binding for standalone.

## WILDFLY-HTTPS-ERROR-0029
There was an error adding a new https connector in the web subsystem.

## WILDFLY-HTTPS-ERROR-0030
There was an error configuring the existing https connector.

## WILDFLY-HTTPS-ERROR-0031
Failed to get socket binding for host.

## WILDFLY-HTTPS-ERROR-0032
Failed to get slave hosts.

## WILDFLY-HTTPS-ERROR-0033
Failed to get master hosts.

## WILDFLY-HTTPS-ERROR-0034
Failed to get master hosts.

## WILDFLY-HTTPS-ERROR-0035
Failed to get servers for host.

## WILDFLY-HTTPS-ERROR-0036
Failed to save legacy web subsystem https connector as a batch operation.

## WILDFLY-HTTPS-ERROR-0037
A supplied profile did not exist in the domain.

## WILDFLY-HTTPS-ERROR-0038
The server is not in a running state.

## WILDFLY-HTTPS-ERROR-0039
Failed to find either web or undertow subsystems.

This means that Calamari has tried to find either the web or undertow subsystem to determine how the certificate is to be configured, and neither could be found. This probably means the server is still starting up and is not responding to the read-resource queries.

## WILDFLY-HTTPS-ERROR-0040
Failed to load any extensions.

## WILDFLY-HTTPS-ERROR-0041
The keystore filename must be an absolute path if it is specified.

For example, you may have entered a value like `my.store` as the `Keystore Filename`. This value is required to be a path like `C:\my.store` or `/opt/my.store`.

## WILDFLY-HTTPS-ERROR-0042
When the keystore is not relative to a path, it must be absolute.

## WILDFLY-HTTPS-ERROR-0043
When the keystore is relative to a path, it must not absolute.

## WILDFLY-ERROR-0001
There was an error entering batch mode.

## WILDFLY-ERROR-0002
There was an error running the batch.

## JAVA-HTTPS-ERROR-0001
Certificate file does not contain any certificates. This is probably because the input certificate file is invalid.

## JAVA-HTTPS-ERROR-0002
Could not find a private key. This is probably because the input key file is invalid.

## JAVA-HTTPS-ERROR-0003
The path supplied as the location of a unique file was not a directory.

## JAVA-HTTPS-ERROR-0004
The path supplied as the location of a unique file does not exist.

## JAVA-HTTPS-ERROR-0005
Failed to create the keystore file.

Ensure that the user running the Tentacle service for a Windows target or the SSH account Octopus uses to connect to the Linux or MacOS target has permissions to create a new file, or overwrite the existing file, at the configured path.

## KEYSTORE-ERROR-0001
An exception was thrown during the deployment of the Java keystore.

## KEYSTORE-ERROR-0002
The keystoreName and defaultCertificateLocation both can not be blank.

## KEYSTORE-ERROR-0003
The keystore filename must be an absolute path if it is specified.

For example, you may have entered a value like `my.store` as the `Keystore Filename`. This value is required to be a path like `C:\my.store` or `/opt/my.store`.

## KEYSTORE-ERROR-0004
The keystore filename must be supplied.
