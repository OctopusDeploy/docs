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

Some larger files - like [packages](/docs/packaging-applications/package-repositories), artifacts, and deployment task logs - aren't suitable to be stored in the database, and so must be stored on a file system.  That folder can be located directly on the Windows Server hosting Octopus Deploy, however that is not something we recommend.  Nor is it supported if you want to host Octopus Deploy in a container (all the files would be destroyed when the container is destroyed).  

Octopus Deploy supports network file shares, as well as many cloud providers' storage solutions.  Whichever storage solution you opt for, it must meet the following requirements:

- Support the SMB or CIFS protocols.
- Be located in the same data center as the servers/container hosts that host Octopus Deploy.

This section provides configuration walkthroughs for the popular storage options our customers use.

- [Local File Storage](/docs/installation/file-storage/local-storage)
- [AWS File Storage](/docs/installation/file-storage/aws-storage)
- [Azure File Storage](/docs/installation/file-storage/azure-storage)
- [GCP File Storage](/docs/installation/file-storage/gcp-storage)
