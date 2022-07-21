---
title: Disaster recovery
position: 40
description: How to work with your data and disaster recovery in an Octopus Cloud instance.
---

This page describes the disaster recovery procedure and data imports/exports for Octopus Cloud.

## Disaster Recovery Procedure

Octopus Deploy hosts the cloud offering (Octopus Cloud) on Microsoft Azure utilizing several Azure services. Octopus Deploy shall endeavor to ensure business continuity of Octopus Cloud in the event of any disaster.  Octopus Cloud disaster resiliency and recovery are largely determined by the disaster recovery measures that are provided by these services, in addition to the Customer’s own disaster recovery preparations such as determining which restore point to use for the recovery. Depending upon the nature of the event, Octopus Deploy’s response may be limited to assisting customers and Azure support to restore service. 

Consequently, this information is provided as guidance information only and does not form part of our Customer Agreement, nor does it affect or limit the operation of any force majeure releases. Customers should ensure that they have their own disaster recovery procedures in place following disaster recovery best practice. 

### Customer instances

| Level of Disaster                              | Impact                     | Data Redundancy                        | Data durability | RTO | RPO | Parties involved             |
|------------------------------------------------|----------------------------|----------------------------------------|-----------------|-------------------------------|----------------------------------------------------|------------------------------|
| Failure of a Node                              | Minor service interruption | Local copies plus geo-redundant backup | 16 9’s          | 30s                           | 5s                                                 | Microsoft                    |
| Individual customer breach / data corruption   | Service interruption       | Restore from a geo-redundant backup    | 12 9’s          | 1 hr                          | 1 hour or to the customer specified restore point. | Microsoft and Octopus Deploy |
| Data Center failure (single Availability zone) | Service interruption       | Restore from a geo-redundant backup    | 12 9’s          | 12 hrs                        | 1 hour or to the customer specified restore point. | Microsoft and Octopus Deploy |

For further information, customers should refer to [Microsoft’s disaster recovery](https://docs.microsoft.com/en-us/azure/azure-sql/database/business-continuity-high-availability-disaster-recover-hadr-overview?view=azuresql#recover-a-database-to-the-existing-server) documentation.

### Octopus Cloud administration portal (internal system)

The Octopus Cloud administration portal is used to manage customer instances. 

Note: The portal is hosted in a separate Azure region from customer instances and is not required to be online for continuity of service to customers. The disaster recovery measures taken, as detailed below, will allow the portal to be restored according to the following table: 

| Level of Disaster                              | Impact                                 | Data Redundancy                        | Data durability | RTO | RPO | Parties involved             |
|------------------------------------------------|----------------------------------------|----------------------------------------|-----------------|-------------------------------|---------------------------------------------|------------------------------|
| Failure of a Node                              | No customer impact                     | Local copies plus geo-redundant backup | 16 9’s          | 30s                           | 5s                                          | Microsoft                    |
| Portal data corruption or compromise           | No customer impact, portal unavailable | Restore from a geo-redundant backup    | 12 9’s          | 1 hr                          | 1 hour or to the appropriate restore point. | Microsoft and Octopus Deploy |
| Data Center failure (single Availability zone) | No customer impact, portal unavailable | Restore from a geo-redundant backup    | 12 9’s          | 12 hrs                        | 1 hour or to the appropriate restore point. | Microsoft and Octopus Deploy |

For further information, customers should refer to [Microsoft’s disaster recovery](https://docs.microsoft.com/en-us/azure/azure-sql/database/business-continuity-high-availability-disaster-recover-hadr-overview?view=azuresql#recover-a-database-to-the-existing-server) documentation.

### Azure Region Failure

In the case of an Azure region wide disaster the time to restore services will vary depending on the nature of the disaster. For short duration outages the best strategy may be to wait for Microsoft to restore services within the region. In the case of region wide disasters affecting customer instances, for longer duration disasters restoration of services will entail provisioning a new customer instance in a new Azure region (in the same PII jurisdiction) and restoring the customer’s database from the geo-redundant backup. For customer instances and the Octopus Cloud portal the time to restore operations is estimated to be 24 hrs once a new region is made available by Microsoft. The RPO in is 1 hr or to the customer specified restore point, as applicable. Note that there is not a geo-redundant copy of the Octopus Cloud File store, and the customer will need to re-build, upload, and/or regenerate any required packages and artifacts, as required by their deployments. 

### Definitions

| Term                                                 | Explanation                                                                                                                                                        | Reference                                                                                                                                  |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Node                                                 | A single copy of the data within the same data center                                                                                                              | [Microsoft Data Redundancy](https://docs.microsoft.com/en-us/azure/storage/common/storage-redundancy)                                      |
| Availability Zone                                    | A single zone with 3 local copies of data                                                                                                                          | [Microsoft Data Redundancy](https://docs.microsoft.com/en-us/azure/storage/common/storage-redundancy)                                      |
| ZRS (Zone redundant storage)                         | Zone Redundant storage – Three Availability zones in data centers that are self-contained in the same region.                                                      | [Microsoft Data Redundancy](https://docs.microsoft.com/en-us/azure/storage/common/storage-redundancy)                                      |
| RA-GRS (Read available geographic redundant storage) | Geographic redundant storage which is the back up of data in a second geographic region within the same privacy jurisdiction (e.g., USA or EU or AU)               | [Microsoft Data Redundancy](https://docs.microsoft.com/en-us/azure/storage/common/storage-redundancy)                                      |
| Durability                                           | A measure of the integrity of data, once stored, over time (e.g., 99.999% = 5 9’s) i.e., the degree to which the data deteriorates over time (a year) when stored. | [Definition from Google](https://cloud.google.com/blog/products/storage-data-transfer/understanding-cloud-storage-11-9s-durability-target) |
| RTO (Recovery time objective)                        | The objective for the time taken to restore a service to operation                                                                                                 | [Wikipedia RTO](https://en.wikipedia.org/wiki/Disaster_recovery#Recovery_Time_Objective)                                                   |
| RPO (Recovery point objective)                       | The objective of how much processing/data is lost (not recoverable) measured in time.                                                                              | [Wikipedia RPO](https://en.wikipedia.org/wiki/Disaster_recovery#Recovery_Point_Objective)                                                  |

## Data

### Importing data

Due to some key differences between the self-hosted and cloud configurations, it **is not possible** to use the existing [Migration API](/docs/octopus-rest-api/migration-api/index.md) to import data. If you are migrating from an existing self-hosted instance please see [migrating from self-hosted to Octopus Cloud](/docs/octopus-cloud/migrations.md).

### Exporting your data

If you need to export your data, this can be done with the [Migration API](/docs/octopus-rest-api/migration-api/index.md), alternatively, we can provide you with a full database backup if required. Please visit the [support page](https://octopus.com/support) if you need this.
