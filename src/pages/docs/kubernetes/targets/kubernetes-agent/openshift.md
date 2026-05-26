---
layout: src/layouts/Default.astro
pubDate: 2026-05-25
modDate: 2026-05-25
title: Octopus Kubernetes agent on Openshift
navTitle: Openshift
description: How to configure a Kubernetes agent for Openshift
navOrder: 23
---

Agent can be run under `nonroot-v2` SCC. This means you will probably need to manually assign the SCC to service accounts.

Installation steps are following:

1. create dedicated project (namespace)

    ```bash
    NS_NAME="octopus-agent-<name>"
    oc new-project $NS_NAME --description="Octopus Deploy kubernetes agent <name>" --display-name="Octopus Deploy k8s agent"
    ```

2. Assign `nonroot-v2` SCC to SAs

    - **Agent**

    ```bash
    NS_NAME="octopus-agent-<name>"
    AGENT_SERVICE_ACCOUNT="octopus-agent-tentacle"
    oc adm policy add-scc-to-user nonroot-v2 -z $AGENT_SERVICE_ACCOUNT -n $NS_NAME
    ```

    - **Pod scripts**

    ```bash
    NS_NAME="octopus-agent-<name>"
    POD_SCRIPTS_SERVICE_ACCOUNT="octopus-agent-scripts"
    oc adm policy add-scc-to-user nonroot-v2 -z $POD_SCRIPTS_SERVICE_ACCOUNT -n $NS_NAME
    ```

    - **Auto-upgrader**

    ```bash
    NS_NAME="octopus-agent-<name>"
    POD_SCRIPTS_SERVICE_ACCOUNT="octopus-agent-auto-upgrader"
    oc adm policy add-scc-to-user nonroot-v2 -z $POD_SCRIPTS_SERVICE_ACCOUNT -n $NS_NAME
    ```

3. To make sure that you will not have problems with PV StorageClass requires to have explicit UID to match one from securityContext. Here is important part of your StorageClass `mountOptions`:

    ```yaml
    mountOptions:
    - uid=999
    - forceuid
    - file_mode=0775 #rwx for user required
    - dir_mode=0775 #rwx for user required
    ```

4. Agent and script pods support running in non-root mode. UID/GID should be 999. Run `helm install` command with extra values:

    ```yaml
    agent:
      securityContext:
        runAsUser: 999
        runAsGroup: 999
        fsGroup: 999
        fsGroupChangePolicy: "OnRootMismatch"
    scriptPods:
      securityContext: 
        runAsUser: 999
        runAsGroup: 999
        fsGroup: 999
        fsGroupChangePolicy: "OnRootMismatch"
    persistence:
      storageClassName: {your-custom-value} #required - use name from previous step
    ```
