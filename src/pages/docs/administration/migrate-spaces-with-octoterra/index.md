---
layout: src/layouts/Default.astro
pubDate: 2099-01-01
modDate: 2099-01-01
title: Migrating spaces with octoterra
description: How to migrate spaces using the octoterra tool
navOrder: 100
hideInThisSection: true
navSearch: false
navSitemap: false
navMenu: false
robots: noindex, follow
---

Octoterra is a tool that exports Octopus projects, runbooks, and spaces to a Terraform module. Octoterra can be used to migrate resources between spaces and instances. However, there are limitations that must be accounted for as part of a migration. This documentation outlines a process for migrating projects from one space to another, highlighting the limitations and workaround of the octoterra tool.

## Limitations of octoterra and migrating projects between instances

### Sensitive values

Octoterra inspects the state of a space via the Octopus API and the API does not expose sensitive values. This means that octoterra can not export:

* The value of sensitive variables associated with a project, tenant, or library variable set 
* Credentials defined in feeds, accounts, or git credentials
* The contents of a certificate
* Sensitive values defined in steps

Octoterra defines Terraform variables to allow the value of these fields to be defined when the module is applied.

### Step templates

The Octopus Terraform provider does not yet support defining step templates. Because step templates are assigned a unique ID in each space, it is not possible to export a project or runbook that references a step template across spaces.

As a workaround, octoterra can detach step templates while exporting a project or runbook. Projects or runbooks with detached step templates can be recreated in a new space.

### New step framework

Some steps, such as the ECS deployment steps, rely on a new framework. Steps that use the new framework are not currently supported by the Terraform provider. These steps can not be exported by octoterra.
