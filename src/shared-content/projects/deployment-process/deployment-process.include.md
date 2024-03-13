A deployment process is a set of steps that Octopus Server orchestrates to deploy your software. Each project has a single deployment process.

You define your deployment processes by creating projects and then adding steps and variables to the project. Each step contains a specific action (or set of actions) executed as part of the deployment process each time you deploy your software.

Octopus has over 300+ built-in and community-contributed step templates for deploying almost anything.

Once you have set up a deployment process, you won't need to change it between deployments. However, you can add or edit steps anytime as your process or infrastructure changes.

![A simple deployment process in Octopus Deploy](/docs/shared-content/concepts/images/deployment-process.png)
