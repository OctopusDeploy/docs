Environments are how you organize your deployment targets (whether on-premises servers or cloud services) into groups that represent the different stages of your deployment pipeline, for instance, **development**, **test**, and **production**.

Organizing your deployment targets into environments lets you define your deployment processes (no matter how many deployment targets or steps are involved) and have Octopus deploy the right versions of your software to the right environments at the right time.

You can manage your environments by navigating to **{{Infrastructure,Environments}}** in the Octopus Web Portal:

![The environments area of Octopus Deploy](docs/shared-content/concepts/images/environments.png "width=500")

## Add new environments {#add-new-environments}

1. Navigate to **{{Infrastructure,Environments}}** and click **ADD ENVIRONMENT**.
1. Give your new environment a meaningful name and click **SAVE**.

You can add as many environments as you need.

Now that you've configured your environments, it's time to connect your [deployment targets to Octopus](/docs/getting-started/deployment-targets.md).