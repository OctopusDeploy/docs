---
title: Create and Deploy a Release
description: Example scripts to create and deploy a release
---

## Description

These scripts create and deploy a release, including examples for choosing a channel and deploying to tenants.

## Usage

Provide values for `Octopus URL`, `Octopus API Key`, `Space Name`, `Project Name`, `Environment Name`, `Channel Name`, and `Tenant Names` (optional) to create a release and deploy it to those environments.

:::warning
**These scripts will create a release and deployments to the provided environments. Take care when running this script or one based on it.**
:::

## Create and Deploy a Release

!include <create-and-deploy-release-scripts>

## Create and Deploy a Release to a Group of Tenants

!include <create-and-deploy-release-with-tenants-scripts>
