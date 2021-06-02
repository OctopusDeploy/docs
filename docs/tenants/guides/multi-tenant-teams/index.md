---
title: Multi-tenant teams
description: A guide showing you how to use tenants to support multiple teams developing the same application using Octopus Deploy.
position: 10
hideInThisSectionHeader: true
---

This guide demonstrates using the tenant feature to support multiple teams developing the same application.  Each team has its own dedicated infrastructure so the application can be individually tested before submitting to QA for testing, deployed to staging, and finally production.  In this scenario, we have a total of three teams, each configured as a tenant:
- Team Avengers
- Team Radical
- QA