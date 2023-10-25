---
layout: src/layouts/Default.astro
pubDate: 2023-10-26
modDate: 2023-10-26
title: First Kubernetes deployment
description: This guide will walk you through how to configure your first deployment to Kubernetes in Octopus Deploy.
navOrder: 10
---

👋 Welcome to Octopus Deploy!

This tutorial will help you complete your first deployment to Kubernetes with Octopus Deploy. We’ll walk you through the steps to deploy YAML files to your Kubernetes cluster. 

## Prerequisites

* [Octopus Deploy cloud instance](https://octopus.com/start)
* Kubernetes cluster
* [Docker Hub account](https://hub.docker.com/)
* [GitHub account](https://github.com/)

#### GitHub repository

To start quickly, you can fork our sample GitHub repository, which includes pre-created YAML files. Follow the steps below to fork the repository:

1. Navigate to the **[OctoPetShop](https://github.com/OctopusSamples/OctoPetShop.git)** repository.

:::figure
![Sample OctoPetShop GitHub repository](/docs/getting-started/first-kubernetes-deployment/octopetshop-repo.png)
:::

2. In the top-right corner of the page, click **FORK**.
3. Provide an **Owner and repository name**, e.g. **OctoPetShop**.
4. Keep the **Copy the master branch only** checkbox selected.
5. Click **CREATE FORK**.
6. Wait for the process to complete (this should only take a few seconds).

With the prerequisites ready, let’s begin deploying your first application to Kubernetes. 

## Log in to Octopus

1. Log in to your Octopus instance and click **GET STARTED**.

:::figure
![Get started welcome screen](/docs/getting-started/first-kubernetes-deployment/get-started.png)
:::

## Add project

Projects let you manage software applications and services, each with its deployment process.

2. Give your project a descriptive name and click **SAVE**.

:::figure
![Octopus Deploy 'Add New Project' form with fields for project details.](/docs/getting-started/first-kubernetes-deployment/new-project.png)
:::

## Add environments

You will need an environment to deploy to.

Environments are how you organize your infrastructure into groups representing the different stages of your deployment pipeline, e.g. dev, test, and production.

3. Select the environments you’d like to create and click **SAVE**.

:::figure
![Environment selection options and deployment lifecycle visuals](/docs/getting-started/first-kubernetes-deployment/select-environments.png)
:::

## Project questionnaire (optional)

You have the option to fill out a short survey. This helps our team learn about the technologies our customers are using, which guides the future direction of Octopus. It should only take about 30 seconds to complete.

4. Click **SUBMIT**, and you will be taken to your project.

:::figure
![Octopus Deploy interface displaying a questionnaire](/docs/getting-started/first-kubernetes-deployment/survey.png)
:::

## Create deployment process
The next step in the journey is to create your deployment process. This is where you define the steps that Octopus uses to deploy your software.

1. Click **CREATE PROCESS** to see the available deployment steps.

:::figure
![Deployment process page with a button to create the process.](/docs/getting-started/first-kubernetes-deployment/create-process.png)
:::

### Configure Deploy raw Kubernetes YAML step

2. Select the **KUBERNETES** filter and then click on the **DEPLOY RAW KUBERNETES YAML** card.

:::figure
![Kubernetes steps in the Octopus Deploy process editor.](/docs/getting-started/first-kubernetes-deployment/kubernetes-step.png)
:::

#### Step name
You can leave this as the *default Deploy raw Kubernetes YAML*.

#### Execution location
This step will run once on a worker on behalf of each deployment target.

Workers are machines that can execute tasks that don’t need to be run on the Octopus Server or individual deployment targets. 

You’ll learn more about deployment targets later in this tutorial.

#### Worker pool
Worker pools are groups of workers. When a task is assigned to a worker, the task will be executed by one of the workers in the pools you’ve configured.

3. Select **RUNS ON A WORKER FROM A SPECIFIC POOL**. 
4. Select **HOSTED UBUNTU** from the dropdown menu.

:::figure
![Worker pool expander with 'Hosted Ubuntu' selected.](/docs/getting-started/first-kubernetes-deployment/worker-pool.png)
:::

#### On behalf of
Target roles select specific deployment targets in an environment. This step will run on all deployment targets with the roles you specify in this field.

5. Add a new target role by typing it into the field. For this example, we will use **k8s**.

:::figure
![Role selection expander with 'k8s' role currently added.](/docs/getting-started/first-kubernetes-deployment/on-behalf-of.png)
:::

After configuring your deployment process, you’ll assign deployment targets to this target role. 

#### Container image
Next, you’ll configure this step to run inside an execution container. 

6. Select **Runs INSIDE A CONTAINER, ON A WORKER**.

:::figure
![Container image expander with 'Runs inside a container, on a worker selected'.](/docs/getting-started/first-kubernetes-deployment/container-image.png)
:::

### Add container image registry feed
For a step running on a worker, you can select a Docker image to execute the step inside of.

Since you don’t have a Docker Container Registry available yet, you’ll need to add one following the steps below:
1. Click the **EXTERNAL FEEDS** link (this action will open a new window).
1. Click the **ADD FEED** button and select Docker Container Registry from the Feed Type dropdown.

:::figure
![Library section in Octopus with options to add external feeds.](/docs/getting-started/first-kubernetes-deployment/external-feeds.png)
:::

1. Provide a name for your feed, e.g. Docker Hub.
1. Enter the feed URL to the public Docker Hub registry, e.g. https://index.docker.io.
1. You can leave the registry path blank for this example.

:::figure
![Form to create a Docker container registry external feed.](/docs/getting-started/first-kubernetes-deployment/create-docker-feed.png)
:::

1. Provide your credentials for Docker Hub.
1. Click **SAVE AND TEST**, and then type **nginx** into the package name field to test your external feed.

:::figure
![A search interface in Octopus to test the Docker Hub repository.](/docs/getting-started/first-kubernetes-deployment/test-docker-feed.png)
:::

Close the window and return to configuring the **Deploy raw Kubernetes YAML** step.

#### Container image
7. Click **REFRESH** and select **Docker Hub** as your Container Registry.
1. Copy the latest **Ubuntu-based image** from the help text and paste it into the container image field.

:::figure
![Container image expander using the latest Ubuntu-based image.](/docs/getting-started/first-kubernetes-deployment/container-image-docker.png)
:::

#### YAML source
This step lets you to get your YAML from three different sources:
* Git repository (default)
* Package
* Inline script

Sourcing from a Git Repository can streamline your deployment process by reducing the steps required to get your YAML into Octopus.

9. Select **Git Repository** as your YAML source.

:::figure
![YAML source expander with Git repository selected](/docs/getting-started/first-kubernetes-deployment/git-repository.png)
:::

#### Git repository details
10. Select **Library** and add a new Git credential by clicking the **+** icon.
1. Click the **ADD GIT CREDENTIAL** button.
1. Enter a name for your Git credential.
1. Provide your Github username.

:::figure
![A section in the library interface that allows users to create and manage Git credentials.](/docs/getting-started/first-kubernetes-deployment/git-credential.png)
:::

### Generate GitHub personal access token
Github.com now requires token-based authentication (this excludes GitHub Enterprise Server). Create a personal access token following the steps below or learn more in the [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
1. Navigate to [github.com](https://github.com) and log in to your account.
1. Click on your profile picture in the top right corner. 
1. Click on **SETTINGS**.
1. Scroll down to the bottom of the page and click on **DEVELOPER SETTINGS**.
1. Under Personal access tokens, click **FINE-GRAINED TOKENS**.
1. Click **GENERATE NEW TOKEN**.
1. Under Token name, enter a name for the token.
1. Under Expiration, provide an expiration for the token.
1. Select a Resource Owner.
1. Under Repository Access, choose **Only select repositories** and select the **OctoPetShop** repository from the dropdown.
1. Click on **REPOSITORY PERMISSIONS**, scroll down to **Contents** and select **Read-only**.
1. Scroll down to the **Overview**, and you should have 2 permissions for 1 of your repositories (contents and metadata).
1. Click **GENERATE TOKEN** and copy the token.

:::figure
![A GitHub settings page where users can manage permissions for fine-grained tokens.](/docs/getting-started/first-kubernetes-deployment/generate-token.png)
:::

#### Git repository details
14. Paste the token into Octopus's personal access token field.
1. **Save** your Git credential and return to the Deploy raw Kubernetes YAML step.
1. Click the refresh icon next to the **select Git credential** dropdown.
1. Select the Git credential you created earlier.

:::figure
![Authentication expander with a Git repository selected from the library.](/docs/getting-started/first-kubernetes-deployment/completed-git-credential.png)
:::

#### Repository URL
18. Enter the full URL to the Git repository where you store the YAML files you want to deploy, e.g. **https://github.com/your-user/OctoPetShop.git**

:::figure
![Repository URL expander where the user's YAML files are stored.](/docs/getting-started/first-kubernetes-deployment/repository-url.png)
:::

#### Branch settings
19. Provide the default branch you want to use, e.g. **master** if you’re using the sample repo.

#### Paths
20. Enter the relative path(s) to the YAML files you want to deploy to your cluster. If you’re using the sample repo, the path will be **k8s/*.yaml**

:::figure
![The Paths expander that lets users specify the paths to their YAML files using glob patterns.](/docs/getting-started/first-kubernetes-deployment/paths.png)
:::

#### Kubernetes object status check
This feature gives you live status updates during deployment for all the Kubernetes objects you're deploying. 
21. Keep the default **Check that Kubernetes objects are running successfully** option selected with the default timeout of **180** seconds.

:::figure
![Kubernetes object status check expander with the default option and timeout selected.](/docs/getting-started/first-kubernetes-deployment/k8s-object-status-check.png)
:::

#### Structured configuration variables
This is an advanced feature that you can skip for this tutorial. Learn more about it [here](https://octopus.com/docs/projects/steps/configuration-features/structured-configuration-variables-feature).

#### Referenced packages
This is an advanced feature that you can skip for this tutorial. Learn more about it [here](https://octopus.com/docs/infrastructure/deployment-targets/cloud-target-discovery).

#### Namespace
22. Specify the namespace in the cluster where you want to deploy your YAML files, e.g. **demo-namespace**.

If the namespace doesn’t exist yet, Octopus will create it during the deployment.

#### Conditions
You can set [conditions](https://octopus.com/docs/projects/steps/conditions) for greater control over how each step in your deployment process gets executed.

You can skip all the fields under this section for your first deployment. 

**Save** your step and then move on to the next section to add your Kubernetes deployment target.

## Add a deployment target
With Octopus Deploy, you can deploy software to:
* Kubernetes clusters
* Microsoft Azure
* AWS
* Cloud regions
* Windows servers
* Linux servers,
* Offline package drop

Regardless of where you’re deploying your software, these machines and services are known as your deployment targets.

1. Navigate to Infrastructure ➜ Deployment Targets, and click **ADD DEPLOYMENT TARGET**.

:::figure
![Deployment targets page with no targets added.](/docs/getting-started/first-kubernetes-deployment/deployment-targets.png)
:::

2. Select **KUBERNETES CLUSTER** and click **ADD** on the Kubernetes Cluster card.

:::figure
![A list of deployment target types with the Kubernetes cluster selected.](/docs/getting-started/first-kubernetes-deployment/add-k8s-target.png)
:::

#### Display name
3. Enter **k8s-demo** in the Display Name field.

#### Environments
4. Select **Development, Staging and Production** from the dropdown list.

#### Target roles
5. Type in the same target role you provided while configuring the Deploy raw Kubernetes YAML step, e.g. **k8s**.

The target role won’t be available to select from the dropdown list yet, since it gets created during this step.

:::figure
![User interface for setting up a Kubernetes Cluster deployment target.](/docs/getting-started/first-kubernetes-deployment/create-k8s-cluster.png)
:::

#### Authentication
Octopus provides multiple methods for authenticating your Kubernetes cluster depending on your setup, including: 

| **Service** | **Octopus Authentication Method**                                                                                                                                                                                                                                                                      | **Notes**                                                                                                                                                                                                                                                                                                           |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AKS         | [Azure Service Principal](https://octopus.com/docs/infrastructure/accounts/azure)                                                                                                                                                                                                                      | The Azure Service Principal is only used with AKS clusters. To log into ACS or ACS-Engine clusters, standard Kubernetes credentials like certificates or service account tokens must be used.<br><br>  Learn more in the [Azure docs](https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-identity) |
| GKE         | [Google Cloud Account](https://octopus.com/docs/infrastructure/accounts/google-cloud)                                                                                                                                                                                                                  | When using a GKE cluster, Google Cloud accounts allow you to authenticate using a Google Cloud IAM service account.<br><br>  Learn more in the [GKE docs](https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication)                                                                         |
| EKS         | [AWS Account](https://octopus.com/docs/infrastructure/accounts/aws)                                                                                                                                                                                                                                    | When using an EKS cluster, AWS accounts allow IAM accounts and roles to be used.<br><br>   Learn more in the [AWS docs](https://docs.aws.amazon.com/eks/latest/userguide/cluster-auth.html)                                                                                                                         |
| Other       | [Tokens](https://octopus.com/docs/infrastructure/accounts/tokens) <br> [Username and password](https://octopus.com/docs/infrastructure/accounts/username-and-password) <br> [Client certificate](https://octopus.com/docs/infrastructure/deployment-targets/kubernetes-target#add-a-kubernetes-target) | Learn more in the [Kubernetes cluster docs](https://octopus.com/docs/infrastructure/deployment-targets/kubernetes-target#add-a-kubernetes-target)                                                                                                                                                                   |


Here are brief instructions on how to configure your cluster authentication in Octopus, since it will depend on your specific situation:

1. Select the appropriate authentication method from the list.

:::figure
![Authentication methods for a Kubernetes Cluster deployment with various account options.](/docs/getting-started/first-kubernetes-deployment/target-authentication-methods.png)
:::

2. Add a new account with the authentication details required to access your cluster (more detailed instructions are linked in the table above).

:::figure
![Create Account page with form in Octopus Deploy.](/docs/getting-started/first-kubernetes-deployment/create-account.png)
:::

3. Complete the target authentication configuration fields like cluster name, resource group, etc.

:::figure
![Kubernetes authentication details, including Azure Service Principal and cluster information.](/docs/getting-started/first-kubernetes-deployment/target-authentication.png)
:::

Need more details on how to configure various authentication methods? Read the [Kubernetes cluster docs](https://octopus.com/docs/infrastructure/deployment-targets/kubernetes-target#add-a-kubernetes-target).

#### Kubernetes namespace
6. Specify the namespace for this deployment target, e.g. **default**.

#### Worker pool
7. Select **Hosted Ubuntu** as the default worker pool.

#### Health check container image
8. Select runs inside a container, on a worker
1. Select **Docker Hub** as the container registry.
1. Copy the **Ubuntu-based image** and paste it into the container image field.
1. **Save** your deployment target.

:::figure
![Health check container image expander with the latest Ubuntu-based image.](/docs/getting-started/first-kubernetes-deployment/health-check-container-image.png)
:::

#### Health check
Octopus runs health checks on deployment targets and workers to ensure they are available and running the latest version of Calamari.

This process may take a few minutes since it’s acquiring the worker and it needs to download the worker tools image. 

1. After saving, navigate to **Connectivity** in the left sidebar menu.
1. Click the **CHECK HEALTH** button.

:::figure
![Deployment target connectivity status page with unknown state.](/docs/getting-started/first-kubernetes-deployment/health-check-connectivity.png)
:::

You can create and deploy a release now that you have a healthy deployment target.

:::figure
![Logs indicating a healthy deployment target.](/docs/getting-started/first-kubernetes-deployment/healthy-target.png)
:::

## Release and deploy

### Create release
A release is a snapshot of the deployment process and the associated assets (Git resources, variables, etc.) as they exist when the release is created.

1. Navigate to **Projects** in the top navigation and select your **first K8s deployment** project.
1. Click the **CREATE RELEASE** button.

:::figure
![Deployment overview page with no deployments.](/docs/getting-started/first-kubernetes-deployment/deployment-overview.png)
:::

You’ll see a summary of the Git resources you provided in the Deploy raw YAML step. 

:::figure
![Release summary showing Git resources](/docs/getting-started/first-kubernetes-deployment/release-summary.png)
:::

3. Click **SAVE**.

### Execute deployment
When you created this project, you selected the default lifecycle (Development ➜ Staging ➜ Production). Lifecycles determine which environments the project can be deployed to, and the promotion rules between those environments.

1. Click **DEPLOY TO DEVELOPMENT** to deploy to the development environment associated with your cluster.
1. Review the preview summary and when you’re ready, click **DEPLOY**.

Your first deployment may take slightly longer because your Docker image won’t be cached yet. 

3. Navigate to the **Kubernetes Object Status** tab to see the live status of your Kubernetes objects as the deployment progresses.

:::figure
![Kubernetes Object Status dashboard showing a successful deployment.](/docs/getting-started/first-kubernetes-deployment/deployment-success.png)
:::

You’ve successfully completed your first deployment to Kubernetes! 🎉

As you continue to explore Octopus Deploy, consider diving deeper into powerful features like [variables](https://octopus.com/docs/projects/variables), joining our [Slack community](http://octopususergroup.slack.com), or checking out our other tutorials to expand your knowledge. 

## Additional Kubernetes resources
* [Deploy with the Kustomize step](https://octopus.com/docs/deployments/kubernetes/kustomize)
* [Deploy a Helm chart](https://octopus.com/docs/deployments/kubernetes/helm-update)
* [Using variables for Kubernetes without breaking YAML](https://octopus.com/blog/structured-variables-raw-kubernetes-yaml)
