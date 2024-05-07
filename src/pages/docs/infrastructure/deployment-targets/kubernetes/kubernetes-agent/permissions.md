---
layout: src/layouts/Default.astro
pubDate: 2024-04-29
modDate: 2024-04-29
title: Permissions
description: Information about what permissions are required and how to adjust them
navOrder: 20
---

The Kubernetes agent uses service accounts to manage access to cluster objects.

There are 3 main components that run with different permissions in the Kubernetes agent:
- **Agent Pod** - This is the main component and is responsible for receiving work from Octopus Server and scheduling it in the cluster.
- **Script Pods** - These are run to execute work on the cluster. When Octopus issues work to the agent, the Tentacle will schedule a pod to run the script to execute the required work. These are short-lived, single-use pods which are removed by Tentacle when they are complete.
- **NFS Server Pod** - This optional component is used if no StorageClass is specified during installation.

# Agent Pod Permissions

The agent pod uses a service account which only allows the agent to create, view and modify pods, pod logs, config maps, and secrets in the agent namespace. Adjusting these permissions is not supported.

| Variable Name                      | Description                              | Default Value            |
|:-----------------------------------|:-----------------------------------------|:-------------------------|
| `agent.serviceAccount.name`        | The name of the agent service account    | `<agent-name>-tentacle`  |
| `agent.serviceAccount.annotations` | Annotations given to the service account | `[]`                     |

# Script Pod Permissions

By default, the script pods (the pods which run your deployment steps) are given cluster wide admin access to deploy any and all cluster objects in any namespaces as configured in your deployment processes.

The service account for script pods can be customized in a few ways:

| Variable Name                                 | Description                                                      | Default Value                                                                                                                                                                                                                              |
|:----------------------------------------------|:-----------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `scriptPods.serviceAccount.targetNamespaces`  | Limit the namespaces that the service account can interact with. | `[]`<br/>(When empty, all namespaces are allowed.)                                                                                                                                                                                         |
| `scriptPods.serviceAccount.clusterRole.rules` | Give the service account custom rules                            | <pre>- apiGroups:<br/>&nbsp;&nbsp;- '\*'<br/>&nbsp;&nbsp;resources:<br/>&nbsp;&nbsp;- '\*'<br/>&nbsp;&nbsp;verbs:<br/>&nbsp;&nbsp;- '\*'<br/>- nonResourceURLs:<br/>&nbsp;&nbsp;- '\*'<br/>&nbsp;&nbsp;verbs:<br/>&nbsp;&nbsp;- '\*'</pre> |
| `scriptPods.serviceAccount.name`              | The name of the scriptPods service account                       | `<agent-name>-tentacle`                                                                                                                                                                                                                    |
| `scriptPods.serviceAccount.annotations`       | Annotations given to the service account                         | `[]`                                                                                                                                                                                                                                       |

### Examples
<details data-group="script-pod-value-examples">
<summary>Target Namespaces</summary>

`scriptPods.serviceAccount.targetNamespaces`

<br/>

**command:**
```bash
helm upgrade --install --atomic \
--set scriptPods.serviceAccount.targetNamespaces="{development,preproduction}" \
--set agent.acceptEula="Y" \
--set agent.targetName="Nonproduction Agent" \
--set agent.serverUrl="http://localhost:5000/" \
--set agent.serverCommsAddress="http://localhost:10943/" \
--set agent.space="Default" \
--set agent.targetEnvironments="{Development,Preproduction}" \
--set agent.targetRoles="{k8s-cluster-tag}" \
--set agent.bearerToken="XXXX" \
--version "1.*.*" \
--create-namespace --namespace octopus-agent-my-agent \
my-agent\
oci://registry-1.docker.io/octopusdeploy/kubernetes-agent
```
</details>

<details data-group="script-pod-value-examples">
<summary>Cluster Role Rules</summary>

`scriptPods.serviceAccount.clusterRole.rules`

<br/>

**values.yaml:**
```yaml
scriptPods:
  serviceAccount:
    clusterRole:
      rules:
        - apiGroups:
          - '*'
          resources:
          - 'configmaps'
          - 'deployments'
          - 'services'
          verbs:
          - '*'
        - nonResourceURLs:
          - '*'
          verbs:
          - '*'

agent:
  acceptEula: 'Y'
  targetName: 'No Secret Access Production Agent'
  serverUrl: 'http://localhost:5000/'
  serverCommsAddress: 'http://localhost:10943/'
  space: 'Default'
  targetEnvironments:
    - 'Production'
  targetRoles:
    - 'k8s-cluster-tag'
  bearerToken: 'XXXX'
```
<br/>

**command:**
```Bash
helm upgrade --install --atomic \
--values values.yaml \
--version "1.*.*" \
--create-namespace --namespace octopus-agent-my-agent\
my-agent \
oci://registry-1.docker.io/octopusdeploy/kubernetes-agent
```
</details>


# NFS Server Pod Permissions

If you have not provided a predefined storageClassName for persistence, an NFS pod will be used. This NFS Server pod requires `privileged` access. For more information see [Kubernetes agent Storage](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/storage#nfs-storage).