---
title: Connecting Securely with Azure Active Directory
description: Octopus Deploy can help you connect securely to Service Fabric clusters using Azure Active Directory authentication.
---

As part of Service Fabric step templates, Octopus allows you to securely connect to a secure cluster by using Azure Active Directory (AAD).

This page assumes you have configured your Service Fabric cluster in secure mode and have already configured your primary/server certificate when setting up the cluster (and have used an Azure Key Vault to store the server certificate thumbprint).

:::warning
This example assumes you are using Azure to host your Service Fabric cluster.
:::

During a Service Fabric deployment that uses AAD for authentication, Calamari will set the following connection parameters before attempting to connect with the Service Fabric cluster:

```powershell
$ClusterConnectionParameters["ServerCertThumbprint"] = $OctopusFabricServerCertThumbprint
$ClusterConnectionParameters["AzureActiveDirectory"] = $true
$ClusterConnectionParameters["SecurityToken"] = $AccessToken

# Where $AccessToken is obtained through an earlier PowerShell call using the following variables:
#
# $OctopusFabricAadUserCredentialUsername
# $OctopusFabricAadUserCredentialPassword
#
```

These PowerShell variables correspond to the following Octopus variables:

| PowerShell Variable                      | Octopus Variable                                       |
| ---------------------------------------- | ------------------------------------------------------ |
| $OctopusFabricAadUserCredentialUsername  | Octopus.Action.ServiceFabric.AadUserCredentialUsername |
| $OctopusFabricAadUserCredentialPassword  | Octopus.Action.ServiceFabric.AadUserCredentialPassword |
| $OctopusFabricServerCertThumbprint       | Octopus.Action.ServiceFabric.ServerCertThumbprint      |

It is these values and variables that we will be discussing below.

## Step 1: Get the DNS name of your Service Fabric cluster {#ConnectingSecurelywithClientCertificates-Step1:GettheDnsName}

The following steps will need the DNS name of your Service Fabric cluster. 

The DNS name for Azure Service Fabric clusters can be found as the "Client connection endpoint" field on the "Overview" tab of your Azure Service Fabric cluster in the Azure portal.

An example of a Service Fabric cluster's DNS name is: `democtopus-sf1-secure.australiasoutheast.cloudapp.azure.com`

## Step 2: Configure your Service Fabric cluster to use Azure Active Directory {#ConnectingSecurelywithClientCertificates-Step1:Generatetheclientcertificate}

The Azure Portal supports adding an AAD user to an AAD app (ie. a Service Fabric cluster application). So Octopus can authenticate using AAD with user credentials (NOTE: At the time of writing (March 22nd, 2017), client credentials are not yet supported with SF apps and AAD). So we need to setup an AAD user and grant them permissions to access our Service Fabric cluster. This section will discuss how to do this.

For a Service Fabric cluster to be able to see our AAD user, we need to setup some AAD applications (a cluster application and a client application) and assign an AAD user to our cluster application.

This process is made easier with scripts. Luckily for us, Microsoft have published an article on how to do exactly what we need, titled [Securing an Azure Service Fabric cluster with Azure Active Directory via the Azure Portal](https://blogs.msdn.microsoft.com/ncdevguy/2017/01/09/securing-an-azure-service-fabric-cluster-with-azure-active-directory-via-the-azure-portal-2/). This article includes some [sample scripts](http://servicefabricsdkstorage.blob.core.windows.net/publicrelease/MicrosoftAzureServiceFabric-AADHelpers.zip) you can customise to help setup your own cluster and client applications.

After running through these scripts, let's assume you have the following:

- a cluster application (registered under AAD's app registrations)
- a client application (also registered under AAD's app registrations)

## Step 3: Configure an Azure Active Directory user to use during deployments

Now that we have configured our Service Fabric cluster to use AAD, we can assign an AAD user to our Service Fabric cluster application.

In your Azure Active Directory:

- Create a user that you will use for deploying to your Service Fabric cluster (let's call this user `morty`)
- Login to the portal with this user (so you get past any temporary password shenanigans)

Once you know this user is valid and can login, go again to your Azure Active Directory:

- Go to "App registrations"
- Select your cluster application that you setup earlier
- Click on the link for "Managed Application In Local Directory"
- Click "Users and groups"
- Proceed to add your deployment user (`morty`) to your application, with the role of Admin

Make note of this user's username (_not_ their display name) and password. The format of an AAD username is typically something like this: `morty@my-azure-directory.onmicrosoft.com`

You can then configure your deployment step to connect to your Service Fabric cluster using these user credentials.

## Step 4: Configure and run a deployment step {#ConnectingSecurelywithClientCertificates-Step1:Configureandrunadeploymentstep}

In Octopus, Service Fabric deployment steps that use "Azure Active Directory" as the security mode will need you to enter the username and password of the AAD user who has access to your SF cluster application. Octopus will use these user credentials to obtain an `AccessToken` that it will then pass as the `SecurityToken` when connecting to your Service Fabric cluster.

![](/docs/deploying-applications/deploying-to-service-fabric/connecting-securely-with-azure-active-directory/secure-aad-template.png "width=300")

## Connection Troubleshooting {#ConnectingSecurelywithClientCertificates-Step1:ConnectionTroubleshooting}

Calamari uses the [Connect-ServiceFabricCluster cmdlet](https://docs.microsoft.com/en-us/powershell/servicefabric/vlatest/connect-servicefabriccluster) to connect to your Service Fabric cluster. The connection parameters are logged (Verbose) at the time of a deployment to help if you need to debug connection problems to your Service Fabric cluster.
