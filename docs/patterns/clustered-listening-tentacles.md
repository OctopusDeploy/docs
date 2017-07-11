---
title: Clustered Listening Tentacles
description: Configuring the Octopus Tentacle in an Active/Passive cluster. 
position: 0
---

You can configure a pair of Octopus Tentacles in an Active/Passive failover cluster using shared storage with the **Failover Cluster Manager**. This approach has been tested on Windows Server 2016. 

To perform this task, first ensure that a shared drive is available to the node where you are installing the new Octopus Tentacle instance. Once all nodes have the Octopus Tentacle instances installed, pick any node to generate and export a private key. Proceed to import the new private key onto every Octopus Tentacle instance, including the node which was used to export it. 

Using the Failover Cluster Manager you then configure the Octopus Tentacle instance service as a generic service, ensuring it has a clustered IP and gets registered in DNS. Once the Tentacles have been setup, use the Octopus Server to discover the new Tentacle cluster on the Clustered IP address specified when making Octopus Tentacles a generic service cluster. 

:::warning
**Shared Storage Considerations**
It is not possible to store the **tentacle.config** file in shared storage because the Tentacle.Certificate component gets encrypted using a node's machine-specific key. If you attempt to store the tentacle.config file in shared storage, you will encounter this error: **Key not vaild for use in specified state** upon switching to a new active node. This occurs because the new active node is not able to decrypt the private key which will result in the Tentacle service failing to start.
:::

To avoid any issues with a node's private key you must specify an alternate location for the **tentacle.config** file upon installation of the Tentacle service. Follow these instructions to install Octopus Tentacle in a failover cluster using shared storage.

## Requirements {#ClusteringTentacles-Requirements}

This document assumes you already have the following setup:

- An Active Directory Domain and a local DNS server.
- An Octopus Server, this does not need to be joined to the domain.
- A two node active/passive windows cluster where each node is joined to the domain.
- A local IP Address available for the cluster so that the Octopus Server can reach the cluster.
- Shared Storage configured for the cluster, this example has mounted it as E:\

## Installation {#ClusteringTentacles-Installation}

:::warning
**Installing Tentacles with Shared storage**
This document implements shared storage using an iSCSI target with Multipath IO confgured on the Tentacle servers, in this scenario it is best to avoid accessing the same iSCSI volume from two different hosts at the same time.
:::

On the first node in your Active/Passive Windows cluster, check that the shared drive is mounted by seeing that it is available in disk management and note down the Drive letter. If it hasn't already been done, bring the shared disk online and format it with a drive letter, we have chosen to use E:\

*![](/docs/images/clustered-tentacles/Shared_Disk_Properties.JPG)*

Run through the Tentacle MSI Installer to install Tentacle Manager to its default location (C:\Program Files\Octopus Deploy\Tentacle). Do not click "get started" in the Tentacle manager, install the Octopus Tentacle instance using the command prompt by opening `cmd` then run these commands:

```
cd "C:\Program Files\Octopus Deploy\Tentacle\"
Tentacle.exe create-instance --instance "Tentacle" --config "C:\Octopus\Tentacle.config"
Tentacle.exe new-certificate --instance "Tentacle" --if-blank
Tentacle.exe configure --instance "Tentacle" --reset-trust
Tentacle.exe configure --instance "Tentacle" --app "E:\Octopus\Applications" --home "E:\Octopus\Home" --port "10933" --noListen "False"
Tentacle.exe configure --instance "Tentacle" --trust "<OCTOPUS SERVER THUMBPRINT>"
"netsh" advfirewall firewall add rule "name=Octopus Deploy Tentacle" dir=in action=allow protocol=TCP localport=10933
Tentacle.exe service --instance "Tentacle" --install --stop --start
```
In the script block above, the following actions were performed:
 - Installed the tentacle instance using the default instance name of "Tentacle" and make sure the Tentacle.config file was installed into the default location of "C:\Octopus\Tentacle.config". Since C:\ is local storage this file does not get swapped when we perform a swap to a new active node.
 - Configured the new instance to listen on TCP Port 10933 then save the Application and Home data onto our Shared Storage drive which in this example is mounted as E:\
 - Configured the tentacle to trust our Octopus Server holding a certificate which matches the Certificate Thumbprint
 - Ensured the Windows Firewall has a rule configured to allow incoming connections on TCP Port 10933 which will allow the Octopus Server to talk to our new Tentacle.

Using the Tentacle Manager stop the Octopus Tentacle service which was just installed on the first node and take the shared disk offline in Windows Disk Management. 

Now go to the second tentacle server in the Active/Passive cluster and bring the same disk online, repeating the steps which were just performed on the first node to install the Octopus Tentacle service. Please keep the Octopus Tentacle service started and ensure that the Shared Storage is still mounted this time so that the SSL Certificate can be exported out of Octopus Tentacle.

## Generate an Octopus Tentacle Private Key {#ClusteringTentacles-NewPrivateKey}

Open `cmd` again and run these commands to generate a new Private Key from an Octopus Deploy Tentacle.
```
cd "C:\Program Files\Octopus Deploy\Tentacle\"
Tentacle.exe new-certificate -e "TentacleClusterPrivateKey.txt"
```

*![](/docs/images/clustered-listening-tentacles/Export_PrivateKey.JPG)*

## Import the new Octopus Tentacle Private Key {#ClusteringTentacles-ImportPrivateKey}

Now import the new private key into the server from which it was just generated.
```
Tentacle.exe import-certificate -instance "Tentacle" -f "TentacleClusterPrivateKey.txt"
Tentacle.exe service --instance "Tentacle" --stop --start
```

Now on the second node, stop the Tentacle service and bring the shared storage offline the same way you have done before. This time go back to the first node in the cluster, bringing the Shared Storage drive back online and start the tentacle service. Copy the newly exported "TentacleClusterPrivateKey.txt" file to the first node, then follow the step above to import it into the first node to ensure both nodes in the cluster hold the same private key. 

Once both Tentacles are installed and configured ensure that neither node has the Octopus Tentalce started and that the shared storage is brought offline.

*![](/docs/images/clustered-listening-tentacles/Import_PrivateKey.JPG)*

## Configure A new Clustered Service {#ClusteringTentacles-NewCluster}

Ensure each node that will be participating in the Tentacle Cluster is joined to the Active Directory Domain and has the **Failover Clustering** Feature installed in Windows.

Open the **Failover Cluster Manager** console on one of the nodes. If there is no cluster configured yet, you can right click **Failover Cluster Manager** amd select **New Cluster**

On the **Select Servers** page, enter the Fully Qualified Domain Name of each node that will be in this cluster.

On the **Validation Warning** page, select "Yes, When I click Next, run configuration validation tests, and then return to the process of creating the cluster"

The **Validate a Configuration Wizard** appears, select **Run all Tests** and select **Next**

When all validation appears OK, you will be returned to the **Create Cluster Wizard** where the **Access Point for Administering the Cluster** page appears, Choose an IP Address that is on the same Network as both Tentacles and a hostname that is 15 characters or less.

*![](/docs/images/clustered-listening-tentacles/Configure_ClusterHostname)*

Now complete the Wizard.

## Adding Octopus Tentacle as a Generic Service Cluster {#ClusteringTentacles-AddTentacleCluster}

Right-Click **Roles** and select **Configure Roles** then Highlight **Generic Service**, click **Next**.

*![](/docs/images/clustered-listening-tentacles/Cluster_NewRoleWizard-ServiceType)*

Find and highlight **OctopusDeploy Tentacle** service in the list of available services, click **Next**

*![](/docs/images/clustered-listening-tentacles/Cluster_NewRoleWizard-SelectService)*

Under **Client Access Point** choose an apropriate NetBIOS Name and IP Address for this clustered role. Note down this IP Address/DNS Hostname, you will be using it in the Octopus Server for connection to the Tentacle Cluster.

*![](/docs/images/clustered-listening-tentacles/Cluster_NewRoleWizard-ClientAccess)*

Under **Select Storage** choose the Disk which we had mounted previously and installed the Home and Application folders to previously

*![](/docs/images/clustered-listening-tentacles/Cluster_NewRoleWizard-Storage.JPG)*

Under **Replication Registry Settings** Add a new root registry key of "Software\Octopus" and complete the wizard.

*![](/docs/images/clustered-listening-tentacles/Cluster_NewRoleWizard-Key.JPG)*

You have now successfully completed the installation of Octopus Deploy Tentacles in a new Active/Passive Cluster, in listening mode.

*![](/docs/images/clustered-listening-tentacles/Cluster_Complete.JPG)*

## Connect Octopus Server to a Clustered Tentacle {#ClusteringTentacles-ConnectOctopusServer}

Note down the IP Address which was specified in the **Client Access Point** Page of the new Role wizard. In this example, the IP Address was 192.168.1.206

Login to the Octopus Server and go to the **Environments** Page. Under the desired Environment, click **Add Deployment Target**.

For the target type, choose **Listening Tentacle**.

For the hostname, enter the IP Address of the Clustered Role, in this example it was 192.168.1.206 then click "Discover". 

*![](/docs/images/clustered-listening-tentacles/Server_DiscoverTentacle.JPG)*

Type the display name in Octopus Deploy and give your new target a role

*![](/docs/images/clustered-listening-tentacles/Server_IdentifyTargetJPG.JPG)*

In a few minutes your new Tentacle cluster will appear as Healthy in the Octopus server

*![](/docs/images/clustered-listening-tentacles/Server_TargetHealthy.JPG)*

You have successfully configured an Active/Passive server cluster using Octopus Tentacles.
