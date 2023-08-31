The deployment process is the steps the Octopus Server orchestrates to deploy your software.

You define your deployment processes by creating projects and then adding steps and variables to the project. Each step contains a specific action (or set of actions) that is executed as part of the deployment process each time your software is deployed.

Octopus comes with over 300+ built-in and community-contributed steps templates for deploying just about anything.

After the initial setup, your deployment process shouldn't change between deployments even though the software being deployed will change as part of the development process, however, you can continue to add and edit steps as your process evolves or your infrastructure changes.

![A simple deployment process in Octopus Deploy](/docs/shared-content/concepts/images/deployment-process.png)
