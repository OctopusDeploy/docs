---
layout: src/layouts/Default.astro
pubDate: 2023-09-27
modDate: 2023-09-27
title: Using OpenID Connect with Octopus and GitHub Actions
description: How to use OpenID Connect to interact with Octopus in GitHub Actions
navOrder: 30
hideInThisSection: true
---

Octopus has first-class support for using OpenID Connect (OIDC) within GitHub Actions when using the [`OctopusDeploy/login`](https://github.com/OctopusDeploy/login) action.

:::div{.hint}
Using OIDC to access the Octopus API is only supported for service accounts, to access the API for a user account please use [an API key](/docs/octopus-rest-api/how-to-create-an-api-key).
:::

## Configuring an OIDC identity for GitHub Actions

### GitHub Enterprise (self-hosted)

### Customized subject claims

## Using `OctopusDeploy/login` in GitHub Actions workflows

### Workflow job permissions

## API keys

## How to convert existing GitHub Actions workflows to use OIDC
