---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-05-22
title: File Storage
navTitle: Overview
navSection: File Storage
navOrder: 3
description: How to configure file storage for Octopus Deploy
hideInThisSection: true
---

Octopus stores several files that are not suitable to store in the database. These include:

- Packages used by the [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository). These packages can often be very large in size.
- [Artifacts](/docs/projects/deployment-process/artifacts) collected during a deployment. Teams using Octopus sometimes use this feature to collect large log files and other files from machines during a deployment.
- Task logs are text files that store all of the log output from deployments and other tasks.
- Imported zip files used by the [Export/Import Projects feature](/docs/projects/export-import).
- Archived audit logs by the [Archived audit logs feature](/docs/security/users-and-teams/auditing/#archived-audit-events).
  
These files must be stored on a file system.  That folder can be located directly on the Windows Server hosting Octopus Deploy, however that is not something we recommend.  Especially if you want to host Octopus Deploy in a container (all the files would be destroyed when the container is destroyed).  

Octopus Deploy supports network file shares, as well as many cloud providers' storage solutions.  Whichever storage solution you opt for, it must meet the following requirements:

- Support the SMB or CIFS protocols.
- Be located in the same data center as the servers/container hosts that host Octopus Deploy.

This section provides configuration walkthroughs for the popular storage options our customers use.

- [Local File Storage](/docs/installation/file-storage/local-storage)
- [AWS File Storage](/docs/installation/file-storage/aws-storage)
- [Azure File Storage](/docs/installation/file-storage/azure-storage)
- [GCP File Storage](/docs/installation/file-storage/gcp-storage)
