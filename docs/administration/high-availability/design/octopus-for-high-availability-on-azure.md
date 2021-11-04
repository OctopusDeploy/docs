---
title: Designing Octopus HA in Azure
description: Information on configuring Octopus High Availability hosted in Microsoft Azure.
position: 20
---

This section walks through the different options and considerations for the components required to set up Octopus High Availability in [Microsoft Azure](https://azure.microsoft.com/en-us/).

## Setting up Octopus: High availability

For the sake of simplicity, this guide assumes that all of the servers are hosted in Azure running Windows Server.

**Some assembly required**

A single server Octopus installation is straightforward; Octopus High Availability is designed for mission-critical enterprise scenarios and depends heavily on infrastructure and Windows components. At a minimum:

- You should be familiar with SQL Server failover clustering, [Azure SQL](https://azure.microsoft.com/products/azure-sql/), or have DBAs available to create and manage the database.
- You should be familiar with SANs, [Azure Files](https://azure.microsoft.com/services/storage/files/), or other approaches to sharing storage between servers.
- You should be familiar with load balancing for applications.

:::hint
**IaaS vs PaaS:**
If you are planning on using [IaaS](https://en.wikipedia.org/wiki/Infrastructure_as_a_service) exclusively in Azure and don't intend to use their PaaS offerings (such as Azure SQL), then the [On-Premises](/docs/administration/high-availability/design/octopus-for-high-availability-on-premises.md) guide might be a better approach for you as management of your virtual machines, Domain Controllers, SQL Database Servers, and load balancers will be your responsibility.
:::

### Compute

For a highly available Octopus configuration, you need a minimum of two Virtual Machines in Azure. There are several items to consider when provisioning your Octopus Virtual Machines in Azure:

- [Number and type of deployment targets](/docs/infrastructure/deployment-targets/index.md)
- [Retention Policies](/docs/administration/retention-policies/index.md)
- [Number of concurrent tasks](/docs/support/increase-the-octopus-server-task-cap.md)

Each organization has different requirements when it comes to choosing the right Virtual Machine to run Octopus on. Review the range of [Azure Virtual Machine sizes](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes-general) and select the size most suitable for your requirements.  

!include <high-availability-compute-recommendations>

!include <octopus-instance-mixed-os-warning>

### Database

Each Octopus Server node stores project, environment, and deployment-related data in a shared Microsoft SQL Server Database. Since this database is shared, it's important that the database server is also highly available. To host the Octopus SQL database in Azure, there are two options to consider:

- [SQL Server on a Virtual Machine](https://docs.microsoft.com/azure/virtual-machines/windows/sql/virtual-machines-windows-sql-server-iaas-overview/)
- [Azure SQL Database as a Service](https://docs.microsoft.com/azure/sql-database/sql-database-technical-overview/)

!include <high-availability-database-recommendations>
- [Azure SQL Database](https://azure.microsoft.com/services/sql-database/)

!include <high-availability-db-logshipping-mirroring-note>

### Shared storage

!include <high-availability-shared-storage-overview>

If your Octopus Server is running in Microsoft Azure, you can use [Azure Files](https://docs.microsoft.com/azure/storage/files/storage-files-introduction); it presents a file share over SMB 3.0.

#### Azure Files

If your Octopus Server is running in Microsoft Azure, there is only one solution unless you have a [DFS Replica](https://docs.microsoft.com/windows-server/storage/dfs-replication/dfsr-overview) in Azure. That solution is [Azure Files](https://docs.microsoft.com/azure/storage/files/storage-files-introduction) which presents a file share over SMB 3.0 that can be shared across all of your Octopus servers.

After you have created your File Share, the best option is to add the Azure File Share as a [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link) pointing at a local folder, for example `C:\Octopus\` for the Artifacts, Packages, and TaskLogs which need to be available to all nodes.

Run the PowerShell below before installing Octopus, substituting the placeholders with your own values:

```PowerShell
# Add the Authentication for the symbolic links. You can get this from the Azure Portal.

cmdkey /add:octostorage.file.core.windows.net /user:Azure\octostorage /pass:XXXXXXXXXXXXXX

# Add Octopus folder to add symbolic links

New-Item -ItemType directory -Path C:\Octopus

# Add the Symbolic Links. Do this before installing Octopus.

New-Item -Path C:\Octopus\TaskLogs -ItemType SymbolicLink -Value \\octostorage.file.core.windows.net\octoha\TaskLogs
New-Item -Path C:\Octopus\Artifacts -ItemType SymbolicLink -Value \\octostorage.file.core.windows.net\octoha\Artifacts
New-Item -Path C:\Octopus\Packages -ItemType SymbolicLink -Value \\octostorage.file.core.windows.net\octoha\Packages

```
:::hint
It's worth noting that you need to have created the folders within the Azure File Share first before trying to create the Symbolic Links. 
:::

[Install Octopus](/docs/installation/index.md) and then run the following:

```powershell
# Set the path 
& 'C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe' path --artifacts "C:\Octopus\Artifacts"
& 'C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe' path --taskLogs "C:\Octopus\TaskLogs"
& 'C:\Program Files\Octopus Deploy\Octopus\Octopus.Server.exe' path --nugetRepository "C:\Octopus\Packages"
```

### Load balancing in Azure

To distribute HTTP load among Octopus Server nodes with a single point of access, we recommended using an HTTP load balancer. 

!include <load-balancer-endpoint-info>

Azure has a wide range of [load balancers](https://docs.microsoft.com/azure/architecture/guide/technology-choices/load-balancing-overview) that will work with Octopus in a highly-available configuration:

- [Azure Traffic Manager](https://docs.microsoft.com/azure/traffic-manager/traffic-manager-overview)
- [Azure Application Gateway](https://docs.microsoft.com/azure/application-gateway/overview)
- [Azure Load Balancer](https://docs.microsoft.com/azure/load-balancer/load-balancer-overview)
- [Azure Front Door](https://docs.microsoft.com/azure/frontdoor/front-door-overview)
- [Kemp LoadMaster](https://kemptechnologies.com/uk/solutions/microsoft-load-balancing/loadmaster-azure/)
- [F5 Big-IP Virtual Edition](https://www.f5.com/partners/technology-alliances/microsoft-azure)

### Authentication providers

We recommend [Active Directory](https://en.wikipedia.org/wiki/Active_Directory) for most installations. For this to work in Azure you need a domain controller setup locally in Azure.  Please see our [authentication provider compatibility section](/docs/security/authentication/auth-provider-compatibility.md) for a full list of supported authentication providers.

If you're hosting in Azure with Domain Controllers, it would be a similar setup as described in our [on-premises](/docs/administration/high-availability/design/octopus-for-high-availability-on-premises.md) guide.

## Polling Tentacles with HA

!include <polling-tentacles-and-ha>

### Connecting Polling Tentacles

!include <polling-tentacles-and-ha-connecting>

#### Using a unique address

!include <polling-tentacles-connection-same-port>

#### Using a unique port

!include <polling-tentacles-connection-different-ports>

### Registering Polling Tentacles

!include <polling-tentacles-and-ha-registering>