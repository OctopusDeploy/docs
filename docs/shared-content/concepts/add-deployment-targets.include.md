<iframe width="560" height="315" src="https://www.youtube.com/embed/CBws8yDaN4w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

With Octopus Deploy, you can deploy software to Windows servers, Linux servers, Microsoft Azure, AWS, Kubernetes clusters, cloud regions, or an offline package drop. Regardless of where you're deploying your software, these machines and services are known as your deployment targets.  Octopus organizes your deployment targets (the VMs, servers, and services where you deploy your software) into [environments](/docs/infrastructure/environments/index.md). 

1. Navigate to **{{ Infrastructure, Deployment Targets }}** and click **ADD DEPLOYMENT TARGET**.
1. Select the type of deployment target you are adding.
1. Select the type of connection your deployment target will make, and follow the on-screen instructions.

If you run into any issues, refer to the documentation for the type of deployment target you are configuring:

- [Windows](/docs/infrastructure/deployment-targets/tentacle/windows/index.md)
- [Linux](/docs/infrastructure/deployment-targets/linux/index.md)
- [Azure](/docs/infrastructure/deployment-targets/azure/index.md)
- [Kubernetes](/docs/infrastructure/deployment-targets/kubernetes-target/index.md)
- [Offline package drop](/docs/infrastructure/deployment-targets/offline-package-drop.md)
- [Cloud region](/docs/infrastructure/deployment-targets/cloud-regions.md)

As you configure your deployment targets, select the environment, they will belong to, and assign the target role(s).  Roles ensure you deploy the right software to the correct deployment targets. Typical target roles include:

- web-server
- app-server
- db-server 

<iframe width="560" height="315" src="https://www.youtube.com/embed/AU8TBEOI-0M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

1. Enter *dev-server-01* in the **Display Name**
1. In **Environments** select *Development*.
1. In your deployment target select enter in **hello-world** as the target role. 
1. Click on the **SAVE** button.

![Deployment target with roles](/docs/shared-content/concepts/images/target-with-roles.png "width=500")
