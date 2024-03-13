---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Accounts
description: This section includes examples of how to use the REST API to create and manage accounts in Octopus.
navOrder: 10
hideInThisSectionHeader: true
---

[Accounts](https://oc.to/OnboardingAccountsLearnMore) help you to centralize account details used during your deployments, including things like username/password, tokens, Azure and AWS credentials and SSH key pairs. 

Out-of-the-box, Octopus provides different types of accounts to help manage your infrastructure:

- [Azure account](/docs/infrastructure/accounts/azure).
- [AWS account](/docs/infrastructure/accounts/aws).
- [Google Cloud account](/docs/infrastructure/accounts/google-cloud).
- [SSH Key Pair](/docs/infrastructure/accounts/ssh-key-pair).
- [Username/Password](/docs/infrastructure/accounts/username-and-password).
- [Tokens](/docs/infrastructure/accounts/tokens). 

You can use the REST API to create and manage accounts in Octopus. Typical tasks can include:

- [Create an AWS account](/docs/octopus-rest-api/examples/accounts/create-aws-account)
- [Create an Azure service principal](/docs/octopus-rest-api/examples/accounts/create-azure-service-principal)
- [Create a Google Cloud account](/docs/octopus-rest-api/examples/accounts/create-gcp-account)