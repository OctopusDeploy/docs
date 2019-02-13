---
title: Tokens
description: Add token accounts to Octopus.
position: 50
---
Tokens can be added to Octopus as accounts. This is useful, for instance, if you are deploying to [Kubernetes Targets](/docs/deployment-examples/kubernetes-deployments/kubernetes-target/index.md).

## Add a Token to Octopus

1. Navigate to **{{infrastructure,Accounts}}** and click **ADD ACCOUNT**.
1. Select **Token** from the dropdown menu.
1. Give the account a meaningful name.
1. Add a description.
1. Enter the token into the **Token** field.
1. If you want to restrict which environments can use the account, select the environments that are allowed to use the account. If you select no environments, all environments will be allowed to use the account.
