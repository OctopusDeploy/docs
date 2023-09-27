---
layout: src/layouts/Default.astro
pubDate: 2023-09-27
modDate: 2023-09-27
title: Using OpenID Connect in Octopus with other issuers
description: How to use OpenID Connect to interact with Octopus using other issuers
navOrder: 30
hideInThisSection: true
---

Octopus supports using OpenID Connect for any external system that can issue a signed OIDC token that can be validated anonymously via an HTTPS endpoint.

:::div{.hint}
Using OIDC to access the Octopus API is only supported for service accounts, to access the API for a user account please use [an API key](/docs/octopus-rest-api/how-to-create-an-api-key).
:::

## Configuring an OIDC identity

## OpenID discovery endpoints

## Exchanging an OIDC token for an Octopus access token {#OidcOtherIssuers-TokenExchange}

## Using the access token in API requests
