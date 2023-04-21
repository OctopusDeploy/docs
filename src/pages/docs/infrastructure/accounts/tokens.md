---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Token account
description: Add token accounts to Octopus.
navOrder: 50
---
Tokens can be added to Octopus as accounts. This is useful, for instance, if you are deploying to [Kubernetes Targets](/docs/infrastructure/deployment-targets/kubernetes-target).

## Add a token to Octopus

1. Navigate to **Infrastructure ➜ Accounts** and click **ADD ACCOUNT**.
1. Select **Token** from the drop-down menu.
1. Give the account a meaningful name.
1. Add a description.
1. Enter the token into the **Token** field.
1. If you want to restrict which environments can use the account, select the environments that are allowed to use the account. If you select no environments, all environments will be allowed to use the account.
