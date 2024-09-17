---
layout: src/layouts/Default.astro
pubDate: 2024-07-31
modDate: 2024-08-29
title: First Kubernetes deployment (2024.2 and below)
description: This guide will walk you through how to configure your first deployment to Kubernetes in Octopus Deploy.
navMenu: false
navOrder: 10
hideInThisSectionHeader: true
---

👋 Welcome to Octopus Deploy!

This tutorial will help you complete your first deployment to Kubernetes with Octopus Deploy. We’ll walk you through the steps to deploy YAML files to your Kubernetes cluster. 

:::div{.hint}
If you’re using **Octopus 2024.3** or newer, please refer to the updated [Kubernetes First deployment](https://octopus.com/docs/kubernetes/tutorials) guide.
:::

## Before you start

To follow this tutorial, you need:

* [Octopus Cloud instance](https://octopus.com/start)
* Kubernetes cluster
* [Docker Hub account](https://hub.docker.com/)
* [GitHub account](https://github.com/)

#### GitHub repository

To start quickly, you can fork our sample GitHub repository, which includes pre-created YAML files. Follow the steps below to fork the repository:

1. Navigate to the **[OctoPetShop](https://github.com/OctopusSamples/OctoPetShop.git)** repository.

:::figure
![Sample OctoPetShop GitHub repository](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/octopetshop-repo.png)
:::

2. In the top-right corner of the page, click **FORK**.
3. Provide an **Owner and repository name**, for example `OctoPetShop`.
4. Keep the **Copy the master branch only** checkbox selected.
5. Click **CREATE FORK**.
6. Wait for the process to complete (this should only take a few seconds).

Now you're ready, let’s begin deploying your first application to Kubernetes. 

## Log in to Octopus

1. Log in to your Octopus instance and click **GET STARTED**.

:::figure
![Get started welcome screen](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/get-started.png)
:::

## Add project

Projects let you manage software applications and services, each with its deployment process.

2. Give your project a descriptive name and click **SAVE**.

:::figure
![Octopus Deploy 'Add New Project' form with fields for project details.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/new-project.png)
:::

## Add environments

You'll need an environment to deploy to.

Environments are how you organize your infrastructure into groups representing the different stages of your deployment pipeline. For example, Dev, Test, and Production.

3. Select the environments you’d like to create and click **SAVE**.

:::figure
![Environment selection options and deployment lifecycle visuals](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/select-environments.png)
:::

## Project questionnaire (optional)

You have the option to fill out a short survey. This helps our team learn about the technologies our customers are using, which guides the future direction of Octopus. It should only take about 30 seconds to complete.

4. Click **SUBMIT**, and you'll be taken to your project.

:::figure
![Octopus Deploy interface displaying a questionnaire](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/survey.png)
:::

## Create deployment process
The next step is creating your deployment process. This is where you define the steps that Octopus uses to deploy your software.

1. Click **CREATE PROCESS** to see the available deployment steps.

:::figure
![Deployment process page with a button to create the process.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/create-process.png)
:::

### Configure Deploy Kubernetes YAML step

2. Select the **Kubernetes** filter and then add the **Deploy Kubernetes YAML** step.

:::figure
![Kubernetes steps in the Octopus Deploy process editor.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/kubernetes-step.png)
:::

#### Step name
You can leave this as the *default Deploy Kubernetes YAML*.

#### Execution location
This step will run once on a worker on behalf of each deployment target.

Workers are machines that can execute tasks that don’t need to be run on the Octopus Server or individual deployment targets. 

You’ll learn more about deployment targets later in this tutorial.

#### Worker Pool
Worker Pools are groups of Workers. When a task is assigned to a Worker, the task will be executed by one of the Workers in the pools you’ve configured.

3. Select **Runs on a worker from a specific pool**. 
4. Select **Hosted Ubuntu** from the dropdown menu.

:::figure
![Worker Pool expander with 'Hosted Ubuntu' selected.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/worker-pool.png)
:::

#### Target tags \{#on-behalf-of}
[Target tags](/docs/infrastructure/deployment-targets/target-tags) (formerly target roles) select specific deployment targets in an environment. This step will run on all deployment targets with the tags you specify in this field.

5. Add a new target tag by typing it into the field. For this example, we'll use `k8s`.

:::figure
![Target tag selection expander with 'k8s' tag currently added.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/on-behalf-of.png)
:::

After configuring your deployment process, you’ll assign deployment targets to this target tag. 

#### Container image
Next, you configure this step to run inside an execution container. 

6. Select **Runs inside a container, on a worker**.

:::figure
![Container image expander with 'Runs inside a container, on a worker selected'.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/container-image.png)
:::

### Add container image registry feed
For a step running on a Worker, you can select a Docker image to execute the step inside of.

Since you don’t have a Docker Container Registry available yet, you need to add one by following the steps below:

1. Click the **External Feeds** link (this will open a new window).
1. Click the **ADD FEED** button and select **Docker Container Registry** from the **Feed Type** dropdown.

:::figure
![Library section in Octopus with options to add external feeds.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/external-feeds.png)
:::

1. Provide a name for your feed, for example `Docker Hub`.
1. Enter the feed URL to the public Docker Hub registry, for example `https://index.docker.io`.
1. You can leave the registry path blank for this example.

:::figure
![Form to create a Docker container registry external feed.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/create-docker-feed.png)
:::

1. Provide your credentials for Docker Hub.
1. Click **SAVE AND TEST**, and then type `nginx` into the package name field to test your external feed.

:::figure
![A search interface in Octopus to test the Docker Hub repository.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/test-docker-feed.png)
:::

Close the window and return to configuring the **Deploy Kubernetes YAML** step.

#### Container image
7. Click **REFRESH** and select **Docker Hub** as your Container Registry.
1. Copy the latest **Ubuntu-based image** from the help text and paste it into the container image field.

:::figure
![Container image expander using the latest Ubuntu-based image.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/container-image-docker.png)
:::

#### YAML source
This step lets you get your YAML from 3 different sources:

* Git repository (default)
* Package
* Inline script

Sourcing from a Git repository can streamline your deployment process by reducing the steps required to get your YAML into Octopus.

9. Select **Git Repository** as your YAML source.

:::figure
![YAML source expander with Git repository selected](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/git-repository.png)
:::

#### Git repository details
10. Select **Library** and add a new Git credential by clicking the **+** icon.
1. Click the **ADD GIT CREDENTIAL** button.
1. Enter a name for your Git credential.
1. Provide your GitHub username.

:::figure
![A section in the library interface that lets users create and manage Git credentials.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/git-credential.png)
:::

### Generate GitHub personal access token
Github.com now requires token-based authentication (this excludes GitHub Enterprise Server). Create a personal access token following the steps below or learn more in the [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

1. Navigate to [github.com](https://github.com) and log in to your account.
1. Click your profile picture in the top right corner. 
1. Click **SETTINGS**.
1. Scroll down to the bottom of the page and click **DEVELOPER SETTINGS**.
1. Under **Personal access tokens**, click **FINE-GRAINED TOKENS**.
1. Click **GENERATE NEW TOKEN**.
1. Under **Token name**, enter a name for the token.
1. Under **Expiration**, provide an expiration for the token.
1. Select a Resource Owner.
1. Under **Repository Access**, choose **Only select repositories** and select the **OctoPetShop** repository from the dropdown.
1. Click **REPOSITORY PERMISSIONS**, scroll down to **Contents** and select **Read-only**.
1. Scroll down to the **Overview**, and you should have 2 permissions for one of your repositories (contents and metadata).
1. Click **Generate token** and copy the token.

:::figure
![A GitHub settings page where users can manage permissions for fine-grained tokens.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/generate-token.png)
:::

#### Git repository details
14. Paste the token into Octopus's personal access token field.
1. **Save** your Git credential and return to the **Deploy Kubernetes YAML** step.
1. Click the refresh icon next to the **Select Git credential** dropdown.
1. Select the Git credential you created earlier.

:::figure
![Authentication expander with a Git repository selected from the library.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/completed-git-credential.png)
:::

#### Repository URL
18. Enter the full URL to the Git repository where you store the YAML files you want to deploy, for example `https://github.com/your-user/OctoPetShop.git`.

:::figure
![Repository URL expander where the user's YAML files are stored.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/repository-url.png)
:::

#### Branch settings
19. Provide the default branch you want to use, for example **master** if you’re using the sample repo.

#### Paths
20. Enter the relative path(s) to the YAML files you want to deploy to your cluster. If you’re using the sample repo, the path will be `k8s/*.yaml`.

:::figure
![The Paths expander that lets users specify the paths to their YAML files using glob patterns.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/paths.png)
:::

#### Kubernetes object status check
This feature gives you live status updates during deployment for all the Kubernetes objects you're deploying. 

21. Keep the default **Check that Kubernetes objects are running successfully** option selected with the default timeout of **180** seconds.

:::figure
![Kubernetes object status check expander with the default option and timeout selected.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/k8s-object-status-check.png)
:::

#### Structured configuration variables
This is an advanced feature that you can skip for this tutorial. Learn more about [structured configuration variables in our docs](https://octopus.com/docs/projects/steps/configuration-features/structured-configuration-variables-feature).

#### Referenced packages
This is an advanced feature that you can skip for this tutorial. Learn more about [references packages in our docs](https://octopus.com/docs/deployments/custom-scripts/run-a-script-step#referencing-packages).

#### Namespace
22. Specify the namespace in the cluster where you want to deploy your YAML files, for example `demo-namespace`.

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
* Linux servers
* Offline package drops

Wherever you’re deploying your software, these machines and services are known as your deployment targets.

1. Navigate to **Infrastructure** ➜ **Deployment Targets**, and click **ADD DEPLOYMENT TARGET**.

:::figure
![Deployment targets page with no targets added.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/deployment-targets.png)
:::

2. Select **KUBERNETES CLUSTER** and click **ADD** on the Kubernetes Cluster card.

:::figure
![A list of deployment target types with the Kubernetes cluster selected.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/add-k8s-target.png)
:::

#### Display name
3. Enter `k8s-demo` in the **Display Name** field.

#### Environments
4. Select **Development**, **Staging**, and **Production** from the dropdown list.

#### Target tags \{#target-roles}
5. Type in the same [target tag](/docs/infrastructure/deployment-targets/target-tags) you provided while configuring the **Deploy Kubernetes YAML** step, for example `k8s`.

The target tag won’t be available to select from the dropdown list yet, because it gets created during this step.

:::figure
![User interface for setting up a Kubernetes Cluster deployment target.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/create-k8s-cluster.png)
:::

#### Authentication
Octopus provides multiple methods for authenticating your Kubernetes cluster depending on your setup, including: 

| **Service** | **Octopus Authentication Method**                                                                                                                                                                                                                                                                      | **Notes**                                                                                                                                                                                                                                                                                                           |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AKS         | [Azure Service Principal](https://octopus.com/docs/infrastructure/accounts/azure)                                                                                                                                                                                                                      | The Azure Service Principal is only used with AKS clusters. To log into ACS or ACS-Engine clusters, you must use standard Kubernetes credentials like certificates or service account tokens.<br><br>  Learn more in the [Azure docs](https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-identity). |
| GKE         | [Google Cloud Account](https://octopus.com/docs/infrastructure/accounts/google-cloud)                                                                                                                                                                                                                  | When using a GKE cluster, Google Cloud accounts let you authenticate using a Google Cloud IAM service account.<br><br>  Learn more in the [GKE docs](https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication).                                                                         |
| EKS         | [AWS Account](https://octopus.com/docs/infrastructure/accounts/aws)                                                                                                                                                                                                                                    | When using an EKS cluster, AWS accounts let you use IAM accounts and roles.<br><br>   Learn more in the [AWS docs](https://docs.aws.amazon.com/eks/latest/userguide/cluster-auth.html).                                                                                                                         |
| Other       | [Tokens](https://octopus.com/docs/infrastructure/accounts/tokens) <br> [Username and password](https://octopus.com/docs/infrastructure/accounts/username-and-password) <br> [Client certificate](https://octopus.com/docs/infrastructure/deployment-targets/kubernetes/kubernetes-api#add-a-kubernetes-target) | Learn more in the [Kubernetes cluster docs](https://octopus.com/docs/infrastructure/deployment-targets/kubernetes/kubernetes-api#add-a-kubernetes-target).                                                                                                                                                                   |


Here are brief instructions on how to configure your cluster authentication in Octopus, since it will depend on your specific situation:

1. Select the appropriate authentication method from the list.

:::figure
![Authentication methods for a Kubernetes Cluster deployment with various account options.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/target-authentication-methods.png)
:::

2. Add a new account with the authentication details needed to access your cluster (more detailed instructions are linked in the table above).

:::figure
![Create Account page with form in Octopus Deploy.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/create-account.png)
:::

3. Complete the target authentication configuration fields like cluster name, resource group, etc.

:::figure
![Kubernetes authentication details, including Azure Service Principal and cluster information.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/target-authentication.png)
:::

Need more details on how to configure various authentication methods? Read the [Kubernetes cluster docs](https://octopus.com/docs/infrastructure/deployment-targets/kubernetes/kubernetes-api#add-a-kubernetes-target).

#### Kubernetes namespace
6. Specify the namespace for this deployment target, for example `default`.

#### Worker Pool
7. Select **Hosted Ubuntu** as the default Worker Pool.

#### Health check container image
8. Select **Runs inside a container, on a Worker**.
1. Select **Docker Hub** as the container registry.
1. Copy the **Ubuntu-based image** and paste it into the container image field.
1. **SAVE** your deployment target.

:::figure
![Health check container image expander with the latest Ubuntu-based image.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/health-check-container-image.png)
:::

#### Health check
Octopus runs health checks on deployment targets and Workers to ensure they're available and running the latest version of Calamari.

This process may take a few minutes since it’s acquiring the Worker and it needs to download the Worker Tools image.

1. After saving, navigate to **Connectivity** in the left sidebar menu.
1. Click the **CHECK HEALTH** button.

:::figure
![Deployment target connectivity status page with unknown state.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/health-check-connectivity.png)
:::

You can create and deploy a release now that you have a healthy deployment target.

:::figure
![Logs indicating a healthy deployment target.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/healthy-target.png)
:::

## Release and deploy

### Create release
A release is a snapshot of the deployment process and the associated assets (Git resources, variables, etc.) as they exist when the release is created.

1. Navigate to **Projects** in the top navigation and select your **First K8s deployment** project.
1. Click the **CREATE RELEASE** button.

:::figure
![Deployment overview page with no deployments.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/deployment-overview.png)
:::

You’ll see a summary of the Git resources you provided in the **Deploy Kubernetes YAML** step. 

:::figure
![Release summary showing Git resources](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/release-summary.png)
:::

3. Click **SAVE**.

### Execute deployment
When you created this project, you selected the default lifecycle (Development ➜ Staging ➜ Production). Lifecycles determine which environments the project can be deployed to, and the promotion rules between those environments.

1. Click **DEPLOY TO DEVELOPMENT** to deploy to the development environment associated with your cluster.
1. Review the preview summary and when you’re ready, click **DEPLOY**.

Your first deployment may take slightly longer because your Docker image won’t be cached yet. 

3. Navigate to the **KUBERNETES OBJECT STATUS** tab to see the live status of your Kubernetes objects as the deployment progresses.

:::figure
![Kubernetes Object Status dashboard showing a successful deployment.](/docs/getting-started/first-kubernetes-deployment/legacy-guide/images/deployment-success.png)
:::

You’ve successfully completed your first deployment to Kubernetes! 🎉

As you continue to explore Octopus Deploy, consider diving deeper into powerful features like [variables](https://octopus.com/docs/projects/variables), joining our [Slack community](http://octopususergroup.slack.com), or checking out our other tutorials to expand your knowledge. 

## More Kubernetes resources

* [Deploy with the Kustomize step](https://octopus.com/docs/deployments/kubernetes/kustomize)
* [Deploy a Helm chart](https://octopus.com/docs/deployments/kubernetes/helm-update)
* [Using variables for Kubernetes without breaking YAML](https://octopus.com/blog/structured-variables-raw-kubernetes-yaml)
