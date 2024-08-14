The Kubernetes Worker is installed using [Helm](https://helm.sh) via the [octopusdeploy/kubernetes-agent](https://github.com/OctopusDeploy/helm-charts/tree/main/charts/kubernetes-agent) chart (which is published to [dockerhub](octopusdeploy)).

To simplify this, there is an installation wizard in octopus to generate the required values.

:::div{.warning}
Helm will use your current kubectl config, so make sure your kubectl config is pointing to the correct cluster before executing the following helm commands.
You can see the current kubectl config by executing:
```bash
kubectl config view
```
:::

1. In the Octopus Web Portal, navigate to the **Infrastructure** tab, select **Workers**, and click **ADD WORKER**
2. Choose **Kubernetes** and click **ADD** on the Kubernetes Worker card.
3. Enter a **Name** for the worker, and select the **Worker Pools** to which the worker should belong, and select **NEXT**
   1. The dialog permits for the inline creation ofa  worker pool via the **+** button.
   2. Click **Show advanced** to provide a custom Storage class or override the Octopus Server URL if required
4. Select the desired language (bash or powershell), then copy and execute the supplied helm install command in a terminal configured with your k8s cluster, and click **NEXT**
   1. This step is not required if the NFS driver already exists in your cluster (due to prior installs of k8s worker or deployment target)
5. Select the desired language (bash or powershell), then copy and execute the supplied helm install command in a terminal configured with your k8s cluster.
6. A green 'success' bar will appear when the Helm Chart has completed installation, and the worker has registered with the Octopus Server.
7. Click the **View Worker** button to display the settings of the created worker, or  **Close** to return to the **Add Worker** page

