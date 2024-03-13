---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Deploying a sample Java application
description: This guide provides a simple example of deploying a Java application with Octopus Deploy.
navOrder: 2
---

:::div{.hint}
See [Java Applications](/docs/deployments/java) for details on deploying Java application servers.
:::

This guide provides a simple example of deploying a Java application using Octopus Deploy.

## Prerequisites {#DeployingJavaapplications-Prerequisites}

This guide assumes some familiarity with Octopus Deploy.  You should be able to configure [projects ](/docs/projects/)and have a [Tentacle or SSH deployment target](/docs/infrastructure) already configured.

:::div{.hint}
Naked scripting allows you to transfer and extract your package on remote targets without the need for Calamari or mono. Read the short guide [here](/docs/deployments/custom-scripts) for more details.
:::

## Sample application {#DeployingJavaapplications-SampleApplication}

Here is a sample application that will prompt the user to press a key before exiting:

**PressAnyKey.java**

```java
public class PressAnyKey {
    public static void main(String[] args) throws java.io.IOException {
        System.out.println("Press any key to continue.");
	System.in.read();
    }
}
```

## Deploying the application {#DeployingJavaapplications-Deployingtheapplication}

### Step 1: Upload the application to the built-in repository {#DeployingJavaapplications-Step1-Uploadtheapplicationtothebuilt-inrepository}

In order to deploy the application with Octopus Deploy it must be compiled and packaged. This would usually be done by your build server but for the sake of this demonstration let's do it manually.

1. Compile the application:

```powershell
javac PressAnyKey.java
```
2. Zip PressAnyKey.class into the archive `PressAnyKey.1.0.0.zip` (you can download a sample: [PressAnyKey.1.0.0.zip](https://download.octopusdeploy.com/demo/PressAnyKey.1.0.0.zip))
3. Upload `PressAnyKey.1.0.0.zip` to the Octopus Deploy built-in feed (**Library ➜ Packages** or [follow the instructions here](/docs/packaging-applications/package-repositories/built-in-repository/#pushing-packages-to-the-built-in-repository)).

### Step 2: Create the project and deployment process {#DeployingJavaapplications-Step2-Createtheprojectanddeploymentprocess}

1. Create a new project called **Press Any Key**.
2. Add a **Deploy a package** step to the deployment process.
3. Configure the step to deploy the package `PressAnyKey.1.0.0.zip`.
4. Configure the step to run a [post-deployment script](/docs/deployments/custom-scripts) to start the application.

**PowerShell**

```powershell
Start-Process java PressAnyKey
```

**Bash**

```bash
screen -d -m -S "PressAnyKey" java PressAnyKey
```

:::figure
![](/docs/deployments/java/5866219.png)
:::

:::div{.hint}
The application must be launched in a new process or session so that control returns to the shell. Otherwise the deployment will wait until the application is terminated.
:::

### Step 3: Deploy {#DeployingJavaapplications-Step3-Deploy}

Create a release and deploy.

The application will be running on the target machine:

```powershell
ubuntu@ip-10-0-0-245:/$ ps aux | grep 'PressAnyKey'
ubuntu    6544  0.0  0.0  25776  1288 ?        Ss   02:00   0:00 SCREEN -d -m -s PressAnyKey java PressAnyKey
ubuntu    6545  0.0  0.7 2076112 28584 pts/2   Ssl+ 02:00   0:01 java PressAnyKey
```
