---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Change users domain
description: An example script that changes an Octopus user's Active Directory domain assignment.
---

This script demonstrates how to programmatically change an Octopus user's Active Directory domain assignment. This can be useful when you are migrating from one domain to another.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Maximum number of records to update
- Name of the old domain to search for
- Name of new to domain to use in place of the old domain

## Script

!include <change-user-domain-scripts>