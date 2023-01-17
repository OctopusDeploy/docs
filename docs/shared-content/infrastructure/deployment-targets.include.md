With Octopus Deploy, you can deploy software to Windows servers, Linux servers, Microsoft Azure, AWS, Kubernetes clusters, cloud regions, or an offline package drop. Regardless of where you're deploying your software, these machines and services are known as your deployment targets.

Deployment targets are defined as:

|Host                                         | Target Count                       | Counts Against License   | Important Note       |
|-------------------------------------------- | -----------------------------------| ------------------------ | ---------------------|
| Windows Server running a Tentacle           | 1 Target Per Tentacle Instance     | Yes                      | Listening Tentacles are de-duped across spaces using the Tentacle thumbprint, the Tentacle Port Number and Hostname/IP address registered with Octopus Deploy. |
| Linux Server running a Tentacle             | 1 Target Per Tentacle Instance     | Yes                      | Listening Tentacles are de-duped across spaces using the Tentacle thumbprint, the Tentacle Port Number and Hostname/IP address registered with Octopus Deploy. |
| SSH Connection                              | 1 Target Per SSH Connection        | Yes                      |  | 
| Kubernetes Cluster                          | 1 Target Per K8s Namespace         | Yes                      |  The namespace registered to the target is the default namespace.  It will be used to perform health checks or if the namespace isn't specified in the deployment step.  You can overwrite the namespace in the deployment process. |
| ECS Cluster                                 | 1 Target Per ECS Cluster           | Yes                      |  |
| Azure Web App / Function  / Cloud Service   | 1/5 Target                         | Yes |  Your version of Octopus Deploy might count each Azure Web App or Function as a target.  If that is the case, please reach out to [sales@octopus.com](mailto:sales@octopus.com) and we can adjust the license. |
| Azure Service Fabric Cluster                | 1 Target Per Cluster               | Yes |  |
| Offline Package Drops                       | 1 Target Per Offline Package Drop  | Yes |  |
| Cloud Region                                | 1 Target Per Cloud Region          | No  |  Cloud regions are legacy targets that pre-dated workers as a mechanism to run scripts on cloud providers.  They are used today to execute steps multiple times with variables scoped for each iteration, but cannot be specifically deployed to using the built in steps. |

**Please note:** Octopus will only count Windows Servers, Linux Servers, ECS Clusters, Kubernetes Clusters, etc., that are registered with an Octopus Deploy Instance.  If you have 5,000 Linux Servers, and 4,000 of them are registerd with Octopus Deploy, then Octopus will only count those 4,000 against your license.  

You can manage your deployment targets by navigating to **{{Infrastructure,Deployment Targets}}** in the Octopus Web Portal:

![The deployment targets area of Octopus Deploy](/docs/shared-content/concepts/images/deployment-targets.png "width=500")
