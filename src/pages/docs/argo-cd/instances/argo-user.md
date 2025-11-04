---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Octopus user in Argo
description: Limiting Octopus' access in Argo CD
navOrder: 10
hideInThisSectionHeader: true
---

OctopusDeploy fetches application, cluster and log data from your Argo CD Instance. This data is used in the Octopus UI to provide
a rich integration, and also during step execution to determine which applications/repositories are to be updated.

To request this data, Octopus must authenticate with Argo CD as a user with appropriate permissions.

While a new token could be generated for an existing user, it is highly advised that a new user be created within Argo to
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
  accounts.octopus.enabled: true
```
For more information see [Argo User docs](https://argo-cd.readthedocs.io/en/stable/operator-manual/user-management/).

## Add Required Permissions
With the user created, an RBAC policy must be created, to allow the new user to access required data.

The RBAC policies are stored within the `argocd-rbac-cm` configmap.

The following shows an Octopus user which has read only access to applications, cluster and log data.
```
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: my-project
  namespace: argocd
spec:
  sourceRepos:
    '*'
  destinations:
    namespace: my-namespace server: https://kubernetes.default.svc roles:
    name: my-project-role description: Defines permissions for my-project.
  policies:
    p, octopus, applications, get, *, allow
    p, octopus, logs, get, *, allow
    p, octopus, clusters, get, *, allow
```

If the permissions are not correctly set, Octopus will be able to connect to Argo, but will report an empty Application
list for the connected Argo CD instance (as Octopus had insufficient permissions to read the list).

For more information see [Argo RBC docs](https://argo-cd.readthedocs.io/en/stable/operator-manual/rbac/).

## Generate Authentication Token

To generate the authentication token for Octopus, you are required to use the `Argo CD CLI` tool.

Firstly, you must login as a user with sufficient privileges to generate API tokens, then you may create the required token.

To login:
```
argocd account login <your argo web ui>
```
You will be prompted for a username and password.

Once logged in, you can create the API token for the Octopus user by executing:
```
argocd account generate-token --account octopus
```
The authentication token will be echoed to the terminal, and must be copied into the Gateway's installation mechanism (either
the Octopus UI, or helm installation).

For more information see see [Argo Cli Config](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_account_generate-token/).