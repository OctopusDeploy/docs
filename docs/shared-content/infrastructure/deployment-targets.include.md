With Octopus Deploy, you can deploy software to Windows servers, Linux servers, Microsoft Azure, AWS, Kubernetes clusters, cloud regions, or an offline package drop. Regardless of where you're deploying your software, these machines and services are known as your deployment targets.

Deployment targets are defined as:

|Host                                                                                                                   | <div style="width:250px">Target Count Against License</div> | Important Note       |
|---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------| ---------------------|
| [Windows Server running a Tentacle](/docs/infrastructure/deployment-targets/windows-targets/index.md)                 | 1 Target per Tentacle instance     | Listening Tentacles registered multiple times on the same instance will count as one (1) target. |
| [Linux Server running a Tentacle](/docs/infrastructure/deployment-targets/linux/tentacle/index.md)                    | 1 Target per Tentacle instance     | Listening Tentacles registered multiple times on the same instance will count as one (1) target. |
| [SSH Connection](/docs/infrastructure/deployment-targets/linux/ssh-target.md)                                         | 1 Target per SSH Connection        | | 
| [Kubernetes Cluster](/docs/infrastructure/deployment-targets/kubernetes-target/index.md)                              | 1 Target per Kubernetes Namespace  | A namespace is required when registering the Kubernetes cluster with Octopus Deploy.  By default, the namespace used in the registration is used in health checks and deployments.  The namespace can be overwritten in the deployment process.|
| [AWS ECS Cluster](/docs/infrastructure/deployment-targets/amazon-ecs-cluster-target.md)                               | 1 Target per ECS Cluster           | |
| [Azure Web App / Function  / Cloud Service](/docs/infrastructure/deployment-targets/azure/web-app-targets/index.md)   | 1 Target per Web App / Function    | This represents how Octopus Deploy _currently_ counts Azure Web Apps / Functions.  However, one (1) Azure Web App / Function is not equal to one (1) Linux server.  For customers making heavy use of Azure Web Apps / Functions we can provide a target multiplier to account for that discrepancy for paid licenses.  Please reach out to [sales@octopus.com](mailto:sales@octopus.com) for help. |
| [Azure Service Fabric Cluster](/docs/infrastructure/deployment-targets/azure/service-fabric-cluster-targets/index.md) | 1 Target per Cluster               | |
| [Offline Package Drops](/docs/infrastructure/deployment-targets/offline-package-drop.md)                              | 1 Target per Offline Package Drop  | |
| [Cloud Region](/docs/infrastructure/deployment-targets/cloud-regions.md)                                              | 0 Target per Cloud Region          | Cloud regions are legacy targets that pre-dated workers as a mechanism to run scripts on cloud providers.  They are used today to execute scripts multiple times with variables scoped for each iteration. |

**Please note:** Octopus will only count Windows Servers, Linux Servers, ECS Clusters, Kubernetes Clusters, etc., that are registered with an Octopus Deploy Instance.  If you have 5,000 Linux Servers, and 4,000 of them are registerd with Octopus Deploy, then Octopus will only count those 4,000 against your license.  

You can manage your deployment targets by navigating to **{{Infrastructure,Deployment Targets}}** in the Octopus Web Portal:

![The deployment targets area of Octopus Deploy](/docs/shared-content/concepts/images/deployment-targets.png "width=500")
