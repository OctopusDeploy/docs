---
title: Rollback .NET Application on Windows Server
description: A guide on how to rollback a .NET application hosted on Windows Servers.
position: 10
hideInThisSectionHeader: true
---

This guide will use the [OctoFX Sample Application](https://github.com/OctopusSamples/OctoFX).  That application has three components:

- Database
- Windows Service
- Website

Rolling back a database is out of the scope of this guide.  As stated in this [article](https://octopus.com/blog/database-rollbacks-pitfalls), rolling back a database schema change could result in bad or deleted data.  This guide focuses on scenarios in which there were no database changes, or the database changes are backward compatible.  

## Zero Configuration Rollback

The easiest way to rollback to a previous version of your code is to:

1. Find the release you want to rollback.
2. Click the **REDEPLOY** button next to the environment you want to rollback.

