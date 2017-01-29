---
title: Octopus Server Disaster Recovery
position: 13
---

## **Disaster Recovery Guide** {#OctopusServerDisasterRecovery-DisasterRecoveryGuide}

- Disaster Recovery Guide
- Licensing Information:
- Service Configured:
- 1. Single Server - Octopus Server Installation
  - 2. Multiple Server - Octopus Server Installation
  - 3. High Availability - Octopus Server Installation
- How to find your NODE name:

Disaster recovery is essential for every organisation, to reduce downtime should anything go wrong with your systems.

Octopus has options for your Disaster Recovery that will enable you to quickly recover your current Octopus Architecture.

### **Licensing Information:** {#OctopusServerDisasterRecovery-LicensingInformation:}

Every Octopus license allows for 3 instances. You can also have offline disaster recovery instances that will not be included in this count. This guide describes how to set these instances up.

While you can have an offline instance that is standalone with a database that could be built from your last backup and then brought online, the recommended solution is to have an existing instance configured that connects to your live database which means it will require no syncing.

This solution can be done for either a standalone instance, multiple servers or within a HA cluster.

:::warning
**Note:**
The key is to set the instance to have the same node name as the server it is going to take over from when a disaster happens. This means that it will seamlessly take over from where the other instance left off and does not take up any of your instance or node counts.
:::

### **Service Configured:** {#OctopusServerDisasterRecovery-ServiceConfigured:}

:::warning
**Note:**
Depending on your Architecture, you will need to ensure you are aware of the settings you will require, to recover your Octopus Server installation correctly *(make a copy of your settings).*
:::

Your Octopus Server settings will be different depending on the following Architecture models you could be using. Browse to the relevant Architecture model below to find the requirements you will need to proceed:

#### *1. Single Server - Octopus Server Installation* {#OctopusServerDisasterRecovery-1.SingleServer-OctopusServerInstallation}

Using the offline recovery server you allocated for Disaster Recovery, follow the checklist below to copy the Production installation settings for your Single Server.

- - Install SQL Server.
- Install Octopus by replicating the installation of the current Octopus Server version you are using. It is crucial to use the same version you currently have installed in Production.
- Configure Octopus Installation to match Production settings.

![](/docs/images/5669334/5866179.png "width=300")

Once you have completed the setup process of your Single Server, your DR Server is now ready to replace the Production server. This will enable you to easily replace your Production Server if you require to during your Disaster Recovery process.

When required to replace your Production server with the ready DR server, follow the checklist below:

- - Ensure Database restore is complete to the DR server.
- Ensure File backup has been restored.
- Configure Octopus Database settings from the copy you made of your Production Server.

#### *2. Multiple Server - Octopus Server Installation* {#OctopusServerDisasterRecovery-2.MultipleServer-OctopusServerInstallation}

![](/docs/images/5669334/5866180.png "width=300")

- - Install SQL and configure your server.
- Install Octopus on the server, which you have allocated for Octopus.
- Install and configure your File server.
- Configure Octopus Installation to match Production settings.

Once you have completed the installation and configuration process for your Multiple Server Architecture, your DR Servers are now ready to replace the Production servers. This will enable you to easily replace any one of your Multiple servers, or all of your Production Servers if you require to during your Disaster Recovery process.

When required to replace your Production servers with the ready DR servers, follow the checklist below:

- - Ensure Database restore is complete to the SQL DR server.
- Configure your Database settings from the copy you made of your Production server settings.
- Ensure File server backup has been restored.
- Configure Octopus Database settings from the copy you made from your Production Server.

#### 3. High Availability - Octopus Server Installation {#OctopusServerDisasterRecovery-3.HighAvailability-OctopusServerInstallation}

![](/docs/images/5669334/5866181.png "width=300")

### How to find your NODE name: {#OctopusServerDisasterRecovery-HowtofindyourNODEname:}

- Navigate to your Configuration &#10140; Nodes page.

- You will find the NODE name at the top of the page *(see example below).*

*![](/docs/images/5669334/5866178.png "width=500")*

**Configure Services on your DR Server to match your Production Server.**

Node name configuration updated.
Ensure Node name configuration has been updated on your DR server to match your Production Server.

SQL backups.
2.0.1. SQL backups are your responsibility for your environment.
2.0.2. Ensure you have a backup procedure for your SQL databases.

3.0.0. Filesystem backups & replication.

**Updating the instance node name**

```powershell
Octopus.Server.exe configure --serverNodeName=<SameNameAsPrimary>
```

NOTE: Change the <SameNameAsPrimary> to the NODE name you found earlier.
