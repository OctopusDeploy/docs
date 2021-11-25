---
title: Octopus Server in Kubernetes
description: Octopus can be installed into a Kubernetes cluster running the Octopus Server Linux container, optionally leveraging High Availability too.
position: 40
---

One of the driving forces behind creating the Octopus Server Linux Container was so Octopus could run in a container in Kubernetes for [Octopus Cloud](/docs/octopus-cloud/index.md). With the release of the Octopus Server Linux Container image in **2020.6**, this option is available for those who want to host Octopus in their own Kubernetes clusters.

This page describes how to run Octopus Server in Kubernetes, along with platform specific considerations when using different Kubernetes providers such as Azure AKS, AWS EKS, and Google GKE.

Since [Octopus High Availability](/docs/administration/high-availability/index.md) (HA) and Kubernetes go hand in hand, this guide will show how to support scaling Octopus Server instances with multiple HA nodes. It assumes a working knowledge of Kubernetes concepts, such as Pods, Services, Persistent volume claims and Stateful sets.

## Getting started {#getting-started}

Whether you are running Octopus in a Container using Docker or Kubernetes, or running it on Windows Server, there are a number of items to consider when creating an Octopus High Availability cluster:

- A Highly available [SQL Server database](/docs/installation/sql-server-database.md)
- A shared file system for [Artifacts, Packages, and Task Logs](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/index.md#ServerconfigurationandFilestorage-FileStorageFilestorage)
- A [Load balancer](/docs/administration/high-availability/load-balancing/index.md) for traffic to the Octopus Web Portal 
- Access to each Octopus Server node for [Polling Tentacles](/docs/administration/high-availability/maintain/polling-tentacles-with-ha.md)
- Creating each Octopus Server node, including the Startup and upgrade processes that may result in database schema upgrades

The following sections describe these in more detail by creating an Octopus High Availability cluster with two Octopus Server nodes.

:::hint
The YAML provided in this guide is designed to provide you with a starting point to help you get Octopus Server running in a container in Kubernetes. We recommend taking the time to configure your Octopus instance to meet your organization's requirements.
:::

## SQL Server Database {#sql-database}

!include <high-availability-database-recommendations>

If you plan to host Octopus in Kubernetes using one of the major Cloud providers managed Kubernetes platforms, for example AWS, Azure, or GCP, a good option to consider for your SQL Server database is their Database PaaS offerings.

For more details on the different hosted offerings, refer to the documentation for each Cloud provider:

- [AWS RDS](https://aws.amazon.com/rds/sqlserver/)
- [Azure SQL Database](https://azure.microsoft.com/products/azure-sql/database)
- [Google Cloud SQL for SQL Server](https://cloud.google.com/sql/sqlserver)

### Running SQL in a Container {#running-sql-in-container}

Its possible to run SQL Server in a container. This can be useful when running a Proof of Concept (PoC) with Octopus in Kubernetes. 

The following YAML creates a single instance of SQL Server Express that can be deployed to a Kubernetes cluster. It creates a [persistent volume claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes) to store the database files, a [service](https://kubernetes.io/docs/concepts/services-networking/service/) to expose the database internally, and the database itself:

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: mssql-data
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 8Gi
---
apiVersion: v1
kind: Service
metadata:
  name: mssql
spec:
  type: ClusterIP
  ports:
    -
      port: 1433
      targetPort: 1433
      protocol: TCP
  selector:
    app: mssql
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mssql-deployment
  labels:
    app: mssql
spec:
  selector:
    matchLabels:
      app: mssql
  replicas: 1
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: mssql
    spec:
      terminationGracePeriodSeconds: 10
      volumes:
        - name: mssqldb
          persistentVolumeClaim:
            claimName: mssql-data
      containers:
        - name: mssql
          image: mcr.microsoft.com/mssql/server:2019-latest
          ports:
            - containerPort: 1433
          env:
            - name: MSSQL_PID
              value: Express
            - name: ACCEPT_EULA
              value: 'Y'
            - name: SA_PASSWORD
              value: Password01!
          volumeMounts:
            - name: mssqldb
              mountPath: /var/opt/mssql
```
:::hint
**Change the SA Password:**
If you use the YAML definition above, remember to change the `SA_PASSWORD` from the value used here.
:::

Although Octopus [supports SQL Server Express](https://octopus.com/docs/installation/sql-server-database#sql-server-database), the edition has limitations. For more details, see the [Microsoft SQL Server editions documentation](https://docs.microsoft.com/sql/sql-server/editions-and-components-of-sql-server-version-15?view=sql-server-ver15#-editions).

## Load balancer {#load-balancer}

A Load balancer is required to direct traffic to the Octopus Web Portal and optionally a way to access each of the Octopus Server nodes in an Octopus High Availability cluster may be required if you're using [Polling Tentacles](/docs/administration/high-availability/maintain/polling-tentacles-with-ha.md).

### Octopus Web Portal load balancer {#octopus-web-portal-load-balancer}

The Octopus Web Portal is a React single page application (SPA) that can direct all backend requests to any Octopus Server node. This means we can expose all Octopus Server nodes through a single load balancer for the web interface. 

The following YAML creates a load balancer service directing web traffic on port `80` to pods with the label `app:octopus`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: octopus-web
spec:
  type: LoadBalancer
  ports:
    - name: web
      port: 80
      targetPort: 8080
      protocol: TCP
  selector:
    app: octopus
```
### Octopus Server Node load balancer {#octopus-node-load-balancers}

Unlike the Octopus Web Portal, Polling Tentacles must be able to connect to each Octopus node individually to pick up new tasks. Our Octopus HA cluster assumes two nodes, therefore a load balancer is required for each node to allow direct access.

The following YAML creates load balancers with separate public IPs for each node:

The `octopus-0` load balancer:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: octopus-0
spec:
  type: LoadBalancer
  ports:
    - name: web
      port: 80
      targetPort: 8080
      protocol: TCP
    - name: tentacle
      port: 10943
      targetPort: 10943
      protocol: TCP
  selector:
    statefulset.kubernetes.io/pod-name: octopus-0
```

The `octopus-1` load balancer:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: octopus-1
spec:
  type: LoadBalancer
  ports:
    - name: web
      port: 80
      targetPort: 8080
      protocol: TCP
    - name: tentacle
      port: 10943
      targetPort: 10943
      protocol: TCP
  selector:
    statefulset.kubernetes.io/pod-name: octopus-1
```

Note the selectors of:
- `statefulset.kubernetes.io/pod-name: octopus-0` and 
- `statefulset.kubernetes.io/pod-name: octopus-1`

These labels are added to pods created as part of a [Stateful Set](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset), and the values are the combination of the Stateful Set name and the pod index.

See our [Polling Tentacles with High Availability](/docs/administration/high-availability/maintain/polling-tentacles-with-ha.md) documentation for more information.

## File Storage {#file-storage}

To share common files between the Octopus Server nodes, we need access to three shared volumes that multiple pods can read to and write from simultaneously:

- Artifacts
- Package
- Task Logs

These are created via [persistent volume claims](https://kubernetes.io/docs/concepts/storage/persistent-volumes) with an [access mode](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) of `ReadWriteMany` to indicate they are shared between multiple pods. 

Most of the YAML in this guide can be used with any Kubernetes provider. However, the YAML describing file storage can have differences between each Kubernetes provider as they typically expose different names for their shared filesystems via the `storageClassName` property. 

:::hint
To find out more about storage classes, refer to the [Kubernetes Storage Classes documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/).
:::

Whilst it is possible to mount external storage by manually defining Persistent Volume definitions in YAML, Cloud providers offering Kubernetes managed services typically include the option to dynamically provision file storage based on persistent volume claim definitions. 

The next sections describe how to create file storage for use with Octopus running in Kubernetes using different Kubernetes providers to dynamically provision file storage.

### AKS storage {#aks-storage}

The following YAML creates the shared persistent volume claims that will host the artifacts, built-in feed packages, and the task logs using the `azurefile` storage class, which is specific to Azure AKS:

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: repository-claim
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: azurefile
  resources:
    requests:
      storage: 1Gi
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: artifacts-claim
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: azurefile
  resources:
    requests:
      storage: 1Gi
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: task-logs-claim
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: azurefile
  resources:
    requests:
      storage: 1Gi
```

### GKE storage {#gke-storage}

The following YAML creates the shared persistent volume claims that will host the artifacts, built-in feed packages, and the task logs using the `standard-rwx` storage class from the Google [Filestore CSI driver](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/filestore-csi-driver).

:::hint
**GKE Cluster version Pre-requisite:**
To use the Filestore CSI driver, your clusters must use **GKE version 1.21 or later**. The Filestore CSI driver is supported for clusters using Linux.
:::

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: repository-claim
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: standard-rwx
  resources:
    requests:
      storage: 1Gi
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: artifacts-claim
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: standard-rwx
  resources:
    requests:
      storage: 1Gi
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: task-logs-claim
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: standard-rwx
  resources:
    requests:
      storage: 1Gi
```

If you are running a GKE cluster in a non-default VPC network in Google Cloud, you may need to create a custom storage class specifying the network name. The following YAML shows creating a custom class that can be used with a non-default VPC network in GKE called `my-custom-network-name`:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-custom-network-csi-filestore
provisioner: filestore.csi.storage.gke.io
parameters:
  # "CIDR range to allocate Filestore IP Ranges from"
  # reserved-ipv4-cidr: 192.168.92.22/26
  # # standard (default) or premier or enterprise
  # tier: premier
  # # Name of the VPC. Note that non-default VPCs require special firewall rules to be setup.
  network: my-custom-network-name
allowVolumeExpansion: true
```

:::hint
Firewall rules may also need to be configured to allow the Kubernetes cluster access to the Filestore. Refer to the [Filestore Firewall rules documentation](https://cloud.google.com/filestore/docs/configuring-firewall) for further details.
:::

Once the storage class has been defined, you can mount your persistent volume claims using the name of the storage class. In the example above that was named `my-custom-network-csi-filestore`.

### Sharing a single volume {#sharing-single-volume}

Defining multiple persistent volume claims results in multiple storage buckets being created, one for each claim. This can result in an increased storage cost.

Another option is to create a single persistent volume claim that can be shared for each directory needed for Octopus. The following YAML shows an example of creating a single persistent volume claim, using the `azurefile` storage class:

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: octopus-storage-claim
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: azurefile
  resources:
    requests:
      storage: 4Gi
```

In the `volumes` definition of the Stateful Set (used for your [Octopus Server nodes](#octopus-server-nodes)), you can mount the single volume:

```yaml
volumes:
- name: octopus-storage-vol
  persistentVolumeClaim:
    claimName: octopus-storage-claim
```

Then you can reference the volume multiple times in the `volumeMounts` definition. This is achieved by using the [volumeMounts.subPath](https://kubernetes.io/docs/concepts/storage/volumes/#using-subpath) property to specify a sub-path inside the referenced volume instead of it's root:

```yaml
volumeMounts:
- name: octopus-storage-vol
    mountPath: /repository
    subPath: repository
- name: octopus-storage-vol                                                  
    mountPath: /artifacts
    subPath: artifacts
- name: octopus-storage-vol
    mountPath: /taskLogs
    subPath: taskLogs
```

## Octopus Server nodes {#octopus-server-nodes}

Lastly, we can combine all of the resources discussed previously into a [Stateful Set](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset) that creates the Octopus Server nodes.

A Stateful Set is beneficial, as it provides a mechanism for deploying pods that have:
- Fixed names 
- Consistent ordering
- An initial deployment process that rolls out one pod at a time, ensuring each is healthy before the next is started.

This functionality works very nicely when deploying Octopus, as we need to ensure that Octopus instances start sequentially so only one instance attempts to apply updates to the database schema. However redeployments (e.g. when upgrading) do need special consideration, see the [Upgrading Octopus in Kubernetes](#upgrading-octopus-in-kubernetes) section for further details

The following YAML below creates a Stateful Set with two pods. These pods will be called `octopus-0` and `octopus-1`, which will also be the value assigned to the `statefulset.kubernetes.io/pod-name` label. This is how we can link services exposing individual pods. 

The pods then mount a single shared volume for the built-in feed packages, artifacts, task logs and each pod's server task logs.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: octopus
spec:
  selector:
    matchLabels:
      app: octopus
  serviceName: "octopus"
  replicas: 2
  template:
    metadata:
      labels:
        app: octopus
    spec:
      affinity:
        # Try and keep Octopus nodes on separate Kubernetes nodes
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values:
                        - octopus
                topologyKey: kubernetes.io/hostname
      terminationGracePeriodSeconds: 10
      volumes:
      - name: octopus-storage-vol
        persistentVolumeClaim:
          claimName: octopus-storage-claim
      containers:
      - name: octopus        
        image: octopusdeploy/octopusdeploy:2021.3.8275
        securityContext:
          privileged: true
        env:
          - name: ACCEPT_EULA
            # "Y" means accepting the EULA at https://octopus.com/company/legal
            value: "Y"
          - name: OCTOPUS_SERVER_NODE_NAME
            valueFrom:
              fieldRef:
                fieldPath: metadata.name
          - name: DB_CONNECTION_STRING
            value: Server=mssql,1433;Database=Octopus;User Id=SA;Password=Password01!
          - name: ADMIN_USERNAME
            value: admin
          - name: ADMIN_PASSWORD
            value: Password01!
          - name: ADMIN_EMAIL
            value: admin@example.org
          - name: OCTOPUS_SERVER_BASE64_LICENSE
            # Your license key goes here. When using more than one node, a HA license is required. Without a HA license, the stateful set can have a replica count of 1.
            value: <License-goes-here>
          - name: MASTER_KEY
            # Replace this, as this value protects secrets in Octopus
            value: <MasterKey-goes-here>
        ports:
        - containerPort: 8080
          name: web
        - containerPort: 10943
          name: tentacle
        volumeMounts:
        - name: octopus-storage-vol
          mountPath: /repository
          subPath: repository
        - name: octopus-storage-vol                                                  
          mountPath: /artifacts
          subPath: artifacts
        - name: octopus-storage-vol
          mountPath: /taskLogs
          subPath: taskLogs
        - name: octopus-storage-vol
          mountPath: /home/octopus/.octopus/OctopusServer/Server/Logs
          subPathExpr: serverLogs/$(OCTOPUS_SERVER_NODE_NAME)
        lifecycle:
          preStop:
            exec:
              command:
              - /bin/bash
              - -c
              - '[[ -f /Octopus/Octopus.Server ]] && EXE="/Octopus/Octopus.Server" || EXE="dotnet /Octopus/Octopus.Server.dll"; $EXE node --instance=OctopusServer --drain=true --wait=600 --cancel-tasks;'
          # postStart must finish in 5 minutes or the container will fail to create
          postStart:
            exec:
              command:
              - /bin/bash
              - -c
              - 'URL=http://localhost:8080; x=0; while [ $x -lt 9 ]; do response=$(/usr/bin/curl -k $URL/api/octopusservernodes/ping --write-out %{http_code} --silent --output /dev/null); if [ "$response" -ge 200 ] && [ "$response" -le 299 ]; then break; fi; if [ "$response" -eq 418 ]; then [[ -f /Octopus/Octopus.Server ]] && EXE="/Octopus/Octopus.Server" || EXE="dotnet /Octopus/Octopus.Server.dll"; $EXE node --instance=OctopusServer --drain=false; now=$(date); echo "${now} Server cancelling drain mode." break; fi; now=$(date); echo "${now} Server is not ready, can not disable drain mode."; sleep 30; done;'
        readinessProbe:
          exec:
            command:
            - /bin/bash
            - -c
            - URL=http://localhost:8080; response=$(/usr/bin/curl -k $URL/api/serverstatus/hosted/internal --write-out %{http_code} --silent --output /dev/null); /usr/bin/test "$response" -ge 200 && /usr/bin/test "$response" -le 299 || /usr/bin/test
          initialDelaySeconds: 30
          periodSeconds: 30
          timeoutSeconds: 5
          failureThreshold: 60
        livenessProbe:
          exec:
            command:
            - /bin/bash
            - -c
            - URL=http://localhost:8080; response=$(/usr/bin/curl -k $URL/api/octopusservernodes/ping --write-out %{http_code} --silent --output /dev/null); /usr/bin/test "$response" -ge 200 && /usr/bin/test "$response" -le 299 || /usr/bin/test "$response" -eq 418
          periodSeconds: 30
          timeoutSeconds: 5
          failureThreshold: 10
        startupProbe:
          exec:
            command:
            - /bin/bash
            - -c
            - URL=http://localhost:8080; response=$(/usr/bin/curl -k $URL/api/octopusservernodes/ping --write-out %{http_code} --silent --output /dev/null); /usr/bin/test "$response" -ge 200 && /usr/bin/test "$response" -le 299 || /usr/bin/test "$response" -eq 418
          failureThreshold: 30
          periodSeconds: 60
```

:::hint
**Change the Default values:**
If you use the YAML definition above, remember to change the default values entered including the Admin Username, Admin Password, and the version of the `octopusdeploy/octopusdeploy` image to use. You also need to provide values for the License Key and database Master Key.
:::

The next sections describe the Stateful Set definition in more detail.

### Octopus Server Pod affinity {#server-pod-affinity}

For a greater degree of reliability, [Pod anti-affinity rules](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity) are used in the Stateful Set to ensure Octopus pods are not placed onto the same node. This ensures the loss of a node does not bring down the Octopus HIgh Availability cluster.

```yml
affinity:
  podAntiAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 100
        podAffinityTerm:
        labelSelector:
            matchExpressions:
            - key: app
                operator: In
                values:
                - octopus
        topologyKey: kubernetes.io/hostname
```

### Octopus Server Pod logs {#server-pod-logs}

In addition to the shared folders that are mounted for Packages, Artifacts and Task Logs, each Octopus Server node (Pod) also writes logs to a local folder in each running container.

To mount the same volume used for the shared folders for the server logs, we need a way to create a sub-folder on the external volume that's unique to each Octopus Server node running in a Pod. 

It's possible to achieve this using a special expression known as [subPathExpr](https://kubernetes.io/docs/concepts/storage/volumes/#using-subpath-expanded-environment). The server logs folder is mounted to the unique sub-folder determined by the environment variable `OCTOPUS_SERVER_NODE_NAME`, which is simply the pod name. 

```yaml
- name: octopus-storage-vol
  mountPath: /home/octopus/.octopus/OctopusServer/Server/Logs
  subPathExpr: serverLogs/$(OCTOPUS_SERVER_NODE_NAME)
```

An alternative option to using an external volume mount is to use a [volume claim template](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage). 

For each VolumeClaimTemplate entry defined in a `StatefulSet`, each Pod receives one PersistentVolumeClaim. When a Pod is (re-)scheduled onto a node, its `volumeMounts` mount the PersistentVolumes associated with its PersistentVolume Claims. 

```yaml
volumeClaimTemplates:
  - metadata:
      name: server-logs-vol
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 200Mi
```

You can then mount the folder for the server logs, with each Octopus Server Node (Pod) getting its own persistent storage:

```yml
- name: server-logs-vol
  mountPath: /home/octopus/.octopus/OctopusServer/Server/Logs
```

:::hint
**Note:** The PersistentVolumes associated with the Pods' PersistentVolume Claims are not deleted when the Pods, or StatefulSet are deleted. This must be done manually.
:::

### Container lifecycle hooks {#container-lifecycle-hooks}

The `preStop` hook is used to drain an Octopus Server node before it is stopped. This gives the node time to complete any running tasks and prevents it from starting new tasks. The `postStart` start hook does the reverse and disables drain mode when the Octopus Server node is up and running.

### Readiness, Start up and Liveness probes {#container-probes}

The `readinessProbe` is used to ensure the Octopus Server node is responding to network traffic before the pod is marked as ready. The `startupProbe` is used to delay the livenessProbe until such time as the node is started, and the `livenessProbe` runs continuously to ensure the Octopus Server node is functioning correctly.

### UI-only and back-end nodes {#ui-and-backend-nodes}

### Accessing Server node logs {#access-pod-server-logs}

Mounting Share:

```bash
sudo apt-get -y update &&
sudo apt-get install nfs-common

sudo mkdir -p /mnt/octo-ha-nfs

sudo mount 10.42.148.74:/vol1 /mnt/octo-ha-nfs

# Then access logs by navigating to the path and running 
sudo nano OctopusServer.txt
```

Logs from each pod:

```bash
kubectl logs octopus-0 
kubectl logs octopus-1
```

Tail logs on each pod:

```bash
kubectl logs octopus-0 -f 
kubectl logs octopus-1 -f
```

Logs from all pods (interspersed):

```bash
kubectl logs -l app=octopus
```

Inspect the logs interactively:

```bash
kubectl exec -it octopus-0 bash
```

## Upgrading Octopus in Kubernetes {#upgrading-octopus-in-kubernetes}

An initial deployment of the Stateful Set decribed above works exactly as Octopus requires; one pod at a time is successfully started before the next. This gives the first node a chance to update the SQL schema with any required changes, and all other nodes start-up and share the already configured database.

One limitation with Stateful Sets is how they process updates. For example, if the Docker image version was updated, by default the [rolling update strategy](https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/#updating-statefulsets) is used. A rolling update deletes and recreates each pod, which means that during the update there will be a mix of old and new versions of Octopus. This won’t work, as the new version may apply schema updates that the old version can not use, leading to unpredictable results at best, and could result in corrupted data.

The typical solution to this problem is to use a [recreate deployment strategy](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#recreate-deployment). Unfortunately, Stateful Sets don't support the recreate strategy.

What this means is that the Stateful Set can not be updated in place, but instead must be deleted and then a new version deployed. 

### Delete the Stateful Set

To delete the Stateful Set, first you can verify if the set exists by running the following `kubectl` command:

```bash
kubectl get statefulset octopus -o jsonpath="{.status.replicas}"
```

This checks to see if the Stateful Set exists by retrieving it's `replicas` count. If the Stateful Set doesn't exist, then the command will complete with an error:

```text
Error from server (NotFound): statefulsets.apps "octopus" not found.
```

If the Stateful Set exists, you can delete it by running the following `kubectl` command:

```bash
kubectl delete statefulset octopus
```

### Deploy new Stateful Set

Once the old Stateful Set has been deleted, the new fresh copy of the Stateful Set can then be deployed. It will start the new pods one by one, allowing the database update to complete as expected.

## Octopus in Kubernetes example {#octopus-in-kubernetes-example}


View a working example that deploys an Octopus High Availability configuration in our [samples instance](https://samples.octopus.app/app#/Spaces-105/projects/octopus-ha-in-gke/operations/runbooks/Runbooks-1862/process/RunbookProcess-Runbooks-1862).

The runbook consists of a number of [Deploy Raw Kubernetes YAML](/docs/deployments/kubernetes/index.md#raw-yaml-step) steps that deploy the resources discussed in this guide.

## Octopus Helm chart {#octopus-helm-chart}

Octopus can be installed into a Kubernetes cluster using a Helm chart.

Add the helm chart repository with the following commands:

```bash
helm repo add octopus https://octopus-helm-charts.s3.amazonaws.com
helm repo update
```

Generate a new database Master Key with the command:

```bash
openssl rand 16 | base64
```

Then install the chart with the command:

```bash
helm install octopus octopus/octopusdeploy --set octopus.username=admin --set octopus.password=Password01! --set octopus.licenseKeyBase64=<your Octopus license key base64 encoded> --set octopus.acceptEula=Y --set mssql-linux.acceptEula.value=Y --set octopus.masterKey=YOUR_GENERATED_KEY
```

The source code for the Helm chart can be found on [GitHub](https://github.com/OctopusSamples/OctopusHelmChart). The [values.yaml](https://github.com/OctopusSamples/OctopusHelmChart/blob/master/values.yaml) contains comments describing the options available.

For more information on how the helm chart works, see the blog post [Introducing the Octopus Server Linux Docker image](https://octopus.com/blog/introducing-linux-docker-image).