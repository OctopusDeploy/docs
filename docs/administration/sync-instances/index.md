---
title: Sync instances
description: How to keep 2 or more Octopus Deploy instances in sync.
position: 45
hideInThisSection: true
---

Outline:
- Introduction -> Why should someone read this guide
- Use Cases -> Dev/Test + Production or split Production Instances
- Data Challenges with Syncing Instances
    - Shared Items
        - Environments
        - Feeds
        - Accounts
        - Lifecycle Phases
        - Certificates
        - Targets
        - Workers
        - Library Variable Sets
        - Step Templates
    - Project Items
        - Deployment Processes
        - Runbooks and Runbook Processes
        - Variables
        - Channels (and their rules)
    - What you shouldn't sync
        - Deployments
        - Releases
        - Users
        - External Auth Providers
        - Server Settings (folders, SMTP, issue tracking integration)
- Tools to Avoid
    - Project export/import
    - Legacy Migrator
- Considerations
    - Encrypted Items
        - Accounts
        - Feed Credentials
        - Sensitive Variables
    - Variables
    - Storing Scripts
    - When to sync
- Options     
    - Terraform Provider (link to guide)
    - Config as Code (link to guide)
    - Rest API (link to guide)
    