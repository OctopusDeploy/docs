---
title: Configure Octopus Deploy Project
description: This guide describes how to configure your Octopus project to deploy a NodeJS application to a Linux deployment target.
position: 2
---

Assuming you are starting with a clean install of Octopus Deploy, the following steps will configure the server to deploy your [octofxjs](/docs/deploying-applications/node-on-nix-deployments/create-&-push-node.js-project.md) Node.js project to a Linux machine.

## Configure Environment {#ConfigureOctopusDeployProject-ConfigureEnvironment}

- In the *Environments* page, add an Environment named **prod**.

![](/docs/images/3049555/3964983.png "width=500")

:::hint
The name of the environment is important because we will use it as a variable in our deployment process.
:::

:::success
For the purpose of this guide we will only use the one deployment environment but there are several other pages in the documentation which explain the benefits of leveraging [environments](/docs/infrastructure/environments/index.md) and [lifecycles](/docs/infrastructure/lifecycles/index.md) to create advanced deployment processes.
:::

## Configure Account & Target {#ConfigureOctopusDeployProject-ConfigureAccount&amp;Target}

To connect over SSH the first thing you will need to do is add the credentials for your machine. If you followed the previous  "[Configuring Target Machine](/docs/deploying-applications/node-on-nix-deployments/configuring-target-machine.md)" step this should consist of a username and password pair.

- Navigate to {{Environments,Accounts,Usernames/Passwords,Add Account}} and add these credentials.
- In the **prod** environment click *Add deployment target* and select *SSH Connection*.
- Enter the IP or DNS of the machine that is accessible to the Octopus Server. *In our case below it's the public IP provided by Azure/AWS.*
- Click *Discover* to automatically pre-populate the SSH fingerprint for the remote server.
- Continue to fill out the rest of the details, selecting the account that you created above.

:::success
Further details are provided throughout the rest of this documentation about [SSH Targets](/docs/infrastructure/ssh-targets/index.md).
:::

## Create Deployment Project {#ConfigureOctopusDeployProject-CreateDeploymentProject}

The next step is to create a project that will extract the package.

- Navigate to the Projects page via {{Projects,All}} and then click the *Add Project* button.
- Give the new project an appropriate name and once saved, go to the project's *Process*page and click {{Add Step,Deploy a Package}}.
    * Ensure that the target role matches that which was assigned to the machine in the previous step and select *octofxjs* as the Package ID. This Package ID is derived from the first section of the package that was previously uploaded (see *Package Metadata* section of the [Supported Packages](/docs/packaging-applications/creating-packages/supported-packages.md) documentation for mode details).

![](/docs/images/3049555/3278590.png "width=500")

### Variable Substitution {#ConfigureOctopusDeployProject-VariableSubstitution}

- Click the *Configure features* link at the bottom of the step.
- Disable the two configuration steps that are already selected
- Enable the *Substitute variables in files* feature.
- Enter `config/config.#{Octopus.Environment.Name}.js` as the substitution target file

![](/docs/images/3049555/3278589.png "width=500")

:::success
**Loading environment specific variables**
Although the XML and config transform features that are enabled by default in the deployment steps won't help us with our Nodejs project, we can leverage the variable substitution feature to update our project with environment specific variables. A simple configuration loading mechanism has been set up in the sample project that will load the appropriate configuration file from the *config* folder based on the environment variable set in the *NODE\_ENV* environment variable. This is a common variable used in these kinds of projects allow you to pass into code the current environment and allow it to handle different environment requirements. In this case it will load a *config/config.<EnvironmentName>.js* file, similar to how the *\*.<EnvironmentName>.config* works in the XML transform feature.
:::

To further test out the variables feature we will add our own custom variable from Octopus Deploy to be replaced in the config.

- Navigate to the *Variables* tab and add a new variable named **projectVariable** with some text to appear underneath the title bar on the web page, but leave the variable un-scoped.
- Click *Save* once you are done.

### Starting & Managing the Process {#ConfigureOctopusDeployProject-Starting&amp;ManagingtheProcess}

To get the Node.js process started up you can manually call *npm start* as you did during development however this has its drawbacks when trying to run the process in the background of your deployment environments. Each time you deploy a new version of the package you would then have to stop the old version and start the newly deployed one. Without running the process through some intermediary process manager you would need to search for and kill the previous one from the process list, based on something like parsing its path to determine the correct one. This is obviously fraught with dangers. A better approach is to install and use one of the many process managers that are our there such as [pm2](http://pm2.keymetrics.io/), [StrongLoop](http://strong-pm.io/) or [forever](https://github.com/foreverjs/forever) which ensure that the process stays alive and provides other features such monitoring resource usage and clustering. For the purposes of this simple example we will use pm2 to demonstrate how the web process might be hosted.

- Click the *Configure features* link at the bottom of the step and enable the *Custom deployment scripts* feature.
- Add the following code as a **bash** script for the **post-deployment** phase.

**Post-Deployment Bash script to start process**

```powershell
# Check if process is running from previous deployment
# and if so then remove so new version can be added
pm2 show "#{Octopus.Project.Name}" 1>/dev/null 2>1
rc=$?; if [[ $rc -eq 0 ]]; then
    echo Killing Old Process
    pm2 stop "#{Octopus.Project.Name}"
    pm2 delete "#{Octopus.Project.Name}"
fi
echo Starting New Proces
NODE_ENV="#{Octopus.Environment.Name}" pm2 start server.js --name="#{Octopus.Project.Name}"
```

:::success
While this code is obviously not the ideal solution, it does demonstrate how you might leverage pm2 to start and stop new versions of your project as it is deployed. Check their documentation on best practices for more advanced topics like restarting after server reboot, clustering and monitoring.
:::

## Deploy! {#ConfigureOctopusDeployProject-Deploy!}

- Create a new release and deploy it to the **prod** environment.

The package will be uploaded to the server and unpacked, and the environment specific variables replaced in the appropriate config file. With the custom post-deployment script, the service will then be started, passing in the correct environment to ensure the relevant config is loaded. Assuming you have followed all the previous steps to this guide you should now be able to make changes to your website, publish directly to Octopus and have it deploy as many times as you like.

Navigating to the host machine after deploying to the *prod* environment should then result in a page that looks something like this:

![](/docs/images/3049555/3278591.png "width=500")

:::hint
**Trouble browsing to your site?**
You may need to allow inbound network traffic over Port 80 which isn't normally allowed by default in either Azure or AWS.
:::

**Using the new Node.js deployment modules its easier than ever to pick the right language tool for the right job.  Go and explore how you can now deploy your applications to various POSIX based platforms!**
