---
title: Migrating to Octopus 3.4

---


This page describes how to migrate to Octopus 3.4 (or newer) and start using the built-in multi-tenant deployment features.


To be clear up-front: **we have not built a one-size-fits-all migration tool**. Until now, there have been several recommended ways to model multi-tenant deployments, and each implementation of those models will be different in some way or another. Perhaps you have already implemented multi-tenant deployments with Octopus using the **environment-per-tenant** or **project-per-tenant** models? Perhaps you use an **external system** to model your tenants and orchestrate Octopus deployments? Perhaps you've created a Library Variable Set per tenant, and others may have a giant list of Project Variables scoped to environments.


What we have done is built tooling and some sample applications for the Octopus API so you can take those pieces and build a migration tool that suits your specific scenario perfectly.


To be continued...
