---
layout: src/layouts/Default.astro
pubDate: 2026-03-05
modDate: 2026-03-06
title: Project template best practices
subtitle: Best practices for creating project templates within Platform Hub
icon: fa-solid fa-lock
navTitle: Best Practices
navSection: Project Templates
description: Best practices for creating project templates within Platform Hub
navOrder: 180
---

This document uses **Producer** and **Consumer** frequently. To avoid confusion, use these definitions:

- **Producer**: the user who creates and manages project templates in Platform Hub.
- **Consumer**: the user who creates projects from those templates.

## Project template administration

### Establish a naming standard

Use a **[ Prefix ] - [ Template Name ]** convention that's easy for everyone to understand at a glance. The template name should be succinct and informative.

The prefix should convey the intended use. For example:

- **Project - [ Template Name ]** for general deployment project templates
- **Service - [ Template Name ]** for templates designed for specific service types (APIs, background workers, etc.)

### Define what major, minor, patch, and pre-release mean for your organization

Project template versioning provides hints:

- **Major** (breaking changes)
- **Minor** (non-breaking changes)
- **Patch** (bug fixes)
- **Pre-release**

Without a shared definition of breaking vs. non-breaking, teams will interpret these differently. A starting point for a policy:

- **Major**: The change fundamentally alters how the template works. Parameters have been added or removed. Consumers need to review and test the update before accepting it.
- **Minor**: Parameters may have been added or adjusted, which could require a change in the consuming project, but the core behavior is preserved.
- **Patch**: No parameters were added or removed. Bug fixes only. Consuming projects can accept the update without a deployment process change.
- **Pre-release**: Use for changes that aren't ready for general use. Share with a specific space to test before promoting.

### Use branch protection on the Platform Hub Git repository

Template changes should happen in a branch and be reviewed via a pull request. Use the pre-release feature to test changes before promoting them to a stable version.

## Building templates

### Keep templates focused

A project template should represent a clear type of project, not try to accommodate every variation your organization uses. If you find yourself adding conditional logic to handle different use cases, that's a sign you need more than one template.

### Use parameters for everything consumer-specific

Parameters are the only way information should flow from a project into the template. This means:

- Don't hardcode space-specific values, account names, or resource identifiers in the template
- Don't expect consumers to know internal variable names. Expose them as parameters
- Any external reference such as secrets, feeds, Worker Pools, and target tags must come in via a parameter

### Keep consumer decision-making to a minimum

A consumer should be able to create a project from the template by supplying a small set of well-defined inputs. They shouldn't need to understand the internal mechanics of how the deployment works.

A consumer should be able to say:

> I want to deploy this service using these values:
>
> - The container URL
> - The target tag of the cluster to deploy to
> - The connection string for the database

It's the producer's job to figure out how to take those inputs and run a reliable deployment.

### Variables defined in the template are inherited

When a project is created from a template, it inherits all variables defined in the template. Treat template variables as your baseline configuration. Use parameters for the values that will differ between projects. Don't hardcode them into variables directly.

### Include notes for each step in the deployment process

Step notes help consumers understand what each step is doing and why. If a deployment fails, clear notes make it much easier for them to self-diagnose. Don't assume that a step name alone provides enough context.
