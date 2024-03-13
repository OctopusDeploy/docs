---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Multi-tenant SaaS applications
description: A guide showing you how to use tenants to deploy a multi-tenant SaaS application using Octopus Deploy.
navOrder: 10
hideInThisSectionHeader: true
---

This guide will introduce you to Software as a Service (SaaS) multi-tenant deployments in Octopus. In this guide, we will be deploying an application called **Vet Clinic**. When a customer signs up to Vet Clinic, they get their own [Azure Web App](/docs/infrastructure/deployment-targets/azure/web-app-targets) and database for staging and production, choosing which region the application and data are hosted in. Testing is completed internally in development and test, then customers have their instance of the application deployed *optionally* to staging and finally onto production. 

In addition, customers can choose to take advantage of custom features, including custom branding on their instance of the Vet Clinic application.

The following resources have been preconfigured in Octopus 

* Four environments: Development, Test, Staging and Production.
* The guides deploys to Azure Web Apps and these have already been pre configured in Azure. To create some Azure resources you can follow [this](/docs/runbooks/runbook-examples/azure/provision-app-service/
) runbook guide to set up Azure Web App Services for each of the environments. 

<span><a class="button btn-success" href="/docs/tenants/guides/multi-tenant-saas-application/creating-new-lifecycle">Get Started</a></span>

## Guide contents

The following sections make up the guide:

- [Creating a lifecycle](/docs/tenants/guides/multi-tenant-saas-application/creating-new-lifecycle)
- [Creating the project](/docs/tenants/guides/multi-tenant-saas-application/creating-new-project)
- [Creating new tenant tags](/docs/tenants/guides/multi-tenant-saas-application/creating-tenant-tag-set)
- [Creating new tenants](/docs/tenants/guides/multi-tenant-saas-application/creating-new-tenants)
- [Creating project template variables](/docs/tenants/guides/multi-tenant-saas-application/creating-project-template-variables)
- [Creating new infrastructure](/docs/tenants/guides/multi-tenant-saas-application/creating-new-octopus-infrastructure)
- [Creating project deployment process](/docs/tenants/guides/multi-tenant-saas-application/creating-project-deployment-process)
- [Creating and deploying a release](/docs/tenants/guides/multi-tenant-saas-application/creating-project-release)