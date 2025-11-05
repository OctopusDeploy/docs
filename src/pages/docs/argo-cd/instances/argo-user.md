---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Argo CD Authentication
description: Limiting Octopus' access in Argo CD
navOrder: 10
hideInThisSectionHeader: true
---

OctopusDeploy fetches application, cluster and log data from your Argo CD Instance. This data is used in the Octopus UI to provide
a rich integration, and also during step execution to determine which applications are to be updated.

To request this data, Octopus must authenticate with Argo CD as a user with appropriate permissions.

While a new token could be generated for an existing user, it is recommended that a new user be created within Argo CD to
represent the Octopus interactions.

To do this, the following must be performed:
1. Create a new user in Argo CD
2. Create RBAC policies to allow the new user read-access to required resources
3. Generate an authentication token for the new user

## Create a new User
To create a new user in Argo, you must update the `argocd-cm` configmap (typically in the argo-cd namespace).

The following shows a configmap with a new user called `octopus` which is able to generate an apiKey, but cannot login
via Argo's web-ui.
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
  labels:
    app.kubernetes.io/name: argocd-cm
    app.kubernetes.io/part-of: argocd
data:
# add an additional local user with apiKey and login capabilities
#   apiKey - allows generating API keys
  accounts.octopus: apiKey
  accounts.octopus.enabled: "true"
```
For more information see [Argo User docs](https://argo-cd.readthedocs.io/en/stable/operator-manual/user-management/).

The newly created account will appear in Argo's webUI under Settings --> Accounts.
Alternatively, from the command line, the Argo CD Cli can be executed to confirm the user creation was successful:
```
argocd account list
```
Ensure the terminal output includes the `octopus` user, with an apiKey capability.

## Add Required Permissions
With the user created, an RBAC policy must be created allowing the new user to access required data.

The RBAC policies are stored within the `argocd-rbac-cm` configmap.

The following shows an Octopus user which has read only access to all applications, cluster and log data.
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
data:
  policy.csv: |
    p, octopus, applications, get, *, allow
    p, octopus, clusters, get, *, allow
    p, octopus, logs, get, */*, allow
```

If the permissions are not correctly set, Octopus will be able to connect to Argo, but will report an empty Application
list for the connected Argo CD instance (as Octopus had insufficient permissions to read the list).

For more information see [Argo RBC docs](https://argo-cd.readthedocs.io/en/stable/operator-manual/rbac/).

## Generate Authentication Token
There are two methods for creating an new authentication tokens in ArgoCD:
1. Via the webUI under Settings --> Accounts --> octopus
2. Via the `Argo CD Cli` tool.

To generate the authentication token for Octopus via the `Argo CD CLI` tool:
1. Login as a user with permission to create API Keys:
```
argocd account login <your argo web ui>
```
You will be prompted for a username and password - select a user with the apiKey-creation capability.
2. Create the API token for the Octopus user by executing:
```
argocd account generate-token --account octopus
```
The authentication token will be echoed to the terminal, and must be copied into the Gateway's installation mechanism (either
the Octopus UI, or helm installation).

For more information see see [Argo Cli Config](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_account_generate-token/).

## Verify Permissions
To ensure the octopus user has the correct permissions, the following argocd cli commands can be executed:

* ```argocd account can-i --auth-token <octopus-apikey> get clusters '*'```

* ```argocd account can-i --auth-token <octopus-apikey> get applications '*'```

* ```argocd account can-i --auth-token <octopus-apikey> get logss '*/*'```

These commands should all respond `yes`.

To confirm the account's access is limited, execute:
* ```argocd account can-i --auth-token <octopus-apikey> delete applications '*'```

Which should respond `no`.
