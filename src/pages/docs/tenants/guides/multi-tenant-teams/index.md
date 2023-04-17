---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Multi-tenant teams
description: A guide showing you how to use tenants to support multiple teams developing the same application using Octopus Deploy.
navOrder: 10
hideInThisSectionHeader: true
---

This guide demonstrates using the tenant feature to support multiple teams developing the same application.  The Octo Pet Shop application supports multiple development teams.  Each team has dedicated infrastructure so the application can be individually tested before submitting to QA for verification, deployed to staging, and finally production.  In this scenario, we have a total of three teams, each configured as a tenant:

- Team Avengers
- Team Radical
- QA

The development teams have the ability to create and deploy releases to their specific tenant to the Development environment only.  QA is able to deploy to the QA tenant in Test, and Operations are able to deploy to Staging and Production.  Operations, in this case, is not a tenant so the Staging and Production environments are untenanted.

<span><a class="btn btn-success" href="/docs/tenants/guides/multi-tenant-teams/creating-new-tenants">Get Started</a></span>

## Guide contents

The following sections make up the guide: