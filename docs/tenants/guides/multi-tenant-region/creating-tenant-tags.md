---
title: Multi-Tenant regions
description: Guides showing you how to use tenants to deploy an application to regions using different release rings.
position: 10
hideInThisSectionHeader: true
---

As previously stated, Car Rental utilizes Azure to host the application for the different stores in their chain.  In addition, each store plays a different role in the development lifecycle by participating in different upgrade rings.  To designate which tenant is in which region and upgrade ring, we define `Tenant Tag Sets`.

## Ceating Tenant Tag Sets
`Tenant Tag Sets` are stored in the `Library` of Octopus Deploy.  To create Tenant Tag Sets, click on Library `Library` -> `Tenant Tag Sets` -> **ADD TAG SET**

![](images/tenant-tageset-create.png)

Give the `Tag Set` a name, an optional description, and create some Tags.  For the Car Rental application, we're creating an Azure Region Tag Set with the different Azure Regions as the Tags.

![](images/tenant-tag-create.png)

We also need to define the different upgrade rings that the stores participate in.  Tags can be assigned different colors as a quick visual indicator as to which tag has been assigned.  In the below image, we can see that Alpha is red, Beta is blue, and Stable is green

![](images/tenant-tag-release-ring.png)