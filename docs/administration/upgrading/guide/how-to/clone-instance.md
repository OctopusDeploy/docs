---
title: How to clone an instance
description: How to clone an existing instance of Octopus Deploy for upgrading.
position: 3
---

Cloning an instane of Octopus Deploy is a low-risk way to test out an upgrade along with learning about new features and functionality without affecting your production instance.

### Consider setting up a test instance

!include <upgrade-consider-test-instance>

To configure a test instance please see [this page](INCLUDE LINK).

## Backup existing Octopus Deploy Instance

!include <upgrade-octopus-backup>

## Create a clone of the existing instance

!include <upgrade-create-cloned-instance>

## Upgrade the cloned instance to a modern version

Upgrading the cloned instance will be the same as performing an in-place upgrade.

!include <inplace-upgrade>

## Test the upgraded instance

!include <upgrade-test-instance>

## Migrating from the old instance to the new instance

!inclue <upgrade-migrating-instances>