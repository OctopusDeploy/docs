---
layout: src/layouts/Default.astro
pubDate: 2024-07-31
modDate: 2025-03-28
title: First Kubernetes deployment
description: This tutorial will walk you through sourcing YAML files from a Git repository, and deploying them to a Kubernetes cluster. 
navSection: Tutorials
navOrder: 40
hideInThisSectionHeader: true
---

👋 Welcome to Octopus Deploy!

This tutorial will walk you through sourcing YAML files from a Git repository, and deploying them to a Kubernetes cluster. 

:::div{.hint}
If you’re using Octopus **2024.2** or earlier, please visit the legacy [Kubernetes First deployment](https://octopus.com/docs/kubernetes/tutorials/legacy-guide) guide.
:::

## Before you start
To follow this tutorial, you need:

* **An Octopus instance.** If you don’t already have one, you can start a free trial of [Octopus Cloud](https://octopus.com/start).
* **A Kubernetes cluster** you have terminal access to. If you don’t have one you can [install minikube locally](https://oc.to/minikube).
* A [GitHub account](https://github.com/) with access to a repository with YAML files to deploy, or you can fork our sample repository below.

#### GitHub repository
To start quickly, you can fork our sample GitHub repository, which includes pre-created YAML files. Follow the steps below to fork the repository:

1. Navigate to the **[OctoPetShop](https://github.com/OctopusSamples/OctoPetShop.git)** repository.

:::figure
![Sample OctoPetShop GitHub repository](/docs/img/getting-started/first-kubernetes-deployment/images/octopetshop-repo.png)
:::

2. In the top-right corner of the page, click **Fork**.
3. Provide an **Owner and repository name**, for example `OctoPetShop`.
4. Keep the **Copy the master branch only** checkbox selected.
5. Click **Create Fork**.
6. Wait for the process to complete (this should only take a few seconds).

Now you're ready, let’s begin deploying your first application to Kubernetes. 

## Log in to Octopus

1. Log in to your Octopus instance and click **New Project**.

:::figure
![Get started welcome screen](/docs/img/getting-started/first-kubernetes-deployment/images/get-started.png)
:::

## Add project
Projects let you manage software applications and services, each with their own deployment process.

2. Give your project a descriptive name, for example, `First K8s deployment`.

Octopus lets you store your deployment process, settings, and non-sensitive variables in either Octopus or a Git repository. 

3. For this example, keep the default **Octopus** option selected.
4. For **Deploy to**, select the **Kubernetes** option.
5. For **Manage with**, select the **YAML files** option.
6. Click **Create Project**.

:::figure
![Add new project screen](/docs/img/getting-started/first-kubernetes-deployment/images/add-new-project.png)
:::

## Add environments
You'll need an environment to deploy to.

Environments are how you organize your infrastructure into groups representing the different stages of your deployment pipeline. For example, Development, Staging, and Production.

7. Keep the default environments and click **Create Environments**.

:::figure
![Environment selection options and deployment lifecycle visuals](/docs/img/getting-started/first-kubernetes-deployment/images/select-environments.png)
:::

## Connect Octopus to your Kubernetes cluster
With Octopus Deploy, you can deploy software to:

* Kubernetes clusters
* Microsoft Azure
* AWS
* Cloud regions
* Windows servers
* Linux servers
* Offline package drop

Regardless of where you’re deploying your software, these machines and services are known as your deployment targets.

8. Select **Yes** for **Do you have a Kubernetes cluster you can deploy to today?**
9. Click **Add Agent**.

:::figure
![Connect Octopus to your cluster](/docs/img/getting-started/first-kubernetes-deployment/images/connect-octopus-to-kubernetes.png)
:::

### Name
10. Provide a name to identify this cluster in Octopus, for example, `K8s Tutorial Cluster`.

### Environments
For now, we’ll use one cluster for all environments, and use separate namespaces for each. Later, you can add additional clusters and scope them to individual environments.

11. Select **Development**, **Staging**, and **Production** from the **Environments** dropdown list.

### Target Tags
Octopus uses target tags to select which clusters (known in Octopus as a deployment target) a project should deploy to. Later, you’ll add the same target tag to your deployment process. You can deploy to multiple clusters simply by adding this tag. 

12. Add a new target tag by typing it into the field. For this example, we’ll use `tutorial-cluster`.

### Advanced settings
In Advanced settings, you can provide an optional Kubernetes namespace and Storage class. These are advanced features that you can skip for this tutorial.

13. Click **Next**.

:::figure
![Add new Kubernetes Agent dialog](/docs/img/getting-started/first-kubernetes-deployment/images/add-kubernetes-agent.png)
:::

### Install NFS CSI Driver
The Kubernetes agent will run as a pod, and will need some resilient storage. For this tutorial we can install the NFS driver, and let the agent provision some shared storage for it to use. 

14. **Copy** the Helm command and run it in the terminal connected to your target cluster.
15. Click **Next**.

:::figure
![Install NFS CSI Driver dialog](/docs/img/getting-started/first-kubernetes-deployment/images/install-nfs-csi-driver.png)
:::

### Install Kubernetes Agent
Octopus generates a Helm command that you copy and paste into a terminal connected to the target cluster. After it's executed, Helm installs all the required resources and starts the agent.

16. **Copy** the Helm command.
17. After the NFS Helm command has finished running, **paste** and run the agent Helm command in the terminal connected to your target cluster.

:::figure
![Install Kubernetes Agent dialog](/docs/img/getting-started/first-kubernetes-deployment/images/install-agent.png)
:::

18. After the agent has successfully registered and passed the health check, **Close** the dialog.
19. Click **Next**.

## Create deployment process
The next step is creating your deployment process. This is where you define the steps that Octopus uses to deploy your software. Based on your project setup, the _Deploy Kubernetes YAML_ deployment step has already been added and partially configured for you. 

1. Click **Thanks, got it**.

### Step Name
You can leave this as the default _Deploy Kubernetes YAML_.

### Target Tags
2. Octopus pre-selected the target tag you created while configuring the Kubernetes agent ( `tutorial-cluster`).

:::figure
![Target tags expander with tutorial-cluster tag selected](/docs/img/getting-started/first-kubernetes-deployment/images/target-tags.png)
:::

### YAML source
You can source YAML files via 3 methods:

* Directly from a **Git Repository**, loaded at deployment time.
* Contained within a **Package**, like a ZIP or NuGet file.
* **Inline YAML** that you paste directly into the step.

Sourcing from a Git Repository can streamline your deployment process by reducing the steps to get your YAML into Octopus.

3. Select **Git Repository** as your YAML source.

:::figure
![YAML source expander where users can select where to source YAML files from](/docs/img/getting-started/first-kubernetes-deployment/images/yaml-source.png)
:::

### Repository URL

4. Enter the full URL to the Git repository where you store the YAML files you want to deploy, for example, `https://github.com/your-user/OctoPetShop.git`

:::figure
![Repository URL expander where the user's YAML files are stored](/docs/img/getting-started/first-kubernetes-deployment/images/repo-url.png)
:::

### Git repository details

5. Select **Git credentials** and click the **+** icon to add new credentials.
6. Enter a name for your Git credential so you can identify it later.
7. Provide your GitHub username.

:::figure
![A drawer interface where users can configure Git credentials](/docs/img/getting-started/first-kubernetes-deployment/images/git-credentials.png)
:::

### Generate GitHub personal access token
Github.com now requires token-based authentication (this excludes GitHub Enterprise Server). 

Follow the steps below to create a personal access token, or learn more in the [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

1. Navigate to [github.com](http://github.com) and log in to your account.
2. Click your profile picture in the top right corner.
3. Click **Settings**.
4. Scroll down to the bottom of the page and click **Developer settings**.
5. Under Personal access tokens, click **Fine-grained tokens**.
6. Click **Generate new token**.
7. Under **Token name**, enter a name for the token.
8. Under **Expiration**, provide an expiration for the token.
9. Select a Resource Owner.
10. Under **Repository access**, choose **Only select repositories** and select the **OctoPetShop** repository from the dropdown.
11. Click on **Repository permissions**, scroll down to **Contents**, and select **Read-only**.
12. Scroll down to the Overview, and you should have 2 permissions for one of your repositories (contents and metadata).
13. Click **Generate token** and copy the token.

:::figure
![A GitHub settings page where users can manage permissions for fine-grained tokens](/docs/img/getting-started/first-kubernetes-deployment/images/generate-token.png)
:::

### Git repository details
8. Paste the token into Octopus's personal access token field.
9. **Save** your Git credential.

Your new Git credential should now be selected in the **Authentication** dropdown.

:::figure
![Authentication expander with a Git repository selected](/docs/img/getting-started/first-kubernetes-deployment/images/authentication.png)
:::

### Branch settings
10. Provide the default branch you want to use. For example, `master` if you’re using the sample repo.

:::figure
![Branch setting expander where user can configure default branch](/docs/img/getting-started/first-kubernetes-deployment/images/branch-settings.png)
:::

### File Paths
11. Enter the relative path(s) to the YAML files you want to deploy to your cluster. If you’re using the sample repo, use `k8s/*.yaml` to select all YAML files in the k8s root folder.

:::figure
![File paths expander where user can configure path to YAML files](/docs/img/getting-started/first-kubernetes-deployment/images/file-paths.png)
:::

### Namespace
12. Specify the namespace you want to deploy your YAML files into, for example, `k8s-tutorial`. If the namespace doesn’t exist yet, Octopus will create it during the deployment.

You can skip the other sections of this page for this tutorial.

**Save** your step and you can move on to create and deploy a release.


## Release and deploy

### Create release
A release is a snapshot of the deployment process and the associated assets (Git resources, variables, etc.) as they exist when the release is created.

1. Click the **Create Release** button.

You’ll see a summary of the Git resources you provided in the _Deploy Kubernetes YAML_ step.

:::figure
![Release summary showing Git resources](/docs/img/getting-started/first-kubernetes-deployment/images/release-summary.png)
:::

2. Click **Save**.

### Execute deployment
Deployments typically occur in a defined environment order (for example, Development ➜ Staging ➜ Production), starting with the first one. Later you can configure Lifecycles with complex promotion rules to accurately reflect how you want to release software.

1. Click **Deploy to Development** to deploy to the development environment associated with your cluster.
2. Review the preview summary and when you’re ready, click **Deploy**.

Your first deployment may take slightly longer as we download and extract the necessary tools to run steps. 

### Watch the deployment complete
The **Task Summary** tab will show you in real-time how the deployment steps are progressing. You can also view the status of Kubernetes resources being deployed on the cluster itself.

3. Navigate to the **Kubernetes Object Status** tab to see the live status of your Kubernetes objects as the deployment progresses.

:::figure
![Kubernetes Object Status dashboard showing a successful deployment](/docs/img/getting-started/first-kubernetes-deployment/images/deployment-success.png)
:::

You successfully completed your first deployment to Kubernetes! 🎉

### Monitor and troubleshoot
4. If you're deploying to the Kubernetes Agent, keep monitoring your application health using the [live object status](/docs/kubernetes/live-object-status) feature.

:::figure
![A screenshot of the Space dashboard showing live status](/docs/img/kubernetes/live-object-status/live-status-page.png)
:::

As you continue to explore Octopus Deploy, consider diving deeper into powerful features like [variables](https://octopus.com/docs/projects/variables), joining our [Slack community](http://octopususergroup.slack.com), or checking out our other tutorials to expand your knowledge. 

## Additional Kubernetes resources

* [Deploy with the Kustomize step](https://octopus.com/docs/deployments/kubernetes/kustomize)
* [Deploy a Helm chart](https://octopus.com/docs/deployments/kubernetes/helm-update)
* [Using variables for Kubernetes without breaking YAML](https://octopus.com/blog/structured-variables-raw-kubernetes-yaml)
